"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/effects/scroll-reveal";
import GlassCard from "@/components/effects/glass-card";

const steps = [
  {
    num: "01",
    title: "Stabilization",
    desc: "We move immediately. Protecting liquidity, preserving operational continuity, and establishing the creditor standstill environment are not tasks to sequence across weeks of internal discussion. They happen at once, because they have to. Speed in this phase is not a preference. It is a condition of everything that follows.",
  },
  {
    num: "02",
    title: "Diagnostic",
    desc: "We conduct a rigorous assessment of financial position, liquidity runway, covenant exposure, creditor mapping, operational viability, and stakeholder dynamics. The output is an honest picture of the business: where the stress is real, where the projections are inflated, and where the viable path forward actually begins. A restructuring plan built on incomplete diagnostics does not survive its first creditor meeting.",
  },
  {
    num: "03",
    title: "Restructuring Plan",
    desc: "We develop a plan that covers the financial, operational, and organizational dimensions of recovery with clear milestones and projections that hold under pressure. Creditors, advisors, and courts will all test what you put in front of them. We build the plan to withstand that scrutiny, because a document that reads well but collapses in negotiation is not a plan. It is a delay.",
  },
  {
    num: "04",
    title: "Negotiation",
    desc: "Restructuring negotiations are rarely between two parties. We manage the full creditor and stakeholder landscape: debt rescheduling, haircuts, debt-for-equity conversion, intercreditor dynamics, and formal court processes where required. Building consensus across that landscape takes more than legal process. It takes credibility, preparation, and the ability to hold a position under sustained pressure from multiple directions simultaneously.",
  },
  {
    num: "05",
    title: "Implementation",
    desc: "We manage plan execution with active monitoring, workstream coordination, and real-time course correction as conditions evolve. Restructuring plans rarely survive contact with reality unchanged. Our role is to ensure the outcome does, even when the path to it shifts beneath the process.",
  },
  {
    num: "06",
    title: "Value Recovery",
    desc: "With the restructuring stabilized, attention shifts from preservation to rebuilding. We optimize the capital structure, restore operational performance, and re-engage growth where the business is ready for it. Whether the next phase is independent growth, recapitalization, or a strategic transaction, we position the business to enter it from a place of strength, not relief.",
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

export default function RestructuringProcess() {
  return (
    <section className="py-28 md:py-36">
      <div className="container-base">
        <ScrollReveal direction="up">
          <span className="text-label mb-4 block text-brand-400/80">
            CORPORATE RESTRUCTURING PROCESS
          </span>
          <h2 className="text-heading-1 mb-4 tracking-tight text-text-primary">
            The Six Stages Between a Business in Distress and One That Survives It
          </h2>
          <p className="mb-16 max-w-3xl text-body text-text-tertiary leading-relaxed">
            Most restructuring processes fail not because the business was unsalvageable, but because the response came too late or the plan lacked credibility with the people whose support it needed most. This six-stage methodology is built around the opposite: early speed, rigorous planning, and the negotiating discipline to get a plan across the line and hold it there.
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
