import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { type LocationCategory, locations } from "@/lib/locations";
import { SectionHeading } from "../_primitives/section-heading";
import { AdventureCarousel } from "./components/adventure-carousel";

type Props = { locale: Locale };

const adventureCategories = new Set<LocationCategory>([
  "bahari",
  "tematik",
  "alam-panorama",
  "sejarah-rekreasi",
]);

export async function AdventureSection({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adventure-section" });

  const items = locations.flatMap((location) => {
    if (!adventureCategories.has(location.category)) return [];

    const name = location.name[locale] ?? location.name.en;
    return [
      {
        title: name,
        imageSrc: location.images[0],
        imageAlt: name,
        category: location.category,
        href: {
          pathname: "/map" as const,
          query: { location: location.id },
        },
      },
    ];
  });

  return (
    <section className="bg-secondary pb-20">
      <Container className="items-center gap-10">
        <SectionHeading className="text-center text-primary-foreground">
          {t("heading")}
        </SectionHeading>

        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/map" />}
        >
          {t("cta")}
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            data-icon="inline-end"
            strokeWidth={2}
          />
        </Button>
      </Container>

      <AdventureCarousel items={items} exploreLabel={t("explore")} />
    </section>
  );
}
