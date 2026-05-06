import Image from "next/image";

const LOGOS = [
  { src: "/logos/placeholder-1.svg", alt: "Nordic" },
  { src: "/logos/placeholder-2.svg", alt: "Oat Haus" },
  { src: "/logos/placeholder-3.svg", alt: "Lumen" },
  { src: "/logos/placeholder-4.svg", alt: "Forge Lab" },
  { src: "/logos/placeholder-5.svg", alt: "Atlas" },
];

export function SocialProof() {
  return (
    <section className="border-y border-[var(--border)] py-10 sm:py-12">
      <div className="container-wide flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
        <div className="text-[11px] uppercase tracking-[0.12em] font-semibold text-[var(--text-secondary)] shrink-0">
          Zaufali mi:
        </div>
        <div className="flex flex-wrap items-center gap-x-8 sm:gap-x-10 gap-y-5">
          {LOGOS.map((logo) => (
            <Image
              key={logo.src}
              src={logo.src}
              alt={logo.alt}
              width={120}
              height={30}
              className="h-7 w-auto grayscale opacity-60 hover:opacity-100 transition-opacity duration-150"
              unoptimized
            />
          ))}
        </div>
      </div>
    </section>
  );
}
