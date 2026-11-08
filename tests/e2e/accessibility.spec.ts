import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { skipIntro } from "./helpers";

const ROUTES = [
  "/ar",
  "/ar/media",
  "/ar/legal-lens",
  "/ar/soundroom",
  "/ar/stories",
  "/ar/studio",
  "/ar/about",
  "/ar/contact",
  "/ar/privacy",
  "/ar/programs/beyond-the-frame",
  "/ar/lost",
];

async function scanRoutes(
  page: import("@playwright/test").Page,
  routes: string[],
): Promise<void> {
  for (const route of routes) {
    await page.goto(route, { waitUntil: "networkidle" });
    await page.addStyleTag({
      content:
        "*,*::before,*::after{animation:none!important;transition:none!important} .reveal{opacity:1!important;transform:none!important}",
    });
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    const summary = results.violations
      .map(
        (violation) =>
          `${route}: ${violation.id} (${violation.impact}) — ${violation.nodes
            .map((node) => node.target.join(" "))
            .join(", ")}`,
      )
      .join("\n");
    expect(results.violations, summary).toEqual([]);
  }
}

test.describe("accessibility", () => {
  test.beforeEach(async ({ page }) => {
    await skipIntro(page);
  });

  test("Arabic pages pass WCAG A/AA checks", async ({ page }) => {
    test.setTimeout(240_000);
    await scanRoutes(page, ROUTES);
  });

  test("English pages pass WCAG A/AA checks", async ({ page }) => {
    test.setTimeout(240_000);
    await scanRoutes(
      page,
      ROUTES.map((route) => route.replace(/^\/ar/, "/en")),
    );
  });
});
