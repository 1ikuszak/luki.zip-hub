"use client";

import { motion, type Variants } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { CONTACT_FORM_URL } from "@/app/lib/data";
import { BrandStrip } from "./BrandStrip";

const EASE = [0.16, 1, 0.3, 1] as const;

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
            <span className="inline-flex items-center rounded-full bg-[color-mix(in_srgb,var(--text)_5%,transparent)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--accent)]">
              Dla marek, które chcą się skalować z AI tam, gdzie ma to faktycznie sens
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
            95% wdrożeń AI nie zwraca złotówki. Bo nikt nie nauczył AI twojego biznesu.
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-6 max-w-[54ch] text-[var(--text-secondary)]"
            style={{ fontSize: "clamp(1.05rem, 1.35vw, 1.25rem)", lineHeight: 1.6 }}
          >
            Treść, procesy i wiedza w jednym systemie pod twoją markę. Zdejmij powtarzalną robotę
            i skaluj to, co realnie zarabia.
          </motion.p>

          <motion.div
            variants={item}
            className="mt-9 flex flex-col items-center gap-3"
          >
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="cta_contact"
              data-track-id="cta_home_hero_call"
              data-track-href={CONTACT_FORM_URL}
              className="btn-glossy group inline-flex h-[56px] items-center gap-3 rounded-full pl-8 pr-2.5 text-[16px] font-semibold text-white"
            >
              Pogadajmy
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--accent)] transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={20} strokeWidth={2.25} />
              </span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* pas logo marek — zawsze widoczny na dole pierwszego ekranu */}
      <BrandStrip />
    </section>
  );
}
