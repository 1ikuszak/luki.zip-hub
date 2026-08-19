---
title: "Naucz swojego Claude Code'a dowolnej umiejętności z YouTube'a"
date: "2026-08-11"
order: -9
tag: "poradnik"
description: "Trzy systemy i twój agent uczy się z filmów tego, na co ty nie masz czasu. Dwóch niezależnych czytelników ogląda ten sam materiał, ty czytasz tylko to, o co się pokłócili. Setup na kwadrans."
---

Większość ludzi nie wie, że Claude Code może nauczyć się dowolnej umiejętności. Wystarczy, że nauczysz go oglądać filmy na YouTube.

Nie chodzi o wklejenie linka i prośbę o streszczenie. Wtedy zgaduje z tytułu. Chodzi o system, w którym twój Claude Code ogląda dowolny film, wyciąga z niego obraz i transkrypcję, i uczy się z tego konkretnej wiedzy z konkretnej domeny. Takiej, którą potem możesz aplikować.

Sens jest taki, żebyś ty nie musiał oglądać dziesięciu filmów i podcastów. Poniżej pokazuję, jak to postawić. Potem mówisz agentowi, żeby je obejrzał i nauczył się tej umiejętności, a ty ją tylko stosujesz.

**Shoutout dla [Jensa Heitmanna](https://www.instagram.com/jens.heitmann/), bo to jego robota.** Framework nazywa się The YouTube to Agent Engine i opisał go [tutaj](https://app.notion.com/p/The-YouTube-to-Agent-Engine-3b795decbef981de8322d538b414a467) - przewodnik żyje w jego darmowej społeczności JENS AI, razem z innymi playbookami i gotowymi skillami. Niżej masz instrukcję po polsku. Po oryginał i po resztę jego rzeczy idź do niego, warto.

---

## Dlaczego to działa

Cała metoda stoi na jednym pomyśle: dwóch agentów ogląda ten sam film.

Jeden agent pobiera film i ogląda go lokalnie. Drugi czyta ten sam film po stronie Google, nie pobierając go. Oba działania są niezależne.

Na końcu porównują to, co przejrzeli i czego się nauczyli, i uzupełniają sobie braki. A jeśli wychodzi sprzeczność, dostajesz o niej informację. Jedno podsumowanie od AI czyta się jako jednolicie pewne, więc nie masz jak odróżnić tego, co model odczytał z ekranu, od tego, co dolepił z danych treningowych. Dwa odczyty i lista sprzeczności robią tę różnicę widoczną.

---

## Postaw to u siebie

### 01 - zainstaluj oglądacza

Twój agent umie przeczytać stronę, odpalić skrypt i przejrzeć repo, ale filmu nie obejrzy.

Zamyka to skill `/watch`, open source Brada Bonanno, MIT: [github.com/bradautomates/claude-video](https://github.com/bradautomates/claude-video). Podaje agentowi dwa strumienie naraz - klatki i transkrypt ze znacznikami czasu. Odpowiada wtedy tak, jak ktoś, kto naprawdę obejrzał.

Pod spodem siedzą dwa narzędzia, które już znasz: `yt-dlp` ściąga napisy i pobiera tylko tyle, ile przebieg naprawdę potrzebuje, a `ffmpeg` wycina klatki. Na macOS instalują się same przy pierwszym wywołaniu. Na Linuksie i Windowsie setup wypisuje komendy do wklejenia.

Sprawdź, że działa, zanim pójdziesz dalej:

```
/watch https://youtu.be/dQw4w9WgXcQ co się dzieje w 30 sekundzie?
```

Na wersji webowej włącz najpierw wykonywanie kodu i tworzenie plików w ustawieniach. Skill woła `ffmpeg` i `yt-dlp`, więc bez tego upload się uda, a każdy przebieg padnie.

### 02 - podepnij jeden klucz

Darmowy klucz Gemini z [aistudio.google.com/apikey](https://aistudio.google.com/apikey). To jedyny klucz w całym pipelinie.

```bash
export GEMINI_API_KEY="twoj-klucz"     # dopisz do ~/.zshrc, żeby został
pip install google-genai
```

Darmowy tier pokrywa osiem godzin wideo dziennie. To znacznie więcej tutoriala, niż ktokolwiek przerabia w tydzień.

Płatnej transkrypcji nie ruszaj. `/watch` proponuje Groq i OpenAI jako zapasowe silniki i żaden nie jest ci potrzebny - podaj `--no-whisper` i nigdy się o klucz nie upomni. Natywne napisy pokrywają większość publicznego YouTube, a gdy ich nie ma, drugi czytelnik i tak słyszy audio natywnie. Jeśli chcesz transkrypt na własnym dysku, odpalasz whispera lokalnie:

```bash
pip install faster-whisper
```

Na Apple Silicon jest szybsza droga, która nie instaluje nic na stałe:

```bash
uvx --from mlx-whisper mlx_whisper "audio.wav" \
  --model mlx-community/whisper-large-v3-turbo
```

Jest w tym drugie dno. Płatne API tnie upload na 25 MB, czyli jakieś pięćdziesiąt minut mono, więc długi tutorial jest dokładnie tym przypadkiem, w którym płatna droga pada, a lokalna nie.

Tu jest też powód, dla którego te dwa odczyty są naprawdę niezależne: z `--no-whisper` pierwszy czytelnik nie wysyła nigdzie niczego, wszystko dzieje się na twojej maszynie. Drugi idzie dokładnie odwrotnie, nic nie pobiera i czyta po swojej stronie.

**Trzymaj klucz na darmowym tierze świadomie.** Darmowe klucze wypisują modele pro i zwracają 429, kiedy po nie sięgniesz. W testach porównawczych klasa pro wyprodukowała najbardziej płynny i najbardziej zmyślony opis ze wszystkich. Flash plus twoje własne oczy bije pro plus zaufanie.

### 03 - pierwszy czytelnik ogląda tutorial

```
/watch [adres tutoriala] --detail balanced --no-whisper
```

Dorzuć `--resolution 1024`, kiedy tutorial to głównie terminal albo kod. Przy domyślnych 512 pikselach szerokości nie odczytasz komend, po które przyszedłeś.

Kiedy przeczyta klatki, każesz mu napisać spec w sześciu sekcjach: co się buduje, stack i wymagania wstępne, komendy i konfiguracja verbatim, kolejność budowania, pułapki, i czego film nie pokazuje.

"Streść ten film" daje opis filmu. Sześć sekcji daje spec. Piąta i szósta to te, które ratują wieczór: każdy tutorial ma moment, w którym prowadzący rzuca mimochodem "aha, to musisz mieć już zrobione", i ta jedna uwaga bywa warta więcej niż cała reszta czasu trwania.

**Zapisz ten odczyt i nie zaglądaj do wersji drugiego modelu, zanim plik nie będzie gotowy.** Jeśli przeczytasz cudzą wersję pierwszy, zakotwiczysz się na niej, zgodzisz się z rzeczami, których nigdy nie sprawdziłeś, i druga opinia po cichu przestanie być drugą opinią. Kolejność jest tu całą wartością.

### 04 - ten sam film idzie do Gemini

Skrypt dostaje adres i oddaje spec. Adres leci do Gemini jako część wideo i nic się nie pobiera, bo Google pobiera go po swojej stronie.

Dwie rzeczy w tym kroku robią realną robotę.

**Łańcuch modeli spada w przód** przez kolejne modele flash, aż któryś odpowie. Darmowe klucze chętnie wypiszą modele pro i zwrócą 429 w momencie wywołania, więc łańcuch ratuje cię przed martwym przebiegiem.

**Dwie próbki to nie redundancja, tylko pomiar.** Model jest świadkiem stochastycznym: ten sam film, ten sam prompt, materialnie inny spec za każdym razem. Twierdzenie, które pojawia się w obu próbkach, jest warte budowania. Twierdzenie z jednej próbki to model zgadujący, i teraz widzisz, które jest które, zamiast brać jedną pewnie brzmiącą odpowiedź na wiarę.

Okno dziewięćdziesięciu sekund przy jednej klatce na sekundę wyszło na realnym przebiegu jakieś 8600 tokenów wejściowych, więc domyślne sześćset sekund jest tanie i mieści się w darmowym tierze z zapasem.

Zostaw jedną klatkę na sekundę, chyba że giną komendy. Podnoś tylko wtedy, gdy prowadzący pisze szybko, i wiedz, że mnożysz sobie tokeny.

### 05 - pogódź dwa odczyty

Kładziesz oba pliki przed agentem i każesz mu zrobić jedną specyfikację, w której **każda linia niesie etykietę**:

- **POTWIERDZONE** - oba odczyty to mają. Buduj bez dalszego sprawdzania.
- **JEDNO ŹRÓDŁO** - ma to tylko jeden. Zostaw, oznacz, napisz który.
- **SPRZECZNE** - odczyty się różnią. Nie uśredniaj i nie wybieraj pewniejszego. Wróć do konkretnych klatek, które to rozstrzygają, i napisz, co zobaczyłeś.

To jest krok, który zamienia dwa średnie odczyty w jeden dokument, któremu można ufać. To też krok, który ludzie pomijają.

Do tego trzy twarde reguły. **Wywal każdy znacznik czasu, licznik i długość** - żaden czytelnik nie ma zegara, obaj rekonstruują czasy i obaj mylą się o całe sekundy. **Zostaw dokładne ciągi znaków** - komendy, nazwy pakietów, klucze konfiguracji zostają dosłowne, nigdy parafrazowane. **Flaguj pułapkę archetypu** - model raportuje, co ten RODZAJ filmu zwykle zawiera, zamiast tego, co było w tym konkretnym; jak linia czyta się gładziej niż sąsiednie, sprawdź ją pierwszą.

Na końcu lista **pytań otwartych**: wszystko, czego żaden odczyt nie widział, plus wszystko, co zostało sprzeczne. To najcenniejszy wynik całego przebiegu i jedyny, który warto trzymać po tym, jak build już wyjedzie. To spisany rejestr tego, czego tutorial nigdy cię nie nauczył, czyli dokładnie lista rzeczy, które pękną później.

### 06 - zbuduj i odpal raz

Oddajesz specyfikację do [skill-creatora Anthropica](https://github.com/anthropics/skills) i mówisz wprost, że pochodzi z filmu: linie potwierdzone są bezpieczne, te z jednego źródła są niesprawdzone i mają padać głośno zamiast zakładać, a pytania otwarte nie są zaimplementowane wcale i ma o nie dopytać zamiast zgadywać. Wypyta cię przez minutę i zapisze skill.

Potem odpal to raz, na prawdziwym wejściu, i napraw, co pękło. **To nie jest opcjonalne i to jest miejsce, w którym większość ludzi się zatrzymuje.** Skill zbudowany z filmu i nigdy nie wykonany to streszczenie filmu w przebraniu skilla. Pierwszy realny przebieg jest tym, co zamienia go w narzędzie, i zwykle kosztuje jedną rundę poprawek.

Zostają ci trzy artefakty zamiast jednego, każdy robi co innego. Specyfikacja to z czego zbudowałeś, notatki to dowody, skill to rzecz, która działa. Za trzy miesiące, kiedy zacznie świrować, czytasz wstecz do konkretnej linii, widzisz jej etykietę i od razu wiesz, czy błąd jest twój, czy tutoriala.

---

## Drobny druk

**Kredyt tam, gdzie należy.** Skill `/watch` jest open source na licencji MIT, zbudował go Brad Bonanno, i stoi na `yt-dlp` oraz `ffmpeg`. `skill-creator` jest Anthropica. Framework jest Jensa. Ten tekst to przejazd po tym wszystkim po polsku, nie zamiennik żadnej z tych rzeczy.

**Nic z tego nie musi kosztować.** Narzędzia są darmowe, napisy są darmowe, darmowy tier Gemini pokrywa osiem godzin YouTube dziennie, a transkrypcja filmów bez napisów idzie lokalnie. Jedyny koszt to subskrypcja agenta, którą i tak płacisz.

**Tylko filmy publiczne.** Gemini nie przyjmie prywatnych ani niepublicznych adresów, a `/watch` nigdzie się nie loguje. Jeśli `yt-dlp` nie dosięgnie filmu bez uwierzytelnienia, żadna połowa tego pipeline'u też nie.

**Nazwy modeli się ruszają.** Skrypt idzie łańcuchem przez kilka modeli flash, bo nazewnictwo i dostępność zmieniają się szybciej, niż jakikolwiek poradnik nadąży. Jeśli padną wszystkie, sprawdź aktualną listę, zamiast zakładać, że skrypt jest zepsuty.

**Uczciwa granica.** To produkuje bardzo dobry pierwszy szkic skilla. Nie produkuje przetestowanego. Krok 06 istnieje, bo przerwa między "spec wygląda dobrze" a "zadziałało" jest miejscem, w którym każdy taki build faktycznie się kończy.

---

## Ściąga

1. Zainstaluj `/watch` z `bradautomates/claude-video`. Sprawdź na krótkim filmie, że działa
2. Darmowy klucz Gemini z AI Studio. Jeden klucz na cały pipeline, zostaw go na darmowym tierze
3. Pierwszy agent ogląda film lokalnie i pisze spec w sześciu sekcjach. Zapisz do pliku
4. Drugi agent dostaje ten sam link i czyta go w Google. Nie zaglądaj tu przed krokiem 3
5. Pogódź oba w jedną specyfikację z etykietami. Czytasz tylko sprzeczne
6. Specyfikacja idzie do skill-creatora, a potem odpalasz skill raz na realnym wejściu

---

*Framework: The YouTube to Agent Engine, [Jens Heitmann](https://app.notion.com/p/The-YouTube-to-Agent-Engine-3b795decbef981de8322d538b414a467) - jego przewodnik, jego społeczność, jego pomysł na dwóch niezależnych czytelników. Śledź go na [@jens.heitmann](https://www.instagram.com/jens.heitmann/).*
