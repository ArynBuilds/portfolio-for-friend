"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  /** stagger index; delays the settle by index * 65ms */
  index?: number;
  /** vertical start offset in px */
  shift?: number;
  /** element to render, defaults to div */
  as?: ElementType;
  className?: string;
}

/**
 * Reveals children once when scrolled into view (IntersectionObserver, unobserved
 * after firing). Visual settle lives in CSS ([data-reveal] → [data-revealed]);
 * reduced-motion is handled there too. Renders semantic markup via `as`.
 */
export function Reveal({ children, index = 0, shift = 24, as, className }: RevealProps) {
  const Tag = (as ?? "div") as ElementType;
  const ref = useRef<HTMLElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || revealed) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [revealed]);

  return (
    <Tag
      ref={ref}
      data-reveal=""
      data-revealed={revealed ? "" : undefined}
      style={{ "--i": index, "--reveal-shift": `${shift}px` } as React.CSSProperties}
      className={className}
    >
      {children}
    </Tag>
  );
}
