/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { QuizCategory, QuizData } from '../types/quiz';
import { fetchQuiz } from '../services/geminiService';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageToggle } from './LanguageToggle';
import {
  Trophy,
  Utensils,
  Palette,
  Landmark,
  X,
  Loader2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RotateCcw,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Flame,
  Info,
  MapPin,
  ExternalLink,
} from 'lucide-react';

interface LocalKnowledgeQuizModalProps {
  location: string;
  isOpen: boolean;
  onClose: () => void;
  coordinates?: { latitude: number; longitude: number };
}

type QuizStep = 'select_category' | 'playing' | 'results';

export function LocalKnowledgeQuizModal({
  location,
  isOpen,
  onClose,
  coordinates,
}: LocalKnowledgeQuizModalProps) {
  const [step, setStep] = useState<QuizStep>('select_category');
  const [selectedCategory, setSelectedCategory] = useState<QuizCategory | null>(null);
  const [quizData, setQuizData] = useState<QuizData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Hyperlocal Mode Toggle State
  const [isHyperlocal, setIsHyperlocal] = useState(false);
  const [showHyperlocalInfo, setShowHyperlocalInfo] = useState(false);

  // User selections: map questionIndex -> optionIndex
  const [selectedAnswers, setSelectedAnswers] = useState<{ [qIdx: number]: number }>({});

  const { t, language } = useLanguage();

  if (!isOpen) return null;

  const categories = [
    {
      id: 'Local cuisine' as QuizCategory,
      title: t.categories.cuisineTitle,
      description: t.categories.cuisineDesc,
      icon: Utensils,
      gradient: 'from-amber-500/20 to-orange-600/20 border-amber-500/40 hover:border-amber-400',
      accent: 'text-amber-400 bg-amber-950/80 border-amber-600/50',
    },
    {
      id: 'Art and culture' as QuizCategory,
      title: t.categories.artTitle,
      description: t.categories.artDesc,
      icon: Palette,
      gradient: 'from-fuchsia-500/20 to-purple-600/20 border-fuchsia-500/40 hover:border-fuchsia-400',
      accent: 'text-fuchsia-400 bg-fuchsia-950/80 border-fuchsia-600/50',
    },
    {
      id: 'Local history' as QuizCategory,
      title: t.categories.historyTitle,
      description: t.categories.historyDesc,
      icon: Landmark,
      gradient: 'from-sky-500/20 to-indigo-600/20 border-sky-500/40 hover:border-sky-400',
      accent: 'text-sky-400 bg-sky-950/80 border-sky-600/50',
    },
  ];

  const handleStartCategory = async (category: QuizCategory) => {
    setSelectedCategory(category);
    setIsLoading(true);
    setErrorMessage(null);
    setSelectedAnswers({});

    try {
      const data = await fetchQuiz(location, category, isHyperlocal, coordinates, language);
      setQuizData(data);
      setStep('playing');
    } catch (err: any) {
      console.error('Quiz loading error:', err);
      setErrorMessage(err?.message || (language === 'es' ? 'No se pudieron cargar las preguntas del quiz.' : 'Could not load quiz questions.'));
    } finally {
      setIsLoading(false);
    }
  };

  // Re-fetch or translate quiz if language changes while modal is active
  const prevLangRef = useRef(language);
  useEffect(() => {
    if (prevLangRef.current !== language) {
      prevLangRef.current = language;
      if (selectedCategory && isOpen) {
        handleStartCategory(selectedCategory);
      }
    }
  }, [language, selectedCategory, isOpen]);

  const handleOptionSelect = (qIdx: number, oIdx: number) => {
    if (step === 'results') return;
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmitQuiz = () => {
    if (!quizData) return;
    setStep('results');
  };

  const handleReset = () => {
    setStep('select_category');
    setSelectedCategory(null);
    setQuizData(null);
    setSelectedAnswers({});
    setErrorMessage(null);
  };

  let correctCount = 0;
  if (quizData && step === 'results') {
    quizData.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });
  }

  const allAnswered = quizData && quizData.questions.every((_, idx) => selectedAnswers[idx] !== undefined);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl bg-slate-900 border border-indigo-500/40 shadow-2xl shadow-indigo-950/60 p-5 md:p-6 flex flex-col gap-4 text-slate-100">
        {/* Top neon glow line */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
          isHyperlocal
            ? 'from-amber-500 via-rose-500 to-orange-500'
            : 'from-indigo-500 via-purple-500 to-amber-400'
        }`} />

        {/* Modal Header */}
        <div className="flex items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className={`p-2 rounded-2xl border shrink-0 ${
              isHyperlocal
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40'
            }`}>
              {isHyperlocal ? (
                <Flame className="w-5 h-5 text-amber-400 animate-pulse" />
              ) : (
                <Trophy className="w-5 h-5 text-amber-300" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-base font-bold text-white tracking-tight">
                  {t.quizModalTitle}
                </h2>
                {isHyperlocal ? (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700 flex items-center gap-1 shrink-0">
                    <Flame className="w-3 h-3 text-amber-400" /> {t.hyperlocalMode}
                  </span>
                ) : (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800/80 shrink-0">
                    Gemini AI
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400 truncate">
                {t.quizModalSubtitle} <strong className="text-slate-200">{location}</strong>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <LanguageToggle />
            <button
              onClick={onClose}
              className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* STEP 1: Select Category & Hyperlocal Toggle */}
        {step === 'select_category' && (
          <div className="flex flex-col gap-4 py-2">
            {/* Hyperlocal Mode Toggle Card */}
            <div className={`p-3.5 rounded-2xl border transition-all duration-200 ${
              isHyperlocal
                ? 'bg-gradient-to-r from-amber-950/50 via-rose-950/40 to-slate-900 border-amber-500/60 shadow-lg shadow-amber-950/30'
                : 'bg-slate-850/60 border-slate-700/60'
            }`}>
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`p-2 rounded-xl border shrink-0 ${
                    isHyperlocal
                      ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    <Flame className={`w-4 h-4 ${isHyperlocal ? 'text-amber-400' : 'text-slate-400'}`} />
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white tracking-wide">
                        {t.hyperlocalMode}
                      </span>
                      <span className={`text-[10px] uppercase font-bold px-1.5 py-0.2 rounded ${
                        isHyperlocal
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}>
                        {isHyperlocal ? t.expertModeBadge : t.standardBadge}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {t.hyperlocalModeSubtitle}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setShowHyperlocalInfo(!showHyperlocalInfo)}
                    className="p-1.5 text-slate-400 hover:text-indigo-300 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                    title={t.howHyperlocalWorksTooltip}
                  >
                    <Info className="w-4 h-4" />
                  </button>

                  {/* Toggle Switch */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isHyperlocal}
                    onClick={() => setIsHyperlocal(!isHyperlocal)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500/50 ${
                      isHyperlocal ? 'bg-amber-500' : 'bg-slate-700'
                    }`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
                        isHyperlocal ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Informative Expander on Hyperlocal Mode */}
              {showHyperlocalInfo && (
                <div className="mt-3 pt-3 border-t border-slate-700/60 text-xs text-slate-300 flex flex-col gap-2 bg-slate-900/60 p-3 rounded-xl">
                  <div className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-300">{t.hyperlocalInfoTitleDifficulty}</strong>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                        {t.hyperlocalInfoDescDifficulty}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-indigo-300">{t.hyperlocalInfoTitleHow}</strong>
                      <p className="text-[11px] text-slate-300 mt-0.5 leading-relaxed">
                        {t.hyperlocalInfoDescHow}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center pt-1">
              <h3 className="text-sm font-bold text-white">{t.chooseYourTopic}</h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {t.chooseYourTopicDesc}
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-950/50 border border-rose-800/60 text-rose-200 text-xs text-center">
                {errorMessage}
              </div>
            )}

            <div className="flex flex-col gap-2.5">
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleStartCategory(cat.id)}
                    disabled={isLoading}
                    className={`w-full p-4 rounded-2xl border text-left transition-all duration-200 flex items-center justify-between gap-4 group cursor-pointer ${
                      cat.gradient
                    } bg-slate-850/60 shadow-lg hover:scale-[1.01]`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className={`p-2.5 rounded-xl border shrink-0 ${cat.accent}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-white group-hover:text-indigo-200 transition">
                            {cat.title}
                          </h4>
                          {isHyperlocal && (
                            <span className="text-[9px] uppercase font-bold px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-700/60">
                              {t.hyperlocalMode}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
                          {cat.description}
                        </p>
                      </div>
                    </div>

                    <div className="w-8 h-8 rounded-xl bg-slate-800/80 group-hover:bg-indigo-600 text-slate-400 group-hover:text-white flex items-center justify-center shrink-0 transition">
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>

            {isLoading && (
              <div className="flex items-center justify-center gap-2 py-4 text-xs text-indigo-300 bg-slate-850/50 rounded-2xl border border-indigo-950">
                <Loader2 className="w-4 h-4 animate-spin text-amber-400" />
                <span>
                  {isHyperlocal
                    ? `${t.loadingQuizHyperlocal} ${location}...`
                    : `${t.loadingQuizStandard} ${location}...`}
                </span>
              </div>
            )}
          </div>
        )}

        {/* STEP 2 & 3: Playing & Results */}
        {(step === 'playing' || step === 'results') && quizData && (
          <div className="flex flex-col gap-4 py-1">
            {/* Category Banner & Score Header */}
            <div className="flex items-center justify-between bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3 text-xs flex-wrap gap-2">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800">
                  {selectedCategory === 'Local cuisine' ? t.categories.cuisineTitle : selectedCategory === 'Art and culture' ? t.categories.artTitle : t.categories.historyTitle}
                </span>
                {quizData.isHyperlocal && (
                  <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-700 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-400" /> {t.hyperlocalMode}
                  </span>
                )}
                {quizData.modelUsed && (
                  <span className="text-[10px] font-mono tracking-wider px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                    {quizData.modelUsed === 'gemini-3.1-flash-lite'
                      ? t.modelGeminiFlashLiteFailover
                      : quizData.modelUsed === 'gemini-flash-latest'
                      ? t.modelGeminiFlashFailover
                      : t.modelGeminiFlash}
                  </span>
                )}
                <span className="text-slate-300 font-semibold">{location}</span>
              </div>

              {step === 'results' ? (
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-white">
                    {t.scoreLabel}: {correctCount} / 3
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      correctCount === 3
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700'
                        : correctCount === 2
                        ? 'bg-amber-950 text-amber-300 border border-amber-700'
                        : 'bg-rose-950 text-rose-300 border border-rose-700'
                    }`}
                  >
                    {correctCount === 3
                      ? (quizData.isHyperlocal ? t.scoreLegendHyperlocal : t.scoreMaster)
                      : correctCount === 2
                      ? t.scoreExplorer
                      : t.scoreKeepExploring}
                  </span>
                </div>
              ) : (
                <span className="text-slate-400 text-[11px]">
                  {Object.keys(selectedAnswers).length} / 3 {t.answeredProgress}
                </span>
              )}
            </div>

            {/* Questions List */}
            <div className="flex flex-col gap-4">
              {quizData.questions.map((q, qIdx) => {
                const userChoice = selectedAnswers[qIdx];
                const isSubmitted = step === 'results';
                const isCorrect = userChoice === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-2xl border transition-all ${
                      isSubmitted
                        ? isCorrect
                          ? 'bg-emerald-950/20 border-emerald-600/40'
                          : 'bg-rose-950/20 border-rose-600/40'
                        : 'bg-slate-850/80 border-slate-700/60'
                    }`}
                  >
                    {/* Question Header */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <div className="flex items-start gap-2">
                        <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-950/80 px-2 py-0.5 rounded-md border border-indigo-800/60 shrink-0">
                          Q{qIdx + 1}
                        </span>
                        <h4 className="text-sm font-semibold text-slate-100 leading-snug">
                          {q.question}
                        </h4>
                      </div>

                      {isSubmitted && (
                        <div className="shrink-0">
                          {isCorrect ? (
                            <span className="flex items-center gap-1 text-emerald-400 text-xs font-semibold">
                              <CheckCircle2 className="w-4 h-4" /> {t.correctBadge}
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-rose-400 text-xs font-semibold">
                              <XCircle className="w-4 h-4" /> {t.incorrectBadge}
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((opt, oIdx) => {
                        const isSelected = userChoice === oIdx;
                        const isTheCorrectOption = oIdx === q.correctIndex;

                        let optionStyle =
                          'bg-slate-800/80 hover:bg-slate-750 text-slate-200 border-slate-700/70';

                        if (isSubmitted) {
                          if (isTheCorrectOption) {
                            optionStyle =
                              'bg-emerald-950/70 border-emerald-500 text-emerald-100 font-semibold ring-1 ring-emerald-500/50';
                          } else if (isSelected && !isCorrect) {
                            optionStyle =
                              'bg-rose-950/70 border-rose-500 text-rose-200 line-through opacity-80';
                          } else {
                            optionStyle = 'bg-slate-900/40 border-slate-800 text-slate-500';
                          }
                        } else if (isSelected) {
                          optionStyle =
                            'bg-indigo-600/40 border-indigo-500 text-white font-semibold ring-1 ring-indigo-500 shadow-md';
                        }

                        const letters = ['A', 'B', 'C', 'D'];

                        return (
                          <button
                            key={oIdx}
                            type="button"
                            onClick={() => handleOptionSelect(qIdx, oIdx)}
                            disabled={isSubmitted}
                            className={`p-3 rounded-xl border text-left text-xs transition flex items-center gap-2.5 ${optionStyle} ${
                              !isSubmitted ? 'cursor-pointer hover:border-indigo-400 active:scale-98' : 'cursor-default'
                            }`}
                          >
                            <span className="w-5 h-5 rounded-md bg-slate-900/80 text-[10px] font-mono font-bold flex items-center justify-center shrink-0 border border-slate-700">
                              {letters[oIdx]}
                            </span>
                            <span className="flex-1 leading-snug">{opt}</span>
                            {isSubmitted && isTheCorrectOption && (
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Explanation in Results mode */}
                    {isSubmitted && (
                      <div className="mt-3 p-2.5 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                        <HelpCircle className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                        <div className="leading-relaxed">
                          <strong className="text-indigo-300">{t.answerInsightTitle}</strong>{' '}
                          {q.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Google Maps Grounding Links (Displayed when present in results) */}
            {step === 'results' && quizData.groundingLinks && quizData.groundingLinks.length > 0 && (
              <div className="p-3 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 text-xs">
                <span className="text-[11px] font-semibold text-indigo-300 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                  <MapPin className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{t.groundedLocationsTitle}</span>
                </span>
                <div className="flex flex-wrap gap-2">
                  {quizData.groundingLinks.map((link, lIdx) => (
                    <a
                      key={lIdx}
                      href={link.uri}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-2.5 py-1 rounded-lg bg-indigo-900/60 hover:bg-indigo-800 border border-indigo-700 text-indigo-200 text-xs flex items-center gap-1.5 transition"
                    >
                      <span>{link.title}</span>
                      <ExternalLink className="w-3 h-3 text-indigo-400" />
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-3 pt-2 border-t border-slate-800">
              {step === 'playing' ? (
                <>
                  <button
                    type="button"
                    onClick={() => setStep('select_category')}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                  >
                    {t.changeCategoryButton}
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmitQuiz}
                    disabled={!allAnswered}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold shadow-lg shadow-indigo-600/30 transition flex items-center gap-2 cursor-pointer"
                  >
                    <span>{t.submitAnswersButton}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold border border-slate-700 transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t.chooseDifferentCategoryButton}</span>
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-lg transition cursor-pointer"
                  >
                    {t.doneExploringButton}
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
