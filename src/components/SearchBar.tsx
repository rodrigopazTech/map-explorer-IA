/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, FormEvent } from 'react';
import { Search, Loader2, X, History } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  recentSearches: string[];
}

export function SearchBar({ onSearch, isLoading, recentSearches }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const { t } = useLanguage();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim() && !isLoading) {
      onSearch(query.trim());
    }
  };

  const handleRecentClick = (item: string) => {
    setQuery(item);
    onSearch(item);
  };

  return (
    <div className="w-full flex flex-col gap-2.5">
      <form onSubmit={handleSubmit} className="relative flex items-center">
        <div className="absolute left-3.5 text-slate-400 pointer-events-none flex items-center">
          <Search className="w-4 h-4 text-indigo-400" />
        </div>

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.searchPlaceholder}
          aria-label={t.searchAriaLabel}
          className="w-full pl-10 pr-28 py-3 bg-slate-800/80 border border-slate-700/80 rounded-xl text-sm text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition shadow-inner"
          disabled={isLoading}
        />

        <div className="absolute right-2 flex items-center gap-1.5">
          {query && !isLoading && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-200 transition rounded-lg hover:bg-slate-700/50 cursor-pointer"
              title={t.clearSearch}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          <button
            type="submit"
            disabled={!query.trim() || isLoading}
            className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-semibold rounded-lg shadow transition flex items-center gap-1.5 cursor-pointer"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{t.searchingButton}</span>
              </>
            ) : (
              <span>{t.searchButton}</span>
            )}
          </button>
        </div>
      </form>

      {/* Recent search chips */}
      {recentSearches.length > 0 && (
        <div className="flex items-center gap-1.5 flex-wrap text-xs">
          <span className="text-[11px] text-slate-400 flex items-center gap-1">
            <History className="w-3 h-3 text-slate-500" /> {t.recentSearches}:
          </span>
          {recentSearches.map((item, idx) => (
            <button
              key={`${item}-${idx}`}
              type="button"
              onClick={() => handleRecentClick(item)}
              className="px-2 py-0.5 rounded-md bg-slate-800/60 hover:bg-slate-750 text-slate-300 hover:text-indigo-300 border border-slate-700/50 text-[11px] transition truncate max-w-[140px] cursor-pointer"
              title={item}
            >
              {item}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
