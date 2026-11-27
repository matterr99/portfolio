import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Mail, Github, Check, Copy, Globe } from 'lucide-react';
import { MusicPlayer } from './components/MusicPlayer';
import { COPY, Lang } from './i18n';

import tennisImg from './assets/images/tennis_court_hero.jpg';
import kairosImg from './assets/images/bloomberg_lead_macro_1790446169392.jpg';
import webdevImg from '../public/images/IMG_1388.jpeg';

const PROJECTS = [
  {
    id: 'tennis',
    index: '01',
    dotColor: 'bg-emerald-400',
    topBar: 'group-hover:bg-emerald-400',
    statusText: 'text-emerald-300 border-emerald-400/25 bg-emerald-950/75',
    accentGlow: 'hover:border-emerald-400/35 hover:shadow-emerald-500/10',
    titleHover: 'group-hover:text-emerald-300',
    url: 'https://matterr99.github.io/tennis-portfolio/',
    image: tennisImg,
  },
  {
    id: 'kairos',
    index: '02',
    dotColor: 'bg-amber-400',
    topBar: 'group-hover:bg-amber-400',
    statusText: 'text-amber-300 border-amber-400/25 bg-amber-950/75',
    accentGlow: 'hover:border-amber-400/35 hover:shadow-amber-500/10',
    titleHover: 'group-hover:text-amber-300',
    url: 'https://matterr99.github.io/kairos-macro-trading-hub/',
    image: kairosImg,
  },
  {
    id: 'webdev',
    index: '03',
    dotColor: 'bg-cyan-400',
    topBar: 'group-hover:bg-cyan-400',
    statusText: 'text-cyan-300 border-cyan-400/25 bg-cyan-950/75',
    accentGlow: 'hover:border-cyan-400/35 hover:shadow-cyan-500/10',
    titleHover: 'group-hover:text-cyan-300',
    url: 'https://github.com/matterr99',
    image: webdevImg,
  },
] as const;

const BUILD_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function App() {
  const [lang, setLang] = useState<Lang>(() => {
    if (typeof window === 'undefined') return 'en';
    try {
      const saved = window.localStorage.getItem('portfolio-lang');
      return saved === 'es' ? 'es' : 'en';
    } catch {
      return 'en';
    }
  });
  const [copied, setCopied] = useState(false);
  const [pageReady, setPageReady] = useState(false);
  const [introFinished, setIntroFinished] = useState(false);
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true
  );
  const prefersReducedMotion = useReducedMotion();
  const ready = pageReady || Boolean(prefersReducedMotion);
  const t = COPY[lang];

  useEffect(() => {
    if (!ready) return;
    if (prefersReducedMotion) {
      setIntroFinished(true);
      return;
    }
    const timer = window.setTimeout(() => setIntroFinished(true), 950);
    return () => window.clearTimeout(timer);
  }, [ready, prefersReducedMotion]);

  useEffect(() => {
    document.documentElement.lang = lang;
    try {
      window.localStorage.setItem('portfolio-lang', lang);
    } catch {
      // Ignore storage errors in restricted/private browsing contexts
    }
  }, [lang]);

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)');
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  const toggleLang = () => setLang((prev) => (prev === 'en' ? 'es' : 'en'));

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('matterr99@outlook.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-h-[100dvh] bg-[#070a12] text-slate-100 font-editorial-sans selection:bg-amber-400 selection:text-slate-950 flex flex-col justify-between overflow-x-clip">
      {/* Top Architectural Progress Sweep — fires once modal is dismissed */}
      {ready && !prefersReducedMotion && (
        <motion.div
          initial={{ scaleX: 0, opacity: 1 }}
          animate={{ scaleX: 1, opacity: [1, 1, 0] }}
          transition={{ duration: 1.5, times: [0, 0.8, 1], ease: BUILD_EASE }}
          style={{ transformOrigin: 'left' }}
          className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-amber-400 via-amber-300 to-cyan-400 z-50 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Subtle Ambient Background Lighting & Architectural Grid (Zero-Blur Radial Gradients for 60fps Mobile Scroll) */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.0, ease: 'easeOut' }}
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

      {/* Header — Step 1 */}
      <motion.header
        initial={prefersReducedMotion ? false : { opacity: 0, y: -14 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: -14 }}
        transition={{ duration: 0.55, delay: 0.05, ease: BUILD_EASE }}
        className="sticky top-0 z-30 bg-[#070a12]/80 backdrop-blur-xl pt-[env(safe-area-inset-top)]"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-2 sm:gap-4">
          <a
            href="#"
            className="group text-sm sm:text-lg font-extrabold tracking-tight uppercase text-white hover:text-amber-300 transition-colors shrink-0 flex items-center gap-0.5 sm:gap-1"
          >
            <span>Gabriel Vasquez</span>
            <span className="text-amber-400 group-hover:scale-125 transition-transform inline-block">.</span>
          </a>

          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t.header.langToggleAria}
              title={t.header.langToggleAria}
              className="h-9 sm:h-10 px-2 sm:px-3 text-[11px] font-semibold font-editorial-mono uppercase tracking-wider flex items-center gap-1 sm:gap-1.5 transition-all rounded-none bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.1] hover:border-amber-400/50 text-slate-300 hover:text-white cursor-pointer touch-manipulation"
            >
              <Globe className="hidden sm:block w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className={lang === 'en' ? 'text-white' : 'text-slate-500'}>EN</span>
              <span className="text-slate-600" aria-hidden="true">/</span>
              <span className={lang === 'es' ? 'text-amber-300' : 'text-slate-500'}>ES</span>
            </button>

            <a
              href="mailto:matterr99@outlook.com"
              className="h-9 w-9 sm:w-auto sm:h-10 sm:px-3.5 text-xs font-medium font-editorial-mono text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-all rounded-none bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] hover:border-amber-400/50 touch-manipulation"
              aria-label={t.header.emailAria}
              title={t.header.emailAria}
            >
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="hidden md:inline">matterr99@outlook.com</span>
              <span className="hidden sm:inline md:hidden">{t.header.emailMobile}</span>
            </a>

            <a
              href="https://github.com/matterr99"
              target="_blank"
              rel="noopener noreferrer"
              className="h-9 w-9 sm:h-10 sm:w-10 flex items-center justify-center rounded-none border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/25 text-slate-300 hover:text-white transition-all touch-manipulation"
              title={t.header.githubTitle}
              aria-label={t.header.githubTitle}
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
        {/* Animated Header Bottom Rule — Step 2 */}
        <motion.div
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          animate={ready ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.65, delay: 0.16, ease: BUILD_EASE }}
          style={{ transformOrigin: 'left' }}
          className="h-px w-full bg-white/[0.08]"
        />
      </motion.header>

      {/* Main Content */}
      <main className="relative z-10 max-w-6xl w-full mx-auto px-5 sm:px-8 py-10 sm:py-16 space-y-12 sm:space-y-16 flex-1">
        {/* Hero Header — Steps 3–7, strictly top-to-bottom */}
        <section className="pb-8 sm:pb-10 relative">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3.5 max-w-2xl">
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, x: -16 }}
                animate={ready ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                transition={{ duration: 0.5, delay: 0.22, ease: BUILD_EASE }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-none bg-amber-400/[0.07] border border-amber-400/20 border-l-2 border-l-amber-400"
              >
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                <span className="text-[11px] font-editorial-mono font-semibold uppercase tracking-[0.16em] text-amber-300">
                  {t.hero.badge}
                </span>
              </motion.div>

              <div className="overflow-hidden">
                <motion.h1
                  initial={prefersReducedMotion ? false : { y: '100%', opacity: 0 }}
                  animate={ready ? { y: '0%', opacity: 1 } : { y: '100%', opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.3, ease: BUILD_EASE }}
                  className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.08] bg-gradient-to-b from-white via-white to-slate-400 bg-clip-text text-transparent"
                >
                  {t.hero.title}
                </motion.h1>
              </div>

              <motion.p
                initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
                animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
                transition={{ duration: 0.5, delay: 0.4, ease: BUILD_EASE }}
                className="text-sm sm:text-base text-slate-400 leading-relaxed"
              >
                {t.hero.description}
              </motion.p>
            </div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ duration: 0.45, delay: 0.48, ease: BUILD_EASE }}
              className="flex items-center gap-4 text-[11px] font-editorial-mono text-slate-500 uppercase tracking-wider shrink-0"
            >
              <span>{t.hero.disciplines}</span>
              <span className="text-slate-700" aria-hidden="true">/</span>
              <span className="text-slate-400">{t.hero.edition}</span>
            </motion.div>
          </div>

          {/* Hero Bottom Divider Sweeps Across — after Hero content */}
          <motion.div
            initial={prefersReducedMotion ? false : { scaleX: 0 }}
            animate={ready ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.7, delay: 0.54, ease: BUILD_EASE }}
            style={{ transformOrigin: 'left' }}
            className="absolute bottom-0 left-0 right-0 h-px bg-white/[0.09]"
          />
        </section>

        {/* Project Grid — Step 8: cascades after Hero on initial view, instant on later scroll */}
        <section aria-label={t.projectsSectionAria}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {PROJECTS.map((project, idx) => {
              const cardDelay = introFinished ? 0 : 0.62 + (isDesktop ? idx * 0.12 : 0);
              const copy = t.projects[project.id];
              return (
                <motion.article
                  key={project.id}
                  initial={prefersReducedMotion ? 'visible' : 'hidden'}
                  whileInView={ready ? 'visible' : undefined}
                  viewport={{ once: true, amount: 'some' }}
                  variants={{
                    hidden: { opacity: 0, y: 24 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.65, delay: cardDelay, ease: BUILD_EASE },
                    },
                  }}
                  className={`group relative rounded-none overflow-hidden bg-gradient-to-b from-[#111829]/90 to-[#0c111e]/95 border border-white/[0.09] transition-[border-color,box-shadow,translate] duration-300 flex flex-col justify-between shadow-[0_12px_40px_-16px_rgba(0,0,0,0.75)] hover:-translate-y-1 hover:shadow-2xl ${project.accentGlow}`}
                  style={{ boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)' }}
                >
                  {/* Top Bar Sweeps Left-to-Right — synced to card */}
                  <motion.div
                    variants={{
                      hidden: { scaleX: 0 },
                      visible: {
                        scaleX: 1,
                        transition: { duration: 0.6, delay: cardDelay + 0.08, ease: BUILD_EASE },
                      },
                    }}
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
                      aria-label={copy.openAria}
                    >
                      <motion.div
                        variants={{
                          hidden: { scale: 1.06, opacity: 0.4 },
                          visible: {
                            scale: 1,
                            opacity: 1,
                            transition: { duration: 0.75, delay: cardDelay + 0.15, ease: BUILD_EASE },
                          },
                        }}
                        className="w-full h-full"
                      >
                        <img
                          src={project.image}
                          alt={copy.title}
                          loading={idx === 0 ? 'eager' : 'lazy'}
                          className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-[scale,opacity] duration-700 ease-out"
                        />
                      </motion.div>
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1626] via-[#0f1626]/20 to-transparent pointer-events-none" />

                      {/* Top Floating Tag */}
                      <div className="absolute top-3.5 left-3.5 flex items-center gap-2">
                        <span className="text-[10px] font-editorial-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-none bg-[#070a12]/85 text-slate-100 backdrop-blur-md border border-white/15">
                          {copy.tag}
                        </span>
                      </div>

                      {/* Bottom Floating Status */}
                      <div className="absolute bottom-3 right-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 text-[10px] font-editorial-mono font-semibold uppercase tracking-wider px-2.5 py-1 rounded-none border backdrop-blur-md ${project.statusText}`}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${project.dotColor}`} />
                          {copy.status}
                        </span>
                      </div>
                    </a>

                    {/* Card Body */}
                    <div className="p-6 space-y-3 text-left">
                      <div className="space-y-1">
                        <p className="text-[11px] font-medium text-slate-400 uppercase tracking-[0.12em] font-editorial-mono">
                          {copy.subtitle}
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
                            {copy.title}
                          </a>
                        </h2>
                      </div>

                      <p className="text-sm text-slate-400 leading-relaxed">
                        {copy.description}
                      </p>

                      {/* Subtle Unboxed Highlights */}
                      <div className="pt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-editorial-mono text-slate-500">
                        {copy.highlights.map((item, i) => (
                          <React.Fragment key={item}>
                            <span>{item}</span>
                            {i < copy.highlights.length - 1 && (
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
                      <span>{copy.actionText}</span>
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
          initial={prefersReducedMotion ? 'visible' : 'hidden'}
          whileInView={ready ? 'visible' : undefined}
          viewport={{ once: true, amount: 'some' }}
          variants={{
            hidden: { opacity: 0, y: 24 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: BUILD_EASE } },
          }}
          className="relative overflow-hidden p-8 sm:p-12 rounded-none border border-white/[0.09] bg-gradient-to-br from-[#121a2e]/90 via-[#0d1322]/95 to-[#0a0f1c] text-center space-y-4 shadow-2xl"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.06)' }}
        >
          {/* Animated Top Amber Rule on Scroll — synced to banner */}
          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              visible: {
                scaleX: 1,
                transition: { duration: 0.75, delay: 0.12, ease: BUILD_EASE },
              },
            }}
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
              {t.connect.eyebrow}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Gabriel Vasquez
            </h2>
            <p className="text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              {t.connect.description}
            </p>

            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
              <a
                href="mailto:matterr99@outlook.com"
                className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 px-6 rounded-none bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg shadow-amber-500/15 transition-all font-editorial-mono touch-manipulation"
              >
                <Mail className="w-4 h-4 shrink-0" />
                <span>{t.connect.sendEmail}</span>
              </a>

              <button
                onClick={handleCopyEmail}
                type="button"
                className="w-full sm:w-auto h-12 inline-flex items-center justify-center gap-2 px-5 rounded-none bg-white/[0.05] hover:bg-white/[0.09] active:scale-[0.98] text-slate-200 hover:text-white border border-white/[0.12] font-editorial-mono text-xs font-medium transition-all touch-manipulation cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-emerald-400">{t.connect.copied}</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{t.connect.copyAddress}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer — Reveals on scroll, extra bottom padding so the fixed MusicPlayer never overlaps */}
      <motion.footer
        initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
        whileInView={ready ? { opacity: 1, y: 0 } : undefined}
        viewport={{ once: true, amount: 'some' }}
        transition={{ duration: 0.65, ease: BUILD_EASE }}
        className="relative z-10 border-t border-white/[0.07] bg-[#05080f]/90 pt-6 pb-28 sm:pb-24 px-5 sm:px-8"
      >
        <div className="max-w-6xl mx-auto space-y-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 text-[11px] font-editorial-mono text-slate-500 text-center sm:text-left">
            <div className="font-semibold text-slate-300 uppercase tracking-wider">
              {t.footer.brand}
            </div>
            <div>{t.footer.copyright}</div>
          </div>

          <div className="pt-3 border-t border-white/[0.06] text-[10px] leading-relaxed font-editorial-mono text-slate-500/90 text-center sm:text-left">
            <span className="text-slate-400 uppercase tracking-wider font-semibold">
              {t.footer.audioNoticeLabel}
            </span>{' '}
            {t.footer.audioNoticePrefix}{' '}
            <a
              href="mailto:matterr99@outlook.com?subject=Audio%20Removal%20Request"
              className="text-slate-400 hover:text-amber-400 underline underline-offset-2 transition-colors"
            >
              matterr99@outlook.com
            </a>{' '}
            {t.footer.audioNoticeSuffix}
          </div>
        </div>
      </motion.footer>

      {/* Floating 8-Track Ambient Music Player */}
      <MusicPlayer
        lang={lang}
        onToggleLang={toggleLang}
        pageReady={ready}
        onPromptDismiss={() => setPageReady(true)}
      />
    </div>
  );
}
