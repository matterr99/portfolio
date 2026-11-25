import React, { useState, useMemo } from 'react';
import { ThemeMode } from '../types';
import { Activity, BarChart2 } from 'lucide-react';

interface MacroDataVisualizerProps {
  theme: ThemeMode;
}

type Timeframe = '1M' | '3M' | '1Y' | 'ALL';

interface CurvePoint {
  tenor: string;
  rate: number;
  hist: number;
  label: string;
}

const CURVE_BY_TIMEFRAME: Record<Timeframe, { regime: string; points: CurvePoint[] }> = {
  '1M': {
    regime: 'Mild Bull Steepening',
    points: [
      { tenor: '1M', rate: 5.18, hist: 5.30, label: '1-Month T-Bill' },
      { tenor: '3M', rate: 5.12, hist: 5.26, label: '3-Month T-Bill' },
      { tenor: '6M', rate: 4.98, hist: 5.14, label: '6-Month T-Bill' },
      { tenor: '1Y', rate: 4.72, hist: 4.90, label: '1-Year Treasury' },
      { tenor: '2Y', rate: 4.14, hist: 4.30, label: '2-Year Benchmark' },
      { tenor: '5Y', rate: 3.98, hist: 4.08, label: '5-Year Note' },
      { tenor: '10Y', rate: 4.24, hist: 4.20, label: '10-Year Benchmark Note' },
      { tenor: '30Y', rate: 4.52, hist: 4.44, label: '30-Year Bond' },
    ],
  },
  '3M': {
    regime: 'Disinversion Transition',
    points: [
      { tenor: '1M', rate: 5.26, hist: 5.38, label: '1-Month T-Bill' },
      { tenor: '3M', rate: 5.22, hist: 5.34, label: '3-Month T-Bill' },
      { tenor: '6M', rate: 5.08, hist: 5.24, label: '6-Month T-Bill' },
      { tenor: '1Y', rate: 4.82, hist: 5.02, label: '1-Year Treasury' },
      { tenor: '2Y', rate: 4.20, hist: 4.55, label: '2-Year Benchmark' },
      { tenor: '5Y', rate: 3.96, hist: 4.24, label: '5-Year Note' },
      { tenor: '10Y', rate: 4.22, hist: 4.28, label: '10-Year Benchmark Note' },
      { tenor: '30Y', rate: 4.48, hist: 4.42, label: '30-Year Bond' },
    ],
  },
  '1Y': {
    regime: 'Late-Cycle Flatness',
    points: [
      { tenor: '1M', rate: 5.32, hist: 5.45, label: '1-Month T-Bill' },
      { tenor: '3M', rate: 5.28, hist: 5.40, label: '3-Month T-Bill' },
      { tenor: '6M', rate: 5.14, hist: 5.30, label: '6-Month T-Bill' },
      { tenor: '1Y', rate: 4.88, hist: 5.10, label: '1-Year Treasury' },
      { tenor: '2Y', rate: 4.22, hist: 4.75, label: '2-Year Benchmark' },
      { tenor: '5Y', rate: 3.96, hist: 4.35, label: '5-Year Note' },
      { tenor: '10Y', rate: 4.18, hist: 4.25, label: '10-Year Benchmark Note' },
      { tenor: '30Y', rate: 4.45, hist: 4.40, label: '30-Year Bond' },
    ],
  },
  ALL: {
    regime: 'Secular Rate Normalization',
    points: [
      { tenor: '1M', rate: 4.95, hist: 2.85, label: '1-Month T-Bill' },
      { tenor: '3M', rate: 4.92, hist: 2.95, label: '3-Month T-Bill' },
      { tenor: '6M', rate: 4.80, hist: 3.10, label: '6-Month T-Bill' },
      { tenor: '1Y', rate: 4.62, hist: 3.25, label: '1-Year Treasury' },
      { tenor: '2Y', rate: 4.28, hist: 3.45, label: '2-Year Benchmark' },
      { tenor: '5Y', rate: 4.15, hist: 3.65, label: '5-Year Note' },
      { tenor: '10Y', rate: 4.36, hist: 3.85, label: '10-Year Benchmark Note' },
      { tenor: '30Y', rate: 4.64, hist: 4.10, label: '30-Year Bond' },
    ],
  },
};

function buildSmoothPath(coords: { x: number; y: number }[]): string {
  if (coords.length === 0) return '';
  if (coords.length === 1) return `M ${coords[0].x},${coords[0].y}`;
  let d = `M ${coords[0].x.toFixed(1)},${coords[0].y.toFixed(1)}`;
  for (let i = 0; i < coords.length - 1; i++) {
    const p0 = coords[Math.max(0, i - 1)];
    const p1 = coords[i];
    const p2 = coords[i + 1];
    const p3 = coords[Math.min(coords.length - 1, i + 2)];
    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${p2.x.toFixed(1)},${p2.y.toFixed(1)}`;
  }
  return d;
}

export const MacroDataVisualizer: React.FC<MacroDataVisualizerProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  const [timeframe, setTimeframe] = useState<Timeframe>('1Y');
  const [activeCurvePoint, setActiveCurvePoint] = useState<number>(4);

  const { regime, points: curveData } = CURVE_BY_TIMEFRAME[timeframe];

  const { currentCoords, histCoords, currentPath, areaPath, histPath, minRate, maxRate, spread2s10s } =
    useMemo(() => {
      const allRates = curveData.flatMap((d) => [d.rate, d.hist]);
      const minR = Math.floor((Math.min(...allRates) - 0.25) * 4) / 4;
      const maxR = Math.ceil((Math.max(...allRates) + 0.25) * 4) / 4;
      const range = Math.max(0.5, maxR - minR);

      const toY = (val: number) => 126 - ((val - minR) / range) * 108;
      const toX = (idx: number) => 28 + idx * (644 / (curveData.length - 1));

      const cur = curveData.map((pt, idx) => ({ x: toX(idx), y: toY(pt.rate) }));
      const hist = curveData.map((pt, idx) => ({ x: toX(idx), y: toY(pt.hist) }));
      const curPath = buildSmoothPath(cur);
      const area = `${curPath} L ${cur[cur.length - 1].x.toFixed(1)},136 L ${cur[0].x.toFixed(1)},136 Z`;

      const y2 = curveData.find((d) => d.tenor === '2Y')?.rate ?? 0;
      const y10 = curveData.find((d) => d.tenor === '10Y')?.rate ?? 0;
      const spreadBps = Math.round((y10 - y2) * 100);

      return {
        currentCoords: cur,
        histCoords: hist,
        currentPath: curPath,
        areaPath: area,
        histPath: buildSmoothPath(hist),
        minRate: minR,
        maxRate: maxR,
        spread2s10s: spreadBps,
      };
    }, [curveData]);

  const selectedPoint = curveData[activeCurvePoint] ?? curveData[0];
  const deltaBps = Math.round((selectedPoint.rate - selectedPoint.hist) * 100);

  return (
    <div
      className={`w-full rounded-xl border p-4 sm:p-5 transition-colors font-mono ${
        isDark
          ? 'bg-[#0f172a]/95 border-amber-500/20 text-slate-200'
          : 'bg-stone-50 border-stone-200 text-slate-900 shadow-xs'
      }`}
    >
      <div
        className={`flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b ${
          isDark ? 'border-slate-800/60' : 'border-stone-200'
        }`}
      >
        <div className="flex items-center gap-2">
          <Activity className={`w-4 h-4 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isDark ? 'text-amber-400' : 'text-amber-700'
            }`}
          >
            KAIROS // SOVEREIGN YIELD CURVE ({regime.toUpperCase()})
          </span>
        </div>

        {/* Timeframe selector */}
        <div className="flex items-center gap-1 text-[11px]" role="group" aria-label="Yield curve timeframe">
          {(['1M', '3M', '1Y', 'ALL'] as const).map((tf) => (
            <button
              key={tf}
              type="button"
              onClick={() => setTimeframe(tf)}
              className={`px-2.5 py-1 rounded transition-colors cursor-pointer ${
                timeframe === tf
                  ? isDark
                    ? 'bg-amber-400 text-slate-950 font-bold'
                    : 'bg-slate-900 text-white font-bold'
                  : isDark
                  ? 'text-slate-400 hover:text-white bg-slate-800/60'
                  : 'text-slate-600 hover:text-slate-900 bg-stone-200'
              }`}
            >
              {tf}
            </button>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between text-[10px] mb-2">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-amber-500 inline-block" />
            <span className={isDark ? 'text-slate-300' : 'text-slate-700'}>Spot Curve</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span
              className={`w-3 h-0.5 inline-block border-t border-dashed ${
                isDark ? 'border-slate-400' : 'border-slate-500'
              }`}
            />
            <span className={isDark ? 'text-slate-400' : 'text-slate-600'}>Prior Benchmark</span>
          </span>
        </div>
        <span className={isDark ? 'text-slate-500' : 'text-slate-500'}>
          Range: {minRate.toFixed(2)}% – {maxRate.toFixed(2)}%
        </span>
      </div>

      {/* Yield Curve Graph (SVG) */}
      <div className="relative h-44 w-full mb-3 flex flex-col justify-end">
        <svg className="w-full h-36 overflow-visible" viewBox="0 0 700 140" preserveAspectRatio="none">
          <defs>
            <linearGradient id="yieldAreaGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity={isDark ? '0.24' : '0.18'} />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[22, 60, 98, 134].map((yPos) => (
            <line
              key={yPos}
              x1="12"
              y1={yPos}
              x2="688"
              y2={yPos}
              stroke={isDark ? '#1e293b' : '#e2e8f0'}
              strokeDasharray="3 3"
            />
          ))}

          {/* Area under current curve */}
          <path d={areaPath} fill="url(#yieldAreaGrad)" />

          {/* Historical comparison path */}
          <path
            d={histPath}
            fill="none"
            stroke={isDark ? '#64748b' : '#94a3b8'}
            strokeWidth="1.5"
            strokeDasharray="4 4"
          />

          {/* Current Yield Curve Path */}
          <path
            d={currentPath}
            fill="none"
            stroke={isDark ? '#f59e0b' : '#d97706'}
            strokeWidth="2.75"
            strokeLinecap="round"
          />

          {/* Historical reference dots */}
          {histCoords.map((pt, idx) => (
            <circle
              key={`hist-${idx}`}
              cx={pt.x}
              cy={pt.y}
              r={2.2}
              fill={isDark ? '#64748b' : '#94a3b8'}
              opacity={0.7}
            />
          ))}

          {/* Interactive Current Points */}
          {currentCoords.map((coord, index) => {
            const pt = curveData[index];
            const isSelected = activeCurvePoint === index;

            return (
              <g
                key={pt.tenor}
                className="cursor-pointer"
                onClick={() => setActiveCurvePoint(index)}
                onMouseEnter={() => setActiveCurvePoint(index)}
              >
                <circle cx={coord.x} cy={coord.y} r={14} fill="transparent" />
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={isSelected ? 6 : 4}
                  fill={isSelected ? '#38bdf8' : isDark ? '#f59e0b' : '#d97706'}
                  stroke={isDark ? '#0f172a' : '#ffffff'}
                  strokeWidth="2"
                />
                {isSelected && (
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r={11}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.2"
                    opacity={0.7}
                  />
                )}
              </g>
            );
          })}
        </svg>

        {/* Tenor Labels */}
        <div className="flex justify-between text-[11px] mt-2 px-2">
          {curveData.map((pt, idx) => (
            <button
              key={pt.tenor}
              type="button"
              onClick={() => setActiveCurvePoint(idx)}
              className={`transition-colors cursor-pointer px-1 rounded ${
                activeCurvePoint === idx
                  ? isDark
                    ? 'text-sky-400 font-bold underline'
                    : 'text-sky-700 font-bold underline'
                  : isDark
                  ? 'text-slate-400 hover:text-amber-400'
                  : 'text-slate-600 hover:text-amber-700'
              }`}
            >
              {pt.tenor}
            </button>
          ))}
        </div>
      </div>

      {/* Point Inspector Strip */}
      <div
        className={`mt-2 p-3 rounded-lg text-xs flex flex-wrap items-center justify-between gap-2 border ${
          isDark ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-stone-200 shadow-2xs'
        }`}
      >
        <div className="flex items-center gap-2">
          <BarChart2 className={`w-3.5 h-3.5 ${isDark ? 'text-amber-400' : 'text-amber-600'}`} />
          <span className={`font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
            {selectedPoint.label} ({selectedPoint.tenor}):
          </span>
          <span className={`font-bold tabular-nums ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
            {selectedPoint.rate.toFixed(2)}%
          </span>
          <span
            className={`text-[10px] font-bold px-1.5 py-0.5 rounded tabular-nums ${
              deltaBps <= 0
                ? isDark
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : 'bg-emerald-100 text-emerald-700'
                : isDark
                ? 'bg-rose-500/15 text-rose-400'
                : 'bg-rose-100 text-rose-700'
            }`}
          >
            {deltaBps > 0 ? `+${deltaBps}` : deltaBps} bps
          </span>
        </div>
        <div className={`flex items-center gap-3 text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          <span>
            Prior: <span className="tabular-nums font-semibold">{selectedPoint.hist.toFixed(2)}%</span>
          </span>
          <span
            className={`font-semibold tabular-nums ${
              spread2s10s >= 0
                ? isDark
                  ? 'text-emerald-400'
                  : 'text-emerald-700'
                : isDark
                ? 'text-amber-400'
                : 'text-amber-700'
            }`}
          >
            2Y/10Y: {spread2s10s > 0 ? `+${spread2s10s}` : spread2s10s} bps
          </span>
        </div>
      </div>
    </div>
  );
};
