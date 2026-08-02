import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildLocalePageMetadata, localeStaticParams } from "@/lib/metadata";
import { AtlasContent } from "./(components)/atlas-content";

type Props = { params: Promise<{ locale: string }> };

export const generateStaticParams = localeStaticParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "atlas" });

  return buildLocalePageMetadata({
    locale,
    title: t("meta.title"),
    description: t("meta.description"),
    segment: "atlas",
  });
}

export default async function AtlasPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <AtlasContent locale={locale} />
    </main>
  );
}
