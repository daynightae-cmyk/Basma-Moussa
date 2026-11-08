export const locales = ["ar", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "ar";

export const direction: Record<Locale, "rtl" | "ltr"> = {
  ar: "rtl",
  en: "ltr",
};

export const htmlLang: Record<Locale, string> = {
  ar: "ar",
  en: "en",
};

export const openGraphLocale: Record<Locale, string> = {
  ar: "ar_AE",
  en: "en_AE",
};

export const otherLocale: Record<Locale, Locale> = {
  ar: "en",
  en: "ar",
};

export const localeDisplayName: Record<Locale, string> = {
  ar: "العربية",
  en: "English",
};

export function isLocale(value: string | undefined): value is Locale {
  return value === "ar" || value === "en";
}
