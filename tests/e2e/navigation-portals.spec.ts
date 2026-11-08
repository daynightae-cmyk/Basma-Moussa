import { expect, test } from "@playwright/test";
import { skipIntro } from "./helpers";

test.describe("navigation", () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
  });

  test("switches locale while keeping the same page and direction", async ({
    page,
  }) => {
    await page.goto("/en/about", { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(
      page.locator(".site-nav__link[aria-current='page']"),
    ).toContainText("About");

    await page.getByRole("link", { name: /Switch to Arabic/ }).click();
    await expect(page).toHaveURL(/\/ar\/about$/);
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("h1")).toContainText("بين الحكاية والقانون");
  });

  test("opens and closes the mobile menu, restoring focus", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en/about", { waitUntil: "networkidle" });
    const toggle = page.locator(".menu-toggle");
    const panel = page.locator("#mobile-navigation");

    await toggle.click();
    await expect(toggle).toHaveAttribute("aria-expanded", "true");
    await expect(panel).toBeVisible();
    await expect
      .poll(() =>
        page.evaluate(() => document.activeElement?.textContent ?? ""),
      )
      .toContain("Media Universe");

    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await expect(toggle).toBeFocused();
  });

  test("closes the mobile menu after choosing a destination", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/en", { waitUntil: "networkidle" });
    await page.getByRole("button", { name: "Open menu" }).click();
    const panel = page.locator("#mobile-navigation");
    await panel.getByRole("link", { name: /Soundroom/ }).click();
    await expect(page).toHaveURL(/\/en\/soundroom$/);
    await expect(panel).toBeHidden();
  });
});

test.describe("portal doors", () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
  });

  test("opens the door overlay, navigates, and returns cleanly", async ({ page }) => {
    await page.goto("/ar", { waitUntil: "networkidle" });
    const card = page.locator("a[data-portal-link]").first();
    await card.scrollIntoViewIfNeeded();

    await card.click({ noWaitAfter: true });
    const door = page.locator(".door--active");
    await expect(door).toBeVisible({ timeout: 2_000 });
    await expect(door.locator(".door__label")).toHaveText("خارج الإطار");
    await expect(door.locator(".door__panel img")).toHaveCount(2);

    await expect(page).toHaveURL(/\/ar\/programs\/beyond-the-frame$/);
    await expect(
      page.getByRole("heading", { level: 1, name: /خارج الإطار/ }),
    ).toBeVisible();
    await expect(door).toHaveCount(0, { timeout: 3_000 });

    await page.goBack();
    await expect(page).toHaveURL(/\/ar$/);
    await expect(page.locator(".home-hero h1")).toBeVisible();
    await expect(page.locator(".door")).toHaveCount(0);
  });

  test("the secondary worlds are real links with the same door treatment", async ({
    page,
  }) => {
    await page.goto("/en/media", { waitUntil: "networkidle" });
    const stories = page.locator("a[data-portal-link]").filter({
      hasText: "Stories & Archive",
    });
    await stories.scrollIntoViewIfNeeded();
    await stories.click({ noWaitAfter: true });
    await expect(page.locator(".door--active")).toBeVisible({ timeout: 2_000 });
    await expect(page).toHaveURL(/\/en\/stories$/);
    await expect(page.getByRole("heading", { level: 1 })).toContainText(
      "Stories are told when they are ready",
    );
  });

  test("direct deep links load the full world without an intro", async ({ page }) => {
    await page.goto("/en/programs/the-legal-lens", { waitUntil: "networkidle" });
    await expect(page.locator(".splash")).toHaveCount(0);
    await expect(page.locator("h1")).toContainText("The Legal Lens");
    await expect(page.locator(".site-nav__link[aria-current='page']")).toContainText(
      "Media Universe",
    );
  });
});
