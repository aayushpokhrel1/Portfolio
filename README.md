# Aayush Pokhrel: Portfolio

This repository contains a portfolio site for Aayush Pokhrel.

Summary
- Static site built with plain HTML, CSS, and JavaScript. No build step or package manager configuration is required.
- Four hand-authored pages over one shared stylesheet and one shared script: `index.html` is the way in, `experience.html` holds both roles in full, `work.html` holds the full project entries, `notes.html` holds the field logs.

Tech stack
- HTML, CSS, JavaScript

Quick preview (recommended)
- Open index.html directly in your browser: double-click index.html in the repo root.
- Or run a simple local HTTP server (recommended to avoid CORS / asset path issues):
  - Python 3 (PowerShell / terminal):
    ```powershell
    python -m http.server 8080
    ```
  - Node (if you have npm installed):
    ```powershell
    npx http-server . -p 8080
    ```
  Then visit http://localhost:8080 in your browser.

Editing / Development
- Files to edit:
  - index.html, experience.html, work.html, notes.html: page markup
  - styles.css, site.js: shared by all three pages, one copy on purpose
  - assets/: images, favicon, and resume PDF
- After editing any page, run `python scripts/check_shape.py`. It enforces the entry, card and
  log shapes, checks every tag is closed and every internal anchor resolves, and exits
  non-zero if not.
- For live-reload during edits, use the "Live Server" VS Code extension or any static server with watch capability.

Deployment
- GitHub Pages: push to main. Pages serves the repo root, so index.html, experience.html, work.html and notes.html are served as files. The site lives under the /Portfolio/ subpath, which is why every path in the markup is relative.
- Netlify/Vercel: drag-and-drop the site folder or connect the repository; no build command is needed because this is a static site.

Project structure
- index.html: the landing page. The hero's claim, a compressed about and experience, 13 project cards, the 13 field log titles, contact
- experience.html: both roles in full, with the bullets, what the research turned into, and education
- work.html: the 8 full project entries and the 5 compact "Also" entries
- notes.html: the 13 field logs in full
- styles.css, site.js: all CSS and all JS, shared by the three pages
- scripts/check_shape.py: the shape checker; run it after editing a page
- docs/superpowers/specs/: the design of a change, written before building it
- assets/: project screenshots, favicon, Open Graph image, and resume PDF (Pokhrel_Aayush_Resume_2026.pdf)
- CLAUDE.md: where things are written down, and the conventions for updating them
- LICENSE: MIT
- .gitignore: ignored files
- README.md: this file

Notes
- If you later add a framework (React, Next.js, Vite, etc.), add a package.json and update these instructions.

Author
- Aayush Pokhrel, https://github.com/aayushpokhrel1

License
- This repository is licensed under the MIT License. See the LICENSE file for full terms.
- SPDX: MIT
