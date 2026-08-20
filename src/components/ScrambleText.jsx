import { useEffect, useRef, useState } from 'react';

const GLYPHS = '▚▘ACGT01∂λ∑#%&/<>*';

// Renders `text` as if it's decoding: each character starts as a random
// glyph and resolves left-to-right. Purely visual — the real string is
// exposed to screen readers via aria-label, and reduced-motion skips it.
export default function ScrambleText({ text, speed = 34, style, as: Tag = 'span', trigger }) {
  const [display, setDisplay] = useState(text);
  const frame = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setDisplay(text);
      return;
    }

    frame.current = 0;
    let last = 0;

    const tick = (now) => {
      if (now - last >= speed) {
        last = now;
        const revealed = frame.current;
        const out = text
          .split('')
          .map((ch, i) => {
            if (ch === ' ' || ch === '\n') return ch;
            if (i < revealed) return ch;
            return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          })
          .join('');
        setDisplay(out);
        frame.current += 1;
        if (frame.current > text.length) {
          setDisplay(text);
          return;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [text, speed, trigger]);

  return (
    <Tag aria-label={text} style={style}>
      <span aria-hidden="true">{display}</span>
    </Tag>
  );
}
