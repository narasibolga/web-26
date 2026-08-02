import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL } from "@/lib/site";

const ROUTES = [
  "",
  "activities",
  "pathfinder",
  "history",
  "map",
  "atlas",
  "gallery",
  "tourism",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const canonicalLocale = routing.defaultLocale;

  return ROUTES.map((route) => {
    const path = route === "" ? "" : `/${route}`;
    const url = `${SITE_URL}/${canonicalLocale}${path}`;

    return {
      url,
      lastModified: new Date(),
      changeFrequency: route === "" ? "monthly" : "yearly",
      priority: route === "" ? 1 : 0.8,
      alternates: {
        languages: Object.fromEntries(
          routing.locales.flatMap((l) =>
            l !== canonicalLocale ? [[l, `${SITE_URL}/${l}${path}`]] : [],
          ),
        ),
      },
    };
  });
}
