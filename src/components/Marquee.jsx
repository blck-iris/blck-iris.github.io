import { fonts } from '../theme';

// A continuously scrolling strip of text — duplicated once so the loop is
// seamless. Used as a rhythm break between big sections.
export default function Marquee({ items, speed = 32, bg, color, borderColor }) {
  const content = items.join('   ✦   ');

  return (
    <div
      style={{
        overflow: 'hidden',
        background: bg,
        borderTop: `1px solid ${borderColor}`,
        borderBottom: `1px solid ${borderColor}`,
        padding: '14px 0',
        whiteSpace: 'nowrap',
      }}
    >
      <div style={{ display: 'inline-flex', animation: `marquee ${speed}s linear infinite` }}>
        {[0, 1].map((i) => (
          <span
            key={i}
            style={{
              fontFamily: fonts.mono,
              fontSize: 14,
              letterSpacing: 1,
              color,
              paddingRight: 24,
              textTransform: 'uppercase',
            }}
          >
            {content}
            {'   ✦   '}
          </span>
        ))}
      </div>
    </div>
  );
}
