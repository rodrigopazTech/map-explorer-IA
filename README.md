# 🌍 Block Explorer

[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
[![React](https://img.shields.io/badge/React-19.0-61dafb.svg?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646cff.svg?logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Google Maps Platform](https://img.shields.io/badge/Google_Maps-Platform-4285F4.svg?logo=googlemaps)](https://developers.google.com/maps)
[![Google Gemini AI](https://img.shields.io/badge/Google_Gemini-AI-8E75B2.svg?logo=googlegemini)](https://ai.google.dev/)

> **Explorador geoespacial inteligente** que combina la precisión de **Google Maps Platform** y la API REST **Geocoding V4** con la inteligencia artificial de **Google Gemini** para descubrir secretos culturales locales y poner a prueba tus conocimientos con trivias dinámicas e hiperlocales.

---

## 🇪🇸 Características Principales (Spanish)

- 🔍 **Geocodificación de Alta Precisión con Google Geocoding V4 REST API**:
  - Búsqueda en tiempo real de cualquier ciudad, barrio, monumento o dirección del mundo.
  - Resolución detallada con desglose de componentes administrativos, identificador de lugar (`placeId`), granularidad de ubicación y coordenadas exactas (latitud/longitud a 6 decimales).
  - Vuelo de cámara suave y animado (`flyTo`) con cálculo automático de zoom y límites visuales (`fitBounds`).

- 🗺️ **Mapa Interactivo con Google Maps Platform**:
  - Visualización fluida con selector de tipos de mapa: Callejero (*Roadmap*), Satélite (*Satellite*), Híbrido (*Hybrid*) y Relieve (*Terrain*).
  - Marcador personalizado interactivo con halo pulsante de alta visibilidad.
  - Soporte táctil y diseño adaptable tanto para pantallas de escritorio como para móviles.

- 🤖 **Secretos y Datos Curiosos con Google Gemini AI**:
  - Al buscar una ubicación, un asistente virtual genera 3 datos fascinantes e históricos poco conocidos del lugar.
  - Indicador visible del modelo utilizado con caché inteligente para optimizar el consumo de la API.

- 🧠 **Trivia Interactiva de Conocimiento Local**:
  - Desafío interactivo de 3 preguntas de opción múltiple en 3 categorías: **Gastronomía local**, **Arte y cultura** e **Historia local**.
  - **Modo Hiperlocal**: Cuestionario especializado enfocado en historia oral a nivel de manzana/barrio, tradiciones artesanales y vida cotidiana de los vecinos.
  - Retroalimentación formativa con explicaciones detalladas y fuentes verificadas mediante enlaces de fundamentación (*Grounding Links*).

- 🔄 **Cascada Automática de Modelos Gratuitos (*Failover Cascade*)**:
  - Si el modelo principal (`gemini-3.8-flash`) alcanza límites de cuota (429) o alta demanda temporal (503), el sistema conmuta automáticamente a `gemini-3.1-flash-lite`, luego a `gemini-flash-latest`, y finalmente a un archivo curado sin interrumpir la experiencia del usuario.

- 🌐 **Soporte Bilingüe Completo (Español / Inglés)**:
  - Botón selector directo `[ 🇺🇸 EN | 🇪🇸 ES ]` en la cabecera, mapa y modales.
  - Todo el contenido de la interfaz, los mensajes de error, las recomendaciones y las respuestas generadas por los modelos de IA se traducen íntegramente al idioma elegido.

- 🛠️ **Consola de Diagnóstico y Telemetría en Vivo**:
  - Visualización del código HTTP, latencia en milisegundos, URL ejecutada de la API REST V4 y visor de JSON crudo para desarrolladores y auditoría.

---

## 🇺🇸 Key Features (English)

- 🔍 **High-Precision Google Geocoding V4 REST API Integration**:
  - Real-time search for any city, neighborhood, landmark, or address worldwide.
  - Deep breakdown with address components, place IDs, location granularity, and coordinates to 6 decimal places.
  - Smooth animated camera gliding (`flyTo`) with automatic bounding box framing.

- 🗺️ **Interactive Google Maps**:
  - Toggle between Roadmap, Satellite, Hybrid, and Terrain layers.
  - Custom pulsating marker with animated hover states.
  - Fully responsive layout for desktop and mobile devices.

- 🤖 **Contextual Gemini AI Local Insights**:
  - Instant generation of 3 authentic, lesser-known cultural secrets for the selected location.
  - Transparent model badge and client/server-level caching.

- 🧠 **Interactive Local Knowledge Trivia**:
  - 3-question quizzes across Cuisine, Art & Culture, and Local History.
  - **Hyperlocal Mode** focusing on block-level oral history and resident folklore.
  - Instant scoring with explanations and Google Search grounding citations.

- 🔄 **Multi-Model Free Tier Failover Cascade**:
  - Automatic fallback cascade (`gemini-3.8-flash` ➔ `gemini-3.1-flash-lite` ➔ `gemini-flash-latest` ➔ Curated Archive) to guarantee uninterrupted uptime during demand spikes or rate limits.

- 🌐 **100% Bilingual Localization (EN / ES)**:
  - Global language switch toggling all UI copy, error diagnostics, and Gemini AI outputs.

---

## 🏗️ Arquitectura y Tecnologías

| Componente | Tecnología | Propósito |
|---|---|---|
| **Frontend** | React 19 + TypeScript | Interfaz reactiva, modular y con tipado estricto |
| **Estilos** | Tailwind CSS v4 | Diseño moderno, modo oscuro y micro-interacciones |
| **Mapas** | `@vis.gl/react-google-maps` | Integración declarativa de Google Maps JavaScript API |
| **Geocodificación** | Google Geocoding V4 REST API | Endpoint REST directo con solución corporativa certificada |
| **Inteligencia Artificial** | `@google/genai` TypeScript SDK | Consultas a modelos Gemini con llamadas seguras del lado del servidor |
| **Iconografía y Animaciones** | `lucide-react` & `motion` | Iconos vectoriales y transiciones fluidas |
| **Herramienta de Construcción** | Vite 8 | Servidor de desarrollo ultrarrápido y compilación optimizada |

---

## 📁 Estructura del Proyecto

```text
├── .env.example              # Plantilla documentada de variables de entorno (sin secretos)
├── .gitignore                # Reglas estrictas de exclusión para repositorio público
├── LICENSE                   # Licencia de código abierto Apache 2.0
├── README.md                 # Documentación completa del proyecto
├── index.html                # Entrada HTML con metadatos y SEO optimizado
├── package.json              # Dependencias y scripts de ejecución
├── tsconfig.json             # Configuración del compilador TypeScript
├── vite.config.ts            # Configuración de Vite y proxy seguro para Gemini API
└── src/
    ├── App.tsx               # Orquestador principal de estado y diseño responsivo
    ├── main.tsx              # Punto de entrada de la aplicación React
    ├── components/           # Componentes modulares de interfaz
    │   ├── CustomMarker.tsx            # Marcador animado con halo interactivo
    │   ├── ErrorDisplay.tsx            # Panel de errores y sugerencias de solución
    │   ├── LanguageToggle.tsx          # Botón de alternancia de idioma (EN/ES)
    │   ├── LocalInsightsBanner.tsx     # Tarjeta de secretos culturales con Gemini
    │   ├── LocalKnowledgeQuizModal.tsx # Modal de juego de preguntas y resultados
    │   ├── LocationDetails.tsx         # Tarjeta de coordenadas y datos geográficos
    │   ├── MapCameraController.tsx     # Controlador de vuelo de cámara (flyTo)
    │   ├── MapExplorer.tsx             # Lienzo de mapa y controles de capas
    │   ├── PresetButtons.tsx           # Destinos mundiales precargados
    │   └── SearchBar.tsx               # Barra de búsqueda con historial reciente
    ├── data/                 # Datos estáticos y archivos de respaldo
    │   ├── fallbackQuizzes.ts          # Trivias curadas en español e inglés
    │   └── presets.ts                  # Lista de ubicaciones curadas con coordenadas
    ├── i18n/                 # Sistema de internacionalización
    │   ├── LanguageContext.tsx         # Proveedor de contexto y persistencia
    │   └── translations.ts             # Diccionario completo de textos en ES y EN
    ├── services/             # Servicios de conexión con APIs
    │   ├── geminiService.ts            # Cliente para secretos y trivias locales
    │   └── geocodingService.ts         # Conector con Google Geocoding V4 REST API
    └── types/                # Definiciones de tipos TypeScript
        ├── geocoding.ts                # Tipos para respuestas de geocodificación
        └── quiz.ts                     # Tipos para la trivia y resultados
```

---

## 🚀 Instalación y Puesta en Marcha Local

### Prerrequisitos

- **Node.js**: Versión 18.0 o superior (recomendado Node 20+ LTS).
- **npm**, **pnpm** o **bun** instalado.
- Una **clave de API de Google Maps Platform** con las siguientes APIs habilitadas en [Google Cloud Console](https://console.cloud.google.com/):
  - *Maps JavaScript API*
  - *Geocoding API*
- Una **clave de API de Google Gemini** obtenida gratuitamente en [Google AI Studio](https://aistudio.google.com/).

---

### Paso a Paso

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/TU_USUARIO/block-explorer.git
   cd block-explorer
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar las variables de entorno**:
   Copia el archivo de ejemplo:
   ```bash
   cp .env.example .env
   ```
   Abre `.env` en tu editor y coloca tus claves reales:
   ```env
   # Clave pública para el mapa interactivo y geocodificación V4
   VITE_GOOGLE_MAPS_API_KEY="AIzaSyTuClaveDeGoogleMapsAqui"

   # Clave de Gemini para generar secretos y preguntas de trivia
   GEMINI_API_KEY="TuClaveDeGeminiAqui"
   ```

4. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre tu navegador en [http://localhost:3000](http://localhost:3000).

5. **Construir para producción**:
   ```bash
   npm run build
   ```
   Los archivos estáticos listos para desplegar se generarán en la carpeta `dist/`.

---

## 🔒 Seguridad y Buenas Prácticas para Repositorios Públicos

Este proyecto ha sido configurado bajo las mejores prácticas de seguridad para código abierto:

1. **Sin secretos en el código**:
   - El archivo `.env` está expresamente excluido en `.gitignore` para evitar filtraciones accidentales de credenciales.
   - Solo se sube `.env.example` con marcadores de posición (*placeholders*).

2. **Proxy de seguridad del lado del servidor**:
   - La clave `GEMINI_API_KEY` se consume **exclusivamente en las rutas del servidor** (`/api/gemini/*`) implementadas en el middleware de Vite/Express, por lo que **nunca se expone en el código cliente** que se descarga en el navegador.

3. **Restricción recomendada para Google Maps**:
   - En tu consola de Google Cloud, configura la restricción de tu clave `VITE_GOOGLE_MAPS_API_KEY` por **Referentes HTTP** (por ejemplo: `http://localhost:*` para desarrollo y tu dominio de producción).

---

## 📤 Instrucciones para Subir este Proyecto a GitHub

Si deseas inicializar el repositorio y subirlo a tu cuenta de GitHub por primera vez:

```bash
# 1. Inicializar git en la raíz del proyecto
git init

# 2. Agregar todos los archivos preparados
git add .

# 3. Confirmar que .env no esté incluido (debe estar ignorado)
git status

# 4. Crear el commit inicial
git commit -m "feat: initial release of Block Explorer with Maps V4 and Gemini AI"

# 5. Renombrar la rama a main
git branch -M main

# 6. Vincular con tu repositorio remoto de GitHub
# (Crea primero un repositorio vacío en https://github.com/new)
git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git

# 7. Subir el código
git push -u origin main
```

---

## 📄 Licencia

Este proyecto está bajo la Licencia **Apache 2.0**. Consulta el archivo [LICENSE](./LICENSE) para más detalles.

---

Desarrollado con ❤️ combinando el poder geoespacial de **Google Maps** y la inteligencia contextual de **Google Gemini**.
