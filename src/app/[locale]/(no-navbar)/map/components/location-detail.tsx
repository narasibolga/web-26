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
import { categoryColor, type Location } from "@/lib/locations";
import { cn } from "@/lib/utils";

type LocationDetailProps = {
  location: Location;
  onBack: () => void;
  locale: "en" | "id";
};

export function LocationDetail({
  location,
  onBack,
  locale,
}: LocationDetailProps) {
  const t = useTranslations("map");
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;

  return (
    <div className="flex h-full min-w-0 flex-col gap-3 p-4">
      <Button variant="tertiary" className="w-fit" onClick={onBack}>
        <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
        {t("backToList")}
      </Button>

      <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-y-auto">
        <h2 className="font-serif text-4xl text-secondary-foreground leading-tight">
          {location.name[locale]}
        </h2>

        <div className="overflow-hidden border-secondary-foreground/15 border-b">
          <Carousel opts={{ loop: true }}>
            <CarouselContent className="ml-0">
              {location.images.map((src, i) => (
                // biome-ignore lint/suspicious/noArrayIndexKey: gallery order is stable
                <CarouselItem key={i} className="pl-0">
                  <div className="relative aspect-4/3 w-full overflow-hidden bg-secondary-foreground/10">
                    <Image
                      src={src}
                      alt={`${location.name[locale]} — ${i + 1}`}
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
              className="left-1 border-secondary-foreground/20 bg-secondary text-secondary-foreground hover:bg-secondary-foreground/10"
            />
            <CarouselNext
              variant="secondary"
              className="right-1 border-secondary-foreground/20 bg-secondary text-secondary-foreground hover:bg-secondary-foreground/10"
            />
          </Carousel>
        </div>

        <span className="flex items-center gap-1.5 font-sans text-secondary-foreground/70 text-xs uppercase tracking-tight">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-[1px]"
            style={{ backgroundColor: categoryColor[location.category] }}
          />
          {t(`kategori.${location.category}`)}
        </span>

        <p className="font-sans text-base text-secondary-foreground/80 leading-relaxed">
          {location.description[locale]}
        </p>

        <a
          href={mapsUrl}
          target="_blank"
          rel="noreferrer"
          className={cn(
            buttonVariants({
              variant: "outline-foreground",
              size: "sm",
            }),
            "mt-4 w-fit border-secondary-foreground/30 text-secondary-foreground hover:bg-secondary-foreground/10 hover:text-secondary-foreground",
          )}
        >
          {t("viewInGoogleMaps")}
          <HugeiconsIcon icon={ExternalLinkIcon} size={14} />
        </a>
      </div>
    </div>
  );
}
