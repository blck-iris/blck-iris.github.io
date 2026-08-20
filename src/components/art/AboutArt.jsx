// Full-bleed backdrop for the Origin (About) chapter: tree growth-rings
// radiating from a point off the left edge, with a few root-like branching
// lines threading down — an origin-story, rings-of-growth motif.
export default function AboutArt() {
  const cx = -60;
  const cy = 260;
  const rings = [90, 160, 235, 315, 400, 490];

  const root = (path, opacity) => (
    <path d={path} fill="none" stroke="oklch(0.48 0.1 35)" strokeWidth="1.3" opacity={opacity} />
  );

  return (
    <svg
      viewBox="0 0 1280 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1 }}
      aria-hidden="true"
    >
      {rings.map((r, i) => (
        <circle
          key={r}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="oklch(0.2 0.035 55)"
          strokeOpacity={0.14 - i * 0.012}
          strokeWidth="1.2"
        />
      ))}

      {root('M -60 260 C 120 340, 180 460, 260 620', 0.18)}
      {root('M -60 260 C 100 300, 220 320, 340 400', 0.14)}
      {root('M -60 260 C 60 180, 160 140, 300 120', 0.14)}
      {root('M 260 620 C 300 680, 380 700, 460 760', 0.12)}
      {root('M 340 400 C 420 430, 480 500, 560 520', 0.1)}

      <circle cx={cx} cy={cy} r="5" fill="oklch(0.48 0.1 35)" opacity="0.4" />
    </svg>
  );
}
