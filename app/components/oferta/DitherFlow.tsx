"use client";

import { useEffect, useRef } from "react";

/**
 * "Liquid dither glass" — fullscreen fragment shader (WebGL1).
 * Domain warp (płynny melt/smear) → chromatic aberration (RGB split) →
 * Bayer dithering (siatka) → paleta brand-blue. Wersja zoptymalizowana:
 * 1-poziomowy warp, 2 oktawy, early-out środka (zasłania go biała kolumna),
 * obniżona rozdzielczość wewnętrzna, throttle, reduced-motion.
 *
 * Tuning: RES_SCALE (koszt + grubość ditheru), w shaderze `levels`, `ca`,
 * `palette()`.
 */

const VERT = `
attribute vec2 a_pos;
void main(){ gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform vec2  u_res;
uniform float u_time;

float hash(vec2 p){
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i), b = hash(i + vec2(1.0,0.0));
  float c = hash(i + vec2(0.0,1.0)), d = hash(i + vec2(1.0,1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a,b,u.x) + (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
}
// 2 oktawy — tanio
float fbm(vec2 p){ return 0.65 * noise(p) + 0.35 * noise(p * 2.05 + 3.0); }

// brand-blue: indygo → accent (#2656d9) → biel
vec3 palette(float f, vec2 q){
  vec3 cDark   = vec3(0.05, 0.08, 0.22);
  vec3 cAccent = vec3(0.149, 0.337, 0.851);
  vec3 cBlue   = vec3(0.42, 0.54, 0.92);
  vec3 cGray   = vec3(0.62, 0.66, 0.80);
  vec3 cLight  = vec3(0.90, 0.93, 0.99);
  vec3 col = mix(cDark, cAccent, smoothstep(0.2, 0.6, f));
  col = mix(col, cBlue,  smoothstep(0.45, 0.9, length(q)));
  col = mix(col, cGray,  smoothstep(0.35, 0.75, q.x));
  col = mix(col, cLight, smoothstep(0.72, 0.98, f * length(q) + 0.1));
  return col;
}

vec3 scene(vec2 uv){
  vec2 p = uv * 2.4;
  p.x *= u_res.x / u_res.y;
  float t = u_time * 0.025;
  // domain warp (1 poziom) — płynny melt/smear
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(3.1, 1.7) - t));
  float f = fbm(p + 2.4 * q);
  return palette(f, q);
}

// ordered dithering — Bayer 8x8
float bayer2(vec2 a){ a = floor(a); return fract(dot(a, vec2(0.5, a.y * 0.75))); }
#define bayer4(a) (bayer2(0.5 * (a)) * 0.25 + bayer2(a))
#define bayer8(a) (bayer4(0.5 * (a)) * 0.25 + bayer2(a))

void main(){
  vec2 uv = gl_FragCoord.xy / u_res.xy;

  // chromatic aberration — 2 sample (R z offsetem, reszta z bazy)
  vec2 dir = uv - 0.5;
  float ca = 0.006;
  vec3 base = scene(uv);
  float R = scene(uv + dir * ca).r;
  vec3 col = vec3(R, base.g, base.b);

  // Bayer dither + posteryzacja
  float levels = 6.0;
  float d = bayer8(gl_FragCoord.xy) - 0.5;
  col += d / levels;
  col = floor(col * levels + 0.5) / levels;

  gl_FragColor = vec4(col, 1.0);
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

const RES_SCALE = 0.55; // bufor = tylko viewport (fixed), więc stać na wyższą jakość

export function DitherFlow({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      (canvas.getContext("webgl", { antialias: false, alpha: false }) as
        | WebGLRenderingContext
        | null) ||
      (canvas.getContext("experimental-webgl") as WebGLRenderingContext | null);
    if (!gl) return;

    const vert = compile(gl, gl.VERTEX_SHADER, VERT);
    const frag = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vert || !frag) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vert);
    gl.attachShader(prog, frag);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");

    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * RES_SCALE));
      const h = Math.max(1, Math.floor(canvas.clientHeight * RES_SCALE));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    let raf = 0;
    let start = 0;
    let last = 0;
    const frameMs = 1000 / 30;
    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (now - last < frameMs) return;
      last = now;
      if (!start) start = now;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    if (reduce) {
      gl.uniform1f(uTime, 8.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      gl.deleteProgram(prog);
      gl.deleteShader(vert);
      gl.deleteShader(frag);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className}
      style={{ display: "block", width: "100%", height: "100%" }}
    />
  );
}
