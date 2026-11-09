import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AiStudioFull } from "@/components/ai/AiStudioFull";
import { BrandThreadSplash } from "@/components/brand/splash";
import { getAsset } from "@/lib/content/assets";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { getDictionary } from "@/lib/i18n/dictionary";
import { buildPageMeta } from "@/lib/seo";
import "@/styles/ai-studio.css";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) return {};
  const locale: Locale = rawLocale;
  return buildPageMeta({
    locale,
    title: locale === "ar" ? "الاستوديو الذكي · بسمة موسى" : "AI Studio · Basma Moussa",
    description: locale === "ar"
      ? "مرشد ذكي لعالم بسمة موسى، بإجابات تستند إلى المحتوى المعتمد للمنصة."
      : "Explore Basma Moussa's media universe with an AI guide grounded in approved platform content.",
    imageAlt: getAsset("bm-09").alt[locale],
  });
}

export default async function AiStudioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (!isLocale(rawLocale)) notFound();
  const locale: Locale = rawLocale;
  const asset = getAsset("bm-09");

  return (
    <>
      <BrandThreadSplash locale={locale} dict={getDictionary(locale)} />
      <AiStudioFull locale={locale} mediaSrc={asset.src} mediaAlt={asset.alt[locale]} />
    </>
  );
}
