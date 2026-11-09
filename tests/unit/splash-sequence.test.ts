import { describe, expect, it } from "vitest";

import {
  PHASE_STAGE,
  initialSplashState,
  isSplashVisible,
  nextAdvanceDelay,
  shouldPlaySplash,
  splashReducer,
  type SplashState,
} from "@/lib/experience/splash-sequence";

function advanceTo(phase: SplashState["phase"]): SplashState {
  let state = initialSplashState;
  while (state.phase !== phase) {
    const next = splashReducer(state, { type: "advance" });
    if (next.phase === state.phase) throw new Error(`stuck at ${state.phase}`);
    state = next;
  }
  return state;
}

describe("golden thread splash choreography", () => {
  it("runs one deterministic chain from the first thread to the invitation", () => {
    let state = initialSplashState;
    const seen: string[] = [state.phase];
    for (let step = 0; step < 8; step += 1) {
      const next = splashReducer(state, { type: "advance" });
      if (next.phase === state.phase) break;
      state = next;
      seen.push(state.phase);
    }
    expect(seen).toEqual(["INITIAL", "THREAD", "MASK", "SCALES", "LOGO", "INVITATION"]);
  });

  it("holds at the invitation until a human enters", () => {
    const invitation = advanceTo("INVITATION");
    expect(nextAdvanceDelay("INVITATION")).toBeNull();
    expect(splashReducer(invitation, { type: "advance" })).toEqual(invitation);
  });

  it("refuses to enter before the logo is revealed", () => {
    const mask = advanceTo("MASK");
    expect(splashReducer(mask, { type: "enter" }).phase).toBe("MASK");
  });

  it("enters only from the invitation and completes after the transition", () => {
    const entering = splashReducer(advanceTo("INVITATION"), { type: "enter" });
    expect(entering.phase).toBe("ENTERING");
    expect(isSplashVisible(entering)).toBe(true);
    const complete = splashReducer(entering, { type: "finishEntering" });
    expect(complete.phase).toBe("COMPLETE");
    expect(isSplashVisible(complete)).toBe(false);
  });

  it("completes on the entrance timer, not only on a manual finish", () => {
    const entering = splashReducer(advanceTo("INVITATION"), { type: "enter" });
    expect(nextAdvanceDelay("ENTERING")).toBeGreaterThan(0);
    const finished = splashReducer(entering, { type: "advance" });
    expect(finished.phase).toBe("COMPLETE");
    expect(finished.dismissed).toBe(true);
    expect(isSplashVisible(finished)).toBe(false);
  });

  it("skips from any scene straight to complete", () => {
    for (const phase of ["INITIAL", "THREAD", "MASK", "SCALES", "LOGO", "INVITATION"] as const) {
      const state = splashReducer(advanceTo(phase), { type: "skip" });
      expect(state.phase).toBe("COMPLETE");
      expect(state.dismissed).toBe(true);
    }
  });

  it("keeps drawing stages cumulative so earlier scenes never vanish early", () => {
    const order = ["INITIAL", "THREAD", "MASK", "SCALES", "LOGO", "INVITATION"] as const;
    const stages = order.map((phase) => PHASE_STAGE[phase]);
    expect(stages).toEqual([...stages].sort((a, b) => a - b));
    expect(stages[stages.length - 1]).toBe(5);
  });

  it("plays once per session, replays on request, and never for reduced motion", () => {
    expect(shouldPlaySplash({ seen: false, replayRequested: false, reducedMotion: false })).toBe(true);
    expect(shouldPlaySplash({ seen: true, replayRequested: false, reducedMotion: false })).toBe(false);
    expect(shouldPlaySplash({ seen: true, replayRequested: true, reducedMotion: false })).toBe(true);
    expect(shouldPlaySplash({ seen: false, replayRequested: true, reducedMotion: true })).toBe(false);
  });
});
