"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

import { localizedPath } from "@/lib/i18n/paths";
import { SPLASH_COMPLETE_EVENT } from "@/lib/experience/splash-sequence";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export interface ArrivalHeroAsset {
  src: string;
  alt: { ar: string; en: string };
  width: number;
  height: number;
  focalPoint?: { x: number; y: number };
}

export interface ArrivalHeroContent {
  eyebrow: string;
  title: string;
  lead: string;
  primaryCta: string;
  secondaryCta: string;
  statusLine: string;
  heroCaption: string;
}

interface ArrivalHeroProps {
  locale: Locale;
  dict: Dictionary;
  asset: ArrivalHeroAsset;
  content: ArrivalHeroContent;
}

const ARROW = "M4 12h16M13 5l7 7-7 7";

/**
 * Scene 01 — The Arrival.
 *
 * Full-bleed cinematic opening: atmospheric light, a single golden thread
 * drawn across the frame, and oversized editorial type that rises into place
 * once the brand intro has cleared the screen.
 */
export function ArrivalHero({ locale, dict, asset, content }: ArrivalHeroProps) {
  const rootRef = useRef<HTMLElement>(null);
  const isAr = locale === "ar";

  // Entrance starts when the intro hands the page over (or on a short fallback).
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    let released = false;
    const release = () => {
      if (released) return;
      released = true;
      node.classList.add("is-live");
    };
    window.addEventListener(SPLASH_COMPLETE_EVENT, release);
    const fallback = window.setTimeout(release, 1800);
    return () => {
      window.removeEventListener(SPLASH_COMPLETE_EVENT, release);
      window.clearTimeout(fallback);
    };
  }, []);

  // Pointer-driven depth: the light follows the visitor, the scene drifts slightly.
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const rect = node.getBoundingClientRect();
        if (!rect.width || !rect.height) return;
        const x = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width));
        const y = Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height));
        node.style.setProperty("--mx", `${(x * 100).toFixed(2)}%`);
        node.style.setProperty("--my", `${(y * 100).toFixed(2)}%`);
        node.style.setProperty("--px", (x - 0.5).toFixed(3));
        node.style.setProperty("--py", (y - 0.5).toFixed(3));
      });
    };

    node.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      node.removeEventListener("pointermove", onMove);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  const [titleFirst, ...titleRest] = content.title.split("...");
  const titleLines =
    titleRest.length > 0
      ? [`${titleFirst.trim()}...`, titleRest.join("...").trim()]
      : [content.title];

  return (
    <section className="arrival" ref={rootRef} aria-labelledby="arrival-title">
      <div className="arrival__media">
        <Image
          src={asset.src}
          alt={asset.alt[locale]}
          fill
          priority
          sizes="100vw"
          className="arrival__img"
          style={{
            objectPosition: `${asset.focalPoint?.x ?? 62}% ${asset.focalPoint?.y ?? 44}%`,
          }}
        />
      </div>
      <div className="arrival__veil" aria-hidden="true" />
      <div className="arrival__aura" aria-hidden="true" />

      <svg
        className="arrival__thread"
        viewBox="0 0 1440 900"
        preserveAspectRatio="none"
        aria-hidden="true"
        focusable="false"
      >
        <path
          className="arrival__thread-glow"
          d="M-60 690 C 220 706, 402 520, 620 430 S 1010 300, 1180 372 S 1370 470, 1520 300"
        />
        <path
          className="arrival__thread-line"
          d="M-60 690 C 220 706, 402 520, 620 430 S 1010 300, 1180 372 S 1370 470, 1520 300"
        />
      </svg>

      <div className="arrival__grain" aria-hidden="true" />
      <div className="arrival__frame" aria-hidden="true" />

      <div className="arrival__inner shell">
        <p className="arrival__chapter rv" style={{ "--d": "80ms" } as React.CSSProperties}>
          <span className="arrival__chapter-index">01</span>
          <span className="arrival__chapter-rule" aria-hidden="true" />
          <span>{isAr ? "الوصول" : "The Arrival"}</span>
        </p>

        <p className="arrival__eyebrow rv" style={{ "--d": "160ms" } as React.CSSProperties}>
          {content.eyebrow}
        </p>

        <h1 className="arrival__title" id="arrival-title">
          {titleLines.map((line, index) => (
            <span className="arrival__line" key={line}>
              <span
                className="arrival__line-inner"
                style={{ "--d": `${240 + index * 140}ms` } as React.CSSProperties}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="arrival__lead rv" style={{ "--d": "520ms" } as React.CSSProperties}>
          {content.lead}
        </p>

        <div className="arrival__actions rv" style={{ "--d": "660ms" } as React.CSSProperties}>
          <Link className="arrival__cta" href={localizedPath(locale, "/media")}>
            <span>{content.primaryCta}</span>
            <svg className="arrival__cta-arrow" viewBox="0 0 24 24" aria-hidden="true">
              <path d={ARROW} />
            </svg>
          </Link>
          <Link
            className="arrival__cta arrival__cta--ghost"
            href={localizedPath(locale, "/contact")}
          >
            {content.secondaryCta}
          </Link>
        </div>

        <div className="arrival__meta rv" style={{ "--d": "800ms" } as React.CSSProperties}>
          <span className="arrival__status">
            <span className="arrival__status-dot" aria-hidden="true" />
            {content.statusLine}
          </span>
          <span className="arrival__caption">{content.heroCaption}</span>
        </div>
      </div>

      <a className="arrival__scroll" href="#intro">
        <span className="arrival__scroll-line" aria-hidden="true" />
        <span className="arrival__scroll-label">{dict.common.scrollHint}</span>
      </a>
    </section>
  );
}
