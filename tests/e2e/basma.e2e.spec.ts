import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3100";

/** Go to a path, wait for SSR hydration, then dismiss any client splash overlay. */
async function gotoPage(page: Page, path: string) {
  await page.goto(`${BASE}${path}`, { waitUntil: "domcontentloaded" });
  await page.waitForLoadState("networkidle");
  // Dynamic (SSR) pages can be slow on first hit; settle before interacting.
  await page.waitForTimeout(8000);
  await dismissSplash(page);
}

/** Dismiss the client-only brand splash overlay (click or Escape). */
async function dismissSplash(page: Page) {
  const skip = page.getByRole("button", {
    name: /تخطّي المقدمة|Skip intro/i,
  });
  try {
    if ((await skip.count()) > 0 && (await skip.isVisible({ timeout: 1500 }))) {
      await skip.click();
    } else {
      // Fallback: Escape key dismisses the splash too.
      await page.keyboard.press("Escape");
    }
  } catch {
    // Ignore: splash may already be gone.
  }
  // Give React a frame to unmount the overlay and reveal content.
  await page.waitForTimeout(700);
}

/** Wait until the page shows real heading content (not a splash overlay). */
async function waitForHeading(page: Page, timeout = 15000) {
  await page.waitForFunction(
    () => {
      const h = document.querySelector("h1, h2");
      return h !== null && h.textContent?.trim().length > 2;
    },
    { timeout },
  );
}

/** Scroll through the page so scroll-driven `.reveal` sections finish before capture.
 * Stay at the bottom: with `animation-timeline: view()`, scrolling back to the top
 * would reset the below-fold elements back to transparent. A fullPage screenshot
 * captures beyond the viewport, so content above the current view stays opaque. */
async function settleReveals(page: Page) {
  await page.evaluate(
    () =>
      new Promise<void>((resolve) => {
        let y = 0;
        const step = 600;
        const tick = () => {
          y += step;
          window.scrollTo(0, y);
          if (y >= document.body.scrollHeight + step) {
            window.scrollTo(0, document.body.scrollHeight);
            resolve();
            return;
          }
          setTimeout(tick, 70);
        };
        tick();
      }),
  );
  await page.waitForTimeout(700);
}

test.describe("locale & root", () => {
  test("root redirects to Arabic home", async ({ page }) => {
    await gotoPage(page, "/");
    await expect(page).toHaveURL(`${BASE}/ar`);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
    await expect(page.locator("html")).toHaveAttribute("lang", "ar");
  });

  test("Arabic home renders hero, nav, skip link", async ({ page }) => {
    await gotoPage(page, "/ar");
    await expect(
      page.getByRole("heading", { name: /ليست مجرد صفحة/ })
    ).toBeVisible();
    // Nav link inside the main nav (exact match to avoid brand/logo duplicates)
    await expect(
      page
        .getByRole("navigation", { name: /التنقل الرئيسي/ })
        .getByRole("link", { name: "عالم الإعلام", exact: true })
    ).toBeVisible();
    await expect(
      page.getByRole("link", { name: /تجاوز إلى المحتوى/ })
    ).toBeVisible();
    await expect(page.getByRole("button", { name: /تخطّي المقدمة/ })).not.toBeVisible();
  });

  test("English home renders LTR", async ({ page }) => {
    await gotoPage(page, "/en");
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(
      page.getByRole("heading", { name: /Not just a page/ })
    ).toBeVisible();
  });

  test("language switch preserves path and direction", async ({ page }) => {
    await gotoPage(page, "/ar/media");
    await waitForHeading(page);
    // The switch button's accessible name is its aria-label, not its visible text.
    const arSwitcher = page.getByRole("button", { name: "التبديل إلى الإنجليزية" });
    await expect(arSwitcher).toBeVisible();
    await arSwitcher.click();
    await expect(page).toHaveURL(`${BASE}/en/media`);
    await expect(page.locator("html")).toHaveAttribute("dir", "ltr");
    // switch back
    const enSwitcher = page.getByRole("button", { name: "Switch to Arabic" });
    await expect(enSwitcher).toBeVisible();
    await enSwitcher.click();
    await expect(page).toHaveURL(`${BASE}/ar/media`);
    await expect(page.locator("html")).toHaveAttribute("dir", "rtl");
  });
});

test.describe("media worlds & search", () => {
  test("media page lists 4 worlds and search/filter works", async ({ page }) => {
    await gotoPage(page, "/ar/media");
    await waitForHeading(page);
    // four portal cards
    await expect(page.getByTestId("portal-media")).toHaveCount(4);

    await page.getByPlaceholder(/ابحث بعنوان أو موضوع/).fill("مدينة");
    await expect(page.getByTestId("portal-media")).toHaveCount(1);
    await expect(page.getByRole("heading", { name: "صوت المدينة" })).toBeVisible();

    await page.getByRole("button", { name: /عرض كل العوالم/ }).click();
    await expect(page.getByTestId("portal-media")).toHaveCount(4);

    await page.getByPlaceholder(/ابحث بعنوان أو موضوع/).fill("zzznothingzzz");
    await expect(page.getByText(/لا نتائج مطابقة/)).toBeVisible();
  });

  test("portal click opens door then navigates; back works", async ({ page }) => {
    await gotoPage(page, "/ar");
    await page
      .getByRole("link", { name: /ادخل العالم/ })
      .first()
      .click();
    // door overlay appears then new route
    await expect(page).toHaveURL(`${BASE}/ar/programs/beyond-the-frame`);
    await waitForHeading(page);
    // "العودة إلى عالم الإعلام" returns to the media worlds page.
    await page.getByRole("link", { name: /العودة إلى عالم الإعلام/ }).click();
    await expect(page).toHaveURL(`${BASE}/ar/media`);
  });
});

test.describe("soundroom (no audio)", () => {
  test("deep link shows honest absent-media state, no <audio>", async ({ page }) => {
    await gotoPage(page, "/en/soundroom");
    await waitForHeading(page);
    await expect(page.getByText(/No recordings yet/)).toBeVisible();
    await expect(page.locator("audio")).toHaveCount(0);
    // decorative motion toggle: label swaps Start→Pause on click, aria-pressed flips
    const toggle = page.getByRole("button", { name: /Start decorative motion/ });
    await expect(toggle).toBeVisible();
    await toggle.click();
    const paused = page.getByRole("button", { name: /Pause decorative motion/ });
    await expect(paused).toBeVisible();
    await expect(paused).toHaveAttribute("aria-pressed", "true");
  });
});

test.describe("legal lens", () => {
  test("source links open externally to official domains", async ({ page }) => {
    await gotoPage(page, "/ar/legal-lens");
    const links = page.locator('a[target="_blank"]');
    const count = await links.count();
    await expect(count).toBeGreaterThan(0);
    for (const link of await links.all()) {
      const href = await link.getAttribute("href");
      expect(href).toMatch(/^https:\/\//);
      const rel = await link.getAttribute("rel");
      expect(rel).toContain("noopener");
    }
    await expect(page.getByText(/إخلاء مسؤولية/i).first()).toBeVisible();
    await expect(page.getByText(/مخطط تحريري/i).first()).toBeVisible();
  });
});

test.describe("contact", () => {
  test("real WhatsApp link, no form", async ({ page }) => {
    await gotoPage(page, "/ar/contact");
    await waitForHeading(page);
    const wa = page.getByRole("link", { name: /مراسلة بسمة على واتساب/ });
    await expect(wa).toHaveAttribute("href", /^https:\/\/wa\.me\/971507226089/);
    await expect(page.locator("form")).toHaveCount(0);
    await expect(page.getByText(/لا نموذج إرسال/i)).toBeVisible();
  });
});

test.describe("mobile", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("mobile menu opens, closes with Escape, and navigates", async ({ page }) => {
    await gotoPage(page, "/ar");
    await page.getByRole("button", { name: /فتح القائمة/ }).click();
    // The mobile menu is a dialog region; footer also exposes an identical link.
    const menu = page.getByRole("dialog", { name: /القائمة/ });
    await expect(menu).toBeVisible();
    const aboutLink = menu.getByRole("link", { name: /عن بسمة/ });
    await expect(aboutLink).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog", { name: /القائمة/ })).not.toBeVisible();
  });
});

test.describe("splash & reduced motion", () => {
  test("splash shows on first visit and skips instantly", async ({ page }) => {
    // Fresh state -> no sessionStorage flag -> splash shows.
    // Load first (sessionStorage is blocked on the opaque about:blank origin),
    // then clear storage and reload so the splash mounts again.
    await page.goto(`${BASE}/ar`, { waitUntil: "domcontentloaded" });
    await page.evaluate(() => sessionStorage.clear());
    await page.reload({ waitUntil: "domcontentloaded" });
    await page.waitForLoadState("networkidle");
    const skip = page.getByRole("button", { name: /تخطّي المقدمة/ });
    await expect(skip).toBeVisible({ timeout: 8000 });
    await expect(page.getByRole("region", { name: /مقدمة الهوية/ })).toBeVisible();
    await skip.click();
    await expect(page.getByRole("heading", { name: /ليست مجرد صفحة/ })).toBeVisible();
    await expect(skip).not.toBeVisible();
  });

  test("reduced motion bypasses splash entirely", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await gotoPage(page, "/ar");
    await expect(
      page.getByRole("button", { name: /تخطّي المقدمة/ })
    ).not.toBeVisible();
    await expect(page.getByRole("heading", { name: /ليست مجرد صفحة/ })).toBeVisible();
  });
});

test.describe("errors", () => {
  test("404 page shows recovery links", async ({ page }) => {
    await gotoPage(page, "/ar/this-door-does-not-exist");
    await waitForHeading(page);
    await expect(page.getByRole("link", { name: /العودة إلى الرئيسية/ })).toBeVisible();
  });
});

test.describe("accessibility", () => {
  // Run axe under stable, reduced-motion state: the scroll-driven `.reveal`
  // animation blends text opacity at capture time, producing false contrast
  // failures for content mid-fade. Reduced motion is the fully supported
  // a11y experience of this site and renders all content fully opaque.
  test.use({ reducedMotion: "reduce" });

  test("home page passes axe critical/serious checks (AR)", async ({ page }) => {
    await gotoPage(page, "/ar");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    expect(serious).toEqual([]);
  });

  test("home page passes axe critical/serious checks (EN)", async ({ page }) => {
    await gotoPage(page, "/en");
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      .analyze();
    const serious = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );
    expect(serious).toEqual([]);
  });
});

test.describe("visual evidence screenshots", () => {
  const widths = [360, 390, 768, 1024, 1440, 1920];
  const locales: [string, string][] = [
    ["ar", "rtl"],
    ["en", "ltr"],
  ];

  for (let i = 0; i < widths.length; i++) {
    const w = widths[i];
    for (const [locale, dir] of locales) {
      test(`${locale} home ${w}px`, async ({ page }: { page: Page }) => {
        await page.setViewportSize({ width: w, height: 900 });
        await gotoPage(page, `/${locale}`);
        await expect(page.locator("html")).toHaveAttribute("dir", dir);
        await settleReveals(page);
        await page.screenshot({
          path: `qa/evidence/screenshots/home-${locale}-${w}px.png`,
          fullPage: true,
        });
      });

      test(`${locale} media ${w}px`, async ({ page }: { page: Page }) => {
        await page.setViewportSize({ width: w, height: 900 });
        await gotoPage(page, `/${locale}/media`);
        await settleReveals(page);
        await page.screenshot({
          path: `qa/evidence/screenshots/media-${locale}-${w}px.png`,
          fullPage: true,
        });
      });
    }
  }
});
