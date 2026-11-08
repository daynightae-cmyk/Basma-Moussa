import { expect, test, type Page } from "@playwright/test";

// Separate startup duration from actual interaction assertions on slow machines.
test.setTimeout(90_000);

async function dismissIntro(page: Page) {
  const skip = page.getByRole("button", { name: /Skip intro|تخطّي المقدمة/i });
  try {
    if (await skip.isVisible({ timeout: 1200 })) await skip.click();
  } catch {
    // The first-visit intro may have already ended.
  }
}

test("cinematic five-panel desktop journey responds to vertical scrolling", async ({ page }, info) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.addInitScript(() => sessionStorage.setItem("bm-splash-seen", "1"));
  await page.goto("/en");
  await dismissIntro(page);
  const stage = page.getByTestId("horizontal-story-stage");
  await expect(stage).toHaveCount(1);
  await expect(stage.locator(".story-panel")).toHaveCount(5);
  const sticky = stage.locator(".story-stage__sticky");
  await expect(sticky).toHaveCSS("position", "sticky");
  const track = stage.locator(".story-stage__track");
  await page.evaluate(() => {
    const el = document.querySelector<HTMLElement>('[data-testid="horizontal-story-stage"]');
    if (!el) throw new Error("Missing cinematic stage");
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + (el.offsetHeight - window.innerHeight) * 0.68, behavior: "instant" });
  });
  await expect.poll(() => track.evaluate((element) => element.style.transform)).toMatch(/translate3d\(-/);
  await stage.screenshot({ path: info.outputPath("horizontal-story-desktop.png") });
});

test("Arabic mobile journey offers usable snap navigation without horizontal page overflow", async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.addInitScript(() => sessionStorage.setItem("bm-splash-seen", "1"));
  await page.goto("/ar");
  await dismissIntro(page);
  const stage = page.getByTestId("horizontal-story-stage");
  await expect(stage).toHaveClass(/story-stage--mobile/);
  await expect(stage.locator(".story-panel")).toHaveCount(5);
  await stage.locator(".story-stage__dot").nth(2).click();
  await expect(stage.locator(".story-stage__progress-label")).toContainText("03 / 05");
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 2)).toBe(true);
  await stage.screenshot({ path: info.outputPath("horizontal-story-mobile-ar.png") });
});

test("reduced motion renders an accessible five-panel vertical journey", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.addInitScript(() => sessionStorage.setItem("bm-splash-seen", "1"));
  await page.goto("/en");
  const stage = page.getByTestId("horizontal-story-stage");
  await expect(stage).toHaveClass(/story-stage--reduced/);
  await expect(stage.locator(".story-panel")).toHaveCount(5);
  await expect(stage.getByRole("link")).toHaveCount(5);
  await expect(stage.locator(".story-stage__track")).toHaveCount(0);
});
