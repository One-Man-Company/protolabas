# Kurikulumo žemėlapis

Kiekvieno modulio ryšys su oficialia bendrąja programa. Kodai paimti iš
`research/curriculum-grade1.md` (e-TAR, įsakymas V-1269, suvestinė redakcija,
galiojanti nuo 2026 m.). Nė vienas kodas neišgalvotas.

> **Kodėl kodai rašomi su dalyko priešdėliu.** Numeracija kartojasi tarp dalykų:
> 22.x yra ir Etika, ir Fizinis ugdymas; 23.x – ir Dailė, ir Technologijos;
> 24.x – ir Matematika, ir Gyvenimo įgūdžiai; 25.x – ir Lietuvių kalba, ir Muzika.
> Be priešdėlio kodas yra dviprasmis, todėl validatorius reikalauja priešdėlio.

## 1 klasės moduliai (22)

| Dalykas | Modulis | Programos kodai | Statusas | ID |
|---|---|---|---|---|
| Matematika | Akmenų žaidimas | `Matematika 24.2.2, Matematika C1.3` | papildoma | `akmenu-zaidimas` |
| Informatika | Algoritmai robotui | `Matematika 24.2.2, Matematika C1.3` | privaloma | `algoritmai-robotui` |
| Gamtos mokslai | Augalo gyvenimas | `Gamtos mokslai 26.2.3, Gamtos mokslai D1.4` | privaloma | `augalo-gyvenimas` |
| Choras | Dainuoju chore | `Muzika 25.1.2, Muzika 25.1.4` | privaloma | `dainuoju-chore` |
| Matematika | Formos ir simetrija | `Matematika 24.3.3.1, Dailė 23.1.7, Dailė A1.2` | privaloma | `formos-ir-simetrija` |
| Gamtos mokslai | Gyva ir negyva | `Gamtos mokslai 26.2.4, Gamtos mokslai D4.3` | privaloma | `gyva-ir-negyva` |
| Tikyba / etika | Jausmai ir draugystė | `Etika 22.1.2, Etika A2.2` | privaloma | `jausmai-ir-draugyste` |
| Fizinis ugdymas | Judrumo žaidimas | `Fizinis ugdymas 22.1.1, Fizinis ugdymas 22.1.3` | privaloma | `judrumo-zaidimas` |
| Technologijos | Konstruoju bokštą | `Technologijos 23.3.3` | privaloma | `konstruoju` |
| Matematika | Matuoju ilgį | `Matematika 24.3.1.2, Matematika A1.4` | privaloma | `matuoju-ilgi` |
| Gamtos mokslai | Metų laikai | `Gamtos mokslai (2 klasė) 27.2.3` | papildoma | `metu-laikai` |
| Lietuvių kalba | Raidės ir garsai | `Lietuvių kalba 25.4.1, Lietuvių kalba D1.3` | privaloma | `raides-ir-garsai` |
| Muzika | Ritmas ir garsai | `Muzika 25.1.5` | privaloma | `ritmas-ir-garsai` |
| Visuomeninis ugdymas | Saugus kelias | `Gyvenimo įgūdžiai 24.4` | privaloma | `saugus-kelias` |
| Visuomeninis ugdymas | Šeima ir bendruomenė | `Gyvenimo įgūdžiai 24.1, Etika 22.2.1` | privaloma | `seima-ir-bendruomene` |
| Matematika | Skaičiai iki 10 | `Matematika 24.1.1.1, Matematika A1.2, Matematika B2.2` | privaloma | `skaiciai-iki-10` |
| Matematika | Skaičiai iki 20 | `Matematika 24.1.1.1, Matematika A1.3` | privaloma | `skaiciai-iki-20` |
| Lietuvių kalba | Skaitau žodžius | `Lietuvių kalba 25.4.1, Lietuvių kalba D2.2` | privaloma | `skaitau-zodzius` |
| Šokis | Šokių žingsniai | `Fizinis ugdymas 22.1.4` | papildoma | `sokiu-zingsniai` |
| Dailė | Spalvų laboratorija | `Dailė 23.1.3, Dailė 23.1.1, Dailė A1.2` | privaloma | `spalvu-laboratorija` |
| Matematika | Sudėtis iki 10 | `Matematika 24.1.1.2, Matematika A1.2` | privaloma | `sudetis-iki-10` |
| Tikyba / etika | Teisingas dalijimas | `Etika 22.2.1, Matematika 24.1.1.2` | privaloma | `teisingas-dalijimas` |

## Ką tai reiškia praktiškai

- **`privaloma`** – tema yra 1 klasės programoje. Modulis gali būti naudojamas kaip
  pamokos dalis.
- **`papildoma`** – temos 1 klasės programoje nėra (metų laikai – 2 klasė, 27.2.3;
  šokis – atskira programa, kuri nebuvo išgauta). Modulis tinka kaip išplėtimas,
  bet negali būti pateikiamas kaip 1 klasės privalomas turinys.

## Dangos spragos (ką statyti toliau)

Visi 12 registruotų dalykų turi bent vieną modulį. Trūksta **gylio**, ne pločio:
matematikoje nėra pinigų/laiko, lietuvių kalboje – sakinio sandaros, gamtoje –
vandens būsenų ir energijos. Detalų sąrašą generuoja `tools/health.py`.

## Ko šiame žemėlapyje nėra

- **2–12 klasių** – jų programos dar neišgautos. `wiki/NN-klase/README.md` žymi
  `RENGIAMA`, o ne išgalvotus kodus.
- **Tikybos** – analizuota tik Etika (05 priedas); tikybų programos (06–12 priedai)
  nebuvo išgautos.
- **„Pasaulio pažinimo BP“ kaip atskiro dokumento** – dabartinėje suvestinėje jo nėra;
  1 klasės gamtos turinys imtas iš 22 priedo „Gamtos mokslai“.
