#!/usr/bin/env python3
"""
Huakaʻi: download every image referenced in data/locations.js,
resize, save locally to /images/, and rewrite data/locations.js to
point at the local copies.

USAGE
    cd "/Library/WebServer/Documents/ahupuaa"
    pip3 install --user requests pillow     # one time
    python3 download_images.py

WHAT IT DOES
    * Reads data/locations.js (parses the JS array).
    * For each entry, downloads the image at "img" with a real User-Agent.
    * Resizes to MAX_WIDTH (1200px) and saves as JPEG quality 82.
    * File path: images/<island-slug>/<name-slug>.jpg
    * Rewrites data/locations.js so "img" points at the local path.
    * Generates IMAGE_CREDITS.md with full attribution per file.
    * Writes image_failures.txt listing anything that 404'd or failed,
      so we can find replacements together.

SAFE TO RE-RUN
    Existing local files are skipped (no re-download).
    Failed entries keep their original remote URL in locations.js so
    the game still runs while you find replacements.
"""

import json
import os
import re
import sys
import time
import unicodedata
from io import BytesIO
from pathlib import Path

# ---- Dependencies check ----
try:
    import requests
except ImportError:
    print("Missing 'requests'. Run: pip3 install --user requests pillow")
    sys.exit(1)
try:
    from PIL import Image
except ImportError:
    print("Missing 'Pillow'. Run: pip3 install --user requests pillow")
    sys.exit(1)

# ---- Config ----
ROOT             = Path(__file__).parent
LOCATIONS_FILE   = ROOT / "data" / "locations.js"
IMAGES_DIR       = ROOT / "images"
CREDITS_FILE     = ROOT / "IMAGE_CREDITS.md"
FAILURES_FILE    = ROOT / "image_failures.txt"
MAX_WIDTH        = 1200          # px
JPEG_QUALITY     = 82
HTTP_TIMEOUT     = 25            # seconds
USER_AGENT       = "MokuMatch/1.0 (https://github.com/olagon/MokuMatch; contact via LinkedIn olinlagon)"

# ---- Parse locations.js ----
def _strip_js_comments(src: str) -> str:
    """Remove // and /* */ JS comments, but ignore them inside string literals."""
    out = []
    i = 0
    n = len(src)
    while i < n:
        c = src[i]
        # String literal (double or single quoted) — copy verbatim
        if c == '"' or c == "'":
            quote = c
            out.append(c); i += 1
            while i < n:
                ch = src[i]
                if ch == "\\" and i + 1 < n:
                    out.append(ch); out.append(src[i+1]); i += 2; continue
                out.append(ch); i += 1
                if ch == quote:
                    break
            continue
        # Line comment
        if c == "/" and i + 1 < n and src[i+1] == "/":
            while i < n and src[i] != "\n":
                i += 1
            continue
        # Block comment
        if c == "/" and i + 1 < n and src[i+1] == "*":
            i += 2
            while i + 1 < n and not (src[i] == "*" and src[i+1] == "/"):
                i += 1
            i += 2
            continue
        out.append(c); i += 1
    return "".join(out)

def parse_locations(path: Path):
    text = path.read_text(encoding="utf-8")
    # Strip JS comments first (string-aware), then locate the array.
    cleaned = _strip_js_comments(text)
    m = re.search(r"window\.LOCATIONS\s*=\s*\[", cleaned)
    if not m:
        raise ValueError("Could not find 'window.LOCATIONS = [' in " + str(path))
    start = m.end() - 1                      # position of the [
    # Bracket-aware scan, also string-aware (comments already gone)
    depth = 0
    in_str = False
    str_ch = None
    i = start
    end = -1
    while i < len(cleaned):
        c = cleaned[i]
        if in_str:
            if c == "\\":
                i += 2
                continue
            if c == str_ch:
                in_str = False
        else:
            if c == '"' or c == "'":
                in_str = True; str_ch = c
            elif c == "[":
                depth += 1
            elif c == "]":
                depth -= 1
                if depth == 0:
                    end = i + 1
                    break
        i += 1
    if end < 0:
        raise ValueError("Unbalanced brackets in locations array")

    array_src = cleaned[start:end]
    # Drop trailing commas (JS allows, JSON does not)
    array_src = re.sub(r",(\s*[}\]])", r"\1", array_src)
    return json.loads(array_src)

# ---- Filename helpers ----
def slugify(s: str) -> str:
    s = unicodedata.normalize("NFKD", s)
    s = "".join(c for c in s if not unicodedata.combining(c))
    s = s.replace("ʻ", "").replace("ʼ", "").replace("'", "").replace("ʹ", "")
    s = s.lower()
    s = re.sub(r"[^a-z0-9\-]+", "-", s)
    s = re.sub(r"-+", "-", s).strip("-")
    return s or "unnamed"

# ---- Download + process ----
def fetch_and_save(url: str, dest: Path):
    headers = {"User-Agent": USER_AGENT, "Accept": "image/*,*/*;q=0.8"}
    # Try up to 3 times if rate-limited (HTTP 429)
    for attempt in range(3):
        r = requests.get(url, headers=headers, allow_redirects=True, timeout=HTTP_TIMEOUT)
        if r.status_code == 429:
            wait = int(r.headers.get("Retry-After", "30"))
            wait = min(max(wait, 5), 60)
            time.sleep(wait)
            continue
        break
    if r.status_code != 200:
        return False, f"HTTP {r.status_code}"
    data = r.content
    if len(data) < 800:
        return False, f"too small ({len(data)} bytes)"
    try:
        img = Image.open(BytesIO(data))
        img.load()
    except Exception as e:
        return False, f"not an image: {e}"
    # Flatten to RGB on a soft cream background
    if img.mode != "RGB":
        if img.mode == "P":
            img = img.convert("RGBA")
        if img.mode in ("RGBA", "LA"):
            bg = Image.new("RGB", img.size, (250, 247, 242))
            bg.paste(img, mask=img.split()[-1])
            img = bg
        else:
            img = img.convert("RGB")
    # Resize keeping aspect ratio
    if img.width > MAX_WIDTH:
        new_h = int(round(img.height * (MAX_WIDTH / img.width)))
        img = img.resize((MAX_WIDTH, new_h), Image.LANCZOS)
    dest.parent.mkdir(parents=True, exist_ok=True)
    img.save(dest, "JPEG", quality=JPEG_QUALITY, optimize=True, progressive=True)
    return True, f"{dest.stat().st_size // 1024} KB"

# ---- Output writers ----
def write_locations_js(locations, path: Path):
    lines = [
        "// Huakaʻi: location dataset",
        "// Images downloaded once and hosted locally in /images/.",
        "// Original photographer credit preserved on each photo (see attribution).",
        "// Full attribution table: IMAGE_CREDITS.md",
        "//",
        "// Loaded as a script tag before the game logic. Sets window.LOCATIONS.",
        "",
        "window.LOCATIONS = [",
    ]
    for i, loc in enumerate(locations):
        block  = "    {\n"
        block += f'        "name": {json.dumps(loc["name"], ensure_ascii=False)},\n'
        block += f'        "island": {json.dumps(loc["island"], ensure_ascii=False)},\n'
        block += f'        "moku": {json.dumps(loc["moku"], ensure_ascii=False)},\n'
        block += f'        "ahupuaa": {json.dumps(loc["ahupuaa"], ensure_ascii=False)},\n'
        block += f'        "coords": {json.dumps(loc["coords"])},\n'
        block += f'        "img": {json.dumps(loc["img"], ensure_ascii=False)},\n'
        block += f'        "attribution": {json.dumps(loc["attribution"], ensure_ascii=False)}\n'
        block += "    }"
        if i < len(locations) - 1:
            block += ","
        lines.append(block)
    lines.append("];")
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")

def write_credits(locations, path: Path):
    lines = [
        "# Huakaʻi: Image Credits",
        "",
        "Every photo in `/images/` is a copy of an originally-hosted file,",
        "downloaded once for stability. Each remains under the license of",
        "its original photographer. Mahalo to everyone who shared their work.",
        "",
        "| Local file | Place | Island | Credit / License |",
        "| --- | --- | --- | --- |",
    ]
    for loc in sorted(locations, key=lambda x: (x["island"], x["name"])):
        if not str(loc["img"]).startswith("images/"):
            continue
        lines.append(
            "| `{img}` | {name} | {island} | {attr} |".format(
                img=loc["img"],
                name=loc["name"].replace("|", "/"),
                island=loc["island"],
                attr=loc["attribution"].replace("|", "/"),
            )
        )
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")

def write_failures(failures, path: Path):
    if not failures:
        if path.exists():
            path.unlink()
        return
    lines = [
        f"Huakaʻi: {len(failures)} image(s) failed to download.",
        "Paste this list back to Claude so we can find replacements.",
        "",
    ]
    for loc, reason in failures:
        lines.append(f"- {loc['name']}  ({loc['island']} / {loc['moku']} / {loc['ahupuaa']})")
        lines.append(f"  reason: {reason}")
        lines.append(f"  url:    {loc['img']}")
        lines.append("")
    path.write_text("\n".join(lines), encoding="utf-8")

# ---- Main ----
def main():
    print("Huakaʻi image downloader\n")

    if not LOCATIONS_FILE.exists():
        print(f"Could not find {LOCATIONS_FILE}")
        sys.exit(1)

    print(f"Reading {LOCATIONS_FILE.relative_to(ROOT)}…")
    locations = parse_locations(LOCATIONS_FILE)
    print(f"Loaded {len(locations)} entries.\n")

    IMAGES_DIR.mkdir(exist_ok=True)

    new_locations = []
    failures      = []
    skipped       = 0
    downloaded    = 0

    for idx, loc in enumerate(locations, start=1):
        url    = loc["img"]
        name   = loc["name"]
        island = loc["island"]

        # Already local?
        if str(url).startswith("images/"):
            new_locations.append(loc)
            skipped += 1
            continue

        rel = f"images/{slugify(island)}/{slugify(name)}.jpg"
        dest = ROOT / rel

        if dest.exists():
            new_loc = dict(loc); new_loc["img"] = rel
            new_locations.append(new_loc)
            skipped += 1
            continue

        prefix = f"[{idx:>3}/{len(locations)}] {name[:48]:<48}"
        print(prefix, end=" ", flush=True)

        try:
            ok, msg = fetch_and_save(url, dest)
        except requests.exceptions.RequestException as e:
            ok, msg = False, f"network: {str(e).splitlines()[0][:140]}"
        except Exception as e:
            ok, msg = False, f"error: {str(e).splitlines()[0][:140]}"

        if ok:
            print(f"OK   {msg}")
            new_loc = dict(loc); new_loc["img"] = rel
            new_locations.append(new_loc)
            downloaded += 1
        else:
            print(f"FAIL {msg}")
            new_locations.append(loc)   # keep original URL so game still works
            failures.append((loc, msg))
        # Throttle to stay under Wikimedia's rate limit (anonymous: ~5 req/s)
        time.sleep(0.4)

    print()
    print(f"Downloaded:  {downloaded}")
    print(f"Skipped:     {skipped} (already local or already on disk)")
    print(f"Failed:      {len(failures)}")
    print()

    print(f"Writing {LOCATIONS_FILE.relative_to(ROOT)}…")
    write_locations_js(new_locations, LOCATIONS_FILE)

    print(f"Writing {CREDITS_FILE.relative_to(ROOT)}…")
    write_credits(new_locations, CREDITS_FILE)

    write_failures(failures, FAILURES_FILE)
    if failures:
        print(f"Writing {FAILURES_FILE.relative_to(ROOT)} ({len(failures)} failures)")

    print("\nDone.\n")
    if failures:
        print("Open image_failures.txt and paste it into the chat so we can")
        print("find replacements (NPS, USGS, NOAA, NASA, or different Wikimedia files).")

if __name__ == "__main__":
    main()
