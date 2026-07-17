import { readdir, readFile } from "node:fs/promises";
import { join, relative } from "node:path";
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const SRC_DIR = join(process.cwd(), "src");

type MessageTree = Record<string, unknown>;

async function loadMessagesForLocale(locale: string): Promise<MessageTree> {
  const files = await collectMessageFiles(SRC_DIR, locale);
  const contents = await Promise.all(
    files.map(async ({ path }) => {
      const raw = await readFile(path, "utf8");
      return JSON.parse(raw) as MessageTree;
    }),
  );
  const messages: MessageTree = {};
  for (let i = 0; i < files.length; i++) {
    const { path, namespace } = files[i];
    if (namespace in messages) {
      throw new Error(
        `i18n: duplicate namespace "${namespace}" from ${relative(SRC_DIR, path)}`,
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
  const children = await readdir(dir, { withFileTypes: true }).catch(() => []);
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

export default getRequestConfig(async ({ requestLocale }) => {
  // the guard below uses the awaited `requested` value, so the await cannot be deferred past it.
  // react-doctor-disable-next-line react-doctor/async-defer-await
  const requested = await requestLocale;
  const locale = routing.locales.includes(requested as never)
    ? (requested as string)
    : routing.defaultLocale;

  return {
    locale,
    messages: await loadMessagesForLocale(locale),
  };
});
