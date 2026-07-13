"use client";

import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import type { ResolvedArchetype, ScoredLocation } from "@/lib/pathfinder";
import { ResultScreen } from "./result-screen";

type ResultIntroProps = {
  resolved: ResolvedArchetype;
  results: ScoredLocation[];
  onRetake: () => void;
};

const CURTAIN_LIFT_MS = 3000;

export function ResultIntro({ resolved, results, onRetake }: ResultIntroProps) {
  const t = useTranslations("pathfinder");
  const reducedMotion = useReducedMotion();
  const [phase, setPhase] = useState<"title" | "reveal">(
    reducedMotion ? "reveal" : "title",
  );

  useEffect(() => {
    if (phase !== "title") return;
    const id = setTimeout(() => setPhase("reveal"), CURTAIN_LIFT_MS);
    return () => clearTimeout(id);
  }, [phase]);

  const name = t(`archetypes.${resolved.code}.name` as const);

  return (
    <>
      <AnimatePresence>
        {phase === "title" && (
          <m.div
            key="title-overlay"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-primary"
          >
            <div className="flex flex-col items-center gap-5">
              <m.span
                initial={reducedMotion ? undefined : { opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 1.0 }}
                className="inline-flex items-center justify-center bg-background px-4 py-2 text-2xl text-primary"
              >
                {resolved.code}
              </m.span>
              <m.h2
                initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 2.2 }}
                className="font-heading text-4xl text-primary-foreground"
              >
                {name}
              </m.h2>
            </div>
          </m.div>
        )}
      </AnimatePresence>
      {phase === "reveal" && (
        <ResultScreen
          resolved={resolved}
          results={results}
          onRetake={onRetake}
        />
      )}
    </>
  );
}
