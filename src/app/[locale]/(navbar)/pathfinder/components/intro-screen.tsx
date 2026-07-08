"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

type IntroScreenProps = {
  onStart: () => void;
};

export function IntroScreen({ onStart }: IntroScreenProps) {
  const t = useTranslations("pathfinder");
  const reducedMotion = useReducedMotion();

  return (
    <Container className="items-center gap-4">
      <m.div
        initial={reducedMotion ? undefined : { y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="flex w-full flex-col items-center gap-4"
      >
        <h2 className="text-center font-heading text-3xl text-foreground italic md:text-4xl">
          {t("introTitle")}
        </h2>
        <p className="max-w-md text-center font-sans text-base text-foreground/70">
          {t("introDescription")}
        </p>
      </m.div>

      <Button
        variant="outline-foreground"
        size="icon-lg"
        onClick={onStart}
        aria-label={t("introStart")}
        className="rounded-full border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary"
      >
        <HugeiconsIcon icon={ArrowRight01Icon} />
      </Button>
    </Container>
  );
}
