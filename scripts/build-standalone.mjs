import { readFileSync, writeFileSync } from "node:fs";

const HTML = "C:/DEV/ilkerneslihanoglu/portfolio-standalone.html";
const MEDIA_TEXT = readFileSync("C:/DEV/ilkerneslihanoglu/scripts/media.js", "utf8").trim();
let html = readFileSync(HTML, "utf8");

/* ---- 1. CSS additions for the real-image tiles ---- */
const CSS_ADD = `
/* real-image media tiles */
.grid-6 { grid-template-columns: repeat(3, 1fr); }
@media (min-width: 640px) { .grid-6 { grid-template-columns: repeat(6, 1fr); } }
.frmgrid { grid-template-columns: 1fr 1fr; }
.shot { position: relative; aspect-ratio: 1206 / 2622; border-radius: 0.75rem; overflow: hidden; border: 1px solid var(--fg-line); box-shadow: 0 1px 4px rgba(0,0,0,0.18); }
.shot img { width: 100%; height: 100%; object-fit: cover; display: block; }
.lvl { aspect-ratio: 1; background: #fff; border-radius: 0.75rem; padding: 0.5rem; box-shadow: 0 1px 4px rgba(0,0,0,0.12); border: 1px solid rgba(0,0,0,0.05); }
.lvl img { width: 100%; height: 100%; object-fit: contain; display: block; }
.pixtile { aspect-ratio: 1; border-radius: 0.75rem; padding: 0.7rem; background: color-mix(in oklab, var(--fg) 8%, transparent); border: 1px solid var(--fg-line); }
.pixtile img { width: 100%; height: 100%; object-fit: contain; display: block; image-rendering: pixelated; }
`;
html = html.replace("</style>", CSS_ADD + "</style>");

/* ---- 2. new projects array (real texts + real media flags) ---- */
const NEW_PROJECTS = `const projects = [
  {
    id: "crazy-cups", title: "Crazy Cups", hue: "var(--hue-cups)", kind: "cups",
    spec: ["Hyper-Casual", "Mobile", "Pre-Release"],
    tagline: "Match the colors, stack the cups, clear the level. Designed so a child gets it instantly.",
    overview: ["Crazy Cups is the first hyper-casual mobile game I worked on, born from a simple idea suggested by my developer friend's mother, and the first real step I took into mobile game design. The mechanic is intentionally simple: match the colors of the image on screen, stack the cups in the right order, clear the level. Every decision answered one question: is this clear enough for a child to understand?"],
    role: ["I handled UI/UX design, level design, and visual direction. All screens and interface elements were built in Figma, while the level visuals were hand-drawn by me from scratch. Throughout, I worked closely with my developer to align on design decisions and how the game read in play."],
    decisions: [
      { heading: "A consistent visual language", body: ["The hardest part was establishing a consistent design language with no prior graphic-design experience. Designing buttons, screens, and UI in Figma took real trial and error. Adapting ready-made assets to the game's tone, keeping every element cohesive, and making deliberate layout choices pushed me to develop skills I didn't have when I started."] },
      { heading: "Drawing for a child audience", body: ["With no drawing experience, I hand-drew every level to resemble children's illustrations. Each one went through the same filter: would a child immediately understand what this is? Simplicity was a design goal, not a limitation."] },
    ],
    extras: [
      { heading: "Challenges", body: ["Both challenges were intertwined: learning Figma well enough to produce polished UI while developing a visual identity for the game, and drawing level content from scratch with no artistic background. Neither came naturally; both took consistent iteration."] },
    ],
    closingLabel: "What I learned",
    closing: ["Crazy Cups gave me a firsthand look at how much thought goes into something that appears effortless to the player. It was an invaluable entry point into mobile game design, and it showed how much cross-disciplinary thinking the role really demands."],
    media: { cups: true },
  },
  {
    id: "megakill", title: "MegaKill", hue: "var(--hue-mega)", kind: "mega",
    spec: ["FPS", "Rogue-Like", "PC", "Paused"],
    tagline: "An FPS rogue-like built for fun first. High energy, high humor, high replayability.",
    overview: [
      "MegaKill started as a passion project, heavily inspired by Megabonk, a game my friend group had been playing together. Shortly after leaving my consulting career, we decided to build our own FPS rogue-like. The goal was never to make something serious; we wanted something fun, chaotic, and genuinely funny.",
      "The project is paused now while we focus on more achievable mobile projects, but it remains the place where everything started for me.",
    ],
    role: ["I contributed across UI/UX design, in-game economy and meta design, character-class concepts, and art direction. On the visual side, I designed the pixel-art UI elements, item assets, and frames used directly in the game, and gave input on core gameplay decisions throughout."],
    decisions: [
      { heading: "Pixel art from zero", body: ["With no prior pixel-art experience, I taught myself the basics to build the game's visual language. Designing item assets, rarity frames, and UI from scratch meant finding a style that felt cohesive while matching the chaotic, humorous tone. Every asset went through several iterations before it felt right."] },
      { heading: "If it isn't fun, it doesn't belong", body: ["That was the whole design philosophy. It shaped everything from item design, where flavour text and sound effects mattered as much as stats, to character classes built around unexpected interactions. Designing with unfiltered humor was one of the most creatively freeing parts of the project."] },
    ],
    extras: [
      { heading: "Why it's paused", body: ["PC development demands a scope of content and production that wasn't sustainable for a two-person team at this stage. Rather than compromise the vision, we chose to pause and build experience through smaller, shippable mobile projects first. MegaKill isn't abandoned, it's waiting."] },
    ],
    closingLabel: "What I learned",
    closing: ["MegaKill was my first step into game design, amateurish at the start but deeply formative. It confirmed that leaving consulting for games was the right decision, and it showed me what it feels like to build something you're genuinely passionate about."],
    media: { mega: true },
  },
  {
    id: "aye-captain", title: "Aye Captain!", hue: "var(--hue-captain)", kind: "aye",
    spec: ["Hybrid-Casual", "Rogue-Lite", "Idle Tycoon", "Mobile", "GDD Phase"],
    tagline: "A solo-authored GDD: economy, meta, and long-term progression for a pirate idle tycoon.",
    overview: [
      "Hybrid-casual games were a genre I loved long before they went mainstream. Rogue-lite progression and tycoon mechanics were always among my favorites, games I was pulled toward naturally, not just as a player but as someone who kept thinking about why they worked. When I started watching One Piece, the pirate theme clicked immediately. Aye Captain! was born from that intersection.",
      "This project is as much a learning vehicle as a passion project. I designed it to push myself into the areas I wanted to master: game economy, meta systems, and long-term progression.",
    ],
    role: ["I authored the full GDD entirely on my own, covering core gameplay architecture, progression structure, economy systems, NPC design, and monetization. This is the most comprehensive design work I've done to date."],
    decisions: [
      { heading: "A multi-currency economy", body: ["Designing an economy with four soft currencies, one special, and one premium, each with its own flow and purpose, was the most challenging and rewarding part. Every resource needed a clear reason to exist, a clear way to be earned, and a clear way to be spent. Getting those relationships right without imbalance or redundancy took significant iteration and testing in Machinations."] },
      { heading: "Prestige as the engine", body: ["The prestige mechanic sits at the heart of Aye Captain!; it gives the economy meaning and makes long-term progression feel rewarding rather than exhausting. The hard question was how to make a player want to reset. The answer was making each reset feel like a genuine power leap, not a punishment. Most systems are built around that principle."] },
      { heading: "Meta decisions everywhere", body: ["A core goal was letting every player progress in different ways. The crew system, with its gacha elements, rarity tiers, upgrade costs, and slot mechanics, was designed to create meaningful meta decisions at every stage. Open more boxes, upgrade existing crew, or unlock new slots? There is no single right answer, and that ambiguity is intentional."] },
    ],
    extras: [
      { heading: "Challenges", body: ["It was my first full professional GDD. Writing one alone is a completely different challenge from collaborating; every system decision falls on you, and the gaps in your thinking become visible very quickly. Economy and meta design pushed me hardest, balancing progression feel, monetization, and long-term retention at once is genuinely difficult. Machinations became essential for stress-testing assumptions before they became problems."] },
    ],
    closingLabel: "Vision",
    closing: ["I want to finish Aye Captain!, grow it continuously, and build it into a landmark in the hybrid-casual space. This isn't a demo or an experiment; it's the game I set out to make, and I intend to see it through."],
    media: {},
  },
  {
    id: "stick-sort", title: "Stick Sort", hue: "var(--hue-stick)", kind: "stick",
    spec: ["Hyper-Casual", "Mobile", "Puzzle"],
    tagline: "A sorting puzzle for everyone. Simple to pick up, designed to stay satisfying.",
    overview: ["Stick Sort is a hyper-casual mobile puzzle built for a broad audience. The core mechanic revolves around sorting and ordering, simple to pick up and progressively more challenging to master. I joined to support my developer, contributing to UI/UX design and core gameplay direction."],
    role: ["I designed the in-game buttons and contributed to the layout of the main gameplay screen, with input on core gameplay elements and player-experience decisions throughout."],
    decisions: [
      { heading: "Designing for everyone", body: ["Unlike Crazy Cups, which was built for children, Stick Sort targets a much wider demographic. The design needed to be universally readable, intuitive for any age, and immediately satisfying to interact with. Player experience sat at the center of every decision."] },
      { heading: "Compounding experience", body: ["Coming into this after Crazy Cups made a real difference. Having already built a visual language and designed hyper-casual UI from scratch, I made faster, more confident decisions and spent less time on trial and error."] },
    ],
    extras: [],
    closingLabel: "What I learned",
    closing: ["Stick Sort reinforced that even a simple UI carries real design weight when the audience is broad. It also showed how prior experience compounds; each project makes the next one sharper."],
    media: { motif: true },
  },
];`;

{
  const start = html.indexOf("const projects = [");
  const endMarker = "/* =========================================================================\n   The rest builds";
  const end = html.indexOf(endMarker);
  if (start < 0 || end < 0) throw new Error("projects anchors not found");
  html = html.slice(0, start) + NEW_PROJECTS + "\n\n" + html.slice(end);
}

/* ---- 3. new mediaHtml: render the real embedded images ---- */
const NEW_MEDIAHTML = `const ALT = {
  cupsScreens: ["Crazy Cups main menu", "Crazy Cups in-game level", "Crazy Cups win panel", "Crazy Cups pause menu", "Crazy Cups options screen"],
  cupsLevels: ["Hand-drawn rainbow level", "Hand-drawn apple level", "Hand-drawn watermelon level", "Hand-drawn palm level", "Hand-drawn mountain level", "Hand-drawn candle level"],
  megaItems: ["Dihh Sword item", "Chilli Bean item", "Gold poker chip", "Green poker chip", "Joe Mama character", "Settings icon"],
  megaFrames: ["Epic rarity stat frame", "Lava menu frame"],
};
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
    out += gallery("UI frames", "pixtile", "frmgrid", MEDIA.megaFrames, ALT.megaFrames);
  }
  if (m.economy) out += '<div class="media" data-reveal>' + economyDiagram() + "</div>";
  if (m.motif) out += '<div class="panel" data-reveal><p class="kicker center">The mechanic</p>' + sortingMotif(p.hue) + '<p class="t-mono motif-cap center">sort &nbsp;&rarr;&nbsp; order &nbsp;&rarr;&nbsp; clear</p></div>';
  return out;
}

`;
{
  const start = html.indexOf("function mediaHtml(p) {");
  const end = html.indexOf("function sectionHtml(p, idx, total) {");
  if (start < 0 || end < 0) throw new Error("mediaHtml anchors not found");
  html = html.slice(0, start) + NEW_MEDIAHTML + html.slice(end);
}

/* ---- 4. sectionHtml: render the extras blocks between decisions and closing ---- */
const NEW_SECTIONHTML = `function sectionHtml(p, idx, total) {
  return '<section id="' + p.id + '" class="section" style="--section-hue:' + p.hue + '">' +
    '<div class="wrap">' +
    '<div class="meta" data-reveal>' +
    '<div class="meta-row"><span class="dot"></span><span class="t-mono midx">' + pad(idx) + '<span class="dim"> / ' + pad(total) + '</span></span><span class="mline"></span></div>' +
    '<h2 class="t-title" id="' + p.id + '-title">' + p.title + "</h2>" +
    '<p class="t-label spec">' + p.spec.join("&nbsp;&nbsp;·&nbsp;&nbsp;") + "</p>" +
    '<p class="t-lead tagline">' + p.tagline + "</p>" +
    "</div>" +
    proseBlock("Overview", p.overview) +
    mediaHtml(p) +
    proseBlock("My role", p.role) +
    p.decisions.map((d) => proseBlock(d.heading, d.body)).join("") +
    (p.extras || []).map((d) => proseBlock(d.heading, d.body)).join("") +
    proseBlock(p.closingLabel, p.closing) +
    "</div></section>";
}

`;
{
  const start = html.indexOf("function sectionHtml(p, idx, total) {");
  const end = html.indexOf("/* ---- build the page ---- */");
  if (start < 0 || end < 0) throw new Error("sectionHtml anchors not found");
  html = html.slice(0, start) + NEW_SECTIONHTML + html.slice(end);
}

/* ---- 5. inject the embedded MEDIA object before the editable content ---- */
html = html.replace("const profile = {", MEDIA_TEXT + "\n\nconst profile = {");

writeFileSync(HTML, html, "utf8");
console.log("standalone rebuilt:", (Buffer.byteLength(html) / 1024 / 1024).toFixed(2), "MB");
