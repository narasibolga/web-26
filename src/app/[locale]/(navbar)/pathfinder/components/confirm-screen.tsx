"use client";

import {
  ArrowLeft01Icon,
  CheckmarkCircle01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";

type ConfirmScreenProps = {
  onBack: () => void;
  onSubmit: () => void;
};

export function ConfirmScreen({ onBack, onSubmit }: ConfirmScreenProps) {
  const t = useTranslations("pathfinder");

  return (
    <Container className="min-h-[80vh] items-center gap-4">
      <h2 className="text-center font-heading text-3xl text-foreground italic md:text-4xl">
        {t("submitConfirmTitle")}
      </h2>
      <p className="text-center font-sans text-base text-foreground/70">
        {t("submitConfirmDescription")}
      </p>

      <div className="flex w-full justify-center gap-3">
        <Button
          variant="outline-foreground"
          size="icon-lg"
          onClick={onBack}
          aria-label={t("back")}
          className="rounded-full border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} />
        </Button>
        <Button
          variant="outline-foreground"
          size="icon-lg"
          onClick={onSubmit}
          aria-label={t("submit")}
          className="rounded-full border-secondary text-secondary hover:bg-secondary/10 hover:text-secondary"
        >
          <HugeiconsIcon icon={CheckmarkCircle01Icon} />
        </Button>
      </div>
    </Container>
  );
}
