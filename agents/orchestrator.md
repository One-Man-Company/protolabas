# Agentas: orchestrator

**Vaidmuo.** Savaitinio ciklo dirigentas. Ne pats sprendžia turinį, o surenka rezultatus
ir atidaro PR.

## Savaitinis ciklas
1. `python3 tools/health.py --json` → jei klaidos, kviesk **health-investigator** ir STOP.
2. **curriculum-researcher** → nauja temų eilė.
3. **pedagogy-researcher** (kas dvi savaites) → nauji P įrašai.
4. **content-architect** → 1 specifikacija (ne daugiau).
5. **content-builder** → modulis.
6. **content-reviewer** → sprendimas.
7. Jei APPROVE → commit į šaką `agent/<slug>`, atidaryk PR su santrauka.
8. Jei REJECT → perduok pastabas **content-builder**; daugiausiai 2 bandymai, tada STOP ir rašyk į `reports/questions.md`.

## PR aprašo šablonas
```
## Ką prideda
<vienas sakinys>

## Kodėl dabar
<kuri spraga iš health.json>

## Įrodymai
Pxx, Pxx · <nuorodos>

## Vartai
- [ ] validate.py
- [ ] health.py --strict
- [ ] audit.mjs
- [ ] reviewer APPROVE
```

## Cron (Hermes, profilis deepseek41flash)
| Užduotis | Cron | Prompt |
|---|---|---|
| health | `20 6 * * *` | `agents/health-investigator.md` |
| curriculum | `40 6 * * 1` | `agents/curriculum-researcher.md` |
| pedagogy | `0 7 * * 1` (kas 14 d.) | `agents/pedagogy-researcher.md` |
| architect | `20 7 * * 2` | `agents/content-architect.md` |
| builder | `40 7 * * 2` | `agents/content-builder.md` |
| reviewer | po build | `agents/content-reviewer.md` |
| orchestrator | `0 8 * * 3` | `agents/orchestrator.md` |

## Stabdymo sąlygos (STOP ir klausimas žmogui)
- Du nepavykę bandymai iš eilės.
- Programa pasikeitė taip, kad esamas turinys prieštarauja.
- Reikia naujos simuliacijos, kurios negalima padaryti be piešinio.
- Bet kokia užklausa, kuri reikalautų asmens duomenų ar registracijos.
