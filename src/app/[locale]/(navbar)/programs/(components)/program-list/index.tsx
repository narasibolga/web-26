"use client";

import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Link } from "@/i18n/navigation";
import type { ProgramMeta } from "@/lib/programs";
import { cn } from "@/lib/utils";

type ProgramListProps = {
  programs: ProgramMeta[];
};

export function ProgramList({ programs }: ProgramListProps) {
  const t = useTranslations("programs");
  const locale = useLocale();
  const [activeTag, setActiveTag] = useState<string>("all");

  const tags = useMemo(() => {
    const set = new Set<string>();
    for (const program of programs) {
      for (const tag of program.tags) {
        set.add(tag);
      }
    }
    return Array.from(set).sort();
  }, [programs]);

  const filtered =
    activeTag === "all"
      ? programs
      : programs.filter((a) => a.tags.includes(activeTag));

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          variant="link"
          size="none"
          onClick={() => setActiveTag("all")}
          className={cn(activeTag === "all" && "underline")}
        >
          {t("tags.all")}
        </Button>
        {tags.map((tag) => (
          <Button
            key={tag}
            variant="link"
            size="none"
            onClick={() => setActiveTag(tag)}
            className={cn(activeTag === tag && "underline")}
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
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filtered.map((program) => (
            <li key={program.slug}>
              <Link
                href={`/programs/${program.slug}`}
                className="group block border border-border transition-colors hover:bg-border/20"
              >
                <div className="relative aspect-4/3 w-full bg-muted">
                  {program.image && (
                    <Image
                      src={program.image}
                      alt="Program Cover Image"
                      fill
                      sizes="100%"
                      className="object-cover"
                    />
                  )}
                  <Badge
                    variant="glass"
                    className="absolute top-2 left-2 z-10 rounded-none lowercase"
                  >
                    {program.tags[0]}
                  </Badge>
                </div>
                <div className="space-y-1 p-3">
                  <div className="flex gap-2 text-muted-foreground text-xs uppercase">
                    <span>{program.author}</span>
                    {" - "}
                    <time dateTime={program.date}>
                      {new Intl.DateTimeFormat(locale, {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      }).format(new Date(program.date))}
                    </time>
                  </div>
                  <h2 className="line-clamp-2 font-heading text-2xl text-foreground">
                    {program.title}
                  </h2>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
