import {
  Brain,
  PenLine,
  Workflow,
  Clapperboard,
  ShoppingBag,
  Stethoscope,
  MapPin,
  Megaphone,
  Camera,
  Newspaper,
  Bot,
  Share2,
  Code2,
  Sparkles,
  Users,
  GraduationCap,
  MessagesSquare,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/app/components/oferta/Reveal";

type Tile = { icon: LucideIcon; title: string; body: string; tags: string[] };

const CORE: Tile[] = [
  {
    icon: Brain,
    title: "Drugi mózg operacyjny",
    body: "Jedna baza wiedzy firmy - cała infrastruktura AI dla ciebie i twojego teamu. Koniec z zarządzaniem rozrzuconym kontekstem po dziesięciu narzędziach. Fundament, który skaluje się razem z tobą. Chcesz poważnie wejść w AI? Zacznij tutaj.",
    tags: ["Infrastruktura AI", "Jeden kontekst", "Skaluje z teamem"],
  },
  {
    icon: PenLine,
    title: "System contentowy",
    body: "Analizuje twoje dane i metryki contentu, wyłapuje co realnie działa i trendy twojej niszy, i podpowiada co publikować, żeby generować zasięg. Ten sam system u mnie dowiózł 10M+ wyświetleń.",
    tags: ["Analiza metryk", "Trendy niszy", "Więcej zasięgu"],
  },
  {
    icon: Workflow,
    title: "Automatyzacja procesów",
    body: "Mapuję twój realny proces, powtarzalne kroki idą do automatów, a człowiek zostaje przy koniecznych decyzjach.",
    tags: ["Mapa procesu", "Automaty", "Human-in-the-loop"],
  },
  {
    icon: Clapperboard,
    title: "Film i kreacja AI",
    body: "Brand filmy, wizuale i kampanie z AI. Szybkość 10-osobowej agencji, kreacja, która nie wygląda jak generyczne AI. Budujesz i rozwijasz markę bez czekania.",
    tags: ["Brand film", "Wizuale AI", "Kierunek kreatywny"],
  },
];

const INDUSTRIES: Tile[] = [
  {
    icon: ShoppingBag,
    title: "E-commerce",
    body: "Silniki rekomendacji, automatyczne flow mailowe, prognozy stanów i obsługa klienta w twoim głosie. Zbudowane na twoich mailach, DM-ach i recenzjach.",
    tags: ["Automatyzacja maili", "Voice of customer", "Boty obsługi"],
  },
  {
    icon: Stethoscope,
    title: "Opieka zdrowotna i gabinety",
    body: "Systemy pozyskiwania pacjentów, automatyzacja rejestracji i follow-upów, optymalizacja reklam. AI odciąża recepcję, nie zastępuje kontaktu.",
    tags: ["Pozyskiwanie pacjentów", "Automatyzacja rejestracji", "Follow-upy"],
  },
  {
    icon: MapPin,
    title: "Usługi lokalne",
    body: "Generowanie leadów i automatyzacja rezerwacji dla firm usługowych, sprzątających, wykończeniowych. Systemy, które zapełniają kalendarz na autopilocie.",
    tags: ["Lead-gen", "Automatyzacja rezerwacji", "Zarządzanie opiniami"],
  },
  {
    icon: Megaphone,
    title: "Agencje marketingowe",
    body: "Cały stack wzrostu agencji: cold mailing, onboarding klienta, dashboardy raportowe AI. Odzyskujesz godziny, które idą na powtarzalną robotę.",
    tags: ["Cold mailing", "Onboarding klienta", "Raporty AI"],
  },
  {
    icon: Camera,
    title: "Agencje fotograficzne",
    body: "Automatyzacja grafiku sesji, portale do wydawania materiału klientom, kuracja galerii AI. Plus outbound, który dowozi kontrakty.",
    tags: ["Grafik sesji", "Portale klienta", "Outbound"],
  },
  {
    icon: Newspaper,
    title: "Content i media",
    body: "Platformy do generacji treści w twoim głosie, automatyzacja workflow redakcyjnego, zarządzanie autorami. Skalujesz produkcję bez skalowania zespołu.",
    tags: ["Generacja treści", "Workflow redakcyjny", "Zarządzanie autorami"],
  },
  {
    icon: Bot,
    title: "Agencje AI i automatyzacji",
    body: "White-label systemy AI i infrastruktura pod delivery. Buduję backend, który inne agencje wdrażają pod własną marką.",
    tags: ["White-label AI", "Infrastruktura delivery", "Automaty do odsprzedaży"],
  },
  {
    icon: Share2,
    title: "LinkedIn i social media",
    body: "Sekwencje outreachu, ghostwriting AI dla profili zarządu w ich głosie, scraping social proof. Systemy, które budują publikę od zera.",
    tags: ["Automatyzacja outreachu", "Ghostwriting AI", "Wzrost publiki"],
  },
  {
    icon: Code2,
    title: "Software i SaaS",
    body: "Automatyzacja product-led growth, onboarding AI, modele predykcji churnu, automatyczny support. Systemy aktywacji i retencji w skali.",
    tags: ["PLG automation", "Predykcja churnu", "Onboarding AI"],
  },
  {
    icon: Sparkles,
    title: "Hotelarstwo i luxury",
    body: "Automatyzacja concierge, zarządzanie klientem VIP i systemy rezerwacji dla premium doświadczeń i marek z górnej półki.",
    tags: ["Concierge AI", "Obsługa VIP", "Automatyzacja rezerwacji"],
  },
  {
    icon: Users,
    title: "HR i rekrutacja",
    body: "Screening CV przez AI, automatyczny outreach do kandydatów, pipeline umawiania rozmów, scoring talentów. Skracasz rekrutację o tygodnie.",
    tags: ["Screening CV", "Outreach kandydatów", "Lejki rekrutacyjne"],
  },
  {
    icon: GraduationCap,
    title: "Infoprodukty",
    body: "Platformy kursowe, społeczności członkowskie, lejki produktów cyfrowych i systemy zaangażowania w skali.",
    tags: ["Platformy kursowe", "Automatyzacja membershipu", "Zaangażowanie"],
  },
  {
    icon: MessagesSquare,
    title: "Coaching i konsulting",
    body: "Lejki pozyskiwania klientów, automatyzacja umawiania sesji, sekwencje follow-up AI, zarządzanie społecznością.",
    tags: ["Pozyskiwanie klientów", "Automatyzacja sesji", "Zarządzanie społecznością"],
  },
];

function TileCard({ tile, accent }: { tile: Tile; accent?: boolean }) {
  const Icon = tile.icon;
  return (
    <div
      className={
        accent
          ? "flex h-full flex-col rounded-2xl border border-[var(--accent)]/25 bg-[color-mix(in_srgb,var(--accent)_5%,transparent)] p-6 transition-colors hover:border-[var(--accent)]/45"
          : "flex h-full flex-col rounded-2xl border border-[var(--border)] bg-[var(--bg-card)] p-6 transition-colors hover:border-[var(--accent)]/35"
      }
    >
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-[var(--accent)]">
        <Icon size={22} strokeWidth={1.9} />
      </span>
      <h3 className="mt-5 text-[19px] font-semibold text-[var(--text)]">{tile.title}</h3>
      <p className="mt-2.5 flex-1 text-[14.5px] leading-relaxed text-[var(--text-secondary)]">{tile.body}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {tile.tags.map((t) => (
          <span
            key={t}
            className="rounded-full border border-[var(--border)] px-2.5 py-1 text-[12px] font-medium text-[var(--text-secondary)]"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function VerticalsGrid() {
  return (
    <section className="container-wide py-16 sm:py-24">
      <Reveal>
        <h2
          className="max-w-[16ch] font-semibold text-[var(--text)]"
          style={{ fontSize: "clamp(1.9rem, 3.8vw, 3rem)", lineHeight: 1.05, letterSpacing: "-0.03em" }}
        >
          Gdzie wdrażam AI.
        </h2>
        <p className="mt-4 max-w-[52ch] text-[16px] leading-relaxed text-[var(--text-secondary)]">
          Cztery rzeczy, które robię najlepiej, i branże, w których te systemy realnie ruszają igłę.
        </p>
      </Reveal>

      {/* Rdzen - wyrozniony akcentem */}
      <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {CORE.map((tile, i) => (
          <Reveal key={tile.title} delay={0.05 * i} className="flex">
            <TileCard tile={tile} accent />
          </Reveal>
        ))}
      </div>

      {/* Branze */}
      <div className="mt-14 border-t border-[var(--border)] pt-12">
        <h3 className="text-[15px] font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]">
          Dla twojej branży
        </h3>
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((tile, i) => (
            <Reveal key={tile.title} delay={0.04 * (i % 3)} className="flex">
              <TileCard tile={tile} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
