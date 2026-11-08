/**
 * One shared policy decides how much cinematic machinery a device may run.
 * It is a pure function so it can be unit-tested and reused by every scene
 * (hero slider, portal doors, frequency sculpture, particles).
 */

export type MotionPolicyInput = {
  reducedMotion: boolean;
  hardwareConcurrency?: number;
  saveData?: boolean;
  coarsePointer?: boolean;
  viewportWidth?: number;
};

export type MotionPolicy = {
  /** The visitor explicitly asked for less motion. */
  reducedMotion: boolean;
  /** Constrained device: few cores, data saver or a small screen. */
  lowPower: boolean;
  /** Light filaments and particle trails are allowed. */
  particles: boolean;
  /** Pointer-driven depth and camera drift are allowed. */
  parallax: boolean;
  /** Slides may advance on their own. */
  autoAdvance: boolean;
  /** Cinematic transitions (as opposed to instant swaps) are allowed. */
  cinematic: boolean;
};

export const SCENE_READING_MS = 9000;

export function resolveMotionPolicy(input: MotionPolicyInput): MotionPolicy {
  const cores = input.hardwareConcurrency ?? 8;
  const width = input.viewportWidth ?? 1440;
  const lowPower = Boolean(input.saveData) || cores <= 4 || width < 760;
  const reducedMotion = Boolean(input.reducedMotion);

  return {
    reducedMotion,
    lowPower,
    particles: !reducedMotion && !lowPower,
    parallax: !reducedMotion && !lowPower,
    autoAdvance: !reducedMotion && !lowPower && width >= 760,
    cinematic: !reducedMotion,
  };
}
