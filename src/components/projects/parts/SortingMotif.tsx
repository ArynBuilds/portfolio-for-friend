"use client";

import { useEffect, useRef, useState } from "react";

/** Heights, shown sorted ascending: the resolved "ordered" state. */
const SORTED = [1, 2, 3, 4, 5, 6, 7];

/**
 * Stick Sort's signature: a row of sticks that grow into place left to right
 * when scrolled into view, resolving into clean ascending order (sort → order).
 * Pure transform (scaleY from the base), so it stays smooth and responsive with
 * no layout animation. Reduced motion shows the ordered state with no growth.
 */
export function SortingMotif({ hue }: { hue: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(false);
  const max = Math.max(...SORTED);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (e) => {
        if (e[0]?.isIntersecting) {
          setOn(true);
          io.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="mx-auto flex h-32 w-full max-w-[360px] items-end justify-center gap-2.5"
      aria-hidden="true"
    >
      {SORTED.map((v, i) => (
        <span
          key={i}
          className="flex-1 rounded-full"
          style={{
            height: `${(v / max) * 100}%`,
            transformOrigin: "bottom",
            transform: on ? "scaleY(1)" : "scaleY(0)",
            transition: "transform 0.6s var(--ease-out-expo)",
            transitionDelay: `${i * 70}ms`,
            background: `color-mix(in oklab, ${hue} ${42 + (v / max) * 48}%, var(--ink-deepest))`,
          }}
        />
      ))}
    </div>
  );
}
