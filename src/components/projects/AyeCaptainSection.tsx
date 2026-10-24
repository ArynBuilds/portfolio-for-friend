import type { Project } from "@/content/types";
import { ProjectShell } from "./parts/ProjectShell";
import { Prose } from "./parts/Prose";

interface SectionProps {
  project: Project;
  index: number;
  total: number;
}

/**
 * No imagery by design. The GDD is text, so the section is concise prose in the
 * same consistent column as the rest of the work.
 */
export function AyeCaptainSection({ project, index, total }: SectionProps) {
  return (
    <ProjectShell project={project} index={index} total={total}>
      <Prose label="Overview" paragraphs={project.overview} />
      <Prose label="My role" paragraphs={project.role} />
      {project.decisions.map((d, i) => (
        <Prose key={i} label={d.heading} paragraphs={d.body} startIndex={i} />
      ))}
      {project.challenges && <Prose label="Challenges" paragraphs={project.challenges} />}
      {project.vision && <Prose label="Vision" paragraphs={project.vision} />}
    </ProjectShell>
  );
}
