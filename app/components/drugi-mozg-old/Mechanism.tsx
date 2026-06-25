import { ArrowRight } from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";

const LAYERS = [
  {
    term: "PARA",
    desc: "strukturyzuje, gdzie co leży.",
  },
  {
    term: "MOC",
    desc: "nawiguje, żeby agent znajdował kontekst w sekundę.",
  },
  {
    term: "Agenci",
    desc: "utrzymują i produkują, w tygodniowej pętli, której nie dotykasz.",
  },
];

const CONTRASTS = [
  { from: "pamięta", to: "produkuje" },
  { from: "biblioteka", to: "system operacyjny" },
  { from: "ty utrzymujesz", to: "agent utrzymuje" },
];

export function Mechanism() {
  return (
    <section className="container-wide py-20 sm:py-28">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <Reveal>
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[var(--accent)]">
              Mechanizm
            </div>
            <h2 className="t-h2 mt-3">
              Większość ludzi buduje bibliotekę. Ty zbudujesz Żywy Vault.
            </h2>
            <p className="t-body mt-5 text-[var(--text-secondary)]">
              Biblioteka leży i czeka, aż sam ją przekopiesz. Żywy Vault z tej
              samej wiedzy coś robi.
            </p>
            <p className="t-body mt-4 text-[var(--text-secondary)]">
              Różnica jest w jednej pętli, którą wszyscy pomijają: utrzymaniu.
              Większość zaczyna od surowego zbioru plików i pielęgnuje go
              ręcznie, aż się poddaje.
            </p>

            <div className="mt-8 space-y-3">
              {CONTRASTS.map((c) => (
                <div
                  key={c.from}
                  className="flex items-center gap-3 text-[15px]"
                >
                  <span className="text-[var(--text-secondary)] line-through decoration-[var(--text-secondary)]/40">
                    {c.from}
                  </span>
                  <ArrowRight
                    size={16}
                    strokeWidth={2.5}
                    className="shrink-0 text-[var(--accent)]"
                  />
                  <span className="font-semibold text-[var(--text)]">
                    {c.to}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-[var(--border)] bg-white p-7 sm:p-9">
            <p className="t-body font-medium text-[var(--text)]">
              Żywy Vault działa na trzech warstwach. Ty kurujesz i decydujesz.
              Resztę robi system.
            </p>
            <div className="mt-7 divide-y divide-[var(--border)]">
              {LAYERS.map((layer) => (
                <div key={layer.term} className="flex gap-4 py-5 first:pt-0">
                  <span className="t-h3 shrink-0 text-[var(--accent)]">
                    {layer.term}
                  </span>
                  <span className="t-body self-center text-[var(--text-secondary)]">
                    {layer.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
