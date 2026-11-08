import type { LocalizedText } from "@/lib/content/types";

export const STORIES_CONTENT: Record<"ar" | "en", {
  eyebrow: string;
  title: string;
  lead: string;
  statusLine: string;
  caption: LocalizedText;
  archiveNote: string;
  lanes: { title: LocalizedText; body: LocalizedText; status: LocalizedText }[];
  policy: { title: LocalizedText; body: LocalizedText }[];
}> = {
  ar: {
    eyebrow: "القصص والتوثيق",
    title: "أرشيف الذاكرة",
    lead:
      "قصص موثقة ومواد بحثية قيد الإعداد. لا ننشر什么 لم نتحقق منه.",
    statusLine: "الأرشيف في مرحلة الإعداد — لا مواد منشورة بعد.",
    caption: {
      ar: "مشهد أرشيفي توضيحي — ليست مستندات حقيقية.",
      en: "Illustrative archival scene — not real documents.",
    },
    archiveNote:
      "عندما يُنصح الأرشيف، ستحمل كل مادة مصدرها وتاريخها وحالتها التحريرية.",
    lanes: [
      {
        title: { ar: "حكايات إنسانية", en: "Human stories" },
        body: { ar: "قصص من الإمارات والمجتمع العربي، تُروى بإذن واضح.", en: "Stories from the UAE and the Arab world, told with clear consent." },
        status: { ar: "قيد الإعداد", en: "In preparation" },
      },
      {
        title: { ar: "تفسيرات قانونية", en: "Legal explainers" },
        body: { ar: "مبنية على مصادر رسمية، مع إخلاء مسؤولية.", en: "Grounded in official sources, with disclaimers." },
        status: { ar: "مخططات أولية", en: "Preliminary outlines" },
      },
      {
        title: { ar: "صوت المدينة", en: "City voices" },
        body: { ar: "ملاحظات ميدانية من الشارقة والمدن.", en: "Field notes from Sharjah and the cities." },
        status: { ar: "قيد الإعداد", en: "In preparation" },
      },
      {
        title: { ar: "محتوى صوتي", en: "Audio content" },
        body: { ar: "مقالات وحوارات مسجلة عند توفرها.", en: "Essays and recorded conversations when they exist." },
        status: { ar: "قيد التطوير", en: "In development" },
      },
    ],
    policy: [
      {
        title: { ar: "التحقق أولًا", en: "Verify first" },
        body: { ar: "لا نُنشر قصة إلا بعد التحقق من مصادرها.", en: "No story published before its sources are verified." },
      },
      {
        title: { ar: "موافقة واضحة", en: "Clear consent" },
        body: { ar: "لا يظهر شخص recognizable دون موافقته.", en: "No identifiable person appears without consent." },
      },
      {
        title: { ar: "حالة صادقة", en: "Honest status" },
        body: { ar: "كل مادة تحمل حالتها: مفهوم، إعداد، أو منشور.", en: "Every item carries its status: concept, preparation, or published." },
      },
    ],
  },
  en: {
    eyebrow: "Stories & Archive",
    title: "Memory Room",
    lead:
      "Documented stories and research materials being assembled. Nothing published before verification.",
    statusLine: "The archive is in preparation — no materials published yet.",
    caption: {
      ar: "مشهد أرشيفي توضيحي — ليست مستندات حقيقية.",
      en: "Illustrative archival scene — not real documents.",
    },
    archiveNote:
      "When the archive opens, every item will carry its source, date, and editorial status.",
    lanes: [
      {
        title: { ar: "Human stories", en: "Human stories" },
        body: { ar: "قصص من الإمارات والمجتمع العربي، تُروى بإذن واضح.", en: "Stories from the UAE and the Arab world, told with clear consent." },
        status: { ar: "In preparation", en: "In preparation" },
      },
      {
        title: { ar: "Legal explainers", en: "Legal explainers" },
        body: { ar: "مبنية على مصادر رسمية، مع إخلاء مسؤولية.", en: "Grounded in official sources, with disclaimers." },
        status: { ar: "Preliminary outlines", en: "Preliminary outlines" },
      },
      {
        title: { ar: "City voices", en: "City voices" },
        body: { ar: "ملاحظات ميدانية من الشارقة والمدن.", en: "Field notes from Sharjah and the cities." },
        status: { ar: "In preparation", en: "In preparation" },
      },
      {
        title: { ar: "Audio content", en: "Audio content" },
        body: { ar: "مقالات وحوارات مسجلة عند توفرها.", en: "Essays and recorded conversations when they exist." },
        status: { ar: "In development", en: "In development" },
      },
    ],
    policy: [
      {
        title: { ar: "Verify first", en: "Verify first" },
        body: { ar: "No story published before its sources are verified.", en: "No story published before its sources are verified." },
      },
      {
        title: { ar: "Clear consent", en: "Clear consent" },
        body: { ar: "No identifiable person appears without consent.", en: "No identifiable person appears without consent." },
      },
      {
        title: { ar: "Honest status", en: "Honest status" },
        body: { ar: "Every item carries its status: concept, preparation, or published.", en: "Every item carries its status: concept, preparation, or published." },
      },
    ],
  },
};
