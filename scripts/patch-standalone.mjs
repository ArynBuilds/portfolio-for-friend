import { readFileSync, writeFileSync } from "node:fs";

const HTML = "C:/DEV/ilkerneslihanoglu/portfolio-standalone.html";
const MEDIA_TEXT = readFileSync("C:/DEV/ilkerneslihanoglu/scripts/media.js", "utf8").trim();
let html = readFileSync(HTML, "utf8");

/* ---- 1. swap the embedded MEDIA object for the freshly generated one ---- */
{
  const start = html.indexOf("/* Auto-generated");
  const end = html.indexOf("const profile = {");
  if (start < 0 || end < 0) throw new Error("MEDIA / profile anchors not found");
  html = html.slice(0, start) + MEDIA_TEXT + "\n\n" + html.slice(end);
}

/* ---- 2. replace the ALT + media helpers + mediaHtml block ---- */
const NEW_MEDIA = `const ALT = {
  cupsScreens: ["Crazy Cups main menu", "Crazy Cups in-game level", "Crazy Cups win panel", "Crazy Cups pause menu", "Crazy Cups options screen"],
  cupsLevels: ["Hand-drawn rainbow level", "Hand-drawn apple level", "Hand-drawn watermelon level", "Hand-drawn palm level", "Hand-drawn mountain level", "Hand-drawn candle level"],
  megaItems: ["Dihh Sword item", "Chilli Bean item", "Gold poker chip", "Green poker chip", "Joe Mama character", "Settings icon"],
  megaFrames: ["Epic rarity stat frame", "Legendary rarity frame", "Lava menu frame"],
  stickButtons: ["Stick Sort play button", "Stick Sort pause button", "Stick Sort restart button"],
};
const BTN_CAPS = ["Play", "Pause", "Restart"];
function tile(cls, src, alt, i) {
  return '<li data-reveal style="--i:' + (i % 6) + '"><div class="' + cls + '"><img loading="lazy" src="' + src + '" alt="' + alt + '"></div></li>';
}
function gallery(label, cls, gridCls, srcs, alts) {
  return '<div class="media"><p class="kicker">' + label + '</p><ul class="grid ' + gridCls + '">' +
    srcs.map((s, i) => tile(cls, s, alts[i] || "", i)).join("") + '</ul></div>';
}
function mediaHtml(p) {
  const m = p.media || {};
  let out = "";
  if (m.cups) {
    out += gallery("The game, screen by screen", "shot", "grid-5", MEDIA.cupsScreens, ALT.cupsScreens);
    out += gallery("Levels, hand-drawn from scratch", "lvl", "grid-6", MEDIA.cupsLevels, ALT.cupsLevels);
  }
  if (m.mega) {
    out += gallery("Self-taught pixel art, items", "pixtile", "grid-6", MEDIA.megaItems, ALT.megaItems);
    out += gallery("UI frames", "pixtile", "grid-3", MEDIA.megaFrames, ALT.megaFrames);
  }
  if (m.economy) out += '<div class="media" data-reveal>' + economyDiagram() + "</div>";
  if (m.motif) out += '<div class="panel" data-reveal><p class="kicker center">The mechanic</p>' + sortingMotif(p.hue) + '<p class="t-mono motif-cap center">sort &nbsp;&rarr;&nbsp; order &nbsp;&rarr;&nbsp; clear</p></div>';
  if (m.buttons) {
    out += '<div class="media"><p class="kicker">Buttons I designed</p><ul class="grid grid-3 btnrow">' +
      MEDIA.stickButtons.map((s, i) => '<li data-reveal style="--i:' + i + '"><div class="btntile"><img loading="lazy" src="' + s + '" alt="' + ALT.stickButtons[i] + '"></div><p class="t-mono btncap">' + BTN_CAPS[i] + '</p></li>').join("") +
      '</ul></div>';
  }
  return out;
}

`;
{
  const start = html.indexOf("const ALT = {");
  const end = html.indexOf("function sectionHtml(p, idx, total) {");
  if (start < 0 || end < 0) throw new Error("ALT / sectionHtml anchors not found");
  html = html.slice(0, start) + NEW_MEDIA + html.slice(end);
}

/* ---- 3. Stick Sort now shows the real buttons too ---- */
html = html.replace("media: { motif: true },", "media: { motif: true, buttons: true },");

/* ---- 4. CSS for the 3-up grid and button captions ---- */
const CSS_ADD = `
.grid-3 { grid-template-columns: repeat(3, 1fr); }
.btnrow { max-width: 26rem; margin: 0 auto; }
.btntile { aspect-ratio: 1; border-radius: 0.75rem; padding: 0.9rem; background: color-mix(in oklab, var(--fg) 8%, transparent); border: 1px solid var(--fg-line); }
.btntile img { width: 100%; height: 100%; object-fit: contain; display: block; }
.btncap { text-align: center; margin-top: 0.4rem; color: var(--fg-muted); }
`;
if (!html.includes(".btntile {")) html = html.replace("</style>", CSS_ADD + "</style>");

writeFileSync(HTML, html, "utf8");
console.log("standalone patched:", (Buffer.byteLength(html) / 1024 / 1024).toFixed(2), "MB");
