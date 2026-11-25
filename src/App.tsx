import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Mail, Github, Check, Copy } from 'lucide-react';
import { MusicPlayer } from './components/MusicPlayer';

import tennisImg from './assets/images/tennis_court_hero.jpg';
import kairosImg from './assets/images/bloomberg_lead_macro_1790446169392.jpg';
import webdevImg from '../public/images/IMG_1388.jpeg';

const PROJECTS = [
  {
    id: 'tennis',
    index: '01',
    tag: 'Athletic Science',
    status: 'Live Module',
    dotColor: 'bg-emerald-400',
    topBar: 'group-hover:bg-emerald-400',
    statusText: 'text-emerald-300 border-emerald-400/25 bg-emerald-950/75',
    accentGlow: 'hover:border-emerald-400/35 hover:shadow-emerald-500/10',
    titleHover: 'group-hover:text-emerald-300',
    title: 'Tennis Portfolio',
    subtitle: 'Player Development & Biomechanics',
    description:
      'Player development methodologies, kinetic chain efficiency diagnostics, and modern tennis training insights.',
    highlights: ['Biomechanics', 'Kinetic Chain', 'Match Analytics'],
    url: 'https://matterr99.github.io/tennis-portfolio/',
    image: tennisImg,
    actionText: 'Open Tennis Portfolio',
  },
  {
    id: 'kairos',
    index: '02',
    tag: 'Macro Intelligence',
    status: 'In Progress',
    dotColor: 'bg-amber-400',
    topBar: 'group-hover:bg-amber-400',
    statusText: 'text-amber-300 border-amber-400/25 bg-amber-950/75',
    accentGlow: 'hover:border-amber-400/35 hover:shadow-amber-500/10',
    titleHover: 'group-hover:text-amber-300',
    title: 'Kairos Global Research',
    subtitle: 'Cross-Asset Macro Terminal',
    description:
      'Cross-asset macro research terminal tracking global liquidity conditions, sovereign yield curves, and central bank balance sheets.',
    highlights: ['Global Liquidity', 'Yield Curves', 'FX Regimes'],
    url: 'https://matterr99.github.io/kairos-macro-trading-hub/',
    image: kairosImg,
    actionText: 'Access Kairos Terminal',
  },
  {
    id: 'webdev',
    index: '03',
    tag: 'Web Engineering',
    status: 'Active Repos',
    dotColor: 'bg-cyan-400',
    topBar: 'group-hover:bg-cyan-400',
    statusText: 'text-cyan-300 border-cyan-400/25 bg-cyan-950/75',
    accentGlow: 'hover:border-cyan-400/35 hover:shadow-cyan-500/10',
    titleHover: 'group-hover:text-cyan-300',
    title: 'Web Development',
    subtitle: 'UI/UX & Systems Architecture',
    description:
      'Showcase of clean UI/UX architectures, performant reactive state paradigms, custom scripts, and modern web applications.',
    highlights: ['React & TypeScript', 'Design Systems', 'Performance'],
    url: 'https://github.com/matterr99',
    image: webdevImg,
    actionText: 'Explore Repositories',
  },
] as const;

const BUILD_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function App() {
  const [copied, setCopied] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('matterr99@outlook.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#070a12] text-slate-100 font-editorial-sans selection:bg-amber-400 selection:text-slate-950 flex flex-col justify-between overflow-x-clip">
      {/* Top Architectural Progress Sweep on Initial Load */}
      {!prefersReducedMotion && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: [1, 1, 0] }}
          transition={{ duration: 1.85, times: [0, 0.8, 1], ease: BUILD_EASE }}
          style={{ transformOrigin: 'left' }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 z-50 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Subtle Ambient Background Lighting & Architectural Grid (Zero-Blur Radial Gradients for 60fps Mobile Scroll) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: 'easeOut' }}
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(650px 320px at 50% -4%, rgba(245, 158, 11, 0.08), transparent 72%), radial-gradient(460px 460px at 95% 38%, rgba(6, 182, 212, 0.05), transparent 70%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.16]"
          style={{
            backgroundImage:
              'radial-gradient(rgba(148, 163, 184, 0.22) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
            maskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 72%)',
          }}
        />
      </motion.div>

      {/* Header — Builds in first */}
      <motion.header
        initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: BUILD_EASE }}
        className="sticky top-0 z-30 bg-[#070a12]/80 backdrop-blur-xl pt-[env(safe-area-inset-top)]"
      >
        <div className="max-w-6xl mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-4">
          <a
            href="#"
            className="group text-base sm:text-lg font-extrabold tracking-tight uppercase text-white hover:text-amber-300 transition-colors shrink-0 flex items-center gap-1"
          >
            <span>Gabriel Vasquez</span>
            <span className="text-amber-400 group-hover:scale-125 transition-transform inline-block">.</span>
          </a>

          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href="mailto:matterr99@outlook.com"
              className="h-10 px-3.5 text-xs font-medium font-editorial-mono text-slate-300 hover:text-white flex items-center gap-2 transition-all rounded-none bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-amber-400/50 touch-manipulation"
              aria-label="Send Email to Gabriel Vasquez"
            >
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden md:inline">matterr99@outlook.com</span>
              <span className="md:hidden">Email</span>
            </a>

            <a
              href="https://github.com/matterr99"
              target="_blank"
              rel="noopener noreferrer"
              className="h-10 w-10 flex items-center justify-center rounded-none border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/25 text-slate-300 hover:text-white transition-all touch-manipulation"
              title="GitHub Profile"
              aria-label="GitHub Profile"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
        {/* Animated Header Bottom Rule */}
        <motion.div
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.05, delay: 0.25, ease: BUILD_EASE }}
          style={{ transformOrigin: 'left' }}
          className="h-px w-full bg-white/[0.08]"
        />
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-5 sm:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16 flex-1">
        {/* Hero Header — Masked typographic construction */}
        <section className="pb-8 sm:pb-10 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3.5 max-w-2xl">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: BUILD_EASE }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-amber-400/[0.07] border border-amber-400/20 border-l-2 border-l-amber-400"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[11px] font-editorial-mono font-semibold uppercase tracking-[0.16em] text-amber-300">
                  Selected Works &amp; Research
                </span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={prefersReducedMotion ? false : { y: '100%', opacity: 0 }}
                  animate={{ y: '0%', opacity: 1 }}
                  transition={{ duration: 0.95, delay: 0.45, ease: BUILD_EASE }}
                  className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-transparent"
                >
                  Projects &amp; Repositories
                </motion.h1>
              </div>

              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.65, ease: BUILD_EASE }}
                className="text-sm sm:text-base text-slate-400 leading-relaxed"
              >
                Specialized projects across macro intelligence environments, athletic training methodologies, and modern web engineering.
              </motion.p>
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.78, ease: BUILD_EASE }}
              className="flex items-center gap-4 text-[11px] font-editorial-mono text-slate-500 uppercase tracking-wider shrink-0"
            >
              <span>03 Core Disciplines</span>
              <span className="text-slate-700" aria-hidden="true">/</span>
              <span className="text-slate-400">2026 Edition</span>
            </motion.div>
          </div>

          {/* Hero Bottom Divider Sweeps Across */}
          <motion.div
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.15, delay: 0.65, ease: BUILD_EASE }}
            style={{ transformOrigin: 'left' }}
            className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.09]"
          />
        </section>

        {/* Project Grid — Cards unfold & assemble as you scroll */}
        <section aria-label="Featured Projects">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {PROJECTS.map((project, idx) => {
              const cardDelay = idx * 0.14;
              return (
                <motion.article
                  key={project.id}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{ duration: 0.9, delay: cardDelay, ease: BUILD_EASE }}
                  className={`group relative rounded-none overflow-hidden bg-gradient-to-b from-[#111829]/90 to-[#0c111e]/95 border border-white/[0.09] transition-all duration-300 flex flex-col justify-between shadow-[0_12px_40px_-16px_rgba(0,0,0,0.75)] hover:-translate-y-1 hover:shadow-2xl ${project.accentGlow}`}
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)' }}
                >
                  {/* Top Bar Sweeps Left-to-Right on Scroll */}
                  <motion.div
                    initial={prefersReducedMotion ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, amount: 'some' }}
                    transition={{ duration: 0.9, delay: cardDelay + 0.15, ease: BUILD_EASE }}
                    style={{ transformOrigin: 'left' }}
                    className={`h-[2px] w-full bg-white/[0.1] transition-colors duration-300 ${project.topBar}`}
                  />

                  <div>
                    {/* Card Visual */}
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block aspect-16/10 overflow-hidden bg-slate-950 relative cursor-pointer touch-manipulation"
                      aria-label={`Open ${project.title}`}
                    >
                      <motion.img
                        initial={prefersReducedMotion ? false : { scale: 1.06, opacity: 0.4 }}
                        whileInView={{ scale: 1, opacity: 0.9 }}
                        viewport={{ once: true, amount: 'some' }}
                        transition={{ duration: 1.15, delay: cardDelay + 0.1, ease: BUILD_EASE }}
                        src={project.image}
                        alt={project.title}
                        loading={idx === 0 ? 'eager' : 'lazy'}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1626] via-[#0f1626]/20 to-transparent pointer-events-none" />

                      {/* Top Floating Tag */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="text-[10px] font-editorial-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-none bg-[#070a12]/85 text-slate-100 backdrop-blur-md border border-white/15">
                          {project.tag}
                        </span>
                      </div>

                      {/* Bottom Floating Status */}
                      <div className="absolute bottom-3 right-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] font-editorial-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-none border backdrop-blur-md ${project.statusText}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${project.dotColor}`} />
                          {project.status}
                        </span>
                      </div>
                    </a>

                    {/* Card Body */}
                    <div className="p-6 space-y-3 text-left">
                      <div className="space-y-1">
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.12em] font-editorial-mono">
                          {project.subtitle}
                        </p>
                        <h2
                          className={`text-xl font-bold tracking-tight text-white transition-colors leading-snug ${project.titleHover}`}
                        >
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="touch-manipulation"
                          >
                            {project.title}
                          </a>
                        </h2>
                      </div>

                      <p className="text-sm text-slate-400 leading-relaxed">
                        {project.description}
                      </p>

                      {/* Subtle Unboxed Highlights */}
                      <div className="pt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-editorial-mono text-slate-500">
                        {project.highlights.map((item, i) => (
                          <React.Fragment key={item}>
                            <span>{item}</span>
                            {i < project.highlights.length - 1 && (
                              <span className="text-slate-700" aria-hidden="true">·</span>
                            )}
                          </React.Fragment>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer CTA */}
                  <div className="px-6 pb-6 pt-4 border-t border-white/[0.06] flex items-center justify-between gap-3">
                    <span className="text-[11px] font-editorial-mono text-slate-600 font-semibold">
                      {project.index} / 2026
                    </span>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 sm:flex-none h-10 inline-flex items-center justify-center gap-2 px-4 rounded-none bg-white/[0.05] hover:bg-amber-400 text-slate-100 hover:text-slate-950 border border-white/[0.12] hover:border-amber-400 text-xs font-bold uppercase tracking-wider transition-all duration-200 touch-manipulation group/btn"
                    >
                      <span>{project.actionText}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </section>

        {/* Connect Banner — Constructs on scroll */}
        <motion.section
          initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 'some' }}
          transition={{ duration: 0.95, ease: BUILD_EASE }}
          className="relative overflow-hidden p-8 sm:p-12 rounded-none border border-white/[0.09] bg-gradient-to-br from-[#121a2e]/90 via-[#0d1322]/95 to-[#0a0f1c] text-center space-y-4 shadow-2xl"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)' }}
        >
          {/* Animated Top Amber Rule on Scroll */}
          <motion.div
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 1.05, delay: 0.15, ease: BUILD_EASE }}
            style={{ transformOrigin: 'left' }}
            className="absolute top-0 left-0 right-0 h-[2px] bg-amber-400/70"
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(380px 180px at 50% 0%, rgba(251, 191, 36, 0.1), transparent 72%)',
            }}
            aria-hidden="true"
          />

          <div className="relative space-y-3">
            <span className="text-[11px] font-editorial-mono font-semibold uppercase tracking-[0.2em] text-amber-400 block">
              Connect &amp; Inquire
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Gabriel Vasquez
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Available for quantitative macro research, athletic coaching, and web development consultations.
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a
                href="mailto:matterr99@outlook.com"
                className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 px-6 rounded-none bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/15 transition-all font-editorial-mono touch-manipulation"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>Send Direct Email</span>
              </a>

              <button
                onClick={handleCopyEmail}
                type="button"
                className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 px-5 rounded-none bg-white/[0.05] hover:bg-white/[0.09] active:scale-[0.98] text-slate-200 hover:text-white border border-white/[0.12] font-editorial-mono text-xs font-medium transition-all touch-manipulation cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-emerald-400">Copied to Clipboard</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>Copy Address</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer — Reveals on scroll, extra bottom padding on mobile so MusicPlayer never overlaps */}
      <motion.footer
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.85, ease: BUILD_EASE }}
        className="relative z-10 border-t border-white/[0.07] bg-[#05080f]/90 py-6 pb-24 sm:pb-6 px-5 sm:px-8"
      >
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] font-editorial-mono text-slate-500 text-center sm:text-left">
          <div className="font-semibold text-slate-300 uppercase tracking-wider">
            Gabriel Vasquez · Selected Works
          </div>
          <div>&copy; 2026 Gabriel Vasquez. All Rights Reserved.</div>
        </div>
      </motion.footer>

      {/* Floating 3-Track Ambient Music Player */}
      <MusicPlayer />
    </div>
  );
}
