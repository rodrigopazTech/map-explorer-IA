/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import {
  AdvancedMarker,
  InfoWindow,
  useAdvancedMarkerRef,
} from '@vis.gl/react-google-maps';
import { GeocodeResult } from '../types/geocoding';
import { MapPin, Navigation, ExternalLink, Check, Copy } from 'lucide-react';

interface CustomMarkerProps {
  result: GeocodeResult;
}

export function CustomMarker({ result }: CustomMarkerProps) {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const { latitude, longitude } = result.location;

  const handleCopyCoords = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <>
      <AdvancedMarker
        ref={markerRef}
        position={{ lat: latitude, lng: longitude }}
        onClick={() => setIsOpen(!isOpen)}
        title={result.formattedAddress}
      >
        <div className="relative flex flex-col items-center group cursor-pointer -translate-y-8 select-none">
          {/* Animated ground pulse ring */}
          <div className="absolute -bottom-1 w-6 h-6 rounded-full bg-indigo-500/40 animate-ping" />
          <div className="absolute -bottom-0.5 w-3 h-3 rounded-full bg-indigo-400 shadow-md ring-2 ring-white" />

          {/* Floating Pill Badge */}
          <div className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/95 text-white text-xs font-semibold shadow-2xl border border-indigo-500/50 backdrop-blur-md transition-all duration-200 group-hover:scale-105 group-hover:border-indigo-400 group-hover:bg-slate-900 group-hover:shadow-indigo-500/25">
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="max-w-[140px] truncate text-[11px] tracking-wide text-slate-100">
              {result.addressComponents?.[0]?.longText || result.formattedAddress.split(',')[0]}
            </span>
            <MapPin className="w-3 h-3 text-indigo-400 shrink-0" />
          </div>

          {/* Pin Stem Indicator */}
          <div className="w-0.5 h-3 bg-gradient-to-b from-indigo-500 to-transparent" />
        </div>
      </AdvancedMarker>

      {isOpen && (
        <InfoWindow
          anchor={marker}
          onCloseClick={() => setIsOpen(false)}
          className="custom-gmp-infowindow"
        >
          <div className="p-1 max-w-[280px] text-slate-800 font-sans">
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="inline-flex items-center justify-center p-1 rounded bg-indigo-100 text-indigo-700">
                <Navigation className="w-3.5 h-3.5" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full border border-indigo-200/60">
                {result.granularity || 'Geocoded Target'}
              </span>
            </div>

            <h4 className="text-xs font-bold text-slate-900 leading-snug mb-2">
              {result.formattedAddress}
            </h4>

            <div className="bg-slate-100 rounded-md p-2 mb-2.5 font-mono text-[11px] text-slate-700 flex items-center justify-between border border-slate-200/80">
              <span>
                {latitude.toFixed(5)}°, {longitude.toFixed(5)}°
              </span>
              <button
                onClick={handleCopyCoords}
                className="text-slate-500 hover:text-indigo-600 p-0.5 rounded transition"
                title="Copy coordinates"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-slate-200/70 text-[11px]">
              <span className="text-slate-500 text-[10px]">Google Geocoding V4</span>
              <a
                href={gmapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-indigo-600 hover:text-indigo-700 hover:underline"
              >
                View in Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </InfoWindow>
      )}
    </>
  );
}
