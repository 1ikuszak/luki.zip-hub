"use client";

import type { ReactNode, CSSProperties } from "react";
import { useReveal } from "./useReveal";

type Props = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

/** Wejscie sekcji: fade + slide-up przy wjezdzie w viewport (raz), IntersectionObserver. */
export function Reveal({ children, className, delay = 0 }: Props) {
  const { ref, state } = useReveal<HTMLDivElement>();

  const style: CSSProperties | undefined = delay
    ? { transitionDelay: `${delay}s` }
    : undefined;

  return (
    <div
      ref={ref}
      className={`reveal-io reveal-io--${state}${className ? ` ${className}` : ""}`}
      style={style}
    >
      {children}
    </div>
  );
}
