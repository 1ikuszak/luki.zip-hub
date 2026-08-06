"use client";

import { useCallback, useEffect, useState } from "react";

type Shot = { src: string; alt: string };

/**
 * Klik w obrazek w treści artykułu otwiera go na pełnym ekranie.
 * Zamyka: klik w tło, przycisk, Esc. Blokuje scroll pod spodem.
 */
export function Lightbox() {
  const [shot, setShot] = useState<Shot | null>(null);

  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".markdown");
    if (!root) return;

    const imgs = Array.from(root.querySelectorAll<HTMLImageElement>("img"));
    const cleanups: Array<() => void> = [];

    for (const img of imgs) {
      img.classList.add("zoomable");
      img.setAttribute("role", "button");
      img.setAttribute("tabindex", "0");
      if (!img.getAttribute("aria-label")) {
        img.setAttribute("aria-label", `Powiększ: ${img.alt || "diagram"}`);
      }

      const open = () => setShot({ src: img.currentSrc || img.src, alt: img.alt });
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          open();
        }
      };

      img.addEventListener("click", open);
      img.addEventListener("keydown", onKey);
      cleanups.push(() => {
        img.removeEventListener("click", open);
        img.removeEventListener("keydown", onKey);
      });
    }

    return () => cleanups.forEach((fn) => fn());
  }, []);

  const close = useCallback(() => setShot(null), []);

  useEffect(() => {
    if (!shot) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [shot, close]);

  if (!shot) return null;

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={shot.alt || "Podgląd diagramu"}
      onClick={close}
    >
      <button
        type="button"
        className="lightbox__close"
        aria-label="Zamknij podgląd"
        onClick={close}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>

      <figure className="lightbox__frame" onClick={(e) => e.stopPropagation()}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={shot.src} alt={shot.alt} />
        {shot.alt && <figcaption>{shot.alt}</figcaption>}
      </figure>
    </div>
  );
}
