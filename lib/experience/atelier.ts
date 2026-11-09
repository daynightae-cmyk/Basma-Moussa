import type { LocalizedText } from "@/lib/content/types";

/**
 * The Story Atelier — a creative workspace, not a publishing system.
 *
 * Everything here is a concept composition assembled on the visitor's device.
 * Nothing is submitted, published or attributed to a real person; drafts are
 * stored locally and clearly labelled as local drafts.
 */

export type ThemeId =
  | "human"
  | "legal"
  | "documentary"
  | "cultural"
  | "interview"
  | "backstage";

export interface SceneBeat {
  id: string;
  title: LocalizedText;
  beat: LocalizedText;
}

export interface StoryTheme {
  id: ThemeId;
  label: LocalizedText;
  blurb: LocalizedText;
  beats: SceneBeat[];
}

export const STORY_THEMES: StoryTheme[] = [
  {
    id: "human",
    label: { ar: "حكاية إنسانية", en: "Human story" },
    blurb: {
      ar: "حياة واحدة تكشف مدينة كاملة.",
      en: "One life opening onto a whole city.",
    },
    beats: [
      {
        id: "human-1",
        title: { ar: "الوجه", en: "The face" },
        beat: { ar: "لقطة قريبة هادئة تُعرّفنا بالإنسان قبل الحكاية.", en: "A quiet close-up: the person before the story." },
      },
      {
        id: "human-2",
        title: { ar: "المكان", en: "The place" },
        beat: { ar: "مكانه اليومي، بضوء طبيعي وأصوات حقيقية.", en: "Their everyday place, natural light, real sound." },
      },
      {
        id: "human-3",
        title: { ar: "المنعطف", en: "The turn" },
        beat: { ar: "اللحظة التي تغيّر المسار، بلا مونتاج عاطفي.", en: "The moment that changes the path, without emotional editing." },
      },
      {
        id: "human-4",
        title: { ar: "الأثر", en: "The trace" },
        beat: { ar: "ما بقي بعد الحكاية، في صورة واحدة صامتة.", en: "What remains after the story, in one silent frame." },
      },
    ],
  },
  {
    id: "legal",
    label: { ar: "توعية قانونية", en: "Legal awareness" },
    blurb: {
      ar: "حقّ واضح، بلا وعود قضائية.",
      en: "A clear right, with no promises about outcomes.",
    },
    beats: [
      {
        id: "legal-1",
        title: { ar: "السؤال", en: "The question" },
        beat: { ar: "سؤال يومي يتكرر في المحاكم والمجالس.", en: "An everyday question repeated in courts and living rooms." },
      },
      {
        id: "legal-2",
        title: { ar: "النص", en: "The text" },
        beat: { ar: "المادة القانونية كما هي، مع مصدرها الرسمي.", en: "The provision as written, with its official source." },
      },
      {
        id: "legal-3",
        title: { ar: "القراءة", en: "The reading" },
        beat: { ar: "قراءة مبسّطة، وتنبيه صريح إلى حدودها.", en: "A plain reading, with an explicit note on its limits." },
      },
      {
        id: "legal-4",
        title: { ar: "الخطوة", en: "The step" },
        beat: { ar: "أين يسأل المشاهد، وما الذي لا يُغني عنه هذا المحتوى.", en: "Where to ask next, and what this piece cannot replace." },
      },
    ],
  },
  {
    id: "documentary",
    label: { ar: "رحلة وثائقية", en: "Documentary journey" },
    blurb: {
      ar: "طريق، ولقاءات، وضوء متغيّر.",
      en: "A road, encounters, and changing light.",
    },
    beats: [
      {
        id: "doc-1",
        title: { ar: "الانطلاق", en: "Departure" },
        beat: { ar: "إطار واسع يفتح الجغرافيا.", en: "A wide frame opening the geography." },
      },
      {
        id: "doc-2",
        title: { ar: "اللقاء", en: "The encounter" },
        beat: { ar: "صوت محلي يشرح المكان من الداخل.", en: "A local voice explaining the place from inside." },
      },
      {
        id: "doc-3",
        title: { ar: "التفصيل", en: "The detail" },
        beat: { ar: "يدان تعملان، أو أثر قديم على جدار.", en: "Working hands, or an old mark on a wall." },
      },
      {
        id: "doc-4",
        title: { ar: "العودة", en: "The return" },
        beat: { ar: "الطريق نفسه، في ضوء مختلف.", en: "The same road, in different light." },
      },
    ],
  },
  {
    id: "cultural",
    label: { ar: "حكاية ثقافية", en: "Cultural storytelling" },
    blurb: {
      ar: "ذاكرة تتوارثها الأيدي والأصوات.",
      en: "Memory carried by hands and voices.",
    },
    beats: [
      {
        id: "culture-1",
        title: { ar: "الرمز", en: "The motif" },
        beat: { ar: "نقش هندسي بسيط يقود المشهد.", en: "A simple geometric motif leading the frame." },
      },
      {
        id: "culture-2",
        title: { ar: "الحرفة", en: "The craft" },
        beat: { ar: "تفصيل مادي: خامة، أداة، إيقاع عمل.", en: "A material detail: texture, tool, working rhythm." },
      },
      {
        id: "culture-3",
        title: { ar: "الصوت", en: "The voice" },
        beat: { ar: "من يحفظ الحكاية يرويها بنفسه.", en: "The keeper of the story tells it in their own words." },
      },
      {
        id: "culture-4",
        title: { ar: "الامتداد", en: "The continuation" },
        beat: { ar: "كيف تصل الحكاية إلى جيل آخر.", en: "How the story reaches another generation." },
      },
    ],
  },
  {
    id: "interview",
    label: { ar: "فكرة حوار", en: "Interview concept" },
    blurb: {
      ar: "كرسيان، وسؤال واحد جيد.",
      en: "Two chairs and one good question.",
    },
    beats: [
      {
        id: "interview-1",
        title: { ar: "الافتتاح", en: "The open" },
        beat: { ar: "لقطة مشتركة تُثبّت العلاقة بين المتحدثين.", en: "A two-shot establishing the relationship." },
      },
      {
        id: "interview-2",
        title: { ar: "السؤال الأول", en: "First question" },
        beat: { ar: "سؤال مباشر، بلا مقدمة طويلة.", en: "A direct question, without a long preamble." },
      },
      {
        id: "interview-3",
        title: { ar: "الصمت", en: "The silence" },
        beat: { ar: "نترك الإجابة تتنفس قبل القطع.", en: "Let the answer breathe before the cut." },
      },
      {
        id: "interview-4",
        title: { ar: "الختام", en: "The close" },
        beat: { ar: "لقطة قريبة، وسؤال يبقى مع المشاهد.", en: "A close-up, and a question that stays with the viewer." },
      },
    ],
  },
  {
    id: "backstage",
    label: { ar: "خلف الكواليس", en: "Behind the scenes" },
    blurb: {
      ar: "كيف تُصنع الحلقة، لا كيف تبدو.",
      en: "How the piece is made, not how it looks.",
    },
    beats: [
      {
        id: "backstage-1",
        title: { ar: "التحضير", en: "Prep" },
        beat: { ar: "قائمة الأسئلة، والملاحظات على الطاولة.", en: "The question list, notes on the table." },
      },
      {
        id: "backstage-2",
        title: { ar: "الغرفة", en: "The room" },
        beat: { ar: "الاستوديو قبل الضوء: أسلاك، كراسي، صمت.", en: "The studio before the lights: cables, chairs, quiet." },
      },
      {
        id: "backstage-3",
        title: { ar: "اللحظة الفائتة", en: "The missed moment" },
        beat: { ar: "ما حدث بعد إيقاف التسجيل.", en: "What happened after recording stopped." },
      },
      {
        id: "backstage-4",
        title: { ar: "المونتاج", en: "The edit" },
        beat: { ar: "قرار واحد يغيّر معنى المشهد.", en: "One decision that changes the scene's meaning." },
      },
    ],
  },
];

export type AtmosphereId = "intimate" | "investigative" | "lyrical" | "ceremonial";

export interface Atmosphere {
  id: AtmosphereId;
  label: LocalizedText;
  note: LocalizedText;
  pace: "slow" | "measured" | "flowing" | "formal";
}

export const ATMOSPHERES: Atmosphere[] = [
  {
    id: "intimate",
    label: { ar: "حميمية", en: "Intimate" },
    note: { ar: "مسافة قريبة، همس، ضوء ناعم.", en: "Close distance, low voice, soft light." },
    pace: "slow",
  },
  {
    id: "investigative",
    label: { ar: "تحقيقية", en: "Investigative" },
    note: { ar: "إيقاع محسوب، تفاصيل تُثبت.", en: "Measured pace, details that prove." },
    pace: "measured",
  },
  {
    id: "lyrical",
    label: { ar: "شاعرية", en: "Lyrical" },
    note: { ar: "صور تتنفس، انتقالات ناعمة.", en: "Images that breathe, soft transitions." },
    pace: "flowing",
  },
  {
    id: "ceremonial",
    label: { ar: "احتفالية", en: "Ceremonial" },
    note: { ar: "وقار، إيقاع رسمي، حضور.", en: "Gravity, formal rhythm, presence." },
    pace: "formal",
  },
];

export type MoodId = "dawn" | "midnight" | "archive" | "gold";

export interface Mood {
  id: MoodId;
  label: LocalizedText;
  note: LocalizedText;
  from: string;
  to: string;
  ink: string;
}

export const MOODS: Mood[] = [
  {
    id: "dawn",
    label: { ar: "فجر", en: "Dawn" },
    note: { ar: "أزرق بارد يتحول إلى ذهبي.", en: "Cold blue turning gold." },
    from: "#12203a",
    to: "#3a2f2a",
    ink: "#f6e6cd",
  },
  {
    id: "midnight",
    label: { ar: "منتصف الليل", en: "Midnight" },
    note: { ar: "كحلي عميق، ضوء واحد.", en: "Deep navy, a single light." },
    from: "#070b18",
    to: "#182342",
    ink: "#dfe7ff",
  },
  {
    id: "archive",
    label: { ar: "أرشيف", en: "Archive" },
    note: { ar: "حبيبات، ورق، لون باهت.", en: "Grain, paper, faded tone." },
    from: "#1b1a17",
    to: "#2f2a22",
    ink: "#e8ddc8",
  },
  {
    id: "gold",
    label: { ar: "ذهبي", en: "Gold" },
    note: { ar: "شامبانيا دافئة، بريق هادئ.", en: "Warm champagne, quiet sheen." },
    from: "#241a12",
    to: "#3d2c18",
    ink: "#f7ecd6",
  },
];

export function atmosphereById(id: AtmosphereId): Atmosphere | undefined {
  return ATMOSPHERES.find((entry) => entry.id === id);
}

export function moodById(id: MoodId): Mood | undefined {
  return MOODS.find((entry) => entry.id === id);
}

export function themeById(id: ThemeId): StoryTheme | undefined {
  return STORY_THEMES.find((entry) => entry.id === id);
}

export const MAX_STORY_CARDS = 6;

/** Append a beat id, ignoring duplicates and unknown beats. */
export function addCard(sequence: string[], beatId: string, theme: StoryTheme): string[] {
  if (!theme.beats.some((beat) => beat.id === beatId)) return sequence;
  if (sequence.includes(beatId)) return sequence;
  if (sequence.length >= MAX_STORY_CARDS) return sequence;
  return [...sequence, beatId];
}

export function removeCard(sequence: string[], beatId: string): string[] {
  return sequence.filter((id) => id !== beatId);
}

/** Reorder within bounds; out-of-range moves leave the sequence untouched. */
export function moveCard(sequence: string[], from: number, to: number): string[] {
  if (from === to) return sequence;
  if (from < 0 || from >= sequence.length) return sequence;
  if (to < 0 || to >= sequence.length) return sequence;
  const next = [...sequence];
  const [moved] = next.splice(from, 1);
  next.splice(to, 0, moved);
  return next;
}

export interface AtelierSelection {
  themeId: ThemeId;
  atmosphereId: AtmosphereId;
  moodId: MoodId;
  cards: string[];
  note: string;
}

export interface StoryboardFrame {
  id: string;
  index: number;
  title: LocalizedText;
  beat: LocalizedText;
  mood: Mood;
  atmosphere: Atmosphere;
}

export function buildStoryboard(selection: AtelierSelection): StoryboardFrame[] {
  const theme = themeById(selection.themeId);
  const atmosphere = atmosphereById(selection.atmosphereId) ?? ATMOSPHERES[0];
  const mood = moodById(selection.moodId) ?? MOODS[0];
  if (!theme) return [];
  return selection.cards
    .map((cardId, index) => {
      const beat = theme.beats.find((entry) => entry.id === cardId);
      if (!beat) return null;
      return {
        id: beat.id,
        index: index + 1,
        title: beat.title,
        beat: beat.beat,
        mood,
        atmosphere,
      };
    })
    .filter((frame): frame is StoryboardFrame => frame !== null);
}

export const ATELIER_DRAFT_KEY = "bm-atelier-draft-v1";

export interface AtelierDraft extends AtelierSelection {
  version: 1;
  savedAt: string;
}

export function createDraft(selection: AtelierSelection, savedAt = new Date()): AtelierDraft {
  return { version: 1, savedAt: savedAt.toISOString(), ...selection };
}

const THEME_IDS = STORY_THEMES.map((theme) => theme.id);
const ATMOSPHERE_IDS = ATMOSPHERES.map((entry) => entry.id);
const MOOD_IDS = MOODS.map((entry) => entry.id);

/** Defensive parse: an edited or stale localStorage value must never crash a page. */
export function parseDraft(raw: string | null): AtelierDraft | null {
  if (!raw) return null;
  let value: unknown;
  try {
    value = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof value !== "object" || value === null) return null;
  const candidate = value as Partial<AtelierDraft>;
  if (candidate.version !== 1) return null;
  if (!THEME_IDS.includes(candidate.themeId as ThemeId)) return null;
  if (!ATMOSPHERE_IDS.includes(candidate.atmosphereId as AtmosphereId)) return null;
  if (!MOOD_IDS.includes(candidate.moodId as MoodId)) return null;
  if (!Array.isArray(candidate.cards)) return null;
  const theme = themeById(candidate.themeId as ThemeId);
  const cards = candidate.cards
    .filter((id): id is string => typeof id === "string")
    .filter((id) => Boolean(theme?.beats.some((beat) => beat.id === id)))
    .slice(0, MAX_STORY_CARDS);
  return {
    version: 1,
    savedAt: typeof candidate.savedAt === "string" ? candidate.savedAt : new Date(0).toISOString(),
    themeId: candidate.themeId as ThemeId,
    atmosphereId: candidate.atmosphereId as AtmosphereId,
    moodId: candidate.moodId as MoodId,
    cards,
    note: typeof candidate.note === "string" ? candidate.note.slice(0, 600) : "",
  };
}
