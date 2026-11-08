import { validateOfficialSources } from "@/lib/content/schemas";
import type { OfficialSourceRecord } from "@/lib/content/types";
import officialSourcesJson from "@/content/official-sources.json";

const validated = validateOfficialSources(officialSourcesJson);

const SOURCE_JURISDICTION: Record<string, string> = {
  "uae-legislation": "UAE-federal",
  sgmb: "Sharjah",
  "uae-open-data": "UAE-federal",
  "dubai-legal": "Dubai",
};

export const OFFICIAL_SOURCES: OfficialSourceRecord[] = validated.sources.map(
  (source) => ({
    ...source,
    jurisdiction: SOURCE_JURISDICTION[source.id] ?? undefined,
    name: { ar: source.name, en: source.name },
    localContext:
      source.localContext ??
      ({
        ar: "مصدر رسمي للإحالة، وليس واجهة برمجية مباشرة.",
        en: "Official source for reference — not a live API.",
      } as { ar: string; en: string }),
  })
);

export const JURISDICTION_LABELS: Record<string, { ar: string; en: string }> = {
  "UAE-federal": { ar: "الإمارات — تشريعات اتحادية", en: "UAE — federal legislation" },
  Sharjah: { ar: "الشارقة — مكتب الإعلام الحكومي", en: "Sharjah — Government Media Bureau" },
  Dubai: { ar: "دبي — الشؤون القانونية", en: "Dubai — Legal Affairs" },
};

export function getOfficialSource(id: string): OfficialSourceRecord {
  const source = OFFICIAL_SOURCES.find((item) => item.id === id);
  if (!source) throw new Error(`Unknown official source: ${id}`);
  return source;
}

export const SOURCE_REVIEWED_DATE = validated.reviewedDate;
