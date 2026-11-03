# Turinio kūrimo procesas

**Kam.** Agentui ar žmogui, kuris kuria naują modulį. Procesas yra **gates** seka: kiekvienas žingsnis turi išėjimo kriterijų, ir per šį kriterijų neperėjęs modulis į kitą žingsnį neina. Tvarka nėra biurokratija – ji atspindi įrodymus: pirmiau kodas ir viena idėja, paskui sim tipas, paskui veiklos, tik tada UI.

**Ką reiškia nuorodos.** `S1-##` – taisyklė iš `guidelines/svietimas1-rules.json` (id ir trumpas pavadinimas čia, ne tekstas). `P##` – įrašas iš `mokymosi-mokslas.md`. Klasė – iš `NN-klase/README.md`.

---

## 0 žingsnis · Pasirink kodą

**Įvestis.** Norima tema („norime modulio apie eurus“).
**Veiksmas.** Susirask kodą `research/curriculum-grade1.md` temų žemėlapyje arba `guidelines/kurikulumas.md`. Patikrink, kad kodas priklauso **tai klasei**, o ne 1–2 koncentrui, jei mokai 1 klasę.
**Išėjimas.** `curriculum.codes` su realiu numeriu (pvz., `24.1.2`) ir `curriculum.area`.
**Gate.** Jei kodo nėra – temos nekuriame. Išimtis: sąmoningai žymima kaip `papildoma` ir dokumentuojama klasės puslapio spragų sąraše (pvz., `metu-laikai` – sezoniškumas programoje yra 2 klasėje, `27.2.3`).
**Taisyklės.** S1-14 (terminija ir turinys suderinti su BP), S1-03 (modulis turi vietą pakopos sekoje).

## 1 žingsnis · Viena branduolinė idėja

**Veiksmas.** Suformuluok vieną sakinį: „Šis modulis moko, kad ___“. Jei sakinyje yra „ir“, tai du moduliai.
**Išėjimas.** `branduoline_ideja` laukas arba, kol jo schemoje nėra, pirmas `designNotes` įrašas.
**Gate.** Naujų sąvokų modulyje ≤1; kitos – jau įvestos ankstesniuose moduliuose. Vienu metu operuojami elementai ≤3 (P10).
**Taisyklės.** S1-01 (viena branduolinė idėja), P10 (darbo atmintis), P07 (segmentavimas: 1 ekranas – 1 idėja).

## 2 žingsnis · Užrašyk rezultatą

**Veiksmas.** 1–3 rezultatai, kiekvienas prasideda stebimu veiksmažodžiu: „suskaičiuoja“, „palygina“, „įvardija“, „paaiškina“. Ne „žinos“, „susipažins“, „supras“.
**Išėjimas.** `objectives` masyvas, kiekvieną rezultatą atitinka bent viena veikla.
**Gate.** Ar galiu pasakyti, kaip atrodys įrodymas, kad rezultatas pasiektas? Jei ne – rezultatas ne formuluotė, o noras.
**Taisyklės.** S1-02 (išmatuojamas rezultatas), P12 (modulis be įvardyto tikslo ir perkėlimo užduoties nemoko).

## 3 žingsnis · Pasirink sim tipą

**Veiksmas.** Iš keturių tipų pasirink tą, kuris atlieka **tą patį veiksmą**, kurio mokai – ne tą, kuris gražiau atrodo:

| Tipas | Kada | Ką privalo daryti vaikas | P |
|---|---|---|---|
| Manipuliable (tempimas, grupavimas) | Sąvoka apie kiekį, dydį, sudėtį | Judina objektus, ne spėlioja | P16, P13 |
| Simuliacija su parametrais | Reiškinys, kurio klasėje nepamatysi (greičio, mastelio, laiko) | Keičia ≤2–3 parametrus ir mato rezultatą <200 ms | P17, P19 |
| Žaidimo teorijos situacija | Pasirinkimas su pasekme kitam (nuo 10–11 m.; 1 kl. – tik konkreti situacija) | Renkasi veiksmą ir mato abiejų pasekmes | P29, P30 |
| Rikiavimas / klasifikavimas | Sąvokų skyrimas (gyva–negyva, medžiagos) | Grupuoja pagal požymį, gina grupę | P14 |

**Gate.** Jei reiškinį galima parodyti realiai per 2 min. – simuliacija nebūtina (P19). Jei simuliacija turi daugiau nei 3 keičiamų parametrų – per sunku 6–7 m. vaikui (P17).
**Taisyklės.** P16, P17, P18, P19, P12.

## 4 žingsnis · Parašyk 5 veiklas

**Veiksmas.** Standartinė seka – penkios veiklos, kiekviena su savo vaidmeniu:

1. **Pavyzdys** (`talk`) – viena idėja, įgarsinta, ≤40 s. Ne apibrėžimas, o parodytas veiksmas (P39, P22).
2. **Vedamas bandymas** (`sim`) – tas pats uždavinys, bet su užuominomis ir matomu grįžtamuoju ryšiu (P20).
3. **Savarankiškas bandymas** (`sim` arba `quiz`) – be užuominų, bet su klaidos paaiškinimu (P43).
4. **Perkėlimas** – kiti objektai, kitas skaičių diapazonas, kitas paveikslėlis (P14, P12). Be šios veiklos modulis moko procedūros.
5. **Refleksija** (`reflect`) – vienas klausimas apie strategiją („kaip tau lengviausia?“), ne apie jausmą (P50, P40).

**Gate.** Kiekviena veikla turi žymą `butina` / `papildoma` / `pasirenkama` (S1-04). Nė viena veikla neturi laiko limito (S1-13). Po antros klaidos tame pačiame tipo – pasiūloma alternatyvi pagalba tame pačiame ekrane (S1-07), o po trečios – keičiamas pagalbos tipas (S1-08).
**Taisyklės.** S1-04, S1-07, S1-08, P39, P22, P20, P14, P43.

## 5 žingsnis · Amžiaus ir UX patikra

**Veiksmas.** Peržiūrėk kiekvieną ekraną pagal klasės puslapio „Tinkami interakcijų tipai“ ir šį sąrašą:

- Instrukcija ≤12 žodžių, įgarsinta `lt-LT`; ekrane – 1–3 žodžių etiketė, ne tas pats sakinys kaip garse (P04, P09, P46).
- Taikiniai ≥64 × 64 px; kiekvienam „drag“ yra alternatyva (bakstelėjimas, rodyklės) (P45).
- Kontrastas ≥4,5:1; būsena (teisingai / neteisingai / pasirinkta) turi formą, spalvą **ir** garsą, ne vien spalvą (P47).
- Etiketės prie objekto, ne legendoje (P05); garsas ir animacija paleidžiami kartu (P06).
- Jokių dekoratyvių GIF'ų, foninės muzikos, „įdomių“ nukrypimų (P02).
- Sesija baigiasi per 5–10 min., yra aiškus pabaigos ekranas, jokių „dar vienas lygis“ kilpų (P49).
- Jokių lyderių lentelių, taškų už greitį, materialių prizų (P26, P27).

**Gate.** „Drag and drop“ nėra vienintelis kelias; audio išjungus modulis lieka įveikiamas iki pirmos užduoties (S1-15, P47).
**Taisyklės.** P02, P04–P06, P09, P45–P49, S1-13, S1-15.

## 6 žingsnis · Įrodymų patikra

**Veiksmas.** Įrašyk `designNotes: ["P07","P39"]` – tik tuos P, kurie realiai apribojo sprendimą. Kiekvienam įrašyk, **ką** jis apribojo (ne „naudojome P39“, o „P39 → pirmas ekranas yra išspręstas pavyzdys“).
**Gate.** Kiekviena veikla turi bent vieną P arba S1 nuorodą. Jei veikla neturi – ji arba nereikalinga, arba trūksta įrodymo; abiem atvejais tai sprendžiama prieš publikavimą, ne po.
**Taisyklės.** S1-02, S1-05 (vertinimas pagal tą pačią rubriką), P40 (ryšys apie veiksmą).

## 7 žingsnis · Validacija

**Veiksmas.**

```
python3 tools/validate.py          # privalomi laukai, kodų forma, nuotoliniai URL, i18n raktai
python3 tools/serve.py 8088        # vietinė peržiūra
```

**Gate.** Validatorius žalias; modulis atsidaro telefone (320 px), planšetėje ir nešiojamame; veikia be tinklo po pirmo įkėlimo; klaviatūra vien įveikiamas; `prefers-reduced-motion` gerbiamas.
**Taisyklės.** S1-15, S1-16 (vaikas gali pradėti pats, be klasės kodo), S1-18 (jokių trečiųjų šalių užklausų).

## 8 žingsnis · Mokytojo lapas

**Veiksmas.** `mokytojui.md` tame pačiame modulio kataloge: rezultatas, numatomas laikas, 3 dažniausios klaidos su paaiškinimais, 3 klausimai diskusijai, spausdinama santrauka. Ne daugiau kaip vienas A4.
**Gate.** Telpa į A4; nereikalauja registracijos; „dažnos klaidos“ parašytos iš realaus bandymo, ne iš vaizduotės.
**Taisyklės.** S1-17 (mokytojo medžiaga taupo laiką), P19 (mokytojo kontekstas – dalis efekto).

## 9 žingsnis · Pilotas ir publikavimas

**Veiksmas.** Prieš skelbiant viešai – bandymas su 5–10 mokytojų arba 2–3 mokyklomis, su **iš anksto** užrašytais sėkmės kriterijais (ne po fakto). Rezultatai skelbiami nepriklausomai nuo to, ar teigiami. Nepavykę sprendimai dokumentuojami, ne trinami.
**Gate.** Yra piloto protokolas su kriterijais prieš startą ir rezultatų ataskaita.
**Taisyklės.** S1-19 (pilotas prieš platinimą), S1-20 (metinė iteracija pagal 4 metrikus: kur nustoja, laikas iki pirmos sėkmės, kuri pagalba padeda, grįžtančių dalis).

---

## Ką daryti, kai užstrigai

| Situacija | Sprendimas |
|---|---|
| Nėra kodo temai | Nekurk. Įrašyk į klasės puslapio „spragos“ su paaiškinimu, kodėl (programoje nėra / priklauso kitai klasei) |
| Tema per plati | Skaldyk pagal S1-01; pirmas modulis – sąvoka, antras – taikymas |
| Simuliacija per sudėtinga | Mažink parametrus iki 2 (P17); jei vis dar per sudėtinga – keisk tipą į manipuliable |
| Vaikai meta modulį viduryje | Pirmo bandymo sėkmė <30 % (P22) arba instrukcija per ilga (P46); tikrink segmentavimą (P07) |
| Neaišku, ar veikia | Rašyk hipotezę su P nuoroda ir matuok vieną rodiklį; „patinka / nepatinka“ nėra rodiklis |

**Atnaujinta.** 2026-11-03
