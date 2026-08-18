"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Check, Gem, SquareTerminal, Github } from "lucide-react";

/**
 * Obiekcja "to dla programistów?" rozbita pokazem: wklejasz jedną komendę, a
 * terminal (główny element, szeroki) sam instaluje system, krok po kroku, z
 * paskami postępu, licznikiem i spinnerem, aż "System stoi". Widać prostotę i
 * że dzieje się robota. Loop w viewport. Reduced-motion = stan końcowy.
 *
 * UWAGA: komenda i kroki = placeholder microcopy do dotknięcia.
 */

const COMMAND = "Wklejam PROMPT 1: fundament";
const SPIN = ["|", "/", "-", "\\"];
const TOTAL = 6400;

// stack (merge dawnej sekcji Stack): 3 narzędzia, płacisz za jedno
const TOOLS = [
  {
    name: "Obsidian",
    role: "Okno na twoją wiedzę.",
    tag: "darmowe",
    Icon: Gem,
    hero: false,
  },
  {
    name: "Claude Code",
    role: "Silnik. Czyta twoje pliki, łączy je, produkuje z nich.",
    tag: "subskrypcja, Pro wystarcza",
    Icon: SquareTerminal,
    hero: true,
  },
  {
    name: "GitHub",
    role: "Cofnij błąd. Backup poza komputerem.",
    tag: "darmowe",
    Icon: Github,
    hero: false,
  },
];

type Step = { label: string; start: number; dur: number };
const STEPS: Step[] = [
  { label: "Pobieram szkielet vaultu", start: 800, dur: 900 },
  { label: "Instaluję 3 agenty", start: 1750, dur: 1000 },
  { label: "Indeksuję twój kontekst", start: 2800, dur: 1200 },
  { label: "Łączę wszystko w jeden system", start: 4050, dur: 850 },
];
const DONE_AT = 5000;

export function NoCode() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: false, margin: "-20% 0px" });
  const [t, setT] = useState(reduce ? TOTAL : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    let e = 0;
    setT(0);
    const id = setInterval(() => {
      e += 60;
      if (e > TOTAL) e = 0;
      setT(e);
    }, 60);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const cmdN = reduce ? COMMAND.length : Math.min(COMMAND.length, Math.floor(t / 28));
  const prog = (s: Step) => (reduce ? 1 : Math.max(0, Math.min(1, (t - s.start) / s.dur)));
  const done = reduce || t >= DONE_AT;
  const spin = SPIN[Math.floor(t / 90) % SPIN.length];
  const notatki = Math.round(prog(STEPS[2]) * 1842);

  return (
    <section className="bg-[var(--bg-card)] border-y border-[var(--border)]">
      <div ref={ref} className="container-wide py-16 sm:py-24">
        <div className="mx-auto max-w-[680px] text-center">
          <h2 className="t-h2 max-w-[20ch] mx-auto">Boisz się, że to dla programistów?</h2>
          <p className="t-body-large mt-4 text-[var(--text-secondary)]">
            Nie napiszesz ani linijki kodu. Wklejasz gotowe prompty, a system
            stawia się na twoich oczach.
          </p>
        </div>

        {/* TERMINAL = główny element */}
        <div className="mt-10 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--bg-page)] shadow-[0_50px_140px_-80px_rgba(8,12,40,0.65)]">
          <div className="flex items-center justify-between border-b border-[var(--border)] px-5 py-3">
            <span className="font-mono text-[13px] text-[var(--text-secondary)]">drugi-mozg / setup</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-[12.5px] font-medium text-[var(--accent)]">
              {done ? <Check size={13} strokeWidth={2.75} /> : <span className="inline-block w-3 text-center">{spin}</span>}
              {done ? "gotowe" : "buduję"}
            </span>
          </div>

          <div className="px-5 py-6 font-mono text-[14px] leading-relaxed sm:px-8 sm:py-8 sm:text-[15px]">
            {/* komenda */}
            <div className="flex flex-wrap items-center gap-2 text-[var(--text)]">
              <span className="text-[var(--accent)]">&gt;</span>
              <span>{COMMAND.slice(0, cmdN)}</span>
              {!done && cmdN >= COMMAND.length && (
                <span className="inline-block h-[1.05em] w-[8px] animate-pulse bg-[var(--accent)] align-middle" />
              )}
            </div>

            {/* kroki z paskami postępu */}
            <div className="mt-5 space-y-3.5">
              {STEPS.map((s, i) => {
                const p = prog(s);
                if (p <= 0) return <div key={s.label} className="h-[32px]" aria-hidden />;
                const finished = p >= 1;
                const label =
                  i === 2 && !finished ? `${s.label} (${notatki} notatek)` : s.label;
                return (
                  <div key={s.label}>
                    <div className="flex items-center justify-between gap-3 text-[13.5px]">
                      <span className="flex items-center gap-2 text-[var(--text)]">
                        {finished ? (
                          <Check size={14} strokeWidth={2.75} className="text-[var(--accent)]" />
                        ) : (
                          <span className="inline-block w-3.5 text-center text-[var(--accent)]">{spin}</span>
                        )}
                        {label}
                      </span>
                      <span className="text-[var(--text-secondary)]">{Math.round(p * 100)}%</span>
                    </div>
                    <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-[var(--border)]">
                      <div
                        className="h-full rounded-full bg-[var(--accent)]"
                        style={{ width: `${p * 100}%`, transition: "width 0.15s linear" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            {/* done */}
            <div
              className="mt-6 flex items-center gap-2 font-semibold text-[var(--accent)]"
              style={{ opacity: done ? 1 : 0, transition: "opacity 0.4s ease" }}
            >
              <Check size={16} strokeWidth={3} />
              Gotowe. Twój system stoi.
            </div>
          </div>
        </div>

        <p className="mt-5 text-center font-mono text-[12.5px] text-[var(--text-secondary)]">
          Utkniesz? Masz nagranie, gdzie robię to klik w klik.
        </p>

        {/* stack: 3 narzędzia, płacisz za jedno (merge dawnej sekcji Stack) */}
        <div className="mt-16 sm:mt-20">
          <h3 className="t-h2 max-w-[16ch]">All you need is Claude Code.</h3>
          <p className="t-body-large mt-4 max-w-[42ch] text-[var(--text-secondary)]">
            Twoja wiedza nie potrzebuje czterdziestu narzędzi. Potrzebuje
            trzech. Płacisz za jedno.
          </p>

          <div className="mt-8 grid items-center gap-5 md:grid-cols-3 md:gap-6">
            {TOOLS.map((t) => (
              <div
                key={t.name}
                className={
                  t.hero
                    ? "relative overflow-hidden rounded-3xl border border-[var(--accent)] bg-[var(--bg-page)] p-8 shadow-[0_40px_120px_-60px_rgba(38,86,217,0.7)] md:-my-4 md:p-9"
                    : "relative rounded-3xl border border-[var(--border)] bg-[var(--bg-page)] p-7"
                }
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`flex items-center justify-center rounded-2xl ${
                      t.hero
                        ? "h-12 w-12 bg-[var(--accent)]"
                        : "h-11 w-11 bg-[var(--accent)]/[0.1]"
                    }`}
                  >
                    <t.Icon
                      size={t.hero ? 24 : 20}
                      strokeWidth={2}
                      className={t.hero ? "text-white" : "text-[var(--accent)]"}
                    />
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11.5px] font-semibold uppercase tracking-[0.08em] ${
                      t.hero
                        ? "bg-[var(--accent)]/[0.1] text-[var(--accent)]"
                        : "bg-[var(--text-secondary)]/10 text-[var(--text-secondary)]"
                    }`}
                  >
                    {t.hero ? "wymagane" : "darmowe"}
                  </span>
                </div>
                <p className="mt-5 text-[20px] font-semibold tracking-[-0.01em] text-[var(--text)]">
                  {t.name}
                </p>
                <p className="t-body mt-1.5 text-[var(--text-secondary)]">
                  {t.role}
                </p>
                <p className="t-small mt-4 text-[var(--text-secondary)]/80">
                  {t.tag}
                </p>
              </div>
            ))}
          </div>

          <p className="t-body mt-8 max-w-[48ch] text-[var(--text)]">
            Claude Pro to około 80 zł na miesiąc. Jeśli system zaoszczędzi ci
            dwie godziny pracy w tygodniu, zwraca ci się pierwszego dnia.
          </p>
        </div>
      </div>
    </section>
  );
}
