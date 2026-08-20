import { colors, fonts, chapterFor } from '../theme';
import Reveal from '../components/Reveal';
import ProjectsArt, { PinGlyph } from '../components/art/ProjectsArt';
import SectionHeading from '../components/SectionHeading';

const chapter = chapterFor('projects');

const PROJECTS = [
  {
    tag: 'M.S. THESIS',
    title: 'Temporal Bayesian Optimization of Deep Cell Segmentation',
    description: 'GP-BO over Cellpose hyperparameters with drift-adaptive memory; TWCS 0.982 across 400 frames.',
    footer: 'Guide: Prof. Sandip Kar',
  },
  {
    tag: 'CANCER · MEDICAL IMAGING',
    title: 'Explainable Transfer Learning Benchmark for Neuro-Oncology MRI',
    description: 'Open-source benchmark with CLAHE restoration + Grad-CAM; MobileNetV2 at 94.74% acc, 5.9ms.',
    links: [
      ['GitHub →', 'https://github.com/blck-iris/explainable-brain-tumor-mri'],
      ['medRxiv →', 'https://www.medrxiv.org/content/10.64898/2026.08.06.26359900v1'],
    ],
  },
  {
    tag: 'COMPUTATIONAL BIOPHYSICS',
    title: 'Multiscale Modeling of p53 Mutant Structural Stability',
    description: 'Ported GROMACS to LAMMPS for the p53 DNA-binding domain; RMSD < 0.2 Å on a 32,810-atom system.',
    footer: 'Guide: Prof. Ajay S. Panwar',
  },
  {
    tag: 'COMPUTATIONAL BIOPHYSICS',
    title: 'Nanofluidic Modeling of Mass Transport in Membrane Channels',
    description: 'NEMD pipeline through transmembrane nanopores; ~1.8× transport enhancement in hydrophobic channels.',
    footer: 'Guide: Prof. Ajay S. Panwar',
  },
  {
    tag: 'DRUG DISCOVERY',
    title: 'Predictive Model for Ligand Binding to c-MYC G4 Structures',
    description: '3,000+ structure dataset; k-NN & Random Forest classifiers at 92.72% accuracy.',
    footer: "Self-directed, Jul–Dec '23",
  },
  {
    tag: 'DRUG DISCOVERY',
    title: 'Curved Ionic Liquid Membranes for Bio-Solvent Recovery',
    description: 'Wilke–Chang diffusion modeling and a failure-mode analysis motivating a cross-flow filtration redesign.',
    footer: 'Guide: Prof. Jhumpa Adhikari',
  },
  {
    tag: 'APPLIED ML',
    title: "ML Feature Selection of Markers for Alzheimer's Disease",
    description: 'Differential-expression pipelines on BrainProt proteomics data; ANN classifier at 95.3% precision.',
    footer: 'Guide: Prof. Sanjeeva Srivastava',
  },
  {
    tag: 'APPLIED ML',
    title: 'Elevating Spectra Classification through Advanced ML',
    description: 'PCA + SMOTE on FTIR/ASAP-MS spectra; k-NN, SVM & LDA classifiers at 93.4% accuracy.',
    footer: 'Guides: Prof. Amber Jain, Prof. Nand Kishore',
  },
  {
    tag: 'APPLIED ML · TOOLS',
    title: 'Multi-PDF Querying using LLMs',
    description: 'LangChain + Streamlit app chunking PDFs into a FAISS store, answering questions via flan-t5-xxl.',
    footer: 'Guide: Prof. Pushpak Bhattacharyya',
  },
];

function ProjectPanel({ project, index }) {
  return (
    <div
      data-cursor-hover
      style={{
        position: 'relative',
        flex: '0 0 auto',
        width: 'min(78vw, 460px)',
        scrollSnapAlign: 'start',
        background: colors.card,
        border: `1px dashed ${colors.border}`,
        borderRadius: 3,
        padding: '34px 30px 30px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        minHeight: 300,
      }}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <span
            style={{
              fontFamily: fonts.serif,
              fontStyle: 'italic',
              fontSize: 46,
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: `1.2px ${chapter.accent}`,
            }}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <PinGlyph color={chapter.accent} />
        </div>
        <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 1, color: chapter.accent, marginBottom: 10 }}>
          {project.tag}
        </div>
        <h3 style={{ fontFamily: fonts.serif, fontSize: 21, fontWeight: 500, margin: '0 0 10px', lineHeight: 1.25 }}>
          {project.title}
        </h3>
        <p style={{ fontSize: 13.5, lineHeight: 1.65, color: colors.inkSoft, margin: 0 }}>{project.description}</p>
      </div>

      {project.links ? (
        <div style={{ display: 'flex', gap: 16, marginTop: 20 }}>
          {project.links.map(([label, href]) => (
            <a key={label} href={href} target="_blank" rel="noreferrer" style={{ fontFamily: fonts.mono, fontSize: 11 }}>
              {label}
            </a>
          ))}
        </div>
      ) : (
        <div style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.inkMuted, marginTop: 20 }}>
          {project.footer}
        </div>
      )}
    </div>
  );
}

export default function Projects() {
  return (
    <section style={{ maxWidth: '100%', margin: '0 auto', padding: '140px 0 60px', position: 'relative' }}>
      <ProjectsArt />
      <div className="gutter" style={{ maxWidth: 1000, margin: '0 auto', padding: '0 48px' }}>
        <SectionHeading
          numeral={chapter.numeral}
          label={chapter.label}
          title="Nine specimens, pinned to the board."
          accent={chapter.accent}
          ink={colors.ink}
          sub="Catalogued across four research threads — scroll sideways through the collection."
        />
      </div>

      <Reveal
        as="div"
        className="gutter rail-scroll"
        style={{
          display: 'flex',
          gap: 20,
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          padding: '4px 48px 28px',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {PROJECTS.map((project, i) => (
          <ProjectPanel key={project.title} project={project} index={i} />
        ))}
        <div style={{ flex: '0 0 1px' }} />
      </Reveal>

      <div className="gutter" style={{ maxWidth: 1000, margin: '20px auto 0', padding: '0 48px', fontFamily: fonts.mono, fontSize: 11, color: colors.inkMuted }}>
        ← drag or scroll to browse the collection →
      </div>
      <div style={{ height: 64 }} />
    </section>
  );
}
