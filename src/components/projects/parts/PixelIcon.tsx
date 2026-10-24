/** Deterministic seeded PRNG (mulberry32) so SSR and client render identically. */
function makeRng(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const RARITY = [
  "var(--muted-bone)",
  "var(--hue-stick)",
  "var(--hue-mega)",
  "var(--accent)",
  "var(--hue-captain)",
];

interface PixelIconProps {
  seed: number;
  /** base hue for the sprite body */
  hue: string;
  className?: string;
}

/**
 * A procedural pixel-art item sprite on a rarity frame. Vertically mirrored on a
 * grid so it reads as a crafted game item, not noise. Fully generated (CC0,
 * mine), deterministic per seed, no network. Stands in for MegaKill's item
 * assets / Stick Sort's buttons until the real pixel art lands.
 */
export function PixelIcon({ seed, hue, className }: PixelIconProps) {
  const rng = makeRng(seed);
  const cols = 5; // left half incl. center column -> 9 wide after mirror
  const rows = 9;
  const width = cols * 2 - 1;
  const rarity = RARITY[seed % RARITY.length];

  const cells: { x: number; y: number; shade: number }[] = [];
  for (let y = 1; y < rows - 1; y++) {
    for (let x = 0; x < cols; x++) {
      // denser toward the center rows for a chunky, item-like silhouette
      const bias = y > 1 && y < rows - 2 ? 0.62 : 0.4;
      if (rng() < bias) {
        const shade = rng();
        cells.push({ x, y, shade });
        if (x !== cols - 1) cells.push({ x: width - 1 - x, y, shade });
      }
    }
  }

  return (
    <div
      className={className}
      style={{
        aspectRatio: "1",
        borderRadius: "0.6rem",
        padding: "14%",
        background: `color-mix(in oklab, ${rarity} 12%, var(--ink-deepest))`,
        border: `1px solid color-mix(in oklab, ${rarity} 55%, transparent)`,
        boxShadow: `inset 0 0 24px color-mix(in oklab, ${rarity} 14%, transparent)`,
      }}
    >
      <svg
        viewBox={`0 0 ${width} ${rows}`}
        width="100%"
        height="100%"
        shapeRendering="crispEdges"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        {cells.map((c, i) => (
          <rect
            key={i}
            x={c.x}
            y={c.y}
            width="1"
            height="1"
            fill={`color-mix(in oklab, ${hue} ${55 + c.shade * 40}%, var(--ink-deepest))`}
          />
        ))}
      </svg>
    </div>
  );
}
