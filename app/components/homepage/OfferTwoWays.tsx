import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";
import { CONTACT_FORM_URL } from "@/app/lib/data";

/**
 * Jak możemy pracować. Trzy konkretne ścieżki jako drabina: Audyt (wejście) ->
 * Wdrożenie (core, featured/accent) -> Creative-led. Jeden akcent = nie 3 rowne karty.
 */
const WAYS = [
  {
    tag: "Audyt",
    title: "Sprawdzam, co działa, a co nie.",
    body: "Przeglądam twój content i procesy. Pokazuję, gdzie tracisz czas i jakość, i co wdrożyć najpierw.",
    benefit: "Wychodzisz z konkretną listą, nie z ogólnikami.",
    featured: false,
  },
  {
    tag: "Wdrożenie",
    title: "Buduję twój system, z tobą.",
    body: "Składam system AI zakodowany twoją marką i uczę twój zespół, jak go używać. Wychodzisz ze studiem, nie z fakturą.",
    benefit: "Produkujesz na poziomie codziennie, bez ciągłego najmowania ludzi.",
    featured: true,
  },
  {
    tag: "Creative-led",
    title: "Kieruję i produkuję.",
    body: "Launch film, kampania, content. Ja trzymam taste i kierunek, AI bierze ciężką robotę.",
    benefit: "Materiał, który wygląda jak ty, nie jak AI.",
    featured: false,
  },
];

export function OfferTwoWays() {
  return (
    <section className="container-wide py-20 sm:py-28">
      <Reveal>
        <h2
          className="font-semibold text-[var(--text)]"
          style={{
            fontSize: "clamp(2rem, 4.2vw, 3.2rem)",
            lineHeight: 1.04,
            letterSpacing: "-0.03em",
          }}
        >
          Jak możemy pracować.
        </h2>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {WAYS.map((w, i) => (
          <Reveal key={w.tag} delay={i * 0.06}>
            <div
              className={
                w.featured
                  ? "flex h-full flex-col rounded-[22px] bg-[var(--accent)] p-8 text-white"
                  : "flex h-full flex-col rounded-[22px] border border-[var(--border)] bg-[var(--bg-card)] p-8"
              }
            >
              <div
                className={
                  w.featured
                    ? "text-[12px] font-semibold uppercase tracking-[0.14em] text-white/70"
                    : "text-[12px] font-semibold uppercase tracking-[0.14em] text-[var(--accent)]"
                }
              >
                {w.tag}
              </div>
              <h3
                className={
                  w.featured
                    ? "mt-4 text-[22px] font-semibold leading-tight sm:text-[24px]"
                    : "mt-4 text-[22px] font-semibold leading-tight text-[var(--text)] sm:text-[24px]"
                }
              >
                {w.title}
              </h3>
              <p
                className={
                  w.featured
                    ? "mt-4 text-[15.5px] leading-relaxed text-white/85"
                    : "mt-4 text-[15.5px] leading-relaxed text-[var(--text-secondary)]"
                }
              >
                {w.body}
              </p>
              <p
                className={
                  w.featured
                    ? "mt-auto pt-4 text-[15.5px] font-semibold leading-relaxed text-white"
                    : "mt-auto pt-4 text-[15.5px] font-semibold leading-relaxed text-[var(--text)]"
                }
              >
                {w.benefit}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.08}>
        <div className="mt-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-[44ch] text-[var(--text-secondary)] t-body">
            Nie wiesz, od czego zacząć? Zacznij od audytu.
          </p>
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-track="cta_contact"
            data-track-id="cta_home_offer_call"
            data-track-href={CONTACT_FORM_URL}
            className="group inline-flex h-[52px] shrink-0 items-center gap-2 rounded-full bg-[var(--accent)] px-7 text-[15px] font-semibold text-white transition-transform hover:scale-[1.03] active:scale-[0.98]"
          >
            Umów rozmowę
            <ArrowRight
              size={17}
              strokeWidth={2.5}
              className="transition-transform group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </Reveal>
    </section>
  );
}
