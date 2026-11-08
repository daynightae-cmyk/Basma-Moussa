import type { LocalizedPair } from "../types";

const ar = {
  eyebrow: "عالم إعلامي",
  statusHeading: "الحالة الحقيقية",
  statusLabel: "حالة الإنتاج",
  formatsHeading: "الصيغ المخططة",
  formatsLead: "ما الذي سيكون عليه هذا العالم عندما ينضج؟ هذه صيغ مقترحة، لا حلقات.",
  gatesHeading: "شروط النشر",
  gatesLead: "لا نعلن «منشورًا» قبل أن تتحقق هذه الشروط جميعًا.",
  quoteLabel: "من فلسفة العالم",
  heroCaption: "مشهد تصوري لهذا العالم.",
  introductionHeading: "عن هذا العالم",
  episodesHeading: "الحلقات",
  episodesEmptyTitle: "لا حلقات منشورة.",
  episodesEmptyBody:
    "المفهوم محدد، لكن لا توجد حلقات أو ضيوف أو مدة مقاسة بعد. عندما تصبح الحلقة حقيقية ومعتمدة، ستظهر هنا مع مصدرها ومدتها وتفريغها.",
  relatedHeading: "عوالم قريبة",
  experienceCta: "ادخل التجربة",
  back: "العودة إلى فهرس العوالم",
  illustrativeLabel: "صورة توضيحية",
  atmosphereLabel: "الأجواء",
  worldLabel: "العالم",
  conceptLink: "بطاقة المفهوم الكاملة",
  contactCta: "ناقش هذا العالم",
} as const;

const en: LocalizedPair<typeof ar>["en"] = {
  eyebrow: "A media world",
  statusHeading: "The honest status",
  statusLabel: "Production status",
  formatsHeading: "Planned formats",
  formatsLead: "What will this world become when it matures? These are proposed formats, not episodes.",
  gatesHeading: "Publication gates",
  gatesLead: "We do not declare anything published before every one of these conditions is true.",
  quoteLabel: "From the world's philosophy",
  heroCaption: "An illustrative scene for this world.",
  introductionHeading: "About this world",
  episodesHeading: "Episodes",
  episodesEmptyTitle: "No episodes published.",
  episodesEmptyBody:
    "The concept is defined, but there are no episodes, guests or measured durations yet. When an episode becomes real and approved, it will appear here with its source, duration and transcript.",
  relatedHeading: "Nearby worlds",
  experienceCta: "Enter the experience",
  back: "Back to the world index",
  illustrativeLabel: "Illustrative image",
  atmosphereLabel: "Atmosphere",
  worldLabel: "The world",
  conceptLink: "Full concept card",
  contactCta: "Discuss this world",
};

export const programLabels: LocalizedPair<typeof ar> = { ar, en };
