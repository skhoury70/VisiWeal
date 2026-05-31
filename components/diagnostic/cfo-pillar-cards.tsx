"use client";

import { useState, useEffect, useRef } from "react";
import type { PillarRiskRating } from "./diagnostic-engine";
import { diagnosticData } from "./diagnostic-data";
import type { ModelKey } from "./diagnostic-data";

const MODEL_KEYS: ModelKey[] = ["fractional", "fulltime", "outsourced"];

const MINI_BAR_COLORS: Record<ModelKey, string> = {
  fractional: "#2E6DA4",
  fulltime: "#1A3C5E",
  outsourced: "#7F8C8D",
};

const MINI_BAR_LABELS: Record<ModelKey, string> = {
  fractional: "Fractional CFO",
  fulltime: "Full-Time CFO",
  outsourced: "Outsourced",
};

interface Props {
  pillarRiskRatings: Record<string, PillarRiskRating>;
}

function PillarCard({
  pillarMeta,
  riskData,
  index,
}: {
  pillarMeta: (typeof diagnosticData.pillars)[0];
  riskData: PillarRiskRating;
  index: number;
}) {
  const [isActive, setIsActive] = useState(false);
  const [barWidths, setBarWidths] = useState<Record<string, number>>({});
  const animated = useRef(false);

  useEffect(() => {
    if (animated.current) return;
    const timer = setTimeout(() => {
      setBarWidths({
        fractional: riskData.pillarPercentages.fractional || 0,
        fulltime: riskData.pillarPercentages.fulltime || 0,
        outsourced: riskData.pillarPercentages.outsourced || 0,
      });
      animated.current = true;
    }, 600 + index * 80);
    return () => clearTimeout(timer);
  }, [riskData, index]);

  return (
    <div
      className={`cfo-pillar-card relative cursor-pointer overflow-hidden rounded-xl border bg-white/[0.03] p-5 transition-all duration-250 hover:-translate-y-0.5 hover:shadow-lg ${
        isActive
          ? "border-brand-400/40 shadow-lg shadow-brand-900/20"
          : "border-white/10"
      }`}
      onClick={() => setIsActive((v) => !v)}
    >
      <div
        className="absolute left-0 top-0 h-full w-[3px] rounded-l-xl"
        style={{ backgroundColor: pillarMeta.color }}
      />

      <div className="mb-3 flex items-start justify-between">
        <span className="text-xl leading-none">{pillarMeta.icon}</span>
        <span
          className="rounded px-2 py-0.5 text-[9px] font-bold tracking-[1px] uppercase text-white"
          style={{ backgroundColor: riskData.riskColor }}
        >
          {riskData.riskLevel}
        </span>
      </div>

      <p className="mb-1 text-xs font-bold text-white/90">
        {pillarMeta.shortLabel}
      </p>
      <p className="mb-3 text-[11px] text-white/50">
        Strongest signal:{" "}
        <span className="font-semibold text-white/70">
          {riskData.dominantModelLabel}
        </span>
      </p>

      <div className="flex flex-col gap-1.5">
        {MODEL_KEYS.map((mk) => {
          const pct = riskData.pillarPercentages[mk] || 0;
          return (
            <div key={mk} className="grid grid-cols-[85px_1fr_32px] items-center gap-2">
              <span className="overflow-hidden text-ellipsis whitespace-nowrap text-[10px] font-medium text-white/50">
                {MINI_BAR_LABELS[mk]}
              </span>
              <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                <div
                  className="h-full rounded-full transition-all duration-1000 ease-out"
                  style={{
                    backgroundColor: MINI_BAR_COLORS[mk],
                    width: `${barWidths[mk] ?? 0}%`,
                  }}
                />
              </div>
              <span className="text-right text-[10px] font-bold text-white/80">
                {pct}%
              </span>
            </div>
          );
        })}
      </div>

      <div
        className={`mt-3 border-t border-white/10 pt-3 text-[11px] leading-relaxed text-white/50 transition-all duration-300 ${
          isActive ? "block" : "hidden"
        }`}
      >
        {pillarMeta.description}
      </div>
    </div>
  );
}

export default function PillarCards({ pillarRiskRatings }: Props) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {diagnosticData.pillars.map((p, i) => {
        const riskData = pillarRiskRatings[p.label];
        if (!riskData) return null;
        return (
          <PillarCard
            key={p.id}
            pillarMeta={p}
            riskData={riskData}
            index={i}
          />
        );
      })}
    </div>
  );
}
