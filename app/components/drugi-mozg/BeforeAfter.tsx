"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Sparkles, Check, FileText, Globe } from "lucide-react";
import { CtaButton } from "./CtaButton";

/**
 * Killer kontrast (Dan Koe), teraz INTERAKTYWNY + z motywem "sięga po twoje pliki"
 * (redesign taste-skill, spójny z KnowledgeReader na tej samej stronie).
 *
 * - 5 klikalnych przykładów (pain-pointy: post / wycena / rabat / hook / priorytety).
 * - LEWO "Zwykłe AI": zgaduje ze średniej internetu, szarzeje po dotypowaniu.
 * - PRAWO "Twój Drugi Mózg": output + konstelacja floatujących, POŁĄCZONYCH plików,
 *   z których złożył odpowiedź (aktywne pliki zapalają się na akcent).
 * - Auto-advance dopóki user nie kliknie; po kliknięciu = pełna kontrola.
 * - Accent = var(--accent). Reduced-motion = stan końcowy, zero ruchu.
 */

type Example = {
  tab: string;
  prompt: string;
  generic: string;
  yours: string;
  files: string[];
};

const EXAMPLES: Example[] = [
  {
    tab: "Post",
    prompt: "Napisz posta o tym, czemu przestałem brać tanich klientów.",
    generic:
      "Współpraca z klientami to podstawa każdego biznesu. Czasem warto przemyśleć, z kim pracujesz. Stawiaj na jakość, nie ilość. Twój czas jest cenny!",
    yours:
      "W maju policzyłem: klient za 2,5K zjadł mi więcej godzin niż dwa projekty po 8K. Nie dlatego, że był trudny. Dlatego, że był tani. Od tamtej pory mam floor i śpię lepiej.",
    files: ["moj-glos.md", "klienci.md", "zasady.md"],
  },
  {
    tab: "Wycena",
    prompt: "Klient pyta o wycenę strony. Co odpowiadam?",
    generic:
      "Wycena zależy od zakresu projektu. Zaproponuj przedział cenowy i podkreśl wartość swojej pracy. Zadbaj o profesjonalną komunikację z klientem.",
    yours:
      "Widełki 9-12K. Poniżej 8K nie schodzisz. Ostatnie dwa razy poniżej floora żałowałeś, masz to zapisane w notatkach z marca.",
    files: ["wyceny.md", "klienci.md", "zasady.md"],
  },
  {
    tab: "Rabat",
    prompt: "Klient prosi o rabat. Co odpisać?",
    generic:
      "Zrozumienie potrzeb klienta jest kluczowe. Zaproponuj kompromis i podkreśl wartość usługi. Zachowaj profesjonalny, uprzejmy ton.",
    yours:
      "Nie schodzisz z ceny, schodzisz z zakresu. „Zmieszczę się w budżecie, jeśli zdejmiemy X i Y. Jakość zostaje.” Rabat uczy klienta, że stać cię było taniej.",
    files: ["oferty.md", "zasady.md", "klienci.md"],
  },
  {
    tab: "Hook",
    prompt: "Daj mi hook na reela o drugim mózgu.",
    generic:
      "Odkryj potęgę drugiego mózgu! Zorganizuj swoją wiedzę, zwiększ produktywność i zacznij działać mądrzej już dziś.",
    yours:
      "Twoja wiedza siedzi w 40 narzędziach i nie pracuje. Zbudowałem system, który pisze z niej moim głosem, kiedy śpię.",
    files: ["pomysly.md", "skrypty.md", "moj-glos.md"],
  },
  {
    tab: "Priorytety",
    prompt: "Co powinienem robić w tym tygodniu?",
    generic:
      "Skup się na najważniejszych zadaniach. Ustal priorytety, planuj z wyprzedzeniem i pamiętaj o równowadze między pracą a odpoczynkiem.",
    yours:
      "Trzy rzeczy: domknij ofertę dla klienta z wtorku, nagraj lekcję 3, odpisz dwóm warm leadom. Reszta czeka, bo w tym kwartale liczy się launch.",
    files: ["cele.md", "projekty.md", "zasady.md"],
  },
];

export function BeforeAfter() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(ref, { once: false, margin: "-20% 0px" });

  const [active, setActive] = useState(0);
  const [prog, setProg] = useState(reduce ? 1 : 0);
  const [settled, setSettled] = useState(reduce);
  const [locked, setLocked] = useState(false); // user kliknął = stop auto-advance

  const ex = EXAMPLES[active];

  // typing przy każdej zmianie przykładu
  useEffect(() => {
    if (reduce || !inView) return;
    let p = 0;
    setProg(0);
    setSettled(false);
    const id = setInterval(() => {
      p += 0.022;
      if (p >= 1) {
        p = 1;
        setProg(1);
        setSettled(true);
        clearInterval(id);
      } else {
        setProg(p);
      }
    }, 40);
    return () => clearInterval(id);
  }, [active, inView, reduce]);

  // auto-advance dopóki user nie przejął sterów
  useEffect(() => {
    if (reduce || !inView || locked || !settled) return;
    const id = setTimeout(
      () => setActive((a) => (a + 1) % EXAMPLES.length),
      3800,
    );
    return () => clearTimeout(id);
  }, [settled, inView, reduce, locked]);

  const pick = (i: number) => {
    setLocked(true);
    setActive(i);
  };

  const gN = Math.round(ex.generic.length * prog);
  const yN = Math.round(ex.yours.length * prog);
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
      <motion.p
        className="t-body-large mt-4 max-w-[46ch] text-[var(--text-secondary)]"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        Zwykłe AI zgaduje ze średniej internetu. Twoje sięga po twoje pliki.
        Kliknij przykład i zobacz różnicę.
      </motion.p>

      {/* prompt aktywnego przykładu */}
      <div className="mt-9 flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-[var(--bg-card)] px-5 py-3">
        <span className="t-small shrink-0 font-semibold text-[var(--text-secondary)]">
          prompt
        </span>
        <motion.span
          key={active}
          initial={reduce ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="text-[15px] font-medium text-[var(--text)]"
        >
          {ex.prompt}
        </motion.span>
      </div>

      <div
        ref={ref}
        className="mt-5 grid items-stretch gap-5 lg:grid-cols-2 lg:gap-6"
      >
        {/* LEWO: zwykłe AI, zgaduje, szarzeje */}
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
            <span className="t-small font-semibold text-[var(--text-secondary)]">
              Zwykłe AI
            </span>
          </div>
          {/* rezerwacja wysokości: wszystkie przykłady stackowane niewidocznie = zero skoku */}
          <div className="relative grid">
            {EXAMPLES.map((e, i) => (
              <p
                key={i}
                aria-hidden
                className="invisible col-start-1 row-start-1 text-[16px] leading-relaxed sm:text-[17px]"
              >
                {e.generic}
              </p>
            ))}
            <p className="col-start-1 row-start-1 text-[16px] leading-relaxed text-[var(--text-secondary)] sm:text-[17px]">
              {ex.generic.slice(0, gN)}
              {typing && !reduce && (
                <span className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-[1px] animate-pulse bg-[var(--text-secondary)] align-middle" />
              )}
            </p>
          </div>
          {/* mirror do prawej konstelacji: brak źródeł */}
          <div className="mt-auto flex items-center gap-2 border-t border-[var(--border)] pt-4">
            <Globe size={14} strokeWidth={2} className="text-[var(--text-secondary)]" />
            <span className="t-small text-[var(--text-secondary)]">
              Źródło: internet. Nie zna ciebie.
            </span>
          </div>
        </motion.div>

        {/* PRAWO: twój output + konstelacja plików */}
        <div className="relative flex flex-col overflow-hidden rounded-3xl border border-[var(--accent)] bg-[var(--bg-card)] p-7 shadow-[0_40px_120px_-70px_rgba(38,86,217,0.6),inset_0_1px_0_rgba(255,255,255,0.7)] sm:p-9">
          {/* shader-ish statyczne tło (accent glow, bez motion) = większy kontrast vs szara lewa */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl"
            style={{
              background:
                "linear-gradient(180deg, rgba(38,86,217,0.09) 0%, rgba(38,86,217,0) 46%)",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[var(--accent)]/25 blur-[90px]"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-16 h-56 w-56 rounded-full bg-[var(--accent)]/[0.12] blur-[90px]"
          />
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-3xl bg-[var(--accent)]/[0.03]"
            animate={{ opacity: settled ? 1 : 0.4 }}
          />
          <div className="relative mb-5 flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--accent)]">
              <Check size={16} strokeWidth={2.5} className="text-white" />
            </span>
            <span className="t-small font-semibold text-[var(--accent)]">
              Twój Drugi Mózg
            </span>
          </div>
          {/* rezerwacja wysokości: zero skoku między przykładami */}
          <div className="relative grid">
            {EXAMPLES.map((e, i) => (
              <p
                key={i}
                aria-hidden
                className="invisible col-start-1 row-start-1 text-[16px] font-medium leading-relaxed sm:text-[17px]"
              >
                {e.yours}
              </p>
            ))}
            <p className="col-start-1 row-start-1 text-[16px] font-medium leading-relaxed text-[var(--text)] sm:text-[17px]">
              {ex.yours.slice(0, yN)}
              {typing && !reduce && (
                <span className="ml-0.5 inline-block h-[1em] w-[2px] -translate-y-[1px] animate-pulse bg-[var(--accent)] align-middle" />
              )}
            </p>
          </div>

          {/* floatujące karty-źródła, z których złożył odpowiedź */}
          <div className="relative mt-6 border-t border-[var(--border)] pt-5">
            <p className="t-small mb-3 font-medium text-[var(--text-secondary)]">
              Złożone z twoich plików
            </p>
            <FloatingSources
              key={active}
              files={ex.files}
              reveal={settled}
              reduce={reduce}
            />
          </div>
        </div>
      </div>

      {/* klikalne przykłady (pain-pointy) - bez kółek, tactile press, bez nowego motion */}
      <div className="mt-8 flex flex-wrap gap-2">
        {EXAMPLES.map((e, i) => {
          const on = i === active;
          return (
            <button
              key={e.tab}
              onClick={() => pick(i)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-semibold transition-[background-color,color,box-shadow,transform] duration-200 active:scale-[0.97] ${
                on
                  ? "bg-[var(--accent)] text-white shadow-[0_10px_24px_-10px_rgba(38,86,217,0.75)]"
                  : "bg-[var(--text)]/[0.04] text-[var(--text-secondary)] hover:bg-[var(--text)]/[0.08] hover:text-[var(--text)]"
              }`}
            >
              <span
                className={`text-[12px] tabular-nums ${
                  on ? "text-white/55" : "text-[var(--text-secondary)]/50"
                }`}
              >
                {i + 1}
              </span>
              {e.tab}
            </button>
          );
        })}
      </div>

      {/* mid-page CTA: drugi peak wiary (kontrast na własne oczy) */}
      <div className="mt-10 flex justify-center">
        <CtaButton variant="primary" label="Postaw swój Drugi Mózg" />
      </div>
    </section>
  );
}

// ── floatujące karty-źródła: czysto, premium, każda unosi się osobno ──────
function FloatingSources({
  files,
  reveal,
  reduce,
}: {
  files: string[];
  reveal: boolean;
  reduce: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {files.map((f, i) => (
        <motion.div
          key={f}
          className="inline-flex items-center gap-2 rounded-xl border border-[var(--accent)]/25 bg-[var(--accent)]/[0.07] px-3 py-2 shadow-[0_12px_26px_-16px_rgba(38,86,217,0.65)]"
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{
            opacity: reveal || reduce ? 1 : 0.55,
            y: reduce ? 0 : [i % 2 ? 3 : -3, i % 2 ? -4 : 4, i % 2 ? 3 : -3],
          }}
          transition={{
            opacity: { duration: 0.45, delay: reduce ? 0 : 0.1 + i * 0.1 },
            y: {
              duration: 3.6 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--accent)]/[0.14]">
            <FileText size={13} strokeWidth={2} className="text-[var(--accent)]" />
          </span>
          <span className="font-mono text-[12.5px] font-medium text-[var(--text)]">
            {f}
          </span>
          <Check size={13} strokeWidth={2.75} className="text-[var(--accent)]/70" />
        </motion.div>
      ))}
    </div>
  );
}
