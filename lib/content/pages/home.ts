import type { LocalizedPair } from "../types";

const ar = {
  hero: {
    eyebrow: "بسمة موسى · عالم الإعلام",
    title: "لكل حكاية صوت... ولكل صوت رؤية.",
    lead: "منصة إعلامية عربية تُبنى الآن: حكايات إنسانية، وعي قانوني، وأصوات المدن — برؤية سينمائية وصدق تحريري.",
    primaryCta: "ادخل عالم الإعلام",
    secondaryCta: "لنتعاون",
    status: "مفاهيم قيد التطوير · لا حلقات منشورة بعد",
    caption: "تصوّر بصري للهوية — ليس توثيقًا لبث حقيقي.",
    scroll: "مرّر لتكتشف",
  },
  intro: {
    eyebrow: "الرؤية",
    title: "ليست مجرد صفحة... إنها عالم باسم بسمة.",
    body: "هنا تلتقي الحكاية بالبحث، والصوت بالمكان. أربعة عوالم تُفتح كأبواب: حوارات تهدأ لتسمع، قانون يُقرأ بلغة الناس، مدينة تُروى بأصوات أهلها، وتردد ذهبي يحفظ ما لا يُقال في الصورة. نبني هذا العالم على قاعدة واحدة: لا نُنشر ما لم نتحقق منه.",
    note: "أربعة عوالم مفاهيمية · صفر حلقات منشورة · رؤية واحدة قابلة للنمو",
    pillars: [
      {
        title: "الحكاية أولًا",
        body: "نبدأ بالإنسان، لا بالعنوان. الحكاية الجيدة تمنح الوقت لمن يحكيها.",
      },
      {
        title: "البحث أساس",
        body: "كل ادعاء يحتاج مصدرًا، وكل مصدر يحتاج تاريخًا وسياقًا.",
      },
      {
        title: "المكان حاضر",
        body: "من الشارقة إلى المدن العربية، المكان جزء من الحكاية لا خلفية لها.",
      },
    ],
  },
  portals: {
    eyebrow: "عالم الإعلام",
    title: "أربعة أبواب. أربعة عوالم.",
    lead: "كل عالم له لغته البصرية وإيقاعه. افتح الباب الذي يناديك — وستجد طريق العودة دائمًا مفتوحًا.",
    note: "تُوسم كل التجارب بحالتها الحقيقية: مفهوم قيد التطوير، وليس إنتاجًا منشورًا.",
  },
  legal: {
    eyebrow: "من زاوية القانون",
    title: "القانون أوضح عندما نقرأه معًا.",
    body: "مكتبة توعوية تبدأ من المصادر الرسمية، وتحدد الاختصاص وتاريخ القراءة. لا استشارات فردية، ولا وعود يقينية — فقط شرح مسؤول بلغة إنسانية.",
    cta: "ادخل مكتبة القانون",
    caption: "مشهد مكتب قانوني — صورة توضيحية.",
  },
  archive: {
    eyebrow: "أرشيف الذاكرة",
    title: "لا ننشر قصة قبل أن نتحقق منها.",
    body: "أرشيف وثائقي قيد الإعداد: قصص إنسانية، ملاحظات ميدانية، ومواد تُراجع قبل النشر. هذا ليس أرشيفًا فارغًا؛ إنه أرشيف يرفض أن يمتلئ بما ليس صحيحًا.",
    cta: "تعرّف على الأرشيف",
    caption: "مشهد أرشيف بحثي — صورة توضيحية.",
  },
  about: {
    eyebrow: "عن بسمة",
    title: "بين الحكاية والقانون.",
    body: "صوت إعلامي وعين بحثية. تؤمن بسمة أن الحكاية الجيدة تبدأ بالإنصات، وأن القانون الواضح يبدأ بمصدر موثوق. هذه المنصة هي المساحة التي تجتمع فيها الرؤيتان.",
    cta: "اقرأ الحكاية",
    caption: "بورتريه تصوري للهوية — ليس توثيقًا لحدث أو منصب.",
  },
  studio: {
    eyebrow: "خلف الرؤية",
    title: "الحكاية تُصنع قبل أن تُرى.",
    body: "بحث، حوار، تحرير، ثم نشر. نكشف الطريق الذي تسلكه الفكرة قبل أن تصل إلى الشاشة — ونسمّي كل مرحلة باسمها.",
    cta: "ادخل الاستوديو",
  },
  facts: {
    eyebrow: "الحقيقة العددية",
    title: "أرقام صغيرة، بصدق.",
    body: "لا نحتاج أرقامًا كبيرة لنبدو حقيقيين. هذه حالة المشروع الآن.",
    items: [
      { value: "04", label: "عوالم مفاهيمية" },
      { value: "00", label: "حلقات منشورة" },
      { value: "01", label: "رؤية قابلة للنمو" },
    ],
    note: "تتغير هذه الأرقام فقط عندما يحدث الشيء فعلًا.",
  },
  journey: {
    eyebrow: "كيف تبدأ؟",
    title: "تجربة مفهومة… من أول لمسة.",
    lead: "ثلاث خطوات فقط، بلا متاهة.",
    steps: [
      {
        number: "01",
        title: "اكتشف",
        body: "تعرّف على بسمة والرؤية خلف هذا العالم.",
      },
      {
        number: "02",
        title: "استكشف",
        body: "ادخل أي عالم عبر بابه، ثم عُد إلى الخريطة متى شئت.",
      },
      {
        number: "03",
        title: "تواصل",
        body: "للتعاون، الحوار، أو فكرة تريد أن تُروى — القناة جاهزة.",
      },
    ],
    note: "كل رابط حقيقي، وكل حالة معلنة بصدق.",
  },
  contact: {
    eyebrow: "الدعوة",
    title: "لنفتح بابًا لحكاية جديدة.",
    body: "للتعاون الإعلامي، الحوارات، والبحث التحريري — تواصل مباشرة عبر واتساب. سنرد عندما نستطيع؛ لا وعود آلية.",
    cta: "ابدأ حوارًا على واتساب",
    note: "قناة واتساب العامة مأخوذة من الرؤية المعتمدة. لا يوجد نموذج إرسال في هذا الإصدار.",
    caption: "مساحة تعاون تصورية — لا تدّعي مكتبًا حقيقيًا.",
  },
} as const;

const en: LocalizedPair<typeof ar>["en"] = {
  hero: {
    eyebrow: "BASMA MOUSSA · MEDIA UNIVERSE",
    title: "Where Stories Find Their Voice.",
    lead: "An Arabic-first media platform in the making: human stories, legal awareness, and the voices of cities — with cinematic vision and editorial honesty.",
    primaryCta: "Enter the Media Universe",
    secondaryCta: "Collaborate",
    status: "Concepts in development · no episodes published yet",
    caption: "Visual identity concept — not documentation of an actual broadcast.",
    scroll: "Scroll to discover",
  },
  intro: {
    eyebrow: "The vision",
    title: "Not just a website. A world named Basma.",
    body: "Here, story meets research, and sound meets place. Four worlds open like doors: conversations that slow down to listen, law read in human language, a city told by its people, and a golden frequency for what the image cannot hold. One rule holds it together: nothing is published before it is verified.",
    note: "Four conceptual worlds · zero published episodes · one vision built to grow",
    pillars: [
      {
        title: "Story first",
        body: "We begin with the person, not the headline. A good story gives its teller time.",
      },
      {
        title: "Research underneath",
        body: "Every claim needs a source; every source needs a date and a context.",
      },
      {
        title: "Place is present",
        body: "From Sharjah across Arab cities, place is part of the story, not its backdrop.",
      },
    ],
  },
  portals: {
    eyebrow: "Media Universe",
    title: "Four doors. Four worlds.",
    lead: "Every world has its own visual language and rhythm. Open the door that calls you — the way back stays open.",
    note: "Every experience carries its true status: a concept in development, not published production.",
  },
  legal: {
    eyebrow: "The Legal Lens",
    title: "Law is clearer when we read it together.",
    body: "An awareness library that starts from official sources, names the jurisdiction and records the reading date. No individual advice, no absolute promises — only responsible explanation in human language.",
    cta: "Enter the Legal Lens library",
    caption: "A legal research scene — illustrative imagery.",
  },
  archive: {
    eyebrow: "The Memory Room",
    title: "No story is published before it is verified.",
    body: "A documentary archive in preparation: human stories, field notes, and material reviewed before publication. This is not an empty archive; it is an archive that refuses to fill itself with things that are not true.",
    cta: "Discover the archive",
    caption: "A research archive scene — illustrative imagery.",
  },
  about: {
    eyebrow: "About Basma",
    title: "Between story and law.",
    body: "A media voice and a research eye. Basma believes a good story begins with listening, and clear law begins with a trustworthy source. This platform is where both perspectives meet.",
    cta: "Read the story",
    caption: "Illustrative identity portrait — not documentation of an event or role.",
  },
  studio: {
    eyebrow: "Behind the Vision",
    title: "A story is made before it is seen.",
    body: "Research, conversation, editing, then publication. We reveal the path an idea takes before it reaches the screen — and name every stage honestly.",
    cta: "Enter the Studio",
  },
  facts: {
    eyebrow: "An honest count",
    title: "Small numbers, told truthfully.",
    body: "We do not need large numbers to look real. This is the state of the project now.",
    items: [
      { value: "04", label: "conceptual worlds" },
      { value: "00", label: "published episodes" },
      { value: "01", label: "vision built to grow" },
    ],
    note: "These numbers change only when the thing actually happens.",
  },
  journey: {
    eyebrow: "How to begin",
    title: "An experience understood from the first touch.",
    lead: "Three steps, no maze.",
    steps: [
      {
        number: "01",
        title: "Discover",
        body: "Meet Basma and the vision behind this world.",
      },
      {
        number: "02",
        title: "Explore",
        body: "Enter any world through its door, then return to the map whenever you wish.",
      },
      {
        number: "03",
        title: "Connect",
        body: "For collaboration, conversation, or a story that deserves to be told — the channel is open.",
      },
    ],
    note: "Every link is real, and every status is stated honestly.",
  },
  contact: {
    eyebrow: "The Invitation",
    title: "Let us open a door to a new story.",
    body: "For media collaboration, conversations and editorial research — reach out directly on WhatsApp. We will reply when we can; no automated promises.",
    cta: "Start a conversation on WhatsApp",
    note: "The public WhatsApp channel comes from the approved vision. No submission form exists in this release.",
    caption: "An illustrative collaboration room — not a claim of an actual office.",
  },
};

export const homeContent: LocalizedPair<typeof ar> = { ar, en };
