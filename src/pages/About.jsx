import { colors, fonts, asset, chapterFor } from '../theme';
import { Pill, Eyebrow } from '../components/UI';
import Reveal from '../components/Reveal';
import AboutArt from '../components/art/AboutArt';
import SectionHeading from '../components/SectionHeading';

const chapter = chapterFor('about');

const SKILL_GROUPS = [
  {
    title: 'Machine Learning',
    items: ['PyTorch/Keras', 'Gaussian Processes', 'Grad-CAM', 'LangChain/LLMs'],
  },
  {
    title: 'Computational Chemistry & Biophysics',
    items: ['GROMACS/LAMMPS', 'Cheminformatics', 'AnnData/Scanpy'],
  },
  {
    title: 'Tools & Languages',
    items: ['Python', 'Git/GitHub', 'NumPy/Pandas'],
  },
];

const MENTORS = [
  ['Prof. Sandip Kar', 'Chemistry'],
  ['Prof. Sanjeeva Srivastava', 'Biosciences & Bioengineering'],
  ['Prof. Jhumpa Adhikari', 'Chemical Engineering'],
  ['Prof. Ajay S. Panwar', 'Mechanical Engineering'],
  ['Prof. Amber Jain', 'Chemistry'],
  ['Prof. Nand Kishore', 'Chemistry'],
  ['Prof. Pushpak Bhattacharyya', 'Computer Science & Engineering'],
];

const LEADERSHIP = [
  ['Institute Student Mentor — selected among 435 applicants; mentoring 12 freshmen', "'24–'26"],
  ['Department Placement Coordinator — supporting 2,100+ students', "'24–'25"],
  ['UG Representative, Chemistry Department', "'24–'25"],
  ['WIDS & SoC Mentor — taught ML and supply-chain optimization to 28+ students', "'24"],
];

export default function About() {
  return (
    <section style={{ maxWidth: 900, margin: '0 auto', padding: '140px 48px 60px', position: 'relative' }} className="gutter">
      <AboutArt />
      <SectionHeading
        numeral={chapter.numeral}
        label={chapter.label}
        title="Where molecules meet models."
        accent={chapter.accent}
        ink={colors.ink}
      />

      <Reveal as="div" className="about-photo-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 200px', gap: 40, alignItems: 'start' }}>
        <div>
          <p style={{ fontSize: 16, lineHeight: 1.75, color: colors.inkSoft, maxWidth: 680 }}>
            I'm a B.S.+M.S. dual-degree researcher in IIT Bombay's Department of Chemistry, drawn to the point
            where chemistry, biology, and machine learning intersect. My work spans explainable deep learning and
            computer vision for cancer research, and computational biophysics that couples molecular dynamics with
            ML to accelerate structure-based drug discovery. I'm looking toward PhD programs and research roles at
            that same intersection.
          </p>
        </div>
        <div style={{ width: 180, height: 220, borderRadius: 6, overflow: 'hidden', border: `1px solid ${colors.border}` }}>
          <img
            src={asset('assets/samuel.jpeg')}
            alt="Samuel Raju Bethala"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'grayscale(1) sepia(0.35) contrast(1.05) brightness(0.97)',
            }}
          />
        </div>
      </Reveal>

      <Eyebrow style={{ letterSpacing: 1.5, margin: '56px 0 16px' }}>EDUCATION</Eyebrow>
      <Reveal as="div"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          borderBottom: `1px solid ${colors.borderSoft}`,
          padding: '16px 0',
        }}
      >
        <div>
          <div style={{ fontSize: 16, fontWeight: 600 }}>Indian Institute of Technology Bombay</div>
          <div style={{ fontSize: 13, color: colors.inkSoft, marginTop: 4 }}>
            B.S. + M.S. Dual Degree, Department of Chemistry
          </div>
        </div>
        <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.inkMuted }}>Mumbai, India</div>
      </Reveal>

      <Eyebrow style={{ letterSpacing: 1.5, margin: '56px 0 16px' }}>SKILLS &amp; TOOLS</Eyebrow>
      <div className="grid-collapse" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
        {SKILL_GROUPS.map((group, i) => (
          <Reveal key={group.title} delay={i * 80} style={{ background: colors.card, border: `1px solid ${colors.border}`, borderRadius: 6, padding: 20 }}>
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 11,
                letterSpacing: 1,
                color: chapter.accent,
                textTransform: 'uppercase',
                marginBottom: 12,
              }}
            >
              {group.title}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {group.items.map((item) => (
                <Pill key={item}>{item}</Pill>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      <Eyebrow style={{ letterSpacing: 1.5, margin: '56px 0 16px' }}>RESEARCH MENTORS</Eyebrow>
      <Reveal as="div" className="mentors-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 32px' }}>
        {MENTORS.map(([name, dept]) => (
          <div
            key={name}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: `1px solid oklch(0.6 0.05 75 / 0.5)`,
              padding: '13px 0',
            }}
          >
            <span style={{ fontSize: 14 }}>
              {name} <span style={{ color: colors.inkMuted, fontSize: 12 }}>— {dept}</span>
            </span>
            <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.inkMuted }}>IIT Bombay</span>
          </div>
        ))}
      </Reveal>

      <Eyebrow style={{ letterSpacing: 1.5, margin: '56px 0 16px' }}>LEADERSHIP &amp; IMPACT</Eyebrow>
      <Reveal as="div" style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {LEADERSHIP.map(([text, years]) => (
          <div
            key={text}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              borderBottom: `1px solid oklch(0.6 0.05 75 / 0.5)`,
              padding: '14px 0',
              gap: 16,
            }}
          >
            <span style={{ fontSize: 14 }}>{text}</span>
            <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.inkMuted, whiteSpace: 'nowrap' }}>
              {years}
            </span>
          </div>
        ))}
      </Reveal>
      <div style={{ height: 64 }} />
    </section>
  );
}
