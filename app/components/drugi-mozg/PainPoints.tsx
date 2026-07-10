"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUp, FileText, Mail, MessageSquare, Mic, StickyNote, Folder, RotateCcw } from "lucide-react";

/**
 * "Znasz to." = TOP 3 problemy jako karty z mikro-demami (jakość jak dream-day),
 * każdy POKAZANY w akcji, nie opisany:
 *  1. (bohater, duża karta) generyk: pytanie -> AI typuje slop -> szarzeje "puste".
 *  2. rozsypana wiedza: węzły-narzędzia dryfują osobno, rozłączone, martwe.
 *  3. od zera: kontekst typuje się i resetuje w kółko, licznik prób rośnie.
 * Wszystko pauzuje poza ekranem. Reduced-motion = stan końcowy. Zero gradientów.
 *
 * UWAGA: treści demo = placeholder microcopy do dotknięcia.
 */

// ── karta-shell ────────────────────────────────────────────
function Card({
  children,
  demo,
  tall,
  demoClass,
}: {
  children: React.ReactNode;
  demo: React.ReactNode;
  tall?: boolean;
  demoClass?: string;
}) {
  return (
    <div className={`flex flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 sm:p-7 ${tall ? "lg:row-span-2" : ""}`}>
      <div className={`relative ${demoClass ?? "min-h-[120px]"}`}>{demo}</div>
      <div className="mt-5">{children}</div>
    </div>
  );
}

// ── demo 1: generyk (chat slop -> szarość) ─────────────────
const QUESTION = "Napisz mi posta o budowaniu marki.";
const SLOP =
  "W dzisiejszych czasach budowanie marki osobistej jest kluczowe. To świetny sposób, żeby zwiększyć swoją widoczność i budować zaufanie. Bądź autentyczny i regularnie publikuj wartościowe treści. Zacznij już dziś!";

function ChatSlopDemo({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  const [n, setN] = useState(reduce ? SLOP.length : 0);
  const [grey, setGrey] = useState(reduce);
  useEffect(() => {
    if (reduce || !inView) return;
    let typeId: ReturnType<typeof setInterval>;
    const run = () => {
      let i = 0;
      setN(0);
      setGrey(false);
      typeId = setInterval(() => {
        i += 2;
        setN(Math.min(i, SLOP.length));
        if (i >= SLOP.length) {
          clearInterval(typeId);
          setTimeout(() => setGrey(true), 700);
        }
      }, 24);
    };
    run();
    const loop = setInterval(run, 6400);
    return () => {
      clearInterval(typeId);
      clearInterval(loop);
    };
  }, [inView, reduce]);

  const typing = n < SLOP.length;
  return (
    <div className="flex h-full flex-col">
      {/* pytanie */}
      <div className="flex justify-end">
        <div className="flex items-center gap-2.5 rounded-2xl rounded-br-md bg-[var(--text)]/[0.06] px-3.5 py-2.5">
          <span className="text-[14px] font-medium text-[var(--text)]">{QUESTION}</span>
          <ArrowUp size={14} strokeWidth={2.5} className="text-[var(--text-secondary)]" />
        </div>
      </div>
      {/* odpowiedź slop */}
      <motion.p
        animate={{ opacity: grey ? 0.4 : 1, filter: grey ? "grayscale(1)" : "grayscale(0)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-4 text-[15px] leading-relaxed text-[var(--text-secondary)] sm:text-[16px]"
      >
        {SLOP.slice(0, n)}
        {typing && !reduce && (
          <span className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-[1px] animate-pulse bg-[var(--text-secondary)] align-middle" />
        )}
      </motion.p>
      <motion.span
        animate={{ opacity: grey ? 1 : 0, y: grey ? 0 : 6 }}
        transition={{ duration: 0.5 }}
        className="mt-4 inline-flex w-fit items-center rounded-md bg-[var(--text-secondary)]/10 px-2.5 py-1 text-[12.5px] font-medium text-[var(--text-secondary)]"
      >
        poprawne. gładkie. puste.
      </motion.span>
    </div>
  );
}

// ── demo 2: rozsypana wiedza (osobne, dryfujące węzły) ─────
const TOOLS = [
  { Icon: StickyNote, x: 8, y: 14 },
  { Icon: Mail, x: 62, y: 8 },
  { Icon: MessageSquare, x: 36, y: 40 },
  { Icon: FileText, x: 80, y: 46 },
  { Icon: Mic, x: 14, y: 64 },
  { Icon: Folder, x: 58, y: 70 },
];

// próby połączeń (centra węzłów, %): pojawiają się i gasną = nic się nie spina
const FAILS = [
  [11.4, 29, 39.4, 55],
  [39.4, 55, 61.4, 85],
  [65.4, 23, 83.4, 61],
];

function ScatteredDemo({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  return (
    <div className="relative h-[120px] w-full">
      {/* nieudane połączenia (dashed, gasną) */}
      {!reduce && (
        <svg aria-hidden className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {FAILS.map(([x1, y1, x2, y2], i) => (
            <motion.line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="var(--text-secondary)"
              strokeWidth={0.4}
              strokeDasharray="2 2"
              animate={inView ? { opacity: [0, 0.35, 0] } : { opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.7, ease: "easeInOut" }}
            />
          ))}
        </svg>
      )}
      {TOOLS.map((t, i) => (
        <motion.span
          key={i}
          className="absolute flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--bg-page)]"
          style={{ left: `${t.x}%`, top: `${t.y}%` }}
          animate={reduce || !inView ? undefined : { y: [0, i % 2 ? -6 : 6, 0], x: [0, i % 2 ? 4 : -4, 0] }}
          transition={{ duration: 4 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <t.Icon size={16} strokeWidth={2} className="text-[var(--text-secondary)]/60" />
        </motion.span>
      ))}
    </div>
  );
}

// ── demo 3: od zera (kontekst typuje się i resetuje) ───────
const CTX = "kim jesteś, co robisz, twój styl, twój kontekst...";

function ZeroLoopDemo({ inView, reduce }: { inView: boolean; reduce: boolean }) {
  const [n, setN] = useState(reduce ? CTX.length : 0);
  const [tries, setTries] = useState(reduce ? 7 : 1);
  useEffect(() => {
    if (reduce || !inView) return;
    let typeId: ReturnType<typeof setInterval>;
    const run = () => {
      let i = 0;
      setN(0);
      typeId = setInterval(() => {
        i += 1;
        setN(Math.min(i, CTX.length));
        if (i >= CTX.length) clearInterval(typeId);
      }, 45);
    };
    run();
    const loop = setInterval(() => {
      setTries((t) => t + 1);
      run();
    }, 3200);
    return () => {
      clearInterval(typeId);
      clearInterval(loop);
    };
  }, [inView, reduce]);

  return (
    <div className="flex h-[120px] w-full flex-col justify-center gap-3">
      <div className="flex items-center gap-2 text-[var(--text-secondary)]">
        <motion.span
          animate={reduce || !inView ? undefined : { rotate: -360 }}
          transition={{ duration: 3.2, repeat: Infinity, ease: "linear" }}
        >
          <RotateCcw size={15} strokeWidth={2} />
        </motion.span>
        <span className="t-small">znowu tłumaczysz, próba {tries}</span>
      </div>
      <div className="rounded-lg border border-[var(--border)] bg-[var(--bg-page)] px-3 py-2.5 font-mono text-[12.5px] text-[var(--text-secondary)]">
        {CTX.slice(0, n)}
        {n < CTX.length && !reduce && (
          <span className="ml-0.5 inline-block h-[1em] w-[6px] -translate-y-[1px] animate-pulse bg-[var(--text-secondary)] align-middle" />
        )}
      </div>
    </div>
  );
}

export function PainPoints() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px" });

  return (
    <section className="container-wide py-20 sm:py-28">
      <motion.h2
        className="t-h2 max-w-[16ch]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Znasz to.
      </motion.h2>
      <motion.p
        className="t-body-large mt-4 max-w-[42ch] text-[var(--text-secondary)]"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        Trzy powody, przez które AI brzmi jak wszyscy, a twoja wiedza leży
        i nie zarabia.
      </motion.p>

      <div ref={ref} className="mt-12 grid gap-4 lg:auto-rows-fr lg:grid-cols-2">
        <Card tall demoClass="min-h-[200px] flex-1" demo={<ChatSlopDemo inView={inView} reduce={reduce} />}>
          <h3 className="t-h3">Pytasz o posta. Dostajesz coś, co mógł napisać każdy.</h3>
          <p className="t-body mt-2 text-[var(--text-secondary)]">
            Model cię nie zna. Dostaje pusty prompt, oddaje średnią internetu.
          </p>
        </Card>

        <Card demo={<ScatteredDemo inView={inView} reduce={reduce} />}>
          <h3 className="t-h3">Twoja wiedza siedzi w 40 narzędziach.</h3>
          <p className="t-body mt-2 text-[var(--text-secondary)]">
            Notatki, maile, transkrypcje, screeny. Każde osobno. Żadne nie
            pracuje.
          </p>
        </Card>

        <Card demo={<ZeroLoopDemo inView={inView} reduce={reduce} />}>
          <h3 className="t-h3">Tłumaczysz AI to samo. Trzeci raz w tym tygodniu.</h3>
          <p className="t-body mt-2 text-[var(--text-secondary)]">
            Każdy nowy czat zaczyna od zera. Kim jesteś, co robisz, jak piszesz.
            Od nowa.
          </p>
        </Card>
      </div>

      <motion.p
        className="mt-10 max-w-[620px] text-balance text-[20px] font-semibold leading-snug tracking-[-0.01em] text-[var(--text)] sm:text-[24px]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6 }}
      >
        Jedna rzecz to naprawia: system, który zna ciebie.
      </motion.p>
    </section>
  );
}
