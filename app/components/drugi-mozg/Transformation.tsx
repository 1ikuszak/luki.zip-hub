"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";

/**
 * Plan 5 dni (Dan Koe: wiarygodna, time-boxed ścieżka do outcome). Overhaul:
 * WSZYSTKO widoczne od razu, zero hovera/rozwijania. Czysta pionowa oś czasu:
 * kręgosłup dorysowuje się na scroll, numerowane węzły (sygnatura) zapalają się
 * przy wejściu w kadr, każdy dzień ma etykietę + tytuł + treść stale widoczne.
 * Bonus = węzeł-finał (akcent). Reduced-motion = statyczny, wszystko widoczne.
 */

const DAYS = [
  {
    day: "Wieczór 1",
    title: "Fundament w jeden wieczór",
    body: "Wklejasz gotowe prompty, jeden po drugim, i system stawia się na twoich oczach. Zero kodowania. Kładziesz się spać z działającym vaultem.",
  },
  {
    day: "Wieczór 2",
    title: "Wiedza układa się sama",
    body: "Wrzucasz źródło, agent rozkłada je po systemie i łączy z tym, co już masz. Od tego dnia AI odpowiada twoimi słowami, twoimi liczbami i twoimi przykładami.",
  },
  {
    day: "Wieczór 3",
    title: "Mózg produkuje za ciebie",
    body: "Budujesz pętlę: generuj, oceń pod swój standard, popraw. Ta bramka odsiewa generyk. Post, wycena, feedback: wszystko z twojego kontekstu, w twoim stylu.",
  },
  {
    day: "Wieczór 4",
    title: "Twój sposób pracy w jednej komendzie",
    body: "Pakujesz swoje SOP-y w komendy. Odpalasz jedną i AI przechodzi twój proces tak, jak ty byś go przeszedł.",
  },
  {
    day: "Wieczór 5",
    title: "System utrzymuje się sam",
    body: "Agent raz w tygodniu sprząta, łączy, archiwizuje. Utrzymanie przestaje być twoim problemem.",
  },
];

export function Transformation() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section id="program" className="container-default py-20 sm:py-28">
      <motion.h2
        className="t-h2 max-w-[16ch]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        5 wieczorów. Jedna lekcja dziennie.
      </motion.h2>
      <motion.p
        className="t-body-large mt-4 max-w-[40ch] text-[var(--text-secondary)]"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        Każda lekcja: wideo plus PDF z gotowymi promptami do wklejenia.
      </motion.p>

      {/* oś czasu: wszystkie dni widoczne, kręgosłup + węzły */}
      <div className="relative mt-12 sm:mt-14">
        <motion.span
          aria-hidden
          className="absolute left-[19px] top-5 bottom-6 w-0.5 origin-top rounded-full bg-[var(--accent)]/20"
          initial={reduce ? false : { scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        />

        <ul className="space-y-9 sm:space-y-11">
          {DAYS.map((d, i) => (
            <motion.li
              key={d.day}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-8% 0px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-[40px_1fr] gap-5 sm:gap-7"
            >
              <div className="relative flex justify-center">
                <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-[15px] font-semibold text-white shadow-[0_12px_26px_-10px_rgba(38,86,217,0.65)]">
                  {i + 1}
                  {!reduce && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-full border border-[var(--accent)]"
                      initial={{ opacity: 0.5, scale: 1 }}
                      whileInView={{ opacity: 0, scale: 1.9 }}
                      viewport={{ once: true, margin: "-8% 0px" }}
                      transition={{ duration: 1, ease: "easeOut", delay: i * 0.08 + 0.2 }}
                    />
                  )}
                </span>
              </div>

              <div className="pt-0.5">
                <span className="text-[13px] font-semibold text-[var(--accent)]">{d.day}</span>
                <h3 className="mt-1 text-[19px] font-semibold leading-snug tracking-[-0.01em] text-[var(--text)] sm:text-[22px]">
                  {d.title}
                </h3>
                <p className="t-body mt-2 max-w-[48ch] text-[var(--text-secondary)]">{d.body}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* bonus = finał */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-8% 0px" }}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-9 grid grid-cols-[40px_1fr] gap-5 sm:mt-11 sm:gap-7"
        >
          <div className="flex justify-center">
            <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--accent)] text-white shadow-[0_12px_26px_-10px_rgba(38,86,217,0.65)]">
              <Sparkles size={17} strokeWidth={2} />
            </span>
          </div>
          <div className="rounded-2xl bg-[var(--accent)] p-6 text-white shadow-[0_30px_80px_-44px_rgba(38,86,217,0.7)]">
            <span className="text-[13px] font-semibold text-white/85">Bonus po Wieczorze 5</span>
            <p className="t-body mt-2 max-w-[48ch] text-white/95">
              Galeria zastosowań: AI piszące twoim głosem, mózg odpisujący na
              maile, brand assety z gustem. Co zbudujesz dalej.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
