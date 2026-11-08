import type { Metadata, Viewport } from "next";
import {
  Alexandria,
  IBM_Plex_Sans_Arabic,
  Manrope,
  Marcellus,
} from "next/font/google";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { Footer } from "@/components/navigation/Footer";
import { Header } from "@/components/navigation/Header";
import { PortalTransitionProvider } from "@/components/navigation/PortalTransition";
import { JsonLd } from "@/components/seo/JsonLd";
import { getDictionary } from "@/lib/i18n/dictionary";
import {
  direction,
  htmlLang,
  isLocale,
  locales,
  openGraphLocale,
  type Locale,
} from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { SITE_URL } from "@/lib/site";

const plexArabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-plex-ar",
  display: "swap",
  preload: true,
});

const alexandria = Alexandria({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-alexandria",
  display: "swap",
  preload: false,
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
  preload: true,
});

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-marcellus",
  display: "swap",
  preload: false,
});

const fontVariables = [
  plexArabic.variable,
  alexandria.variable,
  manrope.variable,
  marcellus.variable,
].join(" ");

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070B18",
  colorScheme: "dark",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  const locale = raw;
  const dict = getDictionary(locale);
  const brand = locale === "ar" ? "بسمة موسى" : "Basma Moussa";
  const home = localizedPath(locale);
  const description =
    locale === "ar"
      ? "منصة إعلامية عربية سينمائية تجمع الحكاية الإنسانية، البحث القانوني، وحكايات المدن — مفاهيم قيد التطوير."
      : "A cinematic, Arabic-first media universe for human stories, legal awareness and city voices — concepts in development.";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: `${brand} — ${dict.nav.media}`,
      template: `%s — ${brand}`,
    },
    description,
    applicationName: `${brand} — Media Universe`,
    authors: [{ name: "Basma Moussa" }],
    creator: "Basma Moussa",
    keywords:
      locale === "ar"
        ? ["بسمة موسى", "إعلام", "قانون", "الشارقة", "حكايات", "صوت"]
        : [
            "Basma Moussa",
            "media universe",
            "legal awareness",
            "Sharjah",
            "storytelling",
            "podcast concept",
          ],
    alternates: {
      canonical: `${SITE_URL}${home}`,
      languages: {
        ar: `${SITE_URL}/ar`,
        en: `${SITE_URL}/en`,
        "x-default": `${SITE_URL}/ar`,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Basma Moussa — Media Universe",
      locale: openGraphLocale[locale],
      alternateLocale: [openGraphLocale[locale === "ar" ? "en" : "ar"]],
      url: `${SITE_URL}${home}`,
      title: `${brand} — Media Universe`,
      description,
      images: [
        {
          url: `${SITE_URL}/brand/og-home.jpg`,
          width: 1200,
          height: 630,
          alt:
            locale === "ar"
              ? "بسمة موسى في مشهد إعلامي — صورة توضيحية"
              : "Basma Moussa in an illustrative media scene",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${brand} — Media Universe`,
      description,
      images: [`${SITE_URL}/brand/og-home.jpg`],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    icons: {
      icon: [
        { url: "/brand/favicon-32.png", sizes: "32x32", type: "image/png" },
        { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      ],
      shortcut: "/brand/favicon-32.png",
      apple: [
        {
          url: "/brand/apple-touch-icon.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
    },
    manifest: "/manifest.webmanifest",
    formatDetection: { telephone: false, email: false, address: false },
    category: "media",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  const locale: Locale = raw;
  const dict = getDictionary(locale);

  return (
    <html
      lang={htmlLang[locale]}
      dir={direction[locale]}
      className={fontVariables}
      suppressHydrationWarning
    >
      <body>
        <script
          // Runs before hydration: keeps the first-paint cinematic stage clean
          // without hiding content when JS is unavailable (the 4.2s fallback).
          dangerouslySetInnerHTML={{
            __html:
              '(function(){try{var u=new URLSearchParams(location.search);if(u.get("no-intro")==="1"){try{sessionStorage.setItem("bm-intro-v1","1")}catch(e){}u.delete("no-intro");var qs=u.toString();history.replaceState(null,"",location.pathname+(qs?"?"+qs:"")+location.hash);return}var p=location.pathname.replace(/\\/$/,"");if(!/^\\/(ar|en)$/.test(p))return;var s=sessionStorage.getItem("bm-intro-v1")==="1";var r=window.matchMedia("(prefers-reduced-motion: reduce)").matches;var q=u.get("replay")==="1";if((!s||q)&&!r){document.documentElement.classList.add("intro-pending");setTimeout(function(){document.documentElement.classList.remove("intro-pending")},4200)}}catch(e){}})();',
          }}
        />
        <a className="splash-preskip" href="?no-intro=1">
          {dict.common.skipIntro}
        </a>
        <a className="skip-link" href="#main">
          {dict.common.skipToContent}
        </a>
        <PortalTransitionProvider>
          <Header locale={locale} />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer locale={locale} />
        </PortalTransitionProvider>
        <JsonLd locale={locale} />
      </body>
    </html>
  );
}
