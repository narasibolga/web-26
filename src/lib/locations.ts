import {
  BedIcon,
  Building04Icon,
  Camera01Icon,
  Tree01Icon,
  Utensils,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

export const BAY_CENTER = { lat: 1.7431, lng: 98.7833 };

function toDMS(value: number, isLat: boolean): string {
  const dir = isLat ? (value >= 0 ? "N" : "S") : value >= 0 ? "E" : "W";
  const abs = Math.abs(value);
  const deg = Math.floor(abs);
  const min = Math.floor((abs - deg) * 60);
  return `${deg}°${String(min).padStart(2, "0")}′${dir}`;
}

export function formatCoord(lat: number, lng: number): string {
  return `${toDMS(lat, true)} ${toDMS(lng, false)}`;
}

export type LocationCategory =
  | "wisata"
  | "kuliner"
  | "penginapan"
  | "sejarah"
  | "alam";

export const categoryColor: Record<LocationCategory, string> = {
  alam: "oklch(0.55 0.13 150)",
  wisata: "oklch(0.6 0.11 200)",
  kuliner: "oklch(0.65 0.13 50)",
  penginapan: "oklch(0.5 0.1 260)",
  sejarah: "oklch(0.6 0.08 85)",
};

export const categoryIcon: Record<LocationCategory, IconSvgElement> = {
  alam: Tree01Icon,
  wisata: Camera01Icon,
  kuliner: Utensils,
  penginapan: BedIcon,
  sejarah: Building04Icon,
};

export const categoryOrder: LocationCategory[] = [
  "alam",
  "wisata",
  "kuliner",
  "penginapan",
  "sejarah",
];

export type Location = {
  id: string;
  name: { en: string; id: string };
  category: LocationCategory;
  lat: number;
  lng: number;
  images: string[];
  description: { en: string; id: string };
};

// TODO: replace placeholder images with real photos per location.
const PLACEHOLDER_IMAGES = [
  "/mohonk-history.jpg",
  "/mohonk-history.jpg",
  "/mohonk-history.jpg",
];

export const locations: Location[] = [
  {
    id: "sibolga-kota",
    name: { en: "Sibolga City", id: "Kota Sibolga" },
    category: "wisata",
    lat: 1.7431,
    lng: 98.7833,
    images: PLACEHOLDER_IMAGES,
    description: {
      en: "The working port at the head of Tapanuli Bay, where the morning fish market spills onto the waterfront and the old town climbs the hill behind it.",
      id: "Pelabuhan utama di ujung Teluk Tapanuli, tempat pasar ikan pagi memenuhi tepi pantai dan kota tua naik ke bukit di belakangnya.",
    },
  },
  {
    id: "pulau-poncan",
    name: { en: "Poncan Island", id: "Pulau Poncan" },
    category: "alam",
    lat: 1.7109,
    lng: 98.7635,
    images: PLACEHOLDER_IMAGES,
    description: {
      en: "A low wooded island a short boat ride from Sibolga, ringed by reefs and quiet beaches, with a colonial-era lighthouse at its northern tip.",
      id: "Pulau berhutan rendah yang berjarak sekadar perahu dari Sibolga, dikelilingi terumbu dan pantai yang tenang, dengan mercusuar peninggalan kolonial di ujung utaranya.",
    },
  },
  {
    id: "pulau-kalimantung",
    name: { en: "Kalimantung Island", id: "Pulau Kalimantung" },
    category: "alam",
    lat: 1.5615,
    lng: 98.5764,
    images: PLACEHOLDER_IMAGES,
    description: {
      en: "The southernmost of the bay's islands, uninhabited except for fishermen's shelters, with clear water over a wide reef flat on its western side.",
      id: "Pulau paling selatan di teluk ini, tak berpenghuni kecuali pondok nelayan, dengan air jernih di atas dataran terumbu yang lebar di sisi baratnya.",
    },
  },
  {
    id: "pelabuhan-lama",
    name: { en: "Old Harbor", id: "Pelabuhan Lama" },
    category: "sejarah",
    lat: 1.7427,
    lng: 98.7773,
    images: PLACEHOLDER_IMAGES,
    description: {
      en: "The original Sibolga anchorage, in use since the 18th century, where Bugis and Mandailing traders unloaded cargo onto stone quays that still line the shore.",
      id: "Jangkar asli Sibolga, dipakai sejak abad ke-18, tempat pedagang Bugis dan Mandailing membongkar muatan ke dermaga batu yang masih menggarisi pantai.",
    },
  },
];
