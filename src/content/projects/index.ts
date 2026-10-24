import type { Project } from "../types";
import { crazyCups } from "./crazyCups";
import { megaKill } from "./megaKill";
import { ayeCaptain } from "./ayeCaptain";
import { stickSort } from "./stickSort";

/** Display order: hero first, then the rest. */
export const projects: Project[] = [crazyCups, megaKill, ayeCaptain, stickSort];
