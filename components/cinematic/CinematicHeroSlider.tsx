"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import { getAsset } from "@/lib/content/assets";
import { localizedPath } from "@/lib/i18n/paths";
import {
  SCENE_READING_MS,
  resolveMotionPolicy,
} from "@/lib/experience/motion-policy";
import type { CinematicHeroScene } from "@/lib/experience/scene-data";

interface Props {
  locale: Locale;
  scenes: CinematicHeroScene[];
  ariaLabel?: string;
  caption?: string;
}

function pick(locale: Locale, ar: string, en: string): string {
  return locale === "en" ? en : ar;
}

export function CinematicHeroSlider({
  locale,
  scenes,
  ariaLabel,
  caption,
}: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [progress, setProgress] = useState(0);
  const [viewportW, setViewportW] = useState(1440);
  const containerRef = useRef<HTMLDivElement>(null);
  const pointerStart = useRef<number | null>(null);
  const progressRaf = useRef<number | null>(null);
  const startedAt = useRef<number>(0);
  const total = scenes.length;

  useEffect(() => {
    const sync = () => {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setViewportW(window.innerWidth);
    };
    const id = requestAnimationFrame(sync);
    window.addEventListener("resize", sync);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", sync);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("resize", sync);
      mq.removeEventListener("change", sync);
    };
  }, []);

  const policy = resolveMotionPolicy({
    reducedMotion: reduced,
    viewportWidth: viewportW,
    hardwareConcurrency:
      typeof navigator !== "undefined" ? navigator.hardwareConcurrency : 8,
    saveData:
      typeof navigator !== "undefined"
        ? Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData)
        : false,
  });

  const goTo = useCallback(
    (next: number) => {
      if (total === 0) return;
      setIndex(((next % total) + total) % total);
      setProgress(0);
      startedAt.current = performance.now();
    },
    [total],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Auto-advance + gold filament progress.
  useEffect(() => {
    if (reduced || paused || !policy.autoAdvance || total < 2) {
      if (progressRaf.current) cancelAnimationFrame(progressRaf.current);
      return;
    }
    startedAt.current = performance.now();
    const tick = (now: number) => {
      const elapsed = now - startedAt.current;
      const p = Math.min(1, elapsed / SCENE_READING_MS);
      setProgress(p);
      if (p >= 1) {
        goTo(index + 1);
        return;
      }
      progressRaf.current = requestAnimationFrame(tick);
    };
    progressRaf.current = requestAnimationFrame(tick);
    return () => {
      if (progressRaf.current) cancelAnimationFrame(progressRaf.current);
    };
  }, [index, paused, reduced, policy.autoAdvance, total, goTo]);

  // Keyboard navigation (direction-aware for RTL).
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const onKey = (e: KeyboardEvent) => {
      const rtl = locale === "ar";
      if (e.key === "ArrowRight") {
        e.preventDefault();
        if (rtl) prev();
        else next();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        if (rtl) next();
        else prev();
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(total - 1);
      } else if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    el.addEventListener("keydown", onKey);
    return () => el.removeEventListener("keydown", onKey);
  }, [locale, next, prev, goTo, total]);

  const onPointerDown = (e: React.PointerEvent) => {
    pointerStart.current = e.clientX;
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (pointerStart.current == null) return;
    const delta = e.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(delta) < 48) return;
    const rtl = locale === "ar";
    if (delta < 0) {
      if (rtl) prev();
      else next();
    } else if (rtl) next();
    else prev();
  };

  if (total === 0) return null;

  return (
    <div
      ref={containerRef}
      className="cine-hero cine-slider"
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
      data-testid="cinematic-hero-slider"
    >
      {caption ? (
        <p className="home-hero__caption--premiere" aria-hidden="true">
          {caption}
        </p>
      ) : null}

      <div className="cine-hero__stage cine-slider__stage">
        {scenes.map((s, i) => {
          const a = getAsset(s.assetId);
          const fg = s.fgAssetId ? getAsset(s.fgAssetId) : null;
          const active = i === index;
          const past = i < index;
          return (
            <div
              key={s.id}
              className={[
                "cine-scene",
                "cine-slide",
                `cine-scene--${s.composition}`,
                `cine-slide--${s.camera}`,
                active ? "is-active cine-slide--active" : "cine-slide--inactive",
                past ? "is-past" : "",
                !active && !past ? "is-next" : "",
                locale === "ar" ? "is-reverse" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden={!active}
              style={{ zIndex: active ? 2 : 1 }}
              data-scene-id={s.id}
            >
              <div className="cine-scene__media cine-slide__bg">
                <div className="cine-slide__layer cine-slide__layer--bg" aria-hidden="true">
                  <Image
                    src={a.src}
                    alt=""
                    width={a.width}
                    height={a.height}
                    sizes="100vw"
                    priority={i === 0}
                    className="cine-slide__img cine-slide__img--bg"
                    style={{
                      objectPosition: `${a.focalPoint?.x ?? 50}% ${a.focalPoint?.y ?? 50}%`,
                    }}
                  />
                </div>
                {fg && policy.parallax ? (
                  <div className="cine-slide__layer cine-slide__layer--fg" aria-hidden="true">
                    <Image
                      src={fg.src}
                      alt=""
                      width={fg.width}
                      height={fg.height}
                      sizes="(max-width: 900px) 55vw, 38vw"
                      className="cine-slide__img cine-slide__img--fg"
                    />
                  </div>
                ) : null}
                <Image
                  src={a.src}
                  alt={active ? a.alt[locale] : ""}
                  width={a.width}
                  height={a.height}
                  sizes="100vw"
                  priority={i === 0}
                  className="cine-slide__img cine-slide__img--hero"
                  style={{
                    objectPosition: `${a.focalPoint?.x ?? 50}% ${a.focalPoint?.y ?? 50}%`,
                  }}
                />
                <div className="cine-scene__veil cine-slide__veil" aria-hidden="true" />
                <div className="cine-scene__light" aria-hidden="true" />
                <div className="cine-slide__sweep" aria-hidden="true" />
                <div className="cine-scene__frame" aria-hidden="true" />
                <div className="cine-slide__filament" aria-hidden="true" />
              </div>

              <div className="cine-scene__copy cine-slide__content">
                <div className="cine-scene__chapter">
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  <span className="line" aria-hidden="true" />
                  <span className="cine-slide__eyebrow">{s.eyebrow[locale]}</span>
                </div>
                <h1 className="cine-scene__title cine-slide__title" id={i === 0 ? "hero-title" : undefined}>
                  {s.title[locale]}
                </h1>
                <p className="lead cine-slide__lead">{s.lead[locale]}</p>
                <div className="cine-slide__cta-row">
                  <Link
                    href={localizedPath(locale, s.ctaHref)}
                    className="btn btn-gold"
                    tabIndex={active ? 0 : -1}
                  >
                    {s.ctaLabel[locale]}
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

      <div className="cine-nav cine-slider__chrome">
        <div className="cine-nav__controls">
          <button
            type="button"
            className="cine-nav__arrow cine-slider__nav cine-slider__nav--prev"
            onClick={prev}
            aria-label={pick(locale, "السابق", "Previous")}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button
            type="button"
            className="cine-nav__arrow cine-slider__nav cine-slider__nav--next"
            onClick={next}
            aria-label={pick(locale, "التالي", "Next")}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="cine-nav__rail cine-slider__progress" role="tablist" aria-label={ariaLabel}>
          {scenes.map((s, i) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={`${s.title[locale]} (${i + 1} / ${total})`}
              className={`cine-nav__dot cine-slider__dot ${i === index ? "is-active cine-slider__dot--active" : ""}`}
              onClick={() => goTo(i)}
            >
              <span className="cine-nav__dot-index">{String(i + 1).padStart(2, "0")}</span>
              <span className="cine-nav__dot-label">{s.eyebrow[locale]}</span>
            </button>
          ))}
        </div>

        <div className="cine-nav__controls">
          <div
            className="cine-nav__progress"
            aria-hidden="true"
            data-paused={paused || !policy.autoAdvance ? "true" : "false"}
          >
            <div
              className={`cine-nav__progress-fill ${paused ? "is-paused" : ""}`}
              style={{
                transform: `scaleX(${policy.autoAdvance && !reduced ? progress : 0})`,
                animation: "none",
              }}
            />
          </div>
          <button
            type="button"
            className="cine-nav__pause cine-slider__pause"
            onClick={() => setPaused((p) => !p)}
            aria-pressed={paused}
            aria-label={
              paused
                ? pick(locale, "تشغيل", "Play")
                : pick(locale, "إيقاف مؤقت", "Pause")
            }
          >
            {paused ? "▶" : "❚❚"}
          </button>
        </div>
      </div>

      {reduced ? (
        <p className="cine-slider__reduced-note">
          {pick(
            locale,
            "تم تبسيط الحركة (تفضيل تقليل الحركة).",
            "Motion simplified (reduced-motion preference).",
          )}
        </p>
      ) : null}
    </div>
  );
}
