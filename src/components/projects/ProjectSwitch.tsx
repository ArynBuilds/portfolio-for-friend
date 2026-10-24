import type { Project } from "@/content/types";
import { CrazyCupsSection } from "./CrazyCupsSection";
import { MegaKillSection } from "./MegaKillSection";
import { AyeCaptainSection } from "./AyeCaptainSection";
import { StickSortSection } from "./StickSortSection";

interface ProjectSwitchProps {
  project: Project;
  index: number;
  total: number;
}

/** Routes each project to its bespoke section component by id. */
export function ProjectSwitch({ project, index, total }: ProjectSwitchProps) {
  const props = { project, index, total };
  switch (project.id) {
    case "crazy-cups":
      return <CrazyCupsSection {...props} />;
    case "megakill":
      return <MegaKillSection {...props} />;
    case "aye-captain":
      return <AyeCaptainSection {...props} />;
    case "stick-sort":
      return <StickSortSection {...props} />;
  }
}
