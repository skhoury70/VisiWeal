/* eslint-disable @next/next/no-img-element */
import type { DiagnosticResult } from "./diagnostic-engine";
import type { ModelKey } from "./diagnostic-data";
import { RESULT_CONTENT, ACTION_PLANS, PILLAR_META } from "./cfo-rationale-data";

export const BRAND = {
  accent: "#3BA99E",
  accentLight: "#E8F5F3",
  primary: "#2A7A72",
  dark: "#0C1820",
  darkSurface: "#1a2a3a",
  cardBg: "#F8FAFB",
  white: "#FFFFFF",
  text: "#1a1a2e",
  textMuted: "#6b7280",
  textLight: "#9CA3AF",
  border: "#E5E7EB",
  borderLight: "#F0F2F5",
  red: "#C0392B",
  orange: "#E67E22",
  yellow: "#F1C40F",
  green: "#27AE60",
};

export const SOCIAL = [
  { label: "LinkedIn", url: "https://www.linkedin.com/company/visiweal/" },
  { label: "Twitter / X", url: "https://x.com/VisiWeal1" },
  { label: "YouTube", url: "https://www.youtube.com/@VisiWeal" },
  { label: "Facebook", url: "https://www.facebook.com/visiweal/" },
];

export const CONTACT = {
  address: "Beirut, Lebanon",
  email: "info@visiweal.com",
  phone: "+961 71 828281",
};

export const MODEL_COLORS: Record<ModelKey, string> = {
  fractional: "#2E6DA4",
  fulltime: "#E67E22",
  outsourced: "#8E44AD",
};

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#3BA99E">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#3BA99E">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#3BA99E">
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#3BA99E">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const SOCIAL_ICONS: Record<string, React.ReactNode> = {
  LinkedIn: <LinkedInIcon />,
  "Twitter / X": <XIcon />,
  YouTube: <YouTubeIcon />,
  Facebook: <FacebookIcon />,
};

const PAGE_W = 210;
const PAGE_H = 297;
const MARGIN = 20;

function fmtPct(v: number): string {
  return `${v}%`;
}

function riskBadgeColor(level: string): string {
  switch (level) {
    case "CRITICAL": return BRAND.red;
    case "HIGH": return BRAND.orange;
    case "MODERATE": return BRAND.yellow;
    default: return BRAND.green;
  }
}

const pageContainerStyle: React.CSSProperties = {
  width: `${PAGE_W}mm`,
  minHeight: `${PAGE_H}mm`,
  boxSizing: "border-box",
  fontFamily: "Inter, Roboto, sans-serif",
  lineHeight: 1.5,
};

const headerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  paddingBottom: 12,
  borderBottom: `2px solid ${BRAND.accent}`,
  marginBottom: 16,
};

const footerStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderTop: `1px solid ${BRAND.border}`,
  paddingTop: 8,
  marginTop: 16,
  fontSize: 8,
  color: BRAND.textLight,
};

export function getPillarRiskColor(riskLevel: string): string {
  switch (riskLevel) {
    case "CRITICAL": return "#C0392B";
    case "HIGH": return "#E67E22";
    case "MODERATE": return "#F1C40F";
    default: return "#27AE60";
  }
}

export function getModelHex(modelKey: ModelKey): string {
  return MODEL_COLORS[modelKey];
}

interface ReportPageProps {
  result: DiagnosticResult;
  pageIndex: number;
  children: React.ReactNode;
}

function ReportPage({ pageIndex, children }: ReportPageProps) {
  return (
    <div
      style={{
        ...pageContainerStyle,
        padding: `${MARGIN}mm`,
        backgroundColor: BRAND.white,
        color: BRAND.text,
        position: "relative",
        pageBreakAfter: "always",
      }}
    >
      {children}
      <div style={footerStyle}>
        <span>VisiWeal — Financial Resource Diagnostic Report</span>
        <span>Page {pageIndex} of 12</span>
      </div>
    </div>
  );
}

function PageHeader({ title, assessmentId }: { title: string; assessmentId: string }) {
  return (
    <div style={headerStyle}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 6,
            backgroundColor: BRAND.accent,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: BRAND.white,
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          V
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700 }}>VisiWeal</div>
          <div style={{ fontSize: 8, color: BRAND.textMuted }}>{assessmentId}</div>
        </div>
      </div>
      <div style={{ fontSize: 12, fontWeight: 600, color: BRAND.accent }}>{title}</div>
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, backgroundColor: BRAND.border, margin: "12px 0" }} />;
}

function SectionTitle({ label }: { label: string }) {
  return (
    <div
      style={{
        fontSize: 11,
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: 2,
        color: BRAND.accent,
        marginBottom: 8,
      }}
    >
      {label}
    </div>
  );
}

export function CoverPage({ result }: { result: DiagnosticResult }) {
  return (
    <div
      style={{
        ...pageContainerStyle,
        padding: `${MARGIN}mm`,
        backgroundColor: BRAND.dark,
        color: BRAND.white,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: `${PAGE_H}mm`,
        boxSizing: "border-box",
      }}
    >
      <img
        src="/logo.png"
        alt="VisiWeal"
        style={{ width: 80, height: 80, marginBottom: 24, borderRadius: 12 }}
      />

      <div
        style={{
          fontSize: 10,
          letterSpacing: 4,
          textTransform: "uppercase",
          color: BRAND.accent,
          fontWeight: 600,
          marginBottom: 16,
        }}
      >
        Strategic Financial Resource Assessment
      </div>

      <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, lineHeight: 1.2 }}>
        Financial Diagnostic Report
      </div>

      <div
        style={{
          display: "inline-block",
          padding: "8px 24px",
          borderRadius: 24,
          backgroundColor: BRAND.accent,
          color: BRAND.white,
          fontSize: 16,
          fontWeight: 600,
          marginTop: 12,
          marginBottom: 32,
        }}
      >
        {result.recommendedModelLabel}
      </div>

      <Divider />

      <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 4 }}>
        Assessment ID: {result.assessmentMetadata.assessmentId}
      </div>
      <div style={{ fontSize: 11, color: "#9CA3AF" }}>
        Date: {result.assessmentMetadata.assessmentDate}
      </div>

      <div style={{ marginTop: 40, fontSize: 9, color: "#6B7280" }}>
        <div>Prepared for the named recipient only.</div>
        <div>Confidential — Do Not Distribute.</div>
      </div>
    </div>
  );
}

export function ExecutiveSummaryPage({ result }: { result: DiagnosticResult }) {
  const {
    recommendedModel,
    recommendedModelLabel,
    matchConfidence,
    signalStrength,
    consistencyScore,
    percentages,
    assessmentMetadata,
  } = result;

  return (
    <ReportPage pageIndex={2} result={result}>
      <PageHeader title="Executive Summary" assessmentId={assessmentMetadata.assessmentId} />

      <div
        style={{
          backgroundColor: BRAND.accentLight,
          borderRadius: 8,
          padding: 16,
          marginBottom: 16,
          border: `1px solid ${BRAND.accent}20`,
        }}
      >
        <div style={{ fontSize: 9, color: BRAND.textMuted, marginBottom: 4 }}>
          RECOMMENDED MODEL
        </div>
        <div style={{ fontSize: 20, fontWeight: 700, color: BRAND.dark }}>
          {recommendedModelLabel}
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 12,
          marginBottom: 16,
        }}
      >
        {[
          { label: "Match Confidence", value: fmtPct(matchConfidence), color: BRAND.accent },
          { label: "Signal Strength", value: signalStrength, color: MODEL_COLORS[recommendedModel] },
          { label: "Consistency Score", value: fmtPct(consistencyScore), color: BRAND.primary },
        ].map((m) => (
          <div
            key={m.label}
            style={{
              padding: 12,
              borderRadius: 8,
              backgroundColor: BRAND.cardBg,
              border: `1px solid ${BRAND.border}`,
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: 20, fontWeight: 700, color: m.color }}>{m.value}</div>
            <div style={{ fontSize: 8, color: BRAND.textMuted, marginTop: 4 }}>{m.label}</div>
          </div>
        ))}
      </div>

      <SectionTitle label="Model Comparison" />
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
        {(
          [
            { key: "outsourced" as ModelKey, label: "Managed Outsourced Finance" },
            { key: "fractional" as ModelKey, label: "Fractional CFO Partner" },
            { key: "fulltime" as ModelKey, label: "Full-Time Executive CFO" },
          ] as const
        ).map((m) => {
          const pct = percentages[m.key];
          const isRecommended = m.key === recommendedModel;
          const barColor = isRecommended ? BRAND.accent : MODEL_COLORS[m.key];
          return (
            <div key={m.key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 140, fontSize: 10, color: BRAND.text }}>{m.label}</div>
              <div
                style={{
                  flex: 1,
                  height: 20,
                  borderRadius: 4,
                  backgroundColor: BRAND.borderLight,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    width: `${pct}%`,
                    height: "100%",
                    borderRadius: 4,
                    backgroundColor: barColor,
                    opacity: isRecommended ? 1 : 0.4,
                  }}
                />
              </div>
              <div
                style={{
                  width: 36,
                  fontSize: 12,
                  fontWeight: 700,
                  color: isRecommended ? BRAND.accent : BRAND.textMuted,
                  textAlign: "right",
                }}
              >
                {fmtPct(pct)}
              </div>
            </div>
          );
        })}
      </div>

      <SectionTitle label="Assessment Details" />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
          fontSize: 10,
          backgroundColor: BRAND.cardBg,
          padding: 12,
          borderRadius: 8,
          border: `1px solid ${BRAND.border}`,
        }}
      >
        <div>
          <span style={{ color: BRAND.textMuted }}>Pillars Evaluated: </span>
          <span style={{ fontWeight: 600 }}>{assessmentMetadata.totalPillarsEvaluated}/6</span>
        </div>
        <div>
          <span style={{ color: BRAND.textMuted }}>Complexity Profile: </span>
          <span style={{ fontWeight: 600 }}>{assessmentMetadata.complexityProfile}</span>
        </div>
        <div>
          <span style={{ color: BRAND.textMuted }}>Red Flags: </span>
          <span style={{ fontWeight: 600, color: result.redFlagsTriggered.length > 0 ? BRAND.red : BRAND.green }}>
            {assessmentMetadata.redFlagCount}
          </span>
        </div>
        <div>
          <span style={{ color: BRAND.textMuted }}>Questions Answered: </span>
          <span style={{ fontWeight: 600 }}>{assessmentMetadata.totalQuestionsAnswered}</span>
        </div>
      </div>
    </ReportPage>
  );
}

export function ModelComparisonPage({ result }: { result: DiagnosticResult }) {
  const { percentages, pillarScores, assessmentMetadata } = result;

  const orderedModels: ModelKey[] = ["outsourced", "fractional", "fulltime"];
  const modelLabels: Record<ModelKey, string> = {
    outsourced: "Managed Outsourced Finance",
    fractional: "Fractional CFO Partner",
    fulltime: "Full-Time Executive CFO",
  };

  const pillars = Object.entries(pillarScores);

  return (
    <ReportPage pageIndex={3} result={result}>
      <PageHeader title="Model Comparison — Detailed Scores" assessmentId={assessmentMetadata.assessmentId} />

      <SectionTitle label="Final Scores by Model" />
      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        {orderedModels.map((mk) => {
          const isRec = mk === result.recommendedModel;
          return (
            <div
              key={mk}
              style={{
                flex: 1,
                padding: 14,
                borderRadius: 8,
                backgroundColor: isRec ? BRAND.accentLight : BRAND.cardBg,
                border: `1px solid ${isRec ? BRAND.accent : BRAND.border}`,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: 22,
                  fontWeight: 700,
                  color: isRec ? BRAND.accent : MODEL_COLORS[mk],
                }}
              >
                {fmtPct(percentages[mk])}
              </div>
              <div style={{ fontSize: 8, color: BRAND.textMuted, marginTop: 4 }}>Weighted Score</div>
              <div style={{ fontSize: 9, fontWeight: 600, color: BRAND.text, marginTop: 2 }}>
                {modelLabels[mk]}
              </div>
              {isRec && (
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 7,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: 1,
                    color: BRAND.accent,
                  }}
                >
                  Recommended
                </div>
              )}
            </div>
          );
        })}
      </div>

      <SectionTitle label="Pillar-Level Breakdown" />
      <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 9 }}>
        <thead>
          <tr style={{ backgroundColor: BRAND.dark, color: BRAND.white }}>
            <th style={{ padding: "6px 8px", textAlign: "left" }}>Pillar</th>
            {orderedModels.map((mk) => (
              <th key={mk} style={{ padding: "6px 8px", textAlign: "center" }}>
                {modelLabels[mk].split(" ").slice(0, 2).join(" ")}
              </th>
            ))}
            <th style={{ padding: "6px 8px", textAlign: "center" }}>Dominant Model</th>
          </tr>
        </thead>
        <tbody>
          {pillars.map(([pillarLabel, scores], i) => {
            const sorted = (Object.entries(scores) as [ModelKey, number][]).sort((a, b) => b[1] - a[1]);
            const dominant = sorted[0][0];
            const total = Object.values(scores).reduce((s, v) => s + v, 0);
            const pcts = orderedModels.map(
              (mk) => (total > 0 ? Math.round((scores[mk] / total) * 100) : 0)
            );
            return (
              <tr
                key={pillarLabel}
                style={{
                  backgroundColor: i % 2 === 0 ? BRAND.white : BRAND.cardBg,
                  borderBottom: `1px solid ${BRAND.borderLight}`,
                }}
              >
                <td style={{ padding: "5px 8px", fontWeight: 600 }}>{pillarLabel}</td>
                {pcts.map((p, j) => (
                  <td
                    key={j}
                    style={{
                      padding: "5px 8px",
                      textAlign: "center",
                      color: orderedModels[j] === dominant ? MODEL_COLORS[orderedModels[j]] : BRAND.textMuted,
                      fontWeight: orderedModels[j] === dominant ? 700 : 400,
                    }}
                  >
                    {fmtPct(p)}
                  </td>
                ))}
                <td style={{ padding: "5px 8px", textAlign: "center", fontWeight: 600 }}>
                  {orderedModels.indexOf(dominant) === 0
                    ? "Outsourced"
                    : orderedModels.indexOf(dominant) === 1
                      ? "Fractional"
                      : "Full-Time"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <SectionTitle label="Scoring Methodology" />
      <div
        style={{
          fontSize: 9,
          color: BRAND.textMuted,
          backgroundColor: BRAND.cardBg,
          padding: 12,
          borderRadius: 8,
          border: `1px solid ${BRAND.border}`,
          lineHeight: 1.6,
          marginTop: 8,
        }}
      >
        Scores are calculated as weighted totals across 16 questions spanning 6 pillars.
        Each response contributes to all three financial resource models simultaneously.
        The model with the highest aggregate score is the recommended fit.
        Complexity multipliers and red flag overrides may adjust the final recommendation
        to account for risk factors that standard scoring does not fully capture.
      </div>
    </ReportPage>
  );
}

export function PillarScorecardPage({ result }: { result: DiagnosticResult }) {
  const { pillarRiskRatings, assessmentMetadata } = result;
  const pillars = Object.values(pillarRiskRatings);

  return (
    <ReportPage pageIndex={4} result={result}>
      <PageHeader title="Pillar Scorecard — Risk Assessment Summary" assessmentId={assessmentMetadata.assessmentId} />

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {pillars.map((p) => {
          const riskColor = riskBadgeColor(p.riskLevel);
          return (
            <div
              key={p.pillarKey}
              style={{
                padding: 12,
                borderRadius: 8,
                backgroundColor: BRAND.cardBg,
                border: `1px solid ${BRAND.border}`,
                borderLeft: `4px solid ${riskColor}`,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 18 }}>{p.icon}</span>
                  <div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: BRAND.text }}>{p.shortLabel}</div>
                    <div style={{ fontSize: 9, color: BRAND.textMuted }}>{p.description.substring(0, 80)}...</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: 9,
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: riskColor,
                    }}
                  >
                    {p.riskLevel}
                  </div>
                  <div style={{ fontSize: 8, color: BRAND.textLight }}>
                    {p.dominantModelLabel}
                  </div>
                </div>
              </div>

              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                {(["outsourced", "fractional", "fulltime"] as ModelKey[]).map((mk) => (
                  <div
                    key={mk}
                    style={{
                      flex: 1,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: BRAND.borderLight,
                      position: "relative",
                    }}
                  >
                    <div
                      style={{
                        width: `${p.pillarPercentages[mk]}%`,
                        height: "100%",
                        borderRadius: 3,
                        backgroundColor:
                          mk === p.dominantModel ? MODEL_COLORS[mk] : BRAND.border,
                      }}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: 2 }}>
                {(["outsourced", "fractional", "fulltime"] as ModelKey[]).map((mk) => (
                  <div
                    key={mk}
                    style={{
                      flex: 1,
                      fontSize: 7,
                      textAlign: "center",
                      color: BRAND.textLight,
                    }}
                  >
                    {fmtPct(p.pillarPercentages[mk])}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </ReportPage>
  );
}

export function PillarDeepDivePage({
  result,
  pillarKey,
  pageIndex,
}: {
  result: DiagnosticResult;
  pillarKey: string;
  pageIndex: number;
}) {
  const meta = PILLAR_META[pillarKey] || { icon: "📊", label: pillarKey };
  const content = RESULT_CONTENT[result.recommendedModel];
  const pillarNarrative = content?.pillars.find((p) => p.pillarKey === pillarKey);
  const riskRating = Object.values(result.pillarRiskRatings).find(
    (r) => r.pillarKey === pillarKey
  );

  return (
    <ReportPage pageIndex={pageIndex} result={result}>
      <PageHeader
        title={`Pillar Deep Dive: ${meta.label}`}
        assessmentId={result.assessmentMetadata.assessmentId}
      />

      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <div
          style={{
            width: 48,
            height: 48,
            borderRadius: 12,
            backgroundColor: BRAND.accentLight,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
          }}
        >
          {meta.icon}
        </div>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: BRAND.text }}>{meta.label}</div>
          {riskRating && (
            <div
              style={{
                fontSize: 9,
                fontWeight: 600,
                color: getPillarRiskColor(riskRating.riskLevel),
                marginTop: 2,
              }}
            >
              Risk Level: {riskRating.riskLevel} — Dominant Model: {riskRating.dominantModelLabel}
            </div>
          )}
        </div>
      </div>

      {riskRating && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 8,
            marginBottom: 16,
          }}
        >
          {(["outsourced", "fractional", "fulltime"] as ModelKey[]).map((mk) => (
            <div
              key={mk}
              style={{
                padding: 10,
                borderRadius: 6,
                backgroundColor: BRAND.cardBg,
                border: `1px solid ${BRAND.border}`,
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: 16, fontWeight: 700, color: MODEL_COLORS[mk] }}
              >
                {fmtPct(riskRating.pillarPercentages[mk])}
              </div>
              <div style={{ fontSize: 8, color: BRAND.textMuted, marginTop: 2 }}>
                {mk === "outsourced"
                  ? "Outsourced"
                  : mk === "fractional"
                    ? "Fractional"
                    : "Full-Time"}
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          padding: 16,
          borderRadius: 8,
          backgroundColor: BRAND.cardBg,
          border: `1px solid ${BRAND.border}`,
          fontSize: 10,
          lineHeight: 1.7,
          color: BRAND.text,
        }}
      >
        {pillarNarrative?.narrative || "No detailed narrative available for this pillar."}
      </div>

      {riskRating && (
        <div
          style={{
            marginTop: 16,
            padding: 12,
            borderRadius: 8,
            border: `1px solid ${BRAND.border}`,
            backgroundColor: BRAND.white,
          }}
        >
          <div style={{ fontSize: 9, fontWeight: 600, marginBottom: 6, color: BRAND.text }}>
            Recommendation Context
          </div>
          <div style={{ fontSize: 9, lineHeight: 1.6, color: BRAND.textMuted }}>
            This pillar scored highest for the{" "}
            <span style={{ fontWeight: 600, color: BRAND.text }}>
              {riskRating.dominantModelLabel}
            </span>{" "}
            model with a spread of {riskRating.spread} points over the next closest model.
            The {riskRating.riskLevel.toLowerCase()} risk classification reflects{" "}
            {riskRating.riskLevel === "CRITICAL"
              ? "an urgent requirement for dedicated executive oversight."
              : riskRating.riskLevel === "HIGH"
                ? "significant exposure that requires active strategic management."
                : riskRating.riskLevel === "MODERATE"
                  ? "elevated complexity that warrants structured financial leadership."
                  : "a stable baseline that can be managed with standard financial processes."}
          </div>
        </div>
      )}
    </ReportPage>
  );
}

export function RedFlagRegisterPage({ result }: { result: DiagnosticResult }) {
  const { redFlagsTriggered, complexityMultipliersApplied, assessmentMetadata } = result;

  return (
    <ReportPage pageIndex={8} result={result}>
      <PageHeader title="Red Flag Register & Risk Multipliers" assessmentId={assessmentMetadata.assessmentId} />

      {redFlagsTriggered.length === 0 && complexityMultipliersApplied.length === 0 ? (
        <div
          style={{
            padding: 24,
            borderRadius: 8,
            backgroundColor: "#F0FDF4",
            border: `1px solid ${BRAND.green}40`,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 32, marginBottom: 8 }}>✓</div>
          <div style={{ fontSize: 13, fontWeight: 600, color: BRAND.green }}>
            No Red Flags or Risk Multipliers Detected
          </div>
          <div style={{ fontSize: 10, color: BRAND.textMuted, marginTop: 4 }}>
            Your financial profile indicates a standard risk posture with no critical flags triggered.
          </div>
        </div>
      ) : (
        <>
          {redFlagsTriggered.length > 0 && (
            <>
              <SectionTitle label={`Red Flags (${redFlagsTriggered.length})`} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {redFlagsTriggered.map((flag, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 10,
                      borderRadius: 6,
                      backgroundColor: "#FEF2F2",
                      border: `1px solid ${BRAND.red}30`,
                      borderLeft: `3px solid ${BRAND.red}`,
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                      <div style={{ fontSize: 10, fontWeight: 600, color: BRAND.red, flex: 1 }}>
                        {flag.questionText}
                      </div>
                      <div
                        style={{
                          fontSize: 8,
                          fontWeight: 700,
                          padding: "2px 8px",
                          borderRadius: 4,
                          backgroundColor: flag.severity === "critical" ? BRAND.red : BRAND.orange,
                          color: BRAND.white,
                          textTransform: "uppercase",
                          marginLeft: 8,
                        }}
                      >
                        {flag.severity}
                      </div>
                    </div>
                    <div style={{ fontSize: 9, color: BRAND.textMuted, marginTop: 4 }}>
                      Selected: <span style={{ fontWeight: 600, color: BRAND.text }}>{flag.selectedLabel}</span>
                    </div>
                    {flag.message && (
                      <div style={{ fontSize: 9, color: BRAND.red, marginTop: 2 }}>
                        {flag.message}
                      </div>
                    )}
                    {flag.forceMinimum && (
                      <div style={{ fontSize: 9, color: BRAND.orange, marginTop: 2 }}>
                        Force minimum model: {flag.forceMinimum}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}

          {complexityMultipliersApplied.length > 0 && (
            <>
              <SectionTitle label={`Complexity Multipliers (${complexityMultipliersApplied.length})`} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {complexityMultipliersApplied.map((m, i) => (
                  <div
                    key={i}
                    style={{
                      padding: 10,
                      borderRadius: 6,
                      backgroundColor: "#FFFBEB",
                      border: `1px solid ${BRAND.yellow}40`,
                      borderLeft: `3px solid ${BRAND.yellow}`,
                    }}
                  >
                    <div style={{ fontSize: 10, fontWeight: 600, color: BRAND.text }}>{m.label}</div>
                    <div style={{ fontSize: 9, color: BRAND.textMuted, marginTop: 2 }}>{m.description}</div>
                    <div style={{ fontSize: 9, color: BRAND.textMuted, marginTop: 2 }}>
                      Applied ×{m.multiplier} to <span style={{ fontWeight: 600 }}>{m.appliedTo}</span> model
                      (score: {m.scoreBefore} → {m.scoreAfter})
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </ReportPage>
  );
}

export function ActionPlanPage({ result }: { result: DiagnosticResult }) {
  const plan = ACTION_PLANS[result.recommendedModel];
  const { assessmentMetadata } = result;

  return (
    <ReportPage pageIndex={9} result={result}>
      <PageHeader title="90-Day Action Plan" assessmentId={assessmentMetadata.assessmentId} />

      <div
        style={{
          fontSize: 10,
          color: BRAND.textMuted,
          marginBottom: 12,
          lineHeight: 1.5,
        }}
      >
        Structured implementation roadmap based on your recommended{" "}
        <span style={{ fontWeight: 600, color: BRAND.accent }}>
          {result.recommendedModelLabel}
        </span>{" "}
        model. Each phase builds on the previous one.
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {plan?.phases.map((phase, pi) => {
          const phaseColors = ["#3BA99E", "#2E6DA4", "#1A3C5E"];
          const phaseColor = phaseColors[pi] || BRAND.accent;
          return (
            <div
              key={pi}
              style={{
                borderRadius: 8,
                border: `1px solid ${BRAND.border}`,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  padding: "8px 12px",
                  backgroundColor: phaseColor,
                  color: BRAND.white,
                  fontSize: 11,
                  fontWeight: 700,
                }}
              >
                Phase {pi + 1}: {phase.title}
              </div>
              <div style={{ padding: 8 }}>
                {phase.items.map((item, ii) => {
                  const priorityColors: Record<string, string> = {
                    high: BRAND.red,
                    medium: BRAND.orange,
                    low: BRAND.green,
                  };
                  return (
                    <div
                      key={ii}
                      style={{
                        display: "flex",
                        alignItems: "start",
                        gap: 8,
                        padding: "4px 0",
                        borderBottom: ii < phase.items.length - 1 ? `1px solid ${BRAND.borderLight}` : "none",
                      }}
                    >
                      <div
                        style={{
                          width: 16,
                          height: 16,
                          borderRadius: "50%",
                          backgroundColor: priorityColors[item.priority] + "20",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 9,
                          marginTop: 1,
                          flexShrink: 0,
                        }}
                      >
                        <div
                          style={{
                            width: 6,
                            height: 6,
                            borderRadius: "50%",
                            backgroundColor: priorityColors[item.priority],
                          }}
                        />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 9, color: BRAND.text, lineHeight: 1.4 }}>
                          {item.text}
                        </div>
                        <div style={{ fontSize: 8, color: BRAND.textLight, marginTop: 1 }}>
                          Owner: {item.owner} · Priority: {item.priority}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </ReportPage>
  );
}

export function ResourceRoadmapPage({ result }: { result: DiagnosticResult }) {
  const { assessmentMetadata } = result;
  const content = RESULT_CONTENT[result.recommendedModel];

  const roadmaps: Record<ModelKey, { title: string; items: string[] }> = {
    outsourced: {
      title: "Managed Outsourced Finance — Resource Roadmap",
      items: [
        "Engage a managed outsourced finance firm for monthly bookkeeping, VAT/GST filing, and management accounts.",
        "Implement cloud accounting automation (Xero, QuickBooks, or Zoho Books) to eliminate manual data entry.",
        "Schedule a quarterly fractional CFO review to validate financial controls as you scale.",
        "Re-run this diagnostic every 6–12 months or after any significant capital event.",
      ],
    },
    fractional: {
      title: "Fractional CFO Partner — Resource Roadmap",
      items: [
        "Engage a Fractional CFO on a 2–3 day per week engagement to own FP&A, board reporting, and capital strategy.",
        "Retain outsourced bookkeeping for daily transaction processing; the Fractional CFO directs their output.",
        "Implement FP&A tooling (Jirav, Fathom, or Vena) for rolling forecasts and scenario analysis.",
        "Re-run this diagnostic at 100-employee headcount or 12 months to assess full-time CFO readiness.",
      ],
    },
    fulltime: {
      title: "Full-Time Executive CFO — Resource Roadmap",
      items: [
        "Launch executive search for a full-time CFO with relevant sector and context experience.",
        "Assign an interim fractional CFO or senior finance advisor during the transition period.",
        "Empower the CFO to build a finance function including controller, FP&A lead, and tax/compliance specialist.",
        "Migrate to an enterprise-grade ERP (NetSuite, SAP, or Oracle) with the CFO as governance owner.",
      ],
    },
  };

  const roadmap = roadmaps[result.recommendedModel];

  return (
    <ReportPage pageIndex={10} result={result}>
      <PageHeader title="Resource Roadmap & Strategic Recommendations" assessmentId={assessmentMetadata.assessmentId} />

      <div
        style={{
          backgroundColor: BRAND.accentLight,
          borderRadius: 8,
          padding: 14,
          marginBottom: 16,
          border: `1px solid ${BRAND.accent}20`,
        }}
      >
        <div style={{ fontSize: 11, fontWeight: 600, color: BRAND.dark, marginBottom: 4 }}>
          {roadmap.title}
        </div>
        <div style={{ fontSize: 10, color: BRAND.textMuted }}>
          {content?.subheadline || "Strategic recommendations based on your diagnostic profile."}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {roadmap.items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 10,
              padding: 10,
              borderRadius: 6,
              backgroundColor: BRAND.cardBg,
              border: `1px solid ${BRAND.border}`,
            }}
          >
            <div
              style={{
                width: 22,
                height: 22,
                borderRadius: "50%",
                backgroundColor: BRAND.accent,
                color: BRAND.white,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 10,
                fontWeight: 700,
                flexShrink: 0,
              }}
            >
              {i + 1}
            </div>
            <div style={{ fontSize: 9, color: BRAND.text, lineHeight: 1.5, paddingTop: 2 }}>
              {item}
            </div>
          </div>
        ))}
      </div>

      <Divider />

      <div
        style={{
          padding: 12,
          borderRadius: 8,
          backgroundColor: BRAND.cardBg,
          border: `1px solid ${BRAND.border}`,
          fontSize: 9,
          lineHeight: 1.6,
          color: BRAND.textMuted,
        }}
      >
        <strong style={{ color: BRAND.text }}>Next Diagnostic Review:</strong> We recommend re-running
        this assessment in 6–12 months, or immediately after any major structural change — including
        a fundraising event, acquisition, market expansion, or leadership transition.
      </div>
    </ReportPage>
  );
}

export function AboutVisiwealPage({ result }: { result: DiagnosticResult }) {
  const { assessmentMetadata } = result;

  return (
    <ReportPage pageIndex={11} result={result}>
      <PageHeader title="About VisiWeal" assessmentId={assessmentMetadata.assessmentId} />

      <div
        style={{
          padding: 16,
          borderRadius: 8,
          backgroundColor: BRAND.dark,
          color: BRAND.white,
          marginBottom: 16,
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>VisiWeal</div>
        <div style={{ fontSize: 10, lineHeight: 1.6, color: "#D1D5DB" }}>
          We are a premier strategic advisory firm headquartered in Dubai, serving enterprise
          clients across the Middle East and beyond. Our name — VisiWeal — embodies our purpose:
          transforming strategic vision into measurable wealth.
        </div>
        <div style={{ fontSize: 10, lineHeight: 1.6, color: "#D1D5DB", marginTop: 8 }}>
          With deep expertise across M&A, financial advisory, digital transformation, and CFO
          services, we bring institutional-grade capabilities to every engagement, combined with
          the agility and personal commitment of a focused partnership.
        </div>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <div
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 8,
            backgroundColor: BRAND.cardBg,
            border: `1px solid ${BRAND.border}`,
          }}
        >
          <div style={{ fontSize: 9, fontWeight: 600, color: BRAND.accent, marginBottom: 8 }}>
            Contact
          </div>
          <div style={{ fontSize: 9, color: BRAND.text, lineHeight: 1.8 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 14, textAlign: "center" }}>📍</span>
              <span>{CONTACT.address}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 14, textAlign: "center" }}>✉️</span>
              <span>{CONTACT.email}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <span style={{ width: 14, textAlign: "center" }}>📞</span>
              <span>{CONTACT.phone}</span>
            </div>
          </div>
        </div>

        <div
          style={{
            flex: 1,
            padding: 12,
            borderRadius: 8,
            backgroundColor: BRAND.cardBg,
            border: `1px solid ${BRAND.border}`,
          }}
        >
          <div style={{ fontSize: 9, fontWeight: 600, color: BRAND.accent, marginBottom: 8 }}>
            Follow Us
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {SOCIAL.map((s) => (
              <div
                key={s.label}
                style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, color: BRAND.text }}
              >
                {SOCIAL_ICONS[s.label]}
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          padding: 12,
          borderRadius: 8,
          backgroundColor: BRAND.cardBg,
          border: `1px solid ${BRAND.border}`,
          fontSize: 9,
          lineHeight: 1.6,
          color: BRAND.textMuted,
        }}
      >
        <strong style={{ color: BRAND.text }}>Disclaimer:</strong> This report is generated
        automatically based on your responses to the Financial Resource Diagnostic assessment.
        It is intended as an informational and educational tool to support strategic decision-making.
        It does not constitute professional financial advice, a formal recommendation, or a
        binding engagement. You should consult with qualified financial professionals before
        making any decisions based on this report.
      </div>
    </ReportPage>
  );
}

export function BackCoverPage({ result }: { result: DiagnosticResult }) {
  return (
    <div
      style={{
        ...pageContainerStyle,
        padding: `${MARGIN}mm`,
        backgroundColor: BRAND.dark,
        color: BRAND.white,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        minHeight: `${PAGE_H}mm`,
        boxSizing: "border-box",
      }}
    >
      <img
        src="/logo.png"
        alt="VisiWeal"
        style={{ width: 72, height: 72, marginBottom: 20, borderRadius: 12 }}
      />

      <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
        VisiWeal
      </div>

      <div style={{ fontSize: 10, color: "#9CA3AF", marginBottom: 24, maxWidth: 300, lineHeight: 1.6 }}>
        Transforming strategic vision into measurable wealth.
      </div>

      <div style={{ width: 60, height: 1, backgroundColor: "rgba(59,169,158,0.3)", marginBottom: 20 }} />

      <div style={{ fontSize: 9, color: "#6B7280", lineHeight: 2 }}>
        <div>{CONTACT.address}</div>
        <div>{CONTACT.email}</div>
        <div>{CONTACT.phone}</div>
      </div>

      <div style={{ display: "flex", gap: 16, marginTop: 20 }}>
        {SOCIAL.map((s) => (
          <div
            key={s.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
            }}
          >
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: "rgba(59,169,158,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {SOCIAL_ICONS[s.label]}
            </div>
            <span style={{ fontSize: 7, color: "#9CA3AF" }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 32, fontSize: 8, color: "#4B5563" }}>
        © {new Date().getFullYear()} VisiWeal. All rights reserved.
      </div>
      <div style={{ fontSize: 7, color: "#4B5563", marginTop: 4 }}>
        Assessment ID: {result.assessmentMetadata.assessmentId}
      </div>
    </div>
  );
}
