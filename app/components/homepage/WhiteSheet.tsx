"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Biała "płachta" floatująca na shaderze, która wjeżdża z dołu przy wejściu w
 * viewport. Zaokrąglona, kryje shader pod treść. Używana dla białego body.
 */
export function WhiteSheet({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.section
      initial={reduce ? false : { opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.04 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="rounded-[24px] border border-white/55 bg-[var(--bg-card)] shadow-[0_50px_140px_-70px_rgba(8,12,40,0.65)] sm:rounded-[34px]"
    >
      {children}
    </motion.section>
  );
}
