import type { Locale } from "@/lib/i18n/config";
import type { LocalizedText } from "@/lib/content/types";

/**
 * Content-to-presentation mapping for the cinematic surfaces.
 * Scenes are data, not hardcoded markup, so publishing a new episode or a new
 * world later does not require rebuilding the animation layer.
 */

export type SceneGeometry =
  | "portrait-left"
  | "studio-wide"
  | "sculpture"
  | "city-portrait";

export type SceneKind = "first-voice" | "conversation" | "frequency" | "city";

export type HeroSceneRecord = {
  id: string;
  kind: SceneKind;
  geometry: SceneGeometry;
  assetId: string;
  href: string;
  /** Which side the copy occupies. Physical, not logical, so the portrait stays clear. */
  copySide: "left" | "right";
  chapter: string;
  kicker: LocalizedText;
  title: LocalizedText;
  lead: LocalizedText;
  cta: LocalizedText;
  secondaryCta?: { label: LocalizedText; href: string };
  stat?: { value: string; label: LocalizedText };
};

export const heroScenes: HeroSceneRecord[] = [
  {
    id: "first-voice",
    kind: "first-voice",
    geometry: "portrait-left",
    assetId: "bm-14",
    href: "/media",
    copySide: "right",
    chapter: "01",
    kicker: {
      ar: "بسمة موسى · عالم الإعلام",
      en: "Basma Moussa · Media Universe",
    },
    title: {
      ar: "لكل حكاية صوت... ولكل صوت رؤية.",
      en: "Where Stories Find Their Voice.",
    },
    lead: {
      ar: "منصة إعلامية عربية تُبنى الآن: حكايات إنسانية، وعي قانوني، وأصوات المدن — برؤية سينمائية وصدق تحريري.",
      en: "An Arabic-first media platform in the making: human stories, legal awareness, and the voices of cities — with cinematic vision and editorial honesty.",
    },
    cta: {
      ar: "ادخل عالم الإعلام",
      en: "Enter the Media Universe",
    },
    secondaryCta: {
      label: { ar: "لنتعاون", en: "Collaborate" },
      href: "/contact",
    },
    stat: {
      value: "00",
      label: { ar: "حلقات منشورة", en: "published episodes" },
    },
  },
  {
    id: "conversation-chamber",
    kind: "conversation",
    geometry: "studio-wide",
    assetId: "bm-12",
    href: "/programs/beyond-the-frame",
    copySide: "left",
    chapter: "02",
    kicker: {
      ar: "خارج الإطار · غرفة الحوار",
      en: "Beyond the Frame · The Conversation Chamber",
    },
    title: {
      ar: "صوت له رؤية... وحكاية تستحق أن تُروى.",
      en: "A voice with a vision — and a story worth telling.",
    },
    lead: {
      ar: "حوارات طويلة مع الناس الذين يصنعون المعنى: باحثون، فنانون، عاملون في المدن. بلا استعجال، وبلا عنوان بديل عن الحكاية.",
      en: "Long conversations with the people who make meaning: researchers, artists, city workers. Unhurried, and never trading a story for a headline.",
    },
    cta: {
      ar: "ادخل غرفة الحوار",
      en: "Enter the Conversation Chamber",
    },
    secondaryCta: {
      label: { ar: "اعرف المفهوم", en: "Read the concept" },
      href: "/programs/beyond-the-frame",
    },
    stat: {
      value: "01",
      label: { ar: "مفهوم قيد التطوير", en: "concept in development" },
    },
  },
  {
    id: "golden-frequency",
    kind: "frequency",
    geometry: "sculpture",
    assetId: "bm-01",
    href: "/soundroom",
    copySide: "right",
    chapter: "03",
    kicker: {
      ar: "مساحة صوت · التردد الذهبي",
      en: "Soundroom · The Golden Frequency",
    },
    title: {
      ar: "الصوت يفتح بابًا آخر داخل الصورة.",
      en: "Sound opens another door inside the image.",
    },
    lead: {
      ar: "مقالات مسموعة، حوارات، وقراءات — مفهوم صوتي شفاف. حتى تتوفر مادة صوتية معتمدة، تبقى المساحة موجة زخرفية لا مشغّلًا وهميًا.",
      en: "Audio essays, conversations and readings — a transparent audio concept. Until approved audio exists, the room stays a decorative waveform, never a pretend player.",
    },
    cta: {
      ar: "ادخل مساحة الصوت",
      en: "Enter the Soundroom",
    },
    stat: {
      value: "00",
      label: { ar: "ملفات صوتية منشورة", en: "published audio files" },
    },
  },
  {
    id: "city-voices",
    kind: "city",
    geometry: "city-portrait",
    assetId: "bm-11",
    href: "/programs/city-voices",
    copySide: "left",
    chapter: "04",
    kicker: {
      ar: "صوت المدينة · الواجهة المائية",
      en: "City Voices · The Waterfront",
    },
    title: {
      ar: "المدينة ليست مبانٍ... إنها أصوات.",
      en: "A city is not its buildings. It is its voices.",
    },
    lead: {
      ar: "حكايات الناس والمجتمع في الإمارات: نبدأ بالمكان، ثم نتتبع الإنسان — دون أن نصنع مقابلة لم تحدث.",
      en: "Stories of people and communities in the UAE: we begin with place, then follow the person — without inventing an interview that never happened.",
    },
    cta: {
      ar: "ادخل الواجهة المائية",
      en: "Enter the Waterfront",
    },
    stat: {
      value: "04",
      label: { ar: "عوالم مفاهيمية", en: "conceptual worlds" },
    },
  },
];

export function getHeroScene(id: string): HeroSceneRecord | undefined {
  return heroScenes.find((scene) => scene.id === id);
}

export function sceneCopy(
  scene: HeroSceneRecord,
  locale: Locale,
): {
  kicker: string;
  title: string;
  lead: string;
  cta: string;
  secondaryCta?: { label: string; href: string };
  stat?: { value: string; label: string };
} {
  return {
    kicker: scene.kicker[locale],
    title: scene.title[locale],
    lead: scene.lead[locale],
    cta: scene.cta[locale],
    secondaryCta: scene.secondaryCta
      ? { label: scene.secondaryCta.label[locale], href: scene.secondaryCta.href }
      : undefined,
    stat: scene.stat
      ? { value: scene.stat.value, label: scene.stat.label[locale] }
      : undefined,
  };
}
