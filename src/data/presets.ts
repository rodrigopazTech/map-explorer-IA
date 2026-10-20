/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { PresetLocation } from '../types/geocoding';

export const PRESET_LOCATIONS: PresetLocation[] = [
  {
    id: 'buenos-aires',
    name: 'Buenos Aires',
    query: 'Buenos Aires, Argentina',
    country: 'Argentina',
    countryCode: 'AR',
    flag: '🇦🇷',
    badge: 'Capital Metro',
    description: 'Vibrant cultural metropolis famed for wide boulevards, historic architecture, and the Plaza de Mayo.',
  },
  {
    id: 'shibuya',
    name: 'Shibuya',
    query: 'Shibuya, Tokyo, Japan',
    country: 'Japan',
    countryCode: 'JP',
    flag: '🇯🇵',
    badge: 'Urban Epicenter',
    description: 'Bustling Tokyo district celebrated for its world-famous scramble crossing, high-energy fashion, and neon lights.',
  },
  {
    id: 'copacabana',
    name: 'Copacabana',
    query: 'Copacabana, Rio de Janeiro, Brazil',
    country: 'Brazil',
    countryCode: 'BR',
    flag: '🇧🇷',
    badge: 'Coastal Icon',
    description: 'Iconic 4-kilometer crescent beach backed by granite peaks, mosaic promenades, and vibrant Atlantic surf.',
  },
  {
    id: 'cologne',
    name: 'Cologne',
    query: 'Cologne, Germany',
    country: 'Germany',
    countryCode: 'DE',
    flag: '🇩🇪',
    badge: 'Rhine Heritage',
    description: 'Two-millennia-old landmark on the Rhine River crowned by the soaring twin spires of the Gothic Cologne Cathedral.',
  },
  {
    id: 'lima',
    name: 'Lima',
    query: 'Lima, Peru',
    country: 'Peru',
    countryCode: 'PE',
    flag: '🇵🇪',
    badge: 'Pacific Cliffs',
    description: 'Dramatic coastal capital with sweeping ocean bluffs in Miraflores, historic viceregal palaces, and renowned gastronomy.',
  },
];
