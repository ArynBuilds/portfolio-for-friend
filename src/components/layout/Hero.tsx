import { profile } from "@/content/profile";
import { Reveal } from "@/components/motion/Reveal";
import { ContactLinks } from "./ContactLinks";

/**
 * The light opening: name, role, a short about, and contact. Sits on paper at the
 * top of the journey (text-ink). Generous space; one quiet signature, an accent
 * rule that draws in under the name on load. Everything compresses into the
 * DockBar as the visitor scrolls past.
 */
export function Hero() {
  return (
    <header
      id="top"
      className="relative mx-auto flex min-h-[88svh] max-w-[1100px] flex-col justify-center px-6 pb-24 pt-28 sm:px-10 lg:min-h-screen lg:pt-32"
      style={{ color: "var(--fg)" }}
    >
      <Reveal as="p" className="t-mono mb-6 text-[color:var(--fg-muted)]">
        Portfolio · Selected work, 2026
      </Reveal>

      <h1 className="t-display max-w-[14ch]">
        {profile.name}
      </h1>

      <div className="draw-rule mt-5 mb-7" aria-hidden />

      <Reveal as="p" index={1} className="t-heading mb-8 max-w-[20ch] font-normal text-[color:var(--fg-muted)]">
        {profile.role}. UI/UX, level &amp; systems design.
      </Reveal>

      <div className="measure space-y-4">
        {profile.about.map((line, i) => (
          <Reveal as="p" key={i} index={2 + i} className="t-lead text-[color:var(--fg)]">
            {line}
          </Reveal>
        ))}
      </div>

      <Reveal index={5} className="mt-10">
        <ContactLinks variant="lg" />
      </Reveal>

      <Reveal index={6} className="mt-16 flex items-center gap-3 text-[color:var(--fg-muted)] sm:mt-20">
        <span className="t-label">Scroll</span>
        <span aria-hidden className="scroll-cue h-px w-12 origin-left bg-current" />
      </Reveal>
    </header>
  );
}
