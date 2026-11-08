import { requireProgram } from "./programs";
import type { LocalizedText, MediaWorldEntry, SecondaryWorldCard } from "./types";

const beyond = requireProgram("beyond-the-frame");
const legal = requireProgram("the-legal-lens");
const city = requireProgram("city-voices");
const sound = requireProgram("soundroom");

export const portalWorlds: MediaWorldEntry[] = [
  {
    id: "beyond-the-frame",
    programSlug: beyond.slug,
    href: "/programs/beyond-the-frame",
    assetId: "bm-12",
    kicker: beyond.worldName,
    title: beyond.title,
    teaser: beyond.tagline,
    status: beyond.status,
    category: beyond.category,
    variant: "wide",
    searchText: {
      ar: "خارج الإطار حوار مقابلات ضيف استوديو كراسي حوارات إنسانية",
      en: "beyond the frame conversation interview guest studio chairs human stories",
    },
  },
  {
    id: "the-legal-lens",
    programSlug: legal.slug,
    href: "/legal-lens",
    assetId: "bm-04",
    kicker: legal.worldName,
    title: legal.title,
    teaser: legal.tagline,
    status: legal.status,
    category: legal.category,
    variant: "tall",
    searchText: {
      ar: "من زاوية القانون قانون توعية مصادر تشريع ميزان مكتبة بحث",
      en: "legal lens law awareness sources legislation scales library research",
    },
  },
  {
    id: "city-voices",
    programSlug: city.slug,
    href: "/programs/city-voices",
    assetId: "bm-11",
    kicker: city.worldName,
    title: city.title,
    teaser: city.tagline,
    status: city.status,
    category: city.category,
    variant: "tall",
    searchText: {
      ar: "صوت المدينة شارقة الإمارات كورنيش وثائقي ميدان كاميرا مجتمع",
      en: "city voices sharjah uae waterfront documentary field camera community",
    },
  },
  {
    id: "soundroom",
    programSlug: sound.slug,
    href: "/soundroom",
    assetId: "bm-01",
    kicker: sound.worldName,
    title: sound.title,
    teaser: sound.tagline,
    status: sound.status,
    category: sound.category,
    variant: "wide",
    searchText: {
      ar: "مساحة صوت بودكاست موجات ذهبية سمعي حوارات مسموعة قراءة",
      en: "soundroom podcast waveform gold audio listening conversation reading",
    },
  },
];

export const secondaryWorlds: SecondaryWorldCard[] = [
  {
    id: "stories",
    href: "/stories",
    assetId: "bm-13",
    kicker: { ar: "أرشيف الذاكرة", en: "The Memory Room" },
    title: { ar: "القصص والوثائق", en: "Stories & Archive" },
    teaser: {
      ar: "أرشيف وثائقي قيد الإعداد؛ لا ننشر قصة قبل التحقق منها.",
      en: "A documentary archive in preparation; no story is published before verification.",
    },
  },
  {
    id: "studio",
    href: "/studio",
    assetId: "bm-09",
    kicker: { ar: "الطابق الإبداعي", en: "The Creative Floor" },
    title: { ar: "خلف الرؤية", en: "Behind the Vision" },
    teaser: {
      ar: "بحث، حوار، تحرير، ثم نشر — كيف تُصنع الحكاية.",
      en: "Research, conversation, editing, then publication — how a story is made.",
    },
  },
  {
    id: "about",
    href: "/about",
    assetId: "bm-02",
    kicker: { ar: "بين الحكاية والقانون", en: "Between Story and Law" },
    title: { ar: "عن بسمة", en: "About Basma" },
    teaser: {
      ar: "صوت إعلامي وعين بحثية، وحدود واضحة بين الحقيقة والتصور.",
      en: "A media voice and a research eye, with a clear line between fact and vision.",
    },
  },
  {
    id: "contact",
    href: "/contact",
    assetId: "bm-10",
    kicker: { ar: "الدعوة", en: "The Invitation" },
    title: { ar: "لنتعاون", en: "Collaborate" },
    teaser: {
      ar: "قناة واتساب حقيقية، بلا نماذج وهمية أو وعود آلية.",
      en: "A real WhatsApp channel, with no fake forms or automated promises.",
    },
  },
];

export function getPortalWorld(id: string): MediaWorldEntry | undefined {
  return portalWorlds.find((world) => world.id === id);
}

export function localizedTextSearchValue(text: LocalizedText): string {
  return `${text.ar} ${text.en}`;
}
