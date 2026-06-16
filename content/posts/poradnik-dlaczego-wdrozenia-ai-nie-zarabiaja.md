---
title: "Dlaczego 95% wdrożeń AI nie zarabia ani złotówki (i co robi te 5%, które wygrywa)"
date: "2026-06-16"
order: -2
tag: "poradnik"
description: "95% wdrożeń AI w firmach nie zarabia ani złotówki. Cztery powody dlaczego pieniądze wyciekają i konkretny plan jak wylądować w tych 5%, które wygrywa."
---

95% wdrożeń AI w firmach nie przynosi ani złotówki.

To nie moja opinia. MIT NANDA policzył to w raporcie GenAI Divide: 5% wdrożeń ciągnie realne pieniądze, reszta nie ma się czym pochwalić. Potem to samo policzyli BCG, Deloitte, RAND, IBM i McKinsey. Każdy swoją metodą, każdy wyszedł na ten sam wynik. RAND: ponad 80% projektów AI pada, dwa razy częściej niż zwykłe projekty IT.

To nie modele są problemem. Pokażę ci cztery miejsca, w których wycieka kasa, i co przy każdym zrobić, żeby twój biznes wylądował w tych 5%.

---

## To nie modele. Przestań zwalać na model

Modele są wystarczająco dobre od półtora roku. Od momentu, kiedy mogłeś oddać AI realne zadanie i nie stać nad nim z batem. Potem przyszedł Opus 4, GPT-5, Gemini 3, a teraz Opus 4.7. Ceny spadły z kosmosu, okno kontekstu urosło, wywoływanie narzędzi przestało się sypać.

A wskaźnik porażek? Płaski. Taki sam przy GPT-3, GPT-4, GPT-5, przy Claude 2 i przy Claude 4.7. Każda nowa generacja modelu, ten sam procent firm spala kasę. Model robi się mądrzejszy, a porażka stoi w miejscu. To znaczy jedno: model nigdy nie był wąskim gardłem.

GPT-6 tego nie naprawi. Czekasz na lepszy model, a on już dawno przyszedł.

---

## Dlaczego AI działa u programistów, a u ciebie nie

Jest jedna grupa, u której AI działa na pełnej skali. Programiści. Największy wygrany ostatnich osiemnastu miesięcy, o całe długości. Google mówi, że 75% nowego kodu pisze u nich AI. Anthropic zmierzył, że AI tnie czas zadania programisty o jakieś 80%.

Czemu u nich tak, a w marketingu, sprzedaży czy operacjach prawie wcale? Bo praca programisty ma cztery cechy, których twoja robota domyślnie nie ma:

- **Jest ograniczona.** Wiadomo gdzie się zaczyna i kończy. "Napraw ten błąd" siedzi w jednym pliku, nie rozlewa się na cały biznes.
- **Jest sprawdzalna.** Kod albo się kompiluje, albo nie. Test przechodzi albo nie. Odpowiedź masz w sekundy.
- **Jest uporządkowana.** Wszystko siedzi w plikach. Ten sam input daje ten sam output. Możesz odtworzyć każdy krok.
- **Jest weryfikowalna.** Ktoś patrzy na zmianę i w dziesięć minut mówi tak albo nie.

Wpuść AI w robotę, która jest ograniczona, sprawdzalna, uporządkowana i weryfikowalna, a dźwignia jest ogromna. Twoja robota tego nie ma. Twój proces sprzedaży wygląda inaczej u każdej osoby w zespole. Twoja obsługa klienta żyje w głowie, w mailach, w Slacku i w trzech narzędziach, które o sobie nawzajem nie wiedzą.

I tu jest cała gra. Wdrożenie AI to nie "kup narzędzie i włącz". To nadanie twojej robocie tych czterech cech, które programista dostał za darmo. Reszta tego poradnika to cztery miejsca, w których ludzie to spieprzają, plus co zrobić zamiast tego.

---

## Powód 1: Wdrażasz AI, zanim rozumiesz swój własny proces

To najlepszy pojedynczy predyktor, że wdrożenie padnie. Zaczynasz budować, zanim rozumiesz proces, który niby automatyzujesz.

Zawsze idzie tak samo. Bierzesz najbardziej oczywisty workflow, spisujesz go z grubsza tak, jak ci się wydaje że wygląda, budujesz pod to AI, odpalasz. I wtedy zderza się z tym, jak proces wygląda naprawdę. A naprawdę wygląda inaczej w piętnastu miejscach.

Bo realny proces zawsze ma rzeczy, których nie ma w żadnym dokumencie. Krok "najpierw zawsze sprawdzam ten jeden arkusz". Krok "piszę do Ani bezpośrednio, bo powiadomienie z systemu nie działa". Siedemnaście wyjątków, które ogarniasz co miesiąc z głowy. Niepisana zasada, że cokolwiek powyżej pewnej kwoty idzie do ciebie, choć system mówi inaczej.

Ta różnica między tym, co masz spisane, a tym co naprawdę robisz, ma nazwę: luka zgodności. U większości firm to ponad 30%. Przy procesach pełnych wyjątków przekracza 70%. Budujesz AI pod wersję z dokumentu, automatyzujesz 70% przypadków i wykładasz się na 30%. A te 30% robi ci więcej roboty niż przed AI: najpierw poprawiasz błędy modelu, potem i tak robisz zadanie sam. Stąd weekendy na gaszeniu pożarów.

**Co zrobić.** Zanim odpalisz jakiekolwiek AI, rozpisz krok po kroku, co NAPRAWDĘ klikasz. Nie co masz w procedurze. Nie co opowiadasz klientom. Co realnie robisz, razem z wyjątkami. Dla obsługi zapytania ofertowego wygląda to mniej więcej tak:

- wchodzi mail, sprawdzam czy klient jest w CRM
- jest, to patrzę co kupował wcześniej
- prosi o coś spoza oferty, to pytam Kasię zanim wycenię
- powyżej 10 tysięcy zawsze dzwonię, nie piszę
- wrzucam wycenę do szablonu, zmieniam trzy pola, wysyłam

Pięć linijek, a już widać które kroki to czysty wzorzec (lookup w CRM, szablon), a które wymagają twojego osądu (wycena spoza oferty). To jest twoja mapa. Dopiero ona idzie do AI. Bez niej budujesz w ciemno.

---

## Powód 2: Pchasz AI wszędzie, nawet tam gdzie wystarczy zwykła logika

LLM uzależnia. Jak go masz, każdy problem wygląda jakby trzeba go było rozwiązać modelem. Wyciągnąć wartość z dokumentu? Spytaj model. Porównać dwie liczby? Spytaj model. Skierować wynik na podstawie kwoty? Spytaj model. I kończysz z czymś, co w 90% jest wywołaniami modelu, a w 10% kodem.

To jest wolne, drogie i halucynuje co dziesiąty raz. W czacie 10% błędów przejdzie. Przy automatyzacji faktur albo obsłudze klienta nie. Faktura za API rośnie co miesiąc, klient dostaje śmieci, a ty siedzisz wieczorami i poprawiasz.

Systemy, które działają, wyglądają nudno. Jakieś 85% zwykłego kodu i 15% AI. Model wchodzi tylko tam, gdzie potrzeba osądu: wyciągnąć dane z nieuporządkowanego tekstu, sklasyfikować dziwny przypadek do jednej z kilku kategorii, napisać wersję do oceny przez człowieka. Reszta to zwykła logika: porównaj, sprawdź warunek, skieruj dalej.

**Co zrobić.** Przy każdym kroku z twojej mapy zadaj jedno pytanie: AI, czy zwykłe "jeżeli to, zrób tamto"? Wyciągnięcie NIP-u z faktury to kod. Ocena, czy reklamacja jest wkurzona czy spokojna, to AI. Dziewięć razy na dziesięć wystarczy reguła. AI zostaw tam, gdzie trzeba coś zinterpretować, ocenić kontekst albo wymyślić. Taniej, szybciej, zero halucynacji. I właśnie dlatego najpierw rozpisałeś proces: bez mapy nie wiesz, który krok to wzorzec a który osąd, więc na wszelki wypadek wszędzie wciskasz model.

---

## Powód 3: Rozjazd narzędzi, w którym żadne nie wie o drugim

Najcichszy i najgroźniejszy problem, bo wychodzi dopiero po kilku miesiącach. Wtedy już wydałeś budżet i czas.

Wygląda to tak. Pięć konwersacji w ChatGPT, każda z innym promptem. Trzy automatyzacje w Make, które nie wiedzą o sobie. Dwa projekty w Claude z tym samym kontekstem wklejonym dwa razy. Każdy w zespole zbudował swój kawałek AI po swojemu. Wszystko rozjechane, każdy klocek rozwiązuje podobny problem na siedem różnych sposobów.

Nawet jak każdy klocek działa, kończysz z kilkunastoma systemami, które o sobie nie wiedzą. Twoja automatyzacja do contentu nie ma pojęcia, że obsługa klienta dostaje właśnie falę zgłoszeń o tym samym. A potem przychodzi to, co przyjść musi: model zostaje wycofany, API się zmienia, ktoś odchodzi z firmy. Połowa klocków sypie się naraz, nikt nie wie który, a ludzie którzy je budowali są zajęci albo ich już nie ma. Zespół mówi: "wracamy do ręcznej roboty, AI nie ufamy". I tak umiera wdrożenie.

**Co zrobić.** Zanim dołożysz kolejną automatyzację, wybierz jedno miejsce, w którym ląduje cała wiedza o twoim biznesie: transkrypcje, liczby, notatki, metryki. Jeden folder, jedna baza, obojętnie. Na górze sadzasz AI z dostępem do tego. Od teraz każda nowa automatyzacja czyta z tego samego miejsca, zamiast budować swój kontekst od zera. Ja nazywam to drugim mózgiem. Bez tej warstwy AI zostaje zlepkiem jednorazowych projektów, które zdychają w pół roku. Z nią każda kolejna rzecz, którą dokładasz, jest tańsza i szybsza, bo stoi na tym co już masz.

---

## Powód 4: Traktujesz AI jak projekt, który raz robisz i masz z głowy

Ten błąd nie boli od razu. Boli po pół roku, i jest najdroższy ze wszystkich. Większość ludzi planuje AI jak zwykły soft: zaplanuj, zbuduj, odpal, ogłoś sukces, idź dalej. Przy normalnym oprogramowaniu to działa, bo jak raz zbudujesz, to zostaje zbudowane. AI działa odwrotnie.

Co kwartał coś pod tobą się rusza. Wychodzi nowy model, dużo lepszy w twoim konkretnym zadaniu. Albo gorzej: model, na którym polegałeś, po cichu się pogarsza. Anthropic w półtora roku wycofał około dziewięciu modeli, OpenAI jeszcze więcej. Ceny zmieniają się co kwartał, limity tnie się bez ostrzeżenia. W kwietniu 2026 Anthropic publicznie przyznał, że przez miesiąc Claude Code działał gorzej, a płacący abonenci wpadali w limit po dziewiętnastu minutach zamiast obiecanych pięciu godzin. Workflow zbudowany na tych gwarancjach po prostu się położył.

**Co zrobić.** Traktuj AI jak coś, co cały czas ewoluuje, nie jak mebel. Raz na miesiąc sprawdź trzy rzeczy: czy używasz najmocniejszych modeli, które właśnie wyszły, czy ceny się nie zmieniły i czy twoje stare prompty wciąż działają po aktualizacji. I nie wieszaj całego biznesu na jednym dostawcy. Jak całe twoje AI wisi na jednej firmie, jesteś uziemiony za każdym razem, kiedy ona coś popsuje. Buduj tak, żeby dało się podmienić model pod spodem, a workflow leci dalej.

---

## Co robi te 5%, które wygrywa: plan od zera

Gdybym miał postawić AI w małym biznesie albo agencji od zera, poprowadziłbym to tak. Nie sześć miesięcy korporacyjnego projektu, tylko kilka tygodni skupionej roboty.

**Tydzień 1: mapa.** Wybierasz jeden proces, który zjada ci najwięcej czasu. Przez tydzień spisujesz, jak naprawdę przez niego przechodzisz, razem z wyjątkami. Na końcu masz mapę, na której widać które kroki to wzorzec, które wymagają osądu, i gdzie są dziury.

**Tydzień 2: architektura.** Przy każdym kroku decydujesz: wzorzec idzie na kod, osąd na AI. Wybierasz jeden proces do automatyzacji jako pierwszy. Ustalasz, gdzie człowiek wciąż zatwierdza, zanim cokolwiek pójdzie dalej.

**Tygodnie 3-4: budowa.** Stawiasz to na żywym procesie, ale na razie ty zatwierdzasz każdą akcję. Patrzysz gdzie AI się myli, poprawiasz, sprawdzasz dokładność codziennie. Naprawiasz to, co się sypie, zanim puścisz szerzej.

**Od tygodnia 5: jeden system i ciągłe dostrajanie.** Wszystko ląduje na jednej wspólnej warstwie, twoim drugim mózgu, żeby następna automatyzacja stała na tym co już masz. Plus raz na miesiąc przegląd: modele, ceny, prompty. To wszystko.

Na końcu masz jeden proces, który realnie zarabia albo oszczędza czas, warstwę, która wchłonie następny w ułamku czasu, i nawyk dostrajania, który trzyma to przy życiu.

---

## Najważniejsza rzecz, którą wynosisz z tego tekstu

Rozdział "modele się zrobiły mądre" już się skończył. Miał swój złoty okres, ale przestań czekać na AGI, które za ciebie wszystko ogarnie. Wygra nie ten, kto ma najlepszy model. Wygra ten, kto ma porządną warstwę pod nim: rozpisany proces, jasny podział na to co robi kod a co AI, jeden wspólny system zamiast rozjazdu, i nawyk dostrajania.

Bez tych czterech rzeczy twój biznes traci pieniądze co miesiąc i tygodnie na gaszenie pożarów. A te 5%, które już to ma, skaluje się, optymalizuje i podbiera klientów tym, którzy wciąż czekają na lepszy model.

Pierwszy ruch jest darmowy i możesz go zrobić dziś: wybierz jeden proces, który zjada ci najwięcej czasu, i rozpisz krok po kroku, co naprawdę w nim robisz. Tych pięć linijek to fundament drugiego mózgu i jedyna rzecz, która dzieli te 5% od reszty.
