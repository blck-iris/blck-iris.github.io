export const colors = {
  bg: 'oklch(0.95 0.025 85)',
  bgAlt: 'oklch(0.91 0.03 82)',
  card: 'oklch(0.88 0.035 80)',
  border: 'oklch(0.6 0.05 75 / 0.7)',
  borderSoft: 'oklch(0.6 0.05 75 / 0.6)',
  ink: 'oklch(0.2 0.035 55)',
  inkSoft: 'oklch(0.34 0.035 55)',
  inkMuted: 'oklch(0.46 0.035 55)',
  amber: 'oklch(0.5 0.13 40)',
  pillBorder: 'oklch(0.58 0.06 55 / 0.5)',
  // Dark register — used for the full-screen menu and the "manifesto" band,
  // so the site has real tonal contrast instead of staying pale throughout.
  dark: 'oklch(0.18 0.025 55)',
  darkAlt: 'oklch(0.24 0.03 55)',
  cream: 'oklch(0.96 0.015 85)',
};

export const fonts = {
  serif: "'Newsreader',serif",
  sans: "'Space Grotesk',system-ui,sans-serif",
  mono: "'JetBrains Mono',monospace",
};

// The site is framed as a single continuous journey, told in seven
// chapters. Each chapter keeps the same earth-toned base palette and
// typography, but carries its own accent color and small emblem — so the
// whole thing reads as one story told through different visual registers,
// rather than seven unrelated pages.
export const CHAPTERS = [
  { key: 'home', numeral: 'I', label: 'Prologue', accent: 'oklch(0.5 0.13 40)' },
  { key: 'about', numeral: 'II', label: 'Origin', accent: 'oklch(0.48 0.1 35)' },
  { key: 'research', numeral: 'III', label: 'Field Notes', accent: 'oklch(0.46 0.08 145)' },
  { key: 'projects', numeral: 'IV', label: 'Specimens', accent: 'oklch(0.56 0.11 75)' },
  { key: 'ventures', numeral: 'V', label: 'Growth', accent: 'oklch(0.5 0.12 30)' },
  { key: 'publications', numeral: 'VI', label: 'Manuscript', accent: 'oklch(0.38 0.06 255)' },
  { key: 'contact', numeral: 'VII', label: 'Trailhead', accent: 'oklch(0.58 0.14 55)' },
];

export const chapterFor = (key) => CHAPTERS.find((c) => c.key === key) ?? CHAPTERS[0];

export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
