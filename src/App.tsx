/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { APIProvider } from '@vis.gl/react-google-maps';
import { GeocodeResult, PresetLocation, TroubleshootingInfo } from './types/geocoding';
import { PRESET_LOCATIONS } from './data/presets';
import { geocodeWithV4, GeocodeError } from './services/geocodingService';
import { fetchLocalInsights, extractCityAndState } from './services/geminiService';
import { EditorialPanel } from './components/EditorialPanel';
import { MapExplorer } from './components/MapExplorer';
import { LocalKnowledgeQuizModal } from './components/LocalKnowledgeQuizModal';
import { LanguageToggle } from './components/LanguageToggle';
import { useLanguage } from './i18n/LanguageContext';
import { Map as MapIcon, Sliders, AlertCircle } from 'lucide-react';

export default function App() {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const { language, t } = useLanguage();

  const [currentResult, setCurrentResult] = useState<GeocodeResult | null>(null);
  const [activePresetId, setActivePresetId] = useState<string | null>('buenos-aires');
  const [loadingPresetId, setLoadingPresetId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastQuery, setLastQuery] = useState<string>('Buenos Aires, Argentina');

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorStatus, setErrorStatus] = useState<string | undefined>(undefined);
  const [troubleshooting, setTroubleshooting] = useState<TroubleshootingInfo | undefined>(undefined);

  const [mapType, setMapType] = useState<'roadmap' | 'satellite' | 'hybrid' | 'terrain'>('roadmap');
  const [flyToCounter, setFlyToCounter] = useState<number>(0);

  // Gemini Local Insights State
  const [insightsLocation, setInsightsLocation] = useState<string>('');
  const [insightsHtml, setInsightsHtml] = useState<string | null>(null);
  const [insightsModel, setInsightsModel] = useState<string>('gemini-3.8-flash');
  const [isInsightsLoading, setIsInsightsLoading] = useState<boolean>(false);
  const [insightsError, setInsightsError] = useState<string | null>(null);

  // Gemini Local Knowledge Quiz Modal State
  const [isQuizOpen, setIsQuizOpen] = useState<boolean>(false);

  const [recentSearches, setRecentSearches] = useState<string[]>([
    'Buenos Aires',
    'Shibuya',
    'Copacabana',
    'Cologne',
    'Lima',
  ]);
  const [history, setHistory] = useState<Array<{ title: string; result: GeocodeResult }>>([]);

  // Mobile layout tab: 'panel' or 'map'
  const [mobileTab, setMobileTab] = useState<'panel' | 'map'>('map');

  // Request counter to avoid race conditions with out-of-order responses
  const activeInsightsRequestRef = useRef<number>(0);

  const triggerGeminiInsights = useCallback(
    async (location: string, lang = language) => {
      if (!location) return;

      const requestId = ++activeInsightsRequestRef.current;
      setInsightsLocation(location);
      setIsInsightsLoading(true);
      setInsightsError(null);
      setInsightsHtml(null);

      try {
        const result = await fetchLocalInsights(location, lang);
        if (requestId === activeInsightsRequestRef.current) {
          setInsightsHtml(result.html);
          if (result.modelUsed) {
            setInsightsModel(result.modelUsed);
          }
          setInsightsError(null);
        }
      } catch (err: any) {
        if (requestId === activeInsightsRequestRef.current) {
          console.error('Gemini Insights error:', err);
          setInsightsError(
            err?.message ||
              `Unable to generate tour guide insights for ${location}. Please try again.`
          );
        }
      } finally {
        if (requestId === activeInsightsRequestRef.current) {
          setIsInsightsLoading(false);
        }
      }
    },
    [language]
  );

  // Whenever user changes language, re-fetch insights in that language!
  useEffect(() => {
    if (insightsLocation) {
      triggerGeminiInsights(insightsLocation, language);
    }
  }, [language]);

  const executeGeocode = useCallback(
    async (query: string, presetId: string | null = null) => {
      setIsLoading(true);
      setErrorMessage(null);
      setErrorStatus(undefined);
      setLastQuery(query);
      if (presetId) {
        setLoadingPresetId(presetId);
      }

      try {
        const { activeResult, troubleshooting: diagInfo } = await geocodeWithV4(query, apiKey);
        setCurrentResult(activeResult);
        setTroubleshooting(diagInfo);
        setActivePresetId(presetId);

        // Update recent searches list
        const cleanTitle = query.split(',')[0].trim();
        setRecentSearches((prev) => [cleanTitle, ...prev.filter((item) => item !== cleanTitle)].slice(0, 6));

        // Update history
        setHistory((prev) => [{ title: activeResult.formattedAddress, result: activeResult }, ...prev]);

        // Auto-glide camera to the new result
        setFlyToCounter((c) => c + 1);

        // Auto-switch to Map tab on mobile so user sees the result immediately
        setMobileTab('map');

        // Trigger Gemini Local Insights in current language
        const locationName = extractCityAndState(activeResult);
        triggerGeminiInsights(locationName, language);
      } catch (err: any) {
        if (err instanceof GeocodeError) {
          setErrorMessage(err.message);
          setErrorStatus(err.status);
          setTroubleshooting(err.troubleshooting);
        } else {
          setErrorMessage(err?.message || 'An unexpected error occurred while geocoding.');
        }
      } finally {
        setIsLoading(false);
        setLoadingPresetId(null);
      }
    },
    [apiKey, language, triggerGeminiInsights]
  );

  // Initial geocode for default preset (Buenos Aires)
  useEffect(() => {
    const defaultPreset = PRESET_LOCATIONS[0];
    executeGeocode(defaultPreset.query, defaultPreset.id);
  }, []);

  const handleSearch = (query: string) => {
    executeGeocode(query, null);
  };

  const handleSelectPreset = (preset: PresetLocation) => {
    executeGeocode(preset.query, preset.id);
  };

  const handleRetry = () => {
    executeGeocode(lastQuery, activePresetId);
  };

  const handleDismissError = () => {
    setErrorMessage(null);
    setErrorStatus(undefined);
    setTroubleshooting(undefined);
  };

  const handleFlyToCurrent = () => {
    setFlyToCounter((c) => c + 1);
    setMobileTab('map');
  };

  const handleSelectHistory = (result: GeocodeResult) => {
    setCurrentResult(result);
    setFlyToCounter((c) => c + 1);
    setMobileTab('map');
    const locationName = extractCityAndState(result);
    triggerGeminiInsights(locationName, language);
  };

  const handleRetryInsights = () => {
    if (insightsLocation) {
      triggerGeminiInsights(insightsLocation, language);
    }
  };

  const handleDismissInsights = () => {
    setInsightsLocation('');
    setInsightsHtml(null);
    setInsightsError(null);
  };

  if (!apiKey) {
    return (
      <div className="w-screen h-screen flex items-center justify-center bg-slate-950 p-6 text-slate-100 font-sans">
        <div className="max-w-md w-full bg-slate-900 border border-rose-900/60 rounded-3xl p-8 shadow-2xl flex flex-col items-center text-center gap-4">
          <div className="p-4 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">API Key Configuration Needed</h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            The application requires a valid Google Maps Platform API key in{' '}
            <code className="text-indigo-400 bg-slate-800 px-1.5 py-0.5 rounded">VITE_GOOGLE_MAPS_API_KEY</code> to access the Geocoding V4 REST API and interactive map.
          </p>
        </div>
      </div>
    );
  }

  return (
    <APIProvider apiKey={apiKey} libraries={['core', 'maps', 'marker']}>
      <div className="w-screen h-screen overflow-hidden flex flex-col md:flex-row bg-slate-950 font-sans">
        {/* Mobile Tab Toggle (< md) */}
        <div className="md:hidden flex items-center justify-between bg-slate-900 border-b border-slate-800 px-3 py-2 z-30 shrink-0 gap-2">
          <div className="flex items-center gap-1">
            <button
              onClick={() => setMobileTab('panel')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                mobileTab === 'panel'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t.tabPanel}</span>
            </button>
            <button
              onClick={() => setMobileTab('map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                mobileTab === 'map'
                  ? 'bg-indigo-600 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>{t.tabMap}</span>
              {currentResult && (
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              )}
            </button>
          </div>

          <LanguageToggle />
        </div>

        {/* 1/3-width Left Editorial Control Panel */}
        <div
          className={`${
            mobileTab === 'panel' ? 'block' : 'hidden'
          } md:block h-[calc(100vh-53px)] md:h-screen w-full md:w-1/3 lg:w-[420px] xl:w-[450px] shrink-0`}
        >
          <EditorialPanel
            onSearch={handleSearch}
            onSelectPreset={handleSelectPreset}
            activePresetId={activePresetId}
            loadingPresetId={loadingPresetId}
            isLoading={isLoading}
            currentResult={currentResult}
            errorMessage={errorMessage}
            errorStatus={errorStatus}
            troubleshooting={troubleshooting}
            onRetry={handleRetry}
            onDismissError={handleDismissError}
            onFlyToCurrent={handleFlyToCurrent}
            recentSearches={recentSearches}
            history={history}
            onSelectHistory={handleSelectHistory}
          />
        </div>

        {/* 2/3-width Right Interactive Map */}
        <main
          className={`${
            mobileTab === 'map' ? 'block' : 'hidden'
          } md:block flex-1 h-[calc(100vh-53px)] md:h-screen relative`}
        >
          <MapExplorer
            currentResult={currentResult}
            mapType={mapType}
            setMapType={setMapType}
            flyToCounter={flyToCounter}
            onFlyToCurrent={handleFlyToCurrent}
            insightsLocation={insightsLocation}
            insightsHtml={insightsHtml}
            insightsModel={insightsModel}
            isInsightsLoading={isInsightsLoading}
            insightsError={insightsError}
            onRetryInsights={handleRetryInsights}
            onDismissInsights={handleDismissInsights}
            onOpenQuiz={() => setIsQuizOpen(true)}
          />
        </main>
      </div>

      {/* Local Knowledge Trivia Quiz Modal */}
      <LocalKnowledgeQuizModal
        location={insightsLocation || (currentResult ? extractCityAndState(currentResult) : 'Current Location')}
        coordinates={currentResult?.location}
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
      />
    </APIProvider>
  );
}
