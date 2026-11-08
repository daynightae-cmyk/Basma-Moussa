import { expect, type Page } from "@playwright/test";

/**
 * Skip the brand intro before the first paint by marking the session flag.
 * Tests that examine the intro itself must not call this helper.
 */
export async function skipIntro(page: Page): Promise<void> {
  await page.addInitScript(() => {
    try {
      window.sessionStorage.setItem("bm-intro-v1", "1");
    } catch {
      // Storage may be unavailable; the app still renders.
    }
  });
}

export async function openReady(page: Page, path: string): Promise<void> {
  await skipIntro(page);
  await page.goto(path, { waitUntil: "networkidle" });
  await expect(page.locator(".splash")).toHaveCount(0);
}

export async function expectNoHorizontalOverflow(page: Page): Promise<void> {
  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth - window.innerWidth,
  );
  expect(overflow, `horizontal overflow on ${page.url()}`).toBeLessThanOrEqual(1);
}

export async function expectLoadedImages(page: Page): Promise<void> {
  const broken = await page.evaluate(() =>
    [...document.images]
      .filter((image) => image.complete && image.naturalWidth === 0)
      .map((image) => image.currentSrc || image.src),
  );
  expect(broken, "images that failed to decode").toEqual([]);
}
