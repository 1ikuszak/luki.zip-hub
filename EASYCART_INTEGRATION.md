# EasyCart — bramka płatnicza kursu Drugi Mózg

Kompletny flow: **przycisk → hostowany checkout EasyCart → płatność → zweryfikowany webhook → dostawa dostępu mailem → gated strona kursu**.

## Stan obecny (skonfigurowane przez API EasyCart)

Produkt jest gotowy i opublikowany — ustawiony programowo przez API (`PATCH /products/{id}`):

| Pole | Wartość |
|------|---------|
| Nazwa | **Drugi Mózg** |
| Cena | **297 zł** jednorazowo (variant `one_time`, 29700 gr) |
| Slug / checkout | `https://cart.easy.tools/checkout/49734101/drugi-mozg` |
| Status | `published` |
| Redirect po zakupie | `https://luki.zip/drugi-mozg/dziekuje` (3 s, z parametrami zamówienia) |
| Refund | 14 dni |
| Opis | przepisany w głosie Luki (zero slopu) |
| Product UUID | `9060aebc-0007-408f-87e3-25a780021b14` |
| Store ID | `e0c0400c-6ccf-4fe2-b8fa-0e6e96c80632` (default, owner) |

`NEXT_PUBLIC_EASYCART_CHECKOUT_URL` w `.env.local` jest już ustawiony na ten link.
Przetestowane end-to-end na dev (przycisk, redirect, webhook z podpisem, gated kurs).

**API EasyCart (do referencji):** base `https://cart.easy.tools/api/v1`, auth `Authorization: Bearer <token>`
+ `Accept/Content-Type: application/json`. Token z `https://cart.easy.tools/creator/store-settings/developer`.
Orders są **read-only** (brak „create order" w API → dlatego hostowany checkout, nie budowanie zamówienia).
UWAGA: Cloudflare na cart.easy.tools banuje user-agenty typu `Python-urllib` — wołaj API curl-em.

## Czego API NIE zrobi (musisz w panelu, jednorazowo, przed LIVE)

1. **Signing key webhooka** — generujesz TYLKO w panelu (Store settings → API & Webhooks →
   Generate webhook signing key). API tego nie wystawia. Skopiuj i wklej do
   `EASYCART_WEBHOOK_SECRET`. Wartość w env musi być IDENTYCZNA jak w panelu, inaczej
   prawdziwe webhooki dostaną 401.
2. **Globalny URL webhooka** — zarejestruj `https://luki.zip/api/easycart/webhook` w panelu
   (Store settings → API & Webhooks). API ustawia tylko webhook per-produkt i tylko na
   publiczny URL (nie localhost).
3. **Beehiiv custom field + automatyzacja** — patrz sekcja Beehiiv niżej.

## Jak to działa (architektura)

```
CtaButton (/drugi-mozg)
   │  href="#checkout" → podmieniany na NEXT_PUBLIC_EASYCART_CHECKOUT_URL
   ▼
Hostowany one-page checkout EasyCart (297 zł)
   │  po płatności EasyCart:
   │   1) redirect kupującego → /drugi-mozg/dziekuje
   │   2) wysyła webhook (server→server) → /api/easycart/webhook
   ▼
/api/easycart/webhook
   │  - weryfikuje podpis X-Webhook-Signature (HMAC-SHA256 hex z raw body)
   │  - działa tylko na event `product_assigned` (single_product_bought ignoruje)
   │  - buduje podpisany link dostępowy: /drugi-mozg/kurs?k=<token>
   │  - upsert kupującego do Beehiiv (custom field drugi_mozg_access_url)
   │  - opcjonalnie enroll do automatyzacji Beehiiv → mail z linkiem
   ▼
Beehiiv automation → mail z linkiem dostępowym
   ▼
/drugi-mozg/kurs?k=<token>  (weryfikuje token HMAC server-side, noindex)
```

**Dlaczego hostowany checkout, nie tworzenie zamówienia przez API:** EasyCart to
one-page checkout zaprojektowany pod konwersję. Publiczne API do tworzenia
zamówień nie jest udokumentowane otwarcie (`developers.easy.tools` wymaga
logowania). Hostowany link = zero zgadywania, mniej ruchomych części, EASYCART_API_KEY
zostaje server-side i nie jest potrzebny do startu płatności = maksymalna niezawodność.

## Pliki

| Plik | Rola |
|------|------|
| `app/lib/easycart.ts` | weryfikacja podpisu webhooka + mint/verify tokenu dostępu (HMAC) |
| `app/lib/beehiiv.ts` | idempotentny upsert kupującego + enroll do automatyzacji |
| `app/api/easycart/webhook/route.ts` | endpoint webhooka (runtime nodejs) |
| `app/components/drugi-mozg/CtaButton.tsx` | podmienia `#checkout` na link EasyCart |
| `app/components/drugi-mozg/Offer.tsx` | microcopy zaufania pod przyciskiem |
| `app/drugi-mozg/dziekuje/page.tsx` | strona po płatności (noindex) |
| `app/drugi-mozg/kurs/page.tsx` | gated strona kursu (token HMAC, noindex) |
| `app/drugi-mozg/kurs/lessons.ts` | treść kursu — tu wklejasz realne linki wideo/PDF |

## Zmienne środowiskowe (`.env.local`, NIE commituj)

```bash
EASYCART_API_KEY=            # token API EasyCart (format "id|token") — server-side
EASYCART_WEBHOOK_SECRET=     # signing key z panelu EasyCart (do weryfikacji podpisu)
COURSE_ACCESS_SECRET=        # openssl rand -hex 32 — podpisuje linki dostępowe
NEXT_PUBLIC_EASYCART_CHECKOUT_URL=   # link koszyka z panelu (publiczny, nie sekret)
BEEHIIV_API_KEY=             # już masz
BEEHIIV_PUBLICATION_ID=      # już masz
BEEHIIV_DRUGI_MOZG_AUTOMATION_ID=    # opcjonalnie — automatyzacja wysyłająca mail
```

## Konfiguracja w panelach (jednorazowo)

### 1. EasyCart
- Produkt + cena + slug + redirect + opis: **ZROBIONE przez API** (patrz „Stan obecny").
- Zostaje TYLKO (panel, raz): **signing key webhooka** → `EASYCART_WEBHOOK_SECRET`
  oraz **rejestracja URL webhooka** `https://luki.zip/api/easycart/webhook`.
  - Eventy: wystarczy `product_assigned` (kod ignoruje resztę). Jeśli panel
    wysyła wszystko — w porządku, odrzucamy nieistotne ze statusem 200.

### 2. Beehiiv
1. Settings → **Custom Fields** → dodaj pole tekstowe o nazwie **`drugi_mozg_access_url`**.
   (Bez tego API zignoruje zapis linku.)
2. Zbuduj **automatyzację** wyzwalaną na tym custom fieldzie / tagu kampanii
   `drugi-mozg-buyer`, której mail zawiera link: użyj merge tagu pola
   `drugi_mozg_access_url`. Skopiuj jej **ID** → `BEEHIIV_DRUGI_MOZG_AUTOMATION_ID`.
   - Alternatywa bez automatyzacji: zostaw ID puste i wysyłaj mail ręcznie/segmentem —
     link i tak jest zapisany na subskrybencie.

### 3. Treść kursu
Wklej realne linki w `app/drugi-mozg/kurs/lessons.ts` (embedy wideo + PDF + bonus).

## Bezpieczeństwo linku dostępowego

- Link `/drugi-mozg/kurs?k=<token>` zawiera **podpis HMAC-SHA256** z `COURSE_ACCESS_SECRET`.
  Bez znajomości sekretu nie da się go podrobić — wpisanie cudzego maila w URL nie zadziała.
- Strona ma `robots: noindex, nofollow` + `force-dynamic` → nie trafia do Google ani cache CDN.
- To **bearer link**: kto ma ważny link, ten wchodzi (jak każdy link do pliku/Notion).
  Ochrona dotyczy STRONY. Realna ochrona PLIKÓW WIDEO = hosting z domain-lock/signed URL
  (Vimeo "unlisted" + privacy domeny / Bunny Stream token auth). Patrz sekcja "Ocena" niżej.

## Webhook — szczegóły bezpieczeństwa

- Podpis liczony z **surowego body** (`request.text()`), nie z przeparsowanego JSON.
- Porównanie **stałoczasowe** (`crypto.timingSafeEqual`). Zły podpis → `401`.
- **Idempotencja:** działamy tylko na `product_assigned`; upsert Beehiiv ma
  `reactivate_existing: true`, więc powtórka webhooka = ten sam efekt, nie duplikat.
  (Na serverless nie trzymamy bazy "przetworzonych zamówień" — side-effect jest idempotentny.)
- **Zwroty:** EasyCart **nie wysyła** webhooka refund/return/chargeback (14 eventów,
  żaden to zwrot). Zwrot 297 zł robisz ręcznie w panelu EasyCart; dostęp odetniesz
  zmieniając `COURSE_ACCESS_SECRET` (unieważnia wszystkie linki) lub kasując subskrybenta.

## Jak przetestować

EasyCart nie ma jawnego sandboxa w publicznych docs. Test robisz tak:

### A. Webhook lokalnie (bez płacenia)
1. `pnpm dev` (localhost:3000).
2. Wystaw tunel: `npx ngrok http 3000` → weź URL `https://xxxx.ngrok.app`.
3. Wyślij testowy webhook z poprawnym podpisem (podstaw swój `EASYCART_WEBHOOK_SECRET`):
   ```bash
   BODY='{"event":"product_assigned","customer_email":"test@twojmail.pl","order_uuid":"test-1","product_name":"Drugi Mozg"}'
   SIG=$(printf '%s' "$BODY" | openssl dgst -sha256 -hmac "$EASYCART_WEBHOOK_SECRET" | sed 's/^.* //')
   curl -i -X POST http://localhost:3000/api/easycart/webhook \
     -H "Content-Type: application/json" \
     -H "X-Webhook-Signature: $SIG" \
     -d "$BODY"
   ```
   Oczekiwane: `200 {"ok":true}`, log `[easycart-webhook] dostawa OK`, kupujący w Beehiiv.
4. Zły podpis → `401 {"error":"invalid_signature"}` (zmień jeden znak w `$SIG`).

### B. Link dostępowy
- Z logu/maila weź `/drugi-mozg/kurs?k=...` → otwiera kurs.
- Zepsuj token (zmień znak) → strona „Ten link nie otwiera kursu”.

### C. End-to-end (realna płatność)
1. Wpięte env na prod (Vercel) + webhook URL `https://luki.zip/api/easycart/webhook`.
2. Kup realnie (możesz potem zwrócić w panelu) albo testowym produktem za grosze.
3. Sprawdź: redirect na `/dziekuje` → mail z Beehiiv → link otwiera `/kurs`.

> **Pełna PŁATNOŚĆ na DEV (opcjonalnie):** redirect po zakupie (`redirect_url`)
> i webhook EasyCart muszą trafić na publiczny https, a nie na localhost. Żeby
> przeklikać prawdziwą płatność lokalnie: odpal `npx ngrok http 3000`, a potem
> ustaw przez API `redirect_url` i `webhook_url` produktu na URL z ngroka
> (`https://xxxx.ngrok.app/...`). Bez tego: przycisk i checkout działają na dev,
> ale redirect po opłaceniu leci na `https://luki.zip/...` (czyli zadziała dopiero
> po deployu strony). Webhook na dev testujesz symulacją z sekcji A.

## Edge cases (jak są obsłużone)

| Sytuacja | Zachowanie |
|----------|-----------|
| Nieudana płatność | EasyCart nie wysyła `product_assigned` → nic nie dostarczamy. |
| Zły/brak podpisu | `401`, zero przetwarzania. |
| Duplikat webhooka | `product_assigned` + idempotentny upsert = jeden efekt. |
| `single_product_bought` | `200` ack bez akcji (żeby nie dublować). |
| Brak emaila w payloadzie | `200` + log warning (retry nic nie da). |
| Beehiiv padł | `502` → EasyCart ponowi, upsert bezpieczny przy retry. |
| Zwrot/refund | Brak eventu w EasyCart → ręcznie w panelu (patrz wyżej). |

## Deploy

Sekrety dodaj w Vercel (Project → Settings → Environment Variables). `NEXT_PUBLIC_*`
muszą być ustawione **build-time**. Po dodaniu env zrób redeploy.
