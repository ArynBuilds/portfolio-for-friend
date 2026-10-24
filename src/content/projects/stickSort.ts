import type { Project, MediaSlot } from "../types";

const button = (file: string, alt: string): MediaSlot => ({
  src: `/img/stick-sort/buttons/${file}`,
  alt,
  ratio: 1,
});

export const stickSort: Project = {
  id: "stick-sort",
  title: "Stick Sort",
  spec: ["Hyper-Casual", "Mobile", "Puzzle"],
  hue: "var(--hue-stick)",
  evidence: "documentation",
  tagline: "A sorting puzzle for everyone. Simple to pick up, designed to stay satisfying.",
  overview: [
    "Stick Sort is a hyper-casual mobile puzzle built for a broad audience. The core mechanic revolves around sorting and ordering, simple to pick up and progressively more challenging to master. I joined to support my developer, contributing to UI/UX design and core gameplay direction.",
  ],
  role: [
    "I designed the in-game buttons and contributed to the layout of the main gameplay screen, with input on core gameplay elements and player-experience decisions throughout.",
  ],
  decisions: [
    {
      heading: "Designing for everyone",
      body: [
        "Unlike Crazy Cups, which was built for children, Stick Sort targets a much wider demographic. The design needed to be universally readable, intuitive for any age, and immediately satisfying to interact with. Player experience sat at the center of every decision.",
      ],
    },
    {
      heading: "Compounding experience",
      body: [
        "Coming into this after Crazy Cups made a real difference. Having already built a visual language and designed hyper-casual UI from scratch, I made faster, more confident decisions and spent less time on trial and error.",
      ],
    },
  ],
  learned: [
    "Stick Sort reinforced that even a simple UI carries real design weight when the audience is broad. It also showed how prior experience compounds; each project makes the next one sharper.",
  ],
  pixels: [
    button("play.png", "Stick Sort play button"),
    button("pause.png", "Stick Sort pause button"),
    button("restart.png", "Stick Sort restart button"),
  ],
};
