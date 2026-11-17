# Peržiūra: palygink-skaicius

**Sprendimas:** APPROVE (techninė savikontrolė; S1-14 trečioji patikra – dalyko mokytojo peržiūra – neatlikta, žr. „Ką keisti“)

**S1:** ☑ S1-01 ☑ S1-02 ☑ S1-07 ☑ S1-09 ☑ S1-12 ☑ S1-13 ☑ S1-14 (su išlyga) ☑ S1-16 ☑ S1-17 ☑ S1-18

**Programa:** kodas patvirtintas — `Matematika 24.1.1.1` (skaičių palyginimas, lygumo ir nelygumo sąvokos, ženklai `=, ≠, <, >`, paprasčiausios lygybės ir nelygybės) ir `Matematika A1.3` iš `research/curriculum-grade1.md` §2.1, patikrinti pagal V-1269 20 priedą (24 punktas). Eilė — `research/curriculum-2026-11.md` §8, 1-a tema. *Pastaba:* šis tyrimo failas šiuo metu yra tik darbinėje kopijoje (neregistruotas repozitorijoje), todėl PR apraše tai pažymėta.

## Ką tikrinau ir ką radau

1. **S1-01 (viena idėja).** `designNotes.branduolineIdeja` — „Palyginimo ženklas visada atsiveria į didesnį skaičių.“ Modulis turi vieną veiksmą (parinkti ženklą) ir vieną taisyklę. `≠` nepasirenkamas, todėl antra tema neatsiranda. ☑
2. **S1-02 (išmatuojamas rezultatas).** `outcome`: 8 raundai, ≥6 teisingi ženklai, ≥3 iš jų be paveikslėlių. Tai atitinka 4 + 4 raundus dviejose sim veiklose ir vieną quiz. ☑
3. **S1-07 (pagalba po dviejų nesėkmių).** Simuliacijoje: 1-a klaida – ką teigia pasirinktas ženklas ir kas iš tikrųjų (`„6 < 4 – kairėje mažiau. O iš tikrųjų kairėje daugiau.“`), 2-a – paryškinama didesnė krūvelė ir pasakoma, kad ženklas atsiveria į didesnę pusę, 3-a – teisingas ženklas parodomas ir einama toliau. Pagalba keičia tipą, ne kartoja tą patį (S1-08 dvasia). ☑

   *Patikrinta naršyklėje:* trys iš eilės neteisingi pasirinkimai davė būtent šias tris žinutes ir raundas užsidarė pats, be užstrigimo.
4. **S1-09 (gilinimas).** `teacher.diferencijavimas.issukis` keičia kontekstą (`4 ≠ 7`: ženklas sako „nelygu“, bet nepasako, kuris didesnis), o ne skaičių dydį. ☑
5. **S1-12 (grįžtamasis ryšys).** Nėra „blogai“, „neteisingai“, „nesugebėjai“. Kiekviena klaida sako, ką reiškia pasirinkimas ir kas yra iš tikrųjų. ☑
6. **S1-13 (saugi aplinka).** Nėra laikmačio, gyvybių, minusinių taškų; `success()` pasiekiamas be laiko spaudimo (patikrinta: 4 raundai be klaidų → `Toliau` atsirakina). ☑
7. **S1-14 (terminija, su išlyga).** Vartojami programos žodžiai: „lygu“, „mažiau“, „daugiau“, „ženklas“, „palyginti“. Dalykas, klasė ir sritis nurodyti. Trečioji šios taisyklės patikra (dalyko mokytojo peržiūra) neatlikta – to agentas padaryti negali. ☑ (su išlyga)
8. **S1-16 (kelias be mokytojo).** Modulis atsidaro iš hub kortelės vienu paspaudimu (`index.html` → `mokytis.html?g=1&m=palygink-skaicius`), be kodo, be prisijungimo. ☑
9. **S1-17 (mokytojo medžiaga).** `teacher` turi tikslą, priemones, 3 žingsnius, diferencijavimą (pagalba / iššūkis) ir refleksiją; telpa į vieną A4. ☑
10. **S1-18 (jokio sekimo).** `js/sims/compare.js` nenaudoja `fetch`, `localStorage`, jokių išorinių išteklių. ☑
11. **Amžius ir UX (P45, P46, P10).** Mygtukai 82 × 82 px (reikalavimas ≥44 px, standartas 48 px), trys pasirinkimai ekrane, jokio tempimo. Patikrinti keturi ekranai – 1024×768, 768×1024, 390×844, 320×640: ženklų mygtukai telpa į pradinį ekraną (`pad.bottom` ≤ 574 iš 640) ir horizontalaus slinkimo nėra (`scrollWidth == innerWidth`). Krūvelės – neutralūs taškai, ne paveikslėliai (P15). ☑
12. **Pedagogika.** `evidence` — P13, P39, P10, P45, P43, P15; visi įrašai yra `wiki/00-bendra/mokymosi-mokslas.md` ir egzistuoja jau `main` šakoje. P13 pagrindžia perėjimą krūvelė → skaičiai, P39 – talk dalies pavyzdžius prieš savarankišką sprendimą. ☑

## Pakeitimai po pirmos patikros

1. `js/sims/compare.js` – lygybės raundas iš pradžių visada buvo antras; dabar jo vieta parenkama atsitiktinai (2-a arba 3-a), kad vaikas nespėliotų iš raundo eilės.
2. Raundo planas: pirmas palyginimas visada su ≥2 skirtumu, kad pirmasis bandymas būtų akivaizdus (pradžios patirtis), o ne spėlionė.

## Ką keisti (nepatvirtinta, kitam ciklui)

1. **`≠` likimas.** Šiame modulyje jis įvardijamas talk dalyje ir mokytojo iššūkyje, bet nėra ketvirtas mygtukas (standarto §7 riba, P10). Jei mokytojai norės `≠` kaip savarankiško įgūdžio – tai atskira veikla arba antras modulis, ne ketvirtas mygtukas šiame.
2. **Garso patikra su vaiku.** Ekrane `<` ir `>` netariami; balsas sako žodžiais („Dešinėje daugiau, todėl ženklas atsiveria į dešinę“). Prieš skelbiant verta pasiklausyti, ar `lt-LT` balsas šias frazes taria natūraliai.
3. **S1-14 trečia patikra ir S1-19 pilotas** – mokytojo peržiūra ir pilotas neatlikti; PR laukia žmogaus.
4. **`reports/health.json` / `health.md`** į šakos commit'ą neįtraukti – tai generuojami failai, CI juos perskaičiuoja.

## Patikros, kuriomis remtasi

- `python3 tools/validate.py` — 23 moduliai, 23 simuliacijos, OK.
- `python3 tools/health.py --strict` — 0 klaidų, 0 įspėjimų (23 moduliai, `truksta_dalyku: []`).
- `node tools/audit.mjs --base http://127.0.0.1:8092` — 23 moduliai, 0 blokuojančių, 0 įspėjimų; `palygink-skaicius` praeina iki pabaigos ekrano.
- Rankinis pasivaikščiojimas naršykle: talk → 4 raundai su krūvelėmis (įsk. lygybės raundą) → quiz → 4 raundai tik su skaičiais → refleksija; klaidos kelias (1-a, 2-a, 3-ia) atskirai; `window.__errs` tuščias.
