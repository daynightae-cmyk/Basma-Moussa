import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n/config";
import { SITE_URL, BRAND } from "@/lib/site";
import { htmlLang, openGraphLocale } from "@/lib/i18n/config";

export const DEFAULT_IMAGE = "/media/01-home-hero.webp";
export const DEFAULT_IMAGE_WIDTH = 1279;
export const DEFAULT_IMAGE_HEIGHT = 720;
export const LOGO_IMAGE = "/brand/basma-logo-master.png";

export interface PageMeta {
  locale: Locale;
  path?: string;
  title: string;
  description: string;
  image?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageAlt?: string;
  type?: "website" | "article";
  noIndex?: boolean;
}

export function buildPageMeta({
  locale,
  path = "/",
  title,
  description,
  image = DEFAULT_IMAGE,
  imageWidth = DEFAULT_IMAGE_WIDTH,
  imageHeight = DEFAULT_IMAGE_HEIGHT,
  imageAlt,
  type = "website",
  noIndex = false,
}: PageMeta): Metadata {
  const canonicalPath = path === "/" ? "" : path;
  const url = new URL(`/${locale}${canonicalPath}`, SITE_URL);
  const imageUrl = new URL(image, SITE_URL);
  const lang = htmlLang[locale];
  const ogLocale = openGraphLocale[locale];
  const other = locale === "ar" ? "en" : "ar";

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: url.toString(),
      languages: {
        ar: new URL("/ar" + canonicalPath, SITE_URL).toString(),
        en: new URL("/en" + canonicalPath, SITE_URL).toString(),
        "x-default": new URL("/ar" + canonicalPath, SITE_URL).toString(),
      },
    },
    openGraph: {
      type,
      locale: ogLocale,
      alternateLocale: other === "ar" ? "en_AE" : "ar_AE",
      url: url.toString(),
      siteName: `${BRAND.nameAr} — ${BRAND.productAr}`,
      title,
      description,
      images: [
        {
          url: imageUrl.toString(),
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt ?? description,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl.toString()],
    },
    robots: noIndex ? { index: false, follow: false } : { index: true, follow: true },
    other: {
      htmlLang: lang,
      contentLanguage: `${lang}-AE`,
    },
  };
}

export const rootMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    template: "%s · بسمة موسى — عالم الإعلام",
    default: "بسمة موسى — عالم الإعلام",
  },
  description:
    "عالم إعلامي عربي سينمائي يجمع الحكاية الإنسانية، البحث القانوني، وصوت المكان. مفاهيم قيد التطوير، لا حلقات منشورة بعد.",
  alternates: {
    languages: {
      ar: new URL("/ar", SITE_URL).toString(),
      en: new URL("/en", SITE_URL).toString(),
      "x-default": new URL("/ar", SITE_URL).toString(),
    },
  },
  openGraph: {
    type: "website",
    locale: "ar_AE",
    siteName: `${BRAND.nameAr} — ${BRAND.productAr}`,
    title: `${BRAND.nameAr} — ${BRAND.productAr}`,
    description:
      "عالم إعلامي عربي سينمائي يجمع الحكاية الإنسانية، البحث القانوني، وصوت المكان.",
    images: [{ url: new URL(DEFAULT_IMAGE, SITE_URL).toString(), width: DEFAULT_IMAGE_WIDTH, height: DEFAULT_IMAGE_HEIGHT, alt: BRAND.tagline.ar }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${BRAND.nameAr} — ${BRAND.productAr}`,
    description:
      "عالم إعلامي عربي سينمائي يجمع الحكاية الإنسانية، البحث القانوني، وصوت المكان.",
    images: [new URL(DEFAULT_IMAGE, SITE_URL).toString()],
  },
  icons: {
    icon: [
      { url: "/brand/basma-icon-circle.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/basma-icon-circle.png", sizes: "180x180", type: "image/png" },
      { url: "/brand/basma-icon-circle.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/brand/basma-icon-circle.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export function jsonLdPerson(locale: Locale, path: string): string {
  const url = new URL(`/${locale}${path === "/" ? "" : path}`, SITE_URL);
  const graph = [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/${locale}#website`,
      url: url.toString(),
      name: `${BRAND.nameAr} — ${BRAND.productAr}`,
      alternateName: [`${BRAND.nameAr}`, `${BRAND.name}`],
      inLanguage: locale,
      publisher: {
        "@type": "Person",
        "@id": `${SITE_URL}#person`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${SITE_URL}/${locale}/media?search={search_string_string}`,
        "query-input": "required name=search_string_string",
      },
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}#person`,
      name: BRAND.nameAr,
      alternateName: BRAND.name,
      image: new URL(LOGO_IMAGE, SITE_URL).toString(),
      description:
        locale === "ar"
          ? "صوت إعلامي وبحث قانوني، مقيم في الإمارات العربية المتحدة."
          : "Media storyteller and legal researcher based in the United Arab Emirates.",
      sameAs: [],
    },
  ];
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph });
}
