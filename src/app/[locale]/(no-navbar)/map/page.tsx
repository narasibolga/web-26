import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";
import { locations } from "@/lib/locations";
import {
  buildLocalePageMetadata,
  localeStaticParams,
  verifyLocale,
} from "@/lib/metadata";
import { SITE_URL } from "@/lib/site";
import { MapPageClient } from "./components/map-page-client";

type Props = { params: Promise<{ locale: string }> };

export const generateStaticParams = localeStaticParams;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "map" });
  return buildLocalePageMetadata({
    locale,
    title: t("title"),
    description: t("title"),
    segment: "map",
  });
}

export default async function MapPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const verified = verifyLocale(locale);

  const primary = locations[0];
  const jsonLd = primary
    ? {
        "@context": "https://schema.org",
        "@type": "Place",
        name: primary.name[verified] ?? primary.name.en,
        geo: {
          "@type": "GeoCoordinates",
          latitude: primary.lat,
          longitude: primary.lng,
        },
        url: `${SITE_URL}/${verified}/map`,
      }
    : null;

  return (
    <div className="flex h-svh flex-col">
      {jsonLd && (
        <script
          type="application/ld+json"
          // JSON-LD built from developer-authored location data and i18n translations, not user/request-derived input; no untrusted data reaches the sink.
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
