function makeRng(seed: number) {
  let t = seed + 0x6d2b79f5;
  return () => {
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

interface ScreenMockProps {
  seed: number;
  hue: string;
}

/**
 * A stylized mobile-game screen: status row, HUD, a generated play-field, and
 * action buttons, all tinted to the project hue and varied by seed. A CSS/SVG
 * mockup (mine, license-clear), not a real screenshot. Fills its parent frame.
 */
export function ScreenMock({ seed, hue }: ScreenMockProps) {
  const rng = makeRng(seed);
  const tiles = Array.from({ length: 9 }, () => 0.25 + rng() * 0.7);
  const big = Math.floor(rng() * 9);

  return (
    <div
      className="flex h-full w-full flex-col gap-[4%] p-[7%]"
      style={{
        background: `linear-gradient(165deg, color-mix(in oklab, ${hue} 22%, var(--ink-deepest)), var(--ink-deepest))`,
      }}
      aria-hidden="true"
    >
      <div className="flex items-center justify-between">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-1.5 rounded-full" style={{ background: "var(--muted-bone)", opacity: 0.5 }} />
          ))}
        </div>
        <span className="h-2 w-10 rounded-full" style={{ background: `color-mix(in oklab, ${hue} 60%, transparent)` }} />
      </div>

      <div className="flex items-center gap-2">
        <span className="h-6 w-6 rounded-full" style={{ background: `color-mix(in oklab, ${hue} 70%, transparent)` }} />
        <span className="h-2.5 flex-1 rounded-full" style={{ background: "color-mix(in oklab, var(--text-bone) 18%, transparent)" }} />
        <span className="h-5 w-9 rounded-md" style={{ background: `color-mix(in oklab, ${hue} 45%, transparent)` }} />
      </div>

      <div className="grid flex-1 grid-cols-3 gap-[5%] py-[4%]">
        {tiles.map((o, i) => (
          <span
            key={i}
            className="rounded-xl"
            style={{
              background: `color-mix(in oklab, ${hue} ${o * 70}%, var(--ink-deepest))`,
              border: i === big ? `2px solid color-mix(in oklab, ${hue} 80%, white 10%)` : "none",
              transform: i === big ? "scale(1.04)" : "none",
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-[5%]">
        <span className="h-9 w-full rounded-xl" style={{ background: `color-mix(in oklab, ${hue} 75%, var(--ink-deepest))` }} />
        <div className="flex gap-[5%]">
          <span className="h-6 flex-1 rounded-lg" style={{ background: "color-mix(in oklab, var(--text-bone) 12%, transparent)" }} />
          <span className="h-6 flex-1 rounded-lg" style={{ background: "color-mix(in oklab, var(--text-bone) 12%, transparent)" }} />
        </div>
      </div>
    </div>
  );
}
