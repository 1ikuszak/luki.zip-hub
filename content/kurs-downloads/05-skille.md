# 05 - Trzy skille rdzenia (warstwa UMIEJĘTNOŚCI)

**Co stawia:** wgrywa do Twojego vaulta 3 skille, które zamieniają archiwum notatek w system, który PRACUJE za Ciebie. To jest warstwa, której brakuje większości tutoriali - bez niej masz tylko ładnie poukładaną bibliotekę. Z nią Claude łapie surowe źródło, rozsiewa je po vaulcie, odpowiada z Twojej wiedzy i pilnuje jej zdrowia.

Trzy skille rdzenia:
- **`vault-ingest`** - pętla CAPTURE + ORGANIZE. Bierze jedno źródło z `_inbox/` i rozsiewa je multi-target (source-note + concept page + entity page + cross-refy + update MOC + wpis w `_LOG`). Słowo-wyzwalacz: "ingest".
- **`vault-query`** - pętla RETRIEVE. Pyta Twój drugi mózg, odpowiada WYŁĄCZNIE z Twojej wiedzy z cytowaniem `[Source: [[plik]]]`, a brak w bazie mówi wprost. Słowo-wyzwalacz: "Zapytaj mój drugi mózg: ...".
- **`vault-linter`** - mechaniczny rdzeń pętli MAINTAIN. Deterministyczny health-check (zepsute linki, sieroty, em-dashe, frontmatter), poniżej 5 sekund, zero modelu. Słowo-wyzwalacz: "lint vault".

> **Czemu skille robisz inaczej niż resztę pakietu.** Pozostałe komponenty to "wklej prompt, Claude wykona". Skille to gotowe PLIKI - najpierw je kopiujesz na miejsce (`.claude/skills/`), a dopiero potem budzisz promptem. Trzy części poniżej prowadzą Cię przez to po kolei: najpierw zależność (Python), potem kopiowanie folderów, potem obudzenie.

---

## CZĘŚĆ 0 - Zależność: PyYAML (zrób RAZ, zanim obudzisz skille)

Dwa skille mają w sobie mały skrypt w Pythonie: `vault-ingest` używa `inbox_status.py` (lista i statystyki `_inbox/`), a `vault-linter` używa `lint_vault.py` (health-check). Oba czytają frontmatter notatek, a do tego potrzebują jednej darmowej biblioteki - **PyYAML**. Na świeżym Macu jej zwykle nie ma. Bez niej skrypty nie wystartują.

Zainstaluj ją jedną komendą w terminalu (tym samym, z którego odpalasz Claude) - razem z dwiema opcjonalnymi siostrami, dzięki którym ingest zamienia PDF-y i Wordy na markdown przy wrzucie (skrypt `normalize_inbox.py`):

```bash
pip3 install pyyaml pypdf python-docx
```

Jak zobaczysz "Requirement already satisfied" - to znaczy, że już ją masz, super, idź dalej. Jak się zainstaluje - też super.

**Szybkie sprawdzenie, że gra (opcjonalnie):**

```bash
python3 -c "import yaml; print('PyYAML OK')"
```

Wypisze `PyYAML OK` = gotowe.

> **Czemu to tutaj, a nie później.** Bez tej biblioteki health-check i narzędzie inboxa rzucają błędem zamiast działać. Skrypty są napisane tak, że gdyby PyYAML brakowało, powiedzą Ci to po ludzku ("PyYAML is required: pip3 install pyyaml") zamiast sypać niezrozumiałym tracebackiem - ale i tak najlepiej załatwić to teraz, raz, i mieć z głowy. Smoke-test w komponencie 08 odpala oba skrypty; jak ten krok pominiesz, zgłosi FAIL na warstwie UMIEJĘTNOŚCI.

---

## CZĘŚĆ A - Skopiuj 3 foldery skilli na miejsce

Skille żyją jako pliki w folderze `skills/` tej paczki. Przenosisz je do `.claude/skills/` w swoim vaulcie (folder `.claude/` siedzi w rootcie vaulta - wariant zunifikowany). NIE wklejasz ich do czatu - kopiujesz jako pliki.

**Terminalem (w rootcie vaulta):** podstaw `<sciezka-do-paczki>` na miejsce, gdzie rozpakowałeś `setup-package/`.

```bash
mkdir -p .claude/skills
cp -r "<sciezka-do-paczki>/skills/vault-ingest" .claude/skills/
cp -r "<sciezka-do-paczki>/skills/vault-query"  .claude/skills/
cp -r "<sciezka-do-paczki>/skills/vault-linter" .claude/skills/
```

**Albo w Finderze:** przeciągnij trzy foldery (`vault-ingest`, `vault-query`, `vault-linter`) z `setup-package/skills/` do `.claude/skills/` w swoim vaulcie.

**Sprawdź, że masz:**

```bash
ls .claude/skills/
```

Powinno wypisać: `vault-ingest`, `vault-query`, `vault-linter`. W każdym jest `skill.md` (w `vault-ingest` i `vault-linter` dodatkowo folder `scripts/` z Pythonem).

---

## CZĘŚĆ B - Obudź skille (wklej prompt poniżej do Claude Code)

Każdy skill ma na górze placeholder `{{VAULT_ROOT}}` i regułę self-config: przy pierwszym odpaleniu wykrywa root vaulta (working-dir, jeśli leży tam `_GUIDE.md` / `_MOC-knowledge.md`), a jak coś jest niejednoznaczne - DOPYTUJE Ciebie o ścieżkę, nie zgaduje. Ten prompt odpala każdy skill raz na sucho, żeby ten placeholder się podmienił. Robisz to RAZ.

**Jak użyć:** upewnij się, że Claude Code jest odpalony z roota vaulta (`cd <twoj-vault> && claude`), skopiuj cały blok poniżej, wklej, Enter.

```text
Jestes moim asystentem przy stawianiu "Drugiego Mozgu". Wlasnie skopiowalem 3 skille rdzenia do .claude/skills/ (vault-ingest, vault-query, vault-linter). Teraz je BUDZISZ - odpalasz kazdy raz, zeby self-config podmienil placeholder sciezki. Nic poza tym nie robisz.

Pracujemy w folderze, w ktorym jestes uruchomiony (to root mojego vaulta). Wszystkie sciezki traktuj RELATYWNIE od tego folderu (.claude/, _GUIDE.md, 2-areas/, _inbox/) - nigdy pelnych sciezek typu /Users/... ani ~/...

ZASADY PRACY:
- Mow po polsku, prosto i cieplo, jak do kogos kto pierwszy raz to stawia.
- Pytaj o JEDNA rzecz naraz. Czekaj na odpowiedz.
- Po kazdym skillu pokaz PROGRES ("Skill 2 z 3 obudzony") i krotko mnie pochwal.
- Em-dash (dlugi myslnik) jest zakazany. Uzywaj " - " albo przecinka. Zachowaj polskie znaki.

KROK 0 - sprawdz zaleznosc PyYAML (oba skrypty jej potrzebuja):
Pokaz mi komende i odpal: python3 -c "import yaml; print('PyYAML OK')"
- Jak wypisze "PyYAML OK" -> [PASS], idz dalej.
- Jak rzuci ModuleNotFoundError albo blad -> powiedz mi wprost: "Brakuje biblioteki PyYAML. Odpal w terminalu: pip3 install pyyaml, a potem wroc i wklej ten prompt jeszcze raz." i ZATRZYMAJ sie tutaj (bez PyYAML kroki 1 i 3 nie zadzialaja).

KROK 1 - obudz vault-ingest:
- Sprawdz, czy .claude/skills/vault-ingest/skill.md istnieje. Przeczytaj jego sekcje "Self-Config: Vault Path".
- Ustal VAULT_ROOT wedlug reguly self-config: jesli w obecnym folderze (working-dir) lezy _GUIDE.md ORAZ _MOC-knowledge (lub 2-areas/knowledge/_MOC-knowledge.md) -> to jest root vaulta, ustaw na working-dir (w wariancie zunifikowanym to ".").
- Jesli markery sa niejednoznaczne (brak ich w obecnym folderze) -> ZAPYTAJ mnie o sciezke do roota vaulta. Nie zgaduj.
- Po ustaleniu: nadpisz placeholder {{VAULT_ROOT}} w pliku skill.md ustalona wartoscia (Edit, raz).
- Odpal narzedzie inboxa na sucho, zeby potwierdzic ze Python dziala:
  Komenda: python3 .claude/skills/vault-ingest/scripts/inbox_status.py --action list
  Jak zwroci liste/statystyki albo "No _inbox/ directory found" bez crasha (exit 0) -> [PASS]. Jak zwroci "PyYAML is required" -> wroc do KROKU 0.
- Pokaz "Skill 1 z 3 obudzony", pochwal.

KROK 2 - obudz vault-query:
- Przeczytaj .claude/skills/vault-query/skill.md, sekcja self-config.
- Ustal VAULT_ROOT ta sama regula (working-dir jak markery sa, inaczej dopytaj) i nadpisz placeholder {{VAULT_ROOT}} raz.
- Query nie ma Pythona (czysto regula MOC -> grep -> notatki -> [Source: [[plik]]]). Potwierdz tylko, ze placeholder jest podmieniony.
- Pokaz "Skill 2 z 3 obudzony", pochwal.

KROK 3 - obudz vault-linter:
- Przeczytaj .claude/skills/vault-linter/skill.md, sekcja SELF-CONFIG.
- Ustal VAULT_ROOT ta sama regula i nadpisz placeholder {{VAULT_ROOT}} raz.
- Odpal linter na sucho, zeby potwierdzic ze Python dziala:
  Komenda: python3 .claude/skills/vault-linter/scripts/lint_vault.py --vault . --format markdown
  Jak skrypt zwroci raport i exit 0 lub 1 (bez crasha) -> [PASS]. Jak zwroci "PyYAML is required" (exit 2) -> wroc do KROKU 0. Pokaz mi krotko, ile bledow / ostrzezen znalazl (na swiezym vaulcie to normalne, ze cos wyskoczy).
- Pokaz "Skill 3 z 3 obudzony", pochwal.

NA KONIEC:
- Potwierdz, ze w zadnym z trzech skill.md nie zostal doslowny placeholder {{VAULT_ROOT}} (jak gdzies zostal - znaczy ze sie nie podmienil, napraw).
- Wypisz stan:
  MASZ: 3 skille rdzenia obudzone i znajace sciezke do vaulta - ingest (lapie i rozsiewa zrodla), query (odpowiada z Twojej wiedzy z cytowaniem), linter (mechaniczny health-check). PyYAML zainstalowany.
  ZOSTAJE: warstwa CZASU (git + backup) - komponent 03-git-backup.md.
```

---

**Wyjaśnienie dla laika (przeczytaj po wklejeniu):**

Skille to "umiejętności", które Claude wykrywa sam, gdy powiesz słowo-wyzwalacz. Nie musisz pamiętać nazw plików - mówisz "ingest", a Claude wie, że ma uruchomić `vault-ingest`. Self-config to jednorazowa rzecz: skill przy pierwszym odpaleniu zapisuje sobie, gdzie leży Twój vault, żeby kolejne razy już nie pytał. Od tej pory ścieżki grają same, bo Claude odpalasz zawsze z roota vaulta.

Te trzy skille to różnica między biblioteką a systemem. Bez nich masz ładne notatki do czytania. Z nimi masz coś, co łapie surowe źródło i samo je układa, odpowiada Ci z Twojej wiedzy zamiast z głowy modelu, i pilnuje, żeby vault nie gnił.

**Stan po tym kroku:**
- MASZ: warstwę UMIEJĘTNOŚCI - 3 skille rdzenia działają na słowo-wyzwalacz, znają ścieżkę do vaulta, PyYAML zainstalowany.
- ZOSTAJE: warstwa CZASU (git + prywatny backup) - idź do `03-git-backup.md`.

---

## See Also

- [[00-README]] - mapa pakietu i kolejność
- [[02-obsidian-wiring]] - poprzedni krok (domyka warstwę WIEDZA)
- [[03-git-backup]] - następny krok (warstwa CZAS)
- [[08-weryfikacja]] - smoke-test sprawdza te skille na żywo (warstwa UMIEJĘTNOŚCI)
- [[09-maintenance-prompt]] - cykliczny lint + audyt (rozbudowa pętli MAINTAIN nad `vault-linter`)
