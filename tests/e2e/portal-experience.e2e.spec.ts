import { test, expect, type Page } from "@playwright/test";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3100";

async function openUniverse(page: Page, locale: "ar" | "en") {
  // This suite exercises portals, not the intro. Set session state before hydration
  // so a delayed splash mount cannot appear after the initial visibility check.
  await page.addInitScript(() => sessionStorage.setItem("bm-splash-seen", "1"));
  await page.goto(`${BASE}/${locale}/media`);
  await expect(page.getByTestId("world-discovery")).toBeVisible();
  const skip = page.getByRole("button", { name: /تخطّي المقدمة|Skip intro/ });
  // The splash auto-dismisses after ~3s; click it if it's still showing, and
  // tolerate it detaching mid-click (auto-dismiss racing us).
  try {
    if (await skip.isVisible({ timeout: 1500 })) await skip.click();
  } catch {
    // Already gone.
  }
  await expect(skip).not.toBeVisible();
}

for (const locale of ["ar", "en"] as const) {
  test(`${locale}: discovery controls, keyboard focus and real destinations`, async ({ page }) => {
    await openUniverse(page, locale);
    const stage = page.getByTestId("world-discovery");
    const portal = stage.locator("a.portal-card");
    await expect(portal).toHaveAttribute("href", `/${locale}/programs/beyond-the-frame`);
    await portal.focus();
    await page.keyboard.press(locale === "ar" ? "ArrowLeft" : "ArrowRight");
    await expect(stage).toHaveAttribute("data-world", "legal");
    await expect(portal).toBeFocused();
    await expect(portal).toHaveAttribute("href", `/${locale}/legal-lens`);
    await page.getByRole("button", { name: locale === "ar" ? "العالم التالي" : "Next world", exact: true }).click();
    await expect(stage).toHaveAttribute("data-world", "documentary");
    await expect(portal).toHaveAttribute("href", `/${locale}/programs/city-voices`);
    await expect(page.locator("a a")).toHaveCount(0);
    await expect(page.getByTestId("portal-media")).toHaveCount(4);
    const search = page.getByRole("searchbox");
    await search.fill("zzznothingzzz");
    await expect(page.getByTestId("portal-media")).toHaveCount(0);
    await search.fill("");
    await expect(page.getByTestId("portal-media")).toHaveCount(4);
  });

  test(`${locale}: door opens, focuses arrival and preserves browser history`, async ({ page }, testInfo) => {
    await openUniverse(page, locale);
    const portal = page.getByTestId("world-discovery").locator("a.portal-card");
    await portal.focus();
    await page.keyboard.press("Enter");
    const transition = page.getByTestId("portal-transition");
    await expect(transition).toHaveAttribute("data-phase", "opening");
    await page.screenshot({ path: testInfo.outputPath("door-opening.png") });
    await expect(page).toHaveURL(`${BASE}/${locale}/programs/beyond-the-frame`);
    await expect(transition).toHaveCount(0);
    await expect(page.locator("#main h1, #main h2").first()).toBeFocused();
    await page.screenshot({ path: testInfo.outputPath("arrival.png") });
    await page.goBack();
    await expect(page).toHaveURL(`${BASE}/${locale}/media`);
    await expect(transition).toHaveCount(0);
    await expect(page.getByTestId("world-discovery")).toBeVisible();
  });

  test(`${locale}: Escape releases the overlay without cancelling navigation`, async ({ page }) => {
    await openUniverse(page, locale);
    await page.getByTestId("world-discovery").locator("a.portal-card").click();
    await expect(page.getByTestId("portal-transition")).toBeAttached();
    await page.keyboard.press("Escape");
    await expect(page.getByTestId("portal-transition")).toHaveCount(0);
    await expect(page).toHaveURL(`${BASE}/${locale}/programs/beyond-the-frame`);
  });

  test(`${locale}: reduced motion navigates directly with no decorative door`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await openUniverse(page, locale);
    await page.getByTestId("world-discovery").locator("a.portal-card").click();
    await expect(page).toHaveURL(`${BASE}/${locale}/programs/beyond-the-frame`);
    await expect(page.getByTestId("portal-transition")).toHaveCount(0);
  });

  for (const width of [360, 390, 768, 1024, 1440, 1920]) {
    test(`${locale}: discovery visual evidence at ${width}px`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await openUniverse(page, locale);
      const screen = page.getByTestId("world-discovery");
      for (let scene = 0; scene < 4; scene++) {
        await page.waitForFunction(() => {
          const image = document.querySelector<HTMLImageElement>('[data-testid="discovery-media"] img');
          return image?.complete && image.naturalWidth > 0;
        });
        const file = testInfo.outputPath(`discovery-${locale}-${width}-${scene + 1}.png`);
        await screen.screenshot({ path: file });
        await testInfo.attach(`world-${scene + 1}`, { path: file, contentType: "image/png" });
        expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
        await page.getByRole("button", { name: locale === "ar" ? "العالم التالي" : "Next world", exact: true }).click();
      }
    });
  }
}

test("mobile swipe selects a world without activating its link", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openUniverse(page, "en");
  const screen = page.getByTestId("world-discovery");
  const box = await screen.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box!.x + box!.width * 0.8, box!.y + 100);
  await page.mouse.down();
  await page.mouse.move(box!.x + box!.width * 0.2, box!.y + 100, { steps: 12 });
  await page.mouse.up();
  await expect(screen).toHaveAttribute("data-world", "legal");
  await expect(page).toHaveURL(`${BASE}/en/media`);
});
