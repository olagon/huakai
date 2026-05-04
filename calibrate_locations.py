#!/usr/bin/env python3
"""
Moku Match: calibrate every entry's island/moku/ahupuaʻa against the
State of Hawaiʻi ArcGIS ahupuaʻa layer (the same source the help map uses).

USAGE
    cd "/Library/WebServer/Documents/ahupuaa"
    source .venv/bin/activate
    python3 calibrate_locations.py                       # dry-run report only
    python3 calibrate_locations.py --nudge               # dry-run + nudge missing
    python3 calibrate_locations.py --apply --nudge       # apply, with nudging

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

def reverse_geocode_with_nudge(lat, lng, max_radius_deg=0.012):
    """Try the exact point first. If it doesn't hit a polygon, walk outward
    in a spiral of small steps (≈110 m per 0.001°) until we find one or
    exhaust the radius. Returns (geo_tuple, nudged_lat, nudged_lng) or
    (None, lat, lng) if nothing within radius."""
    geo = reverse_geocode(lat, lng)
    if geo and all(geo):
        return geo, lat, lng
    # Spiral search: rings of 8 directions at increasing radii.
    # 0.001° ≈ 110 m, 0.012° ≈ 1.3 km — plenty for piers / small gaps.
    import math
    steps = [round(0.0008 * (i + 1), 5) for i in range(15) if 0.0008 * (i + 1) <= max_radius_deg]
    for radius in steps:
        # 8 cardinal + diagonal headings
        for ang in range(0, 360, 45):
            rad = math.radians(ang)
            dlat = radius * math.cos(rad)
            dlng = radius * math.sin(rad)
            geo = reverse_geocode(lat + dlat, lng + dlng)
            time.sleep(0.08)
            if geo and all(geo):
                return geo, round(lat + dlat, 6), round(lng + dlng, 6)
    return None, lat, lng

def main(apply_changes=False, nudge=False):
    locations = parse_locations(LOCATIONS_FILE)
    print(f"Loaded {len(locations)} entries")
    mode_bits = ["APPLY" if apply_changes else "DRY RUN"]
    if nudge: mode_bits.append("NUDGE")
    print(f"Mode: {' + '.join(mode_bits)}\n")

    matched, mismatched, no_geo, nudged = 0, [], [], []
    for idx, loc in enumerate(locations, start=1):
        lat, lng = loc["coords"]
        if nudge:
            geo, nlat, nlng = reverse_geocode_with_nudge(lat, lng)
        else:
            geo = reverse_geocode(lat, lng)
            nlat, nlng = lat, lng
        time.sleep(0.12)
        if not geo or not all(geo):
            no_geo.append(loc["name"])
            print(f"[{idx:>3}/{len(locations)}] {loc['name'][:55]:<55}  no GIS hit")
            continue
        was_nudged = (nlat, nlng) != (lat, lng)
        if was_nudged:
            nudged.append({"name": loc["name"], "from": (lat, lng), "to": (nlat, nlng)})
        gIsland, gMoku, gAhu = geo
        cur = (loc["island"], loc["moku"], loc["ahupuaa"])
        if cur == (gIsland, gMoku, gAhu):
            matched += 1
            if was_nudged:
                print(f"[{idx:>3}/{len(locations)}] {loc['name'][:42]:<42}  nudged onto matching polygon")
            continue
        mismatched.append({
            "name": loc["name"],
            "current": cur,
            "gis": (gIsland, gMoku, gAhu),
        })
        cur_str = f"{cur[0]}/{cur[1]}/{cur[2]}"
        gis_str = f"{gIsland}/{gMoku}/{gAhu}"
        tag = "  (nudged)" if was_nudged else ""
        print(f"[{idx:>3}/{len(locations)}] {loc['name'][:42]:<42}{tag}")
        print(f"            current: {cur_str}")
        print(f"            gis:     {gis_str}")
        if apply_changes:
            loc["island"], loc["moku"], loc["ahupuaa"] = gIsland, gMoku, gAhu
            # Also persist the nudged coords so next run is consistent
            if was_nudged:
                loc["coords"] = [nlat, nlng]

    # Apply nudge for matched-after-nudge entries too (so coords are saved)
    if apply_changes and nudge:
        for n in nudged:
            for loc in locations:
                if loc["name"] == n["name"]:
                    loc["coords"] = list(n["to"])
                    break

    print()
    print(f"--- Summary ---")
    print(f"Matched GIS exactly:     {matched}")
    print(f"Mismatched (would fix):  {len(mismatched)}")
    print(f"No GIS hit (still):      {len(no_geo)}")
    if nudged:
        print(f"Coords nudged onto land: {len(nudged)}")

    if apply_changes and (mismatched or nudged):
        write_locations_js(locations, LOCATIONS_FILE)
        print(f"\nUpdated {LOCATIONS_FILE.name}.")
    elif (mismatched or no_geo) and not apply_changes:
        print(f"\nDry run only. Re-run with --apply --nudge to actually update locations.js.")

    if no_geo:
        print("\nStill no GIS hit (truly offshore):")
        for n in no_geo:
            print(f"  - {n}")

if __name__ == "__main__":
    apply = "--apply" in sys.argv
    nudge_on = "--nudge" in sys.argv
    main(apply, nudge_on)
