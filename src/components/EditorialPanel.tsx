/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PresetLocation, GeocodeResult, TroubleshootingInfo } from '../types/geocoding';
import { SearchBar } from './SearchBar';
import { PresetButtons } from './PresetButtons';
import { ErrorDisplay } from './ErrorDisplay';
import { LocationDetails } from './LocationDetails';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../i18n/LanguageContext';
import { Compass, Globe, MapPin, Activity, History } from 'lucide-react';

interface EditorialPanelProps {
  onSearch: (query: string) => void;
  onSelectPreset: (preset: PresetLocation) => void;
  activePresetId: string | null;
  loadingPresetId: string | null;
  isLoading: boolean;
  currentResult: GeocodeResult | null;
  errorMessage: string | null;
  errorStatus?: string;
  troubleshooting?: TroubleshootingInfo;
  onRetry: () => void;
  onDismissError: () => void;
  onFlyToCurrent: () => void;
  recentSearches: string[];
  history: Array<{ title: string; result: GeocodeResult }>;
  onSelectHistory: (result: GeocodeResult) => void;
}

export function EditorialPanel({
  onSearch,
  onSelectPreset,
  activePresetId,
  loadingPresetId,
  isLoading,
  currentResult,
  errorMessage,
  errorStatus,
  troubleshooting,
  onRetry,
  onDismissError,
  onFlyToCurrent,
  recentSearches,
  history,
  onSelectHistory,
}: EditorialPanelProps) {
  const { t } = useLanguage();

  return (
    <aside className="w-full md:w-1/3 lg:w-[420px] xl:w-[450px] h-full flex flex-col bg-slate-900 border-r border-slate-800 text-slate-100 shadow-2xl z-20 overflow-y-auto">
      {/* Brand Header */}
      <div className="p-4 sm:p-5 border-b border-slate-800/80 bg-slate-900/90 sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-cyan-400 flex items-center justify-center shadow-lg shadow-indigo-500/25 ring-1 ring-white/20 shrink-0">
              <Compass className="w-5 h-5 text-white animate-spin-slow" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-lg text-white tracking-tight truncate">
                  {t.appTitle}
                </h1>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-900/70 text-indigo-300 border border-indigo-700/60 shrink-0">
                  {t.apiBadge}
                </span>
              </div>
              <p className="text-xs text-slate-400 truncate">{t.appSubtitle}</p>
            </div>
          </div>

          {/* Language Switcher Button */}
          <div className="flex items-center gap-2 shrink-0">
            <LanguageToggle />
            <div className="hidden lg:flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-950/60 border border-emerald-800/60 text-emerald-400 text-[10px] font-medium">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{t.liveStatus}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Scrollable Content */}
      <div className="p-5 flex flex-col gap-6 flex-1">
        {/* Search Section */}
        <section className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5 text-indigo-400" />
              <span>{t.searchAriaLabel}</span>
            </label>
            <span className="text-[10px] font-mono text-slate-400">
              Geocoding v4 API
            </span>
          </div>
          <SearchBar
            onSearch={onSearch}
            isLoading={isLoading}
            recentSearches={recentSearches}
          />
        </section>

        {/* Error Notification with Troubleshooting Mechanism */}
        {errorMessage && (
          <section>
            <ErrorDisplay
              errorMessage={errorMessage}
              errorStatus={errorStatus}
              troubleshooting={troubleshooting}
              onRetry={onRetry}
              onDismiss={onDismissError}
            />
          </section>
        )}

        {/* Selected Geocoded Location Detail Card */}
        {currentResult && (
          <section className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-300 tracking-wider uppercase flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>{t.activeCoordinates}</span>
              </label>
              <span className="text-[11px] text-slate-400">Active</span>
            </div>
            <LocationDetails
              result={currentResult}
              onFlyTo={onFlyToCurrent}
              troubleshooting={troubleshooting}
            />
          </section>
        )}

        {/* 5 Presets Section */}
        <section>
          <PresetButtons
            onSelectPreset={onSelectPreset}
            activePresetId={activePresetId}
            loadingPresetId={loadingPresetId}
            isLoading={isLoading}
          />
        </section>

        {/* Exploration History */}
        {history.length > 1 && (
          <section className="flex flex-col gap-2 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase flex items-center gap-1.5">
                <History className="w-3.5 h-3.5" />
                <span>{t.searchHistory}</span>
              </label>
              <span className="text-[10px] text-slate-400">{history.length}</span>
            </div>
            <div className="flex flex-col gap-1.5">
              {history.slice(0, 5).map((item, idx) => (
                <button
                  key={`${item.title}-${idx}`}
                  onClick={() => onSelectHistory(item.result)}
                  className="w-full text-left px-3 py-2 rounded-xl bg-slate-800/40 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-xs text-slate-300 hover:text-white transition flex items-center justify-between group cursor-pointer"
                >
                  <span className="truncate pr-2">{item.title}</span>
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-indigo-400 shrink-0">
                    {item.result.location.latitude.toFixed(2)}°, {item.result.location.longitude.toFixed(2)}°
                  </span>
                </button>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-950/60 text-slate-400 text-[11px] flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-indigo-400" />
          <span>Google Maps Platform</span>
        </div>
        <span className="font-mono text-[10px] text-slate-400">@vis.gl/react-google-maps</span>
      </div>
    </aside>
  );
}
