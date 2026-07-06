"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { categoryColor, type Location, locations } from "@/lib/locations";
import type { ScoredLocation } from "@/lib/pathfinder";

type ResultScreenProps = {
  results: ScoredLocation[];
  onRetake: () => void;
};

export function ResultScreen({ results, onRetake }: ResultScreenProps) {
  const t = useTranslations("pathfinder");
  const tMap = useTranslations("map");
  const locale = useLocale() as "en" | "id";

  return (
    <Container className="items-center gap-4">
      <h2 className="text-center font-heading text-3xl text-foreground italic md:text-4xl">
        {t("resultsTitle")}
      </h2>
      <p className="text-center font-sans text-base text-foreground/70">
        {t("resultsDescription")}
      </p>

      <ol className="flex w-full flex-col gap-4">
        {results.map((result) => {
          const location: Location | undefined = locations.find(
            (l) => l.id === result.locationId,
          );
          if (!location) return null;
          return (
            <li
              key={result.locationId}
              className="flex gap-4 rounded-4xl border border-border p-4"
            >
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl">
                <Image
                  src={location.images[0]}
                  alt={location.name[locale]}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </div>
              <div className="flex min-w-0 flex-col gap-1">
                <span className="flex items-center gap-1.5 font-sans text-foreground/70 text-xs uppercase tracking-tight">
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-[1px]"
                    style={{
                      backgroundColor: categoryColor[location.category],
                    }}
                  />
                  {tMap(`kategori.${location.category}`)}
                </span>
                <h3 className="font-serif text-foreground text-lg leading-snug">
                  {location.name[locale]}
                </h3>
                <p className="font-sans text-foreground/70 text-sm leading-relaxed">
                  {location.description[locale]}
                </p>
                <Button
                  variant="outline-foreground"
                  size="sm"
                  className="mt-2 w-fit"
                  render={<Link href={`/map?location=${result.locationId}`} />}
                  nativeButton={false}
                >
                  {t("openInMap")}
                  <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
                </Button>
              </div>
            </li>
          );
        })}
      </ol>

      <Button variant="outline-foreground" onClick={onRetake}>
        {t("retake")}
      </Button>
    </Container>
  );
}
