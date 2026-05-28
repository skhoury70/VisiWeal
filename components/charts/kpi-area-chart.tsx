"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { month: "Jan", dealValue: 320, clientCount: 8 },
  { month: "Feb", dealValue: 480, clientCount: 11 },
  { month: "Mar", dealValue: 560, clientCount: 14 },
  { month: "Apr", dealValue: 720, clientCount: 15 },
  { month: "May", dealValue: 890, clientCount: 18 },
  { month: "Jun", dealValue: 1100, clientCount: 20 },
  { month: "Jul", dealValue: 1350, clientCount: 22 },
  { month: "Aug", dealValue: 1280, clientCount: 24 },
  { month: "Sep", dealValue: 1520, clientCount: 26 },
  { month: "Oct", dealValue: 1850, clientCount: 28 },
  { month: "Nov", dealValue: 2100, clientCount: 30 },
  { month: "Dec", dealValue: 2450, clientCount: 32 },
];

interface TooltipPayloadEntry {
  name?: string;
  value?: number;
  color?: string;
  dataKey?: string;
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
}) {
  if (!active || !payload) return null;
  return (
    <div className="rounded-lg border border-white/[0.07] bg-[#0C1820]/95 px-4 py-3 shadow-lg backdrop-blur-xl">
      <p className="mb-1 text-xs font-medium text-[#7A98A8]">{label}</p>
      {payload.map((entry, i) => (
        <p
          key={i}
          className="text-sm font-semibold"
          style={{ color: entry.color ?? "#D8E4E8" }}
        >
          {entry.name}: {entry.name === "Deal Value (AED M)"
            ? entry.value?.toLocaleString()
            : entry.value}
        </p>
      ))}
    </div>
  );
}

export default function KpiAreaChart() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 12, right: 8, bottom: 4, left: -8 }}
        >
          <defs>
            <linearGradient id="dealValueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1DBFA0" stopOpacity={0.15} />
              <stop offset="100%" stopColor="#1DBFA0" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="clientCountFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#C4B8A8" stopOpacity={0.1} />
              <stop offset="100%" stopColor="#C4B8A8" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            strokeDasharray="4 4"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#7A98A8", fontSize: 11, fontFamily: "inherit" }}
            dy={6}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#7A98A8", fontSize: 11, fontFamily: "inherit" }}
            dx={-4}
            tickFormatter={(v: number) =>
              v >= 1000 ? `${(v / 1000).toFixed(0)}B` : String(v)
            }
          />

          <Tooltip
            content={<CustomTooltip />}
            cursor={{ stroke: "rgba(255,255,255,0.08)", strokeWidth: 1 }}
          />

          <Area
            type="monotone"
            dataKey="dealValue"
            name="Deal Value (AED M)"
            stroke="#1DBFA0"
            strokeWidth={2}
            fill="url(#dealValueFill)"
            dot={false}
            activeDot={{
              r: 4,
              fill: "#1DBFA0",
              stroke: "#071017",
              strokeWidth: 2,
            }}
          />

          <Area
            type="monotone"
            dataKey="clientCount"
            name="Client Count"
            stroke="#C4B8A8"
            strokeWidth={2}
            fill="url(#clientCountFill)"
            dot={false}
            activeDot={{
              r: 4,
              fill: "#C4B8A8",
              stroke: "#071017",
              strokeWidth: 2,
            }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
