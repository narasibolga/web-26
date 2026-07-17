import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "../_primitives/section-heading";

type Props = { locale: string };

export async function CheckboardSection({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "checkboard-section" });

  return (
    <section className="grid min-h-screen grid-cols-1 md:grid-cols-2">
      <div className="relative min-h-100">
        <Image
          src="/images/port.webp"
          alt={t("imageAlt")}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-6 bg-primary px-4 py-20 text-center text-primary-foreground md:py-24">
        <SectionHeading>{t("panels.0.heading")}</SectionHeading>
        <p className="max-w-md">{t("panels.0.description")}</p>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/map" />}
        >
          {t("panels.0.cta")}
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 bg-background px-4 py-20 text-center text-foreground md:py-24">
        <SectionHeading>{t("panels.1.heading")}</SectionHeading>
        <p className="max-w-md">{t("panels.1.description")}</p>
        <Button
          variant="default"
          nativeButton={false}
          render={<Link href="/pathfinder" />}
        >
          {t("panels.1.cta")}
        </Button>
      </div>

      <div className="relative min-h-100">
        <Image
          src="/images/boats.webp"
          alt={t("imageAlt")}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </section>
  );
}
