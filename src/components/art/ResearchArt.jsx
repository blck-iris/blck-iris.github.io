// Full-bleed backdrop for Field Notes (Research): a faint ruled notebook
// page with a margin line, evoking a researcher's field journal. Also
// exports small per-domain icons (DNA helix, molecule, scan/cell, network)
// dropped into each research card so every domain gets its own emblem.
export function FieldNotesBackground() {
  const lines = [];
  for (let y = 40; y < 900; y += 34) lines.push(y);

  return (
    <svg
      viewBox="0 0 1280 900"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: -1 }}
      aria-hidden="true"
    >
      {lines.map((y) => (
        <line key={y} x1="0" y1={y} x2="1280" y2={y} stroke="oklch(0.2 0.035 55)" strokeOpacity="0.06" strokeWidth="1" />
      ))}
      <line x1="150" y1="0" x2="150" y2="900" stroke="oklch(0.46 0.08 145)" strokeOpacity="0.16" strokeWidth="1.4" />
    </svg>
  );
}

const iconProps = { width: 48, height: 48, viewBox: '0 0 48 48', fill: 'none' };

export function DnaIcon({ color = 'oklch(0.46 0.08 145)' }) {
  return (
    <svg {...iconProps} aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const y = 6 + i * 9;
        const phase = i % 2 === 0 ? 0 : Math.PI;
        const x1 = 24 + Math.sin(phase) * 14;
        const x2 = 24 + Math.sin(phase + Math.PI) * 14;
        return (
          <g key={i}>
            <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth="1.2" opacity="0.5" />
            <circle cx={x1} cy={y} r="2.4" fill={color} />
            <circle cx={x2} cy={y} r="2.4" fill={color} opacity="0.4" />
          </g>
        );
      })}
    </svg>
  );
}

export function MoleculeIcon({ color = 'oklch(0.46 0.08 145)' }) {
  return (
    <svg {...iconProps} aria-hidden="true">
      <line x1="24" y1="24" x2="10" y2="12" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <line x1="24" y1="24" x2="38" y2="12" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <line x1="24" y1="24" x2="12" y2="38" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <line x1="24" y1="24" x2="36" y2="38" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="24" cy="24" r="5" fill={color} />
      <circle cx="10" cy="12" r="3" fill={color} opacity="0.6" />
      <circle cx="38" cy="12" r="3" fill={color} opacity="0.6" />
      <circle cx="12" cy="38" r="3" fill={color} opacity="0.6" />
      <circle cx="36" cy="38" r="3" fill={color} opacity="0.6" />
    </svg>
  );
}

export function ScanIcon({ color = 'oklch(0.46 0.08 145)' }) {
  return (
    <svg {...iconProps} aria-hidden="true">
      <rect x="7" y="7" width="34" height="34" rx="3" stroke={color} strokeWidth="1.3" opacity="0.4" />
      <circle cx="24" cy="24" r="10" stroke={color} strokeWidth="1.3" opacity="0.55" />
      <circle cx="24" cy="24" r="4" fill={color} opacity="0.7" />
      <line x1="7" y1="24" x2="14" y2="24" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <line x1="34" y1="24" x2="41" y2="24" stroke={color} strokeWidth="1.2" opacity="0.4" />
    </svg>
  );
}

export function NetworkIcon({ color = 'oklch(0.46 0.08 145)' }) {
  const nodes = [
    [10, 12], [10, 24], [10, 36],
    [24, 8], [24, 24], [24, 40],
    [38, 16], [38, 32],
  ];
  const edges = [
    [0, 3], [0, 4], [1, 3], [1, 4], [1, 5], [2, 4], [2, 5],
    [3, 6], [4, 6], [4, 7], [5, 7],
  ];
  return (
    <svg {...iconProps} aria-hidden="true">
      {edges.map(([a, b], i) => (
        <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={color} strokeWidth="1" opacity="0.35" />
      ))}
      {nodes.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2.6" fill={color} opacity={i === 4 ? 0.9 : 0.55} />
      ))}
    </svg>
  );
}
