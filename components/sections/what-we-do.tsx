"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";

const visuals = [
  {
    path: "M3 21l12-12m0 0v9m0-9H6",
    label: "deal",
  },
  {
    path: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z",
    label: "globe",
  },
  {
    path: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
    label: "chart",
  },
  {
    path: "M13 10V3L4 14h7v7l9-11h-7z",
    label: "bolt",
  },
];

const ease = [0.16, 1, 0.3, 1] as const;

function Visual({ index }: { index: number }) {
  const v = visuals[index];
  return (
    <div className="relative flex h-36 w-36 items-center justify-center md:h-44 md:w-44">
      <div className="absolute inset-0 rounded-full border border-brand-400/15" />
      <div className="absolute inset-3 rounded-full bg-gradient-to-b from-brand-500/8 to-brand-500/3 shadow-inner shadow-brand-500/5" />
      <div className="absolute inset-7 rounded-full bg-brand-500/15" />
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="relative h-11 w-11 text-brand-400/70 md:h-12 md:w-12"
      >
        <path d={v.path} />
      </svg>
    </div>
  );
}

export default function WhatWeDo() {
  const t = useTranslations("whatWeDo");
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const items = t.raw("items") as Array<{
    num: string;
    title: string;
    desc: string;
  }>;

  return (
    <section ref={sectionRef} className="py-28 md:py-36 relative overflow-hidden bg-surface border-t border-border">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute left-[-10%] top-[30%] h-[60vh] w-[40vw] animate-gradient-shift glow-orb bg-gradient-to-br from-glow-teal/4 via-glow-teal-subtle/2 to-transparent" />
      </div>

      <div className="container-base relative z-10">
        <motion.div
          className="mb-16 md:mb-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-label mb-4 block text-brand-400/80">
            {t("title")}
          </span>
          <h2 className="text-heading-1 tracking-tight text-text-primary">
            {t("sub")}
          </h2>
          <div className="mt-4 h-px w-12 bg-border-brand" />
        </motion.div>

        <div className="space-y-20 md:space-y-28">
          {items.map((item, i) => (
            <motion.div
              key={item.num}
              className="relative grid grid-cols-12 gap-6 md:gap-10"
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.2, ease }}
            >
              <div className="col-span-12 flex items-start md:col-span-2">
                <span
                  className="font-display text-[6rem] leading-none tracking-tight text-brand-300/15 md:text-[8.75rem] select-none"
                  style={{ fontFamily: "var(--font-display), serif" }}
                >
                  {item.num}
                </span>
              </div>

              <div className="col-span-8 -mt-2 md:col-span-6 md:col-start-3 md:mt-2">
                <h3 className="text-heading-2 mb-4 tracking-tight text-text-primary">
                  {item.title}
                </h3>
                <p className="text-body text-text-tertiary leading-relaxed max-w-xl">
                  {item.desc}
                </p>
                <div className="mt-6 h-px w-16 bg-gradient-to-r from-brand-500/40 to-transparent" />
              </div>

              <div className="col-span-4 flex items-center justify-center md:col-span-4 md:justify-end">
                <Visual index={i} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
