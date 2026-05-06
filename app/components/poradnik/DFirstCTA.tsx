"use client";

import { ArrowRight, Check, Sparkles } from "lucide-react";
import { TrackedLink } from "@/app/components/TrackedLink";

const DFIRST_URL = "https://dfirst.ai/?ref=lukasz";

const BENEFITS = [
  "GPT Image 2, Nano Banana Pro, Kling, Veo w jednym dashboardzie",
  "Najnowsze, najsilniejsze modele jak tylko wychodzą",
  "Zero kluczy API, zero żonglowania subskrypcjami",
];

type Props = {
  ctaId?: string;
  headline?: string;
};

export function DFirstCTA({
  ctaId = "affiliate_dfirst_cta",
  headline = "Cały ten workflow w jednym miejscu, bez żonglowania subskrypcjami",
}: Props) {
  return (
    <aside className="mt-4 overflow-hidden rounded-xl bg-[var(--text)] text-white">
      <div className="p-6 sm:p-8 md:p-10">
        <div className="flex items-center gap-2">
          <Sparkles size={14} className="text-[var(--chartreuse)]" />
          <p className="text-[11px] uppercase tracking-wider font-semibold text-[var(--chartreuse)]">
            Creative Partner DFirst
          </p>
        </div>

        <h2 className="mt-4 text-[24px] sm:text-[28px] font-semibold leading-tight">
          {headline}
        </h2>

        <p className="mt-4 text-[15px] sm:text-[16px] text-white/75 leading-relaxed">
          DFirst to dashboard do AI dla brandów i marek. Wszystkie tools z tego poradnika plus każdy nowy model jak tylko wychodzi. Pracuję z nimi blisko jako Creative Partner i pomagam rozwijać Polski produkt.
        </p>

        <ul className="mt-5 space-y-2.5">
          {BENEFITS.map((item) => (
            <li
              key={item}
              className="flex gap-2.5 text-[14px] sm:text-[15px] text-white/85 leading-relaxed"
            >
              <Check
                size={16}
                className="mt-0.5 shrink-0 text-[var(--chartreuse)]"
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <TrackedLink
          ctaId={ctaId}
          href={DFIRST_URL}
          target="_blank"
          rel="noopener sponsored"
          data-tool="DFirst"
          className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[var(--chartreuse)] px-5 py-3 text-[14px] sm:text-[15px] font-semibold text-[var(--text)] transition-transform hover:-translate-y-0.5"
        >
          Sprawdź DFirst
          <ArrowRight size={16} />
        </TrackedLink>

        <p className="mt-4 text-[12px] text-white/50 leading-relaxed">
          Link partnerski. Jak skorzystasz, dostanę małą prowizję. Mega dziękuję.
        </p>
      </div>
    </aside>
  );
}
