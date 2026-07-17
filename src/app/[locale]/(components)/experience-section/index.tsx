import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "../_primitives/section-heading";

type Props = { locale: string };

export async function ExperienceSection({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "experience-section" });

  return (
    <section className="relative overflow-hidden">
      <Image
        src="/images/port.webp"
        alt={t("imageAlt")}
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-black/40" />

      <Container className="relative z-10 items-center gap-8 text-center text-white">
        <SectionHeading className="max-w-sm text-white">
          {t("heading")}
        </SectionHeading>
        <p className="max-w-lg font-heading">{t("description")}</p>

        <div className="mt-8 grid w-full max-w-xl grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col items-center gap-6 rounded-2xl bg-secondary p-8 text-primary-foreground">
            <HugeiconsIcon icon={Moon02Icon} className="size-8" />
            <h3 className="font-serif text-3xl">{t("cards.0.title")}</h3>
            <p>{t("cards.0.description")}</p>
            <Button
              className="mt-auto"
              nativeButton={false}
              render={<Link href="/" />}
            >
              {t("cards.0.cta")}
            </Button>
          </div>

          <div className="flex flex-col items-center gap-6 rounded-2xl bg-background p-8 text-foreground">
            <HugeiconsIcon icon={Sun03Icon} className="size-8" />
            <h3 className="font-serif text-3xl">{t("cards.1.title")}</h3>
            <p>{t("cards.1.description")}</p>
            <Button
              className="mt-auto"
              variant="outline-foreground"
              nativeButton={false}
              render={<Link href="/" />}
            >
              {t("cards.1.cta")}
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
