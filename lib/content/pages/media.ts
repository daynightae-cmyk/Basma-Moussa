import type { LocalizedPair } from "../types";

const ar = {
  hero: {
    eyebrow: "عالم الإعلام",
    title: "خريطة عوالم، لا قائمة برامج.",
    lead: "أربعة عوالم مفاهيمية، لكل منها باب ولغة بصرية خاصة. ابحث أو صفِّ حسب النوع — ثم افتح الباب.",
    note: "لا حلقات منشورة. كل بطاقة تحمل حالتها الحقيقية.",
  },
  catalog: {
    eyebrow: "الفهرس",
    title: "اختر عالمك.",
    lead: "ابحث بالعنوان أو الموضوع، وصفِّ العوالم حسب النوع. كل نتيجة رابط حقيقي يمكن مشاركته والعودة منه.",
  },
  secondary: {
    eyebrow: "مسارات أعمق",
    title: "أكثر من بوابة.",
    lead: "أرشيف، استوديو، حكاية شخصية، ودعوة للتعاون — طرق أخرى إلى العالم نفسه.",
  },
  statusNote:
    "كل العوالم هنا مفاهيم قيد التطوير. لا نعرض حلقات أو ضيوفًا أو أرقام مشاهدة لم تُقس فعليًا.",
} as const;

const en: LocalizedPair<typeof ar>["en"] = {
  hero: {
    eyebrow: "Media Universe",
    title: "A map of worlds, not a list of shows.",
    lead: "Four conceptual worlds, each with its own door and visual language. Search or filter by kind — then open the door.",
    note: "No published episodes. Every card carries its true status.",
  },
  catalog: {
    eyebrow: "The index",
    title: "Choose your world.",
    lead: "Search by title or theme, and filter the worlds by kind. Every result is a real, shareable link you can return from.",
  },
  secondary: {
    eyebrow: "Deeper paths",
    title: "More than a gateway.",
    lead: "An archive, a studio, a personal story and an invitation to collaborate — other ways into the same world.",
  },
  statusNote:
    "Every world here is a concept in development. We show no episodes, guests, or viewer numbers that were not actually measured.",
};

export const mediaPageContent: LocalizedPair<typeof ar> = { ar, en };
