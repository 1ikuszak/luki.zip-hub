"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Sparkles, Check } from "lucide-react";

/**
 * Killer kontrast (Dan Koe): ten sam prompt, dwa outputy typują się RÓWNOLEGLE.
 * Po dotypowaniu lewy (zwykłe AI) szarzeje = "mógł napisać każdy", prawy (Drugi
 * Mózg) rozbłyskuje akcentem = "tylko ty mogłeś". Loop w viewport.
 * Reduced-motion = oba pełne, lewy szary, prawy akcent.
 *
 * UWAGA: treść demo (prompt, oba outputy) = placeholder microcopy do dotknięcia.
 */

const PROMPT = "Napisz akapit o tym, czemu warto zbudować drugi mózg.";
const GENERIC =
  "W dzisiejszych czasach zarządzanie wiedzą jest niezwykle istotne. Drugi mózg to świetne narzędzie, które pomaga organizować informacje i zwiększać produktywność. Warto zacząć już dziś.";
const YOURS =
  "Twoja wiedza nie pracuje, bo siedzi w 40 narzędziach. Drugi mózg to nie folder na notatki. To system, z którego AI pisze twoim głosem, kiedy ty śpisz. Stawiasz raz, korzystasz codziennie.";

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: false, margin: "-20% 0px" });
  const [prog, setProg] = useState(reduce ? 1 : 0);
  const [settled, setSettled] = useState(reduce);

  useEffect(() => {
    if (reduce || !inView) return;
    let typeId: ReturnType<typeof setInterval>;
    const run = () => {
      let p = 0;
      setProg(0);
      setSettled(false);
      typeId = setInterval(() => {
        p += 0.018;
        if (p >= 1) {
          p = 1;
          setProg(1);
          setSettled(true);
          clearInterval(typeId);
        } else {
          setProg(p);
        }
      }, 40);
    };
    run();
    const loop = setInterval(run, 7200);
    return () => {
      clearInterval(typeId);
      clearInterval(loop);
    };
  }, [inView, reduce]);

  const gN = Math.round(GENERIC.length * prog);
  const yN = Math.round(YOURS.length * prog);
  const typing = prog < 1;

  return (
    <section className="container-wide py-24 sm:py-32">
      <motion.h2
        className="t-h2 max-w-[22ch]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Ten sam prompt. Dwa różne światy.
      </motion.h2>

      <div className="mt-10 inline-flex max-w-full items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3">
        <span className="t-small font-semibold text-[var(--text-secondary)]">prompt</span>
        <span className="text-[15px] font-medium text-[var(--text)]">{PROMPT}</span>
      </div>

      <div ref={ref} className="mt-8 grid gap-5 lg:grid-cols-2 lg:gap-6">
        {/* GENERIC -> szarzeje */}
        <motion.div
          animate={{
            opacity: settled ? 0.55 : 1,
            filter: settled ? "grayscale(1)" : "grayscale(0)",
          }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-7 sm:p-9"
        >
          <div className="mb-5 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--text-secondary)]/10">
              <Sparkles size={16} strokeWidth={2} className="text-[var(--text-secondary)]" />
            </span>
            <span className="t-small font-semibold text-[var(--text-secondary)]">Zwykłe AI</span>
          </div>
          <p className="min-h-[7.5em] text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
            {GENERIC.slice(0, gN)}
            {typing && !reduce && (
              <span className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-[1px] animate-pulse bg-[var(--text-secondary)] align-middle" />
            )}
          </p>
          <motion.span
            animate={{ opacity: settled ? 1 : 0 }}
            className="mt-6 inline-flex w-fit items-center rounded-md bg-[var(--text-secondary)]/10 px-2.5 py-1 text-[12.5px] font-medium text-[var(--text-secondary)]"
          >
            mógł napisać każdy
          </motion.span>
        </motion.div>

        {/* YOURS -> ignite */}
        <div className="relative flex flex-col rounded-3xl border border-[var(--accent)] bg-[var(--bg-card)] p-7 shadow-[0_40px_120px_-70px_rgba(38,86,217,0.7)] sm:p-9">
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl bg-[var(--accent)]/[0.04]"
            animate={{ opacity: settled ? 1 : 0.4 }}
          />
          {settled && !reduce && (
            <motion.span
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-3xl ring-2 ring-[var(--accent)]"
              initial={{ opacity: 0.6, scale: 1 }}
              animate={{ opacity: 0, scale: 1.015 }}
              transition={{ duration: 1.1, ease: "easeOut" }}
            />
          )}
          <div className="relative mb-5 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]">
              <Check size={16} strokeWidth={2.5} className="text-white" />
            </span>
            <span className="t-small font-semibold text-[var(--accent)]">Drugi Mózg</span>
          </div>
          <p className="relative min-h-[7.5em] text-[16px] font-medium leading-relaxed text-[var(--text)] sm:text-[17px]">
            {YOURS.slice(0, yN)}
            {typing && !reduce && (
              <span className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-[1px] animate-pulse bg-[var(--accent)] align-middle" />
            )}
          </p>
          <motion.span
            animate={{ opacity: settled ? 1 : 0 }}
            className="relative mt-6 inline-flex w-fit items-center rounded-md bg-[var(--accent)]/[0.1] px-2.5 py-1 text-[12.5px] font-semibold text-[var(--accent)]"
          >
            tylko ty mogłeś
          </motion.span>
        </div>
      </div>
    </section>
  );
}
