/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { GeocodeResult, GeocodeV4Response, TroubleshootingInfo } from '../types/geocoding';

export class GeocodeError extends Error {
  status?: string;
  statusCode?: number;
  troubleshooting?: TroubleshootingInfo;

  constructor(message: string, status?: string, statusCode?: number, troubleshooting?: TroubleshootingInfo) {
    super(message);
    this.name = 'GeocodeError';
    this.status = status;
    this.statusCode = statusCode;
    this.troubleshooting = troubleshooting;
  }
}

/**
 * Executes a geocoding request against the Google Geocoding V4 REST API.
 * Endpoint: https://geocode.googleapis.com/v4/geocode/address/{addressQuery}
 */
export async function geocodeWithV4(
  addressQuery: string,
  apiKey: string
): Promise<{
  results: GeocodeResult[];
  activeResult: GeocodeResult;
  troubleshooting: TroubleshootingInfo;
}> {
  const cleanQuery = addressQuery.trim();
  if (!cleanQuery) {
    throw new GeocodeError('Please enter a valid location, city, or neighborhood name.');
  }

  const directUrl = `https://geocode.googleapis.com/v4/geocode/address/${encodeURIComponent(cleanQuery)}?key=${apiKey}`;
  const timestamp = new Date().toISOString();

  let response: Response | null = null;
  let rawJson: any = null;
  let executedUrl = directUrl;

  try {
    // Primary request: Direct Geocoding V4 REST endpoint
    response = await fetch(directUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-Goog-Maps-Solution-ID': 'gmp_mcp_codeassist_v1_aistudio',
      },
    });

    const text = await response.text();
    try {
      rawJson = JSON.parse(text);
    } catch {
      rawJson = { text };
    }
  } catch (directErr: any) {
    // If browser CORS or network blocked direct REST call, attempt proxy fallback
    try {
      const proxyUrl = `/api/geocode?address=${encodeURIComponent(cleanQuery)}&key=${apiKey}`;
      executedUrl = proxyUrl;
      response = await fetch(proxyUrl, {
        headers: { 'Accept': 'application/json' },
      });
      const proxyText = await response.text();
      try {
        rawJson = JSON.parse(proxyText);
      } catch {
        rawJson = { text: proxyText };
      }
    } catch (fallbackErr: any) {
      const tsInfo: TroubleshootingInfo = {
        requestUrl: directUrl,
        method: 'GET',
        timestamp,
        errorMessage: directErr?.message || 'Network connection failed',
      };
      throw new GeocodeError(
        `Network error reaching Geocoding V4 API: ${directErr?.message || 'Failed to connect'}. Please verify your internet connection.`,
        'NETWORK_ERROR',
        0,
        tsInfo
      );
    }
  }

  const tsInfo: TroubleshootingInfo = {
    requestUrl: executedUrl,
    method: 'GET',
    timestamp,
    httpStatus: response.status,
    statusText: response.statusText,
    rawPayload: rawJson,
  };

  if (!response.ok) {
    const errorObj = (rawJson as GeocodeV4Response)?.error;
    const errorStatus = errorObj?.status || `HTTP_${response.status}`;
    let message = errorObj?.message || response.statusText || 'Geocoding request failed';

    if (response.status === 400) {
      message = `Invalid request: ${errorObj?.message || 'Check the location name formatting.'}`;
    } else if (response.status === 401 || response.status === 403) {
      message = `API key authorization error: ${errorObj?.message || 'Ensure your Google Maps API key has Geocoding API enabled.'}`;
    } else if (response.status === 429) {
      message = 'Geocoding API rate limit or quota exceeded. Please wait a moment and retry.';
    } else if (response.status === 404) {
      message = `No location found matching "${cleanQuery}".`;
    }

    tsInfo.errorStatus = errorStatus;
    tsInfo.errorMessage = message;
    throw new GeocodeError(message, errorStatus, response.status, tsInfo);
  }

  const data = rawJson as GeocodeV4Response;
  const results = data.results || [];

  if (!results || results.length === 0) {
    const message = `No coordinates returned for "${cleanQuery}". Try adding a city, state, or country name.`;
    tsInfo.errorMessage = message;
    throw new GeocodeError(message, 'ZERO_RESULTS', 200, tsInfo);
  }

  const activeResult = results[0];
  if (!activeResult.location || typeof activeResult.location.latitude !== 'number') {
    const message = 'The Geocoding V4 response did not contain geographic coordinates.';
    tsInfo.errorMessage = message;
    throw new GeocodeError(message, 'INVALID_COORDINATES', 200, tsInfo);
  }

  return {
    results,
    activeResult,
    troubleshooting: tsInfo,
  };
}
