"use client";

import { useEffect, useRef } from "react";

type Props = {
  src: string;
  poster: string;
  width: number;
  height: number;
};

// Wideo w gridzie: muted loop, gra dopiero gdy wjedzie w viewport, pauzuje poza nim.
// preload="none" + poster -> nic się nie ładuje dopóki kafelek nie jest blisko ekranu.
export function PortfolioVideo({ src, poster, width, height }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // play() może odrzucić obietnicę (np. zakładka w tle) — ignorujemy.
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      width={width}
      height={height}
      muted
      loop
      playsInline
      preload="none"
      tabIndex={-1}
      aria-hidden="true"
      className="block w-full h-auto"
      style={{ aspectRatio: `${width} / ${height}` }}
    />
  );
}
