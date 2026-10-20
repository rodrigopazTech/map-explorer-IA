/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type QuizCategory = 'Local cuisine' | 'Art and culture' | 'Local history';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizData {
  location: string;
  category: QuizCategory;
  questions: QuizQuestion[];
  source?: 'gemini' | 'curated';
  isHyperlocal?: boolean;
  groundingLinks?: Array<{ title: string; uri: string }>;
  modelUsed?: string;
}
