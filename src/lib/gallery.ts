export const TOTAL_WEEKS = 7;

export type GalleryPhoto = {
  id: number;
  alt: string;
  aspect: number;
};

export type GalleryWeekKey = `week-${number}`;

export type GalleryWeeks = Record<GalleryWeekKey, GalleryPhoto[]>;

export const weekKey = (n: number): GalleryWeekKey => `week-${n}`;

export const galleryImagePath = (weekKey: string, photoId: number): string =>
  `/images/gallery/${weekKey}/${photoId}.webp`;

export const weeks: GalleryWeeks = {
  "week-1": [
    { id: 1, alt: "Sibolga week 1", aspect: 1.78 },
    { id: 2, alt: "Sibolga week 1", aspect: 1.78 },
    { id: 3, alt: "Sibolga week 1", aspect: 1.78 },
    { id: 4, alt: "Sibolga week 1", aspect: 1.5 },
    { id: 5, alt: "Sibolga week 1", aspect: 0.56 },
    { id: 6, alt: "Sibolga week 1", aspect: 1.77 },
    { id: 7, alt: "Sibolga week 1", aspect: 0.56 },
    { id: 8, alt: "Sibolga week 1", aspect: 1.5 },
    { id: 9, alt: "Sibolga week 1", aspect: 1.5 },
    { id: 10, alt: "Sibolga week 1", aspect: 1.78 },
    { id: 11, alt: "Sibolga week 1", aspect: 1.78 },
    { id: 12, alt: "Sibolga week 1", aspect: 1.78 },
    { id: 13, alt: "Sibolga week 1", aspect: 1.78 },
    { id: 14, alt: "Sibolga week 1", aspect: 1.33 },
    { id: 15, alt: "Sibolga week 1", aspect: 0.75 },
    { id: 16, alt: "Sibolga week 1", aspect: 1.78 },
    { id: 17, alt: "Sibolga week 1", aspect: 1.78 },
  ],
  "week-2": [],
  "week-3": [],
  "week-4": [],
  "week-5": [],
  "week-6": [],
  "week-7": [],
};

export function getWeekPhotos(key: GalleryWeekKey): GalleryPhoto[] {
  return weeks[key] ?? [];
}

export function getAllWeekKeys(): GalleryWeekKey[] {
  return Array.from({ length: TOTAL_WEEKS }, (_, i) => weekKey(i + 1));
}
