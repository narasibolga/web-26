import { describe, expect, it } from "bun:test";
import type { Earthquake } from "@/lib/bmkg";
import {
  normalizeLocations,
  normalizeQuakes,
  severityForQuake,
} from "../lib/hazard";

const baseQuake: Earthquake = {
  id: "20260101T000000",
  lat: 1.5,
  lng: 98.5,
  magnitude: 5.5,
  depth: 30,
  region: "Tapanuli",
  datetime: "2026-01-01T00:00:00Z",
  tsunamiPotential: false,
};

describe("severityForQuake", () => {
  it("returns red for magnitude >= 6.0", () => {
    expect(severityForQuake({ ...baseQuake, magnitude: 6.0 })).toBe("red");
    expect(severityForQuake({ ...baseQuake, magnitude: 7.5 })).toBe("red");
  });

  it("returns red when tsunamiPotential is true", () => {
    expect(
      severityForQuake({
        ...baseQuake,
        magnitude: 4.0,
        tsunamiPotential: true,
      }),
    ).toBe("red");
  });

  it("returns yellow for magnitude 5.0–5.9", () => {
    expect(severityForQuake({ ...baseQuake, magnitude: 5.0 })).toBe("yellow");
    expect(severityForQuake({ ...baseQuake, magnitude: 5.9 })).toBe("yellow");
  });

  it("returns green for magnitude < 5.0", () => {
    expect(severityForQuake({ ...baseQuake, magnitude: 4.9 })).toBe("green");
    expect(severityForQuake({ ...baseQuake, magnitude: 3.0 })).toBe("green");
  });
});

describe("normalizeQuakes", () => {
  it("produces MapItems with hazard mode and severity", () => {
    const items = normalizeQuakes([
      { ...baseQuake, magnitude: 6.0 },
      { ...baseQuake, magnitude: 4.0 },
    ]);
    expect(items).toHaveLength(2);
    expect(items[0].mode).toBe("hazard");
    expect(items[0].severity).toBe("red");
    expect(items[1].severity).toBe("green");
    expect(items[0].quake?.magnitude).toBe(6.0);
  });

  it("preserves id, lat, lng from quake", () => {
    const [item] = normalizeQuakes([baseQuake]);
    expect(item.id).toBe(baseQuake.id);
    expect(item.lat).toBe(baseQuake.lat);
    expect(item.lng).toBe(baseQuake.lng);
  });
});

describe("normalizeLocations", () => {
  it("produces MapItems with tourism mode", () => {
    const items = normalizeLocations([
      {
        id: "loc1",
        lat: 1.5,
        lng: 98.5,
        name: { en: "Beach", id: "Pantai" },
        category: "bahari",
        images: ["/img1.webp"],
        description: { en: "desc", id: "desc id" },
        address: "Jl. Example No. 1",
        visitInfo: {
          admission: { en: "Free", id: "Gratis" },
        },
      },
    ]);
    expect(items[0].mode).toBe("tourism");
    expect(items[0].label.en).toBe("Beach");
    expect(items[0].category).toBe("bahari");
    expect(items[0].address).toBe("Jl. Example No. 1");
    expect(items[0].visitInfo?.admission?.id).toBe("Gratis");
  });
});
