import { useRef } from 'react';

export function useTilt() {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(700px) rotateX(${(-py * 6).toFixed(2)}deg) rotateY(${(px * 6).toFixed(2)}deg) translateY(-2px)`;
    el.style.boxShadow = `${(-px * 14).toFixed(1)}px ${(10 - py * 6).toFixed(1)}px 28px oklch(0.3 0.06 60 / 0.25)`;
  };

  const onMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'none';
    el.style.boxShadow = 'none';
  };

  return { ref, onMouseMove, onMouseLeave };
}
