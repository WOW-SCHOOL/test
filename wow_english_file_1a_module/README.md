# WOW SCHOOL — English File Beginner 1A interactive review

Static 16:9 HTML mini-app for embedding in Holst or any iframe.

## Content basis
The module reviews only lesson 1A: `verb be` with **I / you**, contractions, numbers 0–10, days of the week, greetings/goodbyes, and the pronunciation targets `/h/`, `/aɪ/`, `/iː/`.

## Screens
1. Grammar quick choice
2. Contraction builder
3. Audio number dictation
4. Number challenge
5. Days of the week ordering
6. Pronunciation sound sort
7. Dialogue completion
8. Mini listening mission
9. Skill progress map
10. Final score / review / restart

## Run locally
Open `index.html` directly or serve the folder with any static HTTP server.

Example:
```bash
python3 -m http.server 8000
```
Then open `http://localhost:8000`.

## Hosting
Upload the whole folder to GitHub Pages / Netlify / any static host. No backend is required.

## State
Progress is stored in `localStorage` under `wow_ef_1a_state`.

## Assets
`assets/audio/` contains custom practice audio created for this review module (not original Oxford course recordings).
`assets/images/` contains original SVG interface artwork for the module.
