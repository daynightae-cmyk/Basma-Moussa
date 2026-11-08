import { programSlugs } from "@/lib/content/programs";

/** Public localized routes that must render normally. */
export const STATIC_LOCALIZED_PATHS = [
  "/about",
  "/media",
  "/legal-lens",
  "/soundroom",
  "/stories",
  "/studio",
  "/contact",
  "/privacy",
] as const;

export const LOST_PATH = "/lost";

const STATIC_SEGMENTS = new Set<string>(
  STATIC_LOCALIZED_PATHS.map((path) => path.slice(1)),
);

const PROGRAM_SEGMENTS = new Set(programSlugs);

/**
 * Given the path segments after the locale, decide whether the app owns it.
 * Used by the proxy to return a real 404 instead of a streamed 200 shell.
 */
export function isKnownLocalizedPath(segments: string[]): boolean {
  if (segments.length === 0) return true;
  if (segments.length === 1) {
    if (STATIC_SEGMENTS.has(segments[0])) return true;
    if (segments[0] === "lost") return true;
    return false;
  }
  if (segments.length === 2 && segments[0] === "programs") {
    return PROGRAM_SEGMENTS.has(segments[1]);
  }
  return false;
}

export function isProgramSlug(value: string): boolean {
  return PROGRAM_SEGMENTS.has(value);
}
