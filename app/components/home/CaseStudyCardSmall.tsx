import Link from "next/link";
import type { StructuredCaseStudy } from "@/app/lib/case-studies";

export function CaseStudyCardSmall({ study }: { study: StructuredCaseStudy }) {
  return (
    <Link
      href={`/case-studies/${study.slug}`}
      data-track="cta_case_study_card"
      data-track-id={`cta_case_study_${study.slug}`}
      data-track-href={`/case-studies/${study.slug}`}
      className="group relative block aspect-[3/2] overflow-hidden rounded-lg bg-white border border-[var(--border)] cursor-pointer"
    >
      <div className="absolute inset-x-0 bottom-0 p-5">
        <h3 className="text-base md:text-lg font-semibold leading-snug text-[var(--text)]">
          {study.title}
        </h3>
      </div>
    </Link>
  );
}
