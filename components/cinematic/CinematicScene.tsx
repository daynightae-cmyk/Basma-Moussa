"use client";

import { useRef, useEffect, type ReactNode } from "react";
import clsx from "clsx";

interface CinematicSceneProps {
  isActive: boolean;
  isPast: boolean;
  isNext: boolean;
  children: ReactNode;
  className?: string;
  sceneShift?: number;
}

export function CinematicScene({
  isActive,
  isPast,
  isNext,
  children,
  className,
  sceneShift = 1,
}: CinematicSceneProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isActive) {
          ref.current?.classList.add("is-active");
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isActive]);

  return (
    <div
      ref={ref}
      className={clsx(
        "cine-scene",
        isActive && "is-active",
        isPast && "is-past",
        isNext && "is-next",
        className
      )}
      style={{ "--scene-shift": sceneShift } as React.CSSProperties}
    >
      {children}
    </div>
  );
}
