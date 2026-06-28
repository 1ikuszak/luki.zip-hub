"use client";

import { Calendar, ArrowRight } from "lucide-react";
import { trackCTA } from "@/app/lib/analytics";
import { CONTACT_FORM_URL } from "@/app/lib/data";

type Props = {
  caseTitle: string;
};

export function CalendlyCTA({ caseTitle }: Props) {
  return (
    <section className="bg-[var(--text-dark)] text-white">
      <div className="container-wide py-20 sm:py-28">
        <div className="max-w-[720px]">
          <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--chartreuse)] font-semibold">
            Porozmawiajmy
          </div>
          <h2 className="t-h2 mt-4 text-white">
            Zarezerwuj bezpłatną 30-minutową rozmowę
          </h2>
          <p className="t-body-large mt-5 text-white/70">
            Dowiedz się, jak wdrożyć AI, żeby osiągnąć twój wymarzony rezultat.
          </p>
        </div>

        <div className="mt-10">
          <a
            href={CONTACT_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-track="cta_contact"
            data-track-id={`cta_case_call_${caseTitle}`}
            data-track-href={CONTACT_FORM_URL}
            onClick={() => trackCTA("cta_calendly_case", caseTitle)}
            className="inline-flex items-center gap-3 rounded-lg bg-[var(--chartreuse)] px-7 h-[52px] text-base font-semibold text-[var(--text-dark)] transition-[filter] duration-150 hover:brightness-95"
          >
            <Calendar size={18} strokeWidth={2.25} />
            Umów rozmowę
            <ArrowRight size={18} strokeWidth={2.25} />
          </a>
        </div>
      </div>
    </section>
  );
}
