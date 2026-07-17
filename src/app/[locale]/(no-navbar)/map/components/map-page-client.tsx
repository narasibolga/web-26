"use client";

import { ArrowLeft01Icon, Loading01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import type { Earthquake } from "@/app/api/bmkg/hazards/route";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
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
import { LocationCard } from "./location-card";
import { LocationDetail } from "./location-detail";
import { MapNavPanel } from "./map-nav-panel";

const MapView = dynamic(() => import("./map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => <MapLoading />,
});

export function MapPageClient() {
  const t = useTranslations("map");
  const locale = useLocale() as "en" | "id";
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const selectedId = searchParams.get("location");
  const [activeCategories, setActiveCategories] = useState<
    Set<LocationCategory>
  >(new Set());
  const [mode, setMode] = useState<MapMode>("tourism");
  const { data, isPending, isError, refetch } = useQuery({
    queryKey: ["bmkg-hazards"],
    queryFn: async () => {
      const res = await fetch("/api/bmkg/hazards");
      if (!res.ok) throw new Error("upstream");
      return (await res.json()) as { earthquakes: Earthquake[] };
    },
    enabled: mode === "hazard",
    staleTime: 5 * 60 * 1000,
  });

  const selectLocation = (id: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (id) params.set("location", id);
    else params.delete("location");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
  };

  const switchMode = (next: MapMode) => {
    if (next === mode) return;
    const params = new URLSearchParams(searchParams.toString());
    params.delete("location");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname);
    setMode(next);
  };

  const toggleCategory = (cat: LocationCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const tourismItems = normalizeLocations(locations);
  const filteredTourism =
    activeCategories.size === 0
      ? tourismItems
      : tourismItems.filter(
          (i) => i.category && activeCategories.has(i.category),
        );

  const hazardItems = normalizeQuakes(data?.earthquakes ?? []);

  const items = mode === "tourism" ? filteredTourism : hazardItems;
  const selectedItem = items.find((i) => i.id === selectedId) ?? null;

  return (
    <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
      <MapNavPanel>
        <div className="flex h-full min-w-0 flex-col">
          {selectedItem ? (
            <LocationDetail
              key={selectedItem.id}
              item={selectedItem}
              onBack={() => selectLocation(null)}
              locale={locale}
            />
          ) : (
            <>
              <div className="shrink-0 border-secondary-foreground/15 p-4">
                <Button
                  variant="tertiary"
                  render={<Link href="/" />}
                  nativeButton={false}
                >
                  <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                  {t("backHome")}
                </Button>
                <h1 className="mt-3 font-serif text-4xl text-secondary-foreground leading-tight">
                  {mode === "tourism" ? t("title") : t("hazardTitle")}
                </h1>
              </div>
              <div className="flex-1 overflow-y-auto">
                {mode === "tourism" ? (
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
                                onClick={() => toggleCategory(cat)}
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
                              <HugeiconsIcon
                                icon={categoryIcon[cat]}
                                size={12}
                              />
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
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setActiveCategories(new Set())}
                          >
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
                            onSelect={selectLocation}
                            locale={locale}
                          />
                        ))}
                      </div>
                    )}
                  </>
                ) : isPending ? (
                  <div className="flex items-center gap-2 px-4 py-6 font-sans text-secondary-foreground/70 text-sm">
                    <HugeiconsIcon
                      icon={Loading01Icon}
                      className="animate-spin"
                      size={16}
                    />
                    {t("hazardsLoading")}
                  </div>
                ) : isError ? (
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
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => refetch()}
                      >
                        {t("hazardsRetry")}
                      </Button>
                    </EmptyContent>
                  </Empty>
                ) : hazardItems.length === 0 ? (
                  <p className="px-4 py-4 font-sans text-secondary-foreground/70 text-sm">
                    {t("noQuakes")}
                  </p>
                ) : (
                  <div className="divide-y divide-secondary-foreground/15">
                    {hazardItems.map((item) => (
                      <LocationCard
                        key={item.id}
                        item={item}
                        selected={item.id === selectedId}
                        onSelect={selectLocation}
                        locale={locale}
                      />
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </MapNavPanel>
      <div className="relative min-h-0 flex-1">
        <MapView
          items={items}
          mode={mode}
          selectedId={selectedId}
          onSelect={selectLocation}
          locale={locale}
        />
        <div className="-translate-x-1/2 absolute top-4 left-1/2 z-20">
          <div className="flex gap-1 rounded-full border border-secondary-foreground/15 bg-secondary p-1 shadow-md">
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
                      onClick={() => switchMode(m)}
                    />
                  }
                  className={cn(
                    "h-8 rounded-full border-none px-4 uppercase",
                    isActive
                      ? "bg-background text-foreground"
                      : "text-secondary-foreground/70 hover:bg-secondary-foreground/10 hover:text-secondary-foreground",
                  )}
                >
                  {t(`mode.${m}`)}
                </Badge>
              );
            })}
          </div>
        </div>
      </div>
    </main>
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
