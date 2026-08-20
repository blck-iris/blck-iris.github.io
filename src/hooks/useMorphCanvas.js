import { useEffect, useRef, useState } from 'react';

// A field of particles that continuously morphs between five shapes, each
// standing in for a research thread (chemistry, ML, cell imaging,
// biophysics, diagnostics). Particles glow, leave soft trails, connect with
// gradient-lit edges while "holding" a shape, and gently scatter away from
// the cursor for a tactile, alive feel.
function seededRandom(seed) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildShapes(W, H, N) {
  const cx = W / 2;
  const cy = H / 2;
  // Shapes were designed for a ~420px box; scale every offset so they read
  // well whether the canvas is a small panel or a full-viewport hero.
  const s = Math.min(W, H) / 420;

  const molecule = [];
  const ringsM = 3;
  const perRing = Math.ceil(N / ringsM);
  for (let r = 0; r < ringsM; r++) {
    const radius = (40 + r * 55) * s;
    for (let i = 0; i < perRing && molecule.length < N; i++) {
      const a = (Math.PI * 2 * i) / perRing;
      molecule.push({ x: cx + Math.cos(a) * radius, y: cy + Math.sin(a) * radius });
    }
  }
  const moleculeEdges = [];
  for (let r = 0; r < ringsM; r++) {
    for (let i = 0; i < perRing; i++) {
      const a = r * perRing + i;
      const b = r * perRing + ((i + 1) % perRing);
      moleculeEdges.push([a, b]);
    }
  }

  const nn = [];
  const layers = [6, 9, 12, 9, 6];
  const lx = [cx - 160 * s, cx - 80 * s, cx, cx + 80 * s, cx + 160 * s];
  const nnEdges = [];
  let offsets = [];
  let running = 0;
  layers.forEach((count) => {
    offsets.push(running);
    running += count;
  });
  layers.forEach((count, li) => {
    for (let i = 0; i < count; i++) {
      const y = cy - ((count - 1) * 15 * s) + i * 30 * s;
      nn.push({ x: lx[li], y });
    }
  });
  while (nn.length < N) nn.push({ x: cx, y: cy });
  layers.forEach((count, li) => {
    if (li === layers.length - 1) return;
    const nextCount = layers[li + 1];
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < nextCount; j++) {
        if ((i + j) % 3 === 0) nnEdges.push([offsets[li] + i, offsets[li + 1] + j]);
      }
    }
  });

  const cluster = [];
  const rnd = seededRandom(7);
  for (let i = 0; i < N; i++) {
    const a = rnd() * Math.PI * 2;
    const r = Math.sqrt(rnd()) * 150 * s;
    cluster.push({ x: cx + Math.cos(a) * r, y: cy + Math.sin(a) * r });
  }

  const helix = [];
  const helixEdges = [];
  const half = Math.floor(N / 2);
  for (let i = 0; i < N; i++) {
    const strand = i < half ? 0 : 1;
    const t = (i % half) / half;
    const phase = strand === 0 ? 0 : Math.PI;
    helix.push({
      x: cx - 150 * s + t * 300 * s,
      y: cy + Math.sin(t * Math.PI * 4 + phase) * 90 * s,
    });
    if (strand === 0 && (i % half) % 3 === 0) helixEdges.push([i, i + half]);
  }

  const grid = [];
  const cols = 7;
  const rows = Math.ceil(N / cols);
  for (let i = 0; i < N; i++) {
    const col = i % cols;
    const row = Math.floor(i / cols);
    grid.push({
      x: cx - 150 * s + col * (300 * s / (cols - 1)),
      y: cy - 120 * s + row * (240 * s / (rows - 1 || 1)),
    });
  }

  return [
    { name: 'molecule', label: 'Chemistry', pts: molecule, edges: moleculeEdges },
    { name: 'nn', label: 'Machine Learning', pts: nn, edges: nnEdges },
    { name: 'cluster', label: 'Cell & Tissue Imaging', pts: cluster, edges: [] },
    { name: 'helix', label: 'Molecular Biophysics', pts: helix, edges: helixEdges },
    { name: 'grid', label: 'Diagnostic Imaging', pts: grid, edges: [] },
  ];
}

export function useMorphCanvas({ animate = true } = {}) {
  const canvasRef = useRef(null);
  const [shapeLabel, setShapeLabel] = useState('Chemistry');
  const stateRef = useRef({
    morph: null,
    mouse: { x: -9999, y: -9999, active: false },
    rafId: null,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = stateRef.current;
    const N = 44;

    const setup = () => {
      const W = canvas.clientWidth || 420;
      const H = canvas.clientHeight || 420;
      canvas.width = W;
      canvas.height = H;
      const shapes = buildShapes(W, H, N);
      const particles = shapes[0].pts.map((p) => ({
        x: p.x,
        y: p.y,
        ox: 0,
        oy: 0,
        pulse: Math.random() * Math.PI * 2,
      }));
      s.morph = { shapes, particles, idx: 0, next: 1, t: 0, holding: true, holdTimer: 0 };
    };

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      s.mouse.x = e.clientX - rect.left;
      s.mouse.y = e.clientY - rect.top;
      s.mouse.active = true;
    };
    const onLeave = () => {
      s.mouse.active = false;
    };

    const morphStep = () => {
      const m = s.morph;
      if (!m) return;
      const from = m.shapes[m.idx].pts;
      const to = m.shapes[m.next].pts;
      if (m.holding) {
        m.holdTimer++;
        if (m.holdTimer > 160) {
          m.holding = false;
          m.t = 0;
        }
      } else {
        m.t += 0.016;
        const tt = m.t >= 1 ? 1 : 1 - Math.pow(1 - m.t, 3);
        m.particles.forEach((p, i) => {
          p.x = from[i].x + (to[i].x - from[i].x) * tt;
          p.y = from[i].y + (to[i].y - from[i].y) * tt;
        });
        if (m.t >= 1) {
          m.idx = m.next;
          m.next = (m.next + 1) % m.shapes.length;
          m.holding = true;
          m.holdTimer = 0;
          const label = m.shapes[m.idx].label;
          setShapeLabel((prev) => (prev !== label ? label : prev));
        }
      }

      // Gentle cursor repulsion, layered on top of the base morph position.
      m.particles.forEach((p) => {
        let ox = p.ox * 0.86;
        let oy = p.oy * 0.86;
        if (s.mouse.active) {
          const dx = p.x + ox - s.mouse.x;
          const dy = p.y + oy - s.mouse.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 70 && dist > 0.01) {
            const push = (70 - dist) * 0.18;
            ox += (dx / dist) * push;
            oy += (dy / dist) * push;
          }
        }
        p.ox = ox;
        p.oy = oy;
        p.pulse += 0.04;
      });
    };

    const render = () => {
      const m = s.morph;
      if (!m) return;
      const ctx = canvas.getContext('2d');
      const W = canvas.width;
      const H = canvas.height;

      // Soft trailing clear for a subtle motion-blur glow — matches the
      // page background so it blends into the hero's vignette overlay.
      ctx.fillStyle = 'oklch(0.95 0.025 85 / 0.22)';
      ctx.fillRect(0, 0, W, H);

      const ink = 'oklch(0.2 0.035 55)';
      const amber = 'oklch(0.5 0.13 40)';

      if (m.shapes[m.idx].edges.length) {
        const fade = m.holding ? 1 : Math.max(0, 1 - m.t * 1.6);
        ctx.lineWidth = 1.1;
        ctx.strokeStyle = `oklch(0.32 0.04 55 / ${(0.28 * fade).toFixed(3)})`;
        m.shapes[m.idx].edges.forEach(([a, b]) => {
          const pa = m.particles[a];
          const pb = m.particles[b];
          if (!pa || !pb) return;
          ctx.beginPath();
          ctx.moveTo(pa.x + pa.ox, pa.y + pa.oy);
          ctx.lineTo(pb.x + pb.ox, pb.y + pb.oy);
          ctx.stroke();
        });
      }

      m.particles.forEach((p, i) => {
        const accent = i % 7 === 0;
        const pulse = 0.7 + Math.sin(p.pulse) * 0.3;
        const r = (accent ? 4.2 : 2.6) * (accent ? pulse : 1);
        const x = p.x + p.ox;
        const y = p.y + p.oy;

        if (accent) {
          ctx.save();
          ctx.shadowColor = amber;
          ctx.shadowBlur = 10;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = amber;
          ctx.globalAlpha = 0.95;
          ctx.fill();
          ctx.restore();
        } else {
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fillStyle = ink;
          ctx.globalAlpha = 0.5;
          ctx.fill();
        }
        ctx.globalAlpha = 1;
      });
    };

    const loop = () => {
      if (animate) morphStep();
      render();
      s.rafId = requestAnimationFrame(loop);
    };

    setup();
    canvas.addEventListener('pointermove', onMove);
    canvas.addEventListener('pointerleave', onLeave);
    loop();

    return () => {
      if (s.rafId) cancelAnimationFrame(s.rafId);
      canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerleave', onLeave);
    };
  }, [animate]);

  return { canvasRef, shapeLabel };
}
