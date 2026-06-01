import type { ModelKey } from "./diagnostic-data";

export interface PillarNarrative {
  pillarKey: string;
  narrative: string;
}

export interface ResultContent {
  header: string;
  subheadline: string;
  pillars: PillarNarrative[];
}

export const RESULT_CONTENT: Record<ModelKey, ResultContent> = {
  outsourced: {
    header: "Managed Outsourced Finance Partner",
    subheadline:
      "Your profile shows stable operations with low strategic complexity, best served by a cost-efficient outsourced finance arrangement.",
    pillars: [
      {
        pillarKey: "capital",
        narrative:
          "Your capital structure is straightforward with predictable cash flows and no active fundraising mandate. Standard periodic financial oversight is sufficient to manage your liquidity position. No complex debt structures or covenant obligations exist that would require day-to-day CFO-level treasury management.",
      },
      {
        pillarKey: "jurisdictional",
        narrative:
          "Your operations are localized or single-jurisdiction with baseline compliance requirements. An outsourced provider can efficiently manage your VAT or sales tax filings, local licensing, and standard statutory reporting without the need for in-house cross-border expertise.",
      },
      {
        pillarKey: "macro",
        narrative:
          "Your macroeconomic exposure is negligible — you operate primarily in stable currency zones with minimal import/export volatility. Standard financial reporting cadence is adequate to monitor any macro-level impacts on your business.",
      },
      {
        pillarKey: "governance",
        narrative:
          "Your stakeholder demands are limited to basic retrospective reporting. Your revenue model is simple enough that standard accounting processes and basic internal controls are sufficient. No institutional-level board reporting or complex revenue recognition is required.",
      },
      {
        pillarKey: "operational",
        narrative:
          "Your internal finance team handles day-to-day transaction processing adequately. The gap between current headcount and strategic complexity is narrow enough that outsourced strategic oversight — provided via periodic controller reviews — is sufficient.",
      },
      {
        pillarKey: "exit",
        narrative:
          "You have no active exit or transaction horizon. Financial operations are focused on sustainability and compliance rather than transaction readiness. An outsourced model aligns with your steady-state trajectory.",
      },
    ],
  },
  fractional: {
    header: "Fractional CFO Partner",
    subheadline:
      "Your responses indicate a growing business with dynamic capital requirements and moderate strategic complexity. A Fractional CFO provides the expertise you need on a flexible, scalable basis.",
    pillars: [
      {
        pillarKey: "capital",
        narrative:
          "You are managing moderate-to-complex capital events such as a growth-stage fundraise, dynamic runway management, or structured debt facilities. A Fractional CFO brings investor-grade financial modeling, cap table strategy, and lender covenant guidance — without the cost of a full-time executive.",
      },
      {
        pillarKey: "jurisdictional",
        narrative:
          "Your cross-border operations or multi-entity structure require experienced strategic oversight for transfer pricing, holding company optimization, and multi-jurisdiction tax compliance. These demands exceed an outsourced provider's capacity but do not yet require a permanent in-house executive.",
      },
      {
        pillarKey: "macro",
        narrative:
          "Your business has meaningful exposure to FX volatility, supply chain sensitivity, or regional economic shifts. A Fractional CFO can design hedging strategies, scenario models, and contingency plans to protect margins without maintaining a full-time treasury function.",
      },
      {
        pillarKey: "governance",
        narrative:
          "Your board or investors expect strategic reporting with variance analysis, unit economics, and institutional-quality narratives. A Fractional CFO provides data room readiness, board-level presentation, and governance framework design tailored to your growth stage.",
      },
      {
        pillarKey: "operational",
        narrative:
          "Your finance team has solid execution-level capability but lacks strategic leadership. A Fractional CFO bridges this gap — mentoring the existing team, driving FP&A maturity, and overseeing system upgrades while keeping overhead variable.",
      },
      {
        pillarKey: "exit",
        narrative:
          "You are exploring M&A, considering a strategic partnership, or positioning for a future exit. A Fractional CFO prepares your financial architecture for due diligence, builds investor-ready data rooms, and ensures your cap table and forecasts can withstand scrutiny.",
      },
    ],
  },
  fulltime: {
    header: "Full-Time Executive CFO",
    subheadline:
      "Your profile reflects a high‑complexity, high‑stakes financial environment that demands a dedicated, permanent Chief Financial Officer embedded in your executive leadership team.",
    pillars: [
      {
        pillarKey: "capital",
        narrative:
          "You are managing complex capital events such as a major acquisition, IPO preparation, PE buyout, distressed restructuring, or multi-lender covenant compliance. These demand a dedicated executive whose sole focus is your capital strategy, treasury optimization, and stakeholder capital management.",
      },
      {
        pillarKey: "jurisdictional",
        narrative:
          "Your global multi-subsidiary structure, operations in high-risk regulatory sectors, or complex transfer pricing obligations require a permanent in-house expert. Only a full-time CFO can maintain continuous compliance, optimize your corporate structure across jurisdictions, and manage cross-border audit relationships.",
      },
      {
        pillarKey: "macro",
        narrative:
          "You operate across structurally volatile currency zones or high-geopolitical-risk markets. A full-time CFO provides active treasury management, capital repatriation strategy, and real-time contingency planning that cannot be delivered in a part-time or advisory capacity.",
      },
      {
        pillarKey: "governance",
        narrative:
          "Your institutional stakeholders — PE sponsors, sovereign wealth funds, or bank syndicates — demand audited financial statements, automated internal control testing, and board-ready fiduciary governance. Only a permanent CFO can build and maintain this infrastructure reliably.",
      },
      {
        pillarKey: "operational",
        narrative:
          "Your finance function requires a C-suite leader to manage a multi-layered team, drive an ERP implementation, and integrate financial operations across business units. A Fractional or outsourced arrangement cannot provide the day-to-day leadership and organizational authority required.",
      },
      {
        pillarKey: "exit",
        narrative:
          "You are on a defined path to a liquidity event within 12 to 36 months — a PE-backed buyout, strategic trade sale, or IPO. A full-time CFO is essential to manage the transaction process, coordinate advisors, maintain data room integrity, and communicate with prospective buyers or underwriters.",
      },
    ],
  },
};

export interface ActionPlanItem {
  text: string;
  priority: "high" | "medium" | "low";
  owner: string;
}

export interface ActionPlanPhase {
  title: string;
  items: ActionPlanItem[];
}

export interface ActionPlanData {
  phases: ActionPlanPhase[];
}

export const ACTION_PLANS: Record<ModelKey, ActionPlanData> = {
  outsourced: {
    phases: [
      {
        title: "Days 0–30: Foundation",
        items: [
          {
            text: "Select and engage a managed outsourced finance firm with MENA SME experience",
            priority: "high",
            owner: "Founder / CEO",
          },
          {
            text: "Migrate to a cloud accounting platform (Xero, QuickBooks, or Zoho Books)",
            priority: "high",
            owner: "Finance team",
          },
          {
            text: "Implement automated bank feeds and receipt capture to eliminate manual data entry",
            priority: "high",
            owner: "Finance team",
          },
          {
            text: "Establish a standard monthly reporting cadence (P&L, Balance Sheet, cash flow)",
            priority: "medium",
            owner: "Outsourced provider",
          },
        ],
      },
      {
        title: "Days 31–60: Stabilise",
        items: [
          {
            text: "Reconcile all open vendor and customer accounts",
            priority: "medium",
            owner: "Outsourced provider",
          },
          {
            text: "Set up VAT / GST filing automation and compliance calendar",
            priority: "high",
            owner: "Outsourced provider",
          },
          {
            text: "Define segregation of duties between internal team and outsourced provider",
            priority: "medium",
            owner: "Founder / CEO",
          },
          {
            text: "Schedule first quarterly fractional CFO review session",
            priority: "medium",
            owner: "Founder / CEO",
          },
        ],
      },
      {
        title: "Days 61–90: Optimise",
        items: [
          {
            text: "Review first full month of clean management accounts for accuracy",
            priority: "medium",
            owner: "Founder / CEO",
          },
          {
            text: "Identify top three cost leakages or margin improvement opportunities",
            priority: "low",
            owner: "Outsourced provider",
          },
          {
            text: "Document standard operating procedures for core finance processes",
            priority: "low",
            owner: "Finance team",
          },
          {
            text: "Set a 6-month calendar reminder to re-run this diagnostic",
            priority: "low",
            owner: "Founder / CEO",
          },
        ],
      },
    ],
  },
  fractional: {
    phases: [
      {
        title: "Days 0–30: Onboard & Assess",
        items: [
          {
            text: "Engage a Fractional CFO on a 2–3 day per week engagement",
            priority: "high",
            owner: "Founder / CEO",
          },
          {
            text: "Conduct a 360° finance function audit — team, systems, processes, reporting",
            priority: "high",
            owner: "Fractional CFO",
          },
          {
            text: "Build a 13-week rolling cash flow forecast model",
            priority: "high",
            owner: "Fractional CFO",
          },
          {
            text: "Review and update cap table and investor reporting templates",
            priority: "high",
            owner: "Fractional CFO",
          },
          {
            text: "Introduce Fractional CFO to board / investors and set reporting cadence",
            priority: "medium",
            owner: "Founder / CEO",
          },
        ],
      },
      {
        title: "Days 31–60: Structure & Scale",
        items: [
          {
            text: "Implement FP&A tooling (Jirav, Fathom, or Vena) for rolling forecasts",
            priority: "high",
            owner: "Fractional CFO",
          },
          {
            text: "Design unit economics dashboard — CAC, LTV, gross margin by cohort",
            priority: "high",
            owner: "Fractional CFO",
          },
          {
            text: "Prepare data room for active or upcoming fundraise / due diligence",
            priority: "medium",
            owner: "Fractional CFO",
          },
          {
            text: "Establish transfer pricing documentation framework if cross-border",
            priority: "medium",
            owner: "Fractional CFO",
          },
          {
            text: "Set up board reporting pack with variance analysis and KPI tracking",
            priority: "medium",
            owner: "Fractional CFO",
          },
        ],
      },
      {
        title: "Days 61–90: Execute & Review",
        items: [
          {
            text: "Run first board meeting with new financial reporting pack",
            priority: "medium",
            owner: "Fractional CFO",
          },
          {
            text: "Identify and recruit key finance hires (controller, FP&A analyst) if needed",
            priority: "medium",
            owner: "Fractional CFO",
          },
          {
            text: "Implement internal control improvements identified in audit",
            priority: "medium",
            owner: "Fractional CFO",
          },
          {
            text: "Set 90-day strategic financial roadmap aligned with business milestones",
            priority: "low",
            owner: "Fractional CFO",
          },
          {
            text: "Schedule next diagnostic re-run at headcount milestone or 12 months",
            priority: "low",
            owner: "Founder / CEO",
          },
        ],
      },
    ],
  },
  fulltime: {
    phases: [
      {
        title: "Days 0–30: Leadership Transition",
        items: [
          {
            text: "Launch executive search for a full-time CFO with relevant sector experience",
            priority: "high",
            owner: "Board / CEO",
          },
          {
            text: "Assign an interim fractional CFO or senior finance advisor during transition",
            priority: "high",
            owner: "Board / CEO",
          },
          {
            text: "Prepare detailed finance function mandate and priority briefing for incoming CFO",
            priority: "high",
            owner: "CEO",
          },
          {
            text: "Audit current financial systems, team capabilities, and reporting gaps",
            priority: "medium",
            owner: "Interim finance lead",
          },
        ],
      },
      {
        title: "Days 31–60: Build & Stabilise",
        items: [
          {
            text: "CFO joins and conducts 30-day deep dive across all business units",
            priority: "high",
            owner: "CFO",
          },
          {
            text: "Design finance org structure — controller, FP&A lead, tax/compliance specialist",
            priority: "high",
            owner: "CFO",
          },
          {
            text: "Begin ERP migration or system upgrade with CFO as governance owner",
            priority: "high",
            owner: "CFO",
          },
          {
            text: "Establish institutional reporting cadence for board, lenders, and investors",
            priority: "high",
            owner: "CFO",
          },
          {
            text: "Implement internal control framework and anti-fraud mechanisms",
            priority: "medium",
            owner: "CFO",
          },
        ],
      },
      {
        title: "Days 61–90: Execute & Align",
        items: [
          {
            text: "Deliver first complete board pack with full variance analysis and forecasts",
            priority: "high",
            owner: "CFO",
          },
          {
            text: "Drive capital strategy — fundraise, restructuring, or transaction preparation",
            priority: "high",
            owner: "CFO",
          },
          {
            text: "Hire or assign key finance team members per org design",
            priority: "medium",
            owner: "CFO",
          },
          {
            text: "Establish rolling 12-month strategic financial planning process",
            priority: "medium",
            owner: "CFO",
          },
          {
            text: "Re-run this diagnostic annually or after any major structural change",
            priority: "low",
            owner: "CFO",
          },
        ],
      },
    ],
  },
};

export const PILLAR_META: Record<string, { icon: string; label: string }> = {
  capital: { icon: "\uD83D\uDCB0", label: "Capital & Liquidity" },
  jurisdictional: { icon: "\uD83C\uDF10", label: "Regulatory Exposure" },
  macro: { icon: "\uD83D\uDCCA", label: "Macro Risk" },
  governance: { icon: "\uD83C\uDFDB\uFE0F", label: "Governance & Controls" },
  operational: { icon: "\u2699\uFE0F", label: "Operational Scale" },
  exit: { icon: "\uD83D\uDE80", label: "Growth & Exit" },
};
