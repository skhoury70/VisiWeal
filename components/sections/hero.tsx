"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import Image from "next/image";
import { Spotlight } from "@/components/ui/spotlight-new";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Meteors } from "@/components/ui/meteors";
import Link from "next/link";
import { useLocale } from "next-intl";

gsap.registerPlugin(ScrollTrigger, SplitText, MotionPathPlugin);

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

const tealGradLow = "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(175, 80%, 70%, .06) 0, hsla(175, 60%, 45%, .02) 50%, hsla(175, 60%, 35%, 0) 80%)";
const tealGradMid = "radial-gradient(50% 50% at 50% 50%, hsla(175, 70%, 65%, .04) 0, hsla(175, 60%, 40%, .015) 80%, transparent 100%)";
const tealGradHigh = "radial-gradient(50% 50% at 50% 50%, hsla(175, 70%, 60%, .03) 0, hsla(175, 50%, 35%, .01) 80%, transparent 100%)";

export default function Hero() {
  const rm = useReducedMotion();
  const locale = useLocale();
  const sectionRef = useRef<HTMLElement>(null);
  const grad1Ref = useRef<HTMLDivElement>(null);
  const grad2Ref = useRef<HTMLDivElement>(null);

  const item = (d = 0) => (rm ? { ...noMotionFade, transition: { duration: 0 } } : fadeUp(d));

  useEffect(() => {
    if (rm) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const isMobile = "ontouchstart" in window || window.matchMedia("(pointer: coarse)").matches;
    if (isMobile) ScrollTrigger.normalizeScroll(true);

    const ctx = gsap.context(() => {
      gsap.to(grad1Ref.current, {
        yPercent: 12,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      gsap.to(grad2Ref.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    return () => ctx.revert();
  }, [rm]);

  return (
    <section ref={sectionRef} className="relative flex min-h-screen items-center overflow-hidden bg-surface">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/hero-dubai.avif"
          alt=""
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
          quality={85}
        />
        <div className="absolute inset-0 bg-[#0C1820]/70" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(12,24,32,0.6) 0%, rgba(29,191,160,0.04) 50%, transparent 100%)' }} />
        <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay">
          <Image
            src="/images/ai-intelligence-layer.avif"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            loading="lazy"
            quality={50}
          />
        </div>
        <BackgroundBeams className="opacity-50 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_20%,transparent_70%)]" />
        <Spotlight
          gradientFirst={tealGradLow}
          gradientSecond={tealGradMid}
          gradientThird={tealGradHigh}
          translateY={-350}
          width={560}
          height={1380}
          smallWidth={240}
          duration={12}
          xOffset={120}
        />
        <div
          ref={grad1Ref}
          className="absolute -left-[20%] -top-[30%] h-[80vh] w-[60vw] animate-gradient-shift glow-orb bg-gradient-to-br from-glow-teal/10 via-glow-teal/5 to-transparent"
        />
        <div
          ref={grad2Ref}
          className="absolute -bottom-[20%] -right-[15%] h-[60vh] w-[50vw] animate-gradient-secondary glow-orb-md bg-gradient-to-tl from-glow-teal-strong/8 via-glow-teal/4 to-transparent"
        />
        <GridPattern
          width={48}
          height={48}
          x={-1}
          y={-1}
          strokeDasharray="4 4"
          className="opacity-[0.025] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,black_30%,transparent_70%)]"
        />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <Meteors
          number={15}
          minDelay={0.5}
          maxDelay={3}
          minDuration={4}
          maxDuration={12}
          angle={230}
        />
        <motion.div
          className="absolute right-[15%] top-[20%] h-4 w-4 rounded-full border border-brand-400/20"
          animate={
            rm
              ? {}
              : {
                  y: [0, -12, -4, -8, 0],
                  x: [0, 8, -4, 4, 0],
                  opacity: [0.4, 0.7, 0.3, 0.6, 0.4],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[10%] h-3 w-3 rounded-full bg-brand-400/10"
          animate={
            rm
              ? {}
              : {
                  y: [0, -6, -14, -4, 0],
                  x: [0, -6, 4, -2, 0],
                  opacity: [0.2, 0.5, 0.15, 0.4, 0.2],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
      </div>

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
