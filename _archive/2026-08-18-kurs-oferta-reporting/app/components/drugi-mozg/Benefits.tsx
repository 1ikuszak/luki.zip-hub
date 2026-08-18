"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Mic, Film, FileText, Lock, Check, PenLine } from "lucide-react";

/**
 * TRANSFORMATION (Dan Koe): obraz stanu docelowego. Nie OPISUJ korzyści, POKAŻ je.
 * Masa kart w stylu ContextCapture: każda korzyść = mikro-demo które gra na żywo
 * w viewport (głos pisze, kontekst się łapie, kontekst lockuje raz, system pracuje
 * jak ty, baza utrzymuje się sama). Karta moat = bohater (szeroka, akcent).
 * Wszystkie demka pauzują poza ekranem (useInView). Reduced-motion = stan końcowy.
 *
 * UWAGA: treści demo (linie, źródła) = placeholder microcopy do dotknięcia.
 */

const VOICE_LINE = "Nie pisz jak wszyscy. Pisz jak ty.";
const SOURCES = [
  { label: "twoje wyceny", Icon: FileText },
  { label: "twoi klienci", Icon: Film },
  { label: "twoje zasady", Icon: Mic },
];

// ── cykliczny beat: liczy fazy gdy w viewport ──────────────
function usePhase(inView: boolean, steps: number, ms: number, reduce: boolean) {
  const [p, setP] = useState(reduce ? steps - 1 : 0);
  useEffect(() => {
    if (reduce || !inView) return;
    setP(0);
    const id = setInterval(() => setP((x) => (x + 1) % steps), ms);
    return () => clearInterval(id);
  }, [inView, reduce, steps, ms]);
  return p;
}

function Shell({
  children,
  demo,
  peak,
  wide,
}: {
  children: React.ReactNode;
  demo: React.ReactNode;
  peak?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={`relative flex flex-col gap-5 rounded-2xl border p-6 sm:p-7 ${
        wide ? "lg:col-span-2" : ""
      } ${
        peak
          ? "border-[var(--accent)] bg-[var(--bg-card)] shadow-[0_40px_120px_-70px_rgba(38,86,217,0.7)]"
          : "border-[var(--border)] bg-[var(--bg-card)]"
      }`}
    >
      {peak && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl bg-[var(--accent)]/[0.04]"
        />
      )}
      <div
        className={`relative flex items-center ${
          peak ? "min-h-[148px]" : "min-h-[120px]"
        }`}
      >
        {demo}
      </div>
      <div className="relative">{children}</div>
    </div>
  );
}

// ── demo 1: pisze twoim głosem ─────────────────────────────
function VoiceDemo({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  const [n, setN] = useState(reduce ? VOICE_LINE.length : 0);
  const [done, setDone] = useState(reduce);
  useEffect(() => {
    if (reduce || !inView) return;
    let typeId: ReturnType<typeof setInterval>;
    const run = () => {
      let i = 0;
      setN(0);
      setDone(false);
      typeId = setInterval(() => {
        i += 1;
        setN(i);
        if (i >= VOICE_LINE.length) {
          clearInterval(typeId);
          setDone(true);
        }
      }, 55);
    };
    run();
    const loop = setInterval(run, 5200);
    return () => {
      clearInterval(typeId);
      clearInterval(loop);
    };
  }, [inView, reduce]);

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 text-[var(--accent)]">
        <PenLine size={15} strokeWidth={2.25} />
        <span className="t-small font-medium text-[var(--text-secondary)]">
          twój głos
        </span>
      </div>
      <p className="mt-3 text-[18px] font-semibold leading-snug tracking-[-0.01em] text-[var(--text)]">
        {VOICE_LINE.slice(0, n)}
        {!done && !reduce && (
          <span className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-[1px] animate-pulse bg-[var(--accent)] align-middle" />
        )}
      </p>
    </div>
  );
}

// ── demo 2: AI sięga po twoją wiedzę w sekundę ─────────────
function RetrievalDemo({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  const p = usePhase(inView, SOURCES.length + 1, 700, reduce);
  return (
    <div className="flex w-full flex-col gap-2.5">
      {SOURCES.map((s, i) => {
        const lit = reduce || p > i;
        return (
          <motion.div
            key={s.label}
            animate={{ opacity: lit ? 1 : 0.4 }}
            transition={{ duration: 0.3 }}
            className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 ${
              lit
                ? "border-[var(--accent)] bg-[var(--accent)]/[0.06]"
                : "border-[var(--border)]"
            }`}
          >
            <s.Icon size={14} strokeWidth={2} className="text-[var(--accent)]" />
            <span className="text-[13px] font-medium text-[var(--text)]">
              {s.label}
            </span>
            {lit && (
              <Check size={13} strokeWidth={2.75} className="ml-auto text-[var(--accent)]" />
            )}
          </motion.div>
        );
      })}
    </div>
  );
}

// ── demo 3: kontekst ustawiasz raz ─────────────────────────
function ContextOnceDemo({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  // 0 od zera (grey, miga), 1 locked (akcent)
  const p = usePhase(inView, 2, 1800, reduce);
  const locked = reduce || p === 1;
  return (
    <div className="flex w-full flex-col items-start gap-3">
      <motion.div
        animate={{
          borderColor: locked ? "var(--accent)" : "var(--border)",
          backgroundColor: locked ? "rgba(38,86,217,0.06)" : "rgba(38,86,217,0)",
        }}
        className="inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5"
      >
        <Lock
          size={15}
          strokeWidth={2.25}
          className={locked ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}
        />
        <span className="text-[14px] font-medium text-[var(--text)]">
          twój standard
        </span>
      </motion.div>
      <div className="flex items-baseline gap-2">
        <span className="text-[34px] font-semibold leading-none tracking-[-0.02em] text-[var(--accent)]">
          1×
        </span>
        <span className="t-small text-[var(--text-secondary)]">
          kodujesz go raz, pilnowany zawsze
        </span>
      </div>
    </div>
  );
}

// ── demo 4: MOAT, myśli jak ty ─────────────────────────────
// Sygnał wpada z węzłów wiedzy, zbiega do centrum, centrum "myśli" (rozbłysk).
function MoatDemo({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  const p = usePhase(inView, 7, 480, reduce);
  const C = { x: 130, y: 78 };
  const nodes = [
    { x: 36, y: 30 },
    { x: 224, y: 40 },
    { x: 232, y: 120 },
    { x: 48, y: 128 },
    { x: 130, y: 18 },
  ];
  const lit = (i: number) => reduce || p > i;
  const think = reduce || p >= nodes.length;
  return (
    <svg viewBox="0 0 260 156" className="h-[150px] w-full" aria-hidden>
      {nodes.map((n, i) => (
        <line
          key={`e-${i}`}
          x1={C.x}
          y1={C.y}
          x2={n.x}
          y2={n.y}
          stroke="var(--accent)"
          strokeWidth={1.3}
          strokeOpacity={lit(i) ? 0.4 : 0.1}
          style={{ transition: "stroke-opacity 0.4s ease" }}
        />
      ))}
      {/* sygnał płynący do centrum (ostatnio zapalony węzeł) */}
      {!reduce &&
        nodes.map((n, i) =>
          p === i + 1 ? (
            <motion.circle
              key={`s-${i}`}
              r={3}
              fill="var(--accent)"
              initial={{ cx: n.x, cy: n.y }}
              animate={{ cx: C.x, cy: C.y }}
              transition={{ duration: 0.42, ease: "easeIn" }}
            />
          ) : null,
        )}
      {nodes.map((n, i) => (
        <circle
          key={`n-${i}`}
          cx={n.x}
          cy={n.y}
          r={lit(i) ? 6 : 4.5}
          fill={lit(i) ? "var(--accent)" : "var(--bg-card)"}
          stroke="var(--accent)"
          strokeWidth={lit(i) ? 0 : 1.4}
          strokeOpacity={0.5}
          style={{ transition: "r 0.3s ease, fill 0.3s ease" }}
        />
      ))}
      <circle cx={C.x} cy={C.y} r={26} fill="var(--accent)" opacity={0.1} />
      <motion.circle
        cx={C.x}
        cy={C.y}
        r={18}
        fill="var(--accent)"
        animate={
          reduce ? undefined : think ? { scale: [1, 1.16, 1] } : { scale: 1 }
        }
        transition={{ duration: 0.7, ease: "easeOut" }}
        style={{ transformOrigin: `${C.x}px ${C.y}px` }}
      />
      {/* pierścień-myśl (solidny stroke, nie gradient) */}
      {think && !reduce && (
        <motion.circle
          cx={C.x}
          cy={C.y}
          fill="none"
          stroke="var(--accent)"
          strokeWidth={1.5}
          initial={{ r: 18, opacity: 0.5 }}
          animate={{ r: 40, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
      )}
      <text x={C.x} y={C.y} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="11" fontWeight={600}>
        TY
      </text>
    </svg>
  );
}

// ── demo 5: baza utrzymuje się sama ────────────────────────
// Żywy rozrost: węzły wyrastają z pnia po kolei, sieć rośnie i sama się porządkuje.
function SelfMaintainDemo({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  // 7 kroków: rozrost (0..5) -> hold -> reset (loop)
  const p = usePhase(inView, 8, 520, reduce);
  const root = { x: 26, y: 120 };
  const grown = [
    { x: 70, y: 96, from: root },
    { x: 116, y: 116, from: { x: 70, y: 96 } },
    { x: 120, y: 64, from: { x: 70, y: 96 } },
    { x: 170, y: 44, from: { x: 120, y: 64 } },
    { x: 176, y: 96, from: { x: 116, y: 116 } },
    { x: 220, y: 72, from: { x: 176, y: 96 } },
  ];
  const shown = (i: number) => reduce || p > i;
  return (
    <svg viewBox="0 0 250 150" className="h-[150px] w-full" aria-hidden>
      {grown.map((n, i) => (
        <line
          key={`e-${i}`}
          x1={n.from.x}
          y1={n.from.y}
          x2={n.x}
          y2={n.y}
          stroke="var(--accent)"
          strokeWidth={1.6}
          strokeOpacity={shown(i) ? 0.4 : 0}
          style={{ transition: "stroke-opacity 0.45s ease" }}
        />
      ))}
      {/* pień */}
      <circle cx={root.x} cy={root.y} r={7} fill="var(--accent)" />
      {grown.map((n, i) => (
        <motion.circle
          key={`n-${i}`}
          cx={n.x}
          cy={n.y}
          fill="var(--accent)"
          initial={false}
          animate={{ r: shown(i) ? 5.5 : 0, opacity: shown(i) ? 1 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />
      ))}
    </svg>
  );
}

export function Benefits() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px" });

  return (
    <section className="container-wide py-24 sm:py-32">
      <motion.h2
        className="t-h2 max-w-[18ch]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Jak wygląda twój dzień, gdy to stoi.
      </motion.h2>

      <div ref={ref} className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Shell demo={<VoiceDemo inView={inView} reduce={reduce} />}>
          <p className="t-body max-w-[30ch] text-[var(--text)]">
            Piszesz brief w dwóch zdaniach. Dostajesz post, maila albo ofertę
            w swoim głosie. Wybierasz wersję, zamiast ratować generyk.
          </p>
        </Shell>

        <Shell demo={<RetrievalDemo inView={inView} reduce={reduce} />}>
          <p className="t-body max-w-[30ch] text-[var(--text)]">
            Pytasz o wycenę, priorytet, plan tygodnia. Odpowiada z twojej
            historii i twoich liczb, nie z poradnika dla wszystkich.
          </p>
        </Shell>

        <Shell demo={<ContextOnceDemo inView={inView} reduce={reduce} />}>
          <p className="t-body max-w-[30ch] text-[var(--text)]">
            Wrzucasz kreację, stronę, tekst. Ocenia pod twój gust i twój
            standard. Jak wspólnik, który zna twoją kreskę.
          </p>
        </Shell>

        {/* MOAT = bohater */}
        <Shell peak wide demo={<MoatDemo inView={inView} reduce={reduce} />}>
          <p className="max-w-[40ch] text-[22px] font-semibold leading-snug tracking-[-0.01em] text-[var(--text)] sm:text-[26px]">
            AI, które myśli jak ty, nie jak internet. Każdy ma dostęp do tych
            samych modeli. Twojego kontekstu nie ma nikt.
          </p>
        </Shell>

        <Shell demo={<SelfMaintainDemo inView={inView} reduce={reduce} />}>
          <p className="t-body max-w-[30ch] text-[var(--text)]">
            System utrzymuje się sam. Agent sprząta raz w tygodniu. Nie umiera
            po dwóch tygodniach jak każdy folder przed nim.
          </p>
        </Shell>
      </div>
    </section>
  );
}
