"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
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

const industries = [
  "Technology",
  "Real Estate",
  "Energy",
  "Financial Services",
  "Healthcare",
  "Manufacturing",
  "Retail",
  "Logistics",
];

function formatAED(value: number): string {
  if (value >= 1_000_000_000) return `AED ${(value / 1_000_000_000).toFixed(1)}B`;
  if (value >= 1_000_000) return `AED ${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `AED ${(value / 1_000).toFixed(1)}K`;
  return `AED ${value.toFixed(0)}`;
}

export default function CfoRoiCalculator() {
  const [revenue, setRevenue] = useState(80000000);
  const [headcount, setHeadcount] = useState(8);
  const [industry, setIndustry] = useState("Technology");

  const results = useMemo(() => {
    const baseSavings = revenue * 0.035;
    const headcountFactor = 1 + headcount * 0.02;
    const industryFactors: Record<string, number> = {
      Technology: 1.2,
      "Real Estate": 0.9,
      Energy: 1.1,
      "Financial Services": 1.15,
      Healthcare: 1.05,
      Manufacturing: 0.85,
      Retail: 0.95,
      Logistics: 1.0,
    };
    const industryFactor = industryFactors[industry] ?? 1.0;
    const costSavings = baseSavings * headcountFactor * industryFactor;
    const cashFlowImprovement = (costSavings / revenue) * 100;
    const annualCost = headcount * 180000;
    const roi = ((costSavings - annualCost) / annualCost) * 100;
    return {
      costSavings,
      cashFlowImprovement,
      roi,
      timeToValue: Math.max(3, Math.round(12 - industryFactor * 3 + (headcount > 10 ? 2 : 0))),
    };
  }, [revenue, headcount, industry]);

  return (
    <div className="flex h-full flex-col gap-5 overflow-auto">
      <motion.div
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
        <div className="space-y-2">
          <label className="text-xs font-medium text-[#7A98A8]">
            Annual Revenue:{" "}
            <span className="text-[#D8E4E8]">
              {formatAED(revenue)}
            </span>
          </label>
          <input
            type="range"
            min={10000000}
            max={500000000}
            step={5000000}
            value={revenue}
            onChange={(e) => setRevenue(Number(e.target.value))}
            className="range-slider"
          />
          <div className="flex justify-between text-[10px] text-[#3A5060]">
            <span>AED 10M</span>
            <span>AED 500M</span>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-[#7A98A8]">
            Finance Headcount:{" "}
            <span className="text-[#D8E4E8]">{headcount}</span>
          </label>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setHeadcount(Math.max(1, headcount - 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#D8E4E8] transition-colors hover:border-[#1DBFA0]/40 hover:text-[#1DBFA0]"
            >
              −
            </button>
            <input
              type="range"
              min={1}
              max={20}
              value={headcount}
              onChange={(e) => setHeadcount(Number(e.target.value))}
              className="range-slider flex-1"
            />
            <button
              type="button"
              onClick={() => setHeadcount(Math.min(20, headcount + 1))}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/[0.08] bg-white/[0.03] text-[#D8E4E8] transition-colors hover:border-[#1DBFA0]/40 hover:text-[#1DBFA0]"
            >
              +
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-[#7A98A8]">
            Industry
          </label>
          <select
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
            className="w-full rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-sm text-[#D8E4E8] backdrop-blur-xl transition-colors focus:border-[#1DBFA0]/40 focus:outline-none"
          >
            {industries.map((ind) => (
              <option key={ind} value={ind} className="bg-[#0C1820]">
                {ind}
              </option>
            ))}
          </select>
        </div>
      </motion.div>

      <motion.div
            className="grid grid-cols-2 gap-3 md:grid-cols-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 backdrop-blur-xl"
        >
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[#7A98A8]">
            Cost Savings
          </p>
          <p className="text-lg font-semibold text-[#1DBFA0]">
            {formatAED(results.costSavings)}
          </p>
          <p className="mt-0.5 text-[10px] text-[#3A5060]">per annum</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 backdrop-blur-xl"
        >
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[#7A98A8]">
            Cash Flow %
          </p>
          <p className="text-lg font-semibold text-[#4DD8C0]">
            +{results.cashFlowImprovement.toFixed(1)}%
          </p>
          <p className="mt-0.5 text-[10px] text-[#3A5060]">improvement</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 backdrop-blur-xl"
        >
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[#7A98A8]">
            ROI
          </p>
          <p className="text-lg font-semibold text-[#C4B8A8]">
            {results.roi.toFixed(0)}%
          </p>
          <p className="mt-0.5 text-[10px] text-[#3A5060]">annual return</p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-4 backdrop-blur-xl"
        >
          <p className="mb-1 text-[10px] font-medium uppercase tracking-wider text-[#7A98A8]">
            Time to Value
          </p>
          <p className="text-lg font-semibold text-[#D8E4E8]">
            {results.timeToValue}
            <span className="ml-1 text-sm font-normal text-[#7A98A8]">
              weeks
            </span>
          </p>
          <p className="mt-0.5 text-[10px] text-[#3A5060]">average</p>
        </motion.div>
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
        select option {
          background: #0C1820;
          color: #D8E4E8;
        }
      `}</style>
    </div>
  );
}
