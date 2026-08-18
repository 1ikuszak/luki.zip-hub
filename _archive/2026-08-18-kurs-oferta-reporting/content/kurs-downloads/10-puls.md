# 10 · PULS - cotygodniowy raport zdrowia, ktory przychodzi sam

**Co to stawia:** deterministyczny skrypt `pulse.py` (zero AI, czysta mechanika) + hook SessionStart. Raz w tygodniu, przy pierwszym otwarciu Claude Code, dostajesz raport zdrowia vaulta ZANIM o cokolwiek zapytasz: ile bledow i czy przybywa, ile zalega w inboxie, ktore projekty umarly - plus maksymalnie 3 PROPOZYCJE do klepniecia TAK/NIE. To jest warstwa, o ktorej mowi Lekcja 2: sygnal o gniciu przychodzi ZA DARMO do miejsca, gdzie pracujesz, zamiast czekac w pliku, ktorego nikt nie otwiera.

Najwazniejsza cecha: **cisza jest niemozliwa**. Jak badanie sie wywali, na ekranie i w `_PULS.md` laduje "PULS PADL" z powodem. Albo widzisz zdrowie bazy, albo widzisz, ze pomiar padl. Trzeciej opcji nie ma.

**Zanim wkleisz - upewnij sie, ze:**
- Claude Code jest odpalony w folderze vaulta (`cd ~/twoj-vault && claude`).
- Masz wgrany skill `vault-linter` (komponent 05) - puls z niego korzysta.
- Jesli masz juz hooki z komponentu 04: puls DOPISUJE sie do istniejacego `.claude/settings.json`, nie nadpisuje go. Nie masz jeszcze settings.json? Nic nie szkodzi - prompt utworzy go z sama sekcja hooks.

**Jak uzyc:** skopiuj caly blok ponizej, wklej do Claude Code, Enter.

---

## Prompt · POSTAW PULS

```text
Jestes moim asystentem przy stawianiu "Drugiego Mozgu". Stawiasz teraz PULS: cotygodniowy, deterministyczny raport zdrowia vaulta, ktory pokazuje sie sam na starcie sesji. Trzy kroki: (1) zapisz gotowy skrypt, (2) podepnij hook SessionStart, (3) test na zywo.

Pracujemy w folderze, w ktorym jestes uruchomiony (root vaulta). Sciezki tylko relatywne. Mow po polsku, prosto. Przed kazdym zapisem pliku pokaz co zapisujesz i zapytaj o zgode.

KROK 1 z 3: zapisz DOKLADNIE ten skrypt do .claude/scripts/pulse.py (utworz folder, tresci nie zmieniaj):

#!/usr/bin/env python3
"""PULS - tygodniowy raport zdrowia vaulta. Zero AI, czysta mechanika.
Hook odpala: python3 .claude/scripts/pulse.py --if-due
Awaria nigdy nie jest cicha: kazdy blad = PULS PADL na ekranie i w _PULS.md."""
import json, re, subprocess, sys, time
from datetime import datetime, timedelta
from pathlib import Path

VAULT = Path.cwd()
STATE = VAULT / ".claude" / "state" / "pulse-state.json"
OUT = VAULT / "_PULS.md"
LINTER = VAULT / ".claude" / "skills" / "vault-linter" / "scripts" / "lint_vault.py"

def load_state():
    try:
        return json.loads(STATE.read_text())
    except Exception:
        return {}

def due(state):
    last = state.get("last_run")
    if not last:
        return True
    return (datetime.now() - datetime.fromisoformat(last)) >= timedelta(days=7)

def lint_counts():
    r = subprocess.run([sys.executable, str(LINTER), "--vault", "."],
                       capture_output=True, text=True, timeout=300)
    text = r.stdout + r.stderr
    # Linter wypisuje: "Scanned: N files | Errors: E | Warnings: W"
    errs = re.search(r"Errors:\s*(\d+)", text, re.I)
    warns = re.search(r"Warnings:\s*(\d+)", text, re.I)
    if not errs:
        raise RuntimeError("nie moge odczytac liczby bledow z lintera (zmienil format?)")
    return int(errs.group(1)), int(warns.group(1)) if warns else 0

def inbox_stats():
    inbox = VAULT / "_inbox"
    files = list(inbox.glob("*.md")) if inbox.exists() else []
    oldest = int((time.time() - min(f.stat().st_mtime for f in files)) // 86400) if files else 0
    return len(files), oldest

def stale_projects():
    root = VAULT / "1-projects"
    if not root.exists():
        return []
    out = []
    for d in root.iterdir():
        if d.is_dir():
            newest = max((f.stat().st_mtime for f in d.rglob("*.md")), default=0)
            if newest and (time.time() - newest) > 30 * 86400:
                out.append(d.name)
    return out

def main():
    state = load_state()
    if "--if-due" in sys.argv and not due(state):
        return
    try:
        errs, warns = lint_counts()
        inbox_n, inbox_old = inbox_stats()
        stale = stale_projects()
        delta = ""
        if state.get("last_errors") is not None:
            delta = f" (zmiana od ostatniego pulsu: {errs - state['last_errors']:+d})"
        props = []
        if errs:
            props.append("bledy w vaulcie - powiedz Claude'owi: przejrzyj _PULS.md i zaproponuj naprawy")
        if inbox_n >= 10:
            props.append(f"seria ingestu: 10 najstarszych z _inbox ({inbox_n} czeka)")
        if stale:
            props.append("projekty bez ruchu >30 dni: " + ", ".join(stale[:3]) + " - archiwizowac?")
        lines = [f"# PULS - {datetime.now():%Y-%m-%d}", "",
                 f"ZDROWIE: {errs} bledow{delta} / {warns} ostrzezen",
                 f"INBOX: {inbox_n} plikow" + (f", najstarszy {inbox_old} dni" if inbox_n else ""),
                 "", "PROPOZYCJE (klepiesz TAK/NIE, wykonuje Claude):"]
        lines += [f"{i+1}. {p}" for i, p in enumerate(props)] or ["1. brak - vault zdrowy, nic nie rob"]
        report = "\n".join(lines) + "\n"
        OUT.write_text(report, encoding="utf-8")
        STATE.parent.mkdir(parents=True, exist_ok=True)
        STATE.write_text(json.dumps({"last_run": datetime.now().isoformat(), "last_errors": errs}))
        print(report)
    except Exception as e:
        msg = (f"# PULS PADL - {datetime.now():%Y-%m-%d}\n\n"
               f"Badanie sie wywalilo: {e}\n"
               "Pokaz ten plik Claude'owi i powiedz: napraw puls.\n")
        try:
            OUT.write_text(msg, encoding="utf-8")
        except Exception:
            pass
        print(msg)

if __name__ == "__main__":
    main()

KROK 2 z 3: podepnij hook SessionStart w .claude/settings.json. Jesli plik istnieje, przeczytaj go i DOPISZ (merge, nie nadpisuj) do sekcji "hooks" wpis:

"SessionStart": [{"hooks": [{"type": "command", "command": "python3 .claude/scripts/pulse.py --if-due"}]}]

Jesli sekcja "hooks" nie istnieje, utworz ja. Jesli caly plik .claude/settings.json nie istnieje, utworz go z sama sekcja "hooks" i tym wpisem. Pokaz mi finalny settings.json przed zapisem.

KROK 3 z 3: test na zywo. Odpal recznie:

  python3 .claude/scripts/pulse.py

(bez --if-due = wymusza raport). Sprawdz, ze: (a) raport wyswietlil sie na ekranie, (b) istnieje plik _PULS.md z ta sama trescia, (c) istnieje .claude/state/pulse-state.json, (d) liczba bledow w raporcie ZGADZA SIE z linijka "Errors: ..." z wyjscia "python3 .claude/skills/vault-linter/scripts/lint_vault.py --vault ." - jesli sie rozjezdza, dostosuj regex w lint_counts() i powtorz test. Pokaz mi raport. Potem odpal jeszcze raz Z flaga --if-due i potwierdz, ze tym razem jest cisza (raport swiezy, wiec nie ma co raportowac).

NA KONIEC powiedz mi jednym akapitem: "Puls stoi. Od teraz raz w tygodniu, przy pierwszym otwarciu Claude Code, raport zdrowia przywita cie sam. Propozycje z raportu klepiesz TAK albo NIE, a wykonuje je Claude. Jak puls padnie, zobaczysz PULS PADL zamiast ciszy. Pierwszy automatyczny raport: za 7 dni."
```

---

## Co masz po tym komponencie

- Raport zdrowia raz w tygodniu, sam z siebie, na starcie sesji. Nie musisz pamietac.
- `_PULS.md` = ostatni raport, zawsze do wgladu.
- Awaria widoczna ("PULS PADL"), nigdy cicha.
- Twoja praca: przeczytac raport i klepnac TAK/NIE przy propozycjach. To sa te "10 minut w tygodniu" z Lekcji 2. Wykonanie robi Claude (prompty z komponentu 09).

## See Also
- [[09-maintenance-prompt]] - prompty do wykonania decyzji z pulsu
- [[05-skille]] - vault-linter, z ktorego puls korzysta
- [[04-hooks-gwarancje]] - warstwa GWARANCJE (hook per zapis)
