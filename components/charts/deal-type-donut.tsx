"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "M&A Advisory", value: 45, color: "#1DBFA0" },
  { name: "Corporate Restructuring", value: 28, color: "#0F8E78" },
  { name: "CFO Advisory", value: 27, color: "#C4B8A8" },
];

const total = data.reduce((acc, d) => acc + d.value, 0);

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: { name?: string; value?: number; payload?: { color: string } }[];
}) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="rounded-lg border border-white/[0.07] bg-[#0C1820]/95 px-4 py-3 shadow-lg backdrop-blur-xl">
      <p className="text-xs font-medium text-[#7A98A8]">{d.name}</p>
      <p className="text-sm font-semibold" style={{ color: d.payload?.color }}>
        {d.value} deals ({((d.value! / total) * 100).toFixed(0)}%)
      </p>
    </div>
  );
}

export default function DealTypeDonut() {
  return (
    <div className="relative h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius="55%"
            outerRadius="80%"
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            stroke="none"
            cornerRadius={4}
            paddingAngle={3}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={entry.color}
                stroke={entry.color}
                strokeWidth={1}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-semibold tracking-tight text-[#D8E4E8]">
            {total}
          </p>
          <p className="text-xs text-[#7A98A8]">Total Deals</p>
        </div>
      </div>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-4">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[10px] text-[#7A98A8]">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
