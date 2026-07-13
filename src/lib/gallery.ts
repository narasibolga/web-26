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
  "week-1": [],
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
