#!/usr/bin/env python3
"""
Moku Match: find replacement image URLs for entries whose original
Wikimedia URL 404'd.

USAGE
    cd "/Library/WebServer/Documents/ahupuaa"
    source .venv/bin/activate
    python3 find_replacement_images.py
    python3 download_images.py     # then actually downloads the new URLs

WHAT IT DOES
    For every entry in data/locations.js whose "img" field is still a
    remote URL on commons.wikimedia.org (i.e. not yet downloaded local),
    look up the corresponding Wikipedia article via Wikipedia's REST
    summary API. If that article has an infobox image, replace the
    "img" URL with the direct upload.wikimedia.org URL of that image.

    Wikipedia article images are guaranteed to exist on Commons because
    they are actively rendered on the article. Direct upload URLs are
    much more stable than Special:FilePath redirects.

    Falls back to a search query if the literal title doesn't match.
"""

import json
import re
import sys
import time
import urllib.parse
from pathlib import Path

try:
    import requests
except ImportError:
    print("Missing 'requests'. Run: pip install requests pillow")
    sys.exit(1)

# Reuse the parser from download_images.py so we don't duplicate
sys.path.insert(0, str(Path(__file__).parent))
from download_images import parse_locations, write_locations_js, ROOT, LOCATIONS_FILE

USER_AGENT  = "MokuMatch/1.0 (https://github.com/olagon/MokuMatch; via LinkedIn olinlagon)"
SUMMARY_API = "https://en.wikipedia.org/api/rest_v1/page/summary/{title}"
SEARCH_API  = "https://en.wikipedia.org/w/api.php"

# Best-guess Wikipedia article titles per landmark.
# When the literal landmark name doesn't match an article, a redirect
# usually saves us. If not, the search fallback kicks in.
WIKI_TITLES = {
    "Aloha Tower":                              "Aloha Tower",
    "Kawaiahaʻo Church":                        "Kawaiahaʻo Church",
    "Bishop Museum":                            "Bishop Museum",
    "Honolulu Hale (City Hall)":                "Honolulu Hale",
    "Washington Place":                         "Washington Place",
    "Honolulu Museum of Art":                   "Honolulu Museum of Art",
    "Lyon Arboretum":                           "Harold L. Lyon Arboretum",
    "Tantalus Lookout (Puʻu ʻUalakaʻa)":        "Puʻu ʻUalakaʻa State Park",
    "Koko Crater":                              "Koko Crater",
    "Kaniakapūpū Ruins":                        "Kaniakapūpū",
    "Kualoa Regional Park":                     "Kualoa Regional Park",
    "Polynesian Cultural Center":               "Polynesian Cultural Center",
    "Lāʻie Hawaiʻi Temple":                     "Laie Hawaii Temple",
    "Banzai Pipeline (ʻEhukai Beach)":          "Banzai Pipeline",
    "Sunset Beach":                             "Sunset Beach (Oahu)",
    "Waimea Bay":                               "Waimea Bay, Hawaii",
    "Waimea Valley":                            "Waimea Valley",
    "Dole Plantation":                          "Dole Food Company",
    "Mākaha Beach":                             "Makaha, Hawaii",
    "USS Missouri Memorial":                    "USS Missouri (BB-63)",
    "Mauna Loa":                                "Mauna Loa",
    "Halemaʻumaʻu Crater":                      "Halemaʻumaʻu",
    "Punaluʻu Black Sand Beach":                "Punaluʻu Beach",
    "Ka Lae (South Point)":                     "Ka Lae",
    "Green Sand Beach (Papakōlea)":             "Papakolea Beach",
    "Honokaʻa Town":                            "Honokaa, Hawaii",
    "Laupāhoehoe Point":                        "Laupāhoehoe, Hawaii",
    "Liliʻuokalani Park and Gardens":           "Liliʻuokalani Park and Gardens",
    "Coconut Island (Mokuola)":                 "Coconut Island (Hilo)",
    "Hilo Bay":                                 "Hilo Bay",
    "Kaunaʻoa Bay (Mauna Kea Beach)":           "Kaunaʻoa Bay",
    "Hulihee Palace":                           "Huliheʻe Palace",
    "Mokuʻaikaua Church":                       "Mokuaikaua Church",
    "Lāhainā Banyan Tree":                      "Banyan Court Park",
    "Waiola Church":                            "Waiola Church",
    "Honolua Bay":                              "Honolua Bay",
    "Kāʻanapali Beach":                         "Kaanapali, Hawaii",
    "Black Rock (Puʻu Kekaʻa)":                 "Puʻu Kekaʻa",
    "Nāpili Bay":                               "Napili-Honokowai, Hawaii",
    "Kahakuloa Head":                           "Kahakuloa, Hawaii",
    "Waiheʻe Ridge":                            "Waiheʻe-Waiehu, Hawaii",
    "Pāʻia Town":                               "Paia, Hawaii",
    "Hoʻokipa Beach":                           "Hoʻokipa Beach Park",
    "Keʻanae Peninsula":                        "Keanae, Hawaii",
    "Hāna Bay":                                 "Hana, Hawaii",
    "Hamoa Beach":                              "Hamoa Beach",
    "Wailea Beach":                             "Wailea, Hawaii",
    "Kula Botanical Garden":                    "Kula, Hawaii",
    "Hanapēpē Swinging Bridge":                 "Hanapepe, Hawaii",
    "Hanapēpē Town":                            "Hanapepe, Hawaii",
    "Kōloa Town":                               "Koloa, Hawaii",
    "Russian Fort Elizabeth":                   "Russian Fort Elizabeth State Historical Park",
    "Waimea Town (Kauaʻi)":                     "Waimea, Kauai County, Hawaii",
    "Polihale Beach":                           "Polihale State Park",
    "Kalalau Lookout":                          "Kalalau Valley",
    "Hāʻena State Park":                        "Hāʻena State Park",
    "Hanakāpīʻai Beach":                        "Hanakapiai Beach",
    "Hanalei Bay":                              "Hanalei Bay",
    "Kīlauea Point Wildlife Refuge":            "Kilauea Point National Wildlife Refuge",
    "Anahola Beach":                            "Anahola, Hawaii",
    "Nawiliwili Harbor":                        "Nawiliwili Bay",
}

def wiki_summary(title):
    url = SUMMARY_API.format(title=urllib.parse.quote(title, safe=''))
    try:
        r = requests.get(url, headers={"User-Agent": USER_AGENT}, timeout=20)
    except requests.exceptions.RequestException as e:
        return None, f"net: {e}"
    if r.status_code != 200:
        return None, f"HTTP {r.status_code}"
    return r.json(), None

def wiki_search(query):
    """Use the search API to find a likely article title."""
    params = {
        "action": "opensearch",
        "search": query,
        "limit": 1,
        "namespace": 0,
        "format": "json",
    }
    try:
        r = requests.get(SEARCH_API, params=params, headers={"User-Agent": USER_AGENT}, timeout=20)
    except requests.exceptions.RequestException:
        return None
    if r.status_code != 200:
        return None
    data = r.json()
    if isinstance(data, list) and len(data) >= 2 and data[1]:
        return data[1][0]
    return None

def find_image_for(landmark_name, island_hint):
    """Return a URL for the landmark's image, or None."""
    title = WIKI_TITLES.get(landmark_name, landmark_name)
    # First try the mapped title
    summary, err = wiki_summary(title)
    if summary and summary.get("originalimage", {}).get("source"):
        return summary["originalimage"]["source"], title
    # Fall back to search
    query = f"{landmark_name} Hawaii {island_hint}"
    found = wiki_search(query)
    if found and found != title:
        summary, err = wiki_summary(found)
        if summary and summary.get("originalimage", {}).get("source"):
            return summary["originalimage"]["source"], found
    return None, title

def main():
    print("Moku Match: replacement image finder\n")
    locations = parse_locations(LOCATIONS_FILE)
    print(f"Loaded {len(locations)} entries\n")

    updated = 0
    still_failing = []
    for idx, loc in enumerate(locations, start=1):
        img = loc["img"]
        # Skip already-local images (they were downloaded successfully)
        if img.startswith("images/"):
            continue
        # Skip entries whose URL doesn't look like our remote pattern
        if "commons.wikimedia.org" not in img:
            continue
        prefix = f"[{idx:>3}/{len(locations)}] {loc['name'][:46]:<46}"
        print(prefix, end=" ", flush=True)
        new_url, used_title = find_image_for(loc["name"], loc["island"])
        if new_url:
            loc["img"] = new_url
            print(f"OK   ({used_title})")
            updated += 1
        else:
            print("FAIL no image found")
            still_failing.append(loc["name"])
        time.sleep(0.25)        # gentle on the API

    print()
    print(f"Replaced URLs for: {updated}")
    print(f"Still no image:    {len(still_failing)}")

    if updated:
        print(f"\nWriting {LOCATIONS_FILE.relative_to(ROOT)}…")
        write_locations_js(locations, LOCATIONS_FILE)
        print("Now run: python3 download_images.py")

    if still_failing:
        print("\nNo Wikipedia image found for:")
        for name in still_failing:
            print(f"  - {name}")
        print("\nWe can either remove those entries or hand-pick alternate sources (NPS, USGS).")

if __name__ == "__main__":
    main()
