/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';
import { useMap } from '@vis.gl/react-google-maps';
import { GeocodeResult } from '../types/geocoding';

interface MapCameraControllerProps {
  currentResult: GeocodeResult | null;
  mapType: 'roadmap' | 'satellite' | 'hybrid' | 'terrain';
  flyToCounter: number;
}

export function MapCameraController({
  currentResult,
  mapType,
  flyToCounter,
}: MapCameraControllerProps) {
  const map = useMap();
  const lastLocationRef = useRef<string | null>(null);

  // Sync map type
  useEffect(() => {
    if (!map) return;
    map.setMapTypeId(mapType);
  }, [map, mapType]);

  // Pan and fit bounds when new result or flyTo requested
  useEffect(() => {
    if (!map || !currentResult || !currentResult.location) return;

    const locationKey = `${currentResult.location.latitude},${currentResult.location.longitude}_${flyToCounter}`;

    const targetLat = currentResult.location.latitude;
    const targetLng = currentResult.location.longitude;

    if (currentResult.viewport) {
      const bounds = new google.maps.LatLngBounds(
        {
          lat: currentResult.viewport.low.latitude,
          lng: currentResult.viewport.low.longitude,
        },
        {
          lat: currentResult.viewport.high.latitude,
          lng: currentResult.viewport.high.longitude,
        }
      );

      // Smoothly pan to location first
      map.panTo({ lat: targetLat, lng: targetLng });

      // Delay fit bounds slightly for dramatic camera gliding effect
      const timer = window.setTimeout(() => {
        map.fitBounds(bounds, {
          top: 70,
          right: 70,
          bottom: 70,
          left: 70,
        });
      }, 100);

      lastLocationRef.current = locationKey;
      return () => clearTimeout(timer);
    } else {
      map.panTo({ lat: targetLat, lng: targetLng });
      map.setZoom(14);
      lastLocationRef.current = locationKey;
    }
  }, [map, currentResult, flyToCounter]);

  return null;
}
