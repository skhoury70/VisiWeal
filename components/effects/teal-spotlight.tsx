"use client";

import { useEffect, useRef, useState } from "react";

export default function TealSpotlight({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, []);

  return (
    <div
      ref={ref}
      className={`pointer-events-none fixed inset-0 z-0 ${className}`}
      style={{
        background: `radial-gradient(600px at ${pos.x}px ${pos.y}px, rgba(29,191,160,0.08), transparent)`,
      }}
    />
  );
}
