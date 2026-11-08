import { describe, expect, it } from "vitest";
import {
  initialPortalMachine,
  isPortalActive,
  portalReducer,
  type PortalMachine,
  type PortalRequest,
} from "@/lib/experience/portal-machine";

const request: PortalRequest = {
  href: "/ar/programs/beyond-the-frame",
  sourcePath: "/ar/media",
  src: "/media/04-interview-studio.webp",
  label: "خارج الكادر",
  objectPosition: "50% 40%",
  lowPower: false,
};
function start(): PortalMachine {
  return portalReducer(initialPortalMachine, { type: "start", id: 1, request });
}
function expanding(): PortalMachine {
  return portalReducer(start(), { type: "prepared", id: 1 });
}

describe("portal door lifecycle", () => {
  it("retains the selected image and shared geometry", () => {
    const state = start();
    expect(state.phase).toBe("preparing");
    expect(state.request).toEqual(request);
  });
  it("waits for real arrival after expansion instead of guessing from a timer", () => {
    const waiting = portalReducer(expanding(), { type: "expanded", id: 1 });
    expect(waiting.phase).toBe("waiting");
    expect(portalReducer(waiting, { type: "opened", id: 1 })).toEqual(waiting);
  });
  it("opens only after ready content is reported", () => {
    const waiting = portalReducer(expanding(), { type: "expanded", id: 1 });
    const opened = portalReducer(waiting, { type: "ready", id: 1 });
    expect(opened.phase).toBe("opening");
    expect(opened.ready).toBe(true);
  });
  it("allows a fast route to arrive before the image finishes expanding", () => {
    const ready = portalReducer(expanding(), { type: "ready", id: 1 });
    expect(ready.phase).toBe("expanding");
    expect(portalReducer(ready, { type: "expanded", id: 1 }).phase).toBe("opening");
  });
  it("preserves early readiness even in preparing", () => {
    const ready = portalReducer(start(), { type: "ready", id: 1 });
    const next = portalReducer(ready, { type: "prepared", id: 1 });
    expect(portalReducer(next, { type: "expanded", id: 1 }).phase).toBe("opening");
  });
  it("arrives and completes only in sequence", () => {
    let state = portalReducer(expanding(), { type: "ready", id: 1 });
    state = portalReducer(state, { type: "expanded", id: 1 });
    state = portalReducer(state, { type: "opened", id: 1 });
    expect(state.phase).toBe("arriving");
    state = portalReducer(state, { type: "finished", id: 1 });
    expect(state.phase).toBe("complete");
    expect(isPortalActive(state.phase)).toBe(false);
  });
  it("ignores callbacks from an interrupted previous door", () => {
    const next = portalReducer(start(), { type: "start", id: 2, request });
    expect(portalReducer(next, { type: "expanded", id: 1 })).toEqual(next);
    expect(portalReducer(next, { type: "timeout", id: 1 })).toEqual(next);
  });
  it("does not revive a cancelled overlay", () => {
    const cancelled = portalReducer(expanding(), { type: "cancel", id: 1 });
    expect(cancelled.phase).toBe("cancelled");
    expect(portalReducer(cancelled, { type: "ready", id: 1 })).toEqual(cancelled);
  });
  it("releases slow transitions without claiming success", () => {
    const timedOut = portalReducer(expanding(), { type: "timeout", id: 1 });
    expect(timedOut.phase).toBe("timed-out");
    expect(isPortalActive(timedOut.phase)).toBe(false);
    expect(portalReducer(timedOut, { type: "ready", id: 1 })).toEqual(timedOut);
  });
  it("allows dismissing the timeout notice and starting another door", () => {
    const timedOut = portalReducer(start(), { type: "timeout", id: 1 });
    const dismissed = portalReducer(timedOut, { type: "cancel", id: 1 });
    expect(dismissed.phase).toBe("cancelled");
    expect(portalReducer(dismissed, { type: "start", id: 2, request }).phase).toBe("preparing");
  });
});
