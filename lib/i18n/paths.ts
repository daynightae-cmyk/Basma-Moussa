import { isLocale, type Locale } from "./config";

/**
 * Build a locale-prefixed, deep-linkable application path.
 * `/` stays clean: localizedPath("ar") -> "/ar".
 */
export function localizedPath(locale: Locale, path = "/"): string {
  let normalised = path;
  if (normalised === "/") normalised = "";
  else if (!normalised.startsWith("/")) normalised = `/${normalised}`;
  return `/${locale}${normalised}`;
}

/**
 * Swap the locale segment of a pathname while preserving the rest.
 * Unknown shapes fall back to the localized home page.
 */
export function switchLocalePath(pathname: string, target: Locale): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return `/${target}`;
  if (isLocale(segments[0])) {
    return `/${[target, ...segments.slice(1)].join("/")}`;
  }
  return `/${target}`;
}

export function pathWithoutLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length > 0 && isLocale(segments[0])) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname || "/";
}
