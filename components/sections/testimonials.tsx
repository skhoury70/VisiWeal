"use client";

import Image from "next/image";
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
    title: string;
    company: string;
    avatar: string;
  }>;

  return (
    <section className="py-28 md:py-36 relative overflow-hidden bg-surface border-t border-border">
      <div className="absolute inset-0" aria-hidden="true">
        <div className="absolute right-[20%] top-[10%] h-[50vh] w-[30vw] animate-gradient-secondary glow-orb-md bg-gradient-to-tl from-glow-teal-strong/5 via-glow-teal/2 to-transparent" />
      </div>

      <div className="container-base relative z-10">
        <ScrollReveal>
          <div className="mb-16 md:mb-20 max-w-2xl">
            <span className="text-label mb-4 block text-brand-400/80">
              WHAT OUR CLIENTS SAY
            </span>
            <h2 className="text-heading-1 tracking-tight text-text-primary">
              The Work Speaks. So Do the People Who Commissioned It.
            </h2>
            <div className="mt-6 h-px w-12 bg-border-brand" />
          </div>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
            >
              <GlassCard className="flex h-full flex-col">
                {item.avatar && (
                  <div className="mb-5 h-16 w-16 overflow-hidden rounded-full ring-2 ring-teal-500/20">
                    <Image
                      src={item.avatar}
                      alt={item.author}
                      width={64}
                      height={64}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}

                <p className="text-body-small leading-relaxed text-text-secondary flex-1">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="mt-6 border-t border-border-subtle pt-4">
                  <p className="text-label text-xs font-medium text-text-primary">
                    {item.author}
                  </p>
                  {item.title && (
                    <p className="text-caption text-text-tertiary mt-0.5">
                      {item.title}
                    </p>
                  )}
                  <p className="text-caption text-text-tertiary">
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
