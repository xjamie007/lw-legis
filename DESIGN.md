---
name: Étude d'Avocats LW LEGIS
description: The classic Luxembourg law-firm site, navy and gold, set with care.
colors:
  marine: "#13294b"
  marine-tief: "#0c1c36"
  or: "#a07c3c"
  or-clair: "#cdb27f"
  marine-texte: "#b9c3d3"
  encre: "#0e1a2b"
  texte: "#2b3442"
  gris: "#5b6575"
  trait: "#d9dde3"
  bordure: "#858e9b"
  brume: "#f3f4f6"
  blanc: "#ffffff"
  erreur: "#a32020"
typography:
  display:
    fontFamily: "Spectral, 'Iowan Old Style', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.75rem, 1.55rem + 4.4vw, 5rem)"
    fontWeight: 300
    lineHeight: 1.04
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Spectral, 'Iowan Old Style', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(2.25rem, 1.5rem + 2.6vw, 3.5rem)"
    fontWeight: 300
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Spectral, 'Iowan Old Style', Georgia, 'Times New Roman', serif"
    fontSize: "clamp(1.75rem, 1.3rem + 1.6vw, 2.5rem)"
    fontWeight: 400
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  entry:
    fontFamily: "Spectral, 'Iowan Old Style', Georgia, 'Times New Roman', serif"
    fontSize: "1.375rem"
    fontWeight: 400
    lineHeight: 1.3
  lead:
    fontFamily: "'Hanken Grotesk', 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "clamp(1.125rem, 1.05rem + 0.35vw, 1.3125rem)"
    fontWeight: 400
    lineHeight: 1.55
  body:
    fontFamily: "'Hanken Grotesk', 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.65
  label:
    fontFamily: "'Hanken Grotesk', 'Segoe UI', system-ui, -apple-system, 'Helvetica Neue', Arial, sans-serif"
    fontSize: "0.8125rem"
    fontWeight: 600
    letterSpacing: "0.06em"
rounded:
  none: "0"
spacing:
  gouttiere: "clamp(1.25rem, 4vw, 3rem)"
  section: "clamp(4rem, 2.5rem + 6vw, 7.5rem)"
  largeur: "76rem"
  mesure: "68ch"
  entete: "5.25rem"
components:
  button-primary:
    backgroundColor: "{colors.marine}"
    textColor: "{colors.blanc}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.6rem"
    height: "3.25rem"
  button-primary-hover:
    backgroundColor: "{colors.marine-tief}"
    textColor: "{colors.blanc}"
  button-gold:
    backgroundColor: "transparent"
    textColor: "{colors.blanc}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.6rem"
    height: "3.25rem"
  button-gold-hover:
    backgroundColor: "{colors.or-clair}"
    textColor: "{colors.marine-tief}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.marine}"
    rounded: "{rounded.none}"
    padding: "0.85rem 1.6rem"
  button-outline-hover:
    backgroundColor: "{colors.marine}"
    textColor: "{colors.blanc}"
  filter-chip:
    backgroundColor: "{colors.blanc}"
    textColor: "{colors.texte}"
    rounded: "{rounded.none}"
    padding: "0.45rem 1rem"
    height: "2.5rem"
  filter-chip-active:
    backgroundColor: "{colors.marine}"
    textColor: "{colors.blanc}"
  input:
    backgroundColor: "{colors.blanc}"
    textColor: "{colors.encre}"
    rounded: "{rounded.none}"
    padding: "0.75rem 0.9rem"
    height: "3.1rem"
  aside-box:
    backgroundColor: "{colors.marine}"
    textColor: "{colors.marine-texte}"
    rounded: "{rounded.none}"
    padding: "2rem"
---

# Design System: Étude d'Avocats LW LEGIS

## Overview

**Creative North Star: "The Bound Register"**

The category standard for a law firm, executed at full craft: white pages, deep navy bands, the firm's gold arms, real photographs of the office and of Me Lorang, and type set with care. The reference shelf is Elvinger Hoss Prussen, Arendt & Medernach and Bredin Prat. The system earns trust through restraint, not ornament: everything is ruled, aligned and quiet, the way a well-kept register is.

The page alternates three grounds in a fixed vocabulary. Navy carries the moments of address (hero, the "atouts" band, the closing appointment band); deep navy carries the frame (utility bar, footer); white carries reading, with sections separated by a single hairline; a cool mist ground marks the start of every inner page and the home activities band. Content is organised as ruled lists, never as tiles. Gold appears as a line, an arrow, a focus ring and the arms; as text it appears only on navy.

Density is generous but not airy: sections breathe on a fluid 4 to 7.5rem rhythm, measure is held at 68ch, and the two-column split is the default composition from 62rem up. Motion is nearly absent: one hero entrance, a few hover transforms, nothing that fades content in.

**Key Characteristics:**
- White ground, navy bands, gold only as line or as text on navy.
- Spectral at light weight for headings, Hanken Grotesk for text and interface.
- Ruled lists instead of cards; hairlines instead of shadows.
- Square corners everywhere.
- Real photographs only, cropped edge to edge.

## Colors

A cool, dark navy family with one warm metal accent, held to WCAG 2.2 AA by a checked contrast table (`scripts/check-contrast.mjs`, `docs/kontrast.md`).

### Primary
- **Chancery Navy** (marine): The firm's colour. Hero, "atouts" and appointment bands, the activity-page side box, solid buttons, active filters, link text on white, the open mobile menu.
- **Night Navy** (marine-tief): The frame. Utility bar above the header, footer, button hover on white, text on the gold button.

### Secondary
- **Arms Gold** (or): The gold of the coat of arms. Rules, arrows, the focus ring, list markers, link underlines, the menu underline and the logo. 3.86:1 on white: graphic only, never text.
- **Pale Gold** (or-clair): Gold as text, on navy only (7.1:1 on marine, 8.3:1 on deep navy): hero proof line, phone numbers, footer column titles, current language, the gold button outline and its hover fill.

### Neutral
- **Ink** (encre): Headings, menu, form values, strong text.
- **Body Slate** (texte): Running text.
- **Quiet Grey** (gris): Leads, secondary text, labels, breadcrumbs.
- **Mist Blue-Grey** (marine-texte): Secondary text on navy and deep navy.
- **Hairline** (trait): Every rule and divider on light grounds.
- **Field Border** (bordure): Form field borders (3.31:1, meets 1.4.11).
- **Mist** (brume): Inner-page header ground and the home activities band.
- **Paper White** (blanc): The default ground.
- **Error Red** (erreur): Form errors only.

### Named Rules
**The Gold Is Metal Rule.** Arms Gold never carries text on a light ground. If gold must be read, it is Pale Gold on navy.

**The Three Grounds Rule.** A section is white, mist or navy; nothing else. White sections that follow white sections are separated by one hairline, not by a tint.

## Typography

**Display Font:** Spectral (with Iowan Old Style, Georgia, Times New Roman), self-hosted at 300/400/500.
**Body Font:** Hanken Grotesk (with Segoe UI, system-ui, Helvetica Neue, Arial), self-hosted at 400 to 700.

**Character:** A light, slightly literary serif for every heading and named entry against a clean, firm grotesque for reading and operation. The contrast is calm, not dramatic; the serif is never bold.

### Hierarchy
- **Display** (300, fluid 2.75 to 5rem, 1.04, -0.02em): The home hero headline only, max 12ch, white on navy.
- **Headline** (300, fluid 2.25 to 3.5rem, 1.15): Inner-page h1 in the mist header (max 24ch) and the large home section titles.
- **Title** (400, fluid 1.75 to 2.5rem, 1.15): Section titles, max 22ch; balanced wrapping.
- **Entry** (Spectral 400, 1.375rem, 1.3): Titles of register rows, the "atouts" lines, names, the hero phone number. Prose h3 uses it at 500.
- **Lead** (400, fluid 1.125 to 1.3125rem, 1.55): The paragraph under a title, Quiet Grey, max 58ch.
- **Body** (400, 1.0625rem, 1.65): Running text, max 68ch, pretty wrapping, kerning and ligatures on.
- **Label** (600, 0.75 to 0.8125rem, 0.04 to 0.1em, uppercase): Names a list or a datum, never a heading: footer column titles, contact definition terms, aside-list headings, entry metadata.

### Named Rules
**The Light Serif Rule.** Headings are Spectral at 300 or 400; 500 is the ceiling (prose h3, ordered-list numerals).

**The Label Names Data Rule.** Small uppercase text labels a list, a field or metadata. It never sits above a heading as a kicker.

## Layout

A centred container of 76rem plus a fluid gutter (1.25 to 3rem). Sections pad on a fluid 4 to 7.5rem block rhythm; the "atouts" band is tighter (3.5 to 5rem). Reading measure is 68ch.

The composition is two columns from 62rem: hero text against an edge-to-edge office photograph (0.85fr, full height, min(80vh, 44rem)); section title against lead; text against a portrait or network list; content against a sticky 21rem side column on detail pages. Below 62rem everything stacks in source order. The register list goes two-column at 56rem. The hero and the side column align their inner edge to the container even when the band runs full bleed.

The header is sticky: a 2.5rem deep-navy utility bar (address from 48rem, email from 64rem, FR | EN) over a 5.25rem white bar with the arms and navigation. Below 64rem the navigation collapses to a menu button.

## Elevation & Depth

Flat. Content carries no shadows; depth comes from ground changes (white, mist, navy, deep navy) and from 1px hairlines. The single box-shadow in the system is the form-field focus halo (3px navy at 18%), which is a state, not elevation.

### Named Rules
**The Hairline Rule.** Separation is a 1px rule in Hairline on light grounds, or Mist Blue-Grey at 22 to 30% on navy. Never a shadow, never a card.

## Shapes

Square corners everywhere: buttons, fields, filters, the side box, photographs. Lines are the only ornament: 1px hairlines for structure, a 2px Arms Gold rule to close a block heading (contact details, networks) or open a caption (portrait), short gold dashes as bullet markers. Photographs are cropped hard to fixed ratios (4:5 portrait, 16:9 landscape, full-height hero) with no frame.

## Components

### Buttons
Firm and plain; a button is a navy rectangle or a gold-ruled one.
- **Shape:** square corners, 3.25rem minimum height, 600 weight at 0.9375rem with 0.02em tracking, optional trailing arrow at 1.1em.
- **Primary (on white):** solid Chancery Navy, white text; hover deepens to Night Navy. 200ms colour transitions.
- **Gold (on navy):** transparent with a 1px Pale Gold outline and white text; on hover it fills Pale Gold with Night Navy text.
- **Outline (on white):** 1px navy outline, navy text; fills navy on hover.
- **Focus:** the global 2px Arms Gold outline at 3px offset.

### Arrow Link
A 600-weight navy text link with a 1px Arms Gold underline and a trailing arrow that moves 4px right on hover. Pale Gold on navy. Used for "see all" and "learn more" exits.

### Chips (filters)
- **Style:** 1px Hairline border, white ground, 500 weight, 2.5rem high, square.
- **State:** hover borders in navy; pressed (aria-pressed) fills navy with white text. On mobile the row scrolls sideways with a faded right edge.

### Cards / Containers
There are no cards. The one boxed container is the side box on detail pages: solid navy, 2rem padding, white Spectral title, Pale Gold phone link, a navy-band button inside.

### Inputs / Fields
- **Style:** 1px Field Border, white ground, square, 3.1rem high, labels above in 600 Ink.
- **Focus:** border turns navy with a 3px navy halo at 18%.
- **Error:** Error Red border and message; a red-ruled summary box above the form.

### Navigation
Hanken Grotesk 500 at 0.9375rem in Ink; a 2px Arms Gold underline scales in from the left on hover and stays for the current page. On mobile the menu opens instantly (no animation) as a full navy panel below the header with Spectral 300 links at 1.75rem, hairline-separated, current page in Pale Gold, contact details at the foot.

### Ruled Register (signature)
The system's index form for activities, thematic files and conferences. A list of rows between hairlines; each row is a Spectral entry title, an optional grey description (max 62ch) and a gold arrow at the right. On hover (pointer devices only) the title and text slide 0.5rem right, the arrow 0.25rem, and a 2px, 4rem Arms Gold rule scales in from the left along the top edge, all on 450ms cubic-bezier(0.22, 1, 0.36, 1). A two-column variant splits rows from 56rem. Metadata sits under the entry as uppercase labels.

### Inner-Page Header
Every inner page opens on a mist band with a hairline below: breadcrumb (slash-separated, grey), a Headline h1 at 300, an optional lead.

## Do's and Don'ts

### Do:
- **Do** use Arms Gold (#a07c3c) only for rules, arrows, markers, the focus ring and the arms; use Pale Gold (#cdb27f) for gold text, on navy only.
- **Do** build indexes as ruled register rows between 1px hairlines.
- **Do** separate consecutive white sections with one hairline, and use mist for inner-page headers and the home activities band.
- **Do** put solid navy buttons on white and gold-outline buttons on navy.
- **Do** keep every corner square.
- **Do** run `npm run check:contrast` when a colour pair is added.
- **Do** keep motion to transforms; the hero entrance moves 0.75rem up with no fade, and reduced motion is respected.

### Don't:
- **Don't** set gold text on white or mist.
- **Don't** put a gold dash, kicker or eyebrow above a heading.
- **Don't** use cards, tiles or icon grids for content.
- **Don't** add shadows to content or round any corner.
- **Don't** fade content in or animate the menu.
- **Don't** use stock imagery; only the firm's own photographs and arms.
- **Don't** set Spectral above 500.
