import { fonts } from '../theme';
import ScrambleText from './ScrambleText';

// A big, editorial-style heading used at the top of every chapter: a huge
// outlined numeral, a tracked-out chapter label that decodes into place,
// and a large serif title. Meant to read like a magazine section opener.
export default function SectionHeading({ numeral, label, title, accent, ink, sub }) {
  return (
    <div style={{ marginBottom: 56, position: 'relative' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 24 }} className="section-heading-row">
        <span
          className="section-heading-numeral"
          style={{
            fontFamily: fonts.serif,
            fontStyle: 'italic',
            fontSize: 'clamp(64px, 11vw, 128px)',
            lineHeight: 0.8,
            color: 'transparent',
            WebkitTextStroke: `1.5px ${accent}`,
            userSelect: 'none',
            flexShrink: 0,
          }}
        >
          {numeral}
        </span>
        <div style={{ paddingTop: 'clamp(14px, 2vw, 26px)' }}>
          <ScrambleText
            text={label.toUpperCase()}
            style={{
              display: 'block',
              fontFamily: fonts.mono,
              fontSize: 12,
              letterSpacing: 3,
              color: accent,
              marginBottom: 10,
            }}
          />
          <h2
            style={{
              fontFamily: fonts.serif,
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontWeight: 500,
              lineHeight: 1.1,
              margin: 0,
              color: ink,
              maxWidth: 620,
            }}
          >
            {title}
          </h2>
          {sub && (
            <p style={{ fontSize: 15, color: ink, opacity: 0.65, margin: '14px 0 0', maxWidth: 560, lineHeight: 1.6 }}>
              {sub}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
