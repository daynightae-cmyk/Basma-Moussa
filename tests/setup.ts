import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

afterEach(() => {
  cleanup();
  window.sessionStorage.clear();
  document.documentElement.className = "";
});

/**
 * jsdom does not implement matchMedia. The app uses it to decide whether
 * cinematic motion is allowed, so tests get a deterministic "motion allowed"
 * default that individual tests can override.
 */
if (typeof window !== "undefined" && !window.matchMedia) {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string): MediaQueryList =>
      ({
        matches: false,
        media: query,
        onchange: null,
        addListener: () => {},
        removeListener: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
      }) as MediaQueryList,
  });
}

if (typeof window !== "undefined") {
  window.scrollTo = () => {};
}
