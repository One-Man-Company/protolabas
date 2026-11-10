# Peržiūra: laikas-valandos

**Sprendimas:** APPROVE

**S1:** ☑ S1-01 ☑ S1-02 ☑ S1-07 ☑ S1-09 ☑ S1-12 ☑ S1-13 ☑ S1-14 ☑ S1-16 ☑ S1-17 ☑ S1-18

**Programa:** kodas patvirtintas — `Matematika 24.3.1.1` (masė, laikas: laikrodžio su rodyklėmis ir skaitmeninio laikrodžio laikas valandomis, 12 ir 24 valandų sistemos) ir `Matematika A1.3` iš `research/curriculum-grade1.md` §2.1, patikrinti pagal V-1269 20 priedą. Suvestinė redakcija 2026-10-03 – 2027-08-31 nepakito (`research/curriculum-2026-11.md` §2.1).

## Ką tikrinau ir ką radau

1. **S1-01 (viena idėja).** `designNotes.branduolineIdeja` — „Pilną valandą rodo trumpa rodyklė, o ilga tuo metu stovi ties 12.“ Minutės minimos tik kaip „ilga rodyklė“, neskaičiuojamos; 24 valandų sistema viename raunde yra tos pačios idėjos atpažinimas, ne antra tema. ☑
2. **S1-02 (išmatuojamas rezultatas).** `outcome` nurodo skaičių ir sąlygą: 6 raundai, ≥5 nustatymai, ≥4 perskaitymai. Kiekvieną rezultatą atitinka veikla (2 sim veiklos + quiz). ☑
3. **S1-07 / S1-08 dvasia (pagalba).** Po pirmos klaidos — pasekmė („Rodyklė dabar ties 5. Reikia 7.“), po antros — kitokia užuomina (rodyklės pastorinamos ir įvardijamos), po trečios — atsakymas parodomas. Pagalba keičia tipą, o ne kartoja tą patį. ☑
4. **S1-09 (gilinimas).** Mokytojo medžiagoje `issukis` keičia kontekstą (19:00 → 7 valanda), ne skaičių dydį. ☑
5. **S1-12 (grįžtamasis ryšys).** Nėra „blogai“, „neteisingai“; kiekvienas pranešimas sako, kas nutiko ir ką daryti. ☑
6. **S1-13 (saugi aplinka).** Nėra laikmačio, gyvybių, minusinių taškų; `success()` pasiekiamas be laiko spaudimo. ☑
7. **S1-14 (terminija).** „valanda“, „rodyklė“, „ciferblatas“ vartojami kaip programoje; dalykas, klasė ir sritis nurodyti. ☑
8. **S1-16 (kelias be mokytojo).** Modulis atsidaro iš hub per vieną paspaudimą, be kodo ar prisijungimo. ☑
9. **S1-17 (mokytojo medžiaga).** `teacher` turi tikslą, priemones, 3 žingsnius, diferencijavimą ir refleksiją; telpa į A4. ☑
10. **S1-18 (jokio sekimo).** Simuliacija nenaudoja `fetch`, išteklių iš interneto, `localStorage` rašo tik per `store`. ☑
11. **Amžius (P45, P46).** Ciferblato taikiniai 48–53 px, centrų atstumas ≥62 px (tarpai ≥14 px), rodyklė niekada nevelkama — palietus skaičių ji persirikiuoja. Instrukcija 1–5 žodžių ekrane + balsas. 320 px pločio ekrane horizontalaus slinkimo nėra (`document.documentElement.scrollWidth == innerWidth`). ☑
12. **Pedagogika.** `evidence` — P13, P45, P46, P07, P43; visi įrašai egzistuoja `wiki/00-bendra/mokymosi-mokslas.md`. ☑

## Rastos problemos (ištaisytos prieš uždarant peržiūrą)

1. `js/sims/clock.js` – pirmoje versijoje tarpai tarp ciferblato skaičių buvo 6 px (reikalavimas ≥8 px). Padidintas spindulys (41 %) ir taikinys `clamp(48px, 16%, 60px)`; dabar tarpai ≥14 px.
2. `js/sims/clock.js` – klaidos pranešimas „po trumpa rodykle“ buvo netaisyklingas; pakeista į „po trumpąja rodykle“.
3. `js/sims/clock.js` – `hourLabel()` rašė „11 valandos“, „12 valandos“; pataisyta į „11 valandų“, „12 valandų“.

## Ką keisti (neprivaloma, kitam ciklui)

1. **Minučių modulis.** Programos 24.3.1.1 punktas apima ir minutes; šis modulis jų sąmoningai nemoko. Jei kuriamas antras laiko modulis, jis turi būti apie „pusę“ ir „15 minučių“, o ne pratęsti šį.
2. **Garsinė patikra su vaiku.** Balsas (`speechSynthesis`, `lt-LT`) gali tarti „15:00“ kaip „penkiolika nulis nulis“; prieš skelbiant viešai verta pasiklausyti su vaiku ir, jei reikia, rašyti „penkiolika valandų“ vietoje skaitmenų.
3. **Tikras laikrodis.** Modulis stipriausias, kai šalia yra fizinis laikrodis; tai įrašyta mokytojo medžiagoje, bet ne patikrinta klasėje (S1-19 pilotas dar neatliktas).

**Patikros, kuriomis remtasi:** `python3 tools/validate.py` — OK; `python3 tools/health.py --strict` — 0 klaidų, 0 įspėjimų; `node tools/audit.mjs` — 23 moduliai, 0 blokuojančių, 0 įspėjimų; rankinis pasivaikščiojimas naršykle (320, 360, 768, 1024 px) — 3 raundai „nustatyk“, 3 raundai „perskaityk“, quiz, refleksija, pabaigos ekranas.
