import { Check } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";
import { CtaButton } from "./CtaButton";

const VALUE_STACK = [
  "5 lekcji wideo (~15 min) + PDF z gotowymi promptami do każdej",
  "Template CLAUDE.md PARA-native: schema, według której twój agent operuje na wiedzy",
  "Trzy skille rdzenia: ingest, query, weekly-maintenance",
  "Struktura vaulta PARA + przykładowe MOC, od których startujesz",
  "Checklista zero do działającego systemu",
  "Dożywotni dostęp i wszystkie aktualizacje",
];

export function Offer() {
  return (
    <section className="container-wide py-20 sm:py-28">
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <Reveal>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
              Co dostajesz
            </div>
            <h2 className="t-h2 mt-3">Drugi Mózg OS</h2>
            <p className="t-body mt-4 max-w-[52ch] text-[var(--text-secondary)]">
              Pięciodniowy sprint, który zostawia ci działający system, nie
              kolejny kurs do obejrzenia.
            </p>

            <ul className="mt-8 space-y-4">
              {VALUE_STACK.map((item) => (
                <li key={item} className="flex gap-3">
                  <Check
                    size={20}
                    strokeWidth={2.5}
                    className="mt-0.5 shrink-0 text-[var(--accent)]"
                  />
                  <span className="t-body text-[var(--text)]">{item}</span>
                </li>
              ))}
            </ul>

            <p className="t-body mt-8 max-w-[60ch] text-[var(--text-secondary)]">
              Alternatywa to rok zbierania notatek, których nie używasz. Albo
              setup z konsultantem za tysiące złotych. Albo dwadzieścia
              tutoriali poskładanych samemu przez tygodnie prób. To: 5 dni, jeden
              system, który zostaje z tobą.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-[var(--border)] bg-white p-8 shadow-[0_30px_80px_-50px_rgba(8,12,40,0.4)] lg:sticky lg:top-24">
            <div className="flex items-baseline gap-2">
              <span className="text-[52px] font-semibold leading-none tracking-[-0.02em] text-[var(--text)]">
                297 zł
              </span>
            </div>
            <p className="t-small mt-2 text-[var(--text-secondary)]">
              Jednorazowo. Dożywotni dostęp.
            </p>

            <div className="mt-7">
              <CtaButton variant="primary" />
            </div>

            <div className="mt-6 space-y-2 border-t border-[var(--border)] pt-6">
              <p className="t-small flex items-center gap-2 text-[var(--text)]">
                <Check
                  size={16}
                  strokeWidth={2.5}
                  className="shrink-0 text-[var(--accent)]"
                />
                Bez kodowania, ~1h dziennie
              </p>
              <p className="t-small flex items-center gap-2 text-[var(--text)]">
                <Check
                  size={16}
                  strokeWidth={2.5}
                  className="shrink-0 text-[var(--accent)]"
                />
                Zwrot, jeśli po Dniu 2 nie masz działającego vaulta
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
