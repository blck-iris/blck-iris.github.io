import { useEffect, useState } from 'react';
import { CHAPTERS, colors, fonts, chapterFor, asset } from '../theme';

export default function Header({ page, onNavigate, menuOpen, onToggleMenu }) {
  const [scrolled, setScrolled] = useState(false);
  const chapter = chapterFor(page);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="gutter"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        height: 76,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 20,
        padding: '0 48px',
        background: scrolled ? 'oklch(0.95 0.025 85 / 0.92)' : 'oklch(0.95 0.025 85 / 0.6)',
        backdropFilter: 'blur(14px)',
        borderBottom: `1px solid ${colors.borderSoft}`,
        transition: 'background 0.3s ease',
      }}
    >
      <div
        onClick={() => onNavigate('home')}
        data-cursor-hover
        style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', flexShrink: 0 }}
      >
        <svg viewBox="0 0 40 40" style={{ width: 30, height: 30, color: colors.ink }}>
          <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="1.3" opacity="0.35" />
          <line x1="20" y1="6" x2="20" y2="15" stroke="currentColor" strokeWidth="1.2" />
          <line x1="20" y1="25" x2="20" y2="34" stroke="currentColor" strokeWidth="1.2" />
          <line x1="6" y1="20" x2="15" y2="20" stroke="currentColor" strokeWidth="1.2" />
          <line x1="25" y1="20" x2="34" y2="20" stroke="currentColor" strokeWidth="1.2" />
          <line x1="20" y1="15" x2="15" y2="20" stroke="currentColor" strokeWidth="1.2" />
          <line x1="20" y1="15" x2="25" y2="20" stroke="currentColor" strokeWidth="1.2" />
          <line x1="20" y1="25" x2="15" y2="20" stroke="currentColor" strokeWidth="1.2" />
          <line x1="20" y1="25" x2="25" y2="20" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="20" cy="20" r="6" fill={chapter.accent} />
          <circle cx="20" cy="15" r="2" fill="currentColor" />
          <circle cx="20" cy="25" r="2" fill="currentColor" />
          <circle cx="15" cy="20" r="2" fill="currentColor" />
          <circle cx="25" cy="20" r="2" fill="currentColor" />
        </svg>
        <span className="header-wordmark" style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1, color: colors.ink }}>
          S.R.B.
        </span>
      </div>

      {/* Always-visible chapter links — the primary way around the site. */}
      <nav className="header-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {CHAPTERS.map((c) => {
          const active = c.key === page;
          return (
            <button
              key={c.key}
              onClick={() => onNavigate(c.key)}
              data-cursor-hover
              aria-current={active ? 'page' : undefined}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '8px 10px',
                fontFamily: fonts.mono,
                fontSize: 11,
                letterSpacing: 1,
                textTransform: 'uppercase',
                color: active ? colors.ink : colors.inkMuted,
                borderBottom: `1.5px solid ${active ? c.accent : 'transparent'}`,
                transition: 'color 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = colors.ink; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = active ? colors.ink : colors.inkMuted; }}
            >
              {c.label}
            </button>
          );
        })}
        <a
          href={asset('assets/Samuel_CV_Research.pdf')}
          target="_blank"
          rel="noreferrer"
          data-cursor-hover
          style={{
            marginLeft: 10,
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: 0.5,
            padding: '8px 14px',
            border: `1px solid ${colors.ink}`,
            borderRadius: 2,
            color: colors.ink,
            whiteSpace: 'nowrap',
          }}
        >
          CV ↓
        </a>
      </nav>

      {/* Compact toggle — only shown on narrow screens, where the inline
          chapter links don't fit. */}
      <button
        className="menu-toggle"
        onClick={onToggleMenu}
        data-cursor-hover
        aria-label="Open menu"
        style={{
          display: 'none',
          alignItems: 'center',
          gap: 10,
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          padding: '8px 4px',
        }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: 2, color: menuOpen ? colors.cream : colors.ink }}>
          {menuOpen ? 'CLOSE' : 'MENU'}
        </span>
        <div style={{ width: 24, display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span style={{ display: 'block', height: 1.4, background: menuOpen ? colors.cream : colors.ink }} />
          <span style={{ display: 'block', height: 1.4, background: menuOpen ? colors.cream : colors.ink }} />
        </div>
      </button>
    </header>
  );
}
