"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SquareTerminal, Gem, Github } from "lucide-react";

/**
 * Objection-handler (Dan Koe / Hormozi): zabija "kolejny zlozony stack 40 narzedzi?"
 * Reframe: nie 40, trzy, a naprawde jedno platne (silnik). Reszta darmowa.
 * Callback do bolu PainPoints (wiedza w 40 narzedziach) = math-pole 40 rozproszonych
 * kropek w tle, z ktorego wylania sie czysty 3-tool setup. Claude Code = pulsujacy
 * rdzen-silnik (sygnatura ignite z Hero/organism). Reduced-motion = statyczny.
 *
 * Fakty z lekcji 1 + canonical-process (stos narzedzi). Copy do dotkniecia przez Luki.
 */

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
    role: "Silnik. Czyta twoje pliki, łączy je, pisze z nich.",
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

// deterministyczne pozycje (bez Math.random -> brak hydration mismatch)
const frac = (x: number) => x - Math.floor(x);
const DOTS = Array.from({ length: 40 }, (_, i) => ({
  x: frac(Math.sin(i * 12.9898) * 43758.5453) * 100,
  y: frac(Math.sin(i * 78.233) * 12543.123) * 100,
  r: 1 + frac(Math.sin(i * 3.17) * 1000) * 1.4,
}));

export function Stack() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="container-wide py-24 sm:py-32">
      <motion.h2
        className="t-h2 max-w-[16ch]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        All you need is Claude Code.
      </motion.h2>
      <motion.p
        className="t-body-large mt-5 max-w-[42ch] text-[var(--text-secondary)]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, delay: 0.08 }}
      >
        Twoja wiedza nie potrzebuje czterdziestu narzędzi. Potrzebuje trzech.
        Płacisz za jedno.
      </motion.p>

      <div className="relative mt-14">
        {/* math-pole: 40 rozproszonych kropek = zoo, ktorego unikasz */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{
            WebkitMaskImage:
              "radial-gradient(120% 130% at 50% 50%, transparent 38%, black 100%)",
            maskImage:
              "radial-gradient(120% 130% at 50% 50%, transparent 38%, black 100%)",
          }}
        >
          {DOTS.map((d, i) => (
            <circle
              key={i}
              cx={d.x}
              cy={d.y}
              r={d.r * 0.18}
              fill="var(--accent)"
              opacity={0.18}
            />
          ))}
        </svg>

        <div className="relative grid items-center gap-5 md:grid-cols-3 md:gap-6">
          {TOOLS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{
                duration: 0.55,
                delay: i * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={
                t.hero
                  ? "relative overflow-hidden rounded-3xl border border-[var(--accent)] bg-[var(--bg-card)] p-8 shadow-[0_40px_120px_-60px_rgba(38,86,217,0.7)] md:-my-4 md:p-9"
                  : "relative rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] p-7"
              }
            >
              {t.hero && (
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl bg-[var(--accent)]/[0.04]"
                />
              )}
              <div className="relative flex items-center justify-between">
                <span
                  className={`relative flex items-center justify-center rounded-2xl ${
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
                  {t.hero && !reduce && (
                    <motion.span
                      aria-hidden
                      className="absolute inset-0 rounded-2xl bg-[var(--accent)]"
                      animate={{ scale: [1, 1.55], opacity: [0.45, 0] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  )}
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

              <p className="relative mt-5 text-[20px] font-semibold tracking-[-0.01em] text-[var(--text)]">
                {t.name}
              </p>
              <p className="relative mt-1.5 t-body text-[var(--text-secondary)]">
                {t.role}
              </p>
              <p className="relative mt-4 t-small text-[var(--text-secondary)]/80">
                {t.tag}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* koszt = Hormozi reframe */}
      <motion.p
        className="mt-10 max-w-[48ch] t-body text-[var(--text)]"
        initial={reduce ? false : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        Pro to jakieś 80 zł na miesiąc. Jeśli system zdejmuje ci kilka godzin
        roboty, zwraca się pierwszego dnia.
      </motion.p>
    </section>
  );
}
