"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import type { DiagnosticResult } from "./diagnostic-engine";
import {
  CoverPage,
  ExecutiveSummaryPage,
  ModelComparisonPage,
  PillarScorecardPage,
  PillarDeepDivePage,
  RedFlagRegisterPage,
  ActionPlanPage,
  ResourceRoadmapPage,
  AboutVisiwealPage,
  BackCoverPage,
} from "./cfo-pdf-generator";

const DEEP_DIVE_PILLARS = ["capital", "jurisdictional", "governance"];

interface Props {
  result: DiagnosticResult;
  onPdfReady: (pdfBlob: Blob) => void;
  onError: (err: Error) => void;
}

export default function CfoPdfReport({ result, onPdfReady, onError }: Props) {
  const [logoDataUrl, setLogoDataUrl] = useState<string | undefined>(undefined);
  const coverRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const modelRef = useRef<HTMLDivElement>(null);
  const scorecardRef = useRef<HTMLDivElement>(null);
  const diveRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const redFlagRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);
  const roadmapRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadLogo() {
      try {
        const res = await fetch("/logo.png");
        const blob = await res.blob();
        const reader = new FileReader();
        reader.onloadend = () => setLogoDataUrl(reader.result as string);
        reader.readAsDataURL(blob);
      } catch {
        setLogoDataUrl(undefined);
      }
    }
    loadLogo();
  }, []);

  const capture = useCallback(async () => {
    if (!coverRef.current) return;

    try {
      const html2canvas = (await import("html2canvas")).default;
      const { default: jsPDF } = await import("jspdf");

      const pageRefs = [
        coverRef.current,
        summaryRef.current,
        modelRef.current,
        scorecardRef.current,
        diveRefs.current[0],
        diveRefs.current[1],
        diveRefs.current[2],
        redFlagRef.current,
        actionRef.current,
        roadmapRef.current,
        aboutRef.current,
        backRef.current,
      ];

      const pdf = new jsPDF("p", "mm", "a4");
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();

      for (let i = 0; i < pageRefs.length; i++) {
        const el = pageRefs[i];
        if (!el) continue;

        if (i > 0) pdf.addPage();

        const canvas = await html2canvas(el, {
          scale: 2,
          backgroundColor: "#ffffff",
          logging: false,
          useCORS: true,
          allowTaint: true,
        });

        const imgData = canvas.toDataURL("image/jpeg", 0.92);
        const imgW = pageW;
        const imgH = (canvas.height * pageW) / canvas.width;
        pdf.addImage(imgData, "JPEG", 0, 0, imgW, imgH);

        if (imgH < pageH) {
          const remainingH = pageH - imgH;
          if (remainingH > 5) {
            pdf.setFillColor(255, 255, 255);
            pdf.rect(0, imgH, pageW, remainingH, "F");
          }
        }
      }

      const pdfBlob = pdf.output("blob");
      onPdfReady(pdfBlob);
    } catch (err) {
      onError(err instanceof Error ? err : new Error("PDF capture failed"));
    }
  }, [onPdfReady, onError]);

  useEffect(() => {
    capture();
  }, [capture]);

  return (
    <div style={{ position: "absolute", left: "-9999px", top: 0, zIndex: -1 }}>
      <div ref={coverRef}>
        <CoverPage result={result} logoDataUrl={logoDataUrl} />
      </div>
      <div ref={summaryRef}>
        <ExecutiveSummaryPage result={result} />
      </div>
      <div ref={modelRef}>
        <ModelComparisonPage result={result} />
      </div>
      <div ref={scorecardRef}>
        <PillarScorecardPage result={result} />
      </div>
      {DEEP_DIVE_PILLARS.map((pk, i) => (
        <div
          key={pk}
          ref={(el) => { diveRefs.current[i] = el; }}
        >
          <PillarDeepDivePage
            result={result}
            pillarKey={pk}
            pageIndex={5 + i}
          />
        </div>
      ))}
      <div ref={redFlagRef}>
        <RedFlagRegisterPage result={result} />
      </div>
      <div ref={actionRef}>
        <ActionPlanPage result={result} />
      </div>
      <div ref={roadmapRef}>
        <ResourceRoadmapPage result={result} />
      </div>
      <div ref={aboutRef}>
        <AboutVisiwealPage result={result} />
      </div>
      <div ref={backRef}>
        <BackCoverPage result={result} />
      </div>
    </div>
  );
}
