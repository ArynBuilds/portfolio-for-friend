import { BackgroundJourney } from "@/components/motion/BackgroundJourney";
import { DockBar } from "@/components/layout/DockBar";
import { ProgressRail } from "@/components/layout/ProgressRail";
import { Hero } from "@/components/layout/Hero";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { ProjectSwitch } from "@/components/projects/ProjectSwitch";
import { projects } from "@/content/projects";

export default function Home() {
  return (
    <>
      <a
        href="#work"
        className="sr-only z-[300] rounded-full bg-[color:var(--text-ink)] px-4 py-2 text-[color:var(--paper)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Skip to projects
      </a>

      <BackgroundJourney />
      <DockBar />
      <ProgressRail />

      <Hero />

      <main id="work">
        {projects.map((project, i) => (
          <ProjectSwitch
            key={project.id}
            project={project}
            index={i + 1}
            total={projects.length}
          />
        ))}
      </main>

      <SiteFooter />
    </>
  );
}
