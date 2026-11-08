"use client";

import {
  Children,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

/**
 * Shared scene orchestration — staggered / scroll-reveal wrappers.
 * CSS owns motion; JS only coordinates visibility state.
 *
 * Honesty: this coordinates reveal timing only. It never fetches or simulates
 * content, and it fully defers to prefers-reduced-motion.
 */
interface CinematicSceneDirectorProps {
  children: ReactNode;
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
  const childArray = useMemo(() => Children.toArray(children), [children]);
  const rootRef = useRef<HTMLElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Computed at render like the rest of the codebase — no window access during SSR.
  const reduced =
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // With reduced motion every scene is active immediately, so no effect-driven
  // state updates are required at all. The initial set is derived once here.
  const [activeSet, setActiveSet] = useState<Set<number>>(() =>
    reduced ? new Set(childArray.map((_, i) => i)) : new Set()
  );

  const reveal = useCallback((index: number) => {
    setActiveSet((prev) => {
      if (prev.has(index)) return prev;
      const next = new Set(prev);
      next.add(index);
      return next;
    });
  }, []);

  useEffect(() => {
    if (reduced || scrollReveal) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    childArray.forEach((_, i) => {
      timers.push(setTimeout(() => reveal(i), i * stagger));
    });
    return () => {
      timers.forEach(clearTimeout);
    };
  }, [reduced, scrollReveal, stagger, reveal, childArray.length]);

  useEffect(() => {
    if (!scrollReveal || reduced) return;

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
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );

    els.forEach((el) => observerRef.current?.observe(el));
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
    };
  }, [scrollReveal, reveal, reduced, childArray.length]);

  return (
    <section ref={rootRef} className="cine-director" aria-label={ariaLabel}>
      {childArray.map((child, i) => {
        const cls = activeSet.has(i) ? "cine-scene--active" : "cine-scene--pending";
        return (
          <div key={i} className={`cine-scene-wrap ${cls}`} data-cine-scene={String(i)}>
            {child}
          </div>
        );
      })}
    </section>
  );
}
