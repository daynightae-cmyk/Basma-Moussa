import { expect, test } from "@playwright/test";
import {
  expectNoHorizontalOverflow,
  openReady,
  skipIntro,
} from "./helpers";

test.describe("media explorer", () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
    await page.goto("/en/media", { waitUntil: "networkidle" });
  });

  test("searches, filters, empties and resets truthfully", async ({ page }) => {
    const count = page.locator(".explorer__count");
    await expect(count).toHaveText("4 worlds");

    await page.getByRole("searchbox").fill("law");
    await expect(count).toHaveText("1 world");
    const results = page.getByLabel("Media world results");
    await expect(results.getByRole("link")).toHaveCount(1);
    await expect(results.getByText("The Legal Lens")).toBeVisible();

    await page.getByRole("searchbox").fill("");
    await page.getByRole("button", { name: "Documentary" }).click();
    await expect(
      page.getByRole("button", { name: "Documentary" }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(count).toHaveText("1 world");
    await expect(results.getByText("City Voices")).toBeVisible();

    await page.getByRole("searchbox").fill("zzzz");
    await expect(page.getByText("No matching worlds")).toBeVisible();
    await expect(count).toHaveText("0 worlds");

    await page.locator(".no-results").getByRole("button").click();
    await expect(count).toHaveText("4 worlds");
    await expect(page.getByRole("searchbox")).toHaveValue("");
    await expect(page.getByRole("button", { name: "All worlds" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
  });
});

test.describe("soundroom honesty", () => {
  test("offers a decorative waveform and no pretend player", async ({ page }) => {
    await openReady(page, "/en/soundroom");
    await expect(page.locator("audio")).toHaveCount(0);
    await expect(page.getByText("Decorative waveform — not audio")).toBeVisible();
    await expect(
      page.getByText("This is a visual waveform only. No audio file is published yet."),
    ).toBeVisible();
    await expect(page.getByText("Not available yet").first()).toBeVisible();

    const toggle = page.getByRole("button", { name: "Pause decorative motion" });
    await expect(toggle).toHaveAttribute("aria-pressed", "true");
    await toggle.click();
    await expect(
      page.getByRole("button", { name: "Start decorative motion" }),
    ).toHaveAttribute("aria-pressed", "false");
    await expect(page.locator(".wave")).toHaveClass(/is-paused/);
  });
});

test.describe("legal lens", () => {
  test("links only to official entry points and states the limits", async ({
    page,
  }) => {
    await openReady(page, "/en/legal-lens");
    const sourceLinks = page.locator(".source-card__link");
    await expect(sourceLinks).toHaveCount(4);
    for (const href of await sourceLinks.evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") ?? ""),
    )) {
      expect(href.startsWith("https://")).toBe(true);
    }
    await expect(sourceLinks.first()).toHaveAttribute("target", "_blank");
    await expect(sourceLinks.first()).toHaveAttribute("rel", "noopener noreferrer");
    await expect(page.getByText("Educational notice").first()).toBeVisible();
    await expect(page.getByText("We claim no public API or live feed.")).toBeVisible();
    await expect(page.getByText("Explanation is not advice.")).toBeVisible();
  });
});

test.describe("contact honesty", () => {
  test("uses the approved WhatsApp channel and publishes no form or email", async ({
    page,
  }) => {
    await openReady(page, "/ar/contact");
    const whatsapp = page.locator('a[href^="https://wa.me/971507226089"]');
    expect(await whatsapp.count()).toBeGreaterThan(0);
    for (const href of await whatsapp.evaluateAll((links) =>
      links.map((link) => link.getAttribute("href") ?? ""),
    )) {
      expect(href).toContain("text=");
    }
    await expect(page.locator("form")).toHaveCount(0);
    await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  });
});

test.describe("responsive surface", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("the home contact image really loads at 390px", async ({ page }) => {
    await openReady(page, "/en");
    const image = page.locator(".contact-panel__media img");
    await image.scrollIntoViewIfNeeded();
    await expect
      .poll(
        () =>
          image.evaluate(
            (node) =>
              (node as HTMLImageElement).complete &&
              (node as HTMLImageElement).naturalWidth > 0,
          ),
        { timeout: 10_000 },
      )
      .toBe(true);
  });

  test("no route creates horizontal overflow at 390px", async ({ page }) => {
    const routes = [
      "/ar",
      "/en",
      "/ar/media",
      "/en/media",
      "/ar/legal-lens",
      "/ar/soundroom",
      "/ar/programs/beyond-the-frame",
      "/en/programs/city-voices",
      "/ar/about",
      "/en/contact",
      "/ar/privacy",
      "/en/stories",
    ];
    await skipIntro(page);
    for (const route of routes) {
      await page.goto(route, { waitUntil: "networkidle" });
      await expectNoHorizontalOverflow(page);
    }
  });
});
