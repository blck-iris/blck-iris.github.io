import { CHAPTERS, colors, fonts, asset } from '../theme';

export default function FullScreenMenu({ open, page, onNavigate, onClose }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 300,
        background: colors.dark,
        color: colors.cream,
        transform: open ? 'translateY(0)' : 'translateY(-100%)',
        transition: 'transform 0.55s cubic-bezier(0.76,0,0.24,1)',
        display: 'flex',
        flexDirection: 'column',
        pointerEvents: open ? 'auto' : 'none',
      }}
    >
      <div
        className="menu-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 48px',
        }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: 2, color: 'oklch(0.75 0.03 85 / 0.7)' }}>
          MENU
        </span>
        <button
          onClick={onClose}
          data-cursor-hover
          style={{
            background: 'transparent',
            border: `1px solid oklch(0.75 0.03 85 / 0.4)`,
            color: colors.cream,
            width: 40,
            height: 40,
            borderRadius: '50%',
            cursor: 'pointer',
            fontSize: 16,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          ✕
        </button>
      </div>

      <div className="gutter" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 48px' }}>
        {CHAPTERS.map((c, i) => {
          const active = c.key === page;
          return (
            <div
              key={c.key}
              data-cursor-hover
              onClick={() => onNavigate(c.key)}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 24,
                padding: '14px 0',
                borderBottom: i < CHAPTERS.length - 1 ? '1px solid oklch(0.75 0.03 85 / 0.12)' : 'none',
                cursor: 'pointer',
              }}
            >
              <span style={{ fontFamily: fonts.mono, fontSize: 14, color: active ? c.accent : 'oklch(0.75 0.03 85 / 0.4)', width: 34 }}>
                {c.numeral}
              </span>
              <span
                style={{
                  fontFamily: fonts.serif,
                  fontStyle: active ? 'italic' : 'normal',
                  fontSize: 'clamp(32px, 6vw, 62px)',
                  fontWeight: 500,
                  color: active ? c.accent : colors.cream,
                  lineHeight: 1.05,
                  transition: 'color 0.2s ease',
                }}
              >
                {c.label}
              </span>
            </div>
          );
        })}
      </div>

      <div
        className="menu-row"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 48px 32px',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: 'oklch(0.75 0.03 85 / 0.5)' }}>
          samuelbethala03@gmail.com
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="https://github.com/blck-iris" target="_blank" rel="noreferrer" style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.cream }}>
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/samuel-raju-bethala-9a5637214/" target="_blank" rel="noreferrer" style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.cream }}>
            LinkedIn
          </a>
          <a href={asset('assets/Samuel_CV_Research.pdf')} target="_blank" rel="noreferrer" style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.cream }}>
            CV ↓
          </a>
        </div>
      </div>
    </div>
  );
}
