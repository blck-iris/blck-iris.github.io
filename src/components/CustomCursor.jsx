import { useEffect, useRef } from 'react';

// A small ring that follows the mouse with easing, and expands whenever
// it's hovering something clickable. Desktop-only (auto-hidden on touch).
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch) return;

    document.body.style.cursor = 'none';

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%,-50%)`;
      }
      const target = e.target;
      const interactive = target.closest('a, button, [role="button"], [data-cursor-hover]');
      if (ringRef.current) {
        ringRef.current.style.width = interactive ? '46px' : '26px';
        ringRef.current.style.height = interactive ? '46px' : '26px';
        ringRef.current.style.borderColor = interactive ? 'oklch(0.5 0.13 40)' : 'oklch(0.2 0.035 55 / 0.5)';
      }
    };

    let rafId;
    const loop = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.18;
      ring.current.y += (pos.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%,-50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener('pointermove', onMove);
    loop();

    return () => {
      document.body.style.cursor = '';
      window.removeEventListener('pointermove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 5,
          height: 5,
          borderRadius: '50%',
          background: 'oklch(0.5 0.13 40)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'opacity 0.2s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 26,
          height: 26,
          borderRadius: '50%',
          border: '1.4px solid oklch(0.2 0.035 55 / 0.5)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'width 0.2s ease, height 0.2s ease, border-color 0.2s ease',
        }}
      />
    </>
  );
}
