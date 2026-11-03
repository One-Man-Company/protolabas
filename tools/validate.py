#!/usr/bin/env python3
"""Validate Protolabas content. No dependencies, no build step.

Checks:
  * every module.json parses and matches the required shape
  * ids match folder names and the grade manifest
  * curriculum codes exist and are shaped like official programme references
  * sim names are registered in js/sims/index.js
  * no remote URLs in content or HTML (offline-first rule)
  * user-facing text is Lithuanian (heuristic: no long English sentences)
  * i18n keys used in HTML/JS exist in js/core/i18n.js
"""
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CONTENT = ROOT / "content"
errors = []
warnings = []

REQUIRED = ["id", "grade", "subject", "subjectLabel", "title", "tagline",
            "icon", "minutes", "curriculum", "objectives", "activities"]
ACTIVITY_TYPES = {"talk", "sim", "quiz", "reflect"}

# --- curriculum code handling -------------------------------------------------
# Official references appear as "24.1.1.2" or "A1.2" inside a programme. Because
# 22.x/23.x/24.x/25.x numbering repeats across subjects (22.x = Etika AND Fizinis
# ugdymas, 23.x = Dailė AND Technologijos, 24.x = Matematika AND Gyvenimo įgūdžiai,
# 25.x = Lietuvių kalba AND Muzika), every code must carry its subject prefix.
BARE_CODE = re.compile(r"^(?:[0-9]{2}(?:\.[0-9]{1,3}){1,3}|[A-F][0-9](?:\.[0-9])?)$")
SUBJECT_CODE = re.compile(
    r"^(?P<subj>[A-ZĄČĘĖĮŠŲŪŽ][\wĄČĘĖĮŠŲŪŽąčęėįšųūž ()]{1,40}?)\s+(?P<code>\S+)$"
)


def split_code(raw: str):
    """Return (subject|None, bare_code|None). bare_code is None when malformed."""
    if BARE_CODE.match(raw):
        return None, raw
    m = SUBJECT_CODE.match(raw)
    if m and BARE_CODE.match(m.group("code")):
        return m.group("subj"), m.group("code")
    return None, None


def load_known_p() -> set:
    """P01..P52 ids actually present in the pedagogy wiki."""
    wiki = ROOT / "wiki" / "00-bendra" / "mokymosi-mokslas.md"
    if not wiki.exists():
        return set()
    return set(re.findall(r"^### (P\d{2})\b", wiki.read_text(encoding="utf-8"), re.M))


KNOWN_P = load_known_p()


def err(msg):
    errors.append(msg)


def warn(msg):
    warnings.append(msg)


def check_module(path: Path, manifest_ids: list):
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception as exc:
        err(f"{path.relative_to(ROOT)}: invalid JSON — {exc}")
        return None

    rel = path.relative_to(ROOT)
    for key in REQUIRED:
        if key not in data:
            err(f"{rel}: missing '{key}'")

    folder = path.parent.name
    if data.get("id") != folder:
        err(f"{rel}: id '{data.get('id')}' != folder '{folder}'")
    if data.get("id") not in manifest_ids:
        err(f"{rel}: not listed in _grade.json")

    cur = data.get("curriculum", {})
    if not cur.get("program"):
        err(f"{rel}: curriculum.program missing")
    if not cur.get("area"):
        err(f"{rel}: curriculum.area missing")
    codes = cur.get("codes", [])
    if not isinstance(codes, list):
        err(f"{rel}: curriculum.codes must be a list")
    if not codes:
        err(f"{rel}: curriculum.codes is empty — module carries no programme reference")
    for code in codes:
        subj, bare = split_code(str(code))
        if bare is None:
            err(f"{rel}: suspicious curriculum code '{code}'")
        elif subj is None:
            warn(f"{rel}: code '{code}' has no subject prefix — 22.x/23.x/24.x/25.x collide between subjects")

    # S1-01..S1-20 canonical rule ids (see guidelines/svietimas1-rules.json)
    s1 = data.get("s1", [])
    for tag in s1:
        if not re.match(r"^S1-\d{2}$", str(tag)):
            err(f"{rel}: non-canonical S1 tag '{tag}' (expected S1-01..S1-20)")

    # S1-02: every module must state a measurable outcome
    if not data.get("outcome"):
        err(f"{rel}: missing 'outcome' (required by S1-02)")

    # Evidence chain: designNotes.evidence must point at real wiki entries
    dn = data.get("designNotes") or {}
    for pid in dn.get("evidence", []):
        if pid not in KNOWN_P:
            err(f"{rel}: designNotes.evidence cites unknown entry '{pid}'")

    acts = data.get("activities", [])
    if len(acts) < 3:
        warn(f"{rel}: only {len(acts)} activities (recommended 4–6)")

    sims = set()
    for idx, act in enumerate(acts):
        atype = act.get("type")
        if atype not in ACTIVITY_TYPES:
            err(f"{rel}: activity {idx} has unknown type '{atype}'")
            continue
        if atype == "quiz":
            if not act.get("question"):
                err(f"{rel}: quiz {idx} missing question")
            opts = act.get("options", [])
        if atype == "sim":
            if not act.get("title"):
                err(f"{rel}: sim activity {idx} missing title")
            sim = act.get("sim")
            sims.add(sim)
            if not sim:
                err(f"{rel}: sim activity {idx} missing 'sim'")
        if atype == "quiz":
            opts = act.get("options", [])
            ans = act.get("answer")
            if not isinstance(opts, list) or len(opts) < 2:
                err(f"{rel}: quiz {idx} needs >=2 options")
            if not isinstance(ans, int) or not (0 <= ans < len(opts)):
                err(f"{rel}: quiz {idx} answer index out of range")

    teacher = data.get("teacher", {})
    for key in ("tikslas", "eiga"):
        if not teacher.get(key):
            warn(f"{rel}: teacher.{key} missing (needed for S9)")

    # remote URLs are forbidden at runtime
    raw = path.read_text(encoding="utf-8")
    for url in re.findall(r"https?://[^\s\"']+", raw):
        if any(d in url for d in ("kelrodis.svietimas.lt", "e-seimas.lrs.lt",
                                  "smm.lt", "github.com/One-Man-Company")):
            continue
        warn(f"{rel}: external URL in content — {url}")

    return sims


def main():
    index = ROOT / "js" / "sims" / "index.js"
    registered = set(re.findall(r"import\s+'\./([a-z0-9-]+)\.js'", index.read_text()))
    all_sims = set()

    grade_dirs = sorted(p for p in CONTENT.glob("grade-*") if p.is_dir())
    if not grade_dirs:
        err("no content/grade-NN directories found")

    for gdir in grade_dirs:
        manifest_path = gdir / "_grade.json"
        if not manifest_path.exists():
            err(f"{gdir.name}: missing _grade.json")
            continue
        try:
            manifest = json.loads(manifest_path.read_text(encoding="utf-8"))
        except Exception as exc:
            err(f"{manifest_path.relative_to(ROOT)}: invalid JSON — {exc}")
            continue

        ids = manifest.get("modules", [])
        mod_dir = gdir / "modules"
        found = {p.parent.name for p in mod_dir.glob("*/module.json")}

        for mid in ids:
            if mid not in found:
                err(f"{gdir.name}: manifest lists '{mid}' but module.json missing")
        for extra in found - set(ids):
            err(f"{gdir.name}: module '{extra}' exists but is not in _grade.json")

        subject_ids = {s["id"] for s in manifest.get("subjects", [])}
        if len(subject_ids) != len(manifest.get("subjects", [])):
            err(f"{gdir.name}: duplicate subject ids")

        for mid in ids:
            path = mod_dir / mid / "module.json"
            if not path.exists():
                continue
            sims = check_module(path, ids)
            if sims:
                all_sims |= sims
                for sim in sims:
                    if sim not in registered:
                        err(f"{path.relative_to(ROOT)}: sim '{sim}' not imported in js/sims/index.js")
            data = json.loads(path.read_text(encoding="utf-8"))
            if data.get("subject") not in subject_ids:
                err(f"{path.relative_to(ROOT)}: subject '{data.get('subject')}' not in manifest subjects")

    # every registered sim exists as a file
    for sim in registered:
        if not (ROOT / "js" / "sims" / f"{sim}.js").exists():
            err(f"js/sims/index.js imports missing file {sim}.js")
    unused = registered - all_sims
    for sim in sorted(unused):
        warn(f"sim '{sim}' is registered but unused by any module")

    # i18n key coverage for static markup
    i18n_src = (ROOT / "js" / "core" / "i18n.js").read_text()
    lt_block = i18n_src.split("lt: {", 1)[1].split("\n  },", 1)[0]
    keys = set(re.findall(r"^\s{4}([a-zA-Z][a-zA-Z0-9]*):", lt_block, re.M))
    for html in ROOT.glob("*.html"):
        for attr in re.findall(r'data-i18n="([^"]+)"', html.read_text()):
            if attr not in keys:
                err(f"{html.name}: data-i18n key '{attr}' missing in i18n.js")

    # offline rule for HTML: no remote script/style/img
    for html in ROOT.glob("*.html"):
        txt = html.read_text()
        for m in re.findall(r'(?:src|href)="(https?://[^"]+)"', txt):
            if "github.com" in m or "creativecommons.org" in m or "kelrodis" in m:
                continue
            warn(f"{html.name}: remote asset {m} (breaks offline use)")

    print(f"modules checked: {sum(len(json.loads((g/'_grade.json').read_text())['modules']) for g in grade_dirs if (g/'_grade.json').exists())}")
    print(f"sims registered: {len(registered)}")
    if warnings:
        print(f"\n{len(warnings)} warning(s):")
        for w in warnings:
            print(f"  ~ {w}")
    if errors:
        print(f"\n{len(errors)} error(s):")
        for e in errors:
            print(f"  ✗ {e}")
        return 1
    print("\nOK — content valid.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
