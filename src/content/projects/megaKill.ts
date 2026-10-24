import type { Project, MediaSlot } from "../types";

const item = (file: string, alt: string): MediaSlot => ({
  src: `/img/megakill/items/${file}`,
  alt,
  ratio: 1,
});

const frame = (file: string, alt: string): MediaSlot => ({
  src: `/img/megakill/frames/${file}`,
  alt,
  ratio: 1,
});

export const megaKill: Project = {
  id: "megakill",
  title: "MegaKill",
  spec: ["FPS", "Rogue-Like", "PC", "Paused"],
  hue: "var(--hue-mega)",
  evidence: "pixel-gallery",
  tagline: "An FPS rogue-like built for fun first. High energy, high humor, high replayability.",
  overview: [
    "MegaKill started as a passion project, heavily inspired by Megabonk, a game my friend group had been playing together. Shortly after leaving my consulting career, we decided to build our own FPS rogue-like. The goal was never to make something serious; we wanted something fun, chaotic, and genuinely funny.",
    "The project is paused now while we focus on more achievable mobile projects, but it remains the place where everything started for me.",
  ],
  role: [
    "I contributed across UI/UX design, in-game economy and meta design, character-class concepts, and art direction. On the visual side, I designed the pixel-art UI elements, item assets, and frames used directly in the game, and gave input on core gameplay decisions throughout.",
  ],
  decisions: [
    {
      heading: "Pixel art from zero",
      body: [
        "With no prior pixel-art experience, I taught myself the basics to build the game's visual language. Designing item assets, rarity frames, and UI from scratch meant finding a style that felt cohesive while matching the chaotic, humorous tone. Every asset went through several iterations before it felt right.",
      ],
    },
    {
      heading: "If it isn't fun, it doesn't belong",
      body: [
        "That was the whole design philosophy. It shaped everything from item design, where flavour text and sound effects mattered as much as stats, to character classes built around unexpected interactions. Designing with unfiltered humor was one of the most creatively freeing parts of the project.",
      ],
    },
  ],
  whyPaused: [
    "PC development demands a scope of content and production that wasn't sustainable for a two-person team at this stage. Rather than compromise the vision, we chose to pause and build experience through smaller, shippable mobile projects first. MegaKill isn't abandoned, it's waiting.",
  ],
  learned: [
    "MegaKill was my first step into game design, amateurish at the start but deeply formative. It confirmed that leaving consulting for games was the right decision, and it showed me what it feels like to build something you're genuinely passionate about.",
  ],
  pixels: [
    item("dihh-sword.png", "Dihh Sword pixel-art weapon item"),
    item("chilli-bean.png", "Chilli Bean pixel-art item on fire"),
    item("gold-poker-chip.png", "Gold poker chip currency item"),
    item("poker-chip.png", "Green poker chip currency item"),
    item("joe-mama.png", "Joe Mama pixel-art character item"),
    item("settings-icon.png", "Settings gear pixel-art icon"),
  ],
  frames: [
    frame("epic-stat-frame.png", "Epic rarity stat frame with crossed swords"),
    frame("legendary-frame.png", "Legendary rarity frame"),
    frame("menu-frame.png", "Lava-themed menu frame"),
  ],
};
