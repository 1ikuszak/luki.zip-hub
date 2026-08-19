---
title: "Jak zbudowałem firmową bazę wiedzy"
date: "2026-08-09"
order: -7
tag: "poradnik"
description: "Warstwa nad narzędziami, które już macie: czyta rozmowy, dokumenty i kod tam, gdzie leżą, i odpowiada z linkiem do źródła. Cała architektura warstwa po warstwie, z animowanymi diagramami."
---

Zapytaj swoją firmę o coś, co ustaliliście pół roku temu, a dostaniesz cztery odpowiedzi i żadnej z datą.

Wiedza w firmie nie ginie dlatego, że nikt jej nie zapisał. Ginie dlatego, że została zapisana w pięciu miejscach, które nic o sobie nie wiedzą. Ustalenie leży w wątku na czacie, uzasadnienie w mailu, liczba w arkuszu, a wersja obowiązująca w głowie osoby, która akurat jest na urlopie. Każda z tych rzeczy jest zapisana. Żadnej nie da się znaleźć.

Widać to po jednej rzeczy: te same pytania wracają w kółko.

> _"Gdzie to znajdę?"_
>
> _"Kto się na tym zna?"_
>
> _"Czym w ogóle jest ta rzecz?"_

Standardowa odpowiedź na to jest zawsze taka sama i zawsze przegrywa. Zakładacie jedno miejsce na wszystko, ustalacie strukturę, przez dwa tygodnie ktoś ją wypełnia, a potem robota wraca tam, gdzie jest wygodnie. I dobrze, bo tak ma być. Rozmowa o zmianie w projekcie należy do czatu, nie do bazy wiedzy.

Więc nie buduj miejsca na wiedzę. Zbuduj warstwę nad miejscami, które już macie.

Ta warstwa czyta wasze narzędzia tam, gdzie są, sprowadza wszystko do jednego kształtu i odpowiada na pytania zadane normalnym zdaniem, podając link do konkretnej wiadomości z 14 marca. Nikt nie zmienia nawyków, bo nikt się o niej nie dowiaduje poza momentem, w którym zadaje pytanie.

Niżej jest cała architektura, warstwa po warstwie, w kolejności, w której się ją buduje: skąd bierzesz dane i jak często, jak zamieniasz rozmowę w coś, co da się znaleźć, co odsiewasz na wejściu, cztery sposoby szukania i jak je łączysz w jedną listę, jak z tego powstaje odpowiedź z przypisem, i jak pilnujesz, kto co widzi.

![Anatomia: cztery źródła zostają u siebie i emitują wiersze do jednej wspólnej tabeli, z której korzystają ludzie, agenci i automaty, a każde zapytanie przechodzi przez warstwę uprawnień](/posts/mozg-firmy/fig-01-anatomia.svg)

---

## Dane zostają tam, gdzie powstają

Znalezienie informacji wewnątrz organizacji jest trudne. Dane są rozsypane po narzędziach i mniej więcej raz na kwartał ktoś proponuje to samo genialne lekarstwo: zapiszmy wszystko na jednej platformie, żeby cała wiedza była w jednym miejscu. Marzenie o jednym źródle prawdy w praktyce rzadko działa.

Informacja powstaje tam, gdzie jest wygodnie: sugerowane zmiany w dokumencie, wątki na czacie, odwołania do kodu w repozytorium, statusy w systemie zadań. Te platformy są skrojone pod swoje zastosowania i dopracowane latami. Rozmowa o zmianie w kodzie prowadzona w edytorze tekstu byłaby koszmarem.

Więc projektujesz system, który wymaga minimalnej zmiany w tym, jak ludzie już pracują. Po stronie zbierania danych oznacza to jedno: wyciągasz dane z każdej platformy bezpośrednio, zamiast prosić kogokolwiek, żeby je gdzieś przeniósł.

---

## Anatomia bazy wiedzy

Baza, którą budujesz, daje trzy rzeczy i wszystko poniżej obsługuje jedną z nich:

1. Miejsce, w którym zbierają się i leżą wewnętrzne dane.
2. Miejsce, w którym się o te dane pyta.
3. Warstwę uwierzytelniania i uprawnień, razem z dziennikiem zapytań i statystykami.

W środku siedzi jedna tabela, która trzyma wektory, streszczenia i metadane z wielu źródeł naraz. System w kółko zaciąga dane z całej firmy i utrzymuje magazyn gotowy do odpytania.

Interfejs danych ma być prosty, a mimo to obsłużyć większość formatów, i ma pozwalać dopisywać własne łączniki bez ruszania reszty. Dlatego wynik jest celowo prymitywny: każde źródło, od wątku na czacie po wyeksportowaną tabelę, ląduje w tej samej tabeli wektorów, a wszystko, co w niej leży, jest natychmiast dostępne przez ten sam interfejs.

Każde źródło definiuje trzy rzeczy: czym są te dane, jak się do nich podłączyć i jak często je pobierać. Każdy powstały wiersz wygląda tak samo, niezależnie od tego, czy przyszedł z czatu, z repozytorium kodu, z systemu dokumentów, czy z czyjejś własnej bazy.

![Wątek z czatu, sekcja umowy, funkcja w kodzie i wiersz z tabeli lądują w tym samym kształcie wiersza: źródło, link, treść po destylacji, treść oryginalna, wektor, data i zakres](/posts/mozg-firmy/fig-02-wiersz.svg)

---

## Czat

Czat jest najważniejszym źródłem i to pod niego projektujesz całą resztę. To tam toczą się najświeższe rozmowy i tam zapadają ustalenia, których nikt nigdy nie przepisze do dokumentu.

---

## Jak przerabiam nieustrukturyzowane rozmowy

Pierwsza wersja zawsze wygląda tak samo: zwykłe wektory na surowym tekście. Sprawdziłem to i szybko wyszło, że samo szukanie po znaczeniu nie łapie wszystkiego, co powinno się znaleźć.

Wiadomości z czatu mają trzy wady naraz:

*   Gęstość informacji waha się ogromnie: "no dobra, spoko" i szczegółowe wyjaśnienie techniczne to obie po prostu wiadomości.
*   Długości są różne, a krótkie wiadomości regularnie wygrywają z dłuższymi i bardziej treściwymi, bo tak działa podobieństwo wektorów.
*   Sens wiadomości zwykle zależy od tego, co było wokół niej.

Dlatego zaciąganie czatu budujesz tak, żeby każdy wątek dało się znaleźć kilkoma technikami naraz, a każda z nich nadrabiała słabości pozostałych:

*   **Szukanie po pełnym tekście** łapie dokładne ciągi znaków, które wektory rozmywają: treści błędów, nazwy ustawień, nazwy klientów. Kiedy ktoś wkleja dosłowny komunikat, dokładne dopasowanie jest prawie zawsze najlepszym dowodem i żadne podobieństwo znaczeniowe nie powinno go przebić.
*   **Szukanie po wektorach** łapie parafrazę. Osoba pytająca "przywracanie wiesza się po wczytaniu listy plików" i osoba, która odpowiedziała "zatrzymuje się na dysku sieciowym", mogą nie mieć ani jednego wspólnego słowa. To wektory łączą pytanie z odpowiedzią napisaną zupełnie innymi słowami.
*   **Rzadkość słowa** oddziela treść od wypełniacza. Krótka wiadomość zbudowana wokół rzadkiego słowa, na przykład nietypowej nazwy ustawienia, zasługuje na wysoką pozycję. "Brzmi dobrze, dzięki" leży blisko wielu zapytań w przestrzeni wektorów, a spada niemal do zera, gdy uwzględnisz rzadkość słów.
*   **Starzenie się** koduje fakt, że odpowiedzi z czatu tracą ważność. Dwa wątki mogą odpowiadać na to samo pytanie, a ten sprzed pół roku opisuje proces, którego już nie ma. Przy porównywalnej trafności wygrywa nowszy.

Żaden pojedynczy sposób oceniania nie ma zaufania sam. Każdy produkuje własną listę wyników na tym samym zbiorze, a te listy łączą się dopiero w momencie zapytania.

![Jedno zapytanie i czterech kandydatów ocenionych przez cztery sposoby naraz: wygrywa ten, który zdaje wszystkie cztery testy, a nie ten, który wygrywa jeden](/posts/mozg-firmy/fig-03-szukanie.svg)

---

## Nasłuch na żywo

Żeby zbierać dane na bieżąco, wstawiasz do przestrzeni roboczej bota na stałym połączeniu. Platforma wypycha do niego każde zdarzenie, więc dostaję aktualizacje w czasie rzeczywistym, bez odpytywania API co chwilę i bez przepalania limitów.

Kiedy przychodzi zdarzenie, od razu je potwierdzam, odsiewam duplikaty po stałym identyfikatorze zdarzenia i oznaczam wiadomość do przetworzenia.

Przetwarzanie nie zapisuje pojedynczej wiadomości w oderwaniu od reszty. Najpierw ustala, do którego wątku ona należy, i pobiera całą rozmowę z powrotem: wiadomość otwierającą i wszystkie odpowiedzi. Dopiero to zapisuje jako jeden wiersz. Odpowiedź w istniejącym wątku pociąga więc za sobą ponowne pobranie rodzica i całego rodzeństwa, dzięki czemu zapisana treść, lista uczestników i czas ostatniej aktywności zawsze opisują pełną rozmowę.

Każdy kanał jest osobnym źródłem. To daje dokładną kontrolę nad świeżością: kanał, na którym gasi się pożary, można zaciągać dużo częściej niż kanał ogłoszeniowy.

---

## Wątki i wiadomości

Surowy tekst z czatu da się przeszukiwać po słowach od razu, bo nad treścią trzymasz indeks pełnotekstowy. Żeby działało też szukanie po znaczeniu, potrzebna jest jeszcze jedna obróbka i to ona robi największą różnicę w trafności.

W kroku destylacji model wyciąga z całego wątku ustrukturyzowane dane:

*   Jednozdaniowe pytanie, które ktoś realnie by wpisał, szukając tej rzeczy.
*   Krótkie streszczenie.
*   Rozstrzygnięcie.
*   Systemy i odwołania, które padły w rozmowie.

Te dane idą do wektorów i lądują we wspólnej tabeli. Oryginalny zapis rozmowy nie jest wektoryzowany bezpośrednio. W moich testach trafność wyraźnie wzrosła, kiedy wątek został sprowadzony do jednego, powtarzalnego formatu. Dodatkowe metadane dają przy okazji dopasowaniu po znaczeniu więcej sygnału do pracy.

![Czterowiadomościowy wątek zamienia się w znormalizowany dokument: pytanie, streszczenie, rozstrzygnięcie i czego dotyczy, a jedna wiadomość zostaje odrzucona jako szum](/posts/mozg-firmy/fig-04-destylacja.svg)

---

## Serie wiadomości

W tym momencie szukanie po czacie było już dobre, ale w kółko wracał ten sam problem: ważne wiadomości ukryte w długich wątkach nie zawsze były reprezentowane w streszczeniu całego wątku.

Żeby wzmocnić sygnał z pojedynczych wiadomości, dokładasz serie. Seria to ciąg następujących po sobie wiadomości tej samej osoby. Wektoryzuję pojedyncze serie z doklejonym na początku tematem wątku, bo czasem odpowiedź siedzi w jednej pobocznej wiadomości, której słownictwo nigdy nie trafia do streszczenia. Wektory serii sprawiają, że taka wiadomość staje się znajdowalna sama z siebie.

Żeby do bazy nie trafiały dane o niskiej wartości, każda seria dostaje ocenę z ważonej kombinacji sygnałów i musi przekroczyć próg, zanim zostanie zwektoryzowana:

*   Zawiera słowo względnie rzadkie w skali całego zbioru, z odwrotną częstością dokumentową na poziomie co najmniej 4,0.
*   Połączona seria ma co najmniej 200 znaków.
*   Przynajmniej jedna wiadomość w serii ma pod sobą reakcję, co daje darmowy sygnał od ludzi.

Po destylacji serie, które przeszły próg, są wektoryzowane i zapisywane obok rekordu całego wątku.

![Trzy testy progu wejścia: rzadkie słowo, minimum 200 znaków albo reakcja pod wiadomością. Wystarczy jeden, żeby seria weszła do bazy](/posts/mozg-firmy/fig-05-prog.svg)

---

## Repozytoria kodu

Na początku sam się zastanawiałem, czy wektoryzowanie repozytoriów jest w ogóle potrzebne. Przy narzędziach pracujących w terminalu wektory na kodzie wydają się nieintuicyjne, skoro wygląda na to, że wystarczy zwykły grep. Po rozmowach z innymi i po lekturze tego, co wyszło zespołowi Cursora przy szukaniu po znaczeniu w dużych bazach kodu, postanowiłem spróbować.

Repozytoriów jest sporo, a niektóre są bardzo duże. Głównym zmartwieniem było to, jak utrzymywać je aktualne bez przepalania zasobów.

---

## Utrzymywanie wektorów kodu

Po kilku eksperymentach wybrałem otwarte narzędzie do wektoryzowania dokumentów, wyspecjalizowane w bazach kodu.

Dla każdego repozytorium tnę kod po granicach składni charakterystycznych dla danego języka, uporządkowanych od najbardziej ogólnych do najdrobniejszych. Podział najpierw próbuje granic wysokiego poziomu, na przykład klas. Jeśli powstały kawałek dalej jest za duży, schodzi do granic metod, a potem do jeszcze mniejszych bloków. Kawałki idą do wektorów, a wektory do bazy. Jeden plik potrafi wyprodukować kilka wpisów na różnych poziomach szczegółowości, na przykład osobno dla całego pliku i osobno dla funkcji.

Narzędzie trzyma w bazie własne metadane synchronizacji. Przy każdym zapisie zmian przelicza i eksportuje tylko te kawałki kodu, które faktycznie się zmieniły, zamiast liczyć całe repozytorium od nowa. Sprawdziło się to szczególnie dobrze dlatego, że stan synchronizacji i magazyn wektorów siedzą w tej samej bazie.

Wraz z rosnącą liczbą baz kodu przeniosłem podpinanie repozytoriów do plików konfiguracyjnych, razem z listami tego, co wchodzi i co jest wykluczone, na poziomie ścieżek.

![Podział kodu schodzi od ogółu do szczegółu: najpierw klasa, potem metody, na końcu bloki, a jeden plik daje kilka wpisów na różnych poziomach](/posts/mozg-firmy/fig-06-ciecie.svg)

---

## Własne źródła

Część danych siedzi w istniejących bazach i nie ma powodu, żeby przenosić je do czatu albo do systemu dokumentów tylko po to, żeby wzięły udział w bazie wiedzy. Chodzi o to, żeby dostać tę samą powierzchnię odpytywania nad tabelami, które już są.

Dlatego własne źródła traktujesz jak wtyczki. Powstaje mały moduł, który umie czytać z danego systemu i emitować wiersze w kształcie mojej tabeli wektorów, plus pasujący wpis w rejestrze źródeł.

Dopóki taki moduł pisze do wspólnej bazy w tym samym schemacie co każdy inny wiersz, reszta systemu działa bez zmian. Dane stają się odpytywalne obok czatu, kodu i dokumentów, bez żadnej specjalnej obsługi gdziekolwiek indziej.

---

## Planowanie i rozdzielanie narzędzi

Przy każdym zapytaniu leci najpierw krótkie planowanie, w którym model decyduje, które narzędzia i które źródła mogą mieć znaczenie. Główne narzędzia:

*   indeks obszarów: streszczenia poszczególnych plików robione przez model.
*   szukaj: wspólny potok wektorowy po czacie, dokumentach, kodzie i pozostałych zindeksowanych źródłach, scalony i przestawiony wewnętrznie.
*   szukaj w rozmowach: bezpośrednie wyciąganie z czatu.
*   szukaj w kodzie: zwykły grep po repozytoriach.
*   ostatnie zmiany: świeże zmiany w kodzie związane z pytaniem.
*   kto się zna: osoby z udowodnioną wiedzą w danym temacie.

Planista pracuje na zwięzłym opisie tego, co jest zindeksowane: jakie istnieją zakresy, jakie źródła są w każdym z nich i na co każde źródło dobrze odpowiada. Na podstawie pytania i aktywnego zakresu wybiera narzędzia, a wykonawca rozsyła je równolegle, sprowadza wyniki do wspólnego formatu dowodów i podaje dalej, do modelu składającego odpowiedź.

![Pytanie idzie do planisty, ten wybiera narzędzia, wykonawca rozsyła je równolegle, a składanie odpowiedzi zwraca wynik z przypisem albo mówi wprost, że tego nie ma w bazie](/posts/mozg-firmy/fig-08-potok.svg)

---

## Przestawianie kolejności wyników

Dokument potrafi wylądować na górze tylko dlatego, że ma wspólne słownictwo z pytaniem, mimo że odpowiada na coś zupełnie innego. Zanim przestawię kolejność, łączę niekompatybilne listy wyników przez fuzję rang. Dla każdego dokumentu sumuję po wszystkich listach, na których się pojawił, wartość równą wadze podzielonej przez sumę sześćdziesięciu i jego pozycji na danej liście. Waga domyślna to 1,0, a stała wygładzająca to 60.

Ta stała sprawia, że zgodność liczy się bardziej niż jeden mocny głos: dokument, który pojawia się wysoko u kilku różnych sposobów szukania, bije dokument, który jest pierwszy tylko u jednego. Potem scalam zduplikowane kawałki z powrotem do jednego źródła, ograniczam liczbę wyników, jaką może wnieść pojedynczy plik, i schodzę do bardziej zróżnicowanej dwudziestki.

Oryginalne pytanie i tych dwudziestu kandydatów idzie do małego modelu przestawiającego kolejność. Ocenia każdy dokument w skali od zera do dziesięciu, a ja zostawiam dziesięć najlepszych.

Kiedy kolejność jest już ostateczna, doklejam zwycięzcom kontekst. Jeśli trafieniem jest sekcja dokumentu, dobieram dwie sąsiednie sekcje, żeby nagłówek, założenia i zastrzeżenia rozdzielone przez cięcie nie zginęły. Dzięki temu czytający dostaje kompletny fragment, a nie samotny akapit bez najważniejszego kontekstu.

Wynikiem szukania jest więc gęsta paczka dowodów: wyniki zebrane z różnych sposobów szukania, odsiane z duplikatów na poziomie źródła, przestawione pod kątem prawdziwego pytania i dopiero potem rozszerzone o otaczający je kontekst.

![Trzy listy wyników łączą się przez wagę podzieloną przez sumę sześćdziesięciu i pozycji: dokument wysoki u wszystkich trzech wygrywa z tym, który jest pierwszy tylko u jednej](/posts/mozg-firmy/fig-07-fuzja.svg)

---

## MCP

W integracji przez MCP wystawiam poszczególne klocki wyszukiwania jako osobne narzędzia, zamiast chować je za jednym punktem "odpowiedz na to pytanie". Te narzędzia są celowo proste i zawierają tak mało modelu, jak się da, żeby klienci mogli je odpytywać szybko i tanio.

Każde narzędzie MCP odpowiada jednemu prymitywowi wyszukiwania: szukaj w rozmowach, szukaj w kodzie, szukaj, kto się zna. Wejścia i wyjścia są wąskie, ustrukturyzowane i stabilne, więc łatwo je wywołać z dowolnego klienta albo agenta, bez wpychania dodatkowej logiki sterującej do środka narzędzia.

Większość narzędzi odpala jeden potok zapytania, czyli szukanie po wektorach, szukanie po słowach albo grep, nakłada lekkie heurystyki oceniania i zwraca surowe wiersze z dowodami.

Claude Code, albo dowolny inny agent mówiący przez MCP, staje się wtedy silnikiem sterującym. To on decyduje, które narzędzia wywołać, w jakiej kolejności i jak poskładać wyniki w odpowiedź albo w zmianę w kodzie. Sama warstwa wyszukiwania nie zależy od tych decyzji, żeby obsłużyć zapytanie.

---

## Interfejs webowy

W interfejsie webowym istnieją te same narzędzia, tylko podpięte do kompletnego potoku, który przy każdym pytaniu przebiega od początku do końca. Agent stojący za interfejsem jest właścicielem kroku planowania i wykonania.

**Planista.** Lekkie wywołanie modelu ogląda pytanie i aktywny zakres, a potem wybiera, które narzędzia odpalić.

**Wykonawca.** System rozsyła te wywołania równolegle, zbiera wyniki i sprowadza je do wspólnego schematu dowodów z ocenami, świeżością i wskazówkami o źródle.

**Składanie odpowiedzi.** Ostatnie wywołanie modelu bierze otypowaną paczkę dowodów i oryginalne pytanie, po czym produkuje odpowiedź widoczną w interfejsie, razem z przypisami, zastrzeżeniami i zestawieniem informacji z różnych źródeł.

Z perspektywy użytkownika interfejs webowy to po prostu "zadaj pytanie i dostań odpowiedź". Pod spodem chodzi ten sam układ planista, wykonawca, składanie, który klienci MCP mogą odtworzyć u siebie wprost.

---

## Organizacja

Wraz ze wzrostem zbioru "szukaj wszędzie po wszystkim" bardzo szybko przestało być użyteczne. Ludzie od jednego obszaru nie chcą mieć w wynikach instrukcji z zupełnie innego i odwrotnie. Zakresy są sposobem na to, żeby szukanie było trafne domyślnie.

---

## Zakresy i szukanie w zakresie

Zakresy są głównym sposobem organizowania przestrzeni, po której leci zapytanie. Zakres to nazwana wiązka źródeł: konkretne kanały czatu, repozytoria kodu, wewnętrzne bazy i przestrzenie dokumentów istotne dla danego zespołu albo tematu.

Zakresy są celowo lekkie. To samo źródło, na przykład wspólny kanał awaryjny albo centralne repozytorium, może być podpięte do wielu zakresów naraz, zamiast być duplikowane.

![Pięć źródeł podpiętych do dwóch zakresów, przy czym kanał awaryjny należy do obu i nie jest duplikowany, a nowa osoba wybiera swój zakres przy pierwszym uruchomieniu](/posts/mozg-firmy/fig-09-zakresy.svg)

---

## Pierwsze uruchomienie i ustawienia domyślne

Przy pierwszym uruchomieniu użytkownik dostaje prośbę o wybranie albo założenie domyślnego zakresu, który pasuje do tego, jak pracuje.

Ten domyślny zakres zapisuje się na jego profilu i od tej pory sam zawęża zapytania. Nowa osoba dostaje trafne odpowiedzi bez uczenia się najpierw, które kanały, repozytoria i przestrzenie dokumentów w ogóle mają znaczenie.

---

## Na koniec

Ta baza wiedzy działa, bo spotyka ludzi tam, gdzie informacja już leży, zamiast wpychać wszystko do jednego sztywnego systemu. Łącząc różne sposoby szukania, wyciągam dowody szybko. Wychodzi z tego szukanie, które jest wystarczająco elastyczne dla prawdziwych firmowych danych, a jednocześnie na tyle uporządkowane, żeby zostało użyteczne wraz ze wzrostem firmy.
