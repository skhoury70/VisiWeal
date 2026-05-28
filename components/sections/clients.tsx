"use client";

import { motion } from "framer-motion";
import { Marquee } from "@/components/ui/marquee";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";

const clients = [
  "Goldman Sachs", "J.P. Morgan", "Morgan Stanley",
  "BlackRock", "KKR & Co.", "The Carlyle Group",
  "Apollo Global", "Ares Management", "TPG Capital",
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
          className="mt-10 [--duration:50s] [--gap:4rem]"
        >
          {clients.map((name) => (
            <div
              key={name}
              className="flex items-center justify-center rounded-lg border border-border-subtle bg-white/[0.04] px-8 py-4 backdrop-blur-sm"
            >
              <span className="whitespace-nowrap text-sm font-medium tracking-wider text-text-tertiary transition-colors duration-300 hover:text-text-secondary">
                {name}
              </span>
            </div>
          ))}
        </Marquee>
      </Container>
    </Section>
  );
}
