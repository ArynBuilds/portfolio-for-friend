import { Reveal } from "@/components/motion/Reveal";

interface ProseProps {
  /** small uppercase label, e.g. "Overview", "My role" */
  label: string;
  paragraphs: string[];
  /** start index for stagger continuity within a column */
  startIndex?: number;
  tone?: "primary" | "muted";
}

/**
 * A labelled prose block: mono-feeling kicker label + body paragraphs at a
 * readable measure. The unit the documentation-led sections lean on most.
 */
export function Prose({ label, paragraphs, startIndex = 0, tone = "primary" }: ProseProps) {
  const color = tone === "muted" ? "var(--fg-muted)" : "var(--fg)";
  return (
    <div className="mb-9">
      <Reveal as="h3" className="t-label mb-3 text-[color:var(--fg-muted)]">
        {label}
      </Reveal>
      <div className="measure space-y-4">
        {paragraphs.map((p, i) => (
          <Reveal as="p" key={i} index={startIndex + i + 1} className="t-body" >
            <span style={{ color }}>{p}</span>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
