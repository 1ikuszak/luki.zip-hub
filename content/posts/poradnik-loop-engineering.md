---
title: "Loop engineering: dlaczego przestałem promptować AI i co robię zamiast tego (z przykładami, które dają 10x)"
date: "2026-06-23"
order: -3
tag: "poradnik"
description: "Loop engineering to następny krok po prompt engineeringu. Przestajesz klikać każdy krok i projektujesz pętlę, która robi to za ciebie. Trzy gotowe pętle do skopiowania plus jedna rzecz, której konkurencja ci nie podbierze."
---

Twój system AI jest tak szybki, jak ty przy klawiaturze. I to jest twój problem.

Promptujesz task po tasku. Piszesz, czekasz, czytasz output, poprawiasz, piszesz następny. Przy każdym kroku siedzisz ty. AI mogłoby kręcić robotę w kółko, ale ty wpinasz się między każdy krok i wszystko zatrzymuje się na tobie. Masz najszybszy silnik świata i trzymasz nogę na hamulcu.

Boris Cherny, szef Claude Code w Anthropic, rozwiązał to jednym zdaniem: nie promptuję już Claude'a, mam pętle, które chodzą same, a moja robota to pisać te pętle. Branża nazywa to loop engineering. W 2023 wszyscy gadali o prompt engineeringu, w 2025 o context engineeringu, teraz o pętlach. Ten sam skill pod spodem, inna etykieta.

Pokażę ci o co chodzi, dlaczego to realnie zmienia twój output, i dam ci trzy pętle, które odpalisz dziś. Jedną nawet bez kodu, w 30 sekund. A na końcu rzecz, o której prawie nikt nie gada: że pętla jest warta tyle, ile dane, które jej podłożysz. To jedyna część, której konkurencja ci nie skopiuje.

---

## Co przez to tracisz

Trzy rzeczy, konkretnie.

Czas. Każdy krok przechodzi przez ciebie, więc robisz dziesięć rund tam, gdzie mogłaby chodzić jedna pętla bez ciebie.

Tokeny. Na każdej turze agent re-wysyła cały kontekst plus każdy wcześniejszy wynik narzędzia. Przy dziesiątej turze płacisz za przetworzenie dziesięciu kopii tego, od czego zacząłeś. Koszt rośnie nie od pisania. Rośnie, bo co turę niesiesz cały plecak od nowa.

Jakość. Jak robisz coś ręcznie przez godzinę, ostatni output jest gorszy niż pierwszy, bo jesteś zmęczony. Pętla się nie męczy. Ty tak. I tu rodzi się slop.

---

## Czym właściwie jest loop engineering

Loop engineering to prosta zmiana. Przestajesz być osobą, która promptuje agenta. Projektujesz system, który robi to za ciebie.

Najprostszy obraz, jaki znam: redaktor z kartką.

Jeden agent pisze. Drugi czyta i ocenia, jak redaktor. Co słabe wraca do poprawki i leci od nowa, aż przejdzie. Ty odpalasz cel raz, a pętla kręci się sama.

Pod spodem są trzy klocki:

- **maker** robi robotę
- osobny **checker** ją ocenia
- **stan żyje na dysku**, w pliku, nie w głowie agenta

Dlaczego osobny checker, a nie ten sam agent? Bo model oceniający własną robotę jest dla niej za miły. Uzasadnia to, co już napisał, zamiast łapać, gdzie zawalił. Świeży agent, w osobnym oknie kontekstu, czyta to bez ego. Widzi rzeczy, które autor sobie wmówił. Dokładnie dlatego redakcja w gazecie to inna osoba niż ta, która napisała tekst.

Stan na dysku brzmi nudno, a jest kręgosłupem całej rzeczy. Agent zapomina wszystko między runami. Plik nie. Jak pętla trzyma w pliku, co już zrobione i co jeszcze otwarte, to może wrócić do roboty po godzinie albo po dwóch dniach i wie, gdzie skończyła. Bez tego każdy run startuje od zera i powtarza te same błędy.

I ostatnia rzecz, bez której pętla pali kasę: exit. Warunek stopu ustawiasz przed startem, nie w trakcie. Coś typu "popraw tylko poważne rzeczy, maksymalnie dwie rundy, koniec gdy wszystko przejdzie standard". Pętla bez warunku stopu kręci się i przepala tokeny, aż ją zabijesz ręcznie.

---

## Dlaczego to zmienia grę

Prompt to jeden ruch. Pętla to dźwignia.

Ustawiasz ją raz, a ona robi twoją robotę w kółko i sama łapie, co słabe. Robota, która zajmowała ci godzinę klikania, dzieje się raz, bez ciebie. Przestajesz być wąskim gardłem.

Kiedyś wygrywał ten, kto lepiej pisał prompty. Teraz ten, kto lepiej projektuje pętlę, która te prompty pisze za niego. Ta sama gra, tylko grasz ją piętro wyżej i przestajesz klikać.

---

## Trzy pętle, które dają 10x

Trzy pętle, od najprostszej do najmocniejszej. Każdą odpalisz dziś.

### 1. Najprostsza pętla, jeden prompt, zero kodu

Otwierasz Claude albo ChatGPT i wklejasz coś takiego:

```
Napisz 10 hooków do reela o [temat].
Po każdym oceń go w trzech punktach: czy zatrzymuje scroll, czy jest konkretny, czy brzmi naturalnie.
Słabe odrzuć i przepisz.
Powtarzaj, aż 8 na 10 przejdzie wszystkie trzy punkty.
Nie pytaj mnie o nic po drodze. Pokaż dopiero finał.
```

Cel, kryteria, poprawka, stop. Cała pętla w jednym oknie czatu. Model pisze, sam siebie ocenia względem twoich kryteriów, odrzuca słabe i kręci dalej, aż trafi w próg, który ustawiłeś.

To nie jest trik tylko na hooki. Podmień pierwszą linijkę na cokolwiek: opisy produktów, cold maile, nagłówki, pomysły na nazwy. Reszta szkieletu zostaje. Najważniejsze są dwa zdania na dole. "Powtarzaj aż" daje warunek stopu. "Nie pytaj mnie o nic" zamyka pętlę, żeby nie zatrzymywała się co krok i nie robiła z ciebie znowu wąskiego gardła.

### 2. Rozbij ją na zespół

Jeden agent ma limit. Większą robotę rozbijasz na zespół.

Na górze stoi orchestrator, taki dowódca. Dostaje cel, rozdaje go specjalistom, każdy kręci swoją pętlę, a na końcu wszystko spina się w jeden wynik. Ty dalej nie klikasz nic. Prompt wygląda mniej więcej tak:

```
Jesteś orchestratorem. Cel: artykuł na bloga o [temat].
Rozbij to na trzy role: researcher, pisarz, redaktor.
Researcher zbiera fakty i konkretne liczby.
Pisarz pisze draft tylko z materiału researchera.
Redaktor ocenia draft pod: jasność, konkret, zero lania wody, i odsyła do poprawki z uwagami.
Krąż między pisarzem a redaktorem, aż redaktor nie ma uwag. Wtedy pokaż finał.
```

To samo, co pętla numer jeden, tylko role są rozdzielone. Każdy agent robi jedną wąską robotę. Żaden nie nosi całego projektu w głowie naraz, więc koszt tokenów zostaje płaski nawet przy dużym zadaniu. W Claude Code odpalisz te role naprawdę równolegle, każda w osobnym oknie. W zwykłym czacie zasymulujesz to w jednym oknie i też zadziała, tylko wolniej.

### 3. Closed loop zakodowany twoim standardem

Do tej pory checker oceniał z głowy, na podstawie ogólnego "czy to dobre". Trzeci poziom: dajesz mu twój standard na piśmie.

```
Załączam plik standard.md. Jest w nim spisane, co u mnie działa, jak piszę i czego nie tykam.
Napisz [X].
Potem oceń własny draft punkt po punkcie względem standard.md.
Każde zdanie, które nie pasuje do standardu, przepisz.
Powtarzaj, aż draft przechodzi cały standard. Pokaż finał i krótko napisz, co poprawiłeś.
```

Różnica jest ogromna. Pętla numer jeden ocenia względem trzech kryteriów, które wymyśliłeś na poczekaniu. Ta ocenia względem twojego realnego standardu, spisanego w pliku. To jest closed loop: ty projektujesz ścieżkę i to, do czego pętla porównuje wynik.

---

## Pętla jest tak dobra jak dane pod nią

I tu dochodzimy do rzeczy, o której nie mówi prawie nikt, kto gada o loop engineeringu. Wszyscy zatrzymują się na "potrzebujesz osobnego checkera". Ok, zgoda. Ale checker jest tylko tak dobry, jak to, do czego porównuje.

Daj sędziemu pustą kartkę, a będzie zgadywał. Daj mu spisany standard i utnie wszystko, co nie brzmi jak ty.

Pytanie tylko, co realnie wrzucasz do tego pliku. U mnie standard.md do pisania wygląda mniej więcej tak:

```
## Hooki
- hook-pytanie: u mnie słaby, niska retencja
- konkretna liczba w pierwszej sekundzie: mocny
## Ton
- krótkie zdania, zero korpo
- nie tykam słów: synergia, rewolucyjny, game-changer
## Co zadziałało
- reel o drugim mózgu, hook "większość nie wie", 35k wyświetleń
```

To nie jest teoria z głowy. Każda linijka to wniosek z realnych danych. I tu jest sedno: ja trzymam wszystkie swoje reelsy razem ze statystykami w jednym miejscu. Ocena trzyma je w głowie naraz i widzi rzeczy, których ja nie widzę. Na przykład że hook-pytanie ciągnie u mnie gorszą retencję niż hook z konkretną liczbą. Sam bym tego nie złapał, bo nie pamiętam czterdziestu reelsów naraz. Pętla pamięta.

To miejsce, gdzie trzymam te dane, nazywam drugim mózgiem. I to jest rzecz, której nie skopiujesz. Możesz mieć najlepsze pętle świata, ale bez danych pod spodem ocena nie ma do czego porównać. Więc nie pętla jest tu najważniejsza. To, co masz pod nią zapisane.

Żeby było jasne, że to chodzi naprawdę. Ten artykuł i reel, z którego wyrósł, przeszły dokładnie przez taką pętlę. Jeden agent pisał, osobny sędzia oceniał pod standard zapisany w plikach, poprawka, znowu ocena. Oceniający odbił reela cztery razy, zanim trafił w mój standard i zanim ty go zobaczyłeś. Sędzia to nie ja w lepszym humorze. To osobny agent ze świeżym kontekstem, którego zadanie to znaleźć, gdzie tekst jest słaby. Nie pochwalić mnie.

---

## Open kontra closed, czyli "to jest dla bogatych"

Jest na to wszystko kontrargument i jest mocny. Warto go znać, zanim odpalisz pierwszą pętlę.

Są dwa rodzaje pętli. Open loop jest eksploracyjny. Dajesz agentowi szerokie pole i pozwalasz mu odkrywać, próbować różnych dróg, budować rzeczy, których nie określiłeś do końca. Ekscytujący koniec zabawy. Problem to koszt. Open loop z prawdziwym polem do ruchu pali absurdalne ilości tokenów. Jeden gość spalił tak 1,3 miliona dolarów w 30 dni. Płacił ktoś inny, bo gość pracuje w firmie od modeli. Ta pętla jest zbudowana dla kogoś, kto nie płaci. Dla 90% ludzi bez nieograniczonego budżetu to jeszcze nie do uruchomienia. A wycelowane w luźny standard zamienia się w maszynkę do slopu.

Closed loop jest ograniczony. To ty projektujesz ścieżkę od początku do końca. Jasny cel, zdefiniowane kroki, ocena na każdym kroku i punkt, w którym pętla się zatrzymuje albo oddaje ci robotę. Agenci dalej kręcą pętlę, ale wewnątrz ramy, którą zbudowałeś. Jest lepszy co run, bo każde przejście karmi następne. I chodzi na normalnym budżecie, bo ścieżka jest ciasna. Dla większości roboty marketingowej closed to ta, która się dziś opłaca.

Jest jeszcze tania zasada na bezpieczeństwo. Im niższy próg weryfikacji, tym pewniej puścisz pętlę bez nadzoru. Nudne checki, czy wszędzie jest aktualna nazwa, czy nie brakuje pliku, są trywialne do sprawdzenia. Niech lecą same. Rzeczy, które wymagają twojego osądu, czy to trzyma markę, czy ma sens, trzymaj pod swoim okiem.

---

## Jeśli masz zapamiętać jedną rzecz

Za chwilę każdy będzie miał pętle. Te same modele, te same setupy. I przestanie chodzić o to, kto ma mądrzejsze AI. Zacznie chodzić o to, czyja pętla zna lepszy standard.

Model skopiujesz. Pętlę skopiujesz. Ale twoich danych i twojego standardu nie.

Trzy punkty do zapamiętania:

1. Pętla to maker, który pisze, osobny checker, który ocenia, i stan na dysku. Leci, aż przejdzie. Warunek stopu ustaw przed startem.
2. Zacznij od najprostszej pętli w jednym promptcie. Potem rozbijaj na zespół, gdy robota rośnie.
3. Pętla jest tak dobra, jak dane pod jej oceną. Zbieraj w jednym miejscu, co u ciebie działa, a co nie.

---

Pętlę zbudujesz w 30 sekund. Standard pod nią, te dane, do których ocena porównuje, to normalnie robota miesięcy. I to jedyna część, której nikt ci nie zwędzi.

Drugi mózg to system, który zbiera ten standard za ciebie, żebyś nie składał go ręcznie przez pół roku. Chcesz go u siebie? [Postaw swój drugi mózg](/brain).
