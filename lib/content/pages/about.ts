import type { LocalizedText } from "@/lib/content/types";

export const ABOUT_CONTENT: Record<"ar" | "en", {
  eyebrow: string;
  title: string;
  lead: string;
  portraitCaption: LocalizedText;
  accuracyTitle: string;
  accuracyBody: string;
  verifiedTitle: string;
  verifiedBody: string;
  focus: { title: LocalizedText; body: LocalizedText }[];
  closing: string;
  honestyNote: string;
}> = {
  ar: {
    eyebrow: "عن بسمة",
    title: "بين الإعلام والقانون.",
    lead:
      "بسمة موسى — صوت إعلامي، وبحث قانوني، ورؤية تُبنى في الإمارات. لا نحمل عنوانًا وظيفيًا لم يُؤكد، ولا ننشر ادعاءات مهنية دون مرجع.",
    portraitCaption: {
      ar: "صورة توضيحية معتمدة للهوية البصرية — ليست توثيقًا لحدث حقيقي.",
      en: "Approved illustrative identity image — not documentation of a real event.",
    },
    accuracyTitle: "دقة وتعديل",
    accuracyBody:
      "هذه الصفحة تُروى من الرؤية المعتمدة للمشروع، وهي قيد المراجعة من صاحبة العلاقة قبل النشر النهائي. التفاصيل الأكاديمية والمهنية الدقيقة لا تُنشر إلا بعد تأكيدها.",
    verifiedTitle: "ما نعرفه الآن",
    verifiedBody:
      "على مستوى رؤية المشروع: بسمة موسى مقيمة في الإمارات، وتجمع بين الحكاية الإعلامية والبحث القانوني في منظور تحريري واحد.",
    focus: [
      {
        title: { ar: "الحكاية", en: "Story" },
        body: {
          ar: "قصة إنسانية تُروى بدفء، تُصغي قبل أن تتحدث.",
          en: "A human story told with warmth, listening before speaking.",
        },
      },
      {
        title: { ar: "البحث", en: "Research" },
        body: {
          ar: "مصادر أولية، وإخلاء مسؤولية، قبل أي محتوى قانوني.",
          en: "Primary sources and disclaimers before any legal content.",
        },
      },
      {
        title: { ar: "المكان", en: "Place" },
        body: {
          ar: "الإمارات والمجتمع العربي في القلب، وليس في الهامش.",
          en: "The UAE and the Arab world at the center, not the margin.",
        },
      },
    ],
    closing:
      "عالم الإعلام يُبنى مع الزوار، وليس لهم.",
    honestyNote:
      "الصور المعروضة على هذه الصفحة توضيحية للهوية البصرية فقط، وليست صورًا توثيقية لشخص أو مكان.",
  },
  en: {
    eyebrow: "About Basma",
    title: "Between media and law.",
    lead:
      "Basma Moussa — a media voice, legal research, and a vision being built in the United Arab Emirates.",
    portraitCaption: {
      ar: "صورة توضيحية معتمدة للهوية البصرية — ليست توثيقًا لحدث حقيقي.",
      en: "Approved illustrative identity image — not documentation of a real event.",
    },
    accuracyTitle: "Accuracy and review",
    accuracyBody:
      "This page tells the project's approved vision and is pending review by the subject before final publication. Specific academic and professional details are not published until confirmed.",
    verifiedTitle: "What we state now",
    verifiedBody:
      "At project level: Basma Moussa is based in the United Arab Emirates and brings media storytelling and legal research into one editorial perspective.",
    focus: [
      {
        title: { ar: "Story", en: "Story" },
        body: {
          ar: "قصة إنسانية تُروى بدفء، تُصغي قبل أن تتحدث.",
          en: "A human story told with warmth, listening before speaking.",
        },
      },
      {
        title: { ar: "Research", en: "Research" },
        body: {
          ar: "مصادر أولية، وإخلاء مسؤولية، قبل أي محتوى قانوني.",
          en: "Primary sources and disclaimers before any legal content.",
        },
      },
      {
        title: { ar: "Place", en: "Place" },
        body: {
          ar: "الإمارات والمجتمع العربي في القلب، وليس في الهامش.",
          en: "The UAE and the Arab world at the center, not the margin.",
        },
      },
    ],
    closing:
      "The Media Universe is being built with visitors, not for them.",
    honestyNote:
      "The images on this page illustrate the visual identity only — they are not documentary photos of a person or place.",
  },
};
