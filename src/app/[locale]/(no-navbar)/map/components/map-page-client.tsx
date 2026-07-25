"use client";

import { Home01Icon, Loading01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link, useTypedLocale } from "@/i18n/navigation";
import { useUpdateSearchParams } from "@/i18n/search-params";
import type { Earthquake } from "@/lib/bmkg";
import {
  categoryColor,
  categoryIcon,
  categoryOrder,
  type LocationCategory,
  locations,
} from "@/lib/locations";
import { cn } from "@/lib/utils";
import {
  type MapMode,
  normalizeLocations,
  normalizeQuakes,
} from "../lib/hazard";
import { LocationDetail } from "./location-detail";
import { MapNavPanel } from "./map-nav-panel";
import { HazardPanel, TourismPanel } from "./map-panels";

const MapView = dynamic(() => import("./map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => <MapLoading />,
});

export function MapPageClient() {
  const locale = useTypedLocale();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("location");
  const updateSearchParams = useUpdateSearchParams();
  const [activeCategories, setActiveCategories] = useState<
    Set<LocationCategory>
  >(new Set());
  const [mode, setMode] = useState<MapMode>("tourism");
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["bmkg-hazards"],
    queryFn: async () => {
      const res = await fetch("/api/bmkg/hazards");
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(
          `bmkg upstream ${res.status}: ${body?.error ?? "unknown"}`,
        );
      }
      return (await res.json()) as { earthquakes: Earthquake[] };
    },
    enabled: mode === "hazard",
    staleTime: 5 * 60 * 1000,
  });

  const selectLocation = (id: string | null) => {
    updateSearchParams((params) => {
      if (id) params.set("location", id);
      else params.delete("location");
    });
  };

  const switchMode = (next: MapMode) => {
    if (next === mode) return;
    updateSearchParams((params) => params.delete("location"));
    setMode(next);
    setSearchQuery("");
  };

  const toggleCategory = (cat: LocationCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const resetCategories = () => setActiveCategories(new Set());

  const tourismItems = useMemo(() => normalizeLocations(locations), []);
  const filteredTourism = useMemo(() => {
    let items = tourismItems;
    if (activeCategories.size > 0) {
      items = items.filter(
        (i) => i.category && activeCategories.has(i.category),
      );
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      items = items.filter((i) => i.label[locale].toLowerCase().includes(q));
    }
    return items;
  }, [tourismItems, activeCategories, searchQuery, locale]);

  const hazardItems = normalizeQuakes(data?.earthquakes ?? []);

  const items = mode === "tourism" ? filteredTourism : hazardItems;
  const selectedItem = items.find((i) => i.id === selectedId) ?? null;

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
      <MapView
        items={items}
        mode={mode}
        selectedId={selectedId}
        onSelect={selectLocation}
        locale={locale}
      />

      <BackHomeButton />

      <FilterBar
        activeCategories={activeCategories}
        onToggleCategory={toggleCategory}
      />

      <MapNavPanel
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={mode === "tourism" && !selectedItem}
      >
        <div className="flex h-full min-w-0 flex-col bg-background text-foreground">
          {selectedItem ? (
            <LocationDetail
              key={selectedItem.id}
              item={selectedItem}
              onBack={() => selectLocation(null)}
              locale={locale}
            />
          ) : (
            <div className="flex-1 overflow-y-auto">
              {mode === "tourism" ? (
                <TourismPanel
                  filteredTourism={filteredTourism}
                  selectedId={selectedId}
                  onSelect={selectLocation}
                  locale={locale}
                  onResetCategories={resetCategories}
                />
              ) : (
                <HazardPanel
                  isPending={isPending}
                  isError={isError}
                  hazardItems={hazardItems}
                  selectedId={selectedId}
                  onSelect={selectLocation}
                  locale={locale}
                  onRetry={() => refetch()}
                />
              )}
            </div>
          )}
        </div>
      </MapNavPanel>

      <ModeSwitch mode={mode} onSwitch={switchMode} />
    </main>
  );
}

function BackHomeButton() {
  const t = useTranslations("map");
  return (
    <Button
      variant="secondary"
      size="icon"
      aria-label={t("backHome")}
      render={<Link href="/" />}
      nativeButton={false}
      className="absolute top-4 left-4 z-30 size-10 rounded-full bg-background text-foreground shadow-md"
    >
      <HugeiconsIcon icon={Home01Icon} size={18} />
    </Button>
  );
}

type FilterBarProps = {
  activeCategories: Set<LocationCategory>;
  onToggleCategory: (cat: LocationCategory) => void;
};

function FilterBar({ activeCategories, onToggleCategory }: FilterBarProps) {
  const t = useTranslations("map");
  return (
    <div className="max-lg:-translate-x-1/2 pointer-events-none absolute top-4 lg:right-4 max-lg:left-1/2 z-20 w-[calc(100%-8rem)] max-w-2xl lg:w-auto">
      <div className="pointer-events-auto flex gap-1 overflow-x-auto p-1">
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
                "h-7 shrink-0 gap-1 rounded-full border-border bg-background px-2 text-foreground uppercase shadow-sm",
                isActive && "ring-1",
              )}
              style={
                isActive
                  ? {
                      boxShadow: `0 0 0 2px ${categoryColor[cat]}, 0 1px 2px 0 rgb(0 0 0 / 0.05)`,
                    }
                  : undefined
              }
            >
              <span
                aria-hidden="true"
                className="mr-1.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-background"
                style={{ backgroundColor: categoryColor[cat] }}
              >
                <HugeiconsIcon icon={categoryIcon[cat]} size={10} />
              </span>
              {t(`kategori.${cat}`)}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

type ModeSwitchProps = {
  mode: MapMode;
  onSwitch: (mode: MapMode) => void;
};

function ModeSwitch({ mode, onSwitch }: ModeSwitchProps) {
  const t = useTranslations("map");
  return (
    <div className="absolute right-4 bottom-4 z-30">
      <div className="flex gap-1 rounded-full border border-border bg-background p-1 shadow-md">
        {(["tourism", "hazard"] as const).map((m) => {
          const isActive = m === mode;
          return (
            <Badge
              key={m}
              variant="outline"
              render={
                <button
                  type="button"
                  aria-pressed={isActive}
                  aria-label={t(`mode.${m}`)}
                  onClick={() => onSwitch(m)}
                />
              }
              className={cn(
                "h-9 rounded-full border-none px-4 font-medium text-sm uppercase",
                isActive
                  ? "bg-foreground text-background"
                  : "text-foreground hover:bg-muted",
              )}
            >
              {t(`mode.${m}`)}
            </Badge>
          );
        })}
      </div>
    </div>
  );
}

function MapLoading() {
  const t = useTranslations("map");
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-muted text-muted-foreground">
      <HugeiconsIcon icon={Loading01Icon} className="animate-spin" />
      <p className="font-sans text-muted-foreground text-sm uppercase">
        {t("mapLoading")}
      </p>
    </div>
  );
}
