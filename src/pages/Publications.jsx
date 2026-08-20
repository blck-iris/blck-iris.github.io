import { colors, fonts, chapterFor } from '../theme';
import { Eyebrow } from '../components/UI';
import Reveal from '../components/Reveal';
import PublicationsArt from '../components/art/PublicationsArt';
import SectionHeading from '../components/SectionHeading';

const chapter = chapterFor('publications');

export default function Publications() {
  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '140px 48px 60px', position: 'relative' }} className="gutter">
      <PublicationsArt />
      <SectionHeading
        numeral={chapter.numeral}
        label={chapter.label}
        title="Peer review, in progress."
        accent={chapter.accent}
        ink={colors.ink}
      />

      <Reveal style={{ display: 'flex', gap: 16, borderBottom: `1px solid ${colors.borderSoft}`, paddingBottom: 28, marginBottom: 28 }}>
        <div style={{ fontFamily: fonts.serif, fontStyle: "italic", color: chapter.accent, fontSize: 20 }}>I.</div>
        <div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>
            An Explainable and Comparative Transfer Learning Framework for Brain Tumor Classification from MRI
            Images
          </div>
          <div style={{ fontSize: 13, color: colors.inkSoft, marginBottom: 12 }}>
            Bethala, S. R. &amp; Vanshika. Under review, <em>Biomedical Signal Processing and Control</em>. Preprint:{' '}
            <em>medRxiv</em> (2026). doi:10.64898/2026.08.06.26359900
          </div>
          <div style={{ display: 'flex', gap: 20 }}>
            <a
              href="https://www.medrxiv.org/content/10.64898/2026.08.06.26359900v1"
              target="_blank"
              rel="noreferrer"
              style={{ fontFamily: fonts.mono, fontSize: 12 }}
            >
              medRxiv →
            </a>
            <a
              href="https://github.com/blck-iris/explainable-brain-tumor-mri"
              target="_blank"
              rel="noreferrer"
              style={{ fontFamily: fonts.mono, fontSize: 12 }}
            >
              Code →
            </a>
          </div>
        </div>
      </Reveal>

      <Eyebrow style={{ letterSpacing: 1.5, margin: '0 0 14px' }}>BIBTEX</Eyebrow>
      <Reveal
        style={{
          background: colors.bgAlt,
          border: `1px solid ${colors.border}`,
          borderRadius: 6,
          padding: 20,
          fontFamily: fonts.mono,
          fontSize: 12,
          lineHeight: 1.7,
          color: colors.inkSoft,
          whiteSpace: 'pre-wrap',
        }}
      >
        {`@article{bethala2026explainable,
  title={An Explainable and Comparative Transfer Learning Framework for Brain Tumor Classification from MRI Images},
  author={Bethala, Samuel Raju and Vanshika},
  journal={medRxiv},
  year={2026},
  doi={10.1101/10.64898/2026.08.06.26359900}
}`}
      </Reveal>
      <div style={{ height: 64 }} />
    </section>
  );
}
