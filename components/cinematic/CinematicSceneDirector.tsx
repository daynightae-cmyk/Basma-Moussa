"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
/**
 * CinematicSceneDirector
 *
 * Shared scene orchestration layer. Wraps a sequence of scenes and reveals
 * them with staggered, coordinated timing on mount and as they enter the
 * viewport. Keeps one consistent motion policy across the universe so every
 * route feels like part of the same broadcast premiere.
 *
 * Contract:
 * - Staggered entrance (never all-at-once pop-in).
 * - Scroll-progress reveal for below-fold scenes.
 * - Reduced-motion: skips stagger, renders everything fully opaque immediately.
 * - Cleanup: removes observers/timers on unmount or navigation interruption.
 * - No continuous raf loop; CSS handles motion, JS only coordinates state.
 */
interface CinematicSceneDirectorProps {
  /** Scenes to orchestrate (rendered as direct children). */
  children: React.ReactNode;
  /** Base stagger delay between scenes. */
  stagger?: number;
  /** When true, reveal only when scrolled into view (below-fold scenes). */
  scrollReveal?: boolean;
  ariaLabel?: string;
}

export function CinematicSceneDirector({
  children,
  stagger = 120,
  scrollReveal = false,
  ariaLabel,
}: CinematicSceneDirectorProps) {
  const childArray = React.Children.toArray(children);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [activeSet, setActiveSet] = useState<Set<number>>(() =>
    reduced ? new Set(childArray.map((_, i) => i)) : new Set(),
  );
  const observerRef = useRef<IntersectionObserver | null>(null);

  const reveal = useCallback((index: number) => {
    setActiveSet((prev) => new Set([...prev, index]));
  }, []);

  // Mount reveal: staggered, unless reduced motion (then all visible at once).
  useEffect(() => {
    if (reduced) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    childArray.forEach((_, i) => {
      timers.push(setTimeout(() => reveal(i), i * stagger));
    });
    return () => {
      timers.forEach(clearTimeout);
      setActiveSet(new Set());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Scroll reveal: IntersectionObserver for below-fold scenes.
  useEffect(() => {
    if (!scrollReveal || reduced) return;
    const els = document.querySelectorAll("[data-cine-scene]");
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.cineScene);
            if (!Number.isNaN(idx)) reveal(idx);
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => observerRef.current?.observe(el));
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [scrollReveal, reveal, reduced]);

  const isActive = (index: number) => activeSet.has(index);

  return (
    <section
      className="cine-director"
      aria-label={ariaLabel}
      aria-live="polite"
    >
      {childArray.map((child, i) => {
        const cls = isActive(i) ? "cine-scene--active" : "cine-scene--pending";
        const hidden = !isActive(i) && !reduced;
        return (
          <div
            key={i}
            className={`cine-scene-wrap ${cls}`}
            data-cine-scene={String(i)}
          >
            {child}
          </div>
        );
      })}
    </section>
  );
}


