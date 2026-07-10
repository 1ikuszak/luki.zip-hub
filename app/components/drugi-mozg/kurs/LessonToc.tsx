"use client";

import { useEffect, useState } from "react";
import type { TocItem } from "@/lib/kurs";

/**
 * Sticky spis sekcji lekcji. Scroll-spy przez IntersectionObserver (nie scroll
 * listener) - podswietla aktywna sekcje gdy przewijasz. Desktop only (parent
 * ukrywa na mobile). Klik = skok do sekcji.
 */
export function LessonToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    if (!items.length) return;
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -66% 0px", threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="Sekcje lekcji" className="sticky top-24">
      <p className="t-small mb-3 font-semibold uppercase tracking-uppercase text-[var(--text-secondary)]">
        W tej lekcji
      </p>
      <ul className="space-y-1 border-l border-[var(--border)]">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={`-ml-px block border-l-2 py-1.5 pl-4 text-[14px] leading-snug transition-colors ${
                  isActive
                    ? "border-[var(--accent)] font-semibold text-[var(--accent)]"
                    : "border-transparent text-[var(--text-secondary)] hover:text-[var(--text)]"
                }`}
              >
                {item.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
