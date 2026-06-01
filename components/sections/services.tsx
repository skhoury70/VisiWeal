"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Link from "next/link";
import { useLocale } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

const ease = [0.16, 1, 0.3, 1] as const;

const services = [
  {
    id: "01",
    slug: "ma-advisory",
    title: "M&A Advisory",
    description:
      "End-to-end acquisition and divestiture support — from target identification and valuation through due diligence and post-merger integration.",
  },
  {
    id: "02",
    slug: "digital-transformation",
    title: "Digital Transformation",
    description:
      "Enterprise-wide technology modernization, AI strategy, and operational digitization designed to create durable competitive advantage.",
  },
  {
    id: "03",
    slug: "fractional-cfo",
    title: "Fractional CFO",
    description:
      "Strategic financial leadership on demand — FP&A, capital allocation, board reporting, and investor relations for high-growth enterprises.",
  },
  {
    id: "04",
    slug: "financial-advisory",
    title: "Financial Advisory",
    description:
      "Capital raising, debt advisory, financial restructuring, and strategic transaction support across private and public markets.",
  },
  {
    id: "05",
    slug: "corporate-restructuring",
    title: "Corporate Restructuring",
    description:
      "Balance sheet optimization, operational turnaround, stakeholder negotiation, and Chapter 11 advisory for complex situations.",
  },
  {
    id: "06",
    slug: "feasibility-studies",
    title: "Feasibility Studies",
    description:
      "Independent technical and financial assessments — market analysis, cost modeling, risk scoring, and investment-grade viability reports.",
  },
];

const containerVariants = {
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease },
  },
};

export default function Services() {
  const rm = useReducedMotion();
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (rm) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        gridRef.current,
        { clipPath: "inset(5% 3% 5% 3% round 4px)", opacity: 0.6 },
        {
          clipPath: "inset(0% 0% 0% 0% round 0px)",
          opacity: 1,
          duration: 1.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [rm]);

  return (
    <section ref={sectionRef} className="section-padding relative overflow-hidden bg-surface">
      <div className="absolute inset-0" aria-hidden="true">
        <div
          ref={bgRef}
          className="glow-orb-md absolute right-[-10%] top-[20%] h-[60vh] w-[40vw] bg-gradient-to-bl from-glow-teal/5 via-glow-teal-subtle/3 to-transparent"
        />
      </div>

      <div className="container-base relative z-10">
        <motion.div
          className="mb-16 md:mb-20"
          initial={rm ? undefined : { opacity: 0, y: 20 }}
          whileInView={rm ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-label mb-4 block text-brand-400/80">
            Capabilities
          </span>
          <h2 className="text-heading-1 tracking-tight text-text-primary">
            Strategic{" "}
            <span className="font-semibold">Financial Services</span>
          </h2>
          <div className="mt-4 h-px w-12 bg-border-brand" />
        </motion.div>

        <motion.div
          ref={gridRef}
          className="grid gap-px border border-border-subtle bg-border-subtle md:grid-cols-2 lg:grid-cols-3"
          variants={rm ? undefined : containerVariants}
          initial={rm ? undefined : "hidden"}
          whileInView={rm ? undefined : "visible"}
          viewport={{ once: true, margin: "-80px" }}
        >
          {services.map((s) => (
            <Link key={s.id} href={`/${locale}/services/${s.slug}`} className="block">
              <motion.div
                className="group relative bg-surface transition-colors duration-500 hover:bg-surface-raised"
                variants={rm ? undefined : cardVariants}
              >
                <div className="relative p-8 md:p-10">
                  {!rm && (
                    <GlowingEffect
                      disabled={false}
                      blur={8}
                      spread={40}
                      borderWidth={1}
                      movementDuration={1.5}
                    />
                  )}
                  <span className="mb-6 block text-[2.5rem] font-light leading-none tracking-tight text-brand-300/25 transition-colors duration-500 group-hover:text-brand-500/20 md:text-[3rem]">
                    {s.id}
                  </span>

                  <h3 className="text-heading-3 mb-3 tracking-tight text-text-primary">
                    {s.title}
                  </h3>

                  <p className="text-body-small leading-relaxed text-text-tertiary transition-colors duration-500 group-hover:text-text-secondary">
                    {s.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2">
                    <span className="h-px w-6 bg-border-default transition-all duration-500 group-hover:w-10 group-hover:bg-border-brand" />
                    <span className="h-px w-2 bg-border-subtle transition-all duration-500 group-hover:w-4 group-hover:bg-border-brand" />
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
