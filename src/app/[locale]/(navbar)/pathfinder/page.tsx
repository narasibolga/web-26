import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { PathfinderClient } from "./components/pathfinder-client";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pathfinder" });

  const url = `https://narasibolga.id/${locale}/pathfinder`;

  return {
    title: t("title"),
    description: t("title"),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [
          l,
          `https://narasibolga.id/${l}/pathfinder`,
        ]),
      ),
    },
    openGraph: { title: t("title"), description: t("title"), url },
  };
}

export default async function PathfinderPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-[calc(100vh-88px)] bg-secondary md:min-h-[calc(100vh-168px)]">
      <PathfinderClient />
    </main>
  );
}
