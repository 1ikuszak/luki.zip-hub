# 01 - Fundament: PARA + CLAUDE.md (z wywiadem)

**Co to stawia:** warstwę WIEDZA twojego drugiego mózgu od zera. Strukturę folderów PARA (1-projects / 2-areas / 3-resources / 4-archive / _inbox), pliki rdzenia (`_MOC.md`, `_LOG.md`, `_GUIDE.md`, `_MOC-knowledge.md`) ORAZ `CLAUDE.md` - konstytucję, którą Claude czyta przy każdej rozmowie. CLAUDE.md jest budowany z krótkiego wywiadu, więc system od razu zna ciebie, twój język i to, gdzie ma chować twoje notatki.

**Zanim wkleisz prompt - dwie rzeczy:**

1. **Załóż jeden folder na cały system** (np. `~/drugi-mozg`) i wejdź do niego w terminalu, potem odpal Claude Code:
   ```
   mkdir ~/drugi-mozg
   cd ~/drugi-mozg
   claude
   ```
   Ten folder jest rootem wszystkiego. Claude Code działa STĄD - dzięki temu wszystkie ścieżki są względne i nic się nie rozjeżdża. Skille (`.claude/`) zamieszkają wewnątrz tego samego folderu.

2. **Otwórz TEN SAM folder w Obsidianie** ("Open folder as vault" → wskaż `~/drugi-mozg`). Od teraz: Obsidian to okno przez które patrzysz, Claude to silnik który pracuje. Te same pliki, dwa narzędzia. Edytujesz w jednym, drugi widzi natychmiast.

**Jak użyć:** skopiuj cały blok poniżej i wklej do Claude Code (otwartego w folderze vaulta). Claude przeprowadzi cię przez wywiad - jedno pytanie naraz - i postawi cały fundament. Odpowiadaj normalnie, własnymi słowami. On poprosi o zgodę zanim cokolwiek zapisze.

---

```
Jesteś moim asystentem, który teraz postawi mi od zera "drugi mózg" - osobisty system wiedzy oparty na zwykłych plikach .md w tym folderze. Pracujesz W tym folderze (to jest root vaulta i twój working directory), więc WSZYSTKIE foldery i pliki twórz względnie od tego miejsca - nigdy nie używaj ścieżek absolutnych typu /Users/... ani ~/cokolwiek. Po prostu "1-projects/", "_inbox/", "_GUIDE.md".

Zasady pracy ze mną w tej sesji:
- Pisz po polsku, ciepło i prosto, bez żargonu. Tłumacz jak komuś, kto pierwszy raz to widzi.
- Wywiad prowadź JEDNO PYTANIE NARAZ. Zadaj pytanie, poczekaj na moją odpowiedź, dopiero potem następne. Nie wrzucaj listy 8 pytań na raz.
- Zanim utworzysz albo nadpiszesz JAKIKOLWIEK plik - pokaż mi krótko co chcesz zapisać i zapytaj o zgodę ("OK, tworzę X?"). Nie zapisuj nic po cichu.
- Po każdym ukończonym kroku napisz jedno zdanie potwierdzenia w stylu "Zrobione: <co>" + krótkie pochwalenie postępu. Pokazuj progres (Krok 1/5, 2/5...).
- Nie używaj długiego myślnika (znak em-dash). Używaj zwykłego dywiza albo przebuduj zdanie.

Pracujemy w 5 krokach. Jedziemy.

═══════════════════════════════════════
KROK 1/5 - STRUKTURA (foldery + pliki rdzenia)
═══════════════════════════════════════
Najpierw zbuduj szkielet. Utwórz względnie od tego folderu:

Foldery PARA + inbox:
  mkdir -p 1-projects 2-areas 3-resources 4-archive _inbox

Podfoldery warstwy wiedzy:
  mkdir -p 2-areas/knowledge/sources 2-areas/knowledge/concepts 2-areas/knowledge/entities 2-areas/knowledge/syntheses

Potem utwórz puste-ale-zalążkowe pliki rdzenia (treść wypełnimy w kolejnych krokach):
  - _MOC.md            (główny hub wejściowy do całego vaulta)
  - _LOG.md            (append-only dziennik operacji)
  - _GUIDE.md          (konwencje vaulta - wypełnisz w KROKU 3)
  - 2-areas/knowledge/_MOC-knowledge.md   (index warstwy wiedzy: sekcje Concepts / Entities / Sources / Syntheses)

Każdy z tych czterech plików zacznij od frontmattera (blok YAML między ---) z sześcioma polami: type / tags / layer / created / updated / status. Typy: _MOC.md i _MOC-knowledge.md -> type: moc, _LOG.md -> type: log, _GUIDE.md -> type: resource. Layer: 1 dla _GUIDE.md i _LOG.md, 2 dla obu MOC. Status: active. Daty: dzisiejsza. W _MOC-knowledge.md dopisz w treści linijkę "Part of [[_MOC]]", a w _MOC.md wypisz dzieci jako wikilinki: [[_GUIDE]], [[_LOG]] i [[_MOC-knowledge]] (hub linkuje wszystko, co ma pod sobą). Dzięki temu health-check (poznasz go w Dniu 2) od pierwszego uruchomienia pokaże zero błędów, zamiast flagować własne pliki rdzenia.

WAŻNE - czego NIE tworzysz (świadomie): żadnego _MANIFEST.md ani _NOW.md. Index wiedzy = MOC + grep + filesystem - to DEFAULT i wystarcza dla większości vaultów (zmierzone). Gdy grep zacznie gubić synonimy/parafrazy (zrobisz drift-test), jest opcjonalny upgrade: semantic search (skill vault-search, moduł 11-mcp-search) - natywne narzędzie retrievalu, nie kolejny trigger. "Co teraz robię" wyprowadzasz z 1-projects/ ze status: active, nie z osobnego pliku. Mniej plików do utrzymania = mniej rzeczy do zgnicia.

Pokaż mi listę tego co utworzysz, zapytaj o zgodę, utwórz. Potem: "Zrobione: struktura PARA + warstwa wiedzy + pliki rdzenia (Krok 1/5)" i lecimy dalej.

═══════════════════════════════════════
KROK 2/5 - POZNAJ MNIE (wywiad, jedno pytanie naraz)
═══════════════════════════════════════
Teraz mnie poznaj, żeby zbudować CLAUDE.md skrojony pode mnie. Zadawaj po jednym pytaniu, czekaj na odpowiedź, bez żargonu. Kolejność:

1. Jak masz na imię i czym się zajmujesz (zawód / biznes w jednym zdaniu)?
2. Dla kogo pracujesz - masz klientów, robisz własny projekt, czy jedno i drugie?
3. Nad czym pracujesz teraz (wymień 1-3 najważniejsze rzeczy)?
4. Jakim tonem mam do ciebie pisać i czego mam unikać? (np. po polsku, na luzie, bez korpomowy)
5. Czego oczekujesz ode mnie na co dzień - mam ci doradzać i pushować, czy raczej cicho wykonywać to o co proszisz?
6. Jakie typy treści tworzysz (np. posty, skrypty, maile, artykuły) i gdzie każdy typ ma lądować, jak powiesz "zapisz"?
7. Masz klientów, których kontekst trzeba trzymać osobno? Jeśli tak - wymień ich z grubsza.
8. Masz jakieś "źródło prawdy" - dokument ze strategią / zasadami biznesu, który mam czytać ZANIM podejmę decyzję? Jeśli tak, gdzie leży (ścieżka względna)?

Notuj odpowiedzi po cichu (jeszcze nic nie zapisuj do plików). Po ostatnim pytaniu: "Zrobione: poznałem cię (Krok 2/5)" i przejdź do budowy CLAUDE.md.

═══════════════════════════════════════
KROK 3/5 - CLAUDE.md (konstytucja) + _GUIDE.md (konwencje)
═══════════════════════════════════════
Z odpowiedzi z KROKU 2 zbuduj CLAUDE.md w rootcie. To jest plik, który czytasz przy KAŻDEJ rozmowie. Ścieżki w nim WZGLĘDNE od tego folderu. Struktura sekcji (kolejność jest częścią systemu):

# <Nazwa systemu/studia> - <rola Claude'a> 
  (z odpowiedzi 1+5: np. "Drugi Mózg Anny - twój asystent i cofounder")
  Pod H1 jedno zdanie deklaracji źródła prawdy: "Ten folder jest source of truth dla całej mojej wiedzy. Wszystkie ścieżki są względne od tego roota."

## Structure
  Tabela mapująca .claude/ (silnik) <-> vault (wiedza). Wiersze:
  | Lokalizacja | Co |
  | .claude/rules/ | reguły operacyjne |
  | .claude/skills/ | skille (vault-ingest / vault-query / vault-linter + twoje) |
  | _inbox/ | strefa zrzutu surowych źródeł |
  | 1-projects/ 2-areas/ 3-resources/ 4-archive/ | PARA wg roli |
  | 2-areas/knowledge/ | przetworzona wiedza (sources/concepts/entities/syntheses) |
  | .tmp/ | pliki tymczasowe, zawsze regenerowalne |
  Zaznacz: root = ten folder = working directory.

## Quick Rules
  Numerowana lista z wywiadu. Wpleć:
  1. Język (z odp. 4).
  2. Read-before: przed pracą nad klientem czytaj jego kontekst (jeśli odp. 7 = ma klientów); przed pisaniem do vaulta czytaj _GUIDE.md.
  3. Jeśli odp. 8 = ma źródło prawdy: "Przed decyzją biznesową/strategiczną czytaj NAJPIERW <ścieżka>."
  4. Routing niepewny? ZAPYTAJ. Nigdy nie zgaduj gdzie coś zapisać.
  5. Pytania do wiedzy (QUERY): gdy pytam o coś z mojej bazy, odpowiadaj TYLKO z vaulta, a przy każdym twierdzeniu dawaj cytat [Source: [[notatka]]]. Czego nie ma w bazie - powiedz wprost "tego nie mam", nie zgaduj. Domyślnie szukasz grepem (vault-query); jeśli mam zainstalowany vault-search (semantic), sięgaj po nie jako natywne narzędzie, gdy szukam po znaczeniu. (Pełny skill vault-query wgrasz jako narzędzie; ta reguła to baza.)

## Self-Modifying Instructions
  Na razie ZOSTAW PUSTĄ z notką: "(pętlę samo-uczenia dodam później: Dzień 5 kursu / komponent 07 pakietu)". Nie wypełniaj.

## Workflow Preferences
  - Trigger "zapisz" -> auto-routing po typie treści (z odp. 6). Wypisz mapowanie typ -> folder.
  - Frontmatter 6 pól na każdej notatce: type, tags, layer, created, updated, status.
  - Status flow treści: idea -> draft -> ready -> published.
  - Code blocks for copy-paste: każdy gotowy-do-wklejenia tekst (post, skrypt, wiadomość) owijaj w blok kodu (```), żeby Obsidian dał przycisk "kopiuj".
  - "Routing niepewny? ZAPYTAJ" - jedno pytanie bije źle zapisaną notatkę.

## Knowledge Vault
  Dwie tabele (to jest wiring do wiedzy):
  READING (gdzie szukać):
  | Czego szukasz | Gdzie |
  | co aktywne | 1-projects/ ze status: active |
  | dziennik | _LOG.md |
  | przetworzona wiedza | 2-areas/knowledge/_MOC-knowledge.md |
  | konwencje | _GUIDE.md |
  WRITING (czego się nauczyłeś -> gdzie zapisać):
  | Nauczyłeś się... | Zapisz do... |
  | wiedza zewnętrzna (artykuł/video) | 2-areas/knowledge/ przez "ingest" |
  | nowe narzędzie/technika | 3-resources/ |
  | wiedza o kliencie | 2-areas/<klient>/ |
  | nowy projekt z deadline | 1-projects/<projekt>/_MOC.md |
  | gotowy content | 2-areas/content/<platforma>/ (jeśli dotyczy) |
  Reguła pod tabelą: "Zawsze aktualizuj parent MOC gdy dodajesz dziecko + frontmatter wg _GUIDE.md."

## Quality Standards
  Na razie ZOSTAW PUSTĄ z notką: "(standardy jakości dodam później: komponent 06 pakietu)". Nie wypełniaj.

---

Następnie wypełnij _GUIDE.md (konwencje vaulta). Minimum:
- Frontmatter schema (6 pól: type / tags / layer / created / updated / status; type ∈ moc|note|project|resource|log|content; status ∈ active|reference|archived|outdated).
- MOC = hub linkujący do wszystkich dzieci; każda notatka linkuje back do parent MOC; zero sierot.
- _LOG format: "## [YYYY-MM-DD] {op} | {temat}", op ∈ ingest|update|create|split|query|lint|archive. Append-only, grep-friendly.
- Linking: minimum 3 wikilinki na notatkę, sekcja "See Also" na dole (2-5 linków), format `[[nazwa-notatki]]`. WAŻNE: przykłady formatu w _GUIDE zapisuj w backtickach (jak tutaj) - health-check czyta gołe [[...]] jako prawdziwe linki i zgłosiłby błąd.
- Content: zero długiego myślnika (znaku em-dash), zachowuj dane krytyczne 1:1 (ceny/daty/URL/nazwy modeli/prompty).
- PARA wg ROLI nie tematu: 1-projects=deadline / 2-areas=ongoing bez deadline / 3-resources=referencja / 4-archive=zrobione.
- Split notatki przy ~300 liniach -> oryginał staje się mini-MOC linkującym do dzieci.

Pokaż mi szkic CLAUDE.md zanim zapiszesz, zapytaj o zgodę, popraw jeśli coś nie gra. Potem zapisz oba pliki. "Zrobione: CLAUDE.md (konstytucja) + _GUIDE.md (konwencje) (Krok 3/5)."

═══════════════════════════════════════
KROK 4/5 - DWIE PRZYKŁADOWE NOTATKI (żeby zobaczyć jak to żyje)
═══════════════════════════════════════
Pokaż mi system w akcji. Utwórz dwie krótkie, prawdziwe notatki na podstawie tego co powiedziałem w wywiadzie:

1. Jedna w 2-areas/ - np. notatka o jednym z moich obszarów/projektów albo prosty profil mnie/mojego biznesu. Pełny frontmatter (6 pól), minimum 3 wikilinki, sekcja "See Also".
2. Jedna w _inbox/ - przykładowy surowy zrzut (np. "myśl do przemyślenia" albo link do przerobienia później), żebym zobaczył jak wygląda capture przed ingestem.

Podlinkuj notatkę z 2-areas/ do _MOC.md (parent) i odwrotnie - _MOC.md ma ją wymieniać. Zero sierot.

Zapytaj o zgodę, utwórz, dopisz wpis do _LOG.md ("## [data] create | przykładowe notatki"). "Zrobione: dwie przykładowe notatki podlinkowane do MOC (Krok 4/5)."

═══════════════════════════════════════
KROK 5/5 - PODSUMUJ
═══════════════════════════════════════
Na koniec pokaż mi krótko drzewo tego co powstało (foldery + pliki) i napisz w stylu:

"Gotowe. Masz warstwę WIEDZA swojego drugiego mózgu:
- struktura PARA + warstwa wiedzy
- CLAUDE.md (twoja konstytucja, czytam ją zawsze)
- _GUIDE.md (konwencje), _LOG.md (dziennik), _MOC.md (hub)
- dwie przykładowe notatki

Otwórz ten folder w Obsidianie ('Open folder as vault') i zobacz graf.

Zostaje wgrać 3 skille rdzenia (vault-ingest / vault-query / vault-linter), żeby system zaczął PRACOWAĆ za ciebie, nie tylko przechowywać. Instrukcja w pliku 00-README pakietu - to następny krok."

Pochwal mnie, że postawiłem fundament. Koniec.
```

---

**Stan po tym kroku:** masz warstwę WIEDZA (PARA + CLAUDE.md wiring + _GUIDE + przykładowe notatki). Zostaje warstwa UMIEJĘTNOŚCI - 3 skille rdzenia z pakietu (patrz `00-README`).
