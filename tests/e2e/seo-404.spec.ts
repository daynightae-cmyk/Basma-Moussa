import { expect, test } from "@playwright/test";
import { openReady } from "./helpers";

test.describe("real 404s", () => {
  test("unknown paths return a true 404 with localized content", async ({
    request,
  }) => {
    const ar = await request.get("/ar/this-door-does-not-exist");
    expect(ar.status()).toBe(404);
    expect(await ar.text()).toContain("هذا الباب لا يؤدي إلى عالم بعد");
    expect(ar.headers()["content-type"]).toContain("text/html");

    const deep = await request.get("/en/foo/bar");
    expect(deep.status()).toBe(404);
    expect(await deep.text()).toContain("This door does not open onto a world yet");

    const localeMismatch = await request.get("/fr/about");
    expect(localeMismatch.status()).toBe(404);

    const missingProgram = await request.get("/ar/programs/not-a-real-world");
    expect(missingProgram.status()).toBe(404);
  });

  test("the localized 404 page is deliberately noindexed", async ({ page }) => {
    const response = await page.goto("/en/lost", { waitUntil: "networkidle" });
    expect(response?.status()).toBe(200);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
    await expect(page.locator("h1")).toContainText(
      "This door does not open onto a world yet",
    );
  });

  test("legacy /programs and locale-less roots redirect intentionally", async ({
    request,
  }) => {
    const programs = await request.get("/ar/programs", { maxRedirects: 0 });
    expect([307, 308]).toContain(programs.status());
    expect(programs.headers()["location"]).toContain("/ar/media");

    const root = await request.get("/", { maxRedirects: 0 });
    expect([307, 308]).toContain(root.status());
    expect(root.headers()["location"]).toContain("/ar");
  });
});

test.describe("SEO surface", () => {
  test("publishes canonical, hreflang and social metadata", async ({ page }) => {
    await openReady(page, "/en/about");
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute(
      "href",
      "https://basma-moussa.example.com/en/about",
    );
    await expect(
      page.locator('link[rel="alternate"][hreflang="ar"]'),
    ).toHaveAttribute("href", "https://basma-moussa.example.com/ar/about");
    await expect(
      page.locator('link[rel="alternate"][hreflang="en"]'),
    ).toHaveAttribute("href", "https://basma-moussa.example.com/en/about");
    await expect(
      page.locator('meta[property="og:image"]'),
    ).toHaveAttribute("content", /\/brand\/og-about\.jpg$/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
  });

  test("emits coherent localized JSON-LD", async ({ page }) => {
    await openReady(page, "/ar/about");
    const raw = await page
      .locator('script[type="application/ld+json"]')
      .first()
      .textContent();
    expect(raw).toBeTruthy();
    const data = JSON.parse(raw ?? "[]") as { "@type": string }[];
    expect(data.map((item) => item["@type"])).toEqual([
      "WebSite",
      "Person",
      "Brand",
    ]);
  });

  test("serves a sitemap and robots rules with every real route", async ({
    request,
  }) => {
    const sitemap = await request.get("/sitemap.xml");
    expect(sitemap.status()).toBe(200);
    const xml = await sitemap.text();
    expect(xml).toContain("/ar");
    expect(xml).toContain("/en/media");
    expect(xml).toContain("/ar/programs/beyond-the-frame");
    expect(xml).toContain("/en/privacy");

    const robots = await request.get("/robots.txt");
    expect(robots.status()).toBe(200);
    const rules = await robots.text();
    expect(rules).toContain("Sitemap:");
    expect(rules).toContain("/sitemap.xml");
  });
});
