#!/usr/bin/env node
// Generuje app/lib/portfolio.ts ze zoptymalizowanych plików w public/portfolio.
// Czyta wymiary: obrazy -> `magick identify`, wideo -> `ffprobe`.
// Kolejność: deterministyczny shuffle (hash nazwy) — ładnie miesza obrazy i wideo,
// a jest stabilny: nie przeskakuje przy każdym kolejnym dodaniu/usunięciu pliku.
// Użycie: node scripts/gen-portfolio-manifest.mjs  (po optimize-portfolio.sh)

import { execFileSync } from "node:child_process";
import { readdirSync, writeFileSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUB = path.join(ROOT, "public", "portfolio");
const FFPROBE = process.env.FFPROBE ||
  "/Users/lukaszglica/audio-orchestrator-ffmpeg/bin/ffprobe";

const imgDim = (f) => {
  const out = execFileSync("magick", ["identify", "-format", "%w %h", `${f}[0]`])
    .toString().trim().split(/\s+/).map(Number);
  return { width: out[0], height: out[1] };
};
const vidDim = (f) => {
  const out = execFileSync(FFPROBE, [
    "-v", "error", "-select_streams", "v:0",
    "-show_entries", "stream=width,height", "-of", "csv=p=0:s=x", f,
  ]).toString().trim().split("x").map(Number);
  return { width: out[0], height: out[1] };
};

const list = (sub) =>
  existsSync(path.join(PUB, sub))
    ? readdirSync(path.join(PUB, sub)).filter((f) => !f.startsWith(".")).sort()
    : [];

const images = list("img").map((f) => ({
  kind: "image",
  src: `/portfolio/img/${f}`,
  ...imgDim(path.join(PUB, "img", f)),
  alt: "Projekt",
}));

const videos = list("video").map((f) => {
  const base = f.replace(/\.mp4$/, "");
  return {
    kind: "video",
    src: `/portfolio/video/${f}`,
    poster: `/portfolio/poster/${base}.webp`,
    ...vidDim(path.join(PUB, "video", f)),
    alt: "Projekt (wideo)",
  };
});

// Deterministyczny shuffle: sortuj po hashu src. Miesza obrazy i wideo,
// a kolejność jest stabilna między re-runami (zmienia się tylko gdy zmienią się pliki).
const hash = (s) => createHash("md5").update(s).digest("hex");
const items = [...images, ...videos].sort((a, b) => hash(a.src).localeCompare(hash(b.src)));

const body = items
  .map((it) => {
    const lines = [
      `    kind: "${it.kind}",`,
      `    src: "${it.src}",`,
      it.poster ? `    poster: "${it.poster}",` : null,
      `    width: ${it.width},`,
      `    height: ${it.height},`,
      `    alt: "${it.alt}",`,
    ].filter(Boolean);
    return `  {\n${lines.join("\n")}\n  },`;
  })
  .join("\n");

const file = `// Manifest portfolio — GENEROWANY automatycznie przez scripts/gen-portfolio-manifest.mjs.
// Nie edytuj ręcznie. Dodajesz pracę: wrzut do ~/Desktop/portfolio ->
// \`bash scripts/optimize-portfolio.sh\` -> \`node scripts/gen-portfolio-manifest.mjs\`.

export type PortfolioItem = {
  kind: "image" | "video";
  src: string;
  poster?: string; // tylko video
  width: number;
  height: number;
  alt: string;
};

export const portfolioItems: PortfolioItem[] = [
${body}
];
`;

writeFileSync(path.join(ROOT, "app", "lib", "portfolio.ts"), file);
console.log(`Zapisano app/lib/portfolio.ts — ${items.length} pozycji (${images.length} obrazów, ${videos.length} wideo).`);
