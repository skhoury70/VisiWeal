export default function SectionDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`relative my-16 ${className}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
    </div>
  );
}
