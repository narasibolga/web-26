import type { Metadata } from "next";
import { type Locale, routing } from "@/i18n/routing";
import { OG_LOCALE_MAP, SITE_URL } from "./site";

export const SOCIAL_IMAGE = {
  url: `${SITE_URL}/opengraph-image.png`,
  width: 1200,
  height: 630,
  alt: "NaraSibolga — KKN Sibolga North Sumatra",
} as const;

export function localeStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export function buildLocalePageMetadata({
  locale,
  title,
  description,
  segment,
}: {
  locale: string;
  title: string;
  description: string;
  segment?: string;
}): Metadata {
  const url = `${SITE_URL}/${locale}${segment ? `/${segment}` : ""}`;
  const path = segment ? `/${segment}` : "";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}${path}`]),
      ),
    },
    openGraph: {
      type: "website",
      url,
      siteName: title,
      title,
      description,
      locale: OG_LOCALE_MAP[locale] ?? locale,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
  };
}

export function verifyLocale(locale: string): Locale {
  return (routing.locales as readonly string[]).includes(locale)
    ? (locale as Locale)
    : routing.defaultLocale;
}
