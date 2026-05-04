#!/usr/bin/env python3
"""
Moku Match: calibrate every entry's island/moku/ahupuaʻa against the
State of Hawaiʻi ArcGIS ahupuaʻa layer (the same source the help map uses).

USAGE
    cd "/Library/WebServer/Documents/ahupuaa"
    source .venv/bin/activate
    python3 calibrate_locations.py             # dry-run report only
    python3 calibrate_locations.py --apply     # actually update locations.js

WHAT IT DOES
    For each entry in data/locations.js, reverse-geocode its coords
    against the State GIS layer to find the polygon containing that
    point. If the layer disagrees with the entry's island/moku/ahupuaʻa,
    report (or apply) the GIS values so the game answer always matches
    what the help map displays.
"""
import json
import sys
import time
from pathlib import Path

try:
    import requests
except ImportError:
    print("Run: pip install requests pillow")
    sys.exit(1)

ROOT = Path(__file__).parent
sys.path.insert(0, str(ROOT))
from download_images import parse_locations, write_locations_js, LOCATIONS_FILE

USER_AGENT = "MokuMatch/1.0 (https://github.com/olagon/MokuMatch)"
ARCGIS_URL = "https://geodata.hawaii.gov/arcgis/rest/services/HistoricCultural/MapServer/1/query"

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
    try:
        r = requests.get(ARCGIS_URL, params=params,
                         headers={"User-Agent": USER_AGENT}, timeout=20)
    except requests.exceptions.RequestException:
        return None
    if r.status_code != 200:
        return None
    feats = r.json().get("features", [])
    if not feats:
        return None
    a = feats[0].get("attributes", {})
    return a.get("mokupuni"), a.get("moku"), a.get("ahupuaa")

def main(apply_changes=False):
    locations = parse_locations(LOCATIONS_FILE)
    print(f"Loaded {len(locations)} entries")
    print(f"Mode: {'APPLY changes' if apply_changes else 'DRY RUN (report only)'}\n")

    matched, mismatched, no_geo = 0, [], []
    for idx, loc in enumerate(locations, start=1):
        lat, lng = loc["coords"]
        geo = reverse_geocode(lat, lng)
        time.sleep(0.15)
        if not geo or not all(geo):
            no_geo.append(loc["name"])
            print(f"[{idx:>3}/{len(locations)}] {loc['name'][:55]:<55}  no GIS hit")
            continue
        gIsland, gMoku, gAhu = geo
        cur = (loc["island"], loc["moku"], loc["ahupuaa"])
        if cur == (gIsland, gMoku, gAhu):
            matched += 1
            continue
        mismatched.append({
            "name": loc["name"],
            "current": cur,
            "gis": (gIsland, gMoku, gAhu),
        })
        cur_str = f"{cur[0]}/{cur[1]}/{cur[2]}"
        gis_str = f"{gIsland}/{gMoku}/{gAhu}"
        print(f"[{idx:>3}/{len(locations)}] {loc['name'][:42]:<42}")
        print(f"            current: {cur_str}")
        print(f"            gis:     {gis_str}")
        if apply_changes:
            loc["island"], loc["moku"], loc["ahupuaa"] = gIsland, gMoku, gAhu

    print()
    print(f"--- Summary ---")
    print(f"Matched GIS exactly:     {matched}")
    print(f"Mismatched (would fix):  {len(mismatched)}")
    print(f"No GIS hit (skipped):    {len(no_geo)}")

    if apply_changes and mismatched:
        write_locations_js(locations, LOCATIONS_FILE)
        print(f"\nUpdated {LOCATIONS_FILE.name} with {len(mismatched)} corrections.")
    elif mismatched and not apply_changes:
        print(f"\nDry run only. Re-run with --apply to actually update locations.js.")

    if no_geo:
        print("\nNo GIS hit (probably offshore coords):")
        for n in no_geo:
            print(f"  - {n}")

if __name__ == "__main__":
    apply = "--apply" in sys.argv
    main(apply)
