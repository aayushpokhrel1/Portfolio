# Aayush Pokhrel — Portfolio

This repository contains a small static portfolio site for Aayush Pokhrel (single-page site).

Summary
- Static site built with plain HTML, CSS, and JavaScript. No build step or package manager configuration is required.

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
  - index.html — main page markup
  - assets/ — images, favicon, and resume PDF
- For live-reload during edits, use the "Live Server" VS Code extension or any static server with watch capability.

Deployment
- GitHub Pages (easy): push to main and enable Pages in the repository settings using the root (/) as the source — index.html at the repo root will be served.
- Netlify/Vercel: drag-and-drop the site folder or connect the repository; no build command is needed because this is a static site.

Project structure
- index.html — entry point
- assets/ — images (project screenshots), favicon, and resume PDF (Pokhrel_Aayush_Resume_2026.pdf)
- .gitignore — ignored files
- README.md — this file

Notes
- If you later add a framework (React, Next.js, Vite, etc.), add a package.json and update these instructions.

Author
- Aayush Pokhrel — https://github.com/aayushpokhrel1

License
- This repository is licensed under the MIT License. See the LICENSE file for full terms.
- SPDX: MIT

If you want, expand any section (deployment with CI, GitHub Actions, or automated resume generation) and I’ll add it.