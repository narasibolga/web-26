import { domAnimation, LazyMotion } from "motion/react";

export const Providers = (props: { children: React.ReactNode }) => (
  <LazyMotion features={domAnimation}>{props.children}</LazyMotion>
);
