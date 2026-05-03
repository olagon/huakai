#!/usr/bin/env python3
"""
Final patch for the last 2 stragglers. Uses the Wikipedia article's
og:image meta tag, which is the most reliable image source for any
Wikipedia page that has an image (works even when summary API fails).

USAGE
    cd "/Library/WebServer/Documents/ahupuaa"
    source .venv/bin/activate
    python3 patch_last_two.py
    python3 download_images.py
"""

import re
import sys
import urllib.parse
from pathlib import Path

import requests

sys.path.insert(0, str(Path(__file__).parent))
from download_images import parse_locations, write_locations_js, LOCATIONS_FILE

USER_AGENT = "MokuMatch/1.0 (https://github.com/olagon/MokuMatch)"

# landmark name -> Wikipedia article slug to scrape
LAST_TWO = {
    "Hoʻokipa Beach":        "Ho%CA%BBokipa",
    "Kula Botanical Garden": "Kula_Botanical_Garden",
}

def og_image(slug):
    url = f"https://en.wikipedia.org/wiki/{slug}"
    r = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=20)
    if r.status_code != 200:
        return None
    # First try og:image
    m = re.search(r'<meta\s+property="og:image"\s+content="([^"]+)"', r.text)
    if m:
        # Often a thumbnail; replace /thumb/<a>/<ab>/<file>/<n>px-<file> with original
        thumb_url = m.group(1)
        # Strip the /thumb/ prefix and trailing thumb size to get the original
        orig = re.sub(r"/thumb/(.+)/\d+px-[^/]+$", r"/\1", thumb_url)
        return orig
    return None

def main():
    locations = parse_locations(LOCATIONS_FILE)
    by_name   = {l["name"]: l for l in locations}
    updated = 0
    for name, slug in LAST_TWO.items():
        loc = by_name.get(name)
        if not loc:
            print(f"  not in dataset: {name}")
            continue
        if loc["img"].startswith("images/"):
            print(f"  already local: {name}")
            continue
        print(f"• {name}  →  {slug}")
        url = og_image(slug)
        if url:
            print(f"    {url}")
            loc["img"] = url
            updated += 1
        else:
            print(f"    no og:image found")

    if updated:
        write_locations_js(locations, LOCATIONS_FILE)
        print(f"\nPatched {updated}. Now run: python3 download_images.py")

if __name__ == "__main__":
    main()
