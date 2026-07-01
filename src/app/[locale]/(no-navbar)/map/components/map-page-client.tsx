"use client";

import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";
import { HugeiconsIcon } from "@hugeicons/react";
import dynamic from "next/dynamic";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/i18n/navigation";
import { locations } from "@/lib/locations";
import { LocationCard } from "./location-card";

const MapView = dynamic(() => import("./map-view").then((m) => m.MapView), {
  ssr: false,
  loading: () => <MapLoading />,
});

export function MapPageClient() {
  const t = useTranslations("map");
  const locale = useLocale() as "en" | "id";
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <main className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
      <aside className="relative z-10 h-[45%] shrink-0 border-border border-b bg-background/96 backdrop-blur-sm lg:h-auto lg:h-full lg:w-[340px] lg:border-r lg:border-b-0">
        <div className="flex h-full flex-col">
          <div className="shrink-0 border-border border-b px-4 py-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-md text-muted-foreground text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
              {t("backHome")}
            </Link>
            <h1 className="mt-2 font-serif text-2xl text-foreground leading-tight">
              {t("title")}
            </h1>
            <p className="mt-1 text-muted-foreground text-sm">{t("hint")}</p>
          </div>
          <div className="flex-1 overflow-y-auto p-3">
            {locations.length === 0 ? (
              <p className="px-2 py-4 text-muted-foreground text-sm">
                {t("noLocations")}
              </p>
            ) : (
              <div className="grid gap-2">
                {locations.map((location) => (
                  <LocationCard
                    key={location.id}
                    location={location}
                    selected={location.id === selectedId}
                    onSelect={setSelectedId}
                    locale={locale}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </aside>
      <div className="relative min-h-0 flex-1">
        <MapView
          locations={locations}
          selectedId={selectedId}
          onSelect={setSelectedId}
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
      <p className="text-muted-foreground text-sm">{t("mapLoading")}</p>
    </div>
  );
}
