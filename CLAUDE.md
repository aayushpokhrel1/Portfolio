# Working in this repo

Personal portfolio site.

## Where things are written down

| File | What it holds |
| --- | --- |
| `README.md` | What it is and how to run it |
| `index.html` | The entire site: markup, CSS, and JS in one file. There is no build step and no other source file. |

The vault folder is `Projects/Portfolio/index.md` (decisions, gotchas, current state of the site).

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

**The shape is fixed: a lead of 33 to 48 words, then exactly four `<li>` points, then six
tags.** The CSS for the points carries the same warning. Keep both halves when you edit an
entry, since a lead without points, or five points, breaks the rhythm the other seven set.
Check it mechanically rather than by eye:

```
python -c "import io,re,html; s=io.open('index.html',encoding='utf-8').read(); w=s[s.index('<section id=\"work\"'):s.index('<section id=\"notes\"')]; [print(m.group(1), len(html.unescape(re.sub(r'<[^>]+>','',re.search(r'<p class=\"project-desc\">(.*?)</p>',m.group(3),re.S).group(1))).split()), len(re.findall(r'<li>',m.group(3)))) for m in re.finditer(r'<span class=\"project-num\">(\d+)</span>.*?<h3 class=\"project-title\">(.*?)</h3>(.*?)(?=<div class=\"project\">|<div class=\"also\">)', w, re.S)]"
```

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
2. **Every doc in this repo**, not only the one already open.
3. **The handover**, but only its current-state numbers.

**Vault writes go through WSL, and note content must never appear on the command line.** The Bash
tool re-quotes the wrapper, so backticks and apostrophes inside a note get executed or break the
command. Write the note to a file first, then pass only literal paths:

```
wsl -d Ubuntu -- bash -lc 'cat /mnt/c/<tmp>/note.md >> /mnt/c/Users/aayus/Documents/Knowledge-Vault/Projects/Portfolio/index.md'
```

**Updating docs means making them TRUE, not just appending what shipped.** Correct or strike a
stale claim where it sits rather than adding a newer entry underneath it, because the next reader
may hit the old one first. Cross-check every number (versions, counts, commit) against reality
instead of trusting what the file says.

## Where knowledge goes

A lesson has exactly one home, chosen by how far it reaches:

- **A rule about specific code goes in a comment AT that code.** The most reliable form there is:
  you cannot edit the function without reading the warning above it. A note filed elsewhere is the
  least reliable, because nobody goes back to read it.
- **A lesson that generalises goes in the vault**, phrased so it is useful on a different
  project, with this one as the example.
- **A dated narrative of what you did today goes in `git log`.** It is already there, in detail.

Keep any one lesson in a single place. Two copies drift, and the drift is what causes wrong work
later.
