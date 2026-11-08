import { expect, test } from "@playwright/test";
import { skipIntro } from "./helpers";

declare global {
  interface Window {
    __perf?: { lcp: number; cls: number };
  }
}

test.describe("performance budget", () => {
  test("the cinematic home stays inside a measured LCP/CLS budget", async ({
    page,
  }) => {
    await skipIntro(page);
    await page.addInitScript(() => {
      window.__perf = { lcp: 0, cls: 0 };
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          window.__perf!.lcp = Math.max(
            window.__perf!.lcp,
            entry.startTime,
          );
        }
      }).observe({ type: "largest-contentful-paint", buffered: true });
      new PerformanceObserver((list) => {
        type LayoutShiftEntry = PerformanceEntry & {
          hadRecentInput?: boolean;
          value?: number;
        };
        for (const entry of list.getEntries() as LayoutShiftEntry[]) {
          if (!entry.hadRecentInput && typeof entry.value === "number") {
            window.__perf!.cls += entry.value;
          }
        }
      }).observe({ type: "layout-shift", buffered: true });
    });

    await page.goto("/ar", { waitUntil: "networkidle" });
    await expect(page.locator(".home-hero h1")).toBeVisible();
    await page.waitForTimeout(800);

    const metrics = await page.evaluate(() => window.__perf);
    expect(metrics?.lcp).toBeGreaterThan(0);
    expect(metrics?.lcp).toBeLessThan(5_000);
    expect(metrics?.cls).toBeLessThan(0.15);

    const heroLoaded = await page
      .locator(".home-hero__media img")
      .evaluate(
        (node) =>
          (node as HTMLImageElement).complete &&
          (node as HTMLImageElement).naturalWidth > 0,
      );
    expect(heroLoaded).toBe(true);
  });
});
