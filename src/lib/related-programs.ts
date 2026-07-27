import type { ProgramMeta } from "./programs";

export function getRelatedPrograms(
  current: ProgramMeta,
  programs: ProgramMeta[],
  limit = 3,
): ProgramMeta[] {
  const currentTags = new Set(current.tags);

  return programs
    .filter((program) => program.slug !== current.slug)
    .map((program) => ({
      program,
      sharedTags: program.tags.filter((tag) => currentTags.has(tag)).length,
    }))
    .filter(({ sharedTags }) => sharedTags > 0)
    .sort(
      (a, b) =>
        b.sharedTags - a.sharedTags ||
        b.program.date.localeCompare(a.program.date) ||
        a.program.slug.localeCompare(b.program.slug),
    )
    .slice(0, limit)
    .map(({ program }) => program);
}
