"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { Ripple } from "@/components/ui/ripple";

const ease = [0.16, 1, 0.3, 1] as const;

export default function CTA() {
  const locale = useLocale();
  return (
    <Section className="relative overflow-hidden border-t border-border">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/cta-boardroom.avif"
          alt=""
          fill
          className="object-cover object-center"
          sizes="100vw"
          loading="lazy"
          quality={80}
        />
        <div className="absolute inset-0 bg-[#0C1820]/70" />
        <div className="absolute right-[-10%] top-[-20%] h-[70vh] w-[50vw] animate-gradient-shift glow-orb bg-gradient-to-br from-glow-teal/8 via-glow-teal/3 to-transparent" />
        <Ripple
          mainCircleSize={180}
          mainCircleOpacity={0.06}
          numCircles={6}
        />
      </div>

      <Container width="narrow">
        <motion.div
          className="relative text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
        >
          <div className="relative mx-auto max-w-lg rounded-2xl p-10 md:p-14">
            <GlowingEffect
              disabled={false}
              blur={12}
              spread={50}
              borderWidth={1}
              movementDuration={2}
              proximity={120}
            />
            <span className="text-label mb-4 block text-brand-400/80">
              Get Started
            </span>
            <h2 className="text-heading-1 mb-6 tracking-tight text-text-primary">
              Ready to Transform Your{" "}
              <span className="text-gradient-brand">Financial Future</span>?
            </h2>
            <p className="mx-auto mb-10 max-w-md text-body text-text-tertiary">
              Schedule a confidential consultation with our senior team to
              explore how Visiweal can drive your next chapter of growth.
            </p>
            <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href={`/${locale}/book-consultation`}
                className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-brand-400 to-brand-600 px-8 py-3.5 text-sm font-medium text-white shadow-glow-teal transition-all hover:shadow-lg md:text-base"
              >
                Book Consultation
              </Link>
              <Link
                href={`/${locale}/services`}
                className="inline-flex items-center justify-center rounded-full border border-border-strong bg-white/[0.04] px-8 py-3.5 text-sm font-medium text-text-secondary backdrop-blur-sm transition-colors duration-300 hover:border-border-strong hover:bg-white/[0.08] hover:text-text-primary md:text-base"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
