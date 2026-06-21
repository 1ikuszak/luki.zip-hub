/**
 * Full-bleed pasek realnych wideo (reele + poziome), seamless marquee.
 * Mix pionowych (9:16) i poziomych (16:9). Bez edge-fade (pełna szerokość).
 * Wideo autoplay/muted/loop/playsInline, poster = pierwszy paint.
 */
type Clip = { src: string; poster: string; kind: "v" | "h" };

const CLIPS: Clip[] = [
  { src: "/portfolio/video/skolim-jbb-full-1.mp4", poster: "/portfolio/poster/skolim-jbb-full-1.webp", kind: "v" },
  { src: "/portfolio/video/filip-ai-coach-2-90.mp4", poster: "/portfolio/poster/filip-ai-coach-2-90.webp", kind: "h" },
  { src: "/portfolio/video/gta-angle.mp4", poster: "/portfolio/poster/gta-angle.webp", kind: "v" },
  { src: "/portfolio/video/yt-1yktxhy2m2y-ai-zmieni-wszystko-buduj-biznes-z-ai-w.mp4", poster: "/portfolio/poster/yt-1yktxhy2m2y-ai-zmieni-wszystko-buduj-biznes-z-ai-w.webp", kind: "h" },
  { src: "/portfolio/video/wojtek-elevator-talks-reel.mp4", poster: "/portfolio/poster/wojtek-elevator-talks-reel.webp", kind: "v" },
  { src: "/portfolio/video/petite-pants-test-reel.mp4", poster: "/portfolio/poster/petite-pants-test-reel.webp", kind: "v" },
];

export function VideoStrip() {
  const loop = [...CLIPS, ...CLIPS];

  return (
    <section className="relative w-full overflow-hidden pb-5 sm:pb-7">
      <div className="marquee-track flex w-max gap-3">
        {loop.map((c, i) => (
          <div
            key={`${c.src}-${i}`}
            className={`relative h-[150px] shrink-0 overflow-hidden rounded-[12px] border border-[var(--border)] bg-[var(--bg-card)] sm:h-[190px] ${
              c.kind === "v" ? "aspect-[9/16]" : "aspect-[16/9]"
            }`}
          >
            <video
              src={c.src}
              poster={c.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
