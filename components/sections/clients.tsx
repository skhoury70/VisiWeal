"use client";

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
          <span className="text-overline mb-6 block text-text-quaternary">
            Trusted by Leading Institutions
          </span>
        </motion.div>

        <Marquee
          pauseOnHover
          repeat={6}
          className="mt-10 [--duration:80s] [--gap:4rem]"
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
      </Container>
    </Section>
  );
}
