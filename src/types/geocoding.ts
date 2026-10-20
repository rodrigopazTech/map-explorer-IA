/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface LatLngPoint {
  latitude: number;
  longitude: number;
}

export interface ViewportBounds {
  low: LatLngPoint;
  high: LatLngPoint;
}

export interface AddressComponent {
  longText: string;
  shortText: string;
  types: string[];
  languageCode?: string;
}

export interface GeocodeResult {
  place?: string;
  placeId?: string;
  location: LatLngPoint;
  granularity?: string;
  viewport?: ViewportBounds;
  bounds?: ViewportBounds;
  formattedAddress: string;
  addressComponents?: AddressComponent[];
  types?: string[];
}

export interface GeocodeV4Response {
  results?: GeocodeResult[];
  error?: {
    code: number;
    message: string;
    status: string;
    details?: Array<{
      '@type': string;
      fieldViolations?: Array<{ description: string }>;
    }>;
  };
}

export interface PresetLocation {
  id: string;
  name: string;
  query: string;
  country: string;
  countryCode: string;
  flag: string;
  badge: string;
  description: string;
}

export interface TroubleshootingInfo {
  requestUrl: string;
  method: string;
  timestamp: string;
  httpStatus?: number;
  statusText?: string;
  errorStatus?: string;
  errorMessage?: string;
  rawPayload?: any;
}
