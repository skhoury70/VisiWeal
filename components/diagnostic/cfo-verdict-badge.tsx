"use client";

import { useEffect, useRef, useState } from "react";
import type { ModelKey } from "./diagnostic-data";

const MODEL_SUBTITLES: Record<ModelKey, string> = {
  fractional:
    "Your enterprise requires institutional financial leadership, precision-deployed at scale.",
  fulltime:
    "Your organizational complexity demands dedicated, permanent C-suite executive governance.",
  outsourced:
    "Your immediate priority is a robust compliance baseline and efficient transactional accounting.",
};

const COMPLEXITY_COLORS: Record<string, string> = {
  "Very High": "#C0392B",
  High: "#E67E22",
  Elevated: "#F1C40F",
  Standard: "#27AE60",
};

interface Props {
  recommendedModel: ModelKey;
  recommendedModelLabel: string;
  matchConfidence: number;
  signalStrength: string;
  pillarsEvaluated: number;
  complexityProfile: string;
  redFlagCount: number;
}

function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

export default function VerdictBadge({
  recommendedModel,
  recommendedModelLabel,
  matchConfidence,
  signalStrength,
  pillarsEvaluated,
  complexityProfile,
  redFlagCount,
}: Props) {
  const [displayedConfidence, setDisplayedConfidence] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const startTime = performance.now();
    const duration = 1400;

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      setDisplayedConfidence(Math.round(eased * matchConfidence));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    }

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [matchConfidence]);

  const signalClass =
    signalStrength === "Strong"
      ? "bg-emerald-500/25 text-emerald-400 border-emerald-500"
      : signalStrength === "Moderate"
        ? "bg-yellow-500/20 text-yellow-400 border-yellow-400"
        : "bg-red-500/20 text-red-400 border-red-500";

  const complexityColor = COMPLEXITY_COLORS[complexityProfile] || "#27AE60";

  return (
    <div className="relative mb-8 overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d1f35] to-[#1a3c5e] px-10 py-12 text-center text-white shadow-2xl shadow-brand-900/35">
      <div className="absolute -right-16 -top-16 h-52 w-52 rounded-full bg-white/[0.04]" />
      <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-white/[0.03]" />

      <p className="mb-4 text-[11px] font-medium tracking-[3px] uppercase text-white/55">
        Strategic Financial Resource Assessment — Diagnostic Result
      </p>

      <h2 className="text-3xl font-bold tracking-tight">
        {recommendedModelLabel}
      </h2>

      <p className="mx-auto mt-2 mb-9 max-w-xl text-base text-white/65">
        {MODEL_SUBTITLES[recommendedModel]}
      </p>

      <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-[#5DADE2]">
            {displayedConfidence}%
          </div>
          <div className="mt-1.5 text-[11px] tracking-[2px] uppercase text-white/45">
            Match Confidence
          </div>
        </div>

        <div className="hidden h-12 w-px bg-white/12 md:block" />

        <div className="text-center">
          <div className="text-4xl font-bold text-white">
            {pillarsEvaluated}/6
          </div>
          <div className="mt-1.5 text-[11px] tracking-[2px] uppercase text-white/45">
            Pillars Evaluated
          </div>
          <span
            className={`mt-1.5 inline-block rounded-full border px-3 py-0.5 text-xs font-semibold tracking-wide ${signalClass}`}
          >
            {signalStrength} Signal
          </span>
        </div>

        <div className="hidden h-12 w-px bg-white/12 md:block" />

        <div className="text-center">
          <div
            className="text-4xl font-bold"
            style={{ color: complexityColor }}
          >
            {complexityProfile}
          </div>
          <div className="mt-1.5 text-[11px] tracking-[2px] uppercase text-white/45">
            Complexity Profile
          </div>
        </div>

        {redFlagCount > 0 && (
          <>
            <div className="hidden h-12 w-px bg-white/12 md:block" />
            <div className="text-center">
              <div className="text-4xl font-bold text-[#E74C3C]">
                {redFlagCount}
              </div>
              <div className="mt-1.5 text-[11px] tracking-[2px] uppercase text-white/45">
                Risk Flag{redFlagCount > 1 ? "s" : ""} Triggered
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
