import { Reveal } from "@/app/components/oferta/Reveal";

export function Problem() {
  return (
    <section className="container-narrow py-20 sm:py-28">
      <Reveal>
        <h2 className="t-h2">
          Twój drugi mózg nie umiera, bo jest źle zbudowany. Umiera, bo TY
          musisz go utrzymywać.
        </h2>

        <div className="mt-8 flex flex-col gap-5 text-[var(--text-secondary)]">
          <p className="t-body">
            Znasz to. Zaczyna się prosto. Potem kombinujesz. Dodajesz folder,
            potem drugi, potem plugin. Po dwóch tygodniach więcej czasu schodzi
            na porządkowanie niż na robotę.
          </p>
          <p className="t-body">
            Zbieranie zaczyna się mylić z rozumieniem. Masz 400 notatek i nie
            pamiętasz, co jest w połowie z nich.
          </p>
          <p className="t-body">
            To nie twój brak dyscypliny. To koszt utrzymania, który rośnie
            szybciej niż wartość. Każdy ręczny system tak kończy. Consistent
            Apple Notes pobije porzucony Obsidian za każdym razem.
          </p>
          <p className="t-body">
            Im więcej w nim wiedzy, tym więcej czasu zjada samo utrzymanie. Aż
            przestaje się opłacać i go zostawiasz. Agentowi to nie ciąży. Nie
            nudzi się przy 15 plikach i nie odpuszcza po dwóch tygodniach.
          </p>
        </div>

        <p className="t-body-large mt-8 font-medium text-[var(--text)]">
          Więc przestań utrzymywać drugi mózg ręcznie. Oddaj tę robotę agentowi
          i zajmij się tym, po co go w ogóle budujesz.
        </p>
      </Reveal>
    </section>
  );
}
