import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NotFoundContent } from "@/components/editorial/NotFoundContent";
import { isLocale } from "@/lib/i18n/config";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  if (!isLocale(raw)) return {};
  return {
    title: raw === "ar" ? "الصفحة غير موجودة" : "Page not found",
    robots: { index: false, follow: false },
  };
}

/**
 * Rendered by the proxy with a real HTTP 404 status for unknown paths, so the
 * response is both correct for search engines and designed for humans.
 */
export default async function LostPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();
  return <NotFoundContent locale={raw} />;
}
