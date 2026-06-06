import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";

// Canonical pricing tiers (per memory: 7k/12k/20k Starter/Growth/Full po pivocie 2026-05-06)
type Tier = {
  id: string;
  name: string;
  price: string;
  tagline: string;
  bullets: string[];
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    price: "od 7 000 zł",
    tagline: "Mała marka, szybki start.",
    bullets: [
      "Logo + wariacje",
      "Paleta i typografia",
      "Mini-system marki (PDF)",
      "1 runda poprawek",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "od 12 000 zł",
    tagline: "Pełen rebrand + launch video.",
    bullets: [
      "Wszystko ze Startera",
      "System marki (20–30 stron PDF)",
      "Launch video 15–30s",
      "Paczka grafik premierowych",
      "2 rundy poprawek",
    ],
    featured: true,
  },
  {
    id: "full",
    name: "Full",
    price: "od 20 000 zł",
    tagline: "Marka skalowalna, na lata.",
    bullets: [
      "Wszystko z Growth",
      "Pełen design system",
      "Strategia + tone of voice",
      "Onboarding zespołu (Loom)",
      "30 dni wsparcia po launchu",
    ],
  },
];

export function ServicesSection() {
  return (
    <section
      id="services"
      className="border-t border-[var(--border)] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 py-20 md:py-28">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--text)] mb-10 md:mb-12">
            Services
          </h2>

          <div className="flex flex-col gap-5 md:gap-6">
            {TIERS.map((tier) => {
              const isFeatured = tier.featured;
              const cardBase =
                "relative rounded-lg p-6 md:p-8 flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-10";
              const cardSkin = isFeatured
                ? "bg-[var(--accent)] text-white border border-[var(--accent)]"
                : "bg-white border border-[var(--border)]";
              const muted = isFeatured ? "text-white/70" : "text-[var(--text-secondary)]";
              const text = isFeatured ? "text-white" : "text-[var(--text)]";
              const checkColor = isFeatured ? "text-white" : "text-[var(--accent)]";

              return (
                <div key={tier.id} className={`${cardBase} ${cardSkin}`}>
                  <div className="sm:w-64 shrink-0">
                    <div className={`text-xs uppercase tracking-uppercase font-semibold ${muted}`}>
                      {tier.name}
                    </div>
                    <div
                      className={`mt-2 text-[32px] md:text-[36px] font-semibold leading-none ${text}`}
                      style={{ fontVariantNumeric: "tabular-nums" }}
                    >
                      {tier.price}
                    </div>
                    <p className={`mt-3 text-base leading-relaxed ${muted}`}>
                      {tier.tagline}
                    </p>
                  </div>

                  <div className="flex-1 flex flex-col gap-5">
                    <ul className="flex flex-col gap-2.5">
                      {tier.bullets.map((b) => (
                        <li
                          key={b}
                          className={`flex items-start gap-2.5 text-base leading-snug ${text}`}
                        >
                          <Check
                            size={16}
                            strokeWidth={2.5}
                            className={`mt-1 shrink-0 ${checkColor}`}
                          />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={`/oferta#${tier.id}`}
                      data-track="cta_home_services"
                      data-track-id={`cta_home_services_${tier.id}`}
                      data-track-href={`/oferta#${tier.id}`}
                      className={`inline-flex items-center gap-2 self-start text-sm md:text-base font-semibold ${
                        isFeatured ? "text-white" : "text-[var(--accent)]"
                      } underline underline-offset-4`}
                    >
                      Szczegóły pakietu
                      <ArrowRight size={14} strokeWidth={2.25} />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
