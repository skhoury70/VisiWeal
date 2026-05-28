"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

interface DataItem {
  year: number;
  value: number;
}

const data: DataItem[] = [
  { year: 2019, value: 820 },
  { year: 2020, value: 1200 },
  { year: 2021, value: 980 },
  { year: 2022, value: 1650 },
  { year: 2023, value: 2100 },
  { year: 2024, value: 4200 },
];

const GRADIENT_ID = "volume-bar-teal";
const TEAL = "#1DBFA0";
const TEAL_LIGHT = "#4DD8C0";
const TEAL_DARK = "#0A5A4C";

function formatAED(value: number): string {
  return `AED ${value.toLocaleString()}M`;
}

export default function DealVolumeBarChart() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const svgEl = svgRef.current;
    const container = containerRef.current;
    if (!svgEl || !container) return;

    const { width, height } = container.getBoundingClientRect();
    const margin = { top: 28, right: 20, bottom: 40, left: 60 };
    const innerW = width - margin.left - margin.right;
    const innerH = height - margin.top - margin.bottom;

    const svg = d3.select(svgEl);
    svg.selectAll("*").remove();

    const defs = svg.append("defs");
    defs
      .append("linearGradient")
      .attr("id", GRADIENT_ID)
      .attr("x1", "0%")
      .attr("y1", "0%")
      .attr("x2", "0%")
      .attr("y2", "100%")
      .selectAll("stop")
      .data([
        { offset: "0%", color: TEAL_LIGHT },
        { offset: "40%", color: TEAL },
        { offset: "100%", color: TEAL_DARK },
      ])
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    svg
      .append("filter")
      .attr("id", "bar-glow")
      .append("feDropShadow")
      .attr("dx", 0)
      .attr("dy", 2)
      .attr("stdDeviation", 4)
      .attr("flood-color", TEAL)
      .attr("flood-opacity", 0.25);

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scaleBand<number>()
      .domain(data.map((d) => d.year))
      .range([0, innerW])
      .padding(0.3);

    const y = d3
      .scaleLinear()
      .domain([0, d3.max(data, (d) => d.value)! * 1.12])
      .range([innerH, 0]);

    g.append("g")
      .attr("class", "grid")
      .call(
        d3
          .axisLeft(y)
          .ticks(5)
          .tickSize(-innerW)
          .tickFormat(() => ""),
      )
      .selectAll("line")
      .attr("stroke", "rgba(255,255,255,0.05)")
      .attr("stroke-dasharray", "3,3");

    const yAxis = g.append("g").call(
      d3
        .axisLeft(y)
        .ticks(5)
        .tickFormat((d) => `${Number(d) / 1000}B`),
    );
    yAxis.selectAll(".domain").remove();
    yAxis.selectAll(".tick line").remove();
    yAxis
      .selectAll("text")
      .attr("fill", "#7A98A8")
      .attr("font-size", "11px")
      .attr("font-family", "inherit");

    const xAxis = g
      .append("g")
      .attr("transform", `translate(0,${innerH})`)
      .call(d3.axisBottom(x).tickFormat((d) => String(d)));
    xAxis.selectAll(".domain").remove();
    xAxis
      .selectAll("text")
      .attr("fill", "#7A98A8")
      .attr("font-size", "11px")
      .attr("font-family", "inherit");

    const tooltip = d3
      .select(container)
      .append("div")
      .attr("class", "bar-tooltip")
      .style("position", "absolute")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style(
        "background",
        "rgba(12,24,32,0.95)",
      )
      .style("border", "1px solid rgba(255,255,255,0.07)")
      .style("border-radius", "8px")
      .style("padding", "8px 12px")
      .style("font-size", "12px")
      .style("backdrop-filter", "blur(12px)")
      .style("box-shadow", "0 8px 24px rgba(0,0,0,0.3)")
      .style("transform", "translate(-50%, -100%)")
      .style("white-space", "nowrap");

    const bars = g
      .selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .attr("x", (d) => x(d.year)!)
      .attr("y", innerH)
      .attr("width", x.bandwidth())
      .attr("height", 0)
      .attr("fill", `url(#${GRADIENT_ID})`)
      .attr("filter", "url(#bar-glow)")
      .attr("rx", 5)
      .attr("ry", 5)
      .on("mouseenter", function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr("opacity", 0.85);
        const rect = (event.currentTarget as SVGRectElement).getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        tooltip
          .style("opacity", 1)
          .html(
            `<div style="font-weight:500;color:#D8E4E8;margin-bottom:2px">${d.year}</div><div style="color:#1DBFA0;font-weight:600">${formatAED(d.value)}</div>`,
          )
          .style(
            "left",
            `${rect.left - containerRect.left + rect.width / 2}px`,
          )
          .style("top", `${rect.top - containerRect.top - 4}px`);
      })
      .on("mouseleave", function () {
        d3.select(this).transition().duration(200).attr("opacity", 1);
        tooltip.style("opacity", 0);
      });

    bars
      .transition()
      .delay((_, i) => i * 80)
      .duration(800)
      .ease(d3.easeCubicOut)
      .attr("y", (d) => y(d.value))
      .attr("height", (d) => innerH - y(d.value));

    const labels = g
      .selectAll(".bar-label")
      .data(data)
      .enter()
      .append("text")
      .attr("class", "bar-label")
      .attr("x", (d) => x(d.year)! + x.bandwidth() / 2)
      .attr("y", (d) => y(d.value) - 8)
      .attr("text-anchor", "middle")
      .attr("fill", "#D8E4E8")
      .attr("font-size", "11px")
      .attr("font-weight", "500")
      .attr("font-family", "inherit")
      .attr("opacity", 0)
      .text((d) => formatAED(d.value));

    labels
      .transition()
      .delay((_, i) => i * 80 + 850)
      .duration(400)
      .attr("opacity", 1);

    return () => {
      tooltip.remove();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full"
    >
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        style={{ display: "block" }}
      />
    </div>
  );
}
