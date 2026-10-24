import { chromium } from "playwright";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
await page.evaluate(() => {
  const el = document.getElementById("megakill");
  if (el) window.scrollTo(0, el.offsetTop + 260);
});
await page.waitForTimeout(1200);
await page.screenshot({ path: "scripts/shots/wide-check.png" });
await browser.close();
console.log("done");
