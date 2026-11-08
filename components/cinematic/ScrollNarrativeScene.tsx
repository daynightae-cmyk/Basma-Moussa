"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import clsx from "clsx";

interface ScrollNarrativeSceneProps {
  children: ReactNode;
  className?: string;
  sceneId: string;
  chapter?: string;
  title?: string;
  imageUrl?: string;
  imageAlt?: string;
}

export function ScrollNarrativeScene({
  children,
  className,
  sceneId,
  chapter,
  title,
  imageUrl,
  imageAlt,
}: ScrollNarrativeSceneProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: "-20% 0px -20% 0px",
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView) return;

    const handleScroll = () => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate reveal progress
      const startPoint = viewportHeight * 0.15;
      const endPoint = viewportHeight * 0.85;

      let newProgress = 0;

      if (rect.top <= startPoint && rect.bottom >= endPoint) {
        newProgress = 100;
      } else if (rect.top > startPoint) {
        newProgress = ((rect.top - startPoint) / (rect.height || 1)) * 100;
      } else if (rect.bottom < endPoint) {
        newProgress = ((rect.bottom - startPoint) / (rect.height || 1)) * 100;
      }

      setProgress(Math.max(0, Math.min(100, newProgress)));
    };

    const throttledScroll = () => {
      if (window.scrollY === 0) return;
      handleScroll();
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", throttledScroll);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className={clsx(
        "scroll-narrative-scene",
        isInView && "is-revealed",
        className
      )}
      id={sceneId}
    >
      <div className="scroll-narrative-scene__content">
        {imageUrl && (
          <div className="scroll-narrative-scene__image">
            <img src={imageUrl} alt={imageAlt || ""} loading="lazy" />
          </div>
        )}

        <div className="scroll-narrative-scene__text">
          {chapter && (
            <div className="scroll-narrative-scene__chapter">
              <span>{chapter}</span>
              <div className="line" />
            </div>
          )}

          {title && (
            <h2 className="scroll-narrative-scene__title">{title}</h2>
          )}

          <div className="scroll-narrative-scene__body">{children}</div>
        </div>
      </div>

      {isInView && (
        <div className="scroll-narrative-scene__progress">
          <div
            className="scroll-narrative-scene__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </section>
  );
}
