import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

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

export function PricingSection() {
  return (
    <section className="container-wide py-16 sm:py-24">
      <SectionHeading
        eyebrow="Współpraca"
        title="Jak mogę pomóc"
        subtitle="Trzy pakiety dopasowane do skali. Każdy kończy się launchem — bez fluffu, bez wleczenia projektu."
        align="center"
      />

      <div className="mt-12 sm:mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
        {TIERS.map((tier) => {
          const isFeatured = tier.featured;
          const muted = isFeatured ? "text-white/60" : "text-[var(--text-secondary)]";
          const text = isFeatured ? "text-white" : "text-[var(--text)]";
          const divider = isFeatured ? "border-white/15" : "border-[var(--border)]";

          const checkColor = isFeatured ? "text-white" : "text-[var(--accent)]";
          return (
            <div
              key={tier.id}
              className={`relative rounded-xl p-6 sm:p-7 flex flex-col ${
                isFeatured
                  ? "bg-[var(--accent)] text-white border border-[var(--accent)]"
                  : "bg-white border border-[var(--border)]"
              }`}
            >
              <div className={`text-[11px] font-semibold tracking-[0.12em] uppercase ${muted}`}>
                {tier.name}
              </div>

              <div
                className={`mt-2 text-[28px] sm:text-[32px] font-semibold leading-none ${text}`}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {tier.price}
              </div>

              <p className={`text-[15px] mt-3 leading-relaxed ${muted}`}>
                {tier.tagline}
              </p>

              <div className={`border-t ${divider} my-5`} />

              <ul className="flex flex-col gap-2.5 grow">
                {tier.bullets.map((b) => (
                  <li
                    key={b}
                    className={`flex items-start gap-2.5 text-[15px] leading-snug ${text}`}
                  >
                    <Check
                      size={16}
                      strokeWidth={2.5}
                      className={`mt-0.5 shrink-0 ${checkColor}`}
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <Link
                href={`/oferta#${tier.id}`}
                data-track="cta_pricing_card"
                data-track-id={`cta_pricing_${tier.id}`}
                data-track-href={`/oferta#${tier.id}`}
                className={`mt-7 inline-flex items-center justify-center gap-2 w-full h-[52px] rounded-lg font-semibold text-base transition-colors ${
                  isFeatured
                    ? "bg-white text-[var(--accent)] hover:bg-[var(--bg-page)]"
                    : "bg-[var(--accent)] text-white hover:bg-[var(--accent-light)]"
                }`}
              >
                Szczegóły pakietu
                <ArrowRight size={14} strokeWidth={2.25} />
              </Link>
            </div>
          );
        })}
      </div>

      <p className="mt-10 text-center text-[13px] text-[var(--text-secondary)]">
        Ceny netto. Realizacja 3–8 tygodni w zależności od zakresu.{" "}
        <Link
          href="/oferta"
          className="underline underline-offset-2 text-[var(--accent)] hover:no-underline"
        >
          Zobacz pełną ofertę
        </Link>
        .
      </p>
    </section>
  );
}
