import { colors, fonts, chapterFor } from '../theme';
import { Pill, Stat } from '../components/UI';
import Reveal from '../components/Reveal';
import { FieldNotesBackground, DnaIcon, ScanIcon, MoleculeIcon, NetworkIcon } from '../components/art/ResearchArt';
import SectionHeading from '../components/SectionHeading';

const chapter = chapterFor('research');

function SectionLabel({ children, icon }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
      {icon}
      <div style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: 1.5, color: colors.ink }}>
        {children}
      </div>
    </div>
  );
}

export default function Research() {
  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '140px 48px 60px', position: 'relative' }} className="gutter">
      <FieldNotesBackground />
      <SectionHeading
        numeral={chapter.numeral}
        label={chapter.label}
        title="Machine learning, held to a clinical standard."
        accent={chapter.accent}
        ink={colors.ink}
        sub="My research asks how machine learning can be made trustworthy enough for chemistry and medicine — not just accurate, but explainable, efficient, and reproducible enough to actually matter in the clinic and the lab."
      />

      <SectionLabel icon={<DnaIcon color={chapter.accent} />}>COMPUTATIONAL BIOPHYSICS</SectionLabel>
      <Reveal style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 6, padding: 36, marginBottom: 40 }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1.5, color: chapter.accent }}>
          M.S. THESIS · TSBL · GUIDE: PROF. SANDIP KAR · AUG '25–MAY '26
        </div>
        <h3 style={{ fontFamily: fonts.serif, fontSize: 23, fontWeight: 500, margin: '14px 0 8px' }}>
          Temporal Bayesian Optimization of Deep Cell Segmentation for Live-Cell Imaging
        </h3>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.inkSoft, maxWidth: 680, margin: 0 }}>
          A per-frame Gaussian-process Bayesian-optimization framework over Cellpose hyperparameters using a 6-D
          ARD Matérn-1.5 kernel, with a heteroscedastic sliding-window memory that adapts under photobleaching
          drift. A PCHIP-built monotonic ground truth removes the need for dense annotation, and a biologically
          grounded dead-zone loss corrects for systematic human undercounting.
        </p>
        <div
          className="grid-collapse"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 16,
            marginTop: 28,
            paddingTop: 24,
            borderTop: `1px solid ${colors.borderSoft}`,
          }}
        >
          <Stat value="0.982" label="TWCS" valueColor={chapter.accent} />
          <Stat value="95.2%" label="In-band rate" valueColor={colors.ink} />
          <Stat value="0.91" label="Pearson r" valueColor={chapter.accent} />
          <Stat value="400" label="Time-lapse frames" valueColor={colors.ink} />
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
          <Pill>Gaussian Processes</Pill>
          <Pill>Bayesian Optimization</Pill>
          <Pill>Cellpose</Pill>
          <Pill>PCHIP</Pill>
        </div>
      </Reveal>

      <SectionLabel icon={<ScanIcon color={chapter.accent} />}>CANCER &amp; MEDICAL IMAGING</SectionLabel>
      <Reveal style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 6, padding: 36, marginBottom: 40 }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1.5, color: chapter.accent }}>
          UNDER REVIEW · BIOMEDICAL SIGNAL PROCESSING &amp; CONTROL · MEDRXIV PREPRINT
        </div>
        <h3 style={{ fontFamily: fonts.serif, fontSize: 23, fontWeight: 500, margin: '14px 0 8px' }}>
          An Explainable and Comparative Transfer Learning Framework for Brain Tumor Classification from MRI Images
        </h3>
        <div style={{ fontSize: 13, color: colors.inkSoft, marginBottom: 16 }}>
          Samuel Raju Bethala, Vanshika — Dept. of Chemistry, IIT Bombay
        </div>
        <p style={{ fontSize: 15, lineHeight: 1.7, color: colors.inkSoft, maxWidth: 680, margin: 0 }}>
          Overhauled a course prototype into an open-source transfer-learning benchmark for brain MRI analysis: a
          CLAHE + unsharp-mask restoration pipeline feeds pretrained backbones under an identical budget, with
          Grad-CAM spatial attribution validating that predictions attend to the tumor and not spurious background.
        </p>
        <div
          className="grid-collapse"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4,1fr)',
            gap: 16,
            marginTop: 28,
            paddingTop: 24,
            borderTop: `1px solid ${colors.borderSoft}`,
          }}
        >
          <Stat value="94.74%" label="Accuracy" valueColor={chapter.accent} />
          <Stat value="0.994" label="ROC-AUC" valueColor={colors.ink} />
          <Stat value="2.59M" label="Parameters" valueColor={chapter.accent} />
          <Stat value="5.9ms" label="Inference" valueColor={colors.ink} />
        </div>
        <div style={{ display: 'flex', gap: 24, marginTop: 20 }}>
          <a
            href="https://www.medrxiv.org/content/10.64898/2026.08.06.26359900v1"
            target="_blank"
            rel="noreferrer"
            style={{ fontFamily: fonts.mono, fontSize: 12 }}
          >
            Read on medRxiv →
          </a>
          <a
            href="https://github.com/blck-iris/explainable-brain-tumor-mri"
            target="_blank"
            rel="noreferrer"
            style={{ fontFamily: fonts.mono, fontSize: 12 }}
          >
            View code on GitHub →
          </a>
        </div>
      </Reveal>

      <SectionLabel icon={<MoleculeIcon color={chapter.accent} />}>DRUG DISCOVERY &amp; CHEMINFORMATICS</SectionLabel>
      <Reveal style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 6, padding: 28, marginBottom: 40 }}>
        <h3 style={{ fontFamily: fonts.serif, fontSize: 19, fontWeight: 500, margin: '0 0 8px' }}>
          Predictive Model for Ligand Binding to c-MYC G4 Structures
        </h3>
        <div style={{ fontSize: 12, color: colors.inkMuted, marginBottom: 10, fontFamily: fonts.mono }}>
          SELF-DIRECTED RESEARCH · JUL–DEC '23
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: colors.inkSoft, margin: 0 }}>
          Curated a 3,000+ structure dataset of c-MYC G-quadruplexes and candidate ligands, training k-NN and
          Random Forest classifiers to identify binding descriptors at 92.72% accuracy.
        </p>
      </Reveal>

      <SectionLabel icon={<NetworkIcon color={chapter.accent} />}>APPLIED ML &amp; TOOLS</SectionLabel>
      <Reveal style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 6, padding: 28 }}>
        <h3 style={{ fontFamily: fonts.serif, fontSize: 19, fontWeight: 500, margin: '0 0 8px' }}>
          ML-Based Feature Selection of Markers for Alzheimer's Disease
        </h3>
        <div style={{ fontSize: 12, color: colors.inkMuted, marginBottom: 10, fontFamily: fonts.mono }}>
          PROTEOMICS LAB · GUIDE: PROF. SANJEEVA SRIVASTAVA · JAN–MAY '24
        </div>
        <p style={{ fontSize: 14, lineHeight: 1.65, color: colors.inkSoft, margin: 0 }}>
          Built differential-expression pipelines over curated BrainProt proteomics data; an ANN classifier reached
          95.3% precision identifying disease markers.
        </p>
      </Reveal>
      <div style={{ height: 64 }} />
    </section>
  );
}
