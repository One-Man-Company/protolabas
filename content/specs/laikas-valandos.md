# Kiek dabar valandų?

**Dalykas / klasė / kodas:** Matematika / 1 klasė / `Matematika 24.3.1.1` (turinys: masė, laikas – laikrodžio su rodyklėmis ir skaitmeninio laikrodžio laikas valandomis, 12 ir 24 valandų sistemos) · pasiekimas `Matematika A1.3` (atlieka paprastas procedūras, konsultuodamasis paaiškina). Kodai iš `research/curriculum-grade1.md` §2.1, patikrinti pagal V-1269 20 priedą (`.docx`) 2026-11-03; suvestinė redakcija 2026-10-03 – 2027-08-31 (`research/curriculum-2026-11.md` §2.1).

**Branduolinė idėja (1 sakinys):** Pilną valandą rodo trumpa rodyklė, o ilga tuo metu stovi ties 12.

**Išmatuojamas rezultatas (S1-02):** Per 6 simuliacijos raundus vaikas bent 5 kartus nustato prašomą pilną valandą (trumpą rodyklę padeda ties teisingu skaičiumi) ir bent 4 kartus perskaito nustatytą valandą iš laikrodžio.

**Prielaida (ką vaikas jau moka):** Skaičiuoja iki 12 ir atpažįsta skaičius 1–12 (`skaiciai-iki-10`, `skaiciai-iki-20`); skiria didelį daiktą nuo mažo; supranta „didelė rodyklė / maža rodyklė“ kaip skirtumą iš akies. Nereikalaujama mokėti skaityti.

**Simuliavimo tipas (iš schemos):** `manipulate` – vaikas liečia skaičių ciferblate ir mato, kaip persirikiuoja rodyklės; po to tas pats laikrodis naudojamas skaitymui.

**Kognityvinė apkrova (P10):** Ekrane – vienas laikrodis, 1–3 pasirinkimai ir viena užduotis. NĖRA: minučių (5, 10, 15…), „po / prieš“, dviejų laikrodžių vienu metu, laikmačio, laiko juostų, rodyklės judesio animacijos ilgiau nei 300 ms. Valandos rodomos tik pilnos (3:00, o ne 3:45). 24 valandų sistema pasirodo viename raunde ir yra ištariama balsu, o ne verčiama skaičiuoti.

**UX (P45–P48):** Ciferblato skaičiai – atskiri taikiniai ≥48 × 48 px (planšetėje 56 px), tarpai ≥8 px; pasirinkimai skaitymo raunde – 3 mygtukai ≥64 px. Tekstas ekrane – 1–3 žodžių etiketė („7 valanda“), visas sakinys – balse (`lt-LT`). Klaida rodo pasekmę: rodyklė nusisuka į paliestą skaičių ir pasakoma, ką ji rodo dabar. Po dviejų klaidų tame pačiame raunde – kitokia užuomina (rodyklės paryškinamos ir įvardijamos), trečioje – atsakymas parodomas. Jokio laikmačio, jokio balso.

**Įrodymai:** P13 (daiktas → paveikslėlis → simbolis: ciferblatas → skaitmeninis laikas), P45 (dideli taikiniai, tempimas nenaudojamas), P46 (skaitymo krūvis minimalus – instrukcija balsu), P07 (vaikas valdo tempą, „Toliau“ spaudžia pats), P43 (klaida – informacija, ne bausmė).

**5 veiklos:** `talk` (kas yra valanda, dvi rodyklės) → `sim` (nustatyk valandą, 3 raundai, paskutinis su 24 valandų užrašu) → `quiz` (viena užduotis: trumpa rodyklė ties 4, ilga ties 12) → `sim` (perskaityk nustatytą valandą, 3 raundai) → `reflect` (kada tu žiūri į laikrodį?).

**Mokytojo medžiaga:**
- *Tikslas:* pilnos valandos nustatymas ir skaitymas laikrodyje su rodyklėmis.
- *Priemonės:* tikras laikrodis su rodyklėmis (geriausia – didelis sieninis), popierinis ciferblatas su dviem pritvirtintomis rodyklėmis, skaitmeninis laikrodis telefone.
- *Eiga:* (1) parodykite tikrą laikrodį ir leiskite vaikams paliesti abi rodykles; (2) nustatykite lygiai valandą, kai ilga rodyklė ties 12, ir paklauskite, kuri rodyklė ką rodo; (3) leiskite vaikui savarankiškai atlikti modulį, tada kartu nustatykite tą pačią valandą tikrame laikrodyje.
- *Diferencijavimas:* `pagalba` – pradėkite nuo 12, 3, 6 ir 9 (keturios „kampinės“ valandos), ilgą rodyklę laikykite pirštu; `iššūkis` – duokite skaitmeninį laiką „19:00“ ir paprašykite parodyti jį laikrodyje su rodyklėmis bei paaiškinti, kodėl tai 7 valanda.
- *Refleksija:* „Kaip žinai, kad laikrodis rodo lygiai valandą, o ne penkias minutes po?“ / „Kur dar namuose yra laikrodis su rodyklėmis?“

**Rizikos / ko nedaryti:**
1. **Nedėti minučių** (5, 10, 15, 30) – tai kitas programos žingsnis ir antras branduolinis idėjos sluoksnis. Modulyje minutės tik paminimos kaip „ilga rodyklė“, niekada neskaičiuojamos.
2. **Nenaudoti tempimo** (P45): 6–7 metų vaikui tempti pelu sunku, todėl rodyklė niekada nevelkama – ji persirikiuoja palietus skaičių.
3. **Neversti skaičiuoti 24 valandų sistemos.** Raunde su „15:00“ vaikas tik atpažįsta tą pačią valandą, kurią pasakė balsas; atimties iš 12 nereikalaujama ir nesiūloma.
4. **Nedėti „laikrodis skuba / vėluoja“ uždavinių** – tai teksto uždavinys su laiko trukme (2 klasės turinys).
5. **Nerašyti pilnų sakinių ekrane** – etiketė + balsas (P04).
