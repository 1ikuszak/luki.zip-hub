"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { FileText, Check, Loader2, Search } from "lucide-react";
import { CtaButton } from "./CtaButton";

/**
 * Alternatywa full-width: JEDEN panel. Czat (lewo) napędza mapę (prawo).
 * Prompt wpisuje się jak w czacie (sam tekst, migający kursor, duży -> mały).
 * Po wysłaniu, POD wiadomością, kroki dodają się jeden pod drugim i ZOSTAJĄ
 * (loader -> check, cyk cyk cyk). Po PRAWEJ: mapa (statyczna) + niżej sekcja
 * "Brane pod uwagę", która POJAWIA SIĘ stopniowo (napis + lupka, potem pliki
 * jeden po drugim, kończąc na checku). Na końcu odpowiedź z "napisane z".
 *
 * Prawa kolumna ma stałą min-wysokość -> wiersz gridu jest stały, mapa nie drgnie.
 * Zero gradientów. reduced-motion = stan końcowy.
 * UWAGA: pytanie, kroki, pliki, odpowiedź = placeholder microcopy do dotknięcia.
 */

const PROMPT = "Klient pyta o wycenę strony. Co odpowiadam?";
// finałowa odpowiedź (demo MYŚLENIA, nie pisania): decyzja z własnej historii
const ANSWER_HOOK = "Widełki 9-12K. Poniżej 8K nie schodzisz.";
const ANSWER_PROMISE = "Ostatnie dwa razy poniżej floora żałowałeś. Masz to zapisane.";

const STEPS: { label: string; file?: string }[] = [
  { label: "Analizuję pytanie" },
  { label: "Przeszukuję twój drugi mózg" },
  { label: "Czytam twoje wyceny", file: "wyceny.md" },
  { label: "Czytam historię klientów", file: "klienci.md" },
  { label: "Czytam twoje zasady", file: "zasady-biznesu.md" },
  { label: "Czytam oferty, które przeszły", file: "oferty.md" },
  { label: "Porównuję z twoimi liczbami" },
  { label: "Składam odpowiedź z twojej historii" },
];
const READ_OFFSET = 2;

const VW = 460;
const VH = 306;
const BAZA = { x: 330, y: 153 };
const ITEMS = [
  { file: "wyceny.md", x: 100, y: 64 },
  { file: "klienci.md", x: 64, y: 153 },
  { file: "zasady-biznesu.md", x: 104, y: 242 },
  { file: "oferty.md", x: 205, y: 230 },
];

const CHAR_MS = 42;
const T_TYPE = PROMPT.length * CHAR_MS;
const T_SEND = T_TYPE + 600;
const STEP_DUR = 600;
const T_ANSWER = STEPS.length * STEP_DUR;
const T_LOOP = T_SEND + T_ANSWER + 5500; // dłuższy hold na końcu, żeby zdążyć przeczytać

export function KnowledgeReader() {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-15% 0px" });
  const [t, setT] = useState(reduce ? T_LOOP : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    let e = 0;
    setT(0);
    const id = setInterval(() => {
      e += 60;
      if (e > T_LOOP) e = 0;
      setT(e);
    }, 60);
    return () => clearInterval(id);
  }, [inView, reduce]);

  const promptN = reduce ? PROMPT.length : Math.min(PROMPT.length, Math.floor(t / CHAR_MS));
  const typingCursor = !reduce && t < T_TYPE;
  const readyToSend = !reduce && t >= T_TYPE && t < T_SEND;
  const sent = reduce || t >= T_SEND;
  const rt = t - T_SEND;

  const stepState = (s: number): "idle" | "active" | "done" => {
    if (reduce) return "done";
    if (!sent) return "idle";
    if (rt < s * STEP_DUR) return "idle";
    if (rt < (s + 1) * STEP_DUR) return "active";
    return "done";
  };
  const itemState = (i: number) => stepState(READ_OFFSET + i);
  const answered = reduce || (sent && rt >= T_ANSWER);
  const thinking = !reduce && sent && !answered;
  // "Brane pod uwagę" pokazuje się dopiero gdy zaczyna przeszukiwać (krok 1)
  const considerShow = reduce || (sent && rt >= STEP_DUR);

  const { dots, mesh, spokes } = useMemo(() => {
    const N = 62;
    const golden = Math.PI * (3 - Math.sqrt(5));
    const cx = 300, cy = 153, R = 138;
    const dots: { x: number; y: number }[] = [];
    for (let i = 0; i < N; i++) {
      const tt = (i + 0.5) / N;
      const r = R * Math.sqrt(tt);
      const a = i * golden;
      let x = cx + Math.cos(a) * r;
      let y = cy + Math.sin(a) * r * 0.95;
      x = Math.max(150, Math.min(450, x));
      y = Math.max(16, Math.min(290, y));
      dots.push({ x, y });
    }
    const mesh: [number, number][] = [];
    for (let i = 0; i < N; i++) {
      const near = dots
        .map((d, j) => ({ j, d: (dots[i].x - d.x) ** 2 + (dots[i].y - d.y) ** 2 }))
        .filter((o) => o.j !== i)
        .sort((p, q) => p.d - q.d)
        .slice(0, 2);
      for (const { j } of near) if (i < j) mesh.push([i, j]);
    }
    const spokes = dots
      .map((d, j) => ({ j, d: (BAZA.x - d.x) ** 2 + (BAZA.y - d.y) ** 2 }))
      .sort((p, q) => p.d - q.d)
      .slice(0, 13)
      .map((o) => o.j);
    return { dots, mesh, spokes };
  }, []);

  return (
    <section className="container-wide py-20 sm:py-28">
      <motion.h2
        className="t-h2 max-w-[24ch]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        Zwykłe AI zgaduje. Twoje otwiera twoją historię i odpowiada jak ty.
      </motion.h2>

      {/* JEDEN panel. Prawa kolumna ma stałą min-wysokość -> mapa statyczna. */}
      <div ref={ref} className="mt-10 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[0_50px_140px_-90px_rgba(8,12,40,0.6)]">
        <div className="grid lg:grid-cols-[1.05fr_1fr]">
          {/* LEWO: stała wysokość, crossfade proces <-> duży finałowy hook */}
          <div className="relative h-[440px] lg:h-[480px]">
            {/* warstwa PROCES: prompt (duży -> mały) + stos statusów. Znika gdy gotowe. */}
            <motion.div
              initial={false}
              animate={{ opacity: answered ? 0 : 1 }}
              transition={{ duration: 0.45 }}
              className={`absolute inset-0 flex flex-col p-6 sm:p-8 ${answered ? "pointer-events-none" : ""} ${sent ? "justify-start" : "justify-center"}`}
            >
              <div className={`flex ${sent ? "justify-end" : "justify-center"}`}>
                <motion.div
                  initial={false}
                  animate={{ fontSize: sent ? "15px" : "28px" }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={`max-w-[20ch] font-semibold leading-snug tracking-[-0.01em] text-[var(--text)] ${sent ? "text-right" : "text-center"}`}
                >
                  {PROMPT.slice(0, promptN)}
                  {(typingCursor || readyToSend) && <Caret />}
                </motion.div>
              </div>

              {sent && (
                <div className="mt-5 flex flex-col gap-1.5 self-start">
                  {STEPS.map((s, i) => {
                    const st = stepState(i);
                    if (st === "idle") return null;
                    return (
                      <motion.div
                        key={s.label}
                        initial={reduce ? false : { opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="flex items-center gap-2.5 text-[13px]"
                      >
                        {st === "done" ? (
                          <Check size={14} strokeWidth={2.75} className="shrink-0 text-[var(--accent)]" />
                        ) : (
                          <Loader2 size={14} strokeWidth={2.5} className="shrink-0 animate-spin text-[var(--accent)]" />
                        )}
                        <span className={st === "done" ? "text-[var(--text-secondary)]" : "text-[var(--text)]"}>{s.label}</span>
                        {s.file && <span className="font-mono text-[11.5px] text-[var(--text-secondary)]">{s.file}</span>}
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* warstwa FINAŁ: duży hook, przykuwa uwagę, trzyma się długo */}
            <motion.div
              initial={false}
              animate={{ opacity: answered ? 1 : 0 }}
              transition={{ duration: 0.6, delay: answered && !reduce ? 0.25 : 0 }}
              className={`absolute inset-0 flex flex-col justify-center gap-4 p-7 sm:p-10 ${answered ? "" : "pointer-events-none"}`}
            >
              <span className="inline-flex items-center gap-1.5 text-[12.5px] font-medium text-[var(--accent)]">
                <WesternStar reduce={reduce} />
                Twoja decyzja, z twojej historii
              </span>
              <motion.p
                initial={false}
                animate={answered && !reduce ? { opacity: [0, 1], y: [12, 0] } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[20ch] text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-[var(--text)] sm:text-[30px]"
              >
                {ANSWER_HOOK}
              </motion.p>
              <motion.p
                initial={false}
                animate={answered && !reduce ? { opacity: [0, 1], y: [12, 0] } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-[26ch] text-[16px] leading-snug text-[var(--text-secondary)] sm:text-[18px]"
              >
                {ANSWER_PROMISE}
              </motion.p>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <span className="text-[11.5px] text-[var(--text-secondary)]">złożone z:</span>
                {ITEMS.map((it) => (
                  <span key={it.file} className="inline-flex items-center gap-1 rounded-md bg-[var(--accent)]/[0.1] px-1.5 py-0.5 text-[11px] font-medium text-[var(--accent)]">
                    <FileText size={10} strokeWidth={2.5} />
                    {it.file}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* PRAWO: mapa (STATYCZNA) + "Brane pod uwagę" pojawia się stopniowo. Stała wysokość = nic nie skacze. */}
          <div className="flex flex-col border-t border-[var(--border)] bg-[var(--bg-page)] p-6 sm:p-7 lg:h-[480px] lg:border-l lg:border-t-0">
            <div className="relative aspect-[460/306] w-full max-w-[440px] mx-auto">
              <svg viewBox={`0 0 ${VW} ${VH}`} className="absolute inset-0 h-full w-full" role="img" aria-label="Mapa twojej wiedzy: po wysłaniu pytania kolejno rozbłyskują pliki, które system czyta, i płyną do bazy.">
                {mesh.map(([a, b], i) => (
                  <line key={`m-${i}`} x1={dots[a].x} y1={dots[a].y} x2={dots[b].x} y2={dots[b].y} stroke="var(--accent)" strokeWidth={0.7} strokeOpacity={0.1} />
                ))}
                {spokes.map((j, i) => (
                  <line key={`sp-${i}`} x1={BAZA.x} y1={BAZA.y} x2={dots[j].x} y2={dots[j].y} stroke="var(--accent)" strokeWidth={0.8} strokeOpacity={0.13} />
                ))}
                {dots.map((d, i) => (
                  <circle key={`d-${i}`} cx={d.x} cy={d.y} r={1.8} fill="rgba(59,66,82,0.8)" />
                ))}

                {ITEMS.map((it, i) => {
                  const st = itemState(i);
                  const on = st !== "idle";
                  return (
                    <g key={`e-${it.file}`}>
                      <line x1={BAZA.x} y1={BAZA.y} x2={it.x} y2={it.y} stroke="var(--accent)" strokeWidth={1.4} strokeOpacity={st === "active" ? 0.5 : on ? 0.25 : 0.1} style={{ transition: "stroke-opacity 0.35s ease" }} />
                      {st === "active" && !reduce && (
                        <motion.circle r={3} fill="var(--accent)" initial={{ cx: it.x, cy: it.y, opacity: 0 }} animate={{ cx: BAZA.x, cy: BAZA.y, opacity: [0, 1, 1, 0] }} transition={{ duration: 0.85, ease: "easeIn", repeat: Infinity }} />
                      )}
                    </g>
                  );
                })}

                <circle cx={BAZA.x} cy={BAZA.y} r={30} fill="var(--accent)" opacity={0.1} />
                <motion.circle
                  cx={BAZA.x}
                  cy={BAZA.y}
                  r={21}
                  fill="var(--accent)"
                  animate={reduce ? undefined : thinking ? { scale: [1, 1.12, 1] } : { scale: 1 }}
                  transition={{ duration: 0.8, repeat: thinking && !reduce ? Infinity : 0, ease: "easeInOut" }}
                  style={{ transformOrigin: `${BAZA.x}px ${BAZA.y}px` }}
                />
                {answered && !reduce && (
                  <motion.circle cx={BAZA.x} cy={BAZA.y} fill="none" stroke="var(--accent)" strokeWidth={1.5} initial={{ r: 21, opacity: 0.5 }} animate={{ r: 46, opacity: 0 }} transition={{ duration: 1, ease: "easeOut" }} />
                )}
                <text x={BAZA.x} y={BAZA.y} textAnchor="middle" dominantBaseline="central" fill="#fff" fontSize="11" fontWeight={600}>
                  baza
                </text>
              </svg>

              {ITEMS.map((it, i) => {
                const st = itemState(i);
                const active = st === "active";
                const done = st === "done";
                return (
                  <motion.div
                    key={it.file}
                    className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-lg border bg-white px-2 py-1.5 shadow-[0_10px_30px_-16px_rgba(8,12,40,0.45)]"
                    style={{
                      left: `${(it.x / VW) * 100}%`,
                      top: `${(it.y / VH) * 100}%`,
                      borderColor: active || done ? "var(--accent)" : "var(--border)",
                    }}
                    animate={reduce ? undefined : { y: [0, i % 2 ? -4 : 4, 0], scale: active ? 1.08 : 1 }}
                    transition={{ y: { duration: 4 + i * 0.5, repeat: Infinity, ease: "easeInOut" }, scale: { duration: 0.3 } }}
                  >
                    {done && !active ? (
                      <Check size={12} strokeWidth={2.75} className="shrink-0 text-[var(--accent)]" />
                    ) : (
                      <FileText size={12} strokeWidth={2} className={`shrink-0 ${active ? "text-[var(--accent)]" : "text-[var(--text-secondary)]"}`} />
                    )}
                    <span className={`text-[11px] font-medium ${active || done ? "text-[var(--text)]" : "text-[var(--text-secondary)]"}`}>{it.file}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* "Brane pod uwagę": pojawia się stopniowo (napis + lupka, potem pliki) */}
            <div className="mt-5 flex-1 border-t border-[var(--border)] pt-4">
              {considerShow && (
                <motion.div initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.35 }}>
                  <p className="mb-2.5 flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-[0.1em] text-[var(--text-secondary)]">
                    <Search size={13} strokeWidth={2} className="text-[var(--accent)]" />
                    Brane pod uwagę
                  </p>
                  <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
                    {ITEMS.map((it, i) => {
                      const st = itemState(i);
                      if (st === "idle") return null; // pliki wskakują jeden po drugim
                      const active = st === "active";
                      const done = st === "done";
                      return (
                        <motion.div
                          key={it.file}
                          initial={reduce ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                          className="flex items-center gap-2 text-[12.5px]"
                        >
                          {done ? (
                            <Check size={13} strokeWidth={2.75} className="shrink-0 text-[var(--accent)]" />
                          ) : (
                            <Loader2 size={13} strokeWidth={2.5} className="shrink-0 animate-spin text-[var(--accent)]" />
                          )}
                          <span className={`font-mono text-[12px] ${active || done ? "text-[var(--text)]" : "text-[var(--text-secondary)]"}`}>{it.file}</span>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* mid-page CTA: pierwszy peak wiary (system myśli, nie tylko pisze) */}
      <div className="mt-10 flex flex-col items-center gap-3">
        <CtaButton variant="primary" label="Postaw swój Drugi Mózg" />
        <p className="t-small text-[var(--text-secondary)]">
          297 zł jednorazowo · dostęp od razu po opłaceniu
        </p>
      </div>
    </section>
  );
}

// Western 5-ramienna gwiazda (wypełniona, lekko zaokrąglone rogi), wobble lewo-prawo (outCubic).
function WesternStar({ reduce }: { reduce: boolean }) {
  return (
    <motion.svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      className="shrink-0 text-[var(--accent)]"
      style={{ transformOrigin: "center" }}
      animate={reduce ? undefined : { rotate: [-15, 15] }}
      transition={{ duration: 1.7, repeat: Infinity, repeatType: "reverse", ease: [0.33, 1, 0.68, 1] }}
      aria-hidden
    >
      <path
        d="M12 2 L14.94 7.95 L21.51 8.91 L16.76 13.55 L17.88 20.09 L12 17 L6.12 20.09 L7.24 13.55 L2.49 8.91 L9.06 7.95 Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth={1.7}
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function Caret() {
  return (
    <motion.span
      aria-hidden
      className="ml-1 inline-block w-[2px] translate-y-[0.08em] bg-[var(--accent)] align-baseline"
      style={{ height: "0.92em" }}
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] }}
    />
  );
}
