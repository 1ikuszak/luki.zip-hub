# 09 · Weekly maintenance + miesieczny audyt lekcji (zapisane prompty)

**Co to stawia:** domyka petle MAINTENANCE - te jedna, ktora wszyscy pomijaja i dlatego ich systemy z czasem umieraja (martwe linki, sieroty, zapomniane projekty, lekcje ktore puchna). To NIE skill ani jednorazowy setup. To dwa GOTOWE prompty do wklejania **cyklicznie**, jak rytual.

> **Jak to gra z PULSEM (komponent 10):** puls raz w tygodniu SAM przynosi ci raport i propozycje. Ty nie musisz pamietac o tym rytuale - to raport ci o nim przypomina. Gdy puls zaproponuje naprawy albo widzisz, ze bledy przybywaja, wklejasz Prompt A. Puls = sygnal, ten komponent = wykonanie.

1. **WEEKLY-MAINTENANCE (raz w tygodniu)** - 4 kroki: LINT (odpal linter, napraw bledy) -> CROSS-REF (dodaj brakujace linki za ostatni tydzien) -> PRUNE (martwe notatki do `4-archive/`) -> STALE (oznacz projekty `status: active` nietykane ponad 14 dni). Plus opcjonalna synteza (5 pokrewnych notatek -> 1) i raport do `_LOG.md`.
2. **MIESIECZNY AUDYT LEKCJI (pierwszy poniedzialek miesiaca)** - przeglad `lessons.md`: znajdz duplikaty, znajdz wpisy z trwalym domem, zaproponuj graduacje, po zatwierdzeniu wpisz reguly do domow + dopisz absolwentow do archiwum + usun z poczekalni. Zostaja tylko meta-reguly.

Po co to: lint sam (deterministyczny skrypt z komponentu skills) lapie tylko bledy mechaniczne. Cross-ref, prune i synteza wymagaja OSADU - dlatego to prompt do Claude'a, nie skrypt. Lint + osad razem = vault zostaje zywy, nie zamienia sie w cmentarz notatek.

**Zanim wkleisz - upewnij sie, ze:**
- Claude Code jest odpalony **w folderze twojego vaulta** (`cd ~/twoj-vault && claude`). Prompt operuje na vaulcie **relatywnie od tego folderu** - linter dostaje `--vault .`, notatki sa pod `1-projects/`, `2-areas/`, `_inbox/`, `_LOG.md`. Zero pelnych sciezek typu `/Users/...` ani `~/...`.
- Obsidian ma otwarty TEN SAM folder ("Open folder as vault"). Te same pliki, dwa okna - jak naprawisz cos przez Claude, w Obsidianie widzisz to od razu.
- Masz juz wgrany skill `vault-linter` (z komponentu skills) - prompt go odpala. Jak go nie masz, postaw najpierw skille, potem wroc tu.
- Masz juz `lessons.md` (postawiony w komponencie 07) - audyt go czyta. Jak go nie masz, to drugi prompt jeszcze nie ma czego audytowac.

**Jak uzyc:** to sa DWA osobne prompty. Skopiuj ten, ktory odpalasz teraz, wklej do Claude Code otwartego w folderze vaulta, wcisnij Enter. WEEKLY-MAINTENANCE odpalaj co tydzien (np. w poniedzialek rano). AUDYT LEKCJI - raz w miesiacu, pierwszy poniedzialek. To rytual, nie jednorazowa instalacja.

---

## Prompt A · WEEKLY-MAINTENANCE (co tydzien)

```text
Jestes moim asystentem przy utrzymaniu "Drugiego Mozgu". Robimy COTYGODNIOWY przeglad konserwacyjny w 4 krokach: LINT, CROSS-REF, PRUNE, STALE. Na koncu opcjonalna synteza i raport do dziennika. To jest rytual - robimy go co tydzien, zeby vault nie zgnil.

Pracujemy w folderze, w ktorym jestes uruchomiony (to root mojego vaulta). Wszystkie sciezki podawaj i uzywaj RELATYWNIE od tego folderu - linter dostaje "--vault .", notatki sa pod "1-projects/", "2-areas/", "_inbox/", dziennik to "_LOG.md". Nigdy nie uzywaj pelnych sciezek typu /Users/... ani ~/...

ZASADY PRACY:
- Mow po polsku, prosto i cieplo, jak do kogos kto nie jest technicznym.
- Pracuj krok po kroku. Po kazdym kroku pokaz PROGRES ("Krok 2 z 4 gotowy") i krotko mnie pochwal.
- Zanim COKOLWIEK przeniesiesz, usuniesz albo zmienisz w pliku - POKAZ mi co i zapytaj "moge?". Czekaj na zgode. Wyjatek: samo CZYTANIE i odpalenie lintera (skanowanie) nie wymaga pytania.
- Jesli czegos nie jestes pewny (czy notatka jest naprawde martwa, gdzie dodac link) - ZAPYTAJ mnie jedno pytanie naraz, nie zgaduj.
- Em-dash (dlugi myslnik) zakazany. Uzywaj zwyklego myslnika " - " albo przecinka.
- Zachowuj polskie znaki wszedzie.

ZACZNIJ OD ZDANIA: "Robie cotygodniowy przeglad konserwacyjny - 4 kroki. Lece." Potem od razu KROK 1.

---

KROK 1 z 4: LINT (zdrowie vaulta)

Odpal linter na calym vaulcie i zapisz raport do inboxa:

  python .claude/skills/vault-linter/scripts/lint_vault.py --vault . --format markdown --output _inbox/vault-health-YYYY-MM-DD.md

(Placeholder YYYY-MM-DD w sciezce podmieni sie sam na dzisiejsza date.)

Przeczytaj raport. Streszczenie mi po ludzku:
- ile bledow (errors) i jakie typy (np. zepsute linki, brak frontmatter, dlugi myslnik),
- ile ostrzezen (warnings) i jakie (np. sieroty, dlugie pliki, malo linkow).

Potem zaproponuj naprawe BLEDOW (errors to "musi byc naprawione"). Pokaz mi liste konkretnych poprawek i zapytaj "naprawiam?". Po zgodzie napraw. Ostrzezenia (warnings) zostaw na pozniej, chyba ze ktoras jest banalna do poprawienia teraz.

Potwierdz: "Krok 1 z 4 gotowy - linter przeszedl, bledy naprawione." i przejdz dalej.

---

KROK 2 z 4: CROSS-REF (dodaj brakujace linki za ostatni tydzien)

Znajdz notatki utworzone albo zmienione w ostatnim tygodniu (po polu "updated" w frontmatter albo dacie pliku). Dla nich sprawdz, czy nie brakuje oczywistych polaczen:
- czy notatka linkuje do swojego parent MOC (i czy MOC ja wymienia)?
- czy wspomina pojecia/osoby/projekty, ktore maja juz swoja notatke w vaulcie, a nie sa podlinkowane wikilinkiem [[...]]?
- czy ma sekcje "See Also" na dole (2-5 linkow)?

Dla kazdej brakujacej koneksji ZAPROPONUJ mi konkretny link (gdzie, do czego, dlaczego ma sens) i zapytaj "dodaje?". Po zgodzie dodaj wikilinki i uzupelnij "See Also". Pamietaj: minimum 3 wikilinki na notatke, zero sierot.

Potwierdz: "Krok 2 z 4 gotowy - brakujace linki za ten tydzien dodane." i przejdz dalej.

---

KROK 3 z 4: PRUNE (martwe notatki -> archiwum)

Znajdz notatki, ktore sa juz martwe albo nieaktualne: status "outdated", projekty oznaczone jako zakonczone, duplikaty, rzeczy ktore wyraznie sie zdezaktualizowaly.

WAZNE: niczego nie KASUJESZ. Martwe notatki PRZENOSISZ do "4-archive/" (archiwum jest zywym miejscem, nie smietnikiem - wracamy tam realnie). Surowych zrodel z "_inbox/" tez nie ruszaj na sile - inbox czysci tylko ingest.

Dla kazdej notatki, ktora chcesz przeniesc, POKAZ mi ja (nazwa + 1 zdanie dlaczego martwa) i zapytaj "przenosze do 4-archive?". Nie zgaduj - jak masz watpliwosc czy cos jest jeszcze potrzebne, ZAPYTAJ mnie. Po przeniesieniu zaktualizuj parent MOC (usun/przenies wpis), zeby nie zostala sierota ani zlamany link.

Potwierdz: "Krok 3 z 4 gotowy - martwe notatki w archiwum, MOC-i posprzatane." i przejdz dalej.

---

KROK 4 z 4: STALE (oznacz porzucone projekty)

Znajdz w "1-projects/" projekty ze "status: active" w frontmatter, ktorych nikt nie tknal od ponad 14 dni (po polu "updated"). To kandydaci na porzucone - albo trzeba je ruszyc, albo zamknac.

Dla kazdego takiego projektu napisz mi: nazwa + od ilu dni cisza. Potem zapytaj, co z nim zrobic:
- ruszyc dalej (zostaje active),
- zamknac (-> status archived, przeniesc do 4-archive),
- oznaczyc jako uspiony (dopisz w notatce krotki znacznik "STALE od {data} - czeka na decyzje").

Zrob to, co zdecyduje, jeden projekt naraz. Nie podejmuj decyzji za mnie.

Potwierdz: "Krok 4 z 4 gotowy - porzucone projekty oznaczone/rozwiazane." i przejdz do domkniecia.

---

OPCJONALNIE (zapytaj, czy chce): SYNTEZA

Jesli widzisz 5 albo wiecej pokrewnych notatek (concepts/sources) wokol jednego tematu, ktore razem ukladaja sie w wieksza calosc - zaproponuj mi zlozenie ich w JEDNA notatke-synteze (z linkami do zrodel, ktore zostaja). To na zadanie, nie automatycznie. Zapytaj "widze klaster X, zlozyc w synteze?" i czekaj na decyzje.

---

DOMKNIECIE: raport do dziennika + stan

Dopisz JEDNA linie do "_LOG.md" (append-only, na koniec pliku) w formacie:
  ## [YYYY-MM-DD] lint | weekly maintenance: {X bledow naprawionych}, {Y linkow dodanych}, {Z notatek do archiwum}, {N projektow stale}

Na koniec napisz mi krotko i z energia, co zrobilismy i jaki jest stan:

"Gotowe. Cotygodniowy przeglad zrobiony:
- LINT: {X} bledow naprawionych, vault zdrowy.
- CROSS-REF: {Y} brakujacych linkow dodanych.
- PRUNE: {Z} martwych notatek w archiwum.
- STALE: {N} porzuconych projektow oznaczonych/rozwiazanych.
Raport poszedl do _LOG.md.

MASZ: vault posprzatany na ten tydzien, zero martwych linkow, projekty pod kontrola.
ZOSTAJE: po prostu wroc tu za tydzien (to rytual). A raz w miesiacu, w pierwszy poniedzialek - odpal AUDYT LEKCJI (Prompt B), zeby lessons.md tez nie spuchl."

Pamietaj przez caly czas: jedno pytanie naraz przy watpliwosci, pokazuj zanim ruszysz plik, chwal po kazdym kroku, em-dash zakazany, polskie znaki zostaja.
```

---

## Prompt B · MIESIECZNY AUDYT LEKCJI (pierwszy poniedzialek miesiaca)

```text
Jestes moim asystentem przy utrzymaniu "Drugiego Mozgu". Robimy MIESIECZNY AUDYT pliku lessons.md - poczekalni z regulami, ktore zebraly sie z moich korekt. Cel: zeby plik nie puchnl. Kazda regula, ktora ma trwaly dom (skill, notatka w vaulcie, linter), ma tam "graduowac". W poczekalni zostaja TYLKO meta-reguly o tym, jak ze mna pracowac.

Pracujemy w folderze, w ktorym jestes uruchomiony (to root mojego vaulta). Wszystkie sciezki RELATYWNIE od tego folderu - lekcje to ".claude/rules/lessons.md", archiwum to "4-archive/lessons-archive-{rok}.md", konstytucja to "CLAUDE.md". Nigdy pelnych sciezek typu /Users/... ani ~/...

ZASADY PRACY:
- Mow po polsku, prosto i cieplo.
- Pokazuj PROGRES ("Krok 2 z 4 gotowy") i krotko chwal.
- Niczego nie przenosisz ani nie usuwasz z lessons.md, dopoki nie POKAZESZ mi pelnej propozycji i nie powiem "zatwierdzam".
- Em-dash zakazany. Polskie znaki zostaja.

ZACZNIJ OD ZDANIA: "Robie miesieczny audyt lekcji. Cztery kroki - i obiecuje, ze nic nie usune bez twojej zgody." Potem KROK 1.

---

KROK 1 z 4: Znajdz duplikaty

Przeczytaj caly ".claude/rules/lessons.md". Potem przeskanuj, czy ktorys wpis nie jest juz pokryty gdzie indziej:
- w CLAUDE.md (Quick Rules, Workflow Preferences),
- w innych plikach .claude/rules/,
- w opisach skilli (.claude/skills/*/skill.md),
- w notatkach vaulta (2-areas/, 3-resources/).

Wypisz mi liste: "ten wpis = duplikat tego, co juz jest w {plik}". Potwierdz: "Krok 1 z 4 gotowy - duplikaty znalezione."

---

KROK 2 z 4: Znajdz wpisy z oczywistym trwalym domem

Przejdz przez pozostale wpisy i dla kazdego oceN, gdzie naprawde powinien zamieszkac:
- mechanicznie sprawdzalny (np. "zawsze taki format", "nigdy em-dash") -> hook / linter,
- skill-specyficzny (dotyczy konkretnego skilla) -> do tego skill.md (sprawdz, czy juz tam nie ma),
- wiedza o domenie / kliencie -> notatka w vaulcie (2-areas/),
- meta-regula jak ze mna pracowac, bez lepszego domu -> ZOSTAJE w lessons.md.

Wypisz mi tabelke: wpis -> proponowany dom. Potwierdz: "Krok 2 z 4 gotowy - kazdy wpis ma przypisany dom."

---

KROK 3 z 4: Zaproponuj graduacje (i czekaj na zgode)

Z kroku 1 i 2 zloz mi JEDNA czytelna propozycje:
- ktore wpisy graduuja i DOKAD (do jakiego pliku),
- ktore zostaja w poczekalni (meta-reguly),
- ktore to czysty duplikat do skasowania (bo juz sa gdzie indziej).

Pokaz to jako liste i zapytaj: "Zatwierdzasz cala graduacje, czy cos zmieniamy?" CZEKAJ na moja zgode. Nie ruszaj jeszcze zadnego pliku.

Potwierdz po mojej zgodzie: "Krok 3 z 4 gotowy - plan graduacji zatwierdzony."

---

KROK 4 z 4: Wykonaj graduacje

Dopiero teraz, po mojej zgodzie:
1. Wpisz reguly do ich nowych domow (skill.md / notatka vaulta / linter - tam, gdzie ustalilismy). Pokaz mi kazdy zapis przed zrobieniem.
2. Dopisz absolwentow do "4-archive/lessons-archive-{rok}.md" (podstaw aktualny rok) - kazdy z DATA dzisiejsza i adnotacja, dokad poszedl ("[data] · {regula} -> graduowala do {dom}").
3. Usun zgraduowane i duplikaty z lessons.md.
4. W lessons.md ZOSTAW tylko meta-reguly wspolpracy + caly szkielet (naglowek, cykl zycia, prompt audytu, kategorie). Plik ma chudnac, nigdy sie nie zerowac.

Na koniec napisz mi z energia:

"Gotowe. Audyt lekcji zrobiony:
- {A} regul graduowalo do swoich domow (skille / vault / linter).
- {B} duplikatow skasowanych (bo juz byly gdzie indziej).
- {C} meta-regul zostalo w poczekalni.
Absolwenci zapisani w 4-archive/lessons-archive-{rok}.md z data.

MASZ: lessons.md chudy i zywy - tylko reguly o tym jak ze mna pracowac. Wiedza poszla tam, gdzie jej miejsce.
ZOSTAJE: wroc tu za miesiac (pierwszy poniedzialek). A co tydzien - WEEKLY-MAINTENANCE (Prompt A)."

Pamietaj: pokazuj zanim ruszysz plik, czekaj na zgode przy graduacji, em-dash zakazany, polskie znaki zostaja.
```

---

## Opcja zaawansowana (na pozniej, gdy system dojrzeje)

Jak juz oba rytualy beda ci wchodzic w nawyk, mozesz czesc z nich zautomatyzowac - zeby vault sam sie lintowal w nocy, bez twojego udzialu. Sluzy do tego **headless Claude** (`claude -p "..."`) odpalany przez `launchd` (Mac) albo `cron`. Wazne: to dziala na twojej **subskrypcji**, nie zjada platnych kredytow API. Przyklad nocnego auto-lintu:

```bash
claude -p "Odpal vault-linter (python .claude/skills/vault-linter/scripts/lint_vault.py --vault . --format markdown --output _inbox/vault-health-$(date +%F).md), napraw oczywiste bledy, dopisz linie do _LOG.md" --allowedTools "Read,Edit,Bash"
```

To tylko wzmianka - cala warstwa headless to osobny, pozniejszy komponent pakietu. Cross-ref, prune, audyt lekcji i tak rob z reki, bo wymagaja twojej decyzji.

---

**Stan po tym komponencie:** masz domknieta warstwe MAINTENANCE - dwa rytualy utrzymaniowe (tygodniowy przeglad + miesieczny audyt lekcji), ktore trzymaja vault zywy zamiast pozwolic mu zgnic. To jest ta jedna petla, ktora odroznia "OS" od "biblioteki notatek".
