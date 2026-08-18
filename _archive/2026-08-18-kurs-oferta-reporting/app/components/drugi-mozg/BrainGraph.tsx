"use client";

import { useEffect, useRef } from "react";

/**
 * Hero bohater: REALNY drugi mózg (graf jak w Obsidianie), W AKCJI i ZSYNCHRONIZOWANY
 * z oknem czatu. Sterowany fazą (prop `phase`):
 *   ask -> analyze (czyta pliki: myśli płyną, węzły iskrzą) -> answer
 *   -> save (wyrasta FOLDER + rozwija się w subpliki, podpięty do sieci)
 *   -> reconnect (folder linkuje się do drugiego huba, sieć re-formuje)
 * Bez ambientowych skan-line'ów i losowego twinkle - ruch idzie za tym, co robi czat.
 * Brak prop `phase` = wewnętrzny cykl (fallback, np. mobile).
 *
 * Performance: rAF poza React state, drzewo policzone raz na resize, IO pauza,
 * DPR cap 2, liczba węzłów skalowana. reduced-motion -> statyczny graf.
 */

type N = { x: number; y: number; r: number; phase: number; accent: boolean; hub: boolean; born: number };
type E = { a: number; b: number; born: number };
type Flow = { a: number; b: number; t: number };
type Phase = "ask" | "analyze" | "answer" | "save" | "reconnect";

const ASSEMBLE = 2400; // ms: budowanie mózgu
const GROW_CAP = 24; // ile "zapisów" (folderów) sieć dopisze zanim przystanie
const CYCLE = 8600; // wewnętrzny cykl faz (fallback bez sterowania z zewnątrz)

export function BrainGraph({
  tone = "default",
  phase,
}: {
  tone?: "default" | "onDark" | "spectrum";
  phase?: Phase;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const phaseRef = useRef<Phase | undefined>(phase);
  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

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
    const white = (o: number) => `rgba(255,255,255,${o})`;
    const onDark = tone === "onDark";
    const spectrum = tone === "spectrum";
    const SPECTRUM = [
      [38, 86, 217], [74, 114, 228], [109, 94, 240], [155, 93, 229],
      [62, 200, 240], [91, 141, 239], [123, 79, 224], [47, 168, 224],
    ];
    const spec = (i: number, a: number) => {
      const c = SPECTRUM[Math.abs((i * 2654435761) % SPECTRUM.length)];
      return `rgba(${c[0]},${c[1]},${c[2]},${a})`;
    };
    const sizeMul = spectrum ? 1.4 : 1;

    let W = 0, H = 0, dpr = 1;
    let nodes: N[] = [];
    let edges: E[] = [];
    let hubEdges: E[] = [];
    let flows: Flow[] = [];
    let rings: { x: number; y: number; born: number }[] = [];
    const flash: Record<number, number> = {};
    let growthCount = 0;
    let nextFlow = 0;
    let lastPhase: Phase | "" = "";
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
      rings = [];
      for (const k in flash) delete flash[+k];
      growthCount = 0;
      nextFlow = 0;
      lastPhase = "";
      const m = Math.min(W, H);
      const scale = W < 380 ? 0.55 : W < 520 ? 0.78 : 1;

      const A = cluster(W * 0.46, H * 0.42, m * 0.27, Math.round(188 * scale), 0, 1100);
      const B = cluster(W * 0.74, H * 0.26, m * 0.12, Math.round(58 * scale), 400, 600);
      const hub = burst(W * 0.62, H * 0.74, Math.round(118 * scale), m * 0.26, 800, 1100);
      const arc1 = arc(W * 0.5, H * 0.5, m * 0.42, m * 0.49, Math.PI * 0.55, Math.PI * 1.15, Math.round(64 * scale), 1300, 900);
      const arc2 = arc(W * 0.5, H * 0.5, m * 0.4, m * 0.48, -Math.PI * 0.32, Math.PI * 0.14, Math.round(52 * scale), 1300, 900);

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

    function hubList() {
      const hs: number[] = [];
      for (let i = 0; i < nodes.length; i++) if (nodes[i].hub) hs.push(i);
      return hs;
    }

    // ZAPIS: folder wyrasta w WIDOCZNYM pierścieniu wokół centrum (poza kartą czatu),
    // podpina się do najbliższego huba długą krawędzią, rozwija w subpliki, reconnect do sieci.
    function growFolder(g: number) {
      const hubs = hubList();
      if (!hubs.length) return;
      const cx = W / 2, cy = H / 2;
      const R = Math.min(W, H) * (0.4 + Math.random() * 0.08);
      const ang = Math.random() * Math.PI * 2;
      const fx = Math.max(16, Math.min(W - 16, cx + Math.cos(ang) * R));
      const fy = Math.max(16, Math.min(H - 16, cy + Math.sin(ang) * R * 0.9));
      // najbliższy hub = źródło łączącej krawędzi (widoczna linia do środka)
      let hi = hubs[0], best = Infinity;
      for (const h of hubs) {
        const d = (nodes[h].x - fx) ** 2 + (nodes[h].y - fy) ** 2;
        if (d < best) { best = d; hi = h; }
      }
      const folder = addNode(fx, fy, rnd(4.4, 5.6), g, true, true);
      link(hi, folder);
      const kids = 2 + Math.floor(Math.random() * 2);
      for (let k = 0; k < kids; k++) {
        const ka = ang + rnd(-1.0, 1.0);
        const kd = Math.min(W, H) * (0.05 + Math.random() * 0.03);
        const cx2 = Math.max(8, Math.min(W - 8, fx + Math.cos(ka) * kd));
        const cy2 = Math.max(8, Math.min(H - 8, fy + Math.sin(ka) * kd));
        const ci = addNode(cx2, cy2, rnd(1.8, 2.6), g + 240 + k * 130);
        link(folder, ci);
      }
      // reconnect: drugi najbliższy hub
      let other = hi, best2 = Infinity;
      for (const h of hubs) {
        if (h === hi) continue;
        const d = (nodes[h].x - fx) ** 2 + (nodes[h].y - fy) ** 2;
        if (d < best2) { best2 = d; other = h; }
      }
      if (other !== hi) link(folder, other);
      flash[folder] = 2.4;
      flows.push({ a: hi, b: folder, t: 0 });
      rings.push({ x: fx, y: fy, born: g });
      growthCount++;
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

    function internalPhase(g: number): Phase {
      if (g < ASSEMBLE + 200) return "ask";
      const c = (g - ASSEMBLE) % CYCLE;
      if (c < 1400) return "ask";
      if (c < 4200) return "analyze";
      if (c < 5200) return "answer";
      if (c < 6800) return "save";
      return "reconnect";
    }

    function draw(g: number) {
      ctx!.clearRect(0, 0, W, H);

      // krawędzie (cienkie, lekkie). Podświetlenie TYLKO dla nowych połączeń (zapis),
      // NIE przy budowaniu na starcie - inaczej cały graf miga na grubo.
      const baseEdge = spectrum ? slate(0.1) : onDark ? white(0.14) : accent(0.08);
      const freshEdge = onDark ? white(0.42) : accent(0.32);
      for (const e of edges) {
        const p = Math.max(0, Math.min(1, (g - e.born) / 360));
        if (p <= 0.01) continue;
        const fresh = e.born > ASSEMBLE && g - e.born < 1500;
        ctx!.strokeStyle = fresh ? freshEdge : baseEdge;
        ctx!.lineWidth = fresh ? 0.9 : 0.5;
        const a = nodes[e.a], b = nodes[e.b];
        ctx!.beginPath();
        ctx!.moveTo(a.x, a.y);
        ctx!.lineTo(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p);
        ctx!.stroke();
      }
      // pierścienie "zapisu" przy nowym folderze (cienkie)
      for (const rg of rings) {
        const p = (g - rg.born) / 900;
        if (p < 0 || p > 1) continue;
        ctx!.beginPath();
        ctx!.arc(rg.x, rg.y, 6 + p * 44, 0, Math.PI * 2);
        ctx!.strokeStyle = onDark ? white(0.4 * (1 - p)) : accent(0.35 * (1 - p));
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }

      // myśli płynące krawędziami = wiązki światła (delikatny glow, mały punkt)
      if (onDark) {
        ctx!.shadowColor = "rgba(255,255,255,0.85)";
        ctx!.shadowBlur = 7;
      } else if (!spectrum) {
        ctx!.shadowColor = accent(0.7);
        ctx!.shadowBlur = 6;
      }
      for (const f of flows) {
        const a = nodes[f.a], b = nodes[f.b];
        ctx!.beginPath();
        ctx!.arc(a.x + (b.x - a.x) * f.t, a.y + (b.y - a.y) * f.t, 1.9, 0, Math.PI * 2);
        ctx!.fillStyle = spectrum ? spec(f.b, 0.95) : onDark ? white(1) : accent(0.95);
        ctx!.fill();
      }
      ctx!.shadowBlur = 0;

      // węzły
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        const ap = Math.max(0, Math.min(1, (g - n.born) / 360));
        if (ap <= 0.01) continue;
        const ease = 1 - Math.pow(1 - ap, 3);
        const pulse = n.hub ? 1 + Math.sin(g * 0.002 + n.phase) * 0.12 : 1;
        const fl = flash[i] || 0;
        const r = (n.r * sizeMul * pulse + fl * 2) * ease;
        const bright = n.accent || fl > 0.5;

        if (onDark && (n.hub || bright)) {
          ctx!.shadowColor = "rgba(4,6,26,0.55)";
          ctx!.shadowBlur = 6;
        }
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, r, 0, Math.PI * 2);
        if (bright) ctx!.fillStyle = spectrum ? spec(i, 1) : onDark ? white(1) : accent(0.95);
        else ctx!.fillStyle = spectrum ? spec(i, 0.85) : onDark ? white(0.85) : slate(0.82);
        ctx!.fill();
        ctx!.shadowBlur = 0;

        if (n.hub) {
          ctx!.beginPath();
          ctx!.arc(n.x, n.y, r + 4 + fl * 6, 0, Math.PI * 2);
          ctx!.strokeStyle = spectrum ? spec(i, 0.3 + fl * 0.3) : onDark ? white(0.35 + fl * 0.3) : accent(0.18 + fl * 0.3);
          ctx!.lineWidth = 1;
          ctx!.stroke();
        }
      }
    }

    function step(g: number, ph: Phase) {
      for (const k in flash) {
        flash[+k] *= 0.92;
        if (flash[+k] < 0.01) delete flash[+k];
      }
      for (let i = flows.length - 1; i >= 0; i--) {
        flows[i].t += 0.032;
        if (flows[i].t >= 1) {
          flash[flows[i].b] = 1;
          flows.splice(i, 1);
        }
      }
      for (let i = rings.length - 1; i >= 0; i--) {
        if (g - rings[i].born > 1000) rings.splice(i, 1);
      }
      // ciągły delikatny ruch (kilka myśli), a w ANALIZIE dużo (czytanie plików) + iskrzenie
      if (g > ASSEMBLE && g > nextFlow && hubEdges.length) {
        const cap = ph === "analyze" ? 8 : 4;
        if (flows.length < cap) {
          const e = hubEdges[Math.floor(rnd(0, hubEdges.length))];
          flows.push({ a: e.a, b: e.b, t: 0 });
          nextFlow = g + (ph === "analyze" ? 200 : 650);
        }
      }
      if (ph === "analyze" && nodes.length && Math.random() < 0.14) {
        const i = Math.floor(Math.random() * nodes.length);
        if (g > nodes[i].born) flash[i] = Math.max(flash[i] || 0, 0.8);
      }
    }

    let raf = 0, running = false, t0 = 0, elapsed = 0;
    function frame(now: number) {
      if (!t0) t0 = now - elapsed; // po pauzie kontynuuj (nie gub dodanych folderów)
      const g = now - t0;
      elapsed = g;
      const ph: Phase = phaseRef.current ?? internalPhase(g);
      if (ph !== lastPhase) {
        if (ph === "save" && growthCount < GROW_CAP) growFolder(g);
        lastPhase = ph;
      }
      step(g, ph);
      draw(g);
      raf = requestAnimationFrame(frame);
    }
    function start() {
      if (running || reduce) return;
      running = true;
      t0 = 0;
      raf = requestAnimationFrame(frame);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
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
  }, [tone]);

  return (
    <div ref={wrapRef} className="relative aspect-square w-full max-w-[680px]">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        role="img"
        aria-label="Żywy drugi mózg: graf wiedzy czyta pliki, a przy zapisie wyrasta nowy folder z plikami i podpina się do sieci."
      />
    </div>
  );
}
