import {
  ArrowLeft01Icon,
  BookOpen01Icon,
  Calendar01Icon,
} from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Container } from "@/components/layout/container";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import {
  getAllArticles,
  getArticle,
  getArticleAuthor,
  getArticleHTML,
  getReadingTimeMinutes,
} from "@/lib/articles";
import { SITE_URL } from "@/lib/site";

type Props = { params: Promise<{ locale: string; slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  const articles = getAllArticles();
  return routing.locales.flatMap((locale) =>
    articles.map((article) => ({ locale, slug: article.slug })),
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const url = `${SITE_URL}/${locale}/articles/${slug}`;

  return {
    title: article.title,
    description: article.summary,
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `${SITE_URL}/${l}/articles/${slug}`]),
      ),
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.summary,
      url,
      publishedTime: article.date,
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "articles" });

  const article = getArticle(slug);
  if (!article) notFound();
  const html = await getArticleHTML(slug);
  const readingTime = getReadingTimeMinutes(article.content);
  const author = getArticleAuthor(article);

  return (
    <main>
      <section className="relative min-h-42 overflow-hidden md:min-h-60">
        <div className="absolute inset-0">
          <Image
            src="/images/sibolga-panorama-1928.jpg"
            alt=""
            fill
            priority
            className="pointer-events-none h-full w-full select-none object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-linear-to-t from-background via-background/85 to-transparent" />
        </div>
      </section>

      <Container className="max-w-3xl">
        <header className="flex flex-col gap-4">
          <Button
            variant="outline-foreground"
            render={<Link href="/articles" />}
            nativeButton={false}
            className="mb-4 w-fit"
          >
            <HugeiconsIcon
              icon={ArrowLeft01Icon}
              size={16}
              strokeWidth={2}
              aria-hidden="true"
            />
            {t("back")}
          </Button>
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <h1 className="font-serif text-3xl text-foreground md:text-5xl">
            {article.title}
          </h1>
          <p className="text-muted-foreground">{article.summary}</p>

          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                {author
                  .split(" ")
                  .map((word) => word[0])
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span>{t("by", { author })}</span>
          </div>
          <div className="mb-4 flex w-full items-center gap-4 border-border border-y py-2 text-muted-foreground text-xs">
            <div className="inline-flex items-center gap-1.5">
              <HugeiconsIcon
                icon={Calendar01Icon}
                size={14}
                aria-hidden="true"
              />
              <time dateTime={article.date}>{article.date}</time>
            </div>
            <div className="inline-flex items-center gap-1.5">
              <HugeiconsIcon
                icon={BookOpen01Icon}
                size={14}
                aria-hidden="true"
              />
              <span>{t("readingTime", { minutes: readingTime })}</span>
            </div>
          </div>
        </header>

        <article
          className="prose prose-primary dark:prose-invert max-w-none"
          // biome-ignore lint/security/noDangerouslySetInnerHtml: built-time markdown from local files
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </Container>
    </main>
  );
}
