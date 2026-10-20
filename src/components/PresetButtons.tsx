/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PresetLocation } from '../types/geocoding';
import { PRESET_LOCATIONS } from '../data/presets';
import { useLanguage } from '../i18n/LanguageContext';
import { Loader2, Navigation2, Sparkles } from 'lucide-react';

interface PresetButtonsProps {
  onSelectPreset: (preset: PresetLocation) => void;
  activePresetId: string | null;
  loadingPresetId: string | null;
  isLoading: boolean;
}

export function PresetButtons({
  onSelectPreset,
  activePresetId,
  loadingPresetId,
  isLoading,
}: PresetButtonsProps) {
  const { t } = useLanguage();

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>{t.curatedDestinations}</span>
        </label>
        <span className="text-[11px] text-slate-400">{t.curatedSubtitle}</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-2">
        {PRESET_LOCATIONS.map((preset) => {
          const isActive = activePresetId === preset.id;
          const isThisLoading = loadingPresetId === preset.id && isLoading;
          const localizedBadge = t.presets[preset.id]?.badge || preset.badge;

          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              disabled={isLoading}
              className={`w-full text-left p-3 rounded-xl border transition-all duration-200 flex items-start justify-between gap-3 group relative overflow-hidden cursor-pointer ${
                isActive
                  ? 'bg-indigo-950/70 border-indigo-500/80 shadow-md ring-1 ring-indigo-500/50'
                  : 'bg-slate-800/50 hover:bg-slate-800 border-slate-700/60 hover:border-slate-600 text-slate-200'
              } ${isLoading && !isThisLoading ? 'opacity-60 cursor-not-allowed' : ''}`}
            >
              {/* Subtle active left accent bar */}
              {isActive && (
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500" />
              )}

              <div className="flex items-start gap-2.5 min-w-0">
                <span className="text-xl shrink-0 select-none" role="img" aria-label={preset.country}>
                  {preset.flag}
                </span>

                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-sm text-slate-100 group-hover:text-indigo-300 transition truncate">
                      {preset.name}
                    </span>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-700/60 text-slate-300">
                      {preset.countryCode}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 truncate mt-0.5">
                    {localizedBadge} • {preset.country}
                  </p>
                </div>
              </div>

              <div className="shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-slate-700/40 text-slate-400 group-hover:text-indigo-400 group-hover:bg-indigo-900/30 transition">
                {isThisLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin text-indigo-400" />
                ) : (
                  <Navigation2 className={`w-3.5 h-3.5 transition ${isActive ? 'text-indigo-400 rotate-45' : 'group-hover:rotate-45'}`} />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
