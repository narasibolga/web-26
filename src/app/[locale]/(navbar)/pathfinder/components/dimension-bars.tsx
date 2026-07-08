"use client";

import type { Variants } from "motion/react";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";
import {
  type ArchetypeCode,
  archetypes,
  type Orientation,
  type Pace,
  type Range,
  type ResolvedArchetype,
} from "@/lib/pathfinder";
import { cn } from "@/lib/utils";

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

export function DimensionBars({ resolved }: { resolved: ResolvedArchetype }) {
  const t = useTranslations("pathfinder");
  const archetype = archetypes[resolved.code as ArchetypeCode];

  return (
    <m.div variants={blockVariants(0.06)} className="mt-2 flex flex-col gap-3">
      <m.span
        variants={itemVariants}
        className="font-sans text-foreground/60 text-sm"
      >
        {t("resultsDescription")}
      </m.span>
      <m.div variants={itemVariants}>
        <DimensionBar
          label={t("dimensions.pace")}
          left={{
            key: "adventurous",
            label: t("traits.pace.adventurous"),
            score: resolved.totals.pace.adventurous,
          }}
          right={{
            key: "relaxed",
            label: t("traits.pace.relaxed"),
            score: resolved.totals.pace.relaxed,
          }}
          winner={archetype.pace}
        />
      </m.div>
      <m.div variants={itemVariants}>
        <DimensionBar
          label={t("dimensions.orientation")}
          left={{
            key: "curious",
            label: t("traits.orientation.curious"),
            score: resolved.totals.orientation.curious,
          }}
          right={{
            key: "social",
            label: t("traits.orientation.social"),
            score: resolved.totals.orientation.social,
          }}
          winner={archetype.orientation}
        />
      </m.div>
      <m.div variants={itemVariants}>
        <DimensionBar
          label={t("dimensions.range")}
          left={{
            key: "far",
            label: t("traits.range.far"),
            score: resolved.totals.range.far,
          }}
          right={{
            key: "near",
            label: t("traits.range.near"),
            score: resolved.totals.range.near,
          }}
          winner={archetype.range}
        />
      </m.div>
    </m.div>
  );
}

function DimensionBar({
  label,
  left,
  right,
  winner,
}: {
  label: string;
  left: {
    key: Pace | Orientation | Range | string;
    label: string;
    score: number;
  };
  right: {
    key: Pace | Orientation | Range | string;
    label: string;
    score: number;
  };
  winner: Pace | Orientation | Range;
}) {
  const total = left.score + right.score;
  const leftPct = total > 0 ? (left.score / total) * 100 : 50;

  return (
    <div className="flex flex-col gap-3 rounded-3xl border border-border bg-background p-4 md:p-5">
      <span className="font-sans text-foreground/50 text-xs tracking-normal">
        {label}
      </span>
      <div className="relative h-2 w-full rounded-full bg-muted">
        <div
          className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 h-3 w-3 rounded-full bg-secondary transition-all"
          style={{ left: `${leftPct}%` }}
        />
      </div>
      <div className="flex justify-between font-sans text-sm">
        <span
          className={cn(
            "transition-colors",
            winner === left.key
              ? "font-medium text-foreground"
              : "text-foreground/50",
          )}
        >
          {left.label}
        </span>
        <span
          className={cn(
            "transition-colors",
            winner === right.key
              ? "font-medium text-foreground"
              : "text-foreground/50",
          )}
        >
          {right.label}
        </span>
      </div>
    </div>
  );
}
