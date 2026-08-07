"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

const draw = {
  hidden: { opacity: 0, pathLength: 0 },
  visible: (delay: number) => ({
    opacity: 1,
    pathLength: 1,
    transition: { delay, duration: 0.5, ease: "easeOut" as const },
  }),
};

export function ProgramsComingSoonIllustration() {
  const reducedMotion = useReducedMotion();
  const motionProps = reducedMotion
    ? {}
    : { variants: draw, initial: "hidden", animate: "visible" };

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-24"
      aria-hidden="true"
    >
      <m.path d="M26 22h54l14 14v62H26z" {...motionProps} custom={0} />
      <m.path d="M80 22v14h14" {...motionProps} custom={0.15} />
      <m.path d="M39 50h32" {...motionProps} custom={0.25} />
      <m.path d="M39 62h42" {...motionProps} custom={0.35} />
      <m.path d="M39 74h25" {...motionProps} custom={0.45} />
      <m.circle
        cx="82"
        cy="79"
        r="18"
        className="fill-background"
        {...motionProps}
        custom={0.5}
      />
      <m.path d="M82 69v11l7 4" {...motionProps} custom={0.65} />
      <m.path
        d="M48 92c4-10 13-15 23-13-2 10-10 16-23 13Z"
        className="fill-primary/20"
        {...motionProps}
        custom={0.75}
      />
      <m.path d="M48 92c7-5 13-8 23-13" {...motionProps} custom={0.85} />
    </svg>
  );
}
