"use client";

import { RefreshIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Variants } from "motion/react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  type ArchetypeCode,
  archetypes,
  type ResolvedArchetype,
  type ScoredLocation,
} from "@/lib/pathfinder";
import { DimensionBars } from "./dimension-bars";
import { LocationCard } from "./location-card";

type ResultScreenProps = {
  resolved: ResolvedArchetype;
  results: ScoredLocation[];
  onRetake: () => void;
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" },
  },
};

const blockVariants = (stagger: number): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger },
  },
});

const rootVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.08 },
  },
};

const asideVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeOut", staggerChildren: 0.06 },
  },
};

const retakeVariants: Variants = {
  hidden: { opacity: 0, y: -8 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export function ResultScreen({
  resolved,
  results,
  onRetake,
}: ResultScreenProps) {
  const t = useTranslations("pathfinder");
  const reducedMotion = useReducedMotion();
  const initial = reducedMotion ? "visible" : "hidden";

  const archetype = archetypes[resolved.code as ArchetypeCode];
  const name = t(`archetypes.${resolved.code}.name` as const);
  const blurb = t(`archetypes.${resolved.code}.blurb` as const);

  const traits = [
    t(`traits.pace.${archetype.pace}` as const),
    t(`traits.orientation.${archetype.orientation}` as const),
    t(`traits.range.${archetype.range}` as const),
  ];

  return (
    <m.div
      initial={initial}
      animate="visible"
      variants={rootVariants}
      className="mx-auto grid w-full max-w-5xl gap-10 lg:grid-cols-3 lg:gap-12"
    >
      <m.header
        variants={retakeVariants}
        className="flex justify-center lg:col-span-3"
      >
        <Button
          variant="outline-foreground"
          size="lg"
          onClick={onRetake}
          className="rounded-full"
        >
          <HugeiconsIcon icon={RefreshIcon} />
          {t("retake")}
        </Button>
      </m.header>

      <m.section
        initial={initial}
        animate="visible"
        variants={sectionVariants}
        className="flex flex-col gap-6 lg:col-span-2"
      >
        <m.div variants={blockVariants(0.04)} className="flex flex-col gap-4">
          <m.p
            variants={itemVariants}
            className="text-muted-foreground text-xl md:text-2xl"
          >
            {resolved.code}
          </m.p>
          <m.h2
            variants={itemVariants}
            className="font-heading text-4xl text-foreground"
          >
            {name}
          </m.h2>
          <m.p
            variants={itemVariants}
            className="max-w-xl font-sans text-base text-foreground/70 leading-relaxed md:text-lg"
          >
            {blurb}
          </m.p>
        </m.div>

        <m.div variants={blockVariants(0.05)} className="flex flex-wrap gap-2">
          {traits.map((trait) => (
            <m.span
              key={trait}
              variants={itemVariants}
              className="rounded-full border border-border bg-background px-4 py-1.5 font-sans text-foreground/70 text-sm lowercase"
            >
              {trait}
            </m.span>
          ))}
        </m.div>

        <DimensionBars resolved={resolved} />
      </m.section>

      <m.aside
        initial={initial}
        animate="visible"
        variants={asideVariants}
        className="flex flex-col gap-4 lg:col-span-1"
      >
        <m.h3
          variants={itemVariants}
          className="font-sans text-foreground/60 text-sm"
        >
          {t("yourPlaces", { name })}
        </m.h3>
        <m.ul variants={blockVariants(0.06)} className="flex flex-col gap-4">
          {results.map((result) => (
            <m.li key={result.locationId} variants={itemVariants}>
              <LocationCard result={result} />
            </m.li>
          ))}
        </m.ul>
      </m.aside>
    </m.div>
  );
}
