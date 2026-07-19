import type { Locale } from "@/i18n/routing";

type DateTimePreset = "quakeDate" | "quakeDateTime" | "programDate";

const formatters: Record<
  Locale,
  Record<DateTimePreset, Intl.DateTimeFormat>
> = {
  en: {
    quakeDate: new Intl.DateTimeFormat("en-GB", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }),
    quakeDateTime: new Intl.DateTimeFormat("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }),
    programDate: new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }),
  },
  id: {
    quakeDate: new Intl.DateTimeFormat("id-ID", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    }),
    quakeDateTime: new Intl.DateTimeFormat("id-ID", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Jakarta",
    }),
    programDate: new Intl.DateTimeFormat("id", {
      day: "numeric",
      month: "long",
      year: "numeric",
      timeZone: "Asia/Jakarta",
    }),
  },
};

export function formatLocaleDate(
  iso: string,
  locale: Locale,
  preset: DateTimePreset,
): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return formatters[locale][preset].format(d);
}
