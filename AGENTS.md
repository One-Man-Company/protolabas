# Protolabas — DOX root

Binding contract for every agent or human editing this repository. Read this file, then walk the DOX chain to the folder you will touch. Do not edit from memory.

## Purpose

Protolabas ("proto laboratorija") is a free, open-source, registration-free interactive learning platform for Lithuanian schoolchildren, grades 1–12. Learning happens through simulations, manipulables and simple game-theory models — not through quizzes dressed up as games.

- Live site: https://one-man-company.github.io/protolabas/
- Repo: https://github.com/One-Man-Company/protolabas
- Grade coverage today: grade 1 complete, grade 2 scaffolded, grades 3–12 planned.
- Doctrine: `guidelines/svietimas-1.md` (Švietimo kelrodis 2035, 10 žingsnių) — binding, not aspirational.
- Pedagogy: `wiki/` (evidence-graded, per grade) — every design decision traces to a `P##` entry.
- Curriculum: `guidelines/kurikulumas.md` + `content/grade-NN/_grade.json` — official programme codes, never invented.

## Non-negotiables

1. **No accounts, no tracking.** No cookies, no analytics, no third-party requests at runtime. Progress lives in `localStorage` only and is exportable/deletable by the child.
2. **Offline-capable.** Every asset is local. No CDN fonts, no remote scripts, no remote images. The site must work from a USB stick.
3. **Lithuanian first.** All user-facing strings go through `js/core/i18n.js`. Never hardcode display text inside JS logic; never concatenate translated fragments.
4. **Content is data.** A module is `content/grade-NN/modules/<slug>/module.json` validated against `content/schema/module.schema.json`. Adding content must never require touching the runner.
5. **New interaction = new sim.** Put it in `js/sims/<name>.js`, register it in `js/core/sim.js`. Never fork `js/lesson.js`.
6. **Curriculum-anchored.** Every module lists official programme codes and the Švietimas #1 rules it satisfies. No topic without a code.
7. **Age-appropriate by construction.** Grade 1–2 modules must be completable without reading: every instruction has audio (`speechSynthesis`, `lt-LT`) and an icon.
8. **Accessibility floor.** Keyboard operable, ≥44 px touch targets, WCAG AA contrast, honours `prefers-reduced-motion`, no colour-only meaning.
9. **Evidence or silence.** Pedagogical claims cite a `P##` entry in `wiki/`. Unsourced pedagogy is a bug.
10. **Static forever.** No bundler, no build step, no runtime npm. Plain ES modules served by GitHub Pages.
11. **DOX pass.** After any meaningful change, update the nearest `AGENTS.md` and its parents/index.

## Structure

```
index.html            grade hub (public entry)
mokytis.html          lesson runner (?g=1&m=<module-id>)
mokytojui.html        teacher/parent guide, curriculum map, no-tracking statement
css/                  tokens.css, base.css, app.css, lesson.css
js/core/              store, i18n, speech, sfx, dom, sim registry, progress
js/sims/              one file per interaction
js/app.js             hub controller
js/lesson.js          lesson/activity runner
content/schema/       module.schema.json (hand-written JSON Schema)
content/grade-NN/     _grade.json + modules/<slug>/module.json
guidelines/           svietimas-1.md, kurikulumas.md, turinio-standartas.md
wiki/                 evidence base: 00-bendra/ + NN-klase/
agents/               scheduled agent roles, prompts, run logs, DOX
.github/workflows/    validate.yml (schema + link + a11y lint on push)
```

## Local Contracts

- **Module JSON** is the only content format. Human-readable, one module per folder, assets beside it.
- **Sim API:** `mount(root, config, api)` where `api = {t, speak, success, fail, setPrompt, onCleanup, progress}`. Sims are DOM/SVG-first; canvas only when pixels matter.
- **Progress model:** `store.js` keeps `{v, updated, modules:{<id>:{status, stars, attempts, lastSeen, ms}}, skills:{<code>:{seen, ok}}}`. Never store personal data.
- **IDs:** module slug = lowercase Lithuanian without diacritics, hyphenated (`skaiciai-iki-10`). Never rename a published slug; deprecate instead.

## Work Guidance

- Write for a 6–7 year old first, then for the teacher: one idea per screen, one action per instruction, no more than 3 choices visible.
- Depth over breadth (S1): fewer modules, more activities inside each, with transfer tasks.
- Feedback is immediate, specific, non-punitive: say what happened and what to try next. Never "Blogai".
- Lithuanian copy: short sentences (≤12 words), present tense, second person singular ("įdėk", "patikrink").
- Prefer SVG/CSS to raster art; keep total page weight under 300 KB per module.

## Verification

- `python3 tools/validate.py` — schema, required fields, curriculum codes, no remote URLs, i18n coverage.
- `python3 tools/serve.py 8088` — local preview.
- Manual: keyboard-only pass, 320 px width pass, audio-off pass, reduced-motion pass.
- Live check: `gh run list --workflow=validate.yml` green, then open the Pages URL.

## Child DOX Index

| Path | Owns |
|---|---|
| `content/AGENTS.md` | module format, grade registry, adding content |
| `js/AGENTS.md` | core runtime, sim registry, lesson runner |
| `guidelines/AGENTS.md` | doctrine, curriculum mapping, content standard |
| `wiki/AGENTS.md` | evidence base shape, citation rules, per-grade structure |
| `agents/AGENTS.md` | scheduled agent roles, prompts, run protocol |
| `tools/AGENTS.md` | validation and local serving |
