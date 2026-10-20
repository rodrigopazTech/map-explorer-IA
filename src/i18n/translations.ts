/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'es';

export interface Translations {
  // Brand Header
  appTitle: string;
  appSubtitle: string;
  apiBadge: string;
  liveStatus: string;

  // Language Switcher
  languageName: string;
  switchLanguage: string;

  // Search Bar
  searchPlaceholder: string;
  searchButton: string;
  searchingButton: string;
  searchAriaLabel: string;
  clearSearch: string;

  // Presets Section
  curatedDestinations: string;
  curatedSubtitle: string;

  // Preset items
  presets: Record<
    string,
    {
      badge: string;
      description: string;
    }
  >;

  // Recent & History
  recentSearches: string;
  recentSearchesEmpty: string;
  searchHistory: string;
  searchHistoryEmpty: string;
  clearHistory: string;

  // Location Details
  locationDetailsTitle: string;
  coordinates: string;
  latitude: string;
  longitude: string;
  viewportBounds: string;
  highNorthEast: string;
  lowSouthWest: string;
  locationType: string;
  placeId: string;
  formattedAddress: string;
  centerAndGlide: string;
  copiedCoordinates: string;
  copyCoordinates: string;

  // Map Controls
  mapType: string;
  roadmap: string;
  satellite: string;
  hybrid: string;
  terrain: string;
  centerMarker: string;
  streetViewAvailable: string;
  activeCoordinates: string;

  // Local Insights Banner
  localInsightsTitle: string;
  tourGuideSecretsFor: string;
  curatedFunFacts: string;
  aiTourGuideResponse: string;
  retry: string;
  testKnowledgeButton: string;
  minimizingBanner: string;
  expandBanner: string;
  insightsLoading: string;
  insightsLoadingHyperlocal: string;
  unableToLoadFacts: string;

  // Model Badges
  modelGeminiFlash: string;
  modelGeminiFlashLiteFailover: string;
  modelGeminiFlashFailover: string;
  modelCuratedArchive: string;

  // Quiz Modal
  quizModalTitle: string;
  quizModalSubtitle: string;
  hyperlocalMode: string;
  hyperlocalModeSubtitle: string;
  expertModeBadge: string;
  standardBadge: string;
  hyperlocalInfoTitleDifficulty: string;
  hyperlocalInfoDescDifficulty: string;
  hyperlocalInfoTitleHow: string;
  hyperlocalInfoDescHow: string;
  howHyperlocalWorksTooltip: string;
  chooseYourTopic: string;
  chooseYourTopicDesc: string;

  // Categories
  categories: {
    cuisineTitle: string;
    cuisineDesc: string;
    artTitle: string;
    artDesc: string;
    historyTitle: string;
    historyDesc: string;
  };

  // Quiz Gameplay
  answeredProgress: string;
  scoreLabel: string;
  scoreLegendHyperlocal: string;
  scoreMaster: string;
  scoreExplorer: string;
  scoreKeepExploring: string;
  correctBadge: string;
  incorrectBadge: string;
  answerInsightTitle: string;
  groundedLocationsTitle: string;
  changeCategoryButton: string;
  submitAnswersButton: string;
  chooseDifferentCategoryButton: string;
  doneExploringButton: string;
  loadingQuizStandard: string;
  loadingQuizHyperlocal: string;

  // Mobile Tabs
  tabPanel: string;
  tabMap: string;

  // Errors & Troubleshooting
  errorTitle: string;
  errorDismiss: string;
  troubleshootingTitle: string;
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appTitle: 'Block Explorer',
    appSubtitle: 'Geospatial Exploration Engine',
    apiBadge: 'V4 REST',
    liveStatus: 'Ready',

    languageName: 'English',
    switchLanguage: 'Cambiar a Español',

    searchPlaceholder: 'Search any city, district, street, or landmark...',
    searchButton: 'Explore',
    searchingButton: 'Resolving...',
    searchAriaLabel: 'Search destination',
    clearSearch: 'Clear input',

    curatedDestinations: 'Featured Districts',
    curatedSubtitle: 'Instant high-resolution geocoding presets',

    presets: {
      'buenos-aires': {
        badge: 'Capital Metro',
        description: 'Vibrant cultural metropolis famed for wide boulevards, historic architecture, and the Plaza de Mayo.',
      },
      shibuya: {
        badge: 'Urban Epicenter',
        description: 'Bustling Tokyo district celebrated for its world-famous scramble crossing, high-energy fashion, and neon lights.',
      },
      copacabana: {
        badge: 'Coastal Icon',
        description: 'Iconic 4-kilometer crescent beach backed by granite peaks, mosaic promenades, and vibrant Atlantic surf.',
      },
      cologne: {
        badge: 'Rhine Heritage',
        description: 'Two-millennia-old landmark on the Rhine River crowned by the soaring twin spires of the Gothic Cologne Cathedral.',
      },
      lima: {
        badge: 'Pacific Cliffs',
        description: 'Dramatic coastal capital with sweeping ocean bluffs in Miraflores, historic viceregal palaces, and renowned gastronomy.',
      },
    },

    recentSearches: 'Recent Searches',
    recentSearchesEmpty: 'No recent searches yet',
    searchHistory: 'Session History',
    searchHistoryEmpty: 'Explore destinations to build history',
    clearHistory: 'Clear history',

    locationDetailsTitle: 'Geocoding V4 Telemetry',
    coordinates: 'Coordinates',
    latitude: 'Latitude',
    longitude: 'Longitude',
    viewportBounds: 'Viewport Recommended Bounds',
    highNorthEast: 'North-East (High)',
    lowSouthWest: 'South-West (Low)',
    locationType: 'Granularity Type',
    placeId: 'Google Place ID',
    formattedAddress: 'Resolved Postal Address',
    centerAndGlide: 'Center & Glide',
    copiedCoordinates: 'Copied!',
    copyCoordinates: 'Copy coordinates',

    mapType: 'Map Style',
    roadmap: 'Roadmap',
    satellite: 'Satellite',
    hybrid: 'Hybrid',
    terrain: 'Terrain',
    centerMarker: 'Re-center Marker',
    streetViewAvailable: 'Drag Pegman for Street View',
    activeCoordinates: 'Active Marker',

    localInsightsTitle: 'Local Insights',
    tourGuideSecretsFor: 'Tour Guide Secrets for',
    curatedFunFacts: 'Curated fun facts',
    aiTourGuideResponse: 'AI tour guide response',
    retry: 'Retry',
    testKnowledgeButton: 'Test their local knowledge',
    minimizingBanner: 'Minimize banner',
    expandBanner: 'Local Insights',
    insightsLoading: 'Consulting local tour guide for',
    insightsLoadingHyperlocal: 'Grounding with Google Maps Lite & tour guide for',
    unableToLoadFacts: 'Unable to load local facts',

    modelGeminiFlash: 'Gemini 3.8 Flash',
    modelGeminiFlashLiteFailover: 'Gemini 3.1 Flash-Lite (Failover)',
    modelGeminiFlashFailover: 'Gemini Flash (Failover)',
    modelCuratedArchive: 'Local Archive',

    quizModalTitle: 'Local Knowledge Challenge',
    quizModalSubtitle: 'Testing your expertise on',
    hyperlocalMode: 'Hyperlocal Mode',
    hyperlocalModeSubtitle: 'Increases quiz difficulty with Google Maps Grounding',
    expertModeBadge: 'Expert Mode',
    standardBadge: 'Standard',
    hyperlocalInfoTitleDifficulty: 'Why is it more difficult?',
    hyperlocalInfoDescDifficulty:
      'Standard mode tests recognizable city landmarks and famous regional culture. Hyperlocal Mode goes much deeper—testing exact cross streets, micro-district milestones, specific family-owned institutions, and obscure neighborhood folklore.',
    hyperlocalInfoTitleHow: 'How does it work?',
    hyperlocalInfoDescHow:
      'When enabled, Block Explorer invokes the Google Maps Grounding Lite service with the Gemini API. It supplies the exact geocoded geographic coordinates of the current location to fetch authentic, verified place data and generate challenging insider questions.',
    howHyperlocalWorksTooltip: 'How Hyperlocal Mode works',
    chooseYourTopic: 'Choose your topic',
    chooseYourTopicDesc: 'Select one of the 3 themes to generate your 3-question trivia challenge',

    categories: {
      cuisineTitle: 'Local Cuisine',
      cuisineDesc: 'Iconic street food, regional delicacies, culinary rituals, and flavors.',
      artTitle: 'Art & Culture',
      artDesc: 'Architecture, music, folklore, street arts, and cultural landmarks.',
      historyTitle: 'Local History',
      historyDesc: 'Founding stories, historical revolutions, heritage monuments, and milestones.',
    },

    answeredProgress: 'answered',
    scoreLabel: 'Score',
    scoreLegendHyperlocal: 'Hyperlocal Legend! 🏆🔥',
    scoreMaster: 'Local Master! 🏆',
    scoreExplorer: 'Great Explorer! 🌟',
    scoreKeepExploring: 'Keep Exploring! 🧭',
    correctBadge: 'Correct',
    incorrectBadge: 'Incorrect',
    answerInsightTitle: 'Answer insight:',
    groundedLocationsTitle: 'Google Maps Grounded Locations',
    changeCategoryButton: 'Change Category',
    submitAnswersButton: 'Submit Answers',
    chooseDifferentCategoryButton: 'Choose Different Category',
    doneExploringButton: 'Done Exploring',
    loadingQuizStandard: 'Crafting custom questions for',
    loadingQuizHyperlocal: 'Grounding with Google Maps Lite & crafting Hyperlocal questions for',

    tabPanel: 'Controls',
    tabMap: 'Map View',

    errorTitle: 'Geocoding Resolution Error',
    errorDismiss: 'Dismiss notification',
    troubleshootingTitle: 'Diagnostic Troubleshooting',
  },

  es: {
    appTitle: 'Block Explorer',
    appSubtitle: 'Motor de Exploración Geoespacial',
    apiBadge: 'REST V4',
    liveStatus: 'Listo',

    languageName: 'Español',
    switchLanguage: 'Switch to English',

    searchPlaceholder: 'Busca cualquier ciudad, barrio, calle o monumento...',
    searchButton: 'Explorar',
    searchingButton: 'Resolviendo...',
    searchAriaLabel: 'Buscar destino',
    clearSearch: 'Limpiar búsqueda',

    curatedDestinations: 'Destinos Destacados',
    curatedSubtitle: 'Lugares preconfigurados con geocodificación de alta precisión',

    presets: {
      'buenos-aires': {
        badge: 'Metrópolis Capital',
        description: 'Vibrante metrópolis cultural famosa por sus amplias avenidas, arquitectura histórica y la Plaza de Mayo.',
      },
      shibuya: {
        badge: 'Epicentro Urbano',
        description: 'Bullicioso distrito de Tokio famoso por su cruce peatonal de fama mundial, moda vanguardista y luces de neón.',
      },
      copacabana: {
        badge: 'Ícono Costero',
        description: 'Mítica playa de 4 km en medialuna rodeada de morros de granito, mosaicos ondeados y el oleaje del Atlántico.',
      },
      cologne: {
        badge: 'Herencia del Rin',
        description: 'Ciudad bimilenaria a orillas del río Rin coronada por las imponentes agujas góticas de la Catedral de Colonia.',
      },
      lima: {
        badge: 'Acantilados del Pacífico',
        description: 'Impresionante capital costera con acantilados en Miraflores, palacios virreinales históricos y gastronomía de renombre mundial.',
      },
    },

    recentSearches: 'Búsquedas Recientes',
    recentSearchesEmpty: 'Aún no hay búsquedas recientes',
    searchHistory: 'Historial de Sesión',
    searchHistoryEmpty: 'Explora destinos para registrar historial',
    clearHistory: 'Borrar historial',

    locationDetailsTitle: 'Telemetría Geocoding V4',
    coordinates: 'Coordenadas',
    latitude: 'Latitud',
    longitude: 'Longitud',
    viewportBounds: 'Límites Recomendados de Vista (Bounds)',
    highNorthEast: 'Nororiente (Alto)',
    lowSouthWest: 'Suroccidente (Bajo)',
    locationType: 'Tipo de Granularidad',
    placeId: 'Google Place ID',
    formattedAddress: 'Dirección Postal Resuelta',
    centerAndGlide: 'Centrar y Deslizar',
    copiedCoordinates: '¡Copiado!',
    copyCoordinates: 'Copiar coordenadas',

    mapType: 'Estilo de Mapa',
    roadmap: 'Mapa',
    satellite: 'Satélite',
    hybrid: 'Híbrido',
    terrain: 'Relieve',
    centerMarker: 'Re-centrar Marcador',
    streetViewAvailable: 'Arrastra a Pegman para Street View',
    activeCoordinates: 'Marcador Activo',

    localInsightsTitle: 'Secretos Locales',
    tourGuideSecretsFor: 'Secretos de Guía Turística para',
    curatedFunFacts: 'Datos curiosos seleccionados',
    aiTourGuideResponse: 'Respuesta generada por guía IA',
    retry: 'Reintentar',
    testKnowledgeButton: 'Pon a prueba tus conocimientos locales',
    minimizingBanner: 'Minimizar banner',
    expandBanner: 'Secretos Locales',
    insightsLoading: 'Consultando al guía turístico local para',
    insightsLoadingHyperlocal: 'Verificando con Google Maps Lite y guía local para',
    unableToLoadFacts: 'No se pudieron cargar los datos locales',

    modelGeminiFlash: 'Gemini 3.8 Flash',
    modelGeminiFlashLiteFailover: 'Gemini 3.1 Flash-Lite (Respaldo)',
    modelGeminiFlashFailover: 'Gemini Flash (Respaldo)',
    modelCuratedArchive: 'Archivo Local',

    quizModalTitle: 'Desafío de Conocimiento Local',
    quizModalSubtitle: 'Poniendo a prueba tu experiencia en',
    hyperlocalMode: 'Modo Hiperlocal',
    hyperlocalModeSubtitle: 'Aumenta la dificultad del quiz con Google Maps Grounding',
    expertModeBadge: 'Modo Experto',
    standardBadge: 'Estándar',
    hyperlocalInfoTitleDifficulty: '¿Por qué es más difícil?',
    hyperlocalInfoDescDifficulty:
      'El modo estándar evalúa monumentos famosos de la ciudad y cultura regional general. El Modo Hiperlocal profundiza en esquinas exactas, hitos microbarriales, negocios familiares tradicionales y mitos y anécdotas barriales poco conocidos.',
    hyperlocalInfoTitleHow: '¿Cómo funciona?',
    hyperlocalInfoDescHow:
      'Al activarlo, Block Explorer invoca el servicio Google Maps Grounding Lite junto con la API de Gemini. Envía las coordenadas geográficas exactas de la ubicación actual para consultar datos verificados y generar preguntas auténticas de verdadero conocedor local.',
    howHyperlocalWorksTooltip: 'Cómo funciona el Modo Hiperlocal',
    chooseYourTopic: 'Elige tu tema',
    chooseYourTopicDesc: 'Selecciona uno de los 3 temas para generar tu desafío de trivia de 3 preguntas',

    categories: {
      cuisineTitle: 'Gastronomía Local',
      cuisineDesc: 'Comida callejera icónica, especialidades regionales, rituales culinarios y sabores.',
      artTitle: 'Arte y Cultura',
      artDesc: 'Arquitectura, música, tradiciones populares, arte urbano y monumentos culturales.',
      historyTitle: 'Historia Local',
      historyDesc: 'Historias de fundación, gestas históricas, monumentos patrimoniales e hitos.',
    },

    answeredProgress: 'respondidas',
    scoreLabel: 'Puntaje',
    scoreLegendHyperlocal: '¡Leyenda Hiperlocal! 🏆🔥',
    scoreMaster: '¡Maestro Local! 🏆',
    scoreExplorer: '¡Gran Explorador! 🌟',
    scoreKeepExploring: '¡Sigue Explorando! 🧭',
    correctBadge: 'Correcto',
    incorrectBadge: 'Incorrecto',
    answerInsightTitle: 'Explicación del guía:',
    groundedLocationsTitle: 'Ubicaciones verificadas con Google Maps',
    changeCategoryButton: 'Cambiar Tema',
    submitAnswersButton: 'Enviar Respuestas',
    chooseDifferentCategoryButton: 'Elegir Otro Tema',
    doneExploringButton: 'Terminar Exploración',
    loadingQuizStandard: 'Creando preguntas personalizadas para',
    loadingQuizHyperlocal: 'Conectando con Google Maps Lite y creando preguntas Hiperlocales para',

    tabPanel: 'Controles',
    tabMap: 'Ver Mapa',

    errorTitle: 'Error de Geocodificación',
    errorDismiss: 'Cerrar notificación',
    troubleshootingTitle: 'Diagnóstico y Solución de Problemas',
  },
};
