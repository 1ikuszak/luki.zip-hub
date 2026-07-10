# 04 - Warstwa GWARANCJI: hook lint (reguly jako KOD)

**Co to stawia:** strażnika, który sprawdza KAŻDY plik zapisany do vaulta, ZANIM zapis przejdzie. Em-dash i brakujący frontmatter zatrzymują się na bramce - reguła egzekwowana w 100%, nie tylko sugestia w CLAUDE.md, którą model czasem zapomni. To zamienia reguły "advisory" w prawdziwy kod.

**Dlaczego to czwarta warstwa:** WIEDZA (vault) + UMIEJĘTNOŚCI (skille) + CZAS (git/backup) już stoją. Bez GWARANCJI reguły gniją - model pamięta je w 9 na 10 notatek, dziesiąta przecieka. Hook nie pamięta ani nie zapomina. Sprawdza zawsze.

**Jak użyć:** Upewnij się, że Claude Code jest odpalony W folderze twojego vaulta (`cd ~/twoj-vault && claude`) - ten sam folder, który otwierasz w Obsidianie przez "Open folder as vault". Hook celuje w `$CLAUDE_PROJECT_DIR`, czyli właśnie ten folder. Potem wklej poniższy prompt do Claude Code.

**Ważne - dwa różne pliki lint:**
- `lint_vault.py` (ze skilla `vault-linter`, czyli warstwa maintenance) = pełny skan CAŁEGO vaulta, na żądanie ("lint vault").
- `vault_lint_hook.py` (ten plik) = lint POJEDYNCZEGO pliku, automatycznie przy każdym Write/Edit. To jest gwarancja, nie przegląd.

---

```
Jesteś moim asystentem od stawiania "Drugiego Mózgu". Stawiamy WARSTWĘ GWARANCJI: hook, który lintuje każdy zapisywany plik vaulta, zanim zapis przejdzie.

ZASADY PRACY:
- Pisz po polsku, prosto i ciepło. Tłumacz jak laikowi - zero żargonu bez wyjaśnienia.
- Pracujemy W folderze mojego vaulta (to jest working directory - ten sam folder, który mam otwarty w Obsidianie). Wszystkie ścieżki są relatywne od tego folderu.
- Zanim utworzysz albo nadpiszesz JAKIKOLWIEK plik - pokaż mi co dokładnie chcesz zrobić i poczekaj na moje "ok". Nie pisz plików bez mojej zgody.
- Jedno pytanie naraz. Nie wrzucaj listy pytań.
- Pokazuj progres ("krok 1 z 3 zrobiony") i dopinguj. Na końcu daj jasny stan: "masz X, zostaje Y".

ZANIM ZACZNIESZ - jedno sprawdzenie:
Potwierdź najpierw, że jesteśmy w dobrym miejscu. Uruchom (Bash):
  pwd && ls -la | grep -E "_GUIDE|_MOC|1-projects|2-areas|.claude" && ls .claude 2>/dev/null
Jeśli widać _GUIDE.md / foldery PARA / .claude - jesteśmy w rootcie vaulta, jedziemy dalej.
Jeśli NIE - zatrzymaj się i powiedz mi: "Wygląda na to, że Claude nie jest odpalony w folderze vaulta. Zamknij mnie, wejdź do folderu vaulta (cd ~/twoj-vault) i odpal `claude` jeszcze raz." Czekaj, nie kombinuj dalej.

Gdy potwierdzisz lokalizację, wykonaj 3 kroki PO KOLEI, pytając o zgodę przed każdym zapisem pliku.

=== KROK 1 z 3: plik strażnika (.claude/hooks/vault_lint_hook.py) ===

Powiedz mi: "Teraz utworzę strażnika - mały skrypt w Pythonie, który sprawdza każdy zapisywany plik. Mogę go zapisać do .claude/hooks/vault_lint_hook.py?"

Po moim "ok" utwórz folder .claude/hooks/ jeśli nie istnieje i zapisz do .claude/hooks/vault_lint_hook.py DOKŁADNIE ten kod (1:1, nie zmieniaj ani znaku):

#!/usr/bin/env python3
"""PostToolUse hook: szybki lint pojedynczego pliku vaulta po Write/Edit.

Sprawdza TYLKO edytowany plik (nie caly vault). Egzekwuje twarde reguly z _GUIDE:
- frontmatter obecny (notatka zaczyna sie od --- bloku YAML)
- zero em/en-dash (BANNED; wyjatek: katalogi verbatim trzymaja oryginal)

Exit 2 + stderr -> Claude widzi naruszenie i naprawia je natychmiast.
Pomija: _inbox/ (raw, verbatim), 4-archive/ (immutable), sources/ (pelna tresc verbatim),
templates/, .obsidian/, .claude/ (silnik: rules/skille to nie notatki wiedzy), .git/.

Root vaulta = $CLAUDE_PROJECT_DIR (working-dir Claude Code w wariancie zunifikowanym:
Claude odpalony W folderze vaulta). Zero hardkodu sciezki - dziala u kazdego.
"""
import json
import os
import sys
from pathlib import Path

# Root vaulta = folder z ktorego odpalony Claude Code (wariant zunifikowany).
# Fallback na cwd, jesli env nieustawiony.
VAULT = Path(os.environ.get("CLAUDE_PROJECT_DIR", ".")).resolve()
SKIP_DIRS = ("_inbox", "4-archive", "templates", ".obsidian", ".claude", ".git")
EMDASH_OK_DIRS = (
    "sources",
    "2-areas/knowledge/sources",
)  # pelna tresc verbatim - oryginal moze miec em-dash


def main() -> int:
    try:
        data = json.load(sys.stdin)
    except Exception:
        return 0
    tool_input = data.get("tool_input") or {}
    tool_response = data.get("tool_response") or {}
    fp = tool_input.get("file_path") or tool_response.get("filePath") or ""
    if not fp:
        return 0
    p = Path(fp)
    try:
        rel = p.resolve().relative_to(VAULT)
    except (ValueError, OSError):
        return 0  # plik spoza vaulta - ignoruj
    if p.suffix != ".md" or not p.exists():
        return 0
    rel_s = str(rel)
    if any(rel_s == d or rel_s.startswith(d + "/") for d in SKIP_DIRS):
        return 0
    # pomijaj kazdy podkatalog sources/ (verbatim), gdziekolwiek lezy
    if any(part == "sources" for part in rel.parts[:-1]):
        return 0
    try:
        text = p.read_text(encoding="utf-8")
    except Exception:
        return 0

    problems = []
    if not text.startswith("---"):
        problems.append("brak frontmatter (notatka musi zaczynac sie od --- bloku YAML)")
    if not any(rel_s.startswith(d) for d in EMDASH_OK_DIRS):
        for i, line in enumerate(text.splitlines(), 1):
            if "\u2014" in line or "\u2013" in line:  # em/en-dash (zapis \u zeby ten plik sam przechodzil lint)
                problems.append(f"linia {i}: em/en-dash (BANNED) -> zamien na ' - ' lub przecinek")
            if len(problems) >= 10:
                break

    if problems:
        print(f"[vault-lint] naruszenia w {rel_s}:", file=sys.stderr)
        for pr in problems[:10]:
            print(f"  - {pr}", file=sys.stderr)
        print("Napraw teraz te naruszenia w tym pliku (reguly z _GUIDE).", file=sys.stderr)
        return 2
    return 0


if __name__ == "__main__":
    sys.exit(main())

Po zapisie powiedz: "Krok 1 z 3 gotowy. Strażnik na miejscu. To jeszcze nie działa - musimy go podpiąć (krok 2)."

=== KROK 2 z 3: podpięcie strażnika (.claude/settings.json) ===

Powiedz mi: "Teraz podepnę strażnika, żeby odpalał się sam przy każdym zapisie. To wpis w .claude/settings.json. Mogę?"

Po moim "ok":
- Jeśli .claude/settings.json NIE istnieje - utwórz go z dokładnie taką treścią:

{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "python3 \"$CLAUDE_PROJECT_DIR/.claude/hooks/vault_lint_hook.py\"",
            "timeout": 15,
            "statusMessage": "vault lint"
          }
        ]
      }
    ]
  }
}

- Jeśli .claude/settings.json JUŻ istnieje - NIE nadpisuj go. Wczytaj go, pokaż mi obecną treść, i zmerguj TYLKO blok hooka PostToolUse (matcher "Write|Edit" -> python3 "$CLAUDE_PROJECT_DIR/.claude/hooks/vault_lint_hook.py", timeout 15). Jeśli już istnieje taki sam wpis - nie dubluj, powiedz mi że już jest. Reszty ustawień nie ruszaj.

Po zapisie powiedz: "Krok 2 z 3 gotowy. Strażnik podpięty. Uwaga: żeby Claude Code załadował nowy hook, trzeba mnie zrestartować (zamknij i odpal `claude` jeszcze raz w tym folderze) - hooki wczytują się przy starcie."

=== KROK 3 z 3: test, że strażnik faktycznie łapie ===

Powiedz mi: "Sprawdźmy, czy strażnik działa. Zrobię szybki test na sztucznym pliku - utworzę plik z błędem (em-dash, bez frontmatter), zobaczymy czy strażnik krzyknie, potem go skasuję. Mogę?"

Po moim "ok" odpal (Bash) - to symuluje zapis pliku przez hook, bez restartu:
  printf 'test z em-dash \xe2\x80\x94 o tu\n' > 2-areas/_hooktest.md
  echo '{"tool_input":{"file_path":"'"$PWD"'/2-areas/_hooktest.md"}}' | CLAUDE_PROJECT_DIR="$PWD" python3 .claude/hooks/vault_lint_hook.py; echo "EXIT=$?"
  rm -f 2-areas/_hooktest.md

Jeśli zobaczysz "[vault-lint] naruszenia" i "EXIT=2" - strażnik działa, łapie błędy. Powiedz mi to wprost i wyjaśnij: "Strażnik zwrócił EXIT=2 - to znaczy, że gdy ja (Claude) zapiszę plik z em-dash albo bez frontmatter, ten kod zatrzyma zapis i wepchnie mi błąd z powrotem. Naprawię to, zanim plik zostanie. Reguła egzekwowana w 100%, nie tylko sugestia."
Jeśli zobaczysz "EXIT=0" - coś nie gra (może ścieżka). Zatrzymaj się i powiedz mi, nie udawaj że działa.

=== NA KONIEC ===

Podsumuj jednym blokiem, prostym językiem:
"Gotowe. Od teraz za każdym razem, gdy zapiszę cokolwiek do twojego vaulta, strażnik sprawdza em-dash i frontmatter ZANIM zapis przejdzie. Złapie błąd -> sam go naprawię, dopiero potem plik zostaje. Wyjątki (strażnik ich nie rusza): _inbox/ (surowe wrzutki), 4-archive/ (zamrożone), sources/ (pełna treść 1:1), templates/.

MASZ teraz komplet 4 warstw:
- WIEDZA (vault PARA + MOC)
- UMIEJĘTNOŚCI (skille: vault-ingest / vault-query / vault-linter, czyli capture / retrieve / maintenance)
- CZAS (git + backup)
- GWARANCJE (ten strażnik - reguły jako kod)

To jest OS, nie biblioteka.

ZOSTAJE: weryfikacja, że całość gra razem (komponent 08) - jeden przebieg end-to-end: wrzuć coś do _inbox, zingestuj, zapytaj swój drugi mózg, sprawdź czy strażnik łapie błąd. Wtedy wiesz, że stoi."

Pamiętaj: gdybym zapomniał zrestartować Claude Code po kroku 2 - hook nie zadziała w realnym zapisie, dopóki mnie nie odpalisz na nowo. Przypomnij mi o tym na końcu.
```

---

## Notatka producenta (nie część paste-promptu)

- **Wiring obecny:** TAK. Hook używa `$CLAUDE_PROJECT_DIR` (= root vaulta w wariancie zunifikowanym), settings.json w `.claude/` roota. Spójne z całą paczką, zamyka LUKA 6.
- **Self-config obecny:** TAK. Krok startowy sprawdza, czy Claude jest w rootcie vaulta (grep `_GUIDE`/`_MOC`/`.claude`); jeśli nie - zatrzymuje i instruuje restart z właściwego folderu. Zero hardkodu ścieżki - root z env.
- **Różnica vs realny hook Luki:** jedyna zmiana to `VAULT = $CLAUDE_PROJECT_DIR` zamiast `Path.home()/"Local"/"knowledge"` (eliminuje hardcode dla obcego usera) + rozszerzony skip `sources/` (dowolny podkatalog, nie tylko `2-areas/knowledge/sources`). Reszta logiki 1:1.
- **Zweryfikowane:** hook przetestowany na 4 przypadkach (bad→exit 2, good/sources/_inbox→exit 0).
