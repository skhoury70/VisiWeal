"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { sankey, sankeyLinkHorizontal } from "d3-sankey";

const TEAL = "#1DBFA0";
const TEAL_MID = "#0F8E78";
const TEAL_DARK = "#0A5A4C";
const SAND = "#C4B8A8";

const categoryColors: Record<string, string> = {
  "Advisory Type": TEAL,
  "Deal Structure": TEAL_MID,
  Industry: TEAL_DARK,
  Outcome: SAND,
};

const data: any = {
  nodes: [
    { name: "M&A Advisory", category: "Advisory Type" },
    { name: "Capital Raising", category: "Advisory Type" },
    { name: "Restructuring", category: "Advisory Type" },
    { name: "Equity", category: "Deal Structure" },
    { name: "Debt", category: "Deal Structure" },
    { name: "Hybrid", category: "Deal Structure" },
    { name: "Technology", category: "Industry" },
    { name: "Energy", category: "Industry" },
    { name: "Real Estate", category: "Industry" },
    { name: "Financials", category: "Industry" },
    { name: "Closed", category: "Outcome" },
    { name: "Under Review", category: "Outcome" },
    { name: "Pipeline", category: "Outcome" },
  ],
  links: [
    { source: 0, target: 3, value: 25 },
    { source: 0, target: 4, value: 12 },
    { source: 0, target: 5, value: 8 },
    { source: 1, target: 3, value: 10 },
    { source: 1, target: 4, value: 15 },
    { source: 2, target: 4, value: 18 },
    { source: 2, target: 5, value: 10 },
    { source: 3, target: 6, value: 18 },
    { source: 3, target: 7, value: 8 },
    { source: 3, target: 8, value: 5 },
    { source: 3, target: 9, value: 4 },
    { source: 4, target: 6, value: 10 },
    { source: 4, target: 7, value: 15 },
    { source: 4, target: 8, value: 12 },
    { source: 4, target: 9, value: 8 },
    { source: 5, target: 7, value: 6 },
    { source: 5, target: 8, value: 8 },
    { source: 5, target: 9, value: 4 },
    { source: 6, target: 10, value: 15 },
    { source: 6, target: 11, value: 8 },
    { source: 6, target: 12, value: 5 },
    { source: 7, target: 10, value: 12 },
    { source: 7, target: 11, value: 10 },
    { source: 7, target: 12, value: 7 },
    { source: 8, target: 10, value: 10 },
    { source: 8, target: 11, value: 8 },
    { source: 8, target: 12, value: 7 },
    { source: 9, target: 10, value: 8 },
    { source: 9, target: 11, value: 5 },
    { source: 9, target: 12, value: 3 },
  ],
};

export default function MaDealSankey() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    const container = containerRef.current;
    if (!svgEl || !container) return;

    const { width, height } = container.getBoundingClientRect();
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    const sankeyGen = sankey()
      .nodeWidth(20)
      .nodePadding(14)
      .extent([
        [margin.left, margin.top],
        [width - margin.right, height - margin.bottom],
      ]);

    const { nodes: sankeyNodes, links: sankeyLinks } = sankeyGen(data as any) as any;

    const tooltip = d3
      .select(container)
      .append("div")
      .attr("class", "sankey-tooltip")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("background", "rgba(12,24,32,0.95)")
      .style("border", "1px solid rgba(255,255,255,0.07)")
      .style("border-radius", "8px")
      .style("padding", "8px 12px")
      .style("font-size", "12px")
      .style("backdrop-filter", "blur(12px)")
      .style("box-shadow", "0 8px 24px rgba(0,0,0,0.3)")
      .style("white-space", "nowrap");

    const link = svg
      .append("g")
      .selectAll("path")
      .data(sankeyLinks)
      .enter()
      .append("path")
      .attr("d", sankeyLinkHorizontal() as any)
      .attr("fill", "none")
      .attr("stroke", (d: any) => {
        const c = d.source?.category
          ? categoryColors[d.source.category]
          : TEAL;
        return c || TEAL;
      })
      .attr("stroke-opacity", 0.25)
      .attr("stroke-width", (d: any) => Math.max(1, d.width || 0))
      .on("mouseenter", function (event: MouseEvent, d: any) {
        d3.select(this).attr("stroke-opacity", 0.55);
        const containerRect = container.getBoundingClientRect();
        tooltip
          .style("opacity", 1)
          .html(
            `<div style="color:#D8E4E8">${d.source?.name || ""} → ${d.target?.name || ""}</div><div style="color:#1DBFA0;font-weight:600">${d.value} deals</div>`,
          )
          .style("left", `${event.clientX - containerRect.left}px`)
          .style("top", `${event.clientY - containerRect.top - 8}px`);
      })
      .on("mousemove", function (event: MouseEvent) {
        const containerRect = container.getBoundingClientRect();
        tooltip
          .style("left", `${event.clientX - containerRect.left}px`)
          .style("top", `${event.clientY - containerRect.top - 8}px`);
      })
      .on("mouseleave", function () {
        d3.select(this).attr("stroke-opacity", 0.25);
        tooltip.style("opacity", 0);
      });

    link
      .transition()
      .delay((_: any, i: number) => i * 15)
      .duration(600)
      .attr("stroke-opacity", 0.35);

    const node = svg
      .append("g")
      .selectAll("rect")
      .data(sankeyNodes)
      .enter()
      .append("rect")
      .attr("x", (d: any) => d.x0 || 0)
      .attr("y", (d: any) => d.y0 || 0)
      .attr("height", (d: any) => Math.max(1, (d.y1 || 0) - (d.y0 || 0)))
      .attr("width", (d: any) => Math.max(1, (d.x1 || 0) - (d.x0 || 0)))
      .attr("fill", (d: any) => {
        return categoryColors[d.category || ""] || TEAL;
      })
      .attr("rx", 3)
      .attr("ry", 3)
      .attr("opacity", 0);

    node
      .transition()
      .delay((_: any, i: number) => i * 30)
      .duration(500)
      .attr("opacity", 0.9);

    const label = svg
      .append("g")
      .selectAll("text")
      .data(sankeyNodes)
      .enter()
      .append("text")
      .attr("x", (d: any) => {
        const isLeft = (d.x0 || 0) < width / 2;
        return isLeft ? (d.x1 || 0) + 6 : (d.x0 || 0) - 6;
      })
      .attr("y", (d: any) => ((d.y1 || 0) + (d.y0 || 0)) / 2)
      .attr("dy", "0.35em")
      .attr("text-anchor", (d: any) => {
        return (d.x0 || 0) < width / 2 ? "start" : "end";
      })
      .attr("fill", "#D8E4E8")
      .attr("font-size", "11px")
      .attr("font-family", "inherit")
      .attr("opacity", 0)
      .text((d: any) => d.name);

    label
      .transition()
      .delay((_: any, i: number) => i * 30 + 300)
      .duration(400)
      .attr("opacity", 0.85);

    return () => {
      tooltip.remove();
    };
  }, []);

  return (
    <div ref={containerRef} className="h-full w-full">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ display: "block" }}
      />
    </div>
  );
}
