import { useCallback, useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import AuroraBackground from './components/AuroraBackground';
import FullScreenMenu from './components/FullScreenMenu';
import CustomCursor from './components/CustomCursor';
import Preloader from './components/Preloader';
import ScrollProgress from './components/ScrollProgress';
import DotRail from './components/DotRail';
import ChapterNav from './components/ChapterNav';
import Home from './pages/Home';
import About from './pages/About';
import Research from './pages/Research';
import Projects from './pages/Projects';
import Ventures from './pages/Ventures';
import Publications from './pages/Publications';
import Contact from './pages/Contact';
import { useFieldCanvas } from './hooks/useFieldCanvas';
import { fonts, colors, CHAPTERS } from './theme';

const PAGES = {
  home: Home,
  about: About,
  research: Research,
  projects: Projects,
  ventures: Ventures,
  publications: Publications,
  contact: Contact,
};

export default function App() {
  const [page, setPage] = useState('home');
  const [menuOpen, setMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const fieldCanvasRef = useFieldCanvas();

  const navigate = useCallback(
    (next) => {
      setMenuOpen(false);
      setPage((current) => (next === current ? current : next));
      // Scrolling is a side effect, so it stays out of the state updater
      // (React can invoke updaters twice in StrictMode).
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  // Left/right arrows move through the chapters like pages of a book.
  useEffect(() => {
    const onKey = (e) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = e.target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;

      if (e.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;

      const idx = CHAPTERS.findIndex((c) => c.key === page);
      if (idx === -1) return;
      const nextIdx = e.key === 'ArrowRight' ? idx + 1 : idx - 1;
      if (nextIdx < 0 || nextIdx >= CHAPTERS.length) return;
      navigate(CHAPTERS[nextIdx].key);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [page, navigate]);

  const ActivePage = PAGES[page] ?? Home;

  return (
    <div style={{ fontFamily: fonts.sans, background: 'transparent', color: colors.ink, minHeight: '100vh' }}>
      {loading && <Preloader onDone={() => setLoading(false)} />}

      <CustomCursor />
      <AuroraBackground />

      <canvas
        ref={fieldCanvasRef}
        style={{ position: 'fixed', inset: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none' }}
      />

      <div className="grain-overlay" />

      <Header
        page={page}
        onNavigate={navigate}
        menuOpen={menuOpen}
        onToggleMenu={() => setMenuOpen((v) => !v)}
      />
      <ScrollProgress page={page} />
      <DotRail page={page} onNavigate={navigate} />
      <FullScreenMenu open={menuOpen} page={page} onNavigate={navigate} onClose={() => setMenuOpen(false)} />

      <main style={{ position: 'relative', zIndex: 1, paddingTop: 76 }}>
        <div key={page} style={{ animation: 'pageFadeIn 0.5s cubic-bezier(0.16,1,0.3,1)' }}>
          <ActivePage onNavigate={navigate} />
          <ChapterNav page={page} onNavigate={navigate} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
