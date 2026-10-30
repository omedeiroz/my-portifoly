import React, { useCallback, useEffect, useMemo, useState } from 'react';
import '../styles/Intro.css';

// Linha do tempo da animação (ms)
const T_DRAW0 = 700; // começa a puxar a corda
const T_DRAW1 = 1650; // corda totalmente puxada
const T_RELEASE = 1950; // solta a flecha
const T_HIT = 2380; // flecha acerta o alvo
const T_REVEAL0 = 2550; // começa a revelar o portfólio
const T_END = 3450; // fim da intro

const ARROW_LEN = 96;

const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
const lerp = (a, b, k) => a + (b - a) * k;
const prog = (t, a, b) => clamp((t - a) / (b - a), 0, 1);
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3);
const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const rnd = (i, k) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

function layout(w, h) {
  const portrait = h > w;
  const s = portrait ? clamp(w / 480, 0.55, 1.2) : clamp(Math.min(h / 560, w / 700), 0.55, 1.6);
  const groundY = portrait ? h * 0.72 : h * 0.8;
  const archerX = w > h ? w * 0.2 : w * 0.16;
  const targetX = w > h ? w * 0.76 : w * 0.8;
  const aimY = groundY - 152 * s;
  const r = Math.max(38 * s, 22);
  return { s, groundY, archerX, targetX, aimY, r };
}

function pine(x, base, hgt, wid) {
  const tiers = [
    [1, 0.55, 0.3],
    [0.8, 0.3, 0.42],
    [0.58, 0.08, 0.5],
  ];
  let d = '';
  tiers.forEach(([top, bot, hw]) => {
    const yt = base - hgt * top;
    const yb = base - hgt * bot;
    d += `M${x},${yt} L${x + wid * hw},${yb} L${x - wid * hw},${yb} Z `;
  });
  const tw = wid * 0.06;
  d += `M${x - tw},${base - hgt * 0.1} L${x + tw},${base - hgt * 0.1} L${x + tw},${base} L${x - tw},${base} Z`;
  return d;
}

function Arrow() {
  return (
    <g>
      <line x1={-ARROW_LEN} y1="0" x2="-8" y2="0" stroke="#c9b48a" strokeWidth="1.8" />
      <path d="M0,0 L-11,-3.8 L-8,0 L-11,3.8 Z" fill="#d7dde0" />
      <path d="M-80,0 L-93,-6.5 L-98,-6.5 L-87,0 Z" fill="#a8322a" />
      <path d="M-80,0 L-93,6.5 L-98,6.5 L-87,0 Z" fill="#a8322a" />
    </g>
  );
}

// Arqueiro desenhado em coordenadas locais: origem nos pés, virado para a direita.
function Archer({ handP, stringP, nocked }) {
  const bend = Math.max(0, stringP);
  const hx = lerp(44, -6, handP);
  const hy = lerp(-150, -152, handP);
  const ex = lerp(18, -34, Math.min(handP, 1));
  const ey = lerp(-132, -138, Math.min(handP, 1));
  const tipX = 50 - 6 * bend;
  const top = [tipX, -213 + 5 * bend];
  const bot = [tipX, -87 - 5 * bend];
  const sx = lerp(tipX, -6, stringP);
  const sy = lerp(-150, -152, stringP);
  const ink = '#040706';

  return (
    <g>
      <g fill={ink}>
        {/* capa */}
        <path d="M-10,-150 C-30,-140 -48,-110 -62,-62 C-48,-70 -36,-72 -24,-70 C-24,-100 -18,-125 -2,-146 Z" />
        {/* pernas e botas */}
        <path d="M-12,-92 L-38,-4 L-26,-4 L-2,-86 Z" />
        <path d="M-42,-8 L-22,-8 L-22,0 L-46,0 Z" />
        <path d="M4,-92 L28,-6 L40,-6 L16,-90 Z" />
        <path d="M24,-8 L44,-6 L46,0 L22,0 Z" />
        {/* túnica */}
        <path d="M-16,-152 L12,-152 L20,-108 L26,-80 L-24,-80 L-18,-110 Z" />
        {/* cabeça e chapéu */}
        <circle cx="2" cy="-166" r="12" />
        <path d="M-13,-168 Q-2,-190 15,-176 L20,-170 Q4,-173 -13,-164 Z" />
      </g>
      {/* pena do chapéu */}
      <path d="M-6,-180 Q-20,-196 -32,-208 Q-17,-199 -3,-185 Z" fill="#8a2f22" />
      {/* braço do arco */}
      <path d="M4,-148 L64,-150" stroke={ink} strokeWidth="8" strokeLinecap="round" />
      {/* arco */}
      <path
        d={`M${top} Q${88 + 4 * bend},-150 ${bot}`}
        fill="none"
        stroke="#6b4527"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
      {/* corda */}
      <polyline points={`${top} ${sx},${sy} ${bot}`} fill="none" stroke="#e3d9bd" strokeWidth="1.2" opacity="0.85" />
      {/* flecha encaixada */}
      {nocked && (
        <g transform={`translate(${sx + ARROW_LEN},${sy})`}>
          <Arrow />
        </g>
      )}
      {/* braço que puxa a corda */}
      <polyline
        points={`-4,-146 ${ex},${ey} ${hx},${hy}`}
        fill="none"
        stroke={ink}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
}

const Intro = ({ onFinish }) => {
  const [t, setT] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [size, setSize] = useState({ w: window.innerWidth, h: window.innerHeight });

  useEffect(() => {
    const onResize = () => setSize({ w: window.innerWidth, h: window.innerHeight });
    window.addEventListener('resize', onResize);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('resize', onResize);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  useEffect(() => {
    let raf;
    const start = performance.now();
    const tick = (now) => {
      const el = now - start;
      setT(el);
      if (el >= T_END) {
        onFinish();
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onFinish]);

  const skip = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    setTimeout(onFinish, 350);
  }, [leaving, onFinish]);

  useEffect(() => {
    const onKey = (e) => {
      if (['Escape', 'Enter', ' '].includes(e.key)) skip();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [skip]);

  const { w, h } = size;
  const L = layout(w, h);
  const { s, groundY, archerX, targetX, aimY, r } = L;

  // Cenário (gerado uma vez por tamanho de tela)
  const scenery = useMemo(() => {
    const far = [];
    const near = [];
    const stars = [];
    const nFar = Math.ceil(w / 55) + 2;
    for (let i = 0; i < nFar; i++) {
      const x = (i / (nFar - 1)) * w + (rnd(i, 1) - 0.5) * 40;
      const hgt = (140 + rnd(i, 2) * 120) * s;
      far.push(pine(x, groundY - 6, hgt, hgt * 0.55));
    }
    const nNear = Math.ceil(w / 90) + 2;
    for (let i = 0; i < nNear; i++) {
      const x = (i / (nNear - 1)) * w + (rnd(i, 3) - 0.5) * 60;
      const hgt = (90 + rnd(i, 4) * 90) * s;
      near.push(pine(x, groundY + 4, hgt, hgt * 0.6));
    }
    for (let i = 0; i < 70; i++) {
      stars.push({ x: rnd(i, 5) * w, y: rnd(i, 6) * h * 0.5, r: 0.5 + rnd(i, 7) * 1.2, o: 0.3 + rnd(i, 8) * 0.6 });
    }
    const flies = [];
    for (let i = 0; i < 12; i++) {
      flies.push({ x: rnd(i, 9) * w, y: groundY - rnd(i, 10) * 160 * s, d: rnd(i, 11) * 3 });
    }
    return { far, near, stars, flies };
  }, [w, h, s, groundY]);

  // Puxada da corda
  let handP = 0;
  let stringP = 0;
  if (t < T_RELEASE) {
    const p = easeOutCubic(prog(t, T_DRAW0, T_DRAW1));
    const tremble = t > T_DRAW1 ? 0.012 * Math.sin(t / 28) : 0;
    handP = p + tremble;
    stringP = handP;
  } else {
    const u = t - T_RELEASE;
    handP = 1 + 0.18 * easeOutCubic(prog(t, T_RELEASE, T_RELEASE + 220));
    stringP = 0.14 * Math.exp(-u / 90) * Math.sin(u / 14);
  }

  // Voo da flecha
  const startX = archerX + 90 * s;
  const dist = targetX - startX;
  const arcH = Math.min(40, dist * 0.06);
  const tipAt = (u) => ({ x: startX + dist * u, y: aimY - Math.sin(Math.PI * u) * arcH });
  const flying = t >= T_RELEASE;
  const fu = prog(t, T_RELEASE, T_HIT);
  const tip = tipAt(fu);
  let angle = (Math.atan2(-Math.PI * Math.cos(Math.PI * fu) * arcH, dist) * 180) / Math.PI;
  if (t >= T_HIT) {
    const k = t - T_HIT;
    angle = 3.5 * Math.exp(-k / 160) * Math.sin(k / 22);
  }

  // Rastro
  let trail = '';
  if (flying) {
    const u0 = Math.max(0, fu - 0.3);
    for (let i = 0; i <= 8; i++) {
      const p = tipAt(lerp(u0, fu, i / 8));
      trail += `${i ? 'L' : 'M'}${p.x - ARROW_LEN * s},${p.y} `;
    }
  }
  const trailOpacity = t < T_HIT ? 0.45 : 0.45 * (1 - prog(t, T_HIT, T_HIT + 250));

  // Impacto
  const hitK = prog(t, T_HIT, T_HIT + 380);
  const shake = t >= T_HIT ? 4 * s * Math.exp(-(t - T_HIT) / 120) * Math.sin((t - T_HIT) / 16) : 0;

  // Revelação do portfólio
  const maxR = Math.hypot(Math.max(targetX, w - targetX), Math.max(aimY, h - aimY)) + 20;
  const revealK = easeInOutCubic(prog(t, T_REVEAL0, T_END));
  const R = revealK * maxR;
  const mask =
    R > 0
      ? `radial-gradient(circle at ${targetX}px ${aimY}px, transparent ${R}px, #000 ${R + 1.5}px)`
      : undefined;

  const titleOpacity = prog(t, 300, 1100);

  return (
    <div
      className={`intro${leaving ? ' intro--leaving' : ''}`}
      style={mask ? { WebkitMaskImage: mask, maskImage: mask } : undefined}
      onClick={skip}
      role="presentation"
    >
      <svg viewBox={`0 0 ${w} ${h}`} width={w} height={h} aria-hidden="true">
        <defs>
          <radialGradient id="moonGlow">
            <stop offset="0" stopColor="#f6efd6" stopOpacity="0.45" />
            <stop offset="1" stopColor="#f6efd6" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#0c1a13" />
            <stop offset="1" stopColor="#050b08" />
          </linearGradient>
        </defs>

        {scenery.stars.map((st, i) => (
          <circle key={i} cx={st.x} cy={st.y} r={st.r} fill="#f3ecd6" opacity={st.o} />
        ))}

        <circle cx={w * 0.84} cy={h * 0.2} r={Math.min(w, h) * 0.18} fill="url(#moonGlow)" />
        <circle cx={w * 0.84} cy={h * 0.2} r={Math.min(w, h) * 0.055} fill="#efe7cc" />

        <path d={scenery.far.join(' ')} fill="#183427" />
        <path d={scenery.near.join(' ')} fill="#0f2219" />
        <rect x="0" y={groundY} width={w} height={h - groundY} fill="url(#ground)" />

        {scenery.flies.map((f, i) => (
          <circle
            key={i}
            className="intro-firefly"
            style={{ animationDelay: `${f.d}s` }}
            cx={f.x}
            cy={f.y}
            r={1.8}
            fill="#f2e58a"
          />
        ))}

        {/* Alvo */}
        <g transform={`translate(${targetX + shake},${aimY})`}>
          <g stroke="#2e1d10" strokeWidth={5 * s} strokeLinecap="round">
            <line x1={-r * 0.3} y1={r * 0.5} x2={-r * 0.85} y2={groundY - aimY} />
            <line x1={r * 0.3} y1={r * 0.5} x2={r * 0.85} y2={groundY - aimY} />
            <line x1="0" y1={r * 0.5} x2={r * 0.25} y2={groundY - aimY + 2} />
          </g>
          <circle r={r} fill="#e8dcc0" stroke="#2e1d10" strokeWidth={2 * s} />
          <circle r={r * 0.8} fill="#a8322a" />
          <circle r={r * 0.6} fill="#e8dcc0" />
          <circle r={r * 0.4} fill="#a8322a" />
          <circle r={r * 0.2} fill="#e2b23c" />
        </g>

        <g transform={`translate(${archerX},${groundY}) scale(${s})`}>
          <Archer handP={handP} stringP={stringP} nocked={!flying} />
        </g>

        {flying && (
          <>
            <path d={trail} fill="none" stroke="#f3dca0" strokeWidth={2 * s} strokeLinecap="round" opacity={trailOpacity} />
            <g transform={`translate(${tip.x + (t >= T_HIT ? shake : 0)},${tip.y}) rotate(${angle}) scale(${s})`}>
              <Arrow />
            </g>
          </>
        )}

        {t >= T_HIT && hitK < 1 && (
          <circle cx={targetX} cy={aimY} r={r * (0.4 + 1.6 * hitK)} fill="none" stroke="#f6e3a8" strokeWidth={3 * s} opacity={1 - hitK} />
        )}

        {R > 0 && (
          <circle cx={targetX} cy={aimY} r={R + 4} fill="none" stroke="#f3d38a" strokeWidth="3" opacity={1 - revealK} />
        )}
      </svg>

      <h1 className="intro-title" style={{ opacity: titleOpacity }}>
        Arthur Medeiros
      </h1>

      <button
        type="button"
        className="intro-skip"
        onClick={(e) => {
          e.stopPropagation();
          skip();
        }}
      >
        Pular intro
      </button>
    </div>
  );
};

export default Intro;
