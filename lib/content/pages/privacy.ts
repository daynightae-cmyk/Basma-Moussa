import type { LocalizedText } from "@/lib/content/types";

export const PRIVACY_CONTENT: Record<"ar" | "en", {
  eyebrow: string;
  title: string;
  intro: LocalizedText;
  sections: { title: LocalizedText; body: LocalizedText }[];
  contactPractice: LocalizedText;
  changes: LocalizedText;
  updated: LocalizedText;
}> = {
  ar: {
    eyebrow: "الخصوصية",
    title: "خصوصية زوار عالم الإعلام",
    intro: {
      ar: "هذا الموقع يُبنى كمنصة ثابتة تُعرض المحتوى فقط، ولا تُثبّت أدوات تتبع، ولا تستخدم ملفات تعريف الارتباط (ملفات الكوكيز)، ولا تحتوي على نماذج إرسال.",
      en: "This site is built as a static content platform: it installs no tracking tools, uses no cookies, and contains no submission forms.",
    },
    sections: [
      {
        title: { ar: "التحليلات والتتبع", en: "Analytics and tracking" },
        body: {
          ar: "لا تُثبّت هذه المنصة أدوات تحليل، ولا بكسلات، ولا سكريبتات تتبع من أطراف ثالثة.",
          en: "This platform installs no analytics, pixels, or third-party tracking scripts.",
        },
      },
      {
        title: { ar: "التخزين محليًا فقط", en: "Local storage only" },
        body: {
          ar: "يُستخدم المتصفح لتremember خيارين فقط: whether the intro was shown this session, and the chosen language. لا تُرسل أي معلومات للخادم.",
          en: "The browser remembers only two choices: whether the intro was shown this session, and the chosen language. Nothing is sent to a server.",
        },
      },
      {
        title: { ar: "واتساب", en: "WhatsApp" },
        body: {
          ar: "زر التواصل يفتح محادثة خارجية على واتساب. تُدار المراسلة وفقًا لسياسة واتساب الخاصة؛ الموقع لا receives ولا يخزن محتوى الرسائل.",
          en: "The contact button opens an external WhatsApp chat. Messaging is governed by WhatsApp's own policy; this site neither receives nor stores message content.",
        },
      },
      {
        title: { ar: "سجلات الخادم", en: "Server logs" },
        body: {
          ar: "الموقع غير منشور حاليًا. عند النشر، قد تحتفظ شركة الاستضافة بسجلات طلبات قياسية للأمان فقط.",
          en: "The site is not currently published. If published, the hosting provider may keep standard request logs for security only.",
        },
      },
      {
        title: { ar: "الصورة والهوية", en: "Image and identity" },
        body: {
          ar: "الشعار معتمد من صاحبة العلاقة. الصور السينمائية والبورتريهات تصوّر توضيحي للهوية البصرية فقط. لا نُنشر بطاقات هوية، شهادات، جوازات، أو سير ذاتية خام.",
          en: "The logo is approved by the subject. Cinematic images and portraits illustrate the visual identity only. We publish no ID scans, certificates, passports, or raw CVs.",
        },
      },
    ],
    contactPractice: {
      ar: "لأسئلة الخصوصية أو لحذف أي تفضيل محلي، راسل عبر واتساب.",
      en: "For privacy questions or to clear local preferences, message on WhatsApp.",
    },
    changes: {
      ar: "تُراجع هذه الصفحة عند أي تغيير في الممارسات.",
      en: "This page is reviewed whenever practices change.",
    },
    updated: { ar: "آخر تحديث: 8 نوفمبر 2026", en: "Last updated: 8 November 2026" },
  },
  en: {
    eyebrow: "Privacy",
    title: "Privacy for Media Universe visitors",
    intro: {
      ar: "This site is built as a static content platform: it installs no tracking tools, uses no cookies, and contains no submission forms.",
      en: "This site is built as a static content platform: it installs no tracking tools, uses no cookies, and contains no submission forms.",
    },
    sections: [
      {
        title: { ar: "Analytics and tracking", en: "Analytics and tracking" },
        body: {
          ar: "This platform installs no analytics, pixels, or third-party tracking scripts.",
          en: "This platform installs no analytics, pixels, or third-party tracking scripts.",
        },
      },
      {
        title: { ar: "Local storage only", en: "Local storage only" },
        body: {
          ar: "The browser remembers only two choices: whether the intro was shown this session, and the chosen language. Nothing is sent to a server.",
          en: "The browser remembers only two choices: whether the intro was shown this session, and the chosen language. Nothing is sent to a server.",
        },
      },
      {
        title: { ar: "WhatsApp", en: "WhatsApp" },
        body: {
          ar: "The contact button opens an external WhatsApp chat. Messaging is governed by WhatsApp's own policy; this site neither receives nor stores message content.",
          en: "The contact button opens an external WhatsApp chat. Messaging is governed by WhatsApp's own policy; this site neither receives nor stores message content.",
        },
      },
      {
        title: { ar: "Server logs", en: "Server logs" },
        body: {
          ar: "The site is not currently published. If published, the hosting provider may keep standard request logs for security only.",
          en: "The site is not currently published. If published, the hosting provider may keep standard request logs for security only.",
        },
      },
      {
        title: { ar: "Image and identity", en: "Image and identity" },
        body: {
          ar: "The logo is approved by the subject. Cinematic images and portraits illustrate the visual identity only. We publish no ID scans, certificates, passports, or raw CVs.",
          en: "The logo is approved by the subject. Cinematic images and portraits illustrate the visual identity only. We publish no ID scans, certificates, passports, or raw CVs.",
        },
      },
    ],
    contactPractice: {
      ar: "For privacy questions or to clear local preferences, message on WhatsApp.",
      en: "For privacy questions or to clear local preferences, message on WhatsApp.",
    },
    changes: {
      ar: "This page is reviewed whenever practices change.",
      en: "This page is reviewed whenever practices change.",
    },
    updated: { ar: "Last updated: 8 November 2026", en: "Last updated: 8 November 2026" },
  },
};
