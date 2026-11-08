import { useId } from 'react';

// Elementos gráficos originais da versão "Herbário": faixas de pigmento natural
// (borda irregular + manchas de tinta), ramos desenhados a traço e cartela de cor.
// Tudo em SVG, gerado aqui — nenhuma imagem de terceiros.

/* ------------------------------------------------------------------ */
/* Faixa de pigmento (pincelada de tinta natural)                      */
/* ------------------------------------------------------------------ */

interface RibbonProps {
  /** Cores do gradiente, na ordem do traço. */
  colors: string[];
  /** Caminho do traço em coordenadas do viewBox 1000 x 600. */
  d?: string;
  width?: number;
  className?: string;
  /** Semente do ruído: muda o desenho da borda e das manchas. */
  seed?: number;
}

export function DyeRibbon({
  colors,
  d = 'M -40 420 C 140 120, 360 80, 470 300 S 760 560, 1040 180',
  width = 120,
  className,
  seed = 3,
}: RibbonProps) {
  const id = useId().replace(/:/g, '');
  return (
    <svg className={className} viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`g${id}`} x1="0" y1="0" x2="1" y2="0.3">
          {colors.map((c, i) => (
            <stop key={i} offset={`${(i / Math.max(1, colors.length - 1)) * 100}%`} stopColor={c} />
          ))}
        </linearGradient>
        {/* Borda orgânica + pigmento irregular, como tinta natural absorvida pelo papel */}
        <filter id={`f${id}`} filterUnits="userSpaceOnUse" x="-200" y="-300" width="1400" height="1200">
          <feTurbulence type="fractalNoise" baseFrequency="0.006" numOctaves="2" seed={seed} result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="22" xChannelSelector="R" yChannelSelector="G" result="shape" />
          <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed={seed + 3} result="fine" />
          <feDisplacementMap in="shape" in2="fine" scale="5" xChannelSelector="R" yChannelSelector="G" result="edge" />
          {/* manchas suaves de concentração do pigmento */}
          <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed={seed + 7} result="blot" />
          <feColorMatrix in="blot" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.9 1.18" result="mottle" />
          <feComposite in="edge" in2="mottle" operator="in" result="pigment" />
          {/* borda mais escura, como a tinta que acumula na margem da pincelada */}
          <feMorphology in="edge" operator="erode" radius="5" result="inner" />
          <feComposite in="edge" in2="inner" operator="out" result="rim" />
          <feGaussianBlur in="rim" stdDeviation="1.6" result="rimSoft" />
          <feColorMatrix in="rimSoft" type="matrix" values="0.55 0 0 0 0  0 0.55 0 0 0  0 0 0.55 0 0  0 0 0 0.55 0" result="rimDark" />
          <feGaussianBlur in="edge" stdDeviation="5" result="bleed" />
          <feComponentTransfer in="bleed" result="halo">
            <feFuncA type="linear" slope="0.22" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode in="halo" />
            <feMergeNode in="pigment" />
            <feMergeNode in="rimDark" />
          </feMerge>
        </filter>
      </defs>
      <path
        d={d}
        fill="none"
        stroke={`url(#g${id})`}
        strokeWidth={width}
        strokeLinecap="round"
        filter={`url(#f${id})`}
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Ramo desenhado a traço (folhas geradas ao longo do caule)           */
/* ------------------------------------------------------------------ */

interface BranchProps {
  color?: string;
  className?: string;
  leaves?: number;
  /** Folhas mais largas (true) ou finas, tipo capim (false). */
  broad?: boolean;
}

/** Ponto e tangente numa curva de Bézier cúbica. */
function bezier(t: number, p: number[][]) {
  const u = 1 - t;
  const x = u * u * u * p[0][0] + 3 * u * u * t * p[1][0] + 3 * u * t * t * p[2][0] + t * t * t * p[3][0];
  const y = u * u * u * p[0][1] + 3 * u * u * t * p[1][1] + 3 * u * t * t * p[2][1] + t * t * t * p[3][1];
  const dx = 3 * u * u * (p[1][0] - p[0][0]) + 6 * u * t * (p[2][0] - p[1][0]) + 3 * t * t * (p[3][0] - p[2][0]);
  const dy = 3 * u * u * (p[1][1] - p[0][1]) + 6 * u * t * (p[2][1] - p[1][1]) + 3 * t * t * (p[3][1] - p[2][1]);
  return { x, y, angle: (Math.atan2(dy, dx) * 180) / Math.PI };
}

export function Branch({ color = 'currentColor', className, leaves = 9, broad = true }: BranchProps) {
  const stem = [
    [30, 380],
    [90, 260],
    [150, 150],
    [250, 30],
  ];
  const leafW = broad ? 16 : 7;
  const leafL = broad ? 62 : 70;
  const items = Array.from({ length: leaves }, (_, i) => {
    const t = 0.12 + (i / leaves) * 0.85;
    const { x, y, angle } = bezier(t, stem);
    const side = i % 2 === 0 ? 1 : -1;
    const scale = 1 - t * 0.45;
    return { x, y, rot: angle + side * 48, scale, i };
  });
  const leafPath = `M 0 0 C ${leafL * 0.3} ${-leafW}, ${leafL * 0.75} ${-leafW}, ${leafL} 0 C ${leafL * 0.75} ${leafW}, ${leafL * 0.3} ${leafW}, 0 0 Z`;
  return (
    <svg className={className} viewBox="0 0 300 400" fill="none" aria-hidden="true">
      <path
        d={`M ${stem[0].join(' ')} C ${stem[1].join(' ')}, ${stem[2].join(' ')}, ${stem[3].join(' ')}`}
        stroke={color}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {items.map((leaf) => (
        <g key={leaf.i} transform={`translate(${leaf.x} ${leaf.y}) rotate(${leaf.rot}) scale(${leaf.scale})`}>
          <path d={leafPath} stroke={color} strokeWidth="1.6" />
          <path d={`M 2 0 L ${leafL - 6} 0`} stroke={color} strokeWidth="1" opacity="0.7" />
        </g>
      ))}
      {/* sementes na ponta */}
      <circle cx="252" cy="26" r="5" stroke={color} strokeWidth="1.6" />
      <circle cx="266" cy="38" r="3.5" stroke={color} strokeWidth="1.4" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Vagem / semente (elemento de mesa, como num flat-lay)               */
/* ------------------------------------------------------------------ */

export function SeedPod({ color = 'currentColor', className }: { color?: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 220 80" fill="none" aria-hidden="true">
      <path
        d="M 6 44 C 40 6, 150 2, 212 30 C 160 62, 52 76, 6 44 Z"
        fill={color}
        opacity="0.88"
      />
      <path d="M 18 42 C 70 28, 140 24, 198 32" stroke="#f4eadf" strokeWidth="1.2" opacity="0.5" />
      {[40, 78, 116, 152].map((x) => (
        <ellipse key={x} cx={x} cy={36 - (x - 40) * 0.04} rx="11" ry="7" fill="#f4eadf" opacity="0.18" />
      ))}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Textura de papel (grão) para usar como fundo                         */
/* ------------------------------------------------------------------ */

export const paperGrain = `url("data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.21  0 0 0 0 0.11  0 0 0 0 0.07  0 0 0 0.09 0'/></filter><rect width='100%' height='100%' filter='url(#n)'/></svg>`,
)}")`;
