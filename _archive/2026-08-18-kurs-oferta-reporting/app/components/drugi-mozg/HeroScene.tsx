"use client";

import { motion } from "framer-motion";
import {
  FileText,
  Check,
  Terminal,
  Loader2,
  ArrowRight,
  Megaphone,
  Wallet,
  Package,
} from "lucide-react";

/**
 * Scena na prawej (shaderowej) połowie, sterowana wspólnym zegarem `t` z HeroBrainScene.
 * Pytanie (glass) na górze + sieć w środku + terminal (glass) na dole.
 * Flow: pytanie -> czyta twoje pliki (glass-chipy, zapalają się) -> decyzja (3 ruchy)
 * -> SYNTEZA: 3 filary biznesu (Marketing/Sprzedaż/Delivery) zapalają się i łączą w jeden
 * system. Zamiast "planu dnia" - dowód, że drugi mózg spina cały biznes.
 */

const PROMPT = "Na czym mam się dziś skupić?";

const FILES = [
  { name: "cele.md", at: 1500, pos: "left-[5%] top-[20%]" },
  { name: "klienci.md", at: 2050, pos: "right-[6%] top-[19%]" },
  { name: "statystyki.md", at: 2600, pos: "left-[8%] top-[35%]" },
  { name: "kalendarz.md", at: 3150, pos: "right-[8%] top-[34%]" },
];

// 3 filary biznesu na jednej osi -> jedna linia (prąd) płynie przez wszystkie
const PILLARS = [
  { name: "Marketing", Icon: Megaphone, cx: 22, cy: 47, at: 5300 },
  { name: "Sprzedaż", Icon: Wallet, cx: 50, cy: 47, at: 5650 },
  { name: "Delivery", Icon: Package, cx: 78, cy: 47, at: 6000 },
];
const CONNECT_AT = 6300;

type Kind = "read" | "answer" | "write";
const LOG: { at: number; text: string; kind: Kind }[] = [
  { at: 1500, text: "czytam cele.md", kind: "read" },
  { at: 2050, text: "czytam klienci.md", kind: "read" },
  { at: 2600, text: "czytam statystyki.md", kind: "read" },
  { at: 3150, text: "czytam kalendarz.md", kind: "read" },
  { at: 3700, text: "ważę dźwignię: wpływ vs czas", kind: "read" },
  { at: 4300, text: "3 ruchy: oferta Kamila, lekcja 3, 2 leady", kind: "answer" },
  { at: 5300, text: "spinam z biznesem: Marketing, Sprzedaż, Delivery", kind: "write" },
  { at: 6900, text: "wszystko spięte. jeden system, nie 40 narzędzi", kind: "write" },
];

const glassBase =
  "overflow-hidden border border-white/[0.14] bg-[rgba(10,14,44,0.4)] backdrop-blur-xl backdrop-saturate-150 shadow-[0_28px_70px_-26px_rgba(4,6,26,0.8)]";

function Sheen() {
  return (
    <>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.05) 20%, rgba(255,255,255,0) 46%)",
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-10 -top-10 h-32 w-32 rounded-full"
        style={{ background: "radial-gradient(closest-side, rgba(120,150,255,0.22), transparent)" }}
      />
      <span aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/30" />
    </>
  );
}

export function HeroScene({ t, reduce }: { t: number; reduce: boolean }) {
  const shown = LOG.map((l, i) => ({ l, i })).filter(({ l }) => reduce || t >= l.at);
  const visible = shown.slice(-5);
  const connected = reduce || t > CONNECT_AT;

  return (
    <div className="relative h-full w-full">
      {/* GÓRA: pytanie na high-end glass */}
      <div className={`absolute inset-x-[5%] top-[5%] rounded-2xl ${glassBase}`}>
        <Sheen />
        <div className="relative flex items-center gap-2.5 px-4 py-3">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] shadow-[0_4px_12px_-4px_rgba(38,86,217,0.9)]">
            <ArrowRight size={13} strokeWidth={2.5} className="text-white" />
          </span>
          <p className="text-[14px] font-medium leading-snug text-white sm:text-[15px]">
            {PROMPT}
          </p>
        </div>
      </div>

      {/* pliki-inputy na jasnych glass-chipach, zapalają się gdy czytane */}
      {FILES.map((f, i) => {
        const lit = reduce || t > f.at;
        return (
          <motion.div
            key={f.name}
            className={`absolute ${f.pos}`}
            animate={
              reduce
                ? undefined
                : { y: [i % 2 ? 4 : -4, i % 2 ? -5 : 5, i % 2 ? 4 : -4] }
            }
            transition={{ duration: 4 + i * 0.6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div
              className="inline-flex items-center gap-1.5 rounded-lg border px-2 py-1 backdrop-blur-sm transition-all duration-300"
              style={{
                background: lit ? "rgba(255,255,255,0.97)" : "rgba(255,255,255,0.8)",
                borderColor: lit ? "var(--accent)" : "rgba(255,255,255,0.65)",
                boxShadow: lit
                  ? "0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent), 0 12px 28px -14px rgba(4,6,26,0.55)"
                  : "0 10px 24px -14px rgba(4,6,26,0.5)",
              }}
            >
              <FileText
                size={12}
                strokeWidth={2}
                className={lit ? "text-[var(--accent)]" : "text-[#8b90a0]"}
              />
              <span className="font-mono text-[12px] font-medium text-[#161a27]">
                {f.name}
              </span>
              {lit && <Check size={12} strokeWidth={2.75} className="text-[var(--accent)]" />}
            </div>
          </motion.div>
        );
      })}

      {/* SYNTEZA: jedna subtelna linia (prąd) przez wszystkie 3 filary + płynące światełko */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute h-px"
        style={{
          left: "22%",
          right: "22%",
          top: "47%",
          transformOrigin: "center",
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.55) 20%, rgba(255,255,255,0.55) 80%, transparent)",
        }}
        initial={reduce ? false : { scaleX: 0, opacity: 0 }}
        animate={{ scaleX: connected ? 1 : 0, opacity: connected ? 1 : 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      />
      {connected && !reduce && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_3px_rgba(255,255,255,0.75)]"
          style={{ top: "47%" }}
          initial={{ left: "22%" }}
          animate={{ left: ["22%", "50%", "78%", "50%", "22%"] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* 3 filary biznesu - czyste chipy, niebieskie ikonki bez boxów */}
      {PILLARS.map((p) => {
        const lit = reduce || t > p.at;
        return (
          <motion.div
            key={p.name}
            className="absolute"
            style={{ left: `${p.cx}%`, top: `${p.cy}%`, transform: "translate(-50%,-50%)" }}
            initial={reduce ? false : { opacity: 0, scale: 0.85 }}
            animate={{ opacity: lit ? 1 : 0.45, scale: lit ? 1 : 0.92 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 backdrop-blur-sm transition-all duration-300"
              style={{
                background: lit ? "rgba(255,255,255,0.98)" : "rgba(255,255,255,0.82)",
                borderColor: lit ? "var(--accent)" : "rgba(255,255,255,0.6)",
                boxShadow: lit
                  ? "0 0 0 3px color-mix(in srgb, var(--accent) 20%, transparent), 0 14px 30px -14px rgba(38,86,217,0.5)"
                  : "0 10px 24px -14px rgba(4,6,26,0.5)",
              }}
            >
              <p.Icon size={13} strokeWidth={2} className="text-[var(--accent)]" />
              <span className="text-[12.5px] font-semibold text-[#161a27]">{p.name}</span>
            </div>
          </motion.div>
        );
      })}

      {/* DÓŁ: terminal logów (glass) z trackerami spinner->check */}
      <div className={`absolute inset-x-0 bottom-0 rounded-t-2xl ${glassBase}`}>
        <Sheen />
        <div className="relative flex items-center gap-2 border-b border-white/10 px-4 py-2">
          <Terminal size={13} strokeWidth={2} className="text-white/70" />
          <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-white/60">
            drugi-mozg
          </span>
          <span className="ml-auto h-1.5 w-1.5 rounded-full bg-[var(--accent)] motion-safe:animate-pulse" />
        </div>
        <div className="relative flex flex-col gap-1 px-4 py-3 font-mono text-[12px]">
          {visible.map(({ l, i }, k) => {
            const isLast = i === LOG.length - 1;
            const nextShown = i < LOG.length - 1 && (reduce || t >= LOG[i + 1].at);
            const done = isLast || nextShown;
            const active = !done;
            const isBottom = k === visible.length - 1;
            return (
              <motion.div
                key={l.at}
                initial={reduce ? false : { opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center gap-2 leading-snug"
              >
                <span className="flex h-3.5 w-3.5 shrink-0 items-center justify-center">
                  {active ? (
                    <Loader2 size={12} strokeWidth={2.5} className="animate-spin text-[var(--accent)]" />
                  ) : l.kind === "write" ? (
                    <Check size={12} strokeWidth={3} className="text-[var(--accent)]" />
                  ) : l.kind === "answer" ? (
                    <Check size={12} strokeWidth={3} className="text-white" />
                  ) : (
                    <Check size={12} strokeWidth={2.75} className="text-[var(--accent)]" />
                  )}
                </span>
                <span className={l.kind === "read" ? "text-white/70" : "text-white"}>
                  {l.text}
                </span>
                {isBottom && !reduce && (
                  <span className="ml-0.5 inline-block h-[1em] w-[7px] animate-pulse bg-white align-middle" />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
