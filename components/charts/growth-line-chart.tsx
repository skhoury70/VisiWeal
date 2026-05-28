"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const data = [
  { quarter: "Q1 2023", clients: 100, markets: 5, dealVolume: 100 },
  { quarter: "Q2 2023", clients: 115, markets: 6, dealVolume: 130 },
  { quarter: "Q3 2023", clients: 128, markets: 7, dealVolume: 145 },
  { quarter: "Q4 2023", clients: 140, markets: 8, dealVolume: 170 },
  { quarter: "Q1 2024", clients: 155, markets: 9, dealVolume: 200 },
  { quarter: "Q2 2024", clients: 172, markets: 10, dealVolume: 230 },
  { quarter: "Q3 2024", clients: 190, markets: 11, dealVolume: 260 },
  { quarter: "Q4 2024", clients: 210, markets: 12, dealVolume: 300 },
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
      <p className="mb-1.5 text-xs font-medium text-[#7A98A8]">{label}</p>
      {payload.map((entry, i) => (
        <p
          key={i}
          className="text-sm font-semibold"
          style={{ color: entry.color ?? "#D8E4E8" }}
        >
          {entry.name}: {entry.value}
          {entry.dataKey === "dealVolume" ? "" : entry.dataKey === "clients" ? " clients" : " markets"}
        </p>
      ))}
    </div>
  );
}

function CustomLegend({ payload }: { payload?: { value: string; color: string }[] }) {
  if (!payload) return null;
  return (
    <div className="flex justify-center gap-6 pt-2">
      {payload.map((entry, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-[11px] text-[#7A98A8]">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

export default function GrowthLineChart() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 12, right: 12, bottom: 4, left: -8 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.05)"
            vertical={false}
          />

          <XAxis
            dataKey="quarter"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#7A98A8", fontSize: 10, fontFamily: "inherit" }}
            dy={6}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#7A98A8", fontSize: 10, fontFamily: "inherit" }}
            dx={-4}
          />

          <Tooltip content={<CustomTooltip />} />

          <Legend content={<CustomLegend />} />

          <Line
            type="monotone"
            dataKey="clients"
            name="Clients"
            stroke="#1DBFA0"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#1DBFA0", stroke: "#071017", strokeWidth: 2 }}
          />

          <Line
            type="monotone"
            dataKey="markets"
            name="Markets"
            stroke="#C4B8A8"
            strokeWidth={2.5}
            dot={false}
            activeDot={{ r: 4, fill: "#C4B8A8", stroke: "#071017", strokeWidth: 2 }}
          />

          <Line
            type="monotone"
            dataKey="dealVolume"
            name="Deal Volume"
            stroke="#4DD8C0"
            strokeWidth={2.5}
            strokeDasharray="4 3"
            dot={false}
            activeDot={{ r: 4, fill: "#4DD8C0", stroke: "#071017", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
