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
import { AdventureCard, type AdventureCardProps } from "./adventure-card";

type AdventureCarouselProps = {
  items: Pick<AdventureCardProps, "title" | "imageSrc" | "imageAlt" | "href">[];
  exploreLabel: string;
};

export function AdventureCarousel({
  items,
  exploreLabel,
}: AdventureCarouselProps) {
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
              href={item.href}
              exploreLabel={exploreLabel}
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
