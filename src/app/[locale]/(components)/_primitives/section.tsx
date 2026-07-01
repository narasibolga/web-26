import type { useRender } from "@base-ui/react/use-render";
import type { ReactNode } from "react";
import { Container } from "@/components/layout/container";

type SectionProps = {
  className?: string;
  containerClassName?: string;
  containerRender?: useRender.RenderProp;
  children: ReactNode;
};

export const Section = ({
  className,
  containerClassName,
  containerRender,
  children,
}: SectionProps) => (
  <section className={className}>
    <Container className={containerClassName} render={containerRender}>
      {children}
    </Container>
  </section>
);
