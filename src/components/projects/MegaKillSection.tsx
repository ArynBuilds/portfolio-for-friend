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
 * Pixel-led section. The self-taught item sprites and UI frames carry the
 * visual weight; the process follows in one consistent column.
 */
export function MegaKillSection({ project, index, total }: SectionProps) {
  const pixels = project.pixels ?? [];
  const frames = project.frames ?? [];
  const tile =
    "rounded-xl p-3 bg-[color:color-mix(in_oklab,var(--fg)_8%,transparent)] ring-1 ring-[color:var(--fg-line)]";

  return (
    <ProjectShell project={project} index={index} total={total}>
      <Prose label="Overview" paragraphs={project.overview} />

      <div className="my-12">
        <Reveal as="p" className="t-label mb-4 text-[color:var(--fg-muted)]">
          Self-taught pixel art, items
        </Reveal>
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {pixels.map((slot, i) => (
            <li key={i}>
              <Reveal shift={16} index={i % 6}>
                <div className={tile}>
                  <Frame slot={slot} hue={project.hue} rounded={false} pixelated fit="contain" sizes="(max-width: 640px) 28vw, 110px" />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <Prose label="My role" paragraphs={project.role} />

      <div className="my-12">
        <Reveal as="p" className="t-label mb-4 text-[color:var(--fg-muted)]">
          UI frames
        </Reveal>
        <ul className="grid grid-cols-3 gap-3">
          {frames.map((slot, i) => (
            <li key={i}>
              <Reveal shift={24} index={i}>
                <div className={tile}>
                  <Frame slot={slot} hue={project.hue} rounded={false} pixelated fit="contain" sizes="(max-width: 640px) 30vw, 150px" />
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      {project.decisions.map((d, i) => (
        <Prose key={i} label={d.heading} paragraphs={d.body} startIndex={i} />
      ))}
      {project.whyPaused && <Prose label="Why it's paused" paragraphs={project.whyPaused} />}
      <Prose label="What I learned" paragraphs={project.learned} />
    </ProjectShell>
  );
}
