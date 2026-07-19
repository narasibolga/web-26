import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { getRequestConfig } from "next-intl/server";
import { type Locale, routing } from "./routing";

type MessageTree = Record<string, unknown>;

async function loadMessagesForLocale(locale: string): Promise<MessageTree> {
  const srcDir = join(process.cwd(), "src");
  const files = await collectMessageFiles(srcDir, locale);
  const contents = await Promise.all(
    files.map(async ({ path }) => {
      const raw = await readFile(path, "utf8");
      try {
        return JSON.parse(raw) as MessageTree;
      } catch (e) {
        throw new Error(
          `i18n: invalid JSON in ${relative(srcDir, path)}: ${(e as Error).message}`,
        );
      }
    }),
  );
  const messages: MessageTree = {};
  for (let i = 0; i < files.length; i++) {
    const { path, namespace } = files[i];
    if (namespace in messages) {
      throw new Error(
        `i18n: duplicate namespace "${namespace}" from ${relative(srcDir, path)}`,
      );
    }
    messages[namespace] = contents[i];
  }
  return messages;
}

type MessageFileEntry = { path: string; namespace: string };

async function collectMessageFiles(
  dir: string,
  locale: string,
): Promise<MessageFileEntry[]> {
  const children = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(
    children.map(async (entry) => {
      const fullPath = join(dir, entry.name);
      if (!entry.isDirectory()) return [];
      if (entry.name === "messages") {
        const file = join(fullPath, `${locale}.json`);
        const componentFolder = dir.split(/[\\/]/).pop() ?? "";
        const namespace = normalizeNamespace(componentFolder, entry.name);
        return [{ path: file, namespace }] as MessageFileEntry[];
      }
      return collectMessageFiles(fullPath, locale);
    }),
  );
  return nested.flat();
}

function normalizeNamespace(componentFolder: string, messagesFolder: string) {
  const raw = componentFolder.replace(/^\(|\)$/g, "").trim();
  return raw || messagesFolder;
}

function isLocale(value: string | undefined): value is Locale {
  return (
    typeof value === "string" &&
    (routing.locales as readonly string[]).includes(value)
  );
}

export default getRequestConfig(async ({ requestLocale }) => {
  // the guard below uses the awaited `requested` value, so the await cannot be deferred past it.
  // react-doctor-disable-next-line react-doctor/async-defer-await
  const requested = await requestLocale;
  const locale = isLocale(requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessagesForLocale(locale),
  };
});
