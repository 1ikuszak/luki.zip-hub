import { Reveal } from "@/app/components/oferta/Reveal";

const PAINS = [
  "Próbowałeś zbudować drugi mózg już kilka razy. Za każdym razem porzucałeś go na utrzymaniu.",
  "Masz setki notatek i nie korzystasz z żadnej. Wiesz, że gdzieś tam jest odpowiedź, ale szybciej wygooglujesz.",
  "Każdy tydzień zaczynasz z pustą głową. Wiedza, którą zebrałeś miesiąc temu, nie pracuje dla ciebie.",
  "Pytasz AI o post i dostajesz generyczny tekst, który mógł napisać każdy. Bo model nie zna ciebie.",
  "Wiesz, że Claude Code to twoja droga, ale terminal cię blokuje. Czekasz, aż ktoś poprowadzi cię od instalacji.",
  "Twoja wiedza jest twoją przewagą. A leży w folderze, do którego nie zaglądasz.",
];

export function PainPoints() {
  return (
    <section className="container-wide py-20 sm:py-28">
      <Reveal>
        <h2 className="t-h2 max-w-[640px]">Brzmi znajomo?</h2>
      </Reveal>

      <div className="mt-10 grid gap-x-12 gap-y-0 md:grid-cols-2">
        {PAINS.map((pain, i) => (
          <Reveal key={pain} delay={(i % 2) * 0.05}>
            <div className="border-t border-[var(--border)] py-6">
              <p className="t-body text-[var(--text)]">{pain}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
