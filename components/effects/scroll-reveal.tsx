"use client";

import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

type Props = {
  children: ReactNode;
  direction?: "up" | "left" | "right" | "fade";
  delay?: number;
  duration?: number;
  className?: string;
};

const variants = {
  up: { y: 40, opacity: 1 },
  left: { x: -40, opacity: 1 },
  right: { x: 40, opacity: 1 },
  fade: { opacity: 1 },
};

export default function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });

  return (
    <div ref={ref} className={className}>
      <motion.div
        initial={variants[direction]}
        animate={isInView ? { x: 0, y: 0, opacity: 1 } : variants[direction]}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
