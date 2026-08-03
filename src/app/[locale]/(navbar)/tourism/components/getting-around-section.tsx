import { Bus01Icon, Car01Icon, Taxi02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import { Section } from "../../../(components)/_primitives/section";
import { SectionHeading } from "../../../(components)/_primitives/section-heading";

type GettingAroundSectionProps = { locale: string };
type Transport = {
  name: string;
  coverage: string;
  payment: string;
  note: string;
};

const transportIcons = [Taxi02Icon, Bus01Icon, Car01Icon, Car01Icon];

export async function GettingAroundSection({
  locale,
}: GettingAroundSectionProps) {
  const t = await getTranslations({ locale, namespace: "tourism" });
  const transports = t.raw("transport.items") as Transport[];

  return (
    <Section
      className="bg-background text-foreground"
      containerClassName="gap-12 md:gap-16"
    >
      <div className="max-w-3xl">
        <SectionHeading className="text-balance">
          {t("transport.heading")}
        </SectionHeading>
        <p className="mt-4 text-pretty text-foreground/70 leading-7 sm:text-lg">
          {t("transport.description")}
        </p>
      </div>

      <div className="grid gap-px overflow-hidden rounded-3xl bg-border md:grid-cols-2 lg:grid-cols-4">
        {transports.map((item, index) => (
          <article
            key={item.name}
            className="flex min-h-80 flex-col bg-background p-7"
          >
            <HugeiconsIcon
              icon={transportIcons[index]}
              className="mb-10 size-9"
              strokeWidth={1.2}
            />
            <h3 className="font-serif text-3xl">{item.name}</h3>
            <dl className="mt-6 flex flex-col gap-4 text-sm">
              <TransportDetail
                label={t("transport.coverage")}
                value={item.coverage}
              />
              <TransportDetail
                label={t("transport.payment")}
                value={item.payment}
              />
            </dl>
            <p className="mt-auto border-border border-t pt-5 text-foreground/60 text-sm leading-6">
              {item.note}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}

function TransportDetail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground text-xs uppercase">{label}</dt>
      <dd className="mt-1 font-heading leading-6">{value}</dd>
    </div>
  );
}
