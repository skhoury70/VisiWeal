export default function BarChartBars({ className = "" }: { className?: string }) {
  const bars = [40, 65, 45, 85, 55, 70, 60, 90, 50, 75];

  return (
    <div className={`flex items-end gap-[3px] ${className}`}>
      {bars.map((h, i) => (
        <div
          key={i}
          className="w-1 rounded-t-sm bg-gradient-to-t from-teal-900/20 to-teal-500/20"
          style={{
            height: `${h}%`,
            animation: `barRise 1.5s ease-out ${i * 0.1}s forwards`,
            transformOrigin: "bottom",
          }}
        />
      ))}
    </div>
  );
}
