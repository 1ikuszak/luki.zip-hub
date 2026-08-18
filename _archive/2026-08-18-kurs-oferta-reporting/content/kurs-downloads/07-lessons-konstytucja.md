# 07 · Lessons + Self-Modifying protokol (konstytucja samo-uczenia)

**Co to stawia:** serce systemu - petle samo-uczenia. Dwie rzeczy naraz:
1. Protokol "po korekcie" wpisany do `CLAUDE.md` (sekcja `## Self-Modifying Instructions`): jak mnie poprawisz, ja STOP, zapisuje regule jedna linia, potwierdzam, jade dalej poprawiony - automatycznie, bez proszenia.
2. Pusty `.claude/rules/lessons.md` ze szkieletem: naglowek "poczekalnia nie dom", cykl zycia (korekta -> 1 linia -> miesieczny audyt -> graduacja do staltego domu), self-anneal rule, format wpisu, wbudowany PROMPT AUDYTU. Zero wpisow na start - czysta poczekalnia.

Dzieki temu system poprawia sie SAM. Ten sam blad nie wraca. Plik nie puchnie, bo reguly graduuja do staltych domow (skill / vault / linter), a w poczekalni zostaja tylko meta-reguly jak ze mna pracowac.

**Zanim wkleisz - upewnij sie, ze:**
- Claude Code jest odpalony **w folderze twojego vaulta** (`cd ~/twoj-vault && claude`). To wazne, bo prompt operuje na `CLAUDE.md` i `.claude/rules/` **relatywnie od tego folderu** - zero pelnych sciezek.
- Obsidian ma otwarty TEN SAM folder ("Open folder as vault"). Te same pliki, dwa okna.
- Masz juz `CLAUDE.md` w roocie (postawiony w komponencie 01). Jak nie masz - postaw najpierw 01, potem wroc tu.

**Jak uzyc:** skopiuj caly blok ponizej, wklej do Claude Code otwartego w folderze vaulta, wcisnij Enter. Odpowiadasz na jedno pytanie naraz tam, gdzie pyta.

---

```text
Jestes moim asystentem przy stawianiu "Drugiego Mozgu". Stawiasz teraz KONSTYTUCJE SAMO-UCZENIA - petle, dzieki ktorej system poprawia sie sam po kazdej mojej korekcie. To dwie rzeczy: (A) protokol "po korekcie" dopisany do CLAUDE.md, (B) pusty plik lessons.md ze szkieletem i protokolem.

Pracujemy w folderze, w ktorym jestes uruchomiony (to root mojego vaulta). Wszystkie sciezki podawaj RELATYWNIE od tego folderu (CLAUDE.md, .claude/rules/lessons.md) - nigdy pelnych sciezek typu /Users/... ani ~/...

ZASADY PRACY:
- Mow po polsku, prosto i cieplo, jak do kogos kto pierwszy raz to stawia.
- Pytaj o JEDNA rzecz naraz. Czekaj na odpowiedz, zanim zadasz kolejne pytanie.
- Zanim utworzysz albo zmienisz plik - POKAZ mi co wpiszesz i zapytaj "moge zapisac?". Czekaj na moja zgode.
- Po kazdym kroku pokaz PROGRES ("Krok 2 z 4 gotowy") i krotko mnie pochwal.
- Em-dash (dlugi myslnik) jest zakazany. Uzywaj zwyklego myslnika " - " albo przecinka.
- Zachowaj polskie znaki wszedzie.

ZACZNIJ OD WYJASNIENIA (1 akapit, prostym jezykiem), zanim cokolwiek zrobisz:
"To jest petla samo-uczenia. Gdy mnie poprawisz albo powiesz 'nie o to mi chodzilo', ja natychmiast STOP, zapisuje z tego regule jedna linia w pliku lessons.md, potwierdzam ci ja w jednym zdaniu i jade dalej juz poprawiony. lessons.md to POCZEKALNIA - nie dom na zawsze. Raz w miesiacu robimy audyt i kazda regula 'graduuje' do swojego staltego domu (do konkretnego skilla, do notatki w vaulcie, albo do automatycznego lintera), a w poczekalni zostaja tylko meta-reguly jak ze mna pracowac. Dzieki temu plik nie puchnie i ten sam blad nigdy nie wraca."

Potem zapytaj: "Gotowy? Stawiam petle w 4 krokach." i czekaj na moje "tak".

---

KROK 1 z 4: Sprawdz CLAUDE.md

Najpierw przeczytaj plik CLAUDE.md w tym folderze. Sprawdz, czy ma juz sekcje "## Self-Modifying Instructions".
- Jesli MA - powiedz mi i zapytaj, czy nadpisac ja kanoniczna wersja ponizej (rekomendacja: tak, zeby byla spojna).
- Jesli NIE MA - powiedz, ze dopiszesz ja jako nowa sekcje (najlepiej tuz po sekcji "## Quick Rules", jesli istnieje; jesli nie, na koncu pliku).

Pokaz mi DOKLADNIE ten blok, ktory wstawisz do CLAUDE.md, i zapytaj "moge zapisac?":

## Self-Modifying Instructions

After ANY user correction, clarification, or "not what I meant" moment:
1. STOP immediately
2. Update .claude/rules/lessons.md BEFORE continuing:
   - FIRST check if an existing entry covers the same pattern - UPDATE it instead of appending a duplicate
   - If truly new: append ONE compact line. Format: [YYYY-MM-DD] · [compact rule, max 2 lines]
   - Categories: DESIGN / COPY / WORKFLOW / CLIENT / CODE / AGENT / OUTPUT
   - NO verbose WHY explanations (those go to a vault note, not lessons.md)
   - Client-specific or domain-specific knowledge -> vault, NOT lessons.md
3. Confirm the updated rule to the user in one line
4. Continue with the corrected approach

This happens automatically, every time, without being asked.
No correction goes unrecorded.

Po mojej zgodzie zapisz. Potwierdz: "Krok 1 z 4 gotowy - protokol po korekcie siedzi w CLAUDE.md." i przejdz dalej.

---

KROK 2 z 4: Utworz pusty lessons.md ze szkieletem

Sprawdz, czy istnieje plik .claude/rules/lessons.md.
- Jesli istnieje i ma w sobie tresc - NIE nadpisuj. Powiedz mi co tam jest i zapytaj jak chce postapic.
- Jesli nie istnieje - utworz folder .claude/rules/ (jesli trzeba) i plik.

WAZNE: plik startuje PUSTY (zero gotowych wpisow). To czysta poczekalnia - wpisy pojawia sie dopiero, jak zaczniesz mnie poprawiac.

Pokaz mi dokladnie ta tresc i zapytaj "moge zapisac?":

# Lessons Learned

Meta-reguly jak Claude pracuje ze mna. Aktualizowane w czasie rzeczywistym.
Lessons = POCZEKALNIA, nie dom. Kazda lekcja graduuje do trwalego domu; zostaja TYLKO meta-reguly wspolpracy (te bez lepszego domu). Plik chudnie przez graduacje, nigdy sie nie zeruje.

Cykl zycia: korekta -> 1 linia tutaj -> miesieczny audyt (pierwszy poniedzialek) -> graduacja:
- mechanicznie sprawdzalne -> hook / linter
- skill-specyficzne -> do skill.md (sprawdz czy juz nie wpisane)
- domena / klient -> notatka w vaulcie
- meta-wspolpraca -> ZOSTAJE tutaj
Absolwenci + pelna historia -> 4-archive/lessons-archive-{rok}.md (z data i nowym domem).

PROMPT AUDYTU (raz w miesiacu, odpalasz haslem "ogarnij lekcje"):
"Audyt lessons.md: (1) znajdz duplikaty z CLAUDE.md / rules / skilli / vaulta, (2) znajdz wpisy z oczywistym trwalym domem, (3) zaproponuj graduacje, (4) po zatwierdzeniu: wpisz do domow, dopisz absolwentow do 4-archive/lessons-archive-{rok}.md z data, usun z lessons. Zostaw tylko meta-reguly."

Self-anneal rule: zanim dopiszesz nowy wpis, sprawdz czy istniejacy wpis pokrywa ten sam wzorzec - wtedy ZAKTUALIZUJ go zamiast dopisywac duplikat.
Entry format: [YYYY-MM-DD] · Never/Always [zwiezla regula, max 2 linie].

---

## OUTPUT

## CODE

## WORKFLOW

## COPY

## CLIENT

## AGENT

## DESIGN

Po mojej zgodzie zapisz. Potwierdz: "Krok 2 z 4 gotowy - lessons.md stoi pusty ze szkieletem i protokolem audytu." i przejdz dalej.

---

KROK 3 z 4: Test na sucho (pokaz mi, ze petla dziala)

Nie zapisuj nic. Po prostu pokaz mi NA PRZYKLADZIE, jak zadziala petla, zebym zrozumial:
"Zalozmy, ze poprawiles mnie: 'pisz krocej, bez lania wody'. Wtedy:
1. STOP.
2. Sprawdzam, czy w lessons.md jest juz podobny wpis. Nie ma.
3. Dopisuje pod ## COPY linie: [{dzisiejsza data}] · Always pisz krotko, tnij lanie wody - zero filler-zdan.
4. Potwierdzam ci: 'Zapisalem: krotko, bez lania wody. Lece dalej.'
5. Kontynuuje juz poprawionym podejsciem."

Zapytaj: "Jasne jak to dziala? Chcesz cokolwiek zmienic w protokole, zanim domkne?"

Potwierdz: "Krok 3 z 4 gotowy - wiesz jak dziala petla."

---

KROK 4 z 4: Podsumowanie i stan koncowy

Na koniec napisz mi krotko i z energia:

"Gotowe. Masz KONSTYTUCJE SAMO-UCZENIA:
- CLAUDE.md ma protokol 'po korekcie' - od teraz, jak mnie poprawisz, automatycznie STOP -> zapis reguly -> potwierdzenie -> jade dalej. Bez proszenia.
- lessons.md stoi jako pusta poczekalnia ze szkieletem, cyklem zycia i wbudowanym promptem audytu ('ogarnij lekcje' raz w miesiacu).
System bedzie sie poprawial SAM. Ten sam blad nie wroci.

MASZ JUZ: WIEDZA (vault + CLAUDE.md) + UMIEJETNOSCI (skille vault-ingest/vault-query/vault-linter, czyli capture/retrieve/maintenance) + CZAS (git + automatyczny backup, zeby nic nie ginelo) + GWARANCJE (hooki wymuszajace reguly w 100%) + ZACHOWANIE (rules + craft pisania) + SAMO-UCZENIE (ta petla).
ZOSTAJE: weryfikacja calosci (komponent 08 - smoke-test, ze wszystko zyje) i rytual utrzymania (komponent 09 - cykliczny lint + miesieczny audyt lekcji, zeby system nie gnil). To dwa ostatnie komponenty pakietu."

Pamietaj przez caly czas: jedno pytanie naraz, pokazuj zanim zapiszesz, chwal po kazdym kroku, em-dash zakazany, polskie znaki zostaja.
```
