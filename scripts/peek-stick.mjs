import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1000, height: 760 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.evaluate(() => {
  const el = document.getElementById("stick-sort");
  const y = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo(0, y + 380);
});
await page.waitForTimeout(1500);
await page.screenshot({ path: "scripts/shots/peek-stick.png" });
await browser.close();
console.log("done");
