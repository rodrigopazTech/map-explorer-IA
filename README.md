# 🌍 Map Explorer IA

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Google Maps Platform](https://img.shields.io/badge/Google_Maps-Platform-4285F4.svg?logo=googlemaps)](https://developers.google.com/maps)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-AI-8E75B2.svg?logo=googlegemini)](https://ai.google.dev/)

> **Map Explorer IA** es una aplicación web interactiva que fusiona la potencia geoespacial de **Google Maps Platform** y la API REST **Geocoding V4** con la inteligencia artificial generativa de **Google Gemini**. Permite explorar cualquier rincón del mundo, descubrir datos curiosos y secretos culturales poco conocidos, y poner a prueba los conocimientos del usuario con cuestionarios interactivos estándar e hiperlocales.

---

## 🌟 Características Destacadas

### 🔍 1. Geocodificación Avanzada (Google Geocoding V4 REST API)
- Búsqueda en tiempo real de cualquier ciudad, vecindario, calle o punto de interés del planeta.
- Extracción de datos geográficos de alta resolución:
  - Coordenadas de latitud y longitud con precisión de hasta 6 decimales.
  - Identificador único de lugar (`placeId`).
  - Desglose de componentes administrativos (localidad, estado/provincia, país, código postal).
  - Nivel de granularidad (`ROOFTOP`, `RANGE_INTERPOLATED`, `GEOMETRIC_CENTER`, `APPROXIMATE`).
- Animación de cámara dinámica (*Fly-to Glide*) con ajuste automático de límites visuales (*Viewport Bounding Box*).

### 🗺️ 2. Exploración Cartográfica Interactiva
- Visualización fluida y responsiva mediante `@vis.gl/react-google-maps`.
- Conmutador de estilos de mapa en tiempo real:
  - **Callejero** (*Roadmap*)
  - **Satélite** (*Satellite*)
  - **Híbrido** (*Hybrid*)
  - **Relieve** (*Terrain*)
- Marcador de posición personalizado (*Custom Pin*) con halo pulsante reactivo.

### 🤖 3. Guía Turístico Inteligente con Gemini AI
- Generación contextual instantánea de **3 secretos culturales poco conocidos** del destino explorado.
- Sistema de caché inteligente para evitar consultas repetitivas innecesarias.
- Identificación transparente del modelo de IA que respondió la consulta.

### 🧠 4. Trivia de Conocimiento Local y Modo Hiperlocal
- Desafío interactivo de 3 preguntas de opción múltiple con 3 ejes temáticos:
  - 🍲 **Gastronomía local**: platos autóctonos, comida callejera, maridajes tradicionales.
  - 🎨 **Arte y cultura**: arquitectura, música, festivales folclóricos y leyendas urbanas.
  - 🏛️ **Historia local**: hitos fundacionales, personajes históricos y metamorfosis urbanas.
- **Modo Hiperlocal (Nivel Experto)**:
  - Diseñado para verdaderos residentes y conocedores.
  - Utiliza las coordenadas geográficas exactas del punto seleccionado para generar preguntas sobre historia barrial, vida de esquinas emblemáticas e instituciones vecinales.
  - Proporciona retroalimentación explicativa y enlaces de fundamentación verificada (*Google Grounding Links*).

### 🔄 5. Cascada Automática de Modelos Gratuitos (*Failover Cascade*)
- El backend implementa un mecanismo de alternancia entre modelos gratuitos de Google Gemini:
  1. `gemini-3.8-flash` (Modelo principal de alta velocidad)
  2. `gemini-3.1-flash-lite` (Respaldo inmediato ante picos de demanda o error 503/429)
  3. `gemini-flash-latest` (Respaldo terciario)
  4. **Archivo curado local** (Garantiza servicio ininterrumpido en caso de desconexión)

### 🌐 6. Experiencia 100% Bilingüe (Español / Inglés)
- Selector de idioma visible `[ 🇺🇸 EN | 🇪🇸 ES ]` disponible en todo momento.
- Cambia instantáneamente la interfaz completa, los mensajes de diagnóstico y las respuestas generadas por Gemini.
- Persistencia automática de la preferencia en `localStorage`.

### 🛠️ 7. Consola de Diagnóstico en Tiempo Real
- Auditoría técnica integrada que muestra código HTTP de respuesta, tiempo de latencia en milisegundos, URL ejecutada y visor de JSON crudo para depuración.

---

## 🏗️ Stack Tecnológico

| Capa | Herramienta | Utilidad |
|---|---|---|
| **Frontend Framework** | React 19 + TypeScript | UI declarativa, componentes tipados y alto rendimiento |
| **Estilos** | Tailwind CSS v4 | Diseño moderno, modo oscuro (*slate/indigo*) y responsive |
| **Mapas** | `@vis.gl/react-google-maps` | Integración con la API JavaScript de Google Maps |
| **Geocodificación** | Google Geocoding V4 REST API | Resolución precisa de direcciones y coordenadas |
| **Inteligencia Artificial** | `@google/genai` TypeScript SDK | Consultas a modelos Gemini con llamadas seguras desde el servidor |
| **Iconografía y Animación** | `lucide-react` & `motion` | Iconos vectoriales limpios y microanimaciones suaves |
| **Build Tooling** | Vite 8 | Servidor de desarrollo con HMR y empaquetado optimizado |

---

## 📁 Estructura del Código

```text
├── .env.example              # Plantilla documentada de variables de entorno (sin claves)
├── .gitignore                # Exclusión estricta de credenciales y binarios
├── LICENSE                   # Licencia de código abierto Apache 2.0
├── README.md                 # Documentación completa del proyecto
├── index.html                # Entrada HTML con metadatos y SEO
├── package.json              # Dependencias y scripts de ejecución
├── tsconfig.json             # Configuración de TypeScript
├── vite.config.ts            # Configuración de Vite y proxy seguro para Gemini API
└── src/
    ├── App.tsx               # Componente principal y gestión de estado
    ├── main.tsx              # Punto de entrada de la aplicación
    ├── components/           # Componentes modulares de interfaz
    │   ├── CustomMarker.tsx            # Marcador animado con halo interactivo
    │   ├── ErrorDisplay.tsx            # Panel de errores y sugerencias de solución
    │   ├── LanguageToggle.tsx          # Botón selector de idioma (EN/ES)
    │   ├── LocalInsightsBanner.tsx     # Tarjeta de secretos culturales con Gemini
    │   ├── LocalKnowledgeQuizModal.tsx # Modal de trivia interactiva y resultados
    │   ├── LocationDetails.tsx         # Desglose de coordenadas y datos geográficos
    │   ├── MapCameraController.tsx     # Controlador de vuelo de cámara (flyTo)
    │   ├── MapExplorer.tsx             # Lienzo de mapa y controles de capas
    │   ├── PresetButtons.tsx           # Destinos mundiales precargados
    │   └── SearchBar.tsx               # Barra de búsqueda con historial reciente
    ├── data/                 # Datos estáticos y archivos de respaldo
    │   ├── fallbackQuizzes.ts          # Preguntas curadas bilingües y generadores
    │   └── presets.ts                  # Ubicaciones destacadas predeterminadas
    ├── i18n/                 # Internacionalización
    │   ├── LanguageContext.tsx         # Contexto de idioma con persistencia
    │   └── translations.ts             # Diccionario completo de textos en ES y EN
    ├── services/             # Servicios de conexión con APIs externas
    │   ├── geminiService.ts            # Cliente para secretos y trivias locales
    │   └── geocodingService.ts         # Conector con Google Geocoding V4 REST API
    └── types/                # Definiciones de tipos TypeScript
        ├── geocoding.ts                # Tipos de respuestas de geocodificación
        └── quiz.ts                     # Tipos de modelos de preguntas y respuestas
```

---

## 🚀 Instalación y Ejecución Local

### Prerrequisitos

- **Node.js**: Versión 18 o superior (recomendado Node 20+ LTS).
- **npm**, **pnpm** o **bun** instalado.
- Una **clave de API de Google Maps Platform** con las siguientes APIs habilitadas en [Google Cloud Console](https://console.cloud.google.com/):
  - *Maps JavaScript API*
  - *Geocoding API*
- Una **clave de API gratuita de Google Gemini** obtenida en [Google AI Studio](https://aistudio.google.com/).

---

### Paso a Paso

1. **Clona este repositorio**:
   ```bash
   git clone https://github.com/TU_USUARIO/map-explorer-ia.git
   cd map-explorer-ia
   ```

2. **Instala las dependencias**:
   ```bash
   npm install
   ```

3. **Configura tus variables de entorno**:
   Copia el archivo de ejemplo para generar tu archivo local:
   ```bash
   cp .env.example .env
   ```
   Abre `.env` y coloca tus claves de acceso:
   ```env
   # Clave pública para el mapa interactivo y geocodificación V4
   VITE_GOOGLE_MAPS_API_KEY="AIzaSyTuClaveDeGoogleMapsAqui"

   # Clave de Gemini para generar secretos y preguntas de trivia
   GEMINI_API_KEY="TuClaveDeGeminiAqui"

   # URL base de la aplicación (opcional para desarrollo local)
   APP_URL="http://localhost:3000"
   ```

4. **Inicia el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre tu navegador en: [http://localhost:3000](http://localhost:3000).

5. **Compilar para producción**:
   ```bash
   npm run build
   ```
   La aplicación optimizada se generará en la carpeta `dist/`.

---

## 🔒 Seguridad y Buenas Prácticas para Publicación

- **Sin claves expuestas**: El archivo `.gitignore` excluye deliberadamente cualquier variante de `.env` para garantizar que tus credenciales privadas nunca se suban a GitHub.
- **Proxy de seguridad en servidor**: `GEMINI_API_KEY` se ejecuta exclusivamente del lado del servidor (en el middleware proxy de Vite/Express), evitando que quede expuesta en el código que el navegador descarga.
- **Restricción de Google Maps**: En Google Cloud Console, se recomienda restringir tu clave `VITE_GOOGLE_MAPS_API_KEY` por **Referentes HTTP** (ej. `http://localhost:*` para desarrollo y tu dominio de producción).

---

## 📤 Pasos para Publicar en tu Cuenta de GitHub

Sigue estos pasos para subir este proyecto a tu GitHub:

1. **Crea un nuevo repositorio en GitHub**:
   - Entra a [https://github.com/new](https://github.com/new).
   - Nómbralo `map-explorer-ia`.
   - Déjalo como **Público** y **NO marques** las opciones de agregar README, .gitignore ni licencia (ya están incluidos en el proyecto).

2. **Ejecuta en tu terminal**:
   ```bash
   # 1. Agregar todos los archivos preparados
   git add .

   # 2. Verificar que los archivos estén listos y que .env NO aparezca
   git status

   # 3. Realizar el commit inicial
   git commit -m "feat: initial release of Map Explorer IA"

   # 4. Asegurar que la rama principal se llame main
   git branch -M main

   # 5. Conectar con tu repositorio remoto (reemplaza TU_USUARIO)
   git remote add origin https://github.com/TU_USUARIO/map-explorer-ia.git

   # 6. Subir el proyecto a GitHub
   git push -u origin main
   ```

---

## 📄 Licencia

Este proyecto está distribuido bajo los términos de la Licencia **Apache 2.0**. Para más información, consulta el archivo [LICENSE](./LICENSE).
