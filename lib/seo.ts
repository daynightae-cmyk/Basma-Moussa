import type { Metadata } from "next";
import { openGraphLocale, type Locale } from "@/lib/i18n/config";
import { SITE_URL } from "@/lib/site";

type PageMetadataInput = {
  locale: Locale;
  path: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  absoluteTitle?: boolean;
};

function localizedUrl(locale: Locale, path: string): string {
  let suffix = path;
  if (suffix === "/") suffix = "";
  else if (!suffix.startsWith("/")) suffix = `/${suffix}`;
  return `${SITE_URL}/${locale}${suffix}`;
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  image = "/brand/og-home.jpg",
  imageAlt,
  absoluteTitle = false,
}: PageMetadataInput): Metadata {
  const canonical = localizedUrl(locale, path);
  const imageUrl = image.startsWith("http") ? image : `${SITE_URL}${image}`;
  const imageWidth = 1200;
  const imageHeight = 630;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical,
      languages: {
        ar: localizedUrl("ar", path),
        en: localizedUrl("en", path),
        "x-default": localizedUrl("ar", path),
      },
    },
    openGraph: {
      type: "website",
      siteName: "Basma Moussa — Media Universe",
      locale: openGraphLocale[locale],
      alternateLocale: [openGraphLocale[locale === "ar" ? "en" : "ar"]],
      url: canonical,
      title,
      description,
      images: [
        {
          url: imageUrl,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt ?? title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}
