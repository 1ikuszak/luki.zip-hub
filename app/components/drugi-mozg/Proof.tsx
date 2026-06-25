"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { Reveal } from "@/app/components/oferta/Reveal";

/**
 * Proof (Dan Koe: wiarygodność). Real-only. Liczniki count-up na scroll = liczby
 * "ożywają" gdy wjeżdżają w kadr. Reduced-motion = od razu wartość końcowa.
 */

const space = (n: number) => n.toLocaleString("pl-PL").replace(/ /g, " ");
const plain = (n: number) => String(n);

const STATS: { to: number; fmt: (n: number) => string; label: string }[] = [
  { to: 55000, fmt: space, label: "wyświetleń reela Drugi Mózg, 1534 osoby w komentarzach" },
  { to: 116000, fmt: space, label: "wyświetleń reela XP Farming" },
  { to: 1842, fmt: plain, label: "notatki, 465 konceptów, 60 reeli z tego systemu" },
];

function CountUp({
  to,
  fmt,
  reduce,
}: {
  to: number;
  fmt: (n: number) => string;
  reduce: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });
  const [v, setV] = useState(reduce ? to : 0);

  useEffect(() => {
    if (reduce || !inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1300;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const e = 1 - Math.pow(1 - t, 3);
      setV(Math.round(to * e));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, to]);

  return (
    <span
      ref={ref}
      className="text-[40px] font-semibold leading-none tracking-[-0.02em] text-[var(--accent)] sm:text-[52px]"
    >
      {fmt(v)}
    </span>
  );
}

export function Proof() {
  const reduce = useReducedMotion() ?? false;

  return (
    <section className="container-wide py-20 sm:py-28">
      <Reveal>
        <h2 className="t-h2 max-w-[20ch]">
          Tego nie zmyśliłem. Ten system stoi u mnie i produkuje.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--border)] sm:grid-cols-3">
        {STATS.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div className="flex h-full flex-col gap-2 bg-[var(--bg-card)] p-8">
              <CountUp to={s.to} fmt={s.fmt} reduce={reduce} />
              <span className="t-small text-[var(--text-secondary)]">
                {s.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>

      {/* TODO: po pierwszej kohorcie dorzucić 2-3 realne opinie uczniów. Zero fake nazwisk. */}
      <Reveal delay={0.2}>
        <div className="mt-8 flex flex-col gap-2 rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-8">
          <p className="t-body text-[var(--text)]">
            1534 osoby zostawiły komentarz pod jednym reelem o tym systemie,
            pytając jak go postawić u siebie.
          </p>
          <p className="t-small text-[var(--text-secondary)]">
            Działa po polsku i po angielsku. Opinie uczniów dorzucę po pierwszej
            kohorcie. Tylko realne, zero zmyślonych nazwisk.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
