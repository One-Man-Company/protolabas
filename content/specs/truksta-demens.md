# Trūkstamas dėmuo

**Dalykas / klasė / kodas:** Matematika / 1 klasė / `Matematika 24.1.1.2` (turinys: „Trūkstamas skaičius lygybėje (langelis)“; sudėtis ir atimtis kaip skaičiavimas pirmyn ir atgal, veiksmų ryšys, mintinis skaičiavimas iki 20) · pasiekimas `Matematika A1.3` (atlieka paprastas procedūras, konsultuodamasis paaiškina). Turinio numeris – iš `research/curriculum-grade1.md` §2.1 (24 punktas), tikrintas pagal V-1269 20 priedą 2026-11-03; eilė – `research/curriculum-2026-11.md` §14, 3-a tema.

*Pastaba dėl pasiekimo kodo.* `research/curriculum-2026-11.md` §14 toje eilutėje siūlo `C1.4` („modeliuoja ir nenagrinėtas situacijas“). Modulio rezultatas – paprasta procedūra su paaiškinimu, ne perkėlimas į nenagrinėtą situaciją, todėl imu `A1.3` – tą patį kodą, kurį naudoja `palygink-skaicius`, ir vienu lygiu aukštesnį už `sudetis-iki-10` (`A1.2`). Tai sąmoningas nukrypimas nuo eilės, ne naujas faktas apie programą; jei peržiūroje `C1.4` laikomas teisingu – keisti reikia vieną lauką.

**Branduolinė idėja (1 sakinys):** Trūkstamą dėmenį randi tada, kai iš visumos atimi tai, ką jau turi.

**Išmatuojamas rezultatas (S1-02):** Per 8 simuliacijos raundus vaikas bent 6 kartus teisingai nurodo trūkstamą dėmenį, kai visuma iki 10, o iš jų bent 3 kartus – kai užrašas rodomas vien simboliais, be taškų.

**Prielaida (ką vaikas jau moka):** Sudėtis ir atimtis iki 10 (`sudetis-iki-10`); skaičiuoja pirmyn ir atgal iki 10 (`skaiciai-iki-10`); supranta, kad „viso“ reiškia abi dalis kartu. Nereikalaujama mokėti skaityti.

**Simuliavimo tipas (iš schemos):** `manipulate` – vaikas mygtukais `+` / `−` nustato trūkstamą kiekį, o rėmelis parodo, ką tas skaičius sudaro; antroje simuliacijoje tas pats sprendimas priimamas mintyse, be rėmelio.

*Sąmoningas dizaino sprendimas.* Rėmelis nepildosi po vieną tašką spaudžiant `+`: jei pildytųsi, vaikas vietoj skaičiavimo tiesiog spaustų tol, kol langeliai pasidarytų pilni, ir nustotų skaičiuoti tuščias vietas. Todėl rėmelis rodo tik duotą dalį ir tuščias vietas, o vaiko skaičius jame pasirodo tik po `Patikrink` – teisingas ar neteisingas, kad vaikas matytų pasekmę ir spręstų iš naujo.

**Kognityvinė apkrova (P10):** Ekrane – vienas rėmelis su visuma (pvz., 9 vietos), viena užpildyta dalis, vienas mygtukas „+1“ ir vienas „−1“, po jais viena lygybė su vienu tuščiu langeliu. NĖRA: dviejų lygybių vienu metu, nežinomojo abiejose pusėse, dviženklių skaičių, laikmačio, balų, pasakojimo teksto ekrane. Viename raunde – viena lygybė ir vienas sprendimas. Skaičiavimas vyksta ekrane (rėmelyje), ne galvoje (P10: tarpiniai rezultatai parodomi).

**UX (P45–P48):** Mygtukai `+` / `−` ≥72 × 72 px, tarpai ≥12 px. Rėmelio langeliai ≥44 px, užpildyti – neutralūs taškai, ne obuoliai su lapeliais (P15). Visuma visą laiką matoma kaip tas pats rėmelis, todėl „kiek dar trūksta“ matuojama akimis, ne atmintimi. Visas sakinys – balse (`lt-LT`); ekrane – tik taškai, skaičiai ir vienas ženklas `+`. Klaida rodo pasekmę: „Dabar viso 7 – per daug. Nuimk 2.“ – skaičius išvedamas iš to, ką vaikas pasirinko, o ne parašytas iš anksto; pertekliniai taškai parodomi atskiroje juostoje po rėmeliu. Po dviejų klaidų siūloma kita pagalba (S1-08): rodomas pilnas pavyzdys „5 + 4 = 9“ su taškais. Po trečios – teisingas dėmuo parodomas ir einama toliau. Jokio laikmačio, jokio pralaimėjimo ekrano (S1-13).

**Įrodymai:** P13 (daiktas → paveikslėlis → simbolis: taškai rėmelyje → skaičiai), P39 (išspręstas pavyzdys prieš savarankišką sprendimą), P10 (viena lygybė, vienas langelis, trys elementai), P43 (klaida – informacija, po jos ta pati užduotis su kitais skaičiais), P45 (dideli taikiniai, jokio tempimo), P15 (neutralūs taškai).

*Nepanaudotas įrodymas.* `research/curriculum-2026-11.md` §14 motyvuoja temą P59 (ankstyvasis skaičiaus pagrindas prognozuoja vėlesnius žodinius uždavinius), bet `wiki/00-bendra/mokymosi-mokslas.md` atšakoje nuo `main` turi tik P01–P52, todėl P59 necituoju – validatorius tokį įrašą atmeta. Žr. `reports/questions.md`.

**5 veiklos:** `talk` (visuma susideda iš dviejų dalių; jei vienos trūksta – atimk) → `sim` (`gapfill`, režimas `counters`, 4 raundai su taškais) → `quiz` (viena lygybė su langeliu ir trys skaičiai) → `sim` (`gapfill`, režimas `symbols`, 4 raundai be taškų – perkėlimas) → `reflect` (kur gyvenime tenka ieškoti trūkstamo kiekio?).

**Mokytojo medžiaga:**
- *Tikslas:* trūkstamo dėmens radimas lygybėje, kai visuma iki 10, ir paaiškinimas, kodėl atimama.
- *Priemonės:* 10 vienodų daiktų (kamšteliai, kubeliai), popieriaus juostelė su dviem langeliais, pieštukas.
- *Eiga:* (1) Padėkite 4 kamštelius ir pasakykite: „Turime 9 iš viso. Kiek dar reikia?“ Leiskite vaikui dėti po vieną ir skaičiuoti balsu. (2) Užrašykite `4 + □ = 9` ir parodykite, kad langelį užpildo tai, ką vaikas pridėjo. (3) Leiskite vaikui atlikti modulį, tada kartu atimkite: `9 − 4 = 5`, ir pasakykite, kad abu užrašai sako tą patį.
- *Diferencijavimas:* `pagalba` – pradėkite nuo visumos 5–6 ir dėkite daiktus po vieną, kiekvieną kartą garsiai skaičiuodami „šeši, septyni…“; `iššūkis` – duokite `□ + □ = 9` ir paklauskite, keli sprendimai tinka (vaikas atras, kad ne vienas).
- *Refleksija:* „Kaip sužinojai, kiek trūksta?“ / „Ar lengviau pridėti, ar atimti?“

**Rizikos / ko nedaryti:**
1. **Nedėti nežinomojo abiejose pusėse** (`□ + □ = 9`) pagrindiniame kelyje – tai kita branduolinė idėja (S1-01); ji lieka tik mokytojo iššūkyje.
2. **Nedėti atimties lygybės atskirai** (`9 − 4 = □`) toje pačioje užduotyje: dvi lygybės vienu metu viršija P10 ribą. Atimtis pasirodo kaip paaiškinimas balse, o ne kaip antras uždavinys.
3. **Neleisti peršokti visumos.** Visuma iki 10, ne iki 20 – iki 20 yra `skaiciai-iki-20` ir `sudetis-iki-10` teritorija.
4. **Nedaryti „kalkuliatoriaus“.** Langelis pildomas tik tada, kai rėmelis tikrai pilnas; jei vaikas spaudžia „+1“ daugiau nei reikia, rodoma pasekmė (per daug), ne blokavimas.
5. **Nerašyti pilno sakinio ekrane** – tik lygybė su vienu langeliu ir balsas (P04, P46).
6. **Nedėti „bandymų skaičiaus“ ar širdelių.** Klaida kartojama be bausmės (S1-13).
