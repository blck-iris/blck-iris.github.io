import { CHAPTERS, colors, fonts } from '../theme';
import { useState } from 'react';

// Always-visible vertical rail pinned to the right edge: one dot per
// chapter, active one filled and enlarged, with the label sliding out on
// hover. Gives constant "where am I / where can I go" orientation without
// occupying horizontal space. Hidden on narrow screens (the top bar covers
// navigation there).
export default function DotRail({ page, onNavigate }) {
  const [hovered, setHovered] = useState(null);

  return (
    <nav
      className="dot-rail"
      aria-label="Chapters"
      style={{
        position: 'fixed',
        right: 22,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 120,
        display: 'flex',
        flexDirection: 'column',
        gap: 16,
        alignItems: 'flex-end',
      }}
    >
      {CHAPTERS.map((c) => {
        const active = c.key === page;
        const show = hovered === c.key;
        return (
          <button
            key={c.key}
            onClick={() => onNavigate(c.key)}
            onMouseEnter={() => setHovered(c.key)}
            onMouseLeave={() => setHovered(null)}
            data-cursor-hover
            aria-current={active ? 'page' : undefined}
            title={`${c.numeral} · ${c.label}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'transparent',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: 1,
                whiteSpace: 'nowrap',
                color: active ? colors.ink : colors.inkMuted,
                opacity: show || active ? 1 : 0,
                transform: show || active ? 'translateX(0)' : 'translateX(8px)',
                transition: 'opacity 0.25s ease, transform 0.25s ease',
                background: 'oklch(0.95 0.025 85 / 0.75)',
                padding: '2px 6px',
                borderRadius: 3,
              }}
            >
              {c.numeral} · {c.label}
            </span>
            <span
              style={{
                width: active ? 12 : 7,
                height: active ? 12 : 7,
                borderRadius: '50%',
                background: active ? c.accent : 'transparent',
                border: `1.5px solid ${active ? c.accent : colors.inkMuted}`,
                transition: 'all 0.25s ease',
                flexShrink: 0,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}
