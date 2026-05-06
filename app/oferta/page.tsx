import type { Metadata } from "next";
import { Calendar, Check } from "lucide-react";
import { CALENDLY_URL } from "@/app/lib/data";

const pageTitle = "Oferta | luki.zip";
const pageDescription =
  "Brand DNA i Launch Video dla AI startupów. Pozycjonowanie, identyfikacja i video, które nie usypia.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/oferta" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/oferta",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

type Tier = {
  id: string;
  name: string;
  price: string;
  hook: string;
  audience: string;
  bullets: string[];
  effect: string;
  timing?: string;
  featured?: boolean;
};

const TIERS: Tier[] = [
  {
    id: "brand-stylist",
    name: "Brand Stylist",
    price: "6 000 zł",
    hook: "Przestajesz wyglądać jak „kolejny AI tool”.",
    audience:
      "Dla pre-seed/seed, które mają produkt, ale giną w tłumie.",
    bullets: [
      "Pozycjonowanie — 1 zdanie dla VC i 1 dla usera",
      "Identyfikacja — logo, kolory, typografia (pliki dla deva)",
      "System — brand book + biblioteka promptów + voice guide (maile, posty, decki)",
    ],
    effect: "Efekt: inwestor rozumie w 10 sekund. User pamięta po 1 scrollu.",
  },
  {
    id: "launch-video",
    name: "Launch Video",
    price: "8 000 zł",
    hook: "Video na start, które opowiada o Twoim produkcie tak, że ludzie oglądają do końca.",
    audience: "Video, które sprzedaje, nie tylko wygląda.",
    bullets: [
      "Strategia pod Twojego odbiorcę",
      "Skrypt z mocnym otwarciem",
      "Nagranie i montaż",
    ],
    effect: "Po 21 dniach masz asset, który sprzedaje zamiast Ciebie.",
    featured: true,
  },
  {
    id: "creative-partner",
    name: "Creative Partner",
    price: "od 9 000 zł/mies",
    hook: "Twój zespół kreatywny bez etatu. Pauzujesz kiedy chcesz.",
    audience:
      "Dla brandów, które rosną za szybko na freelancerów, za wolno na agencję.",
    bullets: [
      "Stały zespół zamiast 5 freelancerów: brand, product design, video, web",
      "Bezpośrednia komunikacja w 24h",
      "Pauza w każdej chwili",
    ],
    effect: "Po 30 dniach: 1 partner, nie 5 wątków w Slacku.",
  },
];

export default function OfertaPage() {
  return (
    <main className="container-wide py-12 sm:py-20">
      <div className="flex flex-col gap-16 sm:gap-24">
        {/* Header */}
        <header className="flex flex-col gap-4">
          <h1 className="t-h1">Oferta</h1>
        </header>

        {/* Pakiety */}
        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {TIERS.map((tier) => {
              const isFeatured = tier.featured;
              const muted = isFeatured ? "text-white/60" : "text-[var(--text-secondary)]";
              const text = isFeatured ? "text-white" : "text-[var(--text)]";
              const divider = isFeatured ? "border-white/15" : "border-[var(--border)]";

              const checkColor = isFeatured ? "text-white" : "text-[var(--accent)]";
              return (
                <div
                  key={tier.id}
                  className={`relative rounded-xl p-6 flex flex-col ${
                    isFeatured
                      ? "bg-[var(--accent)] text-white border border-[var(--accent)]"
                      : "bg-white border border-[var(--border)]"
                  }`}
                >
                  <div className={`text-[11px] font-semibold tracking-[0.12em] uppercase ${muted}`}>
                    {tier.name}
                  </div>

                  <div
                    className={`mt-3 text-[32px] font-semibold leading-none ${text}`}
                    style={{ fontVariantNumeric: "tabular-nums" }}
                  >
                    {tier.price}
                  </div>

                  <p className={`text-[15px] mt-3 leading-snug font-semibold ${text}`}>
                    {tier.hook}
                  </p>

                  <p className={`text-[13px] mt-2 leading-relaxed ${muted}`}>
                    {tier.audience}
                  </p>

                  <div className={`border-t ${divider} my-5`} />

                  <ul className="flex flex-col gap-2.5 grow">
                    {tier.bullets.map((b) => (
                      <li
                        key={b}
                        className={`flex items-start gap-2.5 text-[14px] leading-snug ${text}`}
                      >
                        <Check
                          size={16}
                          strokeWidth={2.5}
                          className={`mt-0.5 shrink-0 ${checkColor}`}
                        />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className={`border-t ${divider} my-5`} />

                  <p className={`text-[13px] leading-relaxed ${text}`}>
                    {tier.effect}
                  </p>
                  {tier.timing && (
                    <p className={`text-[13px] mt-1 leading-relaxed ${muted}`}>
                      {tier.timing}
                    </p>
                  )}

                  <a
                    href="#formularz"
                    data-track="cta_oferta_card"
                    data-track-id={`cta_oferta_${tier.id}`}
                    data-track-href="#formularz"
                    className={`mt-7 inline-flex items-center self-start text-[13px] underline underline-offset-4 hover:no-underline transition-opacity ${
                      isFeatured ? "text-white/80 hover:text-white" : "text-[var(--text-secondary)] hover:text-[var(--text)]"
                    }`}
                  >
                    pasuje? → sprawdźmy fit
                  </a>
                </div>
              );
            })}
          </div>

          <div className="mt-12 sm:mt-16 flex flex-col items-center text-center gap-4">
            <a
              href="#formularz"
              data-track="cta_oferta_main"
              data-track-id="cta_oferta_main"
              data-track-href="#formularz"
              className="inline-flex items-center justify-center gap-2 h-[60px] rounded-lg bg-[var(--accent)] px-8 font-semibold text-[17px] text-white hover:bg-[var(--accent-light)] transition-colors"
            >
              <Calendar size={18} strokeWidth={2.25} />
              Sprawdźmy fit, 15 min
            </a>
          </div>
        </section>

        {/* O mnie */}
        <section>
          <h2 className="t-h2">O mnie</h2>
          <div className="flex flex-col sm:flex-row gap-6 items-start mt-8">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br from-[var(--accent)] to-[var(--accent-light)] flex items-center justify-center shrink-0">
              <span className="text-white font-semibold text-[28px] sm:text-[30px] tracking-wider">
                LZ
              </span>
            </div>
            <div className="flex flex-col gap-4 t-body text-[var(--text)] max-w-[640px]">
              <p>
                <strong>Łukasz Glica.</strong> Creative Director dla AI tech startupów.
              </p>
              <p>
                Robię tak, żeby Wasza marka wyglądała cool i nie zginęła w slopie.
              </p>
              <p>
                Aktualnie kreatywny partner DFIRST. Pracuję z tech startupami w PL, EU, USA. Wcześniej creative partner JBB Bałdyga, PetitePants.
              </p>
              <p>
                Rozumiem internet. Zgromadziłem 8 tysięcy subskrypcji na YouTube w parę miesięcy od zera. 100 tysięcy zasięgu na Instagramie miesięcznie. Buduję swoją markę i wiem, jak zbudować coś, co rezonuje i sprzedaje.
              </p>
              <p className="text-[var(--text-secondary)]">
                Bez agencyjnych warstw. Bez juniorów. Bez korpo umów.
              </p>
            </div>
          </div>
        </section>

        {/* Formularz */}
        <section id="formularz" className="scroll-mt-24">
          <h2 className="t-h2">Formularz, sprawdźmy fit</h2>
          <div className="mt-6 bg-white rounded-xl border border-[var(--border)] overflow-hidden">
            <iframe
              src={CALENDLY_URL}
              className="w-full h-[700px] border-0 block"
              title="Wyślij brief"
              loading="lazy"
            />
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] mt-4 text-center">
            Problem z formularzem?{" "}
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 text-[var(--accent)] hover:no-underline"
            >
              Wyślij brief w nowej karcie
            </a>
          </p>
        </section>
      </div>
    </main>
  );
}
