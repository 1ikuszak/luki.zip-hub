import { Check } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";
import { CtaButton } from "./CtaButton";

const VAULT_TREE = `knowledge/
├── 1-projects/     praca z deadline
├── 2-areas/        wiedza, klienci, biznes
├── 3-resources/    materiał referencyjny
├── 4-archive/      cold storage
├── _inbox/         tu wpada wszystko
└── CLAUDE.md       reguły dla agenta`;

const REASSURANCE = ["Dożywotni dostęp", "Bez kodowania", "Zwrot po Dniu 2"];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* subtelny akcentowy poblask za heroem, contained, bez interakcji */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[520px] w-[520px] rounded-full bg-[var(--accent)]/10 blur-[120px]"
      />

      <div className="container-wide relative pt-16 pb-12 sm:pt-20 sm:pb-16 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <div>
              <h1 className="text-[34px] font-semibold leading-[1.08] tracking-[-0.02em] text-[var(--text)] sm:text-[44px] lg:text-[52px]">
                Twój drugi mózg umiera w 2 tygodnie.{" "}
                <span className="text-[var(--accent)]">
                  Ten się utrzymuje sam.
                </span>
              </h1>

              <p className="t-body-large mt-6 max-w-[46ch] text-[var(--text-secondary)]">
                Budujesz go raz w 5 dni. Od dnia 6 robisz post albo brief w
                minutę, nie w godzinę. Utrzymanie robi agent.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaButton variant="primary" />
                <CtaButton
                  variant="secondary"
                  label="Zobacz, co zbudujesz"
                  href="#program"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-2xl border border-[var(--border)] bg-white p-5 shadow-[0_30px_80px_-50px_rgba(8,12,40,0.4)] sm:p-6">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                <span className="t-small font-semibold text-[var(--text)]">
                  Twój Żywy Vault. To budujesz Dnia 1.
                </span>
              </div>
              <pre className="overflow-x-auto whitespace-pre font-mono text-[12.5px] leading-[1.7] text-[var(--text-secondary)] sm:text-[13.5px]">
                {VAULT_TREE}
              </pre>
            </div>
          </Reveal>
        </div>

        {/* pasek reasekuracji pod heroem, nie w środku hero stacka */}
        <Reveal delay={0.15}>
          <div className="mt-12 grid grid-cols-1 gap-4 border-t border-[var(--border)] pt-6 sm:grid-cols-3">
            {REASSURANCE.map((item) => (
              <div key={item} className="flex items-center gap-2.5">
                <Check
                  size={18}
                  strokeWidth={2.5}
                  className="shrink-0 text-[var(--accent)]"
                />
                <span className="t-small font-medium text-[var(--text)]">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
