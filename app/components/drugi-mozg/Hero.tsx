import { Reveal } from "@/app/components/oferta/Reveal";
import { CtaButton } from "./CtaButton";
import { BrainGraph } from "./BrainGraph";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 right-0 h-[560px] w-[560px] rounded-full bg-[var(--accent)]/10 blur-[130px]"
      />

      <div className="container-wide relative pt-14 pb-16 sm:pt-20 lg:pt-24">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <Reveal>
            <div>
              <h1 className="text-[36px] font-semibold leading-[1.06] tracking-[-0.025em] text-[var(--text)] sm:text-[48px] lg:text-[58px]">
                Twoje AI jest generyczne,{" "}
                <span className="text-[var(--accent)]">bo nie zna ciebie.</span>
              </h1>

              <p className="t-body-large mt-6 max-w-[48ch] text-[var(--text-secondary)]">
                Za 5 dni stawiasz Żywy System: drugi mózg, który pisze za ciebie
                post, maila, strategię w twoim głosie, i uczy się po tobie. Nie
                kolejny cmentarz notatek. System, który żyje i rośnie z tobą.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <CtaButton variant="primary" label="Postaw swój Drugi Mózg" />
                <CtaButton
                  variant="secondary"
                  label="Zobacz, co zbudujesz"
                  href="#program"
                />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="flex justify-center lg:justify-end">
              <BrainGraph />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
