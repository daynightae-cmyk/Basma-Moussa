import type { LocalizedText } from "@/lib/content/types";

export const STUDIO_CONTENT: Record<"ar" | "en", {
  eyebrow: string;
  title: string;
  lead: string;
  caption: LocalizedText;
  steps: { label: LocalizedText; title: LocalizedText; body: LocalizedText }[];
  libraryTitle: string;
  libraryBody: LocalizedText;
}> = {
  ar: {
    eyebrow: "خلف الرؤية",
    title: "مساحة للصناعة",
    lead:
      "نظرة في عملية الإنتاج: بحث، حوار، تحرير، ثم نشر. الاستوديو هنا مجاز للإبداع، وليس ادعاء ملكية منشأة.",
    caption: {
      ar: "مشهد إنتاج إعلامي توضيحي — ليست استوديوًا مملوكًا.",
      en: "Illustrative media-production scene — not an owned studio.",
    },
    steps: [
      {
        label: { ar: "الخطوة 1", en: "Step 1" },
        title: { ar: "البحث", en: "Research" },
        body: { ar: "مصادر أولية، وسياق حقيقي، قبل كل حكاية.", en: "Primary sources and real context before every story." },
      },
      {
        label: { ar: "الخطوة 2", en: "Step 2" },
        title: { ar: "الحوار", en: "Conversation" },
        body: { ar: "استماع verdade، لا أسئلة أداء.", en: "Genuine listening, not performance questions." },
      },
      {
        label: { ar: "الخطوة 3", en: "Step 3" },
        title: { ar: "التحرير", en: "Edit" },
        body: { ar: "تشذيب القصة، لا تشويهها.", en: "Shaping the story, not distorting it." },
      },
      {
        label: { ar: "الخطوة 4", en: "Step 4" },
        title: { ar: "النشر", en: "Publish" },
        body: { ar: "فقط عندما تكون المادة جاهزة وصادقة.", en: "Only when the material is ready and honest." },
      },
    ],
    libraryTitle: "المكتبة الإعلامية",
    libraryBody: {
      ar: "المكتبة قيد البناء. عند توفر مواد معتمدة، ستظهر هنا مع حالاتها التحريرية.",
      en: "The media library is being built. Approved materials will appear here with their editorial status.",
    },
  },
  en: {
    eyebrow: "Behind the Vision",
    title: "A space for making",
    lead:
      "A look at the production process: research, conversation, edit, publish. The studio here is a metaphor for craft, not a claim of owning a facility.",
    caption: {
      ar: "مشهد إنتاج إعلامي توضيحي — ليست استوديوًا مملوكًا.",
      en: "Illustrative media-production scene — not an owned studio.",
    },
    steps: [
      {
        label: { ar: "Step 1", en: "Step 1" },
        title: { ar: "Research", en: "Research" },
        body: { ar: "Primary sources and real context before every story.", en: "Primary sources and real context before every story." },
      },
      {
        label: { ar: "Step 2", en: "Step 2" },
        title: { ar: "Conversation", en: "Conversation" },
        body: { ar: "Genuine listening, not performance questions.", en: "Genuine listening, not performance questions." },
      },
      {
        label: { ar: "Step 3", en: "Step 3" },
        title: { ar: "Edit", en: "Edit" },
        body: { ar: "Shaping the story, not distorting it.", en: "Shaping the story, not distorting it." },
      },
      {
        label: { ar: "Step 4", en: "Step 4" },
        title: { ar: "Publish", en: "Publish" },
        body: { ar: "Only when the material is ready and honest.", en: "Only when the material is ready and honest." },
      },
    ],
    libraryTitle: "Media library",
    libraryBody: {
      ar: "The media library is being built. Approved materials will appear here with their editorial status.",
      en: "The media library is being built. Approved materials will appear here with their editorial status.",
    },
  },
};
