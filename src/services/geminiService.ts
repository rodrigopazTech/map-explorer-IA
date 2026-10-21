/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeocodeResult } from '../types/geocoding';
import { QuizCategory, QuizData } from '../types/quiz';
import { FALLBACK_QUIZZES, FALLBACK_QUIZZES_ES, generateDynamicFallbackQuiz } from '../data/fallbackQuizzes';
import { getFallbackInsights } from '../data/fallbackInsights';

/**
 * Extracts a clean "City, State" (or City, Region / Country) identifier from a GeocodeResult.
 * e.g., "Miami, Florida", "Shibuya, Tokyo", "Buenos Aires, Argentina".
 */
export function extractCityAndState(result: GeocodeResult): string {
  if (!result) return '';

  const components = result.addressComponents || [];

  let city = '';
  let state = '';
  let country = '';

  for (const comp of components) {
    const types = comp.types || [];
    if (types.includes('locality') || types.includes('postal_town')) {
      city = comp.longText;
    } else if (!city && (types.includes('sublocality_level_1') || types.includes('sublocality') || types.includes('neighborhood'))) {
      city = comp.longText;
    }

    if (types.includes('administrative_area_level_1')) {
      state = comp.longText;
    }

    if (types.includes('country')) {
      country = comp.longText;
    }
  }

  // Fallback: parse formattedAddress if components are incomplete
  if (!city) {
    const parts = result.formattedAddress.split(',').map((p) => p.trim());
    city = parts[0] || '';
    if (!state && parts.length > 1) {
      state = parts[1] || '';
    }
  }

  if (city && state) {
    if (city.toLowerCase() === state.toLowerCase() && country) {
      return `${city}, ${country}`;
    }
    return `${city}, ${state}`;
  }

  if (city && country) {
    return `${city}, ${country}`;
  }

  if (city) return city;
  return result.formattedAddress.split(',').slice(0, 2).join(', ').trim();
}

import { Language } from '../i18n/translations';

export interface LocalInsightsResult {
  html: string;
  modelUsed?: string;
  cached?: boolean;
}

/**
 * Requests 3 fun facts about the location from the Gemini API cascade.
 */
export async function fetchLocalInsights(
  location: string,
  language: Language = 'en'
): Promise<LocalInsightsResult> {
  const cleanLoc = location.trim();
  if (!cleanLoc) {
    throw new Error('Location is required to generate insights.');
  }

  try {
    const response = await fetch('/api/gemini/insights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ location: cleanLoc, language }),
    });

    const contentType = response.headers.get('content-type') || '';

    if (response.ok && contentType.includes('application/json')) {
      const data = await response.json();
      if (data?.html) {
        return {
          html: data.html,
          modelUsed: data.modelUsed || 'gemini-3.8-flash',
          cached: data.cached,
        };
      }
    } else {
      // Plain-text rate limits (e.g. "Rate exceeded.") or non-JSON 429/503 from edge proxy
      const errText = await response.text().catch(() => '');
      console.warn(`[Gemini Insights API] Rate limit or status ${response.status} (${errText}). Activating curated insights fallback.`);
    }
  } catch (err) {
    console.warn('[Gemini Insights API] Network error, activating curated insights fallback:', err);
  }

  // Resilient fallback: provides high-fidelity curated secrets or dynamic insights with 0 crashes
  return getFallbackInsights(cleanLoc, language);
}

/**
 * Requests a 3-question multiple-choice quiz for the specified location and category.
 */
export async function fetchQuiz(
  location: string,
  category: QuizCategory,
  isHyperlocal: boolean = false,
  coordinates?: { latitude: number; longitude: number },
  language: Language = 'en'
): Promise<QuizData> {
  const cleanLoc = location.trim();
  if (!cleanLoc) {
    throw new Error('Location is required to generate quiz.');
  }

  try {
    const response = await fetch('/api/gemini/quiz', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        location: cleanLoc,
        category,
        isHyperlocal,
        coordinates,
        language,
      }),
    });

    const contentType = response.headers.get('content-type') || '';
    if (response.ok && contentType.includes('application/json')) {
      const data = await response.json();
      if (data?.questions && Array.isArray(data.questions) && data.questions.length >= 3) {
        return {
          location: cleanLoc,
          category,
          isHyperlocal,
          groundingLinks: data.groundingLinks || [],
          modelUsed: data.modelUsed,
          questions: data.questions.slice(0, 3).map((q: any, idx: number) => ({
            id: `q-${idx}-${Date.now()}`,
            question: q.question,
            options: q.options || [],
            correctIndex: typeof q.correctIndex === 'number' ? q.correctIndex : 0,
            explanation: q.explanation || 'Great job exploring this fact!',
          })),
          source: 'gemini',
        };
      }
    }
  } catch (err) {
    console.warn('Network call to Gemini quiz endpoint failed, falling back to curated local trivia:', err);
  }

  // Fallback: check curated store or generate dynamic local trivia in the user's language
  const store = language === 'es' ? FALLBACK_QUIZZES_ES : FALLBACK_QUIZZES;
  const normKey = Object.keys(store).find((k) =>
    cleanLoc.toLowerCase().includes(k)
  );

  if (normKey && store[normKey]?.[category]) {
    return {
      location: cleanLoc,
      category,
      isHyperlocal,
      questions: store[normKey]![category]!,
      source: 'curated',
    };
  }

  return {
    location: cleanLoc,
    category,
    isHyperlocal,
    questions: generateDynamicFallbackQuiz(cleanLoc, category, isHyperlocal, language),
    source: 'curated',
  };
}
