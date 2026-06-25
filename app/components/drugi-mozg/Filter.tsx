"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { X, Check } from "lucide-react";

/**
 * Kwalifikacja in/out (Dan Koe: zaostrza pożądanie). Nie blok tekstu: dwie kolumny,
 * OUT przygasa, IN zapala się staggerem (check-marki wskakują) = strona "staje po
 * twojej stronie" na oczach. Reduced-motion = statyczne, czytelne.
 */

const OUT = [
  "Szukasz magicznego przycisku, który zrobi robotę bez ciebie.",
  "Chcesz kolejny folder na notatki, do którego nie zajrzysz.",
  "Wolisz narzekać na generyczne AI, niż coś z tym zrobić.",
  "Liczysz, że obejrzysz jedno wideo i będzie git.",
  "Nie masz zamiaru wrzucić własnej wiedzy do systemu.",
];

const IN = [
  "Masz wiedzę, doświadczenie i gust, ale AI o tym nie wie.",
  "Chcesz, żeby AI w końcu myślało jak ty, nie jak internet.",
  "Wolisz zbudować system raz, niż klepać generyk codziennie.",
  "Robisz dużo contentu i decyzji, chcesz to przyspieszyć bez utraty siebie.",
  "Traktujesz to serio: wdrażasz, nie tylko oglądasz.",
];

const list: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};
const item: Variants = {
  hidden: { opacity: 0, x: 10 },
  show: { opacity: 1, x: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};
const pop: Variants = {
  hidden: { scale: 0.3, opacity: 0 },
  show: { scale: 1, opacity: 1, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
};

export function Filter() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="container-default py-16 sm:py-20">
      <motion.h2
        className="t-h2 max-w-[18ch]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        To nie jest dla każdego.
      </motion.h2>

      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        {/* OUT - przygasa */}
        <motion.div
          initial={reduce ? false : { opacity: 0, filter: "grayscale(0.6)" }}
          whileInView={{ opacity: 0.85, filter: "grayscale(1)" }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 0.6 }}
          className="h-full rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-7"
        >
          <p className="t-small font-semibold uppercase tracking-[0.1em] text-[var(--text-secondary)]">
            To nie tutaj
          </p>
          <motion.ul
            variants={reduce ? undefined : list}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="mt-5 space-y-4"
          >
            {OUT.map((o) => (
              <motion.li key={o} variants={reduce ? undefined : item} className="flex gap-3">
                <X size={18} strokeWidth={2.25} className="mt-0.5 shrink-0 text-[var(--text-secondary)]" />
                <span className="t-body text-[var(--text-secondary)]">{o}</span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* IN - zapala się */}
        <div className="h-full rounded-2xl border border-[var(--accent)] bg-[var(--accent)]/[0.05] p-7">
          <p className="t-small font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
            To dla ciebie
          </p>
          <motion.ul
            variants={reduce ? undefined : list}
            initial={reduce ? false : "hidden"}
            whileInView="show"
            viewport={{ once: true, margin: "-10% 0px" }}
            className="mt-5 space-y-4"
          >
            {IN.map((it) => (
              <motion.li key={it} variants={reduce ? undefined : item} className="flex gap-3">
                <motion.span
                  variants={reduce ? undefined : pop}
                  className="mt-0.5 flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-full bg-[var(--accent)]"
                >
                  <Check size={12} strokeWidth={3} className="text-white" />
                </motion.span>
                <span className="t-body font-medium text-[var(--text)]">{it}</span>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>

      <motion.p
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="t-body-large mt-8 max-w-[40ch] font-medium text-[var(--text)]"
      >
        Jeśli to ty, Dzień 1 stawia fundament jeszcze dziś.
      </motion.p>
    </section>
  );
}
