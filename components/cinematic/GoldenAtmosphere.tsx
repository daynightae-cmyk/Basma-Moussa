"use client";

import { useRef } from "react";
import { useMotionPolicy } from "@/lib/motion/use-motion-policy";

interface GoldenAtmosphereProps {
  className?: string;
  enabled?: boolean;
}

export function GoldenAtmosphere({ className = "", enabled = true }: GoldenAtmosphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Device motion signals apply after hydration, so the server markup and the
  // first client render always agree (no dropped layer mid-hydration).
  const { particles } = useMotionPolicy();

  if (!enabled || !particles) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`golden-atmosphere ${className}`}
      aria-hidden="true"
      style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}
    >
      {/* Golden filament field */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: "absolute", inset: 0, opacity: 0.12 }}
      >
        <defs>
          <pattern id="golden-filament" width="200" height="200" patternUnits="userSpaceOnUse">
            <path d="M 100 0 Q 150 50 100 100 Q 50 150 0 100 Q -50 50 0 0" stroke="rgba(242, 215, 160, 0.55)" strokeWidth="1" fill="none" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#golden-filament)" />
      </svg>

      {/* Subtle golden glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(circle at 30% 40%, rgba(242, 215, 160, 0.08), transparent 60%)",
          animation: "golden-pulse 8s ease-in-out infinite",
        }}
      />

      <style jsx>{`
        @keyframes golden-pulse {
          0%, 100% { opacity: 0.12; transform: scale(1); }
          50% { opacity: 0.25; transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}
