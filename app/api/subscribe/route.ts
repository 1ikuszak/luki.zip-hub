import { NextResponse } from "next/server";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SLUG_REGEX = /^[a-z0-9-]{1,80}$/;
const ALLOWED_MEDIUMS = ["article", "homepage", "direct", "social"] as const;
const ALLOWED_REFERRER_HOSTS = ["luki.zip", "www.luki.zip", "localhost"];

type Medium = (typeof ALLOWED_MEDIUMS)[number];

type SubscribeBody = {
  email?: string;
  article_slug?: string;
  medium?: string;
  referring_site?: string;
};

function sanitizeMedium(value: string | undefined): Medium {
  return ALLOWED_MEDIUMS.includes(value as Medium) ? (value as Medium) : "direct";
}

function sanitizeSlug(value: string | undefined): string | null {
  if (!value) return null;
  return SLUG_REGEX.test(value) ? value : null;
}

function sanitizeReferringSite(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    const ok = ALLOWED_REFERRER_HOSTS.some(
      (allowed) => host === allowed || host.endsWith(`.${allowed}`),
    );
    if (!ok) return null;
    return url.toString();
  } catch {
    return null;
  }
}

export async function POST(request: Request) {
  let body: SubscribeBody;
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

  const articleSlug = sanitizeSlug(body.article_slug);
  const medium = sanitizeMedium(body.medium);
  const referringSite = sanitizeReferringSite(body.referring_site);

  const beehiivPayload: Record<string, unknown> = {
    email,
    reactivate_existing: true,
    send_welcome_email: true,
    utm_source: "luki_zip",
    utm_medium: medium,
    utm_campaign: articleSlug ?? medium,
  };
  if (referringSite) beehiivPayload.referring_site = referringSite;

  const beehiivRes = await fetch(
    `https://api.beehiiv.com/v2/publications/${pubId}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(beehiivPayload),
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
