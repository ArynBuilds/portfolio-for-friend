import type { Project, MediaSlot } from "../types";

/** Real phone-screen captures (1206x2622) and square hand-drawn level art. */
const PHONE = 1206 / 2622;

const screen = (file: string, alt: string): MediaSlot => ({
  src: `/img/crazy-cups/screens/${file}`,
  alt,
  ratio: PHONE,
});

const level = (file: string, alt: string): MediaSlot => ({
  src: `/img/crazy-cups/levels/${file}`,
  alt,
  ratio: 1,
});

export const crazyCups: Project = {
  id: "crazy-cups",
  title: "Crazy Cups",
  spec: ["Hyper-Casual", "Mobile", "Pre-Release"],
  hue: "var(--hue-cups)",
  evidence: "illustration",
  tagline: "Match the colors, stack the cups, clear the level. Designed so a child gets it instantly.",
  overview: [
    "Crazy Cups is the first hyper-casual mobile game I worked on, born from a simple idea suggested by my developer friend's mother, and the first real step I took into mobile game design. The mechanic is intentionally simple: match the colors of the image on screen, stack the cups in the right order, clear the level. Every decision answered one question: is this clear enough for a child to understand?",
  ],
  role: [
    "I handled UI/UX design, level design, and visual direction. All screens and interface elements were built in Figma, while the level visuals were hand-drawn by me from scratch. Throughout, I worked closely with my developer to align on design decisions and how the game read in play.",
  ],
  decisions: [
    {
      heading: "A consistent visual language",
      body: [
        "The hardest part was establishing a consistent design language with no prior graphic-design experience. Designing buttons, screens, and UI in Figma took real trial and error. Adapting ready-made assets to the game's tone, keeping every element cohesive, and making deliberate layout choices pushed me to develop skills I didn't have when I started.",
      ],
    },
    {
      heading: "Drawing for a child audience",
      body: [
        "With no drawing experience, I hand-drew every level to resemble children's illustrations. Each one went through the same filter: would a child immediately understand what this is? Simplicity was a design goal, not a limitation.",
      ],
    },
  ],
  challenges: [
    "Both challenges were intertwined: learning Figma well enough to produce polished UI while developing a visual identity for the game, and drawing level content from scratch with no artistic background. Neither came naturally; both took consistent iteration.",
  ],
  learned: [
    "Crazy Cups gave me a firsthand look at how much thought goes into something that appears effortless to the player. It was an invaluable entry point into mobile game design, and it showed how much cross-disciplinary thinking the role really demands.",
  ],
  screens: [
    screen("main-menu.png", "Crazy Cups main menu with the Play button"),
    screen("in-game.png", "Crazy Cups in-game level screen"),
    screen("win-panel.png", "Crazy Cups level-complete win panel"),
    screen("pause-menu.png", "Crazy Cups pause menu"),
    screen("settings.png", "Crazy Cups options and sound settings"),
  ],
  illustrations: [
    level("rainbow.png", "Hand-drawn rainbow level art"),
    level("apple.png", "Hand-drawn apple level art"),
    level("watermelon.png", "Hand-drawn watermelon level art"),
    level("palm.png", "Hand-drawn palm tree level art"),
    level("mountain.png", "Hand-drawn mountain level art"),
    level("candle.png", "Hand-drawn candle level art"),
  ],
};
