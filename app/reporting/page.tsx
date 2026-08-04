import type { Metadata } from "next";

import { GradientBackdrop } from "@/app/components/GradientBackdrop";
import { Breadcrumb } from "@/app/components/Breadcrumb";

// Nazwa MUSI zgadzac sie co do znaku z nazwa aplikacji na ekranie zgody OAuth.
// Weryfikacja marki Google porownuje jedno z drugim automatycznie i odbija,
// gdy sie roznia (odbite 2026-08-04 na nazwie "Łukasz Glica").
const APP_NAME = "luki.zip Reporting";

const pageTitle = `${APP_NAME} | luki.zip`;
const pageDescription =
  "Wewnętrzne narzędzie raportowe: łączy koszt reklam z danymi sprzedaży i zwrotów, żeby policzyć przychód po zwrotach.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/reporting" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/reporting",
    type: "website",
  },
};

export default function ReportingPage() {
  return (
    <div className="relative">
      <GradientBackdrop />

      <main className="relative z-10">
        <section className="bg-white px-2 sm:px-3 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <header className="px-1 sm:px-2 max-w-[680px]">
            <Breadcrumb items={[{ label: APP_NAME }]} />
            <h1 className="t-h1 mt-6">{APP_NAME}</h1>
            <p className="mt-5 text-[17px] leading-relaxed text-black/70">
              Wewnętrzne narzędzie raportowe, którego używam w projektach
              wdrożeniowych dla klientów e-commerce. Nie jest publicznym
              produktem, nie ma rejestracji i nie jest sprzedawane.
            </p>
          </header>

          <div className="mt-12 px-1 sm:px-2 max-w-[680px] space-y-10 text-[15px] leading-relaxed text-black/80">
            <section className="space-y-3">
              <h2 className="t-h3 text-black">Co robi</h2>
              <p>
                W sklepach odzieżowych duża część zamówień wraca. Zwrot domyka
                się zwykle od 14 do 28 dni po zakupie, więc żadna platforma
                reklamowa go nie widzi - raportuje sprzedaż, która za trzy
                tygodnie częściowo przestanie istnieć.
              </p>
              <p>
                To narzędzie pobiera dzienny koszt reklam i zestawia go z
                zamówieniami oraz zwrotami ze sklepu. Liczy trzy rzeczy, których
                nie da się odczytać z żadnego pojedynczego panelu:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>przychód po zwrotach, liczony po kohorcie zamówienia</li>
                <li>procent zwrotów, osobno dla każdego produktu</li>
                <li>efektywność reklamy po zwrotach</li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="t-h3 text-black">Skąd bierze dane</h2>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <span className="text-black">Google Ads API</span> - wyłącznie
                  dzienny koszt. Tylko odczyt, jedno zapytanie dziennie, zero
                  operacji zapisu. Nie zarządza kampaniami, budżetami ani
                  stawkami.
                </li>
                <li>
                  <span className="text-black">Meta Ads API</span> - wyłącznie
                  dzienny koszt, tylko odczyt.
                </li>
                <li>
                  <span className="text-black">Shopify Admin API</span> -
                  zamówienia, zwroty i koszt towaru.
                </li>
                <li>
                  <span className="text-black">Google Analytics Data API</span>{" "}
                  - ruch i zachowanie na stronie, nigdy przychód.
                </li>
              </ul>
              <p>
                Dane pobierane są wyłącznie z kont klientów, którzy jawnie
                nadali dostęp, i wyłącznie na ich własne potrzeby. Narzędzie nie
                czyta żadnych danych osobowych z API reklamowych.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="t-h3 text-black">Kto ma dostęp</h2>
              <p>
                Wyłącznie ja oraz osoby po stronie klienta, dla którego dana
                instancja została uruchomiona. Narzędzie nie ma logowania,
                publicznego adresu ani wersji wielofirmowej. Uruchomienie go dla
                kolejnego klienta wymaga osobnego wdrożenia na jego własnych
                kluczach.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="t-h3 text-black">Dane i prywatność</h2>
              <p>
                Zasady przetwarzania danych opisuje{" "}
                <a
                  className="underline underline-offset-2"
                  href="/polityka-prywatnosci"
                >
                  polityka prywatności
                </a>
                . Klucze dostępu trzymane są lokalnie i nigdy nie trafiają do
                repozytorium. Dostęp nadany przez klienta może zostać przez
                niego cofnięty w każdej chwili.
              </p>
              <p>
                Kontakt:{" "}
                <a
                  className="underline underline-offset-2"
                  href="mailto:lukasz.glica07@gmail.com"
                >
                  lukasz.glica07@gmail.com
                </a>
              </p>
            </section>

            <section className="space-y-3 border-t border-black/10 pt-8">
              <h2 className="t-h3 text-black">In English</h2>
              <p>
                <span className="text-black">{APP_NAME}</span> is an internal
                reporting tool used in ecommerce consulting engagements. It
                reads daily advertising cost from the Google Ads API and Meta
                Ads API, and combines it with order and refund data from the
                client&apos;s ecommerce platform to calculate revenue after
                returns, return rate per product, and marketing efficiency after
                returns.
              </p>
              <p>
                Read-only. One request per day. No mutate operations, no
                campaign management, no bidding, no remarketing. Data is read
                only from accounts whose owners have explicitly granted access,
                and is used solely for reporting back to those owners. The tool
                is not published, sold or offered to the general public.
              </p>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
