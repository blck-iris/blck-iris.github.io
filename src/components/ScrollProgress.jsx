import { useEffect, useState } from 'react';
import { chapterFor } from '../theme';

// Thin bar showing how far down the current chapter the reader is. Tinted
// with the active chapter's accent so it reinforces where you are.
export default function ScrollProgress({ page }) {
  const [pct, setPct] = useState(0);
  const accent = chapterFor(page).accent;

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      setPct(max > 0 ? (h.scrollTop / max) * 100 : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [page]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 76,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 150,
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          background: accent,
          transition: 'background 0.4s ease',
        }}
      />
    </div>
  );
}
