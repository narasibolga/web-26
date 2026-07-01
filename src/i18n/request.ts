import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const SRC_DIR = join(process.cwd(), "src");

type MessageTree = Record<string, unknown>;

async function loadMessagesForLocale(locale: string): Promise<MessageTree> {
  const files = await collectMessageFiles(SRC_DIR, locale);
  const messages: MessageTree = {};

  for (const { path, namespace } of files) {
    const raw = await readFile(path, "utf8");
    const parsed = JSON.parse(raw) as MessageTree;
    if (namespace in messages) {
      throw new Error(
        `i18n: duplicate namespace "${namespace}" from ${relative(SRC_DIR, path)}`,
      );
    }
    messages[namespace] = parsed;
  }

  return messages;
}

type MessageFileEntry = { path: string; namespace: string };

async function collectMessageFiles(
  dir: string,
  locale: string,
): Promise<MessageFileEntry[]> {
  const entries: MessageFileEntry[] = [];
  const children = await readdir(dir, { withFileTypes: true }).catch(() => []);

  for (const entry of children) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      if (entry.name === "messages") {
        const file = join(fullPath, `${locale}.json`);
        const componentFolder = dir.split(/[\\/]/).pop() ?? "";
        const namespace = normalizeNamespace(componentFolder, entry.name);
        entries.push({ path: file, namespace });
      } else {
        entries.push(...(await collectMessageFiles(fullPath, locale)));
      }
    }
  }

  return entries;
}

function normalizeNamespace(componentFolder: string, messagesFolder: string) {
  const raw = componentFolder.replace(/^\(|\)$/g, "").trim();
  return raw || messagesFolder;
}

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as never)
    ? (requested as string)
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessagesForLocale(locale),
  };
});
