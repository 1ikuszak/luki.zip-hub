#!/usr/bin/env node
/**
 * sync-downloads.mjs - pliki kursu (pakiet startowy) z vaulta na strone.
 *
 * Zrodlo: setup-package/ w vaulcie (00-10 paste-prompty .md + hooks/ + skills/).
 * Cel:    content/kurs-downloads/ (POZA public/ - serwowane tylko przez bramkowany
 *         route /api/kurs/download?f=&k=<token>).
 *
 * Co robi:
 *  - paste-prompty *.md (top-level): kopiuje ze SCIAGNIETYM frontmatterem (paste-ready),
 *  - hooks/ + skills/: kopiuje VERBATIM (skille potrzebuja swojego frontmattera),
 *  - buduje ZIP calego pakietu (pakiet-startowy-drugi-mozg.zip) przez systemowy `zip`,
 *  - pisze _manifest.json (whitelist + labelki + rozmiary) - route i strona z niego czytaja.
 *
 * Reczny trigger: `pnpm sync:downloads`.
 */
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execSync } from "node:child_process";

const VAULT_SP = path.join(
  os.homedir(),
  "Local/knowledge/1-projects/drugi-mozg-os-course/setup-package",
);
const OUT_DIR = path.join(process.cwd(), "content/kurs-downloads");
const STAGE_DIR = path.join(OUT_DIR, ".stage");
const ZIP_NAME = "pakiet-startowy-drugi-mozg.zip";

/**
 * Paczki per lekcja (kropelkowo: Dzien N dostaje TYLKO swoje pliki).
 * `files` = paste-prompty top-level z setup-package (kopiowane bez frontmattera).
 * `dirs`  = podfoldery setup-package kopiowane VERBATIM (skille potrzebuja frontmattera).
 * Lekcja 1 = fundament + Obsidian wiring.
 * Lekcja 2 = 3 skille rdzenia (ingest / query / linter) + puls.
 */
// dirs: string (src=dest, VERBATIM) albo {src, dest, strip}. strip=true sciaga
// frontmatter z .md (czyste pliki: rules/samples). Skille ZAWSZE verbatim
// (skill.md potrzebuje frontmattera name/description do wykrycia przez Claude).
const LESSON_ZIPS = [
  {
    day: 1,
    name: "lekcja-1-fundament.zip",
    label: "Paczka Lekcji 1",
    files: ["01-fundament.md", "02-obsidian-wiring.md"],
    dirs: [{ src: "rules", dest: "rules", strip: true }],
  },
  {
    day: 2,
    name: "lekcja-2-skille-rdzenia.zip",
    label: "Paczka Lekcji 2",
    files: ["10-puls.md"],
    dirs: ["skills"],
  },
  {
    day: 3,
    name: "lekcja-3-skille.zip",
    label: "Paczka Lekcji 3",
    files: [],
    dirs: [
      { src: "lekcja-3/skills", dest: "skills" },
      // samples VERBATIM: frontmatter zostaje, bo plik laduje w vaulcie ucznia
      // (3-resources/) i bez frontmattera pierwszy lint po L3 zglasza bledy
      { src: "lekcja-3/samples", dest: "samples" },
    ],
  },
];

function stripFrontmatter(text) {
  if (text.startsWith("---")) {
    const end = text.indexOf("\n---", 3);
    if (end !== -1) return text.slice(end + 4).replace(/^\s*\n/, "");
  }
  return text;
}

function labelFor(fileName) {
  const base = fileName.replace(/\.md$/, "");
  const m = base.match(/^(\d+)-(.+)$/);
  if (m) {
    const words = m[2].replace(/-/g, " ");
    return `${m[1]} - ${words.charAt(0).toUpperCase()}${words.slice(1)}`;
  }
  return base;
}

function rmrf(p) {
  if (fs.existsSync(p)) fs.rmSync(p, { recursive: true, force: true });
}

/**
 * Kopiuje folder, sciagajac frontmatter vaulta z plikow .md (paste-ready dla
 * ucznia). Uzywane dla rules/ - w przeciwienstwie do skills/, ktore potrzebuja
 * wlasnego frontmattera i ida VERBATIM.
 */
/**
 * Kopiuje folder skilla: skill.md/SKILL.md VERBATIM (frontmatter name/description
 * potrzebny Claude do wykrycia), reszta .md ze sciagnietym frontmatterem
 * (referencje maja frontmatter tylko pod hook vaulta - uczen dostaje czysty plik).
 */
function copyDirSkill(srcDir, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  for (const e of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const s = path.join(srcDir, e.name);
    const o = path.join(outDir, e.name);
    if (e.isDirectory()) {
      copyDirSkill(s, o);
    } else if (e.name.endsWith(".md") && e.name.toLowerCase() !== "skill.md") {
      const cleaned = stripFrontmatter(fs.readFileSync(s, "utf8")).trim() + "\n";
      fs.writeFileSync(o, cleaned, "utf8");
    } else {
      fs.copyFileSync(s, o);
    }
  }
}

function copyDirStripped(srcDir, outDir) {
  fs.mkdirSync(outDir, { recursive: true });
  for (const e of fs.readdirSync(srcDir, { withFileTypes: true })) {
    const s = path.join(srcDir, e.name);
    const o = path.join(outDir, e.name);
    if (e.isDirectory()) {
      copyDirStripped(s, o);
    } else if (e.name.endsWith(".md")) {
      const cleaned = stripFrontmatter(fs.readFileSync(s, "utf8")).trim() + "\n";
      fs.writeFileSync(o, cleaned, "utf8");
    } else {
      fs.copyFileSync(s, o);
    }
  }
}

function main() {
  if (!fs.existsSync(VAULT_SP)) {
    console.error(`[sync-downloads] brak setup-package: ${VAULT_SP}`);
    process.exit(1);
  }
  rmrf(STAGE_DIR);
  fs.mkdirSync(STAGE_DIR, { recursive: true });

  const entries = fs.readdirSync(VAULT_SP, { withFileTypes: true });
  const files = [];

  // 1) paste-prompty top-level .md -> czyszczone (flat OUT + stage)
  for (const e of entries) {
    if (!e.isFile() || !e.name.endsWith(".md")) continue;
    const raw = fs.readFileSync(path.join(VAULT_SP, e.name), "utf8");
    const cleaned = stripFrontmatter(raw).trim() + "\n";
    fs.writeFileSync(path.join(OUT_DIR, e.name), cleaned, "utf8");
    fs.writeFileSync(path.join(STAGE_DIR, e.name), cleaned, "utf8");
    files.push({
      name: e.name,
      label: labelFor(e.name),
      size: Buffer.byteLength(cleaned),
    });
  }
  files.sort((a, b) => a.name.localeCompare(b.name));

  // 2) hooks/ + skills/ -> stage VERBATIM (do ZIP-a; skille zachowuja frontmatter),
  //    rules/ -> stage ze sciagnietym frontmatterem (czysty plik dla ucznia)
  for (const dir of ["hooks", "skills"]) {
    const src = path.join(VAULT_SP, dir);
    if (fs.existsSync(src)) {
      fs.cpSync(src, path.join(STAGE_DIR, dir), { recursive: true });
    }
  }
  const rulesSrc = path.join(VAULT_SP, "rules");
  if (fs.existsSync(rulesSrc)) {
    copyDirStripped(rulesSrc, path.join(STAGE_DIR, "rules"));
  }

  // 3) ZIP calego pakietu z stage
  const zipPath = path.join(OUT_DIR, ZIP_NAME);
  rmrf(zipPath);
  execSync(`zip -r -q "${zipPath}" .`, { cwd: STAGE_DIR });
  const zipSize = fs.statSync(zipPath).size;

  // 3b) paczki per lekcja (podzbior paste-promptow, wlasny stage per paczka)
  const lessons = [];
  for (const lz of LESSON_ZIPS) {
    const lzStage = path.join(OUT_DIR, `.stage-lekcja-${lz.day}`);
    rmrf(lzStage);
    fs.mkdirSync(lzStage, { recursive: true });
    for (const name of lz.files) {
      const src = path.join(VAULT_SP, name);
      if (!fs.existsSync(src)) {
        console.error(`[sync-downloads] paczka ${lz.name}: brak pliku ${name} w setup-package`);
        process.exit(1);
      }
      const cleaned = stripFrontmatter(fs.readFileSync(src, "utf8")).trim() + "\n";
      fs.writeFileSync(path.join(lzStage, name), cleaned, "utf8");
    }
    for (const entry of lz.dirs ?? []) {
      const { src: srcRel, dest, strip } =
        typeof entry === "string"
          ? { src: entry, dest: entry, strip: false }
          : entry;
      const src = path.join(VAULT_SP, srcRel);
      if (!fs.existsSync(src)) {
        console.error(`[sync-downloads] paczka ${lz.name}: brak folderu ${srcRel} w setup-package`);
        process.exit(1);
      }
      const out = path.join(lzStage, dest);
      if (strip) {
        copyDirStripped(src, out);
      } else if (dest === "skills") {
        // per-skill copy: skill.md verbatim, referencje bez frontmattera
        for (const sk of fs.readdirSync(src, { withFileTypes: true })) {
          if (sk.isDirectory()) {
            copyDirSkill(path.join(src, sk.name), path.join(out, sk.name));
          } else {
            fs.mkdirSync(out, { recursive: true });
            fs.copyFileSync(path.join(src, sk.name), path.join(out, sk.name));
          }
        }
      } else {
        fs.cpSync(src, out, { recursive: true });
      }
    }
    const lzPath = path.join(OUT_DIR, lz.name);
    rmrf(lzPath);
    execSync(`zip -r -q "${lzPath}" .`, { cwd: lzStage });
    rmrf(lzStage);
    lessons.push({
      day: lz.day,
      name: lz.name,
      label: lz.label,
      size: fs.statSync(lzPath).size,
    });
  }

  // 4) sprzataj stage
  rmrf(STAGE_DIR);

  // 5) manifest (whitelist dla route + dane dla strony)
  const manifest = {
    zip: { name: ZIP_NAME, label: "Cały pakiet startowy", size: zipSize },
    lessons,
    files,
    generatedNote: "sync-downloads.mjs - nie edytuj recznie",
  };
  fs.writeFileSync(
    path.join(OUT_DIR, "_manifest.json"),
    JSON.stringify(manifest, null, 2),
    "utf8",
  );

  console.log(`[sync-downloads] OK -> content/kurs-downloads/`);
  console.log(`  paste-prompty: ${files.length}`);
  console.log(`  ${ZIP_NAME}: ${(zipSize / 1024).toFixed(0)} KB`);
  for (const l of lessons) {
    console.log(`  ${l.name} (dzien ${l.day}): ${(l.size / 1024).toFixed(0)} KB`);
  }
}

main();
