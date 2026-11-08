import type { LocalizedPair } from "../types";

const ar = {
  hero: {
    eyebrow: "الخصوصية",
    title: "بيانات أقل. وضوح أكثر.",
    lead: "هذه الصفحة تصف ما يفعله هذا الموقع فعليًا، لا ما قد يفعله غيره. لا أدوات تحليل، ولا إعلانات، ولا نماذج إرسال في هذا الإصدار.",
    updated: "آخر تحديث: 8 نوفمبر 2026",
  },
  sections: [
    {
      title: "المبدأ",
      paragraphs: [
        "صُمم هذا الموقع ليعمل بأقل قدر ممكن من البيانات. لا نستخدم ملفات تعريف ارتباط، ولا أدوات تحليل جمهور، ولا بكسلات إعلانية، ولا نطلب تسجيلًا.",
        "قراءة الموقع لا تتطلب مشاركة أي بيانات شخصية.",
      ],
    },
    {
      title: "ما يُخزَّن على جهازك",
      paragraphs: [
        "نستخدم مفتاحًا واحدًا في sessionStorage لتذكر أن مقدمة الهوية قد شوهدت خلال الجلسة، حتى لا تتكرر مع كل تنقل. يختفي هذا المفتاح عند إغلاق تبويب المتصفح.",
        "لا نستخدم cookies، ولا تخزينًا دائمًا للتفضيلات في هذا الإصدار. اختيار اللغة يتم عبر عنوان الصفحة.",
      ],
    },
    {
      title: "واتساب",
      paragraphs: [
        "زر التواصل يفتح واتساب في نافذة جديدة برسالة مُعدّة مسبقًا. لا يمر أي محتوى عبر هذا الموقع، ولا نرى الرسائل أو أرقام هواتف الزوار.",
        "تخضع المحادثة لسياسة واتساب الخاصة، وقد تتضمن بيانات معالجة خارج هذا الموقع.",
      ],
    },
    {
      title: "سجلات الاستضافة",
      paragraphs: [
        "إذا نُشر الموقع لاحقًا، فقد يعالج مزود الاستضافة سجلات طلب أساسية (مثل عنوان IP ونوع المتصفح) لأغراض الأمان والأداء. لا توجد حاليًا أي أداة تحليل مكوّنة.",
        "هذا الإصدار غير منشور على نطاق عام بعد؛ لا ندّعي وجود نشر أو قياسات حية.",
      ],
    },
    {
      title: "الصور والهوية",
      paragraphs: [
        "الصور السينمائية والبورتريهات في هذا الإصدار توضيحية للهوية، وليست توثيقًا لأحداث أو منشآت أو مناصب. الشعار المعتمد يُستخدم كما هو.",
        "لا نستخدم صورًا خارجية من شبكات اجتماعية أو مصادر غير مصرّح بها.",
      ],
    },
    {
      title: "التصحيحات والتواصل",
      paragraphs: [
        "لأي سؤال عن الخصوصية أو طلب تصحيح، تواصل عبر قناة واتساب العامة المذكورة في صفحة التواصل. لا ننشر بريدًا إلكترونيًا أو عنوانًا خاصًا قبل اعتماده.",
      ],
    },
  ],
  closing: {
    title: "التغييرات",
    body: "أي تغيير في الممارسات سيُنشر هنا مع تاريخ محدث. لا نغيّر هذه الصفحة بصمت.",
  },
  cta: {
    action: "العودة إلى التواصل",
    privacyBack: "العودة إلى الرئيسية",
  },
} as const;

const en: LocalizedPair<typeof ar>["en"] = {
  hero: {
    eyebrow: "Privacy",
    title: "Less data. More clarity.",
    lead: "This page describes what this site actually does, not what others might do. No analytics, no advertising and no submission forms in this release.",
    updated: "Last updated: 8 November 2026",
  },
  sections: [
    {
      title: "The principle",
      paragraphs: [
        "This site is designed to work with as little data as possible. We use no cookies, no audience analytics, no advertising pixels, and we do not ask you to register.",
        "Reading the site requires no personal data.",
      ],
    },
    {
      title: "What is stored on your device",
      paragraphs: [
        "We use one sessionStorage key to remember that the brand intro has been seen during the session, so it does not repeat on every navigation. The key disappears when the browser tab is closed.",
        "We use no cookies and no persistent preference storage in this release. Language choice lives in the page address.",
      ],
    },
    {
      title: "WhatsApp",
      paragraphs: [
        "The contact button opens WhatsApp in a new window with a pre-written message. No content passes through this website, and we do not see messages or visitors' phone numbers.",
        "The conversation is governed by WhatsApp's own policy and may involve processing outside this site.",
      ],
    },
    {
      title: "Hosting logs",
      paragraphs: [
        "If the site is deployed later, the hosting provider may process basic request logs (such as IP address and browser type) for security and performance. No analytics tooling is currently integrated.",
        "This release is not yet public on a domain; we claim no live deployment or live measurements.",
      ],
    },
    {
      title: "Imagery and identity",
      paragraphs: [
        "Cinematic images and portraits in this release are illustrative of the brand, not documentation of events, facilities or roles. The approved logo is used unchanged.",
        "We use no external social-network images or unlicensed sources.",
      ],
    },
    {
      title: "Corrections and contact",
      paragraphs: [
        "For any privacy question or correction request, use the public WhatsApp channel listed on the contact page. No email address or private address is published before approval.",
      ],
    },
  ],
  closing: {
    title: "Changes",
    body: "Any change in practice will be published here with an updated date. We do not change this page silently.",
  },
  cta: {
    action: "Back to contact",
    privacyBack: "Back to home",
  },
};

export const privacyPageContent: LocalizedPair<typeof ar> = { ar, en };
