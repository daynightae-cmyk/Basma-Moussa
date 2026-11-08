import { describe, expect, it } from "vitest";

import {
  clamp,
  nearestPanelIndex,
  panelIndexToScrollY,
  progressToPanelOffset,
  supportsScrollDrivenAnimations,
  verticalToHorizontalProgress,
} from "@/lib/experience/scroll-controller";

describe("scroll-controller", () => {
  describe("clamp", () => {
    it("clamps below the min to the min", () => {
      expect(clamp(-5, 0, 10)).toBe(0);
    });
    it("clamps above the max to the max", () => {
      expect(clamp(15, 0, 10)).toBe(10);
    });
    it("returns the value when already in range", () => {
      expect(clamp(4, 0, 10)).toBe(4);
    });
    it("defaults min to 0 and max to 1", () => {
      expect(clamp(0.5)).toBe(0.5);
      expect(clamp(-1)).toBe(0);
      expect(clamp(2)).toBe(1);
    });
  });

  describe("verticalToHorizontalProgress", () => {
    it("returns 0 before the section enters", () => {
      expect(verticalToHorizontalProgress(100, 500, 300)).toBe(0);
    });
    it("returns 1 when fully traveled", () => {
      expect(verticalToHorizontalProgress(-300, 500, 300)).toBe(1);
    });
    it("returns a fractional progress mid-travel", () => {
      expect(verticalToHorizontalProgress(-100, 500, 300)).toBe(0.5);
    });
    it("guards against zero travel", () => {
      expect(verticalToHorizontalProgress(0, 100, 200)).toBe(0);
    });
  });

  describe("progressToPanelOffset", () => {
    it("maps 0 to 0 and 1 to panels - 1", () => {
      expect(progressToPanelOffset(0, 5)).toBe(0);
      expect(progressToPanelOffset(1, 5)).toBe(4);
    });
    it("maps fractional progress proportionally", () => {
      expect(progressToPanelOffset(0.5, 5)).toBe(2);
    });
    it("returns 0 for a single panel", () => {
      expect(progressToPanelOffset(1, 1)).toBe(0);
    });
  });

  describe("nearestPanelIndex", () => {
    it("resolves panel indexes from progress", () => {
      expect(nearestPanelIndex(0, 5)).toBe(0);
      expect(nearestPanelIndex(0.2, 5)).toBe(1);
      expect(nearestPanelIndex(0.99, 5)).toBe(4);
      expect(nearestPanelIndex(1, 5)).toBe(4);
    });
    it("returns 0 for a single panel", () => {
      expect(nearestPanelIndex(0.5, 1)).toBe(0);
    });
  });

  describe("panelIndexToScrollY", () => {
    it("returns section top for the first panel", () => {
      expect(panelIndexToScrollY(100, 500, 300, 0, 5)).toBe(100);
    });
    it("returns the bottom-aligned target for the last panel", () => {
      expect(panelIndexToScrollY(100, 500, 300, 4, 5)).toBe(300);
    });
    it("returns section top for a single panel", () => {
      expect(panelIndexToScrollY(100, 500, 300, 0, 1)).toBe(100);
    });
  });

  describe("supportsScrollDrivenAnimations", () => {
    it("returns a boolean", () => {
      expect(typeof supportsScrollDrivenAnimations()).toBe("boolean");
    });
  });
});
