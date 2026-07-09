import { Reveal } from "@/app/components/oferta/Reveal";
import { Counter } from "@/app/components/oferta/Counter";

/**
 * Social proof 1. Czyste liczby = bohater (krotkie labelki). Puenta ("system")
 * jako podpis POD rzedem, nie naglowek nad. Liczby oddychaja.
 */
const PROOF: { to: number; suffix?: string; label: string }[] = [
  { to: 500, label: "leadów z jednego materiału" },
  { to: 300, suffix: "K", label: "wyświetleń, rekord kanału klienta" },
  { to: 10, suffix: "M+", label: "wyświetleń, które wygenerowałem" },
];

export function StatsBand() {
  return (
    <section className="border-y border-[var(--border)]">
      <div className="container-wide py-14 sm:py-20">
        <Reveal>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-0">
            {PROOF.map((s, i) => (
              <div
                key={s.label}
                className={i > 0 ? "sm:border-l sm:border-[var(--border)] sm:pl-8" : ""}
              >
                <Counter
                  to={s.to}
                  suffix={s.suffix}
                  className="block text-[52px] font-semibold leading-none tracking-tight text-[var(--text)] sm:text-[64px]"
                />
                <span className="mt-3 block text-[15px] text-[var(--text-secondary)]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className="mt-12 border-t border-[var(--border)] pt-6 text-[15px] text-[var(--text-secondary)]">
            Jednoosobowo, jednym systemem, bez agencji.{" "}
            <span className="font-semibold text-[var(--text)]">
              Tym samym, który zbuduję u ciebie.
            </span>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
