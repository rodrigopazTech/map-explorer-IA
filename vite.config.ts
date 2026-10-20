import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import {GoogleGenAI} from '@google/genai';
import dns from 'node:dns';

// Ensure IPv4 is prioritized for outbound API calls to prevent IPv6 container timeouts
dns.setDefaultResultOrder('ipv4first');

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      {
        name: 'api-server-routes',
        configureServer(server) {
          const insightsCache = new Map<string, { html: string; modelUsed: string }>();

          // Cascade of free Gemini models to failover seamlessly when quota is exhausted
          const FREE_MODELS_CASCADE = [
            'gemini-3.8-flash',
            'gemini-3.1-flash-lite',
            'gemini-flash-latest',
          ];

          // Verified curated insights archive in English and Spanish in case all free model quotas are completely exhausted
          const CURATED_ARCHIVE_EN: Record<string, string> = {
            'buenos aires': `<ul>
  <li><strong>The World Capital of Psychology:</strong> Buenos Aires has more psychologists per capita than any other city on Earth, earning a section of the Palermo neighborhood the affectionate nickname "Villa Freud."</li>
  <li><strong>The Odyssey of Evita:</strong> Eva Perón's embalmed body was secretly hidden across Europe under an alias for 16 years before finally returning to rest in the celebrated Recoleta Cemetery.</li>
  <li><strong>A City of Midnight Readers:</strong> Buenos Aires features the most bookstores per person globally, with legendary literary havens along Avenida Corrientes staying bustling well past 2:00 AM.</li>
</ul>`,
            'shibuya': `<ul>
  <li><strong>The World's Busiest Scramble:</strong> At peak rush hours, up to 3,000 pedestrians cross the famous Shibuya Scramble during a single 2-minute green light cycle without bumping into each other.</li>
  <li><strong>The Loyalty of Hachiko:</strong> The bronze dog statue outside the station honors the real Akita who faithfully waited every evening for nearly 10 years after his master's passing in 1925.</li>
  <li><strong>Subterranean River Secrets:</strong> The Shibuya River was paved over and buried underground for the 1964 Tokyo Olympics, but still runs silently beneath the neon asphalt and Scramble Square.</li>
</ul>`,
            'copacabana': `<ul>
  <li><strong>The Wave Mosaic Promenade:</strong> The iconic Portuguese stone wave pavement along Avenida Atlântica was designed by Roberto Burle Marx, symbolizing the movement of ocean swells.</li>
  <li><strong>The Mountain Fortress:</strong> Forte de Copacabana at the south end of the beach was home to the largest coastal defense cannons in South America and the historic 1922 "18 of the Fort" revolt.</li>
  <li><strong>Millions Dressed in White:</strong> On New Year's Eve (Réveillon), over 2 million people gather on the sands in pure white clothes to toss white flowers into the ocean for Iemanjá, the sea deity.</li>
</ul>`,
            'cologne': `<ul>
  <li><strong>The 632-Year Cathedral:</strong> Construction of the magnificent Kölner Dom began in 1248 and took over six centuries to finish in 1880, making it Germany's most visited monument.</li>
  <li><strong>Protected Brew Tradition:</strong> Authentic Kölsch beer can only legally be brewed in Cologne and is strictly served in slender 200ml glasses called "Stangen" by traditional Köbes waiters.</li>
  <li><strong>The Birthplace of Modern Fragrance:</strong> Italian perfumer Johann Maria Farina invented Eau de Cologne here in 1709, naming the light citrus scent in honor of his adopted German hometown.</li>
</ul>`,
            'lima': `<ul>
  <li><strong>A Desert Metropolis Under Cloud:</strong> Lima is the second-largest desert capital in the world after Cairo, yet rarely experiences rainfall thanks to the persistent coastal Humboldt Current fog (la garúa).</li>
  <li><strong>The Ancient Pyramid in the Neighborhood:</strong> The 1,500-year-old Huaca Pucllana adobe pyramid was built by the pre-Incan Lima civilization and stands illuminated right in the middle of modern Miraflores.</li>
  <li><strong>The Cradle of Culinary Fusion:</strong> Lima is home to Chifa and Nikkei cuisines, where 19th-century Chinese and Japanese immigration blended woks and seaweed with Andean yellow chilies and fresh ceviche.</li>
</ul>`,
            'miami': `<ul>
  <li><strong>Founded by a Citrus Pioneer:</strong> Miami is the only major American city planned and founded by a woman, citrus grower Julia Tuttle, who sent orange blossoms during a frost to convince Henry Flagler to build his railroad.</li>
  <li><strong>The Kitchen-Stove Sunscreen:</strong> Modern commercial sunscreen was invented here in 1944 when local pharmacist Benjamin Green blended cocoa butter and red veterinary petrolatum on his wife's stove.</li>
  <li><strong>Art Deco Preservation Wonder:</strong> South Beach boasts the largest concentration of preserved 1930s Art Deco and Streamline Moderne architecture in the world, totaling over 800 historic buildings.</li>
</ul>`,
          };

          const CURATED_ARCHIVE_ES: Record<string, string> = {
            'buenos aires': `<ul>
  <li><strong>La capital mundial de la psicología:</strong> Buenos Aires tiene más psicólogos por habitante que cualquier otra ciudad del planeta, lo que le dio a una zona del barrio de Palermo el apodo de "Villa Freud".</li>
  <li><strong>La odisea de Evita:</strong> El cuerpo embalsamado de Eva Perón estuvo oculto clandestinamente en Europa bajo un nombre falso durante 16 años antes de descansar en el célebre Cementerio de la Recoleta.</li>
  <li><strong>Ciudad de lectores noctámbulos:</strong> Buenos Aires cuenta con la mayor cantidad de librerías por persona en el mundo, y sus emblemáticas tiendas sobre la Avenida Corrientes permanecen abiertas hasta pasada la madrugada.</li>
</ul>`,
            'shibuya': `<ul>
  <li><strong>El cruce más transitado del mundo:</strong> En horas punta, hasta 3.000 peatones cruzan el cruce de Shibuya en un único ciclo de luz verde de 2 minutos sin chocar entre sí.</li>
  <li><strong>La lealtad inquebrantable de Hachiko:</strong> La estatua de bronce junto a la estación rinde tributo al perro de raza Akita que esperó fielmente todas las tardes durante casi 10 años tras el fallecimiento de su dueño en 1925.</li>
  <li><strong>El río subterráneo secreto:</strong> El río Shibuya fue canalizado bajo tierra para las Olimpíadas de Tokio de 1964, pero continúa fluyendo en silencio bajo el asfalto de neón y la plaza Scramble.</li>
</ul>`,
            'copacabana': `<ul>
  <li><strong>El paseo de ondas en mosaico:</strong> El emblemático suelo de piedra portuguesa con ondas a lo largo de la Avenida Atlántica fue diseñado por Roberto Burle Marx para simbolizar el movimiento de las olas oceánicas.</li>
  <li><strong>El fuerte y su historia:</strong> El Fuerte de Copacabana, en el extremo sur de la playa, albergó los cañones de defensa costera más grandes de Sudamérica y fue epicentro de la histórica revuelta de los "18 del Fuerte" en 1922.</li>
  <li><strong>Millones vestidos de blanco:</strong> En la víspera de Año Nuevo (Réveillon), más de 2 millones de personas se reúnen en la arena vestidas rigurosamente de blanco para ofrendar flores al mar para Iemanjá.</li>
</ul>`,
            'cologne': `<ul>
  <li><strong>La catedral de los 632 años:</strong> La construcción del majestuoso Kölner Dom comenzó en 1248 y tardó más de seis siglos en completarse en 1880, siendo el monumento más visitado de toda Alemania.</li>
  <li><strong>Tradición cervecera protegida:</strong> La auténtica cerveza Kölsch solo puede elaborarse legalmente en Colonia y se sirve exclusivamente en vasos cilíndricos de 200 ml llamados "Stangen" por camareros tradicionales (Köbes).</li>
  <li><strong>La cuna de la fragancia moderna:</strong> El perfumista italiano Johann Maria Farina inventó el Agua de Colonia en 1709, bautizando este fresco aroma cítrico en honor a su ciudad adoptiva.</li>
</ul>`,
            'lima': `<ul>
  <li><strong>Metrópolis en el desierto costero:</strong> Lima es la segunda capital en un desierto más grande del mundo tras El Cairo, y casi nunca llueve debido a la densa niebla marina de la corriente de Humboldt (la garúa).</li>
  <li><strong>Una pirámide milenaria en el barrio:</strong> La Huaca Pucllana, una pirámide de adobe de 1.500 años construida por la cultura Lima, se alza iluminada en medio del moderno distrito de Miraflores.</li>
  <li><strong>Cuna de la fusión gastronómica:</strong> Lima alberga las cocinas Chifa y Nikkei, donde la inmigración china y japonesa del siglo XIX fusionó los woks y algas con ajíes andinos y el ceviche fresco.</li>
</ul>`,
            'miami': `<ul>
  <li><strong>Fundada por una mujer pionera:</strong> Miami es la única gran metrópolis estadounidense planificada y fundada por una mujer, Julia Tuttle, productora de cítricos que convenció a Henry Flagler de extender su ferrocarril.</li>
  <li><strong>El protector solar en la cocina:</strong> El protector solar comercial moderno nació aquí en 1944, cuando el farmacéutico Benjamin Green mezcló manteca de cacao y vaselina en la estufa de su esposa.</li>
  <li><strong>Maravilla del Art Déco:</strong> South Beach alberga la mayor concentración del mundo de edificios Art Déco y estilo Streamline Moderne conservados de los años 30, con más de 800 inmuebles históricos.</li>
</ul>`,
          };

          const readJsonBody = (req: any): Promise<any> => {
            return new Promise((resolve) => {
              let raw = '';
              req.on('data', (chunk: any) => {
                raw += typeof chunk === 'string' ? chunk : chunk.toString('utf8');
              });
              req.on('end', () => {
                try {
                  resolve(raw ? JSON.parse(raw) : {});
                } catch {
                  resolve({ location: raw });
                }
              });
              req.on('error', () => resolve({}));
            });
          };

          // Gemini Local Insights Endpoint
          server.middlewares.use('/api/gemini/insights', async (req, res) => {
            try {
              let location = '';
              let language: 'en' | 'es' = 'en';
              if (req.method === 'POST') {
                const body = await readJsonBody(req);
                location = body.location || '';
                if (body.language === 'es') language = 'es';
              } else {
                const url = new URL(req.url || '', 'http://localhost');
                location = url.searchParams.get('location') || '';
                if (url.searchParams.get('language') === 'es') language = 'es';
              }

              if (!location) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: { message: 'Location is required' } }));
                return;
              }

              const normLocation = location.trim().toLowerCase();
              const cacheKey = `${normLocation}:${language}`;
              if (insightsCache.has(cacheKey)) {
                const cached = insightsCache.get(cacheKey)!;
                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ location, html: cached.html, modelUsed: cached.modelUsed, cached: true }));
                return;
              }

              const apiKey = process.env.GEMINI_API_KEY;
              if (!apiKey) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: { message: 'Gemini API key is not configured' } }));
                return;
              }

              const ai = new GoogleGenAI({
                apiKey,
                httpOptions: {
                  headers: {
                    'User-Agent': 'aistudio-build',
                  },
                },
              });

              const prompt = language === 'es'
                ? `Eres un guía turístico local para ${location}. Dame exactamente 3 datos curiosos, fascinantes, inusuales o sorprendentes sobre este lugar TOTALMENTE EN ESPAÑOL. Mantén cada dato en menos de 2 oraciones. Devuelve la respuesta en formato de lista desordenada HTML limpia (<ul>) para inyectarla directamente.`
                : `You are a local tour guide for ${location}. Give me exactly 3 short, highly engaging, and unusual or surprising fun facts about this place. Keep each fact under 2 sentences. Format the response as a clean HTML unordered list (<ul>) so I can inject it directly.`;

              let htmlContent = '';
              let successfulModel = '';
              let lastError: any = null;

              // Automatic model cascade across free models
              for (const modelName of FREE_MODELS_CASCADE) {
                for (let attempt = 0; attempt < 2; attempt++) {
                  try {
                    const response = await ai.models.generateContent({
                      model: modelName,
                      contents: prompt,
                    });
                    htmlContent = response.text || '';
                    if (htmlContent) {
                      successfulModel = modelName;
                      break;
                    }
                  } catch (err: any) {
                    lastError = err;
                    const errStr = (err?.message || '') + (err?.status || '');
                    // If it is 429 quota exhausted on this model, immediately try next free model
                    if (errStr.includes('429') || errStr.includes('RESOURCE_EXHAUSTED')) {
                      break;
                    }
                    if (attempt < 1) {
                      await new Promise((resolve) => setTimeout(resolve, 600));
                    }
                  }
                }
                if (htmlContent) {
                  break;
                }
              }

              // Fallback to verified local archive if all free quotas are temporarily depleted
              if (!htmlContent) {
                const archiveDict = language === 'es' ? CURATED_ARCHIVE_ES : CURATED_ARCHIVE_EN;
                const archiveKey = Object.keys(archiveDict).find((k) => normLocation.includes(k));
                if (archiveKey) {
                  htmlContent = archiveDict[archiveKey];
                  successfulModel = 'curated-archive';
                } else if (lastError) {
                  throw lastError;
                }
              }

              let cleanHtml = htmlContent.trim();
              if (cleanHtml.startsWith('```')) {
                cleanHtml = cleanHtml.replace(/^```(?:html)?\s*/i, '').replace(/\s*```$/, '');
              }

              insightsCache.set(cacheKey, { html: cleanHtml, modelUsed: successfulModel });

              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ location, html: cleanHtml, modelUsed: successfulModel }));
            } catch (err: any) {
              let userMessage = err?.message || 'Failed to generate local insights';
              try {
                const parsed = JSON.parse(userMessage);
                if (parsed?.error?.message) {
                  if (parsed.error.code === 429 || parsed.error.status === 'RESOURCE_EXHAUSTED') {
                    userMessage = 'Gemini API free-tier rate limit reached on all models. Please wait a few seconds and click Retry.';
                  } else if (parsed.error.code === 503 || parsed.error.status === 'UNAVAILABLE') {
                    userMessage = 'The Gemini AI model is currently busy. Please click Retry in a moment.';
                  } else {
                    userMessage = parsed.error.message;
                  }
                }
              } catch {
                if (userMessage.includes('429') || userMessage.includes('RESOURCE_EXHAUSTED') || userMessage.includes('quota')) {
                  userMessage = 'Gemini API free-tier rate limit reached on all models. Please wait a few seconds and click Retry.';
                } else if (userMessage.includes('503') || userMessage.includes('high demand') || userMessage.includes('UNAVAILABLE')) {
                  userMessage = 'The Gemini AI model is currently busy. Please click Retry in a moment.';
                }
              }

              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: { message: userMessage } }));
            }
          });

          // Gemini Local Quiz Endpoint
          server.middlewares.use('/api/gemini/quiz', async (req, res) => {
            try {
              let location = '';
              let category = '';
              let isHyperlocal = false;
              let language: 'en' | 'es' = 'en';
              let coordinates: { latitude: number; longitude: number } | null = null;

              if (req.method === 'POST') {
                const body = await readJsonBody(req);
                location = body.location || '';
                category = body.category || 'Local history';
                isHyperlocal = Boolean(body.isHyperlocal);
                if (body.language === 'es') language = 'es';
                if (body.coordinates && typeof body.coordinates.latitude === 'number') {
                  coordinates = body.coordinates;
                }
              }

              if (!location) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: { message: 'Location is required' } }));
                return;
              }

              const apiKey = process.env.GEMINI_API_KEY;
              if (!apiKey) {
                res.statusCode = 500;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: { message: 'Gemini API key is not configured' } }));
                return;
              }

              const ai = new GoogleGenAI({
                apiKey,
                httpOptions: {
                  headers: {
                    'User-Agent': 'aistudio-build',
                  },
                },
              });

              let rawText = '';
              let successfulModel = '';
              let groundingLinks: Array<{ title: string; uri: string }> = [];
              let lastQuizError: any = null;

              if (isHyperlocal) {
                // Hyperlocal Mode: Grounded with Google Maps Grounding Lite
                const prompt = language === 'es'
                  ? `Eres un maestro de trivia hiperlocal para ${location}. Crea un quiz de opción múltiple de 3 preguntas de NIVEL EXPERTO, altamente difícil e hiperlocal sobre "${category}" específicamente alrededor de este barrio y distrito (coordenadas: ${coordinates?.latitude ?? ''}, ${coordinates?.longitude ?? ''}).
Enfócate en esquinas exactas, lugares históricos, tradiciones vecinales auténticas y sitios reales verificados a través de Google Maps.
IMPORTANTE: TODO EL CONTENIDO (las 3 preguntas, todas las opciones y las explicaciones) DEBE ESTAR RIGUROSAMENTE EN ESPAÑOL.
Devuelve la salida estrictamente en un objeto JSON envuelto en un bloque de código \`\`\`json ... \`\`\`:
{
  "questions": [
    {
      "question": "Pregunta de trivia hiperlocal en español",
      "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
      "correctIndex": 0,
      "explanation": "Explicación detallada en español de por qué la respuesta es correcta"
    }
  ]
}
Asegúrate de incluir exactamente 3 preguntas, exactamente 4 opciones por pregunta, y un índice correctIndex entero de 0 a 3.`
                  : `You are a hardcore local trivia master for ${location}. Create an EXPERT-LEVEL, highly difficult, and hyperlocal 3-question multiple-choice quiz about "${category}" specifically around this neighborhood and district (coordinates: ${coordinates?.latitude ?? ''}, ${coordinates?.longitude ?? ''}).
Focus on specific local venues, exact cross streets, historical plaques, authentic neighborhood traditions, and real places verified through Google Maps.
Format the output strictly as a JSON object inside a \`\`\`json ... \`\`\` code fence:
{
  "questions": [
    {
      "question": "Hyperlocal trivia question",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Detailed explanation of why this answer is correct"
    }
  ]
}
Ensure there are exactly 3 questions, exactly 4 options per question, and correctIndex is an integer from 0 to 3.`;

                const config: any = {
                  tools: [{ googleMaps: {} }],
                };
                if (coordinates && typeof coordinates.latitude === 'number') {
                  config.toolConfig = {
                    retrievalConfig: {
                      latLng: {
                        latitude: coordinates.latitude,
                        longitude: coordinates.longitude,
                      },
                    },
                  };
                }

                for (const modelName of FREE_MODELS_CASCADE) {
                  try {
                    const response = await ai.models.generateContent({
                      model: modelName,
                      contents: prompt,
                      config,
                    });
                    const text = (response.text || '').trim();
                    if (text) {
                      rawText = text;
                      successfulModel = modelName;
                      const chunks = (response.candidates?.[0] as any)?.groundingMetadata?.groundingChunks;
                      if (Array.isArray(chunks)) {
                        for (const chunk of chunks) {
                          if (chunk.maps?.uri) {
                            groundingLinks.push({
                              title: chunk.maps.title || (language === 'es' ? 'Ubicación en Google Maps' : 'Google Maps Location'),
                              uri: chunk.maps.uri,
                            });
                          }
                        }
                      }
                      break;
                    }
                  } catch (err: any) {
                    lastQuizError = err;
                    continue; // Try next free model in cascade
                  }
                }
              } else {
                // Standard Mode: Structured JSON schema across cascade
                const prompt = language === 'es'
                  ? `Eres un maestro de trivia para ${location}. Crea un quiz de opción múltiple de 3 preguntas altamente entretenido sobre "${category}" en ${location}.
IMPORTANTE: Las 3 preguntas, todas las opciones y las explicaciones DEBEN ESTAR COMPLETAMENTE EN ESPAÑOL.
Devuelve un objeto JSON con esta estructura exacta:
{
  "questions": [
    {
      "question": "Texto de la pregunta en español",
      "options": ["Opción A", "Opción B", "Opción C", "Opción D"],
      "correctIndex": 0,
      "explanation": "Breve explicación en español de la respuesta"
    }
  ]
}
Asegúrate de incluir exactamente 3 preguntas, exactamente 4 opciones por pregunta, y un índice correctIndex de 0 a 3.`
                  : `You are a trivia master for ${location}. Create an engaging 3-question multiple-choice quiz about "${category}" in ${location}.
Return a JSON object with this exact structure:
{
  "questions": [
    {
      "question": "Question text here",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctIndex": 0,
      "explanation": "Brief explanation of the answer"
    }
  ]
}
Ensure there are exactly 3 questions, exactly 4 options per question, and correctIndex is an integer from 0 to 3.`;

                for (const modelName of FREE_MODELS_CASCADE) {
                  try {
                    const response = await ai.models.generateContent({
                      model: modelName,
                      contents: prompt,
                      config: {
                        responseMimeType: 'application/json',
                      },
                    });
                    const text = (response.text || '').trim();
                    if (text) {
                      rawText = text;
                      successfulModel = modelName;
                      break;
                    }
                  } catch (err: any) {
                    lastQuizError = err;
                    continue; // Try next free model in cascade
                  }
                }
              }

              if (!rawText && lastQuizError) {
                throw lastQuizError;
              }

              if (rawText.startsWith('```')) {
                rawText = rawText.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
              }
              const parsed = JSON.parse(rawText);
              res.statusCode = 200;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ ...parsed, isHyperlocal, groundingLinks, modelUsed: successfulModel }));
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: { message: err?.message || 'Failed to generate quiz' } }));
            }
          });

          // Google Geocoding V4 Proxy Endpoint
          server.middlewares.use('/api/geocode', async (req, res) => {
            try {
              const url = new URL(req.url || '', 'http://localhost');
              const address = url.searchParams.get('address');
              const apiKey = process.env.VITE_GOOGLE_MAPS_API_KEY || url.searchParams.get('key');
              if (!address) {
                res.statusCode = 400;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: { code: 400, message: 'Address query parameter is required', status: 'INVALID_ARGUMENT' } }));
                return;
              }
              if (!apiKey) {
                res.statusCode = 401;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ error: { code: 401, message: 'Google Maps API key is missing', status: 'UNAUTHENTICATED' } }));
                return;
              }

              const targetUrl = `https://geocode.googleapis.com/v4/geocode/address/${encodeURIComponent(address)}?key=${apiKey}`;
              const response = await fetch(targetUrl, {
                headers: {
                  'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio',
                  'Accept': 'application/json',
                },
              });
              const data = await response.text();
              res.statusCode = response.status;
              res.setHeader('Content-Type', 'application/json');
              res.end(data);
            } catch (err: any) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: { code: 500, message: err?.message || 'Proxy error', status: 'INTERNAL' } }));
            }
          });
        },
      },
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
