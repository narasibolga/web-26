"use client";

import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";

const frameVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

const drawVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 0.5, ease: "easeOut" as const, delay },
  }),
};

export function GalleryEmptyIllustration() {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <svg
        viewBox="0 0 120 120"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-24 w-24"
        aria-hidden="true"
      >
        <rect x="14" y="18" width="92" height="84" rx="8" />
        <circle cx="86" cy="42" r="7" className="fill-primary" />
        <path
          d="M14 80 L40 54 L58 70 L78 48 L106 76"
          className="fill-primary/20"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 120 120"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-24 w-24"
      aria-hidden="true"
    >
      <m.rect
        x="14"
        y="18"
        width="92"
        height="84"
        rx="8"
        variants={frameVariants}
        initial="hidden"
        animate="visible"
      />
      <m.circle
        cx="86"
        cy="42"
        r="7"
        className="fill-primary"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.85, 1, 0.85],
          y: [0, -3, 0],
        }}
        transition={{
          duration: 2.4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{ transformOrigin: "86px 42px" }}
      />
      <m.path
        d="M14 80 L40 54 L58 70 L78 48 L106 76"
        className="fill-primary/20"
        variants={drawVariants}
        initial="hidden"
        animate="visible"
        custom={0.3}
      />
      <m.path
        d="M58 70 L70 58 L78 48 L106 76"
        className="fill-primary/20"
        variants={drawVariants}
        initial="hidden"
        animate="visible"
        custom={0.45}
      />
    </svg>
  );
}
