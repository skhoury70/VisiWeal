"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

const clients = [
  { name: "Fattal", logo: "/images/clients/Fattal.svg", w: 140, h: 55, url: "https://www.fattal.com.lb/home.html" },
  { name: "Multilane", logo: "/images/clients/Multilane.svg", w: 130, h: 56, url: "https://multilaneinc.com/" },
  { name: "Obegi Chemicals Group", logo: "/images/clients/Obegi.svg", w: 150, h: 44, url: "https://www.linkedin.com/company/obegi-chemicals-group/" },
  { name: "PwC (Tyconz)", logo: "/images/clients/pwc.svg", w: 44, h: 44, url: "https://www.pwc.com/m1/en.html" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export default function ClientsMarquee() {
  const [isMobile, setIsMobile] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setIsMobile("ontouchstart" in window || window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (!isMobile || paused) return;
    const el = scrollRef.current;
    if (!el) return;
    if (el.children.length === 0) return;

    const scroll = () => {
      const half = el.scrollWidth / 2;
      if (el.scrollLeft >= half) {
        el.scrollLeft = 0;
      } else {
        el.scrollLeft += 0.6;
      }
      rafRef.current = requestAnimationFrame(scroll);
    };
    rafRef.current = requestAnimationFrame(scroll);

    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile, paused]);

  const handleLogoClick = () => {
    cancelAnimationFrame(rafRef.current);
    setPaused(true);
  };

  return (
    <Section className="border-t border-border">
      <Container>
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
        >
          <span className="text-label mb-6 block text-brand-400/80">
            TRUSTED BY LEADING INSTITUTIONS
          </span>
        </motion.div>

        {isMobile ? (
          <div
            ref={scrollRef}
            onTouchStart={handleLogoClick}
            className="mt-10 flex gap-6 overflow-x-auto [-webkit-overflow-scrolling:touch] [scroll-snap-type:x_mandatory]"
            style={{ scrollbarWidth: "none" }}
          >
            {[...clients, ...clients].map(({ name, logo, w, h, url }, i) => (
              <a
                key={`${name}-${i}`}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLogoClick}
                className="flex-[0_0_auto] [scroll-snap-align:start] group flex items-center justify-center rounded-lg border border-border-subtle bg-white/[0.04] px-8 py-4 backdrop-blur-sm transition-all duration-500 hover:border-white hover:bg-white/[0.08]"
              >
                <Image
                  src={logo}
                  alt={name}
                  width={w}
                  height={h}
                  className="h-10 w-auto object-contain opacity-60 transition-all duration-500 group-hover:opacity-100"
                />
              </a>
            ))}
          </div>
        ) : (
          <Marquee
            pauseOnHover
            repeat={6}
            className="mt-10 [--duration:30s] [--gap:4rem]"
          >
            {clients.map(({ name, logo, w, h, url }) => (
              <a
                key={name}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-center rounded-lg border border-border-subtle bg-white/[0.04] px-8 py-4 backdrop-blur-sm transition-all duration-500 [perspective:400px] hover:border-white hover:bg-white/[0.08]"
              >
                <Image
                  src={logo}
                  alt={name}
                  width={w}
                  height={h}
                  className="h-10 w-auto object-contain opacity-60 transition-all duration-500 group-hover:opacity-100 group-hover:[transform:rotateX(2deg)_rotateY(-8deg)_scale(1.08)]"
                />
              </a>
            ))}
          </Marquee>
        )}
      </Container>
    </Section>
  );
}
