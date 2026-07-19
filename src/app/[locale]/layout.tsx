import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import { Providers } from "@/components/providers";
import { brandon, notoSerif } from "@/lib/fonts";
import {
  buildLocalePageMetadata,
  localeStaticParams,
  verifyLocale,
} from "@/lib/metadata";
import { OG_LOCALE_MAP, SITE_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

type LocaleParams = { params: Promise<{ locale: string }> };

export const generateStaticParams = localeStaticParams;

export async function generateMetadata({
  params,
}: LocaleParams): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "layout" });
  return buildLocalePageMetadata({
    locale,
    title: t("title"),
    description: t("description"),
  });
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleParams & { children: React.ReactNode }) {
  const { locale } = await params;
  const verified = verifyLocale(locale);

  if (verified !== locale) {
    notFound();
  }

  setRequestLocale(verified);
  const messages = await getMessages();
  const t = await getTranslations({ locale: verified, namespace: "layout" });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: t("title"),
    description: t("description"),
    url: `${SITE_URL}/${verified}`,
    inLanguage: OG_LOCALE_MAP[verified] ?? verified,
  };

  return (
    <html
      lang={verified}
      className={cn(
        "h-full",
        "antialiased",
        "font-sans",
        brandon.variable,
        notoSerif.variable,
      )}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider locale={verified} messages={messages}>
          <Providers>
            <script
              type="application/ld+json"
              // JSON-LD built from developer-authored site metadata and i18n translations, not user/request-derived input; no untrusted data reaches the sink.
              // biome-ignore lint/security/noDangerouslySetInnerHtml: serialised JSON-LD, no user input
              dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            {children}
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
