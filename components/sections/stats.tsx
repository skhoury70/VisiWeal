"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { NumberTicker } from "@/components/ui/number-ticker";
import { FlickeringGrid } from "@/components/ui/flickering-grid";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 3.5, suffix: "B+", label: "Total Transaction Value Advised", prefix: "$", decimals: 1 },
  { value: 25, suffix: "+", label: "Family Businesses & Enterprises Served", decimals: 0 },
  { value: 5, suffix: "+", label: "M&A & Restructuring Projects", decimals: 0 },
  { value: 90, suffix: "%", label: "Client Satisfaction", decimals: 0 },
];

export default function Stats() {
  const rm = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || rm) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el.querySelectorAll(".stat-item"),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );
    }, el);

    return () => ctx.revert();
  }, [rm]);

  return (
    <section
      ref={sectionRef}
      className="section-padding-sm relative overflow-hidden border-t border-border bg-surface"
    >
      <div className="absolute inset-0" aria-hidden="true">
        <FlickeringGrid
          squareSize={4}
          gridGap={8}
          flickerChance={0.15}
          color="oklch(0.62 0.17 180)"
          maxOpacity={0.08}
          className="h-full w-full"
        />
      </div>

      <div className="container-base relative z-10">
        <div className="grid grid-cols-2 gap-12 md:gap-16 lg:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="stat-item text-center">
              <div className="text-metric mb-2 tracking-tight text-text-primary md:font-semibold">
                {s.prefix ?? ""}
                <NumberTicker
                  value={s.value}
                  delay={0.3}
                  decimalPlaces={s.decimals ?? 0}
                />
                {s.suffix}
              </div>
              <p className="text-caption leading-relaxed text-text-tertiary">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
