"use client";

import { usePathname } from "next/navigation";
import { NotFoundContent } from "@/components/editorial/NotFoundContent";
import { defaultLocale, isLocale } from "@/lib/i18n/config";

export default function NotFound() {
  const pathname = usePathname() ?? "";
  const segment = pathname.split("/").find(Boolean);
  const locale = isLocale(segment) ? segment : defaultLocale;

  return <NotFoundContent locale={locale} />;
}
