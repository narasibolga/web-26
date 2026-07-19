import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  buildLocalePageMetadata,
  localeStaticParams,
  verifyLocale,
} from "@/lib/metadata";
import { AdventureSection } from "../(components)/adventure-section";
import { CheckboardSection } from "../(components)/checkboard-section";
import { ExperienceSection } from "../(components)/experience-section";
import { Hero } from "../(components)/hero-section";
import { HistorySection } from "../(components)/history-section";
import { InstagramSection } from "../(components)/instagram-section";
import { SponsorsSection } from "../(components)/sponsors-section";

type Props = { params: Promise<{ locale: string }> };

export const generateStaticParams = localeStaticParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "layout" });
  return buildLocalePageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
  });
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const verified = verifyLocale(locale);

  return (
    <>
      <Hero locale={verified} />
      <ExperienceSection locale={verified} />
      <CheckboardSection locale={verified} />
      <SponsorsSection locale={verified} />
      <AdventureSection locale={verified} />
      <HistorySection locale={verified} />
      <InstagramSection locale={verified} />
    </>
  );
}
