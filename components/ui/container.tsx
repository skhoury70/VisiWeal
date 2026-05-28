import { cn } from "@/lib/utils";

type ContainerWidth = "default" | "narrow" | "wide";

const widthClasses: Record<ContainerWidth, string> = {
  default: "container-base",
  narrow: "container-narrow",
  wide: "container-wide",
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  width?: ContainerWidth;
  as?: "div" | "section" | "article" | "header" | "footer";
}

function Container({
  className,
  width = "default",
  as: Tag = "div",
  ...props
}: ContainerProps) {
  return (
    <Tag className={cn(widthClasses[width], className)} {...props} />
  );
}

export { Container };
