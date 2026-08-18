"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Interaktywna wizualizacja mechanizmu "Silnik Kontekstu":
 * źródła (lewo) -> rdzeń -> output w twoim głosie (prawo).
 * Hover na źródle podświetla jego ścieżkę. Na in-view token płynie przez rdzeń.
 * Motion uzasadnione: pokazuje JAK wiedza wpada i zamienia się w output.
 * Reduced-motion = statyczny.
 */

const SOURCES = [
  { label: "notatka", y: 40 },
  { label: "lekcja", y: 110 },
  { label: "twój głos", y: 180 },
];
const CORE = { x: 230, y: 110 };
const OUT = { x: 430, y: 110 };

export function ZywyVault() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState<number | null>(null);

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-5 shadow-[0_30px_80px_-50px_rgba(8,12,40,0.4)] sm:p-7">
      <svg
        viewBox="0 0 480 230"
        className="h-auto w-full"
        role="img"
        aria-label="Źródła wiedzy wpadają do Silnika Kontekstu, który produkuje post w twoim głosie."
      >
        {/* ścieżki źródło -> rdzeń */}
        {SOURCES.map((s, i) => {
          const on = active === null || active === i;
          return (
            <motion.path
              key={`p-${i}`}
              d={`M 96 ${s.y + 14} C 160 ${s.y + 14}, 170 ${CORE.y}, ${CORE.x - 34} ${CORE.y}`}
              fill="none"
              stroke="var(--accent)"
              strokeWidth={active === i ? 2.4 : 1.4}
              initial={reduce ? false : { pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: on ? 0.5 : 0.16 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            />
          );
        })}

        {/* ścieżka rdzeń -> output */}
        <motion.path
          d={`M ${CORE.x + 34} ${CORE.y} C 330 ${CORE.y}, 360 ${CORE.y}, ${OUT.x - 56} ${CORE.y}`}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={2}
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        {/* token płynący źródło -> rdzeń -> output (loop) */}
        {!reduce && (
          <motion.circle
            r={4.5}
            fill="var(--accent)"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: [0, 1, 1, 1, 0] }}
            viewport={{ once: false }}
            animate={{
              cx: [96, CORE.x, OUT.x - 56],
              cy: [SOURCES[1].y + 14, CORE.y, CORE.y],
            }}
            transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
          />
        )}

        {/* źródła */}
        {SOURCES.map((s, i) => (
          <g
            key={`s-${i}`}
            onMouseEnter={() => setActive(i)}
            onMouseLeave={() => setActive(null)}
            className="cursor-default"
          >
            <rect
              x={16}
              y={s.y}
              width={80}
              height={28}
              rx={8}
              fill="var(--bg-page)"
              stroke="var(--border)"
              strokeWidth={1}
            />
            <text
              x={56}
              y={s.y + 18}
              textAnchor="middle"
              className="fill-[var(--text)] text-[12px] font-medium"
            >
              {s.label}
            </text>
          </g>
        ))}

        {/* rdzeń: Silnik Kontekstu */}
        <circle cx={CORE.x} cy={CORE.y} r={42} fill="var(--accent)" opacity={0.1} />
        <motion.circle
          cx={CORE.x}
          cy={CORE.y}
          r={30}
          fill="var(--accent)"
          animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: `${CORE.x}px ${CORE.y}px` }}
        />
        <text x={CORE.x} y={CORE.y - 1} textAnchor="middle" className="fill-white text-[10.5px] font-semibold">
          Silnik
        </text>
        <text x={CORE.x} y={CORE.y + 11} textAnchor="middle" className="fill-white text-[10.5px] font-semibold">
          Kontekstu
        </text>

        {/* output */}
        <rect x={OUT.x - 56} y={CORE.y - 18} width={72} height={36} rx={9} fill="var(--text)" />
        <text x={OUT.x - 20} y={CORE.y - 1} textAnchor="middle" className="fill-white text-[11px] font-semibold">
          post
        </text>
        <text x={OUT.x - 20} y={CORE.y + 11} textAnchor="middle" className="fill-white text-[9px]">
          twój głos
        </text>
      </svg>

      <p className="mt-4 text-center text-[13px] text-[var(--text-secondary)]">
        Najedź na źródło. Tak wiedza wpada i wychodzi twoim głosem.
      </p>
    </div>
  );
}
