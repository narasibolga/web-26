import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "../../../../(components)/_primitives";
import { HistoryTimelineCard } from "./history-timeline-card";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, ArrowRightIcon } from "@hugeicons/core-free-icons";

type Props = { locale: string };

type Era = {
  key: string;
  year: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  attribution: string;
};

export async function HistoryContent({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "history" });

  const eras: Era[] = [
    {
      key: "origins",
      year: t("eras.0.year"),
      title: t("eras.0.title"),
      description: t("eras.0.description"),
      image: t("eras.0.image"),
      imageAlt: t("eras.0.imageAlt"),
      attribution: t("eras.0.attribution"),
    },
    {
      key: "colonial",
      year: t("eras.1.year"),
      title: t("eras.1.title"),
      description: t("eras.1.description"),
      image: t("eras.1.image"),
      imageAlt: t("eras.1.imageAlt"),
      attribution: t("eras.1.attribution"),
    },
    {
      key: "modern",
      year: t("eras.2.year"),
      title: t("eras.2.title"),
      description: t("eras.2.description"),
      image: t("eras.2.image"),
      imageAlt: t("eras.2.imageAlt"),
      attribution: t("eras.2.attribution"),
    },
  ];

  return (
    <>
      <section className="relative">
        <Container
          className="flex min-h-[80vh] flex-col justify-end"
          render={<div />}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/sibolga-panorama-1928.jpg"
              alt={t("hero.imageAlt")}
              fill
              priority
              className="pointer-events-none h-full w-full select-none object-cover sepia-[.55]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#a67c4d]/55 mix-blend-multiply" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/40" />
          </div>

          <h1 className="z-10 mt-auto text-center font-serif text-5xl text-shadow-2xs text-white tracking-tighter">
            {t("hero.heading")}
          </h1>
        </Container>
      </section>

      <section className="bg-[#f2f5f3]">
        <Container className="items-center gap-6 pt-8 text-center">
          <div className="mb-8 flex items-center justify-center gap-2 text-muted-foreground text-sm uppercase">
            <span>Home</span>
            <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
            <span className="text-foreground">History</span>
          </div>
          <SectionHeading className="max-w-2xl">
            {t("intro.heading")}
          </SectionHeading>
          <p className="max-w-md text-muted-foreground text-xs uppercase">
            {t("intro.subheading")}
          </p>
          <div className="mt-4 flex max-w-md flex-col gap-6 text-foreground">
            <p>{t("intro.paragraphs.0")}</p>
            <p>{t("intro.paragraphs.1")}</p>
            <p>{t("intro.paragraphs.2")}</p>
          </div>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="relative">
          <SectionHeading className="mb-8 text-center">
            {t("timeline.heading")}
          </SectionHeading>
          {/* Desktop center line */}
          <div className="-translate-x-1/2 absolute top-40 bottom-0 left-1/2 hidden w-px bg-border md:block" />

          <div className="space-y-12 md:space-y-0">
            {eras.map((era, index) => {
              const isLeft = index % 2 === 0;

              return (
                <article
                  key={era.key}
                  className="relative grid grid-cols-1 md:grid-cols-[1fr_3rem_1fr]"
                >
                  {/* Mobile timeline */}
                  <div className="absolute top-0 bottom-0 left-8 w-px bg-border md:hidden" />
                  <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-8 z-10 h-3 w-3 rounded-full bg-primary md:hidden" />
                  <div className="-translate-y-1/2 absolute top-1/2 z-10 rounded-full border border-border bg-white px-2 py-1 text-foreground text-sm md:hidden">
                    {era.year}
                  </div>

                  {/* Left column */}
                  <div
                    className={`pl-20 md:pr-8 md:pl-0 ${isLeft ? "md:order-1" : "md:invisible md:order-1"}`}
                  >
                    {isLeft && <HistoryTimelineCard era={era} />}
                  </div>

                  {/* Center column */}
                  <div className="relative hidden md:order-2 md:block">
                    <div
                      className={`absolute top-1/2 h-px bg-border ${isLeft ? "right-1/2 left-0" : "right-0 left-1/2"}`}
                    />
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 h-3 w-3 rounded-full bg-primary" />
                    <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-10 text-nowrap rounded-full border-2 border-border bg-white px-5 py-3 text-foreground text-sm ring-6 ring-background">
                      {era.year}
                    </div>
                  </div>

                  {/* Right column */}
                  <div
                    className={`hidden pl-8 md:order-3 md:block ${isLeft ? "md:invisible" : ""}`}
                  >
                    {!isLeft && <HistoryTimelineCard era={era} />}
                  </div>

                  {/* Mobile card */}
                  <div className="pl-20 md:hidden">
                    <HistoryTimelineCard era={era} />
                  </div>
                </article>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
