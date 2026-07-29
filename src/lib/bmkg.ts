const SUMUT_BOUNDS = {
  latMin: 0.8,
  latMax: 4.6,
  lngMin: 97.2,
  lngMax: 100.6,
} as const;

export type Earthquake = {
  id: string;
  lat: number;
  lng: number;
  magnitude: number;
  depth: number;
  region: string;
  datetime: string;
  felt?: string;
  tsunamiPotential: boolean;
};

export type RawGempa = {
  Tanggal?: string;
  Jam?: string;
  DateTime?: string;
  point?: { coordinates?: string | number };
  Lintang?: string;
  Bujur?: string;
  Magnitude?: string | number;
  Kedalaman?: string | number;
  Wilayah?: string;
  Potensi?: string;
  Dirasakan?: string;
};

export function withinBounds(lat: number, lng: number): boolean {
  return (
    lat >= SUMUT_BOUNDS.latMin &&
    lat <= SUMUT_BOUNDS.latMax &&
    lng >= SUMUT_BOUNDS.lngMin &&
    lng <= SUMUT_BOUNDS.lngMax
  );
}

export function parseDepth(raw: string | number | undefined): number {
  if (raw == null) return 0;
  const n = Number.parseFloat(
    String(raw)
      .replace(/[^0-9.,-]/g, "")
      .replace(",", "."),
  );
  return Number.isFinite(n) ? n : 0;
}

export function parseMagnitude(raw: string | number | undefined): number {
  if (raw == null) return 0;
  const n = Number.parseFloat(String(raw).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export function parseCoordinates(raw: string | number | undefined): {
  lat: number;
  lng: number;
} {
  if (raw == null) return { lat: 0, lng: 0 };
  const s = String(raw);
  const [latStr, lngStr] = s.split(",");
  const lat = Number.parseFloat(latStr);
  const lng = Number.parseFloat(lngStr);
  return {
    lat: Number.isFinite(lat) ? lat : 0,
    lng: Number.isFinite(lng) ? lng : 0,
  };
}

export function toEarthquake(g: RawGempa): Earthquake | null {
  if (!g.DateTime || !g.point?.coordinates) return null;
  const { lat, lng } = parseCoordinates(g.point.coordinates);
  if (lat === 0 && lng === 0) return null;
  const datetime = g.DateTime;
  return {
    id: datetime.replace(/[^0-9TZ:+.-]/g, ""),
    lat,
    lng,
    magnitude: parseMagnitude(g.Magnitude),
    depth: parseDepth(g.Kedalaman),
    region: g.Wilayah ?? "",
    datetime,
    felt: g.Dirasakan,
    tsunamiPotential: /berpotensi tsunami/i.test(g.Potensi ?? ""),
  };
}

export function dedupeByDatetime(events: Earthquake[]): Earthquake[] {
  const seen = new Set<string>();
  const out: Earthquake[] = [];
  for (const e of events) {
    if (seen.has(e.datetime)) continue;
    seen.add(e.datetime);
    out.push(e);
  }
  return out;
}
