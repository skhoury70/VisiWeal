"use client";

import Image from "next/image";
import { useState } from "react";
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
  const [selected, setSelected] = useState<number | null>(null);

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
              className="cursor-pointer"
              onClick={() => setSelected(i)}
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
                      style={item.avatar.includes("Jawad") ? { objectPosition: "center 30%" } : undefined}
                    />
                  </div>
                )}

                <p className="text-body-small leading-relaxed text-text-secondary flex-1">
                  &ldquo;{item.quote}&rdquo;
                </p>

                <div className="mt-6 border-t border-border-subtle pt-4">
                  <p className="text-sm font-semibold text-brand-400/80">
                    {item.author}
                  </p>
                  {item.title && (
                    <p className="text-caption font-medium text-white mt-0.5">
                      {item.title}
                    </p>
                  )}
                  <p className="text-caption font-medium text-white">
                    {item.company}
                  </p>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {selected !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="relative w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-[#0C1820] p-8 shadow-2xl md:p-12"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/10 text-white/60 transition-colors hover:bg-white/20 hover:text-white"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              ✕
            </button>

            {items[selected].avatar && (
              <div className="mb-6 h-20 w-20 overflow-hidden rounded-full ring-2 ring-teal-500/20">
                <Image
                  src={items[selected].avatar}
                  alt={items[selected].author}
                  width={80}
                  height={80}
                  className="h-full w-full object-cover"
                  style={items[selected].avatar.includes("Jawad") ? { objectPosition: "center 30%" } : undefined}
                />
              </div>
            )}

            <p className="text-base leading-relaxed text-gray-300 md:text-lg">
              &ldquo;{items[selected].quote}&rdquo;
            </p>

            <div className="mt-8 border-t border-white/10 pt-6">
              <p className="text-base font-semibold text-teal-400 md:text-lg">
                {items[selected].author}
              </p>
              {items[selected].title && (
                <p className="mt-1 text-sm font-medium text-white md:text-base">
                  {items[selected].title}
                </p>
              )}
              <p className="mt-0.5 text-sm font-medium text-white md:text-base">
                {items[selected].company}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
