---
title: "Loop engineering: jak z tego korzystać, plus pętla na wysoko konwertujący landing page"
date: "2026-07-08"
order: -3
tag: "poradnik"
description: "Loop engineering to następny krok po prompt engineeringu. W środku gotowa pętla, którą kopiujesz, podajesz swój produkt i wychodzi konwertujące copy na cały landing page. Plus druga pętla do designu i skill do gustu, który jest must have."
---

Twój system AI jest tak szybki, jak ty przy klawiaturze. I to jest twój problem.

Promptujesz task po tasku. Piszesz, czekasz, czytasz output, poprawiasz, piszesz następny. Przy każdym kroku siedzisz ty. Robisz jeden landing, gdy pętla zrobiłaby dziesięć. AI mogłoby kręcić w kółko. Ale ty wpinasz się między kroki, więc wszystko staje na tobie. Masz najszybszy silnik świata i trzymasz nogę na hamulcu.

Ludzie, którzy siedzą w tym najgłębiej, mówią dziś to samo: nie promptuję już AI krok po kroku, mam pętle, które chodzą same, a moja robota to je pisać. Branża nazywa to loop engineering. W 2023 wszyscy gadali o prompt engineeringu, w 2025 o context engineeringu, teraz o pętlach. Ten sam skill pod spodem, inna etykieta.

Zaraz dam ci gotową pętlę: kopiujesz, wklejasz, podajesz swój produkt i wychodzi konwertujące copy na cały landing. Potem drugą, do designu. Najpierw dwie minuty na to, jak pętla w ogóle działa, bo bez tego reszta to magia.

---

## Część 1. Czym jest loop engineering

Loop engineering to prosta zmiana. Przestajesz być osobą, która promptuje agenta. Projektujesz system, który robi to za ciebie.

Najprostszy obraz, jaki znam: redaktor z kartką. Jeden agent pisze. Drugi czyta i ocenia, jak redaktor. Co słabe wraca do poprawki i leci od nowa, aż przejdzie. Ty odpalasz cel raz, a pętla kręci się sama.

Pod spodem są cztery klocki:

- **maker** robi robotę
- osobny **checker** ją ocenia
- **standard na piśmie**, do którego checker porównuje
- **warunek stopu**, ustawiony zanim odpalisz

Dlaczego osobny checker, a nie ten sam agent? Bo model oceniający własną robotę jest dla niej za miły. Uzasadnia to, co już napisał, zamiast łapać, gdzie zawalił. Świeży agent czyta to bez ego. Widzi rzeczy, które autor sobie wmówił. Dlatego redakcja w gazecie to inna osoba niż ta, która napisała tekst.

Warunek stopu ustawiasz przed startem. Na przykład: popraw tylko poważne rzeczy, maksymalnie trzy rundy, koniec gdy wszystko przejdzie standard. Pętla bez stopu kręci się i pali tokeny, aż ją zabijesz ręcznie. Jeden gość spalił tak 1,3 miliona dolarów w 30 dni. Płacił ktoś inny, bo pracuje w firmie od modeli. Ty nie masz tego luksusu. Twoja pętla musi być ciasna: jasny cel, zdefiniowane kroki, ocena na każdym z nich, punkt stopu. To się nazywa closed loop i ta wersja opłaca się dziś.

I to jest cała gra: pętla jest tak dobra, jak standard, który jej podłożysz. Daj checkerowi pustą kartkę, a będzie zgadywał. Daj mu spisany standard, a utnie wszystko, co nie trzyma poziomu. Zaraz pokażę ci to na konkrecie.

---

## Część 2. Pętla do copy na landing page

To jest mięso. Napiszę ci copy na landing nie jednym promptem. Pętlą. Sama ocenia się przez sześć frameworków copywriterskich i poprawia, aż przejdzie.

Nie musisz umieć pisać. Musisz tylko nakarmić ją prawdą o produkcie, surowo, w punktach. Kopiujesz prompt niżej, wklejasz do Claude albo ChatGPT. On najpierw cię przepyta o produkt. Odpowiadasz, a pętla buduje copy sekcja po sekcji, ocenia każdą i oddaje ci gotowca.

### Skopiuj to

```
Jesteś moją pętlą do pisania copy na landing page. Pracujesz jako zamknięta pętla: maker pisze, osobny checker ocenia względem standardu, poprawka, powtórz aż przejdzie. Jeszcze nic nie pisz.

KROK 0 - WYWIAD.
Zanim napiszesz jedno zdanie, zadaj mi te pytania i poczekaj na moją odpowiedź:
1. Co sprzedajesz? (produkt albo usługa, jedno zdanie)
2. Dla kogo to jest? (konkretny człowiek, nie "wszyscy")
3. Jaki ból ma ten człowiek, zanim cię znajdzie? Daj mi trzy najostrzejsze.
4. Gdzie będzie po tym, jak kupi, i ile kosztuje go nierobienie nic?
5. Jak to działa w trzech krokach?
6. Proof: liczby, wyniki, opinie, cokolwiek realnego.
7. Oferta i cena.
Powiem ci dużo, ale w punktach. Weź wszystko, co dostaniesz. Jak czegoś brakuje, dopytaj raz, zwięźle. Nie zgaduj.

KROK 1 - STANDARD (do tego porównujesz każdą linijkę):
- Struktura (5 sekcji): 1. Pain Point (1-2 zdania, duży ból). 2. Transformacja (gdzie był plus koszt bezczynności). 3. Jak to działa (proste kroki, rozpal pragnienie, nie zdradzaj wszystkiego). 4. Benefity (bullety, korzyść a nie feature). 5. CTA (before/after, potem akcja; transformacja PRZED ceną, żeby porównał wartość z ceną).
- PAS: sekcja 1 ma boleć, zanim sekcja 3 ratuje. Nie ratuj za wcześnie.
- Value Equation: każda linijka albo podnosi (marzenie razy wiara, że się uda), albo obniża (czas razy wysiłek). Linijka, która nie rusza żadnego z tych czterech, leci do kosza.
- Cel w hero: outcome jeden-dwa kroki przed nim, plus czas, plus konkretna metryka. Wiarygodne bije wielkie. "Pierwszy klient w 14 dni" bije "rozwiń biznes".
- Test trzech pytań na każdą linijkę: widzę obraz? da się to obalić prawdą albo fałszem? czy konkurent może się pod tym podpisać bez zmiany sensu? Jak konkurent może, przepisz.
- Anti-generic: podmień w nagłówku rzeczowniki na dowolną inną firmę z branży. Jak nic się nie zmienia, jest za generyczne. Wstrzyknij konkret: nazwę, liczbę, realny mechanizm.
- Craft: krótkie zdania, aktywny głos, pierwsze zdanie robi całą robotę. Zero lania wody, zero em-dash, zero słów typu synergia, rewolucyjny, unlock, game-changer.

KROK 2 - PISZ (maker): napisz copy per sekcja według struktury z KROK 1.

KROK 3 - OCEŃ (checker): przejdź sekcja po sekcji. Dla każdej wypisz krótko: który framework łamie i jak. Przepisz tylko to, co nie przechodzi.

KROK 4 - PĘTLA: powtarzaj KROK 2 i 3 maksymalnie trzy rundy, albo do momentu, aż każda sekcja przejdzie cały standard. Bierz jedną najważniejszą poprawkę na rundę, nie dwadzieścia drobnych.

OSZCZĘDZANIE TOKENÓW (trzymaj się tego):
- Nie pokazuj mi rund pośrednich. Pokaż tylko finał: copy per sekcja, gotowe do wklejenia na stronę.
- Nie szukaj w internecie i nie dopisuj sekcji, których nie ma w strukturze.
- Na końcu dorzuć trzy linijki: co poprawiłeś między rundami.
```

### Jak z tego wycisnąć maksa

Cała robota tej pętli stoi na KROKU 0. Im więcej realnego materiału jej dasz, tym mniej zgaduje. Ale nie wklejaj eseju. Wrzuć dużo, w punktach, samo high-signal.

Konkretnie: trzy najostrzejsze bóle twojego klienta jego własnymi słowami (podkradnij je z opinii, z DM, z rozmów). Realne liczby i wyniki. Czym się różnisz od tego, co już jest na rynku. Jak wygląda życie klienta po zakupie. Masz starą wersję strony albo notatki o produkcie? Wklej. Pętla przerobi to na copy, a ty nie musisz pisać ani zdania.

### Dlaczego te frameworki

Każdy zamyka jedną dziurę, przez którą ucieka konwersja. Krótko:

- **Struktura 5 sekcji.** To kolejność, w jakiej kupujący podejmuje decyzję: czy mam ten problem, gdzie będę bez niego, czy to realne, co dostaję, co robię teraz. Idziesz po kolei i nie gubisz go po drodze.
- **PAS.** Ludzie nie kupują rozwiązania. Kupują wyjście z bólu. Nie rozgrzejesz problemu, twój nagłówek jest letni i nikt nie scrolluje dalej.
- **Value Equation.** Kontrola jakości na każdą linijkę. Podnosisz marzenie i wiarę, obniżasz czas i wysiłek. Zdanie, które nie rusza żadnego z tych czterech, jest ozdobą. Wywalasz.
- **Clear and believable goal.** Rynek jest zmęczony wielkimi obietnicami. Konkretny cel z metryką i terminem konwertuje lepiej niż największa obietnica bez pokrycia.
- **Test trzech pytań.** Sito na abstrakcję. Widzę obraz, da się obalić, nikt inny się pod tym nie podpisze. Linijka, która nie przechodzi choć jednego, jest niczyja i leci.
- **Anti-generic swap.** Główny powód, dla którego copy przestaje brzmieć jak AI. Podmieniasz swoje rzeczowniki na dowolne inne konto i nic się nie zmienia? Za generyczne. Konkret robi robotę.

Pierwsze trzy budują szkielet i ciśnienie. Ostatnie trzy sprawiają, że copy brzmi jak człowiek, nie jak generator.

### Zobaczmy to w praktyce

Powiedzmy, że sprzedajesz kurs fotografii produktowej dla małych sklepów. Wrzucasz do pętli trzy fakty. Klient traci sprzedaż przez zdjęcia z telefonu. Nie ma budżetu na studio. Twoi kursanci robią sklepowe zdjęcia w tydzień, samym telefonem.

Pierwsza sekcja, którą pluje pętla, może wyglądać tak:

```
Twoje produkty są dobre. Twoje zdjęcia mówią coś innego.
Klient scrolluje, widzi zdjęcie z telefonu w kuchennym świetle i idzie do konkurencji, która wygląda na wartą tych pieniędzy. Nie przez produkt. Przez zdjęcie.
```

Boli, jest konkretne, widzisz ten obraz i pod tym nie podpisze się żadna generyczna "szkoła fotografii". Tak wygląda linijka, która przeszła standard. Reszta sekcji leci tym samym torem, aż cały landing jest spójny.

To nie pali tokenów, bo pętla jest zamknięta. Pytania zadaje raz. Standard jest stały, więc nie szuka niczego w sieci. Rundy ograniczone do trzech. Pokazuje ci tylko finał. Płacisz jak za jeden dobry prompt, a dostajesz robotę całej pętli.

---

## Część 3. Druga pętla: design (i skill, który jest must have)

Masz copy. Strona ma jeszcze wyglądać. I tu jedna rzecz robi całą różnicę.

Powiedz Claude "zrób mi ładny landing" i dostaniesz to samo co wszyscy. Fioletowy gradient AI. Wyśrodkowane hero na ciemnym tle. Trzy równe karty features. Domyślny slop. Model sięga po najbezpieczniejszy szablon, bo nie dałeś mu gustu.

Więc dajesz mu gust. Nie ręcznie, tylko raz. Chcesz, żeby strona wyglądała jak banger, a nie jak template? Zainstaluj do Claude Code skill do gustu. To dosłownie must have.

```
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

Repo i pełny opis: [tasteskill.dev](https://tasteskill.dev). Ten skill to spisany standard tego, jak wygląda dobra strona, wpięty na stałe. Zero domyślnych defaultów. Kontrast typografii. Oddech. Jeden spójny system. I działa jak checker: każdy ekran, który AI zbuduje, leci przez ten standard, zamiast wychodzić z bezpiecznego szablonu modelu. Ten sam ruch co przy copy, tylko dla oczu.

Z zainstalowanym skillem odpalasz drugą pętlę. Dorzucasz swój brand kit jako drugi standard, obok gustu:

```
Jesteś moją pętlą do designu landing page'a. Masz zainstalowany skill do gustu (design-taste-frontend) i on jest twoim standardem estetyki. Maker buduje, checker ocenia pod standard, poprawka, powtórz aż przejdzie.

WGRYWAM:
- copy na stronę (wklejam niżej)
- mój brand kit: kolory (hex), fonty, logo, link do starej strony. Paletę i typografię bierz stąd, nie wymyślaj własnych.

KROK 1 - BUDUJ: złóż landing z mojego copy, trzymając strukturę sekcji i gust ze skilla.
KROK 2 - OCEŃ: przejdź ekran po ekranie pod dwa standardy. (a) Gust ze skilla: trzyma poziom, czy zszedł do domyślnego szablonu? (b) Brand: kolory, fonty i wibe zgadzają się z moim brand kitem, czy to wygląda jak generyczny template? Wypisz, co się rozjeżdża.
KROK 3 - PĘTLA: popraw tylko to, co nie przeszło. Maksymalnie trzy rundy. Pokaż finał.
```

Skill trzyma gust. Brand kit sprawia, że strona wygląda jak twoja, nie jak cudza. Im lepszy brand kit wrzucisz, tym bliżej twojego brandu wyląduje. To jest moment, w którym Claude Code bije zwykły czat: gust wpięty na stałe, do którego model wraca przy każdej stronie.

---

## Jedno, co warto zapamiętać

Te frameworki są publiczne. Każdy wygoogla PAS, Value Equation i strukturę landinga. Za chwilę każdy będzie miał te same pętle i te same modele. Sama pętla staje się tania i powszechna.

Czego nikt ci nie skopiuje: prawdy o twoim produkcie, realnego bólu twojego klienta, twojego proofu, twojego brandu wgranego w plik. Framework to szkielet. Twoje dane to mięso.

Trzy rzeczy na wynos:

1. Pętla to maker, który pisze, osobny checker, który ocenia pod standard, i warunek stopu ustawiony przed startem. Leci, aż przejdzie.
2. Copy na landing zbudujesz gotową pętlą wyżej. Wklej, odpowiedz na siedem pytań, odbierz gotowca. Design domknij drugą pętlą.
3. Wygrywa nie ten, kto ma lepsze AI. Ten, kto podłożył pod pętlę lepszy standard i lepsze dane.

---

Pętlę zbudujesz w minutę. Standard i dane pod nią to robota miesięcy. I to jedyna część, której nikt ci nie zwędzi.
