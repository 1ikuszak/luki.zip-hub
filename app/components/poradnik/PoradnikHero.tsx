import Image from "next/image";
import type { HeroImage } from "@/lib/posts";

type Props = {
  images: HeroImage[];
  lead?: string;
};

const STRIP_H_DESKTOP = 240;
const STRIP_H_MOBILE = 180;

export function PoradnikHero({ images, lead }: Props) {
  if (!images?.length) return null;

  const loop = [...images, ...images];

  return (
    <section
      aria-label="Galeria efektów"
      className="w-full overflow-hidden pt-4 sm:pt-6"
    >
      <div
        className="flex gap-2 sm:gap-3 marquee-track"
        style={{ width: "max-content" }}
      >
        {loop.map((img, i) => {
          const ratio = img.w / img.h;
          return (
            <div
              key={`${img.src}-${i}`}
              className="relative flex-none bg-black/[0.04] hero-strip-cell"
              style={{ aspectRatio: `${img.w}/${img.h}` }}
              aria-hidden={i >= images.length}
            >
              <Image
                src={img.src}
                alt={i < images.length ? img.alt : ""}
                fill
                sizes={`${Math.round(STRIP_H_DESKTOP * ratio)}px`}
                className="object-cover"
                priority={i < 2}
                fetchPriority={i < 2 ? "high" : "auto"}
              />
            </div>
          );
        })}
      </div>

      {lead && (
        <div className="container-narrow mt-4 sm:mt-5">
          <p className="text-[14px] sm:text-[15px] leading-relaxed text-[var(--text-secondary)] flex items-start gap-2">
            <span className="inline-block w-5 h-px bg-[var(--text)] mt-[0.65em] flex-none" aria-hidden />
            <span>{lead}</span>
          </p>
        </div>
      )}
    </section>
  );
}
