"use client";

import { useEffect, useRef } from "react";
import * as echarts from "echarts/core";
import { SunburstChart } from "echarts/charts";
import {
  TooltipComponent,
  ToolboxComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";

echarts.use([SunburstChart, TooltipComponent, ToolboxComponent, CanvasRenderer]);

const data = {
  name: "Deal Flow",
  children: [
    {
      name: "M&A Advisory",
      value: 45,
      children: [
        {
          name: "Equity",
          value: 25,
          children: [
            { name: "Technology", value: 12 },
            { name: "Energy", value: 5 },
            { name: "Real Estate", value: 5 },
            { name: "Financials", value: 3 },
          ],
        },
        {
          name: "Debt",
          value: 12,
          children: [
            { name: "Technology", value: 4 },
            { name: "Energy", value: 3 },
            { name: "Real Estate", value: 3 },
            { name: "Financials", value: 2 },
          ],
        },
        {
          name: "Hybrid",
          value: 8,
          children: [
            { name: "Technology", value: 2 },
            { name: "Energy", value: 2 },
            { name: "Real Estate", value: 3 },
            { name: "Financials", value: 1 },
          ],
        },
      ],
    },
    {
      name: "Capital Raising",
      value: 25,
      children: [
        {
          name: "Equity",
          value: 10,
          children: [
            { name: "Technology", value: 4 },
            { name: "Energy", value: 2 },
            { name: "Real Estate", value: 2 },
            { name: "Financials", value: 2 },
          ],
        },
        {
          name: "Debt",
          value: 15,
          children: [
            { name: "Technology", value: 3 },
            { name: "Energy", value: 6 },
            { name: "Real Estate", value: 4 },
            { name: "Financials", value: 2 },
          ],
        },
      ],
    },
    {
      name: "Restructuring",
      value: 28,
      children: [
        {
          name: "Debt",
          value: 18,
          children: [
            { name: "Technology", value: 3 },
            { name: "Energy", value: 4 },
            { name: "Real Estate", value: 5 },
            { name: "Financials", value: 6 },
          ],
        },
        {
          name: "Hybrid",
          value: 10,
          children: [
            { name: "Technology", value: 1 },
            { name: "Energy", value: 3 },
            { name: "Real Estate", value: 4 },
            { name: "Financials", value: 2 },
          ],
        },
      ],
    },
  ],
};

const TEAL = "#1DBFA0";
const TEAL_MID = "#0F8E78";
const TEAL_DARK = "#0A5A4C";
export default function DealFlowSunburst() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current, null, { renderer: "canvas" });

    chart.setOption({
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(12,24,32,0.95)",
        borderColor: "rgba(255,255,255,0.07)",
        borderWidth: 1,
        padding: [10, 14],
        textStyle: { color: "#D8E4E8", fontSize: 13 },
        formatter: (params: { name: string; value: number; treePathInfo?: { name: string }[] }) => {
          const path = params.treePathInfo?.map((p) => p.name).filter(Boolean).join(" → ") || "";
          return `<div style="font-weight:500;margin-bottom:4px">${path}</div><div style="color:${TEAL};font-weight:600">${params.value} deals</div>`;
        },
      },
      toolbox: {
        show: false,
      },
      series: [
        {
          type: "sunburst",
          data: [data],
          radius: ["12%", "90%"],
          sort: "desc",
          emphasis: {
            focus: "ancestor",
          },
          levels: [
            {},
            {
              r0: "12%",
              r: "40%",
              itemStyle: { color: TEAL },
              label: { rotate: "tangential", fontSize: 11, fontWeight: 500, color: "#fff" },
            },
            {
              r0: "40%",
              r: "65%",
              itemStyle: { color: TEAL_MID },
              label: { rotate: "tangential", fontSize: 10, color: "rgba(255,255,255,0.7)" },
            },
            {
              r0: "65%",
              r: "90%",
              itemStyle: { color: TEAL_DARK },
              label: { rotate: "tangential", fontSize: 9, color: "rgba(255,255,255,0.5)" },
            },
          ],
          itemStyle: {
            borderRadius: 4,
            borderColor: "#0C1820",
            borderWidth: 2,
          },
          label: {
            show: true,
            rotate: "tangential",
            fontSize: 10,
            fontWeight: 500,
            color: "#fff",
          },
          animationDuration: 1000,
          animationEasing: "cubicOut",
        },
      ],
    });

    const handleResize = () => chart.resize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      chart.dispose();
    };
  }, []);

  return (
    <div ref={chartRef} className="h-full w-full" />
  );
}
