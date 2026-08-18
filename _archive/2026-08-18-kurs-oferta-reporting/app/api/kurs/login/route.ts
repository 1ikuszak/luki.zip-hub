import { NextResponse, type NextRequest } from "next/server";
import { buildMagicUrl } from "@/app/lib/access";
import { hasPurchasedCourse } from "@/app/lib/easycart";
import { sendAccessEmail } from "@/app/lib/mail";
import { SITE_URL } from "@/app/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * POST /api/kurs/login  { email }
 *
 * Formularz "odzyskaj dostęp": weryfikujemy zakup w API zamówień EasyCart
 * (źródło prawdy, zero własnej bazy) i wysyłamy świeży 30-minutowy magic link.
 *
 * Bezpieczeństwo:
 *  - odpowiedź ZAWSZE generyczna (nie zdradzamy, czy email kupił — brak
 *    wyroczni do enumeracji klientów),
 *  - rate limit per email+IP (in-memory; na serverless per-instancja — to
 *    świadomy kompromis, twardy sufit i tak daje limit dzienny Resend),
 *  - link wydaje wyłącznie skrzynka kupującego, nie przeglądarka.
 */

const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_EMAIL = 3;
const MAX_PER_IP = 10;

const hits = new Map<string, number[]>();

function allow(key: string, max: number, now: number): boolean {
  const windowStart = now - WINDOW_MS;
  const recent = (hits.get(key) ?? []).filter((t) => t > windowStart);
  if (recent.length >= max) {
    hits.set(key, recent);
    return false;
  }
  recent.push(now);
  hits.set(key, recent);
  // Sprzątanie: nie trzymaj mapy w nieskończoność (serverless i tak recykluje).
  if (hits.size > 5000) hits.clear();
  return true;
}

export async function POST(request: NextRequest) {
  let email = "";
  try {
    const body = (await request.json()) as { email?: string };
    email = (body.email ?? "").trim().toLowerCase();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }
  if (!EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "brak-ip";
  const now = Date.now();
  if (!allow(`e:${email}`, MAX_PER_EMAIL, now) || !allow(`i:${ip}`, MAX_PER_IP, now)) {
    return NextResponse.json({ error: "too_many_requests" }, { status: 429 });
  }

  const purchased = await hasPurchasedCourse(email);
  if (purchased === "unavailable") {
    // Awaria po naszej stronie — jedyny przypadek, gdy prosimy spróbować później.
    return NextResponse.json({ error: "try_later" }, { status: 503 });
  }

  if (purchased === true) {
    const url = buildMagicUrl(email, "login", {
      secret: process.env.COURSE_ACCESS_SECRET,
      siteUrl: SITE_URL,
    });
    if (!url) {
      console.error("[kurs-login] brak COURSE_ACCESS_SECRET");
      return NextResponse.json({ error: "try_later" }, { status: 503 });
    }
    const sent = await sendAccessEmail({ to: email, url, kind: "login" });
    if (!sent.ok) {
      console.error(`[kurs-login] mail padł (${sent.status}): ${sent.detail}`);
      return NextResponse.json({ error: "try_later" }, { status: 503 });
    }
    console.log(`[kurs-login] link logowania wysłany: ${email}`);
  } else {
    // Celowo NIE wysyłamy i NIE mówimy dlaczego — odpowiedź identyczna jak
    // przy sukcesie. Log zostaje po naszej stronie.
    console.log(`[kurs-login] brak zakupu dla: ${email} (odpowiedź generyczna)`);
  }

  return NextResponse.json({ ok: true });
}
