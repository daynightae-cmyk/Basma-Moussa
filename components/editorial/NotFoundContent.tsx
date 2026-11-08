import Link from "next/link";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

export function NotFoundContent({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <div className="shell status-page">
      <div className="status-page__inner">
        <p className="eyebrow">{dict.notFound.eyebrow}</p>
        <h1>{dict.notFound.title}</h1>
        <p>{dict.notFound.body}</p>
        <div className="status-page__actions">
          <Link className="btn btn--gold" href={localizedPath(locale)}>
            {dict.notFound.home}
          </Link>
          <Link className="btn btn--ghost" href={localizedPath(locale, "/media")}>
            {dict.notFound.media}
          </Link>
        </div>
      </div>
    </div>
  );
}
