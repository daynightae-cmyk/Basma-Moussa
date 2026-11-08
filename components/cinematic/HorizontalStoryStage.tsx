"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";
import clsx from "clsx";

interface HorizontalStoryStageProps {
  children: ReactNode;
  className?: string;
  stageId: string;
  isActive: boolean;
}

export function HorizontalStoryStage({
  children,
  className,
  stageId,
  isActive,
}: HorizontalStoryStageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      {
        threshold: 0.3,
        rootMargin: "-50% 0px -50% 0px",
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

      // Calculate progress based on vertical scroll position
      const startPoint = viewportHeight * 0.2;
      const endPoint = viewportHeight * 0.8;

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
        "horizontal-story-stage",
        isActive && "is-active",
        className
      )}
      id={stageId}
    >
      <div className="horizontal-story-stage__content">
        {children}
      </div>

      {isInView && (
        <div className="horizontal-story-stage__progress">
          <div
            className="horizontal-story-stage__progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}
    </section>
  );
}
