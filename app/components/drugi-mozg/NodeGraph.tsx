"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero bohater: animowany graf wiedzy w stylu Obsidiana.
 * Centralny węzeł "TY", satelity = twoja wiedza, krawędzie pulsują/wjeżdżają.
 * Cały graf delikatnie dryfuje. Reduced-motion = statyczny.
 * Motion uzasadnione: pokazuje "twój kontekst jako żywa sieć", nie dekoracja.
 */

const CENTER = { x: 210, y: 185 };
const NODES = [
  { x: 70, y: 64, label: "notatki" },
  { x: 350, y: 78, label: "głos" },
  { x: 48, y: 196, label: "lekcje" },
  { x: 372, y: 205, label: "decyzje" },
  { x: 118, y: 320, label: "posty" },
  { x: 312, y: 322, label: "maile" },
];
// dodatkowe krawędzie satelita-satelita dla efektu sieci
const WEB = [
  [0, 2],
  [1, 3],
  [4, 5],
];

export function NodeGraph() {
  const reduce = useReducedMotion();

  return (
    <svg
      viewBox="0 0 420 380"
      className="h-auto w-full max-w-[460px]"
      role="img"
      aria-label="Graf wiedzy: centralny węzeł ty, połączony z notatkami, głosem, lekcjami, decyzjami, postami i mailami."
    >
      <motion.g
        animate={reduce ? undefined : { y: [0, -7, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        {/* krawędzie ze środka do satelitów */}
        {NODES.map((n, i) => (
          <motion.line
            key={`e-${i}`}
            x1={CENTER.x}
            y1={CENTER.y}
            x2={n.x}
            y2={n.y}
            stroke="var(--accent)"
            strokeWidth={1.4}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 0.32 }}
            transition={{ duration: 0.7, delay: 0.15 + i * 0.12 }}
          />
        ))}
        {/* krawędzie sieci */}
        {WEB.map(([a, b], i) => (
          <motion.line
            key={`w-${i}`}
            x1={NODES[a].x}
            y1={NODES[a].y}
            x2={NODES[b].x}
            y2={NODES[b].y}
            stroke="var(--accent)"
            strokeWidth={1}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 0.14 }}
            transition={{ duration: 0.7, delay: 0.9 + i * 0.1 }}
          />
        ))}

        {/* satelity */}
        {NODES.map((n, i) => (
          <motion.g
            key={`n-${i}`}
            initial={reduce ? false : { opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.25 + i * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
            style={{ transformOrigin: `${n.x}px ${n.y}px` }}
          >
            <motion.circle
              cx={n.x}
              cy={n.y}
              r={8}
              fill="var(--bg-card)"
              stroke="var(--accent)"
              strokeWidth={1.6}
              animate={
                reduce ? undefined : { r: [8, 9.4, 8], opacity: [1, 0.82, 1] }
              }
              transition={{
                duration: 3.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.4,
              }}
            />
            <text
              x={n.x}
              y={n.y - 16}
              textAnchor="middle"
              className="fill-[var(--text-secondary)] text-[12px] font-medium"
            >
              {n.label}
            </text>
          </motion.g>
        ))}

        {/* centralny węzeł TY */}
        <motion.g
          initial={reduce ? false : { opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformOrigin: `${CENTER.x}px ${CENTER.y}px` }}
        >
          <circle
            cx={CENTER.x}
            cy={CENTER.y}
            r={30}
            fill="var(--accent)"
            opacity={0.12}
          />
          <circle cx={CENTER.x} cy={CENTER.y} r={20} fill="var(--accent)" />
          <text
            x={CENTER.x}
            y={CENTER.y + 5}
            textAnchor="middle"
            className="fill-white text-[15px] font-semibold"
          >
            TY
          </text>
        </motion.g>
      </motion.g>
    </svg>
  );
}
