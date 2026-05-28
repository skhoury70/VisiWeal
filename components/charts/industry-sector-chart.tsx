"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const data = [
  { sector: "Technology", value: 28, color: "#4DD8C0" },
  { sector: "Real Estate", value: 22, color: "#1DBFA0" },
  { sector: "Energy", value: 18, color: "#1AA88C" },
  { sector: "Financial Services", value: 16, color: "#0F8E78" },
  { sector: "Healthcare", value: 10, color: "#0C7A66" },
  { sector: "Manufacturing", value: 6, color: "#0A5A4C" },
];

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; payload?: { sector: string } }[];
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="rounded-lg border border-white/[0.07] bg-[#0C1820]/95 px-4 py-3 shadow-lg backdrop-blur-xl">
      <p className="text-xs font-medium text-[#7A98A8]">{d.payload?.sector}</p>
      <p className="text-sm font-semibold text-[#1DBFA0]">{d.value}%</p>
    </div>
  );
}

export default function IndustrySectorChart() {
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 8, right: 48, bottom: 8, left: 8 }}
          barSize={28}
          barGap={12}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(255,255,255,0.04)"
            horizontal={false}
          />

          <XAxis
            type="number"
            domain={[0, 35]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#7A98A8", fontSize: 11, fontFamily: "inherit" }}
            tickFormatter={(v: number) => `${v}%`}
          />

          <YAxis
            type="category"
            dataKey="sector"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#D8E4E8", fontSize: 12, fontFamily: "inherit" }}
            width={120}
          />

          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)" }} />

          <Bar dataKey="value" radius={[0, 6, 6, 0]} minPointSize={4}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
            <LabelList
              dataKey="value"
              position="right"
              formatter={((v: number) => `${v}%`) as never}
              fill="#7A98A8"
              fontSize={12}
              fontFamily="inherit"
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
