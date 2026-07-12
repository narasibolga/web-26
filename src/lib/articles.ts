import "server-only";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkGfm from "remark-gfm";
import remarkHtml from "remark-html";

const ARTICLES_DIR = join(process.cwd(), "content", "articles");

const FALLBACK_AUTHOR = "NaraSibolga Team";

export type ArticleFrontmatter = {
  title: string;
  date: string;
  summary: string;
  author?: string;
  draft?: boolean;
  tags?: string[];
};

export type ArticleMeta = Omit<ArticleFrontmatter, "tags"> & {
  slug: string;
  tags: string[];
};

export type Article = ArticleMeta & { content: string };

function isDraftEnabled(): boolean {
  return process.env.NODE_ENV === "development";
}

export function getArticleSlugs(): string[] {
  if (!existsSync(ARTICLES_DIR)) return [];
  return readdirSync(ARTICLES_DIR)
    .filter((name) => name.endsWith(".md"))
    .map((name) => name.replace(/\.md$/, ""));
}

function readArticleFile(slug: string): Article {
  const fullPath = join(ARTICLES_DIR, `${slug}.md`);
  const raw = readFileSync(fullPath, "utf8");
  const { data, content } = matter(raw);

  const frontmatter = data as ArticleFrontmatter;

  if (typeof frontmatter.title !== "string") {
    throw new Error(`Article "${slug}" is missing required frontmatter: title`);
  }
  if (typeof frontmatter.date !== "string") {
    throw new Error(`Article "${slug}" is missing required frontmatter: date`);
  }
  if (typeof frontmatter.summary !== "string") {
    throw new Error(
      `Article "${slug}" is missing required frontmatter: summary`,
    );
  }

  let tags: string[] = [];
  if (frontmatter.tags !== undefined) {
    if (!Array.isArray(frontmatter.tags)) {
      throw new Error(
        `Article "${slug}" has invalid frontmatter: tags must be an array`,
      );
    }
    tags = Array.from(
      new Set(
        frontmatter.tags
          .map((tag) => String(tag).trim().toLowerCase())
          .filter((tag) => tag.length > 0),
      ),
    );
  }

  return {
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    summary: frontmatter.summary,
    author: frontmatter.author,
    draft: frontmatter.draft === true,
    tags,
    content,
  };
}

export function getArticle(slug: string): Article | null {
  if (!existsSync(join(ARTICLES_DIR, `${slug}.md`))) return null;
  return readArticleFile(slug);
}

export async function getArticleHTML(slug: string): Promise<string> {
  const article = getArticle(slug);
  if (!article) return "";
  const file = await remark()
    .use(remarkGfm)
    .use(remarkHtml, { sanitize: false })
    .process(article.content);
  return String(file);
}

export function getReadingTimeMinutes(content: string): number {
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export function getArticleAuthor(article: Article): string {
  return article.author ?? FALLBACK_AUTHOR;
}

export function getAllArticles(): ArticleMeta[] {
  const slugs = getArticleSlugs();
  const articles = slugs.map((slug) => readArticleFile(slug));
  const filtered = isDraftEnabled()
    ? articles
    : articles.filter((a) => !a.draft);
  return filtered
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map(({ content: _content, ...meta }) => meta);
}
