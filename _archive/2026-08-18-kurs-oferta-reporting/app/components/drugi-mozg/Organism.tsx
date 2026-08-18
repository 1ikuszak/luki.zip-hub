"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Network, MessageSquareText, PenLine, Sparkles } from "lucide-react";

/**
 * THE MECHANISM (Dan Koe): nazwany mechanizm "Zywy System" jako BOHATER.
 * Cztery narzady jednego organizmu wokol rdzenia (twoj vault), polaczone w petle.
 * Energia kazy po pierscieniu = organizm pracuje/oddycha. Ta sama rodzina wizualna
 * co mózg w Hero i spine w dream-day (wezly + krawedzie + ignite) = sygnatura.
 * Hover = narzad rozwija jednolinijke. Reduced-motion = statyczny.
 *
 * Pozycje w viewBox 920x480: rdzen (460,240), narzady na elipsie rx360 ry170.
 */

type Organ = {
  label: string;
  // jednolinijka = placeholder microcopy (do dotkniecia przez Luki)
  line: string;
  Icon: typeof Network;
  // procent kontenera (zsync z viewBox: x/920, y/480)
  left: string;
  top: string;
};

const ORGANS: Organ[] = [
  {
    label: "Układa się",
    line: "Wrzucasz, system sam sortuje w kontekst.",
    Icon: Network,
    left: "50%",
    top: "14.6%",
  },
  {
    label: "Odpowiada",
    line: "Pytasz, sięga po twoją wiedzę i odpowiada z niej.",
    Icon: MessageSquareText,
    left: "89.1%",
    top: "50%",
  },
  {
    label: "Pisze za ciebie",
    line: "Post, mail, oferta, w twoim głosie.",
    Icon: PenLine,
    left: "50%",
    top: "85.4%",
  },
  {
    label: "Uczy się po tobie",
    line: "Im więcej wrzucasz, tym mądrzejszy się robi.",
    Icon: Sparkles,
    left: "10.9%",
    top: "50%",
  },
];

const RING = "M100,240 a360,170 0 1,0 720,0 a360,170 0 1,0 -720,0";
const ORGAN_PT = [
  [460, 70],
  [820, 240],
  [460, 410],
  [100, 240],
];

export function Organism() {
  const reduce = useReducedMotion();
  const [hover, setHover] = useState<number | null>(null);

  return (
    <>
      {/* MOBILE (<md): 2x2 grid kart, zero overflow, jednolinijki zawsze widoczne */}
      <div className="md:hidden">
        <div className="mb-6 flex justify-center">
          <div className="flex flex-col items-center rounded-2xl bg-[var(--accent)] px-6 py-3 shadow-[0_16px_40px_-20px_rgba(38,86,217,0.6)]">
            <span className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
              Twój
            </span>
            <span className="text-[15px] font-semibold text-white">vault</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {ORGANS.map((o) => (
            <div
              key={o.label}
              className="rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-4"
            >
              <o.Icon
                size={20}
                strokeWidth={2}
                className="text-[var(--accent)]"
              />
              <p className="mt-2.5 text-[15px] font-semibold text-[var(--text)]">
                {o.label}
              </p>
              <p className="mt-1 text-[12.5px] leading-snug text-[var(--text-secondary)]">
                {o.line}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* DESKTOP (md+): zywy organizm na elipsie */}
      <div className="relative mx-auto hidden aspect-[920/480] w-full max-w-[920px] md:block">
      {/* warstwa krawedzi + rdzen + energia */}
      <svg
        viewBox="0 0 920 480"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        {/* spokes rdzen -> narzad */}
        {ORGAN_PT.map(([x, y], i) => (
          <line
            key={`s-${i}`}
            x1={460}
            y1={240}
            x2={x}
            y2={y}
            stroke="var(--accent)"
            strokeOpacity={hover === i ? 0.4 : 0.16}
            strokeWidth={hover === i ? 2 : 1.2}
          />
        ))}
        {/* pierscien petli */}
        <ellipse
          cx={460}
          cy={240}
          rx={360}
          ry={170}
          fill="none"
          stroke="var(--accent)"
          strokeOpacity={0.18}
          strokeWidth={1.2}
        />
        {/* rdzen */}
        <circle cx={460} cy={240} r={64} fill="var(--accent)" opacity={0.08} />
        <motion.circle
          cx={460}
          cy={240}
          r={44}
          fill="var(--accent)"
          animate={reduce ? undefined : { scale: [1, 1.05, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "460px 240px" }}
        />

        {/* energia krazaca po petli = organizm pracuje */}
        {!reduce && (
          <>
            <circle r={5} fill="var(--accent)">
              <animateMotion dur="7s" repeatCount="indefinite" path={RING} />
            </circle>
            <circle r={3.5} fill="var(--accent)" opacity={0.6}>
              <animateMotion
                dur="7s"
                begin="-3.5s"
                repeatCount="indefinite"
                path={RING}
              />
            </circle>
          </>
        )}
      </svg>

      {/* rdzen label (HTML nad SVG) */}
      <div
        className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
        style={{ left: "50%", top: "50%" }}
      >
        <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
          Twój
        </span>
        <span className="text-[13px] font-semibold text-white">vault</span>
      </div>

      {/* narzady (HTML pills) */}
      {ORGANS.map((o, i) => (
        <motion.div
          key={o.label}
          className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
          style={{ left: o.left, top: o.top }}
          onHoverStart={() => setHover(i)}
          onHoverEnd={() => setHover(null)}
          animate={
            reduce
              ? undefined
              : { y: [0, i % 2 === 0 ? -4 : 4, 0] }
          }
          transition={{
            duration: 4.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.5,
          }}
        >
          <div
            className={`flex items-center gap-2 rounded-full border bg-[var(--bg-card)] px-4 py-2.5 shadow-[0_14px_40px_-22px_rgba(8,12,40,0.45)] transition-colors ${
              hover === i
                ? "border-[var(--accent)]"
                : "border-[var(--border)]"
            }`}
          >
            <o.Icon
              size={18}
              strokeWidth={2}
              className="shrink-0 text-[var(--accent)]"
            />
            <span className="whitespace-nowrap text-[14px] font-semibold text-[var(--text)]">
              {o.label}
            </span>
          </div>
          {/* one-liner zawsze widoczny (nie tylko na hover) */}
          <span className="mt-2 max-w-[180px] text-center text-[12.5px] leading-snug text-[var(--text-secondary)]">
            {o.line}
          </span>
        </motion.div>
      ))}
      </div>
    </>
  );
}
