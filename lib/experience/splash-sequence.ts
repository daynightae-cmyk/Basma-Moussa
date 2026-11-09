/**
 * Deterministic choreography for the golden-thread brand intro.
 *
 * The splash is one continuous story: a single thread draws a theatrical mask,
 * then the justice scales, then converges into the approved logo before the
 * invitation appears. This module owns the ordering and the guards so the
 * component only renders a phase — it never decides what may follow what.
 */

export const SPLASH_PHASES = [
  "INITIAL",
  "THREAD",
  "MASK",
  "SCALES",
  "LOGO",
  "INVITATION",
  "ENTERING",
  "COMPLETE",
] as const;

export type SplashPhase = (typeof SPLASH_PHASES)[number];

/** Which drawing stage the SVG shows (monotonic; used for cumulative reveals). */
export const PHASE_STAGE: Record<SplashPhase, number> = {
  INITIAL: 0,
  THREAD: 1,
  MASK: 2,
  SCALES: 3,
  LOGO: 4,
  INVITATION: 5,
  ENTERING: 5,
  COMPLETE: 6,
};

/** Milliseconds each automatic phase holds before advancing. */
export const PHASE_DURATION: Partial<Record<SplashPhase, number>> = {
  INITIAL: 220,
  THREAD: 1700,
  MASK: 1500,
  SCALES: 1600,
  LOGO: 1400,
  ENTERING: 950,
};

/** Invitation waits for a human: it has no automatic advance. */
const AUTO_CHAIN: SplashPhase[] = [
  "INITIAL",
  "THREAD",
  "MASK",
  "SCALES",
  "LOGO",
  "INVITATION",
];

export type SplashEvent =
  | { type: "advance" }
  | { type: "skip" }
  | { type: "enter" }
  | { type: "finishEntering" }
  | { type: "replay" };

export interface SplashState {
  phase: SplashPhase;
  /** True once the visitor asked to leave the intro; used for exit animation. */
  dismissed: boolean;
}

export const initialSplashState: SplashState = {
  phase: "INITIAL",
  dismissed: false,
};

export function advanceSplash(state: SplashState): SplashState {
  // The entrance transition ends the intro on its own timer.
  if (state.phase === "ENTERING") return { phase: "COMPLETE", dismissed: true };
  const index = AUTO_CHAIN.indexOf(state.phase);
  if (index === -1) return state;
  const next = AUTO_CHAIN[index + 1];
  if (!next) return state;
  return { ...state, phase: next };
}

export function splashReducer(state: SplashState, event: SplashEvent): SplashState {
  switch (event.type) {
    case "advance":
      return advanceSplash(state);
    case "skip":
      if (state.phase === "COMPLETE") return state;
      return { phase: "COMPLETE", dismissed: true };
    case "enter":
      // Entering is only legal from the invitation: the logo must be revealed.
      if (state.phase !== "INVITATION") return state;
      return { phase: "ENTERING", dismissed: false };
    case "finishEntering":
      if (state.phase !== "ENTERING") return state;
      return { phase: "COMPLETE", dismissed: true };
    case "replay":
      return { phase: "INITIAL", dismissed: false };
    default:
      return state;
  }
}

export function isSplashVisible(state: SplashState): boolean {
  return state.phase !== "COMPLETE";
}

/** Auto-advance delay for the current phase, or null when waiting on the visitor. */
export function nextAdvanceDelay(phase: SplashPhase): number | null {
  return PHASE_DURATION[phase] ?? null;
}

export interface SplashGate {
  seen: boolean;
  replayRequested: boolean;
  reducedMotion: boolean;
}

/**
 * Reduced motion skips the intro outright; a returning visitor inside the same
 * session is not shown it again. Everything else plays once.
 */
export function shouldPlaySplash({ seen, replayRequested, reducedMotion }: SplashGate): boolean {
  if (reducedMotion) return false;
  if (replayRequested) return true;
  return !seen;
}

export const SPLASH_STORAGE_KEY = "bm-splash-seen";

/** In-page replay request, so the intro can be re-shown without a page reload. */
export const SPLASH_REPLAY_EVENT = "bm-splash:replay";
