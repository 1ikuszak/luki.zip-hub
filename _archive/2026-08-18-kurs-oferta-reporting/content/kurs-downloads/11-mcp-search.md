# 11 - Semantic search + warm serving (ZAAWANSOWANY, opcjonalny)

**Co stawia:** czwarty organ RETRIEVE w wersji PRO - wyszukiwanie po ZNACZENIU, nie tylko po dokładnym słowie. Grep (skill `vault-query`) znajdzie "reklamacja" tylko jak wpiszesz "reklamacja". `vault-search` znajdzie ją, gdy wpiszesz "klientka niezadowolona" - bo szuka sensu. Plus łapie dokładne tokeny (liczby, nazwy) przez drugi silnik. Dwa ramiona łączone matematyką rankingu (RRF).

> **Najpierw drift-test. Nie instaluj tego z automatu.** Duch tego kursu: nie dokładaj ruchomych części, zanim realnie zabolą. Grep wystarcza dla małego/średniego vaulta (zmierzone na naszym: trafność r@3 ~0.69). Zrób test: wpisz do `vault-query` 3 pytania PARAFRAZAMI (nie dokładnym słowem z notatki). Jeśli grep trafia - zostaw prosto, wróć tu później. Jeśli gubi (a przy synonimach i liczbach gubi) - wtedy to jest dla Ciebie. Tak właśnie podejmuje się tę decyzję: pomiarem, nie hype'em.

> **Po co to w ogóle jest.** Poważne systemy (HQ by Indigo - $500/mc, Adobe w portfolio; Cerebras - 15 000 zapytań/dzień) serwują dokładnie to: hybrydowy semantic search jako serwer, który agent odpytuje. Ten komponent daje Ci to samo, lokalnie, za darmo, dostrojone pod polski.

---

## CZĘŚĆ 0 - Zależności (raz)

```bash
pip3 install sentence-transformers mcp
```
Pierwsze uruchomienie ściąga model BGE-M3 (~570MB, raz, zostaje w cache). Numpy wchodzi razem z torch.

## CZĘŚĆ A - Skopiuj skill

```bash
cp -r "<sciezka-do-paczki>/skills/vault-search" .claude/skills/
```

## CZĘŚĆ B - Zbuduj indeks (raz, potem incremental)

W rootcie vaulta:
```bash
python3 .claude/skills/vault-search/scripts/index_vault.py --vault .
```
Chodzi po Twoich notatkach, zamienia je na wektory znaczeń, zapisuje do `.vault-index/index.db`. Dodaj `.vault-index/` do `.gitignore` (regenerowalne, duże). Po większym wrzucie wiedzy odpal to ponownie (incremental = tylko zmienione, sekundy).

Test:
```bash
python3 .claude/skills/vault-search/scripts/search_vault.py --vault . "twoje pytanie parafrazą"
```

## CZĘŚĆ C - Warm serving (MCP): zeby search był NATYCHMIASTOWY

Zimny start ładuje model za każdym wywołaniem = ~12s. To nie samo szukanie (ono trwa 0,01s) - to ładowanie modelu. Fix: serwer MCP trzyma model ciepły. Pierwszy search w sesji ~12s, każdy kolejny **~0,04s (250x szybciej)**. To ten sam wzorzec, którego używa HQ (qmd) i Cerebras.

Zarejestruj serwer (z roota vaulta):
```bash
claude mcp add --scope project vault-search --env VAULT_ROOT=$PWD -- \
  python3 .claude/skills/vault-search/scripts/mcp_server.py
```

To zapisze `.mcp.json` w Twoim vaulcie:
```json
{
  "mcpServers": {
    "vault-search": {
      "type": "stdio",
      "command": "python3",
      "args": [".claude/skills/vault-search/scripts/mcp_server.py"],
      "env": { "VAULT_ROOT": "<sciezka-do-roota-vaulta>" }
    }
  }
}
```

**Zatwierdź serwer.** Przy następnym starcie Claude Code zapyta o zgodę na serwer MCP (bramka bezpieczeństwa - żeby żaden projekt nie odpalił Ci serwera bez wiedzy). Kliknij approve. Od tego momentu agent woła narzędzie `vault_search` natywnie i ciepło.

## Jak używać (reguła dla agenta)

Dopisz do `CLAUDE.md` swojego vaulta:

```
## Retrieval
- Pytanie o ZNACZENIE / nie pamiętam słowa -> uzyj vault_search (MCP) albo skill vault-search.
- Dokładny string / znam plik -> grep (vault-query). Szybsze.
```

## Utrzymanie (uczciwie)

Indeks to zdjęcie w czasie - nowe notatki są wyszukiwalne dopiero po ponownym `index_vault.py --vault .`. Najprościej: dopnij tę komendę na koniec swojego cotygodniowego rytuału / skryptu pobierającego content. Model w RAM trzyma serwer MCP tylko w trakcie sesji (po zamknięciu wolny). To jest ta ruchoma część, o której mówił drift-test na górze - świadomie ją dodajesz, bo daje realną wartość, nie dla ozdoby.
