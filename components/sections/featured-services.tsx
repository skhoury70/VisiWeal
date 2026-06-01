"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import GlassCard from "@/components/effects/glass-card";
import ScrollReveal from "@/components/effects/scroll-reveal";

const featured = ["ma", "cfo", "digital"] as const;

const icons: Record<string, string> = {
  ma: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
  cfo: "M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z",
  digital: "M12 18h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
};

const ease = [0.16, 1, 0.3, 1] as const;

export default function FeaturedServices() {
  const t = useTranslations("featured");
  const sd = useTranslations("servicesDetails");

  return (
    <section className="py-28 md:py-36 relative overflow-hidden bg-surface border-t border-border">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute right-[-10%] bottom-[20%] h-[50vh] w-[35vw] animate-gradient-secondary glow-orb-md bg-gradient-to-tl from-glow-teal-strong/6 via-glow-teal/3 to-transparent" />
      </div>

      <div className="container-base relative z-10">
        <ScrollReveal>
          <div className="mb-16 md:mb-20 max-w-2xl">
            <span className="text-label mb-4 block text-brand-400/80">
              {t("title")}
            </span>
            <h2 className="text-heading-1 tracking-tight text-text-primary">
              {t("sub")}
            </h2>
            <div className="mt-6 text-body text-text-tertiary leading-relaxed">
              {t("subheader")}
            </div>
            <div className="mt-6 h-px w-12 bg-border-brand" />
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {featured.map((key, i) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
            >
              <GlassCard className="h-full">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mb-5 h-10 w-10 text-brand-400"
                >
                  <path d={icons[key]} />
                </svg>
                <h3 className="text-heading-3 mb-3 tracking-tight text-text-primary">
                  {sd(`${key}.title`)}
                </h3>
                <p className="text-body-small leading-relaxed text-text-tertiary">
                  {sd(`${key}.short`)}
                </p>
                <div className="mt-6 flex items-center gap-2">
                  <span className="h-px w-8 bg-border-brand" />
                  <span className="h-px w-3 bg-border-subtle" />
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
