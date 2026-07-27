import { Route01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import { Section } from "../../../(components)/_primitives/section";
import { SectionHeading } from "../../../(components)/_primitives/section-heading";

type TimelineSectionProps = {
  locale: string;
};

type TimelineItem = {
  time: string;
  activity: string;
};

export async function TimelineSection({ locale }: TimelineSectionProps) {
  const t = await getTranslations({ locale, namespace: "tourism" });
  const items = t.raw("timeline.items") as TimelineItem[];

  return (
    <Section
      className="bg-secondary"
      containerClassName="items-center gap-10 text-center text-secondary-foreground"
    >
      <HugeiconsIcon icon={Route01Icon} size={50} strokeWidth={1} />
      <SectionHeading className="max-w-2xl text-balance">
        {t("timeline.heading")}
      </SectionHeading>
      <p className="max-w-xl text-pretty text-secondary-foreground/80 leading-7">
        {t("timeline.description")}
      </p>

      <div className="mt-8 w-full max-w-4xl">
        <table className="w-full table-fixed border-collapse text-left">
          <caption className="sr-only">{t("timeline.heading")}</caption>
          <thead>
            <tr>
              <th
                scope="col"
                className="w-32 border-secondary-foreground/30 border-r border-b px-3 pb-4 font-medium text-xs uppercase tracking-[0.16em] sm:w-44 sm:px-6"
              >
                {t("timeline.columns.time")}
              </th>
              <th
                scope="col"
                className="border-secondary-foreground/30 border-b px-4 pb-4 font-medium text-xs uppercase tracking-[0.16em] sm:px-8"
              >
                {t("timeline.columns.activity")}
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={`${item.time}-${item.activity}`}
                className="last:[&>td]:border-b-0"
              >
                <td className="border-secondary-foreground/30 border-r border-b px-2 py-4 align-top sm:px-6">
                  <time className="font-heading tracking-[0.06em]">
                    {item.time}
                  </time>
                </td>
                <td className="border-secondary-foreground/30 border-b px-2 py-4 font-heading text-lg leading-7 sm:px-8">
                  {item.activity}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}
