import type { CaseStudyStep } from "@/app/lib/case-studies";

type Props = {
  steps: readonly CaseStudyStep[];
};

export function StepsSection({ steps }: Props) {
  return (
    <section className="container-default py-14 sm:py-20">
      <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
        Co zrobiłem
      </div>

      <ol className="mt-8 sm:mt-10">
        {steps.map((step, idx) => {
          const number = String(idx + 1).padStart(2, "0");
          return (
            <li
              key={idx}
              className="reveal grid grid-cols-1 gap-3 border-t border-[var(--border)] py-8 first:border-t-0 first:pt-0 sm:grid-cols-[88px_1fr] sm:gap-8 sm:py-10"
            >
              <div
                className="text-3xl font-semibold leading-none tracking-tight text-[var(--accent)] sm:text-4xl"
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {number}
              </div>
              <div>
                <h3 className="t-h3">{step.title}</h3>
                <p className="t-body mt-3 max-w-[62ch] text-[var(--text-secondary)]">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
