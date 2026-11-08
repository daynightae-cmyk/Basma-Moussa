import { Metadata } from "next";

import { MEDIA_CONTENT } from "@/lib/content/pages/media";
import { buildPageMeta } from "@/lib/seo";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { MediaContent } from "@/components/media/media-content";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const l = locale as Locale;
  const dict = getDictionary(l);
  const c = MEDIA_CONTENT[l];
  return buildPageMeta({
    locale: l,
    title: `${c.title} · ${dict.nav.media}`,
    description: c.statusLine,
  });
}

interface MediaPageProps {
  params: Promise<{ locale: string }>;
}

export default async function Media({ params }: MediaPageProps) {
  const { locale } = await params;
  const l = locale as Locale;
  return <MediaContent locale={l} />;
}

