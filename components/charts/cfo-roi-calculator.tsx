"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

// ─────────────────────────────────────────────────────────────
// SECTION 1: ANIMATION VARIANTS
// ─────────────────────────────────────────────────────────────

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

// ─────────────────────────────────────────────────────────────
// SECTION 2: CURRENCY CONFIGURATION
// ─────────────────────────────────────────────────────────────

interface CurrencyConfig {
  code: string;
  name: string;
  symbol: string;
  flag: string;
  rateToUSD: number;
  isPegged: boolean;
  isVolatile?: boolean;
  decimalPlaces: number;
  locale: string;
}

const CURRENCIES: Record<string, CurrencyConfig> = {
  USD: { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸", rateToUSD: 1.0, isPegged: true, decimalPlaces: 0, locale: "en-US" },
  AED: { code: "AED", name: "UAE Dirham", symbol: "AED", flag: "🇦🇪", rateToUSD: 3.6730, isPegged: true, decimalPlaces: 0, locale: "en-AE" },
  SAR: { code: "SAR", name: "Saudi Riyal", symbol: "SAR", flag: "🇸🇦", rateToUSD: 3.7503, isPegged: true, decimalPlaces: 0, locale: "ar-SA" },
  QAR: { code: "QAR", name: "Qatari Riyal", symbol: "QAR", flag: "🇶🇦", rateToUSD: 3.6450, isPegged: true, decimalPlaces: 0, locale: "ar-QA" },
  KWD: { code: "KWD", name: "Kuwaiti Dinar", symbol: "KWD", flag: "🇰🇼", rateToUSD: 0.3055, isPegged: true, decimalPlaces: 3, locale: "ar-KW" },
  BHD: { code: "BHD", name: "Bahraini Dinar", symbol: "BHD", flag: "🇧🇭", rateToUSD: 0.3772, isPegged: true, decimalPlaces: 3, locale: "ar-BH" },
  OMR: { code: "OMR", name: "Omani Rial", symbol: "OMR", flag: "🇴🇲", rateToUSD: 0.3850, isPegged: true, decimalPlaces: 3, locale: "ar-OM" },
  JOD: { code: "JOD", name: "Jordanian Dinar", symbol: "JOD", flag: "🇯🇴", rateToUSD: 0.7090, isPegged: true, decimalPlaces: 3, locale: "ar-JO" },
  EGP: { code: "EGP", name: "Egyptian Pound", symbol: "EGP", flag: "🇪🇬", rateToUSD: 50.50, isPegged: false, decimalPlaces: 0, locale: "ar-EG" },
  IQD: { code: "IQD", name: "Iraqi Dinar", symbol: "IQD", flag: "🇮🇶", rateToUSD: 1310, isPegged: false, decimalPlaces: 0, locale: "ar-IQ" },
  SYP: { code: "SYP", name: "Syrian Pound", symbol: "SYP", flag: "🇸🇾", rateToUSD: 13000, isPegged: false, isVolatile: true, decimalPlaces: 0, locale: "ar-SY" },
};

// ─────────────────────────────────────────────────────────────
// SECTION 3: INDUSTRY CONFIGURATION
// ─────────────────────────────────────────────────────────────

interface IndustryConfig {
  label: string;
  factor: number;
  regulatoryComplexity: 1 | 2 | 3;
  taxSensitivity: number;
}

const INDUSTRIES: Record<string, IndustryConfig> = {
  Technology: { label: "Technology / SaaS", factor: 1.20, regulatoryComplexity: 1, taxSensitivity: 0.9 },
  "Financial Services": { label: "Financial Services", factor: 1.15, regulatoryComplexity: 3, taxSensitivity: 1.0 },
  Energy: { label: "Energy & Utilities", factor: 1.10, regulatoryComplexity: 3, taxSensitivity: 0.8 },
  Healthcare: { label: "Healthcare", factor: 1.05, regulatoryComplexity: 2, taxSensitivity: 0.7 },
  Logistics: { label: "Logistics & Supply Chain", factor: 1.00, regulatoryComplexity: 2, taxSensitivity: 0.6 },
  Retail: { label: "Retail & E-Commerce", factor: 0.95, regulatoryComplexity: 1, taxSensitivity: 0.5 },
  "Real Estate": { label: "Real Estate", factor: 0.90, regulatoryComplexity: 2, taxSensitivity: 0.7 },
  Manufacturing: { label: "Manufacturing", factor: 0.85, regulatoryComplexity: 1, taxSensitivity: 0.5 },
};

// ─────────────────────────────────────────────────────────────
// SECTION 4: CALCULATION CONSTANTS (all in USD)
// ─────────────────────────────────────────────────────────────

const CONSTANTS = {
  SAVINGS_TIERS: [
    { maxRevenue: 8_000_000, rate: 0.055 },
    { maxRevenue: 27_000_000, rate: 0.045 },
    { maxRevenue: 54_000_000, rate: 0.035 },
    { maxRevenue: 136_000_000, rate: 0.025 },
    { maxRevenue: Infinity, rate: 0.015 },
  ],
  BASE_ENGAGEMENT_FEE_USD: 32_700,
  FEE_PER_HEADCOUNT_USD: 4_090,
  MAX_ENGAGEMENT_FEE_USD: 130_800,
  FULLTIME_CFO_COST_USD: 177_000,
  CT_SAVINGS_RATE: 0.005,
  FUNDRAISING_MULTIPLIER_TECH: 3.0,
  FUNDRAISING_MULTIPLIER_OTHER: 1.5,
  FUNDRAISING_PREMIUM_RATE: 0.15,
};

const REVENUE_MIN_USD = 2_720_000;
const REVENUE_MAX_USD = 136_000_000;

// ─────────────────────────────────────────────────────────────
// SECTION 5: HELPER FUNCTIONS
// ─────────────────────────────────────────────────────────────

function getSavingsRate(revenueUSD: number): number {
  const tier = CONSTANTS.SAVINGS_TIERS.find((t) => revenueUSD <= t.maxRevenue);
  return tier?.rate ?? 0.015;
}

function getEngagementFee(headcount: number): number {
  const fee = CONSTANTS.BASE_ENGAGEMENT_FEE_USD + headcount * CONSTANTS.FEE_PER_HEADCOUNT_USD;
  return Math.min(fee, CONSTANTS.MAX_ENGAGEMENT_FEE_USD);
}

function getTimeToValue(headcount: number, industry: string): number {
  const cfg = INDUSTRIES[industry];
  const headcountWeeks = Math.floor(headcount / 5);
  const regulatoryWeeks = cfg.regulatoryComplexity === 3 ? 2 : 0;
  const largeTeamWeeks = headcount > 15 ? 2 : 0;
  return Math.min(12, 4 + headcountWeeks + regulatoryWeeks + largeTeamWeeks);
}

function formatCurrency(amountUSD: number, currency: CurrencyConfig, compact = false): string {
  const localAmount = amountUSD * currency.rateToUSD;
  const absAmount = Math.abs(localAmount);

  if (compact) {
    if (absAmount >= 1_000_000) return `${currency.symbol} ${(localAmount / 1_000_000).toFixed(1)}M`;
    if (absAmount >= 1_000) return `${currency.symbol} ${(localAmount / 1_000).toFixed(0)}K`;
    return `${currency.symbol} ${localAmount.toFixed(0)}`;
  }

  return new Intl.NumberFormat(currency.locale, {
    style: "decimal",
    minimumFractionDigits: currency.decimalPlaces,
    maximumFractionDigits: currency.decimalPlaces,
  }).format(localAmount);
}

// ─────────────────────────────────────────────────────────────
// SECTION 6: MAIN COMPONENT
// ─────────────────────────────────────────────────────────────

export default function CfoRoiCalculator() {
  const [revenueUSD, setRevenueUSD] = useState(21_800_000);
  const [headcount, setHeadcount] = useState(8);
  const [industry, setIndustry] = useState("Technology");
  const [currency, setCurrency] = useState("AED");
  const [uaeCorporateTax, setUaeCorporateTax] = useState(false);
  const [fundraisingMode, setFundraisingMode] = useState(false);
  const [multiEntity, setMultiEntity] = useState(false);

  const currencyCfg = CURRENCIES[currency];
  const industryCfg = INDUSTRIES[industry];

  const calc = useMemo(() => {
    const savingsRate = getSavingsRate(revenueUSD);
    const headcountFactor = 1 + headcount * 0.02;
    const baseSavings = revenueUSD * savingsRate * headcountFactor * industryCfg.factor;

    const ctSavingsBonus = uaeCorporateTax
      ? revenueUSD * CONSTANTS.CT_SAVINGS_RATE * industryCfg.taxSensitivity
      : 0;

    const multiEntityBonus = multiEntity ? baseSavings * 0.25 : 0;
    const totalCostSavings = baseSavings + ctSavingsBonus + multiEntityBonus;

    const engagementFeeUSD = getEngagementFee(headcount);
    const roiPct = ((totalCostSavings - engagementFeeUSD) / engagementFeeUSD) * 100;
    const cashFlowPct = (totalCostSavings / revenueUSD) * 100;
    const savingVsFullTime = CONSTANTS.FULLTIME_CFO_COST_USD - engagementFeeUSD;
    const paybackMonths =
      engagementFeeUSD > 0
        ? Math.max(1, Math.round((engagementFeeUSD / totalCostSavings) * 12))
        : 0;
    const timeToValueWeeks = getTimeToValue(headcount, industry);

    const equityMultiple =
      industry === "Technology"
        ? CONSTANTS.FUNDRAISING_MULTIPLIER_TECH
        : CONSTANTS.FUNDRAISING_MULTIPLIER_OTHER;
    const estimatedValuation = revenueUSD * equityMultiple;
    const fundraisingUpliftUSD = fundraisingMode
      ? estimatedValuation * CONSTANTS.FUNDRAISING_PREMIUM_RATE
      : 0;

    const totalValueUSD = totalCostSavings + fundraisingUpliftUSD;

    return {
      savingsRate,
      baseSavings,
      ctSavingsBonus,
      multiEntityBonus,
      totalCostSavings,
      engagementFeeUSD,
      roiPct,
      cashFlowPct,
      savingVsFullTime,
      paybackMonths,
      timeToValueWeeks,
      fundraisingUpliftUSD,
      totalValueUSD,
    };
  }, [revenueUSD, headcount, industry, uaeCorporateTax, fundraisingMode, multiEntity, industryCfg]);

  const showBreakdown = uaeCorporateTax || multiEntity || fundraisingMode;
  const revenueLocalCompact = formatCurrency(revenueUSD, currencyCfg, true);
  const minRevenueCompact = formatCurrency(REVENUE_MIN_USD, currencyCfg, true);
  const maxRevenueCompact = formatCurrency(REVENUE_MAX_USD, currencyCfg, true);

  return (
    <div className="flex h-full flex-col gap-6 overflow-auto p-1">
      {/* HEADER + CURRENCY DROPDOWN */}
      <motion.div variants={itemVariants} initial="hidden" animate="visible" className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-bold text-[#D8E4E8]">Fractional CFO — ROI Estimator</p>
            <p className="text-xs leading-relaxed text-[#7A98A8]">
              This calculator estimates the annual cost savings and operational benefits of engaging
              a fractional CFO compared to a full-time hire. It factors in your revenue, team size,
              industry, tax structure, and entity complexity to provide a tailored ROI projection.
            </p>
          </div>
          <div className="shrink-0">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-2.5 py-1.5 text-xs font-semibold text-[#D8E4E8] backdrop-blur-xl transition-colors focus:border-[#1DBFA0]/40 focus:outline-none"
            >
              {Object.values(CURRENCIES).map((c) => (
                <option key={c.code} value={c.code} className="bg-[#0C1820]">
                  {c.flag} {c.code}
                </option>
              ))}
            </select>
          </div>
        </div>
        {currencyCfg.isVolatile && (
          <p className="text-[11px] text-[#F59E0B] bg-white/[0.03] border border-[#F59E0B]/20 rounded-lg px-3 py-2 leading-relaxed">
            ⚠️ <strong>Note:</strong> SYP is highly volatile with significant divergence between
            official and market rates. Figures shown are indicative only using official rate
            (~13,000 SYP/USD).
          </p>
        )}
        <p className="text-[11px] leading-relaxed text-[#3A5060] border-t border-white/[0.06] pt-2">
          <strong className="text-[#7A98A8]">Disclaimer:</strong> Estimates are indicative only.
          Actual results vary based on business complexity, engagement scope, and market conditions.
          Exchange rates sourced from mid-market benchmarks (May 2026). Pegged currencies (AED, SAR,
          QAR, OMR, BHD, JOD, KWD) are stable; EGP and IQD rates should be refreshed via live API.
          SYP figures are for reference only.
        </p>
      </motion.div>

      {/* INPUTS */}
      <motion.div
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Revenue */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="flex items-center justify-between text-xs font-medium text-[#7A98A8]">
            <span>Annual Revenue</span>
            <span className="text-[#D8E4E8]">{revenueLocalCompact}</span>
          </label>
          <input
            type="range"
            min={REVENUE_MIN_USD}
            max={REVENUE_MAX_USD}
            step={1_000_000}
            value={revenueUSD}
            onChange={(e) => setRevenueUSD(Number(e.target.value))}
            className="range-slider"
          />
          <div className="flex justify-between text-[10px] text-[#3A5060]">
            <span>{minRevenueCompact}</span>
            <span>{maxRevenueCompact}</span>
          </div>
        </motion.div>

        {/* Headcount */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="flex items-center justify-between text-xs font-medium text-[#7A98A8]">
            <span>Finance Headcount</span>
            <span className="text-[#D8E4E8]">
              {headcount} {headcount === 1 ? "person" : "people"}
            </span>
          </label>
          <input
            type="range"
            min={1}
            max={20}
            step={1}
            value={headcount}
            onChange={(e) => setHeadcount(Number(e.target.value))}
            className="range-slider"
          />
          <div className="flex justify-between text-[10px] text-[#3A5060]">
            <span>1</span>
            <span>20</span>
          </div>
        </motion.div>

        {/* Industry + Fee Preview */}
        <motion.div variants={itemVariants} className="space-y-2">
          <label className="text-xs font-medium text-[#7A98A8]">Industry</label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-[#D8E4E8] backdrop-blur-xl transition-colors focus:border-[#1DBFA0]/40 focus:outline-none"
          >
            {Object.entries(INDUSTRIES).map(([key, cfg]) => (
              <option key={key} value={key} className="bg-[#0C1820]">{cfg.label}</option>
            ))}
          </select>
          <div className="mt-2 rounded-lg bg-white/[0.03] border border-white/[0.07] px-3 py-2">
            <p className="text-[10px] text-[#3A5060]">Estimated Fee</p>
            <p className="text-sm font-semibold text-[#D8E4E8]">
              {formatCurrency(calc.engagementFeeUSD, currencyCfg, true)}{" "}
              <span className="text-[10px] font-normal text-[#7A98A8]">/yr</span>
            </p>
            <p className="text-[10px] text-[#3A5060]">
              {formatCurrency(calc.engagementFeeUSD / 12, currencyCfg, true)}/mo · vs. full-time CFO{" "}
              {formatCurrency(CONSTANTS.FULLTIME_CFO_COST_USD, currencyCfg, true)}/yr
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* TOGGLES */}
      <motion.div
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 backdrop-blur-xl"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <label className="flex cursor-pointer items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[#D8E4E8]">UAE Corporate Tax</p>
            <p className="text-[10px] text-[#3A5060]">9% CT tax optimization</p>
          </div>
          <input
            type="checkbox"
            checked={uaeCorporateTax}
            onChange={(e) => setUaeCorporateTax(e.target.checked)}
            className="toggle-checkbox"
          />
        </label>

        <label className="flex cursor-pointer items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[#D8E4E8]">Multi-Entity / Group</p>
            <p className="text-[10px] text-[#3A5060]">Free zone + mainland</p>
          </div>
          <input
            type="checkbox"
            checked={multiEntity}
            onChange={(e) => setMultiEntity(e.target.checked)}
            className="toggle-checkbox"
          />
        </label>

        <label className="flex cursor-pointer items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-[#D8E4E8]">Fundraising / Exit</p>
            <p className="text-[10px] text-[#3A5060]">Valuation uplift premium</p>
          </div>
          <input
            type="checkbox"
            checked={fundraisingMode}
            onChange={(e) => setFundraisingMode(e.target.checked)}
            className="toggle-checkbox"
          />
        </label>
      </motion.div>

      {/* SAVINGS BREAKDOWN */}
      {showBreakdown && (
        <motion.div
          className="rounded-xl border border-[#1DBFA0]/15 bg-[#1DBFA0]/[0.03] p-4 backdrop-blur-xl"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="mb-2 text-[10px] font-semibold text-[#1DBFA0] uppercase tracking-wider">
            Savings Breakdown
          </p>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between">
              <span className="text-[#7A98A8]">Base operational savings</span>
              <span className="font-medium text-[#D8E4E8]">
                {formatCurrency(calc.baseSavings, currencyCfg, true)}/yr
              </span>
            </div>
            {uaeCorporateTax && (
              <div className="flex justify-between text-[#4DD8C0]">
                <span>+ UAE Corporate Tax optimization</span>
                <span className="font-medium">
                  {formatCurrency(calc.ctSavingsBonus, currencyCfg, true)}/yr
                </span>
              </div>
            )}
            {multiEntity && (
              <div className="flex justify-between text-[#C4B8A8]">
                <span>+ Multi-entity / group premium</span>
                <span className="font-medium">
                  {formatCurrency(calc.multiEntityBonus, currencyCfg, true)}/yr
                </span>
              </div>
            )}
            {fundraisingMode && (
              <div className="flex justify-between text-[#F59E0B]">
                <span>+ Fundraising valuation uplift</span>
                <span className="font-medium">
                  {formatCurrency(calc.fundraisingUpliftUSD, currencyCfg, true)}
                  <span className="text-[10px] ml-1">(one-time)</span>
                </span>
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* OUTPUT CARDS */}
      <motion.div
        className="grid grid-cols-2 gap-3 lg:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-white/[0.07] bg-gradient-to-br from-[#1DBFA0]/10 to-transparent p-4 backdrop-blur-xl"
        >
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[#7A98A8]">
            Annual Savings
          </p>
          <p className="text-lg font-semibold text-[#1DBFA0]">
            {formatCurrency(calc.totalCostSavings, currencyCfg, true)}
          </p>
          <p className="mt-0.5 text-[10px] text-[#3A5060]">per year</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-white/[0.07] bg-gradient-to-br from-[#4DD8C0]/10 to-transparent p-4 backdrop-blur-xl"
        >
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[#7A98A8]">
            vs. Full-Time CFO
          </p>
          <p className="text-lg font-semibold text-[#4DD8C0]">
            {formatCurrency(calc.savingVsFullTime, currencyCfg, true)}
          </p>
          <p className="mt-0.5 text-[10px] text-[#3A5060]">saved on hiring cost</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-white/[0.07] bg-gradient-to-br from-[#C4B8A8]/10 to-transparent p-4 backdrop-blur-xl"
        >
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[#7A98A8]">
            ROI on Fee
          </p>
          <p className="text-lg font-semibold text-[#C4B8A8]">
            {calc.roiPct.toFixed(0)}%
          </p>
          <p className="mt-0.5 text-[10px] text-[#3A5060]">annual return</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-white/[0.07] bg-gradient-to-br from-[#F59E0B]/10 to-transparent p-4 backdrop-blur-xl"
        >
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[#7A98A8]">
            Payback Period
          </p>
          <p className="text-lg font-semibold text-[#F59E0B]">
            {calc.paybackMonths}{" "}
            <span className="text-sm font-normal text-[#7A98A8]">
              {calc.paybackMonths === 1 ? "month" : "months"}
            </span>
          </p>
          <p className="mt-0.5 text-[10px] text-[#3A5060]">first value in ~{calc.timeToValueWeeks}wks</p>
        </motion.div>
      </motion.div>

      {/* SECONDARY METRICS */}
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        variants={itemVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 text-center backdrop-blur-xl">
          <p className="mb-1 text-[10px] font-medium text-[#7A98A8]">Cash Flow Impact</p>
          <p className="text-base font-bold text-[#1DBFA0]">+{calc.cashFlowPct.toFixed(1)}%</p>
          <p className="text-[10px] text-[#3A5060]">of revenue</p>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 text-center backdrop-blur-xl">
          <p className="mb-1 text-[10px] font-medium text-[#7A98A8]">Savings Rate Used</p>
          <p className="text-base font-bold text-[#D8E4E8]">{(calc.savingsRate * 100).toFixed(1)}%</p>
          <p className="text-[10px] text-[#3A5060]">of revenue tier</p>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 text-center backdrop-blur-xl">
          <p className="mb-1 text-[10px] font-medium text-[#7A98A8]">Time to Value</p>
          <p className="text-base font-bold text-[#D8E4E8]">~{calc.timeToValueWeeks} wks</p>
          <p className="text-[10px] text-[#3A5060]">first outcome</p>
        </div>
        <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-3 text-center backdrop-blur-xl">
          <p className="mb-1 text-[10px] font-medium text-[#7A98A8]">
            {fundraisingMode ? "Total Value (incl. raise)" : "Monthly Fee"}
          </p>
          <p className="text-base font-bold text-[#D8E4E8]">
            {fundraisingMode
              ? formatCurrency(calc.totalValueUSD, currencyCfg, true)
              : formatCurrency(calc.engagementFeeUSD / 12, currencyCfg, true)}
          </p>
          <p className="text-[10px] text-[#3A5060]">{fundraisingMode ? "annual + uplift" : "per month"}</p>
        </div>
      </motion.div>

      <style>{`
        .range-slider {
          -webkit-appearance: none;
          appearance: none;
          width: 100%;
          height: 4px;
          border-radius: 2px;
          background: rgba(255,255,255,0.08);
          outline: none;
          cursor: pointer;
        }
        .range-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #1DBFA0;
          cursor: pointer;
          border: 2px solid #071017;
          box-shadow: 0 0 8px rgba(29,191,160,0.3);
        }
        .range-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background: #1DBFA0;
          cursor: pointer;
          border: 2px solid #071017;
          box-shadow: 0 0 8px rgba(29,191,160,0.3);
        }
        .toggle-checkbox {
          -webkit-appearance: none;
          appearance: none;
          width: 36px;
          height: 20px;
          border-radius: 10px;
          background: rgba(255,255,255,0.1);
          border: 1px solid rgba(255,255,255,0.08);
          cursor: pointer;
          position: relative;
          transition: all 0.2s;
          flex-shrink: 0;
        }
        .toggle-checkbox::after {
          content: "";
          position: absolute;
          top: 2px;
          left: 2px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: #7A98A8;
          transition: all 0.2s;
        }
        .toggle-checkbox:checked {
          background: rgba(29,191,160,0.25);
          border-color: rgba(29,191,160,0.4);
        }
        .toggle-checkbox:checked::after {
          left: 18px;
          background: #1DBFA0;
        }
        select option {
          background: #0C1820;
          color: #D8E4E8;
        }
      `}</style>
    </div>
  );
}
