import React from 'react';
import { Category, ThemeMode } from '../types';
import { Search, Mail } from 'lucide-react';

interface HeaderProps {
  theme: ThemeMode;
  activeCategory: Category;
  onSelectCategory: (category: Category) => void;
  onOpenSearch: () => void;
  onOpenContact: () => void;
}

const NAV_ITEMS: { id: Category; label: string; liveDot?: boolean }[] = [
  { id: 'all', label: 'Front Page' },
  { id: 'macro', label: 'Macro Intelligence' },
  { id: 'tennis', label: 'Athletic Science' },
  { id: 'webdev', label: 'Web Engineering' },
  { id: 'wire', label: 'The Wire', liveDot: true },
];

export const Header: React.FC<HeaderProps> = ({
  theme,
  activeCategory,
  onSelectCategory,
  onOpenSearch,
  onOpenContact,
}) => {
  const isDark = theme === 'dark';

  return (
    <header
      className={`w-full border-b transition-colors sticky top-0 z-40 backdrop-blur-md ${
        isDark
          ? 'bg-[#0d1321]/92 border-slate-800 text-slate-100'
          : 'bg-[#fcfbf8]/95 border-stone-200 text-slate-900 shadow-xs'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Wordmark */}
        <button
          type="button"
          onClick={() => onSelectCategory('all')}
          className="text-left group cursor-pointer focus:outline-hidden shrink-0"
        >
          <span
            className={`text-lg sm:text-2xl font-black tracking-tighter uppercase font-editorial-sans transition-colors flex items-center gap-0.5 ${
              isDark
                ? 'text-white group-hover:text-amber-400'
                : 'text-slate-950 group-hover:text-amber-700'
            }`}
          >
            <span>GABRIEL VASQUEZ</span>
            <span className={isDark ? 'text-amber-400' : 'text-amber-600'}>.</span>
          </span>
        </button>

        {/* Zone 2: Desktop Navigation */}
        <nav
          aria-label="Primary departments"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-xs font-semibold uppercase tracking-wider font-editorial-sans"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeCategory === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectCategory(item.id)}
                className={`transition-colors cursor-pointer relative py-1 flex items-center gap-1.5 ${
                  isActive
                    ? isDark
                      ? 'text-amber-400 border-b-2 border-amber-400'
                      : 'text-amber-700 border-b-2 border-amber-600'
                    : isDark
                    ? 'text-slate-400 hover:text-slate-100'
                    : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {item.liveDot && (
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                )}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            type="button"
            onClick={onOpenSearch}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono transition-all cursor-pointer ${
              isDark
                ? 'bg-slate-800/80 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700/60'
                : 'bg-stone-100 text-slate-700 hover:bg-stone-200 border border-stone-300'
            }`}
            title="Search dispatches & projects (⌘K)"
            aria-label="Search dispatches and projects"
          >
            <Search className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden sm:inline">Search</span>
            <kbd
              className={`hidden sm:inline px-1 rounded text-[10px] ${
                isDark ? 'bg-slate-900 text-slate-400' : 'bg-white text-slate-600 border border-stone-200'
              }`}
            >
              ⌘K
            </kbd>
          </button>

          <button
            type="button"
            onClick={onOpenContact}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold font-editorial-sans uppercase tracking-wider transition-all cursor-pointer shadow-xs whitespace-nowrap ${
              isDark
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Inquire</span>
          </button>
        </div>
      </div>

      {/* Mobile Scrollable Department Strip */}
      <nav
        aria-label="Mobile departments"
        className={`md:hidden border-t px-4 py-2 flex items-center gap-2 overflow-x-auto no-scrollbar text-[11px] font-mono uppercase tracking-wider ${
          isDark ? 'border-slate-800/80 bg-[#0b101d]/95' : 'border-stone-200 bg-stone-100/90'
        }`}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeCategory === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectCategory(item.id)}
              className={`px-3 py-1 rounded-full shrink-0 transition-colors cursor-pointer flex items-center gap-1.5 font-semibold ${
                isActive
                  ? isDark
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-900 text-white font-bold'
                  : isDark
                  ? 'text-slate-400 bg-slate-800/70 hover:text-white'
                  : 'text-slate-600 bg-white border border-stone-200 hover:text-slate-950'
              }`}
            >
              {item.liveDot && <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
};
