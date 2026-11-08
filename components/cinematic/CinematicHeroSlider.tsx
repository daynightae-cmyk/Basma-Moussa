"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { getAsset } from "@/lib/content/assets";
import { resolveMotionPolicy } from "@/lib/motion/policy";
import type { Dictionary } from "@/lib/i18n/dictionary";
import { direction, type Locale } from "@/lib/i18n/config";

interface CinematicHeroSliderProps {
  locale: Locale;
  dict: Dictionary;
}

export function CinematicHeroSlider({ locale, dict }: CinematicHeroSliderProps) {
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<number>(0);
  const sceneStartRef = useRef<number>(0);

  const scenes = [
    {
      id: "scene-1",
      assetId: "bm-14",
      title: { ar: "الوجه الأول: الصوت", en: "Scene 01: The First Voice" },
      chapter: { ar: "الفصل 1", en: "Chapter 1" },
      lead: {
        ar: "صورة سينمائية كاملة لبسمة مع هوية ذهبية دقيقة.",
        en: "Full-bleed cinematic portrait of Basma with subtle golden identity lines.",
      },
      objectPosition: "50% 50%",
    },
    {
      id: "scene-2",
      assetId: "bm-12",
      title: { ar: "الفصل 2: الاستوديو", en: "Scene 02: The Conversation Studio" },
      chapter: { ar: "الفصل 2", en: "Chapter 2" },
      lead: {
        ar: "الكاميرا تنتقل إلى بيئة استوديو متطورة للحوارات.",
        en: "The camera travels into a sophisticated talk-show environment. Studio lights appear gradually.",
      },
      objectPosition: "50% 40%",
    },
    {
      id: "scene-3",
      assetId: "bm-01",
      title: { ar: "الفصل 3: التردد الذهبي", en: "Scene 03: The Golden Frequency" },
      chapter: { ar: "الفصل 3", en: "Chapter 3" },
      lead: {
        ar: "شرائط ذهبية تمتد عبر الشاشة، انتقل من التصوير إلى الهوية الصوتية.",
        en: "Golden sound ribbons extend across the screen.",
      },
      objectPosition: "50% 35%",
    },
    {
      id: "scene-4",
      assetId: "bm-11",
      title: { ar: "الفصل 4: أصوات المدينة", en: "Scene 04: City Voices" },
      chapter: { ar: "الفصل 4", en: "Chapter 4" },
      lead: {
        ar: "الرحلة تدخل إلى أجواء الشارقة/الإمارات الوثائقية.",
        en: "The journey enters Sharjah/UAE urban documentary atmosphere.",
      },
      objectPosition: "50% 45%",
    },
  ];

  // Composition classes align each scene with the CSS written for it
  // (portrait framing, studio veil, sculpture placement, city gradient).
  const sceneComposition: Record<string, string> = {
    "scene-1": "portrait-left",
    "scene-2": "studio-wide",
    "scene-3": "sculpture",
    "scene-4": "city-portrait",
  };

  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isRtl = direction[locale] === "rtl";
  const policy = resolveMotionPolicy({
    reducedMotion: reduced,
    hardwareConcurrency: navigator.hardwareConcurrency,
    saveData: (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    viewportWidth: typeof window !== "undefined" ? window.innerWidth : 1440,
  });

  const advanceScene = useCallback(() => {
    if (!policy.cinematic) return;
    setCurrentScene((prev) => (prev + 1) % scenes.length);
    progressRef.current = 0;
    sceneStartRef.current = Date.now();
  }, [policy.cinematic]);

  const handleNext = useCallback(() => {
    advanceScene();
  }, [advanceScene]);

  const handlePrev = useCallback(() => {
    setCurrentScene((prev) => {
      const next = prev === 0 ? scenes.length - 1 : prev - 1;
      progressRef.current = 0;
      sceneStartRef.current = Date.now();
      return next;
    });
  }, [scenes.length]);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => !prev);
  }, []);

  const [pausedByVisibility, setPausedByVisibility] = useState(false);

  useEffect(() => {
    const onVisibilityChange = () => setPausedByVisibility(document.hidden);
    window.addEventListener("visibilitychange", onVisibilityChange);
    return () => window.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  useEffect(() => {
    if (!isPlaying || reduced || pausedByVisibility) return;

    const duration = policy.autoAdvance ? 9000 : 0;
    if (duration <= 0) return;

    sceneStartRef.current = Date.now();

    const updateProgress = () => {
      if (document.hidden) return;
      const now = Date.now();
      const elapsed = now - sceneStartRef.current;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      progressRef.current = newProgress;
      setProgress(newProgress);

      if (newProgress >= 100) {
        advanceScene();
      }
    };

    const interval = setInterval(updateProgress, 50);
    return () => clearInterval(interval);
  }, [isPlaying, reduced, pausedByVisibility, policy.autoAdvance, advanceScene]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const forward = isRtl ? ["ArrowLeft", "ArrowUp"] : ["ArrowRight", "ArrowDown"];
    const backward = isRtl ? ["ArrowRight", "ArrowDown"] : ["ArrowLeft", "ArrowUp"];

    const handleKeyDown = (e: KeyboardEvent) => {
      if (forward.some((key) => e.key === key)) {
        e.preventDefault();
        handleNext();
        return;
      }
      if (backward.some((key) => e.key === key)) {
        e.preventDefault();
        handlePrev();
        return;
      }
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        togglePlay();
      }
    };

    element.addEventListener("keydown", handleKeyDown);
    return () => element.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev, togglePlay, isRtl]);

  return (
    <section className="cine-hero home-hero--premiere" ref={containerRef}>
      <div className="cine-hero__stage">
        {scenes.map((scene, index) => {
          const isActive = index === currentScene;
          const isPast = index < currentScene;
          const isNext = index > currentScene;
          const composition = sceneComposition[scene.id] ?? "";
          const sceneClass = `cine-scene cine-scene--${composition} ${isActive ? "is-active" : ""} ${isPast ? "is-past" : ""} ${isNext ? "is-next" : ""}`;

          return (
            <div
              key={scene.id}
              className={sceneClass}
              style={{
                "--scene-shift": index < currentScene ? (isRtl ? 1 : -1) : (isRtl ? -1 : 1),
              } as React.CSSProperties}
            >
              <div className="cine-scene__media">
                <Image
                  src={getAsset(scene.assetId).src}
                  alt={getAsset(scene.assetId).alt[locale]}
                  fill
                  priority={isActive}
                  sizes="100vw"
                  style={{ objectFit: "cover", "--obj-pos": scene.objectPosition } as React.CSSProperties}
                  className="cine-scene__img"
                />
              </div>

              <div className="cine-scene__veil" />
              <div className="cine-scene__light" />
              <div className="cine-scene__frame" />

              {isActive && (
                <div className="cine-scene__copy">
                  <div className="cine-scene__chapter">
                    <span>{scene.chapter[locale]}</span>
                    <div className="line" />
                  </div>
                  <h2 className="cine-scene__title">{scene.title[locale]}</h2>
                  <p className="lead">{scene.lead[locale]}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="cine-nav">
        <div className="cine-nav__rail">
          {scenes.map((_, index) => {
            const isActive = index === currentScene;
            return (
              <button
                key={index}
                className={`cine-nav__dot ${isActive ? "is-active" : ""}`}
                onClick={() => {
                  setCurrentScene(index);
                  progressRef.current = 0;
                  sceneStartRef.current = Date.now();
                }}
                aria-label={dict.common?.sceneNavigation ? dict.common.sceneNavigation.replace("{index}", (index + 1).toString()) : `Go to scene ${index + 1}`}
              >
                <span className="cine-nav__dot-index">{index + 1}</span>
                <span className="cine-nav__dot-label">{dict.common?.scenes ? dict.common.scenes : `Scene ${index + 1}`}</span>
              </button>
            );
          })}
        </div>

        <div className="cine-nav__controls">
          <button
            className="cine-nav__arrow"
            onClick={handlePrev}
            aria-label={dict.common?.previousScene || "Previous scene"}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <button
            className="cine-nav__pause"
            onClick={togglePlay}
            aria-label={isPlaying ? (dict.common?.pause || "Pause") : (dict.common?.play || "Play")}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                <polygon points="8,4 20,12 8,20" />
              </svg>
            )}
          </button>

          <button
            className="cine-nav__arrow"
            onClick={handleNext}
            aria-label={dict.common?.nextScene || "Next scene"}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>

        <div className="cine-nav__progress">
          <div
            className={`cine-nav__progress-fill${!isPlaying || pausedByVisibility ? " is-paused" : ""}`}
            style={{ transform: `scaleX(${progress / 100})` }}
          />
        </div>
      </div>

      <div className="home-hero__caption--premiere">
        <p className="eyebrow-gold">{dict.common?.cinematicHero || "Cinematic Hero"}</p>
      </div>
    </section>
  );
}