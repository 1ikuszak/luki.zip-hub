import { NextResponse } from "next/server";
import {
  verifyWebhookSignature,
  buildCourseAccessUrl,
  EASYCART_PURCHASE_EVENT,
  type EasyCartWebhookPayload,
} from "@/app/lib/easycart";
import { upsertCourseBuyer, enrollInAutomation } from "@/app/lib/beehiiv";

// node:crypto + surowe body → wymusza runtime Node (nie Edge).
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  // 1) SUROWE body — podpis liczony jest z bajtów, nie z przeparsowanego JSON.
  const rawBody = await request.text();

  // 2) Weryfikacja podpisu. Bez tego każdy mógłby udać opłacone zamówienie.
  const secret = process.env.EASYCART_WEBHOOK_SECRET;
  const signature = request.headers.get("x-webhook-signature");
  if (!verifyWebhookSignature(rawBody, signature, secret)) {
    console.warn("[easycart-webhook] odrzucony: zła sygnatura");
    return NextResponse.json({ error: "invalid_signature" }, { status: 401 });
  }

  // 3) Parsowanie payloadu (po weryfikacji podpisu).
  let payload: EasyCartWebhookPayload;
  try {
    payload = JSON.parse(rawBody) as EasyCartWebhookPayload;
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const event = payload.event ?? "unknown";
  const orderRef = payload.order_uuid ?? payload.order_id ?? "brak";

  // 4) Działamy TYLKO na product_assigned. Przy udanej transakcji EasyCart
  //    wysyła też single_product_bought — ignorujemy go, żeby nie dublować
  //    dostawy (de-duplikacja po typie eventu).
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

  // 5) Link dostępowy (podpisany HMAC, bezstanowy).
  const accessUrl = buildCourseAccessUrl(email, {
    secret: process.env.COURSE_ACCESS_SECRET,
    siteUrl: process.env.NEXT_PUBLIC_SITE_URL,
  });
  if (!accessUrl) {
    console.error("[easycart-webhook] brak COURSE_ACCESS_SECRET — nie zbuduję linku");
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  // 6) Dostawa przez Beehiiv (idempotentny upsert po emailu).
  const apiKey = process.env.BEEHIIV_API_KEY;
  const pubId = process.env.BEEHIIV_PUBLICATION_ID;
  if (!apiKey || !pubId) {
    console.error("[easycart-webhook] brak env BEEHIIV — nie dostarczę dostępu");
    return NextResponse.json({ error: "server_misconfigured" }, { status: 500 });
  }

  const upsert = await upsertCourseBuyer({
    apiKey,
    publicationId: pubId,
    email,
    accessUrl,
  });
  if (!upsert.ok) {
    console.error(
      `[easycart-webhook] beehiiv upsert ${upsert.status}: ${upsert.detail}`,
    );
    // 502 → EasyCart ponowi webhook. Upsert jest idempotentny, retry bezpieczny.
    return NextResponse.json({ error: "delivery_failed" }, { status: 502 });
  }

  // 7) Opcjonalna automatyzacja, która wysyła maila z dostępem.
  const automationId = process.env.BEEHIIV_DRUGI_MOZG_AUTOMATION_ID;
  if (automationId) {
    const enroll = await enrollInAutomation({
      apiKey,
      publicationId: pubId,
      automationId,
      email,
    });
    if (!enroll.ok) {
      // Subskrybent ma już zapisany link (custom field) — automation to tylko
      // mechanizm wysyłki. Logujemy, ale nie wywracamy całego webhooka.
      console.error(
        `[easycart-webhook] beehiiv automation ${enroll.status}: ${enroll.detail}`,
      );
    }
  }

  console.log(
    `[easycart-webhook] dostawa OK: order=${orderRef} email=${email} product=${payload.product_name ?? payload.product_id ?? "?"}`,
  );
  return NextResponse.json({ ok: true });
}

// EasyCart może healthcheckować endpoint GET-em.
export async function GET() {
  return NextResponse.json({ ok: true, endpoint: "easycart-webhook" });
}
