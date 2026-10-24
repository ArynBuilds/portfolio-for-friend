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

const BUTTON_CAPS = ["Play", "Pause", "Restart"];

/**
 * Text-driven. The buttons I designed are the concrete artifact, in the same
 * consistent column as the prose.
 */
export function StickSortSection({ project, index, total }: SectionProps) {
  const buttons = project.pixels ?? [];
  const tile =
    "rounded-xl p-4 bg-[color:color-mix(in_oklab,var(--fg)_8%,transparent)] ring-1 ring-[color:var(--fg-line)]";

  return (
    <ProjectShell project={project} index={index} total={total}>
      <Prose label="Overview" paragraphs={project.overview} />

      <div className="my-12">
        <Reveal as="p" className="t-label mb-4 text-[color:var(--fg-muted)]">
          Buttons I designed
        </Reveal>
        <ul className="mx-auto grid max-w-[26rem] grid-cols-3 gap-4">
          {buttons.map((slot, i) => (
            <li key={i}>
              <Reveal shift={20} index={i}>
                <div className={tile}>
                  <Frame slot={slot} hue={project.hue} rounded={false} fit="contain" sizes="(max-width: 640px) 28vw, 130px" />
                </div>
                <p className="t-mono mt-2 text-center text-[color:var(--fg-muted)]">{BUTTON_CAPS[i] ?? `button ${i + 1}`}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <Prose label="My role" paragraphs={project.role} />
      {project.decisions.map((d, i) => (
        <Prose key={i} label={d.heading} paragraphs={d.body} startIndex={i} />
      ))}
      <Prose label="What I learned" paragraphs={project.learned} />
    </ProjectShell>
  );
}
