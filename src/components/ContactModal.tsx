import React, { useState, useEffect } from 'react';
import { AUTHOR_PROFILE } from '../data/portfolioData';
import { ThemeMode } from '../types';
import { X, Send, Copy, Check, Terminal } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  theme: ThemeMode;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, theme, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: 'Institutional Macro & Tech Consultation',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;
  const isDark = theme === 'dark';

  const handleCopy = () => {
    navigator.clipboard.writeText(AUTHOR_PROFILE.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formState.subject} — ${formState.name}`);
    const body = encodeURIComponent(
      `From: ${formState.name} (${formState.email})\n\n${formState.message}`
    );
    window.location.href = `mailto:${AUTHOR_PROFILE.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Direct inquiry"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`w-full max-w-lg rounded-2xl border shadow-2xl overflow-hidden font-mono text-xs ${
          isDark
            ? 'bg-[#0a0f18] border-slate-700 text-slate-100'
            : 'bg-white border-stone-300 text-slate-900'
        }`}
      >
        {/* Header */}
        <div
          className={`p-4 sm:p-5 border-b flex items-center justify-between ${
            isDark ? 'border-slate-800 bg-slate-950/60' : 'border-stone-200 bg-stone-50'
          }`}
        >
          <div className="flex items-center gap-2">
            <Terminal className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-700'}`} />
            <span
              className={`font-bold uppercase tracking-wider ${
                isDark ? 'text-amber-400' : 'text-amber-700'
              }`}
            >
              INQUIRY // GABRIEL VASQUEZ DESK
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inquiry modal"
            className={`p-1 rounded cursor-pointer ${
              isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4">
          <div
            className={`flex items-center justify-between p-3 rounded-xl border ${
              isDark ? 'bg-slate-900/60 border-slate-800' : 'bg-stone-50 border-stone-200'
            }`}
          >
            <div>
              <div className={`text-[10px] uppercase ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Direct Email
              </div>
              <div className={`font-bold mt-0.5 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                {AUTHOR_PROFILE.email}
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopy}
              className={`px-3 py-1.5 rounded flex items-center gap-1.5 cursor-pointer transition-colors ${
                isDark
                  ? 'bg-slate-800 hover:bg-slate-700 text-slate-200'
                  : 'bg-stone-200 hover:bg-stone-300 text-slate-800'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center space-y-2 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <Check className="w-8 h-8 text-emerald-500 mx-auto" />
              <div className="font-bold text-emerald-500 text-sm font-editorial-sans">
                Email Draft Ready
              </div>
              <div className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                Your mail client has been opened with your inquiry addressed to {AUTHOR_PROFILE.email}.
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 font-editorial-sans">
              <div>
                <label className={`block text-[11px] font-mono uppercase mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Elena Rostova / Portfolio Manager"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className={`w-full p-2.5 rounded-lg border text-xs focus:outline-hidden ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-400'
                      : 'bg-stone-50 border-stone-300 text-slate-900 focus:border-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[11px] font-mono uppercase mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="elena@fund.com"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className={`w-full p-2.5 rounded-lg border text-xs focus:outline-hidden ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-400'
                      : 'bg-stone-50 border-stone-300 text-slate-900 focus:border-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className={`block text-[11px] font-mono uppercase mb-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  Message / Consultation Scope
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your inquiry regarding macro intelligence, tennis methodologies, or engineering architecture..."
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  className={`w-full p-2.5 rounded-lg border text-xs focus:outline-hidden ${
                    isDark
                      ? 'bg-slate-950 border-slate-800 text-white focus:border-amber-400'
                      : 'bg-stone-50 border-stone-300 text-slate-900 focus:border-slate-900'
                  }`}
                />
              </div>

              <button
                type="submit"
                className={`w-full py-3 rounded-lg font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer shadow-md transition-all font-mono ${
                  isDark
                    ? 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                    : 'bg-slate-900 hover:bg-slate-800 text-white'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>Compose Direct Email</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
