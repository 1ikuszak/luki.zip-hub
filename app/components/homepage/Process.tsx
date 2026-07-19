import { Reveal } from "@/app/components/oferta/Reveal";

/**
 * Proces wdrozenia (4 kroki) - wzorzec Nick Saraev "From first call to launch",
 * przelozony 1:1 na proces Lukiego (mapa -> oferta -> wdrozenie -> opieka).
 * Numerowana os z hairline top-border per krok, akcent na numerach. Osobna
 * rodzina layoutu niz 2-kolumnowa OfferTwoWays. Copy = glos Lukiego (POV
 * "zmapuj biznes, AI tam gdzie zarabia").
 */
const STEPS = [
  {
    n: "01",
    title: "Mapa biznesu",
    body: "Darmowa rozmowa. Mapuję twój biznes i pokazuję dokładnie, gdzie AI realnie zarabia, a gdzie tylko przepali budżet.",
  },
  {
    n: "02",
    title: "Oferta",
    body: "Konkretny zakres, termin i stała cena. Zero niespodzianek, zero rozliczania godzin. Wiesz dokładnie, co dostajesz.",
  },
  {
    n: "03",
    title: "Wdrożenie",
    body: "Buduję, testuję i wdrażam twój system. Dostajesz działający produkt i update co tydzień, nie deck z obietnicami.",
  },
  {
    n: "04",
    title: "Opieka",
    body: "Opcjonalny retainer: system żyje, poprawia się i rośnie razem z tobą. Zwrot, który się kumuluje.",
  },
];

export function Process() {
  return (
    <section className="container-wide py-20 sm:py-28">
      <Reveal>
        <h2
          className="max-w-[20ch] font-semibold text-[var(--text)]"
          style={{ fontSize: "clamp(2rem, 4.2vw, 3.2rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
        >
          Od pierwszej rozmowy do wdrożenia.
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((step, i) => (
          <Reveal key={step.n} delay={0.06 * i}>
            <div className="border-t border-[var(--border)] pt-6">
              <span
                className="block font-semibold tabular-nums text-[var(--accent)]"
                style={{ fontSize: "clamp(2.4rem, 3.2vw, 3rem)", lineHeight: 1, letterSpacing: "-0.03em" }}
              >
                {step.n}
              </span>
              <h3 className="mt-5 text-[20px] font-semibold text-[var(--text)]">{step.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-[var(--text-secondary)]">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
