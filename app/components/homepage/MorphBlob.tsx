"use client";

import { useEffect, useRef } from "react";

/**
 * Organiczna, morfujaca membrana (OGL fragment shader). Worley-cell walls +
 * domain-warp + oddychajaca grubosc scian = porowaty ksztalt, ktory plynnie
 * morfuje (gesta siatka <-> rzadkie pierscienie). Szary na transparentnym tle.
 * prefers-reduced-motion -> statyczna klatka (renderuje 1x, bez petli).
 */
type Props = {
  className?: string;
  /** rgb 0..1, domyslnie szary */
  color?: [number, number, number];
  /** tempo morfowania */
  speed?: number;
};

const VERT = `
attribute vec2 position;
attribute vec2 uv;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform vec2 uRes;
uniform vec3 uColor;

vec2 hash2(vec2 p) {
  p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
  return fract(sin(p) * 43758.5453);
}

// worley: zwraca F1 (najblizszy) i F2 (drugi)
vec2 worley(vec2 p, float t) {
  vec2 n = floor(p);
  vec2 f = fract(p);
  float f1 = 8.0;
  float f2 = 8.0;
  for (int j = -1; j <= 1; j++) {
    for (int i = -1; i <= 1; i++) {
      vec2 g = vec2(float(i), float(j));
      vec2 o = hash2(n + g);
      o = 0.5 + 0.5 * sin(t + 6.2831 * o);
      vec2 r = g + o - f;
      float d = dot(r, r);
      if (d < f1) { f2 = f1; f1 = d; }
      else if (d < f2) { f2 = d; }
    }
  }
  return vec2(sqrt(f1), sqrt(f2));
}

void main() {
  vec2 uv = vUv - 0.5;
  uv.x *= uRes.x / uRes.y;

  float t = uTime;

  // domain warp dla organicznego plyniecia
  vec2 p = uv * 3.2;
  p += 0.35 * vec2(sin(t * 0.8 + uv.y * 3.0), cos(t * 0.7 + uv.x * 3.0));

  vec2 w = worley(p, t * 0.9);
  float edge = w.y - w.x;

  // sciany komorek: tam gdzie edge male. Grubosc oddycha w czasie = morf gesta<->rzadka
  float thick = 0.14 + 0.11 * sin(t * 0.6);
  float wall = 1.0 - smoothstep(0.0, thick, edge);

  // miekka maska (oddychajacy blob, lekko niekolisty)
  float warp = 0.06 * sin(t * 0.5 + atan(uv.y, uv.x) * 3.0);
  float rad = length(uv) + warp;
  float mask = 1.0 - smoothstep(0.40, 0.58, rad);

  float a = clamp(wall * mask, 0.0, 1.0);
  // lekkie zageszczenie w srodku
  a *= 0.85 + 0.15 * (1.0 - smoothstep(0.0, 0.5, rad));

  gl_FragColor = vec4(uColor, a);
}
`;

export function MorphBlob({
  className,
  color = [0.45, 0.45, 0.47],
  speed = 0.25,
}: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let raf = 0;
    let destroyed = false;
    const cleanups: (() => void)[] = [];

    (async () => {
      const { Renderer, Triangle, Program, Mesh } = await import("ogl");
      if (destroyed) return;

      const renderer = new Renderer({
        alpha: true,
        dpr: Math.min(2, window.devicePixelRatio || 1),
      });
      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      wrap.appendChild(gl.canvas);
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.display = "block";

      const geometry = new Triangle(gl);
      const program = new Program(gl, {
        vertex: VERT,
        fragment: FRAG,
        transparent: true,
        uniforms: {
          uTime: { value: 0 },
          uRes: { value: [1, 1] },
          uColor: { value: color },
        },
      });
      const mesh = new Mesh(gl, { geometry, program });

      const resize = () => {
        const w = wrap.clientWidth || 1;
        const h = wrap.clientHeight || 1;
        renderer.setSize(w, h);
        program.uniforms.uRes.value = [w, h];
      };
      resize();
      window.addEventListener("resize", resize);
      cleanups.push(() => window.removeEventListener("resize", resize));

      if (reduce) {
        program.uniforms.uTime.value = 2.0;
        renderer.render({ scene: mesh });
      } else {
        const start = performance.now();
        const update = () => {
          raf = requestAnimationFrame(update);
          program.uniforms.uTime.value =
            ((performance.now() - start) / 1000) * speed * 4.0;
          renderer.render({ scene: mesh });
        };
        update();
        cleanups.push(() => cancelAnimationFrame(raf));
      }

      cleanups.push(() => {
        const ext = gl.getExtension("WEBGL_lose_context");
        ext?.loseContext();
        gl.canvas.remove();
      });
    })();

    return () => {
      destroyed = true;
      cleanups.forEach((c) => c());
    };
  }, [color, speed]);

  return <div ref={wrapRef} className={className} aria-hidden="true" />;
}
