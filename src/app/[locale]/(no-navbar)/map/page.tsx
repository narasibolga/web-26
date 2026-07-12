import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { routing } from "@/i18n/routing";
import { locations } from "@/lib/locations";
import { SITE_URL } from "@/lib/site";
import { MapPageClient } from "./components/map-page-client";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "map" });

  const url = `${SITE_URL}/${locale}/map`;

  return {
    title: t("title"),
    description: t("title"),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}/map`]),
      ),
    },
    openGraph: { title: t("title"), description: t("title"), url },
  };
}

export default async function MapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  const primary = locations[0];
  const jsonLd = primary
    ? {
        "@context": "https://schema.org",
        "@type": "Place",
        name: primary.name[locale as "en" | "id"] ?? primary.name.en,
        geo: {
          "@type": "GeoCoordinates",
          latitude: primary.lat,
          longitude: primary.lng,
        },
        url: `${SITE_URL}/${locale}/map`,
      }
    : null;

  return (
    <div className="flex h-svh flex-col">
      {jsonLd && (
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: serialised JSON-LD, no user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
      <Suspense>
        <MapPageClient />
      </Suspense>
    </div>
  );
}
