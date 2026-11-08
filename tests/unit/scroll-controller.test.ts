import { describe, expect, it } from "vitest";
import {
  clampProgress,
  pinHeightMultiplier,
  progressToTranslateX,
  sceneIndexFromProgress,
} from "@/lib/experience/scroll-controller";

describe("scroll-controller", () => {
  it("clamps progress to 0..1", () => {
    expect(clampProgress({ scrolled: -10, scrollable: 100 })).toBe(0);
    expect(clampProgress({ scrolled: 50, scrollable: 100 })).toBe(0.5);
    expect(clampProgress({ scrolled: 200, scrollable: 100 })).toBe(1);
    expect(clampProgress({ scrolled: 10, scrollable: 0 })).toBe(0);
  });

  it("maps progress to LTR and RTL translations", () => {
    expect(progressToTranslateX(0.5, 1000, false)).toBe(-500);
    expect(progressToTranslateX(0.5, 1000, true)).toBe(500);
    expect(progressToTranslateX(0, 1000, false)).toBe(-0);
    expect(progressToTranslateX(1, 800, false)).toBe(-800);
  });

  it("resolves scene index from progress", () => {
    expect(sceneIndexFromProgress(0, 5)).toBe(0);
    expect(sceneIndexFromProgress(0.2, 5)).toBe(1);
    expect(sceneIndexFromProgress(0.99, 5)).toBe(4);
    expect(sceneIndexFromProgress(1, 5)).toBe(4);
    expect(sceneIndexFromProgress(0.5, 1)).toBe(0);
  });

  it("returns a pin height multiplier of at least 1", () => {
    expect(pinHeightMultiplier(5)).toBe(5);
    expect(pinHeightMultiplier(0)).toBe(1);
  });
});
