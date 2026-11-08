"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { getDictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { BRAND_LOGO } from "@/lib/content/assets";
import { BRAND } from "@/lib/site";

const SESSION_KEY = "bm-intro-v1";
const AUTO_DISMISS_MS = 2600;

function readSessionFlag(): boolean {
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function writeSessionFlag(): void {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Storage can be unavailable in strict privacy modes; the intro still works.
  }
}

const THREADS: { d: string; delay: string; soft?: boolean }[] = [
  {
    d: "M152 392 C 104 302, 132 176, 246 120 C 330 80, 414 120, 436 190",
    delay: "0.18s",
  },
  {
    d: "M128 352 C 96 252, 158 142, 268 104 C 346 78, 402 106, 424 158",
    delay: "0.24s",
    soft: true,
  },
  {
    d: "M182 420 C 128 328, 158 216, 258 168",
    delay: "0.3s",
    soft: true,
  },
  {
    d: "M356 168 C 390 186, 408 208, 398 230 C 391 244, 379 246, 383 255 C 388 264, 397 262, 392 273 C 387 284, 374 283, 373 294 C 372 309, 392 314, 404 340 C 414 361, 402 380, 378 386",
    delay: "0.34s",
  },
  {
    d: "M406 296 C 384 300, 374 318, 376 340 C 378 370, 400 390, 428 390 C 456 390, 474 370, 474 340 C 474 318, 462 300, 440 296",
    delay: "0.66s",
  },
  {
    d: "M392 312 H456 M392 328 H456 M398 344 C 412 354, 436 354, 450 344",
    delay: "0.76s",
    soft: true,
  },
  {
    d: "M425 355 L 425 400 M402 400 H 448",
    delay: "0.82s",
    soft: true,
  },
  {
    d: "M482 362 C 494 362, 494 330, 508 330 C 522 330, 522 362, 536 362 C 550 362, 550 336, 562 336",
    delay: "0.86s",
  },
  {
    d: "M250 452 C 268 434, 286 430, 300 448 C 314 430, 332 434, 350 452 C 332 462, 314 462, 300 474 C 286 462, 268 462, 250 452 Z",
    delay: "0.94s",
    soft: true,
  },
  {
    d: "M208 440 L 232 408 L 256 440 M220 440 L 232 424 L 244 440",
    delay: "0.98s",
    soft: true,
  },
];

export function BrandThreadSplash({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale);
  const [visible, setVisible] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const dismissTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leavingRef = useRef(false);

  const clearTimers = useCallback(() => {
    if (dismissTimer.current) {
      clearTimeout(dismissTimer.current);
      dismissTimer.current = null;
    }
    if (removeTimer.current) {
      clearTimeout(removeTimer.current);
      removeTimer.current = null;
    }
  }, []);

  const dismiss = useCallback(
    (focusMain: boolean) => {
      if (leavingRef.current) return;
      leavingRef.current = true;
      clearTimers();
      setLeaving(true);
      document.documentElement.classList.remove("intro-pending");
      removeTimer.current = setTimeout(() => {
        setVisible(false);
        if (focusMain) {
          document.getElementById("main")?.focus({ preventScroll: true });
        }
      }, 280);
    },
    [clearTimers],
  );

  useEffect(() => {
    let replay = false;
    try {
      const params = new URLSearchParams(window.location.search);
      replay = params.get("replay") === "1";
      if (replay) {
        params.delete("replay");
        const query = params.toString();
        window.history.replaceState(
          null,
          "",
          `${window.location.pathname}${query ? `?${query}` : ""}${window.location.hash}`,
        );
      }
    } catch {
      replay = false;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      writeSessionFlag();
      document.documentElement.classList.remove("intro-pending");
      return;
    }

    if (readSessionFlag() && !replay) {
      document.documentElement.classList.remove("intro-pending");
      return;
    }

    writeSessionFlag();
    leavingRef.current = false;
    // The intro decision depends on browser-only state (sessionStorage,
    // matchMedia, replay query). It can only be resolved after mount.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setVisible(true);
    document.documentElement.classList.remove("intro-pending");

    dismissTimer.current = setTimeout(() => dismiss(false), AUTO_DISMISS_MS);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" || event.key === "Enter") {
        event.preventDefault();
        dismiss(true);
      }
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      clearTimers();
      document.documentElement.classList.remove("intro-pending");
    };
  }, [clearTimers, dismiss]);

  if (!visible) return null;

  return (
    <div
      className={`splash${leaving ? " splash--leaving" : ""}`}
      role="region"
      aria-label={dict.common.introLabel}
      onClick={() => dismiss(false)}
    >
      <button
        type="button"
        className="splash__skip"
        onClick={(event) => {
          event.stopPropagation();
          dismiss(true);
        }}
      >
        {dict.common.skipIntro}
      </button>

      <div className="splash__stage" aria-hidden="true">
        <div className="splash__halo" />
        <svg
          className="splash__threads"
          viewBox="0 0 600 600"
          fill="none"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="splash-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#F7E7C6" />
              <stop offset="0.45" stopColor="#F2D7A0" />
              <stop offset="0.8" stopColor="#D7AB62" />
              <stop offset="1" stopColor="#9A6F31" />
            </linearGradient>
          </defs>
          {THREADS.map((thread) => (
            <path
              key={thread.d}
              className={`splash__thread${thread.soft ? " splash__thread--soft" : ""}`}
              d={thread.d}
              pathLength={1}
              style={{ "--delay": thread.delay } as CSSProperties}
            />
          ))}
        </svg>

        <div className="splash__mark">
          <Image
            src={BRAND_LOGO.src}
            alt=""
            width={BRAND_LOGO.width}
            height={BRAND_LOGO.height}
            sizes="(max-width: 640px) 54vw, 330px"
            priority
          />
          <span className="splash__sheen" />
        </div>
      </div>

      <div className="splash__caption">
        <span className="splash__wordmark">
          {locale === "ar" ? BRAND.nameAr : BRAND.name}
        </span>
        <span className="splash__product">Media Universe</span>
        <span className="splash__tagline">{BRAND.tagline[locale]}</span>
      </div>

      <p className="splash__hint">{dict.common.introHint}</p>
    </div>
  );
}
