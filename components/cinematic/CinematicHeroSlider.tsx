"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import type { LocalizedText } from "@/lib/content/types";
import { getAsset } from "@/lib/content/assets";
import { localizedPath } from "@/lib/i18n/paths";
import { resolveMotionPolicy } from "@/lib/motion/policy";

export interface CinematicScene {
  id: string;
  assetId: string;
  eyebrow: LocalizedText;
  title: LocalizedText;
  lead: LocalizedText;
  ctaLabel: LocalizedText;
  ctaHref: string;
  /** Camera language for this scene. */
  camera: "push" | "drift" | "breathe";
}

interface Props {
  locale: Locale;
  scenes: CinematicScene[];
  ariaLabel?: string;
}

const SCENE_READING_MS = 15000;

function pick(t: LocalizedText, locale: Locale): string {
  return locale === "en" ? t.en : t.ar;
}

export function CinematicHeroSlider({ locale, scenes, ariaLabel }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const id = requestAnimationFrame(() =>
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches),
    );
    return () => cancelAnimationFrame(id);
  }, []);
  const pointerStart = useRef<number | null>(null);
  const total = scenes.length;

  const policy = resolveMotionPolicy({
    reducedMotion: reduced,
    viewportWidth: typeof window !== "undefined" ? window.innerWidth : 1440,
  });

  const goTo = useCallback(
    (next: number, _dir?: 1 | -1) => {
      if (total === 0) return;
      setIndex(((next % total) + total) % total);
    },
    [total],
  );

  const next = useCallback(() => goTo(index + 1, 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1, -1), [goTo, index]);

  // Auto-advance (only when allowed, not paused, not reduced).
  useEffect(() => {
    if (reduced || paused || !policy.autoAdvance || total < 2) return;
    const id = window.setTimeout(() => goTo(index + 1, 1), SCENE_READING_MS);
    return () => window.clearTimeout(id);
  }, [index, paused, reduced, policy.autoAdvance, total, goTo]);

  // Keyboard navigation (direction-aware for RTL).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      const rtl = locale === "ar";
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (rtl) prev(); else next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (rtl) next(); else prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0, 1);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1, -1);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [locale, next, prev, goTo, total]);

  // Touch / pointer swipe.
  const onPointerDown = (e: React.PointerEvent) => {
    pointerStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStart.current == null) return;
    const delta = e.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(delta) < 40) return;
    const rtl = locale === "ar";
    if (delta < 0) { if (rtl) prev(); else next(); }
    else { if (rtl) next(); else prev(); }
  };

  if (total === 0) return null;

  return (
    <div
      ref={containerRef}
      className="cine-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onPointerDown={onPointerDown}
      onPointerUp={onPointerUp}
    >
      <div className="cine-slider__stage">
        {scenes.map((s, i) => {
          const a = getAsset(s.assetId);
          const active = i === index;
          return (
            <div
              key={s.id}
              className={`cine-slide cine-slide--${s.camera} ${active ? "cine-slide--active" : "cine-slide--inactive"}`}
              aria-hidden={!active}
              style={{ zIndex: active ? 2 : 1 }}
            >
              <div className="cine-slide__bg">
                <Image
                  src={a.src}
                  alt={a.alt[locale]}
                  width={a.width}
                  height={a.height}
                  sizes="100vw"
                  priority={i === 0}
                  className="cine-slide__img"
                />
                <div className="cine-slide__veil" aria-hidden="true" />
                <div className="cine-slide__sweep" aria-hidden="true" />
              </div>
              <div className="cine-slide__content">
                <p className="cine-slide__eyebrow">{pick(s.eyebrow, locale)}</p>
                <h1 className="cine-slide__title">{pick(s.title, locale)}</h1>
                <p className="cine-slide__lead">{pick(s.lead, locale)}</p>
                <div className="cine-slide__cta-row">
                  <Link
                    href={localizedPath(locale, s.ctaHref)}
                    className="btn btn-gold"
                  >
                    {pick(s.ctaLabel, locale)}
                  </Link>
                  <span className="cine-slide__counter">
                    {String(i + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cine-slider__chrome">
        <button
          type="button"
          className="cine-slider__nav cine-slider__nav--prev"
          onClick={prev}
          aria-label={locale === "ar" ? "السابق" : "Previous"}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 6l-6 6 6 6" />
          </svg>
        </button>
        <div className="cine-slider__progress" role="tablist" aria-label={ariaLabel}>
          {scenes.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${i + 1} / ${total}`}
              className={`cine-slider__dot ${i === index ? "cine-slider__dot--active" : ""}`}
              onClick={() => goTo(i, i > index ? 1 : -1)}
            />
          ))}
        </div>
        <button
          type="button"
          className="cine-slider__nav cine-slider__nav--next"
          onClick={next}
          aria-label={locale === "ar" ? "التالي" : "Next"}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 6l6 6-6 6" />
          </svg>
        </button>
      </div>

      <button
        type="button"
        className="cine-slider__pause"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={paused ? (locale === "ar" ? "تشغيل" : "Play") : (locale === "ar" ? "إيقاف مؤقت" : "Pause")}
      >
        {paused ? "▶" : "❚❚"}
      </button>

      {reduced && (
        <p className="cine-slider__reduced-note">
          {locale === "ar"
            ? "تم تبسيط الحركة (تفضيل تقليل الحركة)."
            : "Motion simplified (reduced-motion preference)."}
        </p>
      )}
    </div>
  );
}
