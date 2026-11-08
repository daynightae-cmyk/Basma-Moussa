import type { LegalOutline } from "./types";

/**
 * Editorial outlines only. They intentionally have no body, no publication
 * date and no "published" status: the app must never fake a legal explainer.
 */
export const legalOutlines: LegalOutline[] = [
  {
    id: "reading-uae-federal-law",
    title: {
      ar: "كيف نقرأ قانونًا اتحاديًا؟ دليل البداية",
      en: "How to read a UAE federal law: a starting guide",
    },
    summary: {
      ar: "مخطط لشرح بنية النص القانوني: الديباجة، التعريفات، النطاق، ثم المواد. مع رابط مباشر إلى بوابة التشريعات.",
      en: "A planned walkthrough of a legal text's structure: preamble, definitions, scope, then articles, with a direct link to the legislation portal.",
    },
    jurisdiction: { ar: "الإمارات — اتحادي", en: "UAE — federal" },
    status: "outline",
    sourceIds: ["uae-legislation"],
    note: {
      ar: "قراءة تعليمية عامة، وليست استشارة قانونية.",
      en: "General educational reading, not legal advice.",
    },
  },
  {
    id: "source-before-headline",
    title: {
      ar: "المصدر قبل الخبر: كيف نتحقق من خبر قانوني؟",
      en: "Source before the headline: verifying legal news",
    },
    summary: {
      ar: "مخطط لمنهج تحقق: من نشر الخبر؟ ما تاريخه؟ هل النص الأصلي متاح؟ وما الفرق بين الخبر والرأي؟",
      en: "A planned verification method: who published it, when, is the original text available, and where does reporting end and opinion begin?",
    },
    jurisdiction: { ar: "الإمارات والشارقة", en: "UAE and Sharjah" },
    status: "outline",
    sourceIds: ["sgmb", "uae-legislation"],
    note: {
      ar: "لا يُعاد نشر نص أي خبر دون حق واضح.",
      en: "No third-party article is republished without clear rights.",
    },
  },
  {
    id: "two-legal-contexts",
    title: {
      ar: "سياقان قانونيان: مصر والإمارات",
      en: "Two legal contexts: Egypt and the UAE",
    },
    summary: {
      ar: "مخطط لشرح أهمية تحديد الاختصاص قبل المقارنة، مع تمييز القانون الاتحادي الإماراتي عن أنظمة الإمارات المحلية.",
      en: "A planned explanation of why jurisdiction comes before comparison, distinguishing UAE federal law from emirate-level frameworks.",
    },
    jurisdiction: { ar: "مقارنة — مصر والإمارات", en: "Comparative — Egypt and the UAE" },
    status: "outline",
    sourceIds: ["uae-legislation", "dubai-legal"],
    note: {
      ar: "المقارنة للتوعية، ولا تُنتج حكمًا قانونيًا.",
      en: "Comparison for awareness; it produces no legal ruling.",
    },
  },
  {
    id: "contract-language",
    title: {
      ar: "لغة العقد: ما الذي نقرأه أولًا؟",
      en: "Contract language: what do we read first?",
    },
    summary: {
      ar: "مخطط لقراءة العقد بعين غير متخصصة: الأطراف، الالتزامات، المدة، ثم شروط الإنهاء. مع تذكير بمراجعة مختص.",
      en: "A planned non-specialist reading path: parties, obligations, term, then termination, with a reminder to consult a professional.",
    },
    jurisdiction: { ar: "الإمارات — اتحادي", en: "UAE — federal" },
    status: "outline",
    sourceIds: ["uae-legislation"],
    note: {
      ar: "لا تُنشر أي مادة قبل مراجعة بشرية وتحديث المصدر.",
      en: "Nothing is published before human review and a source update.",
    },
  },
];

export const legalDisclaimer = {
  ar: "المحتوى القانوني في هذه المنصة تعليمي عام، ولا يُعد استشارة قانونية فردية أو تمثيلًا قانونيًا. لكل حالة خصوصيتها؛ راجع مختصًا مرخّصًا في الاختصاص المعني. المصادر الرسمية تُذكر مع تاريخ القراءة.",
  en: "Legal content on this platform is general education. It is not individual legal advice or legal representation. Every matter has its own context; consult a licensed professional in the relevant jurisdiction. Official sources are named with their reading date.",
};
