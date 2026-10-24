import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const OUT = "scripts/shots";
mkdirSync(OUT, { recursive: true });
const URL = "http://localhost:3000";

const targets = [
  { id: "aye-captain", name: "el-economy" },
  { id: "megakill", name: "el-megakill" },
  { id: "crazy-cups", name: "el-cups" },
  { id: "stick-sort", name: "el-stick" },
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
for (const t of targets) {
  const el = page.locator(`#${t.id}`);
  await el.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1100);
  await el.screenshot({ path: `${OUT}/${t.name}.png` });
  console.log(t.name);
}
// mobile economy + stick
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
const mp = await mctx.newPage();
await mp.goto(URL, { waitUntil: "networkidle" });
for (const t of [{ id: "aye-captain", name: "el-economy-m" }, { id: "crazy-cups", name: "el-cups-m" }]) {
  const el = mp.locator(`#${t.id}`);
  await el.scrollIntoViewIfNeeded();
  await mp.waitForTimeout(1100);
  await el.screenshot({ path: `${OUT}/${t.name}.png` });
  console.log(t.name);
}
await browser.close();
console.log("done");
