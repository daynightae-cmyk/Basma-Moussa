export const HOME_CONTENT: Record<"ar" | "en", {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  statusLine: string;
  heroCaption: string;
  introEyebrow: string;
  introTitle: string;
  introBody: string;
  pillars: { title: string; body: string }[];
  worldsSection: { eyebrow: string; title: string; lead: string };
  legalSection: { eyebrow: string; title: string; lead: string };
  storiesSection: { eyebrow: string; title: string; lead: string };
  aboutSection: { eyebrow: string; title: string; lead: string };
  studioSection: { eyebrow: string; title: string; lead: string };
  journey: { label: string; title: string; body: string }[];
  contact: { eyebrow: string; title: string; lead: string };
}> = {
  ar: {
    eyebrow: "بسمة موسى · عالم الإعلام",
    title: "لكل حكاية صوت... ولكل صوت رؤية.",
    lead: "منصة إعلامية عربية تُبنى الآن: حكايات إنسانية، وعي قانوني، وأصوات المدن — برؤية سينمائية وصدق تحريري.",
    primaryCta: "ادخل عالم الإعلام",
    secondaryCta: "لنتعاون",
    statusLine: "مفاهيم قيد التطوير · لا حلقات منشورة بعد.",
    heroCaption: "تصوّر بصري للهوية — ليس توثيقًا لبث حقيقي.",
    introEyebrow: "الرؤية",
    introTitle: "ليست مجرد صفحة... إنها عالم باسم بسمة.",
    introBody:
      "هنا تلتقي الحكاية بالبحث، والصوت بالمكان. أربعة عوالم تُفتح كأبواب: حوارات إنسانية، ووعي قانوني، وحكايات المدينة، ومساحة للصوت. هذه المنصة تُبنى بصدق، وتُعرض حالاتها بوضوح.",
    pillars: [
      {
        title: "الحكاية أولًا",
        body: "قصص إنسانية تُروى بدفء ومهنية، لا بمقاييس زائفة.",
      },
      {
        title: "البحث أساس",
        body: "مصادر رسمية وإخلاء مسؤولية، قبل أي محتوى قانوني.",
      },
      {
        title: "المكان حاضر",
        body: "الإمارات والمجتمع العربي في القلب، وليس في الهامش.",
      },
    ],
    worldsSection: {
      eyebrow: "عالم الإعلام",
      title: "اخرج من الباب الذي يخاطبك",
      lead: "كل عالم له جوه، ومصيره يُحكى بحالة صادقة.",
    },
    legalSection: {
      eyebrow: "من زاوية القانون",
      title: "القانون بلغة الناس",
      lead: "محتوى توعوي مرجع إلى مصادر رسمية، بلا فتاوى فردية.",
    },
    storiesSection: {
      eyebrow: "القصص والتوثيق",
      title: "أرشيف الذاكرة",
      lead: "قصص موثقة، ومواد قيد البحث — لا نُنشَر ما لم نتحقق.",
    },
    aboutSection: {
      eyebrow: "عن بسمة",
      title: "بين الإعلام والقانون",
      lead: "بسمة موسى — صوت إعلامي يحمل القانون كأداة فهم، والحكاية كمسؤولية.",
    },
    studioSection: {
      eyebrow: "خلف الرؤية",
      title: "مساحة للصناعة",
      lead: "بحث، حوار، تحرير، ثم نشر — مع توضيح لما هو توضيحي فقط.",
    },
    journey: [
      {
        label: "الخطوة 1",
        title: "اكتشف",
        body: "تعرف إلى بسمة ورؤيتها، ومنصة عالم الإعلام.",
      },
      {
        label: "الخطوة 2",
        title: "استكشف",
        body: "افتح العوالم، وتصفح البرامج المفاهيمية، واقرأ حالة كل تجربة.",
      },
      {
        label: "الخطوة 3",
        title: "تواصل",
        body: "راسل بسمة عبر واتساب للتعاون الإعلامي والتحريري.",
      },
    ],
    contact: {
      eyebrow: "لنصنع الحكاية القادمة",
      title: "للتعاون والتواصل",
      lead: "للتعاون الإعلامي، الحوارات، والبحث التحريري — راسل بسمة مباشرة عبر واتساب.",
    },
  },
  en: {
    eyebrow: "Basma Moussa · Media Universe",
    title: "Where Stories Find Their Voice.",
    lead: "A cinematic Arabic-first media universe being built now: human stories, legal awareness, and city voices — with editorial honesty and film-quality imagery.",
    primaryCta: "Enter Media Universe",
    secondaryCta: "Collaborate",
    statusLine: "Concepts in development · no episodes published yet.",
    heroCaption: "Visual identity illustration — not a record of a live broadcast.",
    introEyebrow: "Vision",
    introTitle: "Not just a page — a world called Basma.",
    introBody:
      "Here story meets research, voice meets place. Four worlds open like doors: human conversations, legal awareness, city stories, and a space for sound. The platform is being built honestly, with every condition stated clearly.",
    pillars: [
      {
        title: "Story First",
        body: "Human stories told with warmth and professionalism, not fake metrics.",
      },
      {
        title: "Research First",
        body: "Official sources and disclaimers before any legal content.",
      },
      {
        title: "Place Matters",
        body: "The UAE and the Arab community are central, not marginal.",
      },
    ],
    worldsSection: {
      eyebrow: "Media Universe",
      title: "Step through the door that speaks to you",
      lead: "Every world has its own atmosphere — and an honest status.",
    },
    legalSection: {
      eyebrow: "Legal Lens",
      title: "Law in the language of people",
      lead: "Educational content grounded in official sources, no individual fatwas.",
    },
    storiesSection: {
      eyebrow: "Stories & Archive",
      title: "Memory Room",
      lead: "Documented stories and research materials — nothing published unverified.",
    },
    aboutSection: {
      eyebrow: "About Basma",
      title: "Between media and law",
      lead: "Basma Moussa — a media voice holding law as a tool of understanding, and storytelling as responsibility.",
    },
    studioSection: {
      eyebrow: "Behind the Vision",
      title: "A space for making",
      lead: "Research, conversation, edit, publish — with honesty about what is illustrative.",
    },
    journey: [
      {
        label: "Step 1",
        title: "Discover",
        body: "Get to know Basma and her vision, and the Media Universe platform.",
      },
      {
        label: "Step 2",
        title: "Explore",
        body: "Open the worlds, browse program concepts, and read each experience's honest status.",
      },
      {
        label: "Step 3",
        title: "Connect",
        body: "Reach Basma on WhatsApp for media and editorial collaboration.",
      },
    ],
    contact: {
      eyebrow: "Let's create the next story",
      title: "Collaboration and contact",
      lead: "For media collaboration, conversations, and editorial research — reach Basma directly on WhatsApp.",
    },
  },
};
