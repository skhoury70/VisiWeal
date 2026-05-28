export default function DotGrid({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute inset-0 ${className}`}
      style={{
        backgroundImage: "radial-gradient(rgba(29,191,160,0.06) 1px, transparent 1px)",
        backgroundSize: "32px 32px",
      }}
    />
  );
}
