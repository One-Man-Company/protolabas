# Daugiau, mažiau ar lygu?

**Dalykas / klasė / kodas:** Matematika / 1 klasė / `Matematika 24.1.1.1` (turinys: skaičių palyginimas, lygumo ir nelygumo sąvokos, ženklai `=, ≠, <, >`, praktinių situacijų apibūdinimas paprasčiausiomis lygybėmis ir nelygybėmis) · pasiekimas `Matematika A1.3` (atlieka paprastas procedūras, konsultuodamasis paaiškina). Kodai iš `research/curriculum-grade1.md` §2.1 (24 punktas), patikrinti pagal V-1269 20 priedą 2026-11-03; eilė – `research/curriculum-2026-11.md` §8, 1-a tema.

**Branduolinė idėja (1 sakinys):** Palyginimo ženklas visada atsiveria į didesnį skaičių.

**Išmatuojamas rezultatas (S1-02):** Per 8 simuliacijos raundus vaikas bent 6 kartus padeda teisingą ženklą (`=`, `<` arba `>`) tarp dviejų kiekių iki 10, iš jų bent 3 kartus – kai rodomi tik skaičiai be paveikslėlių.

**Prielaida (ką vaikas jau moka):** Skaičiuoja iki 10 ir sieja kiekį su skaičiumi (`skaiciai-iki-10`, `sudetis-iki-10`); iš kasdienės kalbos supranta žodžius „daugiau“ ir „mažiau“; atpažįsta skaitmenis 1–10. Nereikalaujama mokėti skaityti.

**Simuliavimo tipas (iš schemos):** `manipulate` – vaikas padeda ženklą į tuščią langelį tarp dviejų kiekių ir iškart mato, į kurią pusę ženklas atsiveria; po to ta pati užduotis kartojama tik su skaičiais.

**Kognityvinė apkrova (P10):** Ekrane – dvi krūvelės (arba du skaičiai), vienas tuščias langelis ženklui ir trys ženklų mygtukai. NĖRA: nelygybių su nežinomuoju (`□ < 5`), dviejų palyginimų vienu metu, „didžiausias iš trijų“, laikmačio, balų, skaičių iki 100. Viename raunde – vienas sprendimas. Paveikslėliai rodomi tik pirmoje simuliacijoje, antroje lieka vien skaičiai (P13: daiktas → simbolis).

**UX (P45–P48):** Ženklų mygtukai ≥72 × 72 px, tarpai ≥12 px; krūvelė – taškai be detalių, ne obuoliai su lapeliais (P15). Ekrane – du skaičiai ir vienas ženklas; visas sakinys – balse (`lt-LT`). Klaida rodo pasekmę, o ne nuosprendį: „7 < 4 – kairėje mažiau. O iš tikrųjų kairėje daugiau.“ Po dviejų klaidų paryškinama didesnė krūvelė (kita pagalbos rūšis, S1-08), po trečios – teisingas ženklas parodomas ir einama toliau. Jokio laikmačio, jokio pralaimėjimo ekrano.

**Įrodymai:** P13 (daiktas → paveikslėlis → simbolis: krūvelė → skaičiai), P39 (pavyzdys talk dalyje prieš savarankišką sprendimą), P10 (trys ženklai, ne keturi), P45 (dideli taikiniai, jokio tempimo), P43 (klaida – informacija apie pasekmę), P15 (neutralūs taškai, ne realistiniai paveikslėliai).

**5 veiklos:** `talk` (plati pusė atsiveria į didesnį; trys pavyzdžiai) → `sim` (krūvelės, 4 raundai, 2-as raundas – lygu) → `quiz` (vienas klausimas su užrašytomis lygybėmis) → `sim` (tik skaičiai, 4 raundai – perkėlimas) → `reflect` (kur gyvenime matai `<` ir `>`?).

**Mokytojo medžiaga:**
- *Tikslas:* ženklo `=`, `<`, `>` parinkimas tarp dviejų kiekių iki 10 ir ženklo krypties paaiškinimas.
- *Priemonės:* kortelės su skaičiais 1–10, du kauliukai, popieriaus juostelė ženklui rašyti, sąsiuvinis.
- *Eiga:* (1) parodykite dvi krūveles daiktų ir paklauskite, kur daugiau, nieko nerašydami; (2) užrašykite `3 < 5` ir paprašykite vaiko pirštu parodyti plačiąją ženklo pusę; (3) leiskite vaikui atlikti modulį, tada su kauliukais išmeskite du skaičius ir užrašykite jų palyginimą.
- *Diferencijavimas:* `pagalba` – lyginkite tik skaičius, kurie skiriasi daugiau nei vienu (3 ir 7), ir pirmiausia dėkite `>` („kairėje daugiau“); `iššūkis` – duokite užrašyti `4 ≠ 7` ir paaiškinti, kodėl šis ženklas sako „nelygu“, bet nepasako, kuris didesnis.
- *Refleksija:* „Kaip žinai, į kurią pusę turi atsiversti ženklas?“ / „Kur dar matai tokį ženklą?“

**Rizikos / ko nedaryti:**
1. **Nedėti `≠` kaip ketvirto mygtuko.** Trys ženklai ekrane jau yra standarto §7 riba (ne daugiau kaip 3 pasirinkimai, P10). Nelygumo ženklas lieka talk dalyje ir mokytojo iššūkyje; jei reikės jo kaip atskiro įgūdžio – tai atskira veikla, ne ketvirtas mygtukas.
2. **Nelyginti skaičių iki 100** – tai to paties 24.1.1.1 punkto vėlesnis žingsnis (`skaiciai-iki-20` teritorija).
3. **Nedaryti „krokodilo“ animacijos su garsais.** Ženklas juda tik tiek, kiek reikia krypčiai parodyti (≤300 ms); judesys be prasmės atitraukia (P02, P15).
4. **Nedėti kelių palyginimų eilėje** („kuris didžiausias“) – tai antra branduolinė idėja, kuri skaido modulį (S1-01).
5. **Nerašyti pilnų sakinių ekrane** – skaičiai, ženklas ir balsas (P04, P46).
6. **Nedėti „laikrodis / taškai“ reitingo.** Klaida kartojama tiek, kiek reikia, be bausmės (S1-13).
