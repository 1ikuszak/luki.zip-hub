"use client";

import { useEffect, useRef } from "react";

/**
 * Dwie wizualizacje kontrastu dla closera "Masz dwie opcje" (canvas, rAF poza React).
 * alive=true  -> ZYWY system: rdzen + wezly golden-angle, krawedzie, mysli plyna do
 *                rdzenia, rdzen pulsuje. Bialy (na akcencie). "Pracuje".
 * alive=false -> MARTWE: rozsypane, niepolaczone, przygasajace punkty = szum bez
 *                systemu. Szary (na czerni).
 * Zero gradientow. IO pauza, DPR cap 2, reduced-motion = stan statyczny.
 */

const N_ALIVE = 22;
const N_DEAD = 20;

export function OptionGraph({ alive }: { alive: boolean }) {
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
    const col = (o: number) => (alive ? `rgba(255,255,255,${o})` : `rgba(158,166,186,${o})`);
    const rnd = (a: number, b: number) => a + Math.random() * (b - a);

    let W = 0, H = 0, dpr = 1;
    type Node = { x: number; y: number; r: number; phase: number; core?: boolean };
    let nodes: Node[] = [];
    let edges: [number, number][] = [];
    let flows: { from: number; t: number }[] = [];
    let coreFlash = 0;

    function build() {
      nodes = [];
      edges = [];
      flows = [];
      coreFlash = 0;
      const cx = W / 2, cy = H / 2;

      if (alive) {
        nodes.push({ x: cx, y: cy, r: 6.5, phase: 0, core: true }); // index 0 = rdzen
        const g = Math.PI * (3 - Math.sqrt(5));
        const R = Math.min(W, H) * 0.46;
        const leaves: number[] = [];
        for (let i = 0; i < N_ALIVE; i++) {
          const t = (i + 0.6) / N_ALIVE;
          const r = R * Math.sqrt(t);
          const a = i * g;
          leaves.push(
            nodes.push({
              x: cx + Math.cos(a) * r,
              y: cy + Math.sin(a) * r * 0.82,
              r: rnd(1.6, 2.8),
              phase: rnd(0, Math.PI * 2),
            }) - 1,
          );
        }
        for (const i of leaves) {
          const near = leaves
            .filter((j) => j !== i)
            .map((j) => ({ j, d: (nodes[i].x - nodes[j].x) ** 2 + (nodes[i].y - nodes[j].y) ** 2 }))
            .sort((p, q) => p.d - q.d)
            .slice(0, 2);
          for (const { j } of near) if (i < j) edges.push([i, j]);
        }
        const spokes = leaves
          .map((j) => ({ j, d: (cx - nodes[j].x) ** 2 + (cy - nodes[j].y) ** 2 }))
          .sort((p, q) => p.d - q.d)
          .slice(0, 11)
          .map((o) => o.j);
        for (const j of spokes) edges.push([0, j]);
      } else {
        for (let i = 0; i < N_DEAD; i++) {
          nodes.push({
            x: rnd(W * 0.08, W * 0.92),
            y: rnd(H * 0.14, H * 0.86),
            r: rnd(1.4, 2.6),
            phase: rnd(0, Math.PI * 2),
          });
        }
      }
    }

    function resize() {
      const rect = wp.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      if (W === 0 || H === 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      build();
    }

    function draw(g: number) {
      ctx!.clearRect(0, 0, W, H);

      if (alive) {
        ctx!.lineWidth = 1;
        ctx!.strokeStyle = col(0.18);
        for (const [a, b] of edges) {
          ctx!.beginPath();
          ctx!.moveTo(nodes[a].x, nodes[a].y);
          ctx!.lineTo(nodes[b].x, nodes[b].y);
          ctx!.stroke();
        }
        if (flows.length) {
          const c = nodes[0];
          ctx!.fillStyle = col(0.95);
          for (const fl of flows) {
            const f = nodes[fl.from];
            ctx!.beginPath();
            ctx!.arc(f.x + (c.x - f.x) * fl.t, f.y + (c.y - f.y) * fl.t, 2.6, 0, Math.PI * 2);
            ctx!.fill();
          }
        }
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const fy = reduce ? 0 : Math.sin(g * 0.0013 + n.phase) * 1.5;
          let r = n.r;
          if (n.core) r = n.r * (1 + (reduce ? 0 : Math.sin(g * 0.003) * 0.13)) + coreFlash * 3;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y + fy, r, 0, Math.PI * 2);
          ctx!.fillStyle = n.core ? col(1) : col(0.82);
          ctx!.fill();
          if (n.core) {
            ctx!.beginPath();
            ctx!.arc(n.x, n.y, r + 5 + coreFlash * 5, 0, Math.PI * 2);
            ctx!.strokeStyle = col(0.3 + coreFlash * 0.3);
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      } else {
        for (let i = 0; i < nodes.length; i++) {
          const n = nodes[i];
          const flick = reduce ? 0.4 : 0.22 + (Math.sin(g * 0.0016 + n.phase) * 0.5 + 0.5) * 0.4;
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx!.fillStyle = col(flick);
          ctx!.fill();
        }
      }
    }

    function step() {
      if (!alive) return;
      if (coreFlash > 0) coreFlash *= 0.9;
      for (let i = flows.length - 1; i >= 0; i--) {
        flows[i].t += 0.022;
        if (flows[i].t >= 1) {
          coreFlash = 1;
          flows.splice(i, 1);
        }
      }
    }

    let raf = 0, running = false, t0 = 0, flowTimer: number | undefined;
    function frame(now: number) {
      if (!t0) t0 = now;
      step();
      draw(now - t0);
      raf = requestAnimationFrame(frame);
    }
    function tick() {
      if (alive && flows.length < 3 && nodes.length > 1) {
        flows.push({ from: 1 + Math.floor(Math.random() * (nodes.length - 1)), t: 0 });
      }
    }
    function start() {
      if (running || reduce) return;
      running = true;
      t0 = 0;
      raf = requestAnimationFrame(frame);
      if (alive) flowTimer = window.setInterval(tick, 550);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
      if (flowTimer) clearInterval(flowTimer);
      flowTimer = undefined;
    }

    resize();
    if (reduce) draw(1e6);
    const ro = new ResizeObserver(() => {
      resize();
      if (reduce) draw(1e6);
    });
    ro.observe(wp);
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { threshold: 0.05 });
    io.observe(cv);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
    };
  }, [alive]);

  return (
    <div ref={wrapRef} className="absolute inset-0">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        role="img"
        aria-label={alive ? "Żywy system: węzły łączą się wokół rdzenia i płyną do środka, sieć pracuje." : "Rozsypane, niepołączone punkty, szum bez systemu."}
      />
    </div>
  );
}
