"use client";

import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Shared scene orchestration — staggered / scroll-reveal wrappers.
 * CSS owns motion; JS only coordinates visibility state.
 */
interface CinematicSceneDirectorProps {
  children: React.ReactNode;
  stagger?: number;
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
  const rootRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const [reduced, setReduced] = useState(false);
  const [activeSet, setActiveSet] = useState<Set<number>>(new Set());

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const reveal = useCallback((index: number) => {
    setActiveSet((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  useEffect(() => {
    if (reduced) {
      setActiveSet(new Set(childArray.map((_, i) => i)));
      return;
    }
    if (scrollReveal) return;
    const timers: ReturnType<typeof setTimeout>[] = [];
    childArray.forEach((_, i) => {
      timers.push(setTimeout(() => reveal(i), i * stagger));
    });
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [reduced, scrollReveal, stagger, reveal, childArray.length]);

  useEffect(() => {
    if (!scrollReveal || reduced) {
      if (reduced && scrollReveal) {
        setActiveSet(new Set(childArray.map((_, i) => i)));
      }
      return;
    }
    const root = rootRef.current;
    if (!root) return;
    const els = root.querySelectorAll<HTMLElement>("[data-cine-scene]");
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = Number((entry.target as HTMLElement).dataset.cineScene);
          if (!Number.isNaN(idx)) reveal(idx);
          observerRef.current?.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );
    els.forEach((el) => observerRef.current?.observe(el));
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [scrollReveal, reveal, reduced, childArray.length]);

  return (
    <section
      ref={rootRef}
      className="cine-director"
      aria-label={ariaLabel}
    >
      {childArray.map((child, i) => {
        const cls = activeSet.has(i)
          ? "cine-scene--active"
          : "cine-scene--pending";
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
