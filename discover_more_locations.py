#!/usr/bin/env python3
"""
Huakaʻi: auto-discover new locations from Wikimedia Commons.

For each Hawaii-related Commons category, walk the files, pull GPS
coordinates from Commons metadata, and reverse-geocode the point
against the State of Hawaiʻi GIS ahupuaʻa layer to determine the
mokupuni, moku, and ahupuaʻa. Append each new entry to
data/locations.js.

USAGE
    cd "/Library/WebServer/Documents/ahupuaa"
    source .venv/bin/activate
    python3 discover_more_locations.py            # default target = 200
    python3 discover_more_locations.py 350        # target = 350

    # Then download the new images:
    python3 download_images.py

WHAT IT FILTERS OUT
    - Files without GPS coordinates
    - Non-Creative-Commons / non-public-domain licenses
    - NC, ND, fair use, all-rights-reserved
    - Files smaller than 800x500
    - Logos, maps, charts, diagrams (by filename)
    - Points outside any ahupuaʻa polygon (i.e. not on land in Hawaiʻi)
    - Duplicates of entries already in locations.js (by name OR by GPS within 50m)
"""

import math
import re
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
ARCGIS_URL  = "https://geodata.hawaii.gov/arcgis/rest/services/HistoricCultural/MapServer/1/query"

# Categories to walk. Order matters: earlier = first to be sampled.
SEED_CATEGORIES = [
    "Beaches of Oahu",
    "Beaches of Maui",
    "Beaches of Hawaii (island)",
    "Beaches of Kauai",
    "Beaches of Molokai",
    "Beaches of Lanai",
    "Waterfalls of Hawaii",
    "Mountains of Hawaii",
    "Volcanoes of Hawaii",
    "Heiau",
    "State parks of Hawaii",
    "National parks of Hawaii",
    "Hawaii Volcanoes National Park",
    "Haleakala National Park",
    "Bays of Hawaii",
    "Valleys of Hawaii",
    "Lighthouses in Hawaii",
    "Landmarks of Hawaii",
    "Pearl Harbor",
    "Diamond Head",
    "Waikiki",
    "Honolulu",
    "Hilo, Hawaii",
    "Kailua, Hawaii County, Hawaii",
    "Lahaina, Hawaii",
    "Hanalei, Hawaii",
    "National Register of Historic Places on Oahu",
    "National Register of Historic Places on Maui",
    "National Register of Historic Places on Hawaii (island)",
    "National Register of Historic Places on Kauai",
]

# Acceptable license short-names. Substring match against LicenseShortName lowercase.
# Order matters in REJECT (checked first). Anything matching reject keywords
# is dropped even if it might also match an accept term.
REJECT_LICENSE_KEYWORDS = [
    "by-nc", "by nc", "noncommercial", "non-commercial",
    "by-nd", "by nd", "no derivative", "noderivatives",
    "fair use", "all rights reserved", "copyrighted",
]
ACCEPT_LICENSE_PATTERNS = [
    "cc0", "cc-zero", "public domain", "pd-",
    "cc by 1.0", "cc by 2.0", "cc by 2.5", "cc by 3.0", "cc by 4.0",
    "cc-by-1", "cc-by-2", "cc-by-3", "cc-by-4",
    "cc by-sa", "cc-by-sa",
]

SKIP_TITLE_PATTERNS = [
    "logo", "diagram", "map_of", "ahupuaa", "satellite_image",
    "category:", "_chart", "stamps", "license_plate", "coat_of_arms",
    "noaa_chart", "topo_map", "aeronautical_chart", "ucla_world",
]
SKIP_EXTS = (".svg", ".gif", ".pdf", ".tif", ".tiff", ".webp")

# Hawaii bounding box. Anything outside is junk (e.g. someone tagged
# a Hawaii-related photo with the wrong GPS).
HI_LAT_MIN, HI_LAT_MAX = 18.5, 22.5
HI_LNG_MIN, HI_LNG_MAX = -160.5, -154.5


def call_api(url, params):
    try:
        r = requests.get(url, params=params, headers={"User-Agent": USER_AGENT}, timeout=25)
    except requests.exceptions.RequestException:
        return None
    if r.status_code != 200:
        return None
    try:
        return r.json()
    except ValueError:
        return None


def list_category_files(cat_name, limit=300):
    titles = []
    cont = None
    while len(titles) < limit:
        params = {
            "action": "query",
            "list": "categorymembers",
            "cmtitle": f"Category:{cat_name}",
            "cmtype": "file",
            "cmlimit": min(50, limit - len(titles)),
            "format": "json",
        }
        if cont:
            params["cmcontinue"] = cont
        data = call_api(COMMONS_API, params)
        if not data:
            break
        members = data.get("query", {}).get("categorymembers", [])
        titles.extend(m["title"] for m in members)
        cont = data.get("continue", {}).get("cmcontinue")
        if not cont:
            break
        time.sleep(0.1)
    return titles


def commons_file_info(title):
    params = {
        "action": "query",
        "titles": title,
        "prop": "coordinates|imageinfo",
        "iiprop": "url|extmetadata|size",
        "format": "json",
    }
    data = call_api(COMMONS_API, params)
    if not data:
        return None
    pages = data.get("query", {}).get("pages", {})
    for p in pages.values():
        coords_list = p.get("coordinates", [])
        coord = coords_list[0] if coords_list else None
        if not coord:
            return None
        ii_list = p.get("imageinfo", [])
        ii = ii_list[0] if ii_list else None
        if not ii:
            return None
        return {
            "title": p.get("title"),
            "lat": coord.get("lat"),
            "lng": coord.get("lon"),
            "url": ii.get("url"),
            "width": ii.get("width", 0),
            "height": ii.get("height", 0),
            "metadata": ii.get("extmetadata", {}),
        }
    return None


def license_ok(meta):
    short = (meta.get("LicenseShortName", {}).get("value") or "").lower()
    usage = (meta.get("UsageTerms", {}).get("value") or "").lower()
    text  = short + " " + usage
    if any(bad in text for bad in REJECT_LICENSE_KEYWORDS):
        return False
    return any(good in short for good in ACCEPT_LICENSE_PATTERNS)


def attribution_for(meta):
    artist = meta.get("Artist", {}).get("value", "") or ""
    artist = re.sub(r"<[^>]+>", "", artist).strip()
    artist = re.sub(r"\s+", " ", artist) or "Unknown"
    license_short = (meta.get("LicenseShortName", {}).get("value") or "Unknown license").strip()
    return f"{artist}, {license_short}, via Wikimedia Commons"


def reverse_geocode(lat, lng):
    params = {
        "geometry": f"{lng},{lat}",
        "geometryType": "esriGeometryPoint",
        "inSR": "4326",
        "spatialRel": "esriSpatialRelIntersects",
        "outFields": "ahupuaa,moku,mokupuni",
        "returnGeometry": "false",
        "f": "json",
    }
    data = call_api(ARCGIS_URL, params)
    if not data:
        return None
    feats = data.get("features", [])
    if not feats:
        return None
    a = feats[0].get("attributes", {})
    return a.get("mokupuni"), a.get("moku"), a.get("ahupuaa")


def clean_title(file_title):
    name = file_title.replace("File:", "")
    name = re.sub(r"\.[a-zA-Z0-9]{1,5}$", "", name)
    name = name.replace("_", " ").strip()
    # Drop trailing dimensions or panoramio IDs in parens
    name = re.sub(r"\s*-\s*panoramio\b.*$", "", name, flags=re.IGNORECASE)
    name = re.sub(r"\s*\(\d{6,}\)\s*$", "", name)
    return name.strip()


def is_skip_title(title):
    low = title.lower()
    if any(low.endswith(ext) for ext in SKIP_EXTS):
        return True
    return any(p in low for p in SKIP_TITLE_PATTERNS)


def coord_dist_m(lat1, lng1, lat2, lng2):
    R = 6371000
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp = math.radians(lat2 - lat1)
    dl = math.radians(lng2 - lng1)
    a = math.sin(dp/2)**2 + math.cos(p1)*math.cos(p2)*math.sin(dl/2)**2
    return 2 * R * math.asin(math.sqrt(a))


def in_hawaii(lat, lng):
    return HI_LAT_MIN <= lat <= HI_LAT_MAX and HI_LNG_MIN <= lng <= HI_LNG_MAX


def main(target=200):
    print(f"Huakaʻi auto-discovery (target {target} new entries)\n")
    locations = parse_locations(LOCATIONS_FILE)
    print(f"Loaded {len(locations)} existing entries\n")

    existing_names = {l["name"].lower() for l in locations}
    existing_coords = [(float(l["coords"][0]), float(l["coords"][1])) for l in locations]

    new_entries = []
    seen_titles = set()

    rejected = {"no_gps": 0, "license": 0, "small": 0, "skip_title": 0,
                "not_in_hawaii": 0, "not_in_polygon": 0, "duplicate_name": 0,
                "duplicate_coords": 0}

    for cat in SEED_CATEGORIES:
        if len(new_entries) >= target:
            break
        print(f"\n=== Category: {cat} ===")
        try:
            titles = list_category_files(cat, limit=300)
        except Exception as e:
            print(f"  category error: {e}")
            continue
        print(f"  {len(titles)} files in category")

        for title in titles:
            if len(new_entries) >= target:
                break
            if title in seen_titles:
                continue
            seen_titles.add(title)
            if is_skip_title(title):
                rejected["skip_title"] += 1
                continue

            info = commons_file_info(title)
            time.sleep(0.12)
            if not info:
                rejected["no_gps"] += 1
                continue
            if not license_ok(info["metadata"]):
                rejected["license"] += 1
                continue
            if info["width"] < 800 or info["height"] < 500:
                rejected["small"] += 1
                continue

            lat, lng = info["lat"], info["lng"]
            if not in_hawaii(lat, lng):
                rejected["not_in_hawaii"] += 1
                continue

            geo = reverse_geocode(lat, lng)
            time.sleep(0.12)
            if not geo or not all(geo):
                rejected["not_in_polygon"] += 1
                continue
            mokupuni, moku, ahupuaa = geo

            name = clean_title(title)
            if not name or name.lower() in existing_names:
                rejected["duplicate_name"] += 1
                continue
            if any(coord_dist_m(lat, lng, ll[0], ll[1]) < 50 for ll in existing_coords):
                rejected["duplicate_coords"] += 1
                continue

            entry = {
                "name": name,
                "island": mokupuni,
                "moku": moku,
                "ahupuaa": ahupuaa,
                "coords": [round(lat, 6), round(lng, 6)],
                "img": info["url"],
                "attribution": attribution_for(info["metadata"]),
            }
            new_entries.append(entry)
            existing_names.add(name.lower())
            existing_coords.append((lat, lng))
            print(f"  + {name[:55]:<55}  {moku} / {ahupuaa} ({mokupuni})")

    print(f"\n--- Summary ---")
    print(f"New entries:       {len(new_entries)}")
    print(f"Rejected breakdown:")
    for reason, n in rejected.items():
        print(f"  {reason:<22} {n}")

    if new_entries:
        locations.extend(new_entries)
        write_locations_js(locations, LOCATIONS_FILE)
        print(f"\nWrote {LOCATIONS_FILE.name} with {len(locations)} total entries.")
        print("Now run: python3 download_images.py")

        # Show what new ahupuaʻa appeared (for dropdown sync)
        existing_combos = set()
        for l in parse_locations(LOCATIONS_FILE)[: len(locations) - len(new_entries)]:
            existing_combos.add((l["island"], l["moku"], l["ahupuaa"]))
        new_combos = sorted({
            (e["island"], e["moku"], e["ahupuaa"])
            for e in new_entries
            if (e["island"], e["moku"], e["ahupuaa"]) not in existing_combos
        })
        if new_combos:
            print(f"\nDiscovered {len(new_combos)} new island/moku/ahupuaʻa combos.")
            print("These may not yet be in the dropdown lookup. Sample:")
            for c in new_combos[:15]:
                print(f"  {c[0]} / {c[1]} / {c[2]}")
            if len(new_combos) > 15:
                print(f"  ... and {len(new_combos) - 15} more")


if __name__ == "__main__":
    target = 200
    if len(sys.argv) > 1:
        try:
            target = int(sys.argv[1])
        except ValueError:
            pass
    main(target)
