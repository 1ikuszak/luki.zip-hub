import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { StructuredCaseStudy } from "@/app/lib/case-studies";

export function CaseStudyCardSmall({ study }: { study: StructuredCaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      data-track="cta_case_study_card"
      data-track-id={`cta_case_study_${study.slug}`}
      data-track-href={`/case-studies/${study.slug}`}
      className="group block overflow-hidden rounded-xl border border-[var(--border)] bg-white transition-colors duration-150 hover:border-[var(--accent)]"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
        <Image
          src={study.heroImage}
          alt={study.heroImageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-[18px] sm:text-[20px] font-semibold text-[var(--text)] leading-snug">
          {study.title}
        </h3>
        <p className="mt-2 text-[14px] sm:text-[15px] text-[var(--text-secondary)] line-clamp-2 leading-relaxed">
          {study.subtitle}
        </p>
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.12em] text-[var(--text-secondary)] font-semibold">
            <span>{study.stats.czas}</span>
            <span className="text-[var(--accent)]">{study.stats.efekt}</span>
          </div>
          <ArrowRight
            size={16}
            strokeWidth={2.25}
            className="text-[var(--accent)]"
          />
        </div>
      </div>
    </Link>
  );
}
