"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useRef, useEffect } from "react";
import * as echarts from "echarts/core";
import { MapChart, EffectScatterChart } from "echarts/charts";
import {
  GeoComponent,
  TooltipComponent,
  VisualMapComponent,
} from "echarts/components";
import { CanvasRenderer } from "echarts/renderers";
import { GraphicComponent } from "echarts/components";

echarts.use([
  MapChart,
  EffectScatterChart,
  GeoComponent,
  TooltipComponent,
  VisualMapComponent,
  CanvasRenderer,
  GraphicComponent,
]);

const TEAL_LIGHT = "#4DD8C0";
const TEAL = "#1DBFA0";
const TEAL_MID = "#0F8E78";

const cities = [
  { name: "Dubai", lat: 25.2048, lng: 55.2708, value: 100 },
  { name: "Riyadh", lat: 24.7136, lng: 46.6753, value: 90 },
  { name: "Abu Dhabi", lat: 24.4539, lng: 54.3773, value: 85 },
  { name: "Doha", lat: 25.2854, lng: 51.531, value: 75 },
  { name: "Kuwait City", lat: 29.3759, lng: 47.9774, value: 65 },
  { name: "Cairo", lat: 30.0444, lng: 31.2357, value: 70 },
  { name: "London", lat: 51.5074, lng: -0.1278, value: 55 },
  { name: "New York", lat: 40.7128, lng: -74.006, value: 50 },
];

function getMapData() {
  return {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: { name: "MENA Region" },
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [-18, 10],
              [-18, 40],
              [60, 40],
              [60, 10],
              [-18, 10],
            ],
          ],
        },
      },
    ],
  };
}

export default function MenaPresenceMap() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = chartRef.current;
    if (!el) return;

    echarts.registerMap("mena", getMapData() as any);

    const chart = echarts.init(el, undefined, { renderer: "canvas" });

    chart.setOption({
      backgroundColor: "transparent",
      geo: {
        map: "mena",
        silent: true,
        roam: false,
        center: [25, 28],
        zoom: 1.7,
        itemStyle: {
          areaColor: "rgba(29,191,160,0.04)",
          borderColor: "rgba(29,191,160,0.12)",
          borderWidth: 1,
        },
        regions: [
          {
            name: "MENA Region",
            itemStyle: {
              areaColor: "rgba(29,191,160,0.06)",
            },
          },
        ],
        label: { show: false },
        emphasis: {
          itemStyle: { areaColor: "rgba(29,191,160,0.1)" },
        },
      },
      tooltip: {
        trigger: "item",
        backgroundColor: "rgba(12,24,32,0.95)",
        borderColor: "rgba(255,255,255,0.07)",
        borderWidth: 1,
        borderRadius: 8,
        padding: [8, 12],
        textStyle: { color: "#D8E4E8", fontSize: 12 },
        formatter: (params: { name?: string; value?: number[] }) => {
          if (!params.name) return "";
          const city = cities.find((c) => c.name === params.name);
          return `<div style="font-weight:500;margin-bottom:2px">${params.name}</div><div style="color:#1DBFA0">Presence Score: ${city?.value || 0}</div>`;
        },
      },
      visualMap: {
        show: false,
        min: 0,
        max: 100,
        inRange: {
          color: [TEAL_MID, TEAL, TEAL_LIGHT],
        },
      },
      series: [
        {
          type: "effectScatter",
          coordinateSystem: "geo",
          data: cities.map((c) => ({
            name: c.name,
            value: [c.lng, c.lat, c.value],
          })),
          symbolSize: 10,
          showEffectOn: "render",
          rippleEffect: {
            brushType: "stroke",
            scale: 3.5,
            period: 4,
          },
          itemStyle: {
            color: TEAL,
            shadowBlur: 12,
            shadowColor: "rgba(29,191,160,0.4)",
          },
          zlevel: 2,
          label: {
            show: true,
            formatter: (params: { name?: string }) => params.name || "",
            position: "right",
            color: "#D8E4E8",
            fontSize: 10,
            fontFamily: "inherit",
            fontWeight: 400,
            offset: [8, 0],
            textBorderColor: "rgba(7,16,23,0.8)",
            textBorderWidth: 2,
          },
          emphasis: {
            itemStyle: { color: TEAL_LIGHT },
            label: {
              fontWeight: 600,
              fontSize: 11,
            },
          },
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
    <div
      ref={chartRef}
      className="h-full w-full"
    />
  );
}
