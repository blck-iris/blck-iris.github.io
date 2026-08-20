import { colors, fonts, chapterFor } from '../theme';
import { useMorphCanvas } from '../hooks/useMorphCanvas';
import { useTilt } from '../hooks/useTilt';
import Reveal from '../components/Reveal';
import Marquee from '../components/Marquee';
import ScrambleText from '../components/ScrambleText';

const chapter = chapterFor('home');

function IndexCard({ index, eyebrow, title, description, cta, onClick, delay }) {
  const tilt = useTilt();
  return (
    <Reveal delay={delay}>
      <div
        ref={tilt.ref}
        onMouseMove={tilt.onMouseMove}
        onMouseLeave={tilt.onMouseLeave}
        onClick={onClick}
        data-cursor-hover
        style={{
          cursor: 'pointer',
          background: colors.card,
          border: `1px solid ${colors.border}`,
          borderRadius: 4,
          padding: '30px 26px 26px',
          transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
          willChange: 'transform',
          height: '100%',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'oklch(0.5 0.13 40 / 0.5)'; }}
        onMouseOut={(e) => { e.currentTarget.style.borderColor = colors.border; }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
          <span
            style={{
              fontFamily: fonts.serif,
              fontStyle: 'italic',
              fontSize: 40,
              lineHeight: 1,
              color: 'transparent',
              WebkitTextStroke: '1.2px oklch(0.5 0.13 40)',
            }}
          >
            {index}
          </span>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 1.5, color: colors.amber, paddingTop: 6 }}>
            {eyebrow}
          </div>
        </div>
        <h3 style={{ fontFamily: fonts.serif, fontSize: 20, margin: '0 0 8px', fontWeight: 500 }}>{title}</h3>
        <p style={{ fontSize: 13, color: colors.inkSoft, lineHeight: 1.6, margin: 0 }}>{description}</p>
        <div style={{ marginTop: 18, fontFamily: fonts.mono, fontSize: 12, color: colors.ink }}>{cta}</div>
      </div>
    </Reveal>
  );
}

export default function Home({ onNavigate, heroAnimation = true }) {
  const { canvasRef, shapeLabel } = useMorphCanvas({ animate: heroAnimation });

  return (
    <div>
      {/* FULL-VIEWPORT HERO — kinetic type over a full-bleed morphing field */}
      <section
        style={{
          position: 'relative',
          minHeight: 'calc(100vh - 76px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            opacity: 0.85,
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse at 30% 40%, transparent 0%, oklch(0.95 0.025 85 / 0.55) 68%, oklch(0.95 0.025 85 / 0.92) 100%)',
            pointerEvents: 'none',
          }}
        />

        <div className="gutter" style={{ position: 'relative', zIndex: 1, maxWidth: 1280, margin: '0 auto', padding: '0 48px', width: '100%' }}>
          <ScrambleText
            key={shapeLabel}
            text={`${chapter.numeral} · ${chapter.label.toUpperCase()} — ${shapeLabel.toUpperCase()}`}
            style={{
              display: 'block',
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: 3,
              color: chapter.accent,
              marginBottom: 18,
            }}
          />

          <h1
            style={{
              fontFamily: fonts.serif,
              fontWeight: 500,
              lineHeight: 0.98,
              margin: '0 0 32px',
              fontSize: 'clamp(52px, 9vw, 118px)',
              maxWidth: 1000,
            }}
          >
            Machine learning
            <br />
            that <span style={{ fontStyle: 'italic', color: colors.amber }}>shows its work.</span>
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 32, alignItems: 'end', maxWidth: 1000 }} className="hero-cta-row">
            <p style={{ fontSize: 17, lineHeight: 1.65, color: colors.inkSoft, maxWidth: 480, margin: 0 }}>
              I'm Samuel Raju Bethala — a B.S.+M.S. dual-degree researcher in Chemistry at IIT Bombay, building deep
              learning and computer-vision pipelines for cancer research, and coupling molecular dynamics with ML to
              accelerate structure-based drug discovery.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <button
                onClick={() => onNavigate('research')}
                data-cursor-hover
                style={{
                  padding: '14px 26px',
                  background: colors.ink,
                  color: 'oklch(0.95 0.02 85)',
                  border: 'none',
                  borderRadius: 2,
                  fontFamily: fonts.mono,
                  fontSize: 13,
                  letterSpacing: 0.5,
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 8px 20px oklch(0.2 0.035 55 / 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                View research →
              </button>
              <button
                onClick={() => onNavigate('contact')}
                data-cursor-hover
                style={{
                  padding: '14px 26px',
                  background: 'transparent',
                  color: colors.ink,
                  border: '1px solid oklch(0.5 0.05 55 / 0.5)',
                  borderRadius: 2,
                  fontFamily: fonts.mono,
                  fontSize: 13,
                  cursor: 'pointer',
                  transition: 'border-color 0.2s ease, transform 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.amber;
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'oklch(0.5 0.05 55 / 0.5)';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                Get in touch
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: 20,
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: 2,
            color: colors.inkMuted,
            zIndex: 1,
          }}
        >
          SCROLL
        </div>
      </section>

      <Marquee
        items={[
          'Cancer & Medical Imaging ML',
          'Computational Biophysics',
          'Drug Discovery & Cheminformatics',
          'Applied ML & Tools',
        ]}
        bg={colors.bgAlt}
        color={colors.inkSoft}
        borderColor={colors.border}
      />

      {/* MANIFESTO — dark tonal break */}
      <section className="gutter" style={{ background: colors.dark, padding: '110px 48px' }}>
        <Reveal>
          <p
            style={{
              maxWidth: 880,
              margin: '0 auto',
              fontFamily: fonts.serif,
              fontStyle: 'italic',
              fontSize: 'clamp(24px, 3.6vw, 38px)',
              lineHeight: 1.35,
              color: colors.cream,
              textAlign: 'center',
            }}
          >
            "A model that can't explain its own decision isn't finished — it's just fast." Every project here is an
            argument for machine learning that a clinician, a chemist, or a reviewer could actually trust.
          </p>
        </Reveal>
      </section>

      <section className="gutter" style={{ maxWidth: 1280, margin: '0 auto', padding: '90px 48px 24px' }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 12, letterSpacing: 2, color: chapter.accent, marginBottom: 16 }}>
          CURRENTLY
        </div>
        <Reveal>
          <div
            onClick={() => onNavigate('research')}
            data-cursor-hover
            style={{
              cursor: 'pointer',
              background: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: 6,
              padding: 36,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 24,
              flexWrap: 'wrap',
              transition: 'box-shadow 0.25s ease, transform 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 12px 30px oklch(0.3 0.06 60 / 0.18)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'none';
            }}
          >
            <div style={{ maxWidth: 680 }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: 1, color: colors.ink, marginBottom: 10 }}>
                M.S. THESIS · TSBL · GUIDE: PROF. SANDIP KAR
              </div>
              <h3 style={{ fontFamily: fonts.serif, fontSize: 26, fontWeight: 500, margin: '0 0 10px' }}>
                Temporal Bayesian Optimization of Deep Cell Segmentation for Live-Cell Imaging
              </h3>
              <p style={{ fontSize: 14.5, color: colors.inkSoft, lineHeight: 1.65, margin: 0 }}>
                A per-frame Gaussian-process Bayesian-optimization framework over Cellpose hyperparameters, with a
                heteroscedastic sliding-window memory that adapts to photobleaching drift and a PCHIP-built ground
                truth from under 1% annotated frames.
              </p>
            </div>
            <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.amber, whiteSpace: 'nowrap' }}>
              Read more →
            </div>
          </div>
        </Reveal>
      </section>

      <section
        className="gutter home-index-cards"
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '24px 48px 100px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: 24,
        }}
      >
        <IndexCard
          index="01"
          eyebrow="RESEARCH"
          title="Four areas, one thread"
          description="Cancer imaging, biophysics, cheminformatics, and applied ML — models people can actually verify."
          cta="Explore →"
          onClick={() => onNavigate('research')}
          delay={0}
        />
        <IndexCard
          index="02"
          eyebrow="PROJECTS"
          title="Nine projects, catalogued"
          description="From MD simulations of p53 to spectra classification — everything I've built in the lab."
          cta="See projects →"
          onClick={() => onNavigate('projects')}
          delay={90}
        />
        <IndexCard
          index="03"
          eyebrow="VENTURES"
          title="ShellCrete, co-founded"
          description="Taking a lab insight to a real venture — shell biowaste into low-carbon construction material."
          cta="See the venture →"
          onClick={() => onNavigate('ventures')}
          delay={180}
        />
      </section>
    </div>
  );
}
