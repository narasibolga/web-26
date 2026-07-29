"use client";

import { ArrowLeft01Icon, ExternalLinkIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { LocationImagePlaceholder } from "@/components/location-image-placeholder";
import { Button } from "@/components/ui/button";
import { buttonVariants } from "@/components/ui/button-variants";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Separator } from "@/components/ui/separator";
import { formatLocaleDate } from "@/lib/datetime";
import {
  categoryColor,
  formatCoord,
  type LocalizedText,
} from "@/lib/locations";
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
      {item.images && item.images.length > 0 ? (
        <div className="overflow-hidden border-border border-b">
          <Carousel opts={{ loop: true }}>
            <CarouselContent className="ml-0">
              {item.images.map((src, i) => (
                <CarouselItem key={src} className="pl-0">
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
              label={t("carousel.previous")}
              variant="secondary"
              className="left-1 border-border bg-background text-foreground hover:bg-muted"
            />
            <CarouselNext
              label={t("carousel.next")}
              variant="secondary"
              className="right-1 border-border bg-background text-foreground hover:bg-muted"
            />
          </Carousel>
        </div>
      ) : item.category ? (
        <LocationImagePlaceholder
          category={item.category}
          name={item.label[locale]}
          className="aspect-4/3 w-full border-border border-b"
        />
      ) : null}

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
        <p className="font-sans text-base text-foreground/80 leading-relaxed">
          {item.description[locale]}
        </p>
      )}

      {item.address && (
        <DetailSection title={t("detail.address")}>
          <p className="font-sans text-base text-foreground leading-relaxed">
            {item.address}
          </p>
        </DetailSection>
      )}

      {item.visitInfo && (
        <DetailSection title={t("detail.plan")}>
          <dl className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            <LocalizedRow
              label={t("detail.admission")}
              value={item.visitInfo.admission}
              locale={locale}
            />
            <LocalizedRow
              label={t("detail.openingHours")}
              value={item.visitInfo.openingHours}
              locale={locale}
            />
            <LocalizedRow
              label={t("detail.bestTime")}
              value={item.visitInfo.bestTime}
              locale={locale}
            />
            <LocalizedRow
              label={t("detail.visitDuration")}
              value={item.visitInfo.visitDuration}
              locale={locale}
            />
            <LocalizedRow
              label={t("detail.checkIn")}
              value={item.visitInfo.checkIn}
              locale={locale}
            />
            <LocalizedRow
              label={t("detail.checkOut")}
              value={item.visitInfo.checkOut}
              locale={locale}
            />
            {item.visitInfo.contact && (
              <Row label={t("detail.contact")} value={item.visitInfo.contact} />
            )}
            <LocalizedRow
              label={t("detail.suitableFor")}
              value={item.visitInfo.suitableFor}
              locale={locale}
            />
            <LocalizedRow
              label={t("detail.menu")}
              value={item.visitInfo.menu}
              locale={locale}
            />
            <LocalizedRow
              label={t("detail.flavor")}
              value={item.visitInfo.flavor}
              locale={locale}
            />
            <LocalizedRow
              label={t("detail.featuredProduct")}
              value={item.visitInfo.featuredProduct}
              locale={locale}
            />
            <LocalizedRow
              label={t("detail.products")}
              value={item.visitInfo.products}
              locale={locale}
            />
            <LocalizedRow
              label={t("detail.advantages")}
              value={item.visitInfo.advantages}
              locale={locale}
            />
          </dl>
        </DetailSection>
      )}

      {item.activities && item.activities.length > 0 && (
        <TextList
          title={t("detail.activities")}
          items={item.activities}
          locale={locale}
        />
      )}

      {item.facilities && item.facilities.length > 0 && (
        <TextList
          title={t("detail.facilities")}
          items={item.facilities}
          locale={locale}
        />
      )}

      {item.notes && item.notes.length > 0 && (
        <TextList
          title={t("detail.notes")}
          items={item.notes}
          locale={locale}
        />
      )}

      {item.visitInfo && (
        <p className="font-sans text-muted-foreground text-xs leading-relaxed">
          {t("detail.disclaimer")}
        </p>
      )}
    </>
  );
}

function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <Separator />
      <h3 className="font-serif text-foreground text-xl">{title}</h3>
      {children}
    </section>
  );
}

function TextList({
  title,
  items,
  locale,
}: {
  title: string;
  items: LocalizedText[];
  locale: "en" | "id";
}) {
  return (
    <DetailSection title={title}>
      <ul className="grid grid-cols-1 gap-x-5 gap-y-2 sm:grid-cols-2">
        {items.map((item) => (
          <li
            key={`${item.en}-${item.id}`}
            className="flex gap-2 font-sans text-foreground/80 text-sm leading-relaxed"
          >
            <span aria-hidden="true" className="text-muted-foreground">
              —
            </span>
            {item[locale]}
          </li>
        ))}
      </ul>
    </DetailSection>
  );
}

function LocalizedRow({
  label,
  value,
  locale,
}: {
  label: string;
  value?: LocalizedText;
  locale: "en" | "id";
}) {
  if (!value) return null;
  return <Row label={label} value={value[locale]} />;
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
