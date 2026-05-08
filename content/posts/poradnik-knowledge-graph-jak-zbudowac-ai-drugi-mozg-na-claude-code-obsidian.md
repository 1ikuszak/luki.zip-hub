---
title: "AI Knowledge Base: drugi mózg w 30 minut na Claude Code + Obsidian"
order: 4
tag: "poradnik"
description: "Twoja wiedza jest w 40 chatach, 200 bookmarkach, 15 dokumentach. AI nie widzi z tego nic. Postawisz drugi mózg w 30 minut. Karpathy pattern + skille."
problem: "Twoja wiedza jest w 40 chatach, 200 bookmarkach, 15 dokumentach. AI nie widzi z tego nic."
dlaKogo: "Creatorzy, founderzy, consultanci, którzy chcą żeby AI znało ich domenę lepiej niż jakikolwiek generic chatbot."
tools: ["CLAUDE.md", "log.md", "obsidian.md", "index.md"]
---

Twoja wiedza jest w 40 chatach, 200 bookmarkach, 15 dokumentach i głowie. AI nie widzi z tego nic. Za każdym razem tłumaczysz mu od zera kim jesteś, co robisz i jakich masz klientów.

Ten guide to kończy.

Postawisz system w jedno popołudnie. Wrzucasz artykuł, AI czyta, streszcza, linkuje z tym co już masz, zapisuje w twoim vaulcie. Pytasz pytanie, AI czyta wiki, daje ci odpowiedź z cytowaniami, zapisuje odpowiedź jako nową notatkę. Za miesiąc masz wyspecjalizowanego agenta wytrenowanego na twojej wiedzy. Nie chatbota. Twojego.

To jest ten sam pattern który Karpathy opublikował dwa tygodnie temu. 16M wyświetleń, 8K gwiazdek na GitHubie w dwa dni. Ja go tylko przełożyłem na konkretny workflow z Claude Code i dodałem jedną rzecz, której nie ma nigdzie indziej: zamiast kopiować prompty za każdym razem, każę Claude'owi stworzyć skille. Raz, a potem odpalasz `/ingest`, `/query`, `/lint` jednym słowem.

## Jak to działa (60 sekund)

Trzy warstwy:

1. **Raw**, folder z surowymi materiałami. Artykuły, transcripty, notatki, PDFy. AI tylko czyta, nigdy nie rusza.
2. **Wiki**, folder który AI buduje i utrzymuje sam. Streszczenia, koncepty, połączenia. Ty czytasz, AI pisze.
3. **Schema**, plik `CLAUDE.md` który mówi Claude'owi jak wiki ma wyglądać. To jest różnica między chaotycznym chatbotem a zdyscyplinowanym maintainerem.

Trzy operacje:

1. **Ingest**, wrzucasz nowy materiał. AI go czyta, streszcza, update'uje istniejące strony, łączy z tym co już masz, loguje w `log.md`.
2. **Query**, pytasz pytanie. AI czyta wiki/index.md, znajduje relewantne strony, syntezuje odpowiedź z cytowaniami. Dobre odpowiedzi zapisują się z powrotem do wiki.
3. **Lint**, raz w tygodniu zdrowotny checkup. AI znajduje contradictions, sieroty, broken linki, luki w wiedzy.

I tyle. Bez bazy danych, bez embeddings, bez vector store. Tylko foldery i pliki markdown. Claude robi całą robotę, ty sourcujesz i pytasz.

### Dlaczego to jest mocniejsze niż RAG

RAG (ChatGPT file uploads, NotebookLM) szuka odpowiedzi w surowych plikach za każdym razem od zera. Nic się nie kumuluje.

Knowledge base kompounduje. Wrzucasz artykuł o pricingu, AI tworzy stronę "pricing-strategy". Tydzień później wrzucasz case study z e-commerce, AI widzi połączenie i SAM aktualizuje stronę o pricingu. Za miesiąc masz sieć połączonych insightów której nie da się zbudować rękami.

Tedious część knowledge base'u to nie czytanie i myślenie, to księgowość. Update'owanie cross-references, utrzymywanie spójności, flagowanie contradictions. Człowiek rezygnuje, bo maintenance rośnie szybciej niż wartość. AI się nie nudzi. Jedna komenda dotyka 10-15 plików w jednym przejściu.

## Zanim zaczniesz

Potrzebujesz trzech rzeczy:

1. **Obsidian**, darmowa apka, twój vault na dysku. Pobierz z [obsidian.md](https://obsidian.md).
2. **Claude Code**, CLI od Anthropic który czyta i pisze pliki. `npm install -g @anthropic-ai/claude-code`.
3. **10+ materiałów**, cokolwiek co chcesz mieć w bazie. Zakładki z zeszłego tygodnia, artykuły, transkrypcje podcastów, notatki z książek.

Jeśli nie masz jeszcze setupu Obsidian + Claude Code z `CLAUDE.md`, wróć najpierw do mojej poprzedniej rolki. Tam pokazuję jak to postawić od zera w 30 minut. Ten guide zakłada że już masz vault i agenta.

## Krok 1: Struktura folderów (2 minuty)

Otwórz Claude Code w katalogu twojego vaulta i wklej:

```plain text
Zbuduj mi knowledge base structure w tym vaulcie.

Utwórz następujące foldery:

knowledge/
├── raw/              # Source of truth - AI tylko czyta
├── wiki/             # AI pisze i utrzymuje
│   ├── index.md      # Master index
│   ├── log.md        # Activity log
│   ├── sources/      # Streszczenia surowych źródeł
│   ├── concepts/     # Techniki, frameworki, zasady
│   ├── entities/     # Ludzie, marki, narzędzia
│   └── syntheses/    # Cross-source insights
└── CLAUDE.md         # Schema (będzie w kroku 2)

W index.md stwórz strukturę z sekcjami: Stats, Sources, Concepts, Entities, Syntheses, Recent activity.

W log.md dodaj nagłówek "# Activity Log" i nic więcej.

Frontmatter dla index.md:

type: moc
tags: [knowledge, hub]
created: YYYY-MM-DD
updated: YYYY-MM-DD


Pokaż mi strukturę po wykonaniu.
```

Claude postawi ci całą strukturę w 30 sekund. Sprawdź czy wszystko jest, leć dalej.

## Krok 2: Schema (3 minuty)

Schema to plik który mówi Claude'owi jak ma operować na twoim knowledge base. To jest najważniejsza część całego systemu. Bez tego Claude jest chaotyczny, z tym jest zdyscyplinowany.

Wklej to do `knowledge/CLAUDE.md`:

```markdown
# Knowledge Base Schema

## Identity
To jest personal knowledge base. AI (Claude) utrzymuje całą strukturę.
Człowiek sourcuje materiały i pyta pytania. AI robi resztę.

## Architecture
- `raw/` - immutable source documents. NIGDY nie modyfikuj.
- `wiki/` - AI-maintained wiki. AI ma pełną kontrolę.
- `wiki/index.md` - master index, update po każdym ingescie.
- `wiki/log.md` - activity log, append-only.

## Wiki Rules

1. **Jeden source = wiele notatek.** Z artykułu wyciągnij source summary
   + wszystkie techniki jako concepts + wszystkie osoby/marki jako entities.
   Jeden ingest powinien dotknąć 5-15 plików.

2. **Minimum 3 wikilinki per notatka.** Zero sierot. Jak linkujesz do
   [[concept]] a plik nie istnieje, stwórz stub (1 linia definicji + link do źródła).

3. **Każdy fakt cytuje źródło.** Format: `[Source: [[source-slug]]]` inline
   w zdaniu. Wikilinki w See Also nie wystarczają, chodzi o traceability.

4. **Flag contradictions.** Jak nowe źródło mówi coś przeciwnego niż istniejąca
   notatka, dodaj blok:
   > CONTRADICTION: [stary claim z [[old-source]]] vs [nowy claim z [[new-source]]]

5. **Frontmatter obowiązkowy.** Każda notatka ma: type, tags, created, updated, status.

6. **Zero em-dashes.** Używaj minusów lub przeredaguj zdanie.

## Ingest Workflow
1. Przeczytaj całe źródło
2. Przedyskutuj kluczowe takeaways z userem
3. Stwórz source summary w wiki/sources/
4. Stwórz/update concepts w wiki/concepts/
5. Stwórz/update entities w wiki/entities/
6. Update wiki/index.md (dodaj nowe strony, update stats)
7. Flag contradictions jeśli są
8. Append do wiki/log.md: `## [YYYY-MM-DD] ingest | {slug}`

## Query Workflow
1. Przeczytaj wiki/index.md
2. Przeczytaj relewantne strony
3. Syntezuj odpowiedź z cytowaniami `[Source: [[page]]]`
4. Jeśli odpowiedź jest wartościowa, zapisz jako wiki/syntheses/{slug}.md
5. Update wiki/index.md i wiki/log.md

## Lint Workflow
1. Znajdź sieroty (notatki z <3 wikilinkami)
2. Znajdź broken links
3. Znajdź duplikaty concepts/entities
4. Znajdź contradictions
5. Znajdź stale notatki (updated >60 dni przy status: active)
6. Znajdź em-dashes
7. Output: wiki/lint-report-YYYY-MM-DD.md
```

To jest manual dla Claude'a. Od teraz każdy ingest, query, lint idzie dokładnie tak jak chcesz, bez powtarzania zasad.

## Krok 3: Skille (the killer move)

Tutaj jest moja modyfikacja oryginalnego patternu Karpathy'ego. Zamiast kopiować prompty za każdym razem, każę Claude'owi stworzyć **skille**, permanentne komendy w `.claude/skills/` które wywołujesz jednym słowem.

Claude Code auto-loaduje skille z folderu `.claude/skills/{name}/skill.md`. Raz je stworzysz, potem używasz do końca życia. Zero copy-paste, zero zapominania.

Wklej to:

```plain text
Stwórz mi 3 skille w .claude/skills/ dla mojego knowledge base.

Dla każdego skilla stwórz folder i plik skill.md z frontmatter YAML:

name: {skill-name}
description: {kiedy używać + trigger phrases}


Skille:

1. .claude/skills/kb-ingest/skill.md
   - Name: kb-ingest
   - Description: "Ingest source into knowledge base. Triggers: 'ingest [file]',
     'ingest [url]', 'wrzuc do knowledge base', 'dodaj zrodlo'"
   - Content: Przeczytaj knowledge/CLAUDE.md i wykonaj Ingest Workflow
     dla źródła które user poda (ścieżka do pliku w raw/, URL, albo wklejony tekst).
     Postępuj dokładnie według 8 kroków z Ingest Workflow. Na końcu podsumuj
     ile plików stworzyłeś, ile update'owałeś, jakie connections znalazłeś.

2. .claude/skills/kb-query/skill.md
   - Name: kb-query
   - Description: "Query knowledge base and synthesize answer. Triggers:
     'query [question]', 'zapytaj knowledge base', 'co wiem o'"
   - Content: Przeczytaj knowledge/CLAUDE.md i knowledge/wiki/index.md.
     Wykonaj Query Workflow dla pytania usera. Ważne: po dobrej odpowiedzi
     ZAWSZE zaproponuj zapisanie jej jako synthesis page w wiki/syntheses/.
     To jest compounding loop, pytania stają się notatkami.

3. .claude/skills/kb-lint/skill.md
   - Name: kb-lint
   - Description: "Health check on knowledge base. Triggers: 'lint knowledge base',
     'kb health', 'sprawdz wiki', 'lint kb'"
   - Content: Przeczytaj knowledge/CLAUDE.md i wykonaj Lint Workflow.
     Output zapisz do wiki/lint-report-YYYY-MM-DD.md.
     Nie naprawiaj sam, pokaż mi listę problemów i zdecyduję co robić.

Po stworzeniu, pokaż mi listę skilli i przetestuj czy Claude Code je widzi.
```

Claude stworzy ci 3 skille. Od teraz odpalasz:

- `ingest artykul.md`, wrzuca source do wiki
- `query jak robic dobry hook`, pyta wiki, syntezuje odpowiedź
- `lint knowledge base`, zdrowotny check

Trzy słowa zamiast trzech promptów. To jest dokładnie to czego ja używam na codzień.

> Chcesz pakiet wszystkich promptów + 3 skille jako gotowy zip? [Pobierz framework](/brain)

## Krok 4: Pierwszy ingest (10 minut)

Wybierz pierwszy materiał. Może być artykuł z zakładek, transcript z podcastu, notatka z książki. Cokolwiek ci siedzi.

**Opcja A:** Zainstaluj Obsidian Web Clipper (darmowa extension). Klikasz na artykule, Clipper zapisuje go jako czysty markdown prosto do `knowledge/raw/`.

**Opcja B:** Skopiuj dowolny plik markdown / PDF / transcript do `knowledge/raw/`.

**Opcja C:** Paste tekst bezpośrednio do Claude Code.

Potem wklej:

```plain text
ingest knowledge/raw/{twoj-plik.md}
```

Claude przeczyta źródło, przedyskutuje z tobą kluczowe takeaways, pokaże plan plików do stworzenia/updatu, poczeka na OK i zrobi całą robotę. Po wszystkim dostaniesz podsumowanie: ile plików stworzone, ile update'owane, jakie connections znalezione.

**Pro tip:** zacznij od artykułu z twojej branży który już znasz. Dzięki temu zweryfikujesz czy Claude dobrze ekstraktuje insighty i dobrze je kategoryzuje. Jak coś jest źle, poprawisz w `CLAUDE.md` i wiesz co się dzieje.

## Krok 5: Pierwsze query (the payoff moment)

Tutaj dzieje się magia. Masz już 5-10 źródeł. Pora zobaczyć co system potrafi.

Wklej:

```plain text
query buduje landing page dla [KLIENT / PROJEKT]. Temat: [OPIS].
Znajdź w knowledge base wszystkie concepts które mogę użyć,
źródła z najlepszymi przykładami, i zaproponuj strukturę landingu
opierającą się TYLKO na tym co jest w vaulcie. Cytuj źródła.
```

Claude przegada całą sieć, znajdzie relewantne strony, syntezuje odpowiedź z cytowaniami. Po odpowiedzi powie: "ta odpowiedź jest wartościowa, zapisać jako synthesis page?". Mówisz tak. Odpowiedź ląduje jako nowa notatka w `wiki/syntheses/`, linkująca do wszystkich źródeł które użyła.

To jest compounding loop. Pytanie staje się odpowiedzią, odpowiedź staje się notatką, notatka zasila następną odpowiedź. Bez tego twoje query znikają w historii chatu i każde kolejne zaczyna od zera. Z tym wiki staje się gęstsza z każdym pytaniem.

## Krok 6: Lint (raz w tygodniu)

Graph gnije jak za nim nie pilnujesz. Raz w tygodniu odpal:

```plain text
lint knowledge base
```

Claude sprawdzi sieroty, broken linki, duplikaty, contradictions, stale notatki. Zapisze raport w `wiki/lint-report-YYYY-MM-DD.md`. Ty przeglądasz, decydujesz co naprawić, dajesz Claude'owi OK.

Zajmuje 5 minut. Graph zostaje zdrowy.

## Pro tipy

1. Git init w vaulcie na początku, możesz cofnąć każdy błąd Claude'a
2. Zacznij od 10 źródeł które znasz, zweryfikujesz jakość ekstrakcji
3. Lint raz w tygodniu, nie raz w miesiącu. Małe problemy nie urosną
4. Sonnet do prostych ingestów, Opus do query i syntheses
5. Batch ingest 10 źródeł naraz da ci patterny których pojedynczo nie zobaczysz

## Gdzie to nie działa (honest)

**Context window ma sufit.** 200K tokenów to około 150K słów. Przy 500 source pages Claude nie wczytuje wszystkiego, czyta przez index i robi selekcję. Rozwiązanie: trzymaj `index.md` curated, nie pozwól mu rosnąć bez ograniczeń.

**Koszt nie jest zero.** Jeden ingest który dotyka 10-15 plików to około $0.50-2 na Opusie. 50 źródeł to $25-100 za setup. Rozwiązanie: Sonnet do prostych updateów, Opus tylko do ważnej analizy.

**Halucynacje nie znikają.** Wiki wygląda autorytatywnie więc człowiek mniej weryfikuje. Rozwiązanie: krytyczne claims (liczby, cytaty, daty) cytuj inline z `[Source: [[page]]]`. Raz w miesiącu spot-check losowe notatki vs raw source.

**Nie skaluje się do 10,000 źródeł.** Index-file approach działa do ~200-300 sources. Powyżej potrzebujesz prawdziwego search (qmd, embeddings). Ten guide jest dla personal i small team, nie enterprise.

## Podsumowanie

| Krok | Co robisz | Czas |
| --- | --- | --- |
| 1 | Claude buduje strukturę folderów | 2 min |
| 2 | Wklej schema do knowledge/CLAUDE.md | 3 min |
| 3 | Claude tworzy 3 skille (/ingest, /query, /lint) | 5 min |
| 4 | Pierwszy ingest, wrzuć źródło, odpal skill | 10 min |
| 5 | Pierwsze query, zobacz payoff | 5 min |
| 6 | Test lint, raz w tygodniu | 5 min |

Razem: 30 minut od zera do działającego knowledge grapha.

## Co dostaniesz za miesiąc

Wyobraź sobie że za miesiąc twój vault zna twoją pracę lepiej niż ty sam. Każdy artykuł który czytałeś, każdy klient którego obsługiwałeś, każda decyzja którą podjąłeś, jest tam zalinkowana i cytowalna. Pytasz "jakie patterny widzę u klientów z e-commerce?" i dostajesz odpowiedź z trzech case studies, z cytatami, w 30 sekund. To jest 30 minut setupu raz, codzienny payoff przez lata.

## Potrzebujesz pomocy?

Jestem Łukasz. Wdrażam AI do biznesów.

```plain text
lukasz.glica07@gmail.com
```

Odpisuję na każdego maila.
