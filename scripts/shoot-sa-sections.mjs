import { chromium } from "playwright";
const URL = "file:///C:/DEV/ilkerneslihanoglu/portfolio-standalone.html";
const OUT = "scripts/shots";
const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
const page = await ctx.newPage();
const errors = [];
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push(String(e)));
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(900);
for (const id of ["crazy-cups", "megakill", "aye-captain", "stick-sort"]) {
  const el = page.locator(`#${id}`);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(800);
  await el.screenshot({ path: `${OUT}/sa-${id}.png` });
}
await browser.close();
console.log("errors:", errors.length ? errors.join("\n") : "none");
