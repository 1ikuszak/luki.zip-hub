import { Reveal } from "@/app/components/oferta/Reveal";

const LESSONS = [
  {
    day: "Dzień 1",
    title: "Od zera do działającego vaulta",
    body: "Stawiasz fundament: PARA, Obsidian, Claude Code. Pod koniec dnia agent gada z twoją wiedzą, nawet jeśli nigdy nie dotknąłeś terminala. Prowadzę od pierwszej komendy.",
  },
  {
    day: "Dzień 2",
    title: "Wiedza wpada sama",
    body: "Wrzucasz artykuł, wideo albo luźną myśl. Agent rozkłada to na notatki, linkuje i odkłada na miejsce. Capture przestaje być robotą, więc system przeżywa pierwszy tydzień.",
  },
  {
    day: "Dzień 3",
    title: "System, który się nie sypie",
    body: "To serce kursu. Agent raz w tygodniu sam robi przegląd: lint, porządki, aktualizacja linków, archiwum. To jest ta pętla, którą wszyscy pomijają i dlatego ich systemy umierają. U ciebie robi ją agent.",
  },
  {
    day: "Dzień 4",
    title: "Wiedza zaczyna produkować",
    body: "Stawiasz trzy skille: ingest, query, weekly-maintenance. Pytasz i dostajesz odpowiedź z TWOJEJ wiedzy, nie z pustego modelu. Generujesz posty i briefy w swoim głosie, których nikt inny nie wyprodukuje, bo nie ma twojego vaulta.",
  },
  {
    day: "Dzień 5",
    title: "Skalujesz, kiedy chcesz",
    body: "Uczysz się, kiedy odejmować, a nie tylko dobudowywać. I jak rozciągnąć ten sam system z solo na zespół 2-15 osób przez git, gdy przyjdzie czas. Wychodzisz z planem na 90 dni.",
  },
];

export function Lessons() {
  return (
    <section id="program" className="container-wide py-20 sm:py-28">
      <Reveal>
        <h2 className="t-h2 max-w-[720px]">
          Pięć dni. Pięć lekcji. Pod koniec masz działający system, nie notatki
          o systemie.
        </h2>
      </Reveal>

      <div className="mt-12 divide-y divide-[var(--border)] border-t border-[var(--border)]">
        {LESSONS.map((lesson, i) => (
          <Reveal key={lesson.day} delay={Math.min(i * 0.04, 0.16)}>
            <div className="grid gap-3 py-7 md:grid-cols-[200px_1fr] md:gap-10">
              <div>
                <div className="t-small font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
                  {lesson.day}
                </div>
                <div className="t-h3 mt-1">{lesson.title}</div>
              </div>
              <p className="t-body self-center text-[var(--text-secondary)]">
                {lesson.body}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="mt-10 rounded-2xl bg-[var(--accent)]/[0.06] p-7 sm:p-9">
          <div className="t-small font-semibold uppercase tracking-[0.1em] text-[var(--accent)]">
            Bonus
          </div>
          <p className="t-body-large mt-3 max-w-[70ch] text-[var(--text)]">
            Dostajesz gotowce: template CLAUDE.md (PARA-native), trzy skille,
            strukturę PARA z przykładowymi MOC i checklistę zero do działającego
            systemu. Kopiujesz, podmieniasz pod siebie, jedziesz.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
