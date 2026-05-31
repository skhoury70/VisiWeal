import { cn } from "@/lib/utils";

type GlowSize = "sm" | "md" | "lg";
type GlowIntensity = "subtle" | "default" | "strong";

const sizeClasses: Record<GlowSize, string> = {
  sm: "h-[40vh] w-[30vw]",
  md: "h-[60vh] w-[40vw]",
  lg: "h-[80vh] w-[60vw]",
};

const intensityClasses: Record<GlowIntensity, string> = {
  subtle: "from-glow-teal-subtle via-glow-teal/5 to-transparent",
  default: "from-glow-teal via-glow-teal/8 to-transparent",
  strong: "from-glow-teal-strong via-glow-teal/10 to-transparent",
};

interface GlowProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: GlowSize;
  intensity?: GlowIntensity;
  animation?: "shift" | "secondary" | "none";
  blur?: "default" | "heavy";
}

function Glow({
  className,
  size = "md",
  intensity = "default",
  animation = "none",
  blur = "default",
  ...props
}: GlowProps) {
  const blurClass = blur === "heavy" ? "glow-orb" : "glow-orb-md";
  const animClass =
    animation === "shift"
      ? "animate-gradient-shift"
      : animation === "secondary"
        ? "animate-gradient-secondary"
        : "";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute rounded-full bg-gradient-to-br",
        sizeClasses[size],
        intensityClasses[intensity],
        blurClass,
        animClass,
        className,
      )}
      {...props}
    />
  );
}

export { Glow };
