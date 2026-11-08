import { validatePrograms, type ProgramRecordBase } from "@/lib/content/schemas";
import programsJson from "@/content/programs.json";

const validated = validatePrograms(programsJson);
const base: ProgramRecordBase[] = validated.programs;

import type { LocalizedText } from "@/lib/content/types";

export interface ProgramWorld {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  status: ProgramRecordBase["status"];
  episodeIds: string[];
  heroAssetId: string;
  category: string;
  tagline: LocalizedText;
  worldName: LocalizedText;
  atmosphere: LocalizedText;
  formats: LocalizedText[];
  approach: LocalizedText[];
  statusNote: LocalizedText;
  worldHref: string;
  secondaryAssetId?: string;
  quote?: LocalizedText;
}

const programContent: Record<string, Omit<ProgramWorld, keyof ProgramRecordBase>> =
  {
    "beyond-the-frame": {
      category: "conversation",
      tagline: {
        ar: "حوارات تترك أثرًا، لا مجرد ضجيج.",
        en: "Conversations that leave a mark, not noise.",
      },
      worldName: {
        ar: "غرفة الحوار",
        en: "The Conversation Chamber",
      },
      atmosphere: {
        ar: "كريسيان حوار، إضاءة دافئة، وصوت يُصغي إليه.",
        en: "Twin-chair chamber, warm light, a voice worth hearing.",
      },
      formats: [
        {
          ar: "حوارات إنسانية طويلة",
          en: "Long-form human-interest conversations",
        },
        {
          ar: "قصص خلف العناوين",
          en: "Stories behind the headlines",
        },
        {
          ar: "حوار مع الشخص، لا مع ضيف",
          en: "Conversations with people, not interviewees",
        },
      ],
      approach: [
        {
          ar: "لا عدد حلقات مزعوم، ولا تواريخ بث وهمية.",
          en: "No invented episode counts, no fake air dates.",
        },
        {
          ar: "الضيف true-share فقط عند الموافقة",
          en: "Guests appear only with their explicit consent",
        },
        {
          ar: "حلقات واقعية فقط، تُنشر عند توفرها",
          en: "Real episodes only, published when they exist",
        },
      ],
      statusNote: {
        ar: "مفهوم宣传 — لم يُحدد أي ضيف بعد، ولا حلقة منشورة.",
        en: "Program concept in development — no guests scheduled, no episodes published.",
      },
      worldHref: "/programs/beyond-the-frame",
      secondaryAssetId: undefined,
      quote: {
        ar: "الصوت الحقيقي لا يحتاج إلى حلقات مُعلنة ليُصدّق.",
        en: "A real voice does not need announced episodes to be credible.",
      },
    },
    "the-legal-lens": {
      category: "legal",
      tagline: {
        ar: "القانون أوضح عندما نقرأه معًا.",
        en: "Law is clearer when we read it together.",
      },
      worldName: {
        ar: "معرض البحث",
        en: "The Research Gallery",
      },
      atmosphere: {
        ar: "مكاتب قانونية، كتب، ميزان، ومصادر أولية.",
        en: "Legal desks, books, scales of justice, primary sources.",
      },
      formats: [
        {
          ar: "مقالات توعوية بلغة بسيطة",
          en: "Plain-language legal-awareness explainers",
        },
        {
          ar: "مراجع مصادر قانونية رسمية",
          en: "Referenced official legal sources",
        },
        {
          ar: "إخلاء مسؤولية في كل مقال",
          en: "Educational disclaimer in every explainer",
        },
      ],
      approach: [
        {
          ar: "لا فتاوى فردية، ولا ادعاء تمثيل قانوني.",
          en: "No individual fatwas, no claim of legal representation.",
        },
        {
          ar: "مصادر رسمية وتُشير إلى تاريخ النفوذ",
          en: "Official sources with effective dates cited",
        },
        {
          ar: "مراجعة قبل النشر",
          en: "Reviewed before publication",
        },
      ],
      statusNote: {
        ar: "محتوى تحريري مخطط — غير منشور حتى الآن.",
        en: "Editorial outlines planned — not published yet.",
      },
      worldHref: "/legal-lens",
      secondaryAssetId: "bm-03",
      quote: {
        ar: "المصدر قبل الحكم، والمصدر قبل الخبر.",
        en: "Source before verdict, source before story.",
      },
    },
    "city-voices": {
      category: "documentary",
      tagline: {
        ar: "المدينة ليست مبانيًا... إنها أصوات.",
        en: "A city is not its buildings. It is its voices.",
      },
      worldName: {
        ar: "الواجهة المائية",
        en: "The Waterfront",
      },
      atmosphere: {
        ar: "الشارقة عند الغروب، كاميرا ميدانية، وحكاية تنتظر.",
        en: "Sharjah at sunset, field camera, a story waiting.",
      },
      formats: [
        {
          ar: "قصص مجتمع قصيرة",
          en: "Short community documentaries",
        },
        {
          ar: "ملاحظات ميدانية موثقة",
          en: "Documented field notes",
        },
        {
          ar: "أصوات المكان، لا تمثيل",
          en: "Voices of place, no acting",
        },
      ],
      approach: [
        {
          ar: "لا مقابلات مخترعة، ولا ادعاء لقاءات جرت.",
          en: "No invented interviews, no claim meetings occurred.",
        },
        {
          ar: "موافقة واضحة على الظهور",
          en: "Clear consent for identifiable participants",
        },
        {
          ar: "صورة المكان توضيحية للهوية",
          en: "Location imagery is illustrative branding",
        },
      ],
      statusNote: {
        ar: "مفهوم في مرحلة الإعداد، لا مواد مصورة منشورة.",
        en: "Concept in preparation, no filmed material published.",
      },
      worldHref: "/programs/city-voices",
      secondaryAssetId: undefined,
      quote: {
        ar: "تُحكى المدينة بصوت أهلها، أو لا تُحكى.",
        en: "A city is told by its people's voices — or not at all.",
      },
    },
    soundroom: {
      category: "audio",
      tagline: {
        ar: "استمع للطبقات التي لا تظهر في الصورة.",
        en: "Listen for the layers you cannot see.",
      },
      worldName: {
        ar: "التردد الذهبي",
        en: "The Golden Frequency",
      },
      atmosphere: {
        ar: "ميكروفون، موجة صوتية، ومساحة صوتية ذهبية.",
        en: "Microphone, soundwave, golden audio atmosphere.",
      },
      formats: [
        {
          ar: "مقالات صوتية",
          en: "Audio essays",
        },
        {
          ar: "حوارات مسجلة",
          en: "Recorded conversations",
        },
        {
          ar: "قراءات تحريرية",
          en: "Editorial readings",
        },
      ],
      approach: [
        {
          ar: "لا صوت يُشغل تلقائيًا، ولا حلقات وهمية.",
          en: "No autoplay, no invented episodes.",
        },
        {
          ar: "تشغيل حقيقي فقط عند توفر مصدر",
          en: "Real playback only when an approved source exists",
        },
        {
          ar: "حالة غياب واضحة وصادقة",
          en: "Honest absent-media state",
        },
      ],
      statusNote: {
        ar: "مساحة صوتية قيد التطوير، لا تسجيلات منشورة.",
        en: "Audio space in development, no recordings published.",
      },
      worldHref: "/soundroom",
      secondaryAssetId: undefined,
      quote: {
        ar: "الصوت يصنع الصورة قبل أن تراها.",
        en: "Sound creates the image before you see it.",
      },
    },
  };

export const PROGRAMS: ProgramWorld[] = base.map((record) => {
  const extended = programContent[record.slug];
  if (!extended) {
    throw new Error(`Missing extended world content for program: ${record.slug}`);
  }
  return { ...record, ...extended };
});

export function getProgram(slug: string): ProgramWorld {
  const program = PROGRAMS.find((item) => item.slug === slug);
  if (!program) throw new Error(`Unknown program: ${slug}`);
  return program;
}

export const programIds: string[] = PROGRAMS.map((item) => item.slug);

export const categoryLabels: Record<string, LocalizedText> = {
  conversation: { ar: "حوارات", en: "Conversations" },
  legal: { ar: "قانون", en: "Legal" },
  documentary: { ar: "توثيق", en: "Documentary" },
  audio: { ar: "صوت", en: "Audio" },
};

// Honesty invariant checks run at import time.
export function assertProgramHonesty(): void {
  for (const program of PROGRAMS) {
    if (program.episodeIds.length > 0 && program.status !== "published") {
      throw new Error(`Program ${program.slug} lists episodes but is not published`);
    }
  }
}
assertProgramHonesty();
