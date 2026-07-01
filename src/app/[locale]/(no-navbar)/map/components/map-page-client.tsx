"use client";

import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { useCallback, useState } from "react";
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
import { LocationCard } from "./location-card";
import { LocationDetail } from "./location-detail";

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

  const selectLocation = useCallback(
    (id: string | null) => {
      const params = new URLSearchParams(searchParams.toString());
      if (id) params.set("location", id);
      else params.delete("location");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname);
    },
    [searchParams, router, pathname],
  );

  const toggleCategory = (cat: LocationCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const filteredLocations =
    activeCategories.size === 0
      ? locations
      : locations.filter((l) => activeCategories.has(l.category));

  const selectedLocation = locations.find((l) => l.id === selectedId) ?? null;

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
      <aside className="relative z-10 h-[45%] shrink-0 overflow-hidden border-secondary-foreground/15 border-b bg-secondary text-secondary-foreground lg:h-full lg:w-85 lg:border-r lg:border-b-0">
        <div className="flex h-full min-w-0 flex-col">
          {selectedLocation ? (
            <LocationDetail
              key={selectedLocation.id}
              location={selectedLocation}
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
                  {t("title")}
                </h1>
              </div>
              <div className="flex-1 overflow-y-auto">
                {locations.length === 0 ? (
                  <p className="px-4 py-4 font-sans text-secondary-foreground/70 text-sm">
                    {t("noLocations")}
                  </p>
                ) : (
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
                    {filteredLocations.length === 0 ? (
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
                        {filteredLocations.map((location) => (
                          <LocationCard
                            key={location.id}
                            location={location}
                            selected={location.id === selectedId}
                            onSelect={selectLocation}
                            locale={locale}
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </aside>
      <div className="relative min-h-0 flex-1">
        <MapView
          locations={filteredLocations}
          selectedId={selectedId}
          onSelect={selectLocation}
          locale={locale}
        />
      </div>
    </main>
  );
}

function MapLoading() {
  const t = useTranslations("map");
  return (
    <div className="flex h-full w-full items-center justify-center bg-muted">
      <p className="font-sans text-muted-foreground text-sm">
        {t("mapLoading")}
      </p>
    </div>
  );
}
