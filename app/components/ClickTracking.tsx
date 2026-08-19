"use client";

import { useEffect } from "react";
import { trackCTA } from "@/app/lib/analytics";
import { rememberArticleSource } from "@/app/lib/source-tracking";

/**
 * Jeden listener na dokumencie zamiast onClick w kazdej karcie (mobile perf
 * 2026-08-19). Elementy z data-track-id nie musza juz byc komponentami
 * klienckimi, wiec lista artykulow i CTA w poradnikach hydruja sie do zera.
 * Kontrakt atrybutow (bez zmian wobec starego kodu):
 *   data-track-id      wymagany, id zdarzenia
 *   data-track-href    opcjonalny, link raportowany do GA
 *   data-track-slug    opcjonalny, slug artykulu zrodlowego
 *   data-track-medium  opcjonalny, "article" | "homepage"
 */
export function ClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest?.("[data-track-id]") as HTMLElement | null;
      if (!el) return;

      const ctaId = el.dataset.trackId;
      if (!ctaId) return;

      const href = el.dataset.trackHref ?? (el as HTMLAnchorElement).href ?? undefined;
      const slug = el.dataset.trackSlug;
      const medium = el.dataset.trackMedium === "homepage" ? "homepage" : "article";

      if (slug) rememberArticleSource(slug, medium);
      trackCTA(ctaId, href, slug ? { article_slug: slug, medium } : undefined);
    };

    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
