"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Link } from "@/i18n/navigation";
import type { ArticleMeta } from "@/lib/articles";

type ArticleListProps = {
  articles: ArticleMeta[];
};

export function ArticleList({ articles }: ArticleListProps) {
  const t = useTranslations("articles");
  const [activeTag, setActiveTag] = useState<string>("all");

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const article of articles) {
      for (const tag of article.tags) {
        set.add(tag);
      }
    }
    return Array.from(set).sort();
  }, [articles]);

  const filtered =
    activeTag === "all"
      ? articles
      : articles.filter((a) => a.tags.includes(activeTag));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeTag === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => setActiveTag("all")}
        >
          {t("tags.all")}
        </Button>
        {tags.map((tag) => (
          <Button
            key={tag}
            variant={activeTag === tag ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveTag(tag)}
          >
            {tag}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyTitle>{t("tags.empty")}</EmptyTitle>
          </EmptyHeader>
        </Empty>
      ) : (
        <ul className="flex flex-col gap-6">
          {filtered.map((article) => (
            <li key={article.slug}>
              <Link href={`/articles/${article.slug}`} className="group block">
                <h2 className="font-serif text-2xl text-foreground transition-opacity group-hover:opacity-70">
                  {article.title}
                </h2>
                <time
                  dateTime={article.date}
                  className="text-muted-foreground text-sm"
                >
                  {article.date}
                </time>
                <p className="mt-1 text-muted-foreground">{article.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
