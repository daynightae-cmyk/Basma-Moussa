import Link from "next/link";

import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";

/**
 * The thread that opened the brand film continues here, pointing to the Story
 * Atelier — the new world the homepage hands the visitor on to.
 */
export function ThreadInvitation({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section className="thread-invite" aria-labelledby="thread-invite-title">
      <div className="shell thread-invite__inner">
        <svg
          className="thread-invite__thread"
          viewBox="0 0 600 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="thread-invite-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f7ecd6" stopOpacity="0" />
              <stop offset="35%" stopColor="#d7ab62" />
              <stop offset="65%" stopColor="#f2d7a0" />
              <stop offset="100%" stopColor="#b38642" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0 60 C 120 8, 208 112, 300 60 S 486 8, 600 60" />
        </svg>

        <p className="eyebrow eyebrow-gold">{dict.atelier.eyebrow}</p>
        <h2 id="thread-invite-title" className="display display-m">
          {dict.atelier.title}
        </h2>
        <p className="lead">{dict.atelier.lead}</p>
        <Link className="btn btn-gold" href={localizedPath(locale, "/atelier")}>
          {dict.common.explore} · {dict.atelier.title}
          <svg className="icon-arrow" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </section>
  );
}
