import { Alert02Icon } from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";
import type { Earthquake } from "@/lib/bmkg";
import type { Location, LocationCategory } from "@/lib/locations";

export type Severity = "red" | "yellow" | "green";

export type MapMode = "tourism" | "hazard";

export type MapItem = {
  id: string;
  lat: number;
  lng: number;
  label: { en: string; id: string };
  mode: MapMode;
  category?: LocationCategory;
  images?: string[];
  description?: { en: string; id: string };
  severity?: Severity;
  quake?: Earthquake;
};

export const hazardColor: Record<Severity, string> = {
  red: "oklch(0.58 0.2 27)",
  yellow: "oklch(0.75 0.15 85)",
  green: "oklch(0.6 0.13 145)",
};

export const hazardIcon: IconSvgElement = Alert02Icon;

export function severityForQuake(q: Earthquake): Severity {
  if (q.magnitude >= 6.0 || q.tsunamiPotential) return "red";
  if (q.magnitude >= 5.0) return "yellow";
  return "green";
}

export function normalizeLocations(locs: Location[]): MapItem[] {
  return locs.map((l) => ({
    id: l.id,
    lat: l.lat,
    lng: l.lng,
    label: l.name,
    mode: "tourism" as const,
    category: l.category,
    images: l.images,
    description: l.description,
  }));
}

export function normalizeQuakes(quakes: Earthquake[]): MapItem[] {
  return quakes.map((q) => ({
    id: q.id,
    lat: q.lat,
    lng: q.lng,
    label: quakeLabel(q),
    mode: "hazard" as const,
    severity: severityForQuake(q),
    quake: q,
  }));
}

function quakeLabel(q: Earthquake): { en: string; id: string } {
  const m = q.magnitude.toFixed(1);
  const region = q.region || `${q.lat.toFixed(2)}, ${q.lng.toFixed(2)}`;
  const en = `M${m} — ${region}`;
  return { en, id: en };
}
