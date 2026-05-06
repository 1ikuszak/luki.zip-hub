import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
};

export function Hero({ title, subtitle, image, imageAlt }: Props) {
  return (
    <section className="container-wide pt-8 sm:pt-12 pb-10">
      <Link
        href="/case-studies"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
      >
        <ArrowLeft size={14} strokeWidth={2.25} />
        Wszystkie case studies
      </Link>

      <div className="mt-10 sm:mt-16">
        <div className="text-[11px] uppercase tracking-[0.18em] text-[var(--accent)] font-semibold">
          Case study
        </div>
        <h1 className="t-h1 mt-5 max-w-[900px]">{title}</h1>
        <p className="t-body-large mt-6 text-[var(--text-secondary)] max-w-[640px]">
          {subtitle}
        </p>
      </div>

      <div className="relative mt-12 sm:mt-16 aspect-[16/9] w-full overflow-hidden rounded-xl border border-[var(--border)] bg-white">
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(max-width: 1024px) 100vw, 1024px"
          priority
          className="object-cover"
        />
      </div>
    </section>
  );
}
