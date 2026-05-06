# Newsletter signup (Beehiiv) — pivot z Brand Brain OS

**Data:** 2026-05-06
**Status:** zatwierdzony do planowania

## Kontekst

Aktualny funnel udaje produkt **Brand Brain OS** (PDF + Notion + Loom + ZIP), którego nie ma. Strona [/brain](app/brain/page.tsx) zbiera maile i pushuje na [/dzieki](app/dzieki/page.tsx), gdzie jest fake Loom (`REPLACE_WITH_LOOM_ID`) i link do nieistniejącego `/brand-brain-os.zip`.

**Pivot:** zamiast lead magnetu — prosty newsletter signup. Komunikat: "Chcesz więcej poradników? Zapisz się na maila." Backend: **Beehiiv**.

Cel — móc zacząć zbierać listę zanim Brand Brain OS będzie gotowy. Po zbudowaniu Braina wracamy do tego designu i podpinamy upgrade path.

## Scope

### In

- Repurpose strony `/brain` na newsletter signup (URL zostaje — brak redirectów, SEO/linki działają).
- Real submit do Beehiiv API v2 (endpoint subscriptions).
- Repurpose `/dzieki` na czystą thank-you stronę z instrukcją "sprawdź skrzynkę".
- Nowy Route Handler `app/api/subscribe/route.ts` jako proxy do Beehiiv (klucz API nie wycieka do klienta).
- Aktualizacja CTA w Hero.
- Double opt-in (user musi potwierdzić zapis przez email od Beehiiv).

### Out (na potem)

- Inline newsletter widget pod artykułami / w stopce.
- Drugi lead magnet / upgrade do Brand Brain OS (jak będzie gotowy).
- Whop upsell na `/dzieki` (wraca po pivot z powrotem na Brain).
- A/B test copy.
- Custom welcome email (na razie default Beehiiv).
- Tagi / segmentacja w Beehiiv (na razie wszyscy w jednym worku).

## Architektura

```
Hero CTA "Zapisz się"
        │
        ▼
   /brain (newsletter signup page)
        │  email submit
        ▼
   POST /api/subscribe  (Next.js Route Handler, server-side)
        │
        ▼
   POST https://api.beehiiv.com/v2/publications/{pub_id}/subscriptions
        │  (Authorization: Bearer ${BEEHIIV_API_KEY})
        ▼
   Beehiiv wysyła confirm email (double opt-in włączony w panelu)
        │
        ▼
   Klient redirectuje na /dzieki  ("Sprawdź skrzynkę i potwierdź zapis")
```

## Pliki — zmiany

### `app/brain/page.tsx` (przepisz)

Wytnij: `BULLETS` (PDF/Notion/checklisty/Loom), `FEATURES` (cztery moduły), fake quote Anny K., trzeci punkt FAQ ("czy darmowe naprawdę"), Final CTA section z dublującym formem.

Zostaw / dodaj:
- **Metadata:** title `Newsletter | luki.zip`, description `Poradniki o brand designie i launchach. Bez spamu, jeden mail tygodniowo.`
- **Hero section:**
  - Eyebrow: `Newsletter`
  - H1: `Poradniki na maila`
  - Lead: `Co tydzień jeden konkretny insight z brand designu i launchów. Krótko, bez fluffu, bez spamu. Wypisujesz się jednym kliknięciem.`
  - `<EmailCaptureForm />`
  - Microcopy pod formem: `Po zapisie dostaniesz email z potwierdzeniem.`
- **Mini FAQ section** (2 pytania, w prostym `<details>`):
  - "Co konkretnie dostanę?" — "Jeden mail w tygodniu. Konkretny insight, case study albo szablon. Maks 5 minut czytania."
  - "Czy mogę się wypisać?" — "Tak, jednym kliknięciem w stopce każdego maila."

Usuń import `Brain, Layers, Rocket, Workflow` z lucide (zostaje tylko `Check` jeśli używamy gdzie indziej — sprawdzić podczas implementacji).

### `app/brain/EmailCaptureForm.tsx` (zmodyfikuj)

Zmiany:
- Usuń `useRouter` z bezpośredniego pushu — używamy go dopiero **po** sukcesie API.
- Dodaj `error: string | null` state.
- W `onSubmit`:
  ```
  fetch('/api/subscribe', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  })
  ```
- Jeśli `res.ok` → `trackCTA(ctaId, '/dzieki')` + `router.push('/dzieki')`.
- Jeśli `!res.ok` → wyświetl error message pod formem (czerwony tekst), `setSubmitting(false)`. Copy: `Coś nie zagrało. Spróbuj za chwilę.` (bez kontaktu — w projekcie nie ma adresu email; Telegram nie pasuje do tego kontekstu.)
- CTA button text: `Pobierz system` → `Zapisz się`.
- Loading text: `Wysyłam...` zostaje.

### `app/api/subscribe/route.ts` (nowy plik)

```
POST /api/subscribe
Body: { email: string }

Response:
- 200 { ok: true }            — zapis przyjęty (Beehiiv 201 lub 200)
- 400 { error: 'invalid_email' } — walidacja
- 502 { error: 'beehiiv_failed' } — Beehiiv API zwrócił błąd
- 500 { error: 'unknown' }
```

Implementacja:
1. Parse JSON body. Walidacja regex emaila (prosty `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`).
2. Czytaj `BEEHIIV_API_KEY` i `BEEHIIV_PUBLICATION_ID` z `process.env`. Jeśli brak → 500.
3. POST do `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`:
   ```
   Headers: {
     'Authorization': `Bearer ${apiKey}`,
     'Content-Type': 'application/json'
   }
   Body: {
     email,
     reactivate_existing: true,    // jak już był subskrybentem ale wypisał się — wraca
     send_welcome_email: true,      // zawiera link confirmacyjny przy double opt-in
     utm_source: 'luki.zip',
     utm_medium: 'website',
     utm_campaign: 'brain_page'
   }
   ```
4. Jeśli Beehiiv zwróci 2xx → 200. W przeciwnym wypadku → 502 + log do konsoli (z `console.error` — Vercel je zbiera).
5. Runtime: `nodejs` (default OK, `fetch` działa edge też ale env vars łatwiejsze w node).

### `app/dzieki/page.tsx` (przepisz)

Wytnij całą zawartość poza shellem. Zostaje:
- Metadata: tytuł `Dzięki | luki.zip`, `robots: noindex` zostaje.
- H1: `Sprawdź skrzynkę`
- Lead: `Wysłałem email z linkiem potwierdzającym. Kliknij go, żeby aktywować zapis na newsletter.`
- Drugi paragraf (mniejszy): `Nie widzisz maila? Sprawdź spam. Domena nadawcy: beehiiv.com.`
- Sekundarny link wstecz: `← Wróć do artykułów` → `/artykuly`
- (Usuń `WhopBuyButton.tsx` import. Plik komponentu zostawić w drzewie — może wrócić; nieużywany import `WhopBuyButton` z `./WhopBuyButton` znika.)

### `app/components/home/Hero.tsx` (mała zmiana)

Linia 29: `Pobierz system` → `Zapisz się na newsletter`.

`data-track-id="cta_hero_brain"` zostaje (już zalogowane evented; zmiana ID zerwałby ciągłość metryk).

Href `/brain` zostaje (decyzja Q1 = A).

### `.env.local` (user wpisuje sam)

```
BEEHIIV_API_KEY=<rotowany klucz, NIE ten z czatu>
BEEHIIV_PUBLICATION_ID=pub_8d249257-4b0c-4637-a5dd-5761cd7db6a9
```

### `.env.example` (nowy plik, do gita)

Te same klucze z placeholderami:
```
BEEHIIV_API_KEY=
BEEHIIV_PUBLICATION_ID=
```

## Kontrakt z Beehiiv API

Endpoint: `POST https://api.beehiiv.com/v2/publications/{publicationId}/subscriptions`

Doc: https://developers.beehiiv.com/api-reference/subscriptions/create

Request body (relevantne pola):
- `email` (required, string)
- `reactivate_existing` (bool, default false) — true żeby wypisani wracali bez błędu
- `send_welcome_email` (bool, default false) — true; przy włączonym double-opt-in zawiera link potwierdzający
- `utm_source`, `utm_medium`, `utm_campaign` — opcjonalne, do segmentacji w Beehiiv

Response 201 → sukces (nowy subskrybent).
Response 200 → sukces (reactivation).
Response 4xx → błąd walidacji / auth / już istnieje aktywny.
Response 5xx → po stronie Beehiiv.

Setup w Beehiiv panel (poza kodem, user robi ręcznie):
- Settings → Email → **enable Double Opt-in** ("Require email confirmation").
- Settings → Email → custom welcome email (opcjonalnie, na razie default).

## Error handling

| Sytuacja | UX |
|---|---|
| Pusty email / zła forma | Browser native HTML5 (`required`, `type="email"`) — zatrzymuje submit. |
| Beehiiv 4xx (np. już aktywny) | 502 z route → form pokazuje generic error. (Opcja na potem: rozróżnić "już subskrybujesz".) |
| Beehiiv 5xx / network | 502 / 500 → generic error. |
| Brak env vars na serwerze | 500 + `console.error` z jasnym komunikatem — łatwo zauważyć w Vercel logs. |

## Co potrzeba poza kodem

1. **Rotacja API key w Beehiiv** (klucz wyciekł do czatu).
2. Włączyć **Double Opt-in** w Beehiiv → Settings.
3. Wpisać `BEEHIIV_API_KEY` i `BEEHIIV_PUBLICATION_ID` do `.env.local` (dev) i do Vercel env vars (prod, both Production + Preview).
4. Po deployu — submit testowego maila i sprawdzić czy confirm email przychodzi.

## Memory update (po zatwierdzeniu)

[memory/project_luki_zip_funnel.md](/Users/lukaszglica/.claude/projects/-Users-lukaszglica-Local-code-luki-zip-hub/memory/project_luki_zip_funnel.md) trzeba zaktualizować — Brand Brain OS lead magnet już nie jest aktualnym stanem funnela. Zamiast tego: newsletter (Beehiiv) jako placeholder do czasu aż Brain będzie gotowy.
