"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Centerpiece: REALNY drugi mózg (graf jak w Obsidianie). Kontrast do "Znasz to"
 * (rozsypane, rozłączone narzędzia) -> tu wszystko gęsto POŁĄCZONE w jedną sieć.
 * Dowód, że na tym to stoi. Klastry + radialne wybuchy (hub-and-spoke) + rozsypane
 * satelity, slate na bieli (jak screenshot), akcent na hubach.
 *
 * Performance: pozycje policzone raz na resize, rAF poza React state, IO pauza,
 * DPR cap 2, liczba węzłów skalowana do powierzchni. Pulsy + myśli płyną do hubów
 * (solidne kropki, BEZ gradientów). prefers-reduced-motion -> statyczna pełna klatka.
 */

type N = { x: number; y: number; r: number; phase: number; accent: boolean; hub: boolean };
type E = [number, number];
type Flow = { a: number; b: number; t: number };

export function BrainMap() {
  const reduce = useReducedMotion() ?? false;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrap = wrapRef.current;
    if (!canvas || !wrap) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const cv = canvas;
    const wp = wrap;

    const reduceM = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(document.documentElement);
    const aHex = (css.getPropertyValue("--accent").trim() || "#2656d9").replace("#", "");
    const ai = parseInt(aHex.length === 3 ? aHex.split("").map((c) => c + c).join("") : aHex, 16);
    const AR = (ai >> 16) & 255, AG = (ai >> 8) & 255, AB = ai & 255;
    const accent = (o: number) => `rgba(${AR},${AG},${AB},${o})`;
    // slate (neutral, jak węzły w Obsidianie) + biel tła
    const SLATE = "59,66,82";
    const slate = (o: number) => `rgba(${SLATE},${o})`;

    let W = 0, H = 0, dpr = 1;
    let nodes: N[] = [];
    let edges: E[] = [];
    let hubEdges: E[] = [];
    let flows: Flow[] = [];
    const flash: Record<number, number> = {};

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    function addNode(x: number, y: number, r: number, acc = false, hub = false) {
      nodes.push({ x, y, r, phase: rnd(0, Math.PI * 2), accent: acc, hub });
      return nodes.length - 1;
    }

    function connectNearest(idxs: number[], k: number, maxD: number) {
      for (const i of idxs) {
        const dists = idxs
          .filter((j) => j !== i)
          .map((j) => ({ j, d: (nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2 }))
          .sort((a, b) => a.d - b.d)
          .slice(0, k);
        for (const { j, d } of dists) {
          if (d < maxD * maxD && i < j) edges.push([i, j]);
        }
      }
    }

    function cluster(cx: number, cy: number, rad: number, count: number) {
      const idxs: number[] = [];
      const golden = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < count; i++) {
        const t = (i + 0.5) / count;
        const r = rad * Math.sqrt(t);
        const a = i * golden;
        const jit = r * 0.12;
        const x = cx + Math.cos(a) * r + rnd(-jit, jit);
        const y = cy + Math.sin(a) * r * 0.92 + rnd(-jit, jit);
        idxs.push(addNode(x, y, rnd(1.6, 2.8)));
      }
      // 1-2 huby w klastrze
      const hubCount = Math.max(1, Math.round(count / 90));
      for (let h = 0; h < hubCount; h++) {
        const hi = idxs[Math.floor(rnd(0, idxs.length * 0.5))];
        nodes[hi].r = rnd(4.5, 6.5);
        nodes[hi].accent = true;
        nodes[hi].hub = true;
      }
      connectNearest(idxs, 3, rad * 0.4);
      return idxs;
    }

    function burst(cx: number, cy: number, leaves: number, rad: number) {
      const hub = addNode(cx, cy, rnd(6, 8), true, true);
      for (let i = 0; i < leaves; i++) {
        const a = rnd(0, Math.PI * 2);
        const d = rad * (0.45 + Math.sqrt(rnd(0, 1)) * 0.55);
        const li = addNode(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.95, rnd(1.4, 2.4));
        edges.push([hub, li]);
        hubEdges.push([li, hub]);
      }
      return hub;
    }

    function arc(cx: number, cy: number, r1: number, r2: number, a1: number, a2: number, count: number) {
      const idxs: number[] = [];
      for (let i = 0; i < count; i++) {
        const a = rnd(a1, a2);
        const r = rnd(r1, r2);
        idxs.push(addNode(cx + Math.cos(a) * r, cy + Math.sin(a) * r, rnd(1.3, 2.2)));
      }
      return idxs;
    }

    function build() {
      nodes = [];
      edges = [];
      hubEdges = [];
      flows = [];
      for (const k in flash) delete flash[+k];
      const m = Math.min(W, H);
      const scale = W < 640 ? 0.5 : W < 1024 ? 0.75 : 1;

      // duży gęsty klaster (centrum-lewo) + średni klaster (lewo)
      const A = cluster(W * 0.42, H * 0.36, m * 0.26, Math.round(240 * scale));
      const B = cluster(W * 0.2, H * 0.52, m * 0.15, Math.round(95 * scale));
      // radialny wybuch (dół-prawo), jak w Obsidianie
      const hub = burst(W * 0.66, H * 0.66, Math.round(150 * scale), m * 0.3);
      // rozsypane satelity po obwodzie (łuki)
      const arc1 = arc(W * 0.5, H * 0.5, m * 0.44, m * 0.5, Math.PI * 0.55, Math.PI * 1.1, Math.round(90 * scale));
      const arc2 = arc(W * 0.5, H * 0.5, m * 0.42, m * 0.5, -Math.PI * 0.35, Math.PI * 0.2, Math.round(70 * scale));

      // mosty między skupiskami (długie krawędzie) = jedna sieć
      const aHub = A.find((i) => nodes[i].hub) ?? A[0];
      const bHub = B.find((i) => nodes[i].hub) ?? B[0];
      edges.push([aHub, bHub], [aHub, hub], [bHub, hub]);
      for (let i = 0; i < Math.round(10 * scale); i++) {
        edges.push([A[Math.floor(rnd(0, A.length))], hub]);
      }
      // wciągnij część satelitów na orbitę sieci (rzadkie, długie nitki) = jedna sieć
      for (const set of [arc1, arc2]) {
        for (let i = 0; i < Math.round(7 * scale); i++) {
          const sat = set[Math.floor(rnd(0, set.length))];
          edges.push([sat, rnd(0, 1) < 0.5 ? aHub : hub]);
        }
      }
    }

    function resize() {
      const rect = wp.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function draw(now: number) {
      ctx!.clearRect(0, 0, W, H);
      // krawędzie (bardzo delikatne)
      ctx!.lineWidth = 0.6;
      ctx!.strokeStyle = accent(0.1);
      ctx!.beginPath();
      for (const [a, b] of edges) {
        ctx!.moveTo(nodes[a].x, nodes[a].y);
        ctx!.lineTo(nodes[b].x, nodes[b].y);
      }
      ctx!.stroke();

      // myśli płynące do hubów
      for (const f of flows) {
        const x = nodes[f.a].x + (nodes[f.b].x - nodes[f.a].x) * f.t;
        const y = nodes[f.a].y + (nodes[f.b].y - nodes[f.a].y) * f.t;
        ctx!.beginPath();
        ctx!.arc(x, y, 2.2, 0, Math.PI * 2);
        ctx!.fillStyle = accent(0.85);
        ctx!.fill();
      }

      // węzły
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const pulse = n.hub ? 1 + Math.sin(now * 0.002 + n.phase) * 0.12 : 1;
        const fl = flash[i] || 0;
        const r = n.r * pulse + fl * 2;
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx!.fillStyle = n.accent ? accent(0.95) : slate(0.82);
        ctx!.fill();
        if (n.hub) {
          // pierścień huba (solidny, bez gradientu)
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, r + 4 + fl * 6, 0, Math.PI * 2);
          ctx!.strokeStyle = accent(0.18 + fl * 0.3);
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      }
    }

    function step() {
      for (const k in flash) {
        flash[+k] *= 0.92;
        if (flash[+k] < 0.01) delete flash[+k];
      }
      for (let i = flows.length - 1; i >= 0; i--) {
        flows[i].t += 0.03;
        if (flows[i].t >= 1) {
          flash[flows[i].b] = 1;
          flows.splice(i, 1);
        }
      }
    }

    let raf = 0, running = false, thoughtTimer: number | undefined;
    function frame(now: number) {
      step();
      draw(now);
      raf = requestAnimationFrame(frame);
    }
    function tickThought() {
      if (flows.length >= 4 || !hubEdges.length) return;
      const [a, b] = hubEdges[Math.floor(rnd(0, hubEdges.length))];
      flows.push({ a, b, t: 0 });
    }
    function start() {
      if (running || reduceM) return;
      running = true;
      raf = requestAnimationFrame(frame);
      thoughtTimer = window.setInterval(tickThought, 600);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
      if (thoughtTimer) clearInterval(thoughtTimer);
      thoughtTimer = undefined;
    }

    resize();
    if (reduceM) draw(0);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduceM) draw(0);
    });
    ro.observe(wp);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.04 });
    io.observe(cv);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return (
    <section className="container-wide py-20 sm:py-28">
      <motion.h2
        className="t-h2 max-w-[22ch]"
        initial={reduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        To nie metafora. To twój drugi mózg.
      </motion.h2>
      <motion.p
        className="t-body-large mt-4 max-w-[46ch] text-[var(--text-secondary)]"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-12% 0px" }}
        transition={{ duration: 0.6, delay: 0.05 }}
      >
        Notatki, reele, rozmowy, decyzje, połączone w jedną żywą sieć. Stąd AI
        bierze kontekst, gdy pisze jak ty.
      </motion.p>

      <div
        ref={wrapRef}
        className="relative mt-10 aspect-[4/3] w-full overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--bg-card)] sm:aspect-[16/9]"
      >
        <canvas
          ref={canvasRef}
          className="h-full w-full"
          role="img"
          aria-label="Realny graf drugiego mózgu: gęste klastry notatek i konceptów, radialne skupiska i rozsypane satelity, połączone krawędziami w jedną sieć."
        />
      </div>

      <p className="t-small mt-4 text-[var(--text-secondary)]">
        Realny graf z mojego systemu: 1842 notatki, 465 konceptów, wszystko spięte.
      </p>
    </section>
  );
}
