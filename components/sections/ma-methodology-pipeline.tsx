"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const stages = [
  {
    num: "01",
    name: "Sourcing",
    body: "The best deals are never on a list. We map markets, track sector movement, and maintain the relationships that surface proprietary targets before they enter a competitive process. By the time others are bidding, you are already at the table.",
  },
  {
    num: "02",
    name: "Screening",
    body: "Not every opportunity that looks right on the surface holds up under scrutiny. We assess each prospect against your investment thesis, financial performance, management quality, and what integration would require. If it does not meet the threshold, we tell you early and we tell you why.",
  },
  {
    num: "03",
    name: "IOI",
    body: "The Indication of Interest is your first impression in print. We craft it to position you as a credible counterparty, anchor valuation expectations, and open the path toward exclusivity. A poorly written IOI invites price inflation. A well-constructed one puts you in control of the early framing.",
  },
  {
    num: "04",
    name: "Due Diligence",
    body: "Numbers do not lie, but they do hide. We lead a structured diligence process to validate performance, stress-test assumptions, and surface risks that rarely appear in the CIM. Every finding feeds directly into your valuation, structure, and negotiating position.",
  },
  {
    num: "05",
    name: "Structuring",
    body: "Price is a number. Structure is where deals are won or lost. We design the transaction to align incentives, optimise tax and legal outcomes across the relevant jurisdictions, and allocate risk in a way that holds through completion. The term sheet we help you build reflects the deal you actually want to close.",
  },
  {
    num: "06",
    name: "Negotiation",
    body: "Every concession has a cost. We negotiate across price, terms, protections, conditions, and timing with precision knowing where to hold firm and where to move. Your interests stay protected. The transaction stays executable.",
  },
  {
    num: "07",
    name: "Closing",
    body: "Signing and closing are not the same event. We manage the path between them by coordinating advisors, documentation, regulatory approvals, funds flow, and conditions precedent with the same rigour applied at every earlier stage. Nothing falls through the floor at the finish line.",
  },
  {
    num: "08",
    name: "PMI",
    body: "Deal value exists on paper until integration makes it real. We support post-merger integration by aligning operating models, establishing governance and reporting structures, tracking quantified synergy targets, and preparing your organisation for Day 1. Most value erosion happens here.",
  },
];

const NODE_COUNT = stages.length;

function getNodeX(index: number, width: number) {
  const pad = width * 0.06;
  const usable = width - pad * 2;
  return pad + (index / (NODE_COUNT - 1)) * usable;
}

export default function MAMethodologyPipeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [svgWidth, setSvgWidth] = useState(1000);
  const sectionRef = useRef<HTMLElement>(null);
  const pipelineRef = useRef<HTMLDivElement>(null);
  const [lineProgress, setLineProgress] = useState(0);
  const [panelVisible, setPanelVisible] = useState(true);
  const [animating, setAnimating] = useState(false);

  const svgViewBox = 1000;

  useAnimatedLine(
    sectionRef,
    hasAnimated,
    () => {
      setHasAnimated(true);
      setLineProgress(getNodeX(activeIdx, svgViewBox));
    },
    activeIdx,
    svgViewBox
  );

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!pipelineRef.current) return;
    const updateWidth = () => {
      if (pipelineRef.current) {
        setSvgWidth(pipelineRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const navigateTo = useCallback(
    (idx: number) => {
      if (idx === activeIdx || animating) return;
      setAnimating(true);
      setPanelVisible(false);
      const targetX = getNodeX(idx, svgViewBox);
      setTimeout(() => {
        setActiveIdx(idx);
        setLineProgress(targetX);
        setPanelVisible(true);
        setTimeout(() => setAnimating(false), 250);
      }, 150);
    },
    [activeIdx, animating, svgViewBox]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (activeIdx < NODE_COUNT - 1) navigateTo(activeIdx + 1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (activeIdx > 0) navigateTo(activeIdx - 1);
      }
    },
    [activeIdx, navigateTo]
  );

  const svgLineY = 14;

  const activeX = hasAnimated
    ? lineProgress
    : getNodeX(activeIdx, svgViewBox);

  return (
    <section id="ma-methodology" ref={sectionRef} className="py-28 md:py-36">
      <div className="container-base">
        <div className="max-w-[720px]">
          <span className="text-label mb-4 block text-brand-400/80">8-Stage Methodology</span>
          <h2 className="text-heading-1 mb-6 tracking-tight text-text-primary">
            Our M&A Value Creation Methodology
          </h2>
          <p className="text-body text-text-tertiary leading-relaxed">
            From proprietary sourcing to post-merger integration, we combine investment banking discipline, strategic insight, and execution control to deliver transactions that create measurable long-term value.
          </p>
        </div>

        <div
          className="hidden md:block"
          onKeyDown={handleKeyDown}
        >
          <div
            ref={pipelineRef}
            className="relative mt-20"
            role="tablist"
            aria-label="M&A Methodology stages"
          >
            <svg
              className="absolute top-0 left-0 w-full pointer-events-none"
              style={{ height: (svgLineY * 2 + 2) + "px" }}
              viewBox={"0 0 " + svgViewBox + " " + (svgLineY * 2 + 2)}
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <line
                x1={0}
                y1={svgLineY}
                x2={svgViewBox}
                y2={svgLineY}
                stroke="currentColor"
                strokeWidth={1}
                className="text-white/10"
              />
              <line
                x1={0}
                y1={svgLineY}
                x2={activeX}
                y2={svgLineY}
                stroke="currentColor"
                strokeWidth={2}
                className="text-brand-400"
                style={{
                  strokeDasharray: svgViewBox,
                  strokeDashoffset: hasAnimated
                    ? svgViewBox - activeX
                    : svgViewBox,
                  transition: hasAnimated
                    ? "stroke-dashoffset 300ms ease-in-out"
                    : "stroke-dashoffset 600ms ease-in-out",
                }}
              />
            </svg>

            <div className="flex justify-between">
              {stages.map((stage, i) => {
                const isActive = i === activeIdx;
                return (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={"methodology-panel-" + i}
                    id={"methodology-tab-" + i}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => navigateTo(i)}
                    className={
                      "relative z-10 flex flex-col items-center gap-1.5 cursor-pointer transition-all duration-150 ease-linear" +
                      " focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-400/60" +
                      (isActive ? " " : " hover:scale-[1.03]")
                    }
                    style={{ width: (100 / NODE_COUNT) + "%", maxWidth: "120px" }}
                  >
                    <span
                      className={
                        "flex h-6 w-6 items-center justify-center rounded-full border text-xs font-bold leading-none transition-colors duration-150" +
                        (isActive
                          ? " border-brand-400 bg-brand-400 text-white"
                          : " border-white/20 bg-transparent text-white/40 hover:border-white/40 hover:text-white/70")
                      }
                    >
                      {stage.num}
                    </span>
                    <span
                      className={
                        "text-xs leading-tight text-center transition-colors duration-150" +
                        (isActive ? " font-semibold text-white" : " text-white/40")
                      }
                    >
                      {stage.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-16 mx-auto" style={{ maxWidth: "640px" }}>
            <AnimatePresence mode="wait">
              {panelVisible && (
                <motion.div
                  key={activeIdx}
                  role="tabpanel"
                  id={"methodology-panel-" + activeIdx}
                  aria-labelledby={"methodology-tab-" + activeIdx}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <div className="relative">
                    <span
                      className="block font-display leading-none text-white/[0.08] select-none"
                      style={{
                        fontSize: "clamp(5rem, 12vw, 8rem)",
                        fontWeight: 200,
                        lineHeight: 0.85,
                      }}
                      aria-hidden="true"
                    >
                      {stages[activeIdx].num}
                    </span>
                    <h3
                      className="text-heading-2 text-text-primary font-semibold"
                      style={{ marginTop: "-0.6em" }}
                    >
                      {stages[activeIdx].name}
                    </h3>
                  </div>

                  <div className="mt-6 h-px w-10 bg-white/20" />

                  <p
                    className="mt-6 text-body text-text-tertiary leading-relaxed"
                    style={{ maxWidth: "640px" }}
                  >
                    {stages[activeIdx].body}
                  </p>

                  <div className="mt-10 flex items-center justify-between">
                    <div>
                      {activeIdx > 0 && (
                        <button
                          onClick={() => navigateTo(activeIdx - 1)}
                          className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors duration-150 cursor-pointer"
                        >
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                          </svg>
                          {stages[activeIdx - 1].name}
                        </button>
                      )}
                    </div>
                    <div>
                      {activeIdx < NODE_COUNT - 1 && (
                        <button
                          onClick={() => navigateTo(activeIdx + 1)}
                          className="flex items-center gap-1.5 text-sm text-white/40 hover:text-white transition-colors duration-150 cursor-pointer"
                        >
                          {stages[activeIdx + 1].name}
                          <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="md:hidden mt-16">
          <MobileAccordion stages={stages} />
        </div>
      </div>
    </section>
  );
}

function MobileAccordion({ stages }: { stages: Array<{ num: string; name: string; body: string }> }) {
  const [openIdx, setOpenIdx] = useState(0);

  return (
    <div className="relative">
      <div className="absolute left-[11px] top-0 bottom-0 w-px" aria-hidden="true">
        <div className="absolute inset-0 bg-white/10" />
        <div
          className="absolute top-0 left-0 w-full bg-brand-400 transition-all duration-300 ease-linear"
          style={{ height: ((openIdx + 0.5) / stages.length * 100) + "%" }}
        />
      </div>

      <div className="space-y-0">
        {stages.map((stage, i) => {
          const isOpen = i === openIdx;
          return (
            <div key={i} className="relative pl-9">
              <button
                onClick={() => setOpenIdx(isOpen ? i : i)}
                className="relative z-10 flex w-full items-center justify-between py-4 text-left cursor-pointer"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={
                      "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-bold leading-none transition-colors" +
                      (isOpen
                        ? " border-brand-400 bg-brand-400 text-white"
                        : " border-white/20 text-white/40")
                    }
                  >
                    {stage.num}
                  </span>
                  <span
                    className={"text-sm font-medium transition-colors" + (isOpen ? " text-white" : " text-white/60")}
                  >
                    {stage.name}
                  </span>
                </div>
                <svg
                  className={
                    "h-4 w-4 shrink-0 text-white/40 transition-transform duration-300 ease-linear" +
                    (isOpen ? " rotate-45" : "")
                  }
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
              <div
                className={
                  "overflow-hidden transition-all duration-300 ease-linear" +
                  (isOpen ? " max-h-96 opacity-100" : " max-h-0 opacity-0")
                }
              >
                <p className="pb-5 text-sm text-text-tertiary leading-relaxed pr-4">
                  {stage.body}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function useAnimatedLine(
  sectionRef: React.RefObject<HTMLElement | null>,
  hasAnimated: boolean,
  onTrigger: () => void,
  _activeIdx: number,
  _svgViewBox: number
) {
  useEffect(() => {
    if (!sectionRef.current || hasAnimated) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          onTrigger();
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasAnimated, onTrigger, sectionRef]);
}
