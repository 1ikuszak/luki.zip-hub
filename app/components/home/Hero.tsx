import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="container-wide pt-16 sm:pt-24 pb-12 sm:pb-16">
      <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[var(--accent)]">
        Brand design · Launch video · System
      </div>
      <h1 className="t-h1 mt-5 max-w-[800px]">
        Robię marki,<br />
        które wyglądają{" "}
        <span className="italic font-normal">cool</span>.
      </h1>
      <p className="t-body-large mt-6 text-[var(--text-secondary)] max-w-[600px]">
        Brand design <span className="text-[var(--text)]">•</span>{" "}
        launch video <span className="text-[var(--text)]">•</span>{" "}
        system. Projektuję od pozycjonowania do filmu premierowego.
      </p>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Link
          href="/brain?utm_medium=homepage"
          data-track="cta_hero"
          data-track-id="cta_hero_brain"
          data-track-href="/brain?utm_medium=homepage"
          className="inline-flex h-[52px] items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-7 text-base font-semibold text-white hover:bg-[var(--accent-light)] transition-colors"
        >
          Zapisz się na newsletter
          <ArrowRight size={16} strokeWidth={2.25} />
        </Link>
        <Link
          href="/oferta"
          data-track="cta_hero"
          data-track-id="cta_hero_oferta"
          data-track-href="/oferta"
          className="inline-flex h-[52px] items-center justify-center rounded-lg bg-white px-7 text-base font-semibold text-[var(--text)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
        >
          Zobacz ofertę
        </Link>
      </div>
    </section>
  );
}
