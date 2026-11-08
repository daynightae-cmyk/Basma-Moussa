import type { LocalizedText } from "@/lib/content/types";

export const CONTACT_CONTENT: Record<"ar" | "en", {
  eyebrow: string;
  title: string;
  lead: string;
  whatsappLabel: LocalizedText;
  whatsappSub: LocalizedText;
  noFormTitle: string;
  noFormBody: LocalizedText;
  themes: { title: LocalizedText; body: LocalizedText }[];
  privacyNote: LocalizedText;
  caption: LocalizedText;
}> = {
  ar: {
    eyebrow: "تواصل للتعاون",
    title: "لنصنع الحكاية القادمة.",
    lead:
      "للتعاون الإعلامي، الحوارات، والبحث التحريري — راسل بسمة مباشرة عبر واتساب.",
    whatsappLabel: { ar: "مراسلة بسمة على واتساب", en: "Message Basma on WhatsApp" },
    whatsappSub: {
      ar: "يفتح محادثة واتساب برسالة جاهزة.",
      en: "Opens a WhatsApp chat with a prepared message.",
    },
    noFormTitle: "لا نموذج إرسال في هذا الإصدار",
    noFormBody: {
      ar: "لا توجد نماذج اتصال غير موصولة بقناة استلام موثقة. سيُضاف نموذج فقط عند ربطه بخدمة إرسال موثقة وموافق عليها.",
      en: "No contact forms that go nowhere. A form will be added only when connected to a trusted, approved delivery service.",
    },
    themes: [
      {
        title: { ar: "تعاون إعلامي", en: "Media collaboration" },
        body: { ar: "حوارات ومقابلات ومحتوى مرئي وصوتي.", en: "Conversations, interviews, and audio-visual content." },
      },
      {
        title: { ar: "بحث تحريري", en: "Editorial research" },
        body: { ar: "محتوى قانوني توعوي وحكايات مجتمع.", en: "Educational legal content and community stories." },
      },
      {
        title: { ar: "إنتاج صوتي", en: "Audio production" },
        body: { ar: "مقالات وحوارات للمساحة الصوتية.", en: "Essays and conversations for the Soundroom." },
      },
    ],
    privacyNote: {
      ar: "تُدار المراسلة عبر واتساب وفقًا لسياسة واتساب؛ الموقع لا يخزن رسائلك.",
      en: "Messaging is handled by WhatsApp under its own policy; this site does not store your messages.",
    },
    caption: {
      ar: "مساحة تعاون توضيحية — ليست مكتبًا حقيقيًا.",
      en: "Illustrative collaboration space — not a real office.",
    },
  },
  en: {
    eyebrow: "Collaborate",
    title: "Let's create the next story.",
    lead:
      "For media collaboration, conversations, and editorial research — reach Basma directly on WhatsApp.",
    whatsappLabel: { ar: "مراسلة بسمة على واتساب", en: "Message Basma on WhatsApp" },
    whatsappSub: {
      ar: "يفتح محادثة واتساب برسالة جاهزة.",
      en: "Opens a WhatsApp chat with a prepared message.",
    },
    noFormTitle: "No contact form in this release",
    noFormBody: {
      ar: "No contact forms that go nowhere. A form will be added only when connected to a trusted, approved delivery service.",
      en: "No contact forms that go nowhere. A form will be added only when connected to a trusted, approved delivery service.",
    },
    themes: [
      {
        title: { ar: "Media collaboration", en: "Media collaboration" },
        body: { ar: "Conversations, interviews, and audio-visual content.", en: "Conversations, interviews, and audio-visual content." },
      },
      {
        title: { ar: "Editorial research", en: "Editorial research" },
        body: { ar: "Educational legal content and community stories.", en: "Educational legal content and community stories." },
      },
      {
        title: { ar: "Audio production", en: "Audio production" },
        body: { ar: "Essays and conversations for the Soundroom.", en: "Essays and conversations for the Soundroom." },
      },
    ],
    privacyNote: {
      ar: "Messaging is handled by WhatsApp under its own policy; this site does not store your messages.",
      en: "Messaging is handled by WhatsApp under its own policy; this site does not store your messages.",
    },
    caption: {
      ar: "Illustrative collaboration space — not a real office.",
      en: "Illustrative collaboration space — not a real office.",
    },
  },
};
