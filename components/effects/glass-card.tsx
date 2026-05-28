"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

type Props = {
  children: ReactNode;
  className?: string;
  hover?: boolean;
};

export default function GlassCard({ children, className = "", hover = true }: Props) {
  return (
    <motion.div
      whileHover={hover ? { y: -4, borderColor: "rgba(29,191,160,0.35)" } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`rounded-2xl border border-white/[0.08] bg-white/[0.05] p-6 backdrop-blur-xl transition-shadow ${
        hover ? "hover:shadow-[0_0_40px_rgba(29,191,160,0.12)]" : ""
      } ${className}`}
    >
      {children}
    </motion.div>
  );
}
