/**
 * Local visual QA capture (not a replacement for Playwright assertions).
 * Usage: node scripts/qa-capture.mjs [baseUrl]
 */
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium } from "@playwright/test";

const base = process.argv[2] ?? "http://127.0.0.1:3100";
const outDir = path.join(process.cwd(), "qa", "evidence");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();

async function settleSplash(page) {
  const skip = page.locator(".splash__skip");
  if (await skip.count()) {
    await skip.click({ timeout: 5000 }).catch(() => {});
  }
  await page.waitForTimeout(400);
}

async function loadAll(page) {
  await page.evaluate(async () => {
    const step = Math.floor(window.innerHeight * 0.7);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 140));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
}

const desktop = await browser.newPage({
  viewport: { width: 1440, height: 900 },
});
await desktop.goto(`${base}/ar`, { waitUntil: "networkidle" });
await settleSplash(desktop);
await loadAll(desktop);
await desktop.addStyleTag({
  content: ".reveal{animation:none!important;opacity:1!important;transform:none!important}",
});
await desktop.screenshot({
  path: path.join(outDir, "home-ar-full-1440.png"),
  fullPage: true,
});

const sections = await desktop.locator("main > section").count();
for (let i = 0; i < sections; i += 1) {
  const section = desktop.locator("main > section").nth(i);
  await section.scrollIntoViewIfNeeded();
  await desktop.waitForTimeout(250);
  await section.screenshot({
    path: path.join(outDir, `home-ar-section-${i + 1}.png`),
  });
}

const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  isMobile: true,
  hasTouch: true,
});
await mobile.goto(`${base}/en`, { waitUntil: "networkidle" });
await settleSplash(mobile);
await loadAll(mobile);
await mobile.addStyleTag({
  content: ".reveal{animation:none!important;opacity:1!important;transform:none!important}",
});
await mobile.screenshot({
  path: path.join(outDir, "home-en-full-390.png"),
  fullPage: true,
});

await browser.close();
console.log(`Captured ${sections} desktop sections + full pages into ${outDir}`);
