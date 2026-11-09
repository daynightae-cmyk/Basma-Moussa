"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import { otherLocale, type Locale } from "@/lib/i18n/config";
import { localizedPath, switchLocalePath } from "@/lib/i18n/paths";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { BRAND } from "@/lib/site";

const NAV_ROUTES = [
  { key: "about", path: "/about", label: (d: Dictionary) => d.nav.about },
  { key: "media", path: "/media", label: (d: Dictionary) => d.nav.media },
  { key: "soundroom", path: "/soundroom", label: (d: Dictionary) => d.nav.soundroom },
  { key: "legal", path: "/legal-lens", label: (d: Dictionary) => d.nav.legal },
  { key: "stories", path: "/stories", label: (d: Dictionary) => d.nav.stories },
  { key: "studio", path: "/studio", label: (d: Dictionary) => d.nav.studio },
  { key: "atelier", path: "/atelier", label: (d: Dictionary) => d.nav.atelier },
  { key: "contact", path: "/contact", label: (d: Dictionary) => d.nav.contact },
];

interface HeaderProps {
  locale: Locale;
  dict: Dictionary;
}

export function Header({ locale, dict }: HeaderProps) {
  const isAr = locale === "ar";
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    document.body.style.overflow = "";
    toggleRef.current?.focus();
  }, []);

  // Focus management for the mobile panel.
  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    const firstFocusable = menuRef.current?.querySelector<HTMLElement>('a[href], button');
    firstFocusable?.focus();
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    },
    [closeMenu]
  );

  const toggleMenu = useCallback(() => setMenuOpen((open) => !open), []);

  const switchLanguage = useCallback(() => {
    const target = otherLocale(locale);
    router.push(switchLocalePath(pathname, target));
  }, [locale, pathname, router]);

  const brandLink = localizedPath(locale);

  return (
    <header className="header" role="banner">
      <div className="header__inner shell">
        <Link
          href={brandLink}
          className="header__brand"
          aria-label={`${BRAND.nameAr} — ${dict.common.home}`}
          onClick={closeMenu}
        >
          <Image
            src="/brand/basma-icon-circle.png"
            alt=""
            width={44}
            height={44}
            className="header__brand-icon"
            priority
          />
          <div className="header__brand-text">
            <span className="header__brand-name wordmark-ar">{BRAND.nameAr}</span>
            <span className="header__brand-name wordmark-en">{BRAND.name}</span>
            <span className="header__brand-sub">
              {isAr ? BRAND.productAr : BRAND.product}
            </span>
          </div>
        </Link>

        <nav className="header__nav" aria-label={dict.common.mainNavigation}>
          {NAV_ROUTES.map((route) => {
            const active =
              pathname === localizedPath(locale, route.path) ||
              (route.key !== "about" &&
                pathname.startsWith(localizedPath(locale, route.path)));
            return (
              <Link
                key={route.key}
                href={localizedPath(locale, route.path)}
                className={`nav-link ${active ? "active" : ""}`}
                aria-current={active ? "page" : undefined}
                onClick={closeMenu}
              >
                {route.label(dict)}
              </Link>
            );
          })}
        </nav>

        <div className="header__actions">
          <button
            className="header__lang"
            aria-label={dict.common.switchLanguage}
            title={dict.common.language}
            onClick={switchLanguage}
            onClickCapture={closeMenu}
          >
            {isAr ? dict.common.switchLanguageShort : "EN"}
          </button>
          <button
            ref={toggleRef}
            className="header__menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="bm-mobile-menu"
            onClick={toggleMenu}
          >
            <span className="menu-toggle__bar" />
            <span className="menu-toggle__bar" />
            <span className="menu-toggle__bar" />
            <span className="sr-only">{menuOpen ? dict.common.close : dict.common.openMenu}</span>
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          ref={menuRef}
          id="bm-mobile-menu"
          className="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label={dict.common.menu}
          onKeyDown={handleKeyDown}
        >
          <div className="mobile-menu__inner shell">
            <button className="mobile-menu__close" onClick={closeMenu} aria-label={dict.common.close}>
              {dict.common.close}
            </button>
            <ul className="mobile-menu__list">
              {NAV_ROUTES.map((route) => {
                const active =
                  pathname === localizedPath(locale, route.path) ||
                  (route.key !== "about" &&
                    pathname.startsWith(localizedPath(locale, route.path)));
                return (
                  <li key={route.key}>
                    <Link
                      href={localizedPath(locale, route.path)}
                      className={`mobile-menu__link ${active ? "active" : ""}`}
                      aria-current={active ? "page" : undefined}
                      onClick={closeMenu}
                    >
                      {route.label(dict)}
                    </Link>
                  </li>
                );
              })}
              <li>
                <Link
                  href={localizedPath(locale, "/privacy")}
                  className="mobile-menu__link"
                  onClick={closeMenu}
                >
                  {dict.nav.privacy}
                </Link>
              </li>
              <li className="mobile-menu__lang">
                <button className="mobile-menu__lang-btn" onClick={switchLanguage}>
                  {dict.common.language}:{" "}
                  <span>{isAr ? "English" : "العربية"}</span>
                </button>
              </li>
            </ul>
            <div className="mobile-menu__contact">
              <a className="btn btn-gold" href="#contact" onClick={closeMenu}>
                {dict.nav.contact}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
