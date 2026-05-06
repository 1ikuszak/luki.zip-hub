import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getAllCaseStudies } from "@/app/lib/case-studies";
import { CaseStudyCardSmall } from "./CaseStudyCardSmall";
import { SectionHeading } from "./SectionHeading";

export async function CaseStudiesSection() {
  const studies = (await getAllCaseStudies()).slice(0, 3);

  return (
    <section className="container-wide py-16 sm:py-24">
      <div className="flex items-end justify-between gap-4 mb-10 sm:mb-12">
        <SectionHeading
          eyebrow="Case studies"
          title="Ostatnie launche"
        />
        <Link
          href="/case-studies"
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] underline underline-offset-4 hover:no-underline shrink-0 pb-2"
        >
          Zobacz wszystkie
          <ArrowRight size={14} strokeWidth={2.25} />
        </Link>
      </div>

      {studies.length === 0 ? (
        <p className="t-body text-[var(--text-secondary)]">
          Brak case studies. Dodaj plik JSON w <code>content/case-studies/</code>.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {studies.map((study) => (
            <CaseStudyCardSmall key={study.slug} study={study} />
          ))}
        </div>
      )}

      <Link
        href="/case-studies"
        className="sm:hidden mt-8 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--accent)] underline underline-offset-4"
      >
        Zobacz wszystkie
        <ArrowRight size={14} strokeWidth={2.25} />
      </Link>
    </section>
  );
}
