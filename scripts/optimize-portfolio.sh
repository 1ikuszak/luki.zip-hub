#!/usr/bin/env bash
#
# Optymalizacja mediów portfolio: ~/Desktop/portfolio -> public/portfolio/{img,video,poster}
#
# Obrazy  PNG  -> WebP (długa krawędź max 1920px, q82)
# Wideo   .mov -> MP4 H.264 (bez audio, 30fps, faststart, pion cap 1080px / poziom cap 1280px)
# Poster  pierwsza klatka wideo -> WebP (q80) do <video poster>
#
# Wymaga: ffmpeg/ffprobe, magick (ImageMagick).
# Re-run jest bezpieczny (nadpisuje wyjścia). Dodajesz nową pracę: wrzut do SRC i odpal ponownie.

set -euo pipefail

SRC="${1:-$HOME/Desktop/portfolio}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/public/portfolio"

FFMPEG="${FFMPEG:-/Users/lukaszglica/audio-orchestrator-ffmpeg/bin/ffmpeg}"
command -v "$FFMPEG" >/dev/null 2>&1 || FFMPEG="ffmpeg"
command -v magick   >/dev/null 2>&1 || { echo "brak ImageMagick (magick)"; exit 1; }

mkdir -p "$OUT/img" "$OUT/video" "$OUT/poster"

# slug: małe litery, spacje/podkreślniki/kropki/nawiasy -> myślnik, bez rozszerzenia
slugify() {
  basename "$1" \
    | sed -E 's/\.[^.]+$//' \
    | tr '[:upper:]' '[:lower:]' \
    | tr ' _.' '---' \
    | sed -E 's/[()]//g; s/[^a-z0-9-]/-/g; s/-+/-/g; s/^-+//; s/-+$//'
}

echo "==> Obrazy (PNG -> WebP)"
shopt -s nullglob nocaseglob
for f in "$SRC"/*.png "$SRC"/*.jpg "$SRC"/*.jpeg; do
  [ -e "$f" ] || continue
  slug="$(slugify "$f")"
  dest="$OUT/img/$slug.webp"
  # 2880px długa krawędź + delikatne wyostrzenie po downscale + WebP q90 (ostre screeny/teksty)
  magick "$f" -resize '2880x2880>' -unsharp 0x0.75+0.75+0.008 -strip -quality 90 "$dest"
  printf '   %-40s %s\n' "$slug.webp" "$(du -h "$dest" | cut -f1)"
done

echo "==> Wideo (.mov -> MP4 + poster WebP)"
for f in "$SRC"/*.mov "$SRC"/*.mp4; do
  [ -e "$f" ] || continue
  slug="$(slugify "$f")"

  # orientacja: pion -> cap 1080 szer., poziom -> cap 1280 szer.
  read -r w h < <("${FFMPEG%ffmpeg}ffprobe" -v error -select_streams v:0 \
      -show_entries stream=width,height -of csv=p=0:s=' ' "$f" 2>/dev/null || echo "0 0")
  if [ "${h:-0}" -gt "${w:-0}" ]; then cap=1080; else cap=1280; fi

  # per-plik override: usuń czarny pasek u góry (nagrania ekranu z paskiem menu).
  # crop=iw:ih-N:0:N  -> ucina N px od góry, niezależnie od rozdzielczości.
  pre=""
  case "$slug" in
    screen-recording-2024-12-08-at-09-34-26|\
    screen-recording-2024-12-08-at-11-31-15|\
    screen-recording-2024-12-08-at-14-12-23)
      pre="crop=iw:ih-76:0:76," ;;
  esac

  # klipy z YouTube (yt-*): ucinamy do 17 s (same intra)
  tlim=""
  case "$slug" in yt-*) tlim="-t 17" ;; esac

  vdest="$OUT/video/$slug.mp4"
  "$FFMPEG" -loglevel error -y $tlim -i "$f" \
    -vf "${pre}scale='min($cap,iw)':-2,fps=30" \
    -c:v libx264 -profile:v high -crf 30 -pix_fmt yuv420p -movflags +faststart -an \
    "$vdest"

  pdest="$OUT/poster/$slug.webp"
  "$FFMPEG" -loglevel error -y -ss 0 -i "$f" -frames:v 1 \
    -vf "${pre}scale='min($cap,iw)':-2" "/tmp/portfolio-poster.png"
  magick "/tmp/portfolio-poster.png" -strip -quality 80 "$pdest"

  printf '   %-40s %s  (poster %s)\n' "$slug.mp4" \
    "$(du -h "$vdest" | cut -f1)" "$(du -h "$pdest" | cut -f1)"
done

echo "==> Gotowe. Wymiary wygenerowanych plików:"
for d in "$OUT/img" "$OUT/video" "$OUT/poster"; do
  for f in "$d"/*; do
    [ -e "$f" ] || continue
    printf '   %s  %s\n' "$(magick identify -format '%wx%h' "$f"[0] 2>/dev/null || echo '?')" "${f#$ROOT/public}"
  done
done
