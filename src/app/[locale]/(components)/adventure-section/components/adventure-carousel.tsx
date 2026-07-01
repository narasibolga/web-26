"use client";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { AdventureCard } from "./adventure-card";

const items = [
  {
    title: "Pelabuhan Lama",
    imageSrc:
      "https://images.unsplash.com/photo-1519046904884-53103b34b206?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Hiking adventure",
  },
  {
    title: "Pulau Poncan",
    imageSrc:
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Lake activities",
  },
  {
    title: "Kalimantung",
    imageSrc:
      "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Outdoor sports",
  },
  {
    title: "Porambongan",
    imageSrc:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Family leisure",
  },
  {
    title: "Kontrakan Narasibolga",
    imageSrc:
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=800&q=80",
    imageAlt: "Wellness",
  },
];

export function AdventureCarousel() {
  return (
    <Carousel
      opts={{
        align: "start",
        dragFree: true,
      }}
      className="relative"
    >
      <CarouselContent className="-ml-4 md:-ml-6">
        {items.map((item, i) => (
          <CarouselItem
            key={item.title}
            className={cn(
              "basis-[85%] pl-4 sm:basis-1/2 md:basis-[45%] md:pl-6 lg:basis-[32%] xl:basis-[28%] 2xl:basis-[26%]",
              i === 0 && "ml-4 md:ml-8",
              i === items.length - 1 && "mr-4 md:mr-8",
            )}
          >
            <AdventureCard
              title={item.title}
              imageSrc={item.imageSrc}
              imageAlt={item.imageAlt}
              href="/activities"
              exploreLabel="Explore"
            />
          </CarouselItem>
        ))}
      </CarouselContent>

      <div className="mt-10 flex justify-center gap-4">
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
  const onClick = direction === "prev" ? scrollPrev : scrollNext;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className={cn(
        "inline-flex size-10 items-center justify-center rounded-full border border-primary-foreground bg-transparent text-primary-foreground transition-colors hover:bg-primary-foreground/10 disabled:opacity-40",
      )}
    >
      <HugeiconsIcon
        icon={direction === "prev" ? ArrowLeft01Icon : ArrowRight01Icon}
        strokeWidth={2}
      />
    </button>
  );
}
