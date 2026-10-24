function makeRng(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface WideMockProps {
  seed: number;
  hue: string;
}

/**
 * A stylized wide gameplay still: an atmospheric gradient, a layered silhouette
 * skyline, and a small HUD corner. CSS/SVG mockup (mine, license-clear), tinted
 * to the project hue. Fills its parent frame.
 */
export function WideMock({ seed, hue }: WideMockProps) {
  const rng = makeRng(seed);
  const bars = Array.from({ length: 14 }, () => 20 + rng() * 60);

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{
        background: `radial-gradient(120% 90% at 70% 10%, color-mix(in oklab, ${hue} 30%, var(--ink-deepest)), var(--ink-deepest))`,
      }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 100 56" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <g fill={`color-mix(in oklab, ${hue} 45%, var(--ink-deepest))`} opacity="0.55">
          {bars.map((h, i) => (
            <rect key={i} x={i * 7.3} y={56 - h * 0.5} width="6" height={h * 0.5} rx="0.5" />
          ))}
        </g>
        <circle cx="74" cy="13" r="7" fill={`color-mix(in oklab, ${hue} 70%, white 8%)`} opacity="0.85" />
      </svg>

      <div className="absolute left-[4%] top-[8%] flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-sm" style={{ background: `color-mix(in oklab, ${hue} 80%, transparent)` }} />
        <span className="h-2 w-14 rounded-full" style={{ background: "color-mix(in oklab, var(--text-bone) 22%, transparent)" }} />
      </div>
    </div>
  );
}
