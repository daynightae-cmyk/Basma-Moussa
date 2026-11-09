import type { LocalizedText } from "@/lib/content/types";

export interface LegalOutline {
  id: string;
  title: LocalizedText;
  summary: LocalizedText;
  jurisdiction: string;
  status: "outline";
  sourceIds: string[];
  note: LocalizedText;
}

/**
 * Planned legal-explainers ONLY. Editorial outlines, not published articles.
 * No body content is asserted here; nothing is legal advice.
 */
export const LEGAL_OUTLINES: LegalOutline[] = [
  {
    id: "uae-federal-law-intro",
    title: {
      ar: "كيف نقرأ قانونًا اتحاديًا؟ دليل البداية",
      en: "How to read a UAE federal law: a starting guide",
    },
    summary: {
      ar: "طريقة قراءة النصوص الاتحادية على بوابة التشريعات، مع إشارة إلى المصدر الرسمي.",
      en: "How to read federal legislation on the UAE legislation portal, pointing to the official source.",
    },
    jurisdiction: "UAE-federal",
    status: "outline",
    sourceIds: ["uae-legislation"],
    note: {
      ar: "مخطط تحريري غير منشور. ليس استشارة قانونية.",
      en: "Editorial outline, not published. Not legal advice.",
    },
  },
  {
    id: "verify-legal-headline",
    title: {
      ar: "المصدر قبل الخبر: كيف نتحقق من خبر قانوني؟",
      en: "Source before story: verifying a legal headline",
    },
    summary: {
      ar: "طريقة التحقق من المصادر عند نقل أخبار قانونية من مكتب الإعلام الحكومي وبوابة التشريعات.",
      en: "Verifying sources when reporting legal news via the Sharjah media bureau and UAE legislation portal.",
    },
    jurisdiction: "UAE-federal",
    status: "outline",
    sourceIds: ["uae-legislation", "sgmb"],
    note: {
      ar: "مخطط تحريري غير منشور. ليس استشارة قانونية.",
      en: "Editorial outline, not published. Not legal advice.",
    },
  },
  {
    id: "egypt-uae-legal-contexts",
    title: {
      ar: "سياقان قانونيان: مصر والإمارات",
      en: "Two legal contexts: Egypt and the UAE",
    },
    summary: {
      ar: "توعي بمقارنة سياقية فقط بين البيئتين القانونية، دون ادعاء ترخيص أو ممارسة.",
      en: "Contextual comparison only between the two legal environments, with no claim of licensing or practice.",
    },
    jurisdiction: "UAE-federal",
    status: "outline",
    sourceIds: ["uae-legislation", "dubai-legal"],
    note: {
      ar: "مخطط تحريري غير منشور. ليس استشارة قانونية.",
      en: "Editorial outline, not published. Not legal advice.",
    },
  },
  {
    id: "contract-language-first-read",
    title: {
      ar: "لغة العقد: ما الذي نقرأه أولًا؟",
      en: "The language of a contract: what to read first",
    },
    summary: {
      ar: "عناصر أولية في قراءة العقود، بإحالات إلى التشريعات الاتحادية الخاصة بالعقود.",
      en: "Initial elements of reading contracts, with references to UAE federal contract legislation.",
    },
    jurisdiction: "UAE-federal",
    status: "outline",
    sourceIds: ["uae-legislation"],
    note: {
      ar: "مخطط تحريري غير منشور. ليس استشارة قانونية.",
      en: "Editorial outline, not published. Not legal advice.",
    },
  },
];

export const LEGAL_DISCLAIMER_AR =
  "هذا المحتوى توعوي فقط، ولا يُعتبر استشارة قانونية فردية، ولا يُنشئ علاقة محامٍ وموكل.";
export const LEGAL_DISCLAIMER_EN =
  "This content is educational only. It is not individual legal advice and does not create an attorney–client relationship.";
