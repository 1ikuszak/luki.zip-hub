"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";

/**
 * PAIN (Dan Koe): nie OPISUJ slopu, POKAŻ go. Generyczna odpowiedź AI typuje się
 * na żywo, a potem szarzeje = "poprawne, gładkie, puste". Widz czuje pustkę,
 * zamiast czytać o niej akapit. Reduced-motion = od razu stan szary z pełnym tekstem.
 *
 * UWAGA: treść promptu i slop-odpowiedzi = placeholder microcopy do dotknięcia.
 */

const PROMPT = "Napisz mi posta o budowaniu marki osobistej.";
const SLOP =
  "W dzisiejszych czasach budowanie marki osobistej jest kluczowe. To świetny sposób, żeby zwiększyć swoją widoczność i budować zaufanie. Warto być autentycznym i regularnie publikować wartościowe treści. Zacznij już dziś!";

export function Problem() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: false, margin: "-25% 0px" });
  // 0 czeka, 1 typuje, 2 dotyped, 3 szarzeje (puste)
  const [n, setN] = useState(reduce ? SLOP.length : 0);
  const [phase, setPhase] = useState<0 | 1 | 2 | 3>(reduce ? 3 : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    let i = 0;
    let settleT: ReturnType<typeof setTimeout> | undefined;
    setN(0);
    setPhase(1);
    const type = setInterval(() => {
      i += 2;
      setN(Math.min(i, SLOP.length));
      if (i >= SLOP.length) {
        clearInterval(type);
        setPhase(2);
        settleT = setTimeout(() => setPhase(3), 900);
      }
    }, 22);
    return () => {
      clearInterval(type);
      if (settleT) clearTimeout(settleT);
    };
  }, [inView, reduce]);

  const greyed = phase >= 3;

  return (
    <section className="container-default py-20 sm:py-28">
      <motion.h2
        className="t-h2 max-w-[20ch]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Pytasz AI o posta. Dostajesz coś, co mógł napisać każdy.
      </motion.h2>

      <div
        ref={ref}
        className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[0_40px_120px_-70px_rgba(8,12,40,0.5)]"
      >
        {/* prompt usera */}
        <div className="flex justify-end border-b border-[var(--border)] bg-[var(--bg-page)] px-6 py-5 sm:px-8">
          <div className="flex items-center gap-3 rounded-2xl rounded-br-md bg-[var(--text)]/[0.06] px-4 py-3">
            <span className="text-[15px] font-medium text-[var(--text)]">
              {PROMPT}
            </span>
            <ArrowUp size={16} strokeWidth={2.5} className="text-[var(--text-secondary)]" />
          </div>
        </div>

        {/* odpowiedź slop -> szarzeje */}
        <div className="relative px-6 py-7 sm:px-8">
          <motion.p
            animate={{
              opacity: greyed ? 0.4 : 1,
              filter: greyed ? "grayscale(1)" : "grayscale(0)",
            }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-[17px] leading-relaxed text-[var(--text-secondary)] sm:text-[18px]"
          >
            {SLOP.slice(0, n)}
            {phase === 1 && !reduce && (
              <span className="ml-0.5 inline-block h-[1.05em] w-[2px] -translate-y-[1px] animate-pulse bg-[var(--text-secondary)] align-middle" />
            )}
          </motion.p>

          {/* stempel pustki */}
          <motion.span
            initial={false}
            animate={{ opacity: greyed ? 1 : 0, y: greyed ? 0 : 6 }}
            transition={{ duration: 0.5 }}
            className="mt-6 inline-flex w-fit items-center rounded-md bg-[var(--text-secondary)]/10 px-2.5 py-1 text-[12.5px] font-medium text-[var(--text-secondary)]"
          >
            poprawne. gładkie. puste.
          </motion.span>
        </div>
      </div>

      <motion.p
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="t-body-large mt-8 max-w-[42ch] font-medium text-[var(--text)]"
      >
        Większość obwinia model i szuka lepszego promptu. Problem nie jest w
        modelu. Jest w tym, że nie zna ciebie.
      </motion.p>
    </section>
  );
}
