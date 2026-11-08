import type { LocalizedPair } from "../types";

const ar = {
  hero: {
    eyebrow: "أرشيف الذاكرة",
    title: "قصص تُروى عندما تجهز، لا قبل ذلك.",
    lead: "أرشيف وثائقي قيد الإعداد: حكايات إنسانية، ملاحظات ميدانية، وذاكرة مدن. كل قصة تحتاج وقتها وموافقتها ومصدرها.",
    caption: "مشهد أرشيف بحثي — صورة توضيحية.",
  },
  status: {
    eyebrow: "حالة الأرشيف",
    title: "أرشيف صادق، لا أرشيف ممتلئ.",
    body: "يفضّل هذا الأرشيف أن يظهر فارغًا على أن يمتلئ بقصص لم تُروَ أو لم تُتحقق. عندما تدخل أول قصة، ستدخل باسم صاحبها ومصدرها وتاريخ مراجعتها.",
    metric: "0",
    metricLabel: "قصة منشورة",
    metricSecondary: "4",
    metricSecondaryLabel: "مسارات تحريرية قيد البحث",
    note: "المسارات التحريرية مفاهيم، وليست مقالات أو حلقات.",
  },
  lanes: {
    eyebrow: "مسارات البحث",
    title: "أربع طرق إلى الذاكرة.",
    lead: "لكل مسار منهجه ومعياره. لا نخلط الحكاية الإنسانية بالتحليل القانوني، ولا الملاحظة الميدانية بالرأي.",
    items: [
      {
        title: "حكايات إنسانية",
        body: "أشخاص عاديون يحملون معنى غير عادي. موافقة واضحة، وسياق كامل، ولا استعجال.",
      },
      {
        title: "ذاكرة المدن",
        body: "المكان كشاهد: الشارقة والمدن العربية، تحولاتها وتفاصيلها اليومية.",
      },
      {
        title: "ملاحظات ميدانية",
        body: "ما يُكتب قبل الكاميرا: الأصوات، الطريق، التفاصيل التي لا تدخل المونتاج.",
      },
      {
        title: "قراءات موثقة",
        body: "مواد قانونية وثقافية تُقرأ مع مصدرها، وتُوسم بأنها شرح لا استشارة.",
      },
    ],
  },
  policy: {
    eyebrow: "سياسة النشر",
    title: "ما الذي يدخل هذا الأرشيف؟",
    items: [
      "قصة حقيقية، وموافقة صريحة من صاحبها.",
      "مصدر قابل للتحقق، وتاريخ واضح.",
      "مراجعة تحريرية مستقلة عن صاحب المصلحة.",
      "سياسة تصحيح مرئية عند الخطأ.",
    ],
    note: "لا نتحايل على غياب المحتوى بحكايات رمزية تُقدَّم كوقائع.",
  },
  cta: {
    title: "لديك قصة تستحق أن تُحفظ؟",
    body: "شاركنا بداية الحكاية، لا العنوان الجاذب. سنتحقق ثم نقرر.",
    action: "تواصل عبر واتساب",
  },
} as const;

const en: LocalizedPair<typeof ar>["en"] = {
  hero: {
    eyebrow: "The Memory Room",
    title: "Stories are told when they are ready, not before.",
    lead: "A documentary archive in preparation: human stories, field notes and the memory of cities. Every story needs its time, its consent and its source.",
    caption: "A research archive scene — illustrative imagery.",
  },
  status: {
    eyebrow: "Archive status",
    title: "An honest archive, not a full one.",
    body: "This archive would rather appear empty than fill itself with stories that were never told or never verified. When the first story enters, it will enter with its owner's name, its source and its review date.",
    metric: "0",
    metricLabel: "stories published",
    metricSecondary: "4",
    metricSecondaryLabel: "editorial paths in research",
    note: "The editorial paths are concepts, not articles or episodes.",
  },
  lanes: {
    eyebrow: "Research paths",
    title: "Four ways into memory.",
    lead: "Each path has its own method and standard. We do not confuse a human story with legal analysis, or a field note with opinion.",
    items: [
      {
        title: "Human stories",
        body: "Ordinary people carrying extraordinary meaning. Clear consent, full context, no rushing.",
      },
      {
        title: "City memory",
        body: "Place as witness: Sharjah and Arab cities, their changes and everyday details.",
      },
      {
        title: "Field notes",
        body: "What is written before the camera: voices, routes and details that never reach the edit.",
      },
      {
        title: "Documented readings",
        body: "Legal and cultural material read with its source, labelled as explanation, not advice.",
      },
    ],
  },
  policy: {
    eyebrow: "Publication policy",
    title: "What enters this archive?",
    items: [
      "A real story, with explicit consent from the person who owns it.",
      "A verifiable source and a clear date.",
      "Editorial review independent of the interested party.",
      "A visible correction policy when something is wrong.",
    ],
    note: "We do not disguise missing content with symbolic stories presented as facts.",
  },
  cta: {
    title: "Have a story that deserves to be kept?",
    body: "Share the beginning of the story, not the catchy headline. We will verify, then decide.",
    action: "Reach out on WhatsApp",
  },
};

export const storiesPageContent: LocalizedPair<typeof ar> = { ar, en };
