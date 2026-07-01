import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { SectionHeading } from "../_primitives";

type Props = { locale: string };

export async function CheckboardSection({ locale }: Props) {
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "checkboard-section" });

  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="relative min-h-100">
        <Image
          src="/images/island-edge.webp"
          alt={t("imageAlt")}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-col items-center justify-center gap-6 bg-primary px-4 py-20 text-center text-primary-foreground md:py-24">
        <SectionHeading>{t("heading")}</SectionHeading>
        <p className="max-w-md">{t("description")}</p>
        <Button
          variant="outline"
          nativeButton={false}
          render={<Link href="/" />}
        >
          {t("cta")}
        </Button>
      </div>

      <div className="flex flex-col items-center justify-center gap-6 bg-background px-4 py-20 text-center text-foreground md:py-24">
        <SectionHeading>{t("heading")}</SectionHeading>
        <p className="max-w-md">{t("description")}</p>
        <Button
          variant="default"
          nativeButton={false}
          render={<Link href="/" />}
        >
          {t("cta")}
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
