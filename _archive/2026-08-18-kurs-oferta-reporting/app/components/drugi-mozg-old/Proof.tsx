import { Reveal } from "@/app/components/oferta/Reveal";

const STATS = [
  { value: "55 000", label: "wyświetleń na reelu o tym systemie" },
  { value: "116 000", label: "wyświetleń na reelu XP Farming" },
  { value: "1842", label: "notatki w produkcyjnym vaulcie" },
  { value: "465", label: "konceptów połączonych w sieć" },
  { value: "60", label: "reeli wyprodukowanych z tej wiedzy" },
];

export function Proof() {
  return (
    <section className="container-wide py-20 sm:py-28">
      <Reveal>
        <h2 className="t-h2 max-w-[720px]">
          To nie teoria z bloga. To system, na którym pracuję codziennie.
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-5">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={Math.min(i * 0.05, 0.2)}>
            <div>
              <div className="text-[40px] font-semibold leading-none tracking-[-0.02em] text-[var(--text)] sm:text-[48px]">
                {stat.value}
              </div>
              <div className="t-small mt-3 text-[var(--text-secondary)]">
                {stat.label}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <p className="t-body mt-12 max-w-[70ch] text-[var(--text-secondary)]">
          Bilingual PL i EN. Buduję content i systemy AI dla marek, od FMCG po
          startupy AI. Tego samego systemu uczę w kursie.
        </p>
      </Reveal>

      {/*
        TODO: testymoniale uczniów po pierwszej kohorcie.
        TYLKO realne osoby + cytaty. Zero fake nazwisk i zmyślonych liczb.
        Struktura gotowa do odkomentowania (zdjęcie + imię + jedno zdanie wyniku):

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name} className="rounded-2xl border border-[var(--border)] bg-white p-6">
              <blockquote className="t-body text-[var(--text)]">{t.quote}</blockquote>
              <figcaption className="t-small mt-4 font-semibold text-[var(--text)]">
                {t.name}, {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      */}
    </section>
  );
}
