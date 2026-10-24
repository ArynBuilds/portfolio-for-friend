import { Reveal } from "@/components/motion/Reveal";

interface SectionMetaProps {
  index: number;
  total: number;
  title: string;
  titleId: string;
  spec: string[];
  tagline: string;
}

/**
 * The opening of every project: index (01 / 04), spec line, large title, and a
 * one-line essence. The accent dot is used (not the project hue) so it reads on
 * every zone background. Text uses --fg so it adapts to each zone's color.
 */
export function SectionMeta({ index, total, title, titleId, spec, tagline }: SectionMetaProps) {
  return (
    <div className="mb-10 sm:mb-14">
      <Reveal as="div" className="mb-5 flex items-center gap-3">
        <span aria-hidden className="h-2.5 w-2.5 rounded-full" style={{ background: "var(--accent)" }} />
        <span className="t-mono text-[color:var(--fg-muted)]">
          {String(index).padStart(2, "0")}
          <span className="opacity-40"> / {String(total).padStart(2, "0")}</span>
        </span>
        <span aria-hidden className="h-px flex-1 bg-[color:var(--fg-line)]" />
      </Reveal>

      <Reveal as="h2" index={1} className="t-title mb-4 text-[color:var(--fg)]">
        <span id={titleId}>{title}</span>
      </Reveal>

      <Reveal as="p" index={2} className="t-label mb-5 text-[color:var(--fg-muted)]">
        {spec.join("  ·  ")}
      </Reveal>

      <Reveal as="p" index={3} className="t-lead measure text-[color:var(--fg)]">
        {tagline}
      </Reveal>
    </div>
  );
}
