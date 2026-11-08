import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";
import { localizedPath } from "@/lib/i18n/paths";
import { PROGRAMS } from "@/lib/content/programs";
import type { Locale } from "@/lib/i18n/config";

const LOCALES: Locale[] = ["ar", "en"];
const LAST_MOD = new Date("2026-11-08");

const STATIC_ROUTES: string[] = [
  "/",
  "/about",
  "/media",
  "/soundroom",
  "/legal-lens",
  "/stories",
  "/studio",
  "/contact",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${SITE_URL}${localizedPath(locale, route)}`,
        lastModified: LAST_MOD,
        changeFrequency: "monthly",
        priority: route === "/" ? 1 : 0.7,
      });
    }
    for (const program of PROGRAMS) {
      entries.push({
        url: `${SITE_URL}${localizedPath(locale, program.worldHref)}`,
        lastModified: LAST_MOD,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return entries;
}
