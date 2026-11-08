import type { LocalizedPair } from "../types";

const ar = {
  hero: {
    eyebrow: "من زاوية القانون",
    title: "مكتبة تبدأ من المصدر.",
    lead: "توعية قانونية بلغة إنسانية، تحدد الاختصاص وتاريخ القراءة. ليست استشارة، وليست تمثيلًا قانونيًا.",
    caption: "مشهد بحث قانوني — صورة توضيحية، وليست توثيقًا لملف حقيقي.",
  },
  sources: {
    eyebrow: "بوابات رسمية",
    title: "أربعة مداخل للتحقق.",
    lead: "روابط مرجعية رسمية، لا واجهات بيانات مباشرة. تحقق دائمًا من النص الأصلي وتاريخ تحديثه.",
    checkedLabel: "تاريخ الفحص",
    jurisdictionLabel: "الاختصاص",
    externalLabel: "فتح المصدر الرسمي",
    noLicenseNote: "لم تُراجع حقوق إعادة النشر بعد؛ نستخدم الروابط للإحالة فقط.",
    apiNote: "لا ندّعي وجود API عام أو تغذية مباشرة.",
  },
  library: {
    eyebrow: "المخططات التحريرية",
    title: "ما نعمل عليه الآن.",
    lead: "هذه عناوين ومسارات بحث، وليست مقالات منشورة. كل بطاقة تحمل وسم «مخطط تحريري» بوضوح.",
    notPublished: "مخطط تحريري — لم يُنشر",
    sourceLabel: "المصادر",
    noteLabel: "ملاحظة",
  },
  method: {
    eyebrow: "المنهج",
    title: "كيف نراجع مادة قانونية؟",
    steps: [
      {
        number: "01",
        title: "نبدأ بالنص الرسمي",
        body: "لا نعتمد على ملخص صحفي أو منشور شبكي قبل الوصول إلى المصدر الرسمي.",
      },
      {
        number: "02",
        title: "نحدد الاختصاص",
        body: "القانون الاتحادي الإماراتي ليس قانون دبي، وليس قانون الشارقة، وليس قانون مصر. السياق أولًا.",
      },
      {
        number: "03",
        title: "نكتب ثم نراجع",
        body: "نفرّق بين الشرح والرأي والاستشارة، ونطلب مراجعة بشرية قبل النشر.",
      },
      {
        number: "04",
        title: "نؤرخ القراءة",
        body: "تاريخ القراءة جزء من المادة. القانون يتغير، والصفحة يجب أن تقول متى قُرئت.",
      },
    ],
  },
  dialogue: {
    eyebrow: "الحوار القانوني",
    title: "الشرح لا يعني الاستشارة.",
    body: "المشهد التوضيحي لحوار قانوني لا يمثل عميلًا حقيقيًا ولا لقاءً مهنيًا. نستخدمه لأنه يوضح طبيعة العمل: قراءة هادئة، أسئلة دقيقة، وحدود واضحة.",
    caption: "حوار قانوني تصوري — صورة توضيحية.",
  },
  disclaimerTitle: "تنبيه تعليمي",
  cta: {
    title: "لديك سؤال بحثي أو تعاون تحريري؟",
    body: "نرحب بالتعاون في التوعية القانونية ضمن المصادر والاختصاص والمراجعة.",
    action: "تواصل عبر واتساب",
  },
} as const;

const en: LocalizedPair<typeof ar>["en"] = {
  hero: {
    eyebrow: "The Legal Lens",
    title: "A library that starts at the source.",
    lead: "Legal awareness in human language, naming the jurisdiction and the reading date. Not advice, and not legal representation.",
    caption: "A legal research scene — illustrative imagery, not documentation of a real case.",
  },
  sources: {
    eyebrow: "Official entry points",
    title: "Four places to verify.",
    lead: "Official reference links, not live data feeds. Always verify the original text and its update date.",
    checkedLabel: "Checked",
    jurisdictionLabel: "Jurisdiction",
    externalLabel: "Open the official source",
    noLicenseNote: "Republication rights have not been reviewed; links are used for reference only.",
    apiNote: "We claim no public API or live feed.",
  },
  library: {
    eyebrow: "Editorial outlines",
    title: "What we are working on.",
    lead: "These are titles and research paths, not published articles. Every card is clearly labelled as an editorial outline.",
    notPublished: "Editorial outline — not published",
    sourceLabel: "Sources",
    noteLabel: "Note",
  },
  method: {
    eyebrow: "The method",
    title: "How is legal material reviewed?",
    steps: [
      {
        number: "01",
        title: "Start with the official text",
        body: "We do not rely on a press summary or social post before reaching the official source.",
      },
      {
        number: "02",
        title: "Name the jurisdiction",
        body: "UAE federal law is not Dubai law, not Sharjah law, and not Egyptian law. Context comes first.",
      },
      {
        number: "03",
        title: "Write, then review",
        body: "We separate explanation, opinion and advice, and require human review before publication.",
      },
      {
        number: "04",
        title: "Record the reading date",
        body: "The reading date is part of the material. Law changes, and the page should say when it was read.",
      },
    ],
  },
  dialogue: {
    eyebrow: "Legal dialogue",
    title: "Explanation is not advice.",
    body: "The illustrative legal-dialogue scene does not depict a real client or a professional meeting. We use it to show the nature of the work: quiet reading, precise questions and clear boundaries.",
    caption: "Illustrative legal dialogue — concept imagery.",
  },
  disclaimerTitle: "Educational notice",
  cta: {
    title: "Have a research question or an editorial collaboration?",
    body: "We welcome legal-awareness collaboration within sources, jurisdiction and review.",
    action: "Reach out on WhatsApp",
  },
};

export const legalPageContent: LocalizedPair<typeof ar> = { ar, en };
