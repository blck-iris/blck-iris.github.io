import { colors, fonts, chapterFor } from '../theme';
import { Pill } from '../components/UI';
import Reveal from '../components/Reveal';
import VenturesArt from '../components/art/VenturesArt';
import SectionHeading from '../components/SectionHeading';

const chapter = chapterFor('ventures');

export default function Ventures() {
  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '140px 48px 60px', position: 'relative' }} className="gutter">
      <VenturesArt />
      <SectionHeading
        numeral={chapter.numeral}
        label={chapter.label}
        title="From the lab bench to a business case."
        accent={chapter.accent}
        ink={colors.ink}
        sub="Research doesn't have to stop at the paper. ShellCrete is where I took a materials-science insight and turned it into a venture with a market, a supply chain, and a pitch — the idea grown into a structure."
      />

      <Reveal style={{ background: colors.card, border: `1px solid ${colors.border}`, borderTop: `3px solid ${chapter.accent}`, borderRadius: 6, padding: 36 }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1.5, color: chapter.accent }}>
          CO-FOUNDER · IMPERIAL COLLEGE GLOBAL SCIENTIFIC CHALLENGE · JUL '26
        </div>
        <h3 style={{ fontFamily: fonts.serif, fontSize: 23, fontWeight: 500, margin: '14px 0 8px' }}>ShellCrete</h3>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.inkSoft, maxWidth: 680, margin: '0 0 16px' }}>
          Co-founded a 5-person venture converting shell biowaste into a partial cement replacement, targeting the
          cement industry's 5–8% share of global CO₂ emissions. Researched 20+ peer-reviewed studies to define an
          evidence-based 5–10% substitution formula and a 900–950°C calcination protocol, projected to cut upstream
          limestone demand by 43–122 kg per tonne of binder.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.inkSoft, maxWidth: 680, margin: 0 }}>
          Built ShellPass, a material-traceability platform mapping waste from collection through processing to end
          product, and ran a 1,000+ respondent market-validation survey — 84.4% said they'd trust a certified
          shell-based product. Co-authored and presented the investor pitch deck, translating the technical case
          into a 4-year scaling roadmap (UK pilot → international expansion by 2030).
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
          <Pill>Materials Science</Pill>
          <Pill>Sustainability</Pill>
          <Pill>Market Validation</Pill>
          <Pill>Traceability Platform</Pill>
        </div>
        <div style={{ marginTop: 24 }}>
          <a href="https://blck-iris.github.io/shellcreate/" target="_blank" rel="noreferrer" style={{ fontFamily: fonts.mono, fontSize: 12 }}>
            Visit ShellCrete →
          </a>
        </div>
      </Reveal>
      <div style={{ height: 64 }} />
    </section>
  );
}
