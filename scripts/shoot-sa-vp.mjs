import { chromium } from "playwright";
const URL = "file:///C:/DEV/ilkerneslihanoglu/portfolio-standalone.html";
const OUT = "scripts/shots";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 820 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
for (const id of ["megakill", "aye-captain", "stick-sort"]) {
  await page.evaluate((i) => {
    const el = document.getElementById(i);
    const y = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, y + el.offsetHeight * 0.30 - 120);
  }, id);
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${OUT}/vp-${id}.png` });
}
await browser.close();
console.log("done");
