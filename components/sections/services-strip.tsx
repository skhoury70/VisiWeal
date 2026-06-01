"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import Link from "next/link";

const services = [
  "maAdvisory",
  "financialAdvisory",
  "digitalTransformation",
  "fractionalCFO",
  "corporateRestructuring",
  "feasibilityStudies",
] as const;

const ease = [0.16, 1, 0.3, 1] as const;

const slugs: Record<string, string> = {
  maAdvisory: "ma-advisory",
  financialAdvisory: "financial-advisory",
  digitalTransformation: "digital-transformation",
  fractionalCFO: "fractional-cfo",
  corporateRestructuring: "corporate-restructuring",
  feasibilityStudies: "feasibility-studies",
};

export default function ServicesStrip() {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="border-t border-border bg-surface">
      <div className="container-base overflow-hidden py-8">
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease }}
        >
          {services.map((s, i) => (
            <Link key={s} href={`/${locale}/services/${slugs[s]}`}>
              <motion.span
                className="inline-block rounded-full border border-border-strong bg-white/[0.03] px-5 py-2 text-sm font-medium tracking-wide text-text-tertiary backdrop-blur-sm transition-colors duration-300 hover:border-brand-500/30 hover:text-brand-400"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease }}
              >
                {t(s)}
              </motion.span>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
