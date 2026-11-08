import type { Locale } from "@/lib/i18n/config";
import { BRAND, SITE_URL } from "@/lib/site";

export function JsonLd({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";
  const data = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: isAr ? "بسمة موسى — عالم الإعلام" : "Basma Moussa — Media Universe",
      alternateName: isAr ? "Basma Moussa — Media Universe" : "بسمة موسى — عالم الإعلام",
      url: `${SITE_URL}/${locale}`,
      inLanguage: isAr ? "ar" : "en",
      description: isAr
        ? "منصة إعلامية عربية تجمع الحكاية الإنسانية، البحث القانوني، وأصوات المدن. مفاهيم قيد التطوير."
        : "An Arabic-first media universe for human stories, legal awareness and city voices. Concepts in development.",
      publisher: { "@id": `${SITE_URL}/#person` },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Basma Moussa",
      alternateName: "بسمة موسى",
      url: `${SITE_URL}/${locale}/about`,
      image: `${SITE_URL}/media/02-about-portrait.webp`,
      description: isAr
        ? "اسم إعلامي عربي يعمل بين الحكاية الإنسانية والبحث القانوني، مقيم في الإمارات العربية المتحدة."
        : "An Arab media voice working between human storytelling and legal research, based in the United Arab Emirates.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Sharjah",
        addressCountry: "AE",
      },
      knowsAbout: [
        isAr ? "الحكاية الإعلامية" : "Media storytelling",
        isAr ? "التوعية القانونية" : "Legal awareness",
        isAr ? "الحكايات الوثائقية" : "Documentary storytelling",
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Brand",
      name: BRAND.name,
      url: `${SITE_URL}/${locale}`,
      logo: `${SITE_URL}/brand/basma-logo-master.png`,
      description: BRAND.conceptNote[locale],
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
