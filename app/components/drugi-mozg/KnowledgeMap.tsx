"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Film, Mic, FileText } from "lucide-react";

/**
 * Mapa wiedzy (jak mózg w hero, mniejsza) do prawego panelu ContextCapture.
 * Gęsta sieć węzłów + zaznaczone źródła (reele/głos/notatki) + białe, czyste
 * pliczki .md LEWITUJĄCE w sieci. Zsynchronizowana z czatem: na "retrieving"
 * źródła świecą i sygnały płyną do "bazy", na "answered" baza rozbłyskuje.
 * Layout deterministyczny (phyllotaxis) = stabilny SSR/CSR. Zero gradientów.
 *
 * UWAGA: nazwy plików .md = placeholder microcopy do dotknięcia.
 */

const VW = 420;
const VH = 360;
const BAZA = { x: 298, y: 185 };

const SOURCES = [
  { x: 52, y: 78, label: "twoje reele", Icon: Film },
  { x: 40, y: 185, label: "twój głos", Icon: Mic },
  { x: 52, y: 292, label: "twoje notatki", Icon: FileText },
];

// pliczki .md lewitujące (pozycje w % panelu)
const FILES = [
  { x: 46, y: 19, name: "reel-hook.md" },
  { x: 70, y: 23, name: "moj-glos.md" },
  { x: 71, y: 64, name: "strategia.md" },
  { x: 44, y: 81, name: "notatki.md" },
  { x: 34, y: 34, name: "pomysly.md" },
];

type P = { x: number; y: number };

export function KnowledgeMap({
  retrieving,
  answered,
  reduce,
}: {
  retrieving: boolean;
  answered: boolean;
  reduce: boolean;
}) {
  const { dots, mesh, spokes } = useMemo(() => {
    const N = 84;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const cx = 272, cy = 185, R = 150;
    const dots: P[] = [];
    for (let i = 0; i < N; i++) {
      const t = (i + 0.5) / N;
      const r = R * Math.sqrt(t);
      const a = i * golden;
      let x = cx + Math.cos(a) * r;
      let y = cy + Math.sin(a) * r * 0.95;
      x = Math.max(116, Math.min(408, x));
      y = Math.max(22, Math.min(338, y));
      dots.push({ x, y });
    }
    // mesh: każdy do 2 najbliższych (look Obsidiana)
    const mesh: [number, number][] = [];
    for (let i = 0; i < N; i++) {
      const near = dots
        .map((d, j) => ({ j, d: (dots[i].x - d.x) ** 2 + (dots[i].y - d.y) ** 2 }))
        .filter((o) => o.j !== i)
        .sort((p, q) => p.d - q.d)
        .slice(0, 2);
      for (const { j } of near) if (i < j) mesh.push([i, j]);
    }
    // spokes: kilkanaście najbliższych bazie -> baza (hub)
    const spokes = dots
      .map((d, j) => ({ j, d: (BAZA.x - d.x) ** 2 + (BAZA.y - d.y) ** 2 }))
      .sort((p, q) => p.d - q.d)
      .slice(0, 16)
      .map((o) => o.j);
    return { dots, mesh, spokes };
  }, []);

  return (
    <div className="relative w-full">
      <svg viewBox={`0 0 ${VW} ${VH}`} className="h-auto w-full" role="img" aria-label="Mapa twojej wiedzy: gęsta sieć notatek i konceptów wokół centralnej bazy, ze źródłami reele, głos, notatki. Po wysłaniu pytania świecą tylko potrzebne źródła i płyną do bazy.">
        {/* mesh (tło sieci) */}
        {mesh.map(([a, b], i) => (
          <line key={`m-${i}`} x1={dots[a].x} y1={dots[a].y} x2={dots[b].x} y2={dots[b].y} stroke="var(--accent)" strokeWidth={0.8} strokeOpacity={0.1} />
        ))}
        {/* spokes do bazy */}
        {spokes.map((j, i) => (
          <line key={`s-${i}`} x1={BAZA.x} y1={BAZA.y} x2={dots[j].x} y2={dots[j].y} stroke="var(--accent)" strokeWidth={0.9} strokeOpacity={0.14} />
        ))}
        {/* drobne węzły */}
        {dots.map((d, i) => (
          <circle key={`d-${i}`} cx={d.x} cy={d.y} r={1.9} fill="rgba(59,66,82,0.8)" />
        ))}

        {/* krawędzie źródeł -> baza (świecą na retrieve) */}
        {SOURCES.map((s, i) => (
          <line
            key={`se-${i}`}
            x1={BAZA.x}
            y1={BAZA.y}
            x2={s.x}
            y2={s.y}
            stroke="var(--accent)"
            strokeWidth={1.6}
            strokeOpacity={retrieving ? 0.45 : 0.14}
            style={{ transition: "stroke-opacity 0.4s ease" }}
          />
        ))}
        {/* sygnały źródło -> baza */}
        {retrieving &&
          !reduce &&
          SOURCES.map((s, i) => (
            <motion.circle
              key={`sig-${i}`}
              r={3}
              fill="var(--accent)"
              initial={{ cx: s.x, cy: s.y, opacity: 0 }}
              animate={{ cx: BAZA.x, cy: BAZA.y, opacity: [0, 1, 1, 0] }}
              transition={{ duration: 0.9, delay: i * 0.18, ease: "easeIn" }}
            />
          ))}

        {/* węzły źródeł + etykiety */}
        {SOURCES.map((s, i) => (
          <g key={`sn-${i}`}>
            <circle cx={s.x} cy={s.y} r={retrieving ? 8 : 6} fill="var(--accent)" style={{ transition: "r 0.35s ease" }} />
            <text x={s.x + 14} y={s.y} dominantBaseline="central" fontSize="12.5" fontWeight={600} fill={retrieving ? "var(--accent)" : "var(--text-secondary)"} style={{ transition: "fill 0.35s ease" }}>
              {s.label}
            </text>
          </g>
        ))}

        {/* baza (hub) */}
        <circle cx={BAZA.x} cy={BAZA.y} r={32} fill="var(--accent)" opacity={0.1} />
        <motion.circle
          cx={BAZA.x}
          cy={BAZA.y}
          r={23}
          fill="var(--accent)"
          animate={reduce ? undefined : retrieving && !answered ? { scale: [1, 1.12, 1] } : { scale: 1 }}
          transition={{ duration: 0.8, repeat: retrieving && !answered && !reduce ? Infinity : 0, ease: "easeInOut" }}
          style={{ transformOrigin: `${BAZA.x}px ${BAZA.y}px` }}
        />
        {answered && !reduce && (
          <motion.circle cx={BAZA.x} cy={BAZA.y} fill="none" stroke="var(--accent)" strokeWidth={1.5} initial={{ r: 23, opacity: 0.5 }} animate={{ r: 50, opacity: 0 }} transition={{ duration: 1, ease: "easeOut" }} />
        )}
        <text x={BAZA.x} y={BAZA.y} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="12" fontWeight={600}>
          baza
        </text>
      </svg>

      {/* białe pliczki .md lewitujące w sieci */}
      {FILES.map((f, i) => (
        <motion.div
          key={f.name}
          className="pointer-events-none absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-lg border border-[var(--border)] bg-white px-2 py-1.5 shadow-[0_10px_30px_-14px_rgba(8,12,40,0.4)]"
          style={{ left: `${f.x}%`, top: `${f.y}%` }}
          animate={reduce ? undefined : { y: [0, i % 2 ? -5 : 5, 0] }}
          transition={{ duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FileText size={12} strokeWidth={2} className="shrink-0 text-[var(--accent)]" />
          <span className="text-[11px] font-medium text-[var(--text)]">{f.name}</span>
        </motion.div>
      ))}
    </div>
  );
}
