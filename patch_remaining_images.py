#!/usr/bin/env python3
"""
Huakaʻi: final cleanup for the last few entries that still have
no working image. Queries Wikimedia Commons category listings to
find a real file for each, then patches data/locations.js.

USAGE
    cd "/Library/WebServer/Documents/ahupuaa"
    source .venv/bin/activate
    python3 patch_remaining_images.py
    python3 download_images.py
"""

import sys
import time
from pathlib import Path

try:
    import requests
except ImportError:
    print("Run: pip install requests pillow")
    sys.exit(1)

sys.path.insert(0, str(Path(__file__).parent))
from download_images import parse_locations, write_locations_js, LOCATIONS_FILE

USER_AGENT  = "MokuMatch/1.0 (https://github.com/olagon/MokuMatch)"
COMMONS_API = "https://commons.wikimedia.org/w/api.php"
WIKI_PAGE   = "https://en.wikipedia.org/wiki/{}"

# For each landmark we still need, try these Commons category names in order.
# The script picks the first usable file (jpg/jpeg/png, not too tiny).
CATEGORIES = {
    "Tantalus Lookout (Puʻu ʻUalakaʻa)": [
        "Tantalus (Oahu)",
        "Pu'u 'Ualaka'a State Park",
    ],
    "Polynesian Cultural Center": [
        "Polynesian Cultural Center",
    ],
    "Coconut Island (Mokuola)": [
        "Coconut Island (Hilo, Hawaii)",
        "Mokuola",
        "Hilo Bay",
    ],
    "Lāhainā Banyan Tree": [
        "Lahaina Banyan Tree",
    ],
    "Black Rock (Puʻu Kekaʻa)": [
        "Pu'u Keka'a",
        "Kaanapali Beach",
    ],
    "Kahakuloa Head": [
        "Kahakuloa Head, Hawaii",
        "Kahakuloa Head",
        "Kahakuloa, Hawaii",
    ],
    "Hoʻokipa Beach": [
        "Hookipa Beach Park",
        "Ho'okipa",
    ],
    "Kula Botanical Garden": [
        "Kula Botanical Gardens",
    ],
}

# Files to skip (logos, charts, irrelevant)
SKIP_PATTERNS = ("logo", "map", "diagram", "ahupuaa", "chart")
SKIP_EXTS     = (".svg", ".gif", ".pdf", ".tif", ".tiff", ".webp")

def call_api(params):
    try:
        r = requests.get(COMMONS_API, params=params,
                         headers={"User-Agent": USER_AGENT}, timeout=20)
    except requests.exceptions.RequestException as e:
        return None
    if r.status_code != 200:
        return None
    return r.json()

def list_category_files(cat):
    """Return File:Foo.jpg titles in the given category, up to 50."""
    data = call_api({
        "action": "query",
        "list": "categorymembers",
        "cmtitle": f"Category:{cat}",
        "cmtype": "file",
        "cmlimit": 50,
        "format": "json",
    })
    if not data:
        return []
    return [m["title"] for m in data.get("query", {}).get("categorymembers", [])]

def file_info(title):
    """Get URL + dimensions for File:Foo.jpg title."""
    data = call_api({
        "action": "query",
        "titles": title,
        "prop": "imageinfo",
        "iiprop": "url|size",
        "format": "json",
    })
    if not data:
        return None
    pages = data.get("query", {}).get("pages", {})
    for p in pages.values():
        ii = p.get("imageinfo", [])
        if ii:
            return ii[0]
    return None

def is_usable(title, info):
    name = title.lower()
    if any(name.endswith(ext) for ext in SKIP_EXTS):
        return False
    if any(p in name for p in SKIP_PATTERNS):
        return False
    if not info or not info.get("url"):
        return False
    # Skip very small files (probably icons / thumbnails of charts)
    if info.get("width", 0) < 600 or info.get("height", 0) < 400:
        return False
    return True

def find_image_for(landmark, cats):
    for cat in cats:
        print(f"    looking in Category:{cat}…")
        files = list_category_files(cat)
        if not files:
            print(f"      (empty)")
            continue
        for fname in files:
            info = file_info(fname)
            if is_usable(fname, info):
                print(f"      pick: {fname}  ({info['width']}x{info['height']})")
                return info["url"]
            time.sleep(0.15)
        print(f"      no usable file in this category")
    return None

def main():
    print("Huakaʻi: final image patcher\n")
    locations = parse_locations(LOCATIONS_FILE)
    by_name   = {l["name"]: l for l in locations}

    updated = 0
    failed  = []
    for name, cats in CATEGORIES.items():
        loc = by_name.get(name)
        if not loc:
            print(f"  not in dataset: {name}")
            continue
        if loc["img"].startswith("images/"):
            print(f"  already local: {name}")
            continue
        print(f"\n• {name}")
        url = find_image_for(name, cats)
        if url:
            loc["img"] = url
            updated += 1
        else:
            failed.append(name)

    print(f"\n--- Summary ---")
    print(f"Patched: {updated}")
    if failed:
        print(f"Could not find: {len(failed)}")
        for f in failed:
            print(f"  - {f}")

    if updated:
        write_locations_js(locations, LOCATIONS_FILE)
        print("\nWrote data/locations.js. Now run: python3 download_images.py")

if __name__ == "__main__":
    main()
