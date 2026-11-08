"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import type { Dictionary } from "@/lib/i18n/dictionary";

interface BrandThreadSplashProps {
  /** Kept for API stability; all copy is driven by the dictionary. */
  locale?: string;
  dict: Dictionary;
}

/**
 * Brand intro: golden threads trace an abstract feminine profile, microphone
 * and waveform, then resolve into the exact approved logo PNG.
 *
 * Honesty contract: the animated contour is an approximation used purely as a
 * reveal effect; the final mark is the immutable user-supplied master PNG.
 * Never claimed to be a vector trace of the logo.
 */
export function BrandThreadSplash({ dict }: BrandThreadSplashProps) {
  const [mounted, setMounted] = useState(false);
  const [phase, setPhase] = useState<"threads" | "mark" | "gone">("threads");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const keyRef = useRef<((e: KeyboardEvent) => void) | null>(null);

  const dismiss = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setPhase("gone");
    try {
      sessionStorage.setItem("bm-splash-seen", "1");
    } catch {
      // ignore
    }
    setTimeout(() => {
      if (document.body) document.body.style.overflow = "";
    }, 300);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let shouldShow = true;
    try {
      if (sessionStorage.getItem("bm-splash-seen") === "1") shouldShow = false;
      if (
        new URLSearchParams(window.location.search).get("replay") === "1"
      ) {
        shouldShow = true;
        sessionStorage.removeItem("bm-splash-seen");
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch {
      // sessionStorage unavailable in some private modes: show once per load.
    }
    if (reduced || !shouldShow) {
      setPhase("gone");
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    keyRef.current = onKey;
    timerRef.current = setTimeout(dismiss, 3000);

    return () => {
      window.removeEventListener("keydown", onKey);
      if (timerRef.current) clearTimeout(timerRef.current);
      if (document.body) document.body.style.overflow = "";
    };
  }, [dismiss]);

  if (!mounted) return null;
  if (phase === "gone") return null;

  const skipLabel = dict.common.skipIntro;
  const hint = dict.common.introHint;

  return (
    <div
      className="splash"
      data-phase={phase}
      role="region"
      aria-label={dict.common.introLabel}
    >
      <button
        className="splash__skip"
        onClick={dismiss}
        aria-label={skipLabel}
        title={skipLabel}
      >
        {skipLabel}
      </button>

      <div className="splash__stage">
        <div className="splash__horizon" aria-hidden="true" />

        <svg
          className="splash__svg"
          viewBox="0 0 500 500"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="bm-thread-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f2d7a0" />
              <stop offset="60%" stopColor="#d7ab62" />
              <stop offset="100%" stopColor="#b38642" />
            </linearGradient>
          </defs>

          {/* Hair sweep (abstract, flowing profile) */}
          <path
            className="splash__path splash__path--hair"
            d="M 90 230 Q 150 150 250 190 Q 330 230 310 310 Q 270 350 210 330 Q 150 310 110 250"
            stroke="url(#bm-thread-gradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            pathLength="1"
          />
          {/* Face/jaw contour */}
          <path
            className="splash__path splash__path--face"
            d="M 310 310 Q 350 330 345 390 Q 330 430 290 430 Q 260 430 230 390"
            stroke="url(#bm-thread-gradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            pathLength="1"
          />
          {/* Microphone capsule */}
          <path
            className="splash__path splash__path--mic"
            d="M 210 380 Q 250 360 250 440 Q 210 460 170 440 Q 170 360 210 380"
            stroke="url(#bm-thread-gradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            pathLength="1"
          />
          <path
            className="splash__path splash__path--mic-stand"
            d="M 230 440 Q 230 470 260 490"
            stroke="url(#bm-thread-gradient)"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            pathLength="1"
          />
          {/* Audio waveform */}
          <path
            className="splash__path splash__path--wave"
            d="M 100 420 Q 140 380 180 420 T 260 420 T 340 420"
            stroke="url(#bm-thread-gradient)"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
            pathLength="1"
          />
          {/* Lotus accent (tiny, under the mic) */}
          <path
            className="splash__path splash__path--lotus"
            d="M 230 410 Q 215 395 230 380 Q 245 395 230 410"
            stroke="url(#bm-thread-gradient)"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            pathLength="1"
          />
        </svg>

        <div className="splash__mark">
          <Image
            src="/brand/basma-logo-master.png"
            alt=""
            width={800}
            height={800}
            className="splash__mark-img"
            priority
          />
          <div className="splash__sheen" aria-hidden="true" />
        </div>

        <h2 id="bm-splash-title" className="splash__title" tabIndex={-1}>
          {dict.common.introLabel}
        </h2>
        <p className="splash__hint">{hint}</p>
      </div>
    </div>
  );
}
