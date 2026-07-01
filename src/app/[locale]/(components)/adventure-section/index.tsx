import { ArrowRight01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "../_primitives";
import { AdventureCarousel } from "./components/adventure-carousel";

type Props = { locale: string };

export async function AdventureSection({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "adventure-section" });

  return (
    <section className="bg-secondary pb-20">
      <Container className="items-center gap-10">
        <SectionHeading className="text-center text-primary-foreground">
          {t("heading")}
        </SectionHeading>

        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/activities" />}
        >
          {t("cta")}
          <HugeiconsIcon
            icon={ArrowRight01Icon}
            data-icon="inline-end"
            strokeWidth={2}
          />
        </Button>
      </Container>

      <AdventureCarousel />
    </section>
  );
}
