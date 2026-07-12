import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { routing } from "@/i18n/routing";
import { getAllArticles } from "@/lib/articles";
import { SITE_URL } from "@/lib/site";
import { ArticleList } from "./(components)/article-list";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

type Props = { params: Promise<{ locale: string }> };

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "articles" });

  const url = `${SITE_URL}/${locale}/articles`;

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}/articles`]),
      ),
    },
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      url,
    },
  };
}

export default async function ArticlesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "articles" });
  const articles = getAllArticles();

  return (
    <main>
      <section className="relative">
        <Container
          className="flex min-h-[80vh] flex-col justify-end"
          render={<div />}
        >
          <div className="absolute inset-0 z-0">
            <Image
              src="/images/port.webp"
              alt={t("hero.imageAlt")}
              fill
              priority
              className="pointer-events-none h-full w-full select-none object-cover sepia-[.55]"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-[#a67c4d]/55 mix-blend-multiply" />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-black/40" />
          </div>

          <h1 className="z-10 mt-auto text-center font-serif text-5xl text-shadow-2xs text-white tracking-tighter">
            {t("hero.heading")}
          </h1>
        </Container>
      </section>

      <section className="bg-background">
        <Container className="pt-8">
          <div className="mb-8 flex items-center justify-center gap-2 text-muted-foreground text-sm uppercase">
            <span>Home</span>
            <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
            <span className="text-foreground">Articles</span>
          </div>
          <ArticleList articles={articles} />
        </Container>
      </section>
    </main>
  );
}
