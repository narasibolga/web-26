import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildLocalePageMetadata, localeStaticParams } from "@/lib/metadata";
import { HistoryContent } from "./(components)/history-content";

type Props = { params: Promise<{ locale: string }> };

export const generateStaticParams = localeStaticParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "history" });
  return buildLocalePageMetadata({
    locale,
    title: t("meta.title"),
    description: t("meta.description"),
    segment: "history",
  });
}

export default async function HistoryPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HistoryContent locale={locale} />
    </main>
  );
}
