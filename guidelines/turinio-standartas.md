# Turinio standartas

Kiekvienas modulis, nepriklausomai nuo to, kas jį kuria — žmogus ar agentas — atitinka
šį standartą. Jis nėra rekomendacija: `tools/validate.py` ir `tools/health.py --strict`
blokuoja publikavimą, jei reikalavimai neįvykdyti.

## 1. Viena idėja

Modulis moko **vienos** sąvokos ar įgūdžio. Atsakymas į klausimą „ko moko šis modulis“
turi tilpti į vieną sakinį ir būti įrašytas `designNotes.branduolineIdeja`.

Jei į modulį norisi įdėti antrą temą — tai antras modulis, ne ilgesnis pirmas.

## 2. Išmatuojamas rezultatas

`outcome` aprašo, ką vaikas padarys **pastebimai**: kiek kartų, iš kelių bandymų, ką
konkrečiai. Pavyzdys:

> „Per 5 simuliacijos raundus vaikas bent 4 kartus teisingai nurodo kiekį iki 10
> neskaičiuodamas po vieną.“

Ne rezultatas: „susipažįsta su skaičiais“, „lavina dėmesį“, „mokosi skaičiuoti“.

## 3. Programos kodas

`curriculum.codes` — bent vienas oficialus kodas **su dalyko priešdėliu**.
Be kodo modulis neegzistuoja: tai S1-14 reikalavimas.

- `privaloma` — tema yra tos klasės programoje;
- `papildoma` — temos programoje nėra, todėl `designNotes.pastaba` paaiškina kodėl.

## 4. Įrodymų grandinė

`designNotes.evidence` — bent vienas `P##` įrašas iš `wiki/00-bendra/mokymosi-mokslas.md`.
Kiekvienas sprendimas (kodėl balsas, kodėl tiek taikinių, kodėl ne laikmatis) turi
atskaitos tašką. Neegzistuojantis `P##` yra validatorius klaida.

## 5. Penkios veiklos

Standartinė seka: `talk → sim → quiz → sim → reflect`.

| Tipas | Paskirtis | Riba |
|---|---|---|
| `talk` | paaiškina idėją vienu paveikslu | ≤320 simb. teksto, ≤4 punktai |
| `sim` | leidžia vaikui veikti ir matyti pasekmę | turi baigtis įmanomu `success()` |
| `quiz` | patikrina supratimą | 1 klausimas, 2–3 variantai, `hint` + `explain` |
| `reflect` | įvardija patirtį | nėra teisingo atsakymo |

Modulyje 3–8 veiklos. Daugiau — tai jau du moduliai.

## 6. Kalba

- Lietuvių kalba, „tu“ forma, esamasis laikas: „įdėk“, „patikrink“, „paspausk“.
- Sakinys ≤12 žodžių. Vaikui matomas tekstas — be anglicizmų.
- Klaida niekada nevadinama „blogai“. Sakoma, kas nutiko ir ką daryti kitaip.
- Skaičiai rašomi skaitmenimis, kai tai kiekis (5 obuoliai), žodžiais — kai tai sąvoka.

## 7. Amžiaus tinkamumas (1–2 klasė)

- **Be skaitymo.** Kiekviena instrukcija turi garsą (`speechSynthesis`, `lt-LT`) ir ikoną.
- **Vienas veiksmas vienu metu.** Ne daugiau kaip 3 pasirinkimai ekrane.
- **Taikiniai ≥44 px** (praktiškai 48 px), tarpai tarp jų ≥8 px.
- **Jokio laikmačio, jokio reitingo, jokio pralaimėjimo ekrano.**
- Sesija ≤12 min. (`minutes`), nes 6–7 metų vaikui ekranas yra viena iš veiklų, ne pagrindinė.

## 8. Simuliacijos

Kiekviena simuliacija:

1. prasideda be instrukcijų sąrašo — vaikas mato, ką galima spausti;
2. klaidos atveju rodo **pasekmę**, ne bausmę;
3. turi realiai pasiekiamą `success()` kelią (auditorius tai tikrina headless naršykle);
4. nieko nesiunčia į internetą;
5. išsivalo (`onCleanup`), jei vaikas išeina viduryje.

## 9. Mokytojo medžiaga

Privaloma net tada, kai vaikas mokosi savarankiškai:

- `tikslas` — ką pamokoje pasieksime;
- `priemones` — ką pasiruošti (dažnai realūs daiktai, ne ekranas);
- `eiga` — 3–4 žingsniai;
- `diferencijavimas.pagalba` ir `.issukis`;
- `refleksija` — klausimas, kuris grąžina prie patirties.

## 10. Ką daryti, kai abejoji

Jei nežinai, ar tema tinka amžiui — žymėk `papildoma`.
Jei nežinai kodo — rašyk `kodas nepatvirtintas` ir **neišgalvok**.
Jei nežinai įrodymo — rašyk į `reports/questions.md`, o ne cituok iš atminties.
