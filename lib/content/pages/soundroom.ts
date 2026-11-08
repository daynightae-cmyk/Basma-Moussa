import type { LocalizedPair } from "../types";

const ar = {
  hero: {
    eyebrow: "مساحة صوت · التردد الذهبي",
    title: "استمع للطبقات التي لا تظهر في الصورة.",
    lead: "عالم للأصوات التي لا تكفي الصورة لتحملها. هذا الإصدار لا يحتوي ملفًا صوتيًا منشورًا — وسنقول ذلك بوضوح.",
    caption: "موجة ذهبية — عمل بصري توضيحي، ليس غلاف حلقة.",
  },
  absent: {
    eyebrow: "حالة حقيقية",
    title: "لا صوت منشور بعد.",
    body: "لم نسجّل حلقة، ولم نستلم ملفًا صوتيًا مصرّحًا به. بدلًا من مشغل وهمي يخدع الزائر، هذه المساحة تعلن حالتها وتنتظر أول مادة حقيقية.",
    metricOne: "0",
    metricLabel: "ملفات صوتية منشورة",
    motionNote: "الموجة أدناه زخرفية بالكامل. زر الحركة يوقفها ويشغّلها، ولا يشغّل صوتًا.",
    realPlayerNote: "المشغل الحقيقي — بأزرار تشغيل ووقت وتفريغ نصي — يظهر فقط عند توفر ملف صوتي مصرّح به.",
  },
  formats: {
    eyebrow: "ما الذي سيُسمع هنا",
    title: "ثلاث صيغ صوتية، بمعيار واحد.",
    lead: "الصوت لا يُنشر لأنه جميل فقط؛ يُنشر لأنه مفهوم، موثّق، ومصرّح به.",
  },
  gates: {
    eyebrow: "شروط النشر",
    title: "ما الذي يجب أن يكون صحيحًا قبل أول حلقة؟",
  },
  programLink: {
    title: "المفهوم الكامل",
    body: "اقرأ تعريف عالم «مساحة صوت» وشروط إنتاجه، بعيدًا عن واجهة الاستماع.",
    cta: "افتح بطاقة المفهوم",
  },
  cta: {
    title: "لديك مادة صوتية أو فكرة؟",
    body: "القناة مفتوحة للتعاون الصوتي — بشرط الحقوق والموافقة والوضوح.",
    action: "تواصل عبر واتساب",
  },
} as const;

const en: LocalizedPair<typeof ar>["en"] = {
  hero: {
    eyebrow: "Soundroom · The Golden Frequency",
    title: "Listen for the layers you cannot see.",
    lead: "A world for sounds the image cannot hold. This release contains no published audio — and we say so plainly.",
    caption: "A golden waveform — illustrative visual work, not an episode cover.",
  },
  absent: {
    eyebrow: "An honest state",
    title: "No audio published yet.",
    body: "We have not recorded an episode, and no rights-cleared audio file has been supplied. Instead of a pretend player that misleads visitors, this space states its condition and waits for its first real piece.",
    metricOne: "0",
    metricLabel: "published audio files",
    motionNote: "The waveform below is entirely decorative. The motion button pauses or resumes it and never plays sound.",
    realPlayerNote: "A real player — with play controls, time and transcript — appears only when approved audio exists.",
  },
  formats: {
    eyebrow: "What will be heard here",
    title: "Three audio formats, one standard.",
    lead: "Audio is not published because it sounds beautiful. It is published because it is clear, documented and rights-cleared.",
  },
  gates: {
    eyebrow: "Publication gates",
    title: "What must be true before the first episode?",
  },
  programLink: {
    title: "The full concept",
    body: "Read the definition of the Soundroom world and its production gates, away from the listening surface.",
    cta: "Open the concept card",
  },
  cta: {
    title: "Have audio material or an idea?",
    body: "The channel is open for audio collaboration — subject to rights, consent and clarity.",
    action: "Reach out on WhatsApp",
  },
};

export const soundroomPageContent: LocalizedPair<typeof ar> = { ar, en };
