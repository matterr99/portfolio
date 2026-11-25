import React from 'react';
import { ThemeMode, Category } from '../types';
import { ArrowUp } from 'lucide-react';
import { AUTHOR_PROFILE } from '../data/portfolioData';

interface FooterProps {
  theme: ThemeMode;
  onSelectCategory: (category: Category) => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({ theme, onSelectCategory, onOpenContact }) => {
  const isDark = theme === 'dark';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className={`w-full border-t mt-16 transition-colors font-editorial-sans ${
        isDark
          ? 'bg-[#080c14] border-slate-800/80 text-slate-400'
          : 'bg-stone-100 border-stone-300 text-slate-600'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-12">
        <div
          className={`grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b ${
            isDark ? 'border-slate-800/60' : 'border-stone-300'
          }`}
        >
          {/* Col 1: Brand & Mission */}
          <div className="space-y-3">
            <div
              className={`text-xl font-black font-editorial-sans uppercase tracking-tighter ${
                isDark ? 'text-white' : 'text-slate-950'
              }`}
            >
              GABRIEL VASQUEZ<span className={isDark ? 'text-amber-400' : 'text-amber-600'}>.</span>
            </div>
            <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Selected Works, Macro Intelligence Environments, Athletic Science Methodologies &amp; Full-Stack Web Architectures.
            </p>
            <div
              className={`flex items-center gap-1.5 text-xs font-mono font-bold ${
                isDark ? 'text-amber-400' : 'text-amber-700'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>TERMINAL STATUS: ONLINE</span>
            </div>
          </div>

          {/* Col 2: Core Departments */}
          <div className="space-y-2.5 font-mono text-xs">
            <div
              className={`font-bold uppercase text-[11px] tracking-wider mb-2 ${
                isDark ? 'text-slate-200' : 'text-slate-900'
              }`}
            >
              DEPARTMENTS
            </div>
            {(
              [
                { id: 'macro', label: '01. Macro Intelligence (Kairos)' },
                { id: 'tennis', label: '02. Athletic Science (Tennis)' },
                { id: 'webdev', label: '03. Web Systems & UI Architecture' },
                { id: 'wire', label: '04. The Wire Dispatches' },
              ] as const
            ).map((dept) => (
              <div key={dept.id}>
                <button
                  type="button"
                  onClick={() => {
                    onSelectCategory(dept.id);
                    scrollToTop();
                  }}
                  className={`transition-colors cursor-pointer ${
                    isDark ? 'hover:text-amber-400' : 'hover:text-amber-700'
                  }`}
                >
                  {dept.label}
                </button>
              </div>
            ))}
          </div>

          {/* Col 3: Live Deployments */}
          <div className="space-y-2.5 font-mono text-xs">
            <div
              className={`font-bold uppercase text-[11px] tracking-wider mb-2 ${
                isDark ? 'text-slate-200' : 'text-slate-900'
              }`}
            >
              PRODUCTION BRIDGES
            </div>
            <div>
              <a
                href={AUTHOR_PROFILE.externalLinks.kairosLive}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors inline-flex items-center gap-1 ${
                  isDark ? 'hover:text-amber-400' : 'hover:text-amber-700'
                }`}
              >
                <span>Kairos Macro Hub ↗</span>
              </a>
            </div>
            <div>
              <a
                href={AUTHOR_PROFILE.externalLinks.tennisLive}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors inline-flex items-center gap-1 ${
                  isDark ? 'hover:text-amber-400' : 'hover:text-amber-700'
                }`}
              >
                <span>Tennis Portfolio Monograph ↗</span>
              </a>
            </div>
            <div>
              <a
                href={AUTHOR_PROFILE.externalLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className={`transition-colors inline-flex items-center gap-1 ${
                  isDark ? 'hover:text-amber-400' : 'hover:text-amber-700'
                }`}
              >
                <span>GitHub Repositories ↗</span>
              </a>
            </div>
          </div>

          {/* Col 4: Inquiry */}
          <div className="space-y-3">
            <div
              className={`font-bold font-mono uppercase text-[11px] tracking-wider ${
                isDark ? 'text-slate-200' : 'text-slate-900'
              }`}
            >
              COMMUNICATIONS
            </div>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              Available for macro research consulting, athlete analytics, and high-craft software engineering.
            </p>
            <button
              type="button"
              onClick={onOpenContact}
              className={`w-full py-2.5 rounded-lg font-bold font-mono text-xs transition-colors border cursor-pointer ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-100 border-slate-700'
                  : 'bg-slate-900 hover:bg-slate-800 text-white border-slate-900'
              }`}
            >
              Direct Inquiry
            </button>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} GABRIEL VASQUEZ · ALL RIGHTS RESERVED · EDITORIAL BROADSHEET FORMAT
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-amber-400' : 'text-slate-600 hover:text-amber-700'
            }`}
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
