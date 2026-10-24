import { profile } from "@/content/profile";
import { Reveal } from "@/components/motion/Reveal";
import { ContactLinks } from "./ContactLinks";

/**
 * The closing zone, where the canvas has settled into the dark blue. A calm
 * contact invitation, no hard sell. Uses the adaptive --fg tokens.
 */
export function SiteFooter() {
  return (
    <footer id="contact">
      <div
        className="mx-auto max-w-[1100px] px-6 pb-16 pt-24 sm:px-10 sm:pb-20 sm:pt-32"
        style={{ color: "var(--fg)" }}
      >
        <Reveal as="p" className="t-mono mb-6 text-[color:var(--fg-muted)]">
          Get in touch
        </Reveal>
        <Reveal as="h2" index={1} className="t-title mb-10 max-w-[18ch] text-[color:var(--fg)]">
          Building Aye Captain!, and open to the right conversations.
        </Reveal>

        <Reveal index={2}>
          <ContactLinks variant="lg" />
        </Reveal>

        <div className="mt-20 flex flex-col gap-2 border-t border-[color:var(--fg-line)] pt-8 text-[color:var(--fg-muted)] sm:flex-row sm:items-center sm:justify-between">
          <span className="t-mono">© 2025 {profile.name}</span>
          <span className="t-mono">Game Designer · UI/UX, level &amp; systems design</span>
        </div>
      </div>
    </footer>
  );
}
