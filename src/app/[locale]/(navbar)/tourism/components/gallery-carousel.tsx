"use client";

import { ArrowLeft01Icon, ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

type GalleryImage = {
  src: string;
  alt: string;
};

export function GalleryCarousel({ images }: { images: GalleryImage[] }) {
  return (
    <Carousel opts={{ align: "start", dragFree: true }} className="mt-8 w-full">
      <CarouselContent className="-ml-4 md:-ml-6">
        {images.map((image, index) => (
          <CarouselItem
            key={image.src}
            className={cn(
              "basis-[85%] pl-4 sm:basis-1/2 md:basis-[45%] md:pl-6 lg:basis-[32%] xl:basis-[28%] 2xl:basis-[26%]",
              index === 0 && "ml-4 md:ml-8",
              index === images.length - 1 && "mr-4 md:mr-8",
            )}
          >
            <article className="relative h-72 overflow-hidden rounded-2xl md:h-96 lg:h-[28rem]">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(max-width: 640px) 85vw, (max-width: 768px) 50vw, (max-width: 1024px) 45vw, 28vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </article>
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

  return (
    <button
      type="button"
      onClick={direction === "prev" ? scrollPrev : scrollNext}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
      className="inline-flex size-10 items-center justify-center rounded-full border border-foreground bg-transparent text-foreground transition-colors hover:bg-foreground/10 disabled:opacity-40"
    >
      <HugeiconsIcon
        icon={direction === "prev" ? ArrowLeft01Icon : ArrowRight01Icon}
        strokeWidth={2}
      />
    </button>
  );
}
