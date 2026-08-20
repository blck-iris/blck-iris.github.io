// Slow-drifting, blurred color blobs sitting behind the particle field and
// page content. Pure CSS (transform + keyframes), so it costs almost
// nothing to render but gives the whole site a sense of ambient motion.
export default function AuroraBackground() {
  const blobs = [
    { top: '-10%', left: '5%', size: 520, color: 'oklch(0.6 0.1 40 / 0.22)', anim: 'auroraDriftA 26s ease-in-out infinite' },
    { top: '10%', left: '65%', size: 620, color: 'oklch(0.55 0.08 145 / 0.14)', anim: 'auroraDriftB 32s ease-in-out infinite' },
    { top: '60%', left: '15%', size: 560, color: 'oklch(0.55 0.11 30 / 0.16)', anim: 'auroraDriftC 30s ease-in-out infinite' },
    { top: '70%', left: '70%', size: 480, color: 'oklch(0.6 0.09 75 / 0.13)', anim: 'auroraDriftA 24s ease-in-out infinite reverse' },
  ];

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -2,
        overflow: 'hidden',
        pointerEvents: 'none',
      }}
    >
      {blobs.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${b.color} 0%, transparent 70%)`,
            filter: 'blur(40px)',
            animation: b.anim,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  );
}
