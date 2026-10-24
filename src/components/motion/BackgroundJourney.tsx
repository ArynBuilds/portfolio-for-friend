"use client";

import { useEffect } from "react";

/**
 * Continuous color journey. A single fixed canvas color is interpolated by scroll
 * position through anchors tied to each zone, so the whole page glides between the
 * project colors instead of snapping. --fg tracks the interpolated lightness (ink
 * on light stretches, bone on dark) so text stays readable the whole way; muted,
 * hairline, and chrome colors derive from --fg / --canvas in CSS.
 *
 * Crazy Cups intentionally animates green→blue across its own height (the brief's
 * pastel gradient becomes a scroll gradient); the other zones hold their color
 * through the middle and transition at the seams.
 */

interface Stop {
  c: string;
  /** OKLCH lightness, for choosing text color */
  l: number;
}

const PAPER: Stop = { c: "oklch(0.985 0.004 85)", l: 0.985 };
const GREEN: Stop = { c: "oklch(0.9 0.07 168)", l: 0.9 };
const BLUE: Stop = { c: "oklch(0.87 0.085 246)", l: 0.87 };
const GREY: Stop = { c: "oklch(0.4 0.006 250)", l: 0.4 };
const BRIGHT: Stop = { c: "oklch(0.52 0.17 252)", l: 0.52 };
const DARK: Stop = { c: "oklch(0.25 0.06 255)", l: 0.25 };

/** text mix 0 = ink (dark), 1 = bone (light), with a narrow crossover band */
function fgMix(l: number) {
  const hi = 0.62;
  const lo = 0.5;
  if (l >= hi) return 0;
  if (l <= lo) return 1;
  return (hi - l) / (hi - lo);
}

export function BackgroundJourney() {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const abs = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { top: r.top + window.scrollY, height: r.height };
    };

    const update = () => {
      frame = 0;
      const hero = abs("top");
      const crazy = abs("crazy-cups");
      const mega = abs("megakill");
      const aye = abs("aye-captain");
      const stick = abs("stick-sort");
      const foot = abs("contact");
      if (!hero || !crazy || !mega || !aye || !stick || !foot) return;

      const anchors: Array<{ y: number; s: Stop }> = [
        { y: 0, s: PAPER },
        { y: hero.top + hero.height * 0.82, s: PAPER },
        { y: crazy.top, s: GREEN },
        { y: crazy.top + crazy.height, s: BLUE },
        { y: mega.top + mega.height * 0.18, s: GREY },
        { y: mega.top + mega.height * 0.85, s: GREY },
        { y: aye.top + aye.height * 0.18, s: BRIGHT },
        { y: aye.top + aye.height * 0.85, s: BRIGHT },
        { y: stick.top + stick.height * 0.2, s: DARK },
        { y: foot.top + foot.height, s: DARK },
      ];

      const probe = window.scrollY + window.innerHeight * 0.5;

      let a = anchors[0];
      let b = anchors[anchors.length - 1];
      let frac = 1;
      if (probe <= anchors[0].y) {
        a = b = anchors[0];
        frac = 0;
      } else {
        for (let i = 0; i < anchors.length - 1; i++) {
          if (probe >= anchors[i].y && probe <= anchors[i + 1].y) {
            a = anchors[i];
            b = anchors[i + 1];
            const span = b.y - a.y || 1;
            frac = (probe - a.y) / span;
            break;
          }
        }
        if (probe >= anchors[anchors.length - 1].y) {
          a = b = anchors[anchors.length - 1];
          frac = 0;
        }
      }

      const pct = Math.round(frac * 100);
      const l = a.s.l + (b.s.l - a.s.l) * frac;
      const t = Math.round(fgMix(l) * 100);

      root.style.setProperty("--canvas", `color-mix(in oklab, ${a.s.c}, ${b.s.c} ${pct}%)`);
      root.style.setProperty(
        "--fg",
        `color-mix(in oklab, var(--text-ink), var(--text-bone) ${t}%)`
      );
    };

    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
