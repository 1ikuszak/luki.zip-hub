"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { CONTACT_FORM_URL } from "@/app/lib/data";

/**
 * "Jak mozemy pracowac" — dwie drogi (Audyt -> Wdrozenie), copy zachowane 1:1.
 * Prezentacja w stylu sekcji z /drugi-mozg: kazda karta ma animowany demonstrator
 * wartosci (framer-motion, useInView loop, reduced-motion = stan koncowy).
 * Audyt: checklista mapuje sie na zywo (loader -> check). Wdrozenie: rdzen pompuje
 * output codziennie (chipy leca, licznik rosnie). Zero gradientow, czyste bialo + accent.
 */

const AUDYT = {
  tag: "Audyt",
  title: "Dostajesz mapę, nie kolejną listę narzędzi.",
  body: "Mówisz, nad czym pracujesz i co chcesz wdrożyć. Pokazuję dokładnie, gdzie tracisz czas i co zautomatyzować w pierwszej kolejności. Koniec zgadywania, które AI i który tool.",
  benefit: "Wychodzisz wiedząc, co zrobić w poniedziałek rano.",
  steps: ["Gdzie tracisz czas", "Co zautomatyzować najpierw", "Które AI i który tool"],
};

const WDROZENIE = {
  tag: "Wdrożenie",
  title: "Produkujesz na poziomie codziennie. Bez dokładania ludzi.",
  body: "Składam system AI z twoją marką i wiedzą w środku, i uczę twój zespół, jak go prowadzić. Powtarzalna robota schodzi z głowy, a jakość zostaje twoja.",
  benefit: "Mniej godzin i etatów. Zostaje ci czas na to, co naprawdę rusza biznes.",
  tasks: ["fakturowanie", "obsługa leadów", "raporty", "follow-upy", "research"],
};

const T_LOOP = 6400;

export function OfferTwoWays() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-15% 0px" });
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    let e = 0;
    setT(0);
    const id = setInterval(() => {
      e += 80;
      if (e > T_LOOP) e = 0;
      setT(e);
    }, 80);
    return () => clearInterval(id);
  }, [inView, reduce]);

  // Audyt: 3 kroki checklisty (idle -> active -> done)
  const stepState = (i: number): "idle" | "active" | "done" => {
    if (reduce) return "done";
    const start = 700 + i * 1150;
    if (t < start) return "idle";
    if (t < start + 750) return "active";
    return "done";
  };
  const mapped = reduce
    ? AUDYT.steps.length
    : AUDYT.steps.filter((_, i) => stepState(i) === "done").length;

  // Wdrozenie: ile powtarzalnych taskow system juz przejal (schodzi z glowy)
  const autoCount = reduce
    ? WDROZENIE.tasks.length
    : Math.max(0, Math.min(WDROZENIE.tasks.length, Math.floor((t - 400) / 850) + 1));
  const hoursSaved = autoCount * 3;

  return (
    <section ref={ref} className="container-wide py-20 sm:py-28">
      <motion.h2
        className="font-semibold text-[var(--text)]"
        style={{ fontSize: "clamp(2rem, 4.2vw, 3.2rem)", lineHeight: 1.04, letterSpacing: "-0.03em" }}
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Jak możemy pracować.
      </motion.h2>

      <div className="mt-12 grid items-stretch gap-5 md:grid-cols-2">
        {/* ───────── AUDYT ───────── */}
        <div className="flex flex-col overflow-hidden rounded-[22px] border border-[var(--border)] bg-[var(--bg-card)]">
          {/* demonstrator: checklista mapuje sie */}
          <div className="relative border-b border-[var(--border)] bg-[var(--bg-page)] px-7 py-7 sm:px-10">
            <div className="flex flex-col gap-3">
              {AUDYT.steps.map((label, i) => {
                const st = stepState(i);
                return (
                  <div key={label} className="flex items-center gap-3">
                    <span
                      className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border"
                      style={{
                        borderColor: st === "idle" ? "var(--border)" : "var(--accent)",
                        background: st === "done" ? "var(--accent)" : "transparent",
                      }}
                    >
                      {st === "done" ? (
                        <Check size={13} strokeWidth={3} className="text-white" />
                      ) : st === "active" ? (
                        <Loader2 size={13} strokeWidth={2.5} className="animate-spin text-[var(--accent)]" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--text-secondary)]/40" />
                      )}
                    </span>
                    <span className={`text-[14px] font-medium transition-colors ${st === "idle" ? "text-[var(--text-secondary)]/60" : "text-[var(--text)]"}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-[var(--accent)]">
              <span>Mapa</span>
              <span className="text-[var(--text-secondary)]/50">{mapped}/{AUDYT.steps.length}</span>
            </div>
          </div>

          {/* copy */}
          <div className="flex flex-1 flex-col p-8 sm:p-10">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
              {AUDYT.tag}
            </div>
            <h3 className="mt-4 text-[24px] font-semibold leading-tight text-[var(--text)] sm:text-[28px]">
              {AUDYT.title}
            </h3>
            <p className="mt-4 text-[16px] leading-relaxed text-[var(--text-secondary)]">{AUDYT.body}</p>
            <p className="mt-auto pt-5 text-[16px] font-semibold leading-relaxed text-[var(--text)]">
              {AUDYT.benefit}
            </p>
          </div>
        </div>

        {/* ───────── WDROZENIE (featured) ───────── */}
        <div className="flex flex-col overflow-hidden rounded-[22px] bg-[var(--accent)] text-white shadow-[0_40px_90px_-50px_rgba(38,86,217,0.7)]">
          {/* demonstrator: system pompuje output */}
          <div className="relative border-b border-white/15 px-7 py-7 sm:px-10">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <motion.span
                    className="absolute inset-0 rounded-full bg-white/25"
                    animate={reduce ? undefined : { scale: [1, 1.55], opacity: [0.5, 0] }}
                    transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                  />
                  <span className="h-2 w-2 rounded-full bg-white" />
                </span>
                <span className="text-[13px] font-medium text-white/85">System przejmuje robotę</span>
              </div>
              <span className="rounded-md bg-white/15 px-2 py-0.5 text-[12px] font-semibold text-white">
                ~{hoursSaved} z {WDROZENIE.tasks.length * 3}h/tydz odzyskane
              </span>
            </div>

            {/* powtarzalne taski schodza z glowy na "auto" */}
            <ul className="mt-4 flex flex-col gap-2">
              {WDROZENIE.tasks.map((task, i) => {
                const done = i < autoCount;
                return (
                  <li key={task} className="flex items-center gap-2.5">
                    <span
                      className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors"
                      style={{ background: done ? "#fff" : "transparent" }}
                    >
                      {done ? (
                        <Check size={12} strokeWidth={3} className="text-[var(--accent)]" />
                      ) : (
                        <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
                      )}
                    </span>
                    <span className={`text-[14px] transition-colors ${done ? "text-white" : "text-white/55"}`}>
                      {task}
                    </span>
                    {done && (
                      <motion.span
                        initial={reduce ? false : { opacity: 0, x: -4 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.25 }}
                        className="ml-auto rounded bg-white/15 px-1.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wide text-white/80"
                      >
                        auto
                      </motion.span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* copy */}
          <div className="flex flex-1 flex-col p-8 sm:p-10">
            <div className="text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70">
              {WDROZENIE.tag}
            </div>
            <h3 className="mt-4 text-[24px] font-semibold leading-tight sm:text-[28px]">
              {WDROZENIE.title}
            </h3>
            <p className="mt-4 text-[16px] leading-relaxed text-white/85">{WDROZENIE.body}</p>
            <p className="mt-auto pt-5 text-[16px] font-semibold leading-relaxed text-white">
              {WDROZENIE.benefit}
            </p>
          </div>
        </div>
      </div>

      <motion.div
        className="mt-14 flex flex-col items-center gap-4 text-center"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="t-body text-[var(--text-secondary)]">Nie wiesz, od czego zacząć? Zacznij od audytu.</p>
        <a
          href={CONTACT_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          data-track="cta_contact"
          data-track-id="cta_home_offer_call"
          data-track-href={CONTACT_FORM_URL}
          className="btn-glossy group inline-flex h-16 items-center gap-3 rounded-full pl-9 pr-3 text-[18px] font-semibold text-white sm:text-[19px]"
        >
          Umów rozmowę
          <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--accent)] transition-transform group-hover:translate-x-0.5">
            <ArrowRight size={22} strokeWidth={2.25} />
          </span>
        </a>
      </motion.div>
    </section>
  );
}
