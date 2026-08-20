import { colors, fonts, asset, chapterFor } from '../theme';
import Reveal from '../components/Reveal';
import ContactArt from '../components/art/ContactArt';
import SectionHeading from '../components/SectionHeading';

const chapter = chapterFor('contact');

function ContactCard({ label, children, delay }) {
  return (
    <Reveal
      delay={delay}
      style={{
        background: colors.card,
        border: `1px solid ${colors.border}`,
        borderRadius: 6,
        padding: 24,
        transition: 'box-shadow 0.25s ease, transform 0.25s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = '0 10px 26px oklch(0.3 0.06 60 / 0.16)';
        e.currentTarget.style.transform = 'translateY(-3px)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.transform = 'translateY(0)';
      }}
    >
      <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1, color: chapter.accent, marginBottom: 10 }}>
        {label}
      </div>
      {children}
    </Reveal>
  );
}

export default function Contact() {
  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '140px 48px 60px', position: 'relative' }} className="gutter">
      <ContactArt />
      <SectionHeading
        numeral={chapter.numeral}
        label={chapter.label}
        title="Let's build something that matters."
        accent={chapter.accent}
        ink={colors.ink}
      />
      <p style={{ fontSize: 16, lineHeight: 1.75, color: colors.inkSoft, maxWidth: 600, margin: '0 0 40px' }}>
        Open to PhD positions, research collaborations, and roles at the intersection of ML and chemistry/biology.
        The journey through this site ends here — but the next leg of it is a conversation. Reach out — I reply.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <ContactCard label="EMAIL" delay={0}>
          <a href="mailto:samuelbethala03@gmail.com" style={{ fontSize: 16 }}>
            samuelbethala03@gmail.com
          </a>
        </ContactCard>
        <ContactCard label="LINKEDIN" delay={70}>
          <a href="https://www.linkedin.com/in/samuel-raju-bethala-9a5637214/" target="_blank" rel="noreferrer" style={{ fontSize: 16 }}>
            samuel-raju-bethala
          </a>
        </ContactCard>
        <ContactCard label="GITHUB" delay={140}>
          <a href="https://github.com/blck-iris" target="_blank" rel="noreferrer" style={{ fontSize: 16 }}>
            github.com/blck-iris
          </a>
        </ContactCard>
        <ContactCard label="CURRICULUM VITAE" delay={210}>
          <a href={asset('assets/Samuel_CV_Research.pdf')} target="_blank" rel="noreferrer" style={{ fontSize: 16 }}>
            Download CV (PDF) ↓
          </a>
        </ContactCard>
      </div>
      <div style={{ height: 64 }} />
    </section>
  );
}
