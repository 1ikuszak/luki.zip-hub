import { NextResponse, type NextRequest } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { SESSION_COOKIE, verifyToken } from "@/app/lib/access";

// Strumień pliku zza bramki. node:fs => runtime Node, nigdy cache.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DIR = path.join(process.cwd(), "content/kurs-downloads");

/** Whitelist nazw z manifestu - tylko te pliki wolno pobrać. */
function allowedNames(): Set<string> {
  try {
    const m = JSON.parse(fs.readFileSync(path.join(DIR, "_manifest.json"), "utf8"));
    const names = new Set<string>();
    if (m.zip?.name) names.add(m.zip.name as string);
    for (const l of m.lessons ?? []) names.add(l.name as string);
    for (const f of m.files ?? []) names.add(f.name as string);
    return names;
  } catch {
    return new Set();
  }
}

export async function GET(request: NextRequest) {
  const f = request.nextUrl.searchParams.get("f");

  // 1) Bramka: ta sama httpOnly cookie sesji co strony kursu (przeglądarka
  //    dokleja ją sama — zero tokenów w URL-ach pobrań).
  const session = request.cookies.get(SESSION_COOKIE)?.value;
  const email = verifyToken(session, "session", process.env.COURSE_ACCESS_SECRET);
  if (!email) {
    return NextResponse.json({ error: "unauthorized" }, { status: 403 });
  }

  // 2) Tylko pliki z whitelisty + twardy anty-traversal (basename).
  if (!f || !allowedNames().has(f)) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  const safe = path.basename(f);
  const filePath = path.join(DIR, safe);
  if (path.dirname(filePath) !== DIR || !fs.existsSync(filePath)) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  // 3) Strumień jako attachment.
  const data = fs.readFileSync(filePath);
  const isZip = safe.endsWith(".zip");
  return new NextResponse(new Uint8Array(data), {
    status: 200,
    headers: {
      "Content-Type": isZip
        ? "application/zip"
        : "text/markdown; charset=utf-8",
      "Content-Disposition": `attachment; filename="${safe}"`,
      "Content-Length": String(data.length),
      "Cache-Control": "private, no-store",
    },
  });
}
