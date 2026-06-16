---
title: "Dlaczego 95% wdrożeń AI nie zarabia ani złotówki (i co robi te 5%, które wygrywa)"
date: "2026-06-16"
order: -2
tag: "poradnik"
description: "95% wdrożeń AI w firmach nie zarabia ani złotówki. Trzy miejsca, w których wyciekają pieniądze, i cztery kroki, żeby wylądować w tych 5%, które wygrywają."
---

95% wdrożeń AI w firmach nie przynosi ani złotówki.

MIT NANDA policzył to w raporcie i wyszło, że tylko 5% wdrożeń generuje pieniądze. Reszta nie ma się czym pochwalić. Potem doszły kolejne badania, BCG, Deloitte, RAND, McKinsey, każde liczone inną metodą i każde wychodzi na to samo.

A modele nie są problemem. Są wystarczająco dobre od półtora roku, od kiedy możesz oddać AI realne zadanie i nie stać nad nim z batem. Doszły Opus 4, GPT-5, Gemini 3, teraz Opus 4.8, ceny spadły, kontekst urósł. A wskaźnik porażek? Wciąż ten sam. Model nigdy nie był wąskim gardłem.

Pokażę ci cztery kroki, które realnie wdrożą AI w twoim biznesie i wsadzą cię w te 5%, które wygrywają.

---

## Dlaczego AI działa u programistów, a u ciebie nie

Jest jedna grupa, u której AI działa najlepiej. Programiści. Anthropic zmierzył, że AI tnie czas zadania programisty o jakieś 80%.

Czemu u nich tak, a w innych działach słabo? Bo praca programisty ma cztery cechy, których twoja robota domyślnie nie ma:

- **Jest ograniczona.** Wiadomo gdzie się zaczyna i kończy. "Napraw ten błąd" siedzi w jednym pliku, nie rozlewa się na cały biznes.
- **Jest sprawdzalna.** Kod albo się kompiluje, albo nie. Test przechodzi albo nie. Odpowiedź masz w sekundy.
- **Jest uporządkowana.** Wszystko siedzi w plikach.
- **Jest weryfikowalna.** Ktoś patrzy na zmianę i w dziesięć minut mówi tak albo nie.

Kiedy praca ma te cztery cechy, AI daje ogromną dźwignię. Programiści to żywy dowód. Tylko że twoja robota tych cech nie ma. Twój proces wygląda inaczej u każdej osoby w zespole. Twoja obsługa klienta żyje w głowie, w mailach, w Slacku i w trzech narzędziach, które o sobie nawzajem nie wiedzą.

I tu jest problem. Wdrożenie AI to nie "kup narzędzie i włącz". To nadanie twojej robocie tych czterech cech, które programista dostał za darmo. Reszta tego poradnika to trzy miejsca, w których ludzie to spieprzają, plus jak zrobić to dobrze.

---

## Powód 1: Wdrażasz AI, zanim rozumiesz swój własny proces

To najczęstszy błąd, który sprawia, że AI nie zadziała tak, jak chciałeś. Budujesz rozwiązanie, zanim zrozumiesz proces, który niby automatyzujesz.

Zawsze idzie to tak samo. Bierzesz najbardziej oczywisty proces, spisujesz go tak, jak ci się wydaje że wygląda, budujesz pod to AI, krok po kroku automatyzujesz, aż odpalasz. I wtedy następuje zderzenie, bo proces wygląda inaczej niż myślałeś.

Realny proces zawsze ma rzeczy, których nie ma w żadnym dokumencie. Drobne wyjątki, które ogarniasz odruchowo, nawet o nich nie myśląc. Zawsze najpierw sprawdzasz ten jeden arkusz. Piszesz do Ani bezpośrednio, bo powiadomienie z systemu nie działa. Cokolwiek powyżej dziesięciu tysięcy bierzesz na siebie, choć system mówi inaczej. Takich wyjątków masz dziesiątki, co miesiąc. A AI zbudowane z wersji "z dokumentu" nie zna żadnego z nich.

Ta różnica między tym, co masz spisane, a tym co naprawdę robisz to luka zgodności. U większości firm to ponad 30%. Przy procesach pełnych wyjątków przekracza 70%. Budujesz AI pod wersję z dokumentu, automatyzujesz 70% przypadków i wykładasz się na 30%. A te 30% robi ci więcej roboty niż przed AI: najpierw poprawiasz błędy modelu, potem i tak robisz zadanie sam.

**Co zrobić.** Zanim zaczniesz wdrażać AI, rozpisz krok po kroku, co realnie robisz, razem z wyjątkami. Dla obsługi zapytania ofertowego wygląda to mniej więcej tak:

- wchodzi mail, sprawdzam czy klient jest w CRM
- jest, to patrzę co kupował wcześniej
- prosi o coś spoza oferty, to pytam Kasię zanim wycenię
- powyżej 10 tysięcy zawsze dzwonię, nie piszę
- wrzucam wycenę do szablonu, zmieniam trzy pola, wysyłam

Pięć linijek, a już widać które kroki zawsze lecą tak samo, a które wymagają twojej decyzji. To jest twoja mapa. Dopiero ona idzie do AI.

---

## Powód 2: Pchasz AI wszędzie, nawet tam gdzie wystarczy zwykła logika

LLM uzależnia. Jak się z nim oswoisz, na każdym problemie widzisz okazję, żeby wcisnąć model. Wyciągnąć wartość z dokumentu? Spytaj model. Porównać dwie liczby? Spytaj model. Wybrać jeden z trzech szablonów? Spytaj model. I kończysz z czymś, co w 90% jest wywołaniami modelu, a w 10% kodem.

To jest wolne, drogie i halucynuje średnio co dziesiąty raz. Systemy, które działają, wyglądają nudno. Jakieś 85% zwykłego kodu i 15% AI.

---

## Powód 3: Rozjazd narzędzi, w którym żadne nie wie o drugim

Najcichszy i najgroźniejszy problem, który pokazuje się dopiero po kilku miesiącach. Gdy już wydałeś budżet i czas.

Wygląda to tak. Pięć konwersacji w ChatGPT, każda z innym promptem. Trzy automatyzacje w Make i innych narzędziach, które nie wiedzą o sobie. Dwa projekty w Claude z tym samym kontekstem wklejonym dwa razy. Każdy w zespole zbudował swój kawałek AI po swojemu. Wszystko rozjechane, a okazuje się, że każdy klocek rozwiązuje ten sam problem na siedem różnych sposobów.

I nawet jak poszczególne automatyzacje działają, kończysz z kilkunastoma systemami, które o sobie nie wiedzą. Twoja automatyzacja do contentu nie ma pojęcia, że obsługa klienta dostaje właśnie dziesiątą falę zgłoszeń o tym samym. A potem przychodzi to, co przyjść musi: aktualizacja, model zostaje wycofany, API się zmienia, ktoś odchodzi z firmy. I połowa systemu sypie się naraz.

**Co zrobić.** Zanim dołożysz kolejną automatyzację, wybierz jedno miejsce, w którym ląduje cała wiedza o twoim biznesie: transkrypcje, liczby, notatki, kontekst klientów, SOP-y. Jedna baza, do której podpinasz AI. Od teraz każda nowa automatyzacja czyta z tego samego miejsca. Nazywam to drugim mózgiem. Bez tej warstwy twoje wdrożenie AI staje się zlepkiem jednorazowych projektów, które zdychają w pół roku.

---

## Co robi te 5%, które wygrywa: plan od zera

Gdybym dziś stawiał AI w biznesie albo agencji od zera, poprowadziłbym to tak:

1. **Mapa.** Wybierz jeden proces, który zjada ci najwięcej czasu. Spisz, jak naprawdę przez niego przechodzisz, nie pomijając żadnego kroku. Na końcu masz mapę, na której widać wszystkie kroki.

2. **Architektura.** Przy każdym kroku decydujesz: automatyzujesz go kodem czy modelem. Model tylko tam, gdzie kod sobie nie radzi. Protip: "kodem" nie znaczy, że musisz sam programować, możesz dać AI, żeby ten kod napisała za ciebie. Ustalasz też, gdzie w tej pętli zostaje człowiek, w którym momencie potrzebna jest jego decyzja, żeby coś poszło dalej.

3. **Budowa.** Stawiasz to na żywym procesie, ale na razie to ty zatwierdzasz każdą akcję. Obserwujesz rezultat każdego kroku, patrzysz gdzie AI się myli, poprawiasz. Iterujesz, aż zacznie działać.

4. **Jeden system.** Wszystko ląduje w jednej bazie: kontekst twojego biznesu i dane, z których korzystają twoje automatyzacje. Następna automatyzacja jest łatwiejsza do postawienia, bo już wiesz co masz i co działa. Dokładasz kolejne procesy, budując na tym samym kontekście i rozbudowując go. Tak stawiasz skalowalną strukturę: automatyzacje powstają szybciej i taniej, a twój biznes robi się AI friendly.

Na końcu masz proces, który realnie działa. Plus kontekst twojego biznesu, który się aktualizuje i zbiera dane potrzebne, żebyś mógł się rozwijać.

---

## Jeśli masz zapamiętać jedną rzecz

Modele już są mądre. Gra nie toczy się o to, kto ma lepszy.

Wygra ten, kto ma uporządkowany kontekst swojego biznesu: rozpisane procesy i jasne, wdrożone automatyzacje. Jeden wspólny system zamiast rozjazdu.

I zacznij myśleć o tym już teraz jak o designie. Projektuj swój biznes tak, żeby był AI friendly, od samego początku.
