# Design

## Visual Theme

A single-page **scroll journey from light to dark**. The page opens as a calm,
warm, paper-white studio: editorial, gallery-like, generous white space. As the
visitor scrolls from the about block into the projects, the canvas gradually
deepens into a cinematic tinted near-black, the way a game trailer dims the room
before it plays. The header and about block compress and dock as you scroll so
they cost little space yet stay reachable.

Mood sentence: *a design lead, on their phone, late, scanning portfolio number
nine, who slows down because this one feels considered.*

The aesthetic is editorial-minimal with a craft undertone, not gamer, not SaaS,
not template. Restraint dominates; innovation is rationed to one signature moment
per project that reveals how that project actually works.

## Color

Strategy: **Committed neutrals + rationed accent.** The light-to-dark canvas
carries the experience; a single warm accent signals craft, and each project
borrows one quiet signature hue from its own art. Neutrals are never pure, always
tinted toward warm paper at the light end and cool ink at the dark end. OKLCH
throughout; chroma pulled low near the lightness extremes.

### Canvas (scroll-interpolated, light to dark)

- `--paper`          `oklch(0.985 0.004 85)`   warm near-white, top of page
- `--paper-sunk`     `oklch(0.955 0.006 80)`   recessed light surfaces
- `--ink-deep`       `oklch(0.19 0.012 265)`   cool tinted near-black, projects
- `--ink-deepest`    `oklch(0.145 0.014 265)`  footer / deepest point

### Text

- `--text-on-light`  `oklch(0.24 0.012 270)`   near-black ink (AA on paper)
- `--muted-on-light` `oklch(0.50 0.010 270)`
- `--text-on-dark`   `oklch(0.94 0.004 85)`    warm off-white (AA on ink)
- `--muted-on-dark`  `oklch(0.70 0.008 85)`

### Accent

- `--accent`         `oklch(0.70 0.13 55)`    warm terracotta/amber, reads as
  hand-drawn ink; legible on both light and dark. Used for active links, the
  signature animation highlights, focus rings. Kept under ~10% of any view.

### Per-project signature hues (used sparingly: tags, hovers, the one animation)

- Crazy Cups   `oklch(0.74 0.14 25)`   playful warm red (cups/illustration)
- MegaKill     `oklch(0.72 0.15 145)`  toxic chaotic green (rogue-like energy)
- Aye Captain! `oklch(0.70 0.11 230)`  sea/ink blue (pirate, documentation)
- Stick Sort   `oklch(0.76 0.12 90)`   clean amber-gold (broad, satisfying)

## Typography

Voice words: calm, precise, curious. Physical object: a design-documentation
manual / museum caption. Reflex picks (Fraunces, Inter, Space Grotesk) rejected
as training-data defaults. Pairing reads as *considered design documentation*,
never dev-portfolio, never editorial-magazine glossy.

- **Display / headings — Bricolage Grotesque** (variable, optical sizing). A
  contemporary grotesque with a deliberate, slightly idiosyncratic POV. Calm at
  text sizes, characterful at display sizes. Carries project titles and section
  heads with weight + size contrast, not decoration.
- **Body / UI — Hanken Grotesk** (humanist grotesque). Calm, highly legible at
  small mobile sizes, neutral support for long-form project writing. Contrast
  with Bricolage comes from personality + weight, not a forced serif/sans split.
- **Data — Geist Mono** (monospace), used sparingly and only for *real* data:
  economy figures (Aye Captain!'s currencies), section indices ("01 / 04"),
  numeric specs. NOT for prose or as generic "technical" flavor.
- **Genre/platform spec lines** ("Hyper-Casual · Mobile · Pre-Release") are set
  in Hanken Grotesk, uppercase, tracked, muted, not mono. Keeps mono honest.

Rules: body 16–18px, line length 60–70ch, line-height ~1.6 body (add ~0.05 for
light-on-dark sections). Fluid `clamp()` headings, modular scale ratio ~1.30,
≥1.25 between steps. Hierarchy via scale + weight, not color.

## Layout

- Mobile-first single column; content max-width ~68ch for prose.
- The header + about dock and compress on scroll (sticky, shrinking), staying
  clickable, never occupying more than a slim bar once projects begin.
- Each project is a full section with a layout tuned to its evidence:
  - **Crazy Cups (hero):** vertical illustrations beside/within text; the most
    complete, most spacious section. Portrait visuals drive the rhythm.
  - **MegaKill:** pixel-art presented in a deliberate gallery; icons sized and
    framed so they feel like artifacts, not thumbnails. Mobile screens + square
    pixel grid + horizontal shots each get their own treatment.
  - **Aye Captain! / Stick Sort:** text and structure heavy. Typographic
    hierarchy, mono data points, and simple diagrams (e.g. the currency/prestige
    economy) replace missing imagery so they feel substantial.
- Avoid identical card grids. Vary spacing for rhythm. Containers only where they
  earn it.

## Motion

Calm base, one signature reveal per project, all GPU-friendly (transform/opacity
only, never animating layout properties).

- Easing: ease-out-expo / quint. No bounce, no elastic.
- Scroll: IntersectionObserver for reveals; a single scroll-progress value drives
  the light→dark canvas interpolation and the header dock.
- Signature moments (concept): Crazy Cups cups stack into place on scroll;
  MegaKill pixel assets assemble pixel-by-pixel / snap into a grid; Aye Captain!
  currency-flow diagram animates connections; Stick Sort elements sort into
  order. Each illustrates the actual mechanic.
- **prefers-reduced-motion:** full calm fallback. Scroll-driven and decorative
  motion collapses to instant or a short fade; light→dark may resolve to two
  static states. Content and meaning unchanged.

## Accessibility

WCAG 2.1 AA. AA contrast verified at both light and dark ends and through the
transition. Full keyboard operability, visible `--accent` focus rings, semantic
landmarks (`header`, `main`, `section`, `footer`), real heading order, alt text
on all illustrations and pixel art.
