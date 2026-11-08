import rawSources from "@/content/official-sources.json";
import { officialSourcesFileSchema } from "./schemas";
import type { LocalizedText, OfficialSource } from "./types";

type SourceMeta = {
  publisher: LocalizedText;
  description: LocalizedText;
  jurisdiction: OfficialSource["jurisdiction"];
};

const SOURCE_META: Record<string, SourceMeta> = {
  "uae-legislation": {
    publisher: {
      ar: "بوابة التشريعات الإماراتية",
      en: "UAE Legislation",
    },
    description: {
      ar: "نقطة بداية رسمية للقوانين واللوائح الاتحادية. استخدم للوصول إلى النص الرسمي، لا لإعادة نشر محتواه.",
      en: "An official starting point for UAE federal laws and regulations. Use it to reach official texts, not to republish their content.",
    },
    jurisdiction: "UAE-federal",
  },
  sgmb: {
    publisher: {
      ar: "المكتب الإعلامي لحكومة الشارقة",
      en: "Sharjah Government Media Bureau",
    },
    description: {
      ar: "مصدر رسمي للأخبار والتحديثات الحكومية في الشارقة؛ يُذكر الناشر عند الاقتباس.",
      en: "An official source for Sharjah government news and updates; credit the publisher when referencing it.",
    },
    jurisdiction: "Sharjah",
  },
  "uae-open-data": {
    publisher: {
      ar: "البيانات الحكومية المفتوحة — الإمارات",
      en: "UAE Open Government Data",
    },
    description: {
      ar: "مدخل رسمي للبيانات والإحصاءات العامة. أي عرض بيانات لاحق يتطلب التحقق من الترخيص وتاريخ التحديث.",
      en: "An official entry point to public data and statistics. Any later data visualisation requires verified licensing and refresh dates.",
    },
    jurisdiction: "UAE-federal",
  },
  "dubai-legal": {
    publisher: {
      ar: "الشؤون القانونية — دبي",
      en: "Dubai Legal Affairs",
    },
    description: {
      ar: "مدخل رسمي إلى الموارد القانونية في دبي والجريدة الرسمية، مع تمييز قانون الإمارة عن القانون الاتحادي.",
      en: "An official entry point to Dubai legal resources and the official gazette, distinguished from UAE federal law.",
    },
    jurisdiction: "Dubai",
  },
};

const parsed = officialSourcesFileSchema.parse(rawSources);

export const officialSources: OfficialSource[] = parsed.sources.map((source) => {
  const meta = SOURCE_META[source.id];
  if (!meta) throw new Error(`Missing source metadata for ${source.id}`);
  return {
    ...source,
    publisher: meta.publisher,
    description: meta.description,
    jurisdiction: meta.jurisdiction,
    retrievedAt: parsed.reviewedDate,
    licenseReviewed: false,
  };
});

const sourceIndex = new Map(officialSources.map((source) => [source.id, source]));

export function getSource(id: string): OfficialSource {
  const source = sourceIndex.get(id);
  if (!source) throw new Error(`Unknown official source: ${id}`);
  return source;
}
