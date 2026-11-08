"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { getAsset } from "@/lib/content/assets";
import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";

interface ImmersiveMediaRailProps {
  locale: Locale;
  dict: Dictionary;
}

export function ImmersiveMediaRail({ locale, dict }: ImmersiveMediaRailProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const mediaItems = [
    {
      id: "rail-item-1",
      assetId: "bm-14",
      title: { ar: "التردد الذهبي", en: "Golden Frequency" },
      description: {
        ar: "هوية صوتية مجردة مع موجات، فيلم، ولوتس على خلفية كحلية.",
        en: "Abstract gold waveform, film and lotus on navy background.",
      },
      objectPosition: "50% 50%",
    },
    {
      id: "rail-item-2",
      assetId: "bm-12",
      title: { ar: "استوديو الحوار", en: "Conversation Studio" },
      description: {
        ar: "بيئة استوديو فاخرة مع إضاءة درامية وزاوية تصوير احترافية.",
        en: "Luxury conversation studio with dramatic lighting and professional camera angle.",
      },
      objectPosition: "50% 40%",
    },
    {
      id: "rail-item-3",
      assetId: "bm-01",
      title: { ar: "الميكروفون الذهبي", en: "Golden Microphone" },
      description: {
        ar: "ميكروفون ذهبي نحتي مع إضاءة محيطة وتأثيرات ضوئية.",
        en: "Sculptural golden microphone with ambient lighting and light effects.",
      },
      objectPosition: "50% 35%",
    },
    {
      id: "rail-item-4",
      assetId: "bm-11",
      title: { ar: "واجهة الشارقة", en: "Sharjah Facade" },
      description: {
        ar: "واجهة مائية حضرية مع كاميرا ميدانية عند الغروب، تعكس روح الإمارات.",
        en: "Sharjah waterfront facade with field camera at sunset, reflecting UAE spirit.",
      },
      objectPosition: "50% 45%",
    },
  ];

  const currentItem = mediaItems[currentIndex];

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = (prev + 1) % mediaItems.length;
      setProgress(0);
      return next;
    });
  }, [mediaItems.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => {
      const next = prev === 0 ? mediaItems.length - 1 : prev - 1;
      setProgress(0);
      return next;
    });
  }, [mediaItems.length]);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        handleNext();
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        handlePrev();
        break;
    }
  }, [handleNext, handlePrev]);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    element.addEventListener("keydown", handleKeyDown);
    return () => element.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (reduced) return;

    const duration = 8000;
    const startTime = Date.now();

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        handleNext();
      }
    };

    const interval = setInterval(updateProgress, 50);
    return () => clearInterval(interval);
  }, [reduced, handleNext]);

  return (
    <section className="immersive-media-rail" ref={containerRef}>
      <div className="immersive-media-rail__header">
        <h2 className="eyebrow-gold">{dict.common?.cinematicHero || "Cinematic Hero"}</h2>
        <h3 className="immersive-media-rail__title">{currentItem.title[locale]}</h3>
        <p className="immersive-media-rail__description">{currentItem.description[locale]}</p>
      </div>

      <div className="immersive-media-rail__viewport" ref={railRef}>
        <div className="immersive-media-rail__track">
          {mediaItems.map((item, index) => {
            const isActive = index === currentIndex;
            const isPrev = index === (currentIndex - 1 + mediaItems.length) % mediaItems.length;
            const isNext = index === (currentIndex + 1) % mediaItems.length;

            return (
              <div
                key={item.id}
                className={`immersive-media-rail__panel ${isActive ? "is-active" : ""} ${isPrev ? "is-prev" : ""} ${isNext ? "is-next" : ""}`}
                style={{ "--panel-index": index } as React.CSSProperties}
              >
                <div className="immersive-media-rail__media">
                  <Image
                    src={getAsset(item.assetId).src}
                    alt={getAsset(item.assetId).alt[locale]}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover", objectPosition: item.objectPosition }}
                    className="immersive-media-rail__img"
                  />
                </div>

                <div className="immersive-media-rail__overlay" />
                <div className="immersive-media-rail__content">
                  <h4 className="immersive-media-rail__panel-title">{item.title[locale]}</h4>
                  <p className="immersive-media-rail__panel-desc">{item.description[locale]}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="immersive-media-rail__controls">
        <button
          className="immersive-media-rail__arrow"
          onClick={handlePrev}
          aria-label={dict.common?.previousScene || "Previous scene"}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="immersive-media-rail__indicators">
          {mediaItems.map((_, index) => {
            const isActive = index === currentIndex;
            return (
              <button
                key={index}
                className={`immersive-media-rail__dot ${isActive ? "is-active" : ""}`}
                onClick={() => setCurrentIndex(index)}
                aria-label={dict.common?.sceneNavigation ? dict.common.sceneNavigation.replace("{index}", (index + 1).toString()) : `Go to panel ${index + 1}`}
              />
            );
          })}
        </div>

        <button
          className="immersive-media-rail__arrow"
          onClick={handleNext}
          aria-label={dict.common?.nextScene || "Next scene"}
        >
          <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="immersive-media-rail__progress">
        <div
          className="immersive-media-rail__progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
