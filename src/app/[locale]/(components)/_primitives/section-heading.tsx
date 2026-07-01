import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export const SectionHeading = ({
  className,
  ...props
}: ComponentProps<"h2">) => (
  <h2 className={cn("font-serif text-5xl", className)} {...props} />
);
