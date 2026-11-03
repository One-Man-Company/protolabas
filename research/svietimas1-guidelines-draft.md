# „Švietimo kelrodis 2035“ — privalomos produkto taisyklės (juodraštis)

**Taikymo sritis:** interaktyvi 1–12 klasių platforma (statinė svetainė, be registracijos, pažanga – įrenginyje).
**Šaltinis:** „Švietimo kelrodis 2035“, VšĮ „Švietimas numeris vienas“ ir ISM, 2026 — https://kelrodis.svietimas.lt/ (PDF: `.../svietimo-kelrodis-isplestine-versija-2026.pdf`, `.../svietimo-kelrodis-trumpoji-versija-2026.pdf`).

## Statuso išlyga (būtina perskaityti prieš naudojant)

Kelrodis **nėra teisės aktas** – jis save vadina „alternatyviu Švietimo kelrodžiu“ (IŠPLĖSTINĖ, p. 2). Priimdami jį kaip privalomą, prisiimame **savanorišką produkto įsipareigojimą**, o ne vykdome valstybės reikalavimą – tai turi atsispindėti viešoje dokumentacijoje.

Antra: kelrodyje **nėra nė vieno sakinio apie skaitmenines platformas**. Taisyklės žemiau yra **išvedimas**, todėl kiekviena nurodo, iš kurio žingsnio išvesta.

Trečia: platforma neturi tapti mokytojo ataskaitų sistema. 9 žingsnio 4 veiksmas – „Mažinti mokytojų administracinį krūvį“ (IŠPLĖSTINĖ, p. 21) – mums yra dizaino apribojimas.

**Žymėjimas:** `[B]` – blokuojanti taisyklė (turinys negali būti skelbiamas). `[T]` – techninė, tikrinama prieš kiekvieną leidimą.

---

## A. Turinio architektūra: gylis, o ne apimtis

**S1-01 [B] Viename modulyje – viena branduolinė idėja.**
Modulis moko vienos sąvokos ar vieno įgūdžio; papildomos temos leidžiamos tik kaip tos pačios idėjos pritaikymai, ne kaip naujos temos.
*Kodėl:* 1 žingsnis – „Sumažinti ugdymo programų apimtį pagal principą „mažiau temų, daugiau gylio“, skiriant daugiau laiko svarbiausioms žinioms ir gebėjimams“ (TRUMPOJI, p. 8). EBPO: „Geriau apimti mažiau esminių temų, bet mokyti taip, kad mokiniai jas iš tiesų suprastų, o ne paviršutiniškai perbėgti ilgą temų sąrašą“ (IŠPLĖSTINĖ, p. 9).
*Tikra:* ☐ modulio metaduomenyse yra vienas `branduoline_ideja` laukas; ☐ modulyje ≤ 1 nauja sąvoka, likusios – jau įvestos; ☐ peržiūros metu paklausus „ko šis modulis moko?“ atsakymas telpa į vieną sakinį.

**S1-02 [B] Kiekvienas modulis turi išmatuojamą mokymosi rezultatą.**
Rezultatas formuluojamas veiksmažodžiu, nusakančiu pastebimą veiksmą („paaiškina“, „apskaičiuoja“, „numato“, „palygina“), ir yra patikrinamas modulio viduje.
*Kodėl:* 1 žingsnio 2 veiksmas – „Aiškiai įvardinti, ką mokinys turi išmokti kiekviename ugdymo etape“ (TRUMPOJI, p. 8); mokyklos nurodo, kad programose „pasigendama <...> aiškių kriterijų“ (IŠPLĖSTINĖ, p. 9).
*Tikra:* ☐ yra 1–3 rezultatai; ☐ kiekvienas prasideda veiksmažodžiu; ☐ kiekvieną rezultatą atitinka bent viena modulio užduotis; ☐ nėra „žinos“, „susipažins“, „supras“ (neišmatuojami).

**S1-03 [B] Rezultatai išdėstomi pakopomis, o ne atsitiktine tvarka.**
Kiekvienas modulis pažymėtas klasių grupe (1–4, 5–6, 7–9, 10–12) ir priklauso iš anksto aprašytai pakopos rezultatų sekai; modulis be vietos sekoje neskelbiamas.
*Kodėl:* 1 žingsnio 2 veiksmas – rezultatai „kiekviename ugdymo etape“; 7 žingsnis siūlo 6+3+3 (pradinis iki 6 kl., pagrindinis iki 9 kl., vidurinis 10–12 kl.) (TRUMPOJI, p. 9) – pakopos turi sutapti su šia logika, ne su sena 4+6+2.
*Tikra:* ☐ yra viešas `pakopos-rezultatai` dokumentas; ☐ kiekvienas modulis turi nuorodą į pakopos rezultatą; ☐ nėra temos, neturinčios ryšio su pakopos rezultatu.

**S1-04 [B] Privalomas, papildomas ir pasirenkamas turinys atskirtas vizualiai ir duomenimis.**
Kiekviena veikla turi žymą `butina` / `papildoma` / `pasirenkama`; mokinys mato, kas būtina norint „uždaryti“ temą, o kas – tik smalsumui.
*Kodėl:* 1 žingsnio 2 veiksmas – „atskirti, kas yra būtina, o kas – papildoma ar pasirenkama“ (TRUMPOJI, p. 8). Tai tas pats reikalavimas, kuris mokykloje vadinamas „programos branduolys + plėtra“.
*Tikra:* ☐ 100 proc. veiklų turi žymą; ☐ žyma rodoma UI, ne tik metaduomenyse; ☐ suvestinė rodo atskirai „būtina įvaldyta“ ir „papildoma išbandyta“.

**S1-05 [B] Vertinimo kriterijai vienodi visoje platformoje.**
Kiekviena užduotis vertinama pagal tą pačią 3–4 lygių rubriką (pvz., „pradedu / bandau / įvaldžiau / gilinu“), su aprašytais požymiais, o ne pagal autoriaus nuojautą.
*Kodėl:* 2 žingsnio 3 veiksmas – „Nustatyti bendrą vertinimo standartą <...> kad tas pats pasiekimų lygis visose mokyklose reikštų panašų rezultatą“ (TRUMPOJI, p. 8). Europos Komisija: „mokytojai kriterijus bei standartus <...> supranta ir taiko nevienodai“ (IŠPLĖSTINĖ, p. 10).
*Tikra:* ☐ viena rubrikos schema visoje platformoje; ☐ kiekvienas lygis turi elgesio aprašą; ☐ du nepriklausomi recenzentai tam pačiam atsakymui priskiria tą patį lygį (sutapimas ≥ 80 proc. ėminyje).

## B. Pažanga, pagalba ir abu galai

**S1-06 [T] Pažanga fiksuojama įrenginyje, be registracijos ir be asmens duomenų.**
Būsena saugoma `localStorage`/`IndexedDB`; nėra paskyrų, el. pašto, vardų. Mokinys mato savo pažangą kaip „kas įvaldyta / kas dar ne“, o ne kaip procentą.
*Kodėl:* 3 žingsnio 1 veiksmas – „vienoje sistemoje kaupti svarbiausią informaciją apie pasiekimus, pažangą, savijautą <...> matoma mokiniui, tėvams ir mokytojams“ (TRUMPOJI, p. 8). Be paskyrų šį reikalavimą **išpildome tik iš dalies** – tą ribą deklaruojame atvirai.
*Tikra:* ☐ jokių tinklo užklausų su mokinio duomenimis; ☐ veikia privačioje naršymo sesijoje; ☐ aiškus pranešimas, kad pažanga išlieka tik šiame įrenginyje.

**S1-07 [B] Sistema pati pasiūlo pagalbą, kai mokiniui nesiseka.**
Po dviejų nepavykusių to paties tipo bandymų mokiniui automatiškai pasiūlomas alternatyvus paaiškinimas ar lengvesnis žingsnis – ne bauda ir ne užrakinimas.
*Kodėl:* 3 žingsnio 2 veiksmas – „reikšmingai pasikeitus mokinio pažangai sistema siųstų signalą“ (TRUMPOJI, p. 8); 3 veiksmas – „Bazinio lygio nepasiekiantiems mokiniams užtikrinti intensyvią pagalbą“ (ten pat). Kontekstas: tik 63 proc. mokinių sako, kad mokytojas prireikus suteikia papildomą pagalbą (EBPO 73 proc.) (IŠPLĖSTINĖ, p. 10).
*Tikra:* ☐ yra `pagalbos_slenkstis` parametras (numatytas 2); ☐ pagalba siūloma tame pačiame ekrane, be papildomo paspaudimo; ☐ joks turinys netampa neprieinamas dėl nesėkmės.

**S1-08 [B] Neveiksminga pagalba keičiama, o ne kartojama.**
Jei ta pati pagalba nepadeda per 3 bandymus, sistema keičia metodo tipą (vaizdas → tekstas → manipuliavimas → pavyzdys), o ne siūlo tą pačią užduotį dar kartą.
*Kodėl:* 3 žingsnio 3 veiksmas – „Jei pagalba neveiksminga, ją keisti arba stiprinti, kol mokinys pasiekia bazinį lygį“ (TRUMPOJI, p. 8).
*Tikra:* ☐ kiekviena užduotis turi ≥ 2 skirtingo tipo pagalbos variantus; ☐ sistema fiksuoja, kuris variantas suveikė; ☐ peržiūroje matoma, kad nėra užduočių su vienintele pagalba.

**S1-09 [B] Aukštesnių pasiekimų mokiniams – gilyn, ne daugiau to paties.**
Įvaldžiusiam mokiniui siūloma kokybiškai kita užduotis (perkėlimas į naują kontekstą, atviras uždavinys, projektas), o ne 10 papildomų to paties tipo pratimų.
*Kodėl:* 3 žingsnio 4 veiksmas – „Aukštesnių pasiekimų mokiniams sudaryti sąlygas mokytis giliau, nepriklausomai nuo mokyklos galimybių“ (TRUMPOJI, p. 8). Būklė: „Pamokoje aukštesnių gebėjimų mokiniui dažniausiai pasiūloma tik sudėtingesnė užduotis ar praplėstas turinys“ (IŠPLĖSTINĖ, p. 10) – tai klaida, kurios nekartojame.
*Tikra:* ☐ kiekvienas modulis turi „gilinimo“ šaką; ☐ gilinimo užduotis keičia kontekstą, o ne skaičių dydį; ☐ gilinimas nežymimas kaip „bonusiniai taškai“.

**S1-10 [T] Pažangos suvestinė yra perkeliama.**
Mokinys ar tėvas gali vienu paspaudimu išsisaugoti suvestinę (PDF arba spausdinama versija) ir perkelti ją į kitą įrenginį failo importu.
*Kodėl:* 3 žingsnio 1 veiksmas – užtikrinti, kad informacija „keliautų kartu su mokiniu keičiant mokyklą ar ugdymo pakopą“ (TRUMPOJI, p. 8). Be paskyrų tai įmanoma tik **eksportu**.
*Tikra:* ☐ yra „Išsisaugoti pažangą“ mygtukas; ☐ failas importuojamas atgal; ☐ suvestinė suprantama be platformos (žmogui skaitoma, ne JSON vien).

**S1-11 [B] Jokio viešo reitingavimo; lyginamasi tik su savimi.**
Nėra lyderių lentelių, kitų vaikų rezultatų, „top 10“. Pažanga rodoma kaip „šiandien vs prieš savaitę“.
*Kodėl:* 7 žingsnio 2 veiksmas – mokykla vertinama „ne tik pagal mokinių rezultatus, bet ir pagal pasiektą vaiko pažangą“ (TRUMPOJI, p. 9); 5 žingsnis – pozityvi aplinka. Kontekstas: tik 62,1 proc. mokinių jaučia priklausymą mokyklai (EBPO 76,2 proc.), 45,3 proc. patyrė patyčių (IŠPLĖSTINĖ, p. 15).
*Tikra:* ☐ kodo paieška: nėra `leaderboard`/`ranking` komponento; ☐ jokia užklausa neperduoda kito mokinio duomenų (jų ir nėra); ☐ UI tekstuose nėra „geriausias klasėje“.

## C. Aplinka ir kalba

**S1-12 [B] Grįžtamasis ryšys – augimo mąstysenos kalba.**
Klaida komentuojama kaip strategijos klausimas („ši strategija dar neveikia – pabandykim kitaip“), o ne kaip gebėjimo trūkumas. Draudžiamos formulės: „tu nesugebi“, „tau per sunku“, „esi silpnas“, „nepraeisi“.
*Kodėl:* 52 proc. penkiolikmečių tiki, kad gebėjimus galima ugdyti (EBPO 69 proc., Estija 83 proc.), o **siekis – 80 proc.** (IŠPLĖSTINĖ, p. 4; TRUMPOJI, p. 7). Tai vienintelis rodiklis, kurį platforma veikia tiesiogiai – per kasdienį grįžtamąjį ryšį.
*Tikra:* ☐ visi klaidų pranešimai peržiūrėti pagal draudžiamų frazių sąrašą; ☐ kiekvienas pranešimas turi „ką daryti toliau“; ☐ niekur nenaudojamas žodis „nesugebėjai“.

**S1-13 [B] Saugi aplinka: klaida – informacija, o ne bausmė.**
Pagrindiniame kelyje nėra laiko limito, „gyvybių“, minusinių taškų, garsinių nesėkmės signalų. Po modulio – vienas savijautos klausimas, kurio atsakymas saugomas tik įrenginyje.
*Kodėl:* 5 žingsnis – „Mokyklose kuriama pozityvi darbo ir mokymosi aplinka“ (TRUMPOJI, p. 9); 5 žingsnio principas – duomenys „naudojami pirmiausia ne išorinei kontrolei, bet refleksijai“ (IŠPLĖSTINĖ, p. 15).
*Tikra:* ☐ jokių laikmačių privalomose užduotyse; ☐ nėra „gyvybių“/„širdelių“ modelio; ☐ savijautos klausimas yra, atsakymas neišsiunčiamas į tinklą.

**S1-14 [B] Terminija ir turinys suderinti su bendrąja programa.**
Kiekviena sąvoka vartojama taip, kaip bendrosiose programose ir PUPP/VBE užduotyse; modulyje nurodytas atitikmuo (dalykas, klasė, programos sritis).
*Kodėl:* 2 žingsnio 4 veiksmas – sutelkti programų, egzaminų ir vertinimo kriterijų atsakomybę, „kad visi jie derėtų tarpusavyje“ (TRUMPOJI, p. 9); 2 žingsnio 3 veiksmas – „tas pats pasiekimų lygis <...> reikštų panašų rezultatą“ (p. 8).
*Tikra:* ☐ kiekvienas modulis turi `dalykas / klasė / sritis` laukus; ☐ termine žodyne nėra sinonimų dubliavimo; ☐ bent vienas dalyko mokytojas peržiūrėjo modulį.

## D. Lygios galimybės nepaisant vietos

**S1-15 [T] Vienoda kokybė nepaisant vietos, įrenginio ir ryšio.**
Ta pati medžiaga veikia telefone, planšetėje ir nešiojamame kompiuteryje; kraunasi silpnu ryšiu; pagrindinis turinys pasiekiamas ir be nuolatinio interneto (po pirmo įkėlimo).
*Kodėl:* Tiesioginis kelrodžio pažadas: vaikas „nepriklausomai nuo gyvenamosios vietos ar mokyklos, turi turėti vienodas galimybes“ (https://svietimas.lt/). Miesto ir kaimo mokyklų gamtos mokslų atotrūkis – 65 taškai, EBPO 33 (IŠPLĖSTINĖ, p. 5).
*Tikra:* ☐ testas 3 įrenginiuose; ☐ „lėtas 3G“ profilis Chrome DevTools praeina be sulūžusio išdėstymo; ☐ po pirmo įkėlimo modulis atsidaro be tinklo.

**S1-16 [B] Kelias be mokytojo: vaikas gali pradėti pats.**
Kiekviena tema pasiekiama per naršymą be kvietimo, be klasės kodo, be mokytojo patvirtinimo; instrukcija, kaip pradėti, telpa į vieną ekraną.
*Kodėl:* Platforma neturi registracijos, todėl mokytojas negali būti vartų sargas. 3 žingsnio 4 veiksmas reikalauja prieigos „nepriklausomai nuo mokyklos galimybių“ (TRUMPOJI, p. 8).
*Tikra:* ☐ 3 paspaudimai nuo įėjimo iki pirmos užduoties; ☐ nėra „įveskite klasės kodą“; ☐ visa navigacija veikia be prisijungimo.

## E. Mokytojas, duomenys, pilotas

**S1-17 [B] Kiekvienam moduliui – mokytojo medžiaga, taupanti laiką.**
Atskirame puslapyje: rezultatas, numatomas laikas, dažniausios klaidos su paaiškinimais, trys klausimai diskusijai, spausdinama santrauka. Ne ilgiau nei vienas A4.
*Kodėl:* 9 žingsnio 4 veiksmas – „Mažinti mokytojų administracinį krūvį“ (TRUMPOJI, p. 10). Ilgesnė nei vienas lapas medžiaga krūvį didina, o ne mažina.
*Tikra:* ☐ yra `mokytojui.md` kiekviename modulyje; ☐ telpa į vieną A4; ☐ yra „dažnos klaidos“ skiltis; ☐ nereikalauja jokios registracijos.

**S1-18 [T] Minimalūs duomenys, jokio trečiųjų šalių sekimo.**
Nėra analitikos skriptų, slapukų, socialinių tinklų mygtukų; jokia statistika nerenkama individualiai. Jei renkama apibendrinta statistika – tik be asmens duomenų ir aiškiai paskelbus.
*Kodėl:* Kelrodyje apie tai nieko nėra (spraga), todėl sprendžiame konservatyviai: 3 žingsnis mini jautrią informaciją („savijautą, mokymosi sunkumus, specialiuosius poreikius“), kuri neturi palikti įrenginio be pagrindo (TRUMPOJI, p. 8).
*Tikra:* ☐ tinklo skydelyje nėra užklausų į trečias šalis; ☐ jokių slapukų be būtinųjų; ☐ privatumo puslapyje parašyta, kas saugoma ir kur.

**S1-19 [B] Pilotas prieš platinimą.**
Naujas modulis ar mechanika pirmiausia išbandoma su 5–10 mokytojų arba 2–3 mokyklomis, su iš anksto užrašytais sėkmės kriterijais; rezultatai skelbiami viešai nepriklausomai nuo to, ar jie teigiami.
*Kodėl:* 6 žingsnis – „Nacionaliniu mastu plėsti tik tuos sprendimus, kurių nauda įrodyta duomenimis“ (TRUMPOJI, p. 9). Anglijoje „pirmiausia išbando 10–20 ugdymo įstaigų, vėliau 50–100“ (IŠPLĖSTINĖ, p. 16).
*Tikra:* ☐ yra piloto protokolas su kriterijais prieš startą; ☐ rezultatų ataskaita paskelbta; ☐ „nepavykę“ sprendimai dokumentuoti, ne ištrinti.

**S1-20 [T] Kasmetinė iteracija, grįsta duomenimis, o ne nuomone.**
Kartą per metus peržiūrimi bent keturi metrikai: kur mokiniai nustoja (atsisakymo taškai), laikas iki pirmos sėkmės, kuri pagalba padeda, grįžtančių mokinių dalis. Kiekvienas pakeitimas turi prielaidą ir tikrinimo būdą.
*Kodėl:* 1 žingsnio 3 veiksmas – „Pokyčius grįsti duomenimis: nustatyti aiškų ugdymo programų atnaujinimo ciklą, jo nuosekliai laikytis ir prieš diegiant pakeitimus <...> juos išbandyti“ (TRUMPOJI, p. 8).
*Tikra:* ☐ metinė peržiūra įvyksta ir įrašyta; ☐ kiekvienas pakeitimas turi prielaidą; ☐ metrikai matuojami vietoje, be asmens duomenų.

---

## Peržiūros kontrolinis sąrašas

Sutrauktas sąrašas, kuriuo naudojasi recenzentas prieš skelbiant modulį: rezultatas (S1-02), apimtis (S1-01), pakopa (S1-03), skirtybės (S1-04), rubrika (S1-05), kalba (S1-12), aplinka (S1-13), pagalba (S1-07–08), gilinimas (S1-09), mokytojo lapas (S1-17), prieiga (S1-15), duomenys (S1-18). Kiekvienas punktas turi atskirą „☐“ eilutę atitinkamoje taisyklėje – sąrašas tik apibendrina, o ne pakeičia jas.

**Atviri klausimai, kurių kelrodis neatsako:** kiek modulių sudaro „pakopą“ (normatyvų nėra); kaip suderinti „be registracijos“ su 3 žingsnio reikalavimu, kad pažanga „keliautų su mokiniu“ (eksportas – dalinis sprendimas); ar platforma gali būti oficialus įrodymas mokytojui (kol kas ne, ir tai reikia pasakyti).
