"use client";

import { ArrowRight02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { AnimatePresence, useReducedMotion } from "motion/react";
import * as m from "motion/react-m";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Container } from "@/components/layout/container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link } from "@/i18n/navigation";
import {
  type GalleryPhoto,
  type GalleryWeekKey,
  galleryImagePath,
  getAllWeekKeys,
  getWeekPhotos,
} from "@/lib/gallery";
import { cn } from "@/lib/utils";
import { GalleryEmptyIllustration } from "./gallery-empty-illustration";
import { Lightbox } from "./lightbox";

export function GalleryClient() {
  const t = useTranslations("gallery");
  const tNav = useTranslations("navbar");
  const reducedMotion = useReducedMotion();
  const [activeWeek, setActiveWeek] = useState<GalleryWeekKey>("week-1");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const allWeeks = useMemo(() => getAllWeekKeys(), []);
  const photos = useMemo<GalleryPhoto[]>(
    () => getWeekPhotos(activeWeek),
    [activeWeek],
  );

  const weekLabel = (key: GalleryWeekKey) => {
    const n = Number(key.replace("week-", ""));
    return t("week", { n });
  };

  return (
    <>
      <section className="relative">
        <div className="relative flex min-h-[80vh] flex-col justify-end pb-6">
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/gallery/cover.webp"
              alt={t("hero.imageAlt")}
              fill
              priority
              className="pointer-events-none h-full w-full select-none object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/40" />
          </div>

          <h1 className="z-10 mt-auto mb-4 text-center font-serif text-5xl text-shadow-2xs text-white tracking-tighter">
            {t("hero.heading")}
          </h1>

          <div className="z-10 flex flex-wrap items-center justify-center gap-4">
            {allWeeks.map((key) => (
              <Button
                key={key}
                variant="link"
                size="none"
                onClick={() => setActiveWeek(key)}
                className={cn(
                  "text-white uppercase",
                  activeWeek === key && "underline",
                )}
              >
                {weekLabel(key)}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-background">
        <Container className="pt-8">
          <Breadcrumb className="flex justify-center uppercase">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink render={<Link href="/" />}>
                  {tNav("links.home")}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
              </BreadcrumbSeparator>
              <BreadcrumbItem>
                <BreadcrumbPage>{tNav("links.gallery")}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="min-h-[40vh]">
            <AnimatePresence mode="wait">
              {photos.length === 0 ? (
                <m.div
                  key={`${activeWeek}-empty`}
                  initial={reducedMotion ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mx-auto max-w-md rounded-xs"
                >
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia>
                        <GalleryEmptyIllustration />
                      </EmptyMedia>
                      <EmptyTitle>{t("empty.title")}</EmptyTitle>
                      <EmptyDescription>
                        {t("empty.description")}
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                </m.div>
              ) : (
                <m.div
                  key={activeWeek}
                  className="columns-1 gap-4 *:mb-4 sm:columns-2 lg:columns-4"
                  initial={reducedMotion ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reducedMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {photos.map((photo, i) => (
                    <m.button
                      key={`${activeWeek}-${photo.id}`}
                      type="button"
                      onClick={() => setLightboxIndex(i)}
                      onContextMenu={(e) => e.preventDefault()}
                      initial={
                        reducedMotion ? undefined : { opacity: 0, y: 12 }
                      }
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.25,
                        delay: reducedMotion ? 0 : i * 0.04,
                        ease: "easeOut",
                      }}
                      className="group relative block w-full select-none overflow-hidden rounded-2xl bg-muted"
                      style={{ aspectRatio: photo.aspect }}
                    >
                      <Image
                        src={galleryImagePath(activeWeek, photo.id)}
                        alt={photo.alt}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        draggable={false}
                        className="pointer-events-none select-none object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 transition-colors duration-300" />
                    </m.button>
                  ))}
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </Container>
      </section>

      <Lightbox
        weekKey={activeWeek}
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onIndexChange={setLightboxIndex}
      />
    </>
  );
}
