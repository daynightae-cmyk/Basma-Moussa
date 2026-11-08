/** Page-by-page visual QA capture against a running production server. */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://127.0.0.1:3100";
const outDir = path.join(process.cwd(), "qa", "evidence");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

const pages = [
  ["home-ar", "/ar"],
  ["home-en", "/en"],
  ["media-ar", "/ar/media"],
  ["media-en", "/en/media"],
  ["beyond-ar", "/ar/programs/beyond-the-frame"],
  ["legal-ar", "/ar/legal-lens"],
  ["soundroom-ar", "/ar/soundroom"],
  ["stories-ar", "/ar/stories"],
  ["studio-ar", "/ar/studio"],
  ["about-ar", "/ar/about"],
  ["contact-ar", "/ar/contact"],
  ["privacy-ar", "/ar/privacy"],
  ["city-ar", "/ar/programs/city-voices"],
];

for (const [name, route] of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${base}${route}`, { waitUntil: "networkidle" });
  const skip = page.locator(".splash__skip");
  if (await skip.count()) {
    await skip.click().catch(() => {});
    await page.waitForTimeout(400);
  }
  await page.addStyleTag({
    content:
      ".reveal{animation:none!important;opacity:1!important;transform:none!important}.skip-link{display:none!important}",
  });
  await page.screenshot({
    path: path.join(outDir, `${name}-1440.png`),
    fullPage: false,
  });
  await page.close();
}

// Splash phases: fresh context each time to preserve the intro.
const phases = [300, 700, 1200, 2100];
for (const ms of phases) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(`${base}/ar`, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(ms);
  await page.screenshot({
    path: path.join(outDir, `splash-${String(ms).padStart(4, "0")}ms.png`),
  });
  await context.close();
}

// Reduced motion: no splash stage.
{
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(`${base}/ar`, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  await page.screenshot({
    path: path.join(outDir, "reduced-motion-home.png"),
  });
  await context.close();
}

await browser.close();
console.log(`Captured ${pages.length} pages + splash phases in ${outDir}`);
