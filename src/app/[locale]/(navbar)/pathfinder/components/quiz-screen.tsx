"use client";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { useTypedLocale } from "@/i18n/navigation";
import type { QuizQuestion } from "@/lib/pathfinder";
import { cn } from "@/lib/utils";

type QuizScreenProps = {
  question: QuizQuestion;
  questionNumber: number;
  total: number;
  selected: string | null;
  direction: number;
  onPick: (answerId: string) => void;
  onPrevious: () => void;
  onNext: () => void;
  isFirst: boolean;
};

export function QuizScreen({
  question,
  questionNumber,
  total,
  selected,
  direction,
  onPick,
  onPrevious,
  onNext,
  isFirst,
}: QuizScreenProps) {
  const t = useTranslations("pathfinder");
  const locale = useTypedLocale();
  const reducedMotion = useReducedMotion();

  return (
    <Container className="min-h-[80vh] items-center gap-8">
      <AnimatePresence mode="popLayout">
        <m.div
          key={question.id}
          initial={
            reducedMotion ? undefined : { x: direction * 80, opacity: 0 }
          }
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="flex w-full flex-col items-center gap-8"
        >
          <p className="font-sans text-foreground/70">
            {t("progress", { n: questionNumber, total })}
          </p>
          <h2 className="text-center font-heading text-3xl text-foreground italic md:text-4xl">
            {question.prompt[locale]}
          </h2>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {question.answers.map((answer) => {
              const isSelected = selected === answer.id;
              return (
                <m.button
                  key={answer.id}
                  type="button"
                  aria-pressed={isSelected}
                  onClick={() => onPick(answer.id)}
                  whileTap={{ scale: 0.97 }}
                  animate={
                    reducedMotion
                      ? undefined
                      : isSelected
                        ? { y: -8, rotate: -2 }
                        : { y: 0, rotate: 0 }
                  }
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 20,
                  }}
                  className={cn(
                    "flex aspect-square h-full w-full max-w-44 items-center justify-center rounded-4xl border p-4 text-center font-sans text-base leading-snug outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/30 md:h-48 md:w-48 md:text-lg",
                    isSelected
                      ? "border-secondary bg-secondary text-secondary-foreground"
                      : "border-foreground/30 bg-transparent hover:bg-secondary/10",
                  )}
                >
                  {answer.label[locale]}
                </m.button>
              );
            })}
          </div>
        </m.div>
      </AnimatePresence>

      <div className="flex w-full justify-center gap-3">
        <Button
          variant="outline-foreground"
          size="icon-lg"
          onClick={onPrevious}
          disabled={isFirst}
          aria-label={t("previous")}
          className="rounded-full border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} />
        </Button>
        <Button
          variant="outline-foreground"
          size="icon-lg"
          onClick={onNext}
          disabled={!selected}
          aria-label={t("next")}
          className="rounded-full border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary"
        >
          <HugeiconsIcon icon={ArrowRight01Icon} />
        </Button>
      </div>
    </Container>
  );
}
