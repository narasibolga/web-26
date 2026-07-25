"use client";

import { Loading01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import type { MapItem } from "../lib/hazard";
import { LocationCard } from "./location-card";

type TourismPanelProps = {
  filteredTourism: MapItem[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
  locale: "en" | "id";
  onResetCategories: () => void;
};

export function TourismPanel({
  filteredTourism,
  selectedId,
  onSelect,
  locale,
  onResetCategories,
}: TourismPanelProps) {
  const t = useTranslations("map");

  if (filteredTourism.length === 0) {
    return (
      <Empty className="border-border p-6 text-muted-foreground">
        <EmptyHeader>
          <EmptyTitle className="font-sans text-foreground">
            {t("noMatchesTitle")}
          </EmptyTitle>
          <EmptyDescription className="font-sans text-muted-foreground">
            {t("noMatchesDescription")}
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <Button
            variant="outline-foreground"
            size="sm"
            onClick={onResetCategories}
          >
            {t("resetFilter")}
          </Button>
        </EmptyContent>
      </Empty>
    );
  }

  return (
    <div className="divide-y divide-border">
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
      <div className="flex items-center gap-2 px-4 py-6 font-sans text-muted-foreground text-sm">
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
      <Empty className="border-border p-6 text-muted-foreground">
        <EmptyHeader>
          <EmptyTitle className="font-sans text-foreground">
            {t("hazardsErrorTitle")}
          </EmptyTitle>
          <EmptyDescription className="font-sans text-muted-foreground">
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
      <p className="px-4 py-4 font-sans text-muted-foreground text-sm">
        {t("noQuakes")}
      </p>
    );
  }

  return (
    <div className="divide-y divide-border">
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
