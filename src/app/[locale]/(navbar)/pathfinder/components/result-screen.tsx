"use client";

import { RefreshIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Variants } from "motion/react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  type ArchetypeCode,
  archetypes,
  type ResolvedArchetype,
  type ScoredLocation,
} from "@/lib/pathfinder";
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
      className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:gap-12"
    >
      <m.header variants={retakeVariants} className="flex justify-center">
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
        className="flex flex-col gap-6"
      >
        <m.div variants={blockVariants(0.04)} className="flex flex-col gap-4">
          <m.p
            variants={itemVariants}
            className="inline-flex w-fit items-center justify-center bg-primary px-4 py-2 text-primary-foreground text-xl md:text-2xl"
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
            <m.span key={trait} variants={itemVariants}>
              <Badge variant="outline" className="lowercase">
                {trait}
              </Badge>
            </m.span>
          ))}
        </m.div>
      </m.section>

      <m.section
        initial={initial}
        animate="visible"
        variants={asideVariants}
        className="flex flex-col gap-4"
      >
        <m.h3
          variants={itemVariants}
          className="font-sans text-foreground/60 text-sm"
        >
          {t("yourPlaces", { name })}
        </m.h3>
        <m.ul
          variants={blockVariants(0.06)}
          className="grid grid-cols-1 gap-4 md:grid-cols-4"
        >
          {results.map((result) => (
            <m.li key={result.locationId} variants={itemVariants}>
              <LocationCard result={result} />
            </m.li>
          ))}
        </m.ul>
      </m.section>
    </m.div>
  );
}
