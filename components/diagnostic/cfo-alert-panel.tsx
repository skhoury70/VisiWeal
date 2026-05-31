"use client";

import type { TriggeredRedFlag, AppliedMultiplier } from "./diagnostic-engine";
import { modelLabels } from "./diagnostic-data";

interface Props {
  redFlagsTriggered: TriggeredRedFlag[];
  complexityMultipliersApplied: AppliedMultiplier[];
}

export default function AlertPanel({
  redFlagsTriggered,
  complexityMultipliersApplied,
}: Props) {
  const totalAlerts =
    redFlagsTriggered.length + complexityMultipliersApplied.length;

  if (totalAlerts === 0) return null;

  return (
    <div className="overflow-hidden rounded-2xl shadow-xl shadow-zinc-900/30">
      <div className="flex items-center gap-3 bg-[#1A1A2E] px-8 py-5">
        <span className="text-lg">🚨</span>
        <h3 className="text-xs font-bold tracking-[2px] uppercase text-white">
          Risk & Complexity Alert Summary
        </h3>
        <span className="ml-auto rounded-full bg-red-600 px-3 py-0.5 text-[11px] font-bold text-white">
          {totalAlerts} Alert{totalAlerts > 1 ? "s" : ""}
        </span>
      </div>

      <div className="rounded-b-2xl border border-t-0 border-white/10 bg-white/[0.02] py-2">
        {redFlagsTriggered.map((flag, i) => {
          const isCritical = flag.severity === "critical";
          return (
            <div
              key={`rf-${i}`}
              className="flex items-start gap-4 border-b border-white/5 px-8 py-5 last:border-b-0"
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-base ${
                  isCritical
                    ? "bg-red-500/15"
                    : "bg-yellow-500/15"
                }`}
              >
                {isCritical ? "🔴" : "⚠️"}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={`mb-1 text-[9px] font-bold tracking-[2px] uppercase ${
                    isCritical ? "text-red-400" : "text-yellow-400"
                  }`}
                >
                  {isCritical ? "Critical Override" : "Risk Flag"}
                </p>
                <p className="text-sm font-semibold text-white/90">
                  {flag.message}
                </p>
                <p className="mt-1 text-xs text-white/50">
                  Triggered by your answer to:{" "}
                  <em className="text-white/70">{flag.questionText}</em>
                  &nbsp;&mdash; You selected:{" "}
                  <strong className="text-white/70">
                    {flag.selectedLabel}
                  </strong>
                </p>
                {flag.forceMinimum && (
                  <span className="mt-1.5 inline-flex items-center gap-1 rounded bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                    ⟶ Minimum model floor set to:{" "}
                    {modelLabels[flag.forceMinimum]}
                  </span>
                )}
              </div>
            </div>
          );
        })}

        {complexityMultipliersApplied.map((cm, i) => (
          <div
            key={`cm-${i}`}
            className="flex items-start gap-4 border-b border-white/5 px-8 py-5 last:border-b-0"
          >
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 text-base">
              ✦
            </div>
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[9px] font-bold tracking-[2px] uppercase text-blue-400">
                Complexity Amplifier — {cm.id}
              </p>
              <p className="text-sm font-semibold text-white/90">
                {cm.label}
              </p>
              <p className="mt-1 text-xs text-white/50">{cm.description}</p>
              <span className="mt-1.5 inline-flex items-center gap-1 rounded bg-blue-500/15 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                Score amplified ×{cm.multiplier} on{" "}
                {modelLabels[cm.appliedTo]} model &nbsp;|&nbsp; {cm.scoreBefore}
                {" → "}
                {cm.scoreAfter} pts
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
