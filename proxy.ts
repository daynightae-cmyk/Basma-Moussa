import { NextResponse, type NextRequest } from "next/server";
import { isKnownLocalizedPath } from "@/lib/routes";

const LOCALES = new Set(["ar", "en"]);

const PUBLIC_PREFIXES = [
  "/_next",
  "/brand",
  "/media",
  "/favicon.ico",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
];

const PUBLIC_FILE = /\.(?:png|jpe?g|webp|avif|svg|ico|txt|xml|webmanifest|woff2?|css|js|map)$/i;

/**
 * Arabic-first root, explicit locale prefixes, and a true 404 for unknown
 * paths. A rewrite alone would stream a 200 shell; the explicit status keeps
 * the response honest for search engines and clients.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    const url = request.nextUrl.clone();
    url.pathname = "/ar";
    return NextResponse.redirect(url);
  }

  if (PUBLIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  if (PUBLIC_FILE.test(pathname)) {
    return NextResponse.next();
  }

  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const locale = first && LOCALES.has(first) ? first : "ar";
  const rest = first && LOCALES.has(first) ? segments.slice(1) : segments;

  if (!first || !LOCALES.has(first)) {
    const url = request.nextUrl.clone();
    url.pathname = `/ar/lost`;
    url.search = "";
    return NextResponse.rewrite(url, { status: 404 });
  }

  // A friendly shortcut for the program catalogue.
  if (rest.length === 1 && rest[0] === "programs") {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/media`;
    url.search = "";
    return NextResponse.redirect(url);
  }

  if (!isKnownLocalizedPath(rest)) {
    const url = request.nextUrl.clone();
    url.pathname = `/${locale}/lost`;
    url.search = "";
    return NextResponse.rewrite(url, { status: 404 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|brand/|media/).*)"],
};
