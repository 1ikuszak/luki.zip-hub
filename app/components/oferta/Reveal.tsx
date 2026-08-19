import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/**
 * Wejscie sekcji: fade + slide-up przy wjezdzie w viewport.
 *
 * Od 2026-08-19 komponent SERWEROWY na scroll-driven CSS (`animation-timeline:
 * view()`) zamiast framer-motion `whileInView`. Na homepage bylo 89 instancji,
 * czyli 89 osobnych obserwatorow i tyle samo drzew do hydracji - na telefonie
 * to byla realna czesc janku przy scrollu.
 *
 * Degradacja: brak `animation-timeline` (m.in. Firefox) albo reduced-motion =
 * tresc po prostu widoczna, bez animacji. Nigdy ukryta.
 */
export function Reveal({ children, className, delay = 0 }: Props) {
  return (
    <div
      className={className ? `reveal-anim ${className}` : "reveal-anim"}
      style={delay ? ({ "--reveal-delay": `${delay}` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
}
