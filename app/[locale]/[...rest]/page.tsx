import { notFound } from "next/navigation";

/**
 * Locale catch-all: any unknown path under a locale renders the localized
 * 404 (app/[locale]/not-found.tsx) with the full site chrome, instead of
 * including a route like `/ar/unknown-path` (middleware rewrites other
 * top-level paths into the Arabic locale with the URL intact).
 */
export default function CatchAll() {
  notFound();
}
