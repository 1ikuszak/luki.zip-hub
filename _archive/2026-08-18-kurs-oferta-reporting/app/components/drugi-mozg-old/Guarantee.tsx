import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";

export function Guarantee() {
  return (
    <section className="container-narrow py-12 sm:py-16">
      <Reveal>
        <div className="flex flex-col gap-5 rounded-2xl border border-[var(--border)] bg-white p-8 sm:flex-row sm:items-start sm:gap-6 sm:p-10">
          <ShieldCheck
            size={32}
            strokeWidth={2}
            className="shrink-0 text-[var(--accent)]"
          />
          <div>
            <h2 className="t-h3">
              Bez ryzyka, że zbudujesz kolejny martwy system.
            </h2>
            <p className="t-body mt-3 text-[var(--text-secondary)]">
              Jeśli po Dniu 2 nie masz działającego vaulta, który łapie twoją
              wiedzę, oddaję pieniądze. Nie ryzykujesz niczym poza tym, czym
              ryzykujesz teraz: kolejnym folderem, do którego nie zaglądasz.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
