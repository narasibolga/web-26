import { InformationCircleIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import { Section } from "../../../(components)/_primitives/section";
import { SectionHeading } from "../../../(components)/_primitives/section-heading";

type TipsSectionProps = {
  locale: string;
};

export async function TipsSection({ locale }: TipsSectionProps) {
  const t = await getTranslations({ locale, namespace: "tourism" });
  const tips = t.raw("tips.items") as string[];

  return (
    <Section
      className="bg-primary text-primary-foreground"
      containerClassName="items-center gap-10 text-center"
    >
      <HugeiconsIcon icon={InformationCircleIcon} size={50} strokeWidth={1} />
      <SectionHeading className="max-w-2xl text-balance">
        {t("tips.heading")}
      </SectionHeading>
      <ul className="flex w-full max-w-3xl flex-col">
        {tips.map((tip, index) => (
          <li
            key={tip}
            className="flex items-center gap-4 border-primary-foreground/20 border-b py-4 text-left font-heading text-xl leading-7 md:text-2xl"
          >
            <span className="text-primary-foreground/50">0{index + 1}</span>
            <span>{tip}</span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
