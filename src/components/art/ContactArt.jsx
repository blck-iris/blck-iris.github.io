// Full-bleed backdrop for the Trailhead (Contact) chapter: a compass rose
// anchored near the content, with a dotted path leading off the right edge
// of the page — the journey doesn't end here, it continues with whoever's
// reading.
export default function ContactArt() {
  const cx = 1080;
  const cy = 260;
  const r = 130;

  return (
    <svg
      viewBox="0 0 1280 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1 }}
      aria-hidden="true"
    >
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="oklch(0.58 0.14 55)" strokeWidth="1.3" opacity="0.22" />
      <circle cx={cx} cy={cy} r={r * 0.6} fill="none" stroke="oklch(0.58 0.14 55)" strokeWidth="1" opacity="0.18" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const inner = deg % 90 === 0 ? r * 0.6 : r * 0.85;
        const x1 = cx + Math.cos(rad) * inner;
        const y1 = cy + Math.sin(rad) * inner;
        const x2 = cx + Math.cos(rad) * r;
        const y2 = cy + Math.sin(rad) * r;
        return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2} stroke="oklch(0.58 0.14 55)" strokeWidth="1.2" opacity="0.3" />;
      })}
      <polygon points={`${cx},${cy - r * 0.72} ${cx - 8},${cy} ${cx},${cy + r * 0.28} ${cx + 8},${cy}`} fill="oklch(0.58 0.14 55)" opacity="0.35" />

      <path
        d="M -20 620 C 200 640, 380 560, 560 600 S 900 640, 1280 560"
        fill="none"
        stroke="oklch(0.58 0.14 55)"
        strokeWidth="2"
        strokeDasharray="1 13"
        strokeLinecap="round"
        opacity="0.4"
      />
    </svg>
  );
}
