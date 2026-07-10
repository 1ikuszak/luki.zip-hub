---
slug: dzien-5
day: 5
title: 'System, który uczy się własnych błędów (i nie umiera)'
description: >-
  System wersjonuje się, uczy z własnych błędów i rośnie z tobą, zamiast umrzeć
  po dwóch miesiącach. Domknięcie kursu.
videoUrl: ''
pdfUrl: ''
published: false
order: 5
---
Twój wczorajszy skill wali ten sam błąd od nowa. Poprawiłeś go dziś, jutro odpalasz to samo zadanie i błąd wraca, jakbyś przy nim nie siedział. Skill nie odłożył tej poprawki nigdzie. Odłożyłeś ją w swojej głowie, a twoja głowa to kiepski dysk.

Pomyśl, ile razy w tym tygodniu poprawiłeś AI to samo. "Nie tak, za długie." "Nie, konkret, nie ogólnik." AI grzecznie poprawia i za każdym razem zapomina. Następna rozmowa, ten sam błąd, ta sama twoja korekta. Dopóki pamięcią systemu jesteś ty, system nie jest skończony.

Dziś to się kończy. System zaczyna pamiętać, sam się backupuje i uczy się na własnych potknięciach. To czwarty, ostatni narząd Żywego Systemu i jutro, które obiecałem wczoraj.

## Co domkniesz dzisiaj

Trzy filary:

- **Pamięć**: skorygujesz system raz i zobaczysz na ekranie, że zapamiętał regułę.
- **Skala bez chaosu**: dziesięć skilli się nie rozjedzie, bo reguły awansują same, a nadmiar wycinasz testem dryfu.
- **Trwałość**: podepniesz backup, który chroni rok roboty przed padniętym dyskiem.

## Korekta do Reguły

Mechanizm nazywam Korekta do Reguły. Poprawiasz system raz, mówisz "nie tak, miało być X". On nie tylko nanosi poprawkę. Zapisuje ją jako trwałą regułę. A najczęstsze reguły awansują tam, gdzie egzekwują się same.

Pokażę na własnym, najdłużej mierzonym błędzie.

Nie używam długich myślników. Nigdy, to mój znak rozpoznawczy: zwykły dywiz albo przecinek. A AI wciska długie myślniki w co drugie zdanie. Więc powiedziałem raz, wprost:

```
Nie tak. Nie używam długich myślników, nigdy. Tylko zwykły dywiz albo przecinek. To stała zasada, zapamiętaj ją na przyszłość.
```

System robi wtedy trzy ruchy. Najpierw sprawdza, czy podobnej reguły już nie ma, żebyś po miesiącu nie miał dwudziestu wersji tej samej zasady. Jest podobna? Aktualizuje wpis. Nie ma? Zapisuje nową, jedną linijką z datą i kategorią, do osobnego pliku. To poczekalnia reguł. U mnie plik nazywa się `lessons.md` i leży w `.claude/rules/`. Stawiałeś system z mojej paczki, to już go masz. Nie masz, załóż teraz: pusty plik, jedna linia nagłówka. Na końcu system potwierdza jednym zdaniem, "zapisane, pilnuję". I to jest moment, w którym przestaję być jego pamięcią.

Teraz uczciwie. Czy myślniki zniknęły? Nie. Po trzech miesiącach z regułą w pliku policzyłem: 985 naruszeń.

Bo reguła w pliku to wciąż pamięć, nie mechanizm. Model czyta ją i stosuje w dziewięciu przypadkach na dziesięć. Dziesiąty przecieka. Przy setkach zapisów tygodniowo ten dziesiąty raz to prawie tysiąc przecieków w kwartał.

Więc reguła dostała awans. "Zero długich myślników" da się sprawdzić maszynowo: albo myślnik jest, albo go nie ma, zero uznaniowości. Regułę sprawdzalną zero-jedynkowo kodujesz w hook. Hook to mała bramka, odpala się sama przy każdym zapisie, skanuje tekst i jak znajdzie myślnik, zatrzymuje go. Nie prosi. Zatrzymuje.

Gotowego strażnika do wklejenia masz już teraz: w [pakiecie startowym na stronie kursu](/drugi-mozg/kurs#pakiet), plik "04 - Hooks gwarancje". Wklejasz prompt, Claude stawia hook i testuje go przy tobie.

Policzyłem po kilku tygodniach z hookiem: 7 przecieków. Nie zero, bo hook nie widzi rzeczy pisanych poza systemem. Ale 985 do 7 to nie poprawa. To zmiana natury reguły, z "system powinien pamiętać" na "system nie umie zapomnieć".

Złap tę drabinę, bo to cała dzisiejsza lekcja w trzech linijkach:

- reguła w głowie dryfuje, zapominasz jej,
- reguła w pliku pamięta 9 na 10, dziesiąty przecieka (u mnie 985 razy w kwartał),
- reguła w hooku egzekwuje się sama (u mnie 7 przecieków, wszystkie spoza zasięgu bramki).

Self-annealing to winda, która wozi reguły w górę tej drabiny. Korekta wchodzi na dole jako linijka. Ta, która się powtarza i da się sprawdzić maszynowo, jedzie na górę i staje się prawem.

## Protokół w konstytucji

Jest jeszcze jeden plik, który robi z tego system, nie nawyk. Twój CLAUDE.md, ten z pierwszego dnia, to konstytucja. Wklejasz do niego jeden protokół - do sekcji `## Self-Modifying Instructions`, którą instalator z Dnia 1 zostawił pustą dokładnie na ten moment:

```
Po każdej mojej korekcie ("nie tak", "miało być inaczej"):
1. Sprawdź, czy podobna reguła już jest w lessons.md - jeśli tak, zaktualizuj ją, nie dubluj.
2. Jeśli nie ma, dopisz JEDNĄ linię: data, kategoria, zasada.
3. Potwierdź mi jednym zdaniem, że zapisane, i dopiero wtedy rób dalej.
```

Od teraz nie musisz pamiętać, żeby kazać mu zapisywać. Zapisuje sam, bo tak każe mu własne prawo. Wczoraj widziałeś, że skill czyta twój vault w locie, świeży, nie zamrożoną kopię. To ten sam ruch, piętro wyżej. System czyta swoje reguły w locie, dopisujesz dziś, gra od następnej rozmowy, bez przebudowy.

Jedna różnica względem wczoraj. Wczoraj poprawiałeś jednego skilla, żeby łapał błąd sam. Dziś poprawiasz cały system. Reguła z pliku działa wszędzie, na każdym skillu, w każdej rozmowie. Wczoraj nauczyłeś jeden instrument. Dziś uczysz całą orkiestrę naraz.

## Dom dla reguł: `.claude/rules/`

Pamiętasz dwie warstwy z Dnia 3: drugi mózg to wiedza, warstwa operacyjna to instrukcje i narzędzia. W warstwie operacyjnej obok `skills/` (ręce) siedzi drugi folder, o którym obiecałem, że wrócimy: `rules/`. To charakter twojego systemu. I lessons.md nie mieszka samotnie, tylko właśnie tam:

```tree-claude
.claude/rules/
├── writing-craft.md   masz od Dnia 1 - reguły craftu pod każdym zdaniem
├── lessons.md         masz od Dnia 1 - dziś ożywa: każda korekta = jedna linia
├── workflow.md        u mnie: jak system pracuje - u ciebie wyrośnie z audytu
└── identity.md        u mnie: kim system jest - u ciebie wyrośnie z audytu
```

Różnica między CLAUDE.md a `rules/` jest prosta. CLAUDE.md to konstytucja: krótka, mówi kim system jest i gdzie co leży. `rules/` to ustawy: szczegółowe reguły per dziedzina, czytane w każdej rozmowie tak samo automatycznie. Konstytucja mówi "pisz zgodnie z writing-craft", ustawa trzyma konkretne reguły pisania. Dzięki temu podziałowi konstytucja nie puchnie, a każda reguła ma swój adres.

I teraz rozwiązanie zagadki z Dnia 1. Instalator wgrał ci wtedy dwa pliki do `rules/` i obiecałem, że wyjaśnię je dzisiaj. writing-craft.md to mój starter: osiem reguł pisania, uniwersalna fizyka zdania, nie mój prywatny styl - dlatego działa u ciebie od pierwszego dnia i dlatego twój system nie brzmi jak AI-bełkot. W środku jest m.in. zakaz długiego myślnika, który znasz z początku tej lekcji. Każda reguła zarabia na swoje miejsce albo leci: nie zgadzasz się z którąś, wywal ją albo przepisz. To twój system, nie mój.

Drugi plik to lessons.md - pusta poczekalnia, która dziś ożyła: od teraz każda twoja korekta wpada tam jako jedna linia. Czego ci NIE dałem, to głosu. Mój my-writing-voice siedzi u mnie w vaulcie i tam zostanie, bo cudzy głos to kostium. Twój wyrośnie sam, korekta po korekcie, dokładnie przez ten plik.

Kiedy co gdzie, jedno zdanie: obowiązuje zawsze i wszędzie - `rules/`. Potrzebne przy konkretnej robocie (głos, wiedza, reguły ofertowe) - vault, skill sam po to sięgnie. I nie zakładaj plików na zapas: gdy w poczekalni zbierze się kilka reguł o jednym temacie, przeniesiesz je do własnego pliku - o tym przenoszeniu jest następna sekcja.

## Feedback loop: miesięczny audyt

Plik reguł to poczekalnia, nie dom. Raz w miesiącu robisz jeden przegląd, w którym każesz systemowi zobaczyć, co się powtarza. Dokładny prompt:

```
Audyt lessons.md: (1) znajdz duplikaty z CLAUDE.md/rules/skilli/vaulta, (2) znajdz wpisy z oczywistym trwalym domem, (3) zaproponuj graduacje, (4) po zatwierdzeniu: wpisz do domow, dopisz absolwentow do archiwum z data, usun z lessons. Zostaw meta-reguly.
```

System przechodzi listę i sprawdza, która reguła ma już lepszy dom:

- reguła o jednym skillu ląduje w środku tego skilla,
- reguła o kliencie albo dziedzinie idzie do notatki w vaulcie,
- kilka reguł o jednym temacie (np. pisanie) dostaje własny plik w `rules/`, tak u mnie urósł writing-craft.md,
- reguła mechaniczna jedzie windą na górę i staje się hookiem, jak myślnik.

W poczekalni zostają tylko zasady, które wymagają sądu. Tu jest sedno feedbacku: coś powtórzone 10 razy to pattern, nie przypadek, a pattern awansuje. Aktualizujesz stałą regułę, bazę wiedzy albo sam skill, i przez to skille robią się lepsze, a cały system leci w górę.

Ważne: audytu nie automatyzujesz cronem. Wybór domu to sąd, robota agenta plus twoje zatwierdzenie. I nigdy nie zerujesz pliku, bo meta-reguły współpracy to stali mieszkańcy.

Ta sama winda działa dla decyzji, nie tylko dla korekt. Pamiętasz puls z Dnia 2, cotygodniowy raport z propozycjami, które klepiesz TAK albo NIE? Klepiesz jakiś typ TAK dwa-trzy tygodnie z rzędu bez wahania? Ta decyzja jest w rzeczywistości regułą, więc system przestaje pytać i zaczyna robić. Autonomii nie włączasz jednym przełącznikiem. System zarabia ją sobie, decyzja po decyzji.

## Odejmowanie: druga połowa

Wszystko do tej pory było dokładaniem: nowa reguła, hook, skill. Tu jest pułapka. System gnije od nadmiaru tak samo, jak baza gniła od bałaganu w drugiej lekcji. Każdy dobudowuje, mało kto wywala. A u mnie usuwanie to była większość realnej roboty utrzymania.

Narzędzie nazywam testem dryfu. Bierzesz komponent, co do którego masz wątpliwość, i pozwalasz mu gnić. Nie ruszasz go. Jak po kilku tygodniach nic się nie psuje i nawet nie zauważyłeś, że go nie ma, wywalasz go bez żalu. To był balast.

Dwa przykłady z jednego tygodnia. Wyleciał automatyczny spis całej bazy, który kosztował 81 tysięcy tokenów przy każdym odpaleniu, a nie czytał go nikt, ani ja, ani agent. Wyleciała reguła stylu, która pilnowała moich zasad pisania tam, gdzie leżą cudze źródła, czyli pilnowała złej warstwy: cudzych tekstów się nie poprawia, bo przestają być źródłem.

Ta druga jest najciekawsza, bo siedziała w moim własnym strażniku porządku. Strażnik też się myli, więc raz na jakiś czas kwestionujesz samą regułę pytaniem "czy ta zasada w ogóle ma sens w tym miejscu". Usunięcie złej reguły to też self-annealing. System uczy się nie tylko nowych zasad. Uczy się, które zasady były błędem.

## Backup: padnięty dysk nie zabierze ci roku

Cały twój drugi mózg to pliki tekstowe na dysku. To była zaleta przez cały kurs, ale znaczy też, że jeden padnięty dysk i znika wszystko. Zamykamy ten strach w cztery minuty. Narzędzie nazywa się git i daje dwie rzeczy naraz.

Pierwsza: wersjonowanie. Git pamięta każdą wersję systemu w czasie. Siedział pod spodem od pierwszego dnia, dziś zaprzęgasz go świadomie. AI namieszało w dwudziestu plikach i zepsuło coś, czego nie chcesz? Jeden ruch i wracasz do wersji sprzed bałaganu. Nie boisz się dać systemowi grzebać szeroko, bo zawsze masz drogę powrotu.

Druga: backup poza komputerem. Zakładasz prywatne repo, kopię systemu w chmurze. Dysk padnie, laptop zginie, siadasz przy nowym, ściągasz repo i masz wszystko co do notatki. Rok roboty nie zależy od jednego kawałka sprzętu.

Cały setup przechodzisz jednym promptem: w [pakiecie startowym na stronie kursu](/drugi-mozg/kurs#pakiet), plik "03 - Git backup". Claude prowadzi cię krok po kroku - git, prywatne repo, cotygodniowy auto-backup.

Cadence solo jest banalny. Raz w tygodniu mówisz "zapisz wersję" i tyle. System sam commituje po większych sesjach, a ten cotygodniowy ruch to siatka bezpieczeństwa. Nie rób tego co trzydzieści minut, bo zaśmiecisz historię szumem. Dwa polecenia, spokojny sen.

## Dokąd to skaluje

Krótko, żebyś wiedział, że droga idzie dalej. To, co masz teraz, to system z pamięcią błędów i jednym, dwoma skillami. U mnie urosło w pipeline, gdzie jeden agent pisze brief reela, drugi ocenia go jak sędzia, trzeci poprawia, a całość spina się w łańcuch, który chodzi sam. Ja mówię "zrób" i patrzę, czy wyszło. Nie budujesz tego dziś. To kierunek, tam ta droga prowadzi, gdy twój system dojrzeje.

## Checklist - koniec Dnia 5 (i koniec kursu)

Sprawdź stany, nie czynności:

- [ ] raz skorygowałeś system i zobaczyłeś regułę zapisaną w pliku reguł (z datą i kategorią)
- [ ] sprawdziłeś w NOWEJ rozmowie (świeże okno), że system złapał regułę sam, bez przypominania
- [ ] masz w CLAUDE.md protokół: po każdej korekcie zapisz regułę, dopiero potem dalej
- [ ] wiesz, gdzie reguły mieszkają (`.claude/rules/`) i czym różni się konstytucja (CLAUDE.md) od ustaw (rules/)
- [ ] rozumiesz drabinę reguł: głowa dryfuje, plik pamięta 9 na 10, hook egzekwuje sam
- [ ] znasz prompt miesięcznego audytu i wiesz, że coś powtórzone 10x = pattern do awansu
- [ ] wiesz, kiedy decyzja graduuje: klepiesz TAK 2-3 tygodnie z rzędu = reguła w przebraniu
- [ ] wytypowałeś jeden komponent-kandydata do testu dryfu i zapisałeś datę sprawdzenia (za 3 tygodnie)
- [ ] git podpięty: wersjonowanie (cofasz zły ruch) + prywatne repo (backup poza komputerem)
- [ ] znasz cadence solo: raz w tygodniu "zapisz wersję"

## Co dalej

Napisz mi, co ci siadło, a co nie. Kurs dalej aktualizuję i twój feedback realnie go zmienia.

## Domknięcie: kim jesteś teraz

Pięć dni temu każda twoja poprawka ginęła razem z zamkniętym oknem czatu. Dziś masz system, który układa się, pisze i uczy się po tobie, sam, w tle.

Rok temu ledwo ogarniałem jeden projekt naraz. Dziś prowadzę pięć równolegle, bo pamięć trzyma system, nie ja, i biorę robotę, której wtedy bym nie tknął.

Reszta zaczyna każdą rozmowę od zera i klepie te same poprawki w kółko. Ty niesiesz ze sobą pamięć, która z każdą korektą awansuje tam, gdzie egzekwuje się sama. Korekta, którą zapisałeś dziś, będzie pilnować każdego zapisu także w przyszłym styczniu. Nie zaczniesz od zera już nigdy.

Nie skończyłeś kursu o notatkach. Zmieniłeś to, kim jesteś w pracy z AI. Leć dalej, twórz swoje rzeczy.
