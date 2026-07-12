"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Empty, EmptyHeader, EmptyTitle } from "@/components/ui/empty";
import { Link } from "@/i18n/navigation";
import type { ProgramMeta } from "@/lib/programs";

type ProgramListProps = {
  programs: ProgramMeta[];
};

export function ProgramList({ programs }: ProgramListProps) {
  const t = useTranslations("programs");
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
          className={`${activeTag === "all" ? "underline" : ""}`}
        >
          {t("tags.all")}
        </Button>
        {tags.map((tag) => (
          <Button
            key={tag}
            variant="link"
            size="none"
            onClick={() => setActiveTag(tag)}
            className={`${activeTag === tag ? "underline" : ""}`}
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
          {filtered.map((program) => (
            <li key={program.slug}>
              <Link href={`/programs/${program.slug}`} className="group block">
                <h2 className="font-serif text-2xl text-foreground transition-opacity group-hover:opacity-70">
                  {program.title}
                </h2>
                <time
                  dateTime={program.date}
                  className="text-muted-foreground text-sm"
                >
                  {program.date}
                </time>
                <p className="mt-1 text-muted-foreground">{program.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
