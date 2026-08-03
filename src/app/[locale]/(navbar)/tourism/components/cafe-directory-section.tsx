import { CafeIcon, ExternalLinkIcon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import { Section } from "../../../(components)/_primitives/section";
import { SectionHeading } from "../../../(components)/_primitives/section-heading";

type CafeDirectorySectionProps = { locale: string };

type Cafe = {
  name: string;
  address: string;
  hours: string;
  price: string;
  suitableFor: string;
  contact?: string;
  social?: { label: string; href: string };
};

export async function CafeDirectorySection({
  locale,
}: CafeDirectorySectionProps) {
  const t = await getTranslations({ locale, namespace: "tourism" });
  const cafes = t.raw("cafes.items") as Cafe[];

  return (
    <Section
      className="bg-secondary text-secondary-foreground"
      containerClassName="gap-12 md:gap-16"
    >
      <div className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end">
        <HugeiconsIcon icon={CafeIcon} className="size-14" strokeWidth={1} />
        <div>
          <SectionHeading className="text-balance">
            {t("cafes.heading")}
          </SectionHeading>
          <p className="mt-4 max-w-2xl text-pretty text-secondary-foreground/70 leading-7 sm:text-lg">
            {t("cafes.description")}
          </p>
        </div>
      </div>

      <div className="grid border-secondary-foreground/20 border-t md:grid-cols-2">
        {cafes.map((cafe, index) => (
          <article
            key={cafe.name}
            className="flex flex-col gap-5 border-secondary-foreground/20 border-b py-8 md:even:pl-8 md:odd:border-r md:odd:pr-8"
          >
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-serif text-3xl leading-tight">{cafe.name}</h3>
              <span className="font-heading text-secondary-foreground/40 text-xs">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>
            <p className="text-secondary-foreground/70 text-sm leading-6">
              {cafe.address}
            </p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-4">
              <DirectoryDetail label={t("cafes.hours")} value={cafe.hours} />
              <DirectoryDetail label={t("cafes.price")} value={cafe.price} />
              <DirectoryDetail
                label={t("cafes.suitableFor")}
                value={cafe.suitableFor}
                className="col-span-2"
              />
            </dl>
            {(cafe.contact || cafe.social) && (
              <div className="mt-auto flex flex-wrap gap-x-5 gap-y-2 border-secondary-foreground/15 border-t pt-4 font-heading text-sm">
                {cafe.contact && (
                  <a
                    href={`tel:${cafe.contact.replace(/\s/g, "")}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {cafe.contact}
                  </a>
                )}
                {cafe.social && (
                  <a
                    href={cafe.social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 underline-offset-4 hover:underline"
                  >
                    {cafe.social.label}
                    <HugeiconsIcon
                      icon={ExternalLinkIcon}
                      className="size-3.5"
                    />
                  </a>
                )}
              </div>
            )}
          </article>
        ))}
      </div>

      <p className="max-w-3xl text-secondary-foreground/60 text-sm leading-6">
        {t("cafes.disclaimer")}
      </p>
    </Section>
  );
}

function DirectoryDetail({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-secondary-foreground/50 text-xs uppercase">
        {label}
      </dt>
      <dd className="mt-1 font-heading leading-6">{value}</dd>
    </div>
  );
}
