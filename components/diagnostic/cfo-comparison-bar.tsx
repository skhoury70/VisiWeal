"use client";

import { useEffect, useState } from "react";
import type { ModelKey } from "./diagnostic-data";

const MODELS: {
  key: ModelKey;
  label: string;
  color: string;
}[] = [
  { key: "fractional", label: "Fractional CFO Partner", color: "#2E6DA4" },
  {
    key: "fulltime",
    label: "Full-Time Executive CFO",
    color: "#1A3C5E",
  },
  {
    key: "outsourced",
    label: "Managed Outsourced Finance",
    color: "#7F8C8D",
  },
];

interface Props {
  percentages: Record<ModelKey, number>;
  recommendedModel: ModelKey;
}

export default function ComparisonBar({
  percentages,
  recommendedModel,
}: Props) {
  const [animatedWidths, setAnimatedWidths] = useState<
    Record<string, number>
  >({});

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedWidths({
        fractional: percentages.fractional,
        fulltime: percentages.fulltime,
        outsourced: percentages.outsourced,
      });
    }, 300);
    return () => clearTimeout(timer);
  }, [percentages]);

  return (
    <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] px-10 py-9">
      <h3 className="mb-7 text-[13px] font-semibold tracking-[2.5px] uppercase text-white/40">
        Model Match Distribution
      </h3>

      {MODELS.map((m) => {
        const pct = percentages[m.key] || 0;
        const isRecommended = m.key === recommendedModel;
        return (
          <div key={m.key} className="mb-5 last:mb-0">
            <div className="mb-2 flex items-center justify-between">
              <span className="flex items-center gap-2 text-sm font-semibold text-white/90">
                {m.label}
                {isRecommended && (
                  <span className="rounded bg-brand-800 px-2 py-0.5 text-[10px] font-bold tracking-wider uppercase text-white">
                    Recommended
                  </span>
                )}
              </span>
              <span className="text-lg font-bold text-white/90">
                {pct}%
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
              <div
                className="h-full rounded-full transition-all duration-[1200ms] ease-out"
                style={{
                  backgroundColor: m.color,
                  width: `${animatedWidths[m.key] ?? 0}%`,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
