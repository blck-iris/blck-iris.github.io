// Full-bleed backdrop for the Manuscript (Publications) chapter: a faint
// ink blot bleeding from the corner, a quill-flourish line, and close-set
// manuscript ruling — the page reads as if annotated in the margins.
export default function PublicationsArt() {
  return (
    <svg
      viewBox="0 0 1280 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1 }}
      aria-hidden="true"
    >
      {/* ink blot, top-right */}
      <path
        d="M 1180 40 C 1260 20, 1320 80, 1300 140 C 1340 170, 1320 230, 1270 220 C 1250 270, 1180 260, 1170 210 C 1120 210, 1110 150, 1150 120 C 1130 70, 1150 40, 1180 40 Z"
        fill="oklch(0.38 0.06 255)"
        opacity="0.1"
      />

      {/* manuscript ruling */}
      {Array.from({ length: 22 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1={60 + i * 30}
          x2="1280"
          y2={60 + i * 30}
          stroke="oklch(0.2 0.035 55)"
          strokeOpacity="0.045"
          strokeWidth="1"
        />
      ))}

      {/* quill flourish, bottom-left */}
      <path
        d="M -20 820 C 120 760, 180 860, 320 800 C 420 760, 460 840, 580 800"
        fill="none"
        stroke="oklch(0.38 0.06 255)"
        strokeWidth="1.6"
        opacity="0.22"
      />
    </svg>
  );
}
