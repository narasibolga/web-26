"use client";

import { ArrowLeft01Icon, ExternalLinkIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { formatLocaleDate } from "@/lib/datetime";
import { categoryColor, formatCoord } from "@/lib/locations";
import { cn } from "@/lib/utils";
import { hazardColor, type MapItem } from "../lib/hazard";

type LocationDetailProps = {
  item: MapItem;
  onBack: () => void;
  locale: "en" | "id";
};

export function LocationDetail({ item, onBack, locale }: LocationDetailProps) {
  const t = useTranslations("map");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`;
  const color = item.severity ? hazardColor[item.severity] : undefined;

  const heading =
    item.mode === "hazard" && item.quake
      ? `M${item.quake.magnitude.toFixed(1)}`
      : item.label[locale];

  return (
    <div className="flex h-full min-w-0 flex-col gap-3 bg-background p-4 text-foreground">
      <Button variant="link" size="none" className="w-fit" onClick={onBack}>
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        {t("backToList")}
      </Button>

      <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto">
        <h2 className="font-serif text-3xl text-foreground leading-tight">
          {heading}
        </h2>

        {color && (
          <span className="flex items-center gap-1.5 font-sans text-muted-foreground text-xs uppercase tracking-tight">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 rounded-[1px]"
              style={{ backgroundColor: color }}
            />
            {t(`severity.${item.severity}`)}
          </span>
        )}

        {item.mode === "hazard" && item.quake ? (
          <HazardDetailBody quake={item.quake} locale={locale} />
        ) : (
          <TourismDetailBody item={item} locale={locale} />
        )}

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({
              variant: "outline-foreground",
              size: "sm",
            }),
            "mt-4 w-fit border-border text-foreground hover:bg-muted",
          )}
        >
          {t("viewInGoogleMaps")}
          <HugeiconsIcon icon={ExternalLinkIcon} size={14} />
        </a>
      </div>
    </div>
  );
}

function HazardDetailBody({
  quake,
  locale,
}: {
  quake: NonNullable<MapItem["quake"]>;
  locale: "en" | "id";
}) {
  const t = useTranslations("map");
  return (
    <dl className="flex flex-col gap-3 font-sans text-base text-muted-foreground">
      <Row label={t("quake.region")} value={quake.region} />
      <Row label={t("quake.magnitude")} value={quake.magnitude.toFixed(1)} />
      <Row label={t("quake.depth")} value={`${quake.depth} km`} />
      <Row
        label={t("quake.coordinates")}
        value={formatCoord(quake.lat, quake.lng)}
      />
      <Row
        label={t("quake.datetime")}
        value={formatLocaleDate(quake.datetime, locale, "quakeDateTime")}
      />
      <Row
        label={t("quake.tsunami")}
        value={
          quake.tsunamiPotential ? t("quake.tsunamiYes") : t("quake.tsunamiNo")
        }
      />
      {quake.felt && <Row label={t("quake.felt")} value={quake.felt} />}
    </dl>
  );
}

function TourismDetailBody({
  item,
  locale,
}: {
  item: MapItem;
  locale: "en" | "id";
}) {
  const t = useTranslations("map");
  return (
    <>
      {item.images && (
        <div className="overflow-hidden border-border border-b">
          <Carousel opts={{ loop: true }}>
            <CarouselContent className="ml-0">
              {item.images.map((src, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: images may be duplicate
                <CarouselItem key={`${src}-${i}`} className="pl-0">
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-muted">
                    <Image
                      src={src}
                      alt={`${item.label[locale]} — ${i + 1}`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 340px"
                      className="object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              variant="secondary"
              className="left-1 border-border bg-background text-foreground hover:bg-muted"
            />
            <CarouselNext
              variant="secondary"
              className="right-1 border-border bg-background text-foreground hover:bg-muted"
            />
          </Carousel>
        </div>
      )}

      {item.category && (
        <span className="flex items-center gap-1.5 font-sans text-muted-foreground text-xs uppercase tracking-tight">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-[1px]"
            style={{ backgroundColor: categoryColor[item.category] }}
          />
          {t(`kategori.${item.category}`)}
        </span>
      )}

      {item.description && (
        <p className="font-sans text-base text-muted-foreground leading-relaxed">
          {item.description[locale]}
        </p>
      )}
    </>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5">
      <dt className="font-sans text-muted-foreground text-xs uppercase tracking-tight">
        {label}
      </dt>
      <dd className="font-sans text-foreground">{value}</dd>
    </div>
  );
}
