import { CHAPTERS, colors, fonts } from '../theme';

// End-of-page navigation: big, obvious "previous / next chapter" links so
// the site can be read straight through like a story, without ever needing
// to open a menu.
export default function ChapterNav({ page, onNavigate }) {
  const idx = CHAPTERS.findIndex((c) => c.key === page);
  const prev = idx > 0 ? CHAPTERS[idx - 1] : null;
  const next = idx < CHAPTERS.length - 1 ? CHAPTERS[idx + 1] : null;

  if (!prev && !next) return null;

  const Item = ({ chapter, direction }) => (
    <button
      onClick={() => onNavigate(chapter.key)}
      data-cursor-hover
      style={{
        flex: 1,
        minWidth: 240,
        background: 'transparent',
        border: `1px solid ${colors.border}`,
        borderRadius: 4,
        padding: '26px 28px',
        cursor: 'pointer',
        textAlign: direction === 'next' ? 'right' : 'left',
        transition: 'background 0.25s ease, border-color 0.25s ease, transform 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = chapter.accent;
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = colors.border;
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 2, color: colors.inkMuted, marginBottom: 8 }}>
        {direction === 'next' ? 'NEXT CHAPTER →' : '← PREVIOUS CHAPTER'}
      </div>
      <div style={{ fontFamily: fonts.serif, fontSize: 26, fontWeight: 500, color: colors.ink, lineHeight: 1.15 }}>
        <span style={{ color: chapter.accent, fontStyle: 'italic', marginRight: 8 }}>{chapter.numeral}</span>
        {chapter.label}
      </div>
    </button>
  );

  return (
    <div
      className="gutter chapter-nav"
      style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '20px 48px 90px',
        display: 'flex',
        gap: 20,
        flexWrap: 'wrap',
      }}
    >
      {prev ? <Item chapter={prev} direction="prev" /> : <div style={{ flex: 1, minWidth: 240 }} />}
      {next ? <Item chapter={next} direction="next" /> : <div style={{ flex: 1, minWidth: 240 }} />}
    </div>
  );
}
