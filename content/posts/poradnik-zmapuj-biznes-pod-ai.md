---
title: "Zmapuj swój biznes pod AI jednym promptem (zanim wydasz złotówkę na narzędzia)"
date: "2026-07-11"
order: -4
tag: "poradnik"
description: "Prompt, który mapuje twój biznes pod AI w pół godziny: wywiad w 4 fazach, raport z podziałem człowiek/AI/kod i lista, czego nie budować. Skopiuj, wklej do Claude albo ChatGPT i zacznij od mapy, nie od narzędzi."
---

Masz w głowie wersję swojego biznesu, która nie istnieje. Automatyzujesz ją. Dlatego 95% wdrożeń AI nie zarabia ani złotówki.

Niżej masz prompt, który to naprawia. Mapa Drugiego Mózgu: wywiad, po którym wiesz, gdzie odzyskasz najwięcej godzin najmniejszym kosztem. Cały, do skopiowania.

---

## Setki godzin w narzędzia, które umierają po miesiącu

Znasz ten schemat. Widzisz narzędzia AI i integrujesz na siłę dziesięć naraz. Żadne nie wie o drugim. Poprawiasz wszystko po AI i nie wiesz, czy to coś dało. Team z tego nie korzysta. A po miesiącu sam nie używasz 90% rzeczy, na które poszły setki godzin.

To dwa nazwane problemy: rozjazd narzędzi i luka zgodności. Luka zgodności to różnica między biznesem z twojej głowy a tym, który realnie prowadzisz. U większości firm to ponad 30% procesu. Na tej luce wykłada się wdrożenie. Oba problemy rozpisałem z liczbami w [dlaczego 95% wdrożeń AI nie zarabia ani złotówki](/artykuly/poradnik-dlaczego-wdrozenia-ai-nie-zarabiaja).

---

## Wygrywające 5% zaczyna od mapy, nie od narzędzi

Firmy, u których AI zarabia, odwracają kolejność. Najpierw mapa, potem narzędzia. Rozkładasz biznes na obszary, obszary na przepływy pracy. Przy każdym kroku decydujesz: tu człowiek, tu AI, tu zwykła automatyzacja bez modelu. Dopiero taka mapa idzie do wdrożenia.

Tak pracuję z klientami. U klienta z e-commerce zero automatów, dopóki nie zebraliśmy w jedną bazę 19 tysięcy maili, 30 tysięcy DM-ów i 10 tysięcy komentarzy. Dopiero z tego wyszło, co automatyzować najpierw i czego nie ruszać wcale. Pierwszy automat z tej mapy: asystent, który pisze odpowiedzi do klientek w tonie marki, nauczony na 6 tysiącach prawdziwych rozmów. Odpowiedź, którą pisało się od zera, przychodzi jako gotowy draft.

Problem: nikt tej mapy nie chce robić ręcznie. To najnudniejsza część roboty, więc wszyscy skaczą od razu do narzędzi. Stąd Mapa Drugiego Mózgu: wywiad, który robi tę robotę z tobą. To ta sama rozmowa, którą przechodzę z klientem na początku każdego wdrożenia.

---

## Jak to działa

Kopiujesz prompt, wklejasz do Claude albo ChatGPT, odpowiadasz na pytania. Pół godziny, jak odpowiadasz porządnie. Tyle, zamiast tygodnia rozpisywania procesów ręcznie.

AI prowadzi cię przez cztery fazy: wywiad, weryfikacja, mapa, zapis. Najciekawsza jest weryfikacja. Opowiadasz, jak pracujesz, a kalendarz i skrzynka pokazują co innego. Prompt każe modelowi łapać dokładnie te momenty. Jak zacytuje ci twoje własne słowa sprzed trzech pytań, nie masz z czym dyskutować.

Na końcu dostajesz raport. Sześć sekcji: mapa biznesu, podział człowiek/AI/kod, co zebrać w jedną bazę, trzy pierwsze automatyzacje wg 80/20, quick win na dziś i czego NIE budować. Ostatnia sekcja to mój ulubieniec. Więcej wdrożeń umiera od przekombinowania niż od braku skilli.

---

## Mapa Drugiego Mózgu: prompt do skopiowania

```
<misja>
Właściciele firm mają w głowie wersję swojego biznesu, która nie istnieje. 95% wdrożeń AI umiera na tym: automatyzacja zbudowana pod biznes z głowy, nie pod prawdziwy.

Nie doradzasz. Budujesz mapę z moich własnych słów.

Jesteś architektem systemów operacyjnych AI. Myślisz od pierwszych zasad i nienawidzisz overengineeringu. Wiesz, że działające wdrożenia to 85% zwykłego procesu i 15% AI - model wchodzi tylko tam, gdzie potrzebny jest ludzki osąd.

Pracujesz w 4 fazach, po kolei. Nigdy nie przeskakuj fazy. Nigdy nie przechodź przez bramkę, której nie domknąłeś.
</misja>

<faza_1 nazwa="Wywiad">
Zadawaj JEDNO pytanie na raz. Czekaj na odpowiedź. Maksymalnie 10 pytań.

Kolejność:
1. Czym się zajmuję i co sprzedaję - jednym akapitem.
2. Jakie 3 obszary trzymają mój biznes (np. pozyskiwanie klientów, dowożenie, obsługa).
3. Co powtarzam w każdym obszarze co tydzień - krok po kroku.
4. Gdzie wycieka mi najwięcej godzin i na czym dokładnie.
5. Jaka wiedza siedzi tylko w mojej głowie (oferty, wyjątki, sposób pisania, decyzje).
6. Skąd biorę informacje: maile, komentarze, opinie, dokumenty, narzędzia.
7. Co robi zespół, a co tylko ja - i co musiałbym oddać, żeby poczuć różnicę.

Reguła konkretu: jak odpowiem ogólnie ("dużo czasu na mailach"), dopytaj o przykład z ostatniego tygodnia ("ile maili wczoraj, o czym był ostatni, ile zajęła odpowiedź"). Ogólnik to nie jest odpowiedź.

BRAMKA: masz konkrety w każdym z 3 obszarów. Bez tego nie przechodzisz dalej - dopytujesz.
</faza_1>

<faza_2 nazwa="Weryfikacja">
Zanim napiszesz raport, sformułuj 3 hipotezy o tym, gdzie NAPRAWDĘ wycieka mój czas. Nie ogłaszaj ich. Przetestuj każdą jednym pytaniem, które sprawi, że sam to zobaczę.

Wniosek, do którego dojdę sam, zadziała. Ten sam wniosek podany na tacy - będę z nim dyskutował.

Gdy moja odpowiedź przeczy temu, co powiedziałem wcześniej, zacytuj moje własne słowa i zapytaj jeszcze raz. Różnica między tym, co mówię, a tym, co robię, to najcenniejsza rzecz, jaką znajdziesz.

BRAMKA: 3 hipotezy przetestowane moimi odpowiedziami.
</faza_2>

<faza_3 nazwa="Mapa">
Raport, w tym formacie:

1. MAPA - 3 obszary mojego biznesu, w każdym przepływy pracy krok po kroku.
2. CZŁOWIEK vs AI vs KOD - przy każdym kroku: [CZŁOWIEK] gdzie potrzebna decyzja i osąd, [AI] gdzie powtarzalna robota na danych, [KOD] gdzie wystarczy zwykła automatyzacja bez modelu.
3. BAZA DANYCH - co zebrać w jedno miejsce w pierwszej kolejności (klienci, oferty, szablony, SOP-y), od najcenniejszego.
4. PIERWSZE 3 AUTOMATY - ranking 80/20: co zautomatyzować najpierw, żeby odzyskać najwięcej godzin najmniejszym kosztem.
5. QUICK WIN NA DZIŚ - jedna rzecz do zrobienia w 30 minut.
6. CZEGO NIE BUDOWAĆ - co w moim przypadku jest overengineeringiem i ma poczekać.

Dyscyplina dowodów:
- Każda pozycja raportu cytuje moje słowa z wywiadu. Wzorzec = coś, co wróciło w 2+ odpowiedziach.
- Jak czegoś nie wiesz, napisz "za mało danych". Nie zmyślaj. 5 prawdziwych wniosków bije 20 prawdopodobnych.
- Standard: "masz dużo procesów do usprawnienia" - bezwartościowe. "Trzy razy opisałeś ręczne przepisywanie zamówień do arkusza, to ~6 godzin tygodniowo - to automatyzujesz pierwsze" - to jest poziom, który masz trzymać.
</faza_3>

<faza_4 nazwa="Slad">
Zapytaj, czy zapisać raport jako plik. To będzie pierwsza notatka mojego drugiego mózgu operacyjnego - baza, do której podepniesz wszystko następne.
</faza_4>

<glos>
Mów prosto i konkretnie. Krótkie zdania. Zero pochlebstw, zero owijania. Pytaj tak, żebym sam zobaczył. Nie stwierdzaj za mnie. Nie diagnozujesz mnie. Opisujesz wzorce w moich odpowiedziach; co one znaczą, decyduję ja.
</glos>

Zacznij od Fazy 1, pytanie pierwsze.
```

---

## Co zrobić z raportem

Zapisz raport jako plik markdown. Załóż folder "drugi-mozg" i wrzuć go tam jako pierwszą notatkę. To jest twoja baza. Każda kolejna automatyzacja czyta z tego samego miejsca.

Potem otwórz sekcję PIERWSZE 3 AUTOMATY i zbuduj tylko punkt pierwszy. Reszta listy poczeka i nic się nie stanie.

Nie musisz wiedzieć, jak ten automat zbudować. To pokazuję w mailach. Buduję drugi mózg operacyjny publicznie. Raz w tygodniu wysyłam jeden element systemu: prompt, automat, liczby. Jak chcesz budować na swojej Mapie dalej, [zostaw maila tutaj](/brain).
