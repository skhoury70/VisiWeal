import { cn } from "@/lib/utils";

type SectionPadding = "default" | "sm" | "lg" | "none";

const paddingClasses: Record<SectionPadding, string> = {
  default: "section-padding",
  sm: "section-padding-sm",
  lg: "py-36 md:py-44",
  none: "py-0",
};

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  padding?: SectionPadding;
  withBorder?: boolean;
  as?: "section" | "div" | "article" | "header" | "footer";
}

function Section({
  className,
  padding = "default",
  withBorder = false,
  as: Tag = "section",
  children,
  ...props
}: SectionProps) {
  return (
    <Tag
      className={cn(
        "relative overflow-hidden",
        paddingClasses[padding],
        withBorder && "border-t border-border",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

export { Section };
