"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type UseGsapRevealOptions = {
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  trigger?: gsap.DOMTarget;
  start?: string;
  end?: string;
  scrub?: boolean | number;
  markers?: boolean;
  disabled?: boolean;
};

export function useGsapReveal<T extends HTMLElement>({
  from = { y: 40, opacity: 0 },
  to = { y: 0, opacity: 1, duration: 1.5, ease: "power2.out" },
  start = "top 85%",
  end = "top 40%",
  scrub = 1,
  disabled,
}: UseGsapRevealOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(el, from, {
        ...to,
        scrollTrigger: {
          trigger: el,
          start,
          end,
          scrub,
        },
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  return ref;
}

type UseGsapParallaxOptions = {
  factor?: number;
  trigger?: gsap.DOMTarget;
  start?: string;
  end?: string;
  disabled?: boolean;
};

export function useGsapParallax<T extends HTMLElement>({
  factor = 0.15,
  start = "top bottom",
  end = "bottom top",
  disabled,
}: UseGsapParallaxOptions = {}) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || disabled) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      gsap.to(el, {
        yPercent: -100 * factor,
        ease: "none",
        scrollTrigger: {
          trigger: el.closest("section") || el.parentElement,
          start,
          end,
          scrub: 1,
        },
      });
    }, el);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [disabled]);

  return ref;
}
