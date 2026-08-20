import { useEffect, useState } from 'react';
import { colors, fonts } from '../theme';

// First-impression intro: a count from 00 to 100 while the name wipes up
// into place, then the whole panel slides away. Runs once per page load and
// is skippable by clicking. Respects reduced-motion by finishing instantly.
export default function Preloader({ onDone }) {
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduced) {
      setCount(100);
      setLeaving(true);
      const t = setTimeout(onDone, 100);
      return () => clearTimeout(t);
    }

    let raf;
    const start = performance.now();
    const DURATION = 1500;

    const tick = (now) => {
      const p = Math.min(1, (now - start) / DURATION);
      // ease-out so it decelerates into 100
      const eased = 1 - Math.pow(1 - p, 2.2);
      setCount(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setLeaving(true);
        setTimeout(onDone, 750);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [onDone]);

  const skip = () => {
    setCount(100);
    setLeaving(true);
    setTimeout(onDone, 600);
  };

  return (
    <div
      onClick={skip}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 5000,
        background: colors.dark,
        color: colors.cream,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        transform: leaving ? 'translateY(-100%)' : 'translateY(0)',
        transition: 'transform 0.75s cubic-bezier(0.76,0,0.24,1)',
        cursor: 'pointer',
      }}
    >
      <div style={{ overflow: 'hidden', padding: '0 22px' }}>
        <div
          style={{
            fontFamily: fonts.serif,
            fontSize: 'clamp(30px, 6vw, 68px)',
            fontWeight: 500,
            lineHeight: 1.05,
            textAlign: 'center',
            transform: count > 12 ? 'translateY(0)' : 'translateY(105%)',
            opacity: count > 12 ? 1 : 0,
            transition: 'transform 0.9s cubic-bezier(0.16,1,0.3,1), opacity 0.7s ease',
          }}
        >
          Samuel Raju Bethala
        </div>
      </div>

      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: 4,
          marginTop: 20,
          color: 'oklch(0.75 0.03 85 / 0.6)',
          opacity: count > 35 ? 1 : 0,
          transition: 'opacity 0.6s ease',
          textAlign: 'center',
        }}
      >
        ML × CANCER RESEARCH × DRUG DISCOVERY
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          right: 0,
          padding: '0 clamp(22px, 5vw, 48px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2, color: 'oklch(0.75 0.03 85 / 0.4)' }}>
          CLICK TO SKIP
        </span>
        <span style={{ fontFamily: fonts.mono, fontSize: 'clamp(28px, 6vw, 52px)', lineHeight: 1, color: colors.cream }}>
          {String(count).padStart(3, '0')}
        </span>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: 2,
          width: `${count}%`,
          background: colors.amber,
          transition: 'width 0.1s linear',
        }}
      />
    </div>
  );
}
