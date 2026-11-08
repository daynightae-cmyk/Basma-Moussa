import type { Locale } from "@/lib/i18n/config";
import type { LocalizedText } from "@/lib/content/types";

/**
 * Canonical origin. Never invent ownership of a live domain: the checked-in
 * fallback is a reserved example domain and must be overridden in deployment.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://basma-moussa.example.com"
).replace(/\/+$/, "");

export const BRAND = {
  name: "Basma Moussa",
  nameAr: "بسمة موسى",
  product: "Media Universe",
  productAr: "عالم الإعلام",
  tagline: {
    ar: "لكل حكاية صوت... ولكل صوت رؤية.",
    en: "Where Stories Find Their Voice.",
  } satisfies LocalizedText,
  location: {
    ar: "الشارقة، الإمارات العربية المتحدة",
    en: "Sharjah, United Arab Emirates",
  } satisfies LocalizedText,
  conceptNote: {
    ar: "منصة مفاهيم — ليست قناة بث أو مجموعة إعلامية مسجّلة.",
    en: "A concept platform — not a broadcaster or a registered media group.",
  } satisfies LocalizedText,
} as const;

/**
 * Owner-supplied public WhatsApp action from the approved original vision
 * deck. Replace only after the owner confirms a new public channel.
 */
export const WHATSAPP_NUMBER = "971507226089";

const WHATSAPP_MESSAGE: Record<Locale, string> = {
  ar: "مرحبًا بسمة، أرغب في التواصل بخصوص تعاون إعلامي.",
  en: "Hello Basma, I would like to get in touch about a media collaboration.",
};

export function whatsappHref(locale: Locale): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    WHATSAPP_MESSAGE[locale],
  )}`;
}

/** Do not advertise an email or form until a verified channel exists. */
export const CONTACT_CHANNELS = {
  whatsapp: true,
  email: false,
  form: false,
} as const;

export const SOURCE_AUDIT_DATE = "2026-11-08";
