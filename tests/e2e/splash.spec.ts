import { expect, test } from "@playwright/test";
import { openReady, skipIntro } from "./helpers";

test.describe("brand intro", () => {
  test("opens on a first visit and can be skipped immediately", async ({ page }) => {
    await page.goto("/ar", { waitUntil: "domcontentloaded" });

    const splash = page.locator(".splash");
    await expect(splash).toBeVisible({ timeout: 5_000 });
    const skip = page.getByRole("button", { name: "تخطّي المقدمة" });
    await expect(skip).toBeVisible();
    await skip.click();

    await expect(splash).toHaveCount(0, { timeout: 2_000 });
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(() => window.sessionStorage.getItem("bm-intro-v1")),
    ).toBe("1");
  });

  test("remembers the session and does not replay on reload", async ({ page }) => {
    await page.goto("/ar", { waitUntil: "domcontentloaded" });
    const splash = page.locator(".splash");
    await expect(splash).toBeVisible({ timeout: 5_000 });
    await page.getByRole("button", { name: "تخطّي المقدمة" }).click();
    await expect(splash).toHaveCount(0, { timeout: 2_000 });

    await page.reload({ waitUntil: "networkidle" });
    await expect(page.locator(".home-hero h1")).toBeVisible();
    await expect(page.locator(".splash")).toHaveCount(0);
  });

  test("?no-intro=1 suppresses the intro and cleans the URL", async ({ page }) => {
    await page.goto("/ar?no-intro=1", { waitUntil: "networkidle" });
    await expect(page.locator(".home-hero h1")).toBeVisible();
    await expect(page.locator(".splash")).toHaveCount(0);
    await expect(page).toHaveURL(/\/ar$/);
    expect(
      await page.evaluate(() => window.sessionStorage.getItem("bm-intro-v1")),
    ).toBe("1");
  });

  test("?replay=1 intentionally replays even after the session flag", async ({
    page,
  }) => {
    await skipIntro(page);
    await page.goto("/ar?replay=1", { waitUntil: "domcontentloaded" });
    await expect(page.locator(".splash")).toBeVisible({ timeout: 5_000 });
    await expect(page).toHaveURL(/\/ar$/);
  });

  test.describe("reduced motion", () => {
    test.use({ reducedMotion: "reduce" });

    test("skips the cinematic stage entirely and keeps the content", async ({
      page,
    }) => {
      await page.goto("/ar", { waitUntil: "networkidle" });
      await expect(page.locator(".home-hero h1")).toBeVisible();
      await expect(page.locator(".splash")).toHaveCount(0);
      expect(
        await page.evaluate(() => window.sessionStorage.getItem("bm-intro-v1")),
      ).toBe("1");
    });
  });
});

test.describe("hero composition", () => {
  test("keeps the Arabic hero copy clear of the portrait face", async ({ page }) => {
    await openReady(page, "/ar");
    const rect = await page.locator(".home-hero__content").boundingBox();
    const viewport = page.viewportSize();
    expect(rect).not.toBeNull();
    expect(viewport).not.toBeNull();
    if (!rect || !viewport) return;

    // The face sits in the left part of the portrait. Copy must live in the
    // right column and never cross the centre line.
    expect(rect.x).toBeGreaterThan(viewport.width / 2);
    expect(rect.x + rect.width).toBeLessThanOrEqual(viewport.width + 1);
    await expect(page.locator(".home-hero__chapter")).toContainText("01");
  });

  test("keeps the English hero copy in the right column too", async ({ page }) => {
    await openReady(page, "/en");
    const rect = await page.locator(".home-hero__content").boundingBox();
    const viewport = page.viewportSize();
    expect(rect).not.toBeNull();
    if (!rect || !viewport) return;
    expect(rect.x).toBeGreaterThan(viewport.width / 2);
  });
});
