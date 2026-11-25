import React, { useState, useEffect, useRef } from 'react';
import { ThemeMode } from '../types';
import { Target, Zap, RotateCcw, Play, Pause } from 'lucide-react';

interface TennisCourtVisualizerProps {
  theme: ThemeMode;
}

const STROKE_PRESETS = {
  forehand: { velocity: 124, spinRate: 2850, label: 'Heavy Topspin Cross-Court', status: 'OPTIMAL COIL' },
  serve: { velocity: 198, spinRate: 2200, label: 'Flat First Serve — T-Line', status: 'PEAK PRONATION' },
  backhand: { velocity: 112, spinRate: 2100, label: 'Two-Handed Drive Down-the-Line', status: 'CLEAN TRANSFER' },
} as const;

export const TennisCourtVisualizer: React.FC<TennisCourtVisualizerProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [strokeType, setStrokeType] = useState<'serve' | 'forehand' | 'backhand'>('forehand');
  const [spinRate, setSpinRate] = useState<number>(STROKE_PRESETS.forehand.spinRate);
  const [velocity, setVelocity] = useState<number>(STROKE_PRESETS.forehand.velocity);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const logicalW = 520;
    const logicalH = 180;
    canvas.width = logicalW * dpr;
    canvas.height = logicalH * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    let animId: number;
    let progress = 0.25;

    const render = () => {
      ctx.clearRect(0, 0, logicalW, logicalH);

      const w = logicalW;
      const h = logicalH;

      // Outer court surround
      ctx.fillStyle = isDark ? '#07130e' : '#0f3d24';
      ctx.fillRect(0, 0, w, h);

      // Inner playing surface
      ctx.fillStyle = isDark ? '#0d261c' : '#166534';
      ctx.fillRect(22, 20, w - 44, h - 40);

      // Court baseline and sidelines
      ctx.strokeStyle = 'rgba(226, 252, 180, 0.85)';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(30, 28, w - 60, h - 56);

      // Singles sidelines
      ctx.strokeStyle = 'rgba(226, 252, 180, 0.45)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(30, 44);
      ctx.lineTo(w - 30, 44);
      ctx.moveTo(30, h - 44);
      ctx.lineTo(w - 30, h - 44);
      ctx.stroke();

      // Service boxes
      ctx.strokeStyle = 'rgba(226, 252, 180, 0.65)';
      ctx.strokeRect(w * 0.27, 44, w * 0.46, h - 88);
      ctx.beginPath();
      ctx.moveTo(w * 0.27, h / 2);
      ctx.lineTo(w * 0.73, h / 2);
      ctx.stroke();

      // Net
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(w / 2, 22);
      ctx.lineTo(w / 2, h - 22);
      ctx.stroke();
      ctx.setLineDash([]);

      // Trajectory calculation based on stroke & spin
      const spinBend = ((spinRate - 1800) / 1600) * 18;
      const startX = 42;
      const startY = strokeType === 'serve' ? 54 : strokeType === 'forehand' ? h - 52 : 52;
      const targetX = strokeType === 'serve' ? w * 0.71 : w - 52;
      const targetY = strokeType === 'serve' ? h - 60 : strokeType === 'forehand' ? 56 : h - 56;
      const controlX = (startX + targetX) * 0.5;
      const controlY =
        (startY + targetY) * 0.5 + (strokeType === 'forehand' ? -(16 + spinBend) : 14 + spinBend * 0.6);

      // Draw trajectory arc
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.8)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.quadraticCurveTo(controlX, controlY, targetX, targetY);
      ctx.stroke();

      // Animated ball position
      if (isPlaying) {
        const speedStep = 0.008 + (velocity / 220) * 0.012;
        progress = (progress + speedStep) % 1;
      }
      const t = progress;
      const bx = (1 - t) * (1 - t) * startX + 2 * (1 - t) * t * controlX + t * t * targetX;
      const by = (1 - t) * (1 - t) * startY + 2 * (1 - t) * t * controlY + t * t * targetY;

      // Landing zone ring
      ctx.strokeStyle = 'rgba(248, 113, 113, 0.9)';
      ctx.lineWidth = 1.25;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 7, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(targetX, targetY, 2.2, 0, Math.PI * 2);
      ctx.fillStyle = '#f87171';
      ctx.fill();

      // Ball glow & core
      ctx.beginPath();
      ctx.arc(bx, by, 5, 0, Math.PI * 2);
      ctx.fillStyle = '#facc15';
      ctx.shadowBlur = 10;
      ctx.shadowColor = '#facc15';
      ctx.fill();
      ctx.shadowBlur = 0;

      if (isPlaying) {
        animId = requestAnimationFrame(render);
      }
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [strokeType, spinRate, velocity, isDark, isPlaying]);

  const preset = STROKE_PRESETS[strokeType];

  return (
    <div
      className={`w-full rounded-xl border p-4 sm:p-5 transition-colors font-mono ${
        isDark
          ? 'bg-[#0b141a]/95 border-emerald-500/20 text-slate-200'
          : 'bg-stone-50 border-emerald-200 text-slate-900 shadow-xs'
      }`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b ${
          isDark ? 'border-emerald-900/40' : 'border-emerald-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <Target className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`} />
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-emerald-400' : 'text-emerald-800'
            }`}
          >
            BIOMECHANICS // KINEMATIC SHOT VECTOR
          </span>
        </div>

        {/* Stroke Type Selector & Play/Pause */}
        <div className="flex items-center gap-1.5 text-[11px]">
          {(['forehand', 'serve', 'backhand'] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setStrokeType(s);
                setVelocity(STROKE_PRESETS[s].velocity);
                setSpinRate(STROKE_PRESETS[s].spinRate);
              }}
              className={`px-2.5 py-1 rounded capitalize transition-colors cursor-pointer ${
                strokeType === s
                  ? isDark
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-emerald-700 text-white font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-white bg-slate-800/60'
                  : 'text-slate-600 hover:text-slate-900 bg-stone-200'
              }`}
            >
              {s}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setIsPlaying((p) => !p)}
            aria-label={isPlaying ? 'Pause simulation' : 'Play simulation'}
            className={`p-1.5 rounded transition-colors cursor-pointer ${
              isDark
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                : 'bg-stone-200 hover:bg-stone-300 text-slate-700'
            }`}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* 2D Canvas */}
      <div className="relative w-full h-44 rounded-lg overflow-hidden bg-slate-950 flex items-center justify-center border border-emerald-900/40">
        <canvas ref={canvasRef} className="w-full h-full object-contain" />
        <div className="absolute top-2 left-3 text-[10px] text-emerald-300 font-bold tracking-wider bg-black/50 px-2 py-0.5 rounded">
          COURT OVERLAY · {preset.label.toUpperCase()}
        </div>
      </div>

      {/* Interactive Spin Control */}
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px]">
        <label className="flex items-center gap-2 flex-1 min-w-[200px]">
          <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Spin Tune:</span>
          <input
            type="range"
            min={1600}
            max={3400}
            step={50}
            value={spinRate}
            onChange={(e) => setSpinRate(Number(e.target.value))}
            className="flex-1 accent-emerald-500 cursor-pointer"
          />
          <span className={`tabular-nums font-bold ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
            {spinRate} RPM
          </span>
        </label>
      </div>

      {/* Telemetry Strip */}
      <div
        className={`mt-3 p-3 rounded-lg text-xs flex flex-wrap items-center justify-between gap-3 border ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-stone-200'
        }`}
      >
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-1.5">
            <Zap className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
            <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Velocity:</span>
            <span className={`font-bold tabular-nums ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
              {velocity} km/h
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <RotateCcw className={`w-3.5 h-3.5 ${isDark ? 'text-sky-400' : 'text-sky-600'}`} />
            <span className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>Topspin:</span>
            <span className={`font-bold tabular-nums ${isDark ? 'text-sky-400' : 'text-sky-700'}`}>
              {spinRate} RPM
            </span>
          </div>
        </div>

        <div className={`text-[11px] font-semibold ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
          Kinetic Chain: {preset.status}
        </div>
      </div>
    </div>
  );
};
