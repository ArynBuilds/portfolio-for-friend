"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { useActiveSection } from "@/components/motion/useActiveSection";
import { cn } from "@/lib/cn";
import { ContactLinks } from "./ContactLinks";

const SECTION_IDS = projects.map((p) => p.id);

/**
 * The hero's compressed form: a slim fixed bar that fades in once the visitor
 * scrolls past the opening, keeping name + contact reachable the whole way down.
 * Its text/fill interpolate paper→ink via --p so it stays legible across the
 * journey. On mobile it also carries numbered project jumps (the side rail's
 * mobile stand-in).
 */
export function DockBar() {
  const [shown, setShown] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      setShown(window.scrollY > window.innerHeight * 0.6);
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-0 z-[200] transition-[opacity,transform] duration-500",
        shown ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-full opacity-0"
      )}
    >
      <div
        className="border-b backdrop-blur-md transition-[background-color,border-color] duration-500"
        style={{
          background: "var(--chrome-bg)",
          borderColor: "color-mix(in oklab, var(--chrome-fg) 14%, transparent)",
        }}
      >
        <nav
          aria-label="Portfolio"
          className="mx-auto flex max-w-[1100px] items-center justify-between gap-4 px-5 py-3 transition-colors duration-500 sm:px-8"
          style={{ color: "var(--chrome-fg)" }}
        >
          <a href="#top" className="font-[family-name:var(--font-display)] text-[1.02rem] font-medium tracking-tight">
            {profile.name}
          </a>

          <ol className="flex items-center gap-1 lg:hidden">
            {projects.map((p, i) => (
              <li key={p.id}>
                <a
                  href={`#${p.id}`}
                  aria-label={`Jump to ${p.title}`}
                  aria-current={active === p.id ? "true" : undefined}
                  className={cn(
                    "block px-2 py-2 font-[family-name:var(--font-mono)] text-[0.72rem] transition-opacity",
                    active === p.id ? "opacity-100" : "opacity-45"
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </a>
              </li>
            ))}
          </ol>

          <div className="hidden sm:block">
            <ContactLinks variant="icon" />
          </div>
        </nav>
      </div>
    </div>
  );
}
