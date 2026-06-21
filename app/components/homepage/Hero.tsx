"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CONTACT_FORM_URL } from "@/app/lib/data";
import { VideoStrip } from "./VideoStrip";

const EASE = [0.16, 1, 0.3, 1] as const;
const MONO = "ui-monospace, SFMono-Regular, Menlo, Monaco, monospace";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.06 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease: EASE } },
};

export function Hero() {
  return (
    <section className="flex min-h-[calc(100dvh-5rem)] flex-col">
      <div className="relative flex flex-1 items-center justify-center py-12">
        {/* subtelny niebieski glow zamiast shadera */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-[120px]"
          style={{ background: "radial-gradient(closest-side, rgba(38,86,217,0.20), transparent)" }}
        />

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="container-default relative z-10 text-center"
        >
          <motion.div variants={item} className="flex justify-center">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-[var(--border)] bg-white/70 px-4 py-1.5 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-[1px] bg-[var(--accent)]" aria-hidden />
              <span
                className="text-[11px] uppercase tracking-[0.18em] text-[var(--text-secondary)]"
                style={{ fontFamily: MONO }}
              >
                Dla founderów i marek bez generycznego AI
              </span>
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mx-auto mt-8 max-w-[22ch] font-semibold text-[var(--text)]"
            style={{
              fontSize: "clamp(2.2rem, 4.8vw, 4.4rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
            }}
          >
            Skaluję twój biznes systemami AI, które pracują jak ty.
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-[54ch] text-[var(--text-secondary)]"
            style={{ fontSize: "clamp(1.05rem, 1.35vw, 1.25rem)", lineHeight: 1.6 }}
          >
            Audytuję, buduję i wdrażam systemy z zakodowaną esencją twojej marki.
            Od contentu po cały biznes, w skali agencji. Uczę twój zespół, jak z
            nich korzystać.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="cta_contact"
              data-track-id="cta_home_hero_call"
              data-track-href={CONTACT_FORM_URL}
              className="group inline-flex h-[56px] items-center gap-2 rounded-full bg-[var(--accent)] px-8 text-[16px] font-semibold text-white shadow-[0_18px_44px_-18px_rgba(38,86,217,0.7)] transition-transform hover:scale-[1.03] active:scale-[0.98]"
            >
              Umów rozmowę
              <ArrowRight
                size={18}
                strokeWidth={2.5}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <Link
              href="/portfolio"
              data-track="cta_home"
              data-track-id="cta_home_hero_work"
              data-track-href="/portfolio"
              className="inline-flex h-[56px] items-center gap-2 rounded-full border border-[var(--border)] bg-white px-7 text-[16px] font-semibold text-[var(--text)] transition-colors hover:border-[var(--text)]"
            >
              Zobacz prace
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* pasek wideo — zawsze widoczny na dole pierwszego ekranu */}
      <VideoStrip />
    </section>
  );
}
