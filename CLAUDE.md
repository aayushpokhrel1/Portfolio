# Working in this repo

Personal portfolio site.

## Where things are written down

| File | What it holds |
| --- | --- |
| `README.md` | What it is and how to run it |
| `index.html` | The way in: the hero's claim, a compressed about and experience, 13 project cards, the 13 field log titles, contact. |
| `experience.html` | All five roles in full with their bullets, what the UDRI research turned into, and education including coursework. |
| `work.html` | The 8 full project entries (lead, four points, gallery, tags) and the 5 compact "Also" entries. |
| `notes.html` | The 13 field logs in full. |
| `styles.css` | All CSS for all four pages. **One copy on purpose**: a copy per page drifts, and drift is what causes wrong work. |
| `site.js` | All JS for all four pages: the reveal, the nav drawer, the lightbox, the scroll spy, the copy button. Same reason. |
| `docs/superpowers/specs/` | The design of a change, written before building it. The three-page split is `2026-11-07-three-page-split-design.md`. |

Still no build step and no package manager. Four hand-authored pages, one stylesheet, one
script, served as files.

**A section lead must add a fact, not describe the page.** Three of them were cut on
2026-11-07 for saying things like "every figure counted in its own repository rather than
copied from a README": that is methodology talk about the site instead of information about
the work, and it answers an objection no reader raised. If a lead only restates the heading or
the format below it, delete it. The `humanizer` skill is the check for this; run prose through
it before committing.

The vault folder is `Projects/Portfolio/index.md` (decisions, gotchas, current state of the site).

**The experience and education copy comes from the candidate profile in
`dev/Projects/job-search/CLAUDE.md`**, which is the fullest record of the roles, dates,
employers and coursework. Read it before editing `experience.html`; the resume PDF is the
abridged version of it, and this repo holds no copy of either on purpose. **Three things in
that profile stay out of the public site**: the phone number, the GPA, and per-course grades.
Leaving the GPA off is Aayush's own decision (2026-11-08), asked and answered, not a default to
revisit.
It also holds internal job-search judgements (growth areas, honesty gates, employment status)
that are decision-making notes, not site copy.

## Writing a project entry

**Get every figure from the project's own repo, at the time you write it.** Not from this
repo, not from the vault, not from that project's README or handover. Those lag: in September
2026 the vault recorded Family Recipes at "23 unit + 8 integration tests" while the repo had
395, and the Chess Coach entry here described an engine four milestones behind the one that was
live. Count the tests, read the migrations directory, check the latest commit.

**Every entry carries measurements, or none does.** An entry with no numbers sitting beside
entries that have them reads as a ranking, not as neutrality, and it will silently rank the
newest work last. The same goes for length: entries drifted to an 8x spread (55 to 458 words)
simply because some were revised and others were not, and the short ones read as the smaller
projects.

**An entry in `work.html` is fixed: a lead of 33 to 48 words, then exactly four `<li>`
points, then six tags.** The CSS for the points carries the same warning. Keep both halves
when you edit an entry, since a lead without points, or five points, breaks the rhythm the
other seven set.

**A card in `index.html` is one line of 12 to 24 words plus at least one measured figure.**
The figure is the point of the card: a card without one turns the index into a link farm,
which is the failure the three-page split was most at risk of. **A field log is two
paragraphs and three tags**, and the index lists titles only.

Check all of it mechanically rather than by eye. `python scripts/check_shape.py` names every
violation and exits non-zero, and on a clean run prints each page's word count, which is why no
doc here states one.

**Re-read the project's README before rewriting its entry, not just its file counts.** Twice
now a project had become a different thing than the site claimed: Playstat's prediction model
was deleted outright while the entry said it was being rebuilt, and Family Recipes grew a
second app and a brand name the entry had never heard of. A changed line count is a hint that
the story changed too.

**Never `git add -A assets`.** Two stray screenshots that live in that folder untracked on
purpose have been swept into a commit that way. Add the specific files.

## When Aayush says "update"

"Update the docs", "update everything", or just "update" means **all of it, in this turn**:

1. **The knowledge vault** - `C:\Users\aayus\Documents\Knowledge-Vault\Projects\Portfolio\`
   (the path is per-machine). Add what this session learned that is worth keeping: a decision and
   its WHY, a non-obvious gotcha or fix, a research finding, a cross-project learning. This is the
   part that gets forgotten, and it is the part that compounds.
2. **Every doc in this repo**, not only the one already open. There is no handover file here
   on purpose: the current-state numbers it would hold are printed by `check_shape.py` and held
   by `git log`.

**Note content must never appear on a command line.** The Bash tool re-quotes the command on
its way to the shell, so backticks and apostrophes inside a note get executed or break it, and it
eats backslashes too (that is how `` in a patch became a literal backspace byte in
`scripts/check_shape.py` on 2026-11-08). Write the note to a file, then pass only paths:

```
python ~/.claude/bin/vault-note.py Portfolio <scratchpad>/note.md
```

Making docs TRUE rather than appending to them, and the one home each lesson gets, are
user-level rules in `~/.claude/CLAUDE.md`. They were copied out into this file and have been cut
back to this pointer, because two copies of a rule drift.
