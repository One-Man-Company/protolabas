# Protolabo įrodymų bazė

**Kas čia.** `wiki/` yra vienintelė vieta, kur laikomi pedagoginiai teiginiai, kuriais remiasi platforma. Kiekvienas modulis, simuliacija, grįžtamojo ryšio tekstas ir amžiaus apribojimas turi atsekti į konkretų `P##` įrašą iš `mokymosi-mokslas.md` arba į klasės puslapio taisyklę. Jei sprendimo niekur čia nėra – tai ne „dizaino laisvė“, o dokumentuota spraga, kurią reikia užpildyti prieš publikuojant.

**Ko čia nėra.** Nėra kurikulumo kodų šaltinio (`guidelines/kurikulumas.md`, `content/grade-NN/_grade.json`) ir nėra modulių (`content/`). S1 taisyklės gyvena `guidelines/svietimas1-rules.json` – wiki jas cituoja tik ID ir pavadinimu, teksto neperrašo.

## Turinys

| Failas | Ką atsako | Kada skaityti |
|---|---|---|
| `mokymosi-mokslas.md` | Ką žinome apie mokymąsi: `P01`–`P52` su stiprumu ir URL | Prieš bet kokį dizaino sprendimą |
| `vertinimo-rubrika.md` | Kaip apibūdinami 4 pasiekimo lygiai ir kaip sistema juos priskiria | Kai kuriamas grįžtamasis ryšys ar pažangos vaizdas |
| `turinio-kurimo-procesas.md` | 10 žingsnių nuo programos kodo iki publikuoto modulio | Pradedant naują modulį |
| `../01-klase/README.md` | Ką 6–7 metų vaikas gali ir ko negali; temos ir spragos | Kuriant arba peržiūrint 1 klasės turinį |
| `../NN-klase/README.md` | To paties klasei 2–12 | Planuojant naują klasę |

## Kaip wiki maitina turinį

```
programos kodas  →  klasės puslapis  →  vienas P## principas  →  sim tipas
(guidelines/)        (NN-klase/)         (mokymosi-mokslas)      (js/sims/)
      ↓                                                            ↓
module.json: curriculum.codes, s1[], designNotes[]  →  validate.py  →  tinklalapis
```

Trys susiejimo taškai, kurie privalo sutapti:

1. **Kodas → klasė.** Modulio `curriculum.codes` turi būti tos klasės programos kodas, ne „panašus“. 1 klasėje leidžiama naudoti tik `research/curriculum-grade1.md` patvirtintus numerius.
2. **Klasė → principas.** Klasės puslapis nurodo, kurie interakcijų tipai tam amžiui tinka. Modulis negali naudoti interakcijos, kurią klasės puslapis draudžia (pvz., 1 klasėje – laisvo tempimo be alternatyvos, P45).
3. **Principas → sim.** `designNotes` lauke įrašyti `P##` turi būti realūs ir su ta pačia etikete. A/B hipotezė rašoma taip: „P07 teigia, kad segmentavimas mažina apleidimą“, o ne „ar vaikams patinka“.

## Stiprumo legenda

| Žyma | Ką reiškia | Kaip naudoti sprendime |
|---|---|---|
| `stiprus` | kelios nepriklausomos meta-analizės ar didelės kontroliuojamos studijos, kryptis nuosekli | Galima daryti privalomą reikalavimą visai platformai |
| `vidutinis` | bent viena meta-analizė ar keli eksperimentai, yra moderatorių | Reikalavimas su išlyga; būtina patikra su savo duomenimis |
| `silpnas` | pavienės studijos, mažos imtys, laboratoriniai duomenys | Hipotezė, ne reikalavimas; niekada nevirsta rinkodaros teiginiu |
| `mišrus` | kryptis priklauso nuo sąlygų arba šaltiniai rodo skirtingus dydžius | Sprendimas turi įvardyti sąlygą, nuo kurios priklauso |

Skliaustuose po etiketės – patikslinimas (kam stipru, kam ne). Jis nekeičia etiketės ir neturi būti slepiamas cituojant.

## Klasės: statusas

| Klasė | Amžius | Būsena | Puslapis |
|---|---|---|---|
| 1 | 6–7 | **yra turinys** (22 moduliai) | `01-klase/README.md` |
| 2 | 7–8 | suplanuota, turinio nėra | `02-klase/README.md` |
| 3 | 8–9 | RENGIAMA | `03-klase/README.md` |
| 4 | 9–10 | RENGIAMA | `04-klase/README.md` |
| 5 | 10–11 | RENGIAMA | `05-klase/README.md` |
| 6 | 11–12 | RENGIAMA | `06-klase/README.md` |
| 7 | 12–13 | RENGIAMA | `07-klase/README.md` |
| 8 | 13–14 | RENGIAMA | `08-klase/README.md` |
| 9 | 14–15 | RENGIAMA | `09-klase/README.md` |
| 10 | 15–16 | RENGIAMA | `10-klase/README.md` |
| 11 | 16–17 | RENGIAMA | `11-klase/README.md` |
| 12 | 17–18 | RENGIAMA | `12-klase/README.md` |

## Darbo sutartis

Šis skyrius atstoja atskirą `wiki/AGENTS.md`, kol jis nepatvirtintas; galioja kartu su šakniniu `AGENTS.md`.

**Įrašo formatas.** Šeši laukai, šia tvarka: `Teiginys`, `Įrodymų stiprumas`, `Šaltinis`, `Ką tai reiškia platformai`, `Kaip patikrinti` – po antrašte `### P53 · Pavadinimas`. Stiprumas – vienas iš keturių legendos žodžių. Šaltinis – veikiantis URL arba DOI. Reikalavimas – įgyvendinamas statiniame HTML/JS (be serverio, be paskyrų). Patikra – matuojamas dydis ir slenkstis.

**Kietosios taisyklės.**

1. Jokio teiginio be URL ar DOI. Jei straipsnio negavai, cituok tą meta-analizę, kurią skaitei, ir tai parašyk.
2. Efekto dydį rašyk tik tada, kai jį matei šaltinyje. Neapvalink ir neperkelk iš kitos srities.
3. Klasės puslapyje – tik to amžiaus tinkamas turinys. Kitokio amžiaus tyrimas – tik su išlyga „perkėlimas nepagrįstas“.
4. Neišgalvok programos kodo. 3–12 klasių puslapiuose, kur kodo neturi: `kodas bus patvirtintas rengiant turinį`.
5. Nieko netrink. Paneigtas įrašas lieka su žyma `paneigta` ir priešingu šaltiniu.
6. Naujas radinys – naujas ID sekcijos gale; atnaujinama `Atnaujinta` data.
7. Taisymas – `P12a · ... (pataisyta)`, ne originalo perrašymas.
8. Kalba – lietuvių; sąvokos kaip bendrosiose programose (S1-14).
9. `vidutinis` ir `silpnas` įrodymas niekada nevirsta „moksliškai įrodyta“.
10. Wiki nekeičia `content/`, `js/`, `guidelines/`. Ji tik pagrindžia.

**Kaip pridedamas radinys.** Patikrink, ar teiginys jau neegzistuoja → paimk kitą laisvą numerį (`P53`…) → pasirink sekciją (1 multimedija … 8 motyvacija) → parašyk šešis laukus → patikrink URL → jei keičia klasės puslapį, įrašyk ir ten su `P##` → atnaujink `Atnaujinta`. Prieštaravimas žymimas taip:

```markdown
### P22 · Produktyvus nepavykimas: 1 klasei – ne
**Būsena.** paneigta (2026-11-03)
**Priešingas šaltinis.** Autorius (metai). *Žurnalas*. https://doi.org/...
**Kodėl.** Kokiai imčiai ir sąlygai naujas rezultatas galioja.
```

## Žinomos spragos

- **1 klasės moduliai neturi kodų.** Visų 22 modulių `curriculum.codes` yra tuščias masyvas, nors `AGENTS.md` reikalauja kodo. Tai blokuoja S1-14 ir `tools/validate.py` patikrą.
- **`designNotes` lauko nėra.** Nei vienas modulis nenurodo `P##`, todėl įrodymų grandinė šiandien nutrūksta ties moduliu.
- **`s1` formatas nesutampa su kanoniniu.** Moduliai naudoja `S1`…`S11` (be brūkšnio, be nulio priekyje), o kanoninės taisyklės žymimos `S1-01`…`S1-20`. Tai ne tas pats sąrašas – kol nepakeista, `s1` laukas negali būti laikomas įrodymu. Reikia perkėlimo lentelės, ne automatinio pervardijimo.
- **`content/schema/module.schema.json` nėra.** Šakninis `AGENTS.md` jį mini, bet failo nėra; `tools/validate.py` tikrina laukus kodu, be schemos.
- **S1 taisyklės.** `guidelines/svietimas1-rules.json` turi 20 taisyklių su `title_lt`, `rule_lt` ir `checks`. Wiki niekada necituoja `rule_lt` pažodžiui – jei taisyklė keičiasi, keičiasi tik šis failas.
- **1 klasės kodo „metų laikai“ problema.** `metu-laikai` modulis remiasi priešmokykliniu turiniu, ne 2022 m. BP numeriu – sezoniškumas programoje pasirodo 2 klasėje (`27.2.3`). Sprendimas – žymėti kaip papildomą, ne privalomą.
- **Amžiaus profiliai 3–12 klasėms** parašyti iš bendrų raidos žinių, be atskiro šaltinio kiekvienam sakiniui. Juose nėra skaičių, kurių negalėtume pagrįsti – ir tai sąmoningas apribojimas, ne užbaigtumas.

**Atnaujinta.** 2026-11-03
