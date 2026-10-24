"use client";

import { projects } from "@/content/projects";
import { useActiveSection } from "@/components/motion/useActiveSection";
import { cn } from "@/lib/cn";

const SECTION_IDS = projects.map((p) => p.id);

/**
 * Desktop-only vertical rail (lg+). Doubles as navigation and journey indicator:
 * the track fills with --p (the light→dark scroll progress) and the active
 * project is marked as you pass through it. Text interpolates ink→bone so it
 * reads on both ends. The mobile equivalent lives in the DockBar.
 */
export function ProgressRail() {
  const active = useActiveSection(SECTION_IDS);

  return (
    <nav
      aria-label="Projects"
      className="fixed right-7 top-1/2 z-[150] hidden -translate-y-1/2 transition-colors duration-500 lg:block"
      style={{ color: "var(--chrome-fg)" }}
    >
      <ol className="flex flex-col gap-7">
        {projects.map((p, i) => {
          const isActive = active === p.id;
          return (
            <li key={p.id}>
              <a
                href={`#${p.id}`}
                aria-current={isActive ? "true" : undefined}
                className="group flex items-center justify-end gap-3"
              >
                <span
                  className={cn(
                    "text-right font-[family-name:var(--font-display)] text-[0.82rem] leading-tight transition-all duration-300",
                    isActive
                      ? "translate-x-0 opacity-100"
                      : "translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-70"
                  )}
                >
                  {p.title}
                </span>
                <span className="flex items-center gap-2">
                  <span
                    className={cn(
                      "font-[family-name:var(--font-mono)] text-[0.66rem] transition-opacity duration-300",
                      isActive ? "opacity-100" : "opacity-40 group-hover:opacity-70"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "h-px transition-all duration-300",
                      isActive ? "w-9" : "w-5 group-hover:w-7"
                    )}
                    style={{ background: isActive ? "var(--accent)" : "currentColor" }}
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
