# Agentai

Šis aplankas yra **sutartis**, ne kodas. Kiekvienas agentas yra atskiras vaidmuo su
aiškiais įėjimais, išėjimais ir vartais. Vykdymo variklis – Hermes cron
(profiles `deepseek41flash`), o deterministines patikras atlieka `tools/`.

## Grandinė

```
        ┌──────────────────────────────────────────────┐
        │  tools/health.py  (deterministinis, be AI)   │
        └───────────────┬──────────────────────────────┘
                        │ reports/health.json
                        ▼
  1. health-investigator  ──► reports/triage-YYYY-MM-DD.md + GitHub issues
                        │
                        ▼
  2. curriculum-researcher ─┐
  3. pedagogy-researcher  ──┴─► research/*.md, wiki/**/README.md (P53+)
                        │
                        ▼
  4. content-architect    ──► content/specs/<slug>.md   (tik specifikacija)
                        │
                        ▼
  5. content-builder      ──► content/grade-NN/modules/<slug>/ + js/sims/<sim>.js
                        │
                        ▼
  6. content-reviewer     ──► reports/review-<slug>.md  (APPROVE / REJECT)
                        │
                        ▼
  7. orchestrator         ──► PR → CI → merge → GitHub Pages
```

## Vartai (be jų niekas nepatenka į `main`)

| Vartai | Ką tikrina | Blokuoja |
|---|---|---|
| G0 | `python3 tools/validate.py` | bet kokia klaida |
| G1 | `python3 tools/health.py --strict` | klaida arba įspėjimas |
| G2 | `node tools/audit.mjs` | JS klaida, neužbaigiamas modulis |
| G3 | `content-reviewer` | REJECT |
| G4 | CI (`.github/workflows/ci.yml`) | raudonas CI |

## Ritmas

| Agentas | Dažnis | Laikas |
|---|---|---|
| health-investigator | kasdien | 06:20 |
| curriculum-researcher | kas savaitę (pirmad.) | 06:40 |
| pedagogy-researcher | kas dvi savaites | 07:00 |
| content-architect | kas savaitę (antrad.) | 07:20 |
| content-builder | pagal specifikacijų eilę | 07:40 |
| content-reviewer | po kiekvieno build | iškart |
| orchestrator | kas savaitę (trečiad.) | 08:00 |

## Nekintamos taisyklės

1. **Nė vienas agentas nerašo į `main` tiesiogiai.** Tik per PR.
2. **Agentas niekada neištrina turinio.** Tik prideda arba siūlo pakeitimą PR.
3. **Visi faktai apie programą – su nuoroda.** Be šaltinio – neįtraukiama.
4. **Vaikui matomas tekstas – lietuvių kalba**, be anglicizmų.
5. **Naujas P įrašas wiki turi turėti realų DOI arba URL**, kuris atsidaro.
6. **Simuliacija be `designNotes.evidence` neegzistuoja.**
7. **Jei abejojama dėl amžiaus tinkamumo – modulis žymimas `papildoma`, ne `privaloma`.**
8. **Registracijos, sekimo, išorinių užklausų nepridedama.** Niekada.
9. **Kiekvienas pakeitimas turi praeiti `tools/health.py --strict`.**
10. **Agentas, kuris nežino – sako „nežinau“ ir rašo į `reports/questions.md`.**

## Kaip prijungti prie Hermes cron

```bash
# kasdien 06:20 – sveikatos patikra
hermes cron add health   --schedule "20 6 * * *" --profile deepseek41flash   --prompt "$(cat agents/health-investigator.md)"
```

Pilnas sąrašas – `agents/orchestrator.md` skyriuje „Cron“.
