"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";

import type { Dictionary } from "@/lib/i18n/dictionary";
import type { Locale } from "@/lib/i18n/config";
import { localizedPath, pathWithoutLocale } from "@/lib/i18n/paths";
import { BRAND } from "@/lib/site";
import { playCue } from "@/lib/audio/cue";
import {
  PHASE_STAGE,
  SPLASH_REPLAY_EVENT,
  SPLASH_STORAGE_KEY,
  initialSplashState,
  isSplashVisible,
  nextAdvanceDelay,
  shouldPlaySplash,
  splashReducer,
  type SplashPhase,
} from "@/lib/experience/splash-sequence";

interface BrandThreadSplashProps {
  locale: Locale;
  dict: Dictionary;
}

const PHASE_COPY: Record<SplashPhase, (dict: Dictionary) => string> = {
  INITIAL: (dict) => dict.splash.threadStage,
  THREAD: (dict) => dict.splash.threadStage,
  MASK: (dict) => dict.splash.maskStage,
  SCALES: (dict) => dict.splash.scalesStage,
  LOGO: (dict) => dict.splash.logoStage,
  INVITATION: (dict) => dict.splash.logoStage,
  ENTERING: (dict) => dict.splash.entering,
  COMPLETE: () => "",
};

/**
 * One continuous brand film: a single golden thread draws the theatrical mask,
 * then the scales of justice, then converges into the approved logo before the
 * invitation appears.
 *
 * The approved master PNG is shown untouched at the reveal — the drawn symbols
 * are a thread sketch used only as a reveal, never a traced logo.
 */
export function BrandThreadSplash({ locale, dict }: BrandThreadSplashProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [state, setState] = useState(initialSplashState);
  const [soundOn, setSoundOn] = useState(false);
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });
  const rootRef = useRef<HTMLDivElement>(null);
  const enterRef = useRef<HTMLButtonElement>(null);
  const intentRef = useRef<"skip" | "enter" | null>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const visible = isSplashVisible(state);
  const stage = PHASE_STAGE[state.phase];

  // Boot: decide whether this visit gets the intro, and lock scrolling while it plays.
  useEffect(() => {
    // One-time client gate: the intro is browser-only, so this must not run during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let seen = false;
    let replayRequested = false;
    try {
      seen = sessionStorage.getItem(SPLASH_STORAGE_KEY) === "1";
      replayRequested = new URLSearchParams(window.location.search).get("replay") === "1";
      if (replayRequested) {
        sessionStorage.removeItem(SPLASH_STORAGE_KEY);
        window.history.replaceState(null, "", window.location.pathname);
      }
    } catch {
      // Private modes can block sessionStorage: play once for this load.
    }
    if (!shouldPlaySplash({ seen, replayRequested, reducedMotion: reduced })) {
      setState({ phase: "COMPLETE", dismissed: false });
      return;
    }
    previousFocus.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
  }, []);

  // Automatic phase advance. INVITATION waits for a human, so it has no timer.
  useEffect(() => {
    if (!mounted) return;
    const delay = nextAdvanceDelay(state.phase);
    if (delay === null) return;
    const timer = setTimeout(() => {
      setState((previous) => splashReducer(previous, { type: "advance" }));
    }, delay);
    return () => clearTimeout(timer);
  }, [mounted, state.phase]);

  // Release the page once the intro is done, and follow the visitor's intent.
  useEffect(() => {
    if (state.phase !== "COMPLETE") return;
    document.body.style.overflow = "";
    try {
      sessionStorage.setItem(SPLASH_STORAGE_KEY, "1");
    } catch {
      // ignore
    }
    const intent = intentRef.current;
    intentRef.current = null;
    if (intent === "enter" && pathWithoutLocale(pathname) !== "/") {
      router.push(localizedPath(locale));
      return;
    }
    if (intent !== null) {
      const main = document.getElementById("main");
      if (main) main.focus({ preventScroll: true });
    }
    previousFocus.current?.focus?.({ preventScroll: true });
  }, [locale, pathname, router, state.phase]);

  // Focus stays inside the intro while it is a modal surface.
  useEffect(() => {
    if (!visible || state.phase !== "INVITATION") return;
    enterRef.current?.focus({ preventScroll: true });
  }, [state.phase, visible]);

  // Replay from anywhere on the page without a reload.
  useEffect(() => {
    const onReplay = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      intentRef.current = null;
      previousFocus.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      setState((previous) => splashReducer(previous, { type: "replay" }));
    };
    window.addEventListener(SPLASH_REPLAY_EVENT, onReplay);
    return () => window.removeEventListener(SPLASH_REPLAY_EVENT, onReplay);
  }, []);

  const skip = useCallback(() => {
    intentRef.current = "skip";
    setState((previous) => splashReducer(previous, { type: "skip" }));
  }, []);

  const enter = useCallback(() => {
    if (state.phase !== "INVITATION") return;
    if (soundOn) playCue("enter");
    intentRef.current = "enter";
    setState((previous) => splashReducer(previous, { type: "enter" }));
  }, [soundOn, state.phase]);

  useEffect(() => {
    if (state.phase === "LOGO" && soundOn) playCue("logo");
  }, [soundOn, state.phase]);

  const toggleSound = useCallback(() => {
    setSoundOn((previous) => {
      if (!previous) playCue("thread");
      return !previous;
    });
  }, []);

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        skip();
        return;
      }
      if (event.key !== "Tab" || !rootRef.current) return;
      const focusable = rootRef.current.querySelectorAll<HTMLElement>(
        "button:not([disabled])",
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [skip],
  );

  const handleMagnet = useCallback((event: React.PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType !== "mouse") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 6;
    setMagnet({ x, y });
  }, []);

  if (!mounted || !visible) return null;

  const phaseCopy = PHASE_COPY[state.phase](dict);

  return (
    <div
      ref={rootRef}
      className="splash"
      data-phase={state.phase}
      data-stage={stage}
      role="dialog"
      aria-modal="true"
      aria-label={dict.common.introLabel}
      onKeyDown={onKeyDown}
    >
      <div className="splash__aurora" aria-hidden="true" />
      <div className="splash__controls">
        <button
          type="button"
          className="splash__sound"
          aria-pressed={soundOn}
          onClick={toggleSound}
          aria-label={soundOn ? dict.splash.soundOff : dict.splash.soundOn}
          title={soundOn ? dict.splash.soundOff : dict.splash.soundOn}
        >
          <span aria-hidden="true">{soundOn ? "◉" : "◎"}</span>
          <span className="splash__sound-text">
            {soundOn ? dict.splash.soundOff : dict.splash.soundOn}
          </span>
        </button>
        <button type="button" className="splash__skip" onClick={skip}>
          {dict.common.skipIntro}
        </button>
      </div>

      <div className="splash__stage">
        <div className="splash__halo" aria-hidden="true" />

        <svg
          className="splash__svg"
          viewBox="0 0 600 620"
          data-reveal={stage >= 4}
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <linearGradient id="bm-thread-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f7ecd6" />
              <stop offset="45%" stopColor="#d7ab62" />
              <stop offset="100%" stopColor="#b38642" />
            </linearGradient>
            <radialGradient id="bm-thread-aura" cx="50%" cy="45%" r="55%">
              <stop offset="0%" stopColor="rgba(242, 215, 160, 0.28)" />
              <stop offset="100%" stopColor="rgba(242, 215, 160, 0)" />
            </radialGradient>
          </defs>

          <circle className="splash__aura" cx="300" cy="300" r="280" fill="url(#bm-thread-aura)" />

          {/* Scene A — the first thread */}
          <g className="splash__layer splash__layer--thread" data-on={stage >= 1}>
            <path
              className="splash__thread-base"
              d="M 96 118 C 176 150 214 118 236 158 C 258 198 196 236 214 282 C 232 330 300 336 300 372"
            />
            <path
              className="splash__thread-draw"
              style={{ animationDelay: "120ms" }}
              d="M 96 118 C 176 150 214 118 236 158 C 258 198 196 236 214 282 C 232 330 300 336 300 372"
            />
          </g>

          {/* Scene B — the mask */}
          <g className="splash__layer splash__layer--mask" data-on={stage >= 2}>
            <path
              className="splash__thread-draw"
              style={{ animationDelay: "60ms" }}
              d="M 236 158 C 268 122 332 122 364 158 C 396 196 392 268 356 314 C 330 348 270 348 244 314 C 208 268 204 196 236 158 Z"
            />
            <path
              className="splash__thread-draw splash__thread-draw--fine"
              style={{ animationDelay: "360ms" }}
              d="M 250 230 Q 268 214 288 230"
            />
            <path
              className="splash__thread-draw splash__thread-draw--fine"
              style={{ animationDelay: "460ms" }}
              d="M 312 230 Q 332 214 350 230"
            />
            <path
              className="splash__thread-draw splash__thread-draw--fine"
              style={{ animationDelay: "560ms" }}
              d="M 272 296 Q 300 316 328 296"
            />
            <path
              className="splash__thread-draw splash__thread-draw--fine"
              style={{ animationDelay: "660ms" }}
              d="M 208 262 C 182 284 176 312 178 338"
            />
            <path
              className="splash__thread-draw splash__thread-draw--fine"
              style={{ animationDelay: "720ms" }}
              d="M 392 262 C 418 284 424 312 422 338"
            />
          </g>

          {/* Scene C — the scales of justice */}
          <g className="splash__layer splash__layer--scales" data-on={stage >= 3}>
            <path
              className="splash__thread-draw"
              style={{ animationDelay: "40ms" }}
              d="M 300 372 L 300 528"
            />
            <path
              className="splash__thread-draw"
              style={{ animationDelay: "200ms" }}
              d="M 198 400 L 402 400"
            />
            <path
              className="splash__thread-draw splash__thread-draw--fine"
              style={{ animationDelay: "320ms" }}
              d="M 198 400 L 176 452 M 198 400 L 220 452"
            />
            <path
              className="splash__thread-draw splash__thread-draw--fine"
              style={{ animationDelay: "420ms" }}
              d="M 402 400 L 380 452 M 402 400 L 424 452"
            />
            <g className="splash__pan splash__pan--left" data-on={stage >= 3}>
              <path className="splash__thread-draw" d="M 160 452 Q 198 486 236 452" />
            </g>
            <g className="splash__pan splash__pan--right" data-on={stage >= 3}>
              <path className="splash__thread-draw" d="M 364 452 Q 402 486 440 452" />
            </g>
            <path
              className="splash__thread-draw splash__thread-draw--fine"
              style={{ animationDelay: "660ms" }}
              d="M 258 542 Q 300 528 342 542"
            />
            {/* Subtle modern Egyptian stepping motif, drawn as a line rhythm. */}
            <path
              className="splash__thread-draw splash__thread-draw--motif"
              style={{ animationDelay: "780ms" }}
              d="M 268 560 L 284 560 L 284 552 L 300 552 L 300 560 L 316 560 L 316 552 L 332 552"
            />
          </g>

          {/* Scene D — the thread converges toward the mark */}
          <g className="splash__layer splash__layer--converge" data-on={stage >= 4}>
            <path className="splash__thread-draw" d="M 300 560 C 300 500 300 420 300 344" />
            <circle className="splash__burst" cx="300" cy="300" r="10" />
          </g>
        </svg>

        <div className="splash__mark" data-on={stage >= 4}>
          <Image
            src="/brand/basma-logo-master.png"
            alt={dict.splash.logoAlt}
            width={800}
            height={800}
            sizes="(max-width: 600px) 62vw, 340px"
            className="splash__mark-img"
            priority
          />
          <span className="splash__sheen" aria-hidden="true" />
        </div>

        <div className="splash__copy" data-on={stage >= 5}>
          <p className="splash__wordmark">
            <span className="wordmark-ar">{BRAND.nameAr}</span>
            <span className="splash__wordmark-sep" aria-hidden="true">·</span>
            <span className="wordmark-en">{BRAND.name}</span>
          </p>
          <button
            ref={enterRef}
            type="button"
            className="splash__enter"
            onClick={enter}
            onPointerMove={handleMagnet}
            onPointerLeave={() => setMagnet({ x: 0, y: 0 })}
            style={
              {
                "--mx": `${magnet.x}px`,
                "--my": `${magnet.y}px`,
              } as React.CSSProperties
            }
          >
            <span className="splash__enter-label">{dict.splash.enter}</span>
            <svg className="splash__enter-arrow" viewBox="0 0 32 16" aria-hidden="true">
              <path d="M1 8h28M22 1l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {phaseCopy}
      </p>
    </div>
  );
}
