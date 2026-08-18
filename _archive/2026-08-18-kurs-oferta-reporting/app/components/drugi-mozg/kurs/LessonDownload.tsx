"use client";

import { useState } from "react";
import { ArrowDownToLine, Check, Package } from "lucide-react";
import type { LessonZip } from "@/lib/kurs";

/**
 * Jeden przycisk pobrania paczki lekcji - renderowany INLINE w treści lekcji
 * (marker {{POBIERZ_LEKCJE}} w markdownie). Ta sama animacja co Downloads
 * (pop + halo-ring + morph w check), ale tylko jeden plik, zero listy.
 */
export function LessonDownload({ file }: { file: LessonZip }) {
  const [hit, setHit] = useState(false);

  const fire = () => {
    setHit(true);
    window.setTimeout(() => setHit(false), 1800);
  };

  return (
    <a
      href={`/api/kurs/download?f=${encodeURIComponent(file.name)}`}
      download={file.name}
      onClick={fire}
      data-burst={hit ? "1" : "0"}
      className={`kurs-burst group my-2 flex items-center justify-between gap-4 rounded-2xl bg-[var(--accent)] p-5 text-white shadow-[0_24px_60px_-24px_rgba(38,86,217,0.6)] transition-transform hover:scale-[1.01] active:scale-[0.99] ${
        hit ? "kurs-pop" : ""
      }`}
    >
      <span className="flex items-center gap-3.5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15">
          {hit ? (
            <Check size={20} strokeWidth={2.75} className="kurs-check-in" />
          ) : (
            <Package size={20} strokeWidth={2} />
          )}
        </span>
        <span>
          <span className="block text-[16px] font-semibold">
            {hit ? "Pobieranie..." : `Pobierz: ${file.label}`}
          </span>
          <span className="block text-[13px] text-white/70">
            {file.name} · {Math.max(1, Math.round(file.size / 1024))} KB
          </span>
        </span>
      </span>
      <ArrowDownToLine
        size={20}
        strokeWidth={2.25}
        className="shrink-0 transition-transform group-hover:translate-y-0.5"
      />
    </a>
  );
}
