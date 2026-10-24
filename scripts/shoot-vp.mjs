import { chromium } from "playwright";
const URL = "http://localhost:3000";
const OUT = "scripts/shots";

const shots = [
  { id: "megakill", name: "vp-megakill-top", align: "start" },
  { id: "stick-sort", name: "vp-stick", align: "center" },
];

const browser = await chromium.launch();
for (const vp of [{ w: 1440, h: 900, tag: "d" }, { w: 390, h: 844, tag: "m" }]) {
  const ctx = await browser.newContext({ viewport: { width: vp.w, height: vp.h } });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle" });
  for (const s of shots) {
    await page.evaluate(
      ({ id, align }) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ block: align });
      },
      { id: s.id, align: s.align }
    );
    await page.waitForTimeout(2400);
    await page.screenshot({ path: `${OUT}/${s.name}-${vp.tag}.png` });
  }
  await ctx.close();
}
await browser.close();
console.log("done");
