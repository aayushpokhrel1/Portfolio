# Splitting the portfolio into three pages

Design, 2026-11-07. Decided with Aayush in conversation; this file is the record so the
decisions are not only in a chat log.

**What shipped: four pages, not three.** The compressed experience section this design called
for turned out to be a page telling the reader to leave, so `experience.html` was added the
same day. The rest of the design shipped as written. This file is left as the dated design it
was; `CLAUDE.md` holds the current page map.

## Why

The site had grown to 5,091 words, about 22 minutes of reading, in one `index.html`. The
growth was not padding: 13 field logs (2,753 words) and 8 full project entries plus 5 compact
ones (1,960 words) are all content worth keeping, and the logs are on record in the vault as
the thing that differentiates the site from any other project list. The problem is that the
page asks for 22 minutes before it has given the reader a reason to spend them.

Measured before the change:

| Section | Words |
| --- | --- |
| hero | 61 |
| about | 131 |
| experience | 153 |
| work | 1,960 |
| notes | 2,753 |
| contact | 33 |
| **total** | **5,091** |

## Intent

**The landing page's job is to answer "what is he about", not "what has he built".** That is
Aayush's own answer to what a reader with 30 seconds should walk away knowing. The projects
are evidence for that claim, not a catalogue to be impressed by. This reframing is the reason
an index page does not read as thin: every card has to carry evidence for the claim, which is
also why every card carries a measured figure.

The claim itself, in substance: an engineer who measures his own claims and reports what he
finds, including when the finding kills the work. That evidence is already written down, which
is why the claim can be shown rather than asserted in an adjective:

- a working model deleted because it was beating the wrong baseline, said so in the entry
- eight evaluation terms A/B tested, four shipped, three plausible ones recorded as failures
- a benchmark in his own tool caught scoring its failures as its best result
- a privilege nobody granted found by probing his own API with the key that ships in the browser
- tooling built so each lesson cannot be re-learned (a note writer that takes paths and no text, a board that reads status out of git)

## Goals

- A landing page of about 900 words, four minutes, that states the claim and backs it with 13 cards.
- Every word currently on the site stays reachable. Nothing is deleted.
- The depth is one click away, not hidden behind an interaction.
- All content reachable with JavaScript off.

## Non-goals

- No build step, no bundler, no framework. Still hand-authored HTML.
- No CMS or data-driven rendering of entries. There are 13 and they are edited by hand.
- Not a redesign of the visual language. Same type, colour, spacing and components.

## Anti-goals (what would make this a failure even if it technically works)

- **A thin index.** If the cards carry no figures, the page becomes a link farm and the
  split has made the site worse. Every card carries a measurement.
- **Content quietly lost in the move.** A word count per page before and after must account
  for all 5,091 words.
- **Three drifting copies of the CSS.** The repo's own docs name duplicated knowledge as the
  cause of wrong work. This is the same failure in a stylesheet.
- **A page that needs JS to show its content.** The site already shipped that bug once, when
  an `IntersectionObserver` threshold hid the whole Projects section.

## The pages

### `index.html` (~900 words)

1. **Hero.** Reworked. The current subtitle ("I build and ship multi-service ML and data
   products end to end") is the generic claim every portfolio makes. It is replaced by the
   positioning above, in Aayush's register, plus the existing status / focus / based /
   graduated spec list, which is dense and useful and stays.
2. **About, compressed**, and the skills lists, which are scannable already and stay.
3. **Experience, compressed** to role, employer, dates and one line each. The three bullets
   per role move to the resume PDF, which is already linked and is where a reader expecting
   bullets will look.
4. **Projects: 13 cards.** Two groups, preserving the honesty of the current split: eight
   primary cards, then five under "Also". Each card: name, status marker where something is
   live or playable, a one-line description, the measured figures, the stack as chips, and
   links. Each card links into `work.html` at that project's anchor.
5. **Notes: 13 titles** with their project label, each linking into `notes.html` at that
   log's anchor. Titles only. They carry the range on their own.
6. **Contact**, unchanged.

### `work.html` (~1,960 words)

The eight full entries exactly as they are, with the four points, the galleries and the six
tags, then the five "Also" entries. Each entry gets a stable `id` for the index to link to.

### `notes.html` (~2,753 words)

The 13 field logs in full, in their current interleaved order (no project twice in a row).
Each gets a stable `id`.

## How it is built

Decided here, as my call rather than Aayush's:

- **`styles.css` and `site.js` are extracted and shared by all three pages.** Three inline
  copies would drift, which is the failure the repo's own docs warn about. This is the one
  decision that contradicts a standing record: `CLAUDE.md` and the vault both state
  "everything lives in one `index.html`". Both are corrected in the same change.
- **The nav becomes cross-page.** Links are `index.html#about`, `work.html`, `notes.html`,
  the resume PDF, `index.html#contact`. The current nav is same-page anchors only.
- **Each page gets its own `<title>`, description, canonical and OG tags.** Three pages
  sharing one set of social metadata would misrepresent two of them.
- **Anchors are stable kebab-case slugs** derived from the project or log title, not indexes,
  so reordering does not break an inbound link.
- **The reveal script's safety net travels with `site.js`**, so no page can repeat the blank
  section bug.
- Relative paths throughout, since the site is served from a repo subpath on GitHub Pages
  (`/Portfolio/`) and absolute `/assets/...` would break there.

## Shape rules (extending the ones in `CLAUDE.md`)

The existing rules stand for `work.html`: a 33 to 48 word lead, exactly four `<li>` points,
six tags. Two new ones:

- **An index card is one line of 12 to 24 words, plus at least one measured figure.** A card
  without a figure is the thin-index failure above.
- **A field log is two paragraphs and three tags**, which all 13 already are. The index lists
  titles only.

## Verification

- Word count per page summing to the pre-change total, with nothing dropped.
- Every project and log reachable from the index, every anchor resolving.
- The existing shape checker still passes over `work.html`.
- All three pages parse with no unclosed tags.
- No em or en dashes anywhere (a standing rule of Aayush's).

## Left to the builder

- The exact wording of the hero's positioning line, drafted from the claim above and shown
  for approval rather than assumed.
- Card density and grid behaviour at phone width.
- Whether the five "Also" cards are visually lighter than the eight, or only grouped.
