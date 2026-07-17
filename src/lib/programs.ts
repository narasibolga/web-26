import "server-only";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const PROGRAMS_DIR = join(process.cwd(), "content", "programs");

const FALLBACK_AUTHOR = "NaraSibolga Team";

export type ProgramFrontmatter = {
  title: string;
  date: string;
  summary: string;
  author?: string;
  image?: string;
  draft?: boolean;
  tags?: string[];
};

export type ProgramMeta = Omit<ProgramFrontmatter, "tags"> & {
  slug: string;
  tags: string[];
};

export type Program = ProgramMeta & { content: string };

function isDraftEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}

export function getProgramSlugs(): string[] {
  if (!existsSync(PROGRAMS_DIR)) return [];
  return readdirSync(PROGRAMS_DIR).flatMap((name) =>
    name.endsWith(".md") ? [name.replace(/\.md$/, "")] : [],
  );
}

function readProgramFile(slug: string): Program {
  const fullPath = join(PROGRAMS_DIR, `${slug}.md`);
  const raw = readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const frontmatter = data as ProgramFrontmatter;

  if (typeof frontmatter.title !== "string") {
    throw new Error(`Program "${slug}" is missing required frontmatter: title`);
  }
  if (typeof frontmatter.date !== "string") {
    throw new Error(`Program "${slug}" is missing required frontmatter: date`);
  }
  if (typeof frontmatter.summary !== "string") {
    throw new Error(
      `Program "${slug}" is missing required frontmatter: summary`,
    );
  }

  if (
    frontmatter.image !== undefined &&
    typeof frontmatter.image !== "string"
  ) {
    throw new Error(
      `Program "${slug}" has invalid frontmatter: image must be a string`,
    );
  }

  let tags: string[] = [];
  if (frontmatter.tags !== undefined) {
    if (!Array.isArray(frontmatter.tags)) {
      throw new Error(
        `Program "${slug}" has invalid frontmatter: tags must be an array`,
      );
    }
    tags = Array.from(
      new Set(
        frontmatter.tags.flatMap((tag) => {
          const t = String(tag).trim().toLowerCase();
          return t.length > 0 ? [t] : [];
        }),
      ),
    );
  }

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    summary: frontmatter.summary,
    author: frontmatter.author,
    image: frontmatter.image,
    draft: frontmatter.draft === true,
    tags,
    content,
  };
}

export function getProgram(slug: string): Program | null {
  if (!existsSync(join(PROGRAMS_DIR, `${slug}.md`))) return null;
  return readProgramFile(slug);
}

export async function getProgramHTML(slug: string): Promise<string> {
  const program = getProgram(slug);
  if (!program) return "";
  // `remark-html` sanitizes by default (sanitize: true); the previous
  // `sanitize: false` allowed raw HTML through and was flagged as an XSS sink.
  const file = await remark()
    .use(remarkGfm)
    .use(remarkHtml)
    .process(program.content);
  return String(file);
}

export function getReadingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getProgramAuthor(program: Program): string {
  return program.author ?? FALLBACK_AUTHOR;
}

export function getAllPrograms(): ProgramMeta[] {
  const slugs = getProgramSlugs();
  const programs = slugs.map((slug) => readProgramFile(slug));
  const filtered = isDraftEnabled()
    ? programs
    : programs.filter((a) => !a.draft);
  return filtered
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content: _content, ...meta }) => meta);
}
