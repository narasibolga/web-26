import { describe, expect, it } from "bun:test";
import {
  dedupeByDatetime,
  type Earthquake,
  parseCoordinates,
  parseDepth,
  parseMagnitude,
  toEarthquake,
  withinBounds,
} from "./bmkg";

describe("parseDepth", () => {
  it("returns 0 for null/undefined", () => {
    expect(parseDepth(undefined)).toBe(0);
    expect(parseDepth("")).toBe(0);
  });

  it("parses numeric strings with unit suffixes", () => {
    expect(parseDepth("30 km")).toBe(30);
    expect(parseDepth("12,5 km")).toBe(12.5);
  });

  it("returns 0 for non-numeric input", () => {
    expect(parseDepth("not-a-number")).toBe(0);
  });
});

describe("parseMagnitude", () => {
  it("parses comma decimals", () => {
    expect(parseMagnitude("5,4")).toBe(5.4);
  });

  it("returns 0 for missing", () => {
    expect(parseMagnitude(undefined)).toBe(0);
  });
});

describe("parseCoordinates", () => {
  it("parses lat,lng string", () => {
    expect(parseCoordinates("1.5,98.5")).toEqual({ lat: 1.5, lng: 98.5 });
  });

  it("returns 0,0 for missing or malformed", () => {
    expect(parseCoordinates(undefined)).toEqual({ lat: 0, lng: 0 });
    expect(parseCoordinates("garbage")).toEqual({ lat: 0, lng: 0 });
  });
});

describe("toEarthquake", () => {
  it("returns null when DateTime is missing", () => {
    expect(toEarthquake({ point: { coordinates: "1.5,98.5" } })).toBeNull();
  });

  it("returns null when coordinates are missing", () => {
    expect(toEarthquake({ DateTime: "2026-01-01T00:00:00Z" })).toBeNull();
  });

  it("returns null when coordinates are 0,0", () => {
    expect(
      toEarthquake({
        DateTime: "2026-01-01T00:00:00Z",
        point: { coordinates: "0,0" },
      }),
    ).toBeNull();
  });

  it("detects tsunami potential from Potensi field", () => {
    const q = toEarthquake({
      DateTime: "2026-01-01T00:00:00Z",
      point: { coordinates: "1.5,98.5" },
      Magnitude: "6.2",
      Potensi: "Berpotensi Tsunami",
    });
    expect(q).not.toBeNull();
    expect(q?.tsunamiPotential).toBe(true);
  });

  it("preserves felt field when present", () => {
    const q = toEarthquake({
      DateTime: "2026-01-01T00:00:00Z",
      point: { coordinates: "1.5,98.5" },
      Dirasakan: "Sibolga, Tarutung",
    });
    expect(q?.felt).toBe("Sibolga, Tarutung");
  });
});

describe("withinBounds", () => {
  it("returns true for coordinates inside Sumut bounds", () => {
    expect(withinBounds(2.0, 98.5)).toBe(true);
  });

  it("returns false for coordinates outside bounds", () => {
    expect(withinBounds(0.5, 98.5)).toBe(false); // below latMin
    expect(withinBounds(2.0, 101.0)).toBe(false); // above lngMax
  });

  it("accepts boundary values", () => {
    expect(withinBounds(0.8, 97.2)).toBe(true);
    expect(withinBounds(4.6, 100.6)).toBe(true);
  });
});

describe("dedupeByDatetime", () => {
  const base: Earthquake = {
    id: "a",
    lat: 1.5,
    lng: 98.5,
    magnitude: 5.0,
    depth: 30,
    region: "Tapanuli",
    datetime: "2026-01-01T00:00:00Z",
    tsunamiPotential: false,
  };

  it("keeps first-seen on duplicate datetime", () => {
    const a = { ...base, id: "a" };
    const b = { ...base, id: "b" };
    const result = dedupeByDatetime([a, b]);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("a");
  });

  it("preserves order for unique datetimes", () => {
    const a = { ...base, id: "a" };
    const b = { ...base, id: "b", datetime: "2026-01-02T00:00:00Z" };
    expect(dedupeByDatetime([a, b])).toEqual([a, b]);
  });
});
