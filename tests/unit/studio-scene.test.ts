import { describe, expect, it } from "vitest";

import {
  CAMERA_PRESETS,
  LIGHTING_PRESETS,
  SCENE_PRESETS,
  STAGE_FLOOR,
  cameraTransform,
  clampToFloor,
  isValidLayout,
  layoutFor,
  lightingForPreset,
  lightingVars,
  moveItem,
  normaliseAngle,
  rotateItem,
} from "@/lib/experience/studio-scene";

describe("virtual studio set", () => {
  it("every preset is a physically valid layout", () => {
    for (const preset of SCENE_PRESETS) {
      const items = layoutFor(preset.id);
      expect(items.length).toBeGreaterThanOrEqual(3);
      expect(isValidLayout(items)).toBe(true);
    }
  });

  it("returns independent copies so editing one set never mutates the preset", () => {
    const a = layoutFor("one-on-one");
    const b = layoutFor("one-on-one");
    a[0].x = 999;
    expect(b[0].x).not.toBe(999);
  });

  it("clamps furniture to the floor", () => {
    expect(clampToFloor(9999, -9999)).toEqual({ x: STAGE_FLOOR.maxX, z: STAGE_FLOOR.minZ });
  });

  it("blocks a move that would push one chair through another", () => {
    const items = layoutFor("one-on-one");
    const host = items.find((item) => item.id === "chair-host")!;
    const guest = items.find((item) => item.id === "chair-guest")!;
    const step = guest.x - host.x - 20;
    const moved = moveItem(items, "chair-host", step, 0);
    expect(moved.find((item) => item.id === "chair-host")!.x).toBe(host.x);
  });

  it("allows a legal move and rotation", () => {
    const items = layoutFor("one-on-one");
    const host = items.find((item) => item.id === "chair-host")!;
    const moved = moveItem(items, "chair-host", -16, 0);
    const next = moved.find((item) => item.id === "chair-host")!;
    expect(next.x).toBe(host.x - 16);

    const rotated = rotateItem(moved, "chair-host", 15);
    expect(rotated.find((item) => item.id === "chair-host")!.rotation).not.toBe(host.rotation);
  });

  it("keeps angles inside a readable range", () => {
    expect(normaliseAngle(370)).toBe(10);
    expect(normaliseAngle(-190)).toBe(170);
  });

  it("moves the camera transform for every preset", () => {
    for (const camera of CAMERA_PRESETS) {
      const transform = cameraTransform(camera.id);
      expect(transform).toContain("rotateX");
      expect(transform).toContain("rotateY");
      expect(transform).not.toContain("NaN");
    }
    expect(cameraTransform("master")).not.toBe(cameraTransform("overhead"));
  });
});

describe("studio lighting", () => {
  it("every preset produces bounded, distinct light variables", () => {
    for (const preset of LIGHTING_PRESETS) {
      const state = lightingForPreset(preset.id);
      const vars = lightingVars(state);
      expect(vars["--studio-key"]).toBe(preset.keyColor);
      const strength = Number(vars["--studio-key-strength"]);
      expect(strength).toBeGreaterThanOrEqual(0);
      expect(strength).toBeLessThanOrEqual(1);
    }
    expect(lightingVars(lightingForPreset("warm-broadcast"))).not.toEqual(
      lightingVars(lightingForPreset("midnight-cinema")),
    );
  });

  it("a slider change is reflected in the output variables", () => {
    const dim = lightingVars({ ...lightingForPreset("warm-broadcast"), key: 0.1 });
    const bright = lightingVars({ ...lightingForPreset("warm-broadcast"), key: 0.95 });
    expect(dim["--studio-key-strength"]).not.toBe(bright["--studio-key-strength"]);
  });
});
