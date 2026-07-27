import {
  ClipboardPenIcon,
  DollarCircleIcon,
  Route01Icon,
  RunningShoesIcon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Section } from "../../../(components)/_primitives/section";
import { SectionHeading } from "../../../(components)/_primitives/section-heading";

type TimelineSectionProps = {
  locale: string;
};

const indicators = {
  signup: { icon: ClipboardPenIcon, labelKey: "signup" },
  recreation: { icon: RunningShoesIcon, labelKey: "recreation" },
  fee: { icon: DollarCircleIcon, labelKey: "fee" },
} as const;

type IndicatorKey = keyof typeof indicators;

const itinerary = [
  {
    periodKey: "morning",
    items: [
      { activityKey: "depart", time: "08.00", indicators: [] },
      {
        activityKey: "beach",
        time: "08.30—10.00",
        indicators: ["recreation", "fee"],
      },
      {
        activityKey: "crossing",
        time: "10.00—10.30",
        indicators: ["signup", "fee"],
      },
      {
        activityKey: "island",
        time: "10.30—14.30",
        indicators: ["recreation", "fee"],
      },
    ],
  },
  {
    periodKey: "afternoon",
    items: [
      { activityKey: "return", time: "14.30—15.00", indicators: [] },
      { activityKey: "lunch", time: "15.00—16.00", indicators: ["fee"] },
      {
        activityKey: "souvenirs",
        time: "16.00—17.20",
        indicators: ["fee"],
      },
    ],
  },
  {
    periodKey: "evening",
    items: [
      { activityKey: "hillTravel", time: "17.20—17.45", indicators: [] },
      {
        activityKey: "sunset",
        time: "17.45—21.00",
        indicators: ["recreation"],
      },
    ],
  },
  {
    periodKey: "night",
    items: [{ activityKey: "finish", time: "21.00", indicators: [] }],
  },
] as const satisfies ReadonlyArray<{
  periodKey: string;
  items: ReadonlyArray<{
    activityKey: string;
    time: string;
    indicators: readonly IndicatorKey[];
  }>;
}>;

export async function TimelineSection({ locale }: TimelineSectionProps) {
  const t = await getTranslations({ locale, namespace: "tourism" });
  return (
    <Section
      className="bg-primary"
      containerClassName="items-center gap-10 text-center text-secondary-foreground"
    >
      <HugeiconsIcon icon={Route01Icon} size={50} strokeWidth={1} />
      <SectionHeading className="max-w-2xl text-balance">
        {t("timeline.heading")}
      </SectionHeading>
      <p className="max-w-xl text-pretty text-secondary-foreground/80 leading-7">
        {t("timeline.description")}
      </p>

      <div className="mt-6 flex w-full max-w-5xl flex-col gap-6 text-left">
        {itinerary.map((period) => (
          <section key={period.periodKey}>
            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-5">
              <span
                className="w-full border-secondary-foreground/40 border-t"
                aria-hidden="true"
              />
              <h3 className="font-serif text-2xl italic opacity-70 sm:text-3xl">
                {t(`timeline.periods.${period.periodKey}`)}
              </h3>
              <span
                className="w-full border-secondary-foreground/40 border-t"
                aria-hidden="true"
              />
            </div>
            <ol className="mt-4">
              {period.items.map((item) => (
                <li
                  key={item.activityKey}
                  className="grid gap-3 border-secondary-foreground/25 py-4 sm:grid-cols-[12rem_1fr_auto] sm:items-center sm:gap-8"
                >
                  <time className="font-sans text-sm tracking-widest opacity-70">
                    {item.time}
                  </time>
                  <p className="font-heading text-base leading-tight sm:text-2xl">
                    {t(`timeline.items.${item.activityKey}`)}
                  </p>
                  {item.indicators.length > 0 && (
                    <ul
                      className="flex gap-3 text-secondary-foreground/70"
                      aria-label={t("timeline.heading")}
                    >
                      {item.indicators.map((key) => {
                        const indicator = indicators[key];
                        const label = t(
                          `timeline.indicators.${indicator.labelKey}`,
                        );

                        return (
                          <li key={key}>
                            <Tooltip>
                              <TooltipTrigger
                                render={
                                  <button
                                    type="button"
                                    className="flex rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4"
                                    aria-label={label}
                                  />
                                }
                              >
                                <HugeiconsIcon
                                  icon={indicator.icon}
                                  className="size-6"
                                />
                              </TooltipTrigger>
                              <TooltipContent>{label}</TooltipContent>
                            </Tooltip>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </Section>
  );
}
