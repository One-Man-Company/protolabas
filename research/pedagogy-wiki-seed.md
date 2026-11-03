# Protolabas pedagogikos wiki (sėklas)

**Paskirtis.** Protolabo (1 klasė, 6–7 m., naršyklė, be registracijos) mokymosi dizaino žinių bazės pradas, skirtas plėsti ir cituoti kitiems agentams: kiekvienas teiginys turi ID, įrodymų lygį, šaltinį su veikiančiu URL ar DOI, dizaino taisyklę ir patikros būdą.

**Įrodymų skalė.** **Stiprus** – kelios nepriklausomos meta-analizės ar didelės kontroliuojamos studijos, kryptis nuosekli. **Vidutinis** – bent viena meta-analizė ar keli eksperimentai, bet yra moderatorių. **Silpnas** – pavienės studijos, mažos imtys, laboratoriniai duomenys. **Mišrus** – kryptis priklauso nuo sąlygų arba šaltiniai rodo skirtingus dydžius.

**Taisyklės pildantiems.** Naujas teiginys – naujas ID (P53…); keičiant teiginį rašoma `P12a` su pastaba „pataisyta“. Nerašyk teiginio be šaltinio, kurį realiai skaitei arba kurio DOI rezoliuoja; jei straipsnio negavai, cituok skaitytą meta-analizę ir tai parašyk. Efekto dydį rašyk tik tada, kai jį matei šaltinyje. Taisyklė turi būti įgyvendinama statiniame HTML/JS projekte.

**Bendra išlyga.** Dauguma eksperimentų atlikta su vyresniais mokiniais. Mayerio laboratoriniai efektai dideli, tačiau Cromley ir Chen (2025) 92 straipsnių, 181 studijos ir 591 efekto meta-analizė rodo Mayerio korpuse **bendrą g = 0,37**, o animacijų, žaidimų ir simuliacijų rezultatus – **mažiau nuoseklius** nei teksto su diagramomis. Principus naudojame kaip inžinerinius reikalavimus, o ne efekto dydžių pažadą.

---

## 1. Multimedija ir kognityvinė apkrova

### P01 · Vaizdas + garsas moko geriau nei vien tekstas
**Teiginys.** Ta pati idėja, pateikta ir vaizdu, ir įgarsintu žodžiu, suprantama giliau nei vien žodžiais (dvigubo kodavimo išraiška).
**Įrodymų stiprumas.** Kryptis stipri, dydis 1 klasei – vidutinis: Mayerio laboratorijoje d = 1,35, 2017 m. – 1,67, Cromley ir Chen (2025) korpuse – g = 0,37.
**Šaltinis.** Mayer (2021), apžvalga: Overson et al. (2023), *In Their Own Words*, APA Div. 2, 145–152. https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-research-based-principles-for-designing-multimedia-instruction-mayer.pdf · Mayer (2017). *JCAL*, 33(5), 403–423. https://doi.org/10.1111/jcal.12197 · Cromley & Chen (2025). *Educational Research Review*, 49, 100730. https://doi.org/10.1016/j.edurev.2025.100730
**Ką tai reiškia platformai.** Kiekviena užduotis turi konkretų paveikslėlį ir 1–2 įgarsintus sakinius (≤10 žodžių).
**Kaip patikrinti.** A: tekstas + iliustracija; B: įgarsinta iliustracija be teksto; pirmo bandymo teisingumas ir perkėlimo testas po 7 d.

### P02 · Šalinam tai, kas neprideda prasmės (coherence)
**Teiginys.** Pašalinus su tikslu nesusijusią medžiagą – dekoratyvius paveikslėlius, foninę muziką, „įdomius“ nukrypimus – supratimas gerėja.
**Įrodymų stiprumas.** Stiprus: 18 iš 19 eksperimentų teigiami, d = 0,86 (2021 m.; 2017 m. – 0,70). Cromley ir Chen (2025) – „seductive details“ šalinimas – vienas didžiausių efektų jų korpuse.
**Šaltinis.** Mayer (2021), Table 2. https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-research-based-principles-for-designing-multimedia-instruction-mayer.pdf · Cromley & Chen (2025). https://doi.org/10.1016/j.edurev.2025.100730
**Ką tai reiškia platformai.** Jokių dekoratyvių GIF‘ų, debesėlių, foninės muzikos; personažas – tik funkcinis (rodo, kur spausti, arba įgarsina).
**Kaip patikrinti.** Užduotis su dekoratyviniu sluoksniu ir be jo; laikas iki pirmo veiksmo ir paspaudimai ne į tikslą.

### P03 · Ryškinimas rodo, kur žiūrėti (signaling)
**Teiginys.** Svarbiausios medžiagos paryškinimas (rodyklė, kontūras, išblukinimas, žodinė užuomina) gerina mokymąsi.
**Įrodymų stiprumas.** Stiprus ir nepriklausomai patvirtintas: 29 studijos, 44 efektai, 2726 dalyviai, d = 0,38; Mayerio suvestinėje 26 iš 28 testų, d = 0,70.
**Šaltinis.** Alpizar, Adesope & Wong (2020). *ETR&D*, 68, 2095–2119. https://doi.org/10.1007/s11423-020-09748-7
**Ką tai reiškia platformai.** Paryškinamas **vienas** elementas: kiti išblukinami iki ~30 % opacity, svarbusis gauna 2 px kontūrą; nespalvinti visko.
**Kaip patikrinti.** Ar pirmas paspaudimas tenka paryškintam elementui (signalo „pataikymas“); tikslas >80 %.

### P04 · Nerašome to, ką jau sakome (redundancy)
**Teiginys.** Kai yra įgarsinimas, tas pats tekstas ekrane paprastai nepadeda, o trukdo.
**Įrodymų stiprumas.** **Mišrus:** 2021 m. suvestinėje 8 iš 12 testų, d = 0,10; 2017 m. – d = 0,87. Efektas priklauso nuo teksto ilgio ir amžiaus.
**Šaltinis.** Mayer (2021), Table 2. https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-research-based-principles-for-designing-multimedia-instruction-mayer.pdf · Mayer (2017). https://doi.org/10.1111/jcal.12197
**Ką tai reiškia platformai.** Draudžiama: pilnas sakinys ekrane + to paties sakinio įrašas. Leidžiama: 1–3 žodžių etiketė + įgarsintas sakinys. Skaitomas tekstas – tik kai jis pats yra mokymosi objektas (raidės, skiemenys).
**Kaip patikrinti.** Trys versijos (garsas / garsas + pilnas tekstas / garsas + etiketė); lyginti laiką ir garso perklausų skaičių.

### P05 · Etiketė šalia objekto, ne legendoje (spatial contiguity)
**Teiginys.** Žodis turi būti prie pat įvardijamo vaizdo dalies; atskira legenda verčia akis šokinėti.
**Įrodymų stiprumas.** Stiprus: 9 iš 9 testų, d = 0,82.
**Šaltinis.** Mayer (2021), Table 2. https://www.unh.edu/teaching-learning-resource-hub/sites/default/files/media/2023-06/itow-research-based-principles-for-designing-multimedia-instruction-mayer.pdf
**Ką tai reiškia platformai.** Skaičiai rašomi ant objektų arba ≤8 px po jais; jokių „1 – obuolys, 2 – kriaušė“ sąrašų šalia paveikslėlio.
**Kaip patikrinti.** Netiesioginis rodiklis: laikas iki atsakymo užduotyse „suskaičiuok ir pasirink skaičių“, lyginant „etiketė ant objekto“ vs „legenda apačioje“.

### P06 · Garsas ir vaizdas vienu metu (temporal contiguity)
**Teiginys.** Kai pasakojimas skamba kartu su atitinkama animacija, supratimas gerokai geresnis nei atskirtas laike.
**Įrodymų stiprumas.** Stipriausias Mayerio sąraše: 8 iš 8 testų, d = 1,31.
**Šaltinis.** Mayer (2021), Table 2 (kaip P05).
**Ką tai reiškia platformai.** Animacija ir garsas paleidžiami vienu veiksmu; praleidus žingsnį, nutraukiami abu. Jokio „pirma pažiūrėk, paskui paklausyk“.
**Kaip patikrinti.** Instrumentuoti garso pradžios ir animacijos pradžios laiko žymas (skirtumas <100 ms), tada palyginti su tyčia 2 s pavėlintu garsu.

### P07 · Vaikas valdo tempą (segmenting)
**Teiginys.** Į vaiko valdomus gabalus suskaidyta medžiaga moko geriau nei vientisas automatiškai besisukantis srautas.
**Įrodymų stiprumas.** Stiprus: 10 iš 10 testų, d = 0,79 (kitur 0,67–0,70).
**Šaltinis.** Mayer, R. E., & Pilegard, C. (2014). In *Cambridge Handbook of Multimedia Learning* (2nd ed.). https://www.cambridge.org/core/books/abs/cambridge-handbook-of-multimedia-learning/principles-for-managing-essential-processing-in-multimedia-learning-segmenting-pretraining-and-modality-principles/DD24C2F48B9B1277CE59F78276110258
**Ką tai reiškia platformai.** Jokio nesustoijančio video: 1 ekranas – 1 idėja – 20–40 s, didelis „Toliau“ mygtukas, jokio automatinio tęsimo.
**Kaip patikrinti.** Segmentuota vs nesegmentuota versija; matuoti, kiek vaikų pasiekia pabaigą ir paskutinės užduoties teisingumą.

### P08 · Pirma žodynas, paskui užduotis (pre-training)
**Teiginys.** Trumpas pagrindinių sąvokų pristatymas prieš sudėtingą veiklą gerina vėlesnį mokymąsi.
**Įrodymų stiprumas.** Vidutinis: d = 0,46 (Mayer 2017), 0,60–0,70 kituose leidimuose; testų mažiau nei P02–P07.
**Šaltinis.** Mayer (2017). https://doi.org/10.1111/jcal.12197 · Mayer & Pilegard (2014), kaip P07.
**Ką tai reiškia platformai.** Prieš modulį – 20–30 s „žodynėlis“: 3–5 sąvokos su paveikslėliu ir garsu („daugiau“, „mažiau“, „lygu“, „skiemuo“).
**Kaip patikrinti.** A/B su žodynėliu ir be jo; matuoti pirmos modulio užduoties teisingumą ir laiką iki pirmo veiksmo.

### P09 · Instrukcija – balsu, ne raštu (modality)
**Teiginys.** Kai ekrane vaizdas, geriau girdėti paaiškinimą nei skaityti tą patį tekstą.
**Įrodymų stiprumas.** Vidutinis–stiprus: d = 0,72, bet dauguma tyrimų su jau skaitančiais vaikais; tiesioginių 1 klasės duomenų mažai.
**Šaltinis.** Mayer (2017). https://doi.org/10.1111/jcal.12197 · Cromley & Chen (2025) – modalumo principas tarp didžiausių efektų. https://doi.org/10.1016/j.edurev.2025.100730
**Ką tai reiškia platformai.** Visa instrukcija, kuri nėra pati skaitymo užduotis, įgarsinama; tekstas – tik pasirinktinė pagalba mokytojui.
**Kaip patikrinti.** Tekstinė vs įgarsinta instrukcija; matuoti, kiek vaikų pradeda užduotį per 15 s.

### P10 · Darbo atmintis 6-mečio – maža
**Teiginys.** Vaikas vienu metu išlaiko nedaug elementų; jei užduotis reikalauja daugiau, mokymasis vyksta per apkrovą, o ne per supratimą.
**Įrodymų stiprumas.** Stiprus dėl bendros architektūros, vidutinis dėl skaičių. Apkrovos matavimas kritikuojamas – de Jong (2010) parodė, kad ji matuojama netiesiogiai, o teorija sunkiai falsifikuojama.
**Šaltinis.** Sweller (1988). *Cognitive Science*, 12(2), 257–285. https://doi.org/10.1207/s15516709cog1202_4 · Sweller, van Merriënboer & Paas (2019). https://doi.org/10.1007/s10648-019-09465-5 · de Jong (2010). https://doi.org/10.1007/s11251-009-9110-0
**Ką tai reiškia platformai.** Vienu metu ≤3 elementai, su kuriais reikia operuoti; tarpiniai rezultatai parodomi ekrane, o ne laikomi galvoje.
**Kaip patikrinti.** Užduotys su 2, 3, 4, 5 elementais; ieškome „laužio taško“, kur teisingumas staiga krenta.

### P11 · Žinių atvirkštinis efektas (expertise reversal)
**Teiginys.** Tai, kas padeda pradedančiajam (daug paaiškinimų ir žymėjimų), pradeda trukdyti tam, kuris jau moka.
**Įrodymų stiprumas.** Vidutinis–stiprus: efektas pakartotinai gautas ir yra vienas stabilesnių kognityvinės apkrovos rezultatų.
**Šaltinis.** Kalyuga, S., Ayres, P., Chandler, P., & Sweller, J. (2003). *Educational Psychologist*, 38(1), 23–31. https://doi.org/10.1207/S15326985EP3801_4 · Kalyuga (2009). *Instructional Science*, 37, 403–417. https://doi.org/10.1007/s11251-009-9102-0
**Ką tai reiškia platformai.** Pagalba nyksta: 1-as bandymas – pilnas paaiškinimas, 2-as – užuomina, 3-ias – nieko.
**Kaip patikrinti.** Lyginti to paties užduoties tipo 1-ojo ir 3-iojo bandymo teisingumą su pilnu paaiškinimu ir be jo.

### P12 · Žaidimas ir simuliacija nėra automatinis mokymasis
**Teiginys.** Animacijos, žaidimai ir simuliacijos duoda mažiau nuoseklius rezultatus nei tekstas su diagramomis; jų poveikis labiau matomas perkėlimo ir samprotavimo, o ne faktų testuose.
**Įrodymų stiprumas.** Vidutinis (viena didelė, bet vieno autoriaus korpuso meta-analizė).
**Šaltinis.** Cromley & Chen (2025). https://doi.org/10.1016/j.edurev.2025.100730
**Ką tai reiškia platformai.** „Žaidybinis“ formatas negali būti argumentas, kad modulis moko: kiekvienas modulis turi įvardytą tikslą ir bent vieną perkėlimo užduotį.
**Kaip patikrinti.** Modulio pabaigoje – dvi užduotys: to paties formato ir perkelta (kiti daiktai, kitas paveikslėlis); jų skirtumas rodo, ar mokėmės principo.

---

## 2. Konkretu – vaizdu – abstraktu

### P13 · Seka: daiktas → paveikslėlis → skaičius
**Teiginys.** Matematikos idėją 6–7 metų vaikui efektyvu vesti trimis pakopomis: daiktas, jo paveikslėlis, abstraktus simbolis (Brunerio CPA seka).
**Įrodymų stiprumas.** **Vidutinis–silpnas.** Praktika plačiai naudojama, bet eksperimentų, lyginančių būtent šią seką su kitokia tvarka, nedaug; įrodymai daugiausia netiesioginiai.
**Šaltinis.** Bruner, J. S. (1966). *Toward a theory of instruction*. Harvard UP. · McKevett, N. M., Codding, R. S., & Running, K. R. (2024). *Remedial and Special Education*. https://doi.org/10.1177/07419325231160292
**Ką tai reiškia platformai.** Vienas uždavinys („kiek liko?“) – trys ekranai: tempiami obuoliai → paveikslėliai → skaičiai.
**Kaip patikrinti.** Trys grupės (CPA / paveikslėliai / simboliai); teisingumas iškart ir po savaitės.

### P14 · Manipuliavimas padeda labiau įsiminti nei perkelti
**Teiginys.** Konkrečios manipuliacijos duoda mažą–vidutinį efektą prieš vien simbolinį mokymą, bet didžiausias jis **įsiminimui**, o sprendimui ir perkėlimui – mažas.
**Įrodymų stiprumas.** Stiprus dėl bendro efekto, svarbus niuansas dėl perkėlimo: 55 studijos, N = 7237; vidutiniai–dideli efektai įsiminimui (k = 53), maži – sprendimui (k = 9) ir perkėlimui (k = 13).
**Šaltinis.** Carbonneau, Marley & Selig (2013). *Journal of Educational Psychology*, 105(2), 380–400. https://doi.org/10.1037/a0031084 · santrauka: https://eric.ed.gov/?id=EJ1007941
**Ką tai reiškia platformai.** Manipuliavimas negali būti modulio pabaiga: po jo būtina perkėlimo užduotis su kitais daiktais ar kitu skaičių diapazonu.
**Kaip patikrinti.** Dvi pabaigos užduotys (identiško formato ir perkelta); aukštas pirmos, žemas antros teisingumas – mokome procedūros, ne sąvokos.

### P15 · Per daug „realistiškos“ detalės kenkia
**Teiginys.** Kuo manipuliacija „tikroviškesnė“ (obuoliai su lapeliais, lėlės su drabužiais), tuo mažiau ji padeda matematikai; abstraktesnė (taškai, kubeliai) dažnai veikia geriau.
**Įrodymų stiprumas.** Vidutinis: realizmas ir instrukcijos struktūra sąveikauja, per didelis realizmas atitraukia dėmesį nuo kiekio.
**Šaltinis.** Carbonneau, K. J., & Marley, S. C. (2015). *The Journal of Experimental Education*, 83(4), 495–513. https://eric.ed.gov/?id=EJ1071109
**Ką tai reiškia platformai.** Skaičiavimui – neutralūs objektai (taškai, kubeliai, apskritimai); realistiški paveikslėliai – tik pasakojimo kontekstui.
**Kaip patikrinti.** Ta pati užduotis su „gražiais“ ir „neutraliais“ objektais; jei gražūs ilgina laiką be teisingumo prieaugio – keičiame.

### P16 · Virtualios manipuliacijos ne prastesnės už fizines
**Teiginys.** Virtualios manipuliacijos duoda vidutinį efektą prieš vadovėlinį mokymą, o tiesioginis virtualių ir fizinių palyginimas rodo tik nedidelį skirtumą.
**Įrodymų stiprumas.** Vidutinis: 66 ataskaitų meta-analizė – d = 0,75 prieš vadovėlinį mokymą; virtualių vs fizinių skirtumas mažas.
**Šaltinis.** Moyer-Packenham, P. S., & Westenskow, A. (2013). *IJVPLE*, 4(3), 35–50. https://doi.org/10.4018/jvple.2013070103 · santrauka: https://eric.ed.gov/?id=EJ1154970
**Ką tai reiškia platformai.** Fizinių rinkinių pirkti nebūtina, bet virtuali manipuliacija turi atlikti **tą patį veiksmą** (grupavimą, perkėlimą, skaidymą), ne tik parodyti paveikslėlį.
**Kaip patikrinti.** Užduotis sugrupuoti 7 objektus į 5 + 2; jei vaikas atsako nejudindamas objektų (spėlioja), dizainas per silpnas.

---

## 3. Simuliacijos ir tyrinėjimas

### P17 · Gera simuliacija tyrinėjama be instrukcijų
**Teiginys.** PhET simuliacijos veikia dėl „implicitinio pastoliavimo“: sąsaja pati nukreipia, kokius parametrus galima keisti, o rezultatas matomas iškart.
**Įrodymų stiprumas.** Vidutinis: principai išvesti iš >200 mokinių interviu (kokybiniai duomenys), ne iš RCT. Stipru dizainui, silpna efekto dydžiui.
**Šaltinis.** Adams, W. K., Reid, S., LeMaster, R., McKagan, S. B., Perkins, K. K., Dubson, M., & Wieman, C. E. (2008). https://phet.colorado.edu/publications/PhET%20Interview%20Paper%20Final.pdf · Wieman, Adams & Perkins (2008). *Science*, 322(5902), 682–683. https://doi.org/10.1126/science.1161948
**Ką tai reiškia platformai.** ≤2–3 keičiami parametrai kaip fiziški objektai (slankiklis, tempiamas taškas), ne skaičių laukeliai; pakeitimas duoda matomą rezultatą per <200 ms.
**Kaip patikrinti.** Ar vaikas per 60 s savarankiškai randa bent 2 parametrus; jei ne – mažiname elementų skaičių.

### P18 · Simuliacija su parama paveikesnė už simuliaciją vieną
**Teiginys.** Simuliacijos pranašumas prieš kitokį mokymą yra vidutinis (d = 0,62) ir didesnis, kai simuliacija papildoma metakognityvine parama ar grįžtamuoju ryšiu.
**Įrodymų stiprumas.** Vidutinis: 59 straipsnių sisteminė apžvalga ir meta-analizė, K–12 STEM.
**Šaltinis.** D'Angelo, C., Rutstein, D., Harris, C., Bernard, R., Borokhovski, E., & Haertel, G. (2014). *Simulations for STEM learning*. SRI International. https://www.sri.com/wp-content/uploads/2021/12/simulations-for-stem-learning-executive-summary.pdf
**Ką tai reiškia platformai.** Simuliacija niekada ne viena: šalia – trumpa užduotis su tikslu („padaryk, kad liktų 3“) ir grįžtamasis ryšys.
**Kaip patikrinti.** Sim tik tyrinėjimui vs sim + užduotis su tikslu; matuoti pasiektas būsenas ir ar vaikas įvardija taisyklę.

### P19 · Simuliacija gali pakeisti laboratoriją, bet ne mokytoją
**Teiginys.** Simuliacijos nuosekliai pagerina tradicinį mokymą, ypač kur laboratoriniai darbai brangūs ar neįmanomi; tačiau tyrimuose dažnai neįvertinta mokytojo parama ir vieta programoje.
**Įrodymų stiprumas.** Vidutinis: (quasi)eksperimentų apžvalga duoda „robustiškus įrodymus“, bet autoriai pabrėžia konteksto ignoravimą.
**Šaltinis.** Rutten, N., van Joolingen, W. R., & van der Veen, J. T. (2012). *Computers & Education*, 58(1), 136–153. https://doi.org/10.1016/j.compedu.2011.07.017
**Ką tai reiškia platformai.** Simuliacija skirta tam, ko realiai nepamatysi (didelis greitis, mažas mastelis, ilgas laikas); jei reiškinį galima parodyti per 2 min. realiai, simuliacija nebūtina.
**Kaip patikrinti.** Trumpa mokytojo anketa po bandomojo naudojimo: ar simuliacija pakeitė tai, ko klasėje neįmanoma parodyti.

### P20 · „Atrask pats“ be paramos veikia prasčiau nei aiškus mokymas
**Teiginys.** Nepagelbėta atradimo veikla duoda prastesnius rezultatus nei aiškus mokymas (d = −0,38), o **sustiprinta** atradimo veikla (grįžtamasis ryšys, pavyzdžiai, pastoliai, paaiškinimai) – geresnius (d = 0,30).
**Įrodymų stiprumas.** Stiprus: dvi meta-analizės, 580 ir 360 palyginimų.
**Šaltinis.** Alfieri, L., Brooks, P. J., Aldrich, N. J., & Tenenbaum, H. R. (2011). *Journal of Educational Psychology*, 103(1), 1–18. https://doi.org/10.1037/a0021017
**Ką tai reiškia platformai.** Kiekviena atradimo užduotis turi tikslą, 2–3 užuominas, matomą grįžtamąjį ryšį ir pabaigoje aiškiai įvardytą taisyklę.
**Kaip patikrinti.** Versija be užuominų vs su užuominomis; matuoti pasiekusius sprendimą ir neveiklumo laiką (geriausias „pasimetimo“ rodiklis).

### P21 · Ginčas dėl minimalaus vadovavimo
**Teiginys.** Kirschner, Sweller ir Clark (2006) teigė, kad minimaliai vadovaujamas mokymas prieštarauja kognityvinei architektūrai; Hmelo-Silver, Duncan ir Chinn (2007) atsakė, kad PBL ir tyrinėjimas nėra „be vadovavimo“ – jame gausu pastolių. Skiriasi kiek ir kada, ne „vadovavimas vs laisvė“.
**Įrodymų stiprumas.** Vidutinis kaip teorinis debatas; praktinė išvada sutampa su P20 ir P22.
**Šaltinis.** Kirschner, P. A., Sweller, J., & Clark, R. E. (2006). *Educational Psychologist*, 41(2), 75–86. https://doi.org/10.1207/s15326985ep4102_1 · Hmelo-Silver, C. E., Duncan, R. G., & Chinn, C. A. (2007). *Educational Psychologist*, 42(2), 99–107. https://doi.org/10.1080/00461520701263368
**Ką tai reiškia platformai.** Struktūra pirmiau, laisvė vėliau: pirmame susidūrime – pavyzdys ir aiškus žingsnis; laisvas tyrinėjimas – kai vaikas jau turi pagrindą.
**Kaip patikrinti.** „Pavyzdys → bandymas“ vs atvirkščiai; matuoti, kiek vaikų pasiekia trečią užduotį be pagalbos.

### P22 · Produktyvus nepavykimas: 1 klasei – ne
**Teiginys.** Seka „sprendimas prieš instrukciją“ duoda vidutinį pranašumą (g = 0,36; su aukštu ištikimumu 0,37–0,58), **tačiau 2–5 klasei ir bendriesiems įgūdžiams palankesnė „instrukcija prieš sprendimą“ seka.**
**Įrodymų stiprumas.** Stiprus dėl bendro efekto, **tiesiogiai priešingas mūsų amžiui**. 53 studijos, 166 palyginimai, >12 000 dalyvių.
**Šaltinis.** Sinha, T., & Kapur, M. (2021). *Review of Educational Research*, 91(5), 761–798. https://doi.org/10.3102/00346543211019105 · Kapur, M. (2008). *Cognition and Instruction*, 26(3), 379–424. https://doi.org/10.1080/07370000802212669
**Ką tai reiškia platformai.** 1 klasėje nenaudojame „pabandyk nesuprasdamas, paskui paaiškinsime“. Tvarka: parodytas pavyzdys → vedamas bandymas → savarankiškas bandymas.
**Kaip patikrinti.** Matuoti pirmo bandymo be pagalbos sėkmę; jei ji <30 % ir vaikai meta modulį – seka per sunki.

---

## 4. Žaidimai ir žaidimų teorija

### P23 · Žaidimas padeda mažai – ir tik su papildymu
**Teiginys.** Rimti žaidimai duoda mažą pranašumą (mokymasis d = 0,29; išlaikymas d = 0,36), o motyvacijos atžvilgiu skirtumas nebuvo reikšmingas (d = 0,26). Pranašumas didesnis, kai žaidimas papildomas kitais metodais, kai sesijų kelios ir kai žaidžiama grupėse.
**Įrodymų stiprumas.** Stiprus: 77 studijos mokymuisi (N = 5547), 31 – motyvacijai. „Žaidimas“ pats savaime nėra efekto šaltinis.
**Šaltinis.** Wouters, van Nimwegen, van Oostendorp & van der Spek (2013). *Journal of Educational Psychology*, 105(2), 249–265. https://doi.org/10.1037/a0031311
**Ką tai reiškia platformai.** Žaidimas – kontekstas, ne turinys: aiškus tikslas, kelios sesijos ir viena „ne žaidybinė“ refleksija po žaidimo.
**Kaip patikrinti.** Žaidybinė vs neutrali versija; matuoti teisingumą ir **sugrįžimą kitą dieną**.

### P24 · Efektas ateina iš dizaino, ne iš „žaidimo“ etiketės
**Teiginys.** Žaidimai duoda mažą–vidutinį efektą (g = 0,33), o **patobulintas dizainas** (taisyklės, grįžtamasis ryšys, prisitaikymas) – panašų papildomą efektą (g = 0,34): vertė slypi modifikacijose, ne mediume.
**Įrodymų stiprumas.** Stiprus: 57 studijos (n = 209) ir 20 studijų (n = 40), K–16.
**Šaltinis.** Clark, Tanner-Smith & Killingsworth (2016). *Review of Educational Research*, 86(1), 79–122. https://doi.org/10.3102/0034654315582065 · visas tekstas: https://pmc.ncbi.nlm.nih.gov/articles/PMC4748544/
**Ką tai reiškia platformai.** Investuojame į grįžtamąjį ryšį ir prisitaikymą, ne į grafiką: po 3 klaidų – supaprastinta užduotis.
**Kaip patikrinti.** Adaptyvus vs fiksuotas sunkumas; tos pačios klaidos pasikartojimas.

### P25 · Žaidybinimas: mažas efektas, didžiausias kognityviniams rezultatams
**Teiginys.** Žaidybinimo (taškai, ženkleliai, lygiai) meta-analizė: kognityviniai rezultatai g = 0,49, motyvacija g = 0,36, elgesio rezultatai g = 0,25.
**Įrodymų stiprumas.** Vidutinis: 38 studijos, labai nevienalytiškos, dauguma trumpalaikės.
**Šaltinis.** Sailer, M., & Homner, L. (2020). *Educational Psychology Review*, 32, 77–112. https://doi.org/10.1007/s10648-019-09498-w
**Ką tai reiškia platformai.** Žaidybinimo elementai siejami su mokymosi tikslu: taškai už teisingą sprendimą – taip, už greitį ar buvimą – ne.
**Kaip patikrinti.** Taškai už teisingumą vs už aktyvumą; antroji versija turėtų duoti daugiau beprasmių paspaudimų (spam-click).

### P26 · Varžybos ir „fantazija“ – rizika, ne savybė
**Teiginys.** Lyderių lentos ir socialinis palyginimas gali mažinti žemesnių rezultatų mokinių motyvaciją ir kelti nerimą; longitudinis tyrimas parodė, kad žaidybinimo elementai per semestrą lėmė **mažesnę** motyvaciją nei nežaidybinė klasė.
**Įrodymų stiprumas.** Vidutinis: vienas stiprus longitudinis lauko tyrimas + nuosekli SDT literatūra; varžybų efektai priklauso nuo konteksto.
**Šaltinis.** Hanus, M. D., & Fox, J. (2015). *Computers & Education*, 80, 152–161. https://doi.org/10.1016/j.compedu.2014.08.019
**Ką tai reiškia platformai.** Jokių viešų lyderių lentelių; varžybos – tik su savimi (asmeninis rekordas) arba su laiku.
**Kaip patikrinti.** Matuoti pasitraukimą po pirmos klaidos atskirai žemesnių ir aukštesnių rezultatų vaikams.

### P27 · Materialūs apdovanojimai už veiklą mažina vidinę motyvaciją
**Teiginys.** Kai už pačią veiklą duodamas laukiamas materialus apdovanojimas, vidinė motyvacija (laisvas pasirinkimas tęsti) mažėja; informacinis žodinis ryšys šio efekto nesukelia.
**Įrodymų stiprumas.** Vidutinis–stiprus laboratorijoje (128 eksperimentų meta-analizė), silpnesnis lauke; efektas jautrus tam, kaip apdovanojimas suvokiamas.
**Šaltinis.** Deci, Koestner & Ryan (1999). *Psychological Bulletin*, 125(6), 627–668. https://selfdeterminationtheory.org/SDT/documents/1999_DeciKoestnerRyan_Meta.pdf
**Ką tai reiškia platformai.** Nėra „surink 10 žvaigždučių ir gauk prizą“; yra „Tu sutvarkei 7 obuolius į 5 ir 2 – pamėgink su 8.“
**Kaip patikrinti.** Stebėti savanorišką pakartojimą („Dar kartą?“); jei įvedus apdovanojimą jis krenta – apdovanojimas kenkia.

### P28 · Sąžiningas dalijimasis: „aš dalinu, tu renkiesi“
**Teiginys.** 6–8 metų vaikai vertina ne tik rezultatą, bet ir **procedūrą**: ratą ar eilės rotaciją laiko sąžiningomis ir nebūtinai sutinka su neteisinga procedūra, net jei rezultatas jiems palankus.
**Įrodymų stiprumas.** Vidutinis: keli eksperimentai su 4–8 metų vaikais; rezultatai priklauso nuo grupinės priklausomybės.
**Šaltinis.** Procedural (in)justice in children. *Journal of Experimental Child Psychology* (2021). https://www.sciencedirect.com/science/article/abs/pii/S0022096521002319 · Fehr, Bernhard & Rockenbach (2008). *Nature*, 454, 1079–1083. https://doi.org/10.1038/nature07155
**Ką tai reiškia platformai.** Vaikas dalija (7 sausainiai dviems), kompiuteris renkasi pirmas; po to – atvirkštinis vaidmuo. Taisyklė parodoma, ne paaiškinama.
**Kaip patikrinti.** Ar po 3 bandymų vaikas pradeda dalinti lygiau – strategijos pokytis, nepriklausantis nuo kalbos.

### P29 · Bendri ištekliai: 6-mečiai jau gali išlaikyti tvenkinį
**Teiginys.** Šešeriamečiai bendrų išteklių žaidime gali išvengti ištekliaus žlugimo, ypač kai patys sugalvoja taisykles ir dalijasi po lygiai; tačiau sekėsi prasčiau, kai reikėjo veikti kartu, nei kai veikė lygiagrečiai.
**Įrodymų stiprumas.** Vidutinis: vienas gerai kontroliuotas eksperimentas su 6-mečiais + mažas skaitmeninio žaidimo tyrimas (5 iš 6 vaikų).
**Šaltinis.** Koomen, R., & Herrmann, E. (2018). *Nature Human Behaviour*, 2, 348–355. https://doi.org/10.1038/s41562-018-0327-2 · santrauka: https://pubmed.ncbi.nlm.nih.gov/30962602/ · de Oliveira et al. (2023). https://doi.org/10.1007/s40732-023-00556-y
**Ką tai reiškia platformai.** Žuvų tvenkinys: matomas kiekis, atsinaujinimas kas kelias sekundes, vaikas žvejoja **vienas**; bendradarbiavimas – kaip „kito žvejo“ simuliacija su aiškia taisykle.
**Kaip patikrinti.** Kiek raundų tvenkinys išlieka gyvas; tikslas – vaikas pats atranda „imk mažiau, kad liktų“.

### P30 · Kalinio dilema ir Nim: 1 klasei per anksti / nėra įrodymų
**Teiginys.** Kalinio dilemos eksperimentai su vaikais atliekami su 10–11 metų ir vyresniais; 6–7 m. amžiuje įrodymų, kad tokia užduotis moko strateginio mąstymo, nėra. Nim tipo žaidimų efektyvumo įrodymų 1 klasėje taip pat neradome.
**Įrodymų stiprumas.** **Silpnas / nepakankamas.** Tai ne „neveikia“, o „netirta mūsų amžiuje“.
**Šaltinis.** The shadow of the future promotes cooperation in a repeated prisoner's dilemma for children. *Scientific Reports* (2015). https://www.nature.com/articles/srep14559 · Koomen & Herrmann (2018), kaip P29.
**Ką tai reiškia platformai.** Žaidimų teorijos moduliai – konkrečios situacijos su matomais pasirinkimais (dalintis/imti), ne abstrakčios matricinės dilemos.
**Kaip patikrinti.** Ar po 5 žaidimų vaikas naudoja strategiją („palik 4“), ar žaidžia atsitiktinai; nesant pokyčio – modulis keliamas į 3–4 klasę.

---

## 5. Skaitmenų ir raidžių mokymasis

### P31 · Sistemingas raidžių–garsų mokymas duoda vidutinį efektą
**Teiginys.** Sistemingas fonikos (raidžių–garsų ryšio) mokymas duoda vidutinį reikšmingą efektą skaitymo pradžiai (d = 0,44).
**Įrodymų stiprumas.** Stiprus: Nacionalinės skaitymo komisijos meta-analizė, 38 studijos, 66 palyginimai.
**Šaltinis.** National Reading Panel (2000). *Teaching children to read*. NICHD. https://www.nichd.nih.gov/publications/pubs/nrp/findings
**Ką tai reiškia platformai.** Raidžių moduliai tiesiogiai sieja garsą ir raidę (paspaudi raidę → girdi garsą → pamatai paveikslėlį). Jokio raidžių pavadinimų mokymo atskirai nuo garsų.
**Kaip patikrinti.** Prieš/po: 10 raidžių atpažinimas (garsas → raidė) ir 5 paprastų skiemenų perskaitymas; matuoti abu atskirai.

### P32 · Fonologinio suvokimo nauda turi „lubas“: ~10 valandų
**Teiginys.** Foneminio suvokimo mokymo efektas auga iki maždaug **10,2 valandos** (didžiausias d = 0,74), o toliau mažėja; kai mokoma **kartu su raidėmis**, efektas toliau auga ir po 16 valandų.
**Įrodymų stiprumas.** Vidutinis: 16 tyrimų, 35 efektai, 613 vaikų (4–7 m.), netiesinė meta-analizė.
**Šaltinis.** Erbeli, F., Rice, M., Xu, Y., Bishop, M. E., & Goodrich, J. M. (2024). *Scientific Studies of Reading*, 28(4), 345–370. https://doi.org/10.1080/10888438.2024.2309386
**Ką tai reiškia platformai.** Grynos klausos pratybos („kuris garsas pirmas?“) dozuojamos – ne daugiau ~10 val. per metus; toliau – tik su raidėmis.
**Kaip patikrinti.** Stebėti, ar foneminio suvokimo užduočių teisingumas nustoja augti po tam tikro sesijų skaičiaus; jei taip – laikas pereiti prie raidžių.

### P33 · Lietuvių kalba – skaidri ortografija
**Teiginys.** Lietuvių rašyba skaitymui iš esmės skaidri, todėl dekodavimas išmokstamas greičiau nei anglų kalboje, o ankstyvąjį supratimą lemia sklandumas skaityti žodžius + klausymo supratimas. Išilginis 229 vaikų (vid. 6,79 m.) tyrimas paaiškino 43,2 % skaitymo supratimo dispersijos.
**Įrodymų stiprumas.** Vidutinis–stiprus: viena didelė išilginė studija būtent lietuvių kalba.
**Šaltinis.** Šilinskas, G., Gedutienė, R., Torppa, M., & Raižienė, S. (2024). *Scientific Studies of Reading*, 28(1), 60–78. https://doi.org/10.1080/10888438.2023.2220848
**Ką tai reiškia platformai.** Moduliai gali greičiau pereiti prie **prasmės** (sakinio supratimo), o ne ilgai grūdintis raidžių atpažinimą; rašymui reikia daugiau laiko nei skaitymui.
**Kaip patikrinti.** Atskirai matuoti sklandumą ir sakinio supratimą (paveikslėlio parinkimas); jei pirmas aukštas, antras žemas – modulis per ilgai užsibūna ties technika.

### P34 · Skiemuo – natūralus lietuvių vaiko vienetas
**Teiginys.** Pradiniame skaityme lietuvių kalboje natūraliai dirbama su skiemeniu: vaikas pirma sujungia skiemenis (ska-me-nuo), o paskui skaido juos į garsus.
**Įrodymų stiprumas.** **Vidutinis su išlyga:** tiesioginių eksperimentų, lyginančių skiemenų metodą su garsų metodu lietuvių 1 klasėje, neradome. Remia skaidrios ortografijos logika, tarptautinė skiemenų suvokimo literatūra ir lietuviška metodinė tradicija.
**Šaltinis.** Verhoeven, Voeten, van Setten & Segers (2020). *Educational Research Review*, 30, 100325. https://doi.org/10.1016/j.edurev.2020.100325 · Šilinskas et al. (2024), kaip P33.
**Ką tai reiškia platformai.** Skaitymo modulis pradedamas nuo **skiemens**: parodomas „MA“, girdimas tarimas, vaikas prijungia kitą skiemenį („MA“ + „MA“ = „MAMA“).
**Kaip patikrinti.** Dvi sekos (skiemenų sintezė → garsai vs atvirkščiai); kiek vaikų perskaito 5 naujus dviskiemenius žodžius po 10 min.

### P35 · Subitizavimas: nuo mažų grupių iki skaičiaus
**Teiginys.** Supratimas apie skaičių prasideda nuo gebėjimo akimirksniu atpažinti mažą kiekį (iki ~4), paskui – matyti grupes ir jas jungti, ir tik tada pereiti prie skaičiavimo bei simbolių.
**Įrodymų stiprumas.** Vidutinis kaip **seka** (nuosekli trajektorija, daug aprašomųjų duomenų), silpnesnis kaip treniravimo efekto įrodymas.
**Šaltinis.** Clements, D. H., & Sarama, J. (2017/2019). *Learning and teaching with learning trajectories [LT]²*. University of Denver. https://www.learningtrajectories.org/math/learning-trajectories/subitizing
**Ką tai reiškia platformai.** Skaičių modulis prasideda „greitais paveikslėliais“: 2–3 s rodoma taškų grupė, vaikas pasirenka skaičių; tik kai sekasi – skaičiavimas ir simboliai.
**Kaip patikrinti.** Laikas ir teisingumas atskirai 1–3 ir 4–6 taškų grupėms; jei 4–6 grupėse teisingumas krenta, o laikas šokteli – vaikas dar skaičiuoja.

### P36 · Struktūruota skaičiaus pojūčio intervencija veikia
**Teiginys.** 24 pusvalandžio pamokos mažose grupėse, nukreiptos į skaičiaus pojūtį, pagerino rizikos grupės darželinukų skaičiaus pojūtį, aritmetikos sklandumą ir bendrus pasiekimus.
**Įrodymų stiprumas.** Vidutinis: RCT su 126 vaikais, nedidelė imtis, JAV kontekstas.
**Šaltinis.** Dyson, N., Jordan, N. C., & Glutting, J. (2013). A number-sense intervention with contrasting practice conditions for low-achieving kindergartners. https://pmc.ncbi.nlm.nih.gov/articles/PMC4572740/
**Ką tai reiškia platformai.** Trumpi struktūruoti 10–15 min. blokai su aiškia pradžia ir pabaiga; skaičiaus pojūtis apima palyginimą, eilę ir „vienu daugiau/mažiau“, ne tik skaičiavimą.
**Kaip patikrinti.** 3 savaičių pilotas (10 sesijų po 12 min.), prieš/po 8 užduočių testas; vertinti ir kiek vaikų pajudėjo iš žemiausio lygio.

### P37 · Skaičių stalo žaidimai duoda mažą, bet realų efektą
**Teiginys.** Tiesiniai skaičių stalo žaidimai duoda mažą teigiamą efektą matematikos rezultatams (g = 0,21) ikimokykliniame–2 klasės amžiuje.
**Įrodymų stiprumas.** Vidutinis: 18 studijų, 123 efektai, rezultatas nevienalytis ir priklauso nuo dizaino.
**Šaltinis.** Nelson, G., Boedeker, P., Devlin, B. L., et al. (2025). *Review of Educational Research*. https://doi.org/10.3102/00346543251383552
**Ką tai reiškia platformai.** „Kelionės“ žaidime linija – vienoda ir sunumeruota, ėjimas skaičiuojamas garsiai; nereguliarūs takai naikina efektą.
**Kaip patikrinti.** Linijinė vs netvarki lenta; užduotys „kas po 7?“ ir „kiek liko iki 10?“.

### P38 · Kartojimas laike padeda, bet matematikoje mažiau nei tikėtasi
**Teiginys.** Paskirstytas kartojimas duoda mažą–vidutinį efektą matematikos mokymuisi (g = 0,28), o „testavimo efektas“ šioje srityje nebuvo patikimas (g = 0,18, intervalas kerta nulį).
**Įrodymų stiprumas.** **Mišrus:** 27 studijos (53 efektai) kartojimui, 7 – testavimui. Korekcija populiaraus teiginio „testavimas visada geriau nei kartojimas“.
**Šaltinis.** Murray, Horner & Göbel (2025). *Educational Psychology Review*, 37, 75. https://doi.org/10.1007/s10648-025-10035-1
**Ką tai reiškia platformai.** Grįžtame prie įgūdžio po 1, 3 ir 7 dienų, bet tarp testų būtina trumpa peržiūra ar pavyzdys.
**Kaip patikrinti.** Trys grupės (tik testas / testas + peržiūra / tik peržiūra), rezultatas po 7 d.

### P39 · Pavyzdžiai prieš savarankišką sprendimą
**Teiginys.** Matematikoje išspręsti pavyzdžiai duoda vidutinį efektą (g = 0,48); teisingi pavyzdžiai veikia geriau nei klaidingi ar mišrūs, o papildomi „paaiškink savo sprendimą“ raginimai efekto nepadidino.
**Įrodymų stiprumas.** Stiprus: 43 straipsniai, 55 studijos, 181 efektas, nuo pradinės iki aukštosios mokyklos.
**Šaltinis.** A meta-analysis of the worked examples effect on mathematics performance (2023). *Educational Psychology Review*, 35, 35. https://doi.org/10.1007/s10648-023-09745-1 · santrauka: https://eric.ed.gov/?id=EJ1364058
**Ką tai reiškia platformai.** Prieš savarankišką užduotį – vienas pilnai išspręstas pavyzdys žingsnis po žingsnio su garsu; nereikalauti, kad vaikas žodžiais paaiškintų kiekvieną žingsnį.
**Kaip patikrinti.** Pavyzdys → užduotis vs tik užduotis; jei pavyzdys padeda tik pirmai užduočiai, jis per ilgas arba per konkretus.

---

## 6. Grįžtamasis ryšys ir vertinimas

### P40 · Grįžtamasis ryšys galingas, bet labai nevienalytis
**Teiginys.** Grįžtamasis ryšys vidutiniškai duoda d = 0,48 (435 studijos), klasikiniai vertinimai – 0,70–0,79, o Kluger ir de Nisi (1996) rado 0,38 **ir apie trečdalį neigiamų efektų**. Kryptis priklauso nuo to, ar ryšys nukreiptas į užduotį ir strategiją, ne į asmenį.
**Įrodymų stiprumas.** Stiprus dėl svarbos, mišrus dėl dydžio: skirtingi metodai duoda skirtingus skaičius – tai tikra heterogeniškumas.
**Šaltinis.** Wisniewski, Zierer & Hattie (2020). *Frontiers in Psychology*, 10, 3087. https://doi.org/10.3389/fpsyg.2019.03087
**Ką tai reiškia platformai.** Po klaidos – „Tu įdėjai 3, o reikia 5. Trūksta 2.“; po teisingo – „Tu skaičiavai po vieną – taip gavai 5.“
**Kaip patikrinti.** Įvertinantis vs į veiksmą nukreiptas ryšys; matuoti **kito bandymo** teisingumą tame pačiame uždavinyje.

### P41 · Formuojamasis vertinimas: įtaka reali, bet mažesnė nei skelbta
**Teiginys.** Formuojamasis vertinimas teigiamai veikia pasiekimus, tačiau klasikinis „0,4–0,7“ kilęs iš konfigūracinės apžvalgos, o vėlesnės meta-analizės rodo **modestų** efektą (skaityme apie +0,19).
**Įrodymų stiprumas.** **Mišrus:** Black & Wiliam (1998) buvo apžvalga, ne meta-analizė; kiekybiniai vertinimai duoda mažesnius skaičius.
**Šaltinis.** Black & Wiliam (1998). *Phi Delta Kappan*, 80(2), 139–148. https://www.sabes.org/sites/default/files/resources/ascd.org-Formative%20Assessment%20Why%20What%20and%20Whether.pdf · *Frontiers in Psychology* (2022). https://pmc.ncbi.nlm.nih.gov/articles/PMC9443994/
**Ką tai reiškia platformai.** Vertinimas – ne pažymys, o sprendimas: po 5 užduočių sistema renkasi lengvinti, kartoti ar pereiti.
**Kaip patikrinti.** Ar sistemos pasirinkimas atitinka rezultatą; jei vaikas, atsakęs 4/5, gauna lengvesnę užduotį – taisyklė bloga.

### P42 · Meistriškumo mokymasis: veikia, bet ne standartizuotuose testuose
**Teiginys.** Meistriškumo mokymasis duoda teigiamą efektą, tačiau kritinės analizės rodo, kad jis beveik išnyksta standartizuotuose pasiekimų testuose ir lieka mažas mokytojo kuriamuose testuose.
**Įrodymų stiprumas.** **Mišrus:** 108 kontroliuojamų vertinimų meta-analizė rodo teigiamus efektus; nepriklausoma kritika – kad jie iš dalies metodologiniai.
**Šaltinis.** Kulik, C.-L. C., Kulik, J. A., & Bangert-Drowns, R. L. (1990). *Review of Educational Research*, 60(2), 265–299. https://doi.org/10.3102/00346543060002265
**Ką tai reiškia platformai.** „Užrakinimo“ logika (4 iš 5) galima, bet po 2 nepavykusių bandymų siūloma lengvesnė versija, o ne ta pati užduotis trečią kartą.
**Kaip patikrinti.** Kiek vaikų „įstringa“ tame pačiame žingsnyje (>3 bandymai); jei >15 % – slenkstis per aukštas.

### P43 · Klaida – mokymosi įrankis, jei ji apdorojama
**Teiginys.** Klaidos gali pagerinti įsiminimą, ypač kai po jų pateikiamas teisingas atsakymas ir pakartotinė galimybė; sistemingas klaidų vengimas nenaudingas.
**Įrodymų stiprumas.** Vidutinis: teigiamas „klaidų generavimo“ efektas laboratorijoje, bet priklauso nuo grįžtamojo ryšio kokybės ir nuo to, ar klaida buvo arti teisingos.
**Šaltinis.** Metcalfe, J. (2017). *Annual Review of Psychology*, 68, 465–489. https://doi.org/10.1146/annurev-psych-010416-044022
**Ką tai reiškia platformai.** Klaida niekada neparodo „✗“ be paaiškinimo: parodomas teisingas variantas, tada ta pati užduotis su kitais skaičiais. Niekada nebaudžiama atimant taškus ar laiką.
**Kaip patikrinti.** „Klaida → kito bandymo teisingumas“ tame pačiame įgūdyje; jei <50 % – grįžtamasis ryšys per silpnas.

### P44 · Testavimas padeda, bet ne visur vienodai
**Teiginys.** Klasės testavimas (quizzing) paprastai duoda teigiamą efektą, bet matematikoje jis silpnesnis ir mažiau stabilus nei humanitariniuose dalykuose.
**Įrodymų stiprumas.** Vidutinis: klasės testavimo meta-analizė rodo bendrą teigiamą efektą; matematinė analizė (P38) – silpnesnį ir nepatikimą.
**Šaltinis.** Yang, C., Luo, L., Vadillo, M. A., Yu, R., & Shanks, D. R. (2021). *Psychological Bulletin*, 147(4), 399–435. https://doi.org/10.1037/bul0000309
**Ką tai reiškia platformai.** Trumpi, dažni „beklio“ testo patikrinimai – taip; ilgi „egzaminai“ – ne; testas visada su grįžtamuoju ryšiu.
**Kaip patikrinti.** 3 trumpi patikrinimai per savaitę vs 1 ilgas; išlaikymas po 7 d.

---

## 7. Vaiko UX ir prieinamumas

### P45 · 6–7 metų motorika: dideli taikiniai, paprasti gestai
**Teiginys.** 6–8 metų vaikai gali spausti pelę ir naudoti paprastą klaviatūrą, bet **tempti pelu ir naudoti trackpad‘ą jiems sunku**; liečiamajame ekrane lengviausi gestai – bakstelėjimas ir brūkštelėjimas, o taikinys – bent ~1 cm².
**Įrodymų stiprumas.** Vidutinis–stiprus dizainui (NN/g testavimas su 3–12 m. vaikais); tai UX tyrimas, ne eksperimentas su efekto dydžiu.
**Šaltinis.** Nielsen, J. (2010). Touch targets on touchscreens. NN/g. https://www.nngroup.com/articles/touch-target-size/ · NN/g. https://www.nngroup.com/articles/children-ux-physical-development/
**Ką tai reiškia platformai.** Taikiniai ≥64 × 64 px (mūsų inžinerinė išvada, viršijanti 1 cm minimumą); „drag and drop“ niekada nėra vienintelis būdas.
**Kaip patikrinti.** Instrumentuoti nepataikymus ir nebaigtus tempimus; jei >10 % veiksmų nepataiko – taikiniai per maži.

### P46 · Skaitymo krūvis 1 klasėje – minimalus
**Teiginys.** 6–7 metų vaikas skaito lėtai ir su pastangomis; kiekvienas skaitomas žodis atima išteklius iš užduoties, todėl instrukcijos skaitomos balsu, o tekstas – tik ten, kur skaitymas yra tikslas.
**Įrodymų stiprumas.** Vidutinis: remiasi modalumo principu (P09), skaitymo raidos duomenimis (P33) ir NN/g rekomendacijomis; nėra vieno eksperimento „vienu skaičiumi“.
**Šaltinis.** Mayer (2017). https://doi.org/10.1111/jcal.12197 · NN/g. https://www.nngroup.com/articles/kids-cognition/
**Ką tai reiškia platformai.** Instrukcija ≤12 žodžių, įgarsinta; jei tekstas būtinas – 18–20 px, eilutė ≤60 simbolių, padidinti tarpai.
**Kaip patikrinti.** Garso perklausų skaičius ir laikas iki pirmo veiksmo; 3+ perklausos – sakinys per ilgas arba per greitas.

### P47 · Kontrastas ir spalva – prieinamumas, ne dekoras
**Teiginys.** Teksto ir fono kontrastas turi atitikti WCAG 2.2 AA (4,5:1 tekstui, 3:1 dideliam tekstui ir UI komponentams), o spalva negali būti vienintelis informacijos nešėjas.
**Įrodymų stiprumas.** Stiprus kaip standartas (W3C konsensusas, ne eksperimentas). WCAG 2.2 2.5.8 reikalauja 24 × 24 CSS px – **daug mažiau**, nei reikia vaikams, todėl standartas – tik apatinė riba.
**Šaltinis.** W3C (2023). *Understanding SC 2.5.8*. https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html · W3C. *WCAG 2.2*. https://www.w3.org/TR/WCAG22/
**Ką tai reiškia platformai.** Kiekviena būsena (teisingai / neteisingai / pasirinkta) turi formą, spalvą ir garsą; paletė – ≤4 spalvos.
**Kaip patikrinti.** Automatinis kontrasto testas CI etape (axe / pa11y) + pilkumo režimo patikra.

### P48 · „Disleksijai draugiški“ šriftai beveik nieko neduoda
**Teiginys.** Specialūs šriftai (OpenDyslexic, Dyslexie) negerina skaitymo nei greičio, nei tikslumo: 15 studijų, 91 efekto, 688 dalyvių meta-analizė davė g = −0,04 (95 % PI [−0,15; 0,07]).
**Įrodymų stiprumas.** Stiprus **neigiamas** radinys – svarbu, nes šie šriftai aktyviai siūlomi rinkoje.
**Šaltinis.** Azzarello, C., Paek, S., Hodge, C., Jameson, M., & Lewis, J. (2026). *Annals of Dyslexia*. https://doi.org/10.1007/s11881-026-00389-8
**Ką tai reiškia platformai.** Nenaudojame „disleksijos šrifto“: paprastas sans-serif, didelis dydis, padidinti tarpai, trumpi sakiniai, garsas.
**Kaip patikrinti.** Lyginti ne šriftus, o tarpus (+0,05 em) ir eilutės aukštį – pigiau ir labiau tikėtina, kad duos rezultatą.

### P49 · Ekrano laikas: 6–7 m. amžiui „auksinio skaičiaus“ nėra
**Teiginys.** WHO rekomenduoja iki 5 metų: 2–4 m. – ne daugiau 1 val. ekrano per dieną. **5–17 metų amžiui konkrečios valandų normos nėra** – rekomenduojama riboti laisvalaikio ekrano laiką ir užtikrinti 60 min. fizinio aktyvumo per dieną.
**Įrodymų stiprumas.** Vidutinis kaip gairė (ekspertų konsensusas); 6–7 m. tiesioginio skaičiaus **nėra**, ir tai reikia sakyti atvirai.
**Šaltinis.** WHO (2019). https://www.who.int/news-room/detail/24-04-2019-to-grow-up-healthy-children-need-to-sit-less-and-play-more · WHO. https://www.who.int/news-room/fact-sheets/detail/physical-activity
**Ką tai reiškia platformai.** Viena sesija – 5–10 min. su aiškia pabaiga ir „baikime“ ekranu; jokių begalinių „dar vienas lygis“ kilpų ar streak‘ų.
**Kaip patikrinti.** Sesijos trukmė ir tai, ar vaikas išeina savo noru; tikslas – **grįžimas kitą dieną**.

---

## 8. Motyvacija ir mąstysena

### P50 · Trys poreikiai: autonomija, kompetencija, ryšys
**Teiginys.** Vidinė motyvacija palaikoma, kai vaikas jaučia pasirinkimą, jaučia, kad gali, ir jaučia ryšį su kitu; kontroliuojantys elementai (primesti tikslai, vertinimas, terminai) šiuos poreikius slopina.
**Įrodymų stiprumas.** Vidutinis–stiprus kaip teorija, bet dauguma tyrimų koreliaciniai arba su suaugusiaisiais.
**Šaltinis.** Ryan, R. M., & Deci, E. L. (2000). *American Psychologist*, 55(1), 68–78. https://selfdeterminationtheory.org/SDT/documents/2000_RyanDeci_SDT.pdf
**Ką tai reiškia platformai.** Kiekviename modulyje – bent vienas pasirinkimas („su obuoliais ar su kamuoliais?“), aiškus „galiu“ signalas („tu jau moki iki 5“) ir žmogiškas balsas.
**Kaip patikrinti.** Pasirinkimų naudojimas ir grįžtančių sesijų dalis; jei vaikai niekada nesirenka (nes pasirinkimas neaiškus), dizainas formaliai atitinka, bet neveikia.

### P51 · Augimo mąstysena: sąsaja silpna, poveikis mažas
**Teiginys.** Augimo mąstysenos ir pasiekimų ryšys labai silpnas (r = 0,10; 273 studijos, 365 915 dalyvių), o intervencijų poveikis taip pat silpnas (43 studijos, 57 155 dalyviai), šiek tiek didesnis tik rizikos grupėse.
**Įrodymų stiprumas.** **Silpnas / mišrus.** Nepainioti su P40, kuris turi stipresnį pagrindą.
**Šaltinis.** Sisk, Burgoyne, Sun, Butler & Macnamara (2018). *Psychological Science*, 29(4), 549–571. https://doi.org/10.1177/0956797617739704
**Ką tai reiškia platformai.** Nenaudojame šūkių („tu gali viską!“) ir neinvestuojame į „mąstysenos“ modulį; vietoj to – konkreti strategija („šiandien bandyk skaičiuoti po du“).
**Kaip patikrinti.** Matuoti ne savęs vertinimo anketą (6-mečiams nepatikima), o bandymų skaičių po pirmos klaidos.

### P52 · Intervencija gali veikti, bet siaurai ir ne visiems
**Teiginys.** Nacionaliniame JAV eksperimente (12 490 devintokų) trumpa (<1 val.) internetinė augimo mąstysenos intervencija pagerino **žemesnių pasiekimų** mokinių pažymius ir padidino aukštesnės matematikos kursų pasirinkimą; bendras efektas mažas ir sąlyginis.
**Įrodymų stiprumas.** Vidutinis (didelė registruota studija), bet su 9 klasės mokiniais – **perkėlimas į 1 klasę nepagrįstas**.
**Šaltinis.** Yeager, D. S., Hanselman, P., Walton, G. M., et al. (2019). *Nature*, 573, 364–369. https://doi.org/10.1038/s41586-019-1466-y
**Ką tai reiškia platformai.** Įvadinis paaiškinimas apie tai, kad gebėjimai auga, – 30–60 s, susietas su užduotimi, ir niekada nepakeičia grįžtamojo ryšio kokybės.
**Kaip patikrinti.** Ar po įžangos vaikas dažniau bando antrą kartą po klaidos.

---

## 10 auksinių taisyklių 1 klasei

1. **Viena idėja – vienas ekranas – vienas veiksmas.** 20–40 s, ≤3 elementai, didelis „Toliau“. (P07, P10)
2. **Garsas – pagrindinis kanalas, tekstas – etiketė.** Instrukcija įgarsinta ≤12 žodžių; ekrane 1–3 žodžių etiketės. (P04, P09, P46)
3. **Pirmas prisilietimas – pavyzdys, ne mįslė.** Prieš savarankišką bandymą – vienas išspręstas pavyzdys. (P20, P22, P39)
4. **Tas pats uždavinys per tris atstovybes:** daiktas → paveikslėlis → skaičius. (P13, P14)
5. **Po manipuliavimo – perkėlimas** su kitais objektais, kitaip mokome procedūros, ne sąvokos. (P14, P15)
6. **Klaida – informacija, ne bausmė:** teisingas variantas + tas pats uždavinys su kitais skaičiais. (P40, P43)
7. **Grįžtamasis ryšys apie veiksmą, ne apie vaiką** („tu sudėjai 3 ir 2“ vietoj „šaunuolis“). (P40, P27)
8. **Jokių lyderių lentelių ir prizų už veiklą;** varžybos tik su savimi. (P26, P27, P50)
9. **Pirštas, ne pelė:** ≥64 px taikiniai ir alternatyva kiekvienam „drag“. (P45, P47)
10. **Sesija baigiasi anksčiau, nei vaikas pavargsta:** 5–10 min., aiški pabaiga, jokių begalinių lygių. (P49, P23, P42)

---

## Kaip šį failą plėsti

- Modulio `designNotes` lauke nurodyk taikomus P-ID (`["P02","P07"]`) – taip sprendimai atsekami iki įrodymų.
- Kiekviena A/B hipotezė turi sakyti, kurį P-ID tikrina („P07 teigia, kad segmentavimas mažina apleidimą“), o ne „ar vaikams patinka“.
- Kai rezultatas prieštarauja P-ID, įrašyk į skiltį „Prieštaravimai“ su data ir imtimi – tai vertingiausia, ką galime duoti literatūrai, nes beveik visi tyrimai atlikti ne su 6–7 metų lietuviakalbiais vaikais.
- **Silpniausios vietos saviems duomenims:** skiemenų metodas lietuvių k. (P34, tiesioginių eksperimentų nėra); žaidimų teorija 1 klasėje (P30, literatūra nuo 10 m.); ekrano laikas 6–7 m. (P49, WHO skaičiaus neteikia); Mayerio principų dydžiai (P01–P09, laboratoriniai, su vyresniais).
