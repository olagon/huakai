#!/usr/bin/env python3
"""
Moku Match: dump the full island/moku/ahupuaʻa taxonomy from the
State of Hawaiʻi GIS layer that the help map uses.

USAGE
    cd "/Library/WebServer/Documents/ahupuaa"
    source .venv/bin/activate

    python3 list_gis_taxonomy.py                      # everything, summary
    python3 list_gis_taxonomy.py Oʻahu                # one island, full tree
    python3 list_gis_taxonomy.py Oʻahu Kona           # one moku, ahupuaʻa list
    python3 list_gis_taxonomy.py --tree               # full tree, all islands
    python3 list_gis_taxonomy.py --counts             # summary numbers
    python3 list_gis_taxonomy.py --csv > taxonomy.csv # full CSV dump

The data comes from:
    https://geodata.hawaii.gov/arcgis/rest/services/HistoricCultural/MapServer/1
"""
import csv
import sys
import time
from pathlib import Path

try:
    import requests
except ImportError:
    print("Run: pip install requests pillow")
    sys.exit(1)

ARCGIS_URL = "https://geodata.hawaii.gov/arcgis/rest/services/HistoricCultural/MapServer/1/query"
USER_AGENT = "MokuMatch/1.0 (https://github.com/olagon/MokuMatch)"

def fetch_all():
    """Pull every ahupuaʻa polygon's attributes (no geometry) from the layer."""
    out = []
    offset = 0
    page = 2000
    while True:
        params = {
            "where": "1=1",
            "outFields": "ahupuaa,moku,mokupuni",
            "returnGeometry": "false",
            "f": "json",
            "resultOffset": offset,
            "resultRecordCount": page,
            "orderByFields": "mokupuni,moku,ahupuaa",
        }
        try:
            r = requests.get(ARCGIS_URL, params=params,
                             headers={"User-Agent": USER_AGENT}, timeout=40)
        except requests.exceptions.RequestException as e:
            print(f"network error at offset {offset}: {e}", file=sys.stderr)
            break
        if r.status_code != 200:
            print(f"HTTP {r.status_code} at offset {offset}", file=sys.stderr)
            break
        data = r.json()
        feats = data.get("features", [])
        if not feats:
            break
        for f in feats:
            a = f.get("attributes", {})
            out.append((a.get("mokupuni"), a.get("moku"), a.get("ahupuaa")))
        if len(feats) < page or not data.get("exceededTransferLimit"):
            break
        offset += page
        time.sleep(0.2)
    return out

def build_tree(rows):
    """rows: list of (island, moku, ahupuaa). Returns nested dict."""
    tree = {}
    for island, moku, ahu in rows:
        if not island: continue
        tree.setdefault(island, {}).setdefault(moku or "(no moku)", set()).add(ahu or "(no ahupuaʻa)")
    # Sort
    out = {}
    for island in sorted(tree.keys()):
        out[island] = {}
        for moku in sorted(tree[island].keys(), key=lambda x: (x is None, x or "")):
            out[island][moku] = sorted(tree[island][moku], key=lambda x: (x is None, x or ""))
    return out

def print_tree(tree, indent=0):
    pad = "    " * indent
    for island, moku_map in tree.items():
        print(f"{pad}{island}")
        for moku, ahus in moku_map.items():
            print(f"{pad}    {moku}  ({len(ahus)} ahupuaʻa)")
            for a in ahus:
                print(f"{pad}        {a}")
        print()

def print_counts(tree):
    total = 0
    for island, moku_map in tree.items():
        n = sum(len(a) for a in moku_map.values())
        print(f"  {island:<14} {len(moku_map):>3} moku · {n:>4} ahupuaʻa")
        total += n
    print(f"  {'TOTAL':<14} {sum(len(m) for m in tree.values()):>3} moku · {total:>4} ahupuaʻa")

def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    flags = [a for a in sys.argv[1:] if a.startswith("--")]

    print("Fetching every ahupuaʻa from the State GIS layer…", file=sys.stderr)
    rows = fetch_all()
    print(f"Got {len(rows)} polygons.\n", file=sys.stderr)

    if "--csv" in flags:
        w = csv.writer(sys.stdout)
        w.writerow(["mokupuni", "moku", "ahupuaa"])
        for r in rows:
            w.writerow(r)
        return

    tree = build_tree(rows)

    if "--counts" in flags:
        print_counts(tree)
        return

    if not args and "--tree" not in flags:
        # Default: just summary counts
        print_counts(tree)
        print("\nUse --tree for the full breakdown, or pass an island name.")
        return

    if args:
        island = args[0]
        if island not in tree:
            print(f"No island named '{island}' found. Available:")
            for k in tree: print(f"  {k}")
            return
        if len(args) >= 2:
            moku = args[1]
            if moku not in tree[island]:
                print(f"No moku '{moku}' on {island}. Available:")
                for k in tree[island]: print(f"  {k}")
                return
            print(f"{island} / {moku}  ({len(tree[island][moku])} ahupuaʻa)\n")
            for a in tree[island][moku]:
                print(f"  {a}")
        else:
            print(f"{island}\n")
            for moku, ahus in tree[island].items():
                print(f"{moku}  ({len(ahus)} ahupuaʻa)")
                for a in ahus: print(f"    {a}")
                print()
        return

    if "--tree" in flags:
        print_tree(tree)

if __name__ == "__main__":
    main()
