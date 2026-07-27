"use client";

import {
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ExternalLinkIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import Link from "next/link";

type PlanningStop = {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

type PlanningStopsCarouselProps = {
  stops: PlanningStop[];
  openMapLabel: string;
};

export function PlanningStopsCarousel({
  stops,
  openMapLabel,
}: PlanningStopsCarouselProps) {
  return (
    <Carousel
      opts={{ align: "start", dragFree: true }}
      className="mt-8 w-full sm:mt-10"
    >
      <CarouselContent className="-ml-4 md:-ml-6">
        {stops.map((stop, index) => (
          <CarouselItem
            key={stop.href}
            className={cn(
              "basis-[85%] pl-4 sm:basis-1/2 md:basis-[45%] md:pl-6 lg:basis-[32%] xl:basis-[28%] 2xl:basis-[26%]",
              index === 0 && "ml-2 sm:ml-4 md:ml-8",
              index === stops.length - 1 && "mr-2 sm:mr-4 md:mr-8",
            )}
          >
            <article className="group relative h-80 overflow-hidden rounded-2xl md:h-104">
              <Image
                src={stop.imageSrc}
                alt={stop.imageAlt}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 45vw, 28vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-5 p-6">
                <h4 className="font-serif text-2xl text-white">{stop.name}</h4>
                <Button
                  variant="tertiary"
                  nativeButton={false}
                  className="w-full"
                  render={
                    <Link
                      href={stop.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${openMapLabel}: ${stop.name}`}
                    />
                  }
                >
                  {openMapLabel}
                  <HugeiconsIcon
                    icon={ExternalLinkIcon}
                    data-icon="inline-end"
                  />
                </Button>
              </div>
            </article>
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-8 flex justify-center gap-4 sm:mt-10">
        <CarouselArrow direction="prev" />
        <CarouselArrow direction="next" />
      </div>
    </Carousel>
  );
}

function CarouselArrow({ direction }: { direction: "prev" | "next" }) {
  const { scrollPrev, scrollNext, canScrollPrev, canScrollNext } =
    useCarousel();
  const disabled = direction === "prev" ? !canScrollPrev : !canScrollNext;

  return (
    <Button
      type="button"
      variant="outline-foreground"
      size="icon-lg"
      onClick={direction === "prev" ? scrollPrev : scrollNext}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className="rounded-full"
    >
      <HugeiconsIcon
        icon={direction === "prev" ? ArrowLeft01Icon : ArrowRight01Icon}
        strokeWidth={2}
      />
    </Button>
  );
}
