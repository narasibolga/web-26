import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { OG_LOCALE_MAP, SITE_URL } from "@/lib/site";
import { AdventureSection } from "../(components)/adventure-section";
import { CheckboardSection } from "../(components)/checkboard-section";
import { ExperienceSection } from "../(components)/experience-section";
import { Hero } from "../(components)/hero-section";
import { HistorySection } from "../(components)/history-section";
import { InstagramSection } from "../(components)/instagram-section";
import { SponsorsSection } from "../(components)/sponsors-section";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "layout" });

  const title = t("title");
  const description = t("description");
  const url = `${SITE_URL}/${locale}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}`]),
      ),
    },
    openGraph: {
      type: "website",
      url,
      siteName: title,
      title,
      description,
      locale: OG_LOCALE_MAP[locale] ?? locale,
    },
  };
}

export default async function Home({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero locale={locale} />
      <ExperienceSection locale={locale} />
      <CheckboardSection locale={locale} />
      <SponsorsSection locale={locale} />
      <AdventureSection locale={locale} />
      <HistorySection locale={locale} />
      <InstagramSection locale={locale} />
    </>
  );
}
