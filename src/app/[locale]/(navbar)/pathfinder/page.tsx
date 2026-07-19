import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildLocalePageMetadata, localeStaticParams } from "@/lib/metadata";
import { PathfinderClient } from "./components/pathfinder-client";

type Props = { params: Promise<{ locale: string }> };

export const generateStaticParams = localeStaticParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "pathfinder" });
  return buildLocalePageMetadata({
    locale,
    title: t("title"),
    description: t("title"),
    segment: "pathfinder",
  });
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
