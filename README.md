# Huakaʻi

A geography journey through Hawaiʻi. You see a photo of a real place. You find where it sits on the map: which **mokupuni** (island), which **moku** (district), which **ahupuaʻa** (land division). Three quick rounds per game. Solve every site in the dataset to "beat" Huakaʻi.

A *huakaʻi* is a journey. The aim here is not to get every round right on the first try — it is to keep returning, see new places, and slowly come to know the land.

It runs in one HTML file, in your browser. Nothing to install.

[Play it now](https://olagon.github.io/MokuMatch/)

## Why

Most people who grew up in Hawaiʻi can name the islands. Fewer can name the moku. Fewer still can place an ahupuaʻa. These names are not trivia. They tell you where the water flowed, who lived there, who fished there, and what was grown. Huakaʻi is a small nudge toward learning them.

## How to play

You see a photo. The action card has one big button: **Open the map to answer**.

Tap that and the State of Hawaiʻi GIS map opens, zoomed out to all eight islands. Three taps takes you to your guess:

1. Tap an island.
2. Tap a moku (the colored regions inside the island). Tap a different greyed-out moku at any point to jump there directly without going back.
3. Tap the ahupuaʻa polygon you think is right. It highlights in orange. A Submit button appears in the info bar.
4. Tap Submit.

Get all three right and the site is yours forever — your progress is saved between sessions. The header pill shows you live progress (X / 156).

When you're stuck, two safety nets:

- **Use today's hint** — reveals the island and moku, leaving only the ahupuaʻa to find. One per calendar day.
- **I don't know — show me the answer** — reveals the answer with a mini-map showing the actual ahupuaʻa polygon. Doesn't score a point but you learn where it was.

When you're close, the game knows: getting the right moku but the wrong ahupuaʻa shows a soft "Almost!" instead of "Auwē!".

## Features

- 156 real photographed locations across all eight Hawaiian islands
- Live State of Hawaiʻi GIS data — the polygons you tap are the real ahupuaʻa boundaries
- Tap-through map answering with smart camera (never zooms out unexpectedly)
- Show-photo peek inside the map so you can see the round image while you navigate
- Click any photo to enlarge with cycling zoom (1x → 2x → 4x)
- Daily hint, give-up flow, "Almost!" grace credit when moku is right
- Progress modal with thumbnail grid (color = solved, grey = not yet)
- End-of-game recap map plus "Your Journey" grid with hover-to-reveal answers
- Mobile friendly. The map is the only UI — no dropdowns to fight with
- No sign-in, no accounts, no cookies. Anonymized GA4 only

## Run it locally

It is one HTML file. Either:

```bash
open index.html
```

or run any static file server:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## Project layout

```
index.html                       Markup, styles, all game logic, modals
data/locations.js                The 156 location entries (name, coords, ahupuaʻa, image URL)
data/caption_suggestions.json    Hand-crafted caption suggestions for the curate page
images/                          Self-hosted location photos (organized by island)
LICENSE                          MIT
README.md                        This file

# Tooling (Python, only run when growing/cleaning the dataset)
download_images.py               Mirror remote images to /images/, resize, write attribution
discover_more_locations.py       Auto-discover new GPS-tagged Hawaii photos from Wikimedia
calibrate_locations.py           Snap every entry to the State GIS layer
list_gis_taxonomy.py             Dump the GIS taxonomy as a tree or CSV
apply_patch.py                   Apply a curate.html patch (deletes + renames)
curate.html                      Browser tool: bulk delete + rename via grid view
curate_captions.html             Browser tool: review/edit captions, generate patch
```

The location data is split out so you can add or fix entries without touching the game code. Each entry looks like this:

```js
{
    "name": "Lēʻahi (Diamond Head)",
    "island": "Oʻahu",
    "moku": "Kona",
    "ahupuaa": "Waikīkī",
    "coords": [21.2635, -157.8049],
    "img": "images/oahu/leahi-diamond-head.jpg",
    "attribution": "RL0919, CC BY-SA 4.0, via Wikimedia Commons"
}
```

## Data sources

**Ahupuaʻa boundaries** come from the [Hawaiʻi Statewide GIS Program](https://planning.hawaii.gov/gis/), Office of Planning and Sustainable Development. The specific layer is `HistoricCultural/MapServer/1`. Original source is the Office of Hawaiian Affairs (2009), with diacriticals corrected by DLNR/SHPD in 2017 and 2021.

This is the **modern administrative** layer. Some traditional ahupuaʻa are merged into larger modern polygons — Mānoa, Makiki, Pālolo on Oʻahu all sit inside one big "Honolulu" polygon, for example. The game labels and the answer always match the State layer, but the in-app Terms doc explains the trade-off so players can understand what they are seeing.

**Photos** come from [Wikimedia Commons](https://commons.wikimedia.org/), each under its own CC license. Every photo shows the credit in the game UI. Full attribution table is in [IMAGE_CREDITS.md](IMAGE_CREDITS.md).

**Map base tiles** come from [OpenStreetMap](https://www.openstreetmap.org/copyright).

## Privacy

Huakaʻi has no user accounts. It uses one bit of localStorage to track which sites you have solved across sessions, so progress carries over. We use Google Analytics 4 with privacy-friendly settings (anonymized IPs, no Google signals, no ad personalization) to count aggregate gameplay events. Full Privacy Policy and Terms of Use are in-page modals from the footer.

## Contributing

Errors in this dataset are easy to make and easier to find. If you spot one:

- A photo that does not match the ahupuaʻa it is placed in
- A misspelled place name (missing ʻokina, missing kahakō)
- A boundary attribution that disagrees with the State GIS layer
- A broken image link

Open an issue or send a pull request. For people not on GitHub, send a message on [LinkedIn](https://www.linkedin.com/in/olinlagon/).

If you want to add new locations, the rules are simple: the photo must be on Wikimedia Commons (so we have a real license and credit), the coordinates must be honest, and the GIS layer must return a valid mokupuni/moku/ahupuaʻa for those coordinates. The `discover_more_locations.py` script automates this — it pulls Hawaii photos with GPS and reverse-geocodes them.

## Tech

- Plain HTML, vanilla JavaScript, [Tailwind CSS](https://tailwindcss.com/) via CDN
- [Leaflet](https://leafletjs.com/) for the help map, the recap map, and the answer-reveal mini-map
- Hosted on [GitHub Pages](https://pages.github.com/)
- GA4 for aggregate analytics

No build step. No package manager. No framework. Open the HTML, ship the HTML.

## License

MIT. See [LICENSE](LICENSE).

The MIT License covers the code. Photos remain under their own Creative Commons / public domain licenses (each shown in the game). The ahupuaʻa boundary data is from a public State of Hawaiʻi GIS layer.

## Credits

Built with aloha by [Olin Kealoha Lagon](https://www.linkedin.com/in/olinlagon/).

Mahalo to:

- The Office of Hawaiian Affairs and the Hawaiʻi State Department of Land and Natural Resources, whose work on ahupuaʻa boundaries is the foundation of this game.
- Every Wikimedia Commons photographer who shared their work under a Creative Commons license. Their names and links appear on each photo.
- The kupuna who carried these place names across generations, and the people working today to keep them alive.
