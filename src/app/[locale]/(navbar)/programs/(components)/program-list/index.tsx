"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Link, useTypedLocale } from "@/i18n/navigation";
import { useUpdateSearchParams } from "@/i18n/search-params";
import { formatLocaleDate } from "@/lib/datetime";
import type { ProgramMeta } from "@/lib/programs";
import { cn } from "@/lib/utils";
import { useActiveTag } from "./use-active-tag";

type ProgramListProps = {
  programs: ProgramMeta[];
};

type ProgramTagFilterProps = {
  programs: ProgramMeta[];
};

export function ProgramTagFilter({ programs }: ProgramTagFilterProps) {
  const t = useTranslations("programs");
  const activeTag = useActiveTag();
  const updateSearchParams = useUpdateSearchParams();

  const tags = Array.from(
    new Set(programs.flatMap((program) => program.tags)),
  ).sort();

  const selectTag = (tag: string) => {
    updateSearchParams((params) => {
      if (tag === "all") params.delete("tag");
      else params.set("tag", tag);
    });
  };

  return (
    <div className="z-10 flex flex-wrap items-center justify-center gap-4">
      <Button
        variant="link"
        size="none"
        onClick={() => selectTag("all")}
        className={cn(
          "text-white uppercase",
          activeTag === "all" && "underline",
        )}
      >
        {t("tags.all")}
      </Button>
      {tags.map((tag) => (
        <Button
          key={tag}
          variant="link"
          size="none"
          onClick={() => selectTag(tag)}
          className={cn(
            "text-white uppercase",
            activeTag === tag && "underline",
          )}
        >
          {tag}
        </Button>
      ))}
    </div>
  );
}

export function ProgramList({ programs }: ProgramListProps) {
  const t = useTranslations("programs");
  const locale = useTypedLocale();
  const activeTag = useActiveTag();

  const filtered =
    activeTag === "all"
      ? programs
      : programs.filter((a) => a.tags.includes(activeTag));

  return (
    <div className="flex flex-col gap-8">
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
                  {program.tags[0] && (
                    <Badge
                      variant="glass"
                      className="absolute top-2 left-2 z-10 rounded-none lowercase"
                    >
                      {program.tags[0]}
                    </Badge>
                  )}
                </div>
                <div className="space-y-1 p-3">
                  <div className="flex gap-2 text-muted-foreground text-xs uppercase">
                    <span>{program.author}</span>
                    {" - "}
                    <time dateTime={program.date}>
                      {formatLocaleDate(program.date, locale, "programDate")}
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
