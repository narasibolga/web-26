"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { categoryColor, categoryIcon } from "@/lib/locations";
import { hazardColor, hazardIcon, type MapItem } from "../lib/hazard";

type LocationCardProps = {
  item: MapItem;
  selected: boolean;
  onSelect: (id: string) => void;
  locale: "en" | "id";
};

export function LocationCard({
  item,
  selected,
  onSelect,
  locale,
}: LocationCardProps) {
  const t = useTranslations("map");

  if (item.mode === "hazard" && item.severity && item.quake) {
    const color = hazardColor[item.severity];
    const q = item.quake;
    return (
      <button
        type="button"
        aria-pressed={selected}
        aria-label={item.label[locale]}
        onClick={() => onSelect(item.id)}
        className={`group relative w-full py-3 pr-3 pl-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary ${
          selected
            ? "bg-secondary-foreground/15"
            : "bg-secondary hover:bg-secondary-foreground/10"
        }`}
      >
        <span
          aria-hidden="true"
          className={`absolute top-0 bottom-0 left-0 w-px transition-colors ${
            selected
              ? "bg-secondary-foreground"
              : "bg-transparent group-hover:bg-secondary-foreground/30"
          }`}
        />
        <span className="flex flex-row items-center gap-3">
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-background"
            style={{ backgroundColor: color }}
          >
            <HugeiconsIcon icon={hazardIcon} size={22} />
          </span>
          <span className="flex min-w-0 flex-col gap-1">
            <span className="font-serif text-base text-secondary-foreground leading-snug">
              M{q.magnitude.toFixed(1)} — {q.region}
            </span>
            <span className="flex items-center gap-1.5 font-sans text-secondary-foreground/70 text-xs uppercase">
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-[1px]"
                style={{ backgroundColor: color }}
              />
              {t(`severity.${item.severity}`)}
              <span aria-hidden="true">·</span>
              <span>{formatDate(q.datetime, locale)}</span>
            </span>
          </span>
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={item.label[locale]}
      onClick={() => onSelect(item.id)}
      className={`group relative w-full py-3 pr-3 pl-4 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-secondary ${
        selected
          ? "bg-secondary-foreground/15"
          : "bg-secondary hover:bg-secondary-foreground/10"
      }`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-0 bottom-0 left-0 w-px transition-colors ${
          selected
            ? "bg-secondary-foreground"
            : "bg-transparent group-hover:bg-secondary-foreground/30"
        }`}
      />
      <span className="flex flex-row items-center gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-background"
          style={{
            backgroundColor: item.category
              ? categoryColor[item.category]
              : categoryColor.landmark,
          }}
        >
          <HugeiconsIcon
            icon={
              item.category
                ? categoryIcon[item.category]
                : categoryIcon.landmark
            }
            size={22}
          />
        </span>
        <span className="flex flex-col gap-1">
          <span className="font-serif text-base text-secondary-foreground leading-snug">
            {item.label[locale]}
          </span>
          {item.category && (
            <span className="font-sans text-secondary-foreground/70 text-xs uppercase">
              {t(`kategori.${item.category}`)}
            </span>
          )}
        </span>
      </span>
    </button>
  );
}

function formatDate(iso: string, locale: "en" | "id"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-GB", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d);
}
