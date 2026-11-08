import type { LocalizedPair } from "../types";

const ar = {
  hero: {
    eyebrow: "خلف الرؤية",
    title: "الطابق الإبداعي.",
    lead: "قبل الصورة، هناك بحث. وقبل الحوار، هناك إنصات. هذا ما نصنع به العالم.",
    caption: "مكتب إنتاج تصوري — لا ندّعي امتلاك منشأة أو طاقم إنتاج.",
  },
  disclosure: {
    title: "ما تراه هنا تصور، وليس منشأة.",
    body: "مشهد الاستوديو في هذه الصفحة عمل بصري توضيحي للهوية. لا نملك استوديو بث، ولا نقدّم صورة كأنها مكان تشغيل حقيقي. ما نملكه فعلًا: الرؤية، والمنهج، والالتزام بالتحقق.",
  },
  method: {
    eyebrow: "المنهج",
    title: "أربع مراحل، بلا اختصارات.",
    lead: "كل مرحلة لها مخرج واضح. لا ننتقل إلى التالية قبل أن تتحقق.",
    steps: [
      {
        number: "01",
        title: "البحث",
        body: "فهم الموضوع، تحديد المصادر، وكتابة الأسئلة التي تستحق أن تُطرح.",
        gate: "مخرج: ملف بحث قابل للمراجعة.",
      },
      {
        number: "02",
        title: "الحوار",
        body: "إنصات طويل، موافقة واضحة، وتسجيل يحترم صاحب الحكاية.",
        gate: "مخرج: مادة خام موثّقة وموافقات.",
      },
      {
        number: "03",
        title: "التحرير",
        body: "اختيار المعنى لا الإثارة، وكتابة نص يمكن الدفاع عنه.",
        gate: "مخرج: نسخة مراجعة وتفريغ نصي.",
      },
      {
        number: "04",
        title: "النشر",
        body: "وسم الحالة، ذكر المصادر، وتوفير طريق واضح للتصحيح.",
        gate: "مخرج: مادة منشورة، بتاريخ ومراجعة.",
      },
    ],
  },
  library: {
    eyebrow: "المكتبة",
    title: "مكتبة الوسائط تنتظر مادتها الحقيقية.",
    body: "سيظهر هنا كل فيديو أو صوت أو نص معتمد، مع المصدر والمدة والحالة. لا مشغلات وهمية، ولا مواد توضيحية تُقدَّم كإنتاج حقيقي.",
    metric: "0",
    metricLabel: "مواد منشورة",
    note: "الصور في بقية الموقع توضيحية ومسماة كذلك.",
  },
  cta: {
    title: "تريد أن تُصنع حكاية معًا؟",
    body: "الباب مفتوح للتعاون في البحث، الحوار، والتحرير.",
    action: "تواصل عبر واتساب",
  },
} as const;

const en: LocalizedPair<typeof ar>["en"] = {
  hero: {
    eyebrow: "Behind the Vision",
    title: "The Creative Floor.",
    lead: "Before the image, there is research. Before the conversation, there is listening. This is how the world is made.",
    caption: "An illustrative production desk — we do not claim ownership of a facility or production crew.",
  },
  disclosure: {
    title: "What you see is a concept, not a venue.",
    body: "The studio scene on this page is illustrative brand imagery. We do not own a broadcast studio, and we do not present an image as if it were a real operating location. What we do own: the vision, the method, and a commitment to verification.",
  },
  method: {
    eyebrow: "The method",
    title: "Four stages, no shortcuts.",
    lead: "Every stage has a clear output. We do not move to the next before it is true.",
    steps: [
      {
        number: "01",
        title: "Research",
        body: "Understand the subject, identify sources and write the questions worth asking.",
        gate: "Output: a reviewable research file.",
      },
      {
        number: "02",
        title: "Conversation",
        body: "Long listening, clear consent and a recording that respects the storyteller.",
        gate: "Output: documented raw material and consents.",
      },
      {
        number: "03",
        title: "Editing",
        body: "Choose meaning over sensation, and write a text we can defend.",
        gate: "Output: a review cut and transcript.",
      },
      {
        number: "04",
        title: "Publication",
        body: "Label the status, credit sources and provide a clear correction path.",
        gate: "Output: a published piece with date and review.",
      },
    ],
  },
  library: {
    eyebrow: "The library",
    title: "The media library awaits its real material.",
    body: "Every approved video, audio piece or text will appear here with its source, duration and status. No pretend players, and no illustrative material presented as real production.",
    metric: "0",
    metricLabel: "published items",
    note: "Images elsewhere on the site are illustrative and labelled as such.",
  },
  cta: {
    title: "Want to make a story together?",
    body: "The door is open for collaboration in research, conversation and editing.",
    action: "Reach out on WhatsApp",
  },
};

export const studioPageContent: LocalizedPair<typeof ar> = { ar, en };
