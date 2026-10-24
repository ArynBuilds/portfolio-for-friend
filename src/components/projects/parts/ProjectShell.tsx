import type { ReactNode } from "react";
import type { Project } from "@/content/types";
import { SectionMeta } from "./SectionMeta";

interface ProjectShellProps {
  project: Project;
  index: number;
  total: number;
  children: ReactNode;
}

/**
 * Common chrome for a project section: the landmark, the section id (for the
 * rail / dock jumps), the hue exposed as --section-hue for descendants, and the
 * standard SectionMeta header. The bespoke body is passed as children.
 */
export function ProjectShell({ project, index, total, children }: ProjectShellProps) {
  return (
    <section
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className="scroll-mt-24"
      style={{ ["--section-hue" as string]: project.hue }}
    >
      {/* one centered column for the whole section: text and media share the
          same measure, so layouts stay consistent and any spare space is
          symmetric margin, never a lopsided gap */}
      <div className="mx-auto max-w-[46rem] px-6 py-20 sm:py-28 lg:py-32">
        <SectionMeta
          index={index}
          total={total}
          title={project.title}
          titleId={`${project.id}-title`}
          spec={project.spec}
          tagline={project.tagline}
        />
        {children}
      </div>
    </section>
  );
}
