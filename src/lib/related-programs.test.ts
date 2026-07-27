import { describe, expect, it } from "bun:test";
import type { ProgramMeta } from "./programs";
import { getRelatedPrograms } from "./related-programs";

function program(
  slug: string,
  tags: string[],
  date = "2025-01-01",
): ProgramMeta {
  return {
    slug,
    tags,
    date,
    title: slug,
    summary: slug,
  };
}

describe("getRelatedPrograms", () => {
  it("ranks programs by shared tags and excludes the current program", () => {
    const current = program("current", ["health", "education", "children"]);
    const programs = [
      current,
      program("one-match", ["health"]),
      program("three-matches", ["children", "health", "education"]),
      program("two-matches", ["education", "children"]),
      program("unrelated", ["tourism"]),
    ];

    expect(
      getRelatedPrograms(current, programs).map(({ slug }) => slug),
    ).toEqual(["three-matches", "two-matches", "one-match"]);
  });

  it("uses newest date to break ties and respects the limit", () => {
    const current = program("current", ["health"]);
    const programs = [
      program("old", ["health"], "2024-01-01"),
      program("newest", ["health"], "2026-01-01"),
      program("newer", ["health"], "2025-01-01"),
    ];

    expect(
      getRelatedPrograms(current, programs, 2).map(({ slug }) => slug),
    ).toEqual(["newest", "newer"]);
  });

  it("returns no programs when no tags overlap", () => {
    const current = program("current", ["health"]);

    expect(
      getRelatedPrograms(current, [program("other", ["tourism"])]),
    ).toEqual([]);
  });
});
