/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { GeocodeResult, TroubleshootingInfo } from '../types/geocoding';
import { useLanguage } from '../i18n/LanguageContext';
import {
  MapPin,
  Compass,
  Copy,
  Check,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Maximize,
  Tag,
  Code2,
} from 'lucide-react';

interface LocationDetailsProps {
  result: GeocodeResult;
  onFlyTo: () => void;
  troubleshooting?: TroubleshootingInfo;
}

export function LocationDetails({
  result,
  onFlyTo,
  troubleshooting,
}: LocationDetailsProps) {
  const [copiedCoords, setCopiedCoords] = useState(false);
  const [showRawJson, setShowRawJson] = useState(false);
  const { t } = useLanguage();

  const { latitude, longitude } = result.location;

  const handleCopyCoords = () => {
    navigator.clipboard.writeText(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
    setCopiedCoords(true);
    setTimeout(() => setCopiedCoords(false), 2000);
  };

  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <div className="w-full bg-slate-850/80 border border-slate-700/80 rounded-2xl p-4 shadow-xl flex flex-col gap-3.5 backdrop-blur-md">
      {/* Top Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="p-2 rounded-xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
            <MapPin className="w-4 h-4 text-indigo-400" />
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded-full border border-indigo-800">
                {result.granularity || t.activeCoordinates}
              </span>
              {result.types?.[0] && (
                <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2 py-0.5 rounded-full">
                  {result.types[0].replace(/_/g, ' ')}
                </span>
              )}
            </div>
            <h3 className="text-base font-bold text-slate-100 leading-snug mt-1">
              {result.formattedAddress}
            </h3>
          </div>
        </div>
      </div>

      {/* Coordinate & Bounds Card */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400">{t.latitude}</span>
          <span className="text-sm font-bold font-mono text-slate-100 mt-0.5">
            {latitude.toFixed(6)}°
          </span>
        </div>

        <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 flex flex-col justify-between">
          <span className="text-[10px] font-mono uppercase text-slate-400">{t.longitude}</span>
          <span className="text-sm font-bold font-mono text-slate-100 mt-0.5">
            {longitude.toFixed(6)}°
          </span>
        </div>
      </div>

      {/* Address Components Chips */}
      {result.addressComponents && result.addressComponents.length > 0 && (
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Tag className="w-3 h-3 text-slate-500" /> {t.formattedAddress}
          </span>
          <div className="flex flex-wrap gap-1.5">
            {result.addressComponents.map((comp, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md bg-slate-800 text-[11px] text-slate-300 border border-slate-700/60"
                title={`Type: ${comp.types.join(', ')}`}
              >
                {comp.longText}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Viewport Bounds */}
      {result.viewport && (
        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800/80 text-[11px] font-mono text-slate-400">
          <div className="flex items-center justify-between mb-1 text-slate-300 font-sans font-semibold">
            <span className="flex items-center gap-1">
              <Maximize className="w-3 h-3 text-indigo-400" /> {t.viewportBounds}
            </span>
            <span className="text-[10px] text-indigo-400">Bounds</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div>
              {t.lowSouthWest}: {result.viewport.low.latitude.toFixed(3)}°, {result.viewport.low.longitude.toFixed(3)}°
            </div>
            <div>
              {t.highNorthEast}: {result.viewport.high.latitude.toFixed(3)}°, {result.viewport.high.longitude.toFixed(3)}°
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Buttons */}
      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={onFlyTo}
          className="flex-1 py-2 px-3 bg-indigo-600 hover:bg-indigo-500 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>{t.centerAndGlide}</span>
        </button>

        <button
          onClick={handleCopyCoords}
          className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-xl border border-slate-700 transition flex items-center justify-center gap-1.5 cursor-pointer"
          title={t.copyCoordinates}
        >
          {copiedCoords ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">{t.copiedCoordinates}</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>{t.copyCoordinates}</span>
            </>
          )}
        </button>

        <a
          href={gmapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl border border-slate-700 transition flex items-center justify-center cursor-pointer"
          title="Google Maps"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* JSON Inspector toggle */}
      <div className="pt-2 border-t border-slate-800">
        <button
          type="button"
          onClick={() => setShowRawJson(!showRawJson)}
          className="text-[11px] text-slate-400 hover:text-indigo-400 flex items-center justify-between w-full transition cursor-pointer"
        >
          <span className="flex items-center gap-1">
            <Code2 className="w-3 h-3" />
            <span>{showRawJson ? 'Hide JSON' : 'Inspect JSON'}</span>
          </span>
          {showRawJson ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {showRawJson && (
          <div className="mt-2 flex flex-col gap-1.5">
            {troubleshooting?.requestUrl && (
              <div className="text-[10px] font-mono text-slate-400 break-all bg-slate-900 p-2 rounded border border-slate-800">
                <span className="text-slate-500 uppercase font-bold block">Endpoint:</span>
                {troubleshooting.requestUrl.replace(/key=[^&]+/, 'key=REDACTED')}
              </div>
            )}
            <pre className="bg-slate-950 p-2.5 rounded-xl text-[10px] text-slate-300 overflow-x-auto max-h-48 border border-slate-800 font-mono select-all">
              {JSON.stringify(result, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
