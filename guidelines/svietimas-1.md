# Švietimo kelrodis 2035 — privalomoji produkto doktrina

**Dokumento ID:** S1 · **Versija:** 1.0 · **Galioja nuo:** 2026 m. lapkričio
**Taikymo sritis:** interaktyvi 1–12 klasių mokymosi platforma „Protolabas“ — statinė svetainė, be registracijos, pažanga saugoma įrenginyje.
**Šaltinis:** „Švietimo kelrodis 2035“, VšĮ „Švietimas numeris vienas“ ir ISM Vadybos ir ekonomikos universitetas, 2026 — <https://kelrodis.svietimas.lt/>
**Norminė kopija:** `guidelines/svietimas1-rules.json` (versija 1.0). Jei šis tekstas ir JSON nesutampa, teisingas yra JSON.

---

## 1. Statusas: ką šis dokumentas įsipareigoja ir ko ne

Kelrodis **nėra teisės aktas** — ne įsakymas, ne ministerijos strategija, ne bendroji programa. Pats dokumentas save vadina „alternatyviu Švietimo kelrodžiu“ (IŠPLĖSTINĖ, p. 2). Jį parengė VšĮ „Švietimas numeris vienas“ kartu su ISM Vadybos ir ekonomikos universitetu, remiantis Visionary Analytics analize ir švietimo bendruomenės ekspertinėmis įžvalgomis (IŠPLĖSTINĖ, p. 2). Jį palaiko daugiau nei 40 organizacijų, bet palaikymas neįpareigoja.

Todėl, kai sakome, kad šios taisyklės **privalomos**, turime omenyje vieną: tai **savanoriškas produkto įsipareigojimas**, o ne valstybės reikalavimas. Niekur — nei svetainėje, nei mokytojo medžiagoje — negalima teigti, kad platforma „atitinka Švietimo kelrodį“ taip, kaip programa atitinka teisės aktą. Tikslus sakinys: „Platforma savanoriškai taiko iš Švietimo kelrodžio 2035 išvestas taisykles.“

Antra — ir tai svarbiausia: kelrodyje **nėra nė vieno sakinio apie skaitmenines mokymosi platformas, simuliacijas ar žaidimus**. Vienintelės užuominos — Estijos Harno mokymosi analitika (IŠPLĖSTINĖ, p. 9–10) ir „patogios naudoti integruotos sistemos“, mažinančios mokytojų administracinį krūvį (IŠPLĖSTINĖ, p. 21). Vadinasi, visos dvidešimt taisyklių yra **išvedimas**, o ne citata; kiekviena nurodo žingsnį ir puslapį, kuriuo remiasi. Jei ryšys silpnas, tai pasakoma atvirai.

Trečia: platforma neturi tapti mokytojo ataskaitų sistema. 9 žingsnio 4 veiksmas — „Mažinti mokytojų administracinį krūvį, atsisakant pasikartojančių reikalavimų ir sukuriant patogias naudoti integruotas sistemas“ (IŠPLĖSTINĖ, p. 21) — mums yra ne tikslas, o **dizaino apribojimas**. Jei funkcija ilgina mokytojo darbą su sistema, ji atmetama, net jei duoda daugiau duomenų.

Ketvirta: kelrodis tyli apie tai, kas mums techniškai svarbiausia. Jame nėra modulio ilgio, užduočių skaičiaus ar laiko normatyvų — „mažiau temų, daugiau gylio“ lieka kokybinis principas. Nėra ir nuostatų apie duomenų apsaugą ar vaikų privatumą. Ten, kur šaltinis tyli, sprendžiame konservatyviau ir tai pažymime kaip savo sprendimą (S1-18).

### Kaip skaityti žymėjimą

| Žyma | Reikšmė | Pasekmė |
|---|---|---|
| `[B]` | Blokuojanti taisyklė | Turinys negali būti paskelbtas, kol sąlyga neįvykdyta. |
| `[T]` | Techninė taisyklė | Tikrinama prieš kiekvieną leidimą (release); pažeidimas stabdo leidimą, ne atskirą modulį. |
| ☐ | Patikros punktas | Konkretus, pakartojamas veiksmas, kurį atlieka recenzentas arba CI. |

**TRUMPOJI** — trumpoji versija (10 p.), **IŠPLĖSTINĖ** — išplėstinė versija (22 p.); abi skelbiamos kaip oficialios dokumento versijos.

---

## 2. Trys ramsčiai

Kelrodis remiasi EBPO PISA 2025 išskiriamais stiprios švietimo sistemos bruožais: „**mažesnės apimties, bet gilesnį ugdymo turinį**; **profesionalią vadybą, leidžiančią išteklius nukreipti ten, kur jų labiausiai reikia**; **motyvuotus ir gerai pasirengusius mokytojus**“ (TRUMPOJI, p. 5–6). Iš šių trijų bruožų išvedami trys ramsčiai, o iš jų — dešimt žingsnių.

| # | Ramsčio pavadinimas | Žingsniai | Ką jis reiškia mums |
|---|---|---|---|
| 1 | **Kokybiškos ugdymo programos** | 1–3 | Mažiau temų, gilesnis supratimas, vienodas vertinimas, laiku suteikta pagalba. Tai vienintelis ramstis, kurį platforma veikia tiesiogiai ir kasdien. |
| 2 | **Profesionali vadyba** | 4–7 | Sprendimai grindžiami duomenimis, pilotuojami prieš platinimą, vertinami pagal vaiko pažangą, o ne tik rezultatą. Platformai tai reiškia: jokių reitingų ir jokių pokyčių „iš nuojautos“. |
| 3 | **Motyvuoti mokytojai** | 8–10 | Mokytojas turi gauti pagalbą, o ne papildomą ataskaitą. Platforma privalo mažinti, o ne didinti jo krūvį. |

Kodėl būtent trys, o ne ilgas sąrašas: „Lietuvos švietimo sistemoje netrūksta tikslų, strategijų ir reformų, tačiau dauguma jų numato nekoncentruotus, inkrementinius pokyčius, kurie dažniausiai neatneša siekiamo ilgalaikio rezultato“ (IŠPLĖSTINĖ, p. 2). Mums tai taip pat galioja: geriau dvidešimt tikrinamų taisyklių nei šimtas ketinimų.

---

## 3. Dešimt žingsnių

Kelrodyje **nėra atskiro rodiklio kiekvienam žingsniui**. Yra viena bendra septynių rodiklių lentelė „Kaip matuosime sėkmę?“ (TRUMPOJI, p. 7), kuri daugiausia matuoja 1–3 žingsnių poveikį. Todėl toliau pateiktas rodiklis prie žingsnio yra **priskyrimas**, o ne šaltinio teiginys. Tai žymima žodžiu „priskirtas“.

1. **Mažesnės apimties, bet gilesnės ugdymo programos.** Sumažinti apimtį pagal principą „mažiau temų, daugiau gylio“ ir įvardinti, ką mokinys turi išmokti kiekviename etape (TRUMPOJI, p. 8). *Rodikliai (priskirti):* aukščiausi PISA lygiai 6 % → 20 %; augimo mąstysena 52 % → 80 %. *Taisyklės:* S1-01, S1-02, S1-03, S1-04, S1-20.
2. **Mokinių pasiekimai visur vertinami vienodai.** Bendra vertinimo standartas, kad tas pats lygis visose mokyklose reikštų panašų rezultatą, ir programa, egzaminai bei kriterijai derėtų tarpusavyje (TRUMPOJI, p. 8–9). *Rodiklis (priskirtas):* PUPP neišlaikiusiųjų dalies skirtumas tarp savivaldybių 39,3 → 15 p. p. (matematika), 36,5 → 15 p. p. (lietuvių k.). *Taisyklės:* S1-05, S1-14.
3. **Stebima kiekvieno mokinio pažanga ir laiku užtikrinama pagalba.** Viena vieta kaupti informaciją apie pasiekimus ir savijautą, signalas komandai, intensyvi pagalba nepasiekiantiems bazinio lygio, gylis aukštesnių pasiekimų mokiniams (TRUMPOJI, p. 8). *Rodikliai (priskirti):* 2 lygio nepasiekę 28,7 / 27,7 / 19,7 % → 15 / 15 / 10 %. *Taisyklės:* S1-06–S1-10, S1-15, S1-16, S1-18.
4. **Profesionalūs ir autonomiškai veikiantys mokyklų vadovai.** Praktinis pasirengimas, lyderystės atranka, didesnė finansų ir komandos formavimo laisvė (IŠPLĖSTINĖ, p. 13–14). *Taisyklės:* nė vienos. Platforma neturi svertų vadovo kompetencijai ir neapsimeta, kad turi.
5. **Mokyklose kuriama pozityvi darbo ir mokymosi aplinka.** Kasmetinis aplinkos vertinimas, 2–3 prioritetai, tikslinė pagalba (TRUMPOJI, p. 9). Svarbiausia formuluotė produktui: duomenys „naudojami pirmiausia ne išorinei kontrolei, bet refleksijai, bendruomenės įtraukimui ir mokyklos tobulinimui“ (IŠPLĖSTINĖ, p. 15). *Taisyklės:* S1-12, S1-13.
6. **Švietimo sistemos pažanga vykdoma per pilotinius modelius.** Registruoti pilotus, skelbti rezultatus, plėsti tik duomenimis įrodytą naudą (TRUMPOJI, p. 9). *Taisyklė:* S1-19.
7. **Kokybiškas mokyklų tinklas: perėjimas prie 6+3+3.** Pradinis ugdymas iki 6 kl., pagrindinis iki 9 kl., vidurinis 10–12 kl.; mokykla vertinama ir pagal vaiko pažangą, ne vien rezultatą (TRUMPOJI, p. 9). *Taisyklės:* S1-03, S1-11.
8. **Mokytojai rengiami praktiškai, o ne teoriškai.** Daugiau praktikos mokykloje, mentoriai, mažesnis krūvis pirmaisiais metais (IŠPLĖSTINĖ, 8 žingsnis). *Taisyklės:* nė vienos tiesioginės; netiesiogiai S1-17.
9. **Mokytojai dirba komandoje ir gauna nuolatinę profesinę pagalbą.** Laikas darbui komandomis, mentorių tinklas, kvalifikacijos vertinimas pagal naudą, administracinio krūvio mažinimas (TRUMPOJI, p. 10; IŠPLĖSTINĖ, p. 20–21). *Taisyklė:* S1-17.
10. **Mokytojų karjera susieta su darbo kokybe, o ne išdirbtu laiku.** Profesinio augimo pakopos už rezultatą ir lyderystę, didesnis atlygis už papildomas atsakomybes (IŠPLĖSTINĖ, 10 žingsnis). *Rodiklis:* patraukli mokytojo karjera 29 % → 70 %. *Taisyklės:* nė vienos. Platforma negali pakeisti karjeros modelio ir neturi jo imituoti.

---

## 4. Taisyklės

### A. Turinio architektūra: gylis, o ne apimtis

#### S1-01 [B] Viename modulyje — viena branduolinė idėja

**Taisyklė.** Modulis moko vienos sąvokos ar vieno įgūdžio. Papildomos temos leidžiamos tik kaip tos pačios idėjos pritaikymai, ne kaip naujos temos.

**Kodėl.** 1 žingsnis: „Sumažinti ugdymo programų apimtį pagal principą „mažiau temų, daugiau gylio“, skiriant daugiau laiko svarbiausioms žinioms ir gebėjimams“ (TRUMPOJI, p. 8). EBPO: „Geriau apimti mažiau esminių temų, bet mokyti taip, kad mokiniai jas iš tiesų suprastų, o ne paviršutiniškai perbėgti ilgą temų sąrašą“ (IŠPLĖSTINĖ, p. 9). Kelrodis priduria, kad 2026 m. rugpjūtį septynių dalykų programos buvo koreguojamos būtent todėl, kad mokytojai jas vertina kaip per plačias (ten pat).

**Kaip tikrinama.**
- ☐ Modulio metaduomenyse yra vienas `branduoline_ideja` laukas.
- ☐ Modulyje ne daugiau kaip viena nauja sąvoka; likusios jau įvestos ankstesniuose moduliuose.
- ☐ Peržiūros metu į klausimą „ko šis modulis moko?“ atsakymas telpa į vieną sakinį.

#### S1-02 [B] Kiekvienas modulis turi išmatuojamą mokymosi rezultatą

**Taisyklė.** Rezultatas formuluojamas veiksmažodžiu, nusakančiu pastebimą veiksmą („paaiškina“, „apskaičiuoja“, „numato“, „palygina“), ir yra patikrinamas modulio viduje.

**Kodėl.** 1 žingsnio 2 veiksmas: „Aiškiai įvardinti, ką mokinys turi išmokti kiekviename ugdymo etape“ (TRUMPOJI, p. 8). Mokytojai nurodo, kad programose „pasigendama <...> aiškių kriterijų“ (IŠPLĖSTINĖ, p. 9).

**Kaip tikrinama.**
- ☐ Yra 1–3 rezultatai, ne daugiau.
- ☐ Kiekvienas prasideda veiksmažodžiu, reiškiančiu stebimą veiksmą.
- ☐ Kiekvieną rezultatą atitinka bent viena modulio užduotis.
- ☐ Nėra formuluočių „žinos“, „susipažins“, „supras“.

#### S1-03 [B] Rezultatai išdėstomi pakopomis, o ne atsitiktine tvarka

**Taisyklė.** Kiekvienas modulis pažymėtas klasių grupe (1–4, 5–6, 7–9, 10–12) ir priklauso iš anksto aprašytai pakopos rezultatų sekai. Modulis be vietos sekoje neskelbiamas.

**Kodėl.** 1 žingsnio 2 veiksmas: rezultatai „kiekviename ugdymo etape“. 7 žingsnis siūlo 6+3+3 struktūrą — pradinį ugdymą iki 6 kl., pagrindinį iki 9 kl., vidurinį 10–12 kl. (TRUMPOJI, p. 9). Pakopos turi sutapti su šia logika, o ne su sena 4+6+2.

**Kaip tikrinama.**
- ☐ Yra viešas `pakopos-rezultatai` dokumentas.
- ☐ Kiekvienas modulis turi nuorodą į konkretų pakopos rezultatą.
- ☐ Nėra temos, neturinčios ryšio su jokiu pakopos rezultatu.

#### S1-04 [B] Privalomas, papildomas ir pasirenkamas turinys atskirtas vizualiai ir duomenimis

**Taisyklė.** Kiekviena veikla turi žymą `butina` / `papildoma` / `pasirenkama`. Mokinys mato, kas būtina norint uždaryti temą, o kas — tik smalsumui.

**Kodėl.** 1 žingsnio 2 veiksmas: „atskirti, kas yra būtina, o kas — papildoma ar pasirenkama“ (TRUMPOJI, p. 8). Tai tas pats reikalavimas, kuris mokykloje vadinamas „programos branduolys + plėtra“. Mokykloje žyma gyvena dokumente, pas mus — sąsajoje, todėl mokinys ją mato be mokytojo.

**Kaip tikrinama.**
- ☐ 100 proc. veiklų turi žymą.
- ☐ Žyma rodoma sąsajoje, ne tik metaduomenyse.
- ☐ Suvestinė atskirai rodo „būtina įvaldyta“ ir „papildoma išbandyta“.

#### S1-05 [B] Vertinimo kriterijai vienodi visoje platformoje

**Taisyklė.** Kiekviena užduotis vertinama pagal tą pačią 3–4 lygių rubriką (pvz., „pradedu / bandau / įvaldžiau / gilinu“), su aprašytais požymiais, o ne pagal autoriaus nuojautą.

**Kodėl.** 2 žingsnio 3 veiksmas: „Nustatyti bendrą vertinimo standartą <...> kad tas pats pasiekimų lygis visose mokyklose reikštų panašų rezultatą“ (TRUMPOJI, p. 8). Europos Komisija: „mokytojai kriterijus bei standartus, pagal kuriuos kompetencijos vertinamos, supranta ir taiko nevienodai“ (IŠPLĖSTINĖ, p. 10). Platformoje kiekvienas modulio autorius yra atskiras „mokytojas“.

**Kaip tikrinama.**
- ☐ Viena rubrikos schema visoje platformoje, ne po vieną moduliui.
- ☐ Kiekvienas lygis turi elgesio aprašą, ne tik pavadinimą.
- ☐ Du nepriklausomi recenzentai tam pačiam atsakymui priskiria tą patį lygį; sutapimas ≥ 80 proc. ėminyje.

### B. Pažanga, pagalba ir abu galai

#### S1-06 [T] Pažanga fiksuojama įrenginyje, be registracijos ir be asmens duomenų

**Taisyklė.** Būsena saugoma `localStorage` / `IndexedDB`. Nėra paskyrų, el. pašto, vardų. Mokinys mato savo pažangą kaip „kas įvaldyta / kas dar ne“, o ne kaip procentą.

**Kodėl.** 3 žingsnio 1 veiksmas: „vienoje sistemoje kaupti svarbiausią informaciją apie pasiekimus, pažangą, savijautą <...> matoma mokiniui, tėvams ir mokytojams“ (TRUMPOJI, p. 8). Be paskyrų šį reikalavimą **išpildome tik iš dalies**: informacija matoma mokiniui, bet ne tėvams ir ne mokytojams tiesiogiai. Šią ribą deklaruojame atvirai.

**Kaip tikrinama.**
- ☐ Jokių tinklo užklausų su mokinio duomenimis.
- ☐ Platforma veikia privačioje naršymo sesijoje.
- ☐ Aiškus pranešimas, kad pažanga išlieka tik šiame įrenginyje.

#### S1-07 [B] Sistema pati pasiūlo pagalbą, kai mokiniui nesiseka

**Taisyklė.** Po dviejų nepavykusių to paties tipo bandymų mokiniui automatiškai pasiūlomas alternatyvus paaiškinimas ar lengvesnis žingsnis — ne bauda ir ne užrakinimas.

**Kodėl.** 3 žingsnio 2 veiksmas: „reikšmingai pasikeitus mokinio pažangai sistema siųstų signalą“ (TRUMPOJI, p. 8); 3 veiksmas: „Bazinio lygio nepasiekiantiems mokiniams užtikrinti intensyvią pagalbą“ (ten pat). Kontekstas: tik 63 proc. mokinių sako, kad mokytojas prireikus suteikia papildomą pagalbą (EBPO — 73 proc.) (IŠPLĖSTINĖ, p. 10). Platformoje signalo gavėjas negali būti mokytojas, todėl signalą gauna pats mokinys.

**Kaip tikrinama.**
- ☐ Yra `pagalbos_slenkstis` parametras (numatytas 2).
- ☐ Pagalba siūloma tame pačiame ekrane, be papildomo paspaudimo.
- ☐ Joks turinys netampa neprieinamas dėl nesėkmės.

#### S1-08 [B] Neveiksminga pagalba keičiama, o ne kartojama

**Taisyklė.** Jei ta pati pagalba nepadeda per 3 bandymus, sistema keičia metodo tipą (vaizdas → tekstas → manipuliavimas → pavyzdys), o ne siūlo tą pačią užduotį dar kartą.

**Kodėl.** 3 žingsnio 3 veiksmas: „Jei pagalba neveiksminga, ją keisti arba stiprinti, kol mokinys pasiekia bazinį lygį“ (TRUMPOJI, p. 8). Kelrodis vartoja „keisti“, ne „kartoti“.

**Kaip tikrinama.**
- ☐ Kiekviena užduotis turi bent 2 skirtingo tipo pagalbos variantus.
- ☐ Sistema fiksuoja, kuris variantas suveikė.
- ☐ Peržiūroje matoma, kad nėra užduočių su vienintele pagalba.

#### S1-09 [B] Aukštesnių pasiekimų mokiniams — gilyn, ne daugiau to paties

**Taisyklė.** Įvaldžiusiam mokiniui siūloma kokybiškai kita užduotis (perkėlimas į naują kontekstą, atviras uždavinys, projektas), o ne dešimt papildomų to paties tipo pratimų.

**Kodėl.** 3 žingsnio 4 veiksmas: „Aukštesnių pasiekimų mokiniams sudaryti sąlygas mokytis giliau, nepriklausomai nuo mokyklos galimybių“ (TRUMPOJI, p. 8). Būklė, kurios nekartojame: „Pamokoje aukštesnių gebėjimų mokiniui dažniausiai pasiūloma tik sudėtingesnė užduotis ar praplėstas turinys“ (IŠPLĖSTINĖ, p. 10).

**Kaip tikrinama.**
- ☐ Kiekvienas modulis turi „gilinimo“ šaką.
- ☐ Gilinimo užduotis keičia kontekstą, o ne skaičių dydį.
- ☐ Gilinimas nežymimas kaip „bonusiniai taškai“.

#### S1-10 [T] Pažangos suvestinė yra perkeliama

**Taisyklė.** Mokinys ar tėvas gali vienu paspaudimu išsisaugoti suvestinę (PDF arba spausdinama versija) ir perkelti ją į kitą įrenginį failo importu.

**Kodėl.** 3 žingsnio 1 veiksmas reikalauja, kad informacija „keliautų kartu su mokiniu keičiant mokyklą ar ugdymo pakopą“ (TRUMPOJI, p. 8). Be paskyrų tai įmanoma tik **eksportu**. Eksportas yra dalinis sprendimas: jis perkelia duomenis, bet neužtikrina, kad jie bus priimti kitoje mokykloje kaip oficialūs.

**Kaip tikrinama.**
- ☐ Yra „Išsisaugoti pažangą“ mygtukas.
- ☐ Failą galima importuoti atgal.
- ☐ Suvestinė suprantama be platformos: žmogui skaitoma, ne vien JSON.

#### S1-11 [B] Jokio viešo reitingavimo; lyginamasi tik su savimi

**Taisyklė.** Nėra lyderių lentelių, kitų vaikų rezultatų, „top 10“. Pažanga rodoma kaip „šiandien prieš praėjusią savaitę“.

**Kodėl.** 7 žingsnio 2 veiksmas: mokykla vertinama „ne tik pagal mokinių rezultatus, bet ir pagal pasiektą vaiko pažangą“ (TRUMPOJI, p. 9). Reitingas matuoja rezultatą ir panaikina būtent tą savybę, kurią kelrodis laiko svarbiausia. 5 žingsnis papildo: pozityvi aplinka. Kontekstas: tik 62,1 proc. mokinių jaučia priklausymą mokyklai (EBPO — 76,2 proc.), 45,3 proc. patyrė patyčių (IŠPLĖSTINĖ, p. 15).

**Kaip tikrinama.**
- ☐ Kodo paieška neranda `leaderboard` ar `ranking` komponento.
- ☐ Jokia užklausa neperduoda kito mokinio duomenų (jų ir nėra).
- ☐ Sąsajos tekstuose nėra „geriausias klasėje“, „pirmas vietoje“.

### C. Aplinka ir kalba

#### S1-12 [B] Grįžtamasis ryšys — augimo mąstysenos kalba

**Taisyklė.** Klaida komentuojama kaip strategijos klausimas („ši strategija dar neveikia — pabandykim kitaip“), o ne kaip gebėjimo trūkumas. Draudžiamos formulės: „tu nesugebi“, „tau per sunku“, „esi silpnas“, „nepraeisi“.

**Kodėl.** 5 žingsnis kuria pozityvią darbo ir mokymosi aplinką (TRUMPOJI, p. 9), o jo logika remiasi tuo, kad duomenys naudojami refleksijai, ne kontrolei (IŠPLĖSTINĖ, p. 15). Matuojamas rezultatas: 52 proc. penkiolikmečių tiki, kad gebėjimus galima ugdyti (EBPO — 69 proc., Estija — 83 proc.), o siekis — 80 proc. (IŠPLĖSTINĖ, p. 4; TRUMPOJI, p. 7). Tai vienintelis rodiklis, kurį platforma veikia tiesiogiai — kasdieniu grįžtamuoju ryšiu.

**Kaip tikrinama.**
- ☐ Visi klaidų pranešimai peržiūrėti pagal draudžiamų frazių sąrašą.
- ☐ Kiekvienas pranešimas turi „ką daryti toliau“.
- ☐ Niekur nevartojamas žodis „nesugebėjai“.

#### S1-13 [B] Saugi aplinka: klaida — informacija, o ne bausmė

**Taisyklė.** Pagrindiniame kelyje nėra laiko limito, „gyvybių“, minusinių taškų, garsinių nesėkmės signalų. Po modulio — vienas savijautos klausimas, kurio atsakymas saugomas tik įrenginyje.

**Kodėl.** 5 žingsnis: „Mokyklose kuriama pozityvi darbo ir mokymosi aplinka“ (TRUMPOJI, p. 9). 5 žingsnio principas: duomenys „naudojami pirmiausia ne išorinei kontrolei, bet refleksijai“ (IŠPLĖSTINĖ, p. 15). Savijauta kelrodyje yra pažangos dalis, bet atsakymas neturi virsti rodikliu, už kurį kas nors atsiskaito.

**Kaip tikrinama.**
- ☐ Jokių laikmačių privalomose užduotyse.
- ☐ Nėra „gyvybių“ ar „širdelių“ modelio.
- ☐ Savijautos klausimas yra, o atsakymas neišsiunčiamas į tinklą.

#### S1-14 [B] Terminija ir turinys suderinti su bendrąja programa

**Taisyklė.** Kiekviena sąvoka vartojama taip, kaip bendrosiose programose ir PUPP / VBE užduotyse. Modulyje nurodytas atitikmuo: dalykas, klasė, programos sritis.

**Kodėl.** 2 žingsnio 4 veiksmas — sutelkti programų, egzaminų ir vertinimo kriterijų atsakomybę, „kad visi jie derėtų tarpusavyje“ (TRUMPOJI, p. 9); 2 žingsnio 3 veiksmas — „tas pats pasiekimų lygis <...> reikštų panašų rezultatą“ (p. 8). Platformai tai reiškia ne kopijavimą, o suderinamumą: vaikas, grįžęs į pamoką, turi atpažinti tuos pačius žodžius.

**Kaip tikrinama.**
- ☐ Kiekvienas modulis turi `dalykas / klasė / sritis` laukus.
- ☐ Terminų žodyne nėra sinonimų dubliavimo.
- ☐ Bent vienas to dalyko mokytojas peržiūrėjo modulį.

### D. Lygios galimybės nepaisant vietos

#### S1-15 [T] Vienoda kokybė nepaisant vietos, įrenginio ir ryšio

**Taisyklė.** Ta pati medžiaga veikia telefone, planšetėje ir nešiojamame kompiuteryje, kraunasi silpnu ryšiu, o pagrindinis turinys pasiekiamas ir be nuolatinio interneto po pirmo įkėlimo.

**Kodėl.** Tiesioginis pažadas: vaikas „nepriklausomai nuo gyvenamosios vietos ar mokyklos, turi turėti vienodas galimybes“ (<https://svietimas.lt/>). 3 žingsnio 4 veiksmas reikalauja sąlygų „nepriklausomai nuo mokyklos galimybių“ (TRUMPOJI, p. 8). Duomenys: didžiųjų miestų ir kaimo mokyklų gamtos mokslų rezultatų atotrūkis — 65 taškai, EBPO vidurkis — 33 (IŠPLĖSTINĖ, p. 5). Formuluotė apie vietą — iš svetainės, ne iš žingsnio teksto, todėl tai programos pažadas, ne citata.

**Kaip tikrinama.**
- ☐ Testas trijuose įrenginiuose: telefonas, planšetė, nešiojamas kompiuteris.
- ☐ „Lėtas 3G“ profilis Chrome DevTools praeina be sulūžusio išdėstymo.
- ☐ Po pirmo įkėlimo modulis atsidaro be tinklo.

#### S1-16 [B] Kelias be mokytojo: vaikas gali pradėti pats

**Taisyklė.** Kiekviena tema pasiekiama naršymu be kvietimo, be klasės kodo, be mokytojo patvirtinimo. Instrukcija, kaip pradėti, telpa į vieną ekraną.

**Kodėl.** Platforma neturi registracijos, todėl mokytojas fiziškai negali būti vartų sargas. 3 žingsnio 4 veiksmas reikalauja prieigos „nepriklausomai nuo mokyklos galimybių“ (TRUMPOJI, p. 8) — mokykla, kurioje nėra kam išduoti kodo, neturi tapti kliūtimi.

**Kaip tikrinama.**
- ☐ Trys paspaudimai nuo įėjimo iki pirmos užduoties.
- ☐ Nėra „įveskite klasės kodą“ ekrano.
- ☐ Visa navigacija veikia be prisijungimo.

### E. Mokytojas, duomenys, pilotas

#### S1-17 [B] Kiekvienam moduliui — mokytojo medžiaga, taupanti laiką

**Taisyklė.** Atskirame puslapyje: rezultatas, numatomas laikas, dažniausios klaidos su paaiškinimais, trys klausimai diskusijai, spausdinama santrauka. Ne ilgiau nei vienas A4.

**Kodėl.** 9 žingsnio 4 veiksmas: „Mažinti mokytojų administracinį krūvį, atsisakant pasikartojančių reikalavimų ir sukuriant patogias naudoti integruotas sistemas“ (IŠPLĖSTINĖ, p. 21). Ilgesnė nei vienas lapas medžiaga krūvį didina, o ne mažina — todėl A4 yra riba, ne pageidavimas. Kontekstas: tik 37 proc. mokytojų kas mėnesį tariasi su kolegomis dėl konkrečių mokinių pažangos (EBPO — 60 proc.) (IŠPLĖSTINĖ, p. 20).

**Kaip tikrinama.**
- ☐ Kiekviename modulyje yra `mokytojui.md`.
- ☐ Medžiaga telpa į vieną A4.
- ☐ Yra „dažnos klaidos“ skiltis.
- ☐ Nereikalaujama jokios registracijos.

#### S1-18 [T] Minimalūs duomenys, jokio trečiųjų šalių sekimo

**Taisyklė.** Nėra analitikos skriptų, slapukų, socialinių tinklų mygtukų; jokia statistika nerenkama individualiai. Jei renkama apibendrinta statistika — tik be asmens duomenų ir aiškiai paskelbus.

**Kodėl.** Kelrodyje apie tai **nieko nėra** — tai spraga, ne reikalavimas. Todėl sprendžiame konservatyviau: 3 žingsnis mini jautrią informaciją („savijautą, mokymosi sunkumus, specialiuosius poreikius“), kuri neturi palikti įrenginio be pagrindo (TRUMPOJI, p. 8). Tai mūsų išvedimas iš bendro principo, ne citata.

**Kaip tikrinama.**
- ☐ Tinklo skydelyje nėra užklausų į trečiąsias šalis.
- ☐ Nėra jokių slapukų, išskyrus būtinąsias.
- ☐ Privatumo puslapyje parašyta, kas saugoma ir kur.

#### S1-19 [B] Pilotas prieš platinimą

**Taisyklė.** Naujas modulis ar mechanika pirmiausia išbandoma su 5–10 mokytojų arba 2–3 mokyklomis, su iš anksto užrašytais sėkmės kriterijais. Rezultatai skelbiami viešai nepriklausomai nuo to, ar jie teigiami.

**Kodėl.** 6 žingsnis: „Nacionaliniu mastu plėsti tik tuos sprendimus, kurių nauda įrodyta duomenimis“ (TRUMPOJI, p. 9). Modelis: Anglijoje „pirmiausia išbando 10–20 ugdymo įstaigų, vėliau 50–100“, o poveikį vertina nepriklausomi vertintojai, kurių ataskaitos skelbiamos viešai (IŠPLĖSTINĖ, p. 16).

**Kaip tikrinama.**
- ☐ Yra piloto protokolas su kriterijais, užrašytais prieš startą.
- ☐ Rezultatų ataskaita paskelbta.
- ☐ „Nepavykę“ sprendimai dokumentuoti, ne ištrinti.

#### S1-20 [T] Kasmetinė iteracija, grįsta duomenimis, o ne nuomone

**Taisyklė.** Kartą per metus peržiūrimi bent keturi metrikai: kur mokiniai nustoja (atsisakymo taškai), laikas iki pirmos sėkmės, kuri pagalba padeda, grįžtančių mokinių dalis. Kiekvienas pakeitimas turi prielaidą ir tikrinimo būdą.

**Kodėl.** 1 žingsnio 3 veiksmas: „Pokyčius grįsti duomenimis: nustatyti aiškų ugdymo programų atnaujinimo ciklą, jo nuosekliai laikytis ir prieš diegiant pakeitimus <...> juos išbandyti“ (TRUMPOJI, p. 8).

**Kaip tikrinama.**
- ☐ Metinė peržiūra įvyksta ir įrašyta.
- ☐ Kiekvienas pakeitimas turi užrašytą prielaidą.
- ☐ Metrikai matuojami vietoje, be asmens duomenų.

---

## 5. Kaip šios taisyklės naudojamos platformoje

**Norminis šaltinis yra JSON.** `guidelines/svietimas1-rules.json` yra mašininė tų pačių taisyklių forma. Tekstas paaiškina; JSON sprendžia. Keičiant taisyklę, keičiami abu ir pakeliama versija.

**Turinio PR nurodo taisyklių ID.** Modulio `module.json` turi `rules` masyvą, pvz. `["S1-01", "S1-02", "S1-07"]`. Recenzentas netikrina, ar autorius „gerai parašė“; jis tikrina kiekvieną nurodytą taisyklę pagal jos `checks` sąrašą. Modulis be `rules` nepriimamas.

**Agentai ir QA skaito JSON, ne markdown.** `tools/validate.py` ir CI tikrina, ar ID egzistuoja, ar `[B]` taisyklės nepažeistos, ar `[T]` tenkinamos prieš leidimą. Klaidos pranešime nurodomas ID ir nepavykęs punktas, ne „neteisingas turinys“.

**`[B]` ir `[T]` elgiasi skirtingai.** `[B]` stabdo konkretų modulį, kol trūkumas neištaisytas. `[T]` stabdo leidimą, bet ne modulį: lūžus vienam įrenginio profiliui taisoma infrastruktūra, ne turinys.

**Taisyklė laimi prieš modulį.** Konflikto atveju keičiamas modulis. Jei taisyklė atrodo neteisinga, keičiamas dokumentas su argumentu ir versijos numeriu — ne daroma išimtis vienam moduliui.

**Ką tai reiškia mokytojui.** Platforma nėra įrodymas, kad mokinys pasiekė rezultatą, ir ne ataskaita mokyklai. 3 žingsnio reikalavimą kaupti informaciją „matomą mokiniui, tėvams ir mokytojams“ įvykdome tik iš dalies (S1-06), o perkėlimą sprendžiame eksportu (S1-10). Tai pasakoma `mokytojui.md` ir privatumo puslapyje.

## 6. Atviri klausimai

Kelrodis į šiuos klausimus neatsako, todėl jie neuždaromi taisykle — kitaip apsimestume tikslumą, kurio šaltinis neturi.

- **Kaip suderinti „be registracijos“ su reikalavimu, kad pažanga keliautų su mokiniu?** Eksportas yra dalinis sprendimas: jis neperkelia duomenų automatiškai ir nepadaro jų oficialiais.
- **Ar platforma gali būti oficialus įrodymas mokytojui?** Kol kas ne. Tai reikia pasakyti atvirai.
- **Ar 1–12 klasių aprėptis atitinka kelrodį?** Kelrodis 1–12 klasių tiesiogiai neįvardija (NŠA modulių kontekste minima „3–10 klasių“, IŠPLĖSTINĖ, p. 10). Mūsų aprėptis yra platesnė už tą, kurią kelrodis numato, ir tai mūsų sprendimas.
