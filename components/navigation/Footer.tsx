"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { otherLocale } from "@/lib/i18n/config";
import { localizedPath } from "@/lib/i18n/paths";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { OFFICIAL_SOURCES } from "@/lib/content/sources";
import { BRAND, CONTACT_CHANNELS, whatsappHref } from "@/lib/site";

interface FooterProps {
  locale: Locale;
  dict: Dictionary;
}

export function Footer({ locale, dict }: FooterProps) {
  const isAr = locale === "ar";
  const pathname = usePathname();
  const other = otherLocale(locale);

  const worldLinks = [
    { key: "media", label: dict.nav.media, path: "/media" },
    { key: "soundroom", label: dict.nav.soundroom, path: "/soundroom" },
    { key: "legal", label: dict.nav.legal, path: "/legal-lens" },
    { key: "stories", label: dict.nav.stories, path: "/stories" },
  ];
  const platformLinks = [
    { key: "about", label: dict.nav.about, path: "/about" },
    { key: "studio", label: dict.nav.studio, path: "/studio" },
    { key: "contact", label: dict.nav.contact, path: "/contact" },
    { key: "privacy", label: dict.nav.privacy, path: "/privacy" },
  ];

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner shell">
        <div className="footer__brand">
          <Image src="/brand/basma-icon-circle.png" alt="" width={40} height={40} className="footer__brand-icon" />
          <div>
            <div className="footer__brand-name">
              <span className="wordmark-ar">{BRAND.nameAr}</span>
              <span className="wordmark-en">{BRAND.name}</span>
            </div>
            <p className="footer__tagline">{dict.footer.tagline}</p>
          </div>
        </div>

        <nav className="footer__nav" aria-label={dict.common.footerNavigation}>
          <div className="footer__col">
            <h2 className="footer__heading">{dict.footer.exploreHeading}</h2>
            <ul>
              {worldLinks.map((link) => {
                const active = pathname === localizedPath(locale, link.path);
                return (
                  <li key={link.key}>
                    <Link
                      href={localizedPath(locale, link.path)}
                      className={active ? "footer__link--active" : undefined}
                      onClick={() => {}}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="footer__col">
            <h2 className="footer__heading">{dict.footer.platformHeading}</h2>
            <ul>
              {platformLinks.map((link) => {
                const active = pathname === localizedPath(locale, link.path);
                return (
                  <li key={link.key}>
                    <Link
                      href={localizedPath(locale, link.path)}
                      className={active ? "footer__link--active" : undefined}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link href={localizedPath(locale, "/?replay=1")}>{dict.common.replayIntro}</Link>
              </li>
            </ul>
          </div>
          <div className="footer__col footer__col--contact">
            <h2 className="footer__heading">{dict.footer.contactHeading}</h2>
            {CONTACT_CHANNELS.whatsapp ? (
              <>
                <a
                  className="footer__whatsapp"
                  href={whatsappHref(locale)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="footer__whatsapp-label">{dict.common.explore}</span>
                  <span className="footer__whatsapp-sub">
                    WhatsApp · {dict.common.opensInNewTab}
                  </span>
                </a>
              </>
            ) : null}
          </div>
        </nav>

        <aside className="footer__sources">
          <h2 className="footer__heading">{dict.footer.officialHeading}</h2>
          <ul>
            {OFFICIAL_SOURCES.map((source) => (
              <li key={source.id}>
                <a
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__source"
                >
                  {source.name[locale]}
                  <span className="footer__source-note">
                    {dict.common.externalLink} · {source.jurisdiction ?? ""}
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="footer__source-note--small">{dict.footer.sourcesNote}</p>
        </aside>

        <hr className="footer__rule" />
        <div className="footer__bottom">
          <p className="footer__rights">{dict.footer.rights}</p>
          <div className="footer__status">
            <span className="badge badge--concept">{dict.status.conceptShort}</span>
            <span>{dict.footer.conceptNote}</span>
          </div>
          <a
            href={localizedPath(locale, "/privacy")}
            className="footer__lang-switch"
            onClick={(e) => {
              e.preventDefault();
              // no-op styling hook; privacy is same-locale link
            }}
          >
            {dict.nav.privacy}
          </a>
          <a
            href={localizedPath(other)}
            className="footer__lang-switch"
            title={dict.common.language}
          >
            {isAr ? "English" : "العربية"}
          </a>
        </div>
      </div>
    </footer>
  );
}
