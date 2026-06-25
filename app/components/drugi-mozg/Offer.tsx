import { Check, ShieldCheck } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";
import { CtaButton } from "./CtaButton";

const INSIDE = [
  "3 gotowe automaty: jeden wciąga twoją wiedzę, drugi pisze z niej w twoim głosie, trzeci sam sprząta system.",
  "Plik-mózg, który mówi AI kim jesteś, zanim o cokolwiek zapytasz.",
  "Gotowy szkielet, w którym twoja wiedza od razu wie, gdzie usiąść.",
  "5 lekcji wideo plus 5 PDF, każdy działa sam, z gotowymi promptami do wklejenia.",
  "Dożywotni dostęp i aktualizacje.",
];

const REPLACES = [
  "Rok zbierania notatek, z których nie korzystasz.",
  "Setup z konsultantem za tysiące.",
  "20 tutoriali poskładanych samemu, tygodnie prób.",
];

export function Offer() {
  return (
    <section id="checkout" className="container-wide py-20 sm:py-28">
      <Reveal>
        <div className="overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] shadow-[0_40px_120px_-60px_rgba(8,12,40,0.45)]">
          <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
            {/* lewa: co dostajesz */}
            <div className="p-8 sm:p-10 lg:p-12">
              <h2 className="t-h2 max-w-[20ch]">
                W 5 dni masz działający Drugi Mózg.
              </h2>
              <p className="t-body-large mt-5 text-[var(--text-secondary)]">
                System, z którego twoje AI pisze i decyduje jak ty. W środku:
              </p>

              <ul className="mt-8 space-y-4">
                {INSIDE.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)]/[0.1]">
                      <Check
                        size={15}
                        strokeWidth={2.75}
                        className="text-[var(--accent)]"
                      />
                    </span>
                    <span className="t-body text-[var(--text)]">{item}</span>
                  </li>
                ))}
              </ul>

              {/* value stack / kotwica */}
              <div className="mt-9 border-t border-[var(--border)] pt-7">
                <p className="t-small font-semibold text-[var(--text)]">
                  Co to zastępuje:
                </p>
                <ul className="mt-3 space-y-2">
                  {REPLACES.map((r) => (
                    <li
                      key={r}
                      className="flex gap-2.5 t-small text-[var(--text-secondary)]"
                    >
                      <span
                        aria-hidden
                        className="mt-2 h-px w-2.5 shrink-0 bg-[var(--text-secondary)]/40"
                      />
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* prawa: cena + CTA + risk reversal */}
            <div className="relative flex flex-col gap-7 overflow-hidden border-t border-[var(--border)] bg-[var(--bg-page)] p-8 sm:p-10 lg:border-l lg:border-t-0 lg:p-12">
              {/* subtelne pole węzłów (math motif, nie gradient) */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.6]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, var(--accent) 1.3px, transparent 1.3px)",
                  backgroundSize: "20px 20px",
                  WebkitMaskImage:
                    "radial-gradient(130% 90% at 85% 0%, black, transparent 68%)",
                  maskImage:
                    "radial-gradient(130% 90% at 85% 0%, black, transparent 68%)",
                }}
              />
              <div className="relative z-10">
                <p className="t-small font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
                  Drugi Mózg OS
                </p>
                <div className="mt-4 flex items-end gap-2.5">
                  <span className="text-[56px] font-semibold leading-none tracking-[-0.03em] text-[var(--text)]">
                    297 zł
                  </span>
                  <span className="t-small pb-2 text-[var(--text-secondary)]">
                    jednorazowo
                  </span>
                </div>
                {/* KOTWICA podwyzki - realna scarcity bez fake countdownu. */}
                <p className="t-small mt-2.5 text-[var(--text-secondary)]">
                  Cena startowa. Po pierwszej kohorcie w górę.
                </p>
                <div className="mt-6">
                  <CtaButton variant="primary" label="Postaw swój Drugi Mózg" />
                </div>
                {/* Sygnał zaufania pod przyciskiem. */}
                <p className="t-small mt-3 text-[var(--text-secondary)]">
                  Bezpieczna płatność przez EasyCart. Dostęp od razu po opłaceniu.
                  Dzień 2 = pełen zwrot.
                </p>
              </div>

              {/* risk reversal - wyróżniony */}
              <div className="relative z-10 mt-auto rounded-2xl border border-[var(--accent)]/25 bg-[var(--accent)]/[0.05] p-5">
                <div className="flex items-center gap-2.5">
                  <ShieldCheck
                    size={19}
                    strokeWidth={2.25}
                    className="shrink-0 text-[var(--accent)]"
                  />
                  <span className="t-small font-semibold text-[var(--text)]">
                    Ryzyko jest moje.
                  </span>
                </div>
                <p className="t-small mt-2.5 text-[var(--text-secondary)]">
                  Postaw system. Jeśli po Dniu 2 nie widzisz, że twoje AI pisze z
                  twojej wiedzy zamiast ze średniej internetu, piszesz jedno
                  zdanie i oddaję 297 zł. Bez pytań.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
