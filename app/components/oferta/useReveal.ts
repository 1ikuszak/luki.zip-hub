"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fade+slide-up przy wejsciu w viewport, jednorazowo.
 *
 * Zastapil `animation-timeline: view()` (2026-08-26): WebKit ma udokumentowany
 * bug w scroll-driven animations, gdzie progres animacji blisko krawedzi
 * zakresu (0%/100%) liczy sie bledznie - naprawiony dopiero w Safari 26.5 beta.
 * Na starszych Safari objawialo sie to jako "przerywanie/zacinanie" scrolla na
 * telefonie (Luki, 2026-08-26). IntersectionObserver nie jest scroll-linked,
 * wiec caly ten bug nie ma jak wystapic.
 *
 * Domyslny stan to "idle" (brak stylu, tresc widoczna) - bezpieczny fallback
 * bez JS/przed hydracja. Element juz widoczny w viewporcie przy montowaniu
 * (np. powyzej zaginania) trafia od razu w "visible", bez migniecia.
 */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [state, setState] = useState<"idle" | "hidden" | "visible">("idle");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setState("visible");
      return;
    }

    const rect = el.getBoundingClientRect();
    const alreadyVisible = rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
    if (alreadyVisible) {
      setState("visible");
      return;
    }

    setState("hidden");
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState("visible");
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, state };
}
