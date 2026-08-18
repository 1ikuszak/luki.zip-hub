"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { BrainGraph } from "./BrainGraph";
import { HeroScene } from "./HeroScene";

/**
 * Jeden wspólny zegar dla sceny (czat) i sieci (mózg) = jeden zsynchronizowany flow:
 * ask -> analyze (czyta pliki) -> answer -> save (folder wyrasta) -> reconnect.
 * Fazę podajemy do BrainGraph, `t` do HeroScene. Zegar pauzuje poza kadrem.
 */

const CYCLE = 8600;

type Phase = "ask" | "analyze" | "answer" | "save" | "reconnect";

function phaseOf(t: number): Phase {
  if (t < 1400) return "ask";
  if (t < 4200) return "analyze";
  if (t < 5200) return "answer";
  if (t < 6800) return "save";
  return "reconnect";
}

export function HeroBrainScene() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const inView = useInView(ref, { margin: "-10% 0px" });
  const [t, setT] = useState(0);

  useEffect(() => {
    if (reduce || !inView) return;
    let e = 0;
    setT(0);
    const id = setInterval(() => {
      e += 80;
      if (e > CYCLE) e = 0;
      setT(e);
    }, 80);
    return () => clearInterval(id);
  }, [reduce, inView]);

  const phase = reduce ? "reconnect" : phaseOf(t);

  return (
    <div ref={ref} className="relative h-full w-full">
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <BrainGraph tone="onDark" phase={phase} />
      </div>
      <div className="absolute inset-0">
        <HeroScene t={reduce ? CYCLE : t} reduce={reduce} />
      </div>
    </div>
  );
}
