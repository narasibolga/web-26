import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";
import { PathfinderClient } from "./components/pathfinder-client";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pathfinder" });

  const url = `${SITE_URL}/${locale}/pathfinder`;

  return {
    title: t("title"),
    description: t("title"),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}/pathfinder`]),
      ),
    },
    openGraph: { title: t("title"), description: t("title"), url },
  };
}

export default async function PathfinderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="bg-background px-6 pt-28 pb-12 md:px-12 md:pt-44 md:pb-20">
      <PathfinderClient />
    </main>
  );
}
