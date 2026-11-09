"use client";

import { useSyncExternalStore } from "react";
import { resolveMotionPolicy, type MotionPolicy } from "./policy";

/**
 * The policy the server renders with, so the first client render hydrates the
 * same markup. Browser-only signals are read afterwards via useSyncExternalStore.
 */
const SERVER_POLICY: MotionPolicy = resolveMotionPolicy({
  reducedMotion: false,
  hardwareConcurrency: 8,
  viewportWidth: 1440,
});

let cachedPolicy: MotionPolicy = SERVER_POLICY;

function readPolicy(): MotionPolicy {
  const next = resolveMotionPolicy({
    reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    hardwareConcurrency: navigator.hardwareConcurrency,
    saveData: (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
    viewportWidth: window.innerWidth,
  });
  const unchanged = (Object.keys(next) as (keyof MotionPolicy)[]).every(
    (key) => next[key] === cachedPolicy[key],
  );
  // Snapshots must be referentially stable between unchanged reads.
  if (!unchanged) cachedPolicy = next;
  return cachedPolicy;
}

function subscribe(onChange: () => void) {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  reducedMotion.addEventListener("change", onChange);
  window.addEventListener("resize", onChange);
  return () => {
    reducedMotion.removeEventListener("change", onChange);
    window.removeEventListener("resize", onChange);
  };
}

/**
 * Hydration-safe motion policy for decorative layers: the server (and the
 * first client render) gets the capable-device default, then the visitor's
 * real device signals apply without a hydration mismatch.
 */
export function useMotionPolicy(): MotionPolicy {
  return useSyncExternalStore(subscribe, readPolicy, () => SERVER_POLICY);
}
