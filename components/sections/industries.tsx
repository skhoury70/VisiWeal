"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import ScrollReveal from "@/components/effects/scroll-reveal";

const ease = [0.16, 1, 0.3, 1] as const;

const items = [
  "Technology",
  "Real Estate",
  "Energy",
  "Healthcare",
  "Manufacturing",
  "Financial Services",
  "Retail",
  "Infrastructure",
];

export default function Industries() {
  const pillsRef = useRef<HTMLDivElement>(null);
  const isPillsInView = useInView(pillsRef, { once: true, margin: "-60px" });

  return (
    <section className="py-28 md:py-36 relative overflow-hidden bg-surface border-t border-border">
      <div className="container-base relative z-10">
        <ScrollReveal>
          <div className="mb-16 md:mb-20 max-w-2xl">
            <span className="text-label mb-4 block text-brand-400/80">
              INDUSTRIES WE SERVE
            </span>
            <h2 className="text-heading-1 tracking-tight text-text-primary">
              We Do Not Cover Every Sector. We Go Deep in the Ones That Matter.
            </h2>
            <div className="mt-6 text-body text-text-tertiary leading-relaxed">
              Sector knowledge is not a credential. It is the difference between advice that sounds right in a meeting and advice that holds up when the deal is being stress-tested, the regulator is asking questions, or the market moves against the assumption. Our work is concentrated in the industries where that distinction is most consequential across the MENA region.
            </div>
            <div className="mt-6 h-px w-12 bg-border-brand" />
          </div>
        </ScrollReveal>

        <div ref={pillsRef} className="mb-16 md:mb-20">
          <div className="flex flex-wrap gap-3">
            {items.map((name, i) => (
              <motion.span
                key={name}
                className="inline-block rounded-full border border-border-strong bg-white/[0.05] px-6 py-3 text-sm font-medium tracking-wide text-text-secondary backdrop-blur-sm transition-all duration-300 hover:border-brand-500/40 hover:text-brand-400 hover:bg-brand-500/8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isPillsInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.06, ease }}
              >
                {name}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="mx-auto max-w-lg">
            <div className="rounded-2xl border border-border-subtle bg-surface-raised/50 p-8 backdrop-blur-sm">
              <p className="text-caption mb-6 text-center text-text-tertiary">
                Advisory Volume by Sector
              </p>
              <div className="flex h-40 items-end justify-center gap-4 md:gap-6">
                {[
                  { label: "Tech", value: 85 },
                  { label: "RE", value: 70 },
                  { label: "Energy", value: 60 },
                  { label: "Health", value: 55 },
                  { label: "Mfg", value: 50 },
                  { label: "FinSvcs", value: 75 },
                  { label: "Retail", value: 40 },
                  { label: "Infra", value: 65 },
                ].map((bar, i) => (
                  <motion.div
                    key={bar.label}
                    className="flex flex-col items-center gap-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.08, ease }}
                  >
                    <motion.div
                      className="w-8 rounded-sm bg-brand-400 md:w-10"
                      initial={{ height: 0 }}
                      whileInView={{ height: bar.value * 1.6 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1, ease }}
                      style={{ opacity: 0.2 + (bar.value / 100) * 0.5 }}
                    />
                    <span className="text-[10px] font-medium text-text-tertiary md:text-xs">
                      {bar.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
