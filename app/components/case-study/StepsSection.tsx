import Image from "next/image";
import type { CaseStudyStep } from "@/app/lib/case-studies";

type Props = {
  steps: readonly CaseStudyStep[];
};

export function StepsSection({ steps }: Props) {
  return (
    <section className="container-wide py-16 sm:py-24">
      <div className="text-[11px] uppercase tracking-[0.12em] text-[var(--accent)] font-semibold">
        Co zrobiłem
      </div>
      <h2 className="t-h2 mt-3">Trzy kroki, krok po kroku</h2>

      <ol className="mt-12 sm:mt-16 flex flex-col gap-16 sm:gap-24">
        {steps.map((step, idx) => {
          const reversed = idx % 2 === 1;
          const number = String(idx + 1).padStart(2, "0");
          return (
            <li
              key={idx}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center"
            >
              <div className={reversed ? "md:order-2" : ""}>
                <div
                  className="text-5xl sm:text-6xl font-semibold text-[var(--accent)] tracking-tight"
                  style={{ fontVariantNumeric: "tabular-nums" }}
                >
                  {number}
                </div>
                <h3 className="t-h3 mt-4">{step.title}</h3>
                <p className="t-body mt-4 text-[var(--text-secondary)]">
                  {step.description}
                </p>
              </div>
              <div
                className={
                  "relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-white " +
                  (reversed ? "md:order-1" : "")
                }
              >
                <Image
                  src={step.image}
                  alt={step.imageAlt}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
