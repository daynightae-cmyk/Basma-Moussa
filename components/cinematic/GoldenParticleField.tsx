"use client";

import { useEffect, useState } from "react";

/**
 * GoldenParticleField
 *
 * Restrained atmospheric golden light filaments for broadcast-style depth.
 * Built with CSS/SVG only (no canvas/WebGL) so it stays cheap and works on
 * mobile. Respects reduced-motion (freezes to a static gentle field) and
 * unmounts cleanly on navigation.
 *
 * Honesty: this is decorative mood layer only — never presented as audio
 * visualization or live telemetry.
 */
interface GoldenParticleFieldProps {
  /** Density of visible filaments. Keep low for performance. */
  count?: number;
  /** Opacity of the field. */
  opacity?: number;
  ariaLabel?: string;
}

export function GoldenParticleField({
  count = 14,
  opacity = 0.06,
  ariaLabel,
}: GoldenParticleFieldProps) {
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className="golden-field"
      aria-hidden="true"
      aria-label={ariaLabel}
      style={opacity != null ? { opacity } : {}}
    >
      {[...Array(count)].map((_, i) => (
        <div
          key={i}
          className={`golden-thread golden-thread--${i % 4}`}
          style={
            reduced
              ? {}
              : {
                  left: `${10 + (i * 13) % 92}%`,
                  top: `${20 + (i * 7) % 70}%`,
                  animationDelay: `${i * 0.9}s`,
                  animationDuration: `${16 + (i % 10)}s`,
                }
          }
        />
      ))}
    </div>
  );
}
