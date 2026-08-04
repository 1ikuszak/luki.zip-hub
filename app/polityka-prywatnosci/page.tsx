import type { Metadata } from "next";

import { GradientBackdrop } from "@/app/components/GradientBackdrop";
import { Breadcrumb } from "@/app/components/Breadcrumb";

const pageTitle = "Polityka prywatności | luki.zip";
const pageDescription =
  "Jakie dane zbieram, po co, na jakiej podstawie i jak długo je trzymam.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/polityka-prywatnosci" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/polityka-prywatnosci",
    type: "website",
  },
};

const AKTUALIZACJA = "4 sierpnia 2026";

export default function PolitykaPrywatnosciPage() {
  return (
    <div className="relative">
      <GradientBackdrop />

      <main className="relative z-10">
        <section className="bg-white px-2 sm:px-3 pt-16 pb-20 sm:pt-24 sm:pb-28">
          <header className="px-1 sm:px-2 max-w-[640px]">
            <Breadcrumb items={[{ label: "Polityka prywatności" }]} />
            <h1 className="t-h1 mt-6">Polityka prywatności</h1>
            <p className="mt-4 text-sm text-black/50">
              Ostatnia aktualizacja: {AKTUALIZACJA}
            </p>
          </header>

          <div className="mt-12 px-1 sm:px-2 max-w-[680px] space-y-10 text-[15px] leading-relaxed text-black/80">
            <section className="space-y-3">
              <h2 className="t-h3 text-black">Kto przetwarza Twoje dane</h2>
              <p>
                Administratorem danych jest Łukasz Glica, prowadzący
                jednoosobową działalność gospodarczą, NIP 5851511915.
              </p>
              <p>
                Kontakt w sprawie danych:{" "}
                <a
                  className="underline underline-offset-2"
                  href="mailto:lukasz.glica07@gmail.com"
                >
                  lukasz.glica07@gmail.com
                </a>
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="t-h3 text-black">Co zbieram i po co</h2>
              <p>
                Zbieram tylko to, co jest potrzebne, żeby odpisać, dowieźć
                zamówiony produkt albo wysłać newsletter, na który się
                zapisałeś.
              </p>

              <div className="space-y-5">
                <div>
                  <h3 className="font-medium text-black">Kontakt</h3>
                  <p>
                    Imię i adres e-mail oraz treść wiadomości. Podstawą jest
                    mój prawnie uzasadniony interes, czyli udzielenie
                    odpowiedzi. Trzymam do zakończenia rozmowy, a potem do
                    3 lat na wypadek roszczeń.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-black">Newsletter</h3>
                  <p>
                    Adres e-mail, imię, jeśli je podasz, oraz statystyki
                    otwarć i kliknięć. Podstawą jest Twoja zgoda. Trzymam do
                    momentu wypisania się, a wypisać możesz się linkiem w
                    każdej wiadomości.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-black">Zakup kursu</h3>
                  <p>
                    Dane niezbędne do realizacji zamówienia i wystawienia
                    faktury: imię i nazwisko, e-mail, dane do faktury.
                    Podstawą jest wykonanie umowy oraz obowiązek podatkowy.
                    Dane rozliczeniowe trzymam 5 lat, licząc od końca roku
                    podatkowego, bo tego wymagają przepisy.
                  </p>
                  <p className="mt-2">
                    Płatności obsługuje zewnętrzny operator. Nie mam dostępu
                    do numeru Twojej karty ani danych logowania do banku.
                  </p>
                </div>

                <div>
                  <h3 className="font-medium text-black">Statystyki strony</h3>
                  <p>
                    Zanonimizowane dane o ruchu: skąd wszedłeś, które strony
                    oglądałeś, jakiego urządzenia używasz. Podstawą jest
                    prawnie uzasadniony interes, czyli rozwijanie strony.
                    Nie łączę tych danych z Twoim imieniem ani adresem e-mail.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="t-h3 text-black">Komu powierzam dane</h2>
              <p>
                Korzystam z narzędzi zewnętrznych i tylko w takim zakresie, w
                jakim są potrzebne do działania strony:
              </p>
              <ul className="list-disc space-y-1 pl-5">
                <li>
                  <span className="text-black">EasyCart</span> - obsługa
                  zamówień i płatności za produkty cyfrowe
                </li>
                <li>
                  <span className="text-black">beehiiv</span> - wysyłka
                  newslettera i statystyki wysyłek
                </li>
                <li>
                  <span className="text-black">Resend</span> - wysyłka maili
                  systemowych, na przykład potwierdzeń
                </li>
                <li>
                  <span className="text-black">Google Analytics</span> -
                  statystyki ruchu na stronie
                </li>
                <li>
                  <span className="text-black">Vercel</span> - hosting strony
                </li>
              </ul>
              <p>
                Część z tych firm ma siedzibę poza Europejskim Obszarem
                Gospodarczym. Dane przekazywane są im na podstawie standardowych
                klauzul umownych zatwierdzonych przez Komisję Europejską.
              </p>
              <p>Nie sprzedaję Twoich danych i nie przekazuję ich do reklamy.</p>
            </section>

            <section className="space-y-3">
              <h2 className="t-h3 text-black">Pliki cookie</h2>
              <p>
                Strona używa plików cookie niezbędnych do jej działania oraz
                analitycznych, które zbierają statystyki ruchu. Cookies
                analityczne możesz zablokować w ustawieniach przeglądarki -
                strona będzie działać dalej.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="t-h3 text-black">Twoje prawa</h2>
              <p>Masz prawo:</p>
              <ul className="list-disc space-y-1 pl-5">
                <li>dostać kopię swoich danych</li>
                <li>poprawić je, jeśli są błędne</li>
                <li>usunąć je</li>
                <li>ograniczyć ich przetwarzanie</li>
                <li>przenieść je do innego usługodawcy</li>
                <li>
                  sprzeciwić się przetwarzaniu opartemu na prawnie uzasadnionym
                  interesie
                </li>
                <li>wycofać zgodę w każdej chwili, bez wpływu na to, co było wcześniej</li>
              </ul>
              <p>
                Napisz na{" "}
                <a
                  className="underline underline-offset-2"
                  href="mailto:lukasz.glica07@gmail.com"
                >
                  lukasz.glica07@gmail.com
                </a>{" "}
                i załatwię to bez formularzy. Możesz też złożyć skargę do
                Prezesa Urzędu Ochrony Danych Osobowych.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="t-h3 text-black">Zmiany</h2>
              <p>
                Jeśli zmienię sposób przetwarzania danych, zaktualizuję tę
                stronę i zmienię datę na górze.
              </p>
            </section>
          </div>
        </section>
      </main>
    </div>
  );
}
