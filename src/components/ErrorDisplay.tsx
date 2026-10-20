/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TroubleshootingInfo } from '../types/geocoding';
import { useLanguage } from '../i18n/LanguageContext';
import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  X,
  Code2,
  HelpCircle,
} from 'lucide-react';

interface ErrorDisplayProps {
  errorMessage: string;
  errorStatus?: string;
  troubleshooting?: TroubleshootingInfo;
  onRetry?: () => void;
  onDismiss: () => void;
}

export function ErrorDisplay({
  errorMessage,
  errorStatus,
  troubleshooting,
  onRetry,
  onDismiss,
}: ErrorDisplayProps) {
  const [showDetails, setShowDetails] = useState(false);
  const { language, t } = useLanguage();

  // Diagnostic tips
  let tip = language === 'es'
    ? 'Intenta refinar los términos de búsqueda incluyendo tanto el nombre de la ciudad como el del país.'
    : 'Try refining your search terms by including both the city and country name.';

  if (errorStatus === 'UNAUTHENTICATED' || errorStatus?.includes('401')) {
    tip = language === 'es'
      ? 'La clave de Google Maps API podría faltar o no ser válida. Verifica que esté configurada correctamente.'
      : 'Your Google Maps API key might be missing or invalid. Verify that your API key is configured correctly in settings.';
  } else if (errorStatus === 'PERMISSION_DENIED' || errorStatus?.includes('403')) {
    tip = language === 'es'
      ? 'Asegúrate de que la API de Geocoding esté habilitada en tu proyecto de Google Cloud Console.'
      : 'Ensure the Geocoding API is enabled on your Google Cloud Console project and API key restrictions allow requests from this domain.';
  } else if (errorStatus === 'RESOURCE_EXHAUSTED' || errorStatus?.includes('429')) {
    tip = language === 'es'
      ? 'Límite o cuota de la API excedido. Por favor, espera un momento antes de enviar otra consulta.'
      : 'API rate limit or quota exceeded. Please wait a moment before sending another geocoding request.';
  } else if (errorStatus === 'NETWORK_ERROR') {
    tip = language === 'es'
      ? 'No se pudo conectar con el servicio Google Geocoding V4 REST. Revisa tu conexión a internet.'
      : 'Could not reach the Google Geocoding V4 REST endpoint. Check your internet connectivity or network firewall.';
  } else if (errorStatus === 'ZERO_RESULTS') {
    tip = language === 'es'
      ? 'No se encontraron lugares o direcciones que coincidan. Revisa la ortografía o amplía el área de búsqueda.'
      : 'Google Geocoding found no matching landmarks or addresses. Check the spelling or try a broader area.';
  }

  return (
    <div className="w-full bg-rose-950/40 border border-rose-600/40 rounded-xl p-3.5 text-rose-100 shadow-lg animate-fadeIn flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-start justify-between gap-2.5">
        <div className="flex items-start gap-2.5">
          <div className="p-1.5 rounded-lg bg-rose-900/60 text-rose-300 shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                {t.errorTitle}
              </h4>
              {errorStatus && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-900/80 text-rose-200 border border-rose-700/50">
                  {errorStatus}
                </span>
              )}
            </div>
            <p className="text-sm font-medium text-rose-100 mt-1 leading-snug">
              {errorMessage}
            </p>
          </div>
        </div>

        <button
          onClick={onDismiss}
          className="text-rose-400 hover:text-rose-200 p-1 rounded-lg hover:bg-rose-900/40 transition shrink-0 cursor-pointer"
          title={t.errorDismiss}
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Suggested Tip */}
      <div className="flex items-start gap-2 text-xs text-rose-200/90 bg-rose-900/20 p-2.5 rounded-lg border border-rose-800/40">
        <HelpCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong className="text-rose-300">{language === 'es' ? 'Consejo de diagnóstico:' : 'Troubleshooting hint:'}</strong> {tip}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between pt-1">
        <button
          type="button"
          onClick={() => setShowDetails(!showDetails)}
          className="text-[11px] font-medium text-rose-300 hover:text-white flex items-center gap-1 transition cursor-pointer"
        >
          <Code2 className="w-3.5 h-3.5" />
          <span>{showDetails ? (language === 'es' ? 'Ocultar detalles' : 'Hide Technical Details') : (language === 'es' ? 'Ver detalles técnicos' : 'Inspect API Request & Response')}</span>
          {showDetails ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="px-3 py-1 bg-rose-700 hover:bg-rose-600 active:scale-95 text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5 cursor-pointer"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{t.retry}</span>
          </button>
        )}
      </div>

      {/* Collapsible Inspector */}
      {showDetails && troubleshooting && (
        <div className="mt-2 pt-2 border-t border-rose-800/40 text-xs flex flex-col gap-2 font-mono">
          <div>
            <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">
              Request Endpoint (V4 REST):
            </span>
            <div className="bg-slate-900/90 p-2 rounded text-[11px] text-slate-300 break-all select-all border border-slate-800">
              {troubleshooting.requestUrl.replace(/key=[^&]+/, 'key=REDACTED')}
            </div>
          </div>

          {troubleshooting.httpStatus !== undefined && (
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-[10px] uppercase font-bold">HTTP Status:</span>
              <span className="text-rose-400 font-bold">
                {troubleshooting.httpStatus} {troubleshooting.statusText || ''}
              </span>
            </div>
          )}

          {troubleshooting.rawPayload && (
            <div>
              <span className="text-slate-400 text-[10px] uppercase font-bold block mb-0.5">
                API Response Payload:
              </span>
              <pre className="bg-slate-900/90 p-2 rounded text-[11px] text-slate-300 overflow-x-auto max-h-40 border border-slate-800 select-all">
                {JSON.stringify(troubleshooting.rawPayload, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
