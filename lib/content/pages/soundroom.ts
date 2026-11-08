export const SOUNDROOM_CONTENT: Record<"ar" | "en", {
  eyebrow: string;
  title: string;
  lead: string;
  statusLine: string;
  caption: string;
  emptyTitle: string;
  emptyBody: string;
  controlsHint: string;
  decorativeToggleOn: string;
  decorativeToggleOff: string;
  whatToExpectTitle: string;
  whatToExpectBody: string;
  formats: { title: string; body: string }[];
  gates: string[];
  whatsReal: string[];
}> = {
  ar: {
    eyebrow: "مساحة صوت",
    title: "التردد الذهبي",
    lead: "عالم صوتي للحوارات والقصص الإنسانية — قيد التطوير.",
    statusLine: "لا تسجيلات منشورة بعد. هذا ليس مشغل صوت.",
    caption: "موجة صوتية زخرفية فقط — لا تشغيل صامت ولا فعلي.",
    emptyTitle: "لا تسجيلات بعد",
    emptyBody: "مساحة الصوت تُبنى الآن. عندما يُوافَق على مصدر صوتي، سيظهر مشغل حقيقي مع حالات التشغيل والإيقاف والوصف. حتى ذلك الحين، الحركة أعلاه هي تحريك واجهة فقط، وليس صوتًا.",
    controlsHint: "إيقاف/تشغيل الحركة الزخرفية",
    decorativeToggleOn: "الحركة مفعلة",
    decorativeToggleOff: "الحركة متوقفة",
    whatToExpectTitle: "ماذا سيُستمع هنا؟",
    whatToExpectBody: "مقالات صوتية، وحوارات مسجلة، وقراءات تحريرية — كل ذلك فقط عندما تكون المصادر حقيقية ومُعتمدة.",
    formats: [
      { title: "مقالات صوتية", body: "تأملات صوتية حول الحكاية والقانون." },
      { title: "حوارات مسجلة", body: "حوار يُصغي إلى الشخص أولًا، مع موافقة واضحة على الظهور." },
      { title: "قراءات تحريرية", body: "نصوص من المحتوى التحريري للموقع، تُقرأ بصوت." },
    ],
    gates: [
      "مصدر صوتي حقيقي ومُعتمد للنشر",
      "نصوص وموافقات جاهزة",
      "إحساس واضح بحق الاستماع والحفظ",
    ],
    whatsReal: [
      "الفراغ الصوتي هنا حقيقي: لا صوت.",
      "الموجة أعلاه تحريك واجهة، لا صوت.",
      "لا تشغيل تلقائي، ولا حلقات وهمية.",
    ],
  },
  en: {
    eyebrow: "Soundroom",
    title: "The Golden Frequency",
    lead: "An audio world for conversations and human stories — in development.",
    statusLine: "No recordings published yet. This is not an audio player.",
    caption: "Decorative waveform only — no silent or actual playback.",
    emptyTitle: "No recordings yet",
    emptyBody: "The Soundroom is being built. When an approved audio source exists, a real player with play/pause and description will appear. Until then, the motion above is UI animation only — not audio.",
    controlsHint: "Pause/start decorative motion",
    decorativeToggleOn: "Motion on",
    decorativeToggleOff: "Motion off",
    whatToExpectTitle: "What will be heard here?",
    whatToExpectBody: "Audio essays, recorded conversations, and editorial readings — only when sources are real and approved.",
    formats: [
      { title: "Audio essays", body: "Audio reflections on story and law." },
      { title: "Recorded conversations", body: "People-first conversations, with clear consent." },
      { title: "Editorial readings", body: "Site editorial content read aloud." },
    ],
    gates: [
      "A real, approved audio source for publication",
      "Transcripts and consents ready",
      "Clear listening and archiving rights",
    ],
    whatsReal: [
      "The silence here is real: no audio.",
      "The wave above is interface motion, not sound.",
      "No autoplay, no invented episodes.",
    ],
  },
};
