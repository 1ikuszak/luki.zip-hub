import { Reveal } from "@/app/components/oferta/Reveal";

/** FAQ (Koe 13): objection handling. Native <details> accordion. */
const FAQ_ITEMS: { q: string; a: string }[] = [
  {
    q: "Czy to nie jest po prostu „AI generuje content”?",
    a: "Nie. AI generuje to samo dla wszystkich. Ja koduję w nie twój taste, dlatego output wygląda jak ty, nie jak generyczny slop.",
  },
  {
    q: "Zachowam kontrolę nad swoim stylem?",
    a: "To cały sens. System uczy się ciebie. Im dłużej działa, tym bardziej brzmi jak ty.",
  },
  {
    q: "Robisz pojedynczy montaż albo drobne zlecenia?",
    a: "Nie. Pracuję na systemach i creative-led kierunku, nie na commodity produkcji.",
  },
  {
    q: "Ile to kosztuje?",
    a: "Projekty zaczynają się na poziomie premium. Konkret ustalamy na rozmowie, pod twój zakres.",
  },
  {
    q: "Kiedy kurs?",
    a: "Wkrótce. Zapisz się na listę, żeby wejść pierwszy.",
  },
];

export function FAQ() {
  return (
    <section className="container-default pb-28 pt-12 sm:pb-36">
      <Reveal>
        <h2
          className="font-semibold text-[var(--text)]"
          style={{
            fontSize: "clamp(1.75rem, 3.6vw, 2.6rem)",
            lineHeight: 1.06,
            letterSpacing: "-0.025em",
          }}
        >
          Pytania.
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-10 divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {FAQ_ITEMS.map((item) => (
            <details key={item.q} className="group cursor-pointer py-6">
              <summary className="flex items-center justify-between gap-4">
                <span className="text-[17px] font-semibold text-[var(--text)] sm:text-[18px]">
                  {item.q}
                </span>
                <span className="shrink-0 text-2xl leading-none text-[var(--text-secondary)] transition-transform duration-150 group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-4 max-w-[60ch] t-body text-[var(--text-secondary)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
