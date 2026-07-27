import {
  CarParking01Icon,
  FerryBoatIcon,
  MoneyBag02Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { Section } from "../../../(components)/_primitives/section";
import { SectionHeading } from "../../../(components)/_primitives/section-heading";
import { planningStopImageSources } from "../tourism-images";
import { PlanningStopsCarousel } from "./planning-stops-carousel";

type PlanningSectionProps = { locale: string };
type CostItem = { name: string; detail: string; price: string };
type MapItem = { name: string; href: string };

export async function PlanningSection({ locale }: PlanningSectionProps) {
  const t = await getTranslations({ locale, namespace: "tourism" });
  const costs = t.raw("cost.items") as CostItem[];
  const maps = t.raw("maps.items") as MapItem[];
  const stops = maps.map((map, index) => ({
    ...map,
    imageSrc:
      planningStopImageSources[index] ??
      planningStopImageSources[planningStopImageSources.length - 1],
    imageAlt: map.name,
  }));

  return (
    <Section
      className="relative overflow-hidden bg-background"
      containerClassName="relative z-10 items-center gap-10 text-foreground md:gap-14"
    >
      <div className="relative z-10 max-w-2xl text-center">
        <HugeiconsIcon
          icon={MoneyBag02Icon}
          size={50}
          strokeWidth={1}
          className="mx-auto mb-8"
        />
        <SectionHeading id="planning-heading" className="text-balance">
          {t("planning.heading")}
        </SectionHeading>
        <p className="mt-4 text-pretty text-foreground/75 leading-7 sm:mt-5 sm:text-lg sm:leading-8">
          {t("planning.description")}
        </p>
      </div>

      <div className="relative z-10 flex w-full flex-col gap-16 md:gap-24">
        <section
          aria-labelledby="planning-heading"
          className="mx-auto flex w-full max-w-3xl flex-col items-center gap-4"
        >
          <dl className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            {costs.map((item, index) => (
              <div
                key={item.name}
                className={cn(
                  "flex flex-col items-center gap-3 rounded-2xl p-8 text-center",
                  index === 0
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-white text-foreground",
                )}
              >
                <HugeiconsIcon
                  icon={index === 0 ? FerryBoatIcon : CarParking01Icon}
                  className="size-8"
                />
                <dt className="font-serif text-3xl leading-tight">
                  {item.name}
                </dt>
                <dd className="max-w-sm leading-7 opacity-75">{item.detail}</dd>
                <dd className="mt-auto w-full border-current/15 border-t pt-4 font-heading text-lg">
                  {item.price}
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-6 max-w-lg text-center text-foreground/75 leading-7">
            {t("cost.summary")}
          </p>
        </section>

        <section
          aria-labelledby="stops-heading"
          className="flex w-full flex-col items-center"
        >
          <h3
            id="stops-heading"
            className="mt-3 max-w-2xl text-center font-serif text-3xl tracking-tight sm:text-4xl md:text-5xl"
          >
            {t("maps.heading")}
          </h3>
          <PlanningStopsCarousel stops={stops} openMapLabel={t("maps.open")} />
        </section>
      </div>
    </Section>
  );
}
