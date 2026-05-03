# Moku Match

A guessing game for the geography of Hawaiʻi. You see a photo of a real place. You name the **mokupuni** (island), the **moku** (district), and the **ahupuaʻa** (land division) it sits in. All three right scores a point. Ten rounds per game.

It runs in one HTML file, in your browser, with nothing to install and nothing to sign up for.

[Play it now](https://olagon.github.io/MokuMatch/)

## Why

Most people who grew up in Hawaiʻi can name the islands. Fewer can name the moku. Fewer still can place an ahupuaʻa. These names are not trivia. They tell you where the water flowed, who lived there, who fished there, and what was grown. The game is a small nudge toward learning them.

## How to play

1. Look at the photo.
2. Pick the island.
3. Pick the moku.
4. Pick the ahupuaʻa.
5. Tap **Huli** to flip your guess.
6. You score one point only when all three are right.

Stuck on a round? There is a **map** button on every screen. It opens a drill-down map of all eight islands. Tap an island to see its moku. Tap a moku to see its ahupuaʻa. The boundaries come straight from the State of Hawaiʻi GIS layer.

## Features

- 130+ real photographed locations across all eight Hawaiian islands
- Drill-down ahupuaʻa map (mokupuni → moku → ahupuaʻa) using live State GIS data
- Round summary with the correct names
- End-of-game recap with a map of where you were and a grid of every photo you saw
- Mobile friendly. Works offline once the page loads, except for the help map
- No sign in, no analytics, no cookies, no tracking, no ads

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
index.html          Everything: markup, styles, game logic, help-map logic, modals
data/locations.js   The 130+ location entries (name, coords, ahupuaʻa, image URL)
LICENSE             MIT
README.md           This file
```

The location data is split out so you can add or fix entries without touching the game code. Each entry looks like this:

```js
{
    "name": "Lēʻahi (Diamond Head)",
    "island": "Oʻahu",
    "moku": "Kona",
    "ahupuaa": "Kapahulu",
    "coords": [21.2635, -157.8049],
    "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Diamond_Head_crater_aerial_Jan_2022.png",
    "attribution": "RL0919, CC BY-SA 4.0, via Wikimedia Commons"
}
```

## Data sources

**Ahupuaʻa boundaries** come from the [Hawaiʻi Statewide GIS Program](https://planning.hawaii.gov/gis/), Office of Planning and Sustainable Development. The specific layer is `HistoricCultural/MapServer/1`. Original source is the Office of Hawaiian Affairs (2009), with diacriticals corrected by DLNR/SHPD.

**Photos** come from [Wikimedia Commons](https://commons.wikimedia.org/), each under its own license. Every photo shows the credit in the game UI.

**Map base tiles** come from [OpenStreetMap](https://www.openstreetmap.org/copyright).

## Privacy

Moku Match collects nothing. There is no sign in, no localStorage, no cookies, no analytics. Your score and history live in the page tab and disappear when you close it. The only network requests the game makes are to the data sources listed above (Wikimedia for photos, OpenStreetMap for tiles, State GIS for boundary polygons). Each of those services sees your IP because that is how the web works, but Moku Match itself never gets a copy.

The full Privacy Policy and Terms of Use are accessible from the footer of the site as in-page modals.

## Contributing

Errors in this dataset are easy to make and easier to find. If you spot one:

- A photo that does not match the ahupuaʻa it is placed in
- A misspelled place name (missing ʻokina, missing kahakō, wrong vowel)
- A boundary attribution that disagrees with the OHA / DLNR record
- A broken image link

Please open an issue or send a pull request. For people not on GitHub, send a message on [LinkedIn](https://www.linkedin.com/in/olinlagon/).

If you want to add new locations, the rules are simple: the photo must be on Wikimedia Commons (so we have a real license and credit), the coordinates must be honest, and you must be confident about the ahupuaʻa. When in doubt, skip it. We would rather have 100 trustworthy entries than 200 sloppy ones.

## Tech

- Plain HTML, vanilla JavaScript, [Tailwind CSS](https://tailwindcss.com/) via CDN
- [Leaflet](https://leafletjs.com/) for both the help map and the end-of-game recap map
- Hosted on [GitHub Pages](https://pages.github.com/)

No build step. No package manager. No framework. Open the HTML, ship the HTML.

## License

MIT. See [LICENSE](LICENSE).

The MIT License covers the code. Photos remain under their own Creative Commons / public domain licenses (each shown in the game). The ahupuaʻa boundary data is from a public State of Hawaiʻi GIS layer.

## Credits

Built with aloha by [Olin Kealoha Lagon](https://www.linkedin.com/in/olinlagon/).

Mahalo to:

- The Office of Hawaiian Affairs and the Hawaiʻi State Department of Land and Natural Resources, whose work on ahupuaʻa boundaries is the foundation of this game.
- Every Wikimedia Commons photographer who shared their work under a Creative Commons license. Their names and links appear on each photo in the game.
- The kupuna who carried these place names across generations, and the people working today to keep them alive.
