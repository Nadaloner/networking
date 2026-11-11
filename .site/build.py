#!/usr/bin/env python3
"""Build the static notes site.

Usage: python3 .site/build.py [NOTES_DIR] [OUT_DIR]
  NOTES_DIR defaults to the folder containing .site/
  OUT_DIR   defaults to NOTES_DIR/_site

Collects every Markdown note into notes.json and copies the site shell
(index.html, app.js, style.css) plus any attachments (images, PDFs).
Standard library only, so it runs anywhere Python 3 does.
"""
import json
import pathlib
import re
import shutil
import sys
from datetime import datetime, timezone

HERE = pathlib.Path(__file__).resolve().parent
SRC = pathlib.Path(sys.argv[1]).resolve() if len(sys.argv) > 1 else HERE.parent
OUT = pathlib.Path(sys.argv[2]).resolve() if len(sys.argv) > 2 else SRC / "_site"
CONFIG = json.loads((HERE / "config.json").read_text(encoding="utf-8"))

ATTACH_EXT = {".png", ".jpg", ".jpeg", ".gif", ".svg", ".webp", ".pdf"}
SKIP_NAMES = {"README.md"}


def skipped(p: pathlib.Path) -> bool:
    rel = p.relative_to(SRC).parts
    return any(part.startswith((".", "_")) for part in rel) or p.name in SKIP_NAMES


def parse_list(value: str):
    value = value.strip()
    if value.startswith("[") and value.endswith("]"):
        value = value[1:-1]
    return [v.strip().strip("\"'") for v in value.split(",") if v.strip()]


def split_frontmatter(text: str):
    meta = {}
    m = re.match(r"^---\n(.*?)\n---\n?", text, re.S)
    if not m:
        return meta, text
    key = None
    for line in m.group(1).splitlines():
        kv = re.match(r"^([\w-]+):\s*(.*)$", line)
        if kv:
            key, val = kv.group(1), kv.group(2)
            meta[key] = parse_list(val) if val.strip() else []
        elif key and re.match(r"^\s*-\s+", line):
            meta[key].append(line.split("-", 1)[1].strip().strip("\"'"))
    return meta, text[m.end():]


def main():
    if OUT.exists():
        shutil.rmtree(OUT)
    (OUT / "files").mkdir(parents=True)

    notes = []
    for p in sorted(SRC.rglob("*.md")):
        if skipped(p) or OUT in p.parents:
            continue
        meta, body = split_frontmatter(p.read_text(encoding="utf-8"))
        notes.append({
            "name": p.stem,
            "path": str(p.relative_to(SRC)),
            "tags": meta.get("tags", []),
            "aliases": meta.get("aliases", []),
            "md": body,
        })

    for p in SRC.rglob("*"):
        if p.is_file() and p.suffix.lower() in ATTACH_EXT and not skipped(p) and OUT not in p.parents:
            shutil.copy2(p, OUT / "files" / p.name)

    data = {
        **CONFIG,
        "built": datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        "notes": notes,
    }
    (OUT / "notes.json").write_text(json.dumps(data, ensure_ascii=False), encoding="utf-8")
    for f in ("index.html", "app.js", "style.css"):
        shutil.copy2(HERE / f, OUT / f)
    (OUT / ".nojekyll").write_text("")
    print(f"Built {len(notes)} notes -> {OUT}")


if __name__ == "__main__":
    main()
