# Enamel Vault LLC on the portfolio

## Intent

Enamel Vault became a company (Enamel Vault LLC, formed 10 November 2026). The site should say
so, make Enamel Vault the most visible piece of work, and promote it, while keeping Aayush open
to full-time roles. Readers are recruiters and engineers first, possible users second.

## Goals

- Position: founder of Enamel Vault LLC, still open to full-time roles.
- Enamel Vault leads the index and work pages.
- Two calls to action: try the family app, read the case studies.

## Non-goals

- A fifth page for the company. It would repeat the work entry.
- A kitchen-app pitch aimed at restaurants.
- A tester-recruitment call. That belongs to the Reddit launch in the EnamelVault repo's local
  `llc/TODO.md`, not here.

## Anti-goals (true even if the site renders)

- Any claim of customers, clients, revenue or traction. The product is pre-launch.
- Any company record on a public page: address, entity number, EIN, filings, banking, or who
  the current users are.
- Experience and Projects saying the same thing. Experience covers running the company; the
  project entry covers the build.

## Approaches

1. **Featured band that is card 01 rendered large** (picked). One element serves as the band
   and the card, so nothing is duplicated and `check_shape.py` still counts 13 cards.
2. A band plus a separate card 01. Rejected: the same project twice on one page.
3. A band replacing the card, with the checker taught about a 12 + 1 shape. Rejected: more
   checker logic for the same result.

## Decided

- **index.html**: a hero spec row "Founder: Enamel Vault LLC" beside "Open to full-time roles".
  After the hero, a band holding the showcase demo GIF (copied to `assets/`), the card line
  and figure, and the buttons "Try the family app" (recipes.enamelvault.com) and "Read the case
  studies" (the showcase repo). The other twelve cards are renumbered 02 to 13. The experience
  summary leads with "Founder & Engineer, Enamel Vault LLC, Nov 2026 to present". Contact adds
  hello@enamelvault.com, labelled for Enamel Vault.
- **experience.html**: the same role first, with bullets on operating it: two products and four
  clients live, the domain, repositories and app accounts moved under the company, the legal
  pages it operates under, and pre-launch stated plainly.
- **work.html**: the entry moves to 01. Its gallery gets the five showcase screenshots. Figures
  are recounted in the EnamelVault repo on the day of writing. The fixed shape holds: a 33 to
  48 word lead, four points, six tags.
- **notes.html**: one new field log. Moving the repository to the company's GitHub org stopped
  every deploy without an error: GitHub App installations belong to an account, so pushes
  passed CI and built nothing while the old Worker kept answering 200. The four existing
  "Family Recipes" logs are relabelled "Enamel Vault". That makes 14 logs, so
  `check_shape.py`, `CLAUDE.md` and the index log list all change from 13 to 14.
- The meta and OG descriptions mention the LLC where they name Enamel Vault.

## Left to the builder

The exact copy (run it through `humanizer`), the band's CSS within `styles.css`, how the GIF
is loaded (lazy, with a reduced-motion fallback to a still), and where the new log sits in
the order, as long as no project appears twice in a row.
