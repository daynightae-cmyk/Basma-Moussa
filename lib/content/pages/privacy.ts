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
      ar: "تقدم المنصة محتوى إعلاميًا وتجربة استوديو ذكاء اصطناعي اختيارية. لا نثبت أدوات تتبع إعلانية أو نموذج اتصال خفي. إذا أرسلت سؤالًا إلى الاستوديو الذكي، يُنقل محتوى سؤالك والسياق الحديث الضروري إلى مزوّد الذكاء الاصطناعي المُعتمد لتوليد الرد.",
      en: "This platform offers editorial content and an optional AI Studio. Sending a chat message transmits the necessary message and recent context to the approved AI provider.",
    },
    sections: [
      {
        title: { ar: "التحليلات والتتبع", en: "Analytics and tracking" },
        body: {
          ar: "لا تُثبت المنصة في هذا الإصدار أدوات تحليل إعلانية أو بكسلات تتبع طرف ثالث.",
          en: "This release does not install advertising analytics or third-party tracking pixels.",
        },
      },
      {
        title: { ar: "المحادثة مع الذكاء الاصطناعي", en: "AI Studio conversations" },
        body: {
          ar: "تظل المحادثة الحالية في ذاكرة المتصفح ويمكن مسحها بزر «محادثة جديدة». لا يخزن هذا التنفيذ رسائل المحادثة في قاعدة بيانات بالموقع، لكن مزوّد الذكاء الاصطناعي قد يعالجها أو يحتفظ بها وفق شروطه. تجنّب إدخال بيانات حساسة أو وثائق سرية.",
          en: "Current conversation state remains in browser memory and can be cleared with New Conversation. This implementation does not store chat transcripts in a site database; the AI provider may process or retain submitted content according to its own terms. Avoid sensitive information and confidential documents.",
        },
      },
      {
        title: { ar: "الإملاء الصوتي", en: "Voice dictation" },
        body: {
          ar: "الميكروفون يعمل فقط عند طلبك. تستخدم ميزة الإملاء Web Speech API عندما يدعمها المتصفح؛ وقد يرسل المتصفح الصوت إلى خدمة تعرف على الكلام خاضعة لسياسته. يظهر النص لك للمراجعة قبل أي إرسال إلى المساعد.",
          en: "The microphone is activated only on request. Browser Web Speech API support may involve the browser's speech recognition service under its own terms. You see and can edit the transcript before any chat submission.",
        },
      },
      {
        title: { ar: "اختيارات المتصفح", en: "Browser preferences" },
        body: {
          ar: "يستخدم الموقع تخزين جلسة محدودًا لتذكر عرض مقدمة الهوية؛ ولا يستخدم AI Studio ملفات كوكيز لتخزين المحادثات.",
          en: "The site uses limited session storage to remember whether the brand intro was shown; AI Studio does not use cookies to store conversations.",
        },
      },
      {
        title: { ar: "واتساب", en: "WhatsApp" },
        body: {
          ar: "يفتح زر التواصل محادثة خارجية على واتساب، وتخضع رسائلك هناك لسياسة واتساب. لا يتلقى الموقع محتوى رسائل واتساب.",
          en: "The contact action opens a WhatsApp conversation, governed by WhatsApp's own policies. The site does not receive WhatsApp message content.",
        },
      },
      {
        title: { ar: "حماية الطلبات وسجلات الاستضافة", en: "Rate limits and hosting logs" },
        body: {
          ar: "تُحدّ طلبات الذكاء الاصطناعي لحماية الخدمة من الإساءة، باستخدام معرّفات عميل مجزأة عند توفر إعدادات الخادم. وقد تحتفظ منصة الاستضافة بسجلات طلبات تشغيلية وفق سياستها. لا يتضمن هذا التنفيذ تسجيل محتوى الأسئلة في سجلات التطبيق.",
          en: "AI requests are rate limited using hashed client identifiers where configured. Hosting providers may retain operational request logs under their policies. This implementation does not log chat message bodies.",
        },
      },
      {
        title: { ar: "الصورة والهوية", en: "Image and identity" },
        body: {
          ar: "صور الاستوديو والمشاهد السينمائية توضيحية للهوية البصرية، وليست دليلًا على مقر إنتاج فعلي. لا ننشر مسوحات هويات أو جوازات أو شهادات أو ملفات سيرة ذاتية خام.",
          en: "Studio and cinematic imagery is illustrative, not evidence of real facilities. We do not publish ID scans, passports, certificates or raw CV documents.",
        },
      },
    ],
    contactPractice: {
      ar: "لأسئلة الخصوصية، استخدم قناة التواصل المعلنة على الموقع.",
      en: "For privacy questions, use the contact channel shown on the site.",
    },
    changes: {
      ar: "تُراجع هذه الصفحة عند أي تغيير في ممارسات المعالجة أو مزوّد الخدمة.",
      en: "This page is reviewed whenever data practices or the AI provider change.",
    },
    updated: { ar: "آخر تحديث: 9 نوفمبر 2026", en: "Last updated: 9 November 2026" },
  },
  en: {
    eyebrow: "Privacy",
    title: "Privacy for Media Universe visitors",
    intro: {
      ar: "تقدم المنصة محتوى إعلاميًا وتجربة استوديو ذكاء اصطناعي اختيارية. عند إرسال رسالة، يُنقل نصها والسياق المطلوب إلى مزوّد الذكاء الاصطناعي المعتمد.",
      en: "This platform offers editorial content and an optional AI Studio. Submitting a message transmits its content and the necessary recent context to the approved AI provider.",
    },
    sections: [
      {
        title: { ar: "التحليلات والتتبع", en: "Analytics and tracking" },
        body: {
          ar: "لا يثبت هذا الإصدار أدوات تتبع إعلانية.",
          en: "This release does not install advertising analytics or third-party tracking pixels.",
        },
      },
      {
        title: { ar: "محادثات الذكاء الاصطناعي", en: "AI Studio conversations" },
        body: {
          ar: "تبقى المحادثة في ذاكرة المتصفح حتى تمسحها. قد يعالج المزوّد الرسائل وفق شروطه؛ لا ترسل بيانات سرية.",
          en: "Current conversation state remains in browser memory and can be cleared with New Conversation. This implementation does not store chat transcripts in a site database; the provider may process or retain submitted content under its own terms. Avoid confidential documents and sensitive data.",
        },
      },
      {
        title: { ar: "الإملاء الصوتي", en: "Voice dictation" },
        body: {
          ar: "التعرف الصوتي اختياري وقد يستخدم خدمات المتصفح الخارجية. راجع النص قبل الإرسال.",
          en: "Microphone access is user-triggered. The browser's Web Speech API may use its own speech service. Transcription is displayed and editable before the AI request is sent.",
        },
      },
      {
        title: { ar: "اختيارات المتصفح", en: "Browser preferences" },
        body: {
          ar: "يُستخدم تخزين الجلسة لمقدمة الهوية فقط؛ لا تُخزن المحادثة في الكوكيز.",
          en: "Limited session storage remembers the brand intro; AI Studio does not use cookies to persist conversations.",
        },
      },
      {
        title: { ar: "واتساب", en: "WhatsApp" },
        body: {
          ar: "مراسلات واتساب تخضع لسياسة واتساب.",
          en: "WhatsApp conversations are handled externally under WhatsApp's policy; the site does not receive their content.",
        },
      },
      {
        title: { ar: "تحديد الطلبات والسجلات", en: "Rate limits and logs" },
        body: {
          ar: "تُستخدم معرّفات مجزأة لتحديد الاستهلاك، وقد تحتفظ الاستضافة بسجلات تشغيلية.",
          en: "AI traffic is rate limited using hashed client identifiers when configured. Hosting providers may retain operational request logs. This implementation does not log chat bodies.",
        },
      },
      {
        title: { ar: "الصورة والهوية", en: "Image and identity" },
        body: {
          ar: "المشاهد السينمائية توضيحية فقط؛ لا ننشر مستندات شخصية خاصة.",
          en: "Studio and cinematic imagery is illustrative, not proof of facilities. We publish no ID scans, passports, certificates or raw CVs.",
        },
      },
    ],
    contactPractice: {
      ar: "لأسئلة الخصوصية استخدم قناة التواصل المعلنة.",
      en: "For privacy questions, use the contact channel listed on the site.",
    },
    changes: {
      ar: "تُراجع الصفحة إذا تغيرت ممارسات المعالجة.",
      en: "This page is reviewed if processing practices change.",
    },
    updated: { ar: "آخر تحديث: 9 نوفمبر 2026", en: "Last updated: 9 November 2026" },
  },
};
