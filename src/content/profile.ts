import type { Profile } from "./types";

/*
  NOTE: the LinkedIn slug was provided with a Turkish "ğ". LinkedIn vanity URLs
  are usually ASCII, so this may resolve as "ilker-neslioglu-905520208". The ğ is
  percent-encoded here; verify the link before shipping (open question in brief).
*/
export const profile: Profile = {
  name: "İlker Neslioğlu",
  role: "Game Designer",
  about: [
    "I design games across UI/UX, level design, and the systems underneath: economy, meta, and long-term progression.",
    "I left consulting to build games full-time, and I have been open to learn ever since. Teaching myself how to build a game from scratch with the goal of creating experiences players will love.",
  ],
  email: "ilkerneslioglu@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/ilker-neslio%C4%9Flu-905520208",
  linkedinLabel: "LinkedIn",
};
