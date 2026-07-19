"use client";

import { Loading01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  categoryColor,
  categoryIcon,
  categoryOrder,
  type LocationCategory,
  locations,
} from "@/lib/locations";
import { cn } from "@/lib/utils";
import type { MapItem } from "../lib/hazard";
import { LocationCard } from "./location-card";

type TourismPanelProps = {
  activeCategories: Set<LocationCategory>;
  filteredTourism: MapItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  locale: "en" | "id";
  onToggleCategory: (cat: LocationCategory) => void;
  onResetCategories: () => void;
};

export function TourismPanel({
  activeCategories,
  filteredTourism,
  selectedId,
  onSelect,
  locale,
  onToggleCategory,
  onResetCategories,
}: TourismPanelProps) {
  const t = useTranslations("map");

  return (
    <>
      <div className="flex flex-wrap gap-2 border-secondary-foreground/15 border-b px-4 py-3">
        {categoryOrder.map((cat) => {
          const isActive = activeCategories.has(cat);
          return (
            <Badge
              key={cat}
              variant="outline"
              render={
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-label={t(`kategori.${cat}`)}
                  onClick={() => onToggleCategory(cat)}
                />
              }
              className={cn(
                "h-6 uppercase",
                isActive
                  ? "border-secondary-foreground bg-secondary-foreground/15 text-secondary-foreground"
                  : "border-secondary-foreground/30 text-secondary-foreground/70 hover:bg-secondary-foreground/10 hover:text-secondary-foreground",
              )}
            >
              <span
                aria-hidden="true"
                className="flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full text-background"
                style={{ backgroundColor: categoryColor[cat] }}
              >
                <HugeiconsIcon icon={categoryIcon[cat]} size={12} />
              </span>
              {t(`kategori.${cat}`)}
            </Badge>
          );
        })}
      </div>
      {filteredTourism.length === 0 ? (
        <Empty className="border-secondary-foreground/20 p-6 text-secondary-foreground/70">
          <EmptyHeader>
            <EmptyTitle className="font-sans text-secondary-foreground">
              {t("noMatchesTitle")}
            </EmptyTitle>
            <EmptyDescription className="font-sans text-secondary-foreground/70">
              {t("noMatchesDescription")}
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <Button variant="outline" size="sm" onClick={onResetCategories}>
              {t("resetFilter")}
            </Button>
          </EmptyContent>
        </Empty>
      ) : (
        <div className="divide-y divide-secondary-foreground/15">
          {filteredTourism.map((item) => (
            <LocationCard
              key={item.id}
              item={item}
              selected={item.id === selectedId}
              onSelect={onSelect}
              locale={locale}
            />
          ))}
        </div>
      )}
    </>
  );
}

type HazardPanelProps = {
  isPending: boolean;
  isError: boolean;
  hazardItems: MapItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  locale: "en" | "id";
  onRetry: () => void;
};

export function HazardPanel({
  isPending,
  isError,
  hazardItems,
  selectedId,
  onSelect,
  locale,
  onRetry,
}: HazardPanelProps) {
  const t = useTranslations("map");

  if (isPending) {
    return (
      <div className="flex items-center gap-2 px-4 py-6 font-sans text-secondary-foreground/70 text-sm">
        <HugeiconsIcon
          icon={Loading01Icon}
          className="animate-spin"
          size={16}
        />
        {t("hazardsLoading")}
      </div>
    );
  }

  if (isError) {
    return (
      <Empty className="border-secondary-foreground/20 p-6 text-secondary-foreground/70">
        <EmptyHeader>
          <EmptyTitle className="font-sans text-secondary-foreground">
            {t("hazardsErrorTitle")}
          </EmptyTitle>
          <EmptyDescription className="font-sans text-secondary-foreground/70">
            {t("hazardsErrorDescription")}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button variant="outline" size="sm" onClick={onRetry}>
            {t("hazardsRetry")}
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  if (hazardItems.length === 0) {
    return (
      <p className="px-4 py-4 font-sans text-secondary-foreground/70 text-sm">
        {t("noQuakes")}
      </p>
    );
  }

  return (
    <div className="divide-y divide-secondary-foreground/15">
      {hazardItems.map((item) => (
        <LocationCard
          key={item.id}
          item={item}
          selected={item.id === selectedId}
          onSelect={onSelect}
          locale={locale}
        />
      ))}
    </div>
  );
}

export { locations };
