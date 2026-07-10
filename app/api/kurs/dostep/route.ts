import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, TOKEN_TTL_SECONDS, mintToken, verifyToken } from "@/app/lib/access";
import { SITE_URL } from "@/app/lib/site";

// Konsumpcja magic linku — zawsze świeża, nigdy z cache.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * GET /api/kurs/dostep?t=<token>
 *
 * Jedyny punkt wejścia z maila. Ważny token (welcome 72h / login 30min) →
 * httpOnly cookie sesji (180 dni) → redirect na CZYSTY /drugi-mozg/kurs.
 * Token znika z paska adresu — nie wisi w historii, zakładkach ani screenach.
 * Zły/wygasły token → strona kursu z formularzem "wyślij mi świeży link".
 */
export async function GET(request: NextRequest) {
  const base = SITE_URL;
  const t = request.nextUrl.searchParams.get("t");

  const secret = process.env.COURSE_ACCESS_SECRET;
  const email =
    verifyToken(t, "welcome", secret) ?? verifyToken(t, "login", secret);

  if (!email) {
    return NextResponse.redirect(`${base}/drugi-mozg/kurs?e=wygasly`, 303);
  }

  const session = mintToken(email, "session", secret);
  if (!session) {
    console.error("[kurs-dostep] brak COURSE_ACCESS_SECRET — nie zbuduję sesji");
    return NextResponse.redirect(`${base}/drugi-mozg/kurs?e=blad`, 303);
  }

  const res = NextResponse.redirect(`${base}/drugi-mozg/kurs`, 303);
  res.cookies.set(SESSION_COOKIE, session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TOKEN_TTL_SECONDS.session,
  });
  return res;
}
