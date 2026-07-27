import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { buildLocalePageMetadata, localeStaticParams } from "@/lib/metadata";
import { DestinationListSection } from "./components/destination-list-section";
import { GallerySection } from "./components/gallery-section";
import { HeroSection } from "./components/hero-section";
import { IntroSection } from "./components/intro-section";
import { PlanningSection } from "./components/planning-section";
import { TimelineSection } from "./components/timeline-section";
import { TipsSection } from "./components/tips-section";

type Props = { params: Promise<{ locale: string }> };

export const generateStaticParams = localeStaticParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tourism" });

  return buildLocalePageMetadata({
    locale,
    title: t("meta.title"),
    description: t("meta.description"),
    segment: "tourism",
  });
}

export default async function TourismPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main>
      <HeroSection locale={locale} />
      <IntroSection locale={locale} />
      <DestinationListSection locale={locale} />
      <TimelineSection locale={locale} />
      <PlanningSection locale={locale} />
      <TipsSection locale={locale} />
      <GallerySection locale={locale} />
    </main>
  );
}
