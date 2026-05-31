"use client";

import Link from "next/link";
import type { ModelKey } from "./diagnostic-data";
import type {
  PillarRiskRating,
  AssessmentMetadata,
} from "./diagnostic-engine";
import { RESULT_CONTENT, ACTION_PLANS, PILLAR_META } from "./cfo-rationale-data";

interface Props {
  recommendedModel: ModelKey;
  recommendedModelLabel: string;
  pillarRiskRatings: Record<string, PillarRiskRating>;
  assessmentMetadata: AssessmentMetadata;
  onBookConsultation: () => void;
  onDownloadPDF: () => void;
  onRestart: () => void;
  emailSent: boolean;
}

const RISK_BADGE_CLASSES: Record<string, string> = {
  CRITICAL: "bg-red-500/15 text-red-400 border-red-500/30",
  HIGH: "bg-orange-500/15 text-orange-400 border-orange-500/30",
  MODERATE: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  BASELINE: "bg-green-500/15 text-green-400 border-green-500/30",
};

const PRIORITY_DOT: Record<string, string> = {
  high: "bg-red-500",
  medium: "bg-yellow-500",
  low: "bg-white/20",
};

const PRIORITY_LABEL: Record<string, string> = {
  high: "High",
  medium: "Med",
  low: "Low",
};

export default function CfoRationaleBlock({
  recommendedModel,
  recommendedModelLabel,
  pillarRiskRatings,
  assessmentMetadata,
  onBookConsultation,
  onDownloadPDF,
  onRestart,
  emailSent,
}: Props) {
  const content = RESULT_CONTENT[recommendedModel];
  const plan = ACTION_PLANS[recommendedModel];

  const pillarNarrativesWithRatings = content.pillars.map((p) => {
    const pillarLabel = Object.keys(pillarRiskRatings).find(
      (label) =>
        pillarRiskRatings[label].pillarKey === p.pillarKey
    );
    const rating = pillarLabel ? pillarRiskRatings[pillarLabel] : null;
    const meta = PILLAR_META[p.pillarKey] || {
      icon: "\uD83D\uDCCA",
      label: p.pillarKey,
    };
    return { ...p, rating, meta };
  });

  return (
    <div className="space-y-8">
      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-10 py-9">
        <h3 className="mb-8 text-[13px] font-semibold tracking-[2.5px] uppercase text-white/40">
          Strategic Rationale — Why {recommendedModelLabel}
        </h3>

        <p className="mb-8 text-sm leading-relaxed text-white/60">
          {content.subheadline}
        </p>

        <div className="space-y-4">
          {pillarNarrativesWithRatings.map((item) => {
            const riskLevel = item.rating?.riskLevel ?? "BASELINE";
            const riskColor = item.rating?.riskColor ?? "#27AE60";
            return (
              <div
                key={item.pillarKey}
                className="relative rounded-xl border border-white/[0.06] bg-white/[0.015] p-5 pl-6 transition hover:border-white/[0.12]"
              >
                <div
                  className="absolute bottom-0 left-0 top-0 w-[3px] rounded-l-xl"
                  style={{ backgroundColor: riskColor }}
                />
                <div className="ml-3 flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-lg">
                    {item.meta.icon}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h4 className="text-sm font-semibold text-white/90">
                        {item.meta.label}
                      </h4>
                      <span
                        className={`inline-block rounded border px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase ${RISK_BADGE_CLASSES[riskLevel] || RISK_BADGE_CLASSES.BASELINE}`}
                      >
                        {riskLevel}
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/50">
                      {item.narrative}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-10 py-9">
        <h3 className="mb-8 text-[13px] font-semibold tracking-[2.5px] uppercase text-white/40">
          90-Day Action Plan
        </h3>

        <div className="grid gap-6 sm:grid-cols-3">
          {plan.phases.map((phase) => (
            <div
              key={phase.title}
              className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-5"
            >
              <h4 className="mb-4 text-xs font-semibold tracking-wider uppercase text-brand-400/70">
                {phase.title}
              </h4>
              <div className="space-y-3">
                {phase.items.map((item, i) => (
                  <div key={i} className="group">
                    <p className="text-sm leading-snug text-white/60 group-hover:text-white/80 transition-colors">
                      {item.text}
                    </p>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="flex items-center gap-1">
                        <span
                          className={`inline-block h-1.5 w-1.5 rounded-full ${PRIORITY_DOT[item.priority] || PRIORITY_DOT.low}`}
                        />
                        <span className="text-[10px] font-medium uppercase tracking-wider text-white/30">
                          {PRIORITY_LABEL[item.priority]}
                        </span>
                      </span>
                      <span className="text-[10px] text-white/20">|</span>
                      <span className="text-[10px] text-white/30">
                        {item.owner}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-brand-400/20">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-400/[0.08] via-brand-400/[0.03] to-transparent" />
        <div className="relative px-10 py-9">
          <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="max-w-lg">
              <h3 className="text-lg font-semibold text-white">
                Ready to take the next step?
              </h3>
              <ul className="mt-3 space-y-1.5">
                <li className="flex items-start gap-2 text-sm text-white/60">
                  <span className="mt-0.5 text-brand-400">{"\u2022"}</span>
                  <span>Get a personalised walkthrough of your results</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-white/60">
                  <span className="mt-0.5 text-brand-400">{"\u2022"}</span>
                  <span>Learn which financial model best fits your stage</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-white/60">
                  <span className="mt-0.5 text-brand-400">{"\u2022"}</span>
                  <span>Start your 90-day action plan with expert guidance</span>
                </li>
              </ul>
            </div>
            <div className="flex shrink-0 flex-col gap-3">
              <Link
                href="/book-consultation"
                className="inline-block rounded-xl bg-brand-600 px-7 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-500"
                onClick={onBookConsultation}
              >
                Book a Free Consultation
              </Link>
              <button
                onClick={onDownloadPDF}
                className="inline-block rounded-xl border border-white/10 bg-white/[0.03] px-7 py-3 text-center text-sm font-medium text-white/60 transition hover:border-white/20 hover:text-white/90"
              >
                {emailSent ? "Report Sent" : "Download Full Report"}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-lg border border-white/[0.04] bg-white/[0.01] px-6 py-4">
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-white/30">
          <span>Assessment ID: {assessmentMetadata.assessmentId}</span>
          <span>Date: {assessmentMetadata.assessmentDate}</span>
          <span>Version: {assessmentMetadata.version}</span>
          <span>Complexity: {assessmentMetadata.complexityProfile}</span>
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onRestart}
          className="rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-white/40 transition hover:border-white/20 hover:text-white/70"
        >
          Retake Assessment
        </button>
      </div>
    </div>
  );
}
