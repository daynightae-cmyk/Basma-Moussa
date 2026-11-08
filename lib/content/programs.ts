import rawPrograms from "@/content/programs.json";
import { programsFileSchema } from "./schemas";
import type {
  LocalizedText,
  ProgramCategory,
  ProgramWorld,
} from "./types";

type WorldDetail = Omit<ProgramWorld, keyof (typeof rawPrograms.programs)[number]> & {
  category: ProgramCategory;
  worldName: LocalizedText;
  tagline: LocalizedText;
  atmosphere: LocalizedText;
  introduction: LocalizedText;
  formats: { title: LocalizedText; body: LocalizedText }[];
  gates: LocalizedText[];
  statusNote: LocalizedText;
  quote: LocalizedText;
  experienceHref: string;
  experienceLabel: LocalizedText;
  secondaryAssetId: string;
};

const WORLD_DETAILS: Record<string, WorldDetail> = {
  "beyond-the-frame": {
    category: "conversation",
    worldName: {
      ar: "غرفة الحوار",
      en: "The Conversation Chamber",
    },
    tagline: {
      ar: "حوارات تترك أثرًا، لا مجرد ضجيج.",
      en: "Conversations that leave a mark, not noise.",
    },
    atmosphere: {
      ar: "ضوء دافئ، كرسيّان، ومساحة للصمت الذي يسبق السؤال الصادق.",
      en: "Warm light, two chairs, and room for the silence before an honest question.",
    },
    introduction: {
      ar: "«خارج الإطار» مفهوم لحوارات طويلة النفَس مع الناس الذين يصنعون المعنى: باحثون، فنانون، عاملون في المدن، ووجوه لا تظهر عادة في العناوين. لن نستعجل الإجابة، ولن نستبدل الحكاية بعنوان جاذب. تبدأ الحلقة بسؤال، وتنتهي عادة بسؤال أصدق.",
      en: "Beyond the Frame is a concept for unhurried conversations with the people who make meaning: researchers, artists, city workers, and faces rarely seen in headlines. We will not rush the answer or trade a story for a catchy title. An episode begins with a question and usually ends with a truer one.",
    },
    formats: [
      {
        title: { ar: "حوار مطوّل", en: "Long-form conversation" },
        body: {
          ar: "ضيف واحد، حوار ممتد، وتحرير يحترم سياق الكلام.",
          en: "One guest, an extended exchange, and editing that respects the context of every answer.",
        },
      },
      {
        title: { ar: "حديث مصوّر", en: "Cinematic field talk" },
        body: {
          ar: "لقاء قصير في مكان له معنى، بعيدًا عن الاستوديو التقليدي.",
          en: "A short encounter in a place that matters, away from the conventional studio.",
        },
      },
      {
        title: { ar: "دفتر الحوار", en: "Conversation notes" },
        body: {
          ar: "نص مصاحب يلتقط ما لم تلتقطه الكاميرا: الهوامش والأسئلة المؤجلة.",
          en: "An accompanying text that keeps what the camera missed: margins and deferred questions.",
        },
      },
    ],
    gates: [
      {
        ar: "موافقة الضيف على النشر وصياغة السيرة.",
        en: "Guest consent for publication and wording of their biography.",
      },
      {
        ar: "تسجيل فعلي، وتفريغ نصي، ومراجعة تحريرية قبل وسم أي حلقة بالمنشورة.",
        en: "An actual recording, transcript, and editorial review before any episode is marked published.",
      },
      {
        ar: "شفافية بشأن أي مادة تصويرية توضيحية.",
        en: "Clear labelling of any illustrative visual material.",
      },
    ],
    statusNote: {
      ar: "المفهوم محدد، لكن لا يوجد ضيوف أو حلقات منشورة. الاستوديو في الصورة تصوّر توضيحي، وليس مكانًا مملوكًا.",
      en: "The concept is defined, but there are no guests or published episodes. The studio image is illustrative and not an owned venue.",
    },
    quote: {
      ar: "الإنصات ليس فراغًا في الحوار؛ إنه الجزء الذي يمنحه معناه.",
      en: "Listening is not empty space in a conversation; it is the part that gives it meaning.",
    },
    experienceHref: "/contact",
    experienceLabel: {
      ar: "اقترح فكرة أو ضيفًا",
      en: "Suggest a guest or an idea",
    },
    secondaryAssetId: "bm-09",
  },
  "the-legal-lens": {
    category: "legal",
    worldName: {
      ar: "معرض البحث",
      en: "The Research Gallery",
    },
    tagline: {
      ar: "القانون أوضح عندما نقرأه معًا.",
      en: "Law is clearer when we read it together.",
    },
    atmosphere: {
      ar: "مكتبة هادئة، ضوء ذهبي على المصادر، وحدود واضحة بين الشرح والاستشارة.",
      en: "A quiet library, gold light on sources, and a clear line between explanation and advice.",
    },
    introduction: {
      ar: "«من زاوية القانون» مساحة للتوعية القانونية بلغة إنسانية: نبدأ من المصدر الرسمي، نحدد الاختصاص وتاريخ القراءة، ثم نشرح الفكرة بلا وعود يقينية. ليست منصة استشارات فردية، وليست بديلًا عن محامٍ مرخّص في الاختصاص المعني.",
      en: "The Legal Lens is a space for legal awareness in human language: start from the official source, name the jurisdiction and reading date, then explain without absolute promises. It is not an individual legal-advice service and not a substitute for a licensed lawyer in the relevant jurisdiction.",
    },
    formats: [
      {
        title: { ar: "قراءة قانونية مبسطة", en: "Accessible legal reading" },
        body: {
          ar: "شرح تحريري لفكرة قانونية، مع رابط المصدر وتاريخ المراجعة.",
          en: "An editorial explanation of a legal idea, with a source link and review date.",
        },
      },
      {
        title: { ar: "بطاقة مصدر", en: "Source card" },
        body: {
          ar: "بطاقة مختصرة للبوابات الرسمية، بلا ادعاء واجهة بيانات مباشرة.",
          en: "A concise card for official entry points, with no claim of a live data feed.",
        },
      },
      {
        title: { ar: "قاموس المصطلح", en: "Term glossary" },
        body: {
          ar: "تعريفات لغوية دقيقة تساعد القارئ غير المتخصص.",
          en: "Precise definitions that help a non-specialist reader.",
        },
      },
    ],
    gates: [
      {
        ar: "مصدر رسمي محدد، واختصاص واضح، وتاريخ قراءة ظاهر.",
        en: "A named official source, a clear jurisdiction, and a visible reading date.",
      },
      {
        ar: "مراجعة بشرية للمادة قبل اعتمادها منشورة.",
        en: "Human review before any explainer is approved as published.",
      },
      {
        ar: "تنبيه تعليمي ثابت يوضح أن المحتوى ليس استشارة قانونية فردية.",
        en: "A standing educational notice that content is not individual legal advice.",
      },
    ],
    statusNote: {
      ar: "المكتبة تعرض حاليًا بوابات رسمية فقط. المقالات التفسيرية مخططات تحريرية لم تُنشر بعد.",
      en: "The library currently lists official entry points only. Explainer articles remain unpublished editorial outlines.",
    },
    quote: {
      ar: "الوضوح ليس تبسيطًا مخلًّا؛ إنه احترام لقارئ يريد أن يفهم.",
      en: "Clarity is not oversimplification; it is respect for a reader who wants to understand.",
    },
    experienceHref: "/legal-lens",
    experienceLabel: {
      ar: "ادخل مكتبة القانون",
      en: "Enter the Legal Lens library",
    },
    secondaryAssetId: "bm-03",
  },
  "city-voices": {
    category: "documentary",
    worldName: {
      ar: "الواجهة المائية",
      en: "The Waterfront",
    },
    tagline: {
      ar: "المدينة ليست مبانٍ... إنها أصوات.",
      en: "A city is not its buildings. It is its voices.",
    },
    atmosphere: {
      ar: "غروب على كورنيش الشارقة، كاميرا على الكتف، وحكايات تُروى في مكانها.",
      en: "Sunset on the Sharjah waterfront, a camera on the shoulder, and stories told in place.",
    },
    introduction: {
      ar: "«صوت المدينة» مفهوم وثائقي قصير عن الحياة اليومية في الإمارات: أصوات الباعة، الباحثين، الطلاب، والجيران. نبدأ بالمكان، لكننا نتبع الإنسان. لن نصنع مقابلات لم تحدث، ولن نضع كاميرا في حياة أحد دون موافقة واضحة.",
      en: "City Voices is a short-documentary concept about everyday life in the UAE: the voices of shopkeepers, researchers, students, and neighbours. We begin with place, but follow the person. We will not invent interviews, and we will not place a camera in someone's life without clear consent.",
    },
    formats: [
      {
        title: { ar: "وثائقي قصير", en: "Short documentary" },
        body: {
          ar: "قصة واحدة، مكان واحد، وإيقاع يترك للصورة وقتها.",
          en: "One story, one place, and a pace that gives the image time to breathe.",
        },
      },
      {
        title: { ar: "دفتر ميداني", en: "Field notes" },
        body: {
          ar: "ملاحظات مكتوبة عن المكان، الناس، وتفاصيل لا تدخل في المونتاج.",
          en: "Written notes about the place, the people, and details that never reach the edit.",
        },
      },
      {
        title: { ar: "بورتريه مجتمعي", en: "Community portrait" },
        body: {
          ar: "لقاء هادئ مع شخص واحد يعكس حياة جمع من الناس.",
          en: "A quiet portrait of one person that reflects the life of many.",
        },
      },
    ],
    gates: [
      {
        ar: "موافقة صريحة من كل شخص يظهر أو يُسمع.",
        en: "Explicit consent from every person seen or heard.",
      },
      {
        ar: "تحقق من أسماء الأماكن والتفاصيل قبل النشر.",
        en: "Place names and details verified before publication.",
      },
      {
        ar: "عدم تقديم أي مشهد تصوري كتغطية ميدانية حقيقية.",
        en: "No illustrative scene presented as real field reporting.",
      },
    ],
    statusNote: {
      ar: "صورة الكورنيش تصوّر توضيحي. لا توجد مقابلات ميدانية منشورة أو موافقات مكتملة بعد.",
      en: "The waterfront image is illustrative. No field interviews or completed consents exist yet.",
    },
    quote: {
      ar: "كل واجهة بحر تحمل خلفها مئات الحكايات التي لم تُروَ بعد.",
      en: "Every waterfront holds hundreds of stories that have not been told yet.",
    },
    experienceHref: "/contact",
    experienceLabel: {
      ar: "شاركنا حكاية من مدينتك",
      en: "Share a story from your city",
    },
    secondaryAssetId: "bm-13",
  },
  soundroom: {
    category: "audio",
    worldName: {
      ar: "التردد الذهبي",
      en: "The Golden Frequency",
    },
    tagline: {
      ar: "استمع للطبقات التي لا تظهر في الصورة.",
      en: "Listen for the layers you cannot see.",
    },
    atmosphere: {
      ar: "موجة ذهبية في غرفة مظلمة، وصوت منخفض يحمل معنى كبيرًا.",
      en: "A gold waveform in a dark room, and a quiet voice carrying a large meaning.",
    },
    introduction: {
      ar: "«مساحة صوت» مفهوم للإنتاج الصوتي: مقالات مسموعة، حوارات، وقراءات. نؤمن أن الصوت يمنح الحكاية طبقة أخرى من القرب. وحتى تجهز أول مادة صوتية معتمدة، ستظل هذه المساحة شفافة: موجة زخرفية، لا مشغل وهمي.",
      en: "The Soundroom is an audio-production concept: audio essays, conversations, and readings. We believe sound gives a story another layer of closeness. Until the first approved audio piece exists, this space stays transparent: a decorative waveform, not a pretend player.",
    },
    formats: [
      {
        title: { ar: "مقال صوتي", en: "Audio essay" },
        body: {
          ar: "نص مكتوب للصوت، بإيقاع هادئ وموسيقى مصرّح بها فقط.",
          en: "Writing made for the ear, with a calm pace and only rights-cleared music.",
        },
      },
      {
        title: { ar: "حوار مسموع", en: "Audio conversation" },
        body: {
          ar: "حوار كامل أو مقتطفات مع تفريغ نصي ونقل دقيق للمعنى.",
          en: "A full conversation or excerpts, with a transcript and faithful meaning.",
        },
      },
      {
        title: { ar: "قراءة أدبية", en: "Literary reading" },
        body: {
          ar: "قراءة لمادة أدبية قصيرة، مع احترام حقوق النص.",
          en: "A reading of a short literary piece, with text rights respected.",
        },
      },
    ],
    gates: [
      {
        ar: "ملف صوتي حقيقي ومصرّح باستخدامه.",
        en: "An actual, rights-cleared audio file.",
      },
      {
        ar: "مدة مقاسة فعليًا، وتفريغ نصي، ووصف واضح.",
        en: "An actually measured duration, a transcript, and a clear description.",
      },
      {
        ar: "مشغل يعمل بلوحة المفاتيح، ولا يبدأ تلقائيًا بصوت مسموع.",
        en: "A keyboard-accessible player that never autoplays audible sound.",
      },
    ],
    statusNote: {
      ar: "لا يوجد ملف صوتي منشور. المشغل الحقيقي يظهر فقط عندما تتوفر مادة صوتية مصرّح بها.",
      en: "No audio file is published. A real player appears only when approved audio exists.",
    },
    quote: {
      ar: "الصوت لا يشرح الصورة؛ يفتح فيها بابًا آخر.",
      en: "Sound does not explain the image; it opens another door inside it.",
    },
    experienceHref: "/soundroom",
    experienceLabel: {
      ar: "ادخل مساحة الصوت",
      en: "Enter the Soundroom",
    },
    secondaryAssetId: "bm-01",
  },
};

const parsed = programsFileSchema.parse(rawPrograms);

export const programs: ProgramWorld[] = parsed.programs.map((program) => {
  const detail = WORLD_DETAILS[program.slug];
  if (!detail) {
    throw new Error(`Missing world content for program: ${program.slug}`);
  }
  return { ...program, ...detail };
});

const programIndex = new Map(programs.map((program) => [program.slug, program]));

export function getProgram(slug: string): ProgramWorld | undefined {
  return programIndex.get(slug);
}

export function requireProgram(slug: string): ProgramWorld {
  const program = getProgram(slug);
  if (!program) throw new Error(`Unknown program: ${slug}`);
  return program;
}

export const programSlugs = programs.map((program) => program.slug);
