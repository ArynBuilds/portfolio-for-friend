import { chromium } from "playwright";
const browser = await chromium.launch();

async function check(url, label) {
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 900 } });
  const page = await ctx.newPage();
  const errors = [], bad = [];
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  page.on("pageerror", (e) => errors.push(String(e)));
  page.on("response", (r) => { if (r.status() >= 400) bad.push(r.status() + " " + r.url().slice(0, 90)); });
  page.on("requestfailed", (r) => bad.push("FAILED " + r.url().slice(0, 90)));
  await page.goto(url, { waitUntil: "networkidle" });
  // scroll through so lazy images load
  const h = await page.evaluate(() => document.body.scrollHeight);
  for (let y = 0; y < h; y += 350) { await page.evaluate((v) => window.scrollTo(0, v), y); await page.waitForTimeout(220); }
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(2000);
  // count rendered <img> that actually have pixels
  const imgStats = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll("img")];
    return { total: imgs.length, broken: imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => i.currentSrc.slice(-40)) };
  });
  console.log(`\n=== ${label} (${url.slice(0, 50)}) ===`);
  console.log("console errors:", errors.length ? errors.join("\n  ") : "none");
  console.log("bad responses:", bad.length ? bad.join("\n  ") : "none");
  console.log("imgs:", imgStats.total, "broken:", imgStats.broken.length ? imgStats.broken.join(", ") : "none");
  await ctx.close();
}

await check("http://localhost:3000", "APP");
await check("file:///C:/DEV/ilkerneslihanoglu/portfolio-standalone.html", "STANDALONE");
await browser.close();
