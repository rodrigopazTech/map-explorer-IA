/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Map, useMap } from '@vis.gl/react-google-maps';
import { GeocodeResult } from '../types/geocoding';
import { CustomMarker } from './CustomMarker';
import { MapCameraController } from './MapCameraController';
import { LocalInsightsBanner } from './LocalInsightsBanner';
import { LanguageToggle } from './LanguageToggle';
import { useLanguage } from '../i18n/LanguageContext';
import {
  Layers,
  Compass,
  Globe,
  Mountain,
  ZoomIn,
  ZoomOut,
  MapPin,
} from 'lucide-react';

interface MapExplorerProps {
  currentResult: GeocodeResult | null;
  mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  setMapType: (type: 'roadmap' | 'satellite' | 'hybrid' | 'terrain') => void;
  flyToCounter: number;
  onFlyToCurrent: () => void;
  // Gemini Local Insights props
  insightsLocation: string;
  insightsHtml: string | null;
  insightsModel?: string;
  isInsightsLoading: boolean;
  insightsError: string | null;
  onRetryInsights: () => void;
  onDismissInsights: () => void;
  onOpenQuiz: () => void;
}

function MapControlsOverlay({
  currentResult,
  mapType,
  setMapType,
  onFlyToCurrent,
}: {
  currentResult: GeocodeResult | null;
  mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  setMapType: (type: 'roadmap' | 'satellite' | 'hybrid' | 'terrain') => void;
  onFlyToCurrent: () => void;
}) {
  const map = useMap();
  const [showStyleMenu, setShowStyleMenu] = useState(false);
  const [centerCoords] = useState<{ lat: number; lng: number } | null>(null);
  const { t } = useLanguage();

  const handleZoomIn = () => {
    if (map) {
      map.setZoom((map.getZoom() || 13) + 1);
    }
  };

  const handleZoomOut = () => {
    if (map) {
      map.setZoom((map.getZoom() || 13) - 1);
    }
  };

  const mapTypes = [
    { id: 'roadmap' as const, label: t.roadmap, icon: Globe },
    { id: 'satellite' as const, label: t.satellite, icon: Layers },
    { id: 'hybrid' as const, label: t.hybrid, icon: Layers },
    { id: 'terrain' as const, label: t.terrain, icon: Mountain },
  ];

  const currentLabel = mapTypes.find((m) => m.id === mapType)?.label || mapType;

  return (
    <>
      {/* Top Floating Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <LanguageToggle />
        {/* Style Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowStyleMenu(!showStyleMenu)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900/90 text-slate-100 text-xs font-semibold backdrop-blur-md border border-slate-700/70 shadow-xl hover:bg-slate-800 transition cursor-pointer"
            title={t.mapType}
          >
            <Layers className="w-4 h-4 text-indigo-400" />
            <span className="capitalize">{currentLabel}</span>
          </button>

          {showStyleMenu && (
            <div className="absolute right-0 mt-2 w-36 rounded-xl bg-slate-900/95 border border-slate-700/80 shadow-2xl backdrop-blur-lg p-1.5 flex flex-col gap-1 z-30">
              {mapTypes.map((type) => {
                const Icon = type.icon;
                const isSelected = mapType === type.id;
                return (
                  <button
                    key={type.id}
                    onClick={() => {
                      setMapType(type.id);
                      setShowStyleMenu(false);
                    }}
                    className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium text-left transition cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{type.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Recenter / Focus target button */}
        {currentResult && (
          <button
            onClick={onFlyToCurrent}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-600 text-white text-xs font-semibold shadow-xl hover:bg-indigo-500 active:scale-95 transition cursor-pointer"
            title={t.centerMarker}
          >
            <Compass className="w-4 h-4" />
            <span className="hidden sm:inline">{t.centerMarker}</span>
          </button>
        )}
      </div>

      {/* Bottom-Right Floating Zoom Controls */}
      <div className="absolute bottom-6 right-4 z-10 flex flex-col gap-1.5 bg-slate-900/90 backdrop-blur-md p-1 rounded-2xl border border-slate-700/70 shadow-2xl">
        <button
          onClick={handleZoomIn}
          className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-white transition active:scale-95 cursor-pointer"
          title="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <div className="h-px bg-slate-800 mx-1" />
        <button
          onClick={handleZoomOut}
          className="p-2.5 rounded-xl hover:bg-slate-800 text-slate-200 hover:text-white transition active:scale-95 cursor-pointer"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Top-Left Live Coordinate HUD */}
      <div className="absolute top-4 left-4 z-10 pointer-events-none hidden sm:flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-slate-900/85 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-300 shadow-xl">
        <div className="flex items-center gap-1.5 text-indigo-400">
          <MapPin className="w-3.5 h-3.5" />
          <span>GEO</span>
        </div>
        <span>
          LAT:{' '}
          <strong className="text-white">
            {centerCoords ? centerCoords.lat.toFixed(4) : currentResult?.location.latitude.toFixed(4) || '0.0000'}
          </strong>
        </span>
        <span>
          LNG:{' '}
          <strong className="text-white">
            {centerCoords ? centerCoords.lng.toFixed(4) : currentResult?.location.longitude.toFixed(4) || '0.0000'}
          </strong>
        </span>
      </div>
    </>
  );
}

export function MapExplorer({
  currentResult,
  mapType,
  setMapType,
  flyToCounter,
  onFlyToCurrent,
  insightsLocation,
  insightsHtml,
  insightsModel,
  isInsightsLoading,
  insightsError,
  onRetryInsights,
  onDismissInsights,
  onOpenQuiz,
}: MapExplorerProps) {
  const defaultCenter = currentResult?.location
    ? { lat: currentResult.location.latitude, lng: currentResult.location.longitude }
    : { lat: -34.6037, lng: -58.3821 };

  return (
    <div className="relative w-full h-full min-h-[400px] overflow-hidden bg-slate-950">
      <Map
        id="block-explorer-main-map"
        defaultCenter={defaultCenter}
        defaultZoom={13}
        mapId="DEMO_MAP_ID"
        internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
        gestureHandling="greedy"
        disableDefaultUI={false}
        zoomControl={false}
        mapTypeControl={false}
        streetViewControl={true}
        fullscreenControl={true}
        className="w-full h-full"
      >
        <MapCameraController
          currentResult={currentResult}
          mapType={mapType}
          flyToCounter={flyToCounter}
        />

        {currentResult && <CustomMarker result={currentResult} />}

        <MapControlsOverlay
          currentResult={currentResult}
          mapType={mapType}
          setMapType={setMapType}
          onFlyToCurrent={onFlyToCurrent}
        />
      </Map>

      {/* Floating Local Insights Banner at the bottom of the map screen */}
      <LocalInsightsBanner
        locationName={insightsLocation}
        insightsHtml={insightsHtml}
        modelUsed={insightsModel}
        isLoading={isInsightsLoading}
        errorMessage={insightsError}
        onRetry={onRetryInsights}
        onDismiss={onDismissInsights}
        onOpenQuiz={onOpenQuiz}
      />
    </div>
  );
}
