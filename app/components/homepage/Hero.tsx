import type { CSSProperties } from "react";
import { ArrowRight } from "lucide-react";
import { CONTACT_FORM_URL } from "@/app/lib/data";
import { BrandStrip } from "./BrandStrip";

/** Stagger wejscia hero na CSS (klasa .hero-in, globals.css). */
const step = (i: number) => ({ "--hero-delay": `${0.06 + i * 0.1}s` } as CSSProperties);

export function Hero() {
  return (
    <section className="flex min-h-[calc(100dvh-5rem)] flex-col">
      <div className="relative flex flex-1 items-center justify-center py-12">
        {/* subtelny niebieski glow zamiast shadera */}
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[640px] w-[1000px] max-w-[110vw] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60"
          style={{ background: "radial-gradient(closest-side, rgba(38,86,217,0.16), rgba(38,86,217,0.07) 55%, transparent 78%)" }}
        />

        <div className="container-default relative z-10 text-center">
          <div className="hero-in flex justify-center" style={step(0)}>
            <span className="inline-flex items-center rounded-full bg-[color-mix(in_srgb,var(--text)_5%,transparent)] px-3.5 py-1.5 text-[13px] font-medium text-[var(--accent)]">
              Wdróż AI tam, gdzie ma to faktycznie sens
            </span>
          </div>

          <h1
            className="hero-in mx-auto mt-8 max-w-[22ch] font-semibold text-[var(--text)]"
            style={{
              ...step(1),
              fontSize: "clamp(2.2rem, 4.8vw, 4.4rem)",
              lineHeight: 1.0,
              letterSpacing: "-0.035em",
            }}
          >
            Ostateczny partner wzrostu AI dla dynamicznych firm.
          </h1>

          <p
            className="hero-in mx-auto mt-6 max-w-[54ch] text-[var(--text-secondary)]"
            style={{ ...step(2), fontSize: "clamp(1.05rem, 1.35vw, 1.25rem)", lineHeight: 1.6 }}
          >
            Systemy AI, które generują leady, zamykają deale i skalują operacje. Zdejmij
            powtarzalną robotę i skaluj to, co realnie zarabia.
          </p>

          <div className="hero-in mt-9 flex flex-col items-center gap-3" style={step(3)}>
            <a
              href={CONTACT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-track="cta_contact"
              data-track-id="cta_home_hero_call"
              data-track-href={CONTACT_FORM_URL}
              className="btn-glossy group inline-flex h-[56px] items-center gap-3 rounded-full pl-8 pr-2.5 text-[16px] font-semibold text-white"
            >
              Pogadajmy
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-white text-[var(--accent)] transition-transform group-hover:translate-x-0.5">
                <ArrowRight size={20} strokeWidth={2.25} />
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* pas logo marek — zawsze widoczny na dole pierwszego ekranu */}
      <BrandStrip />
    </section>
  );
}
