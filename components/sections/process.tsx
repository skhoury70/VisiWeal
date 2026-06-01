"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import ScrollReveal from "@/components/effects/scroll-reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const steps = [
  {
    num: "01",
    title: "Discovery",
    desc:
      "We begin every engagement by developing a genuine understanding of your business: industry position, competitive dynamics, financial reality, and strategic objectives. We do not arrive with pre-formed solutions. We arrive with the right questions. Then we take the time to make sure we are solving the right problem before we begin solving it.",
  },
  {
    num: "02",
    title: "Design",
    desc:
      "We design a bespoke analytical and strategic framework for each engagement, defining the methodology, data requirements, financial models, and success metrics that fit your specific situation. No templates. No generic approaches applied to complex problems. Every framework is built from first principles around your mandate.",
  },
  {
    num: "03",
    title: "Solution Development",
    desc:
      "We develop the solution through financial analysis, strategic thinking, and operational expertise, integrating quantitative rigour with qualitative judgment. This is where the intellectual weight of the engagement sits. The quality of our thinking here determines the quality of your outcome.",
  },
  {
    num: "04",
    title: "Execution",
    desc:
      "We manage delivery with precision: coordinating workstreams, managing stakeholders, tracking milestones, and adapting in real time as market conditions shift, new information surfaces, or priorities change. Execution is where most advisory engagements fail. It is where we are most disciplined.",
  },
  {
    num: "05",
    title: "Continuity",
    desc:
      "We do not disengage at delivery. We maintain an ongoing relationship to monitor outcomes, track performance against the objectives we set together, and provide the continued strategic perspective that ensures our work retains its value as your business evolves.",
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const heightOutput = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden bg-surface border-t border-border">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute left-[20%] top-[10%] h-[80vh] w-[30vw] animate-gradient-shift glow-orb bg-gradient-to-br from-glow-teal/5 via-glow-teal-subtle/3 to-transparent" />
      </div>

      <div className="container-base relative z-10">
        <ScrollReveal>
          <div className="mb-16 md:mb-20 max-w-2xl">
            <span className="text-label mb-4 block text-brand-400/80">
              OUR ENGAGEMENT MODEL
            </span>
            <h2 className="text-heading-1 tracking-tight text-text-primary">
              Five Stages. One Standard. No Exceptions.
            </h2>
            <div className="mt-6 text-body text-text-tertiary leading-relaxed">
              Every engagement we accept, regardless of service line or transaction type, follows the same structured methodology. This is how we protect client outcomes, maintain analytical integrity, and deliver work that holds up under the scrutiny of boards, investors, and markets.
            </div>
            <div className="mt-6 h-px w-12 bg-border-brand" />
          </div>
        </ScrollReveal>

        <div className="relative mx-auto max-w-3xl">
          {isInView && (
            <div className="absolute left-[18px] top-0 h-full w-px bg-border-subtle md:left-[23px]" aria-hidden="true">
              <motion.div
                className="h-full w-full bg-gradient-to-b from-brand-500 via-brand-400 to-brand-500"
                style={{ scaleY: heightOutput, transformOrigin: "top" }}
              />
            </div>
          )}

          <div className="space-y-20 md:space-y-24">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                className="relative pl-14 md:pl-16"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7, delay: i * 0.15, ease }}
              >
                <div className="absolute left-0 top-1 flex items-center justify-center">
                  <div className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-brand-500/30 bg-surface md:h-[46px] md:w-[46px]">
                    <span className="text-sm font-semibold text-brand-400 md:text-base">
                      {step.num}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="text-heading-3 mb-3 tracking-tight text-text-primary">
                    {step.title}
                  </h3>
                  <p className="text-body text-text-tertiary leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
