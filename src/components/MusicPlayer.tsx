import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  Headphones,
  Music,
  X,
  Globe,
} from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { COPY, Lang } from '../i18n';

export interface Track {
  id: string;
  number: string;
  title: string;
  artist: string;
  src: string;
}

export const TRACKS: Track[] = [
  {
    id: 'caracas-en-el-2000',
    number: '01',
    title: 'Caracas en el 2000',
    artist: 'Elena Rose, Danny Ocean & Jerry Di',
    src: './audio/caracas-en-el-2000.m4a',
  },
  {
    id: 'dame-un-break',
    number: '02',
    title: 'Dame Un Break',
    artist: 'Rawayana',
    src: './audio/dame-un-break.m4a',
  },
  {
    id: 'dont-stop-til-you-get-enough',
    number: '03',
    title: "Don't Stop 'Til You Get Enough",
    artist: 'Michael Jackson',
    src: './audio/dont-stop-til-you-get-enough.m4a',
  },
  {
    id: 'beat-it',
    number: '04',
    title: 'Beat It',
    artist: 'Michael Jackson',
    src: './audio/beat-it.m4a',
  },
  {
    id: 'bad',
    number: '05',
    title: 'Bad',
    artist: 'Michael Jackson',
    src: './audio/bad.m4a',
  },
  {
    id: 'everybody-wants-to-rule-the-world',
    number: '06',
    title: 'Everybody Wants To Rule The World',
    artist: 'Tears For Fears',
    src: './audio/everybody-wants-to-rule-the-world.m4a',
  },
  {
    id: 'white-horse',
    number: '07',
    title: 'White Horse',
    artist: 'Chris Stapleton',
    src: './audio/white-horse.m4a',
  },
  {
    id: 'se-vienen-cositas',
    number: '08',
    title: 'Se Vienen Cositas',
    artist: 'Featured Track',
    src: './audio/se-vienen-cositas.m4a',
  },
];

function formatTime(sec: number): string {
  if (!Number.isFinite(sec) || sec <= 0) return '0:00';
  const s = Math.floor(sec);
  const m = Math.floor(s / 60);
  const rem = s % 60;
  return `${m}:${rem.toString().padStart(2, '0')}`;
}

interface MusicPlayerProps {
  lang?: Lang;
  onToggleLang?: () => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({ lang = 'en', onToggleLang }) => {
  const prefersReducedMotion = useReducedMotion();
  const m = COPY[lang].music;
  const [showWelcomePrompt, setShowWelcomePrompt] = useState(true);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [volume, setVolume] = useState(0.65);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const track = TRACKS[trackIndex];
  const effectiveVolume = isMuted ? 0 : volume;
  const getArtistLabel = (t: Track) => (t.id === 'se-vienen-cositas' ? m.featuredTrack : t.artist);

  // Keep audio element volume synced
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = effectiveVolume;
    }
  }, [effectiveVolume]);

  // Dismiss welcome prompt on Escape
  useEffect(() => {
    if (!showWelcomePrompt) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowWelcomePrompt(false);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [showWelcomePrompt]);

  const playTrackByIndex = useCallback((index: number) => {
    const nextTrack = TRACKS[index];
    setTrackIndex(index);
    setCurrentTime(0);
    setDuration(0);

    const audio = audioRef.current;
    if (!audio) return;

    audio.src = nextTrack.src;
    audio.load();
    audio.volume = effectiveVolume;
    audio
      .play()
      .then(() => setIsPlaying(true))
      .catch(() => setIsPlaying(false));
  }, [effectiveVolume]);

  const togglePlayPause = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      if (!audio.src) {
        audio.src = track.src;
      }
      audio.volume = effectiveVolume;
      audio
        .play()
        .then(() => setIsPlaying(true))
        .catch(() => setIsPlaying(false));
    }
  }, [isPlaying, track.src, effectiveVolume]);

  const handlePrev = useCallback(() => {
    const prevIdx = (trackIndex - 1 + TRACKS.length) % TRACKS.length;
    playTrackByIndex(prevIdx);
  }, [trackIndex, playTrackByIndex]);

  const handleNext = useCallback(() => {
    const nextIdx = (trackIndex + 1) % TRACKS.length;
    playTrackByIndex(nextIdx);
  }, [trackIndex, playTrackByIndex]);

  const handleStartFromPrompt = (index = 0) => {
    setShowWelcomePrompt(false);
    setIsExpanded(false);
    playTrackByIndex(index);
  };

  const progressPct = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <>
      {/* Hidden Native HTML5 Audio Engine */}
      <audio
        ref={audioRef}
        preload="none"
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onEnded={handleNext}
        onPause={() => setIsPlaying(false)}
        onPlay={() => setIsPlaying(true)}
      />

      {/* Initial Entry Music Prompt Modal — Animated architectural build */}
      <AnimatePresence>
        {showWelcomePrompt && (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              pointerEvents: 'none',
              transition: { duration: prefersReducedMotion ? 0.01 : 0.18 },
            }}
            transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, ease: 'easeOut' }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-[#04060c]/85 sm:backdrop-blur-md"
            role="dialog"
            aria-modal="true"
            aria-label={m.dialogAria}
            onClick={() => setShowWelcomePrompt(false)}
          >
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={
                prefersReducedMotion
                  ? { opacity: 0, transition: { duration: 0.01 } }
                  : { opacity: 0, y: 10, scale: 0.985, transition: { duration: 0.16 } }
              }
              transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-md max-h-[90dvh] flex flex-col rounded-none border border-white/[0.12] bg-[#0b101d]/98 shadow-[0_24px_70px_-16px_rgba(0,0,0,0.9)] overflow-hidden"
              style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
            >
              {/* Animated Top Amber Construction Bar */}
              <motion.div
                initial={prefersReducedMotion ? false : { scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.7, delay: prefersReducedMotion ? 0 : 0.08, ease: [0.22, 1, 0.36, 1] }}
                style={{ transformOrigin: 'left' }}
                className="h-[2px] w-full bg-amber-400 shrink-0"
              />

              {/* Prompt Header */}
              <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4 border-b border-white/[0.07] shrink-0">
                <div className="space-y-2">
                  <motion.div
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: prefersReducedMotion ? 0 : 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="inline-flex items-center gap-2 text-[10px] font-editorial-mono font-semibold uppercase tracking-[0.18em] text-amber-400"
                  >
                    <Headphones className="w-3.5 h-3.5" />
                    <span>{m.badge}</span>
                  </motion.div>

                  <div className="overflow-hidden">
                    <motion.h2
                      initial={prefersReducedMotion ? false : { y: '100%', opacity: 0 }}
                      animate={{ y: '0%', opacity: 1 }}
                      transition={{ duration: prefersReducedMotion ? 0.01 : 0.5, delay: prefersReducedMotion ? 0 : 0.14, ease: [0.22, 1, 0.36, 1] }}
                      className="text-xl font-extrabold tracking-tight text-white leading-snug"
                    >
                      {m.heading}
                    </motion.h2>
                  </div>

                  <motion.p
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: prefersReducedMotion ? 0 : 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="text-xs text-slate-400 leading-relaxed"
                  >
                    {m.description}
                  </motion.p>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {onToggleLang && (
                    <button
                      type="button"
                      onClick={onToggleLang}
                      aria-label={COPY[lang].header.langToggleAria}
                      className="h-7 px-2 inline-flex items-center gap-1 text-[10px] font-editorial-mono font-semibold uppercase tracking-wider border border-white/[0.1] bg-white/[0.04] hover:bg-white/[0.09] hover:border-amber-400/50 text-slate-300 transition-colors cursor-pointer"
                    >
                      <Globe className="w-3 h-3 text-amber-400" />
                      <span>{lang === 'en' ? 'ES' : 'EN'}</span>
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => setShowWelcomePrompt(false)}
                    aria-label={m.closeAria}
                    className="p-1.5 text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Quick Track Picker inside Prompt — Staggered Reveal */}
              <div className="min-h-0 flex-1 max-h-56 overflow-y-auto divide-y divide-white/[0.05] bg-[#080c16]/70">
                {TRACKS.map((t, idx) => (
                  <motion.button
                    key={t.id}
                    type="button"
                    initial={prefersReducedMotion ? false : { opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: prefersReducedMotion ? 0.01 : 0.35,
                      delay: prefersReducedMotion ? 0 : 0.16 + idx * 0.035,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    onClick={() => handleStartFromPrompt(idx)}
                    className="w-full px-6 py-2.5 flex items-center justify-between gap-3 text-left hover:bg-amber-400/[0.08] transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-[11px] font-editorial-mono font-bold text-slate-500 group-hover:text-amber-400 transition-colors">
                        {t.number}
                      </span>
                      <div className="min-w-0">
                        <div className="text-xs font-semibold text-slate-100 group-hover:text-white truncate">
                          {t.title}
                        </div>
                        <div className="text-[10px] font-editorial-mono text-slate-500 truncate">
                          {getArtistLabel(t)}
                        </div>
                      </div>
                    </div>
                    <Play className="w-3 h-3 text-slate-500 group-hover:text-amber-400 shrink-0 fill-current" />
                  </motion.button>
                ))}
              </div>

              {/* Prompt Actions */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.35, delay: prefersReducedMotion ? 0 : 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="p-5 border-t border-white/[0.08] bg-[#0b101d] flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 shrink-0"
              >
                <button
                  type="button"
                  onClick={() => handleStartFromPrompt(0)}
                  className="flex-1 h-11 inline-flex items-center justify-center gap-2 px-5 rounded-none bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-slate-950 font-bold text-xs uppercase tracking-wider font-editorial-mono transition-all cursor-pointer"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>{m.playMusic}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setShowWelcomePrompt(false)}
                  className="h-11 inline-flex items-center justify-center px-5 rounded-none bg-white/[0.04] hover:bg-white/[0.09] text-slate-300 hover:text-white border border-white/[0.1] font-editorial-mono text-xs font-medium uppercase tracking-wider transition-all cursor-pointer"
                >
                  {m.noThanks}
                </button>
              </motion.div>

              {/* Copyright & Non-Commercial Audio Notice */}
              <div className="px-6 py-3 border-t border-white/[0.06] bg-[#070a12] text-[10px] leading-relaxed font-editorial-mono text-slate-500 shrink-0">
                {m.modalNoticePrefix}{' '}
                <a
                  href="mailto:matterr99@outlook.com?subject=Audio%20Removal%20Request"
                  className="text-slate-400 hover:text-amber-400 underline underline-offset-2 transition-colors"
                >
                  matterr99@outlook.com
                </a>
                .
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Persistent Floating Squared Music Player Dock */}
      <motion.aside
        initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: prefersReducedMotion ? 0.01 : 0.45, delay: prefersReducedMotion ? 0 : 0.35, ease: 'easeOut' }}
        aria-label={m.playerAria}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-[calc(100vw-2rem)] sm:w-[350px] max-w-[370px]"
      >
        <div
          className="rounded-none border border-white/[0.12] border-t-2 border-t-amber-400 bg-[#0b101d]/95 backdrop-blur-xl shadow-[0_18px_50px_-12px_rgba(0,0,0,0.85)] overflow-hidden"
          style={{ boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)' }}
        >
          {/* Expandable 8-Track Playlist & Volume Drawer */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={prefersReducedMotion ? false : { height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={prefersReducedMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0.01 : 0.22, ease: 'easeOut' }}
                className="overflow-hidden border-b border-white/[0.08]"
              >
                <div className="px-4 py-2.5 bg-white/[0.02] border-b border-white/[0.06] flex items-center justify-between text-[10px] font-editorial-mono uppercase tracking-[0.16em] text-slate-400">
                  <span className="flex items-center gap-1.5">
                    <Music className="w-3 h-3 text-amber-400" />
                    <span>{m.soundtrack}</span>
                  </span>
                  <span>{m.trackCount}</span>
                </div>

                <div className="max-h-60 overflow-y-auto divide-y divide-white/[0.05]">
                  {TRACKS.map((t, idx) => {
                    const active = idx === trackIndex;
                    return (
                      <button
                        key={t.id}
                        type="button"
                        onClick={() => playTrackByIndex(idx)}
                        className={`w-full px-4 py-2.5 flex items-center justify-between gap-3 text-left transition-colors cursor-pointer ${
                          active
                            ? 'bg-amber-400/[0.1] text-white'
                            : 'hover:bg-white/[0.04] text-slate-300'
                        }`}
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <span
                            className={`text-[11px] font-editorial-mono font-bold ${
                              active ? 'text-amber-400' : 'text-slate-500'
                            }`}
                          >
                            {t.number}
                          </span>
                          <div className="min-w-0">
                            <div className="text-xs font-semibold truncate">{t.title}</div>
                            <div className="text-[10px] font-editorial-mono text-slate-500 truncate">
                              {getArtistLabel(t)}
                            </div>
                          </div>
                        </div>
                        {active && isPlaying && (
                          <span className="text-[9px] font-editorial-mono font-bold uppercase tracking-wider text-amber-400 shrink-0">
                            {m.playing}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Volume Control */}
                <div className="px-4 py-2.5 bg-[#080c16] border-t border-white/[0.06] flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => setIsMuted((prev) => !prev)}
                    aria-label={isMuted ? m.unmuteAria : m.muteAria}
                    className="text-slate-400 hover:text-amber-400 transition-colors cursor-pointer"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX className="w-3.5 h-3.5" />
                    ) : (
                      <Volume2 className="w-3.5 h-3.5" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.02}
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setIsMuted(false);
                      setVolume(Number(e.target.value));
                    }}
                    aria-label={m.volumeAria}
                    className="flex-1 h-1 accent-amber-400 cursor-pointer"
                  />
                  <span className="text-[10px] font-editorial-mono text-slate-500 tabular-nums w-8 text-right">
                    {Math.round((isMuted ? 0 : volume) * 100)}%
                  </span>
                </div>

                {/* Audio Attribution & Takedown Notice */}
                <div className="px-4 py-2 bg-[#060911] border-t border-white/[0.05] text-[9.5px] leading-relaxed font-editorial-mono text-slate-500">
                  {m.drawerNoticePrefix}{' '}
                  <a
                    href="mailto:matterr99@outlook.com?subject=Audio%20Removal%20Request"
                    className="text-slate-400 hover:text-amber-400 underline underline-offset-2 transition-colors"
                  >
                    {m.removalRequest}
                  </a>
                  .
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Interactive Progress Bar */}
          <div
            role="progressbar"
            aria-valuenow={Math.round(progressPct)}
            aria-valuemin={0}
            aria-valuemax={100}
            onClick={(e) => {
              const audio = audioRef.current;
              if (!audio || !duration) return;
              const rect = e.currentTarget.getBoundingClientRect();
              const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
              audio.currentTime = ratio * duration;
              setCurrentTime(audio.currentTime);
            }}
            className="h-1.5 w-full bg-white/[0.07] cursor-pointer relative group"
            title={m.seekTitle}
          >
            <div
              className="h-full bg-amber-400 transition-all duration-150"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {/* Compact Control Bar */}
          <div className="px-3.5 py-2.5 flex items-center justify-between gap-3">
            {/* Track Info + Live Equalizer Bars */}
            <button
              type="button"
              onClick={() => setIsExpanded((e) => !e)}
              className="flex items-center gap-2.5 min-w-0 flex-1 text-left cursor-pointer group"
            >
              <div className="w-7 h-7 shrink-0 border border-white/[0.1] bg-white/[0.03] flex items-end justify-center gap-[2px] p-1.5">
                {[0.55, 1, 0.72].map((scale, i) => (
                  <span
                    key={i}
                    className={`w-[2px] bg-amber-400 transition-all ${
                      isPlaying ? 'animate-eq-bar' : 'h-1 opacity-45'
                    }`}
                    style={
                      isPlaying
                        ? {
                            height: `${Math.round(scale * 14)}px`,
                            animationDelay: `${i * 0.16}s`,
                          }
                        : undefined
                    }
                  />
                ))}
              </div>

              <div className="min-w-0">
                <div className="text-xs font-bold text-white group-hover:text-amber-300 transition-colors truncate">
                  {track.title}
                </div>
                <div className="text-[10px] font-editorial-mono text-slate-400 tabular-nums truncate">
                  {getArtistLabel(track)} · {formatTime(currentTime)}
                  {duration > 0 ? ` / ${formatTime(duration)}` : ''}
                </div>
              </div>
            </button>

            {/* Transport Controls */}
            <div className="flex items-center gap-1 shrink-0">
              <button
                type="button"
                onClick={handlePrev}
                aria-label={m.prevAria}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <SkipBack className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={togglePlayPause}
                aria-label={isPlaying ? m.pauseAria : m.playAria}
                className="w-8 h-8 flex items-center justify-center bg-amber-400 hover:bg-amber-300 text-slate-950 transition-colors cursor-pointer"
              >
                {isPlaying ? (
                  <Pause className="w-3.5 h-3.5 fill-current" />
                ) : (
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                )}
              </button>

              <button
                type="button"
                onClick={handleNext}
                aria-label={m.nextAria}
                className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors cursor-pointer"
              >
                <SkipForward className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={() => setIsExpanded((e) => !e)}
                aria-label={isExpanded ? m.collapseAria : m.expandAria}
                className="w-7 h-8 flex items-center justify-center text-slate-400 hover:text-amber-400 transition-colors cursor-pointer border-l border-white/[0.08] ml-0.5 pl-1"
              >
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};
