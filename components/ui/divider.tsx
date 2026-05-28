import { cn } from "@/lib/utils";

type DividerVariant = "default" | "subtle" | "brand" | "strong";
type DividerOrientation = "horizontal" | "vertical";

const variantClasses: Record<DividerVariant, string> = {
  default: "bg-border",
  subtle: "bg-border-subtle",
  brand: "bg-border-brand",
  strong: "bg-border-strong",
};

interface DividerProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: DividerVariant;
  orientation?: DividerOrientation;
  label?: string;
}

function Divider({
  className,
  variant = "default",
  orientation = "horizontal",
  label,
  ...props
}: DividerProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={cn("inline-block h-full min-h-4 w-px", variantClasses[variant], className)}
        {...props}
      />
    );
  }

  if (label) {
    return (
      <div className={cn("flex items-center gap-4", className)} {...props}>
        <span className={cn("h-px flex-1", variantClasses[variant])} />
        <span className="text-caption uppercase tracking-[0.2em] text-text-quaternary">
          {label}
        </span>
        <span className={cn("h-px flex-1", variantClasses[variant])} />
      </div>
    );
  }

  return (
    <div className={cn("h-px w-full", variantClasses[variant], className)} {...props} />
  );
}

export { Divider };
