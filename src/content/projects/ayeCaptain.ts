import type { Project } from "../types";

export const ayeCaptain: Project = {
  id: "aye-captain",
  title: "Aye Captain!",
  spec: ["Hybrid-Casual", "Rogue-Lite", "Idle Tycoon", "Mobile", "GDD Phase"],
  hue: "var(--hue-captain)",
  evidence: "documentation",
  tagline: "A solo-authored GDD: economy, meta, and long-term progression for a pirate idle tycoon.",
  overview: [
    "Hybrid-casual games were a genre I loved long before they went mainstream. Rogue-lite progression and tycoon mechanics were always among my favorites, games I was pulled toward naturally, not just as a player but as someone who kept thinking about why they worked. When I started watching One Piece, the pirate theme clicked immediately. Aye Captain! was born from that intersection.",
    "This project is as much a learning vehicle as a passion project. I designed it to push myself into the areas I wanted to master: game economy, meta systems, and long-term progression.",
  ],
  role: [
    "I authored the full GDD entirely on my own, covering core gameplay architecture, progression structure, economy systems, NPC design, and monetization. This is the most comprehensive design work I've done to date.",
  ],
  decisions: [
    {
      heading: "A multi-currency economy",
      body: [
        "Designing an economy with four soft currencies, one special, and one premium, each with its own flow and purpose, was the most challenging and rewarding part. Every resource needed a clear reason to exist, a clear way to be earned, and a clear way to be spent. Getting those relationships right without imbalance or redundancy took significant iteration and testing in Machinations.",
      ],
    },
    {
      heading: "Prestige as the engine",
      body: [
        "The prestige mechanic sits at the heart of Aye Captain!; it gives the economy meaning and makes long-term progression feel rewarding rather than exhausting. The hard question was how to make a player want to reset. The answer was making each reset feel like a genuine power leap, not a punishment. Most systems are built around that principle.",
      ],
    },
    {
      heading: "Meta decisions everywhere",
      body: [
        "A core goal was letting every player progress in different ways. The crew system, with its gacha elements, rarity tiers, upgrade costs, and slot mechanics, was designed to create meaningful meta decisions at every stage. Open more boxes, upgrade existing crew, or unlock new slots? There is no single right answer, and that ambiguity is intentional.",
      ],
    },
  ],
  challenges: [
    "It was my first full professional GDD. Writing one alone is a completely different challenge from collaborating; every system decision falls on you, and the gaps in your thinking become visible very quickly. Economy and meta design pushed me hardest, balancing progression feel, monetization, and long-term retention at once is genuinely difficult. Machinations became essential for stress-testing assumptions before they became problems.",
  ],
  learned: [],
  vision: [
    "I want to finish Aye Captain!, grow it continuously, and build it into a landmark in the hybrid-casual space. This isn't a demo or an experiment; it's the game I set out to make, and I intend to see it through.",
  ],
};
