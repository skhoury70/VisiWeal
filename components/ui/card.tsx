import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const cardVariants = cva(
  "rounded-xl transition-all duration-500",
  {
    variants: {
      variant: {
        default:
          "border border-border bg-[var(--color-surface)]",
        elevated:
          "border border-border-strong bg-[var(--color-surface)] shadow-card hover:shadow-card-hover",
        glass:
          "border border-border-strong bg-white/[0.05] backdrop-blur-xl",
        bordered:
          "border border-border bg-transparent",
        ghost:
          "border-transparent bg-transparent",
        interactive:
          "border border-border bg-[var(--color-surface)] shadow-card cursor-pointer hover:border-border-strong hover:bg-surface-raised hover:shadow-card-hover",
      },
      padding: {
        none: "p-0",
        sm: "p-6",
        md: "p-8",
        lg: "p-10 md:p-12",
        xl: "p-12 md:p-16",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

function Card({ className, variant, padding, ...props }: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding, className }))}
      {...props}
    />
  );
}

export { Card, cardVariants };
