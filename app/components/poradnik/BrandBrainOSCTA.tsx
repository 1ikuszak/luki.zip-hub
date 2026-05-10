"use client";

import { ArrowRight } from "lucide-react";
import { TrackedLink } from "@/app/components/TrackedLink";

type Props = {
  articleSlug: string;
};

export function BrandBrainOSCTA({ articleSlug }: Props) {
  return (
    <aside className="mt-4 rounded-xl bg-[var(--text)] text-white p-6 sm:p-8">
      <p className="text-[11px] uppercase tracking-wider font-semibold text-[var(--chartreuse)]">
        Następny krok
      </p>
      <h2 className="mt-3 text-[20px] sm:text-[22px] font-semibold leading-snug">
        Chcesz więcej takich poradników?
      </h2>
      <p className="mt-3 text-[15px] text-white/70 leading-relaxed">
        Co tydzień jeden konkretny insight o budowaniu brandu w erze AI. Krótko, bez spamu.
      </p>
      <TrackedLink
        ctaId="brain_poradnik_footer"
        href="/brain"
        articleSlug={articleSlug}
        medium="article"
        className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-semibold text-[var(--chartreuse)] underline underline-offset-4 hover:no-underline"
      >
        Zapisz się na newsletter
        <ArrowRight size={14} />
      </TrackedLink>
    </aside>
  );
}
