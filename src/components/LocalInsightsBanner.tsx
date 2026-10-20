/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Sparkles,
  RefreshCw,
  X,
  ChevronDown,
  ChevronUp,
  Compass,
  AlertTriangle,
  Loader2,
  Trophy,
  ArrowRight,
} from 'lucide-react';

interface LocalInsightsBannerProps {
  locationName: string;
  insightsHtml: string | null;
  isLoading: boolean;
  errorMessage: string | null;
  modelUsed?: string;
  onRetry: () => void;
  onDismiss: () => void;
  onOpenQuiz: () => void;
}

export function LocalInsightsBanner({
  locationName,
  insightsHtml,
  isLoading,
  errorMessage,
  modelUsed,
  onRetry,
  onDismiss,
  onOpenQuiz,
}: LocalInsightsBannerProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { t, language } = useLanguage();

  const getModelBadge = (model?: string) => {
    if (!model || model === 'gemini-3.8-flash') {
      return {
        label: t.modelGeminiFlash,
        style: 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60',
      };
    }
    if (model === 'gemini-3.1-flash-lite') {
      return {
        label: t.modelGeminiFlashLiteFailover,
        style: 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60',
      };
    }
    if (model === 'gemini-flash-latest') {
      return {
        label: t.modelGeminiFlashFailover,
        style: 'bg-amber-950/80 text-amber-300 border-amber-700/60',
      };
    }
    if (model === 'curated-archive') {
      return {
        label: t.modelCuratedArchive,
        style: 'bg-slate-800 text-slate-300 border-slate-700',
      };
    }
    return {
      label: model,
      style: 'bg-indigo-950/80 text-indigo-300 border-indigo-800/60',
    };
  };

  const badge = getModelBadge(modelUsed);

  // If no location has been selected or user dismissed
  if (!locationName && !isLoading && !insightsHtml && !errorMessage) {
    return null;
  }

  // If minimized / collapsed to a subtle floating pill
  if (isCollapsed) {
    return (
      <div className="absolute bottom-4 left-4 z-20">
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 hover:bg-slate-850 text-slate-200 text-xs font-semibold border border-indigo-500/40 shadow-2xl backdrop-blur-md transition-all hover:scale-105 group cursor-pointer"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 group-hover:rotate-12 transition" />
          <span>{t.localInsightsTitle}: {locationName}</span>
          <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
        </button>
      </div>
    );
  }

  return (
    <div className="absolute bottom-4 left-4 right-4 md:left-6 md:right-6 lg:left-8 lg:right-auto lg:max-w-xl z-20 transition-all duration-300">
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-indigo-500/30 shadow-2xl shadow-indigo-950/50 p-4 md:p-5 flex flex-col gap-3 text-slate-100">
        {/* Subtle top neon line accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-400 opacity-80" />

        {/* Header */}
        <div className="flex items-center justify-between gap-3 pt-0.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="p-1.5 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 shadow-inner shrink-0">
              <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-tight truncate">
                  {t.localInsightsTitle}
                </h3>
                <span className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full border shrink-0 ${badge.style}`}>
                  {badge.label}
                </span>
              </div>
              <p className="text-xs text-indigo-200/80 truncate">
                {t.tourGuideSecretsFor} <strong className="text-white">{locationName}</strong>
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-1 shrink-0">
            {!isLoading && (
              <button
                type="button"
                onClick={onRetry}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
                title={t.retry}
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              type="button"
              onClick={() => setIsCollapsed(true)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
              title={t.minimizingBanner}
            >
              <ChevronDown className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onDismiss}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-300 hover:bg-slate-800 transition cursor-pointer"
              title="Close banner"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body State: Loading */}
        {isLoading && (
          <div className="flex items-center gap-3 py-3 px-2 rounded-xl bg-slate-950/50 border border-indigo-950/80">
            <Loader2 className="w-5 h-5 text-indigo-400 animate-spin shrink-0" />
            <div className="text-xs text-indigo-200">
              <p className="font-semibold text-white">
                {language === 'es' ? 'Descubriendo secretos locales...' : 'Uncovering local secrets...'}
              </p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                {language === 'es'
                  ? 'Consultando al guía turístico IA para curiosidades auténticas'
                  : 'Consulting Gemini AI tour guide for engaging curiosities'}
              </p>
            </div>
          </div>
        )}

        {/* Body State: Error Notification */}
        {!isLoading && errorMessage && (
          <div className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-950/40 border border-rose-800/50 text-rose-200 text-xs">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="font-semibold text-rose-100">{t.unableToLoadFacts}</p>
              <p className="text-[11px] text-rose-300/90 mt-0.5 leading-snug">
                {errorMessage}
              </p>
            </div>
            <button
              type="button"
              onClick={onRetry}
              className="px-2.5 py-1 bg-rose-800 hover:bg-rose-700 text-white font-semibold rounded-lg shadow-sm text-[11px] shrink-0 transition cursor-pointer"
            >
              {t.retry}
            </button>
          </div>
        )}

        {/* Body State: Successful Content Injection */}
        {!isLoading && !errorMessage && insightsHtml && (
          <>
            <div className="insights-content max-h-52 overflow-y-auto pr-1">
              <div
                className="text-xs md:text-sm text-slate-200 leading-relaxed font-sans [&>ul]:space-y-2 [&>ul]:list-disc [&>ul]:pl-5 [&>ul>li]:text-slate-200 [&>ul>li]:marker:text-indigo-400 [&>ul>li]:marker:font-bold"
                dangerouslySetInnerHTML={{ __html: insightsHtml }}
              />
            </div>

            {/* Test Your Local Knowledge Button */}
            <button
              type="button"
              onClick={onOpenQuiz}
              className="w-full mt-1 py-2.5 px-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-950/60 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.98]"
            >
              <Trophy className="w-4 h-4 text-amber-300" />
              <span>{t.testKnowledgeButton}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {/* Banner Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-800/70 text-[10px] text-slate-400 font-sans">
          <span className="flex items-center gap-1 text-slate-400">
            <Compass className="w-3 h-3 text-indigo-400" /> {t.curatedFunFacts}
          </span>
          <span className="text-slate-400">{t.aiTourGuideResponse}</span>
        </div>
      </div>
    </div>
  );
}
