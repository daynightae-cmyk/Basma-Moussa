/**
 * DeviceMotionPolicy
 *
 * Centralized motion/performance policy for the cinematic experience.
 * Single source of truth for:
 * - prefers-reduced-motion detection
 * - reduced animation durations
 * - whether GPU-heavy layers should be disabled
 *
 * Import this in client components instead of calling matchMedia ad-hoc.
 */
export interface MotionPolicy {
  reduced: boolean;
  preferReducedMotion: boolean;
  lowPower: boolean;
  durationMs: (base: number) => number;
}

let _cached: MotionPolicy | null = null;

export function getMotionPolicy(): MotionPolicy {
  if (_cached) return _cached;
  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  // Heuristic low-power: reduced motion OR very small viewport / many cores unknown.
  const lowPower =
    reduced ||
    (typeof window !== "undefined" &&
      window.innerWidth < 640 &&
      window.devicePixelRatio < 2);
  const policy: MotionPolicy = {
    reduced,
    preferReducedMotion: reduced,
    lowPower,
    durationMs: (base: number) => (reduced ? 0 : base),
  };
  _cached = policy;
  return policy;
}

export function resetMotionPolicyCache(): void {
  _cached = null;
}
