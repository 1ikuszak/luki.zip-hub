# Kurs Drugi Mózg — płatność, dostawa, dostęp (runbook)

Kompletny flow: **przycisk → hostowany checkout EasyCart → płatność → zweryfikowany
webhook → mail z krótkotrwałym magic linkiem (Resend) → klik = httpOnly cookie →
gated strony kursu + pobrania**.

Zaktualizowane 2026-07-10: dostawa przez **Resend** (nie Beehiiv), dostęp przez
**magic link + cookie sesji** (nie wieczny link `?k=` w URL).

## Model bezpieczeństwa (co chroni przed czym)

| Zagrożenie | Ochrona |
|------------|---------|
| Ktoś zgaduje/podrabia link | Tokeny podpisane HMAC-SHA256 (`COURSE_ACCESS_SECRET`), porównania stałoczasowe |
| Kupujący forwarduje maila koledze | Link z maila żyje **72h** (zakup) / **30 min** (login) - stary mail nie otwiera nic |
| Token wisi w historii/screenach | Po kliknięciu token znika: `/api/kurs/dostep` ustawia **httpOnly cookie** (180 dni) i przekierowuje na czysty URL |
| Wyciąga dostęp przez formularz | Nowy link dostaje TYLKO skrzynka, która kupiła - weryfikacja w **API zamówień EasyCart** (źródło prawdy, zero własnej bazy) |
| Enumeracja klientów przez formularz | Odpowiedź zawsze generyczna ("jeśli ten mail kupił...") + rate limit (3/15min per email, 10/15min per IP) |
| Fałszywy webhook "kupiłem" | Podpis `X-Webhook-Signature` HMAC z surowego body, zły podpis = 401 |
| Retry webhooka = drugi mail | `Idempotency-Key` = order_uuid (Resend dedupe 24h) |
| Google/CDN indeksuje kurs | `robots: noindex` + `force-dynamic` na wszystkich stronach dostępowych |
| Path traversal na pobraniach | Whitelist nazw z manifestu + `path.basename` |
| Refund / abuse | Kill-switch: zmiana `COURSE_ACCESS_SECRET` unieważnia WSZYSTKIE linki i sesje |

Świadome kompromisy MVP: rate limit in-memory (per instancja serverless; twardy
sufit i tak daje dzienny limit Resend), sesja 180 dni bez rewokacji per-user
(rewokacja = rotacja sekretu, unieważnia wszystkich).

## Architektura

```
CtaButton (/drugi-mozg)                      href="#checkout" → NEXT_PUBLIC_EASYCART_CHECKOUT_URL
   ▼
Hostowany checkout EasyCart (297 zł, kod rabatowy przez ?promo=KOD)
   │  po płatności:
   │   1) redirect kupującego → /drugi-mozg/dziekuje
   │   2) webhook (server→server) → /api/easycart/webhook
   ▼
/api/easycart/webhook
   │  - weryfikuje podpis (HMAC z raw body, stałoczasowo)
   │  - tylko event `product_assigned` (single_product_bought = ack bez akcji)
   │  - mintuje magic link "welcome" (72h): /api/kurs/dostep?t=<token>
   │  - MAIL przez Resend (ścieżka krytyczna; padnie → 502 → EasyCart ponawia,
   │    Idempotency-Key = order_uuid, więc retry nie dubluje maila)
   │  - Beehiiv upsert (lista marketingowa, tag drugi-mozg-buyer) = best-effort
   ▼
Mail "Twój dostęp do kursu Drugi Mózg" → klik
   ▼
/api/kurs/dostep?t=...
   │  - weryfikuje token (welcome 72h / login 30min)
   │  - ustawia httpOnly cookie `dm_dostep` (180 dni, Secure, SameSite=Lax)
   │  - redirect 303 na CZYSTY /drugi-mozg/kurs (token znika z URL)
   ▼
/drugi-mozg/kurs + /drugi-mozg/kurs/[dzien] + /api/kurs/download
   - wszystkie czytają cookie sesji; brak/wygasła → NoAccess z formularzem
   ▼
Formularz "wyślij mi link" → POST /api/kurs/login
   - rate limit → weryfikacja zakupu w EasyCart Orders API → mail z linkiem 30 min
   - odpowiedź ZAWSZE generyczna (zero wyroczni "czy ten mail kupił")
```

## Pliki

| Plik | Rola |
|------|------|
| `app/lib/access.ts` | tokeny HMAC z TTL (welcome/login/session) + budowa magic URL |
| `app/lib/session.ts` | odczyt sesji z cookie w server components |
| `app/lib/mail.ts` | Resend: mail "welcome" + "login", idempotency, dev-fallback do konsoli |
| `app/lib/easycart.ts` | weryfikacja podpisu webhooka + `hasPurchasedCourse` (Orders API) |
| `app/lib/beehiiv.ts` | best-effort upsert kupującego na listę newslettera |
| `app/api/easycart/webhook/route.ts` | dostawa po zakupie |
| `app/api/kurs/dostep/route.ts` | konsumpcja magic linku → cookie → redirect |
| `app/api/kurs/login/route.ts` | "odzyskaj dostęp" (rate limit + weryfikacja zakupu) |
| `app/api/kurs/download/route.ts` | pobrania zza cookie (whitelist + anty-traversal) |
| `app/components/drugi-mozg/kurs/AccessForm.tsx` | formularz maila (klient) |
| `app/drugi-mozg/kurs/page.tsx` + `[dzien]/page.tsx` | gated strony kursu |
| `app/drugi-mozg/dziekuje/page.tsx` | strona po płatności |

## Zmienne środowiskowe (`.env.local` / Vercel)

```bash
EASYCART_API_KEY=            # token API EasyCart ("id|token") — Orders API, server-side
EASYCART_WEBHOOK_SECRET=     # signing key webhooka z panelu
COURSE_ACCESS_SECRET=        # openssl rand -hex 32 — podpisuje tokeny; rotacja = kill-switch
NEXT_PUBLIC_EASYCART_CHECKOUT_URL=  # link koszyka (publiczny)
NEXT_PUBLIC_SITE_URL=        # PROD: https://luki.zip (baza magic linków!)
RESEND_API_KEY=              # re_... z resend.com/api-keys
RESEND_FROM=Luki <kurs@luki.zip>
RESEND_REPLY_TO=             # gdzie lecą odpowiedzi (np. gmail)
BEEHIIV_API_KEY=             # lista marketingowa (best-effort)
BEEHIIV_PUBLICATION_ID=
```

## CHECKLIST przed wysyłką do 10 testerów (kolejność ma znaczenie)

### 1. Resend (raz, ~10 min + propagacja DNS)
1. Konto na resend.com → **Domains → Add domain → luki.zip**.
2. Wklej pokazane rekordy (DKIM TXT + Return-Path CNAME) do DNS
   (Squarespace - tam stoją nameservery luki.zip). NIE ruszaj istniejącego
   SPF Protona na root - rekordy Resend żyją na subdomenach, nie gryzą się.
3. Czekaj na "Verified" (zwykle < 1h), potem **API Keys → Create** →
   `RESEND_API_KEY` do `.env.local` i do Vercela.
4. Test: wyślij maila na siebie (formularzem "odzyskaj dostęp" po zakupie
   testowym albo `curl api.resend.com` - przykład w docs Resend).

### 2. EasyCart panel (raz, ~5 min)
1. **Store settings → API & Webhooks → Generate webhook signing key** →
   wartość 1:1 do `EASYCART_WEBHOOK_SECRET` (env musi być IDENTYCZNY,
   inaczej realne webhooki dostaną 401).
2. Tamże zarejestruj **webhook URL**: `https://luki.zip/api/easycart/webhook`
   (eventy: wystarczy `product_assigned`; nadmiarowe kod ackuje bez akcji).
3. **Kod rabatowy dla testerów**: Store → Discount Codes (albo Product →
   Checkout → Discount) → nowy kod, np. `PIONIER`:
   - typ: kwotowy albo %, wedle promo,
   - **limit użyć: 10** (po 10 sam gaśnie),
   - link dla testerów: `https://cart.easy.tools/checkout/49734101/drugi-mozg?promo=PIONIER`
     (kod sam się wpisze; pole kodu na checkoucie jest domyślnie ukryte - OK).

### 3. Vercel (raz)
1. Project → Settings → Environment Variables: wszystkie z sekcji env wyżej.
   `NEXT_PUBLIC_SITE_URL=https://luki.zip` (od tego zależą linki w mailach!).
2. `NEXT_PUBLIC_*` są build-time → po dodaniu env **redeploy**.
3. `next.config.ts`: redirecty blokujące `/drugi-mozg` są zakomentowane
   (strona live). Zostaw tak na launch.

### 4. Smoke test na prod (przed wysyłką linków testerom)
1. Kup przez link `?promo=PIONIER` (własna karta; potem możesz zwrócić w panelu).
2. Sprawdź: redirect na `/dziekuje` → mail w skrzynce (< 1 min) → klik →
   kurs się otwiera → pobranie paczki działa → wejście w tryb incognito
   pokazuje formularz (nie kurs) → formularz z twoim mailem wysyła świeży link.
3. `GET https://luki.zip/api/easycart/webhook` → `{"ok":true}` (healthcheck).

## Jak przetestować lokalnie (bez płacenia)

1. `pnpm dev`. Bez `RESEND_API_KEY` mail NIE wychodzi - link loguje się w konsoli
   (`[mail-dev] link: ...`). Pełny flow klikalny lokalnie.
2. Symulacja webhooka z poprawnym podpisem:
   ```bash
   SECRET=$(grep '^EASYCART_WEBHOOK_SECRET=' .env.local | cut -d= -f2-)
   BODY='{"event":"product_assigned","customer_email":"test@twojmail.pl","order_uuid":"test-1","product_name":"Drugi Mozg"}'
   SIG=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "$SECRET" | sed 's/^.* //')
   curl -i -X POST http://localhost:3000/api/easycart/webhook \
     -H "Content-Type: application/json" -H "X-Webhook-Signature: $SIG" -d "$BODY"
   ```
   Oczekiwane: `200 {"ok":true}`, w konsoli dev `[mail-dev] link: http://localhost:3000/api/kurs/dostep?t=...`
3. Otwórz zalogowany link → redirect na `/drugi-mozg/kurs` + cookie → kurs otwarty.
4. Incognito na `/drugi-mozg/kurs` → formularz "Tu trzeba się wpuścić".
5. Zły podpis → `401`. Zepsuty/wygasły token → redirect `?e=wygasly`.

## Edge cases

| Sytuacja | Zachowanie |
|----------|-----------|
| Nieudana płatność | brak `product_assigned` → nic nie dostarczamy |
| Zły/brak podpisu webhooka | `401`, zero przetwarzania |
| Duplikat webhooka | Idempotency-Key po order_uuid → jeden mail |
| `single_product_bought` | `200` ack bez akcji |
| Brak emaila w payloadzie | `200` + warning (retry nic nie da) |
| Resend padł | `502` → EasyCart ponawia |
| Beehiiv padł | log, dostawa i tak poszła (best-effort) |
| Link wygasł / nowe urządzenie | formularz → weryfikacja zakupu w Orders API → świeży link 30 min |
| EasyCart Orders API padło | formularz zwraca "spróbuj później" (503), zero fałszywych odmów |
| Zwrot/refund | EasyCart NIE wysyła webhooka refund → ręcznie w panelu; odcięcie dostępu = rotacja `COURSE_ACCESS_SECRET` (unieważnia wszystkich) |

## Ochrona plików wideo (na później, gdy wideo wejdzie)

Cookie chroni STRONY i PLIKI z `/api/kurs/download`. Wideo embedowane z
zewnątrz (`videoUrl` w frontmatter lekcji) chroń u źródła: Vimeo unlisted +
domain-lock na luki.zip albo Bunny Stream z token auth. Decyzja przy nagraniach.
