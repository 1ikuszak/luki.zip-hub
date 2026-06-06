import { getAllCaseStudies } from "@/app/lib/case-studies";
import { CaseStudyCardSmall } from "./CaseStudyCardSmall";

export async function CaseStudiesSection() {
  const studies = (await getAllCaseStudies()).slice(0, 3);

  return (
    <section
      id="case-studies"
      className="scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 pb-16 md:pb-20">
        <h2 className="text-xl md:text-2xl font-bold text-[var(--text)] mb-6 md:mb-8">
          Case studies
        </h2>

        {studies.length === 0 ? (
          <p className="text-base text-[var(--text-secondary)]">
            Brak case studies.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {studies.map((study) => (
              <CaseStudyCardSmall key={study.slug} study={study} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
