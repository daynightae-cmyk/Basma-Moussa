"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getDictionary } from "@/lib/i18n/dictionary";
import { defaultLocale, isLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

export default function LocaleError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname() ?? "";
  const segment = pathname.split("/").filter(Boolean)[0];
  const locale = isLocale(segment) ? segment : defaultLocale;
  const dict = getDictionary(locale);

  return (
    <div className="shell status-page">
      <div className="status-page__inner">
        <p className="eyebrow">{dict.error.eyebrow}</p>
        <h1>{dict.error.title}</h1>
        <p>{dict.error.body}</p>
        <div className="status-page__actions">
          <button type="button" className="btn btn--gold" onClick={() => reset()}>
            {dict.error.retry}
          </button>
          <Link className="btn btn--ghost" href={localizedPath(locale)}>
            {dict.error.home}
          </Link>
        </div>
      </div>
    </div>
  );
}
