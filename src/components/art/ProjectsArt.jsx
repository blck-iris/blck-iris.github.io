// Full-bleed backdrop for the Specimens (Projects) chapter: a scattering of
// faint pin dots, like a corkboard, plus corner-bracket motifs — evoking a
// catalog of pinned specimens.
export default function ProjectsArt() {
  const pins = [];
  let seed = 11;
  const rnd = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let i = 0; i < 34; i++) {
    pins.push({ x: rnd() * 1280, y: rnd() * 900, r: 1.6 + rnd() * 1.4 });
  }

  return (
    <svg
      viewBox="0 0 1280 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1 }}
      aria-hidden="true"
    >
      {pins.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="oklch(0.2 0.035 55)" opacity="0.12" />
      ))}
      {[[70, 70], [1180, 70], [70, 800], [1180, 800]].map(([x, y], i) => (
        <g key={i} opacity="0.16">
          <line x1={x - 18} y1={y} x2={x + 18} y2={y} stroke="oklch(0.56 0.11 75)" strokeWidth="1.4" />
          <line x1={x} y1={y - 18} x2={x} y2={y + 18} stroke="oklch(0.56 0.11 75)" strokeWidth="1.4" />
        </g>
      ))}
    </svg>
  );
}

// A small "pin" glyph used at the top of each specimen card.
export function PinGlyph({ color = 'oklch(0.56 0.11 75)' }) {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <circle cx="7" cy="5" r="4" fill={color} opacity="0.85" />
      <line x1="7" y1="8" x2="7" y2="13" stroke={color} strokeWidth="1.4" opacity="0.6" />
    </svg>
  );
}
