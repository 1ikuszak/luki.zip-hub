---
title: "AI Skille w Claude Code: produkcyjny system w 30 minut, bez vague promptów"
order: 8
tag: "poradnik"
description: "30+ produkcyjnych skilli, 9 patternów, pętla samonaprawy. Architektura, którą Claude faktycznie egzekwuje. Zero teorii, zero filler'a."
problem: "Vague prompty produkują vague output. Co miesiąc piszesz to samo od zera, a Claude zapomina co działało wczoraj."
dlaKogo: "Founderzy, operatorzy, twórcy, którzy chcą zamienić Claude'a z chatbota w wyspecjalizowanego pracownika z idealną pamięcią."
tools: []
---

Vague prompty produkują vague output. Co miesiąc piszesz to samo od zera, a Claude zapomina co działało wczoraj. Skille to kończą.

Skille to modularne instrukcje, które zamieniają Claude'a z generycznego chatbota w wyspecjalizowanego operatora. Onboarding dla pracownika AI z idealną pamięcią, który wykonuje instrukcje dosłownie. 30+ produkcyjnych skilli, 9 patternów, jeden system, który się sam naprawia.

Wszystko tutaj pochodzi z budowania i iterowania na produkcji. Video produkcja, scriptwriting, content strategy, commercial storytelling, brand voice, generowanie obrazów, operacje biznesowe. Każdy pattern zasłużył sobie na miejsce przez realne użycie. Każdy anty-pattern ma na koncie trupa.

## Anatomia skilla
Każdy skill to samodzielna jednostka. Jeden folder. Wszystko w środku. Zero zewnętrznych zależności.
```plain text
twoj-skill/
│
├── SKILL.md              ← Mózg. SOP + instrukcje.
│   ├── YAML front matter ← Nazwa + opis (tak Claude ZNAJDUJE skill)
│   └── Instrukcje        ← Routing, pipeline, quality gates
│
├── references/            ← Statyczna wiedza (ładowana NA ŻĄDANIE)
│   ├── formula-library.md ← Formuły, szablony, frameworki
│   ├── swipe-file.md      ← Realne przykłady z realnymi danymi
│   └── kill-list.md       ← Anty-patterny z dowodem śmierci
│
├── patterns/              ← Dane o skuteczności (self-updating)
│   ├── winning.json       ← Co zadziałało + dlaczego
│   └── failures.json      ← Co nie zadziałało + dlaczego
│
├── scripts/               ← Deterministyczne narzędzia (Python/Bash)
│   ├── main_script.py     ← Duplikowany per skill, NIE współdzielony
│   └── helpers.py
│
├── feedback/              ← Surowe logi z użytku
│   └── feedback-log.json
│
└── learning/              ← Mechanika samonaprawy
    ├── engine.md          ← Kiedy i jak aktualizować
    └── changelog.json     ← Historia zmian
```
**Dlaczego to działa:** Claude automatycznie indeksuje pliki SKILL.md po YAML front matter. Wpisujesz naturalną komendę. Claude wie, który skill użyć. Każdy folder jest kompletny. Możesz go skopiować, przenieść, zarchiwizować. Nic się nie psuje.
**Warstwy wiedzy mają swój cel:**
`references/` to fundament. Statyczna wiedza bazowa. Formuły, szablony, swipe file. Nie zmienia się często.
`patterns/` to dane z pola walki. Co działa, co nie. Aktualizowane po każdym użyciu.
`feedback/` to surowy input. Każdy output + wynik po publikacji.
`learning/` zamyka pętlę. Reguły ewolucji skilla. Kiedy aktualizować i jak.
Razem = skill, który się uczy.

## Dwie warstwy systemu
Zanim przejdziemy do patternów, musisz zrozumieć jak skille wchodzą w większy system.
```plain text
  WARSTWA ORCHESTRACJI

    TY (lub Claude) decydujesz:
    Który skill? W jakiej kolejności?
    Co z błędem? Czy output jest OK?

  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─

  WARSTWA SKILLI

    [skill A]     [skill B]     [skill C]
     SKILL.md      SKILL.md      SKILL.md
     refs/         scripts/      patterns/

    Każdy skill = samodzielna jednostka
    SOP + narzędzia + wiedza w jednym folderze
```
Warstwa skilli to Twoje narzędzia. Każde jest kompletne.
Warstwa orchestracji to Twoje decyzje. Kiedy, co, w jakiej kolejności. Skille mogą się wzajemnie wywoływać. Hook-engine generuje hook, reel-script-writer pisze ciało skryptu, anti-slop czyści output z AI patternów. Pipeline, nie monolity.
Deterministyczna praca (API calle, transformacje danych, zapis do bazy) idzie do **skryptów**. Decyzje, analiza, kreatywność zostają w **warstwie LLM**.

## 9 patternów, które sprawiają że skille działają
### 1. YAML front matter jako warstwa odkrywania
Pierwszy blok w SKILL.md. To nie metadane. To mechanizm triggerowania. Claude czyta opis każdego skilla, żeby zdecydować, który załadować dla danego requestu. Zły opis = skill nigdy się nie odpali.
```yaml

name: hook-engine
description: "Generuj high-converting hooki przez mining
  Reddit + transformacje przez formuły oparte na danych
  z analizy 120 skryptów 4 twórców (RPN 655K avg,
  Shelby 209K avg). Każda formuła ma view count.
  Triggers: 'napisz hooki', 'hook ideas', 'reel hooks',
  'YouTube titles', 'ad headlines', 'opening lines'."

```
**Co sprawia, że to działa:**
Zaczyna od tego, co robi. "Generuj high-converting hooki." Claude natychmiast zna funkcję.
Zawiera bazę dowodową. "Analiza 120 skryptów 4 twórców." To nie ozdoba. To mówi Claude'owi, że patterny wewnątrz są oparte na danych.
Listuje konkretne trigger phrases. To dokładne słowa, które ludzie wpisują. Claude matchuje się do nich. Pomiń je, a twój skill śpi.
Pisany w trzeciej osobie. "This skill should be used when..." nie "Use this when..." Opis jest wstrzykiwany do system promptów. Trzecia osoba brzmi tam naturalnie.
**Zły opis:**
```yaml
description: "Narzędzie do hooków"
```
Za mało informacji. Claude nie wie kiedy użyć. Nie odróżni tego od stu innych podejść. Twój skill nigdy się nie triggeruje.
**Zasada:** Pisz opis jakbyś odpowiadał na "Czy powinienem teraz czytać ten skill?" dla kogoś, kto ma 40 innych skilli walczących o uwagę.

### 2. Tabela routingu
Nie jeden SOP na wszystko. Różne komendy = różne pliki do załadowania = różne akcje.
```markdown
| User mówi                | Claude czyta                             | Potem robi                      |
|--------------------------|------------------------------------------|---------------------------------|
| "Napisz mi reelsa"      | references/formulas.md                   | Wybiera formułę → skrypt        |
| "Zaudytuj ten skrypt"   | references/kill-list.md                  | Scoring + diagnoza              |
| "Przepisz to"           | formulas.md + patterns/winning.json      | Aplikuje optymalną strukturę    |
| "Co zadziałało ostatnio"| patterns/winning.json                    | Analiza + rekomendacja          |
```
Claude nie ładuje wszystkiego na raz. Ładuje dokładnie te pliki, które są potrzebne dla danego zadania. Mniej kontekstu = lepsze odpowiedzi. Każda ścieżka jest udokumentowana. Zero zgadywania.

### 3. Dane, nie opinie
Każda rekomendacja w skillu ma liczbę. Jeśli nie ma danych, nie należy do skilla.
```markdown
## Non-Negotiable Checklist

| #  | Check                     | Dowód                                             |
|----|---------------------------|----------------------------------------------------|
| 1  | Open loop w hooku?        | Z open loop: 15K avg. Bez: 900 avg. 60x różnica.  |
| 2  | 3+ retention devices?     | r=0.78 korelacja z wyświetleniami                  |
| 3  | Perspective shift 18-30s? | 73% skryptów >500K ma. 17% skryptów <5K ma.        |
| 4  | Forward energy close?     | Soft fade = 1.1K avg. Forward energy = 15K+ avg.   |
```
**Kill lista z body countem:**
```markdown
| Anty-pattern                   | Śr. wyświetlenia | Dlaczego zabija                     |
|--------------------------------|-------------------|-------------------------------------|
| Hedging w hooku ("może...")    | ~2,400            | Neutralizuje urgency                |
| Feature-first bez stakes       | 339               | Odpowiada zanim widz ma powód dbać  |
| Confession bez kosztu/ryzyka   | 240               | Pamiętnik, nie historia             |
```
Nie "powinieneś używać open loops". Ale "skrypty Z open loops: 15K avg, BEZ: 900 avg." Dane kończą dyskusje. Nie ma miejsca na "mi się wydaje."
Kiedy Claude widzi liczby, traktuje instrukcję jako constraint, nie sugestię. Konkretność wymusza compliance.

### 4. Warstwowe formuły
Nie opisuj czego chcesz. Opisz strukturę tego, czego chcesz. Warstwa po warstwie.
Skill do video promptów Kling 3.0 używa formuły 5 warstw:
```plain text
Scena → Postacie → Akcja → Kamera → Audio
```
Każdy prompt podąża za tą kolejnością. Każda warstwa ma konkretne reguły. Claude nigdy nie musi się zastanawiać "od czego zacząć?"
Struktura jest instrukcją.
Ten pattern działa wszędzie. Pisanie, kod, design, analiza. Zdefiniuj warstwy. Zdefiniuj kolejność. Zdefiniuj reguły dla każdej warstwy. Gotowe.

### 5. Pipeline wieloetapowy z jawnymi kosztami
Nie wciskaj wszystkiego w jeden prompt. Rozbij na etapy. Każdy etap = jeden focused call.
```plain text
Etap 0: Klasteryzacja (Haiku)        ~$0.02  |  ~3-5s
  300+ bookmarków → 10-20 klastrów tematycznych

Etap 1: Detekcja trendów (Opus)      ~$0.15  |  ~15-20s
  Klastry → 5-8 trendów z siłą sygnału

Etap 2: Generacja pomysłów (Opus)    ~$0.20  |  ~20-30s
  Trendy + kontekst → 8-12 gotowych pomysłów

Razem: ~$0.37 per run
```
Zasady:
Tani model (Haiku) do pracy na wolumenie. Kompresja, klasyfikacja, proste transformacje.
Drogi model (Opus) do rozumowania. Analiza, kreatywność, decyzje.
Koszt per etap jest jawny. Wiesz dokładnie ile wydajesz.
Jeden etap = jeden cel. Nie "przeanalizuj, sklasteryzuj i wygeneruj pomysły" w jednym prompcie. Single-task prompts konsekwentnie biją multi-task prompts w jakości outputu.

### 6. Trzy warstwy quality gates
Jedna lista kontrolna nie wystarczy. Trzy warstwy łapią różne typy błędów.
**Warstwa 1: Binarny checklist (pass/fail)**
```plain text
[ ] Open loop w hooku?
[ ] 3+ retention devices w body?
[ ] Perspective shift między 18-30s?
[ ] Forward energy close?

Nie przeszło? → Nie wysyłaj. Przepisz.
```
**Warstwa 2: Scoring wagowy**
```plain text
| Element                              | Waga | Pass                   | Fail                |
|--------------------------------------|------|------------------------|---------------------|
| Hook: zero hedging words?            | 2x   | Brak "chyba", "może"   | Jakikolwiek hedge   |
| Hook: bold claim + stakes?           | 2x   | Konkretna liczba       | Ogólny, generyczny  |
| Bridge: eskaluje (nie rozwiązuje)?   | 2x   | Dodaje nowe stakes     | Powtarza/parafraza  |

15/15 = wysyłaj. 12-14 = drobne poprawki. <12 = przepisz strukturalnie.
```
**Warstwa 3: Anty-slop gate (test autentyczności)**
```plain text
1. Czy to jest oparte na obserwacji czy na założeniu?
2. Czy jest wystarczająco specyficzne żeby czuć się jak JEDNA osoba?
3. Czy przetrwałoby w dokumencie? Czy brzmi jak prawda?
4. Przeczytaj na głos. Czy tak byś powiedział?
```
Warstwa 1 łapie błędy strukturalne (brak open loop). Warstwa 2 łapie błędy w wykonaniu (monotonny rytm, ogólne hooki). Warstwa 3 łapie błędy autentyczności (AI slop, generyczne patterny).

### 7. Cross-skill integration
Skille nie powinny być wyspami. Najlepsze skille wywołują inne skille.
```markdown
### Krok 1: HOOK
Generuj hook używając **hook-engine skill**

### Krok 2: SKRYPT
Napisz body używając structural formulas z tego skilla

### Krok 3: JAKOŚĆ
Przepuść przez **anti-slop skill** (detekcja AI patternów)
Zastosuj **brand-voice skill** (kalibracja tonu)
```
Myślenie modularne. Każdy skill robi jedną rzecz dobrze. Razem składają się w pipeline'y, które robią skomplikowane rzeczy niezawodnie. Nie buduj jednego mega-skilla. Buduj klocki i łącz je.

### 8. Feedback loop (samoaktualizacja)
Skill bez feedback loop to skill z datą ważności.
```markdown
## Po dostarczeniu: loguj performance

Kiedy user raportuje wyniki:
1. Loguj do feedback/log.json (data, typ contentu, metryka, score)
2. Jeśli 10+ wpisów → triggeruj przegląd patternów
3. Updatuj patterns/winning.json lub patterns/failures.json
4. Jeśli pattern przeczy istniejącej regule → flaguj do manualnego review
```
Przykład z learning/engine.md:
```plain text
"Co 10 hooków: analizuj formuła × pillar performance.
Jeśli formuła X ma <50% success rate w pillarze Y,
oznacz jako słabą kombinację. Zasugeruj alternatywę."
```
Pierwsze wersje są dobre. Iterowane wersje są świetne. Self-updating wersje to te, których nigdy nie musisz przebudowywać.

### 9. Pętla samonaprawy (self-annealing)
To jest pattern, który sprawia, że system się wzmacnia z każdym błędem.
```plain text
1. Coś się psuje (błąd, zły output, API odmawia)
         ↓
2. Napraw skrypt (fix buga, obsłuż edge case)
         ↓
3. Przetestuj. Upewnij się że działa.
         ↓
4. Zaktualizuj SKILL.md (dodaj learning, zmień SOP)
         ↓
5. System jest teraz silniejszy niż przed błędem
```
Przykład z produkcji:
```plain text
PROBLEM: Notion API odrzuca tekst >2000 znaków.
  Python len("emoji") == 1, ale Notion liczy UTF-16 units,
  gdzie emoji = 2 znaki.

FIX: Zaktualizowano _chunk_text() w skrypcie
  → chunking po UTF-16 length, nie Python length.

LEARNING (dodane do SKILL.md):
  "Notion 2000-char limit liczy UTF-16 code units.
   Emoji to 2 units. Używaj: len(ch.encode('utf-16-le')) // 2"

REZULTAT: Skill już nigdy nie padnie na emoji-heavy tekście.
```
Błąd to nie porażka. To materiał do wzmocnienia systemu. Jeśli coś się psuje i NIE aktualizujesz skilla, ten sam błąd wróci.

> Chcesz pakiet 30+ produkcyjnych skilli + szablon SKILL.md gotowy do użycia? [Pobierz framework](/brain)


## Proces budowy
### Krok 1: Zbierz realne przykłady
Zanim napiszesz jedną linijkę, zbierz 5-10 przykładów zadania, które twój skill ma obsługiwać. Realne inputy i realne outputy. Nie hipotetyczne. Faktyczna robota, którą zrobiłeś albo chcesz replikować.
### Krok 2: Znajdź patterny
Co jest spójne w dobrych? Co zawiodło w złych? Zadanie skilla to zakodować te patterny, żeby Claude mógł je odtworzyć.
### Krok 3: Napisz route table jako pierwszy
"Kiedy user mówi X, Claude czyta Y, robi Z." Zmapuj każdy typ inputu do konkretnego workflow. To staje się szkieletem SKILL.md.
### Krok 4: Zbuduj references
Weź głęboką wiedzę. Formuły, szablony, przykłady, anty-patterny. Jeden plik na temat. Każdy plik samodzielny. Claude ładuje je niezależnie.
### Krok 5: Dodaj quality gates
Minimum: binarny checklist (4-5 pytań pass/fail). Ideał: trzy warstwy (strukturalny, scoringowy, autentyczności). Claude powinien sam się audytować przed prezentacją czegokolwiek.
### Krok 6: Testuj, łam, naprawiaj, aktualizuj
Użyj skilla. Znajdź gdzie failuje. Każdy fail to brakująca instrukcja. Dodaj instrukcję. Zaktualizuj SKILL.md. Przetestuj ponownie.
Najlepsze skille przechodzą 5-10 iteracji zanim się ustabilizują. Pierwsza wersja nigdy nie jest ostatnią. I to jest OK.

## Zasady pisania SKILL.md
**Tryb rozkazujący.** "Wygeneruj trzy hooki" nie "Powinieneś wygenerować trzy hooki." Czasownik na początku. Zero hedgingu.
**Konkretne ilości.** "Minimum 3 retention devices" nie "dodaj kilka retention devices." Vague instrukcje produkują vague output.
**Przykłady dobrego I złego.** Claude uczy się przez kontrast. Pokaż czego chcesz obok tego, czego nie chcesz.
**SKILL.md pod 500 linii.** Reszta idzie do references/. Jeśli główny plik ma 2000 linii, Claude spala tokeny na parsowaniu zamiast egzekwowaniu.
**Tabele do strukturyzowanej informacji.** Claude parsuje tabele szybciej niż zagnieżdżone bullet pointy. Formuły, kryteria scoringu, route tables. Wszystko tabele.

## Promptowe startery
### Starter 1: Nowy skill od zera
```plain text
Stwórz nowy skill w [ścieżka].

Struktura:
- SKILL.md z YAML front matter (name, description z triggerami)
- Tabela routingu: co user mówi → co czytasz → co robisz
- Etapy pipeline'u (jeśli więcej niż 1 krok)
- Quality gate na końcu (minimum: binarny checklist)

Temat: [OPISZ CO SKILL MA ROBIĆ]
Triggery: [JAKIE KOMENDY GO AKTYWUJĄ]
```
### Starter 2: Skill z danymi
```plain text
Przeanalizuj te dane: [WKLEJ DANE / LINK]

Na ich podstawie stwórz skill, który:
1. Ma formuły/szablony oparte na tych danych (każda z metrykami)
2. Ma kill-list anty-patternów (z dowodem dlaczego zabijają)
3. Ma scoring system do oceny outputu
4. Zapisuje feedback do patterns/feedback-log.json

Zapisz z pełną strukturą folderów.
```
### Starter 3: Skill chainujący inne skille
```plain text
Stwórz skill-pipeline który łączy:
- Skill A: [nazwa] → output: [co zwraca]
- Skill B: [nazwa] → input: output z A → output: [co zwraca]
- Skill C: [nazwa] → input: output z B → output: [finalne deliverable]

Każdy etap:
- Jawny koszt (ile tokenów/$$)
- Jawny input/output contract
- Error handling (co jeśli etap padnie)
```
### Starter 4: Transformacja wiedzy w skill
```plain text
Mam te źródła wiedzy: [WKLEJ / PODAJ LINKI]

Przekształć je w produkcyjny skill:
1. Wyekstrahuj actionable formuły/patterny (z przykładami)
2. Zbuduj tabelę routingu dla różnych use case'ów
3. Stwórz references/ z formułami + swipe file
4. Stwórz patterns/ z winning/failure patterns (jeśli są dane)
5. Dodaj quality gate oparty na ekstremalnych przykładach

SKILL.md powinien być samodzielną instrukcją.
Ktoś kto go czyta powinien móc użyć skilla
bez żadnej dodatkowej wiedzy.
```

## Co zabija skille (anty-patterny)
**"Zrób wszystko" w jednym prompcie.** Jeden skill który "pisze hooki, skrypty, audytuje, przepisuje i postuje". Nie. Albo routing table z osobnymi ścieżkami, albo osobne skille. Multi-task prompts = słabszy output na każdym z zadań.
**Brak triggerów w description.** "Narzędzie do hooków" vs "Triggers: 'napisz hooki', 'hook ideas', 'reel hooks'" Druga wersja się sama aktywuje. Pierwsza śpi.
**Ogólne porady zamiast danych.** "Używaj open loops" to porada. "Open loops: 15K avg, bez = 900 avg, 60x różnica" to decyzja. Skille bez danych to instrukcja obsługi bez specyfikacji.
**Statyczny skill bez feedback loop.** Rynek się zmienia. API się zmienia. Twój audience się zmienia. Bez pętli feedbacku skill robi to samo nawet kiedy "to samo" już nie działa.
**Współdzielone helpery.** Jeden `helpers.py` używany przez 8 skilli. Aktualizujesz go dla jednego. Psuje się w trzech. Duplikuj. Każdy skill ma swoją kopię. Izolacja > DRY w tym kontekście.
**Brak quality gate.** Skill bez gate'a to generator contentu, nie system jakości. Minimum: binarny checklist. Ideał: trzy warstwy.
**Over-engineering przed testowaniem.** Wypuść minimalną wersję. Użyj jej. Napraw co się psuje. Pierwsza wersja powinna zająć godziny, nie tygodnie.

## Zasada za tym wszystkim
Skille to nie prompty. Prompty to jednorazowe instrukcje. Skille to systemy.
Dobry prompt daje ci dobry output raz. Dobry skill daje ci spójny output w nieskończoność. Różnica to struktura, dowody, quality gates, feedback loopy i pętla samonaprawy.
Zbuduj system. Niech system robi robotę. Niech się sam naprawia kiedy coś pójdzie nie tak.

I powtórz.

## Co dostaniesz za miesiąc

Wyobraź sobie że za miesiąc twoja praca produkuje się sama w 80%. Hook engine pisze hooki. Reel-script-writer pisze body. Anti-slop czyści output. Brand-voice kalibruje ton. Ty review'ujesz, akceptujesz, publikujesz. To jest godzina dziennie tam, gdzie wcześniej był cały dzień. Skille raz, użytek codziennie.


## Chcesz to zbudować razem?
Ten poradnik daje ci dokładną architekturę. Ale architektura to dopiero początek. Prawdziwa wartość pojawia się kiedy ktoś, kto zbudował 38 takich systemów, siada z tobą i buduje je pod twój biznes.
Pomagam founderom i zespołom integrować AI tam gdzie faktycznie ma to sens. Konkretne skille, pipeline'y i workflow dopasowane do tego, co twój biznes robi codziennie. Content, produkcja, operacje, sprzedaż.
Jeśli masz biznes i widzisz, że AI mogłoby oszczędzić ci czas i zoptymalizować procesy, ale nie wiesz od czego zacząć albo próbowałeś i nie wyszło, napisz do mnie.

lukasz.glica07@gmail.com

Pogadamy, zobaczę jak mogę pomóc.
