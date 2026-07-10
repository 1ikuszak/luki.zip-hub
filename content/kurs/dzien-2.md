---
slug: dzien-2
day: 2
title: 'Wrzucasz wiedzę, a ona układa się sama'
description: >-
  Wrzucasz notatki, rozmowy, materiały. Automat układa je sam, a trzy warstwy
  utrzymania trzymają to przy życiu.
videoUrl: ''
pdfUrl: ''
published: false
order: 2
---
Masz już strukturę. I wraca myśl, która zabiła każdą twoją wcześniejszą próbę: okej, ale jak to zapełnić, żeby znowu nie zrobił się z tego burdel? To samo pytanie pogrzebało twój Notion i każdy folder na pulpicie: ta notatka pasuje i tu, i tu, więc gdzie ją wrzucić, żebym potem ją znalazł? Klasyczny overthinking.

Dzisiaj nie posegregujesz ani jednej notatki.

Pierwsza rzecz, która sprawia, że system żyje, a nie leży: sam się układa. To pierwszy z czterech narządów Żywego Systemu i dzisiaj włączasz go na stałe.

To jest cała zmiana. Wcześniej twoje notatki umierały, bo to TY musiałeś je sortować, tagować i wpychać w foldery. Po tygodniu odpuszczałeś. Tutaj jest odwrotnie. Mówisz systemowi: "zapisz to". Albo "weź ten artykuł". Albo "pobierz transkrypt z tego wideo i wrzuć w dobre miejsce". Albo "zrób transkrypcję z tego calla z klientem i podłącz pod projekt". Albo "przeczytaj ten brief, przetraw go i podłącz pod projekt". A on robi resztę: streszcza, wyciąga najważniejsze, łączy z tym, co już masz, aktualizuje bazę. Ty tylko wrzucasz.

## Co ogarniesz dzisiaj

Pod koniec tej lekcji masz:
- zainstalowane trzy skille rdzenia - małe automatyzacje, które robią za ciebie powtarzalną robotę (np. ingest: wrzucasz artykuł, a on go streszcza, rozkłada i podpina bez twojego kiwnięcia palcem),
- pierwsze realne notatki w bazie - twoja wiedza, nie cudza teoria,
- połączenia między nimi - żeby AI widziało, co się z czym łączy, i nie zgadywało,
- jasność, na co rozkłada się jedno źródło (źródło, koncept, encja, synteza) - żebyś ufał bazie, bo wiesz, gdzie co siedzi,
- bazę, która zaczyna ci ODPOWIADAĆ twoją wiedzą, z cytatami z twoich notatek, zamiast generykiem z modelu,
- trzy warstwy utrzymania (w tym puls, który dziś włączysz na stałe) i uczciwą matematykę, czemu każda twoja poprzednia próba umarła.

I ani razu nie posortujesz niczego ręcznie.

## Skille, które robią robotę za ciebie

Żeby baza układała się sama, potrzebuje dwóch rzeczy. Dostajesz je w paczce tej lekcji, gotowe do wgrania.

- **ingest** bierze cokolwiek wrzucisz - artykuł, transkrypt, notkę - i rozkłada to na wiedzę: streszczenie, najważniejsze koncepty, osoby i narzędzia, plus połączenia z resztą bazy. Ma jedną ważną rzecz: bramkę. Bramka to filtr na wejściu - nie wszystko wpada do bazy. To, co jest dla ciebie wartościowe, ląduje w środku. Śmieć wylatuje, z podanym powodem. Gdy system nie jest pewny, pyta ciebie. Bez tej bramki drugi mózg zamienia się w śmietnik z ładną strukturą.
- **lint** to przegląd techniczny twojej bazy. Odpalasz, gdy chcesz sprawdzić, w jakim jest stanie. Skanuje całość i oddaje raport: ile notatek wisi bez połączeń, co gnije, co zalega. Jedna liczba mówi ci, czy baza idzie w dobrą stronę. I ważne: lint nie naprawia po cichu za twoimi plecami. Wskazuje, ty klepiesz decyzję, system wykonuje.

To one robią automatyczną robotę. Ty nie segregujesz, tylko wrzucasz.

W paczce siedzą jeszcze dwie rzeczy. Trzeci skill, który poznasz za chwilę, gdy baza zacznie ci odpowiadać. I puls - cotygodniowe badanie krwi twojej bazy. Rozbierzemy go pod koniec lekcji, bo to on trzyma cały system przy życiu.

### Postaw to u siebie (10-15 minut)

**Krok 1. Pobierz paczkę Lekcji 2**

{{POBIERZ_LEKCJE}}

Jeden plik: `lekcja-2-skille-rdzenia.zip`. W środku trzy skille rdzenia i instrukcja pulsu. Nie musisz go rozpakowywać ani otwierać. Zostaw go w Pobranych albo przenieś na Pulpit - oba miejsca działają, Claude sam go znajdzie.

**Krok 2. Otwórz Claude Code tam, gdzie wczoraj**

W Antigravity otwierasz folder `drugi-mozg` (ten sam co w Lekcji 1), odpalasz terminal i wpisujesz `claude`. Jedna zasada na całe życie systemu: Claude Code odpalasz zawsze z folderu swojego drugiego mózgu. Wtedy wszystko gra samo.

**Krok 3. Wklej instalator i odpowiadaj**

Kopiujesz cały blok poniżej (przycisk Kopiuj w rogu), wklejasz do Claude Code i wciskasz Enter. Claude znajdzie paczkę, wgra skille, sprawdzi, czy masz Pythona (a jak nie masz, przeprowadzi cię przez instalację), obudzi każdy skill i włączy puls. Przed każdym zapisem zapyta o zgodę.

```
Jesteś moim przewodnikiem po Lekcji 2 kursu "Drugi Mózg". Wczoraj stanął fundament (struktura PARA + CLAUDE.md) w TYM folderze. Dziś instalujesz mi trzy skille rdzenia i włączasz puls.

Zasady na całą sesję:
- Pisz po polsku, prosto i ciepło, bez żargonu. Tłumacz jak komuś, kto widzi to pierwszy raz.
- Pytania zadawaj JEDNO NARAZ i czekaj na moją odpowiedź.
- Zanim utworzysz albo nadpiszesz jakikolwiek plik, pokaż krótko co chcesz zapisać i zapytaj o zgodę.
- Po każdym kroku pokaż progres ("KROK 2 za nami, zostały 3") i jedno zdanie, co właśnie zyskałem.
- Ścieżki wewnątrz systemu zawsze względne od tego folderu. Wyjątek: szukanie paczki w kroku 1.
- Nie używaj długiego myślnika (em-dash). Zwykły "-" albo przebuduj zdanie.

KROK 0 - SPRAWDŹ TEREN
Upewnij się, że jesteśmy w folderze z fundamentem z Lekcji 1: mają tu być foldery 1-projects, 2-areas, 3-resources, 4-archive, _inbox oraz pliki CLAUDE.md i _GUIDE.md. Czegoś brakuje? Zatrzymaj się i powiedz mi wprost: albo jestem w złym folderze (pomóż mi znaleźć dobry), albo trzeba najpierw dokończyć Lekcję 1.

KROK 1 - ZNAJDŹ PACZKĘ
Pobrałem plik lekcja-2-skille-rdzenia.zip. Poszukaj go w moim folderze Pobrane (Downloads) i na Pulpicie (Desktop). Przeglądarka mogła zmienić nazwę, np. na "lekcja-2-skille-rdzenia (1).zip" - jeśli jest kilka, weź najnowszy. Jeśli nie znajdziesz, zapytaj mnie gdzie go zapisałem, nie zgaduj. Rozpakuj do .claude/kurs/lekcja-2/ (utwórz ten folder). Po rozpakowaniu potwierdź, że w środku są: folder skills/ z trzema podfolderami (vault-ingest, vault-query, vault-linter) i plik 10-puls.md.

KROK 2 - WGRAJ SKILLE
Skopiuj trzy foldery skilli z .claude/kurs/lekcja-2/skills/ do .claude/skills/ (utwórz, jeśli nie istnieje). Potem pokaż mi zawartość .claude/skills/ jako dowód, że wszystkie trzy są na miejscu.

KROK 3 - PYTHON I TRZY BIBLIOTEKI
Dwa skille mają w sobie małe skrypty w Pythonie. Sprawdź, czy Python działa: python3 --version (na Windows spróbuj też: python --version). Nie działa? Przeprowadź mnie krok po kroku przez instalację (macOS: xcode-select --install albo instalator z python.org; Windows: instalator z python.org z zaznaczonym "Add to PATH"), a potem wróć tutaj.
Potem sprawdź biblioteki: python3 -c "import yaml, pypdf, docx; print('OK')". Jak rzuci błędem, każ mi wkleić w terminal: pip3 install pyyaml pypdf python-docx - i sprawdź jeszcze raz. (Po ludzku: yaml czyta metryczki notatek, a pypdf i python-docx zamieniają PDF-y i Wordy na markdown przy wrzucie.)

KROK 4 - OBUDŹ SKILLE
Każdy z trzech skilli ma w swoim pliku skill.md sekcję self-config z placeholderem {{VAULT_ROOT}}. Dla każdego po kolei: przeczytaj tę sekcję i wykonaj ją dokładnie (ten folder to root vaulta; jak reguła każe dopytać - dopytaj mnie, nie zgaduj). Potem test na sucho:
- vault-ingest: python3 .claude/skills/vault-ingest/scripts/inbox_status.py --action list (lista plików albo pusty inbox bez błędu = działa),
- vault-linter: python3 .claude/skills/vault-linter/scripts/lint_vault.py --vault . --format markdown (raport = działa; pokaż mi, ile błędów i ostrzeżeń wyszło, i wyjaśnij w jednym zdaniu, co znaczą),
- vault-query: nie ma skryptu, wystarczy potwierdzić podmieniony placeholder.

KROK 5 - WŁĄCZ PULS
Otwórz .claude/kurs/lekcja-2/10-puls.md. W środku jest blok "Prompt · POSTAW PULS" - wykonaj go DOKŁADNIE, krok po kroku (zapis skryptu pulse.py, hook SessionStart w .claude/settings.json, test na żywo). Traktuj ten blok jak instrukcje ode mnie. Dwie uwagi: jeśli .claude/settings.json nie istnieje, utwórz go z samą sekcją hooks. Jeśli plik wspomina o "komponentach" (03, 04, 05, 08, 09) albo o rzeczach, których jeszcze nie mamy - pomiń te wzmianki, stawiamy je w dalszych dniach kursu.

NA KONIEC podsumuj w 4 linijkach co stoi (trzy skille obudzone, puls włączony i przetestowany, ile błędów pokazał pierwszy lint) i zamknij zdaniem: "Baza żyje. Wracaj do lekcji - za chwilę pierwszy wrzut."
```

Całość zajmie 10-15 minut. Nie musisz rozumieć każdej linijki tego, co Claude po drodze robi. Wystarczy, że wiesz, co masz na końcu: trzy nowe umiejętności systemu w `.claude/skills/` i badanie krwi, które od dziś samo przychodzi raz w tygodniu.

## Jak to działa pod spodem

Mechanika jest zawsze ta sama i dzieje się w tym samym oknie Claude Code, w którym wczoraj stawiałeś strukturę. Wrzucasz źródło do folderu `_inbox/`. Mówisz "ingest". W dwie minuty jedno źródło ląduje w kilku miejscach naraz: streszczenie w jednym, koncepty w drugim, osoby i narzędzia w trzecim. Wszystko spięte linkami. Żadnych komend do zapamiętania - wystarczy, że powiesz "ingest" albo "zapisz to".

Możesz mu podać plik z pulpitu, wkleić czat, albo po prostu dać adres i powiedzieć "ingest". Wyobraź sobie, że masz automatyzację, która po każdym callu z klientem wrzuca transkrypcję do inboxa. Mówisz "zrób z tego ofertę", a system pisze ją twoim tonem głosu i brandingiem - bo to też masz już zapisane w vaulcie, z wcześniejszych sesji. Nie wchodzę tu za głęboko. Chcę tylko, żebyś już teraz zobaczył, gdzie to prowadzi.

## Cztery rodzaje wiedzy (gdzie co ląduje)

Nie musisz tego pamiętać, system robi to za ciebie. Ale warto wiedzieć, co się dzieje pod spodem, bo wtedy ufasz bazie.

Jedno źródło rozkłada się na maksymalnie cztery rodzaje notatek. Jeden z nich jest powodem, dla którego w ogóle to budujesz, więc od niego zacznę.

**Synteza** to twój wniosek. Nie pochodzi z jednego źródła. Łączy cudzą wiedzę z twoim światem: twoim produktem, twoją robotą, twoją decyzją. To twój sąd na górze - twoje "co to znaczy dla MNIE". Źródła zbierze każdy, te same artykuły leżą w internecie dla wszystkich. Ale syntezy nikt ci nie podrobi, bo nikt nie ma twojego kontekstu. To ta jedna warstwa, która zamienia cudzą wiedzę w coś, co należy tylko do ciebie.

Przykład. Masz w bazie pięć źródeł o cold outreach i notatkę o tym, jak sam sprzedajesz. Chcesz z tego napisać ofertę. Mówisz "zrób mi syntezę: jak robić cold outreach pod mój model". System bierze te pięć źródeł, przepuszcza przez twoją notatkę o sprzedaży i oddaje jeden wniosek dopasowany do ciebie. Mówisz "dodaj to" i wniosek ląduje w bazie jako synteza. Od teraz, gdy piszesz ofertę, AI sięga po nią, nie po pięć surowych artykułów.

Pozostałe trzy to fundament, na którym synteza rośnie.

**Źródło** to cały materiał, który wrzuciłeś - pełna treść, z linkami i obrazkami, bez streszczania. Twoja kopia, zostaje na zawsze. Ląduje w wiedzy, nie w archiwum, bo skoro to wrzuciłeś, jest dla ciebie ważne.

**Koncept** to temat. Pięć artykułów o jednej rzeczy to nie pięć chaosów, tylko jeden koncept, który linkuje wszystkie pięć. Przykład: masz siedem źródeł o content strategy - zamiast siedmiu luźnych notatek masz jeden koncept "content strategy", który je wszystkie spina i rośnie z każdym kolejnym wrzutem.

**Encja** to konkretna rzecz: osoba, narzędzie, firma. Klient też. Raz opisana, podpina się sama wszędzie, gdzie o niej wspomnisz. Opisujesz klienta raz, a każda nowa notatka o nim podłącza się pod tę jedną kartę.

Skrót: źródła to cegły, koncept to ściana z nich, encje to ludzie i narzędzia w tej historii, synteza to twój sąd na górze. Osobno to tylko posegregowane notatki. Razem robią coś, czego żadna z osobna nie potrafi: gdy pytasz AI o cokolwiek, ono nie zgaduje - sięga po twoje źródła, twój koncept i twój wniosek naraz i odpowiada twoją głową. Wyobraź sobie, że masz w jednym miejscu przetrawioną wiedzę Dana Koe, Navala i Scotta Adamsa, spiętą z twoim własnym stylem pisania. Nie kopie ich postów - ich sposób myślenia, połączony z twoim. To robią te cztery warstwy razem.

Jedna rzecz myli najczęściej: koncept kontra encja. Prosty test. Da się to wskazać palcem, ma stronę albo twarz? To encja, czyli narzędzie albo osoba. To sposób myślenia albo metoda? To koncept. "Claude Code" to encja. "Praca pętlami" to koncept.

Synteza działa inaczej niż reszta - nie robi jej automat. Tworzysz ją tylko wtedy, gdy masz dwie rzeczy naraz: PYTANIE i powód, po co ci odpowiedź (bo piszesz posta, ofertę, podejmujesz decyzję). Masz jedno i drugie? Odpalasz syntezę. Nie masz? Zostaje źródło plus koncept i tyle, nie robisz roboty bez powodu. Ta jedna zasada trzyma najwyższą warstwę bazy czystą: same wnioski, które czemuś służą, zamiast sterty przemyśleń, których nikt nigdy nie otworzy.

## Na żywo: wrzuciłem 9 artykułów o jednym temacie

Pokażę ci to na czymś, co zrobiłem naprawdę, w tym tygodniu.

Pojawił się nowy trend w AI, "loop engineering", czyli projektowanie pętli, które pracują za ciebie. Zebrałem o tym dziewięć artykułów z X. Normalnie wylądowałyby w zakładkach i zginęły.

Policz, ile by mnie kosztowało zrobienie z tego porządku ręcznie. Przeczytać dziewięć artykułów, wypisać z każdego najważniejsze, założyć notatkę na temat, podlinkować osoby i narzędzia, posegregować w folderach. Liczyłem na sobie: około czterdziestu minut samej segregacji, zanim w ogóle ruszę z myśleniem.

Zamiast tego wrzuciłem je i powiedziałem "ingest". W kilka minut:
- dziewięć pełnych artykułów wylądowało jako dziewięć źródeł, z całą treścią, linkami i obrazkami,
- zrobił się jeden koncept "loop engineering", który linkuje wszystkie dziewięć w jednym miejscu,
- narzędzie, które przewijało się w artykułach, dostało własną kartę-encję.

Ja nie posortowałem ani jednego pliku.

Potem zrobiłem jeszcze jeden ruch, już nie automatyczny. Miałem pytanie: czym się różnię od tego trendu i co z tego sprzedaję. Wiedziałem, czemu odpowiedź służy. Więc poprosiłem o syntezę i dopiero wtedy powstała: mój sąd, spięty z moim produktem. Z samego ingestu synteza nie wychodzi i ma nie wychodzić.

A jak dziś tego używam? Mówię po prostu "loop engineering", a AI wchodzi w ten koncept. Jeśli chcę głębiej, samo ocenia, czy sięgnąć do konkretnego artykułu. Nie muszę mu mówić, gdzie co leży.

Otwórz po czymś takim graf w Obsidianie i widzisz to na oczy: dziewięć kropek-źródeł spiętych z jednym konceptem, obok karta narzędzia. Jedno źródło nie ląduje w jednym pliku, dotyka kilkunastu. Nowy artykuł o kliencie podłącza się pod notatkę o tym kliencie, pod projekt, pod koncept, który już kiedyś zapisałeś. I żadnej z tych linii nie narysowałeś ty. Robi to ingest przy każdym wrzucie, a jeśli jakaś notatka mimo to zostanie sama, wyłapie ją cotygodniowy raport i podpinasz ją jednym TAK.

I teraz najlepsze. Jak dziś mówię AI "napisz mi reel o loopach, z moim kątem", ono nie czyta dziewięciu surowych artykułów. Czyta koncept i syntezę, czyli już przetrawiony, mój punkt widzenia. Wiedza, którą wrzuciłem raz, pracuje za mnie za każdym razem, gdy jej potrzebuję.

Skąd AI wie, gdzie tego szukać? Nie musisz mu mówić. Przeszukuje bazę po nazwach plików i połączeniach (to się nazywa grep - szukanie po nazwach), więc ty podajesz tylko cel, a ono samo trafia do właściwych notatek. Pamiętasz CLAUDE.md z wczoraj? Ten plik AI czyta na starcie każdej rozmowy, a w nim jest linijka, że twój system jest połączony z bazą w Obsidianie. Dlatego nie musisz za każdym razem przypominać "mam vault, korzystaj z niego" - ono już to wie.

I dlatego output nie jest generyczny. Goły model odpowiada każdemu tak samo, bo nikogo nie zna. Ten zna mój produkt, moje decyzje i mój kąt, bo to wszystko leży w bazie i rośnie z każdym wrzutem.

Czterdzieści minut segregacji w dwie minuty wrzutu, i punkt widzenia, który czeka gotowy na następne użycie. Tego zakładka nie zrobi nigdy.

## Twój pierwszy wrzut

Teraz ty. Znajdź dwie albo trzy rzeczy, które gdzieś ci wiszą: artykuł z otwartej od tygodnia zakładki, notatka z telefonu, wklejony czat. Cokolwiek, co uznasz za warte zatrzymania.

Dwie drogi, obie proste:
- **Plik albo tekst:** przeciągnij plik do folderu `_inbox/` (w Antigravity albo w Obsidianie) i powiedz w Claude Code: "ingest". Możesz też wkleić tekst prosto do czatu i powiedzieć "zapisz to".
- **Link:** wklej adres do czatu i powiedz "ingest to". Claude sam ściągnie treść i przepuści ją przez bramkę.

Format nie ma znaczenia. PDF, Word, strona, goły tekst - wrzucasz, co masz, a ingest najpierw zamienia wszystko na markdown, natywny język twojej bazy. Pamiętasz z Dnia 1: markdown to format, który AI czyta od ręki, a Obsidian pięknie renderuje. Dlatego baza trzyma wiedzę tylko w nim. Masz wybór formatu? Wrzucaj od razu markdown albo czysty tekst - zero konwersji po drodze, zero strat.

Patrz, co się dzieje. Najpierw bramka: system oceni, czy to w ogóle jest warte twojej bazy, a przy niepewności zapyta, nie zgadnie. Potem rozkład, dokładnie taki, jaki widziałeś wyżej: źródło, koncept, encje, połączenia.

Na koniec otwórz graf w Obsidianie (ikona grafu w lewym pasku). Kilka kropek i pierwsze linie między nimi. Żadnej z tych linii nie narysowałeś ty. Tak wygląda baza, która się układa sama - dziś w skali trzech notatek, za rok w skali tysiąca.

## Zadaj pytanie swojemu drugiemu mózgowi

Do tej pory baza tylko łapała i układała. Teraz zaczyna ci ODPOWIADAĆ.

To pierwszy raz, gdy realnie z niej korzystasz. I to jest drugi narząd Żywego Systemu. Nie produkujesz jeszcze, to przyjdzie jutro. Dziś robisz coś prostszego i bardziej zaskakującego: pytasz swój vault o cokolwiek, a on odpowiada wyłącznie z tego, co sam tam wrzuciłeś. Nie z internetu, nie z głowy modelu. Z twojej wiedzy.

Do tego służy trzeci skill z paczki: query. Obudziłeś go razem z resztą. Wpisz w Claude Code, w tym samym oknie, w którym robiłeś ingest:

```
Zapytaj mój drugi mózg: [TWOJE PYTANIE]
```

To hasło budzi skilla. Pod spodem robi on cztery ruchy: otwiera mapy twojej bazy (MOC), zawęża szukanie po słowach kluczowych, czyta tylko trafione notatki i składa odpowiedź WYŁĄCZNIE z nich. Ma zakodowane dwie żelazne reguły: każde twierdzenie musi nosić źródło, a jak czegoś w bazie nie ma, mówi wprost "tego nie ma w twoim drugim mózgu", zamiast zgadywać.

Patrz, co wróciło. Przy każdym zdaniu siedzi `[Source: ...]`, czyli dokładna notatka, z której AI to wzięło. To nie kosmetyka. To dowód. Cytat mówi ci, że ta odpowiedź wyszła z TWOJEJ bazy, a nie z modelu, który zgaduje i brzmi pewnie. Zdanie bez cytatu to generyk, którego nie chcesz. Zdanie z cytatem to twoja wiedza, podana z powrotem, gdy jej potrzebujesz.

Sprawdź to na czymś, na co masz już notatki. Zapytaj o temat, który dodałeś skillem ingest w tej lekcji. Dostaniesz odpowiedź z odnośnikami do swoich źródeł. Zapytaj o coś, czego w bazie nie ma, a system powie "tego nie mam", zamiast wymyślać. To właśnie ta dyscyplina robi różnicę między drugim mózgiem a zwykłym chatbotem.

I teraz pętla, która domyka całość. Jeśli odpowiedź jest naprawdę dobra, nie zostawiaj jej w oknie czatu, bo zniknie razem z nim. Powiedz "zapisz to jako syntezę". Twój własny wniosek wraca do bazy jako nowa notatka. Następnym razem, gdy o to zapytasz, system odpowie jeszcze mocniej, bo ma teraz nie tylko cudze źródła, ale i twój przetrawiony sąd. Baza karmi się własnymi odpowiedziami i z każdym pytaniem robi się mądrzejsza.

## Czemu poprzednie próby umarły (i czemu ta nie)

Twój poprzedni system nie miał tego, co zaraz włączysz. Dlatego umarł. To kosztuje dziesięć minut w tygodniu - zaraz zobaczysz, czemu aż tyle i czemu tylko tyle.

Znasz ten schemat. Pierwszy tydzień szło dobrze, wrzucałeś, segregowałeś, czułeś się ogarnięty. Potem zrobiło się tego więcej, notatki przestały się łączyć, narosły sieroty i duplikaty, baza zaczęła gnić od środka. W końcu odpuściłeś, bo wejście w ten bałagan bolało bardziej niż postawienie wszystkiego od nowa.

To nie był brak dyscypliny. To matematyka. Każdy ręczny system im większy, tym więcej trzeba w nim sprzątać. Robota utrzymania rośnie szybciej niż wartość, którą z bazy wyciągasz - i przychodzi moment, w którym sprzątanie kosztuje więcej, niż jesteś gotów dać. Wtedy człowiek odpuszcza. Zawsze. Dlatego utrzymanie to nie dodatek do drugiego mózgu. To jego serce.

"Od teraz sprząta AI, ty nic nie robisz" to bajka, sam ją sobie opowiadałem. Mój system miał agenta od sprzątania, a bałagan i tak urósł. Powód był głupio prosty: raport o bałaganie lądował w pliku, którego nigdy nie otwierałem. Alarm, który wyje w pustym pokoju, to nie alarm. Dlatego utrzymanie stoi tu na trzech warstwach - każda pilnuje czego innego i każda ma innego wykonawcę.

**Warstwa pierwsza: reguły zakodowane na twardo (hook).** Hook to mała bramka, która odpala się sama przy każdym zapisie i wymusza regułę maszynowo - zero pamiętania, zero dobrej woli. Przykład z mojego systemu: mam hook, który przy każdym zapisie pilnuje, żeby notatka miała połączenia i poprawny format, i blokuje zapis, jeśli czegoś brakuje. Ustawiasz raz, pilnuje każdego zapisu, czy patrzysz, czy nie. U ciebie ta warstwa stanie w Dniu 5 - tam zobaczysz, jak twoja własna korekta awansuje do niej.

**Warstwa druga: puls.** Raz w tygodniu system sam robi bazie badanie krwi: ile błędów i czy przybywa, co zalega w inboxie, które projekty umarły. Nie ty to odpalasz - przychodzi samo, na starcie sesji w Claude Code, czyli dokładnie tam, gdzie i tak pracujesz. Żadnego raportu w pliku, którego nikt nie otwiera. Włączyłeś go dziś z paczką: pierwszy raport przywita cię za tydzień, a jak chcesz podejrzeć już teraz, powiedz Claude'owi "odpal puls ręcznie". I cecha, za którą lubię go najbardziej: cisza jest niemożliwa. Jak badanie padnie, zobaczysz "PULS PADŁ" zamiast niczego. Albo widzisz zdrowie bazy, albo widzisz, że pomiar padł. Trzeciej opcji nie ma.

**Warstwa trzecia: twoje decyzje. Dziesięć minut w tygodniu.** Puls nie przynosi ci roboty, tylko propozycje: "te trzy projekty wyglądają na martwe, archiwizuję?", "dziesięć najstarszych rzeczy zalega w inboxie, przerabiamy?". Klepiesz TAK albo NIE. Nie sprzątasz - decydujesz. Sprzątanie, po twoim TAK, robi system.

## Zobacz, gdzie to idzie

Dziś twoja baza to kilka notatek. Wygląda skromnie i tak ma być.

Ale to rośnie w jedną stronę. Im więcej wrzucasz, tym gęstsza siatka i tym mądrzejsze twoje AI, bo ma z czego korzystać. Struktura z wczoraj jest zrobiona tak, że dołożysz tysiąc notatek i wciąż wiesz, gdzie co jest - każda rzecz zna swoje miejsce, a skille pilnują reszty.

I jeszcze jedno, o czym mało kto mówi. Modele będą coraz lepsze, ale to nie one są twoją przewagą. Sam model jest ten sam dla wszystkich. Przewagę robi to, co go otacza: twoje dane, twój kontekst, twoja infrastruktura. Za gigabajt miejsca na dysku płaciło się na początku lat 80. około pół miliona dolarów. Dziś płacisz dwa centy. Przechowywanie twojej wiedzy jest praktycznie darmowe, a to właśnie dane i systemy wokół modelu decydują o wyniku, nie sam model. Dlatego postawienie tego systemu to nie zabawa na teraz. To infrastruktura, która rośnie sama, w tle, z każdą rzeczą, którą wrzucasz. Dzień pierwszy to baza. Za rok to coś, czego nikt ci nie odtworzy, bo nikt nie ma twojego kontekstu.

## Co dalej

Dziś wiedza wpada i układa się sama. Baza zaczęła ci odpowiadać z cytatami z twoich notatek. A utrzymanie stoi na trzech warstwach, z których tylko jedna jest tobą. Przeszedłeś z kogoś, kto zbiera notatki, na kogoś, kto ma kurowaną bazę z własnym badaniem zdrowia.

To dwa pierwsze narządy Żywego Systemu. Notatka wrzucona to notatka wchłonięta i poukładana. Pytanie zadane to odpowiedź z twojej wiedzy, z cytatami. Cmentarz notatek nie robi żadnej z tych rzeczy.

W następnej lekcji baza przestaje tylko odpowiadać i zaczyna PRODUKOWAĆ. Te same skille, plus kolejne, zaczną pisać, researchować i robić briefy z twojej wiedzy, w twoim stylu. Dorzucimy też mechanizm, który pilnuje, żeby słaby output nigdy nie wyszedł pod twoim nazwiskiem. Tu zaczyna się moment, w którym AI realnie pracuje za ciebie.

## Checklist - koniec Dnia 2
- [ ] paczka Lekcji 2 pobrana, instalator przeszedł do końca: trzy skille (vault-ingest, vault-query, vault-linter) siedzą w `.claude/skills/`
- [ ] puls włączony - test pokazał raport na ekranie i plik `_PULS.md`
- [ ] 1-2 realne źródła wrzucone i zingestowane
- [ ] otworzyłeś graf i widzisz połączenia
- [ ] rozumiesz 4 rodzaje wiedzy: źródło, koncept, encja, synteza (i kiedy synteza: masz pytanie + wiesz, czemu służy)
- [ ] zapytałeś swój drugi mózg i w odpowiedzi jest przynajmniej jeden [Source: ...] prowadzący do notatki, którą sam wrzuciłeś
- [ ] rozumiesz trzy warstwy utrzymania: hook pilnuje zawsze, puls raportuje co tydzień, ty decydujesz 10 minut
