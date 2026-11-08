"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";
import Image from "next/image";
import Link from "next/link";

import type { Locale } from "@/lib/i18n/config";
import { getAsset } from "@/lib/content/assets";
import { localizedPath } from "@/lib/i18n/paths";
import type { StoryPanel } from "@/lib/experience/scene-data";
import {
  clamp,
  nearestPanelIndex,
  panelIndexToScrollY,
  progressToPanelOffset,
  supportsScrollDrivenAnimations,
  verticalToHorizontalProgress,
} from "@/lib/experience/scroll-controller";
import { GoldenAtmosphere } from "@/components/cinematic/GoldenAtmosphere";

interface Props {
  locale: Locale;
  panels: StoryPanel[];
  ariaLabel?: string;
}

function pick(locale: Locale, ar: string, en: string): string {
  return locale === "en" ? en : ar;
}

/**
 * Vertical scroll → horizontal cinematic journey.
 * Desktop: tall pin spacer + sticky viewport + translateX track.
 * Mobile: horizontal snap scroll of full-viewport panels.
 * Reduced motion: stacked vertical panels, no pinned transform.
 */
export function HorizontalStoryStage({ locale, panels, ariaLabel }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);
  const [reduced, setReduced] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [cssScrollDriven, setCssScrollDriven] = useState(false);
  const count = panels.length;

  useEffect(() => {
    const sync = () => {
      setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
      setIsMobile(window.matchMedia("(max-width: 899px)").matches);
      setCssScrollDriven(supportsScrollDrivenAnimations());
    };
    const initialFrame = window.requestAnimationFrame(sync);
    window.addEventListener("resize", sync);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    mq.addEventListener("change", sync);
    return () => {
      window.cancelAnimationFrame(initialFrame);
      window.removeEventListener("resize", sync);
      mq.removeEventListener("change", sync);
    };
  }, []);

  const applyTransform = useCallback(
    (p: number) => {
      const track = trackRef.current;
      if (!track) return;
      const offset = progressToPanelOffset(p, count);
      const x = -offset * 100;
      track.style.transform = `translate3d(${x}vw, 0, 0)`;
    },
    [count],
  );

  // Desktop JS scroll mapping (always as fallback; CSS scroll-driven is progressive enhancement).
  useEffect(() => {
    if (reduced || isMobile || count < 2) return;
    const section = sectionRef.current;
    if (!section) return;
    const track = trackRef.current;

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = section.getBoundingClientRect();
        const p = verticalToHorizontalProgress(
          rect.top,
          section.offsetHeight,
          window.innerHeight,
        );
        setProgress(p);
        setActive(nearestPanelIndex(p, count));
        if (!cssScrollDriven) applyTransform(p);
        else {
          // Keep CSS in sync for browsers that partially support timelines.
          applyTransform(p);
        }
      });
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      // Scroll restoration hygiene: leave transform clean on route change.
      if (track) track.style.transform = "";
    };
  }, [reduced, isMobile, count, applyTransform, cssScrollDriven]);

  // Mobile: observe snap scroll position.
  useEffect(() => {
    if (!isMobile || reduced) return;
    const scroller = mobileRef.current;
    if (!scroller) return;
    const onScroll = () => {
      const w = scroller.clientWidth || 1;
      const idx = Math.round(Math.abs(scroller.scrollLeft) / w);
      setActive(clamp(idx, 0, count - 1));
      setProgress(count <= 1 ? 0 : clamp(idx / (count - 1)));
    };
    scroller.addEventListener("scroll", onScroll, { passive: true });
    return () => scroller.removeEventListener("scroll", onScroll);
  }, [isMobile, reduced, count]);

  const scrollToPanel = useCallback(
    (panelIndex: number) => {
      const idx = clamp(panelIndex, 0, count - 1);
      if (reduced) {
        const el = document.getElementById(`story-panel-${panels[idx].id}`);
        el?.scrollIntoView({ behavior: "auto", block: "start" });
        setActive(idx);
        return;
      }
      if (isMobile && mobileRef.current) {
        const w = mobileRef.current.clientWidth;
        mobileRef.current.scrollTo({ left: w * idx, behavior: "smooth" });
        setActive(idx);
        return;
      }
      const section = sectionRef.current;
      if (!section) return;
      const top =
        section.getBoundingClientRect().top +
        window.scrollY;
      const y = panelIndexToScrollY(
        top,
        section.offsetHeight,
        window.innerHeight,
        idx,
        count,
      );
      window.scrollTo({ top: y, behavior: "smooth" });
    },
    [count, isMobile, reduced, panels],
  );

  const onKeyDown = (e: ReactKeyboardEvent<HTMLElement>) => {
    const rtl = locale === "ar";
    if (e.key === "ArrowRight") {
      e.preventDefault();
      scrollToPanel(rtl ? active - 1 : active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      scrollToPanel(rtl ? active + 1 : active - 1);
    } else if (e.key === "Home") {
      e.preventDefault();
      scrollToPanel(0);
    } else if (e.key === "End") {
      e.preventDefault();
      scrollToPanel(count - 1);
    }
  };

  const renderPanel = (panel: StoryPanel, i: number, mode: "desktop" | "mobile" | "stack") => {
    const asset = getAsset(panel.assetId);
    const isActive = i === active;
    return (
      <article
        key={`${mode}-${panel.id}`}
        id={mode === "stack" || mode === "desktop" ? `story-panel-${panel.id}` : undefined}
        className={[
          "story-panel",
          `story-panel--${panel.atmosphere}`,
          isActive ? "is-active" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        aria-current={isActive ? "true" : undefined}
        data-panel-id={panel.id}
        data-testid={`story-panel-${panel.id}`}
      >
        <div className="story-panel__media">
          <Image
            src={asset.src}
            alt={asset.alt[locale]}
            width={asset.width}
            height={asset.height}
            sizes="100vw"
            className="story-panel__img"
            style={{
              objectPosition: `${asset.focalPoint?.x ?? 50}% ${asset.focalPoint?.y ?? 50}%`,
            }}
            priority={i === 0}
          />
          <div className="story-panel__veil" aria-hidden="true" />
          {(panel.atmosphere === "portrait" ||
            panel.atmosphere === "frequency" ||
            panel.atmosphere === "legal") && (
            <GoldenAtmosphere enabled={!reduced} />
          )}
        </div>
        <div className="story-panel__copy">
          <p className="story-panel__kicker">{panel.kicker[locale]}</p>
          <h2 className="story-panel__title">{panel.title[locale]}</h2>
          <p className="story-panel__lead">{panel.lead[locale]}</p>
          <Link
            href={localizedPath(locale, panel.ctaHref)}
            className="btn btn-gold story-panel__cta"
            tabIndex={isActive || mode === "stack" ? 0 : -1}
          >
            {panel.ctaLabel[locale]}
          </Link>
        </div>
      </article>
    );
  };

  if (count === 0) return null;

  // Reduced motion: native vertical stack, no pin hijack.
  if (reduced) {
    return (
      <section
        className="story-stage story-stage--reduced"
        aria-label={ariaLabel}
        data-testid="horizontal-story-stage"
      >
        <div className="story-stage__stack">
          {panels.map((p, i) => renderPanel(p, i, "stack"))}
        </div>
      </section>
    );
  }

  // Mobile: touch snap carousel (horizontal), no body-scroll hijack.
  if (isMobile) {
    return (
      <section
        className="story-stage story-stage--mobile"
        aria-label={ariaLabel}
        data-testid="horizontal-story-stage"
        onKeyDown={onKeyDown}
        tabIndex={0}
      >
        <div className="story-stage__mobile-chrome" aria-hidden="false">
          <span className="story-stage__progress-label">
            {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </span>
          <div className="story-stage__dots" role="group">
            {panels.map((p, i) => (
              <button
                key={p.id}
                type="button"
                aria-current={i === active ? "step" : undefined}
                aria-label={p.title[locale]}
                className={`story-stage__dot ${i === active ? "is-active" : ""}`}
                onClick={() => scrollToPanel(i)}
              />
            ))}
          </div>
        </div>
        <div className="story-stage__mobile-scroller" ref={mobileRef}>
          {panels.map((p, i) => renderPanel(p, i, "mobile"))}
        </div>
      </section>
    );
  }

  // Desktop: pinned horizontal journey driven by vertical scroll.
  return (
    <section
      ref={sectionRef}
      className={`story-stage story-stage--desktop${cssScrollDriven ? " story-stage--css-scroll" : ""}`}
      aria-label={ariaLabel}
      data-testid="horizontal-story-stage"
      style={{ ["--story-panels" as string]: String(count) }}
      onKeyDown={onKeyDown}
      tabIndex={0}
    >
      <div className="story-stage__pin" style={{ height: `${count * 100}vh` }}>
        <div className="story-stage__sticky" ref={stickyRef}>
          <div
            className="story-stage__track"
            ref={trackRef}
            style={{ width: `${count * 100}vw` }}
          >
            {panels.map((p, i) => renderPanel(p, i, "desktop"))}
          </div>

          <div className="story-stage__chrome">
            <button
              type="button"
              className="story-stage__nav"
              onClick={() => scrollToPanel(active - 1)}
              disabled={active <= 0}
              aria-label={pick(locale, "اللوحة السابقة", "Previous panel")}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M15 6l-6 6 6 6" />
              </svg>
            </button>

            <div className="story-stage__meter" aria-hidden="true">
              <div
                className="story-stage__meter-fill"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>

            <div className="story-stage__dots" role="group" aria-label={ariaLabel}>
              {panels.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  aria-current={i === active ? "step" : undefined}
                  aria-label={p.title[locale]}
                  className={`story-stage__dot ${i === active ? "is-active" : ""}`}
                  onClick={() => scrollToPanel(i)}
                >
                  <span className="sr-only">{p.title[locale]}</span>
                </button>
              ))}
            </div>

            <button
              type="button"
              className="story-stage__nav"
              onClick={() => scrollToPanel(active + 1)}
              disabled={active >= count - 1}
              aria-label={pick(locale, "اللوحة التالية", "Next panel")}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M9 6l6 6-6 6" />
              </svg>
            </button>

            <span className="story-stage__progress-label">
              {String(active + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
