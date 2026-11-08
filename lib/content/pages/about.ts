import type { LocalizedPair } from "../types";

const ar = {
  hero: {
    eyebrow: "عن بسمة",
    title: "بين الحكاية والقانون.",
    lead: "بسمة موسى — صوت إعلامي وعين بحثية، مقيمة في الإمارات. تؤمن أن الحكاية الجيدة تبدأ بالإنصات، وأن القانون الواضح يبدأ بمصدر موثوق.",
    caption: "بورتريه تصوري للهوية — ليس توثيقًا لحدث أو منصب.",
  },
  story: {
    eyebrow: "الرؤية قبل السيرة",
    title: "لماذا هذا العالم؟",
    paragraphs: [
      "هذه المنصة تُروى من الرؤية المعتمدة للمشروع، لا من سيرة موسّعة. ما نعرفه ونتحقق منه: بسمة موسى اسم إعلامي عربي يعمل بين الحكاية الإنسانية والبحث القانوني، ومقرها الإمارات العربية المتحدة.",
      "بدلًا من قائمة ألقاب، اختارت بسمة أن تبدأ بالسؤال: كيف نجعل القانون أقرب إلى الناس، والحكاية أكثر أمانة؟ من هنا وُلدت العوالم الأربعة: حوار، قانون، مدينة، وصوت.",
      "التفاصيل الأكاديمية والمهنية الدقيقة تُنشر فقط بعد مراجعتها والموافقة عليها. لا نضيف شهادات أو مناصب أو تجارب لا نستطيع إثباتها.",
    ],
  },
  focus: {
    eyebrow: "محاور العمل",
    title: "ثلاثة محاور، رؤية واحدة.",
    items: [
      {
        title: "الحكاية",
        body: "حوارات طويلة تمنح الناس مساحة، وترفض استبدال المعنى بالضجيج.",
      },
      {
        title: "القانون",
        body: "قراءة مصدرية تحدد الاختصاص وتاريخ المراجعة قبل أي شرح.",
      },
      {
        title: "المكان",
        body: "الإمارات والمدن العربية كمكان للحكاية، لا كخلفية سياحية.",
      },
    ],
  },
  accuracy: {
    eyebrow: "ملاحظة عن الدقة",
    title: "ما نعرفه، وما ننتظر تأكيده.",
    body: "الصور الشخصية في هذا الإصدار بورتريهات تصورية للهوية، وليست توثيقًا لحدث أو منصب. السيرة التفصيلية تُنشر بعد موافقة بسمة على الصياغة النهائية. هذا ليس نقصًا في الاحترام؛ إنه جزء من الاحترام.",
    knownTitle: "مؤكد على مستوى المشروع",
    knownItems: [
      "الاسم والهوية البصرية المعتمدة.",
      "الحضور بين الحكاية الإعلامية والبحث القانوني.",
      "الإقامة في الإمارات العربية المتحدة.",
    ],
    pendingTitle: "بانتظار التحقق والموافقة",
    pendingItems: [
      "الشهادات الأكاديمية والتفاصيل المهنية الدقيقة.",
      "الأدوار الحالية وأي تراخيص مهنية.",
      "الأعمال المنشورة والشراكات.",
    ],
  },
  quote: {
    text: "لا نبحث عن الضجيج؛ نبحث عن الصوت الذي يستحق أن يُسمع.",
    label: "فلسفة المنصة",
  },
  secondaryCaption: "بورتريه تحريري تصوري — صورة توضيحية.",
  cta: {
    title: "لنكتب الفصل القادم معًا.",
    body: "للتعاون الإعلامي، أو حوار حول الرؤية، القناة مفتوحة.",
    action: "تواصل عبر واتساب",
  },
} as const;

const en: LocalizedPair<typeof ar>["en"] = {
  hero: {
    eyebrow: "About Basma",
    title: "Between story and law.",
    lead: "Basma Moussa — a media voice and a research eye, based in the UAE. She believes a good story begins with listening, and clear law begins with a trustworthy source.",
    caption: "Illustrative identity portrait — not documentation of an event or role.",
  },
  story: {
    eyebrow: "Vision before biography",
    title: "Why this world?",
    paragraphs: [
      "This platform is told from the approved project vision, not from an expanded biography. What we know and have verified: Basma Moussa is an Arab media name working between human storytelling and legal research, based in the United Arab Emirates.",
      "Instead of a list of titles, Basma chose to begin with a question: how do we bring law closer to people, and make storytelling more honest? The four worlds were born there: conversation, law, city and sound.",
      "Precise academic and professional details are published only after review and approval. We do not add degrees, positions or experience we cannot substantiate.",
    ],
  },
  focus: {
    eyebrow: "Areas of work",
    title: "Three axes, one vision.",
    items: [
      {
        title: "Story",
        body: "Long conversations that give people room, and refuse to replace meaning with noise.",
      },
      {
        title: "Law",
        body: "Source-first reading that names the jurisdiction and review date before any explanation.",
      },
      {
        title: "Place",
        body: "The UAE and Arab cities as a place for stories, not a tourist backdrop.",
      },
    ],
  },
  accuracy: {
    eyebrow: "A note on accuracy",
    title: "What we know, and what awaits confirmation.",
    body: "Portraits in this release are illustrative identity images, not documentation of an event or role. The detailed biography is published after Basma approves the final wording. This is not a lack of respect; it is part of respect.",
    knownTitle: "Confirmed at project level",
    knownItems: [
      "The name and the approved brand identity.",
      "A presence between media storytelling and legal research.",
      "Residence in the United Arab Emirates.",
    ],
    pendingTitle: "Awaiting verification and approval",
    pendingItems: [
      "Academic qualifications and precise professional details.",
      "Current roles and any professional licences.",
      "Published work and partnerships.",
    ],
  },
  quote: {
    text: "We are not looking for noise; we are looking for the voice that deserves to be heard.",
    label: "The platform's philosophy",
  },
  secondaryCaption: "Illustrative editorial portrait — concept imagery.",
  cta: {
    title: "Let us write the next chapter together.",
    body: "For media collaboration, or a conversation about the vision, the channel is open.",
    action: "Reach out on WhatsApp",
  },
};

export const aboutPageContent: LocalizedPair<typeof ar> = { ar, en };
