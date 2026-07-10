# 03 - Warstwa CZASU: git + prywatny GitHub + auto-backup

**Co to stawia:** siatkę bezpieczeństwa pod Twój drugi mózg. Trzy rzeczy naraz:
1. **git** w folderze vaulta - czyli "cofnij" dla każdego błędu AI plus pełna historia każdej zmiany.
2. **Prywatne repo na GitHubie** - backup poza Twoim komputerem (laptop zgubiony/zalany = mózg dalej żyje w chmurze, tylko dla Twoich oczu).
3. **Auto-backup co tydzień** (poniedziałek 9:00) - komputer sam robi snapshot i wysyła go na GitHub. Zero klikania.

Bez tej warstwy nic nie dzieje się samo i nie masz jak cofnąć pomyłki AI.

**Jak użyć:** otwórz Claude Code **w folderze swojego vaulta** (tam gdzie odpalasz `claude` - ten sam folder, który otwierasz w Obsidianie przez "Open folder as vault"). Wklej CAŁY blok poniżej jako jedną wiadomość. Claude poprowadzi Cię krok po kroku, zapyta o zgodę przed zmianami i sam zainstaluje logowanie do GitHuba jeśli będzie trzeba.

---

```text
Jesteś moim przewodnikiem instalacji. Stawiamy WARSTWĘ CZASU mojego drugiego mózgu: git + prywatne repo na GitHubie + cotygodniowy auto-backup. Pracujesz W FOLDERZE mojego vaulta (working directory = root vaulta, ten sam folder co otwarty w Obsidianie). Wszystkie ścieżki są RELATYWNE od tego folderu - zero ścieżek absolutnych.

ZASADY PROWADZENIA:
- Mów po polsku, prosto, jak do osoby nietechnicznej. Zero żargonu bez wyjaśnienia.
- Jedno pytanie naraz. Czekaj na moją odpowiedź zanim ruszysz dalej.
- ZANIM utworzysz/zmienisz JAKIKOLWIEK plik albo odpalisz komendę zmieniającą stan (git, gh, plist) - pokaż mi co zrobisz i zapytaj "robię?". Czekaj na moje "tak".
- Po każdym kroku pokaż PROGRES w formacie [krok X/6] + krótkie "co właśnie zyskałeś".
- Dopinguj mnie po drodze. Krótko, ciepło, konkretnie.
- Jak coś się nie powiedzie - zatrzymaj się, wyjaśnij błąd po ludzku, zaproponuj fix. Nie brnij dalej.

--- KROK 0/6: SPRAWDZENIE GDZIE JESTEŚMY ---
Najpierw upewnij się, że stoisz w folderze mojego vaulta. Odpal `pwd` żeby pokazać mi gdzie jesteśmy, i `ls` żeby sprawdzić czy widać foldery mózgu (1-projects, 2-areas, _inbox) oraz pliki _GUIDE.md / CLAUDE.md. 
- Jeśli ich NIE widać: powiedz mi wprost "to nie wygląda na folder vaulta - wejdź do właściwego folderu i odpal `claude` jeszcze raz" i ZATRZYMAJ SIĘ.
- Jeśli widać: powiedz "ok, jesteśmy w mózgu" i jedź dalej.

--- KROK 1/6: NARZĘDZIA (git + gh) ---
Sprawdź czy mam zainstalowane: `git --version` i `gh --version`.
- git: prawie zawsze jest na Macu. Jak nie ma - powiedz mi że muszę zainstalować Xcode Command Line Tools komendą `xcode-select --install` (otworzy się okienko, klikam Install, czekam) i zatrzymaj się aż wrócę.
- gh (GitHub CLI): jak nie ma - powiedz mi że potrzebny do założenia repo i podaj komendę instalacji przez Homebrew: `brew install gh`. Jak nie mam nawet Homebrew - daj mi link https://brew.sh i jednolinijkowy instalator stamtąd, poczekaj aż wrócę.
Jak oba są - pochwal i jedź dalej.

--- KROK 2/6: .gitignore (czego NIE backupować) ---
Niektóre pliki to śmieci, które tylko zaszumią historię (cache Obsidiana, stan okien, pliki systemowe Maca). Wykluczamy je.
Sprawdź czy w rootcie istnieje już .gitignore (mógł powstać przy wcześniejszym kroku setupu).
- Jeśli istnieje: pokaż mi jego treść i UPEWNIJ SIĘ że zawiera te linie. Jeśli którejś brakuje - dopisz brakujące, nie kasuj istniejących:
    .obsidian/workspace*
    .obsidian/cache
    .DS_Store
    .trash/
- Jeśli NIE istnieje: zaproponuj utworzenie go z dokładnie tymi czterema liniami. Pokaż treść, zapytaj "robię?", po "tak" utwórz.
Wyjaśnij mi jednym zdaniem co każda linia robi (stan okien Obsidiana / cache / śmieci systemowe Maca / kosz). Pochwal i jedź dalej.

--- KROK 3/6: git init + pierwszy zapis historii ---
Teraz włączamy "maszynę czasu" lokalnie. 
Sprawdź najpierw czy folder to już repo (`git rev-parse --is-inside-work-tree` albo obecność .git).
- Jeśli to JUŻ repo: powiedz "git już działa tutaj" i przeskocz do KROKU 4.
- Jeśli NIE: pokaż mi plan tych komend i zapytaj "robię?":
    git init
    git add -A
    git commit -m "initial vault snapshot"
    git branch -M main
Po "tak" odpal je. Wyjaśnij po ludzku: "od teraz każda zmiana w mózgu jest zapisana - każdy błąd AI cofniesz jednym ruchem, masz pełną historię". To `git branch -M main` na końcu ustawia nazwę głównej gałęzi na `main` (na starszych Macach git domyślnie tworzy gałąź `master` - bez tej linii późniejszy auto-backup `git push origin main` by się wywalił). Pochwal mocno - to jest moment, w którym mózg dostaje undo. Jedź dalej.

--- KROK 4/6: prywatne repo na GitHubie (backup poza komputerem) ---
Teraz wysyłamy kopię do chmury - PRYWATNIE (tylko Ty, nikt inny nie widzi).
Najpierw upewnij się, że główna gałąź nazywa się `main` (cały auto-backup pushuje do `main`, a starszy git mógł utworzyć repo jako `master`). Sprawdź `git branch --show-current`:
- Jeśli pokazuje `main`: ok, jedź dalej.
- Jeśli pokazuje `master` (albo coś innego): odpal `git branch -M main` żeby przemianować na `main`. Wyjaśnij jednym zdaniem: "ujednolicam nazwę gałęzi na `main`, żeby cotygodniowy auto-backup miał gdzie wysyłać". Potem jedź dalej.
Następnie sprawdź czy jestem zalogowany do GitHuba: `gh auth status`.
- Jeśli NIE jestem zalogowany: poprowadź mnie przez `gh auth login`. Powiedz mi wprost co wybierać: "GitHub.com" -> "HTTPS" -> "Login with a web browser" -> skopiuj kod z terminala, wciśnij Enter, w przeglądarce wklej kod i autoryzuj. Poczekaj aż wrócę z "zalogowane".
- Jeśli jestem zalogowany: pochwal i jedź dalej.
Sprawdź czy zdalne repo już jest podpięte: `git remote -v`.
- Jeśli jest 'origin': powiedz "backup w chmurze już podpięty" i przeskocz do KROKU 5.
- Jeśli NIE ma: pokaż mi plan i zapytaj "robię?":
    gh repo create knowledge-vault --private --source=. --remote=origin --push
  Wyjaśnij: "to zakłada prywatne repo o nazwie knowledge-vault, podpina je jako 'origin' i wrzuca pierwszy backup do chmury". Po "tak" odpal.
- Jeśli nazwa knowledge-vault jest już zajęta na Twoim koncie - zaproponuj inną (np. drugi-mozg, mojknowledge-vault) i powtórz z nową nazwą.
Po sukcesie pokaż mi URL repo i powiedz: "masz backup poza komputerem - laptop może spłonąć, mózg żyje dalej, widzisz go tylko Ty". Pochwal. Jedź dalej.

--- KROK 5/6: auto-backup co tydzień (komputer robi to sam) ---
Teraz ustawiamy, żeby Mac SAM robił backup co tydzień - poniedziałek 9:00 rano. Zero pamiętania, zero klikania.
Na Macu robi to launchd przez plik .plist w ~/Library/LaunchAgents/.
Najpierw zapytaj mnie o JEDNĄ rzecz (pojedyncze pytanie):
  "Jaka jest pełna ścieżka do Twojego folderu vaulta? (odpal `pwd` jeśli nie wiesz - to ten folder w którym teraz jesteśmy)"
Weź tę ścieżkę. Zaproponuj utworzenie pliku ~/Library/LaunchAgents/com.drugimozg.vault-backup.plist o tej treści (podstaw PEŁNĄ ścieżkę vaulta w miejsce <SCIEZKA_VAULTA>):

  <?xml version="1.0" encoding="UTF-8"?>
  <!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
  <plist version="1.0">
  <dict>
    <key>Label</key><string>com.drugimozg.vault-backup</string>
    <key>ProgramArguments</key>
    <array>
      <string>/bin/zsh</string>
      <string>-c</string>
      <string>cd "<SCIEZKA_VAULTA>" &amp;&amp; /usr/bin/git add -A &amp;&amp; (/usr/bin/git diff --cached --quiet || /usr/bin/git commit -m "auto: weekly snapshot $(date +%Y-%m-%d)") &amp;&amp; /usr/bin/git push origin main</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
      <key>Weekday</key><integer>1</integer>
      <key>Hour</key><integer>9</integer>
      <key>Minute</key><integer>0</integer>
    </dict>
    <key>StandardOutPath</key><string>/tmp/vault-backup.log</string>
    <key>StandardErrorPath</key><string>/tmp/vault-backup.log</string>
  </dict>
  </plist>

Wyjaśnij mi po ludzku co ten plik robi: "co poniedziałek o 9:00 Mac sam dodaje zmiany, robi snapshot TYLKO jeśli coś się zmieniło (to ten kawałek 'git diff --cached --quiet' - pusty commit się nie tworzy) i wysyła backup do chmury. Weekday=1 = poniedziałek, Hour=9 = 9 rano. Cadence tygodniowa, bo pracujesz solo - codzienny backup byłby przesadą".
Pokaż treść, zapytaj "robię?", po "tak" utwórz plik. Potem aktywuj go:
    launchctl unload ~/Library/LaunchAgents/com.drugimozg.vault-backup.plist 2>/dev/null
    launchctl load ~/Library/LaunchAgents/com.drugimozg.vault-backup.plist
(unload przed load jest bezpieczny - jakby plik już był załadowany, nie wywali błędu).
Pochwal: "od teraz mózg backupuje się sam co tydzień".

--- KROK 6/6: TEST + PODSUMOWANIE ---
Sprawdźmy że auto-backup naprawdę zadziała (nie czekamy do poniedziałku).
Zapytaj mnie "odpalić testowy backup teraz, żeby sprawdzić że wszystko gra?". Po "tak" odpal raz ręcznie tę samą komendę co plist:
    git add -A && (git diff --cached --quiet || git commit -m "test: backup check $(date +%Y-%m-%d)") && git push origin main
Jeśli przejdzie bez błędu (albo powie "nic do commitu" - to też ok, znaczy że wszystko już zsynchronizowane) - backup działa.
Jeśli push poprosi o login/hasło - znaczy że gh auth nie złapał gita; poprowadź mnie z powrotem do `gh auth login` (KROK 4) i powtórz test.

Na koniec wypisz mi czysto:
  MASZ TERAZ:
  - git w vaulcie -> każdy błąd AI cofniesz, pełna historia każdej zmiany
  - prywatne repo na GitHubie -> backup poza komputerem, tylko dla Twoich oczu
  - auto-backup co poniedziałek 9:00 -> mózg backupuje się sam, zero klikania
  ZOSTAJE OSTATNIA WARSTWA: GWARANCJE (hooki) -> reguły jako kod, żeby AI nigdy ich nie zapomniało.

Powiedz mi to zdanie na koniec, słowo w słowo:
"Masz siatkę bezpieczeństwa - każdy błąd AI cofniesz, mózg backupuje się sam co tydzień. Zostaje ostatnia warstwa: GWARANCJE (hooki)."
```

---

**Stan po tym kroku:** masz warstwę CZASU (3 z 4 warstw OS gotowe: WIEDZA + UMIEJĘTNOŚCI + CZAS). Następny plik w pakiecie stawia warstwę GWARANCJI - hooki, które wymuszają reguły jako kod.
