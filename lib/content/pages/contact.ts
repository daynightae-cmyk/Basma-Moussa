import type { LocalizedPair } from "../types";

const ar = {
  hero: {
    eyebrow: "التعاون",
    title: "لنفتح بابًا لحكاية جديدة.",
    lead: "للتعاون الإعلامي، الحوارات، البحث التحريري، أو فكرة تريد أن تُروى — القناة جاهزة.",
    caption: "مساحة تعاون تصورية — لا تدّعي مكتبًا حقيقيًا.",
  },
  whatsapp: {
    eyebrow: "واتساب مباشر",
    title: "رسالة جاهزة. بلا نماذج.",
    body: "اضغط الزر لفتح محادثة واتساب مع رسالة عربية جاهزة. الرابط عام ومأخوذ من الرؤية المعتمدة للمشروع.",
    cta: "ابدأ محادثة واتساب",
    note: "يفتح واتساب في نافذة جديدة. تخضع الرسائل لسياسة واتساب، ولا نستقبلها على هذا الموقع.",
  },
  themes: {
    eyebrow: "ما الذي نناقشه؟",
    title: "أربعة أبواب للتعاون.",
    lead: "لا نعد بشراكة قبل الاتفاق، ولا بقبول قبل القراءة.",
    items: [
      {
        title: "حوارات ومقابلات",
        body: "فكرة ضيف، موضوع إنساني، أو مساحة لحوار طويل.",
      },
      {
        title: "توعية قانونية",
        body: "تعاون تحريري يبدأ من مصدر رسمي ومراجعة بشرية.",
      },
      {
        title: "حكايات المدن",
        body: "قصة من الشارقة أو مدن عربية أخرى، بموافقة أهلها.",
      },
      {
        title: "إنتاج صوتي",
        body: "فكرة صوتية أو مادة مصرّح بها لمساحة الصوت.",
      },
    ],
  },
  noForm: {
    eyebrow: "لماذا لا يوجد نموذج؟",
    title: "لأن الزر يجب أن يعمل.",
    body: "لا نطلق نموذج إرسال قبل ربطه بقناة استلام موثّقة وسياسة خصوصية مناسبة. بدلًا من زر لا يرسل شيئًا، نعطيك قناة حقيقية تعمل الآن.",
  },
  privacy: {
    title: "الخصوصية أولًا",
    body: "لا توجد أدوات تحليل أو ملفات تتبع على هذا الموقع في هذا الإصدار. اقرأ سياسة الخصوصية لمعرفة التفاصيل.",
    cta: "اقرأ سياسة الخصوصية",
  },
  closing: {
    title: "نقرأ كل رسالة باحترام.",
    body: "الرد يعتمد على الوقت والموضوع؛ لا وعود آلية ولا ردود مولّدة.",
  },
} as const;

const en: LocalizedPair<typeof ar>["en"] = {
  hero: {
    eyebrow: "Collaborate",
    title: "Let us open a door to a new story.",
    lead: "For media collaboration, conversations, editorial research, or a story that deserves to be told — the channel is ready.",
    caption: "An illustrative collaboration room — not a claim of an actual office.",
  },
  whatsapp: {
    eyebrow: "Direct WhatsApp",
    title: "A prepared message. No forms.",
    body: "Press the button to open a WhatsApp conversation with a prepared English message. The link is public and taken from the approved project vision.",
    cta: "Start a WhatsApp conversation",
    note: "Opens WhatsApp in a new window. Messages are governed by WhatsApp's policy and are not received by this website.",
  },
  themes: {
    eyebrow: "What we discuss",
    title: "Four doors for collaboration.",
    lead: "We promise no partnership before agreement, and no acceptance before reading.",
    items: [
      {
        title: "Conversations & interviews",
        body: "A guest idea, a human subject, or room for a long conversation.",
      },
      {
        title: "Legal awareness",
        body: "Editorial collaboration that starts from an official source and human review.",
      },
      {
        title: "City stories",
        body: "A story from Sharjah or another Arab city, with its people's consent.",
      },
      {
        title: "Audio production",
        body: "An audio idea or rights-cleared material for the Soundroom.",
      },
    ],
  },
  noForm: {
    eyebrow: "Why no form?",
    title: "Because the button must work.",
    body: "We do not launch a submission form before it is connected to a verified receiving channel and an appropriate privacy policy. Instead of a button that sends nothing, we give you a real channel that works now.",
  },
  privacy: {
    title: "Privacy first",
    body: "There are no analytics or tracking files on this site in this release. Read the privacy policy for the details.",
    cta: "Read the privacy policy",
  },
  closing: {
    title: "Every message is read with respect.",
    body: "Replies depend on time and subject; no automated promises and no generated responses.",
  },
};

export const contactPageContent: LocalizedPair<typeof ar> = { ar, en };
