import React, { useState } from 'react';
import { AUTHOR_PROFILE } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { Copy, Check, Award, Github } from 'lucide-react';

interface AuthorDossierProps {
  theme: ThemeMode;
  onOpenContact: () => void;
}

export const AuthorDossier: React.FC<AuthorDossierProps> = ({ theme, onOpenContact }) => {
  const isDark = theme === 'dark';
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(AUTHOR_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className={`border rounded-2xl p-5 sm:p-6 transition-all duration-300 ${
        isDark
          ? 'bg-[#0f172a]/85 border-slate-800 text-slate-100 shadow-md'
          : 'bg-white border-stone-200 text-slate-900 shadow-xs'
      }`}
    >
      <div className="flex items-start gap-4">
        {/* Editorial Monogram Emblem */}
        <div
          className={`relative w-16 h-16 shrink-0 rounded-xl flex items-center justify-center border font-masthead font-black text-2xl tracking-tight select-none ${
            isDark
              ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 border-amber-500/40 text-amber-400 shadow-inner'
              : 'bg-gradient-to-br from-slate-900 to-slate-800 border-amber-600/40 text-amber-400 shadow-xs'
          }`}
          aria-hidden="true"
        >
          {AUTHOR_PROFILE.initials}
        </div>

        {/* Name & Title */}
        <div className="flex-1 min-w-0">
          <div
            className={`flex items-center gap-1.5 text-[11px] font-mono font-bold uppercase tracking-wider mb-1 ${
              isDark ? 'text-amber-400' : 'text-amber-700'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>EXECUTIVE DOSSIER</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-editorial-serif tracking-tight truncate">
            {AUTHOR_PROFILE.name}
          </h3>
          <p
            className={`text-xs font-editorial-sans mt-0.5 leading-snug ${
              isDark ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {AUTHOR_PROFILE.role}
          </p>
        </div>
      </div>

      {/* Bio Prose */}
      <p
        className={`mt-4 text-xs sm:text-sm font-editorial-sans leading-relaxed border-t pt-3 ${
          isDark ? 'text-slate-300 border-slate-800/60' : 'text-slate-700 border-stone-200'
        }`}
      >
        {AUTHOR_PROFILE.bio}
      </p>

      {/* Core Competencies Matrix */}
      <div className="mt-4 space-y-2 font-mono text-xs">
        {AUTHOR_PROFILE.competencies.map((comp, idx) => (
          <div
            key={idx}
            className={`p-2.5 rounded-lg border ${
              isDark ? 'bg-slate-950/60 border-slate-800/70' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div
              className={`font-bold text-[11px] uppercase tracking-wider ${
                isDark ? 'text-amber-400' : 'text-amber-700'
              }`}
            >
              {comp.label}
            </div>
            <div className={`text-[11px] mt-0.5 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
              {comp.detail}
            </div>
          </div>
        ))}
      </div>

      {/* Email & External Actions */}
      <div
        className={`mt-5 pt-4 border-t flex flex-col gap-2.5 ${
          isDark ? 'border-slate-800/60' : 'border-stone-200'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={handleCopyEmail}
            className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-mono transition-colors cursor-pointer border min-w-0 ${
              isDark
                ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-700'
                : 'bg-stone-100 hover:bg-stone-200 text-slate-800 border-stone-300'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="text-emerald-500 font-bold">Email Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{AUTHOR_PROFILE.email}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onOpenContact}
            className={`px-3.5 py-2 rounded-lg text-xs font-bold font-editorial-sans uppercase tracking-wider transition-colors shrink-0 cursor-pointer shadow-xs ${
              isDark
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            Inquire
          </button>
        </div>

        {/* GitHub Bridge */}
        <div
          className={`flex items-center justify-between text-[11px] font-mono px-1 ${
            isDark ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          <span>GitHub: @matterr99</span>
          <a
            href={AUTHOR_PROFILE.externalLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className={`hover:underline flex items-center gap-1 font-semibold ${
              isDark ? 'text-sky-400' : 'text-sky-700'
            }`}
          >
            <Github className="w-3 h-3" />
            <span>View Repositories</span>
          </a>
        </div>
      </div>
    </div>
  );
};
