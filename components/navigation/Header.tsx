"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLockup } from "@/components/brand/BrandLockup";
import { ArrowIcon } from "@/components/ui/icons";
import { getDictionary } from "@/lib/i18n/dictionary";
import { otherLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath, pathWithoutLocale, switchLocalePath } from "@/lib/i18n/paths";
import { whatsappHref } from "@/lib/site";
import { ScrollProgress } from "./ScrollProgress";

const NAV_ITEMS = [
  { key: "media", href: "/media", matches: ["/media", "/programs"] },
  { key: "legal", href: "/legal-lens", matches: ["/legal-lens"] },
  { key: "soundroom", href: "/soundroom", matches: ["/soundroom"] },
  { key: "stories", href: "/stories", matches: ["/stories"] },
  { key: "about", href: "/about", matches: ["/about"] },
] as const;

const MOBILE_ITEMS = [
  { key: "media", href: "/media" },
  { key: "legal", href: "/legal-lens" },
  { key: "soundroom", href: "/soundroom" },
  { key: "stories", href: "/stories" },
  { key: "studio", href: "/studio" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

export function Header({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const pathname = usePathname() ?? localizedPath(locale);
  const path = pathWithoutLocale(pathname);
  const [open, setOpen] = useState(false);
  const firstLinkRef = useRef<HTMLAnchorElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const other = otherLocale[locale];

  useEffect(() => {
    // A route change is external state. Closing the sheet here also covers
    // language switches and browser history, not only menu-link clicks.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstLinkRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const isActive = (matches: readonly string[]) =>
    matches.some((match) => path === match || path.startsWith(`${match}/`));

  return (
    <>
      <header className="site-header">
        <div className="shell site-header__inner">
          <BrandLockup locale={locale} priority />

          <nav className="site-nav" aria-label={dict.common.mainNavigation}>
            {NAV_ITEMS.map((item) => {
              const href = localizedPath(locale, item.href);
              const active = isActive(item.matches);
              return (
                <Link
                  key={item.key}
                  href={href}
                  className="site-nav__link"
                  aria-current={active ? "page" : undefined}
                >
                  {dict.nav[item.key]}
                </Link>
              );
            })}
          </nav>

          <div className="header-actions">
            <Link
              className="lang-switch"
              href={switchLocalePath(pathname, other)}
              hrefLang={other}
              lang={other}
              aria-label={`${dict.common.switchLanguage}: ${dict.common.switchLanguageShort}`}
            >
              {dict.common.switchLanguageShort}
            </Link>

            <Link
              className="btn btn--gold header-cta"
              href={localizedPath(locale, "/contact")}
            >
              {dict.nav.contact}
              <ArrowIcon className="arrow" />
            </Link>

            <button
              ref={toggleRef}
              type="button"
              className="menu-toggle"
              aria-expanded={open}
              aria-controls="mobile-navigation"
              aria-label={open ? dict.common.closeMenu : dict.common.openMenu}
              onClick={() => setOpen((value) => !value)}
            >
              <span className="menu-toggle__lines" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            </button>
          </div>
        </div>
        <ScrollProgress />
      </header>

      <div
        id="mobile-navigation"
        className="mobile-panel"
        hidden={!open}
        aria-label={dict.common.menu}
      >
        <nav className="mobile-panel__nav" aria-label={dict.common.mainNavigation}>
          {MOBILE_ITEMS.map((item, index) => {
            const href = localizedPath(locale, item.href);
            const active = path === item.href || path.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.key}
                ref={index === 0 ? firstLinkRef : undefined}
                href={href}
                className="mobile-panel__link"
                aria-current={active ? "page" : undefined}
              >
                <span>{dict.nav[item.key]}</span>
                <span className="index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </Link>
            );
          })}
        </nav>

        <div className="mobile-panel__footer">
          <Link
            className="btn btn--gold"
            href={localizedPath(locale, "/contact")}
            onClick={() => setOpen(false)}
          >
            {dict.nav.contact}
            <ArrowIcon className="arrow" />
          </Link>
          <a
            className="btn btn--ghost"
            href={whatsappHref(locale)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            WhatsApp
            <span className="sr-only">({dict.common.opensInNewTab})</span>
          </a>
        </div>
      </div>
    </>
  );
}
