import { Reveal } from "@/app/components/oferta/Reveal";

/** Lead (Koe): kwalifikujące bóle. Edytorialowy, numerowany, sticky nagłówek. */
const PAINS: string[] = [
  "Masz wizję i taste, ale AI w twoich rękach wypluwa to samo, co u wszystkich. Generyczny slop.",
  "Wiesz, że content i brand to dziś przewaga, ale nie masz czasu siedzieć w tym codziennie.",
  "Próbowałeś narzędzi AI. Efekt wygląda jak AI. Brakuje duszy, brandu, ciebie.",
  "Agencja to wolno i drogo, a i tak prowadzisz ją za rękę.",
  "Twój zespół tonie w powtarzalnej robocie zamiast robić to, co naprawdę ważne.",
  "Chcesz tworzyć więcej i szybciej, ale nie kosztem jakości i kontroli nad stylem.",
];

export function ForWho() {
  return (
    <section className="container-wide border-t border-[var(--border)] py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        {/* sticky nagłówek */}
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <Reveal>
              <h2
                className="font-semibold text-[var(--text)]"
                style={{
                  fontSize: "clamp(2.1rem, 4vw, 3.2rem)",
                  lineHeight: 1.02,
                  letterSpacing: "-0.03em",
                }}
              >
                Dla kogo to jest?
              </h2>
            </Reveal>
          </div>
        </div>

        {/* numerowana lista bóli */}
        <ol className="lg:col-span-8">
          {PAINS.map((p, i) => (
            <Reveal key={p} delay={i * 0.05}>
              <li className="group flex items-start gap-5 border-b border-[var(--border)] py-7 transition-colors first:border-t first:border-[var(--border)] sm:gap-8">
                <span
                  className="shrink-0 text-[var(--accent)]/35 transition-colors duration-300 group-hover:text-[var(--accent)]"
                  style={{
                    fontVariantNumeric: "tabular-nums",
                    fontSize: "clamp(1.6rem, 2.4vw, 2.2rem)",
                    fontWeight: 600,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="text-[var(--text)]"
                  style={{
                    fontSize: "clamp(1.15rem, 1.7vw, 1.55rem)",
                    lineHeight: 1.32,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {p}
                </span>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
