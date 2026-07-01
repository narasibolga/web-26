"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { categoryMeta, type Location } from "@/lib/locations";

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
  const meta = categoryMeta[location.category];

  return (
    <button
      type="button"
      aria-pressed={selected}
      aria-label={location.name[locale]}
      onClick={() => onSelect(location.id)}
      className={`group flex min-h-[44px] w-full items-center gap-3 rounded-lg border p-3 text-left outline-none transition-all duration-200 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 active:scale-[0.97] ${
        selected
          ? "border-primary bg-primary/5"
          : "border-border bg-background hover:border-primary/40 hover:bg-muted/50"
      }`}
    >
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${meta.badge}`}
        aria-hidden="true"
      >
        <HugeiconsIcon icon={meta.icon} size={20} />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate font-semibold text-foreground text-sm leading-snug">
          {location.name[locale]}
        </span>
        <span className="mt-0.5 text-[10px] text-muted-foreground uppercase tracking-widest">
          {t(`kategori.${location.category}`)}
        </span>
      </span>
    </button>
  );
}
