export type ModelKey = "outsourced" | "fractional" | "fulltime";

export interface OptionWeight {
  id: string;
  label: string;
  description: string;
  weights: Record<ModelKey, number>;
  redFlag: boolean;
  redFlagMessage?: string;
  redFlagSeverity?: "high" | "critical";
  redFlagForceMinimum?: ModelKey;
}

export interface Question {
  id: number;
  pillar: string;
  pillarKey: string;
  sequence: number;
  text: string;
  options: OptionWeight[];
}

export interface PillarDef {
  id: string;
  key: string;
  label: string;
  shortLabel: string;
  icon: string;
  description: string;
  color: string;
}

export interface ModelDef {
  key: ModelKey;
  label: string;
  shortLabel: string;
  color: string;
  hex: string;
  rgba: string;
}

export interface ComplexityMultiplier {
  id: string;
  label: string;
  description: string;
  conditions: { questionId: number; optionId: string }[];
  multiplier: number;
  appliesTo: ModelKey;
}

export interface DiagnosticData {
  version: string;
  totalPillars: number;
  totalQuestions: number;
  pillars: PillarDef[];
  models: Record<ModelKey, ModelDef>;
  questions: Question[];
  complexityMultipliers: ComplexityMultiplier[];
}

export const diagnosticData: DiagnosticData = {
  version: "2.0",
  totalPillars: 6,
  totalQuestions: 16,

  pillars: [
    {
      id: "P1",
      key: "capital",
      label: "Capital Strategy & Liquidity Risk",
      shortLabel: "Capital & Liquidity",
      icon: "💰",
      description:
        "Evaluates your capital mobilization objectives, cash runway management, debt structure complexity, and proximity to active fundraising events.",
      color: "#1A3C5E",
    },
    {
      id: "P2",
      key: "jurisdictional",
      label: "Jurisdictional & Regulatory Exposure",
      shortLabel: "Regulatory Exposure",
      icon: "🌐",
      description:
        "Assesses cross-border corporate structures, multi-entity consolidation needs, transfer pricing obligations, and sector-specific regulatory compliance burdens.",
      color: "#2E6DA4",
    },
    {
      id: "P3",
      key: "macro",
      label: "Macroeconomic & Stability Risk",
      shortLabel: "Macro Risk",
      icon: "📊",
      description:
        "Measures your vulnerability to FX volatility, inflationary environments, geopolitical disruption, and banking system instability across operating markets.",
      color: "#C0392B",
    },
    {
      id: "P4",
      key: "governance",
      label: "Governance & Control Infrastructure",
      shortLabel: "Governance & Controls",
      icon: "🏛️",
      description:
        "Examines stakeholder reporting demands, internal control maturity, anti-fraud safeguards, and revenue recognition complexity.",
      color: "#8E44AD",
    },
    {
      id: "P5",
      key: "operational",
      label: "Operational Scale & Departmental Gaps",
      shortLabel: "Operational Scale",
      icon: "⚙️",
      description:
        "Reviews the strategic capability of your internal finance team, ERP/systems maturity, and the gap between current headcount and the complexity of your operations.",
      color: "#16A085",
    },
    {
      id: "P6",
      key: "exit",
      label: "Strategic Growth & Exit Readiness",
      shortLabel: "Growth & Exit",
      icon: "🚀",
      description:
        "Identifies your business stage trajectory, M&A preparedness, exit horizon, and the financial architecture required to support a transaction or liquidity event.",
      color: "#D35400",
    },
  ],

  models: {
    outsourced: {
      key: "outsourced",
      label: "Managed Outsourced Finance",
      shortLabel: "Outsourced",
      color: "#7F8C8D",
      hex: "#7F8C8D",
      rgba: "rgba(127, 140, 141, 0.25)",
    },
    fractional: {
      key: "fractional",
      label: "Fractional CFO Partner",
      shortLabel: "Fractional CFO",
      color: "#2E6DA4",
      hex: "#2E6DA4",
      rgba: "rgba(46, 109, 164, 0.25)",
    },
    fulltime: {
      key: "fulltime",
      label: "Full-Time Executive CFO",
      shortLabel: "Full-Time CFO",
      color: "#1A3C5E",
      hex: "#1A3C5E",
      rgba: "rgba(26, 60, 94, 0.25)",
    },
  },

  questions: [
    {
      id: 1,
      pillar: "Capital Strategy & Liquidity Risk",
      pillarKey: "capital",
      sequence: 1,
      text: "What is your primary capital mobilization objective over the next 12 to 24 months?",
      options: [
        {
          id: "A",
          label: "Organic reinvestment",
          description:
            "We are self-funded or stably profitable. We require standard oversight of cash flow to sustain operations without immediate external capital.",
          weights: { outsourced: 3, fractional: 1, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Structured growth capital",
          description:
            "We are raising Series A/B venture capital, securing growth equity, or arranging structured venture debt or credit facilities.",
          weights: { outsourced: 0, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "Complex capital events",
          description:
            "We are executing cross-border acquisitions, preparing for private equity buyouts, restructuring major debt, or positioning for an IPO.",
          weights: { outsourced: 0, fractional: 1, fulltime: 3 },
          redFlag: false,
        },
      ],
    },
    {
      id: 2,
      pillar: "Capital Strategy & Liquidity Risk",
      pillarKey: "capital",
      sequence: 2,
      text: "Which statement best describes your cash runway management and working capital risk?",
      options: [
        {
          id: "A",
          label: "Predictable stability",
          description:
            "Cash flow is predictable. Standard monthly reconciliations and static cash ledgers are sufficient to manage our working capital.",
          weights: { outsourced: 3, fractional: 0, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Dynamic runway management",
          description:
            "Our runway is highly sensitive to customer acquisition costs, inventory cycles, or payroll scaling. We require weekly rolling forecasts and scenario testing.",
          weights: { outsourced: 0, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "High capital velocity",
          description:
            "We manage significant capital expenditures, complex supply chain financing, or highly volatile debtor and creditor relationships requiring active daily treasury management.",
          weights: { outsourced: 0, fractional: 1, fulltime: 3 },
          redFlag: false,
        },
      ],
    },
    {
      id: 13,
      pillar: "Capital Strategy & Liquidity Risk",
      pillarKey: "capital",
      sequence: 3,
      text: "Where are you in your active capital raise cycle?",
      options: [
        {
          id: "A",
          label: "Not currently fundraising",
          description:
            "We have no active fundraising mandate. We are either bootstrapped, recently closed a round, or have sufficient capital reserves to sustain current operations for 18 or more months.",
          weights: { outsourced: 3, fractional: 0, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Pipeline building / pre-raise preparation",
          description:
            "We are preparing for a fundraise within 6 to 12 months. We need to clean up our financial models, optimize our cap table narrative, and ensure investor-grade data room readiness.",
          weights: { outsourced: 0, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "Active raise underway / closing imminent",
          description:
            "We are in active investor negotiations, term sheet review, or closing a financing round within 90 days. We need immediate CFO-level support for financial due diligence and model validation.",
          weights: { outsourced: 0, fractional: 2, fulltime: 3 },
          redFlag: true,
          redFlagMessage:
            "⚠️ CAPITAL EVENT: An active fundraising round requires institutional-grade CFO-level support immediately. Outsourced model is critically insufficient.",
          redFlagSeverity: "high",
          redFlagForceMinimum: "fractional",
        },
      ],
    },
    {
      id: 14,
      pillar: "Capital Strategy & Liquidity Risk",
      pillarKey: "capital",
      sequence: 4,
      text: "How complex is your debt structure and your obligations to lenders or financial institutions?",
      options: [
        {
          id: "A",
          label: "Debt-free or simple credit lines",
          description:
            "We have no outstanding structured debt. We may hold a basic overdraft or simple credit facility with no financial covenant obligations.",
          weights: { outsourced: 3, fractional: 0, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Term loans or structured facilities with standard covenants",
          description:
            "We manage one or more active credit facilities or term loans. We report against standard financial covenants such as DSCR or debt-to-EBITDA periodically to our lenders.",
          weights: { outsourced: 0, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "Complex multi-lender structure or covenant compliance risk",
          description:
            "We hold senior or mezzanine debt structures, syndicated loans, or outstanding convertible instruments. We are at risk of covenant breach or are actively renegotiating lender terms.",
          weights: { outsourced: 0, fractional: 1, fulltime: 3 },
          redFlag: true,
          redFlagMessage:
            "🔴 COVENANT BREACH RISK: Lender and investor covenant obligations require dedicated permanent CFO oversight.",
          redFlagSeverity: "critical",
          redFlagForceMinimum: "fulltime",
        },
      ],
    },
    {
      id: 3,
      pillar: "Jurisdictional & Regulatory Exposure",
      pillarKey: "jurisdictional",
      sequence: 5,
      text: "What is the geographical footprint and corporate structure of your business?",
      options: [
        {
          id: "A",
          label: "Localized single-entity",
          description:
            "We operate within a single country or a single legal entity with direct, uncomplicated supply chains and local distribution.",
          weights: { outsourced: 3, fractional: 1, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Multi-entity or regional cross-border",
          description:
            "We operate across multiple regional jurisdictions, for example a holding structure in a financial center like Delaware, Cayman, or DIFC, with operating subsidiaries in other markets.",
          weights: { outsourced: 1, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "Global multi-subsidiary structure",
          description:
            "We operate a complex network of subsidiaries across varying legal jurisdictions, requiring consolidated reporting, intercompany billing, and transfer pricing documentation.",
          weights: { outsourced: 0, fractional: 1, fulltime: 3 },
          redFlag: false,
        },
      ],
    },
    {
      id: 4,
      pillar: "Jurisdictional & Regulatory Exposure",
      pillarKey: "jurisdictional",
      sequence: 6,
      text: "How does your organization manage complex regulatory and compliance environments?",
      options: [
        {
          id: "A",
          label: "Baseline compliance",
          description:
            "Our requirements are limited to local tax filing, standard VAT or sales tax compliance, and local business licensing.",
          weights: { outsourced: 3, fractional: 1, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Strategic tax optimization",
          description:
            "We manage complex tax scenarios across free zones and mainland entities, require regional transfer pricing documentation, or must optimize withholding tax exposure.",
          weights: { outsourced: 0, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "High-risk regulatory scrutiny",
          description:
            "We operate in highly regulated sectors such as fintech, healthcare, or defense, or across international jurisdictions with strict compliance requiring SEC-level audit readiness.",
          weights: { outsourced: 0, fractional: 1, fulltime: 3 },
          redFlag: false,
        },
      ],
    },
    {
      id: 5,
      pillar: "Macroeconomic & Stability Risk",
      pillarKey: "macro",
      sequence: 7,
      text: "How exposed is your business to foreign exchange volatility and currency devaluation?",
      options: [
        {
          id: "A",
          label: "Negligible exposure",
          description:
            "We operate primarily in pegged currencies or a single domestic currency such as AED, SAR, or USD with minimal import or export transactions.",
          weights: { outsourced: 3, fractional: 0, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Transactional FX exposure",
          description:
            "We import and export across multiple currency zones such as USD, EUR, and GBP, and require basic hedging or structured multi-currency accounts.",
          weights: { outsourced: 1, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "Structural currency or macro volatility",
          description:
            "We have operations in high-inflation, highly volatile, or devaluing currency markets such as Egypt, Turkey, or parts of LATAM or Africa, requiring active capital repatriation strategies.",
          weights: { outsourced: 0, fractional: 1, fulltime: 3 },
          redFlag: false,
        },
      ],
    },
    {
      id: 6,
      pillar: "Macroeconomic & Stability Risk",
      pillarKey: "macro",
      sequence: 8,
      text: "How do geopolitical or macroeconomic shifts affect your business continuity?",
      options: [
        {
          id: "A",
          label: "Stable operating environment",
          description:
            "Our supply chain, customer base, and operations are located in politically and economically stable regions with low disruption risk.",
          weights: { outsourced: 3, fractional: 1, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Moderate supply chain or market sensitivity",
          description:
            "We face potential disruptions from tariff changes, shifting trade policies, or regional economic policy adjustments.",
          weights: { outsourced: 1, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "High geopolitical risk",
          description:
            "We operate in or source from regions with high political instability, sanctions risk, or banking system vulnerability, requiring continuous contingency planning.",
          weights: { outsourced: 0, fractional: 1, fulltime: 3 },
          redFlag: false,
        },
      ],
    },
    {
      id: 7,
      pillar: "Governance & Control Infrastructure",
      pillarKey: "governance",
      sequence: 9,
      text: "What level of financial reporting and boardroom presence do your stakeholders demand?",
      options: [
        {
          id: "A",
          label: "Basic internal reporting",
          description:
            "We require standard, retrospectively generated financial packages — Balance Sheet and P&L — for local management visibility and tax compliance.",
          weights: { outsourced: 3, fractional: 0, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Strategic investor relations",
          description:
            "We must present institutional-grade reporting, detailed variance analysis, and cohort or unit economic data to sophisticated venture capitalists or an active Board of Directors.",
          weights: { outsourced: 0, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "Institutional fiduciary governance",
          description:
            "We answer to institutional private equity sponsors, sovereign wealth funds, or strict bank covenants that demand audited financial statements with deep internal control reviews.",
          weights: { outsourced: 0, fractional: 1, fulltime: 3 },
          redFlag: false,
        },
      ],
    },
    {
      id: 8,
      pillar: "Governance & Control Infrastructure",
      pillarKey: "governance",
      sequence: 10,
      text: "How robust is your internal control environment against leakage, fraud, and misallocation?",
      options: [
        {
          id: "A",
          label: "Informal trust-based controls",
          description:
            "Our team is small and operations are closely managed by the founders, requiring simple authorization limits.",
          weights: { outsourced: 3, fractional: 1, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Segregated standard controls",
          description:
            "We have standard authorization limits and segregated duties, but lack automated system audits and rigorous internal financial risk mapping.",
          weights: { outsourced: 0, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "Institutional risk management",
          description:
            "We require automated internal control testing, strict segregation of duties across global departments, and comprehensive anti-fraud oversight.",
          weights: { outsourced: 0, fractional: 1, fulltime: 3 },
          redFlag: false,
        },
      ],
    },
    {
      id: 16,
      pillar: "Governance & Control Infrastructure",
      pillarKey: "governance",
      sequence: 11,
      text: "Which best describes your revenue model and the analytical demands it places on your finance function?",
      options: [
        {
          id: "A",
          label: "Simple, single-stream revenue",
          description:
            "Our revenue comes from one primary channel such as direct product sales or a single service contract. Pricing is straightforward and margin analysis is simple.",
          weights: { outsourced: 3, fractional: 1, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Multi-stream or recurring revenue with cohort complexity",
          description:
            "We manage subscription revenue, tiered pricing models, multi-product lines, or marketplace dynamics requiring cohort analysis, churn modeling, and LTV-to-CAC tracking.",
          weights: { outsourced: 0, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "Project-based or complex contract revenue",
          description:
            "We recognize revenue under long-term contracts per IFRS 15 or ASC 606, project-based billing, government contracts, or multi-party joint venture revenue-sharing arrangements.",
          weights: { outsourced: 0, fractional: 2, fulltime: 3 },
          redFlag: false,
        },
      ],
    },
    {
      id: 9,
      pillar: "Operational Scale & Departmental Gaps",
      pillarKey: "operational",
      sequence: 12,
      text: "Which statement best describes the current capabilities of your internal finance department?",
      options: [
        {
          id: "A",
          label: "Administrative focus",
          description:
            "We have basic bookkeepers or generalist accountants who record transactional historical data but cannot generate forward-looking strategic projections.",
          weights: { outsourced: 3, fractional: 1, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Execution-level capability",
          description:
            "We have a solid accounting team or financial controller but they lack strategic insight, fundraising experience, or cross-border M&A expertise.",
          weights: { outsourced: 0, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "Scale constraints",
          description:
            "We have a multi-layered finance team but the complexity of our operations requires a dedicated C-suite executive to manage the team and steer commercial strategy.",
          weights: { outsourced: 0, fractional: 0, fulltime: 3 },
          redFlag: false,
        },
      ],
    },
    {
      id: 10,
      pillar: "Operational Scale & Departmental Gaps",
      pillarKey: "operational",
      sequence: 13,
      text: "What is your organizational budget and immediate timeline for resolving financial strategy gaps?",
      options: [
        {
          id: "A",
          label: "Cost-sensitive / Non-urgent",
          description:
            "We have low budget flexibility and prefer a low-cost, fixed monthly compliance solution.",
          weights: { outsourced: 3, fractional: 1, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "ROI-driven / Scalable",
          description:
            "We need elite financial guidance but prefer to scale the resource cost relative to our transaction volume and strategic roadmap.",
          weights: { outsourced: 0, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "Immediate scale requirement",
          description:
            "We require an immediate, full-time, highly visible senior executive, and we have the budget to support competitive base salaries, benefits, and equity.",
          weights: { outsourced: 0, fractional: 1, fulltime: 3 },
          redFlag: false,
        },
      ],
    },
    {
      id: 15,
      pillar: "Operational Scale & Departmental Gaps",
      pillarKey: "operational",
      sequence: 14,
      text: "How would you characterize your current financial systems and ERP or accounting infrastructure?",
      options: [
        {
          id: "A",
          label: "Basic cloud accounting",
          description:
            "We use an entry-level accounting platform such as QuickBooks, Xero, or Wave for invoicing, expense tracking, and basic reporting with no ERP or consolidated multi-entity reporting capability.",
          weights: { outsourced: 3, fractional: 1, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Mid-market systems with partial integrations",
          description:
            "We use a mid-tier platform such as Zoho Books, Sage, or NetSuite Lite with some integrations to payroll, CRM, or inventory management, but lack full consolidation or FP&A modules.",
          weights: { outsourced: 0, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "Enterprise ERP or active migration",
          description:
            "We operate or are migrating to an enterprise ERP such as Oracle, SAP, or full NetSuite, requiring executive oversight of system governance, data migration integrity, and control design.",
          weights: { outsourced: 0, fractional: 1, fulltime: 3 },
          redFlag: false,
        },
      ],
    },
    {
      id: 11,
      pillar: "Strategic Growth & Exit Readiness",
      pillarKey: "exit",
      sequence: 15,
      text: "What best describes your current business stage and financial health trajectory?",
      options: [
        {
          id: "A",
          label: "Stable operations / Steady state",
          description:
            "Our revenue is predictable, margins are healthy, and we are not undergoing significant structural change. Financial management is largely backward-looking and compliance-focused.",
          weights: { outsourced: 3, fractional: 1, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "Active growth / Pre-profitability scaling",
          description:
            "We are investing ahead of revenue by hiring, expanding markets, or building infrastructure. We are burning cash strategically and require continuous runway modeling and milestone-based budget governance.",
          weights: { outsourced: 0, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "Distressed / Restructuring / Turnaround",
          description:
            "We are managing debt obligations under pressure, renegotiating supplier or lender terms, facing a covenant breach risk, or navigating a business model pivot under financial duress.",
          weights: { outsourced: 0, fractional: 2, fulltime: 3 },
          redFlag: true,
          redFlagMessage:
            "⚠️ DISTRESS SIGNAL: Distressed financial conditions require minimum Fractional CFO-level intervention immediately. Outsourced model is structurally insufficient.",
          redFlagSeverity: "high",
          redFlagForceMinimum: "fractional",
        },
      ],
    },
    {
      id: 12,
      pillar: "Strategic Growth & Exit Readiness",
      pillarKey: "exit",
      sequence: 16,
      text: "What is your strategic exit horizon or near-term transaction objective?",
      options: [
        {
          id: "A",
          label: "No active exit planning",
          description:
            "We have no immediate plans for a liquidity event, strategic sale, or IPO. We are focused on operational sustainability over the next 2 to 3 years.",
          weights: { outsourced: 3, fractional: 0, fulltime: 0 },
          redFlag: false,
        },
        {
          id: "B",
          label: "M&A exploration or strategic partnership",
          description:
            "We are actively exploring inorganic growth through acquisitions, a merger, or a joint venture, or we are a potential acquisition target conducting early-stage due diligence readiness.",
          weights: { outsourced: 0, fractional: 3, fulltime: 1 },
          redFlag: false,
        },
        {
          id: "C",
          label: "Defined exit within 12 to 36 months",
          description:
            "We are preparing for a private equity-led buyout, a strategic trade sale, or a public market listing. We need deep financial modeling, data room preparation, and auditor and advisor coordination.",
          weights: { outsourced: 0, fractional: 1, fulltime: 3 },
          redFlag: false,
        },
      ],
    },
  ],

  complexityMultipliers: [
    {
      id: "CM-01",
      label: "Cross-Border Capital Mobilization Complexity",
      description:
        "Multi-entity structure combined with active growth capital raise creates compounding advisory complexity.",
      conditions: [
        { questionId: 1, optionId: "B" },
        { questionId: 3, optionId: "B" },
      ],
      multiplier: 1.25,
      appliesTo: "fractional",
    },
    {
      id: "CM-02",
      label: "Dual Macro-Structural Risk Compounding",
      description:
        "Simultaneous FX volatility and high geopolitical risk creates a treasury management emergency.",
      conditions: [
        { questionId: 5, optionId: "C" },
        { questionId: 6, optionId: "C" },
      ],
      multiplier: 1.35,
      appliesTo: "fulltime",
    },
    {
      id: "CM-03",
      label: "Critical Talent Gap vs. Capital Event Mismatch",
      description:
        "Administrative-only finance team facing complex capital events represents the highest execution risk in this diagnostic.",
      conditions: [
        { questionId: 9, optionId: "A" },
        { questionId: 1, optionId: "C" },
      ],
      multiplier: 1.4,
      appliesTo: "fractional",
    },
    {
      id: "CM-04",
      label: "Active Fundraise with Weak Finance Infrastructure",
      description:
        "An imminent close combined with an under-resourced finance function creates critical due diligence exposure.",
      conditions: [
        { questionId: 13, optionId: "C" },
        { questionId: 9, optionId: "A" },
      ],
      multiplier: 1.5,
      appliesTo: "fractional",
    },
    {
      id: "CM-05",
      label: "Exit Horizon with Global Structural Complexity",
      description:
        "A defined exit window layered over a global multi-subsidiary structure demands permanent executive governance.",
      conditions: [
        { questionId: 12, optionId: "C" },
        { questionId: 3, optionId: "C" },
      ],
      multiplier: 1.3,
      appliesTo: "fulltime",
    },
    {
      id: "CM-06",
      label: "ERP Migration with Scale Constraints",
      description:
        "An enterprise ERP implementation without a strategic finance leader creates systemic data integrity risk.",
      conditions: [
        { questionId: 15, optionId: "C" },
        { questionId: 9, optionId: "A" },
      ],
      multiplier: 1.2,
      appliesTo: "fractional",
    },
  ],
};

export const pillars = diagnosticData.pillars;
export const questions = diagnosticData.questions;
export const complexityMultipliers = diagnosticData.complexityMultipliers;
export const modelDefs = diagnosticData.models;

export const modelLabels: Record<ModelKey, string> = {
  outsourced: diagnosticData.models.outsourced.label,
  fractional: diagnosticData.models.fractional.label,
  fulltime: diagnosticData.models.fulltime.label,
};

export const modelShortLabels: Record<ModelKey, string> = {
  outsourced: diagnosticData.models.outsourced.shortLabel,
  fractional: diagnosticData.models.fractional.shortLabel,
  fulltime: diagnosticData.models.fulltime.shortLabel,
};

export interface ResultTemplate {
  header: string;
  subheadline: string;
  rationale: {
    intro: string;
    capital: string;
    jurisdictional: string;
    governance: string;
  };
  recommendations: string[];
}

export const resultTemplates: Record<ModelKey, ResultTemplate> = {
  outsourced: {
    header: "Managed Outsourced Finance Partner",
    subheadline:
      "Your profile shows stable operations with low strategic complexity, best served by a cost-efficient outsourced finance arrangement.",
    rationale: {
      intro:
        "Based on your responses, your financial profile is well-suited to a Managed Outsourced Finance model. Your liquidity position is predictable, your regulatory footprint is minimal, and your strategic demands are primarily compliance-oriented rather than transformational.",
      capital:
        "Your capital structure is straightforward with predictable cash flows and no active fundraising mandate, requiring standard financial oversight.",
      jurisdictional:
        "Your operations are localized or single-jurisdiction with baseline compliance requirements that an outsourced provider can efficiently manage.",
      governance:
        "Your stakeholder demands are limited to basic reporting, and your revenue model is simple enough that standard accounting processes are sufficient.",
    },
    recommendations: [
      "Engage a managed outsourced finance firm for monthly bookkeeping, VAT/GST filing, and standard management accounts.",
      "Abolish manual data entry through basic cloud accounting automation (Xero, QuickBooks, or Zoho Books).",
      "Schedule a quarterly fractional CFO review to validate that financial controls remain appropriate as you scale.",
      "Re-run this diagnostic every 6 to 12 months or after any significant capital event, such as a fundraise or acquisition.",
    ],
  },
  fractional: {
    header: "Fractional CFO Partner",
    subheadline:
      "Your responses indicate a growing business with dynamic capital requirements and moderate strategic complexity. A Fractional CFO provides the expertise you need on a flexible, scalable basis.",
    rationale: {
      intro:
        "Your diagnostic profile reflects a company in a growth or transition phase — one that requires strategic financial leadership but does not yet justify a full-time executive. A Fractional CFO partner can deliver institutional-grade CFO guidance at a fraction of the cost of a full-time hire.",
      capital:
        "You are managing moderate-to-complex capital events such as a Series A/B raise, dynamic runway management, or structured debt facilities. A Fractional CFO brings investor-grade modeling and cap table strategy.",
      jurisdictional:
        "Your cross‑border operations or regulatory obligations require experienced strategic oversight that exceeds an outsourced provider's capacity but does not yet demand a permanent executive.",
      governance:
        "Your board or investors expect strategic reporting, unit economics, and institutional governance. A Fractional CFO provides data room readiness and board-level narrative.",
    },
    recommendations: [
      "Engage a Fractional CFO on a 2 to 3 day per week engagement to own FP&A, board reporting, and capital strategy.",
      "Retain your outsourced bookkeeping team for day-to-day transaction processing; the Fractional CFO will direct and review their output.",
      "Implement or upgrade your FP&A tooling (e.g., Jirav, Fathom, or Vena) to support rolling forecasts and scenario analysis.",
      "Re-run this diagnostic in 6 to 12 months or when your headcount exceeds 100 employees to assess readiness for a full-time CFO.",
    ],
  },
  fulltime: {
    header: "Full-Time Executive CFO",
    subheadline:
      "Your profile reflects a high‑complexity, high‑stakes financial environment that demands a dedicated, permanent Chief Financial Officer embedded in your executive leadership team.",
    rationale: {
      intro:
        "Your diagnostic results indicate that your business has reached a level of financial complexity — in capital structure, regulatory exposure, governance demands, or operational scale — that cannot be adequately served by a part-time or outsourced arrangement. A full-time CFO is a strategic necessity, not a luxury.",
      capital:
        "You are managing complex capital events such as a major acquisition, IPO preparation, PE buyout, or distressed restructuring with covenant compliance risk. These demand a dedicated executive focused solely on your capital strategy.",
      jurisdictional:
        "Your global multi-subsidiary structure, high‑risk regulatory environment, or complex transfer pricing obligations require a permanent in-house expert to maintain compliance and optimize the corporate structure.",
      governance:
        "Your institutional stakeholders require audited financial statements, automated internal controls, and board-ready fiduciary governance that only a permanent CFO can consistently deliver.",
    },
    recommendations: [
      "Hire a full-time CFO with relevant experience in your specific context — for example, PE-backed, IPO, or turnaround — as a permanent member of your executive team.",
      "Empower the CFO to build a finance function that includes a controller, FP&A lead, and tax/compliance specialist appropriate to your scale.",
      "Migrate to an enterprise-grade ERP (NetSuite, SAP, or Oracle) with the CFO owning the system governance and data integrity mandate.",
      "Re-run this diagnostic after any major structural change or annually as part of the strategic planning cycle.",
    ],
  },
};
