import type { Project } from "@/content/types";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectShell } from "./parts/ProjectShell";
import { Prose } from "./parts/Prose";
import { Frame } from "./parts/Frame";

interface SectionProps {
  project: Project;
  index: number;
  total: number;
}

/**
 * Hero project. The real phone screens read as a row of devices; the hand-drawn
 * levels sit below like pinned-up paper. Process follows in one consistent column.
 */
export function CrazyCupsSection({ project, index, total }: SectionProps) {
  const screens = project.screens ?? [];
  const levels = project.illustrations ?? [];

  return (
    <ProjectShell project={project} index={index} total={total}>
      <Prose label="Overview" paragraphs={project.overview} />

      <div className="my-12">
        <Reveal as="p" className="t-label mb-4 text-[color:var(--fg-muted)]">
          The game, screen by screen
        </Reveal>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {screens.map((slot, i) => (
            <li key={i}>
              <Reveal shift={36} index={i}>
                <Frame
                  slot={slot}
                  hue={project.hue}
                  className="rounded-xl shadow-sm ring-1 ring-[color:var(--fg-line)]"
                  sizes="(max-width: 640px) 30vw, 130px"
                  priority={i === 0}
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <Prose label="My role" paragraphs={project.role} />

      <div className="my-12">
        <Reveal as="p" className="t-label mb-4 text-[color:var(--fg-muted)]">
          Levels, hand-drawn from scratch
        </Reveal>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {levels.map((slot, i) => (
            <li key={i}>
              <Reveal shift={28} index={i}>
                <div className="rounded-xl bg-white p-2 shadow-sm ring-1 ring-black/5">
                  <Frame slot={slot} hue={project.hue} rounded={false} fit="contain" sizes="(max-width: 640px) 30vw, 110px" />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {project.decisions.map((d, i) => (
        <Prose key={i} label={d.heading} paragraphs={d.body} startIndex={i} />
      ))}
      {project.challenges && <Prose label="Challenges" paragraphs={project.challenges} />}
      <Prose label="What I learned" paragraphs={project.learned} />
    </ProjectShell>
  );
}
