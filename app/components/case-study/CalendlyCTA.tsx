"use client";

import { Calendar, ArrowRight } from "lucide-react";
import { trackCTA } from "@/app/lib/analytics";

type Props = {
  caseTitle: string;
};

export function CalendlyCTA({ caseTitle }: Props) {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <section className="bg-[var(--text-dark)] text-white">
      <div className="container-wide py-20 sm:py-28">
        <div className="max-w-[720px]">
          <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--chartreuse)] font-semibold">
            Porozmawiajmy
          </div>
          <h2 className="t-h2 mt-4 text-white">
            Masz podobny problem do tego z case&apos;a &bdquo;{caseTitle}&rdquo;?
          </h2>
          <p className="t-body-large mt-5 text-white/70">
            Zarezerwuj 30 minut. Bez pitchu, bez wciskania — szczera ocena,
            czy w ogóle warto to robić i jak.
          </p>
        </div>

        <div className="mt-10">
          {calendlyUrl ? (
            <div className="overflow-hidden rounded-xl bg-white">
              <iframe
                src={calendlyUrl}
                title="Umów rozmowę przez Calendly"
                className="block w-full"
                style={{ height: "720px", border: 0 }}
                loading="lazy"
              />
            </div>
          ) : (
            <a
              href="https://calendly.com/"
              target="_blank"
              rel="noopener noreferrer"
              data-track="cta_calendly_fallback"
              data-track-id={`cta_calendly_${caseTitle}`}
              data-track-href="https://calendly.com/"
              onClick={() => trackCTA("cta_calendly_case", caseTitle)}
              className="inline-flex items-center gap-3 rounded-lg bg-[var(--chartreuse)] px-7 h-[52px] text-base font-semibold text-[var(--text-dark)] transition-[filter] duration-150 hover:brightness-95"
            >
              <Calendar size={18} strokeWidth={2.25} />
              Zarezerwuj 30 minut
              <ArrowRight size={18} strokeWidth={2.25} />
            </a>
          )}
        </div>

        {!calendlyUrl && (
          <p className="mt-4 text-[13px] text-white/40">
            Ustaw <code className="text-white/60">NEXT_PUBLIC_CALENDLY_URL</code>{" "}
            w <code className="text-white/60">.env.local</code>, aby osadzić
            kalendarz inline.
          </p>
        )}
      </div>
    </section>
  );
}
