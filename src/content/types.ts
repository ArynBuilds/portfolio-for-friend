/** Content model for the portfolio. Static, authored data — no runtime input. */

export interface NamedBlock {
  heading: string;
  body: string[];
}

/** A single slotted image. `src` null = placeholder frame until the real asset lands. */
export interface MediaSlot {
  src: string | null;
  alt: string;
  /** aspect ratio as width/height, drives the placeholder frame size */
  ratio: number;
}

/** One currency in Aye Captain!'s economy, for the flow diagram. */
export interface Currency {
  name: string;
  kind: "soft" | "special" | "premium";
  note: string;
}

export type ProjectId = "crazy-cups" | "megakill" | "aye-captain" | "stick-sort";

export interface Project {
  id: ProjectId;
  title: string;
  /** spec line tokens, e.g. ["Hyper-Casual", "Mobile", "Pre-Release"] */
  spec: string[];
  /** CSS color value (a signature hue var) used sparingly for this section */
  hue: string;
  /** evidence type drives the bespoke layout the section component picks */
  evidence: "illustration" | "pixel-gallery" | "documentation";
  /** one-line essence shown under the title */
  tagline: string;
  overview: string[];
  role: string[];
  decisions: NamedBlock[];
  challenges?: string[];
  learned: string[];
  vision?: string[];
  whyPaused?: string[];
  /** square hand-drawn level art (Crazy Cups) */
  illustrations?: MediaSlot[];
  /** portrait mobile-screen captures (Crazy Cups) */
  screens?: MediaSlot[];
  /** square pixel-art item/icon artifacts (MegaKill) */
  pixels?: MediaSlot[];
  /** square pixel-art UI frames (MegaKill) */
  frames?: MediaSlot[];
  /** horizontal in-game captures (unused for now) */
  wides?: MediaSlot[];
  /** economy model (Aye Captain!) */
  economy?: Currency[];
}

export interface Profile {
  name: string;
  role: string;
  about: string[];
  email: string;
  linkedinUrl: string;
  linkedinLabel: string;
}
