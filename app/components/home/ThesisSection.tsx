import Link from "next/link";
import { ArrowRight } from "lucide-react";

type VariantId = "A" | "B" | "C" | "D";

const ACTIVE_VARIANT: VariantId = "D";

type Variant = {
  id: VariantId;
  title: string;
  paragraphs: string[];
};

const THESIS_VARIANTS: Variant[] = [
  {
    id: "D",
    title: "Brand to wszystko",
    paragraphs: [
      "Każdy ma teraz dostęp do tych samych narzędzi. Większość używa ich tak samo. Jedyne co Cię realnie odróżnia to brand.",
      "A brand to nie logo. To jak wyglądasz, brzmisz i jak ludzie się czują kiedy z Tobą wchodzą w kontakt. Strona, video, content, sposób w jaki mówisz o tym co robisz.",
      "Z jednej strony nie chcesz wydać 100 tysięcy agencji, która dowozi miesiącami.",
      "Z drugiej nie chcesz iść we freelancera z Fiverra za 500 zł. Słaby brand widzą wszyscy: klienci, inwestorzy, ludzie których chcesz zatrudnić.",
      "Pracuję z founderami i twórcami którzy chcą budować brand szybko i za ułamek tego co biorą duże agencje. Design, video, strategia contentowa. Wszystko w jednym miejscu, z jedną głową która rozumie całość.",
      "Specjalizuję się w AI i tech startupach. Pracuję też z e-commerce i twórcami którzy traktują markę poważnie.",
    ],
  },
  {
    id: "A",
    title: "Anti-slop",
    paragraphs: [
      "Internet zalewa AI slop. Każdy startup wygląda tak samo: ten sam gradient, ten sam Inter, ten sam DALL-E hero.",
      "Robię marki, które wyglądają jak coś, a nie jak prompt.",
      "Pozycjonowanie, identyfikacja i video, które sprawiają, że inwestor pamięta Cię po pitchu, a user po pierwszym scrollu.",
    ],
  },
  {
    id: "B",
    title: "Bez agencyjnych warstw",
    paragraphs: [
      "Agencyjny model nie pasuje do tempa AI startupów. 3 miesiące na logo, 6 na launch video, do tego juniory i korpo umowy.",
      "Pracuję bezpośrednio: jeden creative partner, decyzje w 24h, deliverables w 21 dni.",
      "Brand jako system, nie projekt. Pauzujesz kiedy chcesz, wracasz kiedy potrzebujesz.",
    ],
  },
  {
    id: "C",
    title: "Brand = produkt",
    paragraphs: [
      "Brand i produkt to to samo.",
      "Pozycjonowanie wpływa na onboarding, ton voice'a na copy w UI, identyfikacja na to, czy inwestor pamięta Cię po pitchu.",
      "Nie projektuję logotypu — projektuję powód, dla którego ktoś klika.",
    ],
  },
];

export function ThesisSection() {
  const variant =
    THESIS_VARIANTS.find((v) => v.id === ACTIVE_VARIANT) ?? THESIS_VARIANTS[0];

  return (
    <section
      id="thesis"
      className="border-t border-[var(--border)] scroll-mt-20"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 py-20 md:py-28">
        <div className="flex flex-col items-center text-center">
          <div className="text-xs uppercase tracking-uppercase font-semibold text-[var(--text-secondary)]">
            Brand Thesis
          </div>

          <h2
            className="mt-5 md:mt-6 font-semibold text-[var(--text)] max-w-4xl text-balance"
            style={{
              fontSize: "clamp(40px, 8vw, 96px)",
              lineHeight: 1.02,
              letterSpacing: "-0.04em",
            }}
          >
            {variant.title}
          </h2>

          <div className="mt-10 md:mt-14 max-w-3xl w-full text-left space-y-5">
            {variant.paragraphs.map((p, i) => (
              <p
                key={i}
                className="text-lg md:text-xl text-[var(--text)] text-pretty leading-relaxed"
              >
                {p}
              </p>
            ))}
          </div>

          <Link
            href="/oferta#formularz"
            data-track="cta_home_thesis"
            data-track-id="cta_home_thesis_inquire"
            data-track-href="/oferta#formularz"
            className="mt-12 md:mt-16 inline-flex items-center gap-3 h-16 sm:h-[72px] pl-7 sm:pl-9 pr-2.5 sm:pr-3 rounded-full bg-[var(--chartreuse)] text-[var(--text)] text-lg sm:text-xl font-semibold"
          >
            Pracujmy razem
            <span className="inline-flex h-11 sm:h-12 w-11 sm:w-12 items-center justify-center rounded-full bg-[var(--text)] text-[var(--chartreuse)]">
              <ArrowRight size={22} strokeWidth={2.25} />
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
