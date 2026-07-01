import {
  Camera02Icon,
  Hotel01Icon,
  LandmarkIcon,
  MountainIcon,
  RestaurantIcon,
} from "@hugeicons/core-free-icons";
import type { IconSvgElement } from "@hugeicons/react";

export type LocationCategory =
  | "wisata"
  | "kuliner"
  | "penginapan"
  | "sejarah"
  | "alam";

export type CategoryMeta = {
  icon: IconSvgElement;
  /** tailwind text/bg classes tinted per category */
  badge: string;
  dot: string;
};

export const categoryMeta: Record<LocationCategory, CategoryMeta> = {
  wisata: {
    icon: Camera02Icon,
    badge: "bg-primary/10 text-primary",
    dot: "bg-primary text-primary-foreground",
  },
  kuliner: {
    icon: RestaurantIcon,
    badge: "bg-accent text-accent-foreground",
    dot: "bg-accent text-accent-foreground",
  },
  penginapan: {
    icon: Hotel01Icon,
    badge: "bg-muted text-muted-foreground",
    dot: "bg-muted text-muted-foreground",
  },
  sejarah: {
    icon: LandmarkIcon,
    badge: "bg-secondary text-secondary-foreground",
    dot: "bg-secondary text-secondary-foreground",
  },
  alam: {
    icon: MountainIcon,
    badge: "bg-primary/10 text-primary",
    dot: "bg-primary text-primary-foreground",
  },
};

export type Location = {
  id: string;
  name: { en: string; id: string };
  category: LocationCategory;
  lat: number;
  lng: number;
};

export const locations: Location[] = [
  {
    id: "sibolga-kota",
    name: { en: "Sibolga City", id: "Kota Sibolga" },
    category: "wisata",
    lat: 1.7431,
    lng: 98.7833,
  },
];
