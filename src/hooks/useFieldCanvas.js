import { useEffect, useRef } from 'react';

// Full-viewport background of drifting, twinkling nodes connected by faint
// lines, gently pushed away from the cursor. Two depth layers (a slow,
// dim "far" layer and a livelier "near" layer) give the field a subtle
// sense of depth as it drifts behind the page content.
function makeLayer(count, speed) {
  return Array.from({ length: count }, () => ({
    x: 0,
    y: 0,
    vx: (Math.random() - 0.5) * speed,
    vy: (Math.random() - 0.5) * speed,
    twinkle: Math.random() * Math.PI * 2,
  }));
}

export function useFieldCanvas() {
  const canvasRef = useRef(null);
  const stateRef = useRef({
    far: [],
    near: [],
    mouse: { x: -9999, y: -9999 },
    rafId: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = stateRef.current;

    const place = (nodes, W, H) => {
      nodes.forEach((n) => {
        n.x = Math.random() * W;
        n.y = Math.random() * H;
      });
    };

    const setupField = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      if (!s.far.length) s.far = makeLayer(38, 0.06);
      if (!s.near.length) s.near = makeLayer(46, 0.14);
      place(s.far, W, H);
      place(s.near, W, H);
    };

    const onMove = (e) => {
      s.mouse.x = e.clientX;
      s.mouse.y = e.clientY;
    };

    const stepLayer = (nodes, W, H, pushStrength) => {
      nodes.forEach((n) => {
        let fx = n.vx;
        let fy = n.vy;
        const dx = n.x - s.mouse.x;
        const dy = n.y - s.mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 150 && dist > 0.01) {
          const push = (150 - dist) * pushStrength;
          fx += (dx / dist) * push;
          fy += (dy / dist) * push;
        }
        n.vx = fx * 0.98;
        n.vy = fy * 0.98;
        n.x += n.vx;
        n.y += n.vy;
        n.twinkle += 0.02;
        if (n.x < 0) { n.x = 0; n.vx *= -1; }
        if (n.x > W) { n.x = W; n.vx *= -1; }
        if (n.y < 0) { n.y = 0; n.vy *= -1; }
        if (n.y > H) { n.y = H; n.vy *= -1; }
      });
    };

    const drawLayer = (ctx, nodes, opts) => {
      const { lineOp, dotOp, dotR, linkDist } = opts;
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const d = Math.hypot(dx, dy);
          if (d < linkDist) {
            ctx.strokeStyle = `oklch(0.3 0.04 55 / ${(lineOp * (1 - d / linkDist)).toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach((n) => {
        const tw = 0.6 + Math.sin(n.twinkle) * 0.4;
        ctx.beginPath();
        ctx.arc(n.x, n.y, dotR, 0, Math.PI * 2);
        ctx.fillStyle = `oklch(0.5 0.13 40 / ${(dotOp * tw).toFixed(3)})`;
        ctx.fill();
      });
    };

    const render = () => {
      const ctx = canvas.getContext('2d');
      const W = canvas.width;
      const H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      drawLayer(ctx, s.far, { lineOp: 0.06, dotOp: 0.22, dotR: 1.4, linkDist: 130 });
      drawLayer(ctx, s.near, { lineOp: 0.14, dotOp: 0.4, dotR: 2, linkDist: 150 });
    };

    const loop = () => {
      const W = canvas.width;
      const H = canvas.height;
      stepLayer(s.far, W, H, 0.0012);
      stepLayer(s.near, W, H, 0.0025);
      render();
      s.rafId = requestAnimationFrame(loop);
    };

    setupField();
    window.addEventListener('resize', setupField);
    window.addEventListener('pointermove', onMove);
    loop();

    return () => {
      if (s.rafId) cancelAnimationFrame(s.rafId);
      window.removeEventListener('resize', setupField);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return canvasRef;
}
