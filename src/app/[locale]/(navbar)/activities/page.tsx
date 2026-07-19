import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildLocalePageMetadata, localeStaticParams } from "@/lib/metadata";

type Props = { params: Promise<{ locale: string }> };

export const generateStaticParams = localeStaticParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "activities" });
  return buildLocalePageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
    segment: "activities",
  });
}

export default async function ActivitiesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "activities" });

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <h1 className="font-serif text-4xl text-foreground md:text-5xl">
        {t("title")}
      </h1>
    </div>
  );
}
