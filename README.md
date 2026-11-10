# Protolabas!

**Nemokama, atviro kodo, interaktyvi mokymosi platforma Lietuvos 1–12 klasei.**
Ne įsiminti — suprasti. Simuliacijos, modeliai ir žaidimai, kurie paaiškina sąvoką taip,
kad vaikas prieina prie atsakymo pats.

🔗 **Gyva svetainė:** https://one-man-company.github.io/protolabas/

Be registracijos. Be sekimo. Be išorinių priklausomybių. Veikia lėtame mokyklos internete.

---

## Kas veikia šiandien

**1 klasė — 23 moduliai per 12 dalykų, 23 interaktyvios simuliacijos.**

| Dalykas | Moduliai |
|---|---|
| Matematika (7) | Skaičiai iki 10 · Sudėtis iki 10 · Skaičiai iki 20 · Formos ir simetrija · Matuoju ilgį · Kiek dabar valandų? · Akmenų žaidimas |
| Lietuvių kalba (2) | Raidės ir garsai · Skaitau žodžius |
| Gamtos mokslai (3) | Augalo gyvenimas · Gyva ir negyva · Metų laikai\* |
| Visuomeninis ugdymas (2) | Saugus kelias · Šeima ir bendruomenė |
| Dorinis ugdymas (2) | Jausmai ir draugystė · Teisingas dalijimas |
| Dailė (1) | Spalvų laboratorija |
| Muzika (2) | Ritmas ir garsai · Dainuoju chore |
| Fizinis ugdymas (2) | Judrumo žaidimas · Šokių žingsniai\* |
| Informatika (1) | Algoritmai robotui |
| Technologijos (1) | Konstruoju bokštą |

\* žymimi `papildoma`, nes 1 klasės bendrojoje programoje šios temos neprivalomos
(metų laikai programuojami 2 klasėje; šokio programa nebuvo išgauta kartu su kitomis).

**2–12 klasės** — struktūra, tyrimų bazė ir agentų sistema paruošta; turinys kuriamas nuosekliai.

## Kiekvienas modulis turi

1. **Vieną branduolinę idėją** (S1-01 „mažiau temų, daugiau gylio“).
2. **Išmatuojamą rezultatą** — ne „mokosi skaičiuoti“, o „bent 4 iš 5 kartų“.
3. **Oficialų programos kodą** su dalyko priešdėliu (pvz. `Technologijos 23.3.3`) —
   nes 22.x/23.x/24.x/25.x numeracija kartojasi tarp dalykų.
4. **Įrodymų grandinę** — `designNotes.evidence` rodo į konkrečius `P01–P52` įrašus.
5. **Mokytojo medžiagą** — tikslas, priemonės, eiga, diferencijavimas, refleksija.

## Struktūra

```
index.html          centras — moduliai, pažanga, „tęsti“
mokytis.html        pamokos variklis (?g=1&m=skaiciai-iki-10)
mokytojui.html      visų modulių mokytojo medžiaga + spausdinimas
content/            turinys kaip duomenys (JSON), ne kodas
  grade-NN/
    _grade.json     manifestas (tvarka = prielaidų tvarka)
    modules/<id>/module.json
  schema/           JSON Schema
js/
  core/             store (localStorage), i18n, speech, sfx, sim registry
  sims/             23 simuliacijos, kiekviena savarankiška
  lesson.js         variklis: talk → sim → quiz → sim → reflect
guidelines/         Švietimo kelrodžio taisyklės (S1-01…S1-20) + atitiktis
wiki/               įrodymų bazė: 52 P įrašai + 12 klasių aplankai
agents/             7 agentų vaidmenys (sutartis, ne kodas)
tools/              validatorius, sveikatos patikra, auditorius, serveris
reports/            sugeneruotos ataskaitos
```

## Kaip paleisti lokaliai

```bash
python3 tools/serve.py 8088
# → http://localhost:8088
```

Jokio `npm install`, jokio build žingsnio.

## Kaip pridėti modulį

1. **Specifikacija** → `content/specs/<slug>.md` (šablonas: `agents/content-architect.md`).
2. **Modulis** → `content/grade-01/modules/<slug>/module.json` pagal
   `content/schema/module.schema.json`.
3. **Nauja simuliacija** (jei reikia) → `js/sims/<sim>.js` + įrašyti į `js/sims/index.js`.
4. **Manifestas** → įrašyti `id` į `content/grade-01/_grade.json`.
5. **Vartai:**
   ```bash
   python3 tools/validate.py
   python3 tools/health.py --strict
   node tools/audit.mjs --base http://127.0.0.1:8088 --out .audit.json
   ```

Validatorius nepraleis: tuščių kodų, ne kanoninio `S1` ID, trūkstamo `outcome`,
neegzistuojančio `P` įrašo, neregistruotos simuliacijos, nuorodos į internetą.

## Automatika

Septyni agentai (`agents/README.md`) paleidžiami pagal grafiką: sveikatos tyrėjas,
programos tyrėjas, pedagogikos tyrėjas, turinio architektas, kūrėjas, peržiūrėtojas,
orchestratorius. Nė vienas nerašo į `main` tiesiogiai — tik per PR, ir tik praėjęs
visus vartus. Visa logika remiasi `reports/health.json`, ne nuomone.

## Skaidrumas apie ribas

- Platforma **nėra oficialus vertinimo įrankis**. Pasiekimų vertinimas lieka mokytojo sprendimas.
- Programos kodai paimti iš e-TAR suvestinės redakcijos (V-1269), galiojančios 2026 m.;
  e-seimas (TAD) nepasiekiamas dėl Cloudflare, todėl 2022 m. rugsėjo redakcija tiesiogiai
  nepatikrinta — tai pažymėta `research/curriculum-grade1.md`.
- „Švietimo kelrodis 2035“ **nėra teisės aktas** — tai savanoriškas produkto įsipareigojimas.
- Kai kurie įrodymai silpni, ir taip parašyta: augimo mąstysena (P51), Nim strategija
  1 klasei (P30), skiemens metodas lietuvių kalboje (P34).

## Licencijos

- Kodas: MIT (`LICENSE`)
- Turinys ir tekstai: CC BY-SA 4.0 (`CONTENT-LICENSE.md`)
