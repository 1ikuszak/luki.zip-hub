import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";
import { DitherFlow } from "@/app/components/oferta/DitherFlow";
import { CtaButton } from "./CtaButton";
import { BrainGraph } from "./BrainGraph";
import { HeroBrainScene } from "./HeroBrainScene";

export function Hero() {
  const fallbackGradient =
    "linear-gradient(135deg, #0a1440 0%, #2656d9 62%, #4a72e4 100%)";

  return (
    <section className="relative overflow-hidden lg:flex lg:min-h-[calc(100dvh-4rem)] lg:items-center">
      {/* DESKTOP: pikselowy shader full-bleed na prawej połowie, na całą wysokość ekranu */}
      <div
        aria-hidden
        className="absolute inset-y-0 left-1/2 right-0 hidden lg:block"
      >
        <div
          className="absolute inset-0"
          style={{ background: fallbackGradient }}
        />
        <DitherFlow className="absolute inset-0 h-full w-full" />
      </div>
      {/* DESKTOP: mózg + scena czatu, jeden zsynchronizowany flow (analiza -> zapis -> reconnect) */}
      <div className="pointer-events-none absolute inset-y-0 left-1/2 right-0 hidden lg:block">
        <HeroBrainScene />
      </div>

      <div className="container-wide relative w-full pt-14 pb-16 sm:pt-20 lg:py-16">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="lg:max-w-[34rem]">
              <span className="inline-flex items-center rounded-full bg-[color-mix(in_srgb,var(--text)_5%,transparent)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--accent)]">
                Dla twórców i solopreneurów zmęczonych generycznym AI
              </span>

              <h1 className="mt-6 text-[36px] font-semibold leading-[1.06] tracking-[-0.025em] text-[var(--text)] sm:text-[48px] lg:text-[58px]">
                Twoje AI jest generyczne,{" "}
                <span className="text-[var(--accent)]">bo nie zna ciebie.</span>
              </h1>

              <p className="t-body-large mt-6 max-w-[48ch] text-[var(--text-secondary)]">
                Wszyscy uczą, jak odpalić Claude Code. Ja pokazuję, jak dać mu
                twoją wiedzę, twój gust i twój sposób myślenia. W 5 wieczorów
                stawiasz Żywy System: drugi mózg, który pisze jak ty, decyduje
                jak ty i ocenia jak ty. I z każdą poprawką zna cię lepiej.
              </p>

              <div className="mt-10 flex flex-col items-start gap-4">
                <CtaButton variant="primary" label="Postaw swój Drugi Mózg" />
                <a
                  href="#program"
                  className="group inline-flex items-center gap-1.5 text-[15px] font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text)]"
                >
                  Zobacz, jak to działa
                  <ArrowRight
                    size={16}
                    strokeWidth={2}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </a>
              </div>
            </div>
          </Reveal>

          {/* MOBILE: kontenerowy panel shader+mózg (desktop ma full-bleed wyżej) */}
          <div className="lg:hidden">
            <Reveal delay={0.1}>
              <div className="relative aspect-square w-full overflow-hidden rounded-3xl border border-[var(--accent)]/20 shadow-[0_40px_120px_-55px_rgba(38,86,217,0.6)]">
                <div
                  aria-hidden
                  className="absolute inset-0"
                  style={{ background: fallbackGradient }}
                />
                <DitherFlow className="absolute inset-0 h-full w-full" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <BrainGraph tone="onDark" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
