import type { Metadata, Viewport } from "next";
import React from "react";

import { Header } from "@/components/navigation/Header";
import { Footer } from "@/components/navigation/Footer";
import { DoorOverlay } from "@/components/navigation/door-overlay";
import { Marcellus, Alexandria, IBM_Plex_Sans_Arabic, Manrope } from "next/font/google";
import {
  defaultLocale,
  direction,
  htmlLang,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n/config";
import { PortalTransitionProvider } from "@/components/navigation/portal-transition-provider";
import { getDictionary } from "@/lib/i18n/dictionary";
import { rootMetadata } from "@/lib/seo";
import "/styles/globals.css";
import "@/styles/portal-transition.css";
import "@/styles/world-discovery.css";
import "@/styles/media-galaxy.css";
import "@/app/cinematics.css";
import "@/styles/horizontal-story.css";
import "@/styles/splash.css";
import "@/styles/studio.css";
import "@/styles/soundroom.css";
import "@/styles/sonic-sculpture.css";
import "@/styles/justice-prism.css";
import "@/styles/atelier.css";
import "@/styles/arrival.css";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", weight: ["400", "600", "700"], display: "swap" });
const plexAr = IBM_Plex_Sans_Arabic({ subsets: ["arabic"], variable: "--font-plex-ar", weight: ["300", "400", "500", "600", "700"], display: "swap" });
const alexandria = Alexandria({ subsets: ["arabic", "latin"], variable: "--font-alexandria", weight: ["300", "400", "500", "600", "700"], display: "swap" });
const marcellus = Marcellus({ subsets: ["latin"], variable: "--font-marcellus", weight: "400", display: "swap" });

export const dynamicParams = false;
export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  return rootMetadata;
}

export function generateViewport(): Viewport {
  return { colorScheme: "dark", width: "device-width", initialScale: 1, themeColor: "#070b18" };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dir = direction[locale];
  const dict = getDictionary(locale);
  // Expose each face as its CSS variable (`--font-manrope`, `--font-plex-ar`, …)
  // so the design tokens in globals.css resolve to the real typefaces.
  const fontVariables = [manrope, plexAr, alexandria, marcellus]
    .map((font) => font.variable)
    .join(" ");

  return (
    <html
      lang={htmlLang[locale]}
      dir={dir}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className={fontVariables}>
        <a href="#main" className="skip-link">
          {dict.common.skipToContent}
        </a>
        <PortalTransitionProvider>
          <Header locale={locale} dict={dict} />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer locale={locale} dict={dict} />
          <DoorOverlay />
        </PortalTransitionProvider>
      </body>
    </html>
  );
}

