"use client";

import { useEffect, useRef, useState } from "react";

interface Props {
  confidence: number;
  color: string;
  label: string;
}

function describeArc(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number
): string {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;
  return [
    "M",
    start.x.toFixed(1),
    start.y.toFixed(1),
    "A",
    r.toFixed(1),
    r.toFixed(1),
    0,
    largeArc,
    0,
    end.x.toFixed(1),
    end.y.toFixed(1),
  ].join(" ");
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
): { x: number; y: number } {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

export default function ConfidenceGauge({
  confidence,
  color,
  label,
}: Props) {
  const [animatedPct, setAnimatedPct] = useState(0);
  const rafRef = useRef<number | null>(null);
  const cx = 100;
  const cy = 100;
  const r = 82;
  const startAngle = -180;
  const endAngle = 0;

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1400;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAnimatedPct(Math.round(eased * confidence));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [confidence]);

  const fillAngle = startAngle + ((endAngle - startAngle) * animatedPct) / 100;

  return (
    <div className="flex flex-col items-center gap-5">
      <p className="text-center text-[11px] font-semibold tracking-[2px] uppercase text-white/45">
        Match Confidence
      </p>
      <div className="relative w-[200px] overflow-visible" style={{ height: 110 }}>
        <svg
          width="200"
          height="110"
          viewBox="0 0 200 120"
          className="overflow-visible"
        >
          <path
            d={describeArc(cx, cy, r, startAngle, endAngle)}
            fill="none"
            stroke="oklch(1 0 0 / 0.06)"
            strokeWidth={16}
            strokeLinecap="round"
          />
          <path
            d={describeArc(cx, cy, r, startAngle, fillAngle)}
            fill="none"
            stroke={color}
            strokeWidth={16}
            strokeLinecap="round"
            className="transition-[stroke-dasharray]"
          />
        </svg>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
          <div
            className="text-3xl font-bold leading-none"
            style={{ color }}
          >
            {animatedPct}%
          </div>
          <div className="mt-1 text-[10px] font-semibold tracking-[1.5px] uppercase text-white/40">
            Confidence
          </div>
        </div>
      </div>
      <div className="max-w-[200px] text-center">
        <div className="mb-1 text-sm font-bold text-white/90">{label}</div>
      </div>
    </div>
  );
}
