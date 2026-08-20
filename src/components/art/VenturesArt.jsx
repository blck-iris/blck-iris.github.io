// Full-bleed backdrop for the Growth (Ventures) chapter: a sprouting stem
// on the left rises and its leaves gradually resolve into straight,
// architectural lines on the right — the visual argument of the page:
// an idea grown into a structure.
export default function VenturesArt() {
  return (
    <svg
      viewBox="0 0 1280 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1 }}
      aria-hidden="true"
    >
      {/* ground line */}
      <line x1="0" y1="760" x2="1280" y2="760" stroke="oklch(0.2 0.035 55)" strokeOpacity="0.15" strokeWidth="1.2" />

      {/* stem */}
      <path
        d="M 130 760 C 120 650, 150 560, 120 460 C 95 380, 140 300, 120 210"
        fill="none"
        stroke="oklch(0.5 0.12 30)"
        strokeWidth="2"
        opacity="0.4"
      />
      {/* organic leaves, left side */}
      {[
        'M 120 640 C 60 620, 40 570, 70 540 C 100 560, 120 600, 120 640 Z',
        'M 130 520 C 190 500, 210 460, 190 430 C 150 440, 125 480, 130 520 Z',
        'M 118 380 C 60 365, 45 320, 75 295 C 105 310, 122 345, 118 380 Z',
      ].map((d, i) => (
        <path key={i} d={d} fill="oklch(0.46 0.08 145)" opacity={0.12 + i * 0.02} />
      ))}

      {/* transition: leaves straightening into girders toward the right */}
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const x = 420 + i * 130;
        const h = 120 + i * 70;
        return (
          <rect
            key={i}
            x={x}
            y={760 - h}
            width="26"
            height={h}
            fill="none"
            stroke="oklch(0.5 0.12 30)"
            strokeWidth="1.3"
            opacity={0.1 + i * 0.03}
          />
        );
      })}
      {/* roofline connecting the structure */}
      <polyline
        points="420,600 550,530 680,470 810,410 940,350 1070,290 1200,240"
        fill="none"
        stroke="oklch(0.5 0.12 30)"
        strokeWidth="1.4"
        opacity="0.28"
      />
    </svg>
  );
}
