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
