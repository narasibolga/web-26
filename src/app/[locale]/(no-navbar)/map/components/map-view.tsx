"use client";

import { HugeiconsIcon } from "@hugeicons/react";
import "maplibre-gl/dist/maplibre-gl.css";
import { useTranslations } from "next-intl";
import { useMemo, useRef } from "react";
import {
  Map as MapGL,
  type MapRef,
  Marker,
  type MarkerEvent,
  NavigationControl,
  Popup,
} from "react-map-gl/maplibre";
import { categoryMeta, type Location } from "@/lib/locations";

const OPENFREEMAP_STYLE = "https://tiles.openfreemap.org/styles/positron";

type MapViewProps = {
  locations: Location[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  locale: "en" | "id";
};

export function MapView({
  locations,
  selectedId,
  onSelect,
  locale,
}: MapViewProps) {
  const t = useTranslations("map");
  const mapRef = useRef<MapRef>(null);

  const selected = useMemo(
    () => locations.find((l) => l.id === selectedId) ?? null,
    [locations, selectedId],
  );

  const initialView = useMemo(() => {
    if (locations.length === 1) {
      return {
        longitude: locations[0].lng,
        latitude: locations[0].lat,
        zoom: 12,
      };
    }
    return { longitude: 98.7833, latitude: 1.7431, zoom: 11 };
  }, [locations]);

  function flyTo(location: Location) {
    mapRef.current?.flyTo({
      center: [location.lng, location.lat],
      zoom: 13,
      duration: 900,
      essential: true,
    });
  }

  return (
    <MapGL
      ref={mapRef}
      initialViewState={initialView}
      mapStyle={OPENFREEMAP_STYLE}
      attributionControl={{ compact: true }}
      locale={locale === "id" ? idMapLocale : undefined}
    >
      <NavigationControl position="top-right" showCompass={false} />

      {locations.map((location) => {
        const isActive = location.id === selectedId;
        const meta = categoryMeta[location.category];
        return (
          <Marker
            key={location.id}
            longitude={location.lng}
            latitude={location.lat}
            anchor="bottom"
            onClick={(e: MarkerEvent<MouseEvent>) => {
              e.originalEvent.stopPropagation();
              onSelect(location.id);
              flyTo(location);
            }}
          >
            <span
              className={`flex cursor-pointer items-center justify-center rounded-full border-2 border-background shadow-md transition-transform ${meta.dot} ${isActive ? "h-9 w-9 scale-110" : "h-7 w-7 hover:scale-110"}`}
              role="button"
              tabIndex={0}
              aria-label={location.name[locale]}
            >
              <HugeiconsIcon icon={meta.icon} size={isActive ? 18 : 14} />
            </span>
          </Marker>
        );
      })}

      {selected && (
        <Popup
          longitude={selected.lng}
          latitude={selected.lat}
          anchor="bottom"
          offset={[0, -24]}
          closeOnClick={false}
          closeButton={false}
          className="font-sans"
        >
          <p className="font-semibold text-foreground text-sm">
            {selected.name[locale]}
          </p>
          <p className="mt-0.5 text-muted-foreground text-xs">
            {t(`kategori.${selected.category}`)}
          </p>
        </Popup>
      )}
    </MapGL>
  );
}

const idMapLocale: Record<string, string> = {
  "NavigationControl.ResetBearing": "Putar utara",
  "NavigationControl.ZoomIn": "Perbesar",
  "NavigationControl.ZoomOut": "Perkecil",
  "AttributionControl.ToggleAttribution": "Beralih atribusi",
  "FullscreenControl.Enter": "Layar penuh",
  "FullscreenControl.Exit": "Keluar layar penuh",
};
