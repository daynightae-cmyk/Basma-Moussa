import type { MetadataRoute } from "next";
import { locales } from "@/lib/i18n/config";
import { programSlugs } from "@/lib/content/programs";
import { SITE_URL } from "@/lib/site";

const STATIC_ROUTES: { path: string; priority: number; frequency: "weekly" | "monthly" }[] = [
  { path: "/", priority: 1, frequency: "monthly" },
  { path: "/about", priority: 0.8, frequency: "monthly" },
  { path: "/media", priority: 0.9, frequency: "monthly" },
  { path: "/legal-lens", priority: 0.8, frequency: "monthly" },
  { path: "/soundroom", priority: 0.7, frequency: "monthly" },
  { path: "/stories", priority: 0.7, frequency: "monthly" },
  { path: "/studio", priority: 0.6, frequency: "monthly" },
  { path: "/contact", priority: 0.7, frequency: "monthly" },
  { path: "/privacy", priority: 0.3, frequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-11-08T00:00:00.000Z");
  const routes = [
    ...STATIC_ROUTES,
    ...programSlugs.map((slug) => ({
      path: `/programs/${slug}`,
      priority: 0.7,
      frequency: "monthly" as const,
    })),
  ];

  return locales.flatMap((locale) =>
    routes.map((route) => {
      const suffix = route.path === "/" ? "" : route.path;
      const url = `${SITE_URL}/${locale}${suffix}`;
      return {
        url,
        lastModified,
        changeFrequency: route.frequency,
        priority: route.priority,
        alternates: {
          languages: {
            ar: `${SITE_URL}/ar${suffix}`,
            en: `${SITE_URL}/en${suffix}`,
          },
        },
      };
    }),
  );
}
