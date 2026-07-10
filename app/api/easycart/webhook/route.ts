import { NextResponse } from "next/server";
import {
  verifyWebhookSignature,
  EASYCART_PURCHASE_EVENT,
  type EasyCartWebhookPayload,
} from "@/app/lib/easycart";
import { buildMagicUrl } from "@/app/lib/access";
import { sendAccessEmail } from "@/app/lib/mail";
import { upsertCourseBuyer } from "@/app/lib/beehiiv";

// node:crypto + surowe body → wymusza runtime Node (nie Edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Dostawa dostępu po zakupie:
 *  1) weryfikacja podpisu (HMAC z surowego body, stałoczasowo)
 *  2) tylko event `product_assigned` (single_product_bought = ack bez akcji)
 *  3) magic link "welcome" (72h) → mail przez Resend (ŚCIEŻKA KRYTYCZNA;
 *     Idempotency-Key = order_uuid, więc retry EasyCart nie dubluje maila)
 *  4) Beehiiv upsert = best-effort (lista marketingowa, nie kanał dostawy)
 *
 * Trwały dostęp NIE siedzi w mailu — mail niesie krótkotrwały link, a po
 * kliknięciu /api/kurs/dostep ustawia httpOnly cookie na 180 dni.
 */
export async function POST(request: Request) {
  // 1) SUROWE body — podpis liczony jest z bajtów, nie z przeparsowanego JSON.
  const rawBody = await request.text();

  const secret = process.env.EASYCART_WEBHOOK_SECRET;
  const signature = request.headers.get("x-webhook-signature");
  if (!verifyWebhookSignature(rawBody, signature, secret)) {
    console.warn("[easycart-webhook] odrzucony: zła sygnatura");
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  // 2) Parsowanie payloadu (po weryfikacji podpisu).
  let payload: EasyCartWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as EasyCartWebhookPayload;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const event = payload.event ?? "unknown";
  const orderRef = String(payload.order_uuid ?? payload.order_id ?? "brak");

  if (event !== EASYCART_PURCHASE_EVENT) {
    console.log(`[easycart-webhook] ack bez akcji: event=${event} order=${orderRef}`);
    return NextResponse.json({ ok: true, ignored: event });
  }

  const email = payload.customer_email?.trim().toLowerCase();
  if (!email || !EMAIL_REGEX.test(email)) {
    console.error(
      `[easycart-webhook] product_assigned bez poprawnego emaila, order=${orderRef}`,
    );
    // 200 = potwierdzamy odbiór; ponawianie nic nie da (brak emaila w payloadzie).
    return NextResponse.json({ ok: true, warning: "missing_email" });
  }

  // 3) Magic link "welcome" (72h) + mail. To jest dostawa produktu — jak
  //    padnie, zwracamy 502 i EasyCart ponawia (mail idempotentny po orderze).
  const magicUrl = buildMagicUrl(email, "welcome", {
    secret: process.env.COURSE_ACCESS_SECRET,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  });
  if (!magicUrl) {
    console.error("[easycart-webhook] brak COURSE_ACCESS_SECRET — nie zbuduję linku");
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  const sent = await sendAccessEmail({
    to: email,
    url: magicUrl,
    kind: "welcome",
    idempotencyKey: orderRef !== "brak" ? orderRef : undefined,
  });
  if (!sent.ok) {
    console.error(
      `[easycart-webhook] mail padł (${sent.status}): ${sent.detail} order=${orderRef}`,
    );
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  // 4) Beehiiv: kupujący na listę (tag kampanii). Best-effort — dostawa już
  //    poszła mailem, więc padnięty Beehiiv nie wywraca webhooka.
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (apiKey && pubId) {
    const upsert = await upsertCourseBuyer({
      apiKey,
      publicationId: pubId,
      email,
    });
    if (!upsert.ok) {
      console.error(
        `[easycart-webhook] beehiiv upsert ${upsert.status}: ${upsert.detail} (best-effort, lecimy dalej)`,
      );
    }
  } else {
    console.warn("[easycart-webhook] brak env BEEHIIV — pomijam upsert listy");
  }

  console.log(
    `[easycart-webhook] dostawa OK: order=${orderRef} email=${email} product=${payload.product_name ?? payload.product_id ?? "?"}${sent.devLogged ? " (dev: mail tylko w logu)" : ""}`,
  );
  return NextResponse.json({ ok: true });
}

// EasyCart może healthcheckować endpoint GET-em.
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "easycart-webhook" });
}
