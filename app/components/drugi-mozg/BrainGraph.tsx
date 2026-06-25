"use client";

import { useEffect, useRef } from "react";

/**
 * Hero bohater: REALNY drugi mózg (graf jak w Obsidianie), ale W AKCJI.
 * Nie statyczny obrazek: graf SAM SIĘ BUDUJE (węzły wskakują klaster po klastrze,
 * krawędzie się dociągają), potem żyje: brain-scan przejeżdża i podświetla węzły,
 * huby pulsują, myśli płyną krawędziami do hubów.
 *
 * Mózg = klastry (phyllotaxis / golden-angle = matematyczny, organiczny) + radialny
 * wybuch (hub-and-spoke) + rozsypane satelity wciągnięte w sieć. Slate na bieli,
 * akcent #2656d9 na hubach. ZERO gradientów (skan/pierścienie = solidne kreski).
 *
 * Performance: rAF poza React state, drzewo policzone raz na resize, IO pauza,
 * DPR cap 2, liczba węzłów skalowana do rozmiaru. reduced-motion -> statyczny graf.
 */

type N = { x: number; y: number; r: number; phase: number; accent: boolean; hub: boolean; born: number };
type E = { a: number; b: number; born: number };
type Flow = { a: number; b: number; t: number };

const ASSEMBLE = 2400; // ms: budowanie mózgu
const SCAN_PERIOD = 5200;
const SCAN_DUR = 1700;

export function BrainGraph() {
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

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const css = getComputedStyle(document.documentElement);
    const aHex = (css.getPropertyValue("--accent").trim() || "#2656d9").replace("#", "");
    const ai = parseInt(aHex.length === 3 ? aHex.split("").map((c) => c + c).join("") : aHex, 16);
    const AR = (ai >> 16) & 255, AG = (ai >> 8) & 255, AB = ai & 255;
    const accent = (o: number) => `rgba(${AR},${AG},${AB},${o})`;
    const slate = (o: number) => `rgba(59,66,82,${o})`;

    let W = 0, H = 0, dpr = 1;
    let nodes: N[] = [];
    let edges: E[] = [];
    let hubEdges: E[] = [];
    let flows: Flow[] = [];
    const flash: Record<number, number> = {};
    const STATIC = 1e6;

    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    function addNode(x: number, y: number, r: number, born: number, acc = false, hub = false) {
      nodes.push({ x, y, r, phase: rnd(0, Math.PI * 2), accent: acc, hub, born });
      return nodes.length - 1;
    }
    function link(a: number, b: number) {
      const born = Math.max(nodes[a].born, nodes[b].born) + 140;
      edges.push({ a, b, born });
      if (nodes[a].hub || nodes[b].hub) {
        const leaf = nodes[a].hub ? b : a;
        const h = nodes[a].hub ? a : b;
        hubEdges.push({ a: leaf, b: h, born });
      }
    }
    function connectNearest(idxs: number[], k: number, maxD: number) {
      for (const i of idxs) {
        const near = idxs
          .filter((j) => j !== i)
          .map((j) => ({ j, d: (nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2 }))
          .sort((p, q) => p.d - q.d)
          .slice(0, k);
        for (const { j, d } of near) if (d < maxD * maxD && i < j) link(i, j);
      }
    }
    function cluster(cx: number, cy: number, rad: number, count: number, t0: number, span: number) {
      const idxs: number[] = [];
      const g = Math.PI * (3 - Math.sqrt(5));
      for (let i = 0; i < count; i++) {
        const t = (i + 0.5) / count;
        const r = rad * Math.sqrt(t);
        const a = i * g;
        const jit = r * 0.12;
        idxs.push(addNode(cx + Math.cos(a) * r + rnd(-jit, jit), cy + Math.sin(a) * r * 0.92 + rnd(-jit, jit), rnd(1.6, 2.8), t0 + t * span));
      }
      const hubs = Math.max(1, Math.round(count / 80));
      for (let h = 0; h < hubs; h++) {
        const hi = idxs[Math.floor(rnd(0, idxs.length * 0.5))];
        nodes[hi].r = rnd(4.5, 6.5);
        nodes[hi].accent = true;
        nodes[hi].hub = true;
      }
      connectNearest(idxs, 3, rad * 0.42);
      return idxs;
    }
    function burst(cx: number, cy: number, leaves: number, rad: number, t0: number, span: number) {
      const hub = addNode(cx, cy, rnd(6, 8), t0, true, true);
      for (let i = 0; i < leaves; i++) {
        const a = rnd(0, Math.PI * 2);
        const d = rad * (0.45 + Math.sqrt(rnd(0, 1)) * 0.55);
        const li = addNode(cx + Math.cos(a) * d, cy + Math.sin(a) * d * 0.95, rnd(1.4, 2.4), t0 + (i / leaves) * span);
        link(hub, li);
      }
      return hub;
    }
    function arc(cx: number, cy: number, r1: number, r2: number, a1: number, a2: number, count: number, t0: number, span: number) {
      const idxs: number[] = [];
      for (let i = 0; i < count; i++) {
        const a = rnd(a1, a2), r = rnd(r1, r2);
        idxs.push(addNode(cx + Math.cos(a) * r, cy + Math.sin(a) * r, rnd(1.3, 2.2), t0 + rnd(0, span)));
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
      const scale = W < 380 ? 0.55 : W < 520 ? 0.78 : 1;

      const A = cluster(W * 0.46, H * 0.42, m * 0.27, Math.round(150 * scale), 0, 1100);
      const B = cluster(W * 0.74, H * 0.26, m * 0.12, Math.round(45 * scale), 400, 600);
      const hub = burst(W * 0.62, H * 0.74, Math.round(95 * scale), m * 0.26, 800, 1100);
      const arc1 = arc(W * 0.5, H * 0.5, m * 0.42, m * 0.49, Math.PI * 0.55, Math.PI * 1.15, Math.round(50 * scale), 1300, 900);
      const arc2 = arc(W * 0.5, H * 0.5, m * 0.4, m * 0.48, -Math.PI * 0.32, Math.PI * 0.14, Math.round(40 * scale), 1300, 900);

      const aHub = A.find((i) => nodes[i].hub) ?? A[0];
      const bHub = B.find((i) => nodes[i].hub) ?? B[0];
      link(aHub, bHub);
      link(aHub, hub);
      link(bHub, hub);
      for (let i = 0; i < Math.round(8 * scale); i++) link(A[Math.floor(rnd(0, A.length))], hub);
      for (const set of [arc1, arc2]) {
        for (let i = 0; i < Math.round(6 * scale); i++) {
          link(set[Math.floor(rnd(0, set.length))], rnd(0, 1) < 0.5 ? aHub : hub);
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

    function scanX(g: number): number | null {
      if (g < ASSEMBLE) return null;
      const t = (g - ASSEMBLE) % SCAN_PERIOD;
      if (t > SCAN_DUR) return null;
      return (-0.05 + (t / SCAN_DUR) * 1.1) * W;
    }

    function draw(g: number) {
      ctx!.clearRect(0, 0, W, H);
      const sx = scanX(g);
      const band = W * 0.09;

      // krawędzie (dociągają się)
      ctx!.lineWidth = 0.6;
      ctx!.strokeStyle = accent(0.1);
      for (const e of edges) {
        const p = Math.max(0, Math.min(1, (g - e.born) / 320));
        if (p <= 0.01) continue;
        const a = nodes[e.a], b = nodes[e.b];
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p);
        ctx!.stroke();
      }

      // linia skanu (solidna, delikatna)
      if (sx !== null) {
        ctx!.beginPath();
        ctx!.moveTo(sx, 0);
        ctx!.lineTo(sx, H);
        ctx!.strokeStyle = accent(0.14);
        ctx!.lineWidth = 1.2;
        ctx!.stroke();
      }

      // myśli do hubów
      for (const f of flows) {
        const a = nodes[f.a], b = nodes[f.b];
        ctx!.beginPath();
        ctx!.arc(a.x + (b.x - a.x) * f.t, a.y + (b.y - a.y) * f.t, 2.2, 0, Math.PI * 2);
        ctx!.fillStyle = accent(0.9);
        ctx!.fill();
      }

      // węzły
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const ap = Math.max(0, Math.min(1, (g - n.born) / 360));
        if (ap <= 0.01) continue;
        const ease = 1 - Math.pow(1 - ap, 3);
        const pulse = n.hub ? 1 + Math.sin(g * 0.002 + n.phase) * 0.12 : 1;
        // brain-scan: węzły blisko linii rozbłyskują
        let scanHit = 0;
        if (sx !== null) {
          const d = Math.abs(n.x - sx);
          if (d < band) scanHit = 1 - d / band;
        }
        const fl = flash[i] || 0;
        const r = (n.r * pulse + fl * 2) * ease * (1 + scanHit * 0.6);

        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        if (n.accent || scanHit > 0.3) ctx!.fillStyle = accent(0.95);
        else ctx!.fillStyle = slate(0.82);
        ctx!.fill();

        if (n.hub) {
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, r + 4 + fl * 6, 0, Math.PI * 2);
          ctx!.strokeStyle = accent(0.18 + fl * 0.3);
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
        if (scanHit > 0.5) {
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, r + 3, 0, Math.PI * 2);
          ctx!.strokeStyle = accent(0.35 * scanHit);
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      }
    }

    function step(g: number) {
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
      void g;
    }

    let raf = 0, running = false, t0 = 0, thoughtTimer: number | undefined;
    function frame(now: number) {
      if (!t0) t0 = now;
      const g = now - t0;
      step(g);
      draw(g);
      raf = requestAnimationFrame(frame);
    }
    function tickThought() {
      if (!t0 || performance.now() - t0 < ASSEMBLE) return;
      if (flows.length >= 4 || !hubEdges.length) return;
      const e = hubEdges[Math.floor(rnd(0, hubEdges.length))];
      flows.push({ a: e.a, b: e.b, t: 0 });
    }
    function start() {
      if (running || reduce) return;
      running = true;
      t0 = 0;
      raf = requestAnimationFrame(frame);
      thoughtTimer = window.setInterval(tickThought, 620);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
      if (thoughtTimer) clearInterval(thoughtTimer);
      thoughtTimer = undefined;
    }

    resize();
    if (reduce) draw(STATIC);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(STATIC);
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
    <div ref={wrapRef} className="relative aspect-square w-full max-w-[540px]">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        role="img"
        aria-label="Żywy drugi mózg: graf wiedzy buduje się z klastrów notatek i konceptów, radialnego skupiska i rozsypanych satelitów, połączonych w jedną sieć. Linia skanu przejeżdża i podświetla węzły."
      />
    </div>
  );
}
