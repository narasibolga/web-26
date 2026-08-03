import { ExternalLinkIcon, Ticket02Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations } from "next-intl/server";
import { buttonVariants } from "@/components/ui/button-variants";
import { cn } from "@/lib/utils";
import { Section } from "../../../(components)/_primitives/section";
import { SectionHeading } from "../../../(components)/_primitives/section-heading";

type PackageOptionsSectionProps = { locale: string };

type TourPackage = {
  name: string;
  duration: string;
  price: string;
  provider: string;
  href: string;
};

export async function PackageOptionsSection({
  locale,
}: PackageOptionsSectionProps) {
  const t = await getTranslations({ locale, namespace: "tourism" });
  const packages = t.raw("packages.items") as TourPackage[];

  return (
    <Section
      className="bg-foreground text-background"
      containerClassName="gap-12 md:gap-16"
    >
      <div className="grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-end">
        <div>
          <HugeiconsIcon
            icon={Ticket02Icon}
            className="mb-8 size-12"
            strokeWidth={1}
          />
          <SectionHeading className="max-w-xl text-balance">
            {t("packages.heading")}
          </SectionHeading>
        </div>
        <p className="max-w-2xl text-pretty text-background/70 leading-7 md:justify-self-end md:text-lg md:leading-8">
          {t("packages.description")}
        </p>
      </div>

      <div className="border-background/20 border-t">
        {packages.map((item, index) => (
          <article
            key={`${item.provider}-${item.name}`}
            className="grid gap-5 border-background/20 border-b py-7 md:grid-cols-[3rem_1.4fr_0.7fr_0.8fr_auto] md:items-center"
          >
            <span className="font-heading text-background/40 text-sm">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-serif text-2xl leading-tight md:text-3xl">
                {item.name}
              </h3>
              <p className="mt-1 text-background/60 text-sm">{item.provider}</p>
            </div>
            <p className="font-heading text-background/70 text-sm uppercase">
              {item.duration}
            </p>
            <p className="font-heading text-lg">{item.price}</p>
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({ variant: "tertiary", size: "sm" }),
                "w-fit",
              )}
            >
              {t("packages.open")}
              <HugeiconsIcon icon={ExternalLinkIcon} data-icon="inline-end" />
            </a>
          </article>
        ))}
      </div>

      <p className="max-w-3xl text-background/55 text-sm leading-6">
        {t("packages.disclaimer")}
      </p>
    </Section>
  );
}
