"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Spotlight } from "@/components/ui/spotlight-new";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { GridPattern } from "@/components/ui/grid-pattern";
import { Meteors } from "@/components/ui/meteors";

const tealGradLow =
  "radial-gradient(68.54% 68.72% at 55.02% 31.46%, hsla(175, 80%, 70%, .06) 0, hsla(175, 60%, 45%, .02) 50%, hsla(175, 60%, 35%, 0) 80%)";
const tealGradMid =
  "radial-gradient(50% 50% at 50% 50%, hsla(175, 70%, 65%, .04) 0, hsla(175, 60%, 40%, .015) 80%, transparent 100%)";
const tealGradHigh =
  "radial-gradient(50% 50% at 50% 50%, hsla(175, 70%, 60%, .03) 0, hsla(175, 50%, 35%, .01) 80%, transparent 100%)";

interface HeroDecorationsProps {
  sectionRef: React.RefObject<HTMLElement | null>;
  rm: boolean;
}

export function HeroDecorations({ sectionRef, rm }: HeroDecorationsProps) {
  const grad1Ref = useRef<HTMLDivElement>(null);
  const grad2Ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const grad1Y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const grad2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-8%"]);

  return (
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
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(12,24,32,0.6) 0%, rgba(29,191,160,0.04) 50%, transparent 100%)",
        }}
      />
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
      <motion.div
        ref={grad1Ref}
        style={rm ? {} : { y: grad1Y }}
        className="absolute -left-[20%] -top-[30%] h-[80vh] w-[60vw] animate-gradient-shift glow-orb bg-gradient-to-br from-glow-teal/10 via-glow-teal/5 to-transparent"
      />
      <motion.div
        ref={grad2Ref}
        style={rm ? {} : { y: grad2Y }}
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
  );
}
