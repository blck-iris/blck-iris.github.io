# Samuel Raju Bethala — Portfolio

A React + Vite portfolio site, ready to push to GitHub and deploy on GitHub
Pages.

## Structure

```
src/
  App.jsx              # layout, page state, custom cursor, full-screen menu
  theme.js             # earth palette, chapter metadata (numeral/label/accent)
  components/
    Header.jsx           # top bar: all chapter links visible (collapses <1180px)
    DotRail.jsx          # fixed right-edge vertical chapter rail (desktop)
    ChapterNav.jsx       # prev/next chapter cards at the end of every page
    ScrollProgress.jsx   # accent-tinted progress bar under the header
    Preloader.jsx        # 000-100 counter + name reveal intro
    ScrambleText.jsx     # decode-in text effect (a11y-safe via aria-label)
    FullScreenMenu.jsx   # dark nav overlay used on narrow screens
    CustomCursor.jsx     # lagging ring cursor that expands on hover
    Marquee.jsx          # infinite scrolling text strip
    SectionHeading.jsx   # oversized numeral + editorial heading, used per chapter
    Footer.jsx
    UI.jsx                # Pill, Eyebrow, Stat, Card
    AuroraBackground.jsx  # ambient drifting gradient blobs
    Reveal.jsx            # scroll-in fade/rise wrapper
    art/                  # per-chapter full-bleed SVG illustrations
  hooks/
    useMorphCanvas.js    # shape-morphing particle field (hero background)
    useFieldCanvas.js    # full-page background particle field, two depth layers
    useTilt.js           # 3D hover tilt for cards
    useReveal.js         # IntersectionObserver-based reveal-on-scroll
    useCountUp.js        # animate stat numbers up when scrolled into view
  pages/
    Home.jsx, About.jsx, Research.jsx, Projects.jsx,
    Ventures.jsx, Publications.jsx, Contact.jsx
public/
  assets/
    samuel.jpeg               # About-page photo
    Samuel_CV_Research.pdf    # CV, linked from menu + Contact page
```

### The concept

The site is one continuous journey told in seven numbered chapters
(I. Prologue -> VII. Trailhead). Each chapter carries its own accent color
and a hand-drawn full-bleed SVG motif (contour lines, growth rings, a
corkboard, a sprouting structure, an ink blot, a compass), but all share
the same deep-earth palette and oversized-numeral heading system -- so it
reads as one story told in different registers rather than unrelated pages.

### Navigation (four redundant ways around)

Navigation is deliberately never hidden behind a single control:

1. **Top bar** -- all seven chapter links visible at all times on desktop,
   with the active one underlined in that chapter's accent color. Collapses
   to a `MENU` toggle (full-screen overlay) below 1180px, where the links
   no longer fit.
2. **Dot rail** -- a fixed vertical rail on the right edge, one dot per
   chapter, active one filled and enlarged, label sliding out on hover.
   Desktop only.
3. **Prev / next chapter footer** -- large labelled cards at the end of
   every page, so the site can be read straight through like a book.
4. **Keyboard** -- left/right arrow keys move between chapters; `Escape`
   closes the mobile menu.

A thin scroll-progress bar under the header, tinted with the active
chapter's accent, shows position within the current chapter.

### Motion & interaction

- **Preloader** -- a 000-100 counter with the name wiping up into place,
  then the panel slides away. Click to skip; instant under reduced-motion.
- **Hero** -- full-viewport, with the shape-morphing particle canvas as a
  full-bleed background behind huge kinetic display type and a radial
  vignette. The canvas cycles molecule -> neural net -> cell cluster ->
  helix -> diagnostic grid, and the label re-scrambles on each change.
- **Scramble text** -- chapter labels decode from random glyphs into place.
  Real text is exposed via `aria-label` for screen readers.
- **Count-up stats** -- research metrics animate from zero when scrolled
  into view, preserving suffixes exactly (`94.74%`, `2.59M`, `5.9ms`).
- **Manifesto band** -- a full-bleed dark section with a large pull-quote,
  giving the page real tonal contrast.
- **Marquee** -- an infinite scrolling ticker of research themes.
- **Custom cursor** -- a lagging ring that expands over anything clickable
  (desktop only; auto-disabled on touch).
- **Horizontal specimen rail** -- the Projects chapter scrolls sideways
  through nine index-numbered panels.
- **Scroll reveals** -- sections and cards fade + rise on first view.
- **Reduced motion** -- every animation above is disabled or made instant
  when the visitor's OS requests reduced motion.

### Responsive

Structural components expose class hooks (`.gutter`, `.header-nav`,
`.dot-rail`, `.grid-collapse`, ...) that `src/index.css` targets with media
queries, since inline styles can't hold them. Breakpoints at 1180px
(navigation swap), 720px (gutters, stacking), and 480px (further stacking).

## Run locally

```bash
npm install
npm run dev
```

Open the printed localhost URL.

## Deploy to GitHub Pages

This repo includes a GitHub Actions workflow (`.github/workflows/deploy.yml`)
that builds and deploys automatically on every push to `main`.

1. **Set the base path.** Vite needs to know your repo name so asset URLs
   resolve correctly on `https://<user>.github.io/<repo-name>/`. Open
   `vite.config.js` and set:
   ```js
   const REPO_NAME = 'your-repo-name';
   ```
   If you're deploying to a **user/org page** (`https://<user>.github.io/`)
   or a **custom domain**, set `base: '/'` instead.

2. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo-name>.git
   git push -u origin main
   ```

3. **Enable Pages:** in the repo, go to **Settings → Pages → Build and
   deployment → Source**, and select **GitHub Actions**. The workflow will
   run automatically and publish the site — check the **Actions** tab for
   progress and the live URL.

### Alternative: manual deploy with `gh-pages`

```bash
npm run build
npm run deploy
```

This uses the `gh-pages` package (already in `devDependencies`) to push the
`dist/` folder to a `gh-pages` branch. Then set Pages' source to that branch
in repo settings.

## Notes

- Colors use the CSS `oklch()` function directly, supported in all current
  browsers.
- Fonts (Newsreader, Space Grotesk, JetBrains Mono) are loaded from Google
  Fonts in `index.html`.
- All internal asset links (CV, photo) go through `asset()` in `theme.js`,
  which prefixes Vite's `BASE_URL` — so they keep working regardless of the
  `base` path you set for GitHub Pages.
