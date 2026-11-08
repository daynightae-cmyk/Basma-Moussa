import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isLocale } from "@/lib/i18n/config";

const ASSET_OR_ROUTE_PREFIXES = [
  "/_next",
  "/_vercel",
  "/brand",
  "/media",
  "/fonts",
  "/icon",
  "/apple-icon",
  "/manifest",
  "/robots",
  "/sitemap",
];

function isAssetPath(pathname: string): boolean {
  return ASSET_OR_ROUTE_PREFIXES.some((prefix) => pathname.startsWith(prefix)) || /\.[a-z0-9]+$/i.test(pathname);
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAssetPath(pathname)) {
    return NextResponse.next();
  }

  // Root → Arabic home.
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/ar", request.url));
  }

  const firstSegment = pathname.split("/").filter(Boolean)[0];
  if (!isLocale(firstSegment)) {
    // Rewrite any unknown top-level path into the Arabic locale so the
    // catch-all route renders a localized 404 while the URL stays intact.
    return NextResponse.rewrite(new URL(`/ar${pathname}`, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public media folder)
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\..*$).*)",
  ],
};
