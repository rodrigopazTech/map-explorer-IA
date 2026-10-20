/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useLanguage } from '../i18n/LanguageContext';
import { Languages } from 'lucide-react';

interface LanguageToggleProps {
  className?: string;
  variant?: 'compact' | 'full';
}

export function LanguageToggle({ className = '', variant = 'compact' }: LanguageToggleProps) {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className={`inline-flex items-center p-0.5 rounded-xl bg-slate-900/90 border border-slate-700/80 shadow-md backdrop-blur-md shrink-0 ${className}`}
      role="group"
      aria-label={t.switchLanguage}
    >
      <button
        type="button"
        onClick={() => setLanguage('en')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          language === 'en'
            ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-600/40 ring-1 ring-indigo-400/40'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
        title="Switch language to English"
        aria-pressed={language === 'en'}
      >
        <span className="text-xs" role="img" aria-label="English">🇺🇸</span>
        <span>EN</span>
      </button>

      <button
        type="button"
        onClick={() => setLanguage('es')}
        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
          language === 'es'
            ? 'bg-gradient-to-r from-amber-600 to-rose-600 text-white shadow-sm shadow-amber-600/40 ring-1 ring-amber-400/40'
            : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
        }`}
        title="Cambiar idioma a Español"
        aria-pressed={language === 'es'}
      >
        <span className="text-xs" role="img" aria-label="Español">🇪🇸</span>
        <span>ES</span>
      </button>
    </div>
  );
}
