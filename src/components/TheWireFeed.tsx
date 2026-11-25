import React, { useState } from 'react';
import { WireDispatch, ThemeMode } from '../types';
import { Radio, ChevronRight, Filter } from 'lucide-react';

interface TheWireFeedProps {
  dispatches: WireDispatch[];
  theme: ThemeMode;
  onSelectProjectById?: (projectId: string) => void;
}

export const TheWireFeed: React.FC<TheWireFeedProps> = ({
  dispatches,
  theme,
  onSelectProjectById,
}) => {
  const isDark = theme === 'dark';
  const [activeFilter, setActiveFilter] = useState<'all' | 'macro' | 'tennis' | 'webdev'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(dispatches[0]?.id || null);

  const filteredDispatches =
    activeFilter === 'all'
      ? dispatches
      : dispatches.filter((d) => d.category === activeFilter);

  return (
    <div
      className={`border rounded-2xl overflow-hidden transition-all duration-300 font-mono ${
        isDark
          ? 'bg-[#0f172a]/85 border-slate-800 text-slate-100'
          : 'bg-white border-stone-200 text-slate-900 shadow-xs'
      }`}
    >
      {/* Feed Header */}
      <div
        className={`p-4 sm:p-5 border-b flex flex-wrap items-center justify-between gap-3 ${
          isDark ? 'border-slate-800/80' : 'border-stone-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <Radio className={`w-4 h-4 animate-pulse ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
          <h3
            className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-emerald-400' : 'text-emerald-800'
            }`}
          >
            THE WIRE // DISPATCHES
          </h3>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-1 text-[10px]" role="group" aria-label="Filter dispatches">
          <Filter className="w-3 h-3 text-slate-500 mr-1" />
          {(['all', 'macro', 'tennis', 'webdev'] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveFilter(cat)}
              className={`px-2 py-0.5 rounded capitalize transition-colors cursor-pointer ${
                activeFilter === cat
                  ? isDark
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-emerald-700 text-white font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-white bg-slate-800/60'
                  : 'text-slate-600 hover:text-slate-900 bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Dispatches List */}
      <div
        className={`divide-y max-h-[540px] overflow-y-auto ${
          isDark ? 'divide-slate-800/60' : 'divide-stone-200'
        }`}
      >
        {filteredDispatches.map((dispatch) => {
          const isExpanded = expandedId === dispatch.id;

          return (
            <div
              key={dispatch.id}
              className={`p-4 transition-colors cursor-pointer ${
                isExpanded
                  ? isDark
                    ? 'bg-slate-900/70'
                    : 'bg-stone-50'
                  : isDark
                  ? 'hover:bg-slate-900/35'
                  : 'hover:bg-stone-50/70'
              }`}
              onClick={() => setExpandedId(isExpanded ? null : dispatch.id)}
            >
              <div className="flex items-center justify-between gap-2 text-[11px] mb-1.5">
                <div className="flex items-center gap-2">
                  <span className={`font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                    {dispatch.kicker}
                  </span>
                  <span className={isDark ? 'text-slate-600' : 'text-stone-400'}>·</span>
                  <span className={`tabular-nums ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {dispatch.timestamp}
                  </span>
                </div>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform ${
                    isExpanded
                      ? isDark
                        ? 'rotate-90 text-amber-400'
                        : 'rotate-90 text-amber-700'
                      : 'text-slate-500'
                  }`}
                />
              </div>

              <h4
                className={`text-xs sm:text-sm font-semibold font-editorial-sans leading-snug ${
                  isDark ? 'text-slate-100' : 'text-slate-900'
                }`}
              >
                {dispatch.title}
              </h4>

              {isExpanded && (
                <div
                  className={`mt-2.5 pt-2.5 border-t text-xs font-editorial-sans leading-relaxed ${
                    isDark ? 'border-slate-800/60 text-slate-300' : 'border-stone-200 text-slate-600'
                  }`}
                >
                  <p>{dispatch.summary}</p>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono">
                      {dispatch.tags.map((t) => (
                        <span
                          key={t}
                          className={`px-1.5 py-0.5 rounded ${
                            isDark ? 'bg-slate-800/90 text-slate-300' : 'bg-stone-200/80 text-slate-700'
                          }`}
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    {dispatch.relatedProject && onSelectProjectById && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProjectById(dispatch.relatedProject!);
                        }}
                        className={`text-[11px] hover:underline font-mono font-bold flex items-center gap-1 cursor-pointer ${
                          isDark ? 'text-amber-400' : 'text-amber-700'
                        }`}
                      >
                        <span>Open Related Dossier</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
