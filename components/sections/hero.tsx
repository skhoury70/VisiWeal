"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useLocale } from "next-intl";
import { HeroDecorations } from "@/components/hero/hero-decorations";

const ease = [0.16, 1, 0.3, 1] as const;

const container = {
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.3 },
  },
};

const fadeUp = (delay = 0) =>
  ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, ease, delay },
  }) as const;

const noMotionFade = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  transition: { duration: 0 },
} as const;

export default function Hero() {
  const rm = useReducedMotion();
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);

  const item = (d = 0) => (rm ? { ...noMotionFade, transition: { duration: 0 } } : fadeUp(d));

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden bg-surface">
      <HeroDecorations sectionRef={sectionRef} rm={rm ?? false} />

      <motion.div
        className="container-base relative z-10 pt-32 pb-24 md:pt-40 md:pb-32"
        variants={container}
        initial={rm ? undefined : "initial"}
        animate={rm ? undefined : "visible"}
      >
        <div className="max-w-4xl">
          <motion.p
            className="text-label mb-5 text-brand-400/90"
            {...item()}
          >
            Strategic Financial Advisory
          </motion.p>

          <motion.h1
            className="text-display leading-[1.08] tracking-tight text-text-primary"
            {...item(0.15)}
          >
            Creating Enterprise Value{" "}
            <br />
            Through{" "}
            <span className="animate-text-glow-pulse text-gradient-brand">
              Critical Business Decisions
            </span>
          </motion.h1>

          <motion.p
            className="mt-6 max-w-2xl text-body md:mt-8 md:text-lg"
            {...item(0.3)}
          >
            VisiWeal advises business owners, boards, investors,
            and executive leadership teams on the decisions that
            shape growth, strengthen performance, and define long-term success.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-col gap-4 sm:flex-row md:mt-12"
            {...item(0.45)}
          >
            <Link
              href={`/${locale}/book-consultation`}
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-8 py-3.5 text-sm font-medium text-white shadow-glow-teal transition-all hover:shadow-lg md:text-base"
            >
              Book a Strategic Consultation
            </Link>

            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center justify-center rounded-full border border-border-strong bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-text-secondary backdrop-blur-sm transition-colors duration-300 hover:border-border-strong hover:bg-white/[0.08] hover:text-text-primary md:text-base"
            >
              Explore Services
            </Link>
          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}
