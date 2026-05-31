"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/effects/scroll-reveal";
import GlassCard from "@/components/effects/glass-card";

const steps = [
  {
    num: "01",
    title: "Diagnostic",
    desc: "We begin with an unfiltered read of your financial operations, reporting quality, systems infrastructure, team capabilities, and strategic priorities. No assumptions. No diplomacy that obscures the real picture. We map the distance between where your finance function currently sits and where your business needs it to be, so that every recommendation that follows is grounded in what is actually true.",
  },
  {
    num: "02",
    title: "Financial Architecture",
    desc: "A finance function without sound architecture produces numbers no one fully trusts. We establish the structural foundation: core financial processes, internal controls, systems configuration, chart of accounts, and governance frameworks that give your leadership and investors confidence in what they are reading. This work is rarely visible to clients. But everyone feels its absence.",
  },
  {
    num: "03",
    title: "Reporting & Governance",
    desc: "We build the reporting infrastructure your business requires: management accounts, board packs, KPI dashboards, cash flow visibility, and investor-ready financial statements. The right information reaches the right people at the right time. When that is not happening, decisions slow down and capital gets cautious.",
  },
  {
    num: "04",
    title: "Performance & Optimization",
    desc: "Good financial data is only worth what it changes. We drive measurable improvement across working capital management, cost structure, pricing discipline, and FP&A capability. Every finding feeds a decision. Every decision is tracked against margin, cash position, and operational performance.",
  },
  {
    num: "05",
    title: "Strategic Partnership",
    desc: "This is where the engagement moves from function-building to leadership contribution. We operate as a senior financial partner at your leadership table, supporting capital raising, M&A evaluation, growth modeling, scenario planning, and investor relations. The cadence is structured: board attendance, monthly advisory sessions, and financial performance reviews that deepen as your business grows. We are not a service provider. We are part of your leadership team.",
  },
];

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function CfoEngagementProcess() {
  return (
    <section className="py-28 md:py-36">
      <div className="container-base">
        <ScrollReveal direction="up">
          <span className="text-label mb-4 block text-brand-400/80">
            FRACTIONAL CFO ENGAGEMENT PROCESS
          </span>
          <h2 className="text-heading-1 mb-4 tracking-tight text-text-primary">
            What a Finance Function Built to Last Actually Requires
          </h2>
          <p className="mb-16 max-w-3xl text-body text-text-tertiary leading-relaxed">
            Most businesses do not have a finance problem. They have a finance leadership problem. This five-stage methodology is designed to close that gap, starting with an unsparing assessment of your current position and ending with a senior financial partner embedded at your leadership table.
          </p>
        </ScrollReveal>
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
        >
          {steps.map((step, i) => (
            <motion.div key={i} variants={staggerItem}>
              <GlassCard className="relative h-full">
                <span className="font-display absolute right-4 top-2 text-[100px] leading-none text-white opacity-[0.04] select-none">
                  {step.num}
                </span>
                <div className="relative z-10">
                  <span className="text-label text-brand-400/60">{step.num}</span>
                  <h3 className="mt-3 text-heading-3 text-text-primary">{step.title}</h3>
                  <p className="mt-3 text-body-small text-text-tertiary leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
