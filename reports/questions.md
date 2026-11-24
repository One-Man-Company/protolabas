# Klausimai, kuriems reikia žmogaus sprendimo

*2026-11-24 · content-architect / content-builder paleidimas (`agent/truksta-demens`)*

Šiame paleidime modulis `truksta-demens` pastatytas, nes jo kodas patvirtintas
(`research/curriculum-grade1.md` §2.1, 24 punktas; tikrinta pagal V-1269 20 priedą
2026-11-03). Toliau – tai, ko neišsprendžiau pats, ir ką reikia nuspręsti prieš
kitas ciklas.

## 1. Programos eilės 1–2 temos neįgyvendintos: nėra patvirtinto kodo

`research/curriculum-2026-11.md` §14 pirmos dvi vietos – lietuvių kalbos temos
(„Klausausi ir suprantu: kas atsitiko pirmiausia?“ 25.1.2–25.1.3 ir „Įgarsinta
paveikslėlių knyga“ 25.2.3). Abi pažymėtos „kodas nepatvirtintas“, nes
`research/curriculum-grade1.md` §0.3 teigia, kad lietuvių kalbos pasiekimo kodas
yra keturženklis (`A1.1.1`), o to paties failo §10 lentelė ir jau esami moduliai
(`raides-ir-garsai` → `D1.3`, `skaitau-zodzius` → `D2.2`) naudoja triženklį kodą
(žr. to paties research failo §13.5). Be šio sprendimo bet kuris naujas lietuvių
kalbos modulis arba išgalvotų kodą, arba pataisytų jau publikuotus modulius.

**Ko reikia:** vieno patvirtinto šaltinio – V-1269 13 priedo (lietuvių kalba ir
literatūra) pasiekimų kodų pavyzdžio – ir sprendimo, ar esami du lietuvių kalbos
moduliai žymimi `D1.3`/`D2.2` paliekami, ar taisomi.

## 2. Įrodymų bazėje trūksta P53–P64

`research/curriculum-2026-11.md` §14 remiasi P57, P59, P60, P61, P62, P63, P64,
tačiau `wiki/00-bendra/mokymosi-mokslas.md` šakoje nuo `main` turi tik **P01–P52**.
Naujesni įrašai egzistuoja tik kito agento neįtrauktame (uncommitted) darbe –
`main` jų neturi. Todėl `truksta-demens` specifikacijoje tema grindžiama P59, bet
`designNotes.evidence` P59 **necituoja**: `tools/validate.py` tokį įrašą atmeta
kaip neegzistuojantį, ir tai teisinga – citata į neegzistuojantį įrodymą yra
tuščia vieta, ne įrodymas.

**Ko reikia:** sujungti pedagogy-researcher darbo šaką su wiki papildymais
P53–P64, tada ciklo pabaigoje peržiūrėti, ar `truksta-demens` ir kiti moduliai
gali cituoti P59/P61/P62.

## 3. Pasiekimo kodas: `A1.3` ar `C1.4`

§14 eilutėje siūloma `24.1.1.2 / C1.4`. Modulis moko paprastos procedūros su
paaiškinimu, o `C1.4` yra „modeliuoja ir nenagrinėtas situacijas“ – aukščiausias
lygis. Todėl įrašiau `A1.3` („atlieka paprastas, konsultuodamasis paaiškina“),
tą patį kodą, kurį naudoja `palygink-skaicius`, ir vienu lygiu aukštesnį už
`sudetis-iki-10` (`A1.2`).

**Ką reikia patvirtinti:** ar `A1.3` priimtinas, ar peržiūroje reikalaujama
`C1.4`. Keisti reikia vieną lauką `content/grade-01/modules/truksta-demens/module.json`
(`curriculum.codes`) ir atitinkamą eilutę specifikacijoje.

## 4. DOX grandinės trūkis

Šakninis `AGENTS.md` nurodo `content/AGENTS.md`, `js/AGENTS.md`, `wiki/AGENTS.md`
kaip vaikinius dokumentus, bet nė vieno iš jų repozitorijoje nėra (tikrinta
`main` šakoje 2026-11-24). Šio paleidimo metu jų nekūriau: tai sutarties
dokumentai, kuriuos turi patvirtinti žmogus, o ne agentas, rašantis pagal save.

**Ko reikia:** nutarti, ar vaikiniai DOX failai kuriami agentų, ar rašomi ranka.
