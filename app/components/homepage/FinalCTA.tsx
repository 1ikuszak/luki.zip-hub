import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";
import { CONTACT_FORM_URL } from "@/app/lib/data";

/**
 * Closer - jasny, czysty wariant (2026-07-19): ciemne tlo bylo brzydkie, wywalone.
 * Jasny panel, ciemny naglowek, subtelny akcent glow, jeden glossy przycisk.
 * Label CTA = "Pogadajmy" (spojny z hero, jeden label na intent).
 */
export function FinalCTA() {
  return (
    <section className="container-wide py-12 sm:py-20">
      <div className="relative overflow-hidden rounded-[28px] border border-[var(--border)] bg-[var(--bg-card)] px-7 py-16 text-center sm:px-14 sm:py-24">
        {/* subtelny akcent glow - gora, srodek */}
        <div
          className="pointer-events-none absolute left-1/2 top-0 h-[340px] w-[640px] max-w-[92vw] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-40 blur-[120px]"
          style={{
            background:
              "radial-gradient(closest-side, color-mix(in srgb, var(--accent) 24%, transparent), transparent)",
          }}
        />

        <div className="relative mx-auto max-w-[680px]">
          <Reveal>
            <h2
              className="font-semibold text-[var(--text)]"
              style={{ fontSize: "clamp(2rem, 4.4vw, 3.4rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
            >
              Gotowy skalować z AI?
            </h2>
          </Reveal>

          <Reveal delay={0.06}>
            <p className="mx-auto mt-5 max-w-[520px] text-[17px] leading-relaxed text-[var(--text-secondary)]">
              Umów darmową 30-minutową rozmowę. Zmapuję twój biznes, znajdę wąskie gardła
              i pokażę, gdzie AI realnie zarabia.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-9 flex justify-center">
              <a
                href={CONTACT_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-track="cta_contact"
                data-track-id="cta_home_final_call"
                data-track-href={CONTACT_FORM_URL}
                className="btn-glossy group inline-flex h-[58px] items-center gap-3 rounded-full pl-8 pr-2.5 text-[17px] font-semibold text-white"
              >
                Pogadajmy
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white text-[var(--accent)] transition-transform group-hover:translate-x-0.5">
                  <ArrowRight size={20} strokeWidth={2.25} />
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
