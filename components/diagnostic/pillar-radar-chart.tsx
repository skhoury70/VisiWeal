"use client";

import { useState, useMemo } from "react";
import type { ModelKey } from "./diagnostic-data";
import { diagnosticData } from "./diagnostic-data";
import type { RadarChartData } from "./diagnostic-engine";

const MODEL_KEYS: ModelKey[] = ["outsourced", "fractional", "fulltime"];

const ANGLES = [0, 60, 120, 180, 240, 300];

const modelColors: Record<ModelKey, string> = {
  fractional: "#2E6DA4",
  fulltime: "#E67E22",
  outsourced: "#8E44AD",
};

const modelLabels: Record<ModelKey, string> = {
  outsourced: "Outsourced",
  fractional: "Fractional",
  fulltime: "Full-Time",
};

interface Props {
  radarChartData: RadarChartData;
  recommendedModel: ModelKey;
  size?: number;
}

function polarToCartesian(
  cx: number,
  cy: number,
  radius: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: cx + radius * Math.cos(rad),
    y: cy + radius * Math.sin(rad),
  };
}

function buildPolygon(
  cx: number,
  cy: number,
  radius: number,
  values: number[],
  maxVal: number
): string {
  return (
    ANGLES.map((angle, i) => {
      const r = (values[i] / maxVal) * radius;
      const pt = polarToCartesian(cx, cy, r, angle);
      return `${i === 0 ? "M" : "L"}${pt.x.toFixed(1)},${pt.y.toFixed(1)}`;
    }).join(" ") + "Z"
  );
}

const legendItems: { key: ModelKey; label: string; color: string }[] = [
  { key: "fractional", label: "Fractional CFO", color: "#2E6DA4" },
  { key: "fulltime", label: "Full-Time CFO", color: "#E67E22" },
  { key: "outsourced", label: "Outsourced", color: "#8E44AD" },
];

export default function PillarRadarChart({
  radarChartData,
  recommendedModel,
  size = 320,
}: Props) {
  const [hoveredPillar, setHoveredPillar] = useState<number | null>(null);
  const [hiddenModels, setHiddenModels] = useState<Set<ModelKey>>(new Set());

  const toggleModel = (key: ModelKey) => {
    setHiddenModels((prev) => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const cx = size / 2;
  const cy = size / 2;
  const radius = size * 0.34;
  const maxVal = 100;

  const nAxes = radarChartData.labels.length;
  const angles = useMemo(
    () => ANGLES.slice(0, nAxes),
    [nAxes]
  );

  const gridLevels = useMemo(() => {
    const levels: React.ReactElement[] = [];
    for (let l = 1; l <= 4; l++) {
      const r = (radius * l) / 4;
      const pts = angles
        .map((a) => {
          const p = polarToCartesian(cx, cy, r, a);
          return `${p.x.toFixed(1)},${p.y.toFixed(1)}`;
        })
        .join(" ");
      levels.push(
        <polygon
          key={l}
          points={pts}
          fill="none"
          stroke="oklch(1 0 0 / 0.06)"
          strokeWidth={1}
        />
      );
    }
    return levels;
  }, [cx, cy, radius, angles]);

  const axes = useMemo(
    () =>
      angles.map((a) => {
        const p = polarToCartesian(cx, cy, radius * 1.18, a);
        return (
          <line
            key={a}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="oklch(1 0 0 / 0.08)"
            strokeWidth={1}
          />
        );
      }),
    [cx, cy, radius, angles]
  );

  const polygons = useMemo(() => {
    return MODEL_KEYS.map((model) => {
      if (hiddenModels.has(model)) return null;
      const dataset = radarChartData.datasets.find(
        (d) => d.modelKey === model
      );
      const values = dataset ? dataset.data : [];
      const points = buildPolygon(cx, cy, radius, values, maxVal);
      const isPrimary = model === recommendedModel;
      return (
        <path
          key={model}
          d={points}
          fill={modelColors[model]}
          fillOpacity={isPrimary ? 0.35 : 0.1}
          stroke={modelColors[model]}
          strokeWidth={isPrimary ? 2.5 : 1}
          strokeOpacity={isPrimary ? 1 : 0.5}
          className="transition-all duration-500"
        />
      );
    });
  }, [cx, cy, radius, radarChartData, recommendedModel, hiddenModels]);

  const labels = useMemo(
    () =>
      angles.map((a, i) => {
        const p = polarToCartesian(cx, cy, radius * 1.3, a);
        const shortLabel = radarChartData.labels[i] ?? "";
        const middleIdx = Math.ceil(shortLabel.length / 2);
        const top = shortLabel.slice(0, middleIdx);
        const bottom = shortLabel.slice(middleIdx);
        const isActive = hoveredPillar === i;
        return (
          <text
            key={i}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fill={
              isActive ? "oklch(0.85 0.03 200)" : "oklch(0.7 0.02 200)"
            }
            fontSize={9}
            fontWeight={isActive ? 600 : 500}
            fontFamily="inherit"
            className="transition-all duration-200"
          >
            <tspan x={p.x} dy="-5">
              {top}
            </tspan>
            <tspan x={p.x} dy="11">
              {bottom}
            </tspan>
          </text>
        );
      }),
    [angles, radius, cx, cy, hoveredPillar, radarChartData.labels]
  );

  const hitAreas = useMemo(
    () =>
      angles.map((a, i) => {
        const p = polarToCartesian(cx, cy, radius * 1.5, a);
        const hs = 26;
        return (
          <rect
            key={i}
            x={p.x - hs / 2}
            y={p.y - hs / 2}
            width={hs}
            height={hs}
            fill="transparent"
            className="cursor-pointer"
            onMouseEnter={() => setHoveredPillar(i)}
            onMouseLeave={() => setHoveredPillar(null)}
          />
        );
      }),
    [cx, cy, radius, angles]
  );

  const activePillarDef =
    hoveredPillar !== null ? diagnosticData.pillars[hoveredPillar] : null;

  return (
    <div>
      <div className="relative" style={{ width: size, height: size + 40 }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="shrink-0 overflow-visible"
        >
          {gridLevels}
          {axes}
          {polygons}
          {labels}
          {hitAreas}
        </svg>

        <div
          className={`pointer-events-none absolute inset-x-0 rounded-xl border border-white/10 bg-zinc-950/90 p-3 text-center backdrop-blur-sm transition-all duration-300 ${
            hoveredPillar !== null
              ? "translate-y-0 opacity-100"
              : "translate-y-2 opacity-0"
          }`}
          style={{ bottom: 40 }}
        >
          {activePillarDef && (
            <>
              <h4 className="text-xs font-semibold text-white">
                {activePillarDef.label}
              </h4>
              <p className="mt-1 text-[10px] leading-relaxed text-white/50">
                {activePillarDef.description}
              </p>
              <div className="mt-2 flex items-center justify-center gap-3">
                {MODEL_KEYS.map((m) => {
                  const dataset = radarChartData.datasets.find(
                    (d) => d.modelKey === m
                  );
                  const pct = dataset?.data[hoveredPillar ?? -1] ?? 0;
                  return (
                    <div key={m} className="text-center">
                      <div
                        className="text-xs font-bold leading-none"
                        style={{ color: modelColors[m] }}
                      >
                        {pct}%
                      </div>
                      <div className="mt-0.5 text-[9px] text-white/40">
                        {modelLabels[m]}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>

        <div className="absolute inset-x-0 flex items-center justify-center gap-6" style={{ bottom: 0 }}>
          {legendItems.map((item) => {
            const isHidden = hiddenModels.has(item.key);
            const isRecommended = item.key === recommendedModel;
            return (
              <button
                key={item.key}
                type="button"
                className={`flex cursor-pointer items-center gap-2 text-sm font-medium transition-all duration-200 ${
                  isHidden ? "opacity-35" : "opacity-100"
                }`}
                onClick={() => toggleModel(item.key)}
                title={`Click to ${isHidden ? "show" : "hide"}`}
              >
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-white/70">{item.label}</span>
                {isRecommended && (
                  <span className="text-[10px] text-brand-400">✦</span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
