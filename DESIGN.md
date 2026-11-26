---
name: Aayush Pokhrel, Portfolio
description: A field notebook of shipped work, every claim measured.
colors:
  paper: "#f7f5f0"
  paper-deep: "#efece4"
  ink: "#1a1814"
  graphite: "#6b6660"
  forest: "#2a5c45"
  sage: "#7cc4a0"
  rule: "#ddd9d2"
typography:
  display:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(3.4rem, 12vw, 6rem)"
    fontWeight: 400
    lineHeight: 1
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "clamp(1.6rem, 3vw, 2.2rem)"
    fontWeight: 400
    lineHeight: 1.2
  title:
    fontFamily: "DM Serif Display, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 400
    lineHeight: 1.2
  body:
    fontFamily: "DM Mono, monospace"
    fontSize: "15px"
    fontWeight: 300
    lineHeight: 1.7
  body-content:
    fontFamily: "DM Mono, monospace"
    fontSize: "14px"
    fontWeight: 300
    lineHeight: 1.8
  label:
    fontFamily: "DM Mono, monospace"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: "0.2em"
  label-small:
    fontFamily: "DM Mono, monospace"
    fontSize: "11px"
    fontWeight: 300
    letterSpacing: "0.1em"
rounded:
  none: "0"
  pill: "99px"
spacing:
  gutter: "2rem"
  entry: "2rem"
  section: "72px"
  container: "720px"
components:
  button:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.6rem 1.4rem"
  button-hover:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
  button-primary-on-ink:
    backgroundColor: "{colors.paper}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: "0.6rem 1.4rem"
  button-primary-on-ink-hover:
    backgroundColor: "{colors.sage}"
    textColor: "{colors.ink}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.none}"
    padding: "0.6rem 1.4rem"
  section-label:
    backgroundColor: "{colors.forest}"
    textColor: "{colors.paper}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0.22em 0.6em"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    typography: "{typography.label-small}"
    rounded: "{rounded.none}"
    padding: "0.2rem 0.6rem"
  status:
    backgroundColor: "transparent"
    textColor: "{colors.forest}"
    rounded: "{rounded.pill}"
    padding: "0.1rem 0.45rem"
---

# Design System: Aayush Pokhrel, Portfolio

## Overview

**Creative North Star: "The Field Notebook"**

Ruled paper, ink, and one forest-green pen. The site reads like work written down as it happened: a serif for the things worth naming, a light monospace for everything measured, and a number in the margin of every claim. A visitor should come away with three words: rigorous, honest, shipped.

Density is a single 720px reading column on warm paper, broken into sections by hairline rules and a slightly deeper paper band on alternate sections. The page opens and closes on ink (the dark hero and the dark contact and footer), like the covers of a notebook. There are no shadows, no gradients, no rounded cards: structure comes from rules, spacing and inversion.

**Key Characteristics:**
- One warm paper family, one ink, one forest accent with a sage twin for dark surfaces.
- Serif for names (people, projects, logs), monospace for data and prose.
- Hairline rules instead of boxes; inversion instead of colour for emphasis.
- Every project card and entry carries a measured figure.
- Motion is rare and spatial: things arrive from where they came from.

## Colors

A warm, low-chroma paper palette with a single deep green that does all the pointing.

### Primary
- **Forest Ink** (#2a5c45): the one accent. Section label boxes and their rules, the scroll-progress thread, the current-nav underline, tag and status text, the dash before each project point. Never body text, never a background larger than a label.
- **Sage** (#7cc4a0): Forest's twin for ink surfaces, where Forest would vanish. The hero's italic "CS & AI.", spec-strip labels, the contact label box, and the hover of the hero's primary button.

### Neutral
- **Paper** (#f7f5f0): the page.
- **Deep Paper** (#efece4): alternate section bands (Experience, Field logs) so the long scroll has rhythm.
- **Ink** (#1a1814): headings, the hero and contact surfaces, primary text, link text.
- **Graphite** (#6b6660): secondary prose, dates, figures, captions. Tuned to 4.8:1 on Deep Paper (it was #726d67 at 4.3:1, which failed AA on the bands).
- **Rule** (#ddd9d2): every hairline: section borders, entry dividers, link underlines, tag borders.

### Named Rules
**The One Pen Rule.** Forest is the only colour that points. If something needs emphasis and is not a label, rule or current state, it gets ink or inversion, not green.

**The Graphite Floor Rule.** Graphite must hold 4.5:1 on Deep Paper, the darker of the two paper tones. Any change to `--muted` or `--bg-2` is checked against that pair first.

## Typography

**Display Font:** DM Serif Display (with Georgia, serif)
**Body Font:** DM Mono, weight 300 (with monospace)

**Character:** A bookish serif for names set against a light, even monospace for the record. The mono is the voice of measurement, the serif the voice of the thing measured.

### Hierarchy
- **Display** (400, clamp(3.4rem, 12vw, 6rem), 1.0, -0.025em): the hero name only.
- **Headline** (400, clamp(1.6rem, 3vw, 2.2rem), 1.2): the contact headline and section headings.
- **Title** (400, 1.1 to 1.5rem, 1.2): project, card, role and log titles.
- **Body** (300 mono, 15px, 1.7): page default and hero lead.
- **Body content** (300 mono, 14px, 1.8): project leads and points, field log paragraphs, role bullets, card lines, section leads. Raised from 13px in November 2026.
- **Label** (400 mono, 14px, 0.2em, uppercase): section labels.
- **Small label** (mono, 11px, 0.1em, uppercase): tags, link rows, dates, captions, status pills. 11px is the floor; nothing renders smaller.

### Named Rules
**The Eleven Floor Rule.** No text below 11px. Tags and labels were 9 to 10px and read as noise; at 11px they still sit back but can be read.

**The Name Gets the Serif Rule.** Serif is for proper names and headings. Prose, numbers and controls stay mono.

## Layout

One centred column, `max-width: 720px`, side padding `max(2rem, safe-area inset)`. Sections pad 72px top and bottom with a hairline below. Entries inside a section are separated by a 1px rule and 2rem of padding. Project and card entries use a two-column grid of `3rem 1fr`: a small number in the margin, the content beside it; below 560px the number column drops. Galleries bleed 6.5rem past the column on screens of 980px and wider, the one place work is allowed to leave the text measure.

Responsive points: the nav becomes a "Menu" drawer at 600px; the hero spec strip and the hero buttons become two columns at 580px.

A `work.html` entry reads lead, four points, gallery, tags, links, in that order: what the project is comes before what it looks like.

## Elevation & Depth

Flat. There are no box shadows anywhere. Depth comes from two things only: the paper/deep-paper tonal bands, and the ink surfaces at the top and bottom of the page. The fixed nav is translucent paper with a 10px backdrop blur (translucent ink over the hero) so content passes under it without a shadow line.

### Named Rules
**The No Shadow Rule.** Separation is a 1px Rule-coloured hairline or a tonal band. A shadow would be the first one on the site.

## Shapes

Square. Buttons, tags, label boxes, gallery frames and the lightbox all have zero radius. The one exception is the status pill beside a card title (`border-radius: 99px`), which reads as a stamp rather than a control. Screenshots sit in a white frame with a 0.4rem inset and a Rule border, like a photo taped into the notebook.

## Components

Square, ruled, quiet: hairline borders, no radius, no shadow, emphasis by inversion.

### Buttons
- **Shape:** square (0 radius), 1px border, mono 12px uppercase with 0.1em tracking, padding 0.6rem 1.4rem.
- **Default:** ink border and text on paper; hover inverts to ink fill with paper text.
- **Ghost:** Rule border, Graphite text; hover brings the border and text to ink.
- **On ink (hero):** one primary per surface, filled Paper with ink text, hover to Sage. The rest are ghost (translucent paper border). The hero has exactly one primary: "13 projects".
- **Press:** `scale(0.97)` while pressed, 160ms.
- **Phone:** hero buttons sit in an even 2x2 grid; a wrapped label stretches its row-mate to the same height.

### Tags and status
- **Tag:** Forest text, 11px uppercase, 1px border of Forest at 30% opacity, no fill.
- **Status pill:** same, with a pill radius; marks live or playable work beside a card title.

### Section label
The site's signature: a short Forest tick, a filled Forest box with the label in Paper, then a Forest rule to the edge. On ink it flips to a Sage box with ink text. On `work.html`, `experience.html` and `notes.html` the first label is the page's `<h1>`; elsewhere it is an `<h2>`. The rules draw left to right as the section scrolls in.

### Links
- **In prose:** ink text with a 1px Rule underline offset 3px; the underline darkens to the text colour on hover. This is the element-level default, so a link nobody styled still belongs to the palette.
- **Link rows** (project links, contact): 11 to 12px uppercase mono with a 1px Rule bottom border that turns ink on hover.

### Navigation
Fixed 52px bar: "AP" mono logo left, six uppercase 12px links right. Over the dark hero it turns translucent ink with paper text. The current page (`aria-current="page"`) or, on the index, the section in view carries ink text and a 2px Forest underline. Below 600px the links collapse into a "Menu" drawer of 48px rows on solid Paper.

### Lightbox
Screenshots open in a full-screen ink overlay at 92% opacity. Escape, the Close button, a click on the backdrop, or a swipe down on touch closes it, and focus returns to the thumbnail.

### Motion
Motion explains where something came from; it is never decoration and never on keyboard-repeated actions. Three curves, defined once in `:root`:

- **`--ease-out`** `cubic-bezier(0.16, 1, 0.3, 1)`: anything entering or leaving. Section reveals (0.6s, 14px rise), the hero ink-in, press feedback, snap-backs.
- **`--ease-in-out`** `cubic-bezier(0.77, 0, 0.175, 1)`: something travelling between two places on screen. The lightbox morph (0.34s).
- **`--ease-drawer`** `cubic-bezier(0.32, 0.72, 0, 1)`: the mobile menu opening (0.22s, 8px drop). It closes faster (0.16s, `--ease-out`) because closing is the system's response, not a decision.

Signature moments:
- **Hero ink-in:** the name inks in line by line on first load (blur 7px to 0, 0.72s, staggered 90ms), then the lead, buttons and spec strip rise in. Once, on load only.
- **Lightbox morph:** the clicked thumbnail grows into the enlarged image through a View Transition and shrinks back into its thumbnail on close. The image is cleared only after the exit finishes.
- **Swipe to close:** on touch the image follows the finger 1:1 and the backdrop thins with it; a drag past 18% of the viewport or a flick faster than 0.11px/ms closes, anything less snaps back in 0.24s.

Reduced motion keeps fades and drops movement: no rise, no scale, no morph, no drawer drop, no smooth scroll.

## Do's and Don'ts

### Do:
- **Do** put a measured figure on every project card and entry.
- **Do** use Forest only for labels, rules, tags and the current state (The One Pen Rule).
- **Do** keep text at 11px or larger and Graphite at 4.5:1 or better on Deep Paper.
- **Do** take every motion curve from the three `--ease-*` tokens.
- **Do** keep one primary button per surface.

### Don't:
- **Don't** add shadows, gradients or rounded cards; separation is a hairline or a tonal band.
- **Don't** introduce a second accent colour or a new typeface.
- **Don't** animate anything that repeats under the hand (nav links, keyboard actions); only arrivals, departures and the lightbox move.
- **Don't** leave a link unstyled, or let a browser default (blue links, grey selection) show through.
- **Don't** put a gallery before the sentence that says what the project is.
