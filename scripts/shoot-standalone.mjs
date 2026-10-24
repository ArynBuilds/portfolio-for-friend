import { chromium } from "playwright";
const URL = "file:///C:/DEV/ilkerneslihanoglu/portfolio-standalone.html";
const OUT = "scripts/shots";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const full = await page.evaluate(() => document.body.scrollHeight);
const stops = [0, 0.22, 0.45, 0.68, 0.9];
for (let i = 0; i < stops.length; i++) {
  await page.evaluate((y) => window.scrollTo(0, y), Math.round((full - 800) * stops[i]));
  await page.waitForTimeout(1100);
  await page.screenshot({ path: `${OUT}/sa-${i}.png` });
}
await browser.close();
console.log("errors:", errors.length ? errors.join("\n") : "none");
