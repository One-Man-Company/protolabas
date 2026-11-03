#!/usr/bin/env python3
"""Protolabas sveikatos patikra. Be priklausomybių, be tinklo.

Paleidžiama rankiniu būdu ir iš suplanuotų agentų (agents/README.md).

  python3 tools/health.py            # žmogui skaitoma ataskaita
  python3 tools/health.py --json     # mašinai skaitoma
  python3 tools/health.py --strict   # įspėjimai laikomi klaidomis

Išėjimo kodas: 0 – sveika, 1 – yra klaidų, 2 – tik įspėjimai (be --strict).
"""
from __future__ import annotations

import json
import re
import subprocess
import sys
import time
from collections import Counter, defaultdict
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
WIKI = ROOT / "wiki"
REPORTS = ROOT / "reports"

SUBJECTS = [
    "lietuviu", "matematika", "gamta", "visuomeninis", "dorinis", "daile",
    "muzika", "choras", "fizinis", "sokis", "informatika", "technologijos",
]

errors: list[str] = []
warnings: list[str] = []
info: dict = {}


def err(m: str) -> None:
    errors.append(m)


def warn(m: str) -> None:
    warnings.append(m)


# ---------------------------------------------------------------- modules ----
def load_modules() -> list[dict]:
    out = []
    for p in sorted(CONTENT.glob("grade-*/modules/*/module.json")):
        try:
            d = json.loads(p.read_text(encoding="utf-8"))
            d["_path"] = str(p.relative_to(ROOT))
            out.append(d)
        except Exception as exc:
            err(f"{p.relative_to(ROOT)}: neteisingas JSON — {exc}")
    return out


def registered_sims() -> set[str]:
    f = ROOT / "js" / "sims" / "index.js"
    if not f.exists():
        err("js/sims/index.js nerastas")
        return set()
    # sims are registered by side-effect import: import './tenframe.js';
    txt = f.read_text(encoding="utf-8")
    return set(re.findall(r"import\s+['\"]\./([\w-]+)\.js['\"]", txt))


def check_modules(mods: list[dict], sims: set[str]) -> None:
    seen_ids: set[str] = set()
    for m in mods:
        rel = m.get("_path", "?")
        mid = m.get("id", "?")
        if mid in seen_ids:
            err(f"{rel}: dubliuotas id '{mid}'")
        seen_ids.add(mid)

        for field in ("outcome", "designNotes", "teacher", "curriculum"):
            if not m.get(field):
                err(f"{rel}: trūksta '{field}'")

        cur = m.get("curriculum") or {}
        if not cur.get("codes"):
            err(f"{rel}: curriculum.codes tuščias (S1-14)")
        if cur.get("status") not in ("privaloma", "papildoma"):
            err(f"{rel}: curriculum.status turi būti privaloma|papildoma (S1-04)")

        dn = m.get("designNotes") or {}
        if not dn.get("evidence"):
            warn(f"{rel}: designNotes.evidence tuščias — įrodymų grandinė nutrūkusi")

        acts = m.get("activities") or []
        if not 3 <= len(acts) <= 8:
            warn(f"{rel}: {len(acts)} veiklos (rekomenduojama 3–8, S1-01)")
        if not any(a.get("type") == "reflect" for a in acts):
            warn(f"{rel}: nėra refleksijos veiklos (S1-12)")
        if not any(a.get("type") == "sim" for a in acts):
            err(f"{rel}: nėra simuliacijos — modulis ne interaktyvus")
        for a in acts:
            if a.get("type") == "sim" and a.get("sim") not in sims:
                err(f"{rel}: simuliacija '{a.get('sim')}' neregistruota js/sims/index.js")

        mins = m.get("minutes")
        if isinstance(mins, int) and mins > 12:
            warn(f"{rel}: {mins} min. — 1–2 klasei ilga sesija (P49)")

        if m.get("grade") == 1 and cur.get("status") == "papildoma":
            info.setdefault("papildomi", []).append(mid)


def check_coverage(mods: list[dict]) -> None:
    by_subj = Counter(m.get("subject") for m in mods)
    missing = [s for s in SUBJECTS if s not in by_subj]
    info["moduliai"] = len(mods)
    info["dalyviai"] = dict(by_subj)
    info["truksta_dalyku"] = missing
    for s in missing:
        warn(f"nėra nė vieno modulio dalykui '{s}'")

    grades = sorted({m.get("grade") for m in mods if m.get("grade") is not None})
    info["klases"] = grades
    if grades != [1]:
        warn(f"turinys yra {len(grades)} klasėms: {grades} (tiketasi [1])")


def check_s1(mods: list[dict]) -> None:
    rules_file = ROOT / "guidelines" / "svietimas1-rules.json"
    if not rules_file.exists():
        err("guidelines/svietimas1-rules.json nerastas")
        return
    rules = json.loads(rules_file.read_text(encoding="utf-8"))["rules"]
    known = {r["id"] for r in rules}
    used: Counter = Counter()
    for m in mods:
        for tag in m.get("s1", []):
            if tag not in known:
                err(f"{m.get('id')}: nežinomas S1 ID '{tag}'")
            used[tag] += 1
    unused = sorted(known - set(used))

    # Platform-level rules live in guidelines/platform-compliance.json instead of
    # in every module. Their evidence paths must exist — a doc pointer to a deleted
    # file is worse than no pointer.
    plat_file = ROOT / "guidelines" / "platform-compliance.json"
    platform: dict[str, list[str]] = {}
    if plat_file.exists():
        for r in json.loads(plat_file.read_text(encoding="utf-8")).get("rules", []):
            rid = r.get("id")
            if rid not in known:
                err(f"platform-compliance.json: nežinomas S1 ID '{rid}'")
                continue
            ev = r.get("evidence", [])
            if not ev:
                err(f"platform-compliance.json: {rid} neturi evidence")
            for path in ev:
                if not (ROOT / path).exists():
                    err(f"platform-compliance.json: {rid} nurodo neegzistuojantį '{path}'")
            platform[rid] = ev
    else:
        warn("guidelines/platform-compliance.json nerastas")

    uncovered = [r for r in unused if r not in platform]
    info["s1_taisykles"] = len(known)
    info["s1_panaudotos"] = len(used)
    info["s1_platformos"] = len(platform)
    info["s1_nepanaudotos"] = uncovered
    if uncovered:
        warn(f"S1 taisyklės be jokio padengimo: {', '.join(uncovered)}")


def check_wiki() -> None:
    seed = WIKI / "00-bendra" / "mokymosi-mokslas.md"
    if not seed.exists():
        err("wiki/00-bendra/mokymosi-mokslas.md nerastas")
        return
    txt = seed.read_text(encoding="utf-8")
    entries = re.findall(r"^### (P\d{2})\b", txt, re.M)
    info["wiki_irasiai"] = len(entries)
    dup = [k for k, v in Counter(entries).items() if v > 1]
    if dup:
        err(f"wiki: dubliuoti įrašai {dup}")

    grades = []
    for g in range(1, 13):
        f = WIKI / f"{g:02d}-klase" / "README.md"
        if f.exists():
            body = f.read_text(encoding="utf-8")
            if "RENGIAMA" not in body[:400]:
                grades.append(g)
    info["wiki_klases_su_turiniu"] = grades

    after = time.time() - 180 * 86400
    stale = [
        str(p.relative_to(ROOT))
        for p in WIKI.rglob("*.md")
        if p.stat().st_mtime < after
    ]
    if stale:
        warn(f"wiki įrašai nepildyti >180 d.: {len(stale)} failas(-ai)")


def check_links() -> None:
    pages = list(ROOT.glob("*.html"))
    broken = []
    for page in pages:
        html = page.read_text(encoding="utf-8")
        for href in re.findall(r'(?:href|src)="([^"#:]+)"', html):
            if href.startswith(("http", "//", "data:", "mailto:")):
                continue
            target = (page.parent / href).resolve()
            if not target.exists():
                broken.append(f"{page.name} → {href}")
    info["html_puslapiai"] = [p.name for p in pages]
    for b in broken:
        err(f"nutraukta nuoroda: {b}")

    # Only runtime network use counts; schema $ids and comment URLs are harmless.
    NET = re.compile(r"fetch\(\s*[\x60'\"]https?:|XMLHttpRequest|\bsrc=\"https?:|\bhref=\"https?:|@import\s+url\(https?:")
    remote = []
    for pat in ("content/**/*.json", "js/**/*.js", "js/**/*.mjs", "css/*.css"):
        for f in ROOT.glob(pat):
            if NET.search(f.read_text(encoding="utf-8", errors="ignore")):
                remote.append(str(f.relative_to(ROOT)))
    if remote:
        warn(f"nuorodos į internetą (offline-first pažeidimas): {remote}")


def check_a11y() -> None:
    """Every page needs exactly one <h1>; screen-reader users navigate by heading."""
    for page in ROOT.glob("*.html"):
        html = page.read_text(encoding="utf-8")
        n = len(re.findall(r"<h1[\s>]", html, re.I))
        if n != 1:
            err(f"{page.name}: <h1> skaičius {n} (turi būti 1)")


def check_pages() -> None:
    """GitHub Pages runs Jekyll unless .nojekyll exists, and Jekyll skips every
    path starting with '_' — including content/grade-NN/_grade.json. That breaks
    the live hub while local preview still works, so it must be checked."""
    if not (ROOT / ".nojekyll").exists():
        err("trūksta .nojekyll — GitHub Pages (Jekyll) ignoruos _grade.json ir hub bus tuščias")
    manifests = list(CONTENT.glob("grade-*/_grade.json"))
    info["manifestai"] = len(manifests)
    if not manifests:
        err("nerastas nė vienas content/grade-NN/_grade.json")
    for mf in manifests:
        try:
            d = json.loads(mf.read_text(encoding="utf-8"))
        except Exception as exc:
            err(f"{mf.relative_to(ROOT)}: neteisingas JSON — {exc}")
            continue
        ids = d.get("modules") or d.get("moduleIds") or []
        if not ids:
            err(f"{mf.relative_to(ROOT)}: modules sąrašas tuščias")


def run_validate() -> None:
    f = ROOT / "tools" / "validate.py"
    r = subprocess.run([sys.executable, str(f)], capture_output=True, text=True, cwd=ROOT)
    info["validator"] = "OK" if r.returncode == 0 else "FAIL"
    if r.returncode != 0:
        for line in (r.stdout or "").splitlines():
            if line.strip().startswith("✗"):
                err("validator: " + line.strip()[2:])


# --------------------------------------------------------------- report ------
def render() -> str:
    L = []
    L.append("# Protolabas sveikatos ataskaita\n")
    L.append(f"*Sugeneruota: {time.strftime('%Y-%m-%d %H:%M')} · `tools/health.py`*\n")
    verdict = "✅ SVEIKA" if not errors else f"❌ {len(errors)} klaida(-os)"
    L.append(f"**Būsena:** {verdict} · įspėjimai: {len(warnings)}\n")
    L.append("## Skaičiai\n")
    L.append("| Rodiklis | Reikšmė |")
    L.append("|---|---|")
    for k, v in info.items():
        if isinstance(v, list) and len(v) > 8:
            v = f"{len(v)} vnt."
        L.append(f"| {k} | {v} |")
    if errors:
        L.append("\n## Klaidos (blokuoja publikavimą)\n")
        for e in errors:
            L.append(f"- {e}")
    if warnings:
        L.append("\n## Įspėjimai (neblokuoja)\n")
        for w in warnings:
            L.append(f"- {w}")
    if not errors and not warnings:
        L.append("\nProblemų nerasta.")
    return "\n".join(L) + "\n"


def main() -> int:
    strict = "--strict" in sys.argv
    sims = registered_sims()
    mods = load_modules()
    check_modules(mods, sims)
    check_coverage(mods)
    check_s1(mods)
    check_wiki()
    check_links()
    check_a11y()
    check_pages()
    run_validate()

    payload = {
        "generated": time.strftime("%Y-%m-%dT%H:%M:%S"),
        "ok": not errors,
        "errors": errors,
        "warnings": warnings,
        "stats": info,
    }
    REPORTS.mkdir(exist_ok=True)
    (REPORTS / "health.json").write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8"
    )
    (REPORTS / "health.md").write_text(render(), encoding="utf-8")

    if "--json" in sys.argv:
        print(json.dumps(payload, ensure_ascii=False, indent=2))
    else:
        print(render())

    if errors:
        return 1
    if warnings and strict:
        return 1
    return 2 if warnings else 0


if __name__ == "__main__":
    sys.exit(main())
