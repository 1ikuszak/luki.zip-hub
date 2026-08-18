"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FileText, Mic, Film, ArrowUp } from "lucide-react";
import { KnowledgeMap } from "./KnowledgeMap";

/**
 * "Pokaż system w akcji": piszesz pytanie -> ENTER -> sygnał leci do bazy (mózg
 * po prawej), zapalają się TYLKO potrzebne źródła, baza to przetwarza i zwraca
 * odpowiedź z cytatami. Czat (lewy) zsynchronizowany z mózgiem (prawy).
 * Auto-loop w viewport. Reduced-motion = stan końcowy. Zero gradientów.
 *
 * UWAGA: treść demo (pytanie, źródła, odpowiedź) = placeholder microcopy.
 */

const SOURCES = [
  { label: "twoje reele", Icon: Film },
  { label: "twój głos", Icon: Mic },
  { label: "twoje notatki", Icon: FileText },
];
const QUESTION = "Napisz hook do reela o drugim mózgu.";
const ANSWER =
  "Twoja wiedza siedzi w 40 narzędziach i nie pracuje. Pokażę ci system, z którego AI pisze twoim głosem, w sekundę.";

export function ContextCapture() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: false, margin: "-20% 0px" });
  // faza: 0 pytanie, 1 retrieving (baza świeci), 2 odpowiedź, 3 hold
  const [phase, setPhase] = useState(reduce ? 3 : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    setPhase(0);
    let inner: ReturnType<typeof setTimeout>[] = [
      setTimeout(() => setPhase(1), 700),
      setTimeout(() => setPhase(2), 2200),
      setTimeout(() => setPhase(3), 3500),
    ];
    const loop = setInterval(() => {
      setPhase(0);
      inner.forEach(clearTimeout);
      inner = [
        setTimeout(() => setPhase(1), 700),
        setTimeout(() => setPhase(2), 2200),
        setTimeout(() => setPhase(3), 3500),
      ];
    }, 6600);
    return () => {
      inner.forEach(clearTimeout);
      clearInterval(loop);
    };
  }, [inView, reduce]);

  const retrieving = phase >= 1;
  const answered = phase >= 2;

  return (
    <section className="container-wide py-24 sm:py-32">
      <motion.h2
        className="t-h2 max-w-[22ch]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Pytasz. Sięga po twoją wiedzę. Odpowiada z niej.
      </motion.h2>

      <div ref={ref} className="mt-10 grid items-stretch gap-6 lg:grid-cols-[1fr_0.82fr]">
        {/* LEWA: czat */}
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[0_40px_120px_-70px_rgba(8,12,40,0.5)]">
          <div className="flex justify-end border-b border-[var(--border)] bg-[var(--bg-page)] px-6 py-5 sm:px-8">
            <div className="flex items-center gap-3 rounded-2xl rounded-br-md bg-[var(--accent)] px-4 py-3">
              <span className="text-[15px] font-medium text-white">{QUESTION}</span>
              <ArrowUp size={16} strokeWidth={2.5} className="text-white/70" />
            </div>
          </div>

          <div className="border-b border-[var(--border)] px-6 py-6 sm:px-8">
            <p className="t-small mb-4 font-medium text-[var(--text-secondary)]">
              {retrieving && !answered ? "Sięgam po twój kontekst..." : "Twój kontekst:"}
            </p>
            <div className="flex flex-wrap gap-2.5">
              {SOURCES.map((s, i) => {
                const lit = retrieving;
                return (
                  <motion.span
                    key={s.label}
                    initial={false}
                    animate={{ opacity: lit ? 1 : 0.4, scale: lit ? 1 : 0.96 }}
                    transition={{ duration: 0.4, delay: lit && !reduce ? i * 0.18 : 0 }}
                    className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-2 ${
                      lit ? "border-[var(--accent)] bg-[var(--accent)]/[0.06]" : "border-[var(--border)] bg-[var(--bg-card)]"
                    }`}
                  >
                    <s.Icon size={15} strokeWidth={2} className="text-[var(--accent)]" />
                    <span className="text-[13.5px] font-medium text-[var(--text)]">{s.label}</span>
                  </motion.span>
                );
              })}
            </div>
          </div>

          <div className="px-6 py-7 sm:px-8">
            <motion.div initial={false} animate={{ opacity: answered ? 1 : 0.25 }} transition={{ duration: 0.5 }}>
              <p className="text-[17px] leading-relaxed text-[var(--text)] sm:text-[18px]">
                {answered ? (
                  ANSWER
                ) : (
                  <span className="inline-flex gap-1.5 align-middle">
                    <Dot reduce={reduce} d={0} />
                    <Dot reduce={reduce} d={0.18} />
                    <Dot reduce={reduce} d={0.36} />
                  </span>
                )}
              </p>
              <motion.div
                initial={false}
                animate={{ opacity: answered ? 1 : 0 }}
                transition={{ duration: 0.5, delay: answered ? 0.2 : 0 }}
                className="mt-4 flex flex-wrap items-center gap-2"
              >
                <span className="t-small text-[var(--text-secondary)]">napisane z:</span>
                {SOURCES.map((s) => (
                  <span
                    key={s.label}
                    className="inline-flex items-center gap-1.5 rounded-md bg-[var(--accent)]/[0.08] px-2 py-1 text-[12.5px] font-medium text-[var(--accent)]"
                  >
                    <s.Icon size={12} strokeWidth={2.5} />
                    {s.label}
                  </span>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* PRAWA: mapa wiedzy (jak hero) + lewitujące pliczki .md, zsync z czatem */}
        <div className="flex items-center justify-center rounded-3xl border border-[var(--border)] bg-[var(--bg-page)] p-5">
          <KnowledgeMap retrieving={retrieving} answered={answered} reduce={reduce} />
        </div>
      </div>
    </section>
  );
}

function Dot({ reduce, d }: { reduce: boolean | null; d: number }) {
  return (
    <motion.span
      className="inline-block h-2 w-2 rounded-full bg-[var(--text-secondary)]"
      animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1, repeat: Infinity, delay: d }}
    />
  );
}
