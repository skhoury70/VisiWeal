"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import {
  diagnosticData,
  questions,
  modelShortLabels,
} from "./diagnostic-data";
import {
  processResponses,
  type UserResponse,
  type DiagnosticResult,
} from "./diagnostic-engine";
import PillarRadarChart from "./pillar-radar-chart";
import VerdictBadge from "./cfo-verdict-badge";
import ComparisonBar from "./cfo-comparison-bar";
import ConfidenceGauge from "./cfo-confidence-gauge";
import PillarCards from "./cfo-pillar-cards";
import AlertPanel from "./cfo-alert-panel";
import CfoRationaleBlock from "./cfo-rationale-block";
import CfoPdfReport from "./cfo-pdf-report";

type Screen = "intro" | "questionnaire" | "results";

export default function CfoDiagnostic() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);
  const [emailSent, setEmailSent] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const pendingEmailRef = useRef<string>("");

  const handleAnswer = useCallback(
    async (optionId: string) => {
      const question = questions[currentQuestion];
      const newResponse: UserResponse = {
        questionId: question.id,
        optionId,
      };
      const updated = [...responses, newResponse];
      setResponses(updated);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion((c) => c + 1);
      } else {
        const diagResult = processResponses(updated);
        setResult(diagResult);
        setScreen("results");
      }
    },
    [currentQuestion, responses]
  );

  const restart = useCallback(() => {
    setScreen("intro");
    setCurrentQuestion(0);
    setResponses([]);
    setResult(null);
    setEmailSent(false);
  }, []);

  useEffect(() => {
    if (screen === "results") {
      import("html2canvas");
      import("jspdf");
    }
  }, [screen]);

  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  const sendPdfEmail = useCallback(async (email: string, blob: Blob) => {
    try {
      const formData = new FormData();
      formData.append("email", email);
      formData.append("pdf", blob, "financial-diagnostic-report.pdf");
      const res = await fetch("/api/diagnostic-results", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to send email");
      setEmailSent(true);
      setModalOpen(false);
    } catch {
      setModalOpen(false);
    } finally {
      setGeneratingPdf(false);
    }
  }, []);

  const handlePdfReady = useCallback(
    (blob: Blob) => {
      sendPdfEmail(pendingEmailRef.current, blob);
    },
    [sendPdfEmail]
  );

  const handlePdfError = useCallback((err: Error) => {
    console.error("PDF generation failed:", err);
    setGeneratingPdf(false);
    setModalOpen(false);
  }, []);

  if (screen === "intro") {
    return (
      <section className="w-full">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full border border-brand-400/30 bg-brand-400/10 px-4 py-1.5 text-xs font-semibold tracking-wider uppercase text-brand-400">
            Diagnostic Tool v{diagnosticData.version}
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Which financial resource model fits your business?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/60">
            A 5-minute assessment across six critical pillars of financial
            health. Your responses are analyzed against our proprietary framework
            to determine whether an outsourced, fractional, or full-time CFO
            model is the optimal fit for your stage, scale, and risk profile.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {diagnosticData.pillars.map((p) => (
            <div
              key={p.id}
              className="rounded-xl border border-white/5 bg-white/[0.03] p-5 text-center transition hover:border-white/10"
            >
              <div
                className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full"
                style={{ backgroundColor: `${p.color}20` }}
              >
                <span className="text-lg">{p.icon}</span>
              </div>
              <h3 className="text-sm font-semibold text-white">
                {p.shortLabel}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-white/40 line-clamp-3">
                {p.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <button
            onClick={() => setScreen("questionnaire")}
            className="rounded-xl bg-brand-600 px-8 py-3.5 text-sm font-semibold text-white transition hover:bg-brand-500"
          >
            Start Assessment
          </button>
        </div>
      </section>
    );
  }

  if (screen === "questionnaire") {
    const q = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    const pillarDef = diagnosticData.pillars.find(
      (p) => p.key === q.pillarKey
    );

    return (
      <section className="w-full">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6">
            <div className="flex items-center justify-between text-xs text-white/40">
              <span>
                Question {currentQuestion + 1} of {questions.length}
              </span>
              <span className="flex items-center gap-1.5">
                {pillarDef?.icon} {pillarDef?.shortLabel ?? q.pillarKey}
              </span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-brand-400 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
            <h3 className="text-xl font-semibold text-white">{q.text}</h3>

            <div className="mt-6 space-y-3">
              {q.options.map((opt) => {
                const isRedFlag = opt.redFlag;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleAnswer(opt.id)}
                    className={`group w-full rounded-xl border px-6 py-4 text-left transition ${
                      isRedFlag
                        ? "border-red-500/20 bg-red-500/5 hover:border-red-500/40 hover:bg-red-500/10"
                        : "border-white/10 bg-white/[0.02] hover:border-brand-400/40 hover:bg-brand-400/5"
                    }`}
                  >
                    <span className="text-sm font-medium text-white/80 group-hover:text-white">
                      {opt.label}
                    </span>
                    <p className="mt-1 text-xs leading-relaxed text-white/40">
                      {opt.description}
                    </p>
                    {isRedFlag && (
                      <p className="mt-2 text-[11px] font-medium text-red-400">
                        {opt.redFlagMessage}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-4 flex justify-between">
            <button
              onClick={() => {
                if (currentQuestion > 0) {
                  setCurrentQuestion((c) => c - 1);
                  setResponses((r) => r.slice(0, -1));
                }
              }}
              disabled={currentQuestion === 0}
              className="rounded-lg px-4 py-2 text-xs text-white/40 transition hover:text-white/70 disabled:opacity-20 disabled:cursor-not-allowed"
            >
              Back
            </button>
          </div>
        </div>
      </section>
    );
  }

  if (!result) return null;

  const modalContent = !generatingPdf ? (
    <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950/95 p-8 shadow-2xl">
      <button
        onClick={() => setModalOpen(false)}
        className="absolute right-4 top-4 text-white/40 hover:text-white/80 transition-colors"
        aria-label="Close"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 5l10 10M15 5l-10 10" />
        </svg>
      </button>

      <div className="mb-6 text-center">
        <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-brand-400/10">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-brand-400">
            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-white">Download Your Diagnostic Report</h3>
        <p className="mt-2 text-sm text-white/60">
          Enter your email to receive a detailed PDF of your financial
          resource assessment, including your radar chart and strategic recommendations.
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const fd = new FormData(e.currentTarget);
          const email = fd.get("email") as string;
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return;
          pendingEmailRef.current = email;
          setGeneratingPdf(true);
        }}
        className="space-y-4"
      >
        <div>
          <input
            name="email"
            type="email"
            placeholder="you@company.com"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-brand-400 focus:outline-none"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
        >
          Send My Report
        </button>
        <p className="text-center text-xs text-white/30">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  ) : (
    <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-zinc-950/95 p-8 shadow-2xl">
      <div className="flex flex-col items-center py-6">
        <div className="relative mb-5 h-14 w-14">
          <div className="absolute inset-0 rounded-full border-2 border-brand-400/20" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-400 animate-spin" />
        </div>
        <h3 className="text-lg font-semibold text-white">Generating Your Report</h3>
        <p className="mt-2 text-center text-sm text-white/50">
          Capturing your diagnostic results and preparing your PDF...
        </p>
      </div>
    </div>
  );

  return (
    <>
    <section className="w-full">
      <div ref={reportRef} className="mx-auto max-w-4xl space-y-8">
        <VerdictBadge
          recommendedModel={result.recommendedModel}
          recommendedModelLabel={result.recommendedModelLabel}
          matchConfidence={result.matchConfidence}
          signalStrength={result.signalStrength}
          pillarsEvaluated={result.assessmentMetadata.totalPillarsEvaluated}
          complexityProfile={result.assessmentMetadata.complexityProfile}
          redFlagCount={result.redFlagsTriggered.length}
        />

        <ComparisonBar
          percentages={result.percentages}
          recommendedModel={result.recommendedModel}
        />

        {result.forceMinimumApplied && (
          <div className="mx-auto max-w-xl rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-center">
            <p className="text-xs font-medium text-red-400">
              ⚠️ Critical flags detected &mdash; recommendation elevated to{" "}
              <span className="font-semibold">
                {modelShortLabels[result.forceMinimumApplied]}
              </span>{" "}
              minimum
            </p>
          </div>
        )}

        <div className="mb-8 rounded-2xl border border-white/10 bg-white/[0.03] px-10 py-9">
          <h3 className="mb-8 text-[13px] font-semibold tracking-[2.5px] uppercase text-white/40">
            Pillar Intelligence &mdash; 6-Dimension Diagnostic Breakdown
          </h3>

          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1fr_280px]">
            <div>
              <PillarRadarChart
                radarChartData={result.radarChartData}
                recommendedModel={result.recommendedModel}
              />
            </div>
            <ConfidenceGauge
              confidence={result.matchConfidence}
              label={result.recommendedModelLabel}
            />
          </div>

          <PillarCards pillarRiskRatings={result.pillarRiskRatings} />
        </div>

        {(result.redFlagsTriggered.length > 0 ||
          result.complexityMultipliersApplied.length > 0) && (
          <AlertPanel
            redFlagsTriggered={result.redFlagsTriggered}
            complexityMultipliersApplied={
              result.complexityMultipliersApplied
            }
          />
        )}

        <CfoRationaleBlock
          recommendedModel={result.recommendedModel}
          recommendedModelLabel={result.recommendedModelLabel}
          pillarRiskRatings={result.pillarRiskRatings}
          assessmentMetadata={result.assessmentMetadata}
          onBookConsultation={() => {}}
          onDownloadPDF={() => setModalOpen(true)}
          onRestart={restart}
          emailSent={emailSent}
        />
      </div>
    </section>

      {mounted && modalOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          {modalContent}
        </div>,
        document.body
      )}

      {generatingPdf && result && (
        <CfoPdfReport
          result={result}
          onPdfReady={handlePdfReady}
          onError={handlePdfError}
        />
      )}
    </>
  );
}
