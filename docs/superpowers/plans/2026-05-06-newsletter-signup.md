# Newsletter Signup (Beehiiv) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Pivot funnel z fake "Brand Brain OS" lead magnetu na prosty newsletter signup wpięty w Beehiiv API v2, z double opt-in.

**Architecture:** Hero CTA → przepisana strona `/brain` (newsletter signup, ten sam URL) → custom `EmailCaptureForm` POSTuje do nowego Next.js Route Handlera `/api/subscribe`, który serwer-side wywołuje Beehiiv API v2 (klucz nigdy nie wycieka do klienta) → klient redirectuje na przepisany `/dzieki` ("Sprawdź skrzynkę i potwierdź"). Beehiiv wysyła confirm email (double opt-in włączony w panelu).

**Tech Stack:** Next.js 16 (app router), React 19, TypeScript, Tailwind 4, Beehiiv API v2. **Brak test framework w projekcie** — weryfikacja przez `curl` + manual browser smoke test (dodawanie vitest/jest poza scope tej iteracji).

**Spec:** [docs/superpowers/specs/2026-05-06-newsletter-signup-design.md](../specs/2026-05-06-newsletter-signup-design.md)

---

## File Structure

**New files:**
- `app/api/subscribe/route.ts` — Route Handler, POST do Beehiiv subscriptions endpoint
- `.env.example` — szablon zmiennych środowiskowych (do gita)

**Modified files:**
- `.gitignore` — dodaje `!.env.example` exception (bo `.env*` to ignoruje)
- `app/brain/page.tsx` — przepisana z Brand Brain OS na newsletter signup
- `app/brain/EmailCaptureForm.tsx` — submit przez API, error state, nowy CTA text
- `app/dzieki/page.tsx` — czysta thank-you page (bez Loom/zip/Whop)
- `app/components/home/Hero.tsx` — CTA copy update (1 linia)

**Manual user action (poza kodem):**
- Rotacja Beehiiv API key w panelu (klucz wyciekł do czatu)
- Włączenie double opt-in w Beehiiv (Settings → Email)
- Wpisanie env vars do `.env.local` (dev) i Vercel (Production + Preview)

---

## Task 1: Setup env vars + gitignore exception

**Files:**
- Modify: `.gitignore` (linia z `.env*`)
- Create: `.env.example`

- [ ] **Step 1: Sprawdź obecną linię w .gitignore**

Run: `grep -n "\.env" .gitignore`
Expected: pokazuje linię z `.env*` (lub podobną).

- [ ] **Step 2: Dodaj exception w .gitignore**

Edytuj `.gitignore` — pod linią `.env*` dodaj:

```
!.env.example
```

- [ ] **Step 3: Utwórz `.env.example`**

```bash
cat > .env.example << 'EOF'
# Beehiiv newsletter API
# Get API key: https://app.beehiiv.com/settings/integrations/api
BEEHIIV_API_KEY=

# Publication ID (z URL panelu lub Settings)
BEEHIIV_PUBLICATION_ID=
EOF
```

- [ ] **Step 4: Zweryfikuj że `.env.example` jest widziany przez gita**

Run: `git check-ignore -v .env.example`
Expected: BRAK output (exit code 1) → plik NIE jest ignorowany. Jeśli jest ignorowany — exception nie zadziałał, popraw `.gitignore`.

- [ ] **Step 5: Przypomnienie dla usera (NIE robi tego agent)**

User musi sam:
1. Wygenerować nowy klucz w Beehiiv → Settings → Integrations → API → "Create New API Key" (i revoke ten z czatu).
2. Stworzyć `.env.local` w roocie projektu z:
   ```
   BEEHIIV_API_KEY=<nowy klucz>
   BEEHIIV_PUBLICATION_ID=pub_8d249257-4b0c-4637-a5dd-5761cd7db6a9
   ```
3. Włączyć Double Opt-in: Beehiiv → Settings → Email → "Require email confirmation" = ON.

Agent: zatrzymaj się i potwierdź z userem że to zrobił, **zanim** przejdziesz do Task 7 (smoke test). Tasks 2-6 można robić bez czekania (są pure code).

- [ ] **Step 6: Commit**

```bash
git add .gitignore .env.example
git commit -m "chore: add .env.example for Beehiiv vars"
```

---

## Task 2: Stwórz `/api/subscribe` Route Handler

**Files:**
- Create: `app/api/subscribe/route.ts`

- [ ] **Step 1: Utwórz katalog**

Run: `mkdir -p app/api/subscribe`

- [ ] **Step 2: Napisz handler**

Stwórz `app/api/subscribe/route.ts`:

```typescript
import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: { email?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !pubId) {
    console.error("[subscribe] missing BEEHIIV env vars");
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  const beehiivRes = await fetch(
    `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: true,
        send_welcome_email: true,
        utm_source: "luki.zip",
        utm_medium: "website",
        utm_campaign: "brain_page",
      }),
    },
  );

  if (!beehiivRes.ok) {
    const text = await beehiivRes.text().catch(() => "");
    console.error(
      `[subscribe] beehiiv ${beehiivRes.status}: ${text.slice(0, 300)}`,
    );
    return NextResponse.json({ error: "beehiiv_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Weryfikacja kompilacji**

Run: `pnpm exec tsc --noEmit`
Expected: brak błędów dotyczących `app/api/subscribe/route.ts`.

(Jeśli `tsc` zgłosi inne, niezwiązane błędy w projekcie — odnotuj, ale nie blokują tego taska.)

- [ ] **Step 4: Commit**

```bash
git add app/api/subscribe/route.ts
git commit -m "feat: add /api/subscribe route for Beehiiv"
```

---

## Task 3: Przepisz `EmailCaptureForm` na real submit

**Files:**
- Modify: `app/brain/EmailCaptureForm.tsx` (cały plik — pełny rewrite)

- [ ] **Step 1: Przeczytaj obecny stan**

Run: `cat app/brain/EmailCaptureForm.tsx`
Sanity check — powinien mieć ~44 linie z `router.push("/dzieki")`.

- [ ] **Step 2: Zastąp całą zawartość**

Stwórz `app/brain/EmailCaptureForm.tsx`:

```typescript
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { trackCTA } from "@/app/lib/analytics";

export function EmailCaptureForm({
  ctaId = "brain_form_submit",
}: {
  ctaId?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!email || submitting) return;
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        setError("Coś nie zagrało. Spróbuj za chwilę.");
        setSubmitting(false);
        return;
      }

      trackCTA(ctaId, "/dzieki");
      router.push("/dzieki");
    } catch {
      setError("Brak połączenia. Sprawdź internet i spróbuj ponownie.");
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <form
        onSubmit={onSubmit}
        className="flex flex-col sm:flex-row gap-2 sm:gap-2"
      >
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="twój@email.com"
          className="flex-1 h-[52px] px-4 rounded-lg bg-white border border-[var(--border)] text-base text-[var(--text)] placeholder:text-[var(--text-secondary)] transition-colors hover:border-[var(--accent)]"
        />
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex h-[52px] items-center justify-center gap-2 rounded-lg bg-[var(--accent)] px-7 text-base font-semibold text-white hover:bg-[var(--accent-light)] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Wysyłam..." : "Zapisz się"}
          {!submitting && <ArrowRight size={16} strokeWidth={2.25} />}
        </button>
      </form>
      {error && (
        <p className="text-[14px] text-red-600" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Weryfikacja TypeScript**

Run: `pnpm exec tsc --noEmit`
Expected: brak nowych błędów w `EmailCaptureForm.tsx`.

- [ ] **Step 4: Commit**

```bash
git add app/brain/EmailCaptureForm.tsx
git commit -m "feat: wire EmailCaptureForm to /api/subscribe"
```

---

## Task 4: Przepisz stronę `/brain` na newsletter signup

**Files:**
- Modify: `app/brain/page.tsx` (pełny rewrite)

- [ ] **Step 1: Zastąp całą zawartość**

Stwórz `app/brain/page.tsx`:

```typescript
import type { Metadata } from "next";
import { Check } from "lucide-react";
import { EmailCaptureForm } from "./EmailCaptureForm";

const pageTitle = "Newsletter | luki.zip";
const pageDescription =
  "Poradniki o brand designie i launchach na maila. Bez spamu, jeden mail tygodniowo.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/brain" },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: "/brain",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const FAQ = [
  {
    q: "Co konkretnie dostanę?",
    a: "Jeden mail w tygodniu. Konkretny insight, case study albo szablon. Maks 5 minut czytania.",
  },
  {
    q: "Czy mogę się wypisać?",
    a: "Tak, jednym kliknięciem w stopce każdego maila.",
  },
];

const PERKS = [
  "Jeden mail tygodniowo",
  "Brand design i launchy",
  "Bez spamu i upselli",
  "Wypis jednym kliknięciem",
];

export default function BrainPage() {
  return (
    <>
      <section className="container-wide pt-16 sm:pt-24 pb-12 sm:pb-20">
        <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[var(--accent)]">
          Newsletter
        </div>
        <h1 className="t-h1 mt-5 max-w-[800px]">Poradniki na maila</h1>
        <p className="t-body-large mt-6 text-[var(--text-secondary)] max-w-[640px]">
          Co tydzień jeden konkretny insight z brand designu i launchów.
          Krótko, bez fluffu, bez spamu.
        </p>

        <div className="mt-10 max-w-[560px]">
          <EmailCaptureForm ctaId="cta_brain_hero_submit" />
          <p className="mt-3 t-small text-[var(--text-secondary)]">
            Po zapisie dostaniesz email z potwierdzeniem.
          </p>
        </div>

        <ul className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 max-w-[560px]">
          {PERKS.map((perk) => (
            <li
              key={perk}
              className="flex items-center gap-2.5 text-[15px] text-[var(--text)]"
            >
              <Check
                size={16}
                strokeWidth={2.5}
                className="shrink-0 text-[var(--accent)]"
              />
              <span>{perk}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-narrow py-16 sm:py-24">
        <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[var(--accent)]">
          FAQ
        </div>
        <h2 className="t-h2 mt-3">Najczęstsze pytania</h2>
        <div className="mt-8 bg-white rounded-xl border border-[var(--border)] divide-y divide-[var(--border)]">
          {FAQ.map((item) => (
            <details key={item.q} className="group p-6 cursor-pointer">
              <summary className="flex items-center justify-between gap-4">
                <span className="text-[16px] font-semibold text-[var(--text)]">
                  {item.q}
                </span>
                <span className="text-[var(--text-secondary)] transition-transform duration-150 group-open:rotate-45 text-2xl leading-none">
                  +
                </span>
              </summary>
              <p className="mt-4 t-body text-[var(--text-secondary)]">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
```

- [ ] **Step 2: Weryfikacja TypeScript**

Run: `pnpm exec tsc --noEmit`
Expected: brak błędów w `app/brain/page.tsx`. Nieużywane importy (`Brain`, `Layers`, `Rocket`, `Workflow`, `Link`) zostały usunięte.

- [ ] **Step 3: Lint**

Run: `pnpm lint`
Expected: brak nowych warningów dotyczących `app/brain/page.tsx`.

- [ ] **Step 4: Commit**

```bash
git add app/brain/page.tsx
git commit -m "feat: rewrite /brain as newsletter signup"
```

---

## Task 5: Uprość stronę `/dzieki` (czysta thank-you)

**Files:**
- Modify: `app/dzieki/page.tsx` (pełny rewrite)

**Notatka:** `app/dzieki/WhopBuyButton.tsx` zostawiamy w drzewie (nieużywany, ale komponent może wrócić jak Brain będzie gotowy). Ważne: jego import znika z `page.tsx`, więc `pnpm lint` może zgłosić ostrzeżenie o nieużywanym pliku — to OK.

- [ ] **Step 1: Zastąp całą zawartość**

Stwórz `app/dzieki/page.tsx`:

```typescript
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dzięki | luki.zip",
  robots: { index: false, follow: false },
};

export default function DziekiPage() {
  return (
    <main className="container-narrow py-16 sm:py-24">
      <div className="flex flex-col gap-6 max-w-[640px]">
        <h1 className="t-h1">Sprawdź skrzynkę</h1>
        <p className="t-body-large text-[var(--text-secondary)]">
          Wysłałem email z linkiem potwierdzającym. Kliknij go, żeby aktywować
          zapis na newsletter.
        </p>
        <p className="t-body text-[var(--text-secondary)]">
          Nie widzisz maila? Sprawdź spam. Domena nadawcy: beehiiv.com.
        </p>

        <div className="mt-6">
          <Link
            href="/artykuly"
            className="inline-flex items-center text-[15px] text-[var(--text-secondary)] hover:text-[var(--accent)] underline underline-offset-4 transition-colors"
          >
            ← Wróć do artykułów
          </Link>
        </div>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Weryfikacja TypeScript**

Run: `pnpm exec tsc --noEmit`
Expected: brak błędów. Nieużywane importy (`Check`, `Download`, `WhopBuyButton`, `TrackedLink`) zostały wycięte.

- [ ] **Step 3: Commit**

```bash
git add app/dzieki/page.tsx
git commit -m "feat: simplify /dzieki to clean thank-you page"
```

---

## Task 6: Update Hero CTA copy

**Files:**
- Modify: `app/components/home/Hero.tsx:29` (jedna linia)

- [ ] **Step 1: Zmień tekst CTA**

W `app/components/home/Hero.tsx`, w przycisku linkującym do `/brain`, zmień tekst z:

```typescript
          Pobierz system
```

na:

```typescript
          Zapisz się na newsletter
```

(Wszystko inne — `href`, `data-track-id`, klasy — zostaje bez zmian. Atrybuty `data-track-*` celowo nie są zmieniane, żeby nie zerwać ciągłości metryk analytics.)

- [ ] **Step 2: Weryfikacja**

Run: `grep "Zapisz się na newsletter" app/components/home/Hero.tsx`
Expected: 1 dopasowanie.

Run: `grep "Pobierz system" app/components/home/Hero.tsx`
Expected: 0 dopasowań.

- [ ] **Step 3: Commit**

```bash
git add app/components/home/Hero.tsx
git commit -m "feat: update hero CTA to newsletter copy"
```

---

## Task 7: End-to-end smoke test

**Wymagania wstępne:**
- User wykonał kroki z Task 1, Step 5 (rotacja klucza, `.env.local`, double opt-in włączony w Beehiiv).
- Jeśli któreś brakuje — zatrzymaj się i poproś o uzupełnienie.

- [ ] **Step 1: Odpal dev server**

Run: `pnpm dev`
Expected: server na `http://localhost:3000`, brak błędów kompilacji.

- [ ] **Step 2: Smoke test API curl-em (zły email)**

W drugim terminalu:

```bash
curl -i -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"not-an-email"}'
```

Expected: `HTTP/1.1 400` + body `{"error":"invalid_email"}`.

- [ ] **Step 3: Smoke test API curl-em (poprawny email)**

Użyj **realnego maila** do którego masz dostęp (Beehiiv wyśle confirm):

```bash
curl -i -X POST http://localhost:3000/api/subscribe \
  -H "Content-Type: application/json" \
  -d '{"email":"twoj-realny@email.com"}'
```

Expected: `HTTP/1.1 200` + body `{"ok":true}`.

Sprawdź skrzynkę — w ciągu 1-2 minut powinien przyjść mail od Beehiiv z linkiem potwierdzającym. Kliknij link → konto powinno aktywować się w Beehiiv panelu (Subscribers → status `active`).

- [ ] **Step 4: Smoke test w przeglądarce — happy path**

1. Otwórz `http://localhost:3000/`.
2. Kliknij "Zapisz się na newsletter" w Hero.
3. Sprawdź że trafiłeś na `/brain` z H1 "Poradniki na maila".
4. Wpisz **inny realny email** w form, kliknij "Zapisz się".
5. Powinieneś zostać przeniesiony na `/dzieki` z H1 "Sprawdź skrzynkę".
6. Sprawdź skrzynkę — confirm email powinien przyjść.

- [ ] **Step 5: Smoke test edge case — błąd**

Tymczasowo zepsuj klucz w `.env.local` (np. dodaj literę na końcu), zrestartuj dev server, spróbuj zapisać się przez form na `/brain`.

Expected: pod formem pojawia się czerwony tekst "Coś nie zagrało. Spróbuj za chwilę." Form wraca do stanu interaktywnego (button znów klikalny).

**Po teście — przywróć poprawny klucz w `.env.local` i zrestartuj dev server.**

- [ ] **Step 6: Sprawdź że subskrybenci są w Beehiiv**

Otwórz Beehiiv → Subscribers. Powinieneś widzieć 2 nowe wpisy z `utm_source=luki.zip`, `utm_campaign=brain_page`, status `pending` (przed potwierdzeniem) lub `active` (po).

- [ ] **Step 7: Zatrzymaj dev server**

`Ctrl+C` w terminalu z `pnpm dev`.

---

## Task 8: Update memory + final cleanup

**Files:**
- Modify: `/Users/lukaszglica/.claude/projects/-Users-lukaszglica-Local-code-luki-zip-hub/memory/project_luki_zip_funnel.md`

- [ ] **Step 1: Przeczytaj obecną pamięć**

Run: `cat /Users/lukaszglica/.claude/projects/-Users-lukaszglica-Local-code-luki-zip-hub/memory/project_luki_zip_funnel.md`

- [ ] **Step 2: Zaktualizuj treść**

Zastąp opis funnela (sekcja po frontmatter) tekstem odzwierciedlającym pivot. Kluczowe punkty:

- Aktualnie `/brain` = newsletter signup (Beehiiv), nie Brand Brain OS lead magnet.
- Brand Brain OS jest w pipeline ale nie zbudowany — newsletter to placeholder do czasu jego gotowości.
- `/dzieki` = czysta thank-you ("Sprawdź skrzynkę"). Whop upsell wycięty (wraca jak Brain będzie gotowy — `app/dzieki/WhopBuyButton.tsx` nadal w repo).
- Backend: Beehiiv API v2 przez `/api/subscribe`, double opt-in włączony.
- Pricing 7k/12k/20k Starter/Growth/Full — zostaje bez zmian.

Zachowaj frontmatter (`name`, `description`, `type: project`).

- [ ] **Step 3: Update opisu w MEMORY.md jeśli stary nie pasuje**

Run: `grep "luki_zip_funnel" /Users/lukaszglica/.claude/projects/-Users-lukaszglica-Local-code-luki-zip-hub/memory/MEMORY.md`

Jeśli jednolinijkowy hook wymienia "Brand Brain OS lead magnet" — zaktualizuj go do reflektowania newsletter pivota.

- [ ] **Step 4: Final build check**

Run: `pnpm build`
Expected: build przechodzi bez błędów. Jeśli są warningi o nieużywanych plikach (np. `WhopBuyButton.tsx`, `TrackedLink` jeśli już nigdzie nie używany) — to OK.

- [ ] **Step 5: Commit (jeśli build wprowadził zmiany w lockfile albo cache)**

Run: `git status`
Jeśli brak zmian — pomiń krok. Jeśli są — commit z `chore: post-build artifacts`.

---

## Self-Review Notatki

**Spec coverage check:**
- ✅ Repurpose `/brain` → Task 4
- ✅ Real submit do Beehiiv API v2 → Task 2
- ✅ Repurpose `/dzieki` → Task 5
- ✅ Route Handler proxy → Task 2
- ✅ Hero CTA update → Task 6
- ✅ Double opt-in → Task 1 Step 5 (manual setup w Beehiiv) + Task 2 (`send_welcome_email: true`)
- ✅ Wytnięcie Loom/zip/Whop z `/dzieki` → Task 5
- ✅ Wytnięcie BULLETS/FEATURES/Quote/Final CTA z `/brain` → Task 4
- ✅ Error handling — generic copy bez fikcyjnego email kontaktu → Task 3
- ✅ `.env.example` + gitignore exception → Task 1
- ✅ Memory update → Task 8

**Out of scope (zgodnie ze specem):**
- ❌ Inline newsletter widget pod artykułami — OUT
- ❌ Drugi lead magnet / upgrade do Brain — OUT
- ❌ A/B test copy — OUT
- ❌ Custom welcome email — OUT
- ❌ Tagi / segmentacja w Beehiiv — OUT
- ❌ Test framework (vitest/jest) — OUT (manual smoke testy zamiast)

**Type consistency check:**
- `EmailCaptureForm` props: `{ ctaId?: string }` w Task 3 — zgodne z użyciem `<EmailCaptureForm ctaId="cta_brain_hero_submit" />` w Task 4. ✅
- `/api/subscribe` request: `{ email: string }`, response `{ ok: true }` lub `{ error: string }` — spójne między Task 2 (definicja) i Task 3 (caller). ✅
- Env var nazwy `BEEHIIV_API_KEY` i `BEEHIIV_PUBLICATION_ID` — spójne między Task 1 (`.env.example`), Task 2 (`process.env.*`), Task 7 (smoke test). ✅
