"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import GlassCard from "@/components/effects/glass-card";
import ScrollReveal from "@/components/effects/scroll-reveal";

const ease = [0.16, 1, 0.3, 1] as const;

export default function Testimonials() {
  const t = useTranslations("testimonials");
  const items = t.raw("items") as Array<{
    quote: string;
    author: string;
    company: string;
  }>;

  return (
    <section className="py-28 md:py-36 relative overflow-hidden bg-surface border-t border-border">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute right-[20%] top-[10%] h-[50vh] w-[30vw] animate-gradient-secondary glow-orb-md bg-gradient-to-tl from-glow-teal-strong/5 via-glow-teal/2 to-transparent" />
      </div>

      <div className="container-base relative z-10">
        <ScrollReveal>
          <div className="mb-16 md:mb-20">
            <span className="text-label mb-4 block text-brand-400/80">
              {t("title")}
            </span>
            <div className="mt-4 h-px w-12 bg-border-brand" />
          </div>
        </ScrollReveal>

        <div className="grid gap-6 md:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
            >
              <GlassCard className="flex h-full flex-col">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="mb-5 h-8 w-8 text-brand-400/40"
                >
                  <path d="M10 11h-4v-1c0-1.1.9-2 2-2h1v-2h-1c-2.21 0-4 1.79-4 4v5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" />
                  <path d="M20 11h-4v-1c0-1.1.9-2 2-2h1v-2h-1c-2.21 0-4 1.79-4 4v5c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" />
                </svg>

                <p className="text-body-small leading-relaxed text-text-secondary flex-1">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="mt-6 border-t border-border-subtle pt-4">
                  <p className="text-label text-xs font-medium text-text-primary">
                    {item.author}
                  </p>
                  <p className="text-caption text-text-tertiary mt-0.5">
                    {item.company}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
