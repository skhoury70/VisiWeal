"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/effects/scroll-reveal";
import GlassCard from "@/components/effects/glass-card";

const steps = [
  {
    num: "01",
    title: "Scoping & Assumptions",
    desc: "The quality of a feasibility study is determined before a single number is modelled. We establish the study mandate, define the investment question, validate key assumptions, and align on the decision criteria that will determine feasibility. If the scope is wrong, everything built on top of it is wrong too.",
  },
  {
    num: "02",
    title: "Market & Regulatory Assessment",
    desc: "We assess demand, competition, pricing, customer behaviour, sector trends, and market entry constraints alongside the regulatory and licensing requirements that govern what is actually buildable. Commercial attractiveness on paper means little if the regulatory path is closed or contested. Both sides of that question receive equal scrutiny here.",
  },
  {
    num: "03",
    title: "Technical & Operational Feasibility",
    desc: "A project that works financially but cannot be delivered is not a project. We evaluate the practical requirements: infrastructure, location, technology, suppliers, staffing, implementation timeline, and operating model. The objective is to find execution barriers before your capital is deployed, not after it is.",
  },
  {
    num: "04",
    title: "Financial Feasibility & Risk Testing",
    desc: "We develop an integrated financial model covering profitability, cash flow, funding requirements, return metrics, payback period, and valuation implications. Then we stress-test it. Sensitivity analysis and scenario testing show how the project performs when market conditions shift, costs move, or execution slows. A model that only works in the base case is not a model. It is a proposal.",
  },
  {
    num: "05",
    title: "Investment Recommendation",
    desc: "We translate the full analysis into a clear decision framework: feasibility conclusion, key risks, required mitigants, funding considerations, and recommended next steps. This is not a report that sits on a shelf. It is a decision-grade investment case that tells you what to do and why, with the evidence behind every conclusion.",
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

export default function FeasibilityMethodology() {
  return (
    <section className="py-28 md:py-36">
      <div className="container-base">
        <ScrollReveal direction="up">
          <span className="text-label mb-4 block text-brand-400/80">
            FEASIBILITY STUDY METHODOLOGY
          </span>
          <h2 className="text-heading-1 mb-4 tracking-tight text-text-primary">
            Most Projects Fail the Test They Were Never Actually Given
          </h2>
          <p className="mb-16 max-w-3xl text-body text-text-tertiary leading-relaxed">
            Most capital decisions are made on optimism dressed as analysis. A credible feasibility study does the opposite: it tests the investment thesis before money moves, not after. Our five-stage methodology is built to surface the real picture, including the parts that complicate the decision.
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
