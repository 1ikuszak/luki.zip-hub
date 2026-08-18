"use client";

import { useState } from "react";
import { Check, Circle } from "lucide-react";
import { useKursProgress } from "./useKursProgress";

/**
 * Przycisk "Oznacz jako zaliczone" na dole lekcji. Toggluje stan w localStorage.
 * Na zaliczenie: pop + halo-ring (kurs-burst) = satysfakcjonujacy feedback.
 */
export function LessonComplete({ slug }: { slug: string }) {
  const { mounted, isDone, setDoneState } = useKursProgress();
  const done = mounted && isDone(slug);
  const [burst, setBurst] = useState(false);

  const onClick = () => {
    const next = !done;
    setDoneState(slug, next);
    if (next) {
      setBurst(true);
      window.setTimeout(() => setBurst(false), 650);
    }
  };

  return (
    <div className="mt-12 flex flex-col items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--bg-page)] p-7 text-center">
      <p className="t-small text-[var(--text-secondary)]">
        {done ? "Dobra robota. Ta lekcja jest za tobą." : "Skończyłeś? Odhacz i patrz jak rośnie pasek."}
      </p>
      <button
        type="button"
        onClick={onClick}
        data-burst={burst ? "1" : "0"}
        aria-pressed={done}
        className={`kurs-burst inline-flex h-[52px] items-center gap-2 rounded-full px-7 text-[16px] font-semibold transition-transform hover:scale-[1.03] active:scale-[0.98] ${
          done
            ? "bg-[var(--accent)] text-white kurs-pop"
            : "border border-[var(--border)] bg-white text-[var(--text)] hover:border-[var(--accent)]"
        }`}
      >
        {done ? (
          <Check size={18} strokeWidth={2.75} className="kurs-check-in" />
        ) : (
          <Circle size={18} strokeWidth={2.25} />
        )}
        {done ? "Zaliczone" : "Oznacz jako zaliczone"}
      </button>
    </div>
  );
}
