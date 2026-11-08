import { getProgram } from "@/lib/content/programs";
import type { WorldCardRecord } from "@/lib/content/types";

/**
 * Registry of media-universe portals. Every href is locale-free (without /ar or /en)
 * and is prefixed by pages at render time via localizedPath().
 */
export const PORTAL_WORLDS: WorldCardRecord[] = [
  {
    id: "beyond-the-frame",
    href: "/programs/beyond-the-frame",
    assetId: getProgram("beyond-the-frame").heroAssetId,
    programSlug: "beyond-the-frame",
    kicker: { ar: "غرفة الحوار", en: "The Conversation Chamber" },
    title: getProgram("beyond-the-frame").title,
    teaser: getProgram("beyond-the-frame").description,
    status: "concept",
    variant: "wide",
    category: "conversation",
  },
  {
    id: "the-legal-lens",
    href: "/legal-lens",
    assetId: "bm-04",
    kicker: { ar: "معرض البحث", en: "The Research Gallery" },
    title: getProgram("the-legal-lens").title,
    teaser: getProgram("the-legal-lens").description,
    status: "concept",
    variant: "tall",
    category: "legal",
  },
  {
    id: "city-voices",
    href: "/programs/city-voices",
    assetId: getProgram("city-voices").heroAssetId,
    programSlug: "city-voices",
    kicker: { ar: "الواجهة المائية", en: "The Waterfront" },
    title: getProgram("city-voices").title,
    teaser: getProgram("city-voices").description,
    status: "concept",
    variant: "tall",
    category: "documentary",
  },
  {
    id: "soundroom",
    href: "/soundroom",
    assetId: "bm-01",
    kicker: { ar: "التردد الذهبي", en: "The Golden Frequency" },
    title: getProgram("soundroom").title,
    teaser: getProgram("soundroom").description,
    status: "concept",
    variant: "wide",
    category: "audio",
  },
];

export const SECONDARY_WORLDS: WorldCardRecord[] = [
  {
    id: "stories",
    href: "/stories",
    assetId: "bm-13",
    kicker: { ar: "أرشيف الذاكرة", en: "Memory Room" },
    title: { ar: "القصص والتوثيق", en: "Stories & Documentary Archive" },
    teaser: {
      ar: "أرشيف قيد الإعداد للقصص الموثقة والمواد البحثية.",
      en: "An archive being assembled: documented stories and research materials.",
    },
    status: "concept",
    variant: "editorial",
  },
  {
    id: "studio",
    href: "/studio",
    assetId: "bm-09",
    kicker: { ar: "خلف الرؤية", en: "Behind the Vision" },
    title: { ar: "الاستوديو والمكتبة", en: "Studio & Media Library" },
    teaser: {
      ar: "نظرة في عملية الإنتاج: بحث، حوار، تحرير، نشر.",
      en: "A look at the production process: research, conversation, edit, publish.",
    },
    status: "concept",
    variant: "editorial",
  },
  {
    id: "about",
    href: "/about",
    assetId: "bm-02",
    kicker: { ar: "عن بسمة", en: "About Basma" },
    title: { ar: "عن بسمة موسى", en: "About Basma Moussa" },
    teaser: {
      ar: "صوت إعلامي وبحث قانوني، مقيم في الإمارات.",
      en: "A media voice and legal research perspective, based in the UAE.",
    },
    status: "concept",
    variant: "editorial",
  },
  {
    id: "contact",
    href: "/contact",
    assetId: "bm-10",
    kicker: { ar: "تواصل للتعاون", en: "Collaboration" },
    title: { ar: "لنصنع الحكاية القادمة", en: "Let's Create the Next Story" },
    teaser: {
      ar: "للتعاون الإعلامي، الحوارات، والبحث التحريري.",
      en: "Media collaboration, conversations, editorial research.",
    },
    status: "concept",
    variant: "editorial",
  },
];

export const ALL_WORLDS = [...PORTAL_WORLDS, ...SECONDARY_WORLDS];

export function getWorld(id: string): WorldCardRecord {
  const world = ALL_WORLDS.find((item) => item.id === id);
  if (!world) throw new Error(`Unknown world: ${id}`);
  return world;
}

export function navWorlds(): WorldCardRecord[] {
  return PORTAL_WORLDS;
}

export function statusVariantClass(status: WorldCardRecord["status"]): string {
  switch (status) {
    case "published":
      return "status--published";
    default:
      return "status--concept";
  }
}
