/**
 * Pure helpers for mapping vertical scroll into horizontal journey progress.
 * No DOM ownership here — callers attach listeners and clean up on route change.
 */

export function clamp(value: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, value));
}

/**
 * Progress 0→1 while a tall pin section is sticky in the viewport.
 * `sectionHeight` should be the full scroll length of the pin spacer.
 */
export function verticalToHorizontalProgress(
  sectionTop: number,
  sectionHeight: number,
  viewportHeight: number,
): number {
  const travel = Math.max(1, sectionHeight - viewportHeight);
  const scrolled = clamp(-sectionTop, 0, travel);
  return scrolled / travel;
}

/** Translate a 0→1 progress into an X offset in panel units (0 → panels-1). */
export function progressToPanelOffset(progress: number, panelCount: number): number {
  if (panelCount <= 1) return 0;
  return clamp(progress) * (panelCount - 1);
}

export function nearestPanelIndex(progress: number, panelCount: number): number {
  if (panelCount <= 0) return 0;
  return Math.round(clamp(progress) * (panelCount - 1));
}

/** Target document Y so the sticky journey lands on a given panel index. */
export function panelIndexToScrollY(
  sectionOffsetTop: number,
  sectionHeight: number,
  viewportHeight: number,
  panelIndex: number,
  panelCount: number,
): number {
  const travel = Math.max(1, sectionHeight - viewportHeight);
  const progress = panelCount <= 1 ? 0 : clamp(panelIndex / (panelCount - 1));
  return sectionOffsetTop + travel * progress;
}

export function supportsScrollDrivenAnimations(): boolean {
  if (typeof CSS === "undefined" || typeof CSS.supports !== "function") return false;
  return (
    CSS.supports("animation-timeline: scroll()") ||
    CSS.supports("animation-timeline: view()")
  );
}
