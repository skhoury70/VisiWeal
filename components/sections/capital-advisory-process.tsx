"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/effects/scroll-reveal";
import GlassCard from "@/components/effects/glass-card";

const steps = [
  {
    num: "01",
    title: "Diagnostic & Structuring",
    desc: "Before we approach a single investor or lender, we need to understand what we are actually working with. We conduct a structured review of your financial position, capital requirements, and strategic objectives, then design the financing architecture that fits your situation, not a template. The right structure at the start saves months of renegotiation later.",
  },
  {
    num: "02",
    title: "Strategy & Positioning",
    desc: "Instrument selection, deal sizing, pricing expectations, timing - each decision here shapes how the market receives you. We build a capital markets strategy specific to your profile: who to approach, in what sequence, and how to frame the opportunity so the right counterparties engage on the right terms. Sequence matters as much as substance.",
  },
  {
    num: "03",
    title: "Market Approach & Execution",
    desc: "This is where preparation meets reality. We manage transaction documentation, due diligence coordination, investor roadshows, and lender outreach - running the process so your management team can stay focused on the business. Momentum in a financing process is not accidental. It is managed.",
  },
  {
    num: "04",
    title: "Negotiation & Closing",
    desc: "Terms, pricing, covenants, and conditions - each carries consequences that outlast the deal itself. We negotiate with that in mind, protecting your position without walking away from achievable outcomes. From final term sheet through to funds flow, we manage every closing requirement until completion is confirmed.",
  },
  {
    num: "05",
    title: "Post-Transaction Advisory",
    desc: "Closing is not the end of our engagement. We remain present to support covenant monitoring, investor relations, financial reporting, and capital structure decisions that arise after the transaction settles. Your next financing round will be easier and cheaper if this one is managed well from the start.",
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

export default function CapitalAdvisoryProcess() {
  return (
    <section className="py-28 md:py-36">
      <div className="container-base">
        <ScrollReveal direction="up">
          <span className="text-label mb-4 block text-brand-400/80">
            CAPITAL ADVISORY PROCESS
          </span>
          <h2 className="text-heading-1 mb-4 tracking-tight text-text-primary">
            How We Take a Financing Mandate from Structure to Close
          </h2>
          <p className="mb-16 max-w-3xl text-body text-text-tertiary leading-relaxed">
            Most financing processes fail before they reach market - not because the business is weak, but because the preparation was not serious. We run a five-stage process designed to correct that: starting with structure, ending with terms that hold, and staying present long after the ink dries.
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
