# 08 · Weryfikacja: smoke-test calego systemu

**Co to stawia:** nic nowego nie buduje - SPRAWDZA, czy wszystko, co postawiles w komponentach 01-07, naprawde zyje. To jest ostatni krok. Przechodzi przez kazda z czterech warstw (WIEDZA / UMIEJETNOSCI / CZAS / GWARANCJE) plus petle samo-uczenia, odpala kazda na zywo i daje ci tabelke PASS/FAIL. Jak cos jest na czerwono - mowi dokladnie co naprawic. Jak wszystko zielone - masz potwierdzone czarno na bialym, ze masz dzialajacy system operacyjny, a nie kolejna biblioteke notatek.

Dlaczego to wazne: standard jakosci brzmi "nic nie jest zrobione, dopoki nie udowodnisz, ze dziala". Latwo uznac setup za skonczony, bo pliki sa na miejscu - a potem przy pierwszym prawdziwym zrodle cos nie laczy. Ten smoke-test lapie to TERAZ, zanim wlozysz do srodka cos wartosciowego.

**Zanim wkleisz - upewnij sie, ze:**
- Claude Code jest odpalony **w folderze twojego vaulta** (`cd ~/twoj-vault && claude`). Caly test operuje na plikach **relatywnie od tego folderu** - zero pelnych sciezek typu `/Users/...`. Jak odpalisz Claude gdzie indziej, test bedzie szukal vaulta w zlym miejscu.
- Obsidian ma otwarty TEN SAM folder ("Open folder as vault"). Te same pliki, dwa okna.
- Przeszedles juz komponenty 01-07 (struktura + CLAUDE.md, skille, git/backup, hooki, lessons). Smoke-test zaklada, ze to wszystko stoi. Jak czegos brakuje - test ci to powie, nie zepsuje.

**Jak uzyc:** skopiuj caly blok ponizej, wklej do Claude Code otwartego w folderze vaulta, wcisnij Enter. Odpowiadasz na jedno pytanie naraz tam, gdzie pyta. Test sam tworzy pare plikow testowych i sam je sprzata na koncu.

---

```text
Jestes moim asystentem przy stawianiu "Drugiego Mozgu". Robisz teraz SMOKE-TEST calego systemu - sprawdzasz, czy wszystko, co postawilem w poprzednich krokach, dziala end-to-end. Nic nowego nie budujesz. Przechodzisz przez kazda warstwe, odpalasz ja na zywo i raportujesz PASS/FAIL.

Pracujemy w folderze, w ktorym jestes uruchomiony (to root mojego vaulta). Wszystkie sciezki sprawdzaj RELATYWNIE od tego folderu (2-areas/, _inbox/, CLAUDE.md, _GUIDE.md, .claude/...) - nigdy pelnych sciezek typu /Users/... ani ~/...

ZASADY PRACY:
- Mow po polsku, prosto i cieplo, jak do kogos kto pierwszy raz to stawia.
- Pytaj o JEDNA rzecz naraz. Czekaj na odpowiedz, zanim zadasz kolejne pytanie.
- Test tworzy 2 pliki testowe (jeden w _inbox/, jeden z em-dashem). ZANIM utworzysz albo usuniesz jakikolwiek plik - powiedz mi co robisz i zapytaj "moge?". Czekaj na zgode. Na koncu sam posprzataj pliki testowe.
- Komendy bash (git, launchctl, python) mozesz odpalac sam, ale ZAWSZE najpierw pokaz mi komende i krotko powiedz co sprawdza.
- Po kazdej warstwie pokaz PROGRES ("Warstwa 2 z 5 sprawdzona") i krotko mnie pochwal za to, co dziala.
- Em-dash (dlugi myslnik) jest zakazany w tym, co piszesz. Uzywaj zwyklego myslnika " - " albo przecinka.
- Zachowaj polskie znaki wszedzie.

ZACZNIJ OD WYJASNIENIA (1 akapit, prostym jezykiem), zanim cokolwiek zrobisz:
"Robimy teraz smoke-test - czyli odpalamy kazdy element systemu po kolei i sprawdzamy, czy zyje. To jak przekrecenie kluczyka w aucie po skladaniu silnika: chcemy uslyszec, ze zapala, ZANIM wyjedziemy na droge. Przejdziemy przez 5 warstw: WIEDZA (czy struktura i CLAUDE.md sa kompletne), UMIEJETNOSCI (czy skille dzialaja - zrobimy probny ingest i probne zapytanie), CZAS (czy git i auto-backup sa ustawione), GWARANCJE (czy hook lapie blad), i SAMO-UCZENIE (czy zapisuje lekcje po korekcie). Na koncu dostaniesz tabelke zielone/czerwone i liste 'co naprawic', jesli cos nie zagra. Stworze po drodze 2 pliki testowe i sam je posprzatam."

Potem zapytaj: "Gotowy? Robimy 5 warstw, na koncu raport." i czekaj na moje "tak".

================================================================
WARSTWA 1 z 5: WIEDZA (struktura + CLAUDE.md + konwencje)
================================================================

Sprawdz po kolei (oznacz kazdy jako [PASS] albo [FAIL] z krotkim komentarzem):

1a. PARA foldery istnieja w roocie: 1-projects/, 2-areas/, 3-resources/, 4-archive/, _inbox/.
1b. Warstwa wiedzy istnieje: 2-areas/knowledge/ z podfolderami sources/, concepts/, entities/, syntheses/.
1c. Pliki rdzenia istnieja: CLAUDE.md, _GUIDE.md, _LOG.md oraz _MOC-knowledge (poszukaj 2-areas/knowledge/_MOC-knowledge.md).
1d. Przeczytaj CLAUDE.md i sprawdz, czy ma 6 sekcji i czy NIE sa puste:
    - ## Structure (tabela gdzie co lezy)
    - ## Quick Rules (numerowana lista regul)
    - ## Self-Modifying Instructions (protokol po korekcie - MUSI miec tresc, nie sam naglowek)
    - ## Workflow Preferences (routing "zapisz" + frontmatter + status flow)
    - ## Knowledge Vault (Reading + Writing + tabela routingu zapisu)
    - ## Quality Standards (verification before done itd. - MUSI miec tresc)
    Szczegolnie sprawdz, ze Self-Modifying Instructions i Quality Standards NIE sa puste (to czeste niedociagniecie).
1e. W CLAUDE.md sprawdz 5 mechanizmow wiringu (sa kluczowe - bez nich CLAUDE.md jest "slepy"):
    - deklaracja zrodla prawdy (ten folder = mozg / source of truth dla wiedzy)
    - pojedynczy root (sciezki relatywne od tego folderu, zero hardcoded /Users/ ani ~/Local/knowledge)
    - tabela Structure wiaze .claude/ z folderami vaulta
    - reguly "read before" (Quick Rules wymuszaja czytanie _GUIDE/MOC przed akcja)
    - tabela routingu zapisu (czego sie nauczyles -> gdzie zapisac)

Po tej warstwie: pokaz mini-podsumowanie (ile PASS / ile FAIL), powiedz "Warstwa 1 z 5 sprawdzona", pochwal i przejdz dalej.

================================================================
WARSTWA 2 z 5: UMIEJETNOSCI (skille - ingest, query, maintenance)
================================================================

2a. Sprawdz, ze 3 foldery skilli rdzenia istnieja w .claude/skills/: vault-ingest, vault-query, vault-linter. W kazdym skill.md sprawdz, czy placeholder {{VAULT_ROOT}} zostal podmieniony na realna sciezke albo na regule "working-dir" - jesli nadal widzisz doslownie "{{VAULT_ROOT}}", to FAIL (skill sie nie self-skonfigurowal).

2b. INBOX STATUS - odpal narzedzie inboxa:
    Komenda: python3 .claude/skills/vault-ingest/scripts/inbox_status.py --action list
    (to samo, co trigger "what's in my inbox"). Jak zwroci liste/statystyki (albo "No _inbox/ directory found") bez bledu - PASS.
    JESLI skrypt zwroci "PyYAML is required: pip3 install pyyaml" (exit 2) - to FAIL z konkretna przyczyna: brakuje biblioteki PyYAML, ktorej potrzebuja oba skrypty (ten i linter). Powiedz mi wprost: "Brakuje PyYAML. Odpal w terminalu: pip3 install pyyaml (to krok z komponentu 05, czesc 0), potem powtorz ten test." To samo dotyczy 2e nizej.

2c. PROBNY INGEST - to najwazniejszy test umiejetnosci:
    - Powiedz mi: "Tworze testowa notatke w _inbox/ do probnego ingestu, moge?"
    - Po zgodzie utworz plik _inbox/test-smoke-ingest.md z prostym frontmatterem (source_type: manual, source_title, clipped) i krotka, sensowna trescia o jakims pojeciu (np. 2-3 zdania o tym, czym jest "spaced repetition" - cokolwiek, byle bylo z czego zrobic concept).
    - Teraz wykonaj na nim pelny ingest (tak jak robi to skill vault-ingest: Phase 1 czytaj _GUIDE.md + _MOC-knowledge, Phase 2 analiza, Phase 3 zapis).
    - Po ingescie sprawdz [PASS]/[FAIL] kazde:
        * powstala source-note w 2-areas/knowledge/sources/ (pelna tresc, analiza na gorze)
        * powstala min. 1 concept page w 2-areas/knowledge/concepts/ z sekcja "## Wszystkie zrodla" linkujaca to zrodlo
        * _MOC-knowledge zostal zaktualizowany (nowy wpis)
        * _LOG.md dostal linijke "ingest"
        * raw z _inbox/ zostal usuniety przez trash (bo pelna tresc zyje teraz w sources/) - nie dumpowany do 4-archive/
    - To jest pelna petla CAPTURE + ORGANIZE. Jak wszystkie 5 PASS - serce systemu dziala.

2d. PROBNE QUERY (retrieve) - sprawdz, czy system odpowiada Z mojej wiedzy:
    - Zadaj systemowi pytanie wzorem reguly QUERY: "Zapytaj moj drugi mozg: o czym jest notatka, ktora przed chwila zingestowalismy?"
    - Sprawdz [PASS]/[FAIL]: czy odpowiedz cytuje zrodlo w formacie [Source: [[plik]]] (a nie odpowiada z glowy modelu). Brak cytowania = FAIL (query nie jest podpiete jako reguła w CLAUDE.md).

2e. PROBNY LINT - odpal linter na calym vaulcie i zapisz raport do inboxa:
    Komenda: python .claude/skills/vault-linter/scripts/lint_vault.py --vault . --format markdown --output _inbox/vault-health-YYYY-MM-DD.md
    (placeholder YYYY-MM-DD podmienia sie sam na dzisiejsza date). Jak powstal raport w _inbox/ i skrypt zwrocil exit 0 lub 1 (bez crasha) - PASS. Pokaz mi krotko, ile bledow / ostrzezen znalazl.
    JESLI skrypt zwroci "PyYAML is required: pip3 install pyyaml" (exit 2) - FAIL z ta sama przyczyna co 2b: brak biblioteki PyYAML. Fix: pip3 install pyyaml (komponent 05, czesc 0), potem powtorz.

Po tej warstwie: mini-podsumowanie PASS/FAIL, "Warstwa 2 z 5 sprawdzona", pochwal, dalej.

================================================================
WARSTWA 3 z 5: CZAS (git + backup)
================================================================

3a. Git czysty/zainicjowany:
    Komenda: git status
    Sprawdz, ze to repo gita (nie "not a git repository"). Jesli sa niezacommitowane zmiany od testu - to OK, zaznacz tylko ze repo zyje.

3b. Remote ustawiony na prywatny backup:
    Komenda: git remote -v
    Sprawdz [PASS]/[FAIL]: czy jest remote (origin) wskazujacy na repo backupu (np. knowledge-vault). Brak remote = FAIL (zero backupu poza komputerem).

3c. Auto-backup zaladowany (launchd):
    Komenda: launchctl list | grep vault-backup
    Sprawdz [PASS]/[FAIL]: czy plist auto-backupu jest zaladowany. Jak nic nie zwroci - FAIL (auto-backup nie chodzi; backup tylko reczny).

Po tej warstwie: mini-podsumowanie, "Warstwa 3 z 5 sprawdzona", pochwal, dalej.

================================================================
WARSTWA 4 z 5: GWARANCJE (hook lapie blad)
================================================================

To test, czy reguly sa egzekwowane jako KOD, nie tylko jako prosba.

4a. Powiedz mi: "Tworze plik testowy z em-dashem, zeby sprawdzic czy hook go zlapie. Moge?"
4b. Po zgodzie zapisz plik testowy (np. 2-areas/test-emdash.md) z poprawnym frontmatterem ALE z celowym em-dashem (dlugim myslnikiem) w tresci. Zapisz go normalnie (Write/Edit), zeby odpalil sie hook PostToolUse.
4c. Sprawdz [PASS]/[FAIL]: czy hook vault_lint_hook.py zareagowal i zwrocil blad (exit 2) wskazujacy na em-dash. Jesli hook MILCZY i plik zapisal sie bez sprzeciwu - to FAIL (warstwa gwarancji nie dziala, reguly sa tylko advisory). Jesli zlapal - PASS, gwarancje zyja.
4d. Niezaleznie od wyniku: powiedz mi, ze zaraz usuniesz plik testowy, i usun 2-areas/test-emdash.md przez trash.

Po tej warstwie: "Warstwa 4 z 5 sprawdzona", pochwal, dalej.

================================================================
WARSTWA 5 z 5: SAMO-UCZENIE (lessons po korekcie)
================================================================

5a. Zasymuluj korekte. Powiedz mi cos w stylu: "Teraz udaje, ze cie poprawiam, zeby sprawdzic petle. Wyobraz sobie, ze powiedzialem: 'nie pisz datami w nazwach plikow roboczych'. Co teraz robisz?"
5b. Wykonaj protokol Self-Modifying: STOP -> sprawdz czy taki wpis juz jest w .claude/rules/lessons.md (zeby nie dublowac) -> jak nie ma, dopisz JEDNA linie w formacie [YYYY-MM-DD] · [regula] pod wlasciwa kategoria -> potwierdz mi regule w jednym zdaniu.
5c. Sprawdz [PASS]/[FAIL]: czy w lessons.md faktycznie przybyla dokladnie jedna linia (pokaz mi ja). Brak nowej linii = FAIL (petla samo-uczenia nie zapisuje).
5d. Posprzataj: usun te testowa linijke z lessons.md (to byla tylko symulacja, nie prawdziwa korekta), zeby plik zostal czysta poczekalnia. Potwierdz, ze usunales.

Po tej warstwie: "Warstwa 5 z 5 sprawdzona", pochwal.

================================================================
SPRZATANIE
================================================================

Przed raportem upewnij sie, ze posprzatales WSZYSTKIE artefakty testowe:
- testowa source-note + concept page + wpisy w _MOC/_LOG z probnego ingestu (2c) - usun je przez trash i cofnij dwa wpisy, ZEBY vault wrocil do stanu sprzed testu. ZAPYTAJ mnie najpierw "moge usunac artefakty probnego ingestu?".
- raport lint w _inbox/ (2e) - zostaw albo usun, jak wolisz (zapytaj).
- plik z em-dashem (4b) - juz usuniety w 4d.
- testowa linijka w lessons.md (5b) - juz usunieta w 5d.
Zostaw vault dokladnie w takim stanie, w jakim byl przed smoke-testem.

================================================================
RAPORT KONCOWY
================================================================

Pokaz mi tabele - warstwa po warstwie, status zbiorczy:

| Warstwa | Status |
|---|---|
| 1. WIEDZA (struktura + CLAUDE.md + 5 mechanizmow wiringu) | PASS / FAIL |
| 2. UMIEJETNOSCI (skille + ingest + query + lint) | PASS / FAIL |
| 3. CZAS (git + remote + auto-backup) | PASS / FAIL |
| 4. GWARANCJE (hook lapie em-dash) | PASS / FAIL |
| 5. SAMO-UCZENIE (lessons po korekcie) | PASS / FAIL |

Pod tabela:
- "CO NAPRAWIC" - lista TYLKO dla pozycji FAIL, kazda z konkretem: co jest nie tak + ktory komponent setup-package (01-07) postawic/poprawic, zeby to naprawic. Np. "Self-Modifying puste -> wroc do komponentu 07. Brak remote -> wroc do komponentu z git/backup. Hook milczy -> sprawdz settings.json i .claude/hooks/ z komponentu hooki. Skrypty skilli rzucaja 'PyYAML is required' -> brak biblioteki PyYAML, odpal pip3 install pyyaml (komponent 05, czesc 0), potem powtorz test."
- Jesli wszystkie PASS, sekcja "CO NAPRAWIC" pusta - napisz "Nic. Wszystko zielone."

================================================================
SATYSFAKCJA (tylko jesli WSZYSTKO PASS)
================================================================

Jak kazda warstwa PASS, pogratuluj mi naprawde (1-2 zdania, ciepło, bez przesady) i powiedz dokladnie to:

"Twoj Drugi Mozg dziala. Masz OS, nie biblioteke - wiedza, umiejetnosci, czas i gwarancje, wszystkie cztery warstwy zyja i gadaja ze soba. Wrzuc teraz pierwsze PRAWDZIWE zrodlo do _inbox/ i napisz 'ingest'. Od tego momentu kazda rzecz, ktora tu wrzucisz, pracuje dla ciebie."

Jak cos jest FAIL - NIE gratuluj. Zamiast tego powiedz spokojnie: "Prawie. Zostala [liczba] rzecz do domkniecia - pokazalem wyzej co i gdzie. Napraw to i odpal ten test jeszcze raz." i wymien krotko co zostalo.

Na sam koniec - niezaleznie od wyniku - pokaz JASNY STAN:
"Masz: [wymien warstwy ktore PASS]. Zostaje: [wymien warstwy ktore FAIL, albo 'nic - setup kompletny']."
```

---

**Stan po tym komponencie:** masz ostatni element pakietu - smoke-test, ktory na zywo udowadnia, ze caly system dziala end-to-end (5 warstw: WIEDZA / UMIEJETNOSCI / CZAS / GWARANCJE / SAMO-UCZENIE), z tabela PASS/FAIL i lista "co naprawic". Wiring i self-config: TAK - test jest w 100% relatywny od working-dir (zero hardcoded sciezek), sprawdza podmiane placeholdera {{VAULT_ROOT}} w skillach, weryfikuje 5 mechanizmow wiringu w CLAUDE.md, uzywa realnych triggerow i komend skilli (inbox_status.py, lint_vault.py --vault ., reguła QUERY z [Source]), i sam sprzata artefakty testowe.
