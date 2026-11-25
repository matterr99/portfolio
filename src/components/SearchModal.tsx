import React, { useState, useEffect } from 'react';
import { ProjectDossier, WireDispatch, ThemeMode } from '../types';
import { Search, X, ChevronRight } from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  theme: ThemeMode;
  projects: ProjectDossier[];
  dispatches: WireDispatch[];
  onClose: () => void;
  onSelectProject: (project: ProjectDossier) => void;
  onSelectProjectById?: (projectId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  theme,
  projects,
  dispatches,
  onClose,
  onSelectProject,
  onSelectProjectById,
}) => {
  const [query, setQuery] = useState('');
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) setQuery('');
  }, [isOpen]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const filteredProjects = projects.filter(
    (p) =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.deck.toLowerCase().includes(q) ||
      p.kicker.toLowerCase().includes(q) ||
      p.specifications.technologies.some((t) => t.toLowerCase().includes(q))
  );

  const filteredDispatches = dispatches.filter(
    (d) =>
      !q ||
      d.title.toLowerCase().includes(q) ||
      d.summary.toLowerCase().includes(q) ||
      d.tags.some((t) => t.toLowerCase().includes(q))
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Search dossiers and dispatches"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-2xl rounded-2xl border shadow-2xl overflow-hidden font-mono text-xs ${
          isDark
            ? 'bg-[#0c121d] border-slate-700 text-slate-100'
            : 'bg-white border-stone-300 text-slate-900'
        }`}
      >
        {/* Search Input Bar */}
        <div
          className={`p-4 border-b flex items-center gap-3 ${
            isDark ? 'border-slate-800' : 'border-stone-200'
          }`}
        >
          <Search className={`w-5 h-5 shrink-0 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <input
            type="text"
            placeholder="Search macro models, tennis biomechanics, repositories, keywords..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className={`w-full bg-transparent text-sm font-editorial-sans focus:outline-hidden ${
              isDark ? 'text-white placeholder:text-slate-500' : 'text-slate-950 placeholder:text-slate-400'
            }`}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="p-1 text-slate-400 hover:text-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd
            className={`hidden sm:inline px-1.5 py-0.5 rounded text-[10px] ${
              isDark ? 'bg-slate-800 text-slate-400' : 'bg-stone-100 text-slate-600 border border-stone-200'
            }`}
          >
            ESC
          </kbd>
        </div>

        {/* Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {/* Projects Section */}
          {filteredProjects.length > 0 && (
            <div>
              <div
                className={`text-[10px] font-bold uppercase tracking-wider mb-2 px-2 ${
                  isDark ? 'text-amber-400' : 'text-amber-700'
                }`}
              >
                PROJECT DOSSIERS & SYSTEMS ({filteredProjects.length})
              </div>
              <div className="space-y-1">
                {filteredProjects.map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      onSelectProject(p);
                      onClose();
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                      isDark ? 'hover:bg-slate-800/80' : 'hover:bg-stone-100'
                    }`}
                  >
                    <div className="min-w-0">
                      <div
                        className={`text-[10px] font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}
                      >
                        {p.kicker}
                      </div>
                      <div
                        className={`font-editorial-sans font-bold text-sm truncate ${
                          isDark ? 'text-slate-100' : 'text-slate-900'
                        }`}
                      >
                        {p.title}
                      </div>
                      <div className={`text-xs truncate ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                        {p.deck}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Wire Dispatches Section */}
          {filteredDispatches.length > 0 && (
            <div>
              <div
                className={`text-[10px] font-bold uppercase tracking-wider mb-2 px-2 ${
                  isDark ? 'text-emerald-400' : 'text-emerald-700'
                }`}
              >
                THE WIRE DISPATCHES ({filteredDispatches.length})
              </div>
              <div className="space-y-1">
                {filteredDispatches.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => {
                      if (d.relatedProject && onSelectProjectById) {
                        onSelectProjectById(d.relatedProject);
                      }
                      onClose();
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-colors cursor-pointer flex items-center justify-between gap-3 ${
                      isDark ? 'hover:bg-slate-800/60' : 'hover:bg-stone-100'
                    }`}
                  >
                    <div className="min-w-0">
                      <div
                        className={`flex items-center gap-2 text-[10px] ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        <span className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                          {d.kicker}
                        </span>
                        <span>·</span>
                        <span>{d.timestamp}</span>
                      </div>
                      <div
                        className={`font-editorial-sans font-semibold text-xs mt-0.5 ${
                          isDark ? 'text-slate-200' : 'text-slate-800'
                        }`}
                      >
                        {d.title}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-500 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredProjects.length === 0 && filteredDispatches.length === 0 && (
            <div className="p-8 text-center text-slate-500 font-editorial-sans">
              No dispatches or dossiers found matching &ldquo;{query}&rdquo;.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
