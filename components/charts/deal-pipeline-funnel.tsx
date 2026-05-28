"use client";

import { motion } from "framer-motion";

const stages = [
  { label: "Deal Origination", count: "150+", pct: 100, desc: "Deals evaluated across MENA" },
  { label: "Mandate Signed", count: "98", pct: 78, desc: "Engagements formalized" },
  { label: "Execution Phase", count: "72", pct: 55, desc: "Active execution & advisory" },
  { label: "Successfully Closed", count: "45+", pct: 35, desc: "Completed transactions" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function DealPipelineFunnel() {
  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="flex w-full max-w-xl flex-col items-center gap-6">
        {stages.map((s, i) => (
          <motion.div
            key={s.label}
            className="relative flex w-full flex-col items-center"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15, ease }}
          >
            <div
              className="flex w-full items-center justify-between rounded-lg border border-white/[0.08] bg-white/[0.04] px-6 py-4 backdrop-blur-sm transition-colors hover:border-teal-500/25"
              style={{ maxWidth: `${s.pct}%` }}
            >
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border border-teal-500/30 bg-teal-500/10 text-xs font-bold text-teal-400">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">{s.label}</p>
                  <p className="text-xs text-gray-500">{s.desc}</p>
                </div>
              </div>
              <span className="text-xl font-display font-light text-teal-400">
                {s.count}
              </span>
            </div>

            {i < stages.length - 1 && (
              <motion.div
                className="mt-1 h-6 w-px bg-gradient-to-b from-teal-500/40 to-transparent"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.3 }}
                style={{ transformOrigin: "top" }}
              />
            )}
          </motion.div>
        ))}

        <motion.div
          className="mt-2 rounded-full border border-teal-500/20 bg-teal-500/8 px-5 py-2 text-xs text-teal-400/70"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.8, ease }}
        >
          $2.4B+ Total Transaction Value Across All Stages
        </motion.div>
      </div>
    </div>
  );
}
