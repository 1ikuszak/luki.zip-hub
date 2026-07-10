"use client";

import { Check } from "lucide-react";
import { useKursProgress } from "./useKursProgress";

/** Wskaznik ukonczenia na karcie lekcji (indeks). Wypelniony check = zaliczone. */
export function LessonCheck({ slug }: { slug: string }) {
  const { mounted, isDone } = useKursProgress();
  const done = mounted && isDone(slug);

  if (!done) {
    return (
      <span
        aria-hidden
        className="flex h-6 w-6 items-center justify-center rounded-full border border-[var(--border)]"
      />
    );
  }
  return (
    <span
      aria-label="Lekcja zaliczona"
      className="kurs-check-in flex h-6 w-6 items-center justify-center rounded-full bg-[var(--accent)] text-white"
    >
      <Check size={14} strokeWidth={3} />
    </span>
  );
}
