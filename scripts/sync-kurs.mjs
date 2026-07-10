#!/usr/bin/env node
/**
 * sync-kurs.mjs - pipeline tresci kursu: vault -> content/kurs/.
 *
 * Czyta lekcje z vaulta (1-projects/drugi-mozg-os-course/lekcja-*.md), sciaga
 * vault-izmy (H1, "Part of [[_MOC]]", "## See Also", bannery "> 📌", wikilinki),
 * mapuje blok frontmattera `kurs:` na schemat huba i zapisuje web-ready markdown
 * do content/kurs/dzien-N.md. Reczny trigger: `pnpm sync:kurs`.
 *
 * Zasada: klon wzorca ship_to_hub (article-forge) + posts.ts. Zero live-infry,
 * zero bazy. Widzisz diff przed commitem.
 *
 * Uzycie:
 *   pnpm sync:kurs            # sync wszystkich lekcji
 *   pnpm sync:kurs --dry      # pokaz co by zrobil, nie zapisuj
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import matter from "gray-matter";

const VAULT_DIR = path.join(
  os.homedir(),
  "Local/knowledge/1-projects/drugi-mozg-os-course",
);
const OUT_DIR = path.join(process.cwd(), "content/kurs");
const DRY = process.argv.includes("--dry");

/* ── Czyszczenie body z vault-izmow ─────────────────────────────── */
function stripHtmlComments(text) {
  return text.replace(/<!--[\s\S]*?-->/g, "");
}

function wikilinksToText(text) {
  // [[cel|wyswietlane]] -> wyswietlane ; [[cel]] -> cel
  return text.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g, (_, target, disp) =>
    (disp || target).trim(),
  );
}

function cleanBody(raw) {
  let text = stripHtmlComments(raw);
  const lines = text.split("\n");
  const out = [];
  let h1Dropped = false;

  for (const line of lines) {
    // uciac wszystko od "## See Also" do konca
    if (/^##\s+See Also/i.test(line.trim())) break;
    // pierwszy H1 (hub renderuje tytul z frontmattera)
    if (!h1Dropped && /^#\s+/.test(line)) {
      h1Dropped = true;
      continue;
    }
    // linia "Part of [[...]]."
    if (/^Part of \[\[/.test(line.trim())) continue;
    // bannery rewizji "> 📌"
    if (/^>\s*📌/.test(line.trim())) continue;
    // markery produkcyjne (screeny do zrobienia, notatki dla Lukiego,
    // placeholdery nagran/komend zajmujace CALA linie) - kursant ich nie widzi.
    // Inline placeholdery w srodku zdania celowo ZOSTAJA (musza byc wypelnione
    // w vaulcie, nie ukryte) - lapie je pre-flight nizej.
    if (/^>\s*(📷|✍️)/.test(line.trim())) continue;
    if (/^\[PLACEHOLDER:[^\]]*\]$/.test(line.trim())) continue;
    out.push(line);
  }

  let body = out.join("\n");
  body = wikilinksToText(body);
  // SHIP layer: em-dash/en-dash separator -> " - " (writing-craft, luki.zip = ship).
  // Vault magazyn moze miec em-dashe; hub nie. Normalizuj przy syncu.
  body = body.replace(/\s*—\s*/g, " - ").replace(/\s+–\s+/g, " - ");
  // sciac wiodace puste linie i thematic-breaki (---) z gory
  body = body.replace(/^(\s*(---+\s*)?\n)+/, "");
  // 3+ pustych linii -> 2
  body = body.replace(/\n{3,}/g, "\n\n");
  return body.trim() + "\n";
}

/* ── Mapowanie frontmattera vault -> hub ─────────────────────────── */
function buildHubFrontmatter(kurs, fallbackTitle) {
  const day = Number(kurs.day);
  const fm = {
    slug: `dzien-${day}`,
    day,
    title: kurs.title || fallbackTitle || `Dzień ${day}`,
    description: kurs.description || "",
    videoUrl: kurs.videoUrl || "",
    pdfUrl: kurs.pdfUrl || "",
    published: kurs.published === true,
    order: day,
  };
  if (Array.isArray(kurs.files) && kurs.files.length) fm.files = kurs.files;
  return fm;
}

function firstH1(body) {
  const m = body.match(/^#\s+(.+)$/m);
  return m ? m[1].replace(/^Lekcja\s+\d+\s*[-:]\s*/i, "").trim() : "";
}

/* ── Main ────────────────────────────────────────────────────────── */
function main() {
  if (!fs.existsSync(VAULT_DIR)) {
    console.error(`[sync-kurs] brak folderu vaulta: ${VAULT_DIR}`);
    process.exit(1);
  }
  const files = fs
    .readdirSync(VAULT_DIR)
    .filter((f) => /^lekcja-.*\.md$/.test(f))
    .sort();

  if (!files.length) {
    console.error("[sync-kurs] brak plikow lekcja-*.md w vaulcie");
    process.exit(1);
  }

  if (!DRY) fs.mkdirSync(OUT_DIR, { recursive: true });

  const report = [];
  for (const file of files) {
    const raw = fs.readFileSync(path.join(VAULT_DIR, file), "utf8");
    const { data, content } = matter(raw);
    const kurs = data.kurs;
    if (!kurs || kurs.day == null) {
      report.push(`  SKIP ${file} (brak bloku kurs: / day)`);
      continue;
    }
    const fm = buildHubFrontmatter(kurs, firstH1(content));
    const body = cleanBody(content);
    // pre-flight: inline placeholder przezyl czyszczenie = kursant go zobaczy
    if (body.includes("[PLACEHOLDER")) {
      report.push(
        `  WARN ${file}: inline [PLACEHOLDER] w tresci - kursant go ZOBACZY, wypelnij w vaulcie`,
      );
    }
    const outName = `${fm.slug}.md`;
    const outPath = path.join(OUT_DIR, outName);
    const full = matter.stringify(body, fm);

    if (DRY) {
      report.push(
        `  DRY  ${file} -> content/kurs/${outName} (day ${fm.day}, published ${fm.published}, ${body.length} znakow)`,
      );
    } else {
      fs.writeFileSync(outPath, full, "utf8");
      report.push(
        `  OK   ${file} -> content/kurs/${outName} (day ${fm.day}, published ${fm.published}, ${body.length} znakow)`,
      );
    }
  }

  console.log(`[sync-kurs]${DRY ? " (dry-run)" : ""} ${files.length} lekcji:`);
  console.log(report.join("\n"));
}

main();
