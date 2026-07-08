"use client";

import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { locations } from "@/lib/locations";
import type { ScoredLocation } from "@/lib/pathfinder";

export function LocationCard({ result }: { result: ScoredLocation }) {
  const t = useTranslations("pathfinder");
  const locale = useLocale() as "en" | "id";

  const location = locations.find((l) => l.id === result.locationId);
  if (!location) return null;

  return (
    <Link
      href={`/map?location=${result.locationId}`}
      className="group flex flex-col gap-3 rounded-2xl border border-border bg-background p-3 transition-colors hover:bg-muted/40"
    >
      <div className="relative aspect-4/3 w-full overflow-hidden rounded-xl">
        <Image
          src={location.images[0]}
          alt={location.name[locale]}
          fill
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col gap-2 px-1 pb-1">
        <h4 className="font-heading text-foreground text-lg italic">
          {location.name[locale]}
        </h4>
        <Button
          variant="outline-foreground"
          size="sm"
          className="w-fit"
          render={<span />}
          nativeButton={false}
        >
          {t("openInMap")}
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} />
        </Button>
      </div>
    </Link>
  );
}
