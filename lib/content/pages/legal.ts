export const LEGAL_CONTENT: Record<"ar" | "en", {
  eyebrow: string;
  title: string;
  lead: string;
  statusLine: string;
  caption: string;
  disclaimerTitle: string;
  disclaimerBody: string;
  sourcesTitle: string;
  sourcesIntro: string;
  sourcesNote: string;
  plannedTitle: string;
  plannedBody: string;
  noAdvice: string;
  contactNote: string;
}> = {
  ar: {
    eyebrow: "من زاوية القانون",
    title: "القانون بلغة الناس",
    lead: "محتوى توعوي يُرجع إلى مصادر رسمية، مع إخلاء مسؤولية واضح في كل مادة. لا استشارات فردية، ولا ادعاء تمثيل قانوني.",
    statusLine: "مخططات تحريرية قيد الإعداد — غير منشورة.",
    caption: "صورة توضيحية لمكتب بحث قانوني — ليست مكتبًا حقيقيًا.",
    disclaimerTitle: "إخلاء مسؤولية",
    disclaimerBody: "هذا المحتوى توعوي فقط. لا يُعتبر استشارة قانونية فردية، ولا يُنشئ علاقة محامٍ وموكل، ولا يستبدل استشارة محامٍ مرخص.",
    sourcesTitle: "مصادر رسمية للإحالة",
    sourcesIntro: "نربط بمصادر رسمية فقط. لا نُعيد نشر نصوص قوانين كاملة، ولا نُصادق على محتوى المواقع الخارجية.",
    sourcesNote: "هذه بوابات إلكترونية رسمية، ليست واجهات برمجية موثقة.",
    plannedTitle: "المواد المخطط لها",
    plannedBody: "مخططات تحريرية أولية، تواريخ ومراجع تُحدد عند المراجعة. لا شيء منشور.",
    noAdvice: "لا نص قانوني فردي",
    contactNote: "للتعاون في المحتوى القانوني التوعوي، راسل بسمة عبر واتساب.",
  },
  en: {
    eyebrow: "Legal Lens",
    title: "Law in the language of people",
    lead: "Educational content grounded in official sources, with a clear disclaimer on every material. No individual advice, no claim of legal representation.",
    statusLine: "Editorial outlines in preparation — nothing published.",
    caption: "Illustrative image of a legal research desk — not a real office.",
    disclaimerTitle: "Disclaimer",
    disclaimerBody: "This content is educational only. It is not individual legal advice, does not create an attorney–client relationship, and does not replace licensed counsel.",
    sourcesTitle: "Official sources for reference",
    sourcesIntro: "We link only to official sources. We do not republish full law texts, and we do not endorse external site content.",
    sourcesNote: "Official web entry points — not documented APIs.",
    plannedTitle: "Planned materials",
    plannedBody: "Preliminary editorial outlines; dates and references set at review. Nothing published.",
    noAdvice: "No individual legal advice",
    contactNote: "For educational legal-content collaboration, reach Basma on WhatsApp.",
  },
};
