import Link from "next/link";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { ExternalIcon } from "@/components/ui/icons";
import { officialSources } from "@/lib/content/sources";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import { whatsappHref } from "@/lib/site";

const EXPLORE = [
  { key: "media", href: "/media" },
  { key: "soundroom", href: "/soundroom" },
  { key: "legal", href: "/legal-lens" },
  { key: "stories", href: "/stories" },
] as const;

const PLATFORM = [
  { key: "home", href: "/" },
  { key: "about", href: "/about" },
  { key: "studio", href: "/studio" },
  { key: "contact", href: "/contact" },
  { key: "privacy", href: "/privacy" },
] as const;

export function Footer({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="site-footer__grid">
          <div className="site-footer__brand">
            <BrandLockup locale={locale} />
            <p>{dict.footer.tagline}</p>
            <p className="site-footer__disclosure">{dict.footer.disclosure}</p>
          </div>

          <div>
            <h2>{dict.footer.exploreHeading}</h2>
            <div className="site-footer__links">
              {EXPLORE.map((item) => (
                <Link key={item.key} href={localizedPath(locale, item.href)}>
                  {dict.nav[item.key]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2>{dict.footer.platformHeading}</h2>
            <div className="site-footer__links">
              {PLATFORM.map((item) => (
                <Link key={item.key} href={localizedPath(locale, item.href)}>
                  {item.key === "home" ? dict.common.home : dict.nav[item.key]}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h2>{dict.footer.officialHeading}</h2>
            <div className="site-footer__links">
              {officialSources.map((source) => (
                <a
                  key={source.id}
                  className="site-footer__source"
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {source.publisher[locale]}
                  <ExternalIcon />
                  <span className="sr-only">({dict.common.opensInNewTab})</span>
                </a>
              ))}
            </div>
            <p className="site-footer__disclosure">{dict.footer.sourcesNote}</p>
          </div>
        </div>

        <div className="site-footer__bottom">
          <p>{dict.footer.rights}</p>
          <p>{dict.footer.conceptNote}</p>
          <div className="site-footer__bottom-actions">
            <a
              href={whatsappHref(locale)}
              target="_blank"
              rel="noopener noreferrer"
            >
              {dict.footer.makeContact}
              <ExternalIcon />
              <span className="sr-only">({dict.common.opensInNewTab})</span>
            </a>
            <a href={`${localizedPath(locale)}?replay=1`}>{dict.common.replayIntro}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
