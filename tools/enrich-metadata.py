#!/usr/bin/env python3
"""Uzpildo moduliu metaduomenis: oficialus BP kodai, ismatuojamas rezultatas,
designNotes su pedagoginiu pagrindu (Pxx) ir kanoniniai S1 taisykliu ID.

Saltiniai:
- Kodai: research/curriculum-grade1.md (e-TAR V-1269, 1 klases turinys)
- Pxx: wiki/00-bendra/mokymosi-mokslas.md
- S1-nn: guidelines/svietimas1-rules.json

Kodai VISADA rasomi su dalyku, nes numeracija kartojasi tarp dalyku
(pvz. 22.x yra ir Etika, ir Fizinis ugdymas; 23.x - ir Daile, ir Technologijos).
"""
import json
import pathlib
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
MODULES = ROOT / "content" / "grade-01" / "modules"

BASE_S1 = ["S1-01", "S1-02", "S1-14", "S1-16", "S1-17", "S1-18"]

# id -> (codes, area, status, outcome, evidence[], designNotes{})
DATA = {
    "skaiciai-iki-10": (
        ["Matematika 24.1.1.1", "Matematika A1.2", "Matematika B2.2"],
        "Skaičiai ir skaičiavimai",
        "privaloma",
        "Per 5 simuliacijos raundus vaikas bent 4 kartus teisingai nurodo kiekį iki 10 neskaičiuodamas po vieną.",
        ["P35", "P13", "P10"],
        {
            "branduolineIdeja": "Skaičius žymi kiekį, o nedidelį kiekį galima atpažinti iš karto.",
            "simTipas": "vote",
            "kognityvineApkrova": "Ne daugiau kaip 10 objektų vienu metu, be teksto simuliacijos metu.",
            "ux": "Skaičių mygtukai ≥44 px, atsakymas patvirtinamas iškart, be laiko spaudimo.",
            "evidence": ["P35", "P13", "P10"],
        },
    ),
    "sudetis-iki-10": (
        ["Matematika 24.1.1.2", "Matematika A1.2"],
        "Skaičiai ir skaičiavimai",
        "privaloma",
        "Per 5 raundus vaikas bent 4 kartus suranda trūkstamą dėmenį taip, kad suma būtų 10.",
        ["P39", "P42", "P38"],
        {
            "branduolineIdeja": "Dešimtuką galima sudaryti iš dviejų dalių įvairiais būdais.",
            "simTipas": "manipulate",
            "kognityvineApkrova": "Rodoma tik viena pora ir viena suma; pagalbinės juostos nerodomos iki pirmos klaidos.",
            "ux": "Vilkimo taikiniai dideli; veikia ir bakstelėjimas, ne tik tempimas.",
            "evidence": ["P39", "P42", "P38"],
        },
    ),
    "skaiciai-iki-20": (
        ["Matematika 24.1.1.1", "Matematika A1.3"],
        "Skaičiai ir skaičiavimai",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų teisingai pasako, kiek dešimčių ir kiek vienetų yra skaičiuje iki 20.",
        ["P13", "P37"],
        {
            "branduolineIdeja": "Skaičiai nuo 11 iki 20 sudaryti iš dešimties ir kelių vienetų.",
            "simTipas": "manipulate",
            "kognityvineApkrova": "Vienu metu rodomas vienas dešimtukas ir iki 10 vienetų, be papildomų etikečių.",
            "ux": "Dešimtukų rėmelis lieka matomas visą laiką kaip atrama.",
            "evidence": ["P13", "P37"],
        },
    ),
    "formos-ir-simetrija": (
        ["Matematika 24.3.3.1", "Dailė 23.1.7", "Dailė A1.2"],
        "Geometrija ir matavimai",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų nurodo simetrijos ašį arba ją atkuria.",
        ["P03", "P01"],
        {
            "branduolineIdeja": "Simetrija – tai dvi vienodos pusės, kurios sutampa perlenkus.",
            "simTipas": "manipulate",
            "kognityvineApkrova": "Viena figūra ekrane, ašis paryškinta, nereikia skaičiuoti.",
            "ux": "Ašis rodoma kaip ryški linija (signaling), ne kaip legenda apačioje.",
            "evidence": ["P03", "P01"],
        },
    ),
    "matuoju-ilgi": (
        ["Matematika 24.3.1.2", "Matematika A1.4"],
        "Geometrija ir matavimai",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų palygina du ilgius ir pasako, kuris ilgesnis, remdamasis matavimu.",
        ["P14", "P13"],
        {
            "branduolineIdeja": "Ilgis matuojamas vienodais vienetais, pradedant nuo to paties taško.",
            "simTipas": "manipulate",
            "kognityvineApkrova": "Du objektai, viena liniuotė; be kitų matavimo vienetų.",
            "ux": "Matavimo pradžia fiksuojama automatiškai, kad vaikas nesuktų dėmesio į techniką.",
            "evidence": ["P14", "P13"],
        },
    ),
    "akmenu-zaidimas": (
        ["Matematika 24.2.2", "Matematika C1.3"],
        "Matematinis mąstymas ir problemų sprendimas",
        "papildoma",
        "Vaikas paaiškina bent vieną ėjimą žodžiais „jei aš imu tiek, tai liks...“.",
        ["P30", "P28"],
        {
            "branduolineIdeja": "Žaidime galima planuoti ėjimą į priekį ir pastebėti pasikartojančią taisyklę.",
            "simTipas": "strategy",
            "kognityvineApkrova": "Ne daugiau kaip 9 akmenys; kompiuterio ėjimas rodomas lėtai.",
            "ux": "Nėra laikmačio ir nėra rezultato lentos – žaidžiama dėl pastebėjimo, ne dėl pergalės.",
            "evidence": ["P30", "P28"],
            "pastaba": "P30: Nim strategijos mokymo 1 klasei tiesioginių įrodymų nėra. Modulis žymimas papildomu ir neturi būti vertinamas kaip pasiekimų įrodymas.",
        },
    ),
    "algoritmai-robotui": (
        ["Matematika 24.2.2", "Matematika C1.3"],
        "Matematinis mąstymas ir problemų sprendimas",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų sudaro komandų seką, kuri nuveda robotą iki tikslo.",
        ["P17", "P18"],
        {
            "branduolineIdeja": "Veiksmai atliekami tvarkinga seka, o seka gali būti užrašyta ir pakartota.",
            "simTipas": "build",
            "kognityvineApkrova": "Tinklelis 5×5, ne daugiau kaip 4 komandos vienu bandymu.",
            "ux": "Kiekviena komanda – didelė ikona su balsu; klaida parodo, kur robotas sustojo.",
            "evidence": ["P17", "P18"],
        },
    ),
    "raides-ir-garsai": (
        ["Lietuvių kalba 25.4.1", "Lietuvių kalba D1.3"],
        "Kalbos pažinimas",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų teisingai priskiria garsą raidei ir atskiria balsį nuo priebalsio.",
        ["P31", "P34", "P32"],
        {
            "branduolineIdeja": "Kiekvienas garsas žymimas raide; balsiai tariami laisvai, priebalsiai – su kliūtimi.",
            "simTipas": "classify",
            "kognityvineApkrova": "Viena raidė ir vienas garsas vienu metu, be abėcėlės visumos.",
            "ux": "Raidė visada girdima balsu (modality), nes 1 klasėje skaitymo krūvis minimalus.",
            "evidence": ["P31", "P34", "P32"],
            "pastaba": "P34: skiemens metodo pranašumas lietuvių kalboje – hipotezė, kurią platforma turi tikrinti pati. Raidžių įvedimo seka programoje nenurodyta, todėl tai metodinė prielaida.",
        },
    ),
    "skaitau-zodzius": (
        ["Lietuvių kalba 25.4.1", "Lietuvių kalba D2.2"],
        "Skaitymas ir teksto supratimas",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų perskaito 2–3 skiemenų žodį ir parodo jį atitinkantį paveikslėlį.",
        ["P31", "P33", "P34"],
        {
            "branduolineIdeja": "Žodis skaitomas skiemenimis, o perskaitytas žodis turi prasmę.",
            "simTipas": "match",
            "kognityvineApkrova": "Ne daugiau kaip 3 pasirinkimai; žodžiai 2–3 skiemenų.",
            "ux": "Skiemuo paryškinamas, kai vaikas jį paliečia; garsas paleidžiamas tik paprašius.",
            "evidence": ["P31", "P33", "P34"],
        },
    ),
    "augalo-gyvenimas": (
        ["Gamtos mokslai 26.2.3", "Gamtos mokslai D1.4"],
        "Gamtos objektų ir reiškinių pažinimas",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų nurodo, ko augalui reikia, kad jis augtų, ir ką tai lemia.",
        ["P17", "P18", "P12"],
        {
            "branduolineIdeja": "Augalui reikia šviesos ir vandens, o jų kiekis keičia augimą.",
            "simTipas": "variables",
            "kognityvineApkrova": "Tik du kintamieji (šviesa, vanduo), vienas augalas ekrane.",
            "ux": "Pokytis matomas iškart po kiekvieno bandymo, be ilgo laukimo.",
            "evidence": ["P17", "P18", "P12"],
        },
    ),
    "gyva-ir-negyva": (
        ["Gamtos mokslai 26.2.4", "Gamtos mokslai D4.3"],
        "Gamtos objektų ir reiškinių pažinimas",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų priskiria objektą gyvajai ar negyvajai gamtai ir nurodo vieną požymį.",
        ["P15", "P13"],
        {
            "branduolineIdeja": "Gyvi dalykai kvėpuoja, maitinasi ir auga; negyvi – ne.",
            "simTipas": "classify",
            "kognityvineApkrova": "Po vieną objektą, be foninių detalių (P15).",
            "ux": "Objektai rodomi kaip paprastos iliustracijos, ne fotorealistinės nuotraukos.",
            "evidence": ["P15", "P13"],
        },
    ),
    "metu-laikai": (
        ["Gamtos mokslai (2 klasė) 27.2.3"],
        "Gamtos objektų ir reiškinių pažinimas",
        "papildoma",
        "Vaikas įvardija, kuo skiriasi du metų laikai pagal savo patirtį.",
        ["P49", "P12"],
        {
            "branduolineIdeja": "Metų laikai keičiasi iš eilės ir keičia gamtą.",
            "simTipas": "variables",
            "kognityvineApkrova": "Vienas metų laikas vienu metu, be visų keturių viename ekrane.",
            "ux": "Trumpa sesija (≤5 min.), kad ekrano laikas nekauptų.",
            "evidence": ["P49", "P12"],
            "pastaba": "1 klasės BP metų laikų temos neturi – sezoniškumas programuojamas 2 klasėje (27.2.3). Todėl modulis žymimas papildomu ir neturi būti pateikiamas kaip 1 klasės privalomas turinys.",
        },
    ),
    "saugus-kelias": (
        ["Gyvenimo įgūdžiai 24.4"],
        "Saugumas ir sprendimų priėmimas",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų pasirenka saugų ėjimą perėjoje ir paaiškina, kodėl jis saugus.",
        ["P43", "P26"],
        {
            "branduolineIdeja": "Saugu kelti kelią ten, kur yra perėja ir dega žalias signalas.",
            "simTipas": "scenario",
            "kognityvineApkrova": "Viena situacija, du galimi veiksmai.",
            "ux": "Nesaugus pasirinkimas nebaudžiamas – parodoma pasekmė ir leidžiama bandyti dar kartą.",
            "evidence": ["P43", "P26"],
        },
    ),
    "seima-ir-bendruomene": (
        ["Gyvenimo įgūdžiai 24.1", "Etika 22.2.1"],
        "Tarpusavio santykiai",
        "privaloma",
        "Vaikas įvardija bent tris skirtingus žmones savo bendruomenėje ir jų vaidmenis.",
        ["P50"],
        {
            "branduolineIdeja": "Skirtingi žmonės bendruomenėje turi skirtingus vaidmenis ir padeda vieni kitiems.",
            "simTipas": "roles",
            "kognityvineApkrova": "Ne daugiau kaip 4 vaidmenys vienu metu.",
            "ux": "Vaidmenys rodomi kaip veidai su pavadinimais, kad nereikėtų skaityti ilgų aprašymų.",
            "evidence": ["P50"],
        },
    ),
    "jausmai-ir-draugyste": (
        ["Etika 22.1.2", "Etika A2.2"],
        "Saviugda ir savisauga",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų įvardija jausmą paveikslėlyje ir pasiūlo, kaip padėti draugui.",
        ["P43", "P50"],
        {
            "branduolineIdeja": "Jausmai turi vardus, o draugas gali padėti, kai sunku.",
            "simTipas": "scenario",
            "kognityvineApkrova": "Vienas jausmas ir vienas pasirinkimas vienu metu.",
            "ux": "Nėra „teisingo“ jausmo – priimami visi atsakymai, komentaras pridedamas po pasirinkimo.",
            "evidence": ["P43", "P50"],
        },
    ),
    "teisingas-dalijimas": (
        ["Etika 22.2.1", "Matematika 24.1.1.2"],
        "Tarpusavio santykiai",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų padalija daiktus po lygiai ir paaiškina, kaip patikrino, kad po lygiai.",
        ["P28", "P29"],
        {
            "branduolineIdeja": "Dalytis teisinga – reiškia dalyti po lygiai, o kiekį galima patikrinti.",
            "simTipas": "fairshare",
            "kognityvineApkrova": "Du dalyviai, iki 10 daiktų; be likučio sąvokos.",
            "ux": "„Aš dalinu, tu renkiesi“ mechanika rodoma kaip žaidimas su dviem ėjimais.",
            "evidence": ["P28", "P29"],
        },
    ),
    "spalvu-laboratorija": (
        ["Dailė 23.1.3", "Dailė 23.1.1", "Dailė A1.2"],
        "Dailės raiška",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų nuspėja, kokia spalva gausis sumaišius dvi spalvas, ir patikrina.",
        ["P01", "P47"],
        {
            "branduolineIdeja": "Dvi spalvos sumaišytos duoda trečią, o šiltos ir šaltos spalvos skiriasi.",
            "simTipas": "variables",
            "kognityvineApkrova": "Dvi spalvos ir vienas rezultatas; be spalvų pavadinimų sąrašo.",
            "ux": "Rezultatas atsiranda tiesiai po mišinio, kad vaizdas ir pasekmė sutaptų laike (P06).",
            "evidence": ["P01", "P47"],
        },
    ),
    "ritmas-ir-garsai": (
        ["Muzika 25.1.5"],
        "Muzikavimas",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų pakartoja 2–4 dūžių ritmą plojant arba bakstelint.",
        ["P06", "P07"],
        {
            "branduolineIdeja": "Ritmas – tai pasikartojantys garsai, kuriuos galima atkartoti kūnu.",
            "simTipas": "rhythm",
            "kognityvineApkrova": "Iki 4 dūžių, vienas taktas be sinchronizavimo su kitais.",
            "ux": "Dūžiai rodomi ir girdimi vienu metu; tempas lėtas ir vaiko valdomas.",
            "evidence": ["P06", "P07"],
        },
    ),
    "dainuoju-chore": (
        ["Muzika 25.1.2", "Muzika 25.1.4"],
        "Muzikavimas",
        "privaloma",
        "Vaikas bent 4 iš 5 kartų atkartoja 2–3 gaidų motyvą balsu arba paspausdamas.",
        ["P09", "P07"],
        {
            "branduolineIdeja": "Melodija – tai garsų seka, kurią galima atkartoti iš klausos.",
            "simTipas": "melody",
            "kognityvineApkrova": "2–3 gaidys, be natų rašto.",
            "ux": "Kiekviena gaida turi spalvą ir vietą, kad vaikas atsimintų seka vaizdu, ne tekstu.",
            "evidence": ["P09", "P07"],
        },
    ),
    "judrumo-zaidimas": (
        ["Fizinis ugdymas 22.1.1", "Fizinis ugdymas 22.1.3"],
        "Judėjimo įgūdžių plėtojimas",
        "privaloma",
        "Vaikas atlieka 4 judesius iš eilės pagal parodytą pavyzdį.",
        ["P45", "P49"],
        {
            "branduolineIdeja": "Judėjimas turi kryptį, tempą ir seką, kurią galima atkartoti.",
            "simTipas": "move",
            "kognityvineApkrova": "Vienas judesys vienu metu, seka ne ilgesnė kaip 4 žingsniai.",
            "ux": "Dideli mygtukai ir judesio demonstracija; žaidimas trumpas, kad ekranas nebūtų pagrindinė veikla.",
            "evidence": ["P45", "P49"],
        },
    ),
    "sokiu-zingsniai": (
        ["Fizinis ugdymas 22.1.4"],
        "Judėjimo įgūdžių plėtojimas",
        "papildoma",
        "Vaikas atkartoja 3–4 žingsnių šokio seką pagal muziką.",
        ["P45", "P06"],
        {
            "branduolineIdeja": "Šokis – tai judesių seka, sinchronizuota su muzika.",
            "simTipas": "dance",
            "kognityvineApkrova": "3–4 žingsniai, lėtas tempas.",
            "ux": "Veiksmai rodomi kaip didelės figūros, o garsas ir judesys sinchronizuoti (P06).",
            "evidence": ["P45", "P06"],
            "pastaba": "Šokio bendroji programa nebuvo išgauta kartu su kitomis 9 programomis, todėl kodas žymimas kaip integruotas su fiziniu ugdymu, o ne kaip atskiras BP punktas.",
        },
    ),
    "konstruoju": (
        ["Technologijos 23.3.3"],
        "Sprendimo įgyvendinimas ar prototipavimas",
        "privaloma",
        "Vaikas pastato konstrukciją, kuri išlaiko bent vieną papildomą detalę, ir paaiškina, kas ją laiko.",
        ["P16", "P14"],
        {
            "branduolineIdeja": "Konstrukcija laikosi, kai turi atramą ir tvirtą pagrindą.",
            "simTipas": "build",
            "kognityvineApkrova": "Viena medžiaga ir vienas tikslas (bokštas, tiltas).",
            "ux": "Griūtis parodoma švelniai, be garso ir be „pralaimėjimo“ ekrano.",
            "evidence": ["P16", "P14"],
        },
    ),
}


def main() -> int:
    changed = 0
    missing = []
    for d in sorted(MODULES.iterdir()):
        mf = d / "module.json"
        if not mf.exists():
            continue
        m = json.loads(mf.read_text(encoding="utf-8"))
        mid = m["id"]
        if mid not in DATA:
            missing.append(mid)
            continue
        codes, area, status, outcome, evidence, notes = DATA[mid]
        m["curriculum"]["codes"] = codes
        m["curriculum"]["area"] = area
        m["curriculum"]["status"] = status
        m["outcome"] = outcome
        m["designNotes"] = notes

        s1 = list(BASE_S1)
        if any(a.get("type") == "quiz" for a in m["activities"]):
            s1 += ["S1-05", "S1-12", "S1-13"]
        if mid in {"akmenu-zaidimas"}:
            s1 += ["S1-11"]
        if status == "papildoma":
            s1 += ["S1-04"]
        if m["subject"] in {"matematika", "lietuviu"}:
            s1 += ["S1-09"]
        m["s1"] = s1

        mf.write_text(
            json.dumps(m, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
        )
        changed += 1

    print(f"Atnaujinta modulių: {changed}")
    if missing:
        print("BE METADUOMENŲ:", ", ".join(missing))
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
