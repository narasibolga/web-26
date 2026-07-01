"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { categoryColor, categoryIcon, type Location } from "@/lib/locations";

type LocationCardProps = {
  location: Location;
  selected: boolean;
  onSelect: (id: string) => void;
  locale: "en" | "id";
};

export function LocationCard({
  location,
  selected,
  onSelect,
  locale,
}: LocationCardProps) {
  const t = useTranslations("map");

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={location.name[locale]}
      onClick={() => onSelect(location.id)}
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
          style={{ backgroundColor: categoryColor[location.category] }}
        >
          <HugeiconsIcon icon={categoryIcon[location.category]} size={22} />
        </span>
        <span className="flex flex-col gap-1">
          <span className="font-serif text-base text-secondary-foreground leading-snug">
            {location.name[locale]}
          </span>
          <span className="font-sans text-secondary-foreground/70 text-xs uppercase">
            {t(`kategori.${location.category}`)}
          </span>
        </span>
      </span>
    </button>
  );
}
