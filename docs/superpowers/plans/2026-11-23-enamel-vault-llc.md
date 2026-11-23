# Enamel Vault LLC on the portfolio: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Present Enamel Vault LLC as Aayush's company and Enamel Vault as the lead project, with two calls to action: try the family app and read the case studies.

**Architecture:** Hand-authored static pages. All CSS goes in `styles.css` and all JS in `site.js` (one copy each, on purpose). The index band is card 01 rendered larger, so the card regex in `scripts/check_shape.py` still matches 13 cards.

**Tech Stack:** HTML, CSS, Python 3 checker, no build step.

**Spec:** `docs/superpowers/specs/2026-11-23-enamel-vault-llc-design.md`

## Global Constraints

- No em or en dashes anywhere (the checker fails on them).
- No claim of customers, clients, revenue or traction. Pre-launch is stated plainly.
- Never on a page: the company's address, entity number, EIN, filing documents, banking, or who the current users are.
- Every figure is recounted in `C:\Users\aayus\dev\Projects\EnamelVault` on the day of writing, with the method in Task 2.
- work.html entry shape: a 33 to 48 word lead, exactly 4 `<li>`, 6 tags. Index card line: 12 to 24 words plus a figure. Field log: 2 paragraphs, 3 tags.
- Run all prose through the `humanizer` skill before committing. A lead must add a fact, not describe the page.
- Never `git add -A assets`. Add the specific files.
- Role title, exactly: `Founder & Engineer`. Company, exactly: `Enamel Vault LLC`. Dates, exactly: `Nov 2026 to present`.

## Review Focus

1. **Reduced motion**: the GIF autoplays. With `prefers-reduced-motion: reduce`, a visitor should see a still frame. Pin it in Task 3 with a `<picture>` whose reduced-motion `<source>` points at `assets/ev-family-recipe.png`.
2. **Phone width**: the band must not scroll horizontally at 375px. Check it in Task 5 with `resize_window` mobile.
3. **The lightbox**: new gallery images on work.html must open in the existing lightbox, which needs the `shot-link` markup. Check by clicking one in Task 5.
4. **Stale anchors**: renumbering cards must not change ids. The checker's anchor pass covers this, and it must print OK.
5. **Duplicate prose**: the Experience bullets and the work entry must not share a sentence. Check by eye in Task 5.

---

### Task 1: The field log and the count change from 13 to 14

**Files:**
- Modify: `scripts/check_shape.py` (the `!= 13` for logs in notes.html and for `log-project` rows in index.html; the docstring)
- Modify: `notes.html` (new `<article class="note">`; relabel 4 `Field log · Family Recipes` to `Field log · Enamel Vault`)
- Modify: `index.html` `#notes` log list (new `<li>`; relabel 4 `Family Recipes` spans)
- Modify: `README.md:41,44`, `CLAUDE.md:10,13` (13 field logs becomes 14)

**Interfaces:**
- Produces: log id `moving-the-repository-stopped-every-deploy`, title "Moving the repository stopped every deploy", label `Enamel Vault`.

- [ ] **Step 1:** Change the two log counts in `check_shape.py` to 14, and the docstring line `notes.html  13 field logs` to 14.
- [ ] **Step 2:** Run `python scripts/check_shape.py`. Expected: FAIL, "expected 14 field logs, found 13" and "expected 14 field log titles".
- [ ] **Step 3:** Write the log. Paragraph 1 is the fault: moving the private repository to the company's GitHub org left every push passing CI and building nothing, because a GitHub App installation belongs to an account, and the old Worker kept answering 200, so the site looked fine. Production sat five commits behind; only the CI `deployed` job, which compares `/health/version` with the head commit, went red. Paragraph 2 is the fix and the lesson: reconnecting in the Cloudflare dashboard fixed it but deleted the build config, including both `VITE_*` variables, so the config was read out first and diffed after. The lesson is that a deploy check has to compare what is live with what was pushed. Tags: `GitHub Apps`, `Cloudflare Workers`, `CI`. Place it where neither neighbour is an Enamel Vault log. Add its `<li>` at the same position in the index list.
- [ ] **Step 4:** Relabel the 4 old logs in both files, and update README.md and CLAUDE.md.
- [ ] **Step 5:** Run `python scripts/check_shape.py`. Expected: `OK: 4 pages, 8 entries, 13 cards, 14 logs, ...`.
- [ ] **Step 6:** Commit: `git add scripts/check_shape.py notes.html index.html README.md CLAUDE.md` with the message "A field log from forming the company: the repo transfer that stopped deploys".

### Task 2: work.html entry to 01, with fresh figures and the gallery

**Files:**
- Modify: `work.html` (move the `#enamel-vault-recipes-for-families-and` block to the first position, renumber every `project-num` 01 to 08, rewrite the lead, add 5 figures, update the meta, OG and twitter descriptions)
- Create: `assets/ev-family-recipe.png`, `assets/ev-family-grocery.png`, `assets/ev-family-cook.png`, `assets/ev-kitchen-dishes.png`, `assets/ev-kitchen-dish.png` (copied from `../enamelvault-showcase/screenshots/`)

**Interfaces:**
- Produces: the five `assets/ev-*.png` paths (Task 3 uses `ev-family-recipe.png`), and the figures string `FIG` used again in Task 3.

- [ ] **Step 1:** Count in EnamelVault with: lines = `git ls-files | grep -E '\.(ts|tsx|mjs|sql|css)$' | xargs cat | wc -l`; test files = `git ls-files | grep -E '\.test\.(ts|tsx|mjs)$' | wc -l`; tests run = the passing count from `npx vitest run src supabase worker scripts` (run it in the background); migrations = `ls supabase/migrations | wc -l`. Write `FIG` as "About Nk lines · N unit tests · N migrations". Expect about 62k lines and 72 migrations.
- [ ] **Step 2:** Move the entry, renumber, and rewrite the lead (33 to 48 words). It names Enamel Vault LLC as the operator and carries `FIG`. Keep the four points, but refresh their kitchen and mobile line counts. Keep the 6 tags. Add the five figures to `project-gallery` using the existing `figure.project-shot > a.shot-link > img` markup, with alt text describing each screen.
- [ ] **Step 3:** Update the three description metas to mention Enamel Vault LLC.
- [ ] **Step 4:** Run `python scripts/check_shape.py`. Expected: OK, 8 entries.
- [ ] **Step 5:** Commit: `git add work.html assets/ev-*.png` (the specific files), message "Enamel Vault leads the work page, operated by its LLC".

### Task 3: index.html hero, band, experience summary and contact

**Files:**
- Modify: `index.html` (hero spec row; cards: move the Enamel Vault card to the first position with class `card card-feature`, renumber 01 to 13; the experience summary's first `.exp`; contact; meta descriptions)
- Modify: `styles.css` (`.card-feature` rules beside `.card` at about line 793; reduced motion beside line 776)
- Create: `assets/ev-demo.gif` (from `../enamelvault-showcase/screenshots/demo.gif`)

**Interfaces:**
- Consumes: `FIG` and `assets/ev-family-recipe.png` from Task 2.

- [ ] **Step 1:** Hero `hero-spec`: add `<div><dt>Founder</dt><dd>Enamel Vault LLC</dd></div>` before Status, which is unchanged.
- [ ] **Step 2:** Feature card. Keep the exact `card-title` / `card-line` / `card-fig` sequence the checker's regex needs. Add a `<picture>` before them: `<source srcset="assets/ev-family-recipe.png" media="(prefers-reduced-motion: reduce)">` plus `<img src="assets/ev-demo.gif" loading="lazy" decoding="async" width height alt="...">`. Add two `.btn` links: "Try the family app" to `https://recipes.enamelvault.com` and "Read the case studies" to `https://github.com/enamelvault/enamelvault-showcase#case-studies`, both `target="_blank" rel="noopener noreferrer"`. The card line is 12 to 24 words, and the figure is `FIG`.
- [ ] **Step 3:** CSS. `.card-feature` spans the full width, with the media above the text on a phone and beside it at 980px and up, a border like `.project-shot`, and no horizontal overflow at 375px.
- [ ] **Step 4:** The experience summary gets a first `.exp`: title `Founder & Engineer`, date `Nov 2026 to present`, company `Enamel Vault LLC`, and one `exp-line` on running the company, linking `work.html#enamel-vault-recipes-for-families-and`.
- [ ] **Step 5:** Contact: after GitHub, add `<a href="mailto:hello@enamelvault.com">Enamel Vault: hello@enamelvault.com</a>`. Make the intro sentence say that you run Enamel Vault and are open to full-time roles.
- [ ] **Step 6:** Run `python scripts/check_shape.py`. Expected: OK, 13 cards.
- [ ] **Step 7:** Commit: `git add index.html styles.css assets/ev-demo.gif`, message "Feature Enamel Vault on the index and name the LLC".

### Task 4: experience.html founder role

**Files:**
- Modify: `experience.html` (a new first `.exp` before UDRI at line 94; the three description metas)

- [ ] **Step 1:** Add the `.exp`: title, date and company as in Global Constraints, then `exp-company` "Enamel Vault LLC, Cincinnati, OH". The `exp-body` says it is the company Aayush formed to run Enamel Vault, and that it is pre-launch. The `exp-bullets` (3 or 4) cover:
  - running two products and four clients in production;
  - moving the domain registration, repositories and app accounts to the company, and the deploy failure that came with it (link `notes.html#moving-the-repository-stopped-every-deploy`);
  - the company's legal surface: two sets of terms and privacy pages, with a copyright complaints route.

  Nothing here repeats a work.html point.
- [ ] **Step 2:** Make the description metas lead with the founder role.
- [ ] **Step 3:** Run `python scripts/check_shape.py`. Expected: OK.
- [ ] **Step 4:** Commit: `git add experience.html`, message "Founder & Engineer, Enamel Vault LLC, on the experience page".

### Task 5: Verify and record

- [ ] **Step 1:** Open `index.html` in the browser pane. Check the band at desktop and at the mobile preset (no horizontal scroll: `document.documentElement.scrollWidth <= innerWidth`). Check that the GIF plays, and that the still shows with reduced motion emulated. Open a work.html gallery image in the lightbox. Check the console for errors.
- [ ] **Step 2:** Read the Experience bullets against the work entry for any repeated sentence (Review Focus 5).
- [ ] **Step 3:** Add a vault note to `Projects/Portfolio/index.md` with the decisions (a band that is card 01 rendered large, why the LLC goes in Experience and not a page, and what stays off the site), using `python ~/.claude/bin/vault-note.py Portfolio <scratchpad>/note.md`.
- [ ] **Step 4:** Commit the spec and the plan: `git add -f docs/superpowers/specs/2026-11-23-enamel-vault-llc-design.md` (`specs/` is gitignored, and the existing spec was force-added), plus `git add docs/superpowers/plans/2026-11-23-enamel-vault-llc.md`. Message: "Spec and plan for the Enamel Vault LLC changes". Do not push without asking.
