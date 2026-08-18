# 02 - Obsidian wiring + konwencje + graf

**Co stawia:** spina Obsidian z tym samym folderem co Claude Code (jedno okno na mózg), utrwala konwencje vaulta w `_GUIDE.md` (frontmatter, MOC, `_LOG`, linkowanie), zakłada `.gitignore` i włącza graf jako wizualną nagrodę. To domyka warstwę WIEDZA od strony UX - od teraz patrzysz na swój mózg i widzisz połączenia.

**Jak użyć (2 kroki):**

1. **Ręcznie (ty, 30 sekund w Obsidianie):** otwórz Obsidian, kliknij **"Open folder as vault"** i wskaż **dokładnie ten sam folder**, w którym odpalasz Claude Code (root twojego vaulta - ten, w którym leżą `_GUIDE.md`, `CLAUDE.md`, `1-projects/`, `2-areas/`...). Obsidian utworzy w nim folder `.obsidian/` (to jego konfiguracja, jeden na vault). Tyle. Obsidian zaczyna renderować twoje pliki.

2. **Prompt do Claude (poniżej):** otwórz terminal **W folderze vaulta** (tam gdzie zwykle: `cd <twój-folder> && claude`) i wklej prompt z bloku. Claude dopisze konwencje, zrobi `.gitignore` i włączy graf.

> Założenie: Claude Code działa W folderze vaulta (ścieżki relatywne, nie `~/...`), a Obsidian otwiera ten sam folder. Dwa narzędzia, ten sam mózg na dysku.

---

```
Jesteś moim asystentem konfiguracji "drugiego mózgu". Pracujesz W folderze
vaulta (twój working directory = root vaulta). Wszystkie ścieżki traktuj
RELATYWNIE od tego folderu - nigdy nie używaj ścieżek typu ~/... ani
/Users/...

Mam już postawioną strukturę PARA + CLAUDE.md + _GUIDE.md (komponent 01).
Teraz domykamy warstwę WIEDZA od strony Obsidiana i konwencji.

ZASADY PRACY:
- Pisz po polsku, prosto i ciepło. Tłumacz jak laikowi.
- Masz moją zgodę na tworzenie i edycję plików w tym folderze.
- Pokazuj progres ("[1/3]...") i krótko mnie chwal po każdym kroku.
- Zadawaj jedno pytanie naraz, tylko jeśli coś jest naprawdę niejednoznaczne.
- Zero długiego myślnika (em-dash) w treści, którą piszesz. Używaj
  zwykłego "-" albo przebuduj zdanie.

Najpierw potwierdź, że jesteś w dobrym folderze: sprawdź, czy w obecnym
katalogu istnieje _GUIDE.md (albo _MOC-knowledge.md). Jeśli NIE ma - zatrzymaj
się i zapytaj mnie, czy odpaliłeś Claude Code w rootcie vaulta. Jeśli JEST -
napisz "OK, jestem w rootcie vaulta" i jedź dalej.

Wykonaj 3 kroki:

[1/3] KONWENCJE - dopisz/zweryfikuj w _GUIDE.md
Otwórz _GUIDE.md i upewnij się, że zawiera PEŁNY zestaw konwencji poniżej.
Czego brakuje - dopisz. Co już jest - zostaw, nie duplikuj.

  FRONTMATTER (każda notatka, w nagłówku YAML):
    type:    [moc | note | project | resource | log | content]
    tags:    [małe-litery-z-myślnikiem]
    layer:   [1 | 2 | 3]
    created: YYYY-MM-DD
    updated: YYYY-MM-DD
    status:  [active | reference | archived | outdated]
  - Client MOC dodatkowo: client, mrr, since, contacts
  - Project MOC dodatkowo: deadline, client

  MOC (Map of Content):
  - Hub linkujący do klastra notatek = punkt wejścia w obszar (zamiast
    szukać, otwierasz mapę).
  - Każda notatka linkuje BACK do swojego parent MOC.
  - MOC linkuje do WSZYSTKICH swoich dzieci. Zero sierot.

  _LOG.md:
  - Append-only, na poziomie operacji.
  - Format wpisu: ## [YYYY-MM-DD] {operacja} | {temat}
  - Słownik operacji: ingest / update / create / split / query / lint /
    archive / cross-ref
  - Ma być grep-friendly (jeden wpis na operację).

  LINKOWANIE (wikilinki `[[nazwa-notatki]]`):
  - Minimum 3 wikilinki na notatkę.
  - Sekcja "See Also" na dole notatki: 2-5 powiązanych linków.
  - Cross-connections rób jawnie, nie zostawiaj notatki w próżni.
  - Przykłady formatu w _GUIDE zapisuj w backtickach (jak wyżej), żeby
    health-check nie czytał ich jako prawdziwych linków.

  _inbox/:
  - Płaska strefa zrzutu (capture, bez podfolderów).
  - Dotyka go TYLKO ingest. Reszta procesów nie zagląda.

  PARA (4 foldery wg ROLI, nie tematu):
  - 1-projects  = ma deadline
  - 2-areas     = ongoing, bez deadline
  - 3-resources = referencja
  - 4-archive   = skończone (używaj realnie, nie cmentarz)

  SPLIT przy ~300 liniach:
  - Notatka która urośnie ~300 linii - rozbij. Oryginał staje się
    mini-MOC linkującym do rozbitych części. 100% informacji ląduje gdzieś.

  TREŚĆ:
  - Zero długiego myślnika (em-dash). Hyphen "-" albo przebuduj zdanie.
  - Dane krytyczne 1:1: ceny, daty, URL, hex kolorów, nazwy modeli,
    prompty - przepisuj dokładnie, nigdy nie parafrazuj.

Po dopisaniu powiedz krótko, co dodałeś, a co już było.

[2/3] GITIGNORE - utwórz .gitignore w rootcie vaulta
Stwórz plik .gitignore z tą zawartością (przygotowanie pod warstwę CZASu -
git nie będzie szumiał przy każdym ruchu okna Obsidiana):

  .obsidian/workspace*
  .obsidian/cache
  .DS_Store
  .trash/

Jeśli .gitignore już istnieje - dopisz brakujące linie, nie nadpisuj całości.
Resztę .obsidian/ (motyw, plugins, config grafu) ZOSTAW śledzoną przez git -
dzięki temu twój skonfigurowany wygląd jedzie razem z vaultem.

[3/3] GRAF - włącz core plugin Graph View
Obsidian trzyma listę włączonych core pluginów w
.obsidian/core-plugins.json. Upewnij się, że "graph" jest na liście
włączonych. Jeśli plik nie istnieje albo grafu brakuje - utwórz/uzupełnij go
tak, żeby Graph View był włączony (to wbudowany, darmowy plugin Obsidiana -
żadnych płatnych dodatków).

Na końcu wypisz stan:
  MASZ: Obsidian (okno) + Claude (silnik) na tym samym mózgu - konwencje
        utrwalone w _GUIDE.md, .gitignore gotowy, graf włączony.
  ZOSTAJE: skonfigurować 3 skille rdzenia (odpalić każdy raz).
```

---

**Wyjaśnienie dla laika (przeczytaj po wklejeniu):**

Edytujesz plik w jednym narzędziu, drugie widzi zmianę natychmiast - bo to **ten sam plik na dysku**, nie kopia. Obsidian to okno (ładnie pokazuje, renderuje graf, pozwala klikać linki). Claude to silnik (czyta i pisze za ciebie według konwencji). Patrzą na ten sam folder.

**Otwórz teraz graf w Obsidianie** (ikona grafu w lewym pasku albo Cmd/Ctrl+G) - zobaczysz swoje notatki jako kropki połączone liniami. Na razie pusto, ale od pierwszego ingestu graf zacznie się zaplatać. To twoja wizualna nagroda: widzisz, jak wiedza się łączy.

**Stan po tym kroku:**
- MASZ: okno (Obsidian) + silnik (Claude) na tym samym mózgu, konwencje zalockowane, git przygotowany, graf gotowy.
- ZOSTAJE: skonfigurować 3 skille rdzenia (odpalasz każdy raz - to komponenty dalej).
