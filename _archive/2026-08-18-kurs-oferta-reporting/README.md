# Archiwum 2026-08-18: kurs Drugi Mózg + stara /oferta + /reporting

Wyjęte z `app/` (nie buduje się, nie routuje; `_archive` wykluczone w tsconfig).
Powód: podstrony nieużywane; porządek po false-positive "strona zablokowana" u jednego odbiorcy
(strona sprawdzona czysto: Google Safe Browsing, Sucuri, skan bundli - to NIE była przyczyna).

Co tu leży:
- `app/drugi-mozg`, `app/drugi-mozg-old` - landing + kurs (magic-link, lekcje dzień 1-5, dziękuję)
- `app/components/drugi-mozg*` - komponenty kursu i landingu
- `app/api/kurs`, `app/api/easycart` - dostęp magic-link, download paczek, webhook EasyCart
- `app/lib/easycart.ts`, `access.ts`, `session.ts` - warstwa dostępu do kursu
- `content/kurs-downloads` - paczki lekcji (zip) + manifest
- `scripts/sync-kurs.mjs`, `sync-downloads.mjs`, `EASYCART_INTEGRATION.md`
- `app/oferta` - stara oferta contentowa "997 zł" (nav "Oferta" wskazuje teraz /uslugi)
- `app/reporting` - opis narzędzia raportowego pod weryfikację Google Ads API (PetitePants)

Przywrócenie: `git mv` z powrotem do `app/`, przywróć `outputFileTracingIncludes` dla
`/api/kurs/download` w next.config.ts, zdejmij redirecty /drugi-mozg, /oferta, /reporting,
przywróć HIDDEN_PREFIXES w ChromeGate.tsx. Env (EASYCART_*, KURS_*) zostały na Vercelu nietknięte.
