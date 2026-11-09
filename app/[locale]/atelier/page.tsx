import { Metadata } from "next";

import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { buildPageMeta } from "@/lib/seo";
import { BrandThreadSplash } from "@/components/brand/splash";
import { StoryAtelier } from "@/components/atelier/story-atelier";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  return buildPageMeta({
    locale: l,
    path: "/atelier",
    title: `${dict.atelier.title} · ${dict.nav.atelier}`,
    description: dict.atelier.lead,
  });
}

interface AtelierPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AtelierPage({ params }: AtelierPageProps) {
  const { locale } = await params;
  const l: Locale = locale as Locale;
  const dict = getDictionary(l);

  return (
    <>
      <BrandThreadSplash locale={l} dict={dict} />
      <StoryAtelier dict={dict} locale={l} />
    </>
  );
}
