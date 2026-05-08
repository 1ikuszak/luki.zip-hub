---
title: "AI Content System: 3 kroki +2K followers w 30 dni"
date: "2026-05-06"
order: 1
tag: "poradnik"
description: "Trzy kroki w tej kolejności: research z Reddita + Claude Code, analiza top rolek u top twórców, twój własny styl. Zdobyłem 2K followers w 30 dni"
---

Większość osób używa AI do contentu źle. Generują generyczne posty, kopiują viralowe formaty, zalewają siebie i swoją grupę szumem.

Ten poradnik to kończy.

Tym systemem zdobyłem 2 tysiące followersów w 30 dni. Trzy kroki, w tej kolejności.

Ja też tak miałem. Pół roku temu pisałem skrpyty z ChatGPT na czuja, sam myślałem na hookami. Po wdrożeniu systemu: jest lepiej znacznie lepiej w ty miesiącu moje konto urosłyo o 30% z 4k do 6k followersów dwie rolki 50k+ viewsów. Różnica jest w tym że teraz piszę z DANYCH, nie z głowy.

---

## Jak to działa (60 sekund)

Trzy kroki:

1. **Treść.** Co boli twoją grupę. Wyciągasz dane z Reddita i forum, Claude Code analizuje archetyp, dostajesz słownictwo z pierwszej ręki.
2. **Hook.** Co się klika w twojej niszy. Pobierasz 100 rolek od top twórców, transkrybujesz ze statystykami, wyciągasz wzorce.
3. **Styl.** Twój własny voice. Bez tego masz dane i hooki ale wyglądasz jak każdy inny.

Pierwsze dwa kroki to research + engineering. Trzeci krok to ty. W świecie który jest na 80% zautomatyzowany, twój styl jest tym co ludzie kupują.

---

## Dla kogo to jest

**Jak jesteś solo creatorem albo coachem** - dość zgadywania co napisać. System wyciąga ci dokładne zdania które mówi twoja grupa, dopasowuje hooki które się klikają. Przestajesz strzelać, zaczynasz trafiać.

**Jak jesteś founderem albo robisz growth** - dość copy które pisze marketingowiec według feelingsów.

**Jak prowadzisz agencję albo robisz content dla klientów** - dość opierania się na tym co klient ci powie o swojej grupie. 

Jak żadna z tych trzech sytuacji to nie ty, ten guide ci się nie przyda. To nie jest poradnik "jak zacząć". To jest dla osób które już coś robią i chcą robić to lepiej.

---

## Co potrzebujesz

1. **Claude Code** (`npm install -g @anthropic-ai/claude-code`) lub Claude/ChatGPT na webie jak chcesz prościej
2. **Twoja nisza zdefiniowana** - "trener kobiet po 30" lepiej niż "fitness", "AI tools dla creatorów" lepiej niż "AI". Im węższe tym lepiej.
3. **Weekend na pierwszy cykl**

---

## Krok 1: Treść (research, ~1h)

Cel: wyjść z tego kroku z mapą bólów, słownictwa i archetypu twojej grupy. Bez tego piszesz dla siebie. Z tym piszesz dla nich.

### 1.1 Mapa źródeł

Wpisz do Claude Code:

```
Pomóż mi zmapować gdzie online rozmawia [TWOJA GRUPA DOCELOWA].

Konkretnie szukam:
- 5-10 najbardziej aktywnych subredditów
- 3-5 forów lub grup FB
- 2-3 hashtagów na X/IG ktore prowadzą do rozmów
- 2-3 podcastów których słuchają

Skup się na źródłach gdzie ludzie SAMI piszą o swoich problemach,
nie gdzie eksperci wykładają.
```

### 1.2 Pobranie danych

Najłatwiej Reddit JSON endpoints. Bez logowania, bez konta dewelopera:

```
https://www.reddit.com/r/{subreddit}/top.json?t=month&limit=100
```

Z Claude Code:

```
Zbuduj mi skill który:
1. Bierze listę subredditów (z pliku txt)
2. Dla każdego pobiera top 100 postów z ostatniego miesiąca
3. Filtruje posty z >50 komentarzami i >100 upvotami
4. Pobiera top 20 komentarzy do każdego posta
5. Zapisuje do data/reddit-{nisza}.json
6. Rate limit 1 sec między requestami
```

3 minuty buildu, masz dane.

**Bez kodzenia:** otwórz top 5-10 postów ręcznie, skopiuj tytuł + treść + top 5 komentarzy do jednego pliku tekstowego. Działa, wolniej.

### 1.3 Archetyp

Tu się dzieje magia. Surowe dane z Reddita nic nie dają. Claude analizujący te dane - wszystko:

```
Przeanalizuj data/reddit-{nisza}.json. Wyciągnij archetyp:

1. KIM SĄ. Wiek, sytuacja, zawód, etap rozwoju. Cytaty.
2. GDZIE SĄ TERAZ. Status quo, co próbowali, co nie działa. Cytaty.
3. GDZIE CHCĄ BYĆ. Jaki rezultat zmieniłby życie. Cytaty.
4. CO BOLI. 5 najczęstszych frustracji + 2-3 cytaty per frustracja.
5. SŁOWNICTWO. 20 słów/fraz które SAMI uzywają (ich, nie moich).
6. CZEGO PRÓBOWALI. Lista produktów/podejść które odpadły.
7. KOMU UFAJĄ. Twórcy, marki, autorytety które wracają.

Każdy claim podparty cytatem. Bez wody. Surowe insighty.
```

Wychodzisz z dokumentem wartym więcej niż 90% kursów online. Bo to nie są twoje teorie. To są ich słowa.

Ten dokument zostaje na zawsze. Update raz na 2-3 miesiące. Każdy hook, post, landing piszesz Z TEGO DOKUMENTU. Nie z głowy. Nie z ChatGPT. Z dokumentu.

---

## Krok 2: Hook (engineering, ~1h)

Cel: zrozumieć jakie hooki działają w twojej niszy. Nie ogólne "best hooks 2026". Hooki z konkretnymi statystykami u twórców obok ciebie.

### 2.1 Wybór twórców

Nie idole. Wybieraj kogoś kto:
- Ma rozmiar do którego dążysz (5-50K followers)
- Robi rolki w twojej niszy
- Ma views >5x followers
- Tworzy konsekwentnie min 6 miesięcy

3-5 twórców. Więcej = przeciążenie. Mniej = za mały sample.

### 2.2 Pobranie 100 rolek

**UWAGA:** używaj innego konta IG niż twoje główne. Ryzyko bana małe ale po co ryzykować.

Z Claude Code:

```
Skrypt python który:
1. Instaloader pobiera 100 rolek z @{username}
2. Filtruje tylko reels (typename=GraphVideo, is_video=true)
3. Ściąga mp4, ekstraktuje audio przez ffmpeg do 16kHz mono wav
4. Transkrybuje przez faster-whisper (model "base", language "pl")
5. Zapis do data/{username}-reels.json:
   shortcode, caption, view_count, like_count, comment_count,
   timestamp, duration, transcript
6. Rate limit 5 sec między requestami
```

**Bez kodzenia:** otwórz profil twórcy, weź 20-30 top rolek, skopiuj caption + views + comments. Dla 5 najlepszych zrób transkrypt ręcznie. Skala mniejsza, workflow ten sam.

### 2.3 Analiza wzorców

```
Mam transkrypty 100 rolek od {twórca}. Wyciągnij:

1. TOP 10 po views. Per rolka: hook, struktura, thesis,
   views/likes/comments, ratio views/comments.
2. WZORCE HOOKÓW. Jakie formuły dominują (confession,
   contrarian, named concept, time compression, news hijack)?
   Open loop w pierwszych 3 sekundach? Pierwsze słowo? Liczby?
3. WZORCE STRUKTURY. Ile beatów? Perspective shift?
   Gdzie CTA? Named concept?
4. PROBLEMY. Jakie pain points pojawiają się w top 10?
5. ROLKI DO REBUILDU. 3-5 rolek z top 20 z dobrym hookiem
   ale przeciętną realizacją (ich pomysł + twoja egzekucja).
6. ANTI-PATTERNS. Co zawalili w bottom 10?
```

Powtarzasz dla 3-5 twórców. Potem meta-analiza:

```
Mam analizy 5 twórców w mojej niszy. Zrób meta:

1. Jakie formuły hookow działają najczęściej (top 10 u każdego)?
2. Pierwsze słowa które rozpoczynają top rolki?
3. Tematy które pojawiają się u 3+ twórców w top 10?
4. Signature moves każdego twórcy (co ich odróżnia)?
5. LUKI - tematy palące w archetypie ale nikt z 5 ich nie pokrywa?

Te luki + działające formuły + pierwsze słowa = roadmapa
contentu na 30 dni.
```

### 2.4 Co naprawdę działa (forensic data ze 120 scriptów)

**Open loop w pierwszych 3 sekundach.** 11% open loops u twórcy = 5.9K avg views. 50% open loops u twórcy = 655K avg views. Po hooku widz NIE MOŻE odpowiedzieć "no i co". Jak może, przewinie. Test: zasłoń cały script poza hookiem. Widz wie o czym to będzie? Źle.

**Bold claim, zero hedgingu.** "Prawdopodobnie", "chyba", "wydaje mi się" = avg 2.4K views. Bold claim postawiony absolutnie = 15K+ avg. Jak nie wierzysz, nie mów.

**Specyficzność.** Liczby, timeframes, konkrety. "6 tysięcy followers w 6 miesięcy" > "dużo followers szybko". "21 godzin pracy dziennie" > "ciężka praca".

**Stakes obecne.** Coś na ryzyku, koszt zapłacony, konsekwencja sugerowana. Confession + stakes = 15.4K avg. Confession bez stakes = 240 avg. Różnica 64x.

### 2.5 Top 5 formuł hookow z avg views

1. **News Hijack + Bold Claim** (1.95M avg)
   `[NARZĘDZIE] właśnie [SIĘ STAŁO]. [NIKT NIE WIDZI] [IMPLICATION].`
   "OpenAI właśnie wypuściło o3. Nikt nie zauważa że to kończy cały content marketing."

2. **Contrarian Reframe** (2.3M avg)
   `[SACRED COW] jest [DEAD/WRONG]. [REAL TRUTH].`
   "Kursy online są skończone. Ludzie kupują kształt jaki ich twórca ma na Insta, nie wiedzę."

3. **Time-Compression + Specificity** (992K avg)
   `[NUMBER] [THINGS] w [SHORT TIME]. Zaczynamy.`
   "5 narzędzi AI które zastąpiły mi 30 godzin pracy w tygodniu. Po kolei."

4. **Confession + Specificity** (757K avg)
   `[SPECIFIC RESULT] w [TIMEFRAME]. [CONTRARIAN LESSON].`
   "Z 0 do 6 tysięcy followers w 6 miesięcy. Bez ani jednego viral hita."

5. **Named Concept + Curiosity Gap** (524K avg)
   `Nazywam to [NAME]. [ONE-LINE TEASE].`
   "Nazywam to Anti-Slop Filter. Każdy hook który mi go nie przejdzie, kasuję."

---

## Krok 3: Styl (na zawsze)

Tu większość poradników kończy się na "i pamiętaj o autentyczności". To nie wystarczy.

### 3.1 Dlaczego styl wygrywa

Możesz zrobić kroki 1 i 2 idealnie. Próbujesz zaadaptować top hook konkurencji jeden do jednego. Idziesz na 1/10 jego wyników.

Bo:
- Algorytm widzi że to kopia
- Widzowie czują że nie pasuje do ciebie
- Profil jest niespójny, każda rolka inna estetyka
- Zaufania nie zbudujesz, za każdym razem widzą nową osobę

W świecie który automatyzuje 80% contentu, twoja unikalność jest jedynym moatem. Cena produktów spada bo każdy ma AI. Cena ZA CIEBIE rośnie bo jest tylko jeden ty.

### 3.2 Trzy warstwy stylu

**Wizualna:** czcionka (max 2), paleta (3-5 kolorów), kadr (full body / OTS / close up), edycja (cuts, transitions, pacing), grading (warm / cool / desaturated).

**Językowa:** słowa-podpisy (twoje wyrażenia które wracają), struktura zdań (krótkie? długie?), interpunkcja (kropki dla rytmu), język (czysty polski / Polglish / branżowy slang), odmowy (słowa które BANUJESZ).

**Narracyjna:** lore (skąd jesteś, jak doszedłeś), 3-5 powtarzających się tematów (nie 20), 3-5 hill to die on (twoje kontrowersje), krążące przykłady (klienci, sytuacje wracające w różnych rolkach).

### 3.3 Eksperyment (pierwsze 30-60 rolek)

Nie masz jeszcze stylu, odkrywasz go. To jest niezbędne.

Workflow:

1. Wybierz 5 działających formuł z kroku 2. Zrób 5 rolek w 5 stylach:
   - Dynamiczna z dużo cuts
   - Spokojna, statyczna
   - Talking head bez b-rollu
   - Voice-over + b-roll
   - Eksperymentalna (cinematic, jakaś estetyka)

2. Po 5 rolkach poproś Claude:

```
Weź moje 5 ostatnich rolek (transkrypty + statystyki + opisy wizualne).

1. Która performowała najlepiej (views, ratio views/comments)?
2. Co łączy moje 2-3 najlepsze rolki?
3. Co łączy moje 2-3 najsłabsze?
4. Gdzie jestem najbardziej AUTENTYCZNY (mówię najnaturalniej,
   wyglądam najpewniej)? Cytuj fragmenty.
5. Gdzie udaję (próbuję stylu kogoś innego)? Cytuj.
6. 3 elementy które mogą być moim signature movem.

Output: dokument moj-styl-v1.md.
```

3. Update co 30 rolek. Część rzeczy z v1 ostanie się, część odpadnie. Stopniowo widzisz że masz signature którego inni nie mają.

### 3.4 Mindset shift

Największy blok: "ale tak nie wyglądają inni twórcy".

Dokładnie.

Inni kopiują się nawzajem. Wszyscy używają tych samych templates. W świecie gdzie każdy ma AI dające ten sam output, RZADKOŚĆ jest najcenniejszym zasobem.

**Nie bój się:** mówić spontanicznie z błędami w mowie, używać słów których inni nie używają, pokazywać własnej estetyki, powtarzać swoich opinii, opowiadać swojego lore.

**Bój się:** wyglądać jak każdy inny, robić copies bez własnej warstwy, zmieniać styl co tydzień, używać ChatGPT do pisania całych captions bez własnej redakcji.

Po 100 rolkach masz styl. Po 200 ludzie rozpoznają cię z 1 sekundy.

---

## Pełen workflow

| Krok | Co robisz | Czas | Output |
|------|-----------|------|--------|
| 1.1 | Mapa źródeł niszy | 5 min | mapa.md |
| 1.2 | Pobranie top dyskusji (Reddit JSON) | 10 min | reddit-data.json |
| 1.3 | Wyciągnięcie archetypu | 10 min | archetyp.md |
| 2.1 | Wybór 3-5 top twórców | 5 min | tworcy.md |
| 2.2 | Pobranie 100 rolek + transkrypty | 30 min | reels-data.json |
| 2.3 | Analiza wzorców + meta | 20 min | analiza.md |
| 2.4 | Roadmapa contentu 30 dni | 10 min | roadmapa.md |
| 3.1 | 5 eksperymentów (5 rolek w 5 stylach) | 7 dni | rolki + stats |
| 3.2 | Analiza własnego stylu | 15 min | moj-styl.md |
| 3.3 | Iteracja stylu co 30 rolek | ciągle | moj-styl-vN.md |

Pierwszy cykl: 1 weekend na kroki 1-2. Krok 3 to proces 30-90 dni.

---

## Co dalej

**Automatyzacja krążeń.** Krok 1 (Reddit) i 2.3 (analiza per twórca) odpalasz co miesiąc jednym promptem. Update danych co miesiąc, refresh archetypu i wzorców co kwartał.

**Testy A/B na hookach.** 5 formuł wyżej to forensic data z innych twórców. Twoja nisza może mieć inne wzorce. Po 30 swoich rolkach zrób meta-analizę: która z 5 działa u CIEBIE? Ta wygrywa.

---

## Podsumowanie

Trzy kroki, w tej kolejności:

1. **Treść** = research z Reddit + Claude Code analiza archetypu → wiesz co boli twoją grupę i ICH słowami
2. **Hook** = engineering z forensic data (100 rolek u 5 twórców) → wiesz co działa w niszy
3. **Styl** = ty (eksperyment + iteracja co 30 rolek) → jesteś nie do skopiowania

Pierwsze dwa kroki da się zrobić w jeden weekend. Trzeci to praca na zawsze. Bez trzeciego masz kopię. Z trzecim masz biznes.

Wyobraź sobie że za 90 dni twoje rolki wyglądają jak nikt inny w niszy. Nie bo masz lepsze narzędzia, każdy ma te same. Bo piszesz z danych, nie z głowy. I twój styl jest jeden.

W świecie automatyzacji content tworzony bez stylu wygląda jak AI. Content ze stylem wygląda jak ty. Tylko jeden z nich ludzie zapamiętają.
