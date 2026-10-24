import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "scripts/shots";
mkdirSync(OUT, { recursive: true });

const URL = "http://localhost:3000";
const viewports = [
  { name: "mobile", width: 390, height: 844 },
  { name: "tablet", width: 834, height: 1112 },
  { name: "desktop", width: 1440, height: 900 },
];

// scroll fractions (of full page height) to capture the journey
const stops = [0, 0.18, 0.4, 0.62, 0.82, 1];

const browser = await chromium.launch();
for (const vp of viewports) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  await page.waitForTimeout(600);

  const full = await page.evaluate(() => document.body.scrollHeight);
  for (let i = 0; i < stops.length; i++) {
    const y = Math.round((full - vp.height) * stops[i]);
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(1100);
    await page.screenshot({ path: `${OUT}/${vp.name}-${i}.png` });
  }
  await ctx.close();
  console.log(`shot ${vp.name}`);
}
await browser.close();
console.log("done");
