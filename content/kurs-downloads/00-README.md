# 00 - README: przewodnik po pakiecie "Drugi Mozg"

To jest mapa calego pakietu. Tu zaczynasz, tu wracasz, gdy nie wiesz, co dalej.

---

## 1. Co to za paczka

Stawiasz cale narzedzie myslowe ("drugi mozg") od zera. Jeden folder na dysku, w ktorym zyja Twoje notatki (.md), a Claude Code czyta je i pisze za Ciebie, podczas gdy Obsidian je ladnie pokazuje.

Nie programujesz. Bierzesz gotowy blok tekstu z kolejnych plikow tej paczki, wklejasz do Claude Code, odpowiadasz po ludzku na pytania. Tyle. System rosnie warstwa po warstwie: najpierw struktura wiedzy, potem umiejetnosci (skille), potem siatka bezpieczenstwa (git + backup), potem gwarancje (hooki), na koncu pętla samo-uczenia i rytualy utrzymania.

Po wszystkim masz nie biblioteke notatek, tylko system operacyjny: lapie surowe zrodla i sam je uklada, odpowiada Ci z Twojej wiedzy z cytowaniem, pilnuje wlasnego zdrowia i poprawia sie po kazdej Twojej korekcie.

---

## 2. WYMOG WSTEPNY (zrob to RAZ, zanim cokolwiek wklejisz)

Trzy rzeczy. Spokojnie, kazda jest prosta.

**a) Zainstaluj dwa narzedzia:**
- **Claude Code** - to jest silnik, ktory bedzie czytal i pisal Twoje pliki.
- **Obsidian** - to jest okno, przez ktore patrzysz na swoje notatki (ladnie je renderuje, pokazuje graf, pozwala klikac linki).

**b) Utworz jeden pusty folder na caly system.** Np. `~/drugi-mozg`. W terminalu:

```bash
mkdir ~/drugi-mozg
```

Ten jeden folder to bedzie CALY Twoj mozg. Wszystko wyladuje w srodku: notatki, foldery, konfiguracja, skille. Nic nie jest rozrzucone po dysku.

**c) Powiaz oba narzedzia z TYM SAMYM folderem:**

- **Otworz Claude Code WEWNATRZ tego folderu.** Wchodzisz do folderu i stamtad startujesz:
  ```bash
  cd ~/drugi-mozg
  claude
  ```
- **Otworz Obsidian na tym samym folderze.** W Obsidianie klikasz "Open folder as vault" i wskazujesz dokladnie `~/drugi-mozg`.

**Czemu to jest powiazanie (przeczytaj, to mylace tylko za pierwszym razem):** oba narzedzia patrza teraz na te SAME pliki na dysku, nie na dwie kopie. Edytujesz w jednym, drugie widzi zmiane natychmiast. A folder, z ktorego odpalasz `claude`, staje sie "punktem zero" dla wszystkich sciezek. Dlatego prompty i skille nigdy nie mowia "szukaj w /Users/twoje-imie/...", tylko po prostu "szukaj w `_inbox/`" albo "`2-areas/knowledge/`" - wszystko liczone wzgledem tego jednego folderu. Przeniesiesz folder gdziekolwiek - dalej dziala. Zero rozjazdu sciezek.

> Jedna zasada do konca zycia systemu: **Claude Code odpalaj ZAWSZE z tego folderu** (`cd ~/drugi-mozg && claude`). To jeden warunek, dzieki ktoremu wszystko gra samo.

---

## 3. INSTALACJA SKILLI (reczny drop)

Wiekszosc tej paczki to "wklej prompt, Claude wykona". Skille to jedyny wyjatek - to gotowe PLIKI, ktore najpierw kopiujesz na miejsce wlasnymi rekami, a dopiero potem budzisz promptem.

**Co robisz:** bierzesz folder `skills/` z tej paczki i wrzucasz jego zawartosc (trzy foldery: `vault-ingest`, `vault-query`, `vault-linter`) do `.claude/skills/` w swoim vaulcie.

Terminalem (z roota vaulta), podstawiajac sciezke do rozpakowanej paczki:

```bash
mkdir -p .claude/skills
cp -r "<sciezka-do-paczki>/skills/vault-ingest" .claude/skills/
cp -r "<sciezka-do-paczki>/skills/vault-query"  .claude/skills/
cp -r "<sciezka-do-paczki>/skills/vault-linter" .claude/skills/
```

Albo po prostu przeciagnij te trzy foldery w Finderze do `.claude/skills/`. Bez wklejania czegokolwiek do czatu.

> **Folder `.claude/` siedzi WEWNATRZ Twojego vaulta** (ten sam zunifikowany folder). To celowe - cala konfiguracja jedzie razem z mozgiem.

**O sciezkach nie martwisz sie wcale.** Kazdy skill ma w sobie regule self-config: przy pierwszym odpaleniu sam wykrywa, gdzie lezy Twoj vault (bo Claude jest odpalony z jego roota), a jak cos jest niejednoznaczne - DOPYTA Cie o sciezke, nie zgadnie. Robisz to raz, prompt budzacy skille (krok 3 ponizej) przeprowadza Cie przez to. Dwa skille maja maly skrypt w Pythonie, wiec wczesniej raz instalujesz darmowa biblioteke (`pip3 install pyyaml`) - prompt sam Ci o tym przypomni.

---

## 4. RUN-ORDER (rob dokladnie w tej kolejnosci)

Stawiasz to jak dom: fundament, sciany, dach. Kazda warstwa zaklada poprzednia. **Numery plikow to NIE jest kolejnosc** - idz wedlug numeru kroku w tej liscie.

1. **`01-fundament.md`** - stawia strukture wiedzy (foldery PARA) plus `CLAUDE.md`, czyli konstytucje, ktora Claude czyta przy kazdej rozmowie. Budowane z krotkiego wywiadu o Tobie.
2. **`02-obsidian-wiring.md`** - utrwala konwencje vaulta, zaklada `.gitignore` i wlacza graf. Domyka warstwe WIEDZA od strony okna.
3. **`05-skille.md`** - **TU WRZUCASZ SKILLE** (krok 3 z sekcji wyzej) i je budzisz. Trzy skille rdzenia: ingest (lapie i rozsiewa zrodla), query (odpowiada z Twojej wiedzy z cytowaniem), linter (mechaniczny health-check). Po tym kroku system zaczyna PRACOWAC za Ciebie.
4. **`03-git-backup.md`** - wlacza git ("cofnij" dla kazdego bledu AI) plus prywatne repo na GitHubie i cotygodniowy auto-backup. Siatka bezpieczenstwa.
5. **`04-hooks-gwarancje.md`** - stawia straznika, ktory sprawdza KAZDY zapisywany plik (em-dash, frontmatter) zanim przejdzie. Reguly jako kod, egzekwowane w 100 procentach.
6. **`06-rules.md`** - zaklada `.claude/rules/` (craft pisania, workflow, tozsamosc, klienci) plus `## Quality Standards` w CLAUDE.md. To steruje, JAK Claude pracuje i pisze.
7. **`07-lessons-konstytucja.md`** - stawia pętle samo-uczenia: po kazdej Twojej korekcie Claude zapisuje regule, zeby ten sam blad nie wrocil.
8. **`08-weryfikacja.md`** - smoke-test calosci. Odpala kazda warstwe na zywo i daje Ci tabelke PASS/FAIL z lista "co naprawic".
9. **`10-puls.md`** (tak, plik numer 10 jako krok 9 - numery plikow to nie kolejnosc) - stawia PULS: deterministyczny raport zdrowia vaulta, ktory raz w tygodniu przychodzi SAM na starcie sesji (bledy i czy przybywa, inbox, martwe projekty + propozycje TAK/NIE). Jak padnie, krzyczy "PULS PADL" zamiast milczec. To jest powod, dla ktorego nie musisz pamietac o utrzymaniu.
10. **`09-maintenance-prompt.md`** - dwa cykliczne prompty do WYKONANIA decyzji z pulsu (tygodniowe naprawy + miesieczny audyt lekcji). To rytual, nie jednorazowy setup - wracasz tu, gdy puls przyniesie propozycje.

**Skrot dla niecierpliwych:** `01` -> `02` -> **`05` (wrzucasz skille tutaj)** -> `03` -> `04` -> `06` -> `07` -> `08` -> `10` -> `09` (cyklicznie do konca).

Postawienie fundamentu (01 + 02 + skille) to jakies 30-40 minut. Reszta dochodzi szybciej.

> Jak czegos nie wiesz w trakcie - pytaj Claude. Prompty sa napisane tak, ze prowadzi Cie krok po kroku, jedno pytanie naraz, i sam dopytuje, gdy cos jest niejednoznaczne. Przed kazdym zapisem pliku pokazuje, co chce zapisac, i czeka na Twoja zgode.

---

## 5. Po wszystkim - co masz (pelny "wiezowiec")

Kiedy przejdziesz wszystkie 10 krokow, stoi komplet warstw:

- **WIEDZA** (01 + 02) - struktura PARA, konstytucja `CLAUDE.md`, konwencje, graf w Obsidianie. Vault ma gdzie zyc.
- **UMIEJETNOSCI** (05) - trzy skille rdzenia dzialaja na slowo-wyzwalacz: "ingest" (rozsiewa zrodlo z `_inbox/` po vaulcie), "Zapytaj moj drugi mozg: ..." (odpowiada z Twojej wiedzy, cytujac zrodla), "lint vault" (raport zdrowia w kilka sekund).
- **CZAS** (03) - git plus prywatny backup na GitHubie plus auto-snapshot co poniedzialek. Kazdy blad AI cofniesz, mozg backupuje sie sam.
- **GWARANCJE** (04) - hook sprawdza kazdy zapis. Reguly to kod, nie sugestia, ktora model czasem zapomni.
- **ZACHOWANIE** (06 + 07) - reguly craftu pisania pod kazdym zdaniem plus pętla, ktora uczy sie z Twoich korekt. System poprawia sie sam.
- **KONTROLA + UTRZYMANIE** (08 + 10 + 09) - dowod na zywo, ze wszystko gra, PULS ktory co tydzien sam przynosi raport zdrowia i propozycje, plus prompty do wykonania tych decyzji. Utrzymanie stoi na trzech warstwach: hook pilnuje kazdego zapisu, puls raportuje co tydzien, Ty decydujesz ~10 minut tygodniowo.

To jest OS, nie biblioteka. Od tego momentu kazda rzecz, ktora wrzucisz do `_inbox/` i zingestujesz, pracuje dla Ciebie: system lapie ja, uklada, laczy z reszta wiedzy i oddaje na zawolanie - z cytowaniem, bez konfabulacji.

**Nastepny ruch:** otworz `01-fundament.md` i zacznij. Powodzenia.

---

## See Also

- [[01-fundament]] - krok 1, fundament WIEDZY
- [[02-obsidian-wiring]] - krok 2, domkniecie warstwy WIEDZA
- [[05-skille]] - krok 3, warstwa UMIEJETNOSCI (tu wrzucasz skille)
- [[03-git-backup]] - krok 4, warstwa CZAS
- [[04-hooks-gwarancje]] - krok 5, warstwa GWARANCJE
- [[06-rules]] - krok 6, warstwa ZACHOWANIE
- [[07-lessons-konstytucja]] - krok 7, pętla samo-uczenia
- [[08-weryfikacja]] - krok 8, smoke-test calosci
- [[10-puls]] - krok 9, PULS: raport zdrowia, ktory przychodzi sam
- [[09-maintenance-prompt]] - krok 10, wykonanie decyzji z pulsu (cyklicznie)
