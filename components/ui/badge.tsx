import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] transition-colors duration-300",
  {
    variants: {
      variant: {
        default:
          "border-border text-text-secondary",
        brand:
          "border-border-brand text-brand-400",
        glass:
          "border-border-strong bg-white/[0.04] text-text-secondary backdrop-blur-sm",
        outline:
          "border-border text-text-tertiary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}

export { Badge, badgeVariants };
