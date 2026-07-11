import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Providers } from "@/components/providers";
import { routing } from "@/i18n/routing";
import { OG_LOCALE_MAP, SITE_URL } from "@/lib/site";

type LocaleParams = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
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

export default async function LocaleLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as never)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations({ locale, namespace: "layout" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("title"),
    description: t("description"),
    url: `${SITE_URL}/${locale}`,
    inLanguage: OG_LOCALE_MAP[locale] ?? locale,
  };

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <Providers>
        <script
          type="application/ld+json"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: serialised JSON-LD, no user input
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </Providers>
    </NextIntlClientProvider>
  );
}
