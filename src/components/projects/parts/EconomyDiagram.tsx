"use client";

import { useEffect, useRef, useState } from "react";

interface Node {
  label: string;
  kind: "soft" | "special" | "premium";
}

/* The structure İlker designed: 4 soft + 1 special + 1 premium, all resolving
   into the prestige engine. Names are role-based (the GDD's currency names
   aren't public), so the diagram shows the shape, not invented labels. */
const NODES: Node[] = [
  { label: "Soft", kind: "soft" },
  { label: "Soft", kind: "soft" },
  { label: "Soft", kind: "soft" },
  { label: "Soft", kind: "soft" },
  { label: "Special", kind: "special" },
  { label: "Premium", kind: "premium" },
];

const CX = 200;
const CY = 165;
const RX = 150;
const RY = 120;

/* Tuned to read on Aye Captain!'s bright-blue zone: no blue, warm/light only. */
const COLOR: Record<Node["kind"], string> = {
  soft: "var(--fg)",
  special: "var(--accent)",
  premium: "oklch(0.86 0.13 92)",
};

function pos(i: number, n: number) {
  const angle = (-90 + (360 / n) * i) * (Math.PI / 180);
  return { x: CX + RX * Math.cos(angle), y: CY + RY * Math.sin(angle) };
}

/**
 * Aye Captain!'s signature: a currency-flow diagram that draws its connections
 * in when scrolled into view. Six resources resolve into a central prestige
 * engine; the reset loop arcs back. Pure SVG, transform/opacity + stroke-dash
 * only. Reduced motion shows the resolved state instantly.
 */
export function EconomyDiagram() {
  const ref = useRef<SVGSVGElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (e) => {
        if (e[0]?.isIntersecting) {
          setOn(true);
          obs.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <figure className="my-4">
      <svg
        ref={ref}
        viewBox="0 0 400 330"
        className="economy-svg h-auto w-full"
        data-on={on ? "" : undefined}
        role="img"
        aria-label="Economy diagram: four soft currencies, one special currency, and one premium currency all feed a central prestige engine, which resets the loop into a higher power tier."
      >
        {/* reset loop */}
        <ellipse
          cx={CX}
          cy={CY}
          rx={RX + 26}
          ry={RY + 26}
          fill="none"
          stroke="var(--fg-line)"
          strokeWidth="1"
          strokeDasharray="3 6"
        />

        {/* flows */}
        {NODES.map((node, i) => {
          const p = pos(i, NODES.length);
          return (
            <line
              key={`l-${i}`}
              className="flow"
              pathLength={1}
              x1={p.x}
              y1={p.y}
              x2={CX}
              y2={CY}
              stroke={COLOR[node.kind]}
              strokeWidth="1.4"
              strokeOpacity="0.6"
              style={{ transitionDelay: `${i * 90}ms` }}
            />
          );
        })}

        {/* currency nodes */}
        {NODES.map((node, i) => {
          const p = pos(i, NODES.length);
          return (
            <g
              key={`n-${i}`}
              className="node"
              style={{ transformOrigin: `${p.x}px ${p.y}px`, transitionDelay: `${250 + i * 70}ms` }}
            >
              <circle cx={p.x} cy={p.y} r="20" fill="var(--ink-deepest)" stroke={COLOR[node.kind]} strokeWidth="1.4" />
              <text x={p.x} y={p.y + 3} textAnchor="middle" className="node-label" fill="var(--text-bone)">
                {node.label}
              </text>
            </g>
          );
        })}

        {/* prestige core */}
        <g className="core" style={{ transformOrigin: `${CX}px ${CY}px` }}>
          <circle cx={CX} cy={CY} r="40" fill="color-mix(in oklab, var(--accent) 16%, var(--ink-deepest))" stroke="var(--accent)" strokeWidth="1.6" />
          <text x={CX} y={CY - 3} textAnchor="middle" className="core-label" fill="var(--text-bone)">
            Prestige
          </text>
          <text x={CX} y={CY + 13} textAnchor="middle" className="core-sub" fill="var(--muted-bone)">
            Pirate Shards
          </text>
        </g>
      </svg>

      <figcaption className="t-mono mt-4 text-center text-[color:var(--fg-muted)]">
        4 soft &nbsp;·&nbsp; 1 special &nbsp;·&nbsp; 1 premium &nbsp;→&nbsp; 1 prestige engine
      </figcaption>
    </figure>
  );
}
