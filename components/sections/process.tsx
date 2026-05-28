"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import ScrollReveal from "@/components/effects/scroll-reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Process() {
  const t = useTranslations("process");
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start center", "end center"],
  });
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const heightOutput = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const steps = t.raw("steps") as Array<{
    num: string;
    title: string;
    desc: string;
  }>;

  return (
    <section ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden bg-surface border-t border-border">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute left-[20%] top-[10%] h-[80vh] w-[30vw] animate-gradient-shift glow-orb bg-gradient-to-br from-glow-teal/5 via-glow-teal-subtle/3 to-transparent" />
      </div>

      <div className="container-base relative z-10">
        <ScrollReveal>
          <div className="mb-16 md:mb-20">
            <span className="text-label mb-4 block text-brand-400/80">
              {t("title")}
            </span>
            <h2 className="text-heading-1 tracking-tight text-text-primary">
              {t("sub")}
            </h2>
            <div className="mt-4 h-px w-12 bg-border-brand" />
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

          <div className="space-y-16 md:space-y-20">
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
                  <p className="text-body text-text-tertiary leading-relaxed max-w-xl">
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
