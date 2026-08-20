import { useEffect, useRef, useState } from 'react';

// Counts a numeric value up from zero the first time it scrolls into view.
// Accepts strings like "94.74%", "2.59M", "5.9ms", "0.982" — it animates
// the number and preserves any prefix/suffix exactly.
export function useCountUp(value, { duration = 1200 } = {}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(value);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const match = String(value).match(/^(\D*?)([\d.]+)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }
    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr);
    const decimals = (numStr.split('.')[1] || '').length;

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setDisplay(value);
      return;
    }

    setDisplay(`${prefix}${(0).toFixed(decimals)}${suffix}`);

    let raf;
    const run = () => {
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - p, 3);
        setDisplay(`${prefix}${(target * eased).toFixed(decimals)}${suffix}`);
        if (p < 1) raf = requestAnimationFrame(tick);
        else setDisplay(value);
      };
      raf = requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && !started.current) {
            started.current = true;
            run();
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);

    return () => {
      obs.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return { ref, display };
}
