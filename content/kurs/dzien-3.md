---
slug: dzien-3
day: 3
title: 'Skille: ręce Żywego Systemu'
description: >-
  Twoja baza dostaje ręce. Instalujesz trzy skille jedną paczką (post na
  LinkedIn twoim głosem, transkrypt callu w animowaną ofertę HTML, ocena oferty
  jak Hormozi) i pierwszy raz system robi robotę za ciebie.
videoUrl: ''
pdfUrl: ''
published: false
order: 3
---
## Wczoraj baza tylko wiedziała. Dziś dostaje ręce.

Wczoraj zamknęliśmy narząd pierwszy: baza sama się układa, sama się utrzymuje, nie musisz jej niczego pilnować. Doszedł narząd drugi: pytasz, ona odpowiada twoimi notatkami, nie halucynacją z internetu. Skille z wczoraj - ingest, lint - czekają w gotowości: rzucasz "ingest" albo "sprawdź vault" i baza karmi się i porządkuje bez twojego sortowania.

Fajnie. Tylko baza, która umie wiedzieć i odpowiadać, to wciąż encyklopedia. Mądra, ale siedzi.

Znasz ten wieczór. Masz w głowie dobrą myśl, siadasz i zamiast ją wyrzucić, przepisujesz ręcznie w post. Godzina. Potem ta sama wiedza jeszcze raz, do oferty. I tak co tydzień: wiesz wszystko, a i tak klepiesz od zera. Encyklopedia, która umie wiedzieć, ale za ciebie nie kiwnie palcem.

Dziś dostaje ręce.

To narząd trzeci. Baza przestaje gadać i zaczyna robić: pisze posty w twoim głosie, robi briefy z twojej wiedzy, bierze transkrypt z callu z klientem i wypluwa gotową ofertę. Nie "AI, które coś tam pomoże". Twoja wiedza, twoimi rękami, twoim stylem, na jedną komendę.

To pierwsza lekcja, gdzie system robi robotę za ciebie.

## Co dostaniesz z tej lekcji (konkretnie)

Żeby nie było mgły. Po tej lekcji:

- masz zainstalowane trzy skille jedną paczką i odpalasz je naturalnym językiem,
- w kilka minut wyrzucasz surową myśl i dostajesz gotowy post na LinkedIn w swoim głosie (robota, która normalnie zjadała ci godzinę),
- widzisz na żywo, jak transkrypt z prawdziwego callu zamienia się w animowaną stronę-ofertę,
- pytasz trzeci skill o swoją ofertę i dostajesz rozbiór jak od Alexa Hormozi,
- rozumiesz, dlaczego ten output brzmi jak ty, a nie jak kolejny gostek z ChatGPT.

Komu to pomoże: każdemu, kto ma wiedzę w głowie i co tydzień tonie w godzinach ręcznego przekuwania jej w posty, oferty i decyzje, których szczerze nie znosi klepać. Czemu masz się tym przejmować: bo robota, która zżerała ci cały wieczór, schodzi tu do kilku minut.

To nie jest kurs o Obsidianie. To maszyna: wrzucasz jedno surowe zdanie, wychodzi gotowy post twoim głosem, zanim ostygnie kawa.

## Skill to pusta rękawica. Ręka jest twoja.

Tu większość ludzi robi błąd na starcie, więc powiem wprost.

Skill to nie magia. Skill to pusta rękawica. Sama nic nie umie.

Cała robota siedzi w tym, co rękawica ma w środku: w twoim vaulcie. W twojej wiedzy, twoich regułach, twoim głosie. Skill istnieje tylko po to, żeby po nie sięgnąć i wykonać ruch. Twój vault to ręka, która tę rękawicę wypełnia.

Zapamiętaj ten podział, bo trzyma cały system:

- **Wiedza, reguły, frameworki, głos, formuły** zawsze żyją w vaulcie.
- **Skill** trzyma tylko warstwę operacyjną (co po kolei zrobić) plus odnośnik do vaulta (skąd wziąć wiedzę).

Dlatego gostek, który ściągnie ten sam skill co ty, nie zrobi tego samego. On ma pustą rękawicę na pustej ręce. Ty masz rękawicę na swojej głowie. Skill kopiuje się w sekundę. Twojego vaulta nikt nie podrobi.

To cała architektura. Rękawice się kopiują, ręka zostaje twoja.

## Zajrzyj pod maskę: dwie warstwy systemu

Zanim wgrasz pierwszy skill, zobacz, gdzie on zamieszka. Pięć minut, a przestaniesz zgadywać, "gdzie co jest", do końca życia systemu.

Cały twój system to dwie warstwy w jednym folderze. Każde z twoich dwóch narzędzi patrzy na swoją.

**Warstwa pierwsza: drugi mózg.** To na nią patrzysz w Obsidianie - twoja wiedza, notatki, głos:

```tree-obsidian
├── _inbox/        strefa zrzutu - surowe wrzutki przed ingestem
├── 1-projects/    robota z deadlinem
├── 2-areas/       obszary bez końca - wiedza, klienci, twój głos
├── 3-resources/   materiały referencyjne
└── 4-archive/     skończone
```

**Warstwa druga: operacyjna.** Ten sam folder, ale to widzi Claude Code w Antigravity - instrukcje i narzędzia, którymi system działa:

```tree-claude
├── CLAUDE.md      konstytucja - czytana na starcie każdej rozmowy
└── .claude/
    ├── skills/    ręce - jeden folder = jedna umiejętność
    │   └── linkedin-post-writer/
    │       ├── skill.md    instrukcja: co robi, krok po kroku
    │       └── scripts/    skrypty do powtarzalnej roboty
    └── rules/     charakter - reguły czytane w KAŻDEJ rozmowie
        ├── writing-craft.md    reguły pisania - masz je od Dnia 1
        └── lessons.md          pamięć błędów - ożyje w Dniu 5
```

Folder `.claude` zaczyna się od kropki, więc komputer traktuje go jak ukryty: Obsidian go nie pokazuje, Antigravity tak (lewy pasek). Większość ludzi go ignoruje, bo wygląda technicznie. Błąd. To jest silnik. (Jest jeszcze `.obsidian/` - konfiguracja twojego okna. Nie ruszasz, nie myślisz o niej.)

Te dwie warstwy to cała architektura z rękawicy, narysowana na dysku. Wiedza, głos, reguły ofertowe - drugi mózg. Instrukcje "co po kolei zrobić" - warstwa operacyjna. Skill z warstwy operacyjnej sięga po treść z drugiego mózgu. Dlatego rękawice się kopiują, a ręka zostaje twoja.

Dwie rzeczy z drzewka, które poznasz później, żebyś wiedział, że nie ściemniam:

- **`rules/` to charakter systemu.** CLAUDE.md to konstytucja: krótka, mówi kim system jest i gdzie co leży. `rules/` to ustawy: szczegółowe reguły per dziedzina, też czytane automatycznie w każdej rozmowie. Dwa pliki już tam masz od Dnia 1 - wgrał je instalator (m.in. reguły pisania, przez które twój system nie brzmi jak AI-bełkot). Rozkładamy je w Dniu 5, bo tam system zaczyna pisać te reguły SAM, z twoich korekt.
- U mnie w silniku siedzi też folder `agents/` - osobni pracownicy do równoległej roboty. Poza kursem. Twój system działa w pełni bez tego.

Po co ci ta mapa: wszystko, co system umie i czym jest, leży w zwykłych plikach, które widzisz i edytujesz. Żadnej magii w chmurze. Coś się zepsuje - zaglądasz i cofasz. Chcesz więcej - dokładasz folder. I teraz widzisz, czemu rękawice się kopiują, a ręka zostaje twoja: skill to folder w warstwie operacyjnej, ściągniesz go w sekundę. Vault w warstwie wiedzy jest tylko twój, bo nikt nie ma twojego kontekstu. Właśnie to zaraz zrobisz: dołożysz trzy ręce.

## Pobierz paczkę Lekcji 3

{{POBIERZ_LEKCJE}}

Jeden plik: `lekcja-3-skille.zip`. W środku trzy skille i przykładowy transkrypt do testu. Nie rozpakowujesz ręcznie. Zostaw go w Pobranych albo na Pulpicie - instalator sam go znajdzie.

Kopiujesz blok poniżej (przycisk Kopiuj), wklejasz do Claude Code w terminalu (odpalonego z twojego vaulta), Enter. Instalator znajdzie paczkę, wgra trzy skille do `.claude/skills/` i przykładowy transkrypt do vaulta, a na koniec wypisze, co masz.

```
Instalujesz mi skille z Lekcji 3 kursu "Drugi Mózg" do tego vaulta.

Zasady: pisz po polsku, prosto. Przed każdym zapisem pokaż krótko co robisz. Ścieżki względne od tego folderu.

1. ZNAJDŹ PACZKĘ. Pobrałem lekcja-3-skille.zip. Poszukaj w Pobranych (Downloads) i na Pulpicie (Desktop). Może mieć nazwę typu "lekcja-3-skille (1).zip" - weź najnowszy. Nie znajdziesz, zapytaj gdzie go zapisałem.
2. SPRAWDŹ, że jesteśmy w moim vaulcie: w tym folderze jest .obsidian i .claude. Jeśli nie, zatrzymaj się i powiedz mi, żebym otworzył vault w Antigravity.
3. ROZPAKUJ do .claude/kurs/lekcja-3/ (utwórz folder). macOS/Linux: unzip. Windows: Expand-Archive.
4. WGRAJ SKILLE: skopiuj wszystkie trzy foldery z .claude/kurs/lekcja-3/skills/ (linkedin-post-writer, proposal-page, hormozi-acquisition) do .claude/skills/ w vaulcie. Utwórz .claude/skills/, jeśli go nie ma.
5. WGRAJ PRZYKŁAD: skopiuj .claude/kurs/lekcja-3/samples/przyklad-transkrypt-callu.md do 3-resources/ w vaulcie (przyda się do testu proposal-page) i dopisz do listy w GŁÓWNYM _MOC.md w rootcie vaulta linijkę: - przyklad-transkrypt-callu - przykładowy transkrypt (test skilla proposal-page).
6. SPRAWDŹ: wypisz zawartość .claude/skills/. Potwierdź, że są tam trzy nowe skille (każdy ma plik skill.md).
7. PODSUMUJ jednym zdaniem, że trzy skille są zainstalowane i gotowe, i że wracam do lekcji odpalić pierwszy.
```

Podejrzeć, co masz zainstalowane, możesz zawsze - poproś Claude "wypisz moje skille" albo zerknij do `.claude/skills/`. Teraz co siedzi w tych trzech rękawicach.

## Trzy skille: TWORZY, SPRZEDAJE, MYŚLI

Nie wysypujemy ci całego marketu i "powodzenia". Dajemy trzy, każdy z innej strony twojej roboty. Jeden **tworzy** treść, drugi **sprzedaje**, trzeci **myśli** o twoim biznesie. Każdy odpalasz naturalnym językiem, każdy robi coś, co poczujesz w pierwszej minucie.

### 1. linkedin-post-writer - surowa myśl w gotowy post twoim głosem

Wyrzucasz brain dump. Jedno zdanie, chaos, spisana głosówka. Wychodzi gotowy post na LinkedIn, przepuszczony przez QA na siedmiu metrykach (żaden poniżej progu nie wyjdzie).

Haczyk: skill pisze TWOIM głosem, nie generycznym. A twój głos jeszcze nie istnieje w vaulcie. Więc przy pierwszym odpaleniu skill zada ci pięć pytań o to, jak brzmisz, i **sam zapisze plik twojego głosu** w vaulcie. Od tej chwili każdy post ciągnie z tego pliku. To zobaczysz na własne oczy za moment, to twój quick win.

**Jak użyć:** "napisz post na LinkedIn: [wrzuć surową myśl]".

### 2. proposal-page - transkrypt z callu w gotową ofertę

Najbardziej biznesowy skill. Bierze surowy transkrypt z callu z klientem i robi z niego lekką, animowaną, jednoplikową stronę HTML z ofertą. Nie statyczny PDF, tylko żywa strona: reveal na scroll, diagram przepływu, respektuje reduced-motion. Design zalockowany (ciepły papier, szmaragdowy akcent), ty dostarczasz tylko treść. Jeden kolor podmienisz na swój, jak zechcesz.

W środku ma mini-panel sędziego (o tym za chwilę, przy demo).

**Jak użyć:** "zrób ofertę HTML z tego transkryptu: [wklej transkrypt]". Nie masz swojego? W paczce jest przykładowy - odpalisz na nim demo.

### 3. hormozi-acquisition - myśli o twoich ofertach jak Alex Hormozi

Tu jest inaczej niż w dwóch poprzednich, i to jest ważne. Tamte ciągną wiedzę z twojego vaulta. Ten ma wiedzę w sobie: frameworki z trzech książek Alexa Hormozi o ofertach, cenach i pozyskiwaniu klientów (Value Equation, Grand Slam Offer, money model). Dlatego działa od pierwszej sekundy, nawet na świeżym systemie.

Pytasz "oceń moją ofertę jak Hormozi", wklejasz ofertę, a on przepuszcza ją przez Value Equation i wskazuje najsłabsze ogniwo. Albo "ile powinienem brać za X" i dostajesz wycenę opartą na frameworku, nie na przeczuciu.

**Jak użyć:** "oceń moją ofertę jak Hormozi: [oferta]" albo "jak wycenić [X]?".

I zapamiętaj, skąd ten skill się wziął, bo to zapowiedź: powstał z książek zamienionych w skilla. W Dniu 4 zrobisz ten sam ruch, tylko materiałem nie będzie książka, a twoja własna robota.

## Twoja kolej: post na LinkedIn w kilka minut

Dość oglądania. Bierzemy linkedin-post-writer, bo jedziesz na surowej myśli, którą już masz w głowie.

1. Wyrzuć jedno surowe zdanie. Cokolwiek, co dziś pomyślałeś o swojej robocie. Bez ładnego formułowania, im surowiej, tym lepiej.
2. Odpal skilla: "napisz post na LinkedIn: [twoja myśl]".

I teraz uwaga, bo za pierwszym razem stanie się coś, co jest sercem tego kursu. Skill zauważy, że nie zna jeszcze twojego głosu, i zada ci pięć pytań: do kogo piszesz, jak brzmisz na luzie, czego nie znosisz w pisaniu, jaki język, na czym się znasz. Odpowiadasz normalnie, własnymi słowami. Z tego skill **zapisze plik twojego głosu w vaulcie** i dopiero potem napisze post.

Przeczytaj wynik na głos. Brzmi jak ty, a nie jak LinkedIn-bot? Działa. Nie podoba się, kasujesz, inna myśl, dwie minuty. U mnie łapie prawie za każdym razem.

Skill nie tylko wziął coś z twojego mózgu. Skill **dopisał do niego** - stworzył plik, którego wcześniej nie było. To jest architektura rękawicy w obie strony: ręka wypełnia rękawicę, ale rękawica potrafi też dołożyć do ręki.

## Twój głos to teraz jeden plik

Zobacz teraz jedno.

Głos, który skill zapisał, to zwykły plik w vaulcie: `2-areas/taste/moj-glos.md`. Otwórz go w Obsidianie. To ty, opisany w kilku linijkach.

Zmień w nim jedno zdanie, na przykład dorzuć "piszę krótkimi zdaniami, zero korpo", i odpal skilla jeszcze raz na tej samej myśli. Post wyjdzie inny. Nie dotknąłeś skilla. Poprawiłeś jedno źródło, a ręka poruszyła rękawicą inaczej.

I to samo źródło zassie każdy kolejny skill do pisania, który dołożysz. Jeden plik głosu, wiele rąk. To ta architektura w akcji, na żywo.

## Demo: transkrypt z callu w ofertę

Teraz drugi skill, na przykładzie z paczki. Otwórz `przyklad-transkrypt-callu.md` (instalator wrzucił go do `3-resources/`). To surowy transkrypt rozmowy z klientką: ktoś wchodzi w słowo, "yyy", trzy razy wraca do tematu. Bałagan, dokładnie taki, jaki dostajesz z realnego callu.

Odpal: "zrób ofertę HTML z tego transkryptu". I patrz, co się dzieje:

- skill wyłapuje z chaosu, co trzeba: problem klientki, koszt, teza rozwiązania, skala,
- pisze oficjalnym tonem, nie generycznym korpo-bełkotem, według frameworków ofertowych w środku,
- zanim pokaże ci wynik, sam siebie osądza: czytelnik-sędzia bez ego przechodzi każdą sekcję i pyta "czy to przekonuje szefa? czy jest konkret, nie ogólnik?", wskazuje najsłabszą i poprawia ją,
- i dopiero wtedy widzisz output: jeden plik HTML, animowana strona-oferta, którą wysyłasz klientowi linkiem.

Ta mini-bramka to zapowiedź czegoś większego. Ta sama głowa, która coś napisała, zawsze powie, że jest dobre - broni tego jak człowiek. Świeże spojrzenie bez ego dostaje jedno zadanie: obal to. I obala. W Dniu 4 wbudujesz taką bramkę we własny skill, żeby słaby output nigdy nie wyszedł pod twoim nazwiskiem. Dziś wystarczy, że wiesz: bramka istnieje i działa.

## Trzeci skill: zapytaj go o swoją ofertę

Skoro masz już świeżą ofertę z proposal-page, przepuść ją przez trzeci skill. Odpal: "oceń moją ofertę jak Hormozi" i wklej treść. Dostaniesz rozbiór przez Value Equation i wskazany najsłabszy punkt, w minutę, na pustym jeszcze vaulcie - bo ten skill nosi wiedzę w sobie.

To domyka trójkę: jeden **tworzy** (post), drugi **sprzedaje** (oferta), trzeci **myśli** (ocena oferty). Trzy różne strony twojej roboty, trzy komendy.

## Twój drugi mózg nie kończy się na tym, co sam napiszesz

Trzy skille z tej lekcji to start. Ale możesz podpiąć cudze najlepsze narzędzia. Ktoś na świecie spędził trzy miesiące, budując idealny research-engine albo idealny gust do frontendu. Pobierasz go i od jutra działa w twoim systemie, na twoim vaulcie.

To moment, w którym twój drugi mózg przestaje być tylko twoją głową i staje się twoją głową plus najlepsze ręce z całej społeczności. Dwie, które chcę ci pokazać:

- **Design Taste do stron** (design-taste-frontend i podobne). Gdy budujesz cokolwiek wizualnego w Claude Code, ten skill stoi nad ramieniem i pilnuje, żeby nie wyszedł kolejny template z 2014 roku. Naturalny partner dla twoich ofert-stron.
- **Last 30 Days Research** (plugin last30days). Zamiast zgadywać, co ludzie myślą o twoim temacie, ten skill sprawdza, co realnie mówią w ostatnie trzydzieści dni: Reddit, X, YT, TikTok, HN. Świeże pain-pointy prosto z ust twojego klienta.

Znajdziesz je po tych nazwach w sieci (GitHub i katalogi skilli Claude Code). Instalacja to dokładnie ten ruch, który znasz z dzisiejszego instalatora: folder skilla ląduje w `.claude/skills/` i działa.

A hormozi-acquisition, którego dziś odpaliłeś, to trzeci przykład tej samej idei: cudza wiedza (trzy książki) zamknięta w skilla. Powstał przez narzędzie **book-to-skill** - bierzesz książkę, którą przeczytałeś, i robisz z niej skilla. Frameworki autora przestają leżeć martwe w PDF i zaczynają pracować za każdym razem. Ten sam mechanizm zamrażania wiedzy w skilla zastosujesz jutro do własnej roboty - w Dniu 4 zamienisz w skilla swój powtarzalny proces.

Nie budujesz jednego narzędzia. Budujesz rękę, do której wpinasz najlepsze rękawice świata, a wszystkie działają na twojej wiedzy.

## Checklist - koniec Dnia 3

- [ ] Rozumiem, że skill to warstwa operacyjna plus odnośnik, a cała robota siedzi w vaulcie
- [ ] Widziałem dwie warstwy: drugi mózg (Obsidian, wiedza) i warstwę operacyjną (Claude Code: CLAUDE.md + `.claude/`, skills = ręce, rules = charakter)
- [ ] Pobrałem paczkę Lekcji 3 i instalator wgrał trzy skille do `.claude/skills/`
- [ ] Odpaliłem quick win: skill zbudował mój plik głosu i napisał post w moim głosie
- [ ] Zajrzałem do `moj-glos.md`, zmieniłem jedno zdanie i zobaczyłem, że output się zmienił
- [ ] Zrobiłem ofertę HTML z przykładowego transkryptu i widziałem, jak skill sam siebie osądza
- [ ] Zapytałem hormozi-acquisition o ofertę i dostałem rozbiór przez Value Equation
- [ ] Wiem, że mogę dopinać cudze skille i pluginy (design taste, last30days, book-to-skill)

## Co dalej

Dziś twoja baza dostała ręce. Odpalasz gotowe skille, produkujesz posty i oferty w swoim głosie, podpinasz najlepsze narzędzia świata. System pierwszy raz pracuje za ciebie.

Przestałeś być notatkowiczem, który tylko zbiera. Nie robisz już roboty ręcznie, dyrygujesz rękami. Dziś jesteś orkiestratorem swojego systemu.

Ale ciągle używasz cudzych rękawic. Działają od pierwszej minuty i to jest spoko. Prawdziwa moc przychodzi wtedy, gdy przestajesz pożyczać i budujesz własną.

To jest Dzień 4. Bierzesz jeden swój realny proces, ten który robisz co tydzień i który cię męczy, i zamieniasz go we własnego skilla. Twoje reguły, twoje formuły, twój głos, wpisane do vaulta. Własna ręka, pod twój dokładny biznes.

Pytanie, z którym cię zostawiam: którą robotę robisz co tydzień ręcznie, chociaż raz ją już opisałeś?

Zapamiętaj odpowiedź. W Dniu 4 zrobimy z niej skilla.
