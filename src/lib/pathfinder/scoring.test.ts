import { describe, expect, it } from "bun:test";
import { matchArchetype, rankLocations, tallyScores } from "./scoring";

describe("tallyScores", () => {
  it("returns zero totals when selections is empty", () => {
    const result = tallyScores({});
    expect(Object.keys(result).length).toBeGreaterThan(0);
    for (const value of Object.values(result)) {
      expect(value).toBe(0);
    }
  });

  it("sums scores across selected answers", () => {
    const selections = { "q1-vibes": "laut-pantai" };
    const result = tallyScores(selections);
    const positives = Object.values(result).filter((v) => v > 0);
    expect(positives.length).toBeGreaterThan(0);
  });

  it("skips unknown question ids", () => {
    const result = tallyScores({ "nonexistent-q": "a1" });
    expect(Object.values(result).every((v) => v === 0)).toBe(true);
  });
});

describe("matchArchetype", () => {
  it("returns an archetype with a code and traits", () => {
    const totals = tallyScores({ "q1-vibes": "laut-pantai" });
    const result = matchArchetype(totals);
    expect(result.code).toBeDefined();
    expect(Array.isArray(result.traits)).toBe(true);
  });

  it("returns a result even with zero totals", () => {
    const result = matchArchetype(tallyScores({}));
    expect(result.code).toBeDefined();
  });
});

describe("rankLocations", () => {
  it("returns empty array when no locations score > 0", () => {
    const result = rankLocations(tallyScores({}), 6);
    expect(result).toEqual([]);
  });

  it("returns at most topN results", () => {
    const totals = tallyScores({ "q1-vibes": "laut-pantai" });
    const result = rankLocations(totals, 3);
    expect(result.length).toBeLessThanOrEqual(3);
  });

  it("sorts by descending score", () => {
    const totals = tallyScores({ "q1-vibes": "laut-pantai" });
    const result = rankLocations(totals, 10);
    for (let i = 1; i < result.length; i++) {
      expect(result[i].score).toBeLessThanOrEqual(result[i - 1].score);
    }
  });
});
