import { colors, fonts } from '../theme';

export default function Footer() {
  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 1,
        borderTop: `1px solid ${colors.border}`,
        padding: '36px 48px',
      }}
    >
      <div
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.inkMuted }}>
          © 2026 Samuel Raju Bethala
        </span>
        <div style={{ display: 'flex', gap: 20 }}>
          <a href="mailto:samuelbethala03@gmail.com" style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.inkSoft }}>
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/samuel-raju-bethala-9a5637214/"
            target="_blank"
            rel="noreferrer"
            style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.inkSoft }}
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/blck-iris"
            target="_blank"
            rel="noreferrer"
            style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.inkSoft }}
          >
            GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}
