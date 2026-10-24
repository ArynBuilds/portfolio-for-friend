import Image from "next/image";
import type { MediaSlot } from "@/content/types";
import { cn } from "@/lib/cn";
import { ScreenMock } from "./ScreenMock";
import { WideMock } from "./WideMock";

type MockKind = "screen" | "wide";

interface FrameProps {
  slot: MediaSlot;
  /** short label shown on the bare awaiting-asset frame */
  label?: string;
  hue: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  rounded?: boolean;
  /** render crisp, unsmoothed pixels (pixel-art assets) */
  pixelated?: boolean;
  /** how the image fills its slot; contain keeps transparent art uncropped */
  fit?: "cover" | "contain";
  /** stylized stand-in to show until the real asset lands */
  mock?: MockKind;
  /** seed so each mock varies */
  seed?: number;
  /** small honesty caption, e.g. "stylized placeholder" */
  note?: string;
}

/**
 * One media slot. Renders the real asset once `slot.src` is set; until then it
 * shows either a stylized game-art mock (when `mock` is given) or a bare
 * awaiting-asset frame. A `note` badge marks stand-ins as placeholders so they
 * aren't mistaken for shipped art. Aspect ratio is fixed by the slot, so swapping
 * in the real image never shifts layout.
 */
export function Frame({
  slot,
  label,
  hue,
  className,
  sizes = "(max-width: 768px) 100vw, 40vw",
  priority = false,
  rounded = true,
  pixelated = false,
  fit = "cover",
  mock,
  seed = 0,
  note,
}: FrameProps) {
  const showNote = note && !slot.src;
  return (
    <div
      className={cn("relative overflow-hidden", rounded && "rounded-lg", className)}
      style={{ aspectRatio: String(slot.ratio) }}
      role="img"
      aria-label={slot.alt}
    >
      {slot.src ? (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            fit === "contain" ? "object-contain" : "object-cover",
            pixelated && "[image-rendering:pixelated]",
          )}
        />
      ) : mock === "screen" ? (
        <ScreenMock seed={seed} hue={hue} />
      ) : mock === "wide" ? (
        <WideMock seed={seed} hue={hue} />
      ) : (
        <Placeholder label={label ?? slot.alt} ratio={slot.ratio} hue={hue} />
      )}

      {showNote && (
        <span className="pointer-events-none absolute bottom-2 left-2 rounded-full bg-[color:var(--ink-deepest)]/70 px-2 py-0.5 font-[family-name:var(--font-mono)] text-[0.58rem] tracking-wide text-[color:var(--muted-bone)] backdrop-blur-sm">
          {note}
        </span>
      )}
    </div>
  );
}

function Placeholder({ label, ratio, hue }: { label: string; ratio: number; hue: string }) {
  const dims = ratio < 0.8 ? "portrait" : ratio > 1.4 ? "wide" : "square";
  return (
    <div
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4 text-center"
      style={{
        background: `color-mix(in oklab, ${hue} 7%, transparent)`,
        border: `1px solid color-mix(in oklab, ${hue} 26%, transparent)`,
        borderRadius: "inherit",
      }}
    >
      <CropMarks hue={hue} />
      <span
        aria-hidden
        className="font-[family-name:var(--font-mono)] text-[0.62rem] uppercase tracking-[0.16em]"
        style={{ color: `color-mix(in oklab, ${hue} 70%, var(--fg))` }}
      >
        {dims}
      </span>
      <span className="max-w-[22ch] text-[0.74rem] leading-snug text-[color:var(--fg-muted)]">
        {label}
      </span>
    </div>
  );
}

function CropMarks({ hue }: { hue: string }) {
  const corner = "absolute h-3 w-3 opacity-50";
  const style = { borderColor: `color-mix(in oklab, ${hue} 50%, transparent)` };
  return (
    <>
      <span aria-hidden className={cn(corner, "left-2 top-2 border-l border-t")} style={style} />
      <span aria-hidden className={cn(corner, "right-2 top-2 border-r border-t")} style={style} />
      <span aria-hidden className={cn(corner, "bottom-2 left-2 border-b border-l")} style={style} />
      <span aria-hidden className={cn(corner, "bottom-2 right-2 border-b border-r")} style={style} />
    </>
  );
}
