import Link from "next/link";
import { ArrowRight } from "lucide-react";

type Experiment = {
  id: string;
  title: string;
  tool: string;
};

const EXPERIMENTS: Experiment[] = [
  { id: "exp-1", title: "Brand world",      tool: "Midjourney v7" },
  { id: "exp-2", title: "Product motion",   tool: "Veo 3" },
  { id: "exp-3", title: "Launch teaser",    tool: "Kling 3.0" },
  { id: "exp-4", title: "Editorial spread", tool: "Flux" },
  { id: "exp-5", title: "Motion identity",  tool: "Runway" },
  { id: "exp-6", title: "AI campaign",      tool: "Midjourney v7" },
];

export function AIExperimentsSection() {
  return (
    <section id="ai-experiments" className="scroll-mt-20">
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 pb-16 md:pb-20">
        {/* Header row: tytuł po lewej, CTA po prawej */}
        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-[var(--text)]">
            Eksperymenty
          </h2>
          <Link
            href="/artykuly"
            data-track="cta_home_experiments"
            data-track-id="cta_home_experiments_poradniki"
            data-track-href="/artykuly"
            className="inline-flex items-center gap-1.5 text-sm md:text-base font-semibold text-[var(--accent)]"
          >
            Dowiedz się jak to zrobić
            <ArrowRight size={16} strokeWidth={2.25} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {EXPERIMENTS.map((exp) => (
            <figure
              key={exp.id}
              className="relative aspect-square rounded-lg overflow-hidden bg-white border border-[var(--border)]"
            >
              <figcaption className="absolute inset-x-0 bottom-0 p-4">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-semibold text-[var(--text)]">
                    {exp.title}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">
                    {exp.tool}
                  </span>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
