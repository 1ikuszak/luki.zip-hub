---
title: "Obsidian + Claude Code: AI Knowledge Base od zera"
order: 5
tag: "poradnik"
description: "Twoja wiedza jest w 40 chatach, 200 bookmarkach, 15 dokumentach i glowie. AI nie widzi z tego nic. Za kazdym razem tlumaczysz mu od zera kim jestes, co robisz i"
problem: ""
dlaKogo: ""
tools: ["CLAUDE.md", "log.md", "obsidian.md", "index.md"]
---
Twoja wiedza jest w 40 chatach, 200 bookmarkach, 15 dokumentach i glowie. AI nie widzi z tego nic. Za kazdym razem tlumaczysz mu od zera kim jestes, co robisz i jakich masz klientow.
Ten guide to konczy.
Postawisz system w jedno popoludnie. Wrzucasz artykul - AI czyta, streszcza, linkuje z tym co juz masz, zapisuje w twoim vaulcie. Pytasz pytanie - AI czyta wiki, daje ci odpowiedz z cytowaniami, zapisuje odpowiedz jako nowa notatka. Za miesiac masz wyspecjalizowanego agenta wytrenowanego na twojej wiedzy.

## Dla kogo to jest
Trzy use case'y w ktorych to realnie zmienia gre:
**Jak jestes creatorem albo marketerem** - to jest engine do researchu contentu. Wrzucasz competitor breakdowns, trendy z branzy, insighty o audience do raw/. Wiki wyciaga patterny i angle ktorych rekami bys nie znalazl. Idealne pod content ktory ma byc niegeneryczny.
**Jak jestes founderem albo consultantem** - to jest drugi mozg do pracy z klientami, market researchu, competitive analysis. Kazdy raport ktory generujesz wraca do systemu. Po trzech miesiacach AI zna twoja domene lepiej niz wiekszosc ludzi ktorych bys zatrudnil.
**Jak robisz deep research albo prowadzisz biznes knowledge-heavy** - to jest dokladnie to po co Karpathy to zbudowal. Dziesiatki papersow, AI tracking jak pomysly sie lacza, gdzie autorzy sie nie zgadzaja, jakie sa luki. Dziala tak samo dobrze dla R&D w firmie.
Jak zadna z tych trzech sytuacji nie brzmi jak ty - ten guide prawdopodobnie ci sie nie przyda. Wroc do podstawowego setupu Obsidian + Claude Code z poprzedniej rolki. Knowledge graph to poziom wyzej, nie punkt startowy.

## Jak to dziala (60 sekund)
Trzy warstwy:
1. **Raw** - folder z surowymi materialami. Artykuly, transcripty, notatki, PDFy. AI tylko czyta, nigdy nie rusza.
1. **Wiki** - folder ktory AI buduje i utrzymuje sam. Streszczenia, koncepty, polaczenia. Ty czytasz, AI pisze.
1. **Schema** - plik `CLAUDE.md` ktory mowi Claude'owi jak wiki ma wygladac. To jest roznica miedzy chaotycznym chatbotem a zdyscyplinowanym maintainerem.
Trzy operacje:
1. **Ingest** - wrzucasz nowy material. AI go czyta, streszcza, update'uje istniejace strony, laczy z tym co juz masz, loguje w `log.md`.
1. **Query** - pytasz pytanie. AI czyta wiki/index.md, znajduje relevantne strony, syntezuje odpowiedz z cytowaniami. Dobre odpowiedzi zapisuja sie z powrotem do wiki.
1. **Lint** - raz w tygodniu zdrowotny checkup. AI znajduje contradictions, sieroty, broken linki, luki w wiedzy.
I tyle. To caly system. Bez bazy danych, bez embeddings, bez vector store. Tylko foldery i pliki markdown. Claude robi cala robote, ty sourcujesz i pytasz.

## Zanim zaczniesz
Potrzebujesz trzech rzeczy:
1. **Obsidian** - darmowa apka, twoj vault na dysku. Pobierz z [obsidian.md](https://obsidian.md).
1. **Claude Code** - CLI od Anthropic ktory czyta i pisze pliki. `npm install -g @anthropic-ai/claude-code`.
1. **10+ materialow** - cokolwiek co chcesz miec w bazie. Zakladki z zeszlego tygodnia, artykuly, transkrypcje podcastow, notatki z ksiazek.
Jesli nie masz jeszcze setupu Obsidian + Claude Code z `CLAUDE.md`, wroc najpierw do mojej poprzedniej rolki. Tam pokazuje jak to postawic od zera w 30 minut. Ten guide zaklada ze juz masz vault i agenta.

## Krok 1: Struktura folderow (2 minuty)
Otworz Claude Code w katalogu twojego vaulta i wklej:
```plain text
Zbuduj mi knowledge base structure w tym vaulcie.

Utworz nastepujace foldery:

knowledge/
├── raw/              # Source of truth - AI tylko czyta
├── wiki/             # AI pisze i utrzymuje
│   ├── index.md      # Master index
│   ├── log.md        # Activity log
│   ├── sources/      # Streszczenia surowych zrodel
│   ├── concepts/     # Techniki, frameworki, zasady
│   ├── entities/     # Ludzie, marki, narzedzia
│   └── syntheses/    # Cross-source insights
└── CLAUDE.md         # Schema (bedzie w kroku 2)

W index.md stworz strukture z sekcjami: Stats, Sources, Concepts, Entities, Syntheses, Recent activity.

W log.md dodaj naglowek "# Activity Log" i nic wiecej. Log ma byc append-only, chronologiczny, format wpisu:
## [YYYY-MM-DD] {action} | {description}
(actions: ingest, query, lint, explore, brief)

Frontmatter dla index.md:

type: moc
tags: [knowledge, hub]
created: YYYY-MM-DD
updated: YYYY-MM-DD


Pokaz mi strukture po wykonaniu.
```
Claude postawi ci cala strukture w 30 sekund. Sprawdz czy wszystko jest.

## Krok 2: Schema (3 minuty)
To jest krok ktory wszyscy pomijaja. Nie pomijaj.
Schema to plik ktory mowi Claude'owi jak ma operowac na twoim knowledge base. To jest roznica miedzy zwyklym folderem z notatkami a systemem. Bez tego pliku masz AI ktory zgaduje. Z tym pliku masz AI ktory wie dokladnie co robic i jak.
Wklej to do `knowledge/CLAUDE.md` (stworz plik jesli nie istnieje):
```markdown
# Knowledge Base Schema

## Identity
To jest personal knowledge base. AI (Claude) utrzymuje cala strukture.
Czlowiek sourcuje materialy i pyta pytania. AI robi reszte.

## Architecture
- `raw/` - immutable source documents. NIGDY nie modyfikuj.
- `wiki/` - AI-maintained wiki. AI ma pelna kontrole.
- `wiki/index.md` - master index, update po kazdym ingescie.
- `wiki/log.md` - activity log, append-only, format:
  `## [YYYY-MM-DD] {action} | {description}`

## Wiki Rules

1. **Jeden source = wiele notatek.** Z artykulu wyciagnij source summary
   + wszystkie techniki jako concepts + wszystkie osoby/marki jako entities.
   Jeden ingest powinien dotknac 5-15 plikow.

2. **Minimum 3 wikilinki per notatka.** Zero sierot. Jak linkujesz do
   [[concept]] a plik nie istnieje - stworz stub (1 linia definicji + link do zrodla).

3. **Kazdy fakt cytuje zrodlo.** Format: `[Source: [[source-slug]]]` inline
   w zdaniu. Wikilinki w See Also nie wystarczaja - chodzi o traceability.

4. **Flag contradictions.** Jak nowe zrodlo mowi cos przeciwnego niz istniejaca
   notatka, dodaj blok:
   > CONTRADICTION: [stary claim z [[old-source]]] vs [nowy claim z [[new-source]]]

5. **Frontmatter obowiazkowy.** Kazda notatka ma: type, tags, created, updated, status.

6. **Zero em-dashes.** Uzywaj minusow lub przeredaguj zdanie.

## Ingest Workflow
1. Przeczytaj cale zrodlo
2. Przedyskutuj kluczowe takeaways z userem
3. Stworz source summary w wiki/sources/
4. Stworz/update concepts w wiki/concepts/
5. Stworz/update entities w wiki/entities/
6. Update wiki/index.md (dodaj nowe strony, update stats)
7. Flag contradictions jesli sa
8. Append do wiki/log.md: `## [YYYY-MM-DD] ingest | {slug}`

## Query Workflow
1. Przeczytaj wiki/index.md
2. Przeczytaj relevantne strony
3. Syntezuj odpowiedz z cytowaniami `[Source: [[page]]]`
4. Jesli odpowiedz jest wartosciowa, zapisz jako wiki/syntheses/{slug}.md
5. Update wiki/index.md i wiki/log.md

## Lint Workflow
1. Znajdz sieroty (notatki z <3 wikilinkami)
2. Znajdz broken links
3. Znajdz duplikaty concepts/entities
4. Znajdz contradictions miedzy stronami
5. Znajdz stale notatki (updated >60 dni przy status: active)
6. Znajdz em-dashes
7. Output: wiki/lint-report-YYYY-MM-DD.md z severity: HIGH / MEDIUM / LOW
```
To jest manual dla Claude'a. Od teraz kazdy ingest, query, lint idzie dokladnie tak jak chcesz, bez powtarzania zasad.

## Krok 3: Skille (the killer move)
Zamiast kopiowac prompty za kazdym razem, kaze Claude'owi stworzyc **skille** - permanentne komendy w `.claude/skills/` ktore wywolujesz jednym slowem.
Claude Code auto-loaduje skille z folderu `.claude/skills/{name}/skill.md`. Raz je stworzysz, potem uzywasz do konca zycia. Zero copy-paste, zero zapominania.
Wklej to:
```plain text
Stworz mi 5 skilli w .claude/skills/ dla mojego knowledge base.

Dla kazdego skilla stworz folder i plik skill.md z frontmatter YAML:

name: {skill-name}
description: {kiedy uzywac + trigger phrases}


Skille:

1. .claude/skills/kb-ingest/skill.md
   - Name: kb-ingest
   - Description: "Ingest source into knowledge base. Triggers: 'ingest [file]',
     'ingest [url]', 'wrzuc do knowledge base', 'dodaj zrodlo'"
   - Content: Przeczytaj knowledge/CLAUDE.md i wykonaj Ingest Workflow
     dla zrodla ktore user poda (sciezka do pliku w raw/, URL, albo wklejony tekst).
     Postepuj dokladnie wedlug 8 krokow z Ingest Workflow. Na koncu podsumuj
     ile plikow stworzyles, ile update'owales, jakie connections znalazles.

2. .claude/skills/kb-query/skill.md
   - Name: kb-query
   - Description: "Query knowledge base and synthesize answer. Triggers:
     'query [question]', 'zapytaj knowledge base', 'co wiem o'"
   - Content: Przeczytaj knowledge/CLAUDE.md i knowledge/wiki/index.md.
     Wykonaj Query Workflow dla pytania usera. Wazne: po dobrej odpowiedzi
     ZAWSZE zaproponuj zapisanie jej jako synthesis page w wiki/syntheses/.
     To jest compounding loop - pytania staja sie notatkami.

3. .claude/skills/kb-lint/skill.md
   - Name: kb-lint
   - Description: "Health check on knowledge base. Triggers: 'lint knowledge base',
     'kb health', 'sprawdz wiki', 'lint kb'"
   - Content: Przeczytaj knowledge/CLAUDE.md i wykonaj Lint Workflow.
     Output zapisz do wiki/lint-report-YYYY-MM-DD.md z severity HIGH/MEDIUM/LOW.
     Nie naprawiaj sam - pokaz mi liste problemow i zdecyduje co robic.

4. .claude/skills/kb-explore/skill.md
   - Name: kb-explore
   - Description: "Find unexplored connections in knowledge base. Triggers:
     'explore kb', 'znajdz polaczenia', 'co ciekawego w wiki'"
   - Content: Przeczytaj wiki/index.md i zidentyfikuj 5 najbardziej
     interesujacych NIEZBADANYCH polaczen miedzy istniejacymi stronami.
     Dla kazdego polaczenia powiedz: jakie insighty moze ujawnic,
     jakie nowe zrodlo pomogloby je potwierdzic, i czy warto zrobic
     synthesis page. To jest skill do odkrywania patternow ktorych
     sam bys nie zauwazyl.

5. .claude/skills/kb-brief/skill.md
   - Name: kb-brief
   - Description: "Write executive briefing from knowledge base. Triggers:
     'brief on [topic]', 'napisz briefing', 'executive summary o'"
   - Content: Na podstawie zawartosci wiki/ napisz briefing 500 slow
     o temacie ktory user poda. Struktura: current state, key tensions,
     open questions, recommended next steps. Cytuj zrodla przez
     [Source: [[page]]]. Uzywaj TYLKO zawartosci wiki, nie wymyslaj.
     Jesli nie ma wystarczajaco danych w wiki, powiedz wprost i zaproponuj
     jakie zrodla nalezy dodac.

Po stworzeniu, pokaz mi liste skilli i przetestuj czy Claude Code je widzi.
```
Claude stworzy ci 5 skilli. Od teraz odpalasz:
- `ingest artykul.md` - wrzuca source do wiki
- `query jak robic dobry hook` - pyta wiki, syntezuje odpowiedz
- `lint knowledge base` - zdrowotny check
- `explore kb` - znajduje unexplored connections
- `brief on pricing strategy` - executive summary z cytowaniami
Piec slow zamiast pieciu promptow. Arsenal ktory u mnie dziala codziennie.

## Krok 4: Pierwszy ingest (10 minut)
Wybierz pierwszy material. Moze byc artykul z zakladek, transcript z podcastu, notatka z ksiazki. Cokolwiek ci siedzi.
### Opcja A: Artykul z internetu
Zainstaluj **Obsidian Web Clipper** (darmowa extension). Klikasz na dowolnym artykule, Clipper zapisuje go jako czysty markdown prosto do `knowledge/raw/`. Jeden klik.
### Opcja B: Wlasny plik
Skopiuj dowolny plik markdown / PDF / transcript do `knowledge/raw/`.
### Opcja C: Wklejony tekst
Paste tekst bezposrednio do Claude Code (bez zapisywania do pliku).
Potem wklej:
```plain text
ingest knowledge/raw/{twoj-plik.md}
```
Albo:
```plain text
ingest [WKLEJONY TEKST]
```
Claude przeczyta zrodlo, przedyskutuje z toba kluczowe takeaways, pokaze plan plikow do stworzenia/updatu, poczeka na OK, i zrobi cala robote. Po wszystkim dostaniesz podsumowanie: ile plikow stworzone, ile update'owane, jakie connections znalezione.
**Pro tip:** zacznij od artykulu z twojej branzy ktory juz znasz. Dzieki temu zweryfikujesz czy Claude dobrze ekstrakuje insighty i dobrze je kategoryzuje. Jak cos jest zle, poprawisz w `CLAUDE.md` i wiesz co sie dzieje.

## Krok 5: Pierwsze query (the payoff moment)
Tutaj dzieje sie magia. Masz juz 5-10 zrodel w vaulcie. Pora zobaczyc co system potrafi.
Najprostsze query:
```plain text
query jakie sa najwazniejsze insighty z mojego knowledge base
o [TWOJA DOMENA]?
```
Ale to sa query ktore wyciagaja z systemu najwiecej wartosci. Takich pytan nie zadasz ChatGPT bo on nie zna twojej wiedzy. Twoj knowledge base zna.
### Znajdowanie luk
```plain text
query jakie sa 3 najwieksze luki w mojej bazie wiedzy
o [TWOJA DOMENA]? Co powinienem dalej sourcowac zeby je wypelnic?
```
AI widzi czego NIE MA w twojej wiedzy. Poda ci liste rzeczy do researchu ktorej sam bys nie wygenerowal bo nie widzisz wlasnych blind spots.
### Znajdowanie contradictions
```plain text
query ktore zrodla w mojej wiki nie zgadzaja sie ze soba
i dokladnie w czym? Pokaz mi tensions i niech zdecyduje kto ma racje.
```
Drobna roznica zdan miedzy dwoma autorami ktorej sam bys nie zauwazyl. Knowledge base je wychwytuje.
### Odkrywanie polaczen
```plain text
explore kb
```
Jedno slowo. Claude znajduje 5 najbardziej interesujacych unexplored polaczen miedzy tematami w vaulcie i proponuje co z nimi zrobic. To jest moment kiedy system daje ci insighty ktore wyprzedzaja twoje myslenie.
### Executive briefing
```plain text
brief on [TEMAT]
```
500 slow briefingu uzywajac TYLKO zawartosci twojej wiki. Z cytowaniami. Przydatne jak potrzebujesz szybko sprzedac pomysl klientowi albo napisac propozycje - masz gotowa wersje opara na tym co wiesz, nie na tym co AI zgaduje.
### Pod konkretny deliverable
```plain text
query buduje landing page dla [KLIENT]. Temat: [OPIS].
Znajdz w knowledge base wszystkie concepts ktore moge uzyc,
zrodla z najlepszymi przykladami, entities (tworcy, marki)
z ktorych moge sie uczyc, i zaproponuj strukture deliverable
opierajaca sie TYLKO na zawartosci vaulta. Cytuj zrodla.
```
Claude przestaje generowac generyczny content. Zaczyna generowac content oparty na twojej wiedzy. O twoich klientach. Z twoim smakiem.

Po kazdej wartosciowej odpowiedzi Claude zaproponuje zapisanie jej jako synthesis page. Mowisz tak. Odpowiedz laduje jako nowa notatka w `wiki/syntheses/`, linkujaca do wszystkich zrodel ktore uzyla.
To jest compounding loop. Pytanie staje sie odpowiedzia, odpowiedz staje sie notatka, notatka zasila nastepna odpowiedz. Bez tego twoje query znikaja w historii chatu. Z tym wiki staje sie gestsza z kazdym pytaniem.
Po trzech miesiacach masz 30-50 syntheses pages z twoich wlasnych pytan. To jest druga warstwa wiedzy ponad surowymi zrodlami.

## Krok 6: Lint (raz w tygodniu)
Graph gnije jak za nim nie pilnujesz. Raz w tygodniu odpal:
```plain text
lint knowledge base
```
Claude sprawdzi sieroty, broken linki, duplikaty, contradictions, stale notatki. Zapisze raport w `wiki/lint-report-YYYY-MM-DD.md` z severity levels (HIGH, MEDIUM, LOW). Ty przegladasz, decydujesz co naprawic, dajesz Claude'owi OK.
Zajmuje 5 minut. Graph zostaje zdrowy.

## Batch ingest (pro move)
Jak masz 10 bookmarkow na raz, nie rob ingestu dziesiec razy. Wrzuc wszystko do `raw/` i jedna komenda:
```plain text
ingest wszystkie nowe pliki w raw/

Przed rozpoczeciem, zrob batch analysis:
- Czy jakies zrodla dotycza tego samego tematu?
- Czy jakies techniki pojawiaja sie w wielu zrodlach jednoczesnie?
- Czy warto utworzyc synteze dla powtarzajacego sie patternu?

Potem rob ingesty jeden po drugim z cross-references.
Jak concept pojawia sie w 3+ zrodlach, stworz dla niego synthesis page.
```
Dziesiec zrodel naraz to inny poziom wgladu niz dziesiec pojedynczych ingestow. System widzi patterny ktorych pojedynczo nie widzi.

## Gdzie to nie dziala (honest)
Kazdy system ma limit. Lepiej wiedziec teraz niz zlapac na twarz za tydzien.
**Context window ma sufit.** 200K tokenow to okolo 150K slow. Przy 500 source pages Claude nie wczytuje wszystkiego - czyta przez index i robi selekcje. Rozwiazanie: trzymaj `index.md` curated, nie pozwol mu rosnac bez ograniczen.
**Koszt nie jest zero.** Jeden ingest ktory dotyka 10-15 plikow to okolo $0.50-2 na Opusie. 50 zrodel to $25-100 za setup. Rozwiazanie: Sonnet do prostych updateow, Opus tylko do waznej analizy.
**Halucynacje nie znikaja.** Wiki wyglada autorytatywnie wiec czlowiek mniej weryfikuje. Rozwiazanie: krytyczne claims (liczby, cytaty, daty) cytuj inline z `[Source: [[page]]]`. Raz na miesiac spot-check losowe notatki vs raw source.
**Error compounds.** Jedna bledna notatka zasila zle syntheses, zle syntheses daja zle query answers, zle answers prowadza do zlych decyzji. Dlatego lint raz w tygodniu, nie raz na miesiac. I dlatego git init w Kroku 1 - jak cos pojdzie nie tak, cofasz.
**Nie skaluje sie do 10,000 zrodel.** Index-file approach dziala do ~200-300 sources. Powyzej potrzebujesz prawdziwego search (qmd, embeddings). Ten guide jest dla personal i small team, nie enterprise.
Znasz te limity - mozesz z nimi zyc. Nie znasz - zlapiesz na slepo.

## Podsumowanie
Cala operacja w tabeli:
| Krok | Co robisz | Czas |
| --- | --- | --- |
| 1 | Claude buduje strukture folderow + git init | 2 min |
| 2 | Wklej schema do knowledge/CLAUDE.md | 3 min |
| 3 | Claude tworzy 5 skilli (ingest/query/lint/explore/brief) | 5 min |
| 4 | Pierwszy ingest - wrzuc zrodlo, odpal skill | 10 min |
| 5 | Pierwsze query - zobacz payoff | 5 min |
| 6 | Test lint - raz w tygodniu | 5 min |
Razem: 30 minut od zera do dzialajacego knowledge grapha.
Potem:
- Wrzucasz zrodla przez `ingest`
- Pytasz przez `query` (odpowiedzi zapisuja sie same jako syntheses)
- Odkrywasz przez `explore` (unexplored connections)
- Piszesz briefs przez `brief` (500 slow z cytowaniami)
- Sprzatasz przez `lint` raz w tygodniu
Za miesiac masz wyspecjalizowanego agenta wytrenowanego na twojej wiedzy. Nie chatbota. Twojego agenta. Takiego ktory zna twoja branze lepiej niz jakikolwiek generic AI.
I tyle. Dziala.

## Co dalej
Jak juz masz dzialajacy knowledge graph, dwie rzeczy ktore warto dorzucic pozniej:
**Automatyzacje ingestu.** Zamiast kopiowac URL i odpalac ingest, stworz skrypt ktory pobiera video przez yt-dlp, transkrybuje przez faster-whisper, wysyla do Claude'a po analizie, tworzy wszystkie pliki jednym kliknieciem. To juz nie jest lead magnet, to dedykowane narzedzie. Ale warto wiedziec ze sie da.
**Cross-client syntheses.** Jak masz kilku klientow i dla kazdego zbierasz osobny knowledge, po kilku miesiacach zauwazysz ze te same techniki pojawiaja sie u roznych. Wtedy tworzysz syntheses ktore cytuja prace z 3-4 klientow jednoczesnie. To jest moment kiedy twoja baza przestaje byc "ja swiadczacy usluge" a zaczyna byc "studio z wlasnym IP".
Obie rzeczy sa bardziej zaawansowane niz ten guide. Ale to jest kierunek w ktory to idzie.
Jak chcesz zobaczyc oryginalny pattern Karpathy'ego szukaj "karpathy llm wiki gist" na GitHubie. 8K+ gwiazdek, 100K bookmarkow. Moja wersja to jego 3-layer pattern + skills-based execution pod konkretny workflow z Claude Code.

**Potrzebujesz pomocy?**
Jestem Lukasz (luki.zip). wprowadzam ai do biznesów
Jesli masz pytania o ten guide, chcesz pomoc z setupem, albo szukasz kogos kto postawi ci to od A do Z dla twojego biznesu - napisz.
```plain text
lukasz.glica07@gmail.com
```
Odpisuje na kazdego maila. Po prostu napisz co potrzebujesz.
