export const MEDIA_CONTENT: Record<"ar" | "en", {
  eyebrow: string;
  title: string;
  lead: string;
  statusLine: string;
  searchLabel: string;
  searchPlaceholder: string;
  filterLabel: string;
  filterAll: string;
  resetLabel: string;
  resultsOne: string;
  resultsMany: string;
  noResultsTitle: string;
  noResultsBody: string;
  deeperTitle: string;
  deeperLead: string;
}> = {
  ar: {
    eyebrow: "عالم الإعلام",
    title: "ابحث في العوالم",
    lead: "مفاهيم برامج، وتصاميم، وحالات صادقة. ابحث، فلترة، وادخل الباب.",
    statusLine: "كل ما تراه هنا مفهوم قيد التطوير — غير منشور.",
    searchLabel: "ابحث في العوالم",
    searchPlaceholder: "مثال: حوارات، قانون، صوت، مدينة",
    filterLabel: "تصفية حسب النوع",
    filterAll: "الكل",
    resetLabel: "إعادة الضبط",
    resultsOne: "نتيجة واحدة",
    resultsMany: "{count} نتائج",
    noResultsTitle: "لا نتائج",
    noResultsBody: "جرب كلمة مفتاحية أخرى، أو أعد ضبط الفلتر.",
    deeperTitle: "طرق أخرى إلى الكون",
    deeperLead: "أرشيف القصص، الاستوديو، الشخصية، والتواصل.",
  },
  en: {
    eyebrow: "Media Universe",
    title: "Search the worlds",
    lead: "Program concepts, formats, and honest statuses. Search, filter, and step through the door.",
    statusLine: "Everything here is a concept in development — nothing published yet.",
    searchLabel: "Search the worlds",
    searchPlaceholder: "Try: conversation, legal, audio, city",
    filterLabel: "Filter by kind",
    filterAll: "All worlds",
    resetLabel: "Reset",
    resultsOne: "One result",
    resultsMany: "{count} results",
    noResultsTitle: "No matching worlds",
    noResultsBody: "Try a broader word or reset the filters. Everything shown here is a genuine concept in development, never a published episode.",
    deeperTitle: "More ways into the universe",
    deeperLead: "Story archive, studio, about, and collaboration.",
  },
};
