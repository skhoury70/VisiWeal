"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/effects/scroll-reveal";
import GlassCard from "@/components/effects/glass-card";

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc: "We assess your current digital maturity against your market position, surface where the real opportunities sit, and frame the picture in terms your leadership can act on immediately. Most firms arrive with answers. We arrive with the right questions.",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "We define where you are going, design the target state, close the capability gaps on paper first, and build a business case with measurable ROI at its centre. You will know exactly what success looks like before a single project begins.",
  },
  {
    num: "03",
    title: "Execution",
    desc: "We deliver across workstreams using agile methods, implement technology suited to your context, and redesign the processes that need to change. This is where plans become real, or fall apart. The difference is not ambition. It is delivery discipline applied daily across every workstream.",
  },
  {
    num: "04",
    title: "Adoption",
    desc: "We manage the organizational dimension of transformation: leadership alignment, stakeholder communication, capability building, and cultural adoption. What is built technically must be embedded operationally, or it sits unused. Technology without adoption is infrastructure without a business.",
  },
  {
    num: "05",
    title: "Optimization",
    desc: "We remain engaged to track performance against the targets we set together, transfer capability to your internal teams, and refine what the real-world data tells us to refine. The goal is not your dependence on us. It is a business that improves on its own terms.",
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

export default function DigitalTransformationProcess() {
  return (
    <section className="py-28 md:py-36">
      <div className="container-base">
        <ScrollReveal direction="up">
          <span className="text-label mb-4 block text-brand-400/80">
            DIGITAL TRANSFORMATION PROCESS
          </span>
          <h2 className="text-heading-1 mb-4 tracking-tight text-text-primary">
            Five Stages That Turn Digital Ambition Into Operating Reality
          </h2>
          <p className="mb-16 max-w-3xl text-body text-text-tertiary leading-relaxed">
            Five stages. No detours. Every engagement follows the same discipline, starting with an honest read of where you actually are, not where your last plan said you would be.
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
