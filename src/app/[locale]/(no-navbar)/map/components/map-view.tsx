"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import { HugeiconsIcon } from "@hugeicons/react";
import { LngLat } from "maplibre-gl";
import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";
import {
  Map as MapGL,
  type MapRef,
  Marker,
  type MarkerEvent,
  NavigationControl,
  Popup,
  Source,
  TerrainControl,
} from "react-map-gl/maplibre";
import { BAY_CENTER, categoryColor, categoryIcon } from "@/lib/locations";
import {
  hazardColor,
  hazardIcon,
  type MapItem,
  type MapMode,
} from "../lib/hazard";

const OPENFREEMAP_STYLE = "https://tiles.openfreemap.org/styles/positron";
const TERRAIN_SOURCE_ID = "terrarium-dem";
const TERRAIN_TILES = [
  "https://elevation-tiles-prod.s3.amazonaws.com/terrarium/{z}/{x}/{y}.png",
];
const TERRARIUM_ATTR = "© Amazon Web Services — Terrarium elevation";
const TERRAIN_EXAGGERATION = 1.5;
const DEFAULT_PITCH = 55;
const DEFAULT_BEARING = 30;
const MAX_PITCH = 70;
const RESTING_ZOOM = 13;
const FOCUS_ZOOM = 14;
const ENTRANCE_START_BEARING = -120;
const ENTRANCE_DURATION = 2400;

type MapViewProps = {
  items: MapItem[];
  mode: MapMode;
  selectedId: string | null;
  onSelect: (id: string) => void;
  locale: "en" | "id";
};

export function MapView({
  items,
  mode,
  selectedId,
  onSelect,
  locale,
}: MapViewProps) {
  const t = useTranslations("map");
  const mapRef = useRef<MapRef>(null);
  const initialSelectedHandled = useRef(false);

  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const selected = items.find((i) => i.id === selectedId) ?? null;

  const initialView = (() => {
    const base =
      items.length === 1
        ? {
            longitude: items[0].lng,
            latitude: items[0].lat,
            zoom: RESTING_ZOOM,
          }
        : {
            longitude: BAY_CENTER.lng,
            latitude: BAY_CENTER.lat,
            zoom: RESTING_ZOOM - 4,
          };
    if (reduceMotion) {
      return { ...base, pitch: 0, bearing: 0 };
    }
    return {
      ...base,
      pitch: 0,
      bearing: ENTRANCE_START_BEARING,
    };
  })();

  function handleLoad() {
    const map = mapRef.current?.getMap();
    if (!map) return;

    const selectedItem = selectedId
      ? items.find((i) => i.id === selectedId)
      : null;

    if (selectedItem) {
      initialSelectedHandled.current = true;
      mapRef.current?.flyTo({
        center: [selectedItem.lng, selectedItem.lat],
        zoom: FOCUS_ZOOM,
        pitch: reduceMotion ? 0 : DEFAULT_PITCH,
        bearing: reduceMotion ? 0 : DEFAULT_BEARING,
        duration: reduceMotion ? 0 : 900,
        essential: true,
      });
      return;
    }
    initialSelectedHandled.current = true;

    if (reduceMotion) return;
    let center: [number, number];
    let zoom: number;
    if (items.length === 0) {
      center = [BAY_CENTER.lng, BAY_CENTER.lat];
      zoom = RESTING_ZOOM - 2;
    } else if (items.length === 1) {
      center = [items[0].lng, items[0].lat];
      zoom = RESTING_ZOOM;
    } else {
      const lngs = items.map((i) => i.lng);
      const lats = items.map((i) => i.lat);
      const bounds: [number, number, number, number] = [
        Math.min(...lngs),
        Math.min(...lats),
        Math.max(...lngs),
        Math.max(...lats),
      ];
      const camera = map.cameraForBounds(bounds, {
        padding: { top: 80, bottom: 120, left: 80, right: 80 },
      });
      const c = LngLat.convert(
        camera?.center ??
          ([BAY_CENTER.lng, BAY_CENTER.lat] as [number, number]),
      );
      center = [c.lng, c.lat];
      zoom = Math.min(camera?.zoom ?? RESTING_ZOOM - 3, RESTING_ZOOM - 2);
    }
    mapRef.current?.flyTo({
      center,
      zoom,
      pitch: DEFAULT_PITCH,
      bearing: DEFAULT_BEARING,
      duration: ENTRANCE_DURATION,
      curve: 1.4,
      essential: true,
    });
  }

  useEffect(() => {
    if (!selectedId) return;
    if (!initialSelectedHandled.current) return;
    const item = items.find((i) => i.id === selectedId);
    if (!item) return;
    mapRef.current?.flyTo({
      center: [item.lng, item.lat],
      zoom: FOCUS_ZOOM,
      pitch: reduceMotion ? 0 : DEFAULT_PITCH,
      bearing: reduceMotion ? 0 : DEFAULT_BEARING,
      duration: 900,
      essential: true,
    });
  }, [selectedId, items, reduceMotion]);

  function markerColor(item: MapItem): string {
    if (mode === "hazard" && item.severity) return hazardColor[item.severity];
    if (item.category) return categoryColor[item.category];
    return categoryColor.landmark;
  }

  return (
    <MapGL
      ref={mapRef}
      initialViewState={initialView}
      mapStyle={OPENFREEMAP_STYLE}
      attributionControl={{ compact: true }}
      locale={locale === "id" ? idMapLocale : undefined}
      maxPitch={reduceMotion ? 0 : MAX_PITCH}
      onLoad={handleLoad}
      terrain={
        reduceMotion
          ? undefined
          : {
              source: TERRAIN_SOURCE_ID,
              exaggeration: TERRAIN_EXAGGERATION,
            }
      }
    >
      <NavigationControl position="top-right" showCompass={!reduceMotion} />
      {!reduceMotion && (
        <>
          <Source
            id={TERRAIN_SOURCE_ID}
            type="raster-dem"
            tiles={TERRAIN_TILES}
            encoding="terrarium"
            tileSize={256}
            maxzoom={15}
            attribution={TERRARIUM_ATTR}
          />
          <TerrainControl
            source={TERRAIN_SOURCE_ID}
            exaggeration={TERRAIN_EXAGGERATION}
          />
        </>
      )}

      {items.map((item) => {
        const isActive = item.id === selectedId;
        const color = markerColor(item);
        const icon =
          mode === "hazard"
            ? hazardIcon
            : item.category
              ? categoryIcon[item.category]
              : categoryIcon.landmark;
        return (
          <Marker
            key={item.id}
            longitude={item.lng}
            latitude={item.lat}
            anchor="bottom"
            onClick={(e: MarkerEvent<MouseEvent>) => {
              e.originalEvent.stopPropagation();
              onSelect(item.id);
            }}
          >
            <button
              type="button"
              style={{ backgroundColor: color }}
              className={`flex cursor-pointer items-center justify-center rounded-full text-background ring-1 ring-background transition-all duration-200 ease-out motion-reduce:transition-none ${
                isActive
                  ? "h-8 w-8 ring-2 ring-background"
                  : "h-6 w-6 hover:h-7 hover:ring-2"
              }`}
              aria-label={item.label[locale]}
            >
              <HugeiconsIcon icon={icon} size={isActive ? 18 : 14} />
              <span
                aria-hidden="true"
                style={{ borderColor: color }}
                className={`absolute rounded-full border motion-reduce:hidden ${
                  isActive ? "h-11 w-11 animate-ping" : "h-0 w-0"
                }`}
              />
            </button>
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
          className="p-0! font-sans"
        >
          {mode === "hazard" && selected.quake ? (
            <>
              <p className="font-bold font-sans text-foreground text-sm uppercase leading-snug">
                M{selected.quake.magnitude.toFixed(1)}
              </p>
              <p className="font-sans text-muted-foreground text-xs uppercase">
                {selected.quake.region}
              </p>
            </>
          ) : (
            <>
              <p className="font-bold font-sans text-foreground text-sm uppercase leading-snug">
                {selected.label[locale]}
              </p>
              {selected.category && (
                <p className="font-sans text-muted-foreground text-xs uppercase">
                  {t(`kategori.${selected.category}`)}
                </p>
              )}
            </>
          )}
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
