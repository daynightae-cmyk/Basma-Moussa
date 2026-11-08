import type { LocalizedText } from "@/lib/content/types";

export type CameraLanguage = "push" | "drift" | "breathe" | "rise";

export interface CinematicHeroScene {
  id: string;
  assetId: string;
  /** Optional second layer for depth (same or complementary approved asset). */
  fgAssetId?: string;
  composition: "portrait-left" | "studio-wide" | "frequency" | "city-portrait" | "legal-desk";
  eyebrow: LocalizedText;
  title: LocalizedText;
  lead: LocalizedText;
  ctaLabel: LocalizedText;
  ctaHref: string;
  camera: CameraLanguage;
}

export interface StoryPanel {
  id: string;
  assetId: string;
  kicker: LocalizedText;
  title: LocalizedText;
  lead: LocalizedText;
  ctaLabel: LocalizedText;
  ctaHref: string;
  atmosphere: "portrait" | "studio" | "frequency" | "city" | "legal";
}

/** Four distinct approved compositions for the home cinematic slider. */
export const HOME_HERO_SCENES: CinematicHeroScene[] = [
  {
    id: "first-voice",
    assetId: "bm-14",
    fgAssetId: "bm-02",
    composition: "portrait-left",
    eyebrow: { ar: "بسمة موسى · عالم الإعلام", en: "Basma Moussa · Media Universe" },
    title: {
      ar: "لكل حكاية صوت... ولكل صوت رؤية.",
      en: "Where Stories Find Their Voice.",
    },
    lead: {
      ar: "بسمة موسى — مساحة إعلامية سينمائية تضع الصوت الإنساني في المقدمة.",
      en: "Basma Moussa — a cinematic media space that puts the human voice first.",
    },
    ctaLabel: { ar: "ادخل عالم الإعلام", en: "Enter the Media Universe" },
    ctaHref: "/media",
    camera: "push",
  },
  {
    id: "conversation-studio",
    assetId: "bm-12",
    composition: "studio-wide",
    eyebrow: { ar: "عالم ٠١", en: "World 01" },
    title: { ar: "ما وراء الإطار", en: "Beyond the Frame" },
    lead: {
      ar: "استوديو حوار فاخر — مشهد تصوري، لا بثّ حيّ ولا حلقات منشورة بعد.",
      en: "A luxury conversation studio — illustrative concept, not a live broadcast.",
    },
    ctaLabel: { ar: "ادخل الاستوديو", en: "Enter the studio" },
    ctaHref: "/programs/beyond-the-frame",
    camera: "drift",
  },
  {
    id: "golden-frequency",
    assetId: "bm-01",
    composition: "frequency",
    eyebrow: { ar: "عالم ٠٤", en: "World 04" },
    title: { ar: "التردد الذهبي", en: "The Golden Frequency" },
    lead: {
      ar: "فضاء صوتي رقمي بموجات ذهبية — هوية بصرية، وليست تسجيلات صوتية حقيقية.",
      en: "A digital audio space of golden waves — visual identity, not real recordings.",
    },
    ctaLabel: { ar: "ادخل Soundroom", en: "Enter Soundroom" },
    ctaHref: "/soundroom",
    camera: "breathe",
  },
  {
    id: "city-voices",
    assetId: "bm-11",
    composition: "city-portrait",
    eyebrow: { ar: "عالم ٠٣", en: "World 03" },
    title: { ar: "أصوات المدينة", en: "City Voices" },
    lead: {
      ar: "أجواء وثائقية من الشارقة والإمارات — مشهد تصوري لمشروع قصص مقترح.",
      en: "Documentary atmosphere from Sharjah and the UAE — an illustrative proposed series.",
    },
    ctaLabel: { ar: "استكشف الأصوات", en: "Explore the voices" },
    ctaHref: "/stories",
    camera: "rise",
  },
];

/** Five full-viewport panels for the horizontal story journey. */
export const HOME_STORY_PANELS: StoryPanel[] = [
  {
    id: "the-first-voice",
    assetId: "bm-02",
    atmosphere: "portrait",
    kicker: { ar: "الفصل ١", en: "Chapter 01" },
    title: { ar: "الصوت الأول", en: "The First Voice" },
    lead: {
      ar: "بورتريه تحريري لبسمة — نقطة البداية لكل عوالم السرد.",
      en: "An editorial portrait of Basma — the origin point for every story world.",
    },
    ctaLabel: { ar: "تعرّف على بسمة", en: "Meet Basma" },
    ctaHref: "/about",
  },
  {
    id: "the-conversation-studio",
    assetId: "bm-12",
    atmosphere: "studio",
    kicker: { ar: "الفصل ٢", en: "Chapter 02" },
    title: { ar: "استوديو الحوار", en: "The Conversation Studio" },
    lead: {
      ar: "نافذة «ما وراء الإطار» — كرسيان، خلفية ذهبية، ومحادثة إنسانية.",
      en: "The Beyond the Frame window — two chairs, a gold backdrop, a human conversation.",
    },
    ctaLabel: { ar: "ادخل الاستوديو", en: "Enter the studio" },
    ctaHref: "/programs/beyond-the-frame",
  },
  {
    id: "the-golden-frequency",
    assetId: "bm-01",
    atmosphere: "frequency",
    kicker: { ar: "الفصل ٣", en: "Chapter 03" },
    title: { ar: "التردد الذهبي", en: "The Golden Frequency" },
    lead: {
      ar: "شرائط صوت ذهبية تقود إلى Soundroom — بوابة صوتية قيد البناء.",
      en: "Golden sound ribbons leading into Soundroom — an audio portal still being built.",
    },
    ctaLabel: { ar: "ادخل Soundroom", en: "Enter Soundroom" },
    ctaHref: "/soundroom",
  },
  {
    id: "city-voices",
    assetId: "bm-11",
    atmosphere: "city",
    kicker: { ar: "الفصل ٤", en: "Chapter 04" },
    title: { ar: "أصوات المدينة", en: "City Voices" },
    lead: {
      ar: "واجهة الشارقة والكاميرا الميدانية — أجواء وثائقية مقترحة، لا مقابلات مكتملة.",
      en: "Sharjah waterfront and a field camera — proposed documentary mood, not finished interviews.",
    },
    ctaLabel: { ar: "استكشف القصص", en: "Explore stories" },
    ctaHref: "/stories",
  },
  {
    id: "the-legal-lens",
    assetId: "bm-04",
    atmosphere: "legal",
    kicker: { ar: "الفصل ٥", en: "Chapter 05" },
    title: { ar: "العدسة القانونية", en: "The Legal Lens" },
    lead: {
      ar: "غرفة بحث قانوني ذهبية الضوء — توعية مقترحة بمصادر رسمية، بلا ادعاءات مهنية.",
      en: "A gold-lit legal research room — proposed awareness with official sources, no professional claims.",
    },
    ctaLabel: { ar: "ادخل العدسة القانونية", en: "Enter Legal Lens" },
    ctaHref: "/legal-lens",
  },
];
