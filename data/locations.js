// Moku Match: location dataset
// All images sourced from Wikimedia Commons under their listed CC license.
// Each entry must have: name, island, moku, ahupuaa, coords [lat, lng],
// img (Special:FilePath URL on commons.wikimedia.org), attribution.
//
// Loaded as a script tag before game.js. Sets window.LOCATIONS.

window.LOCATIONS = [
    // ============================================================
    //  OʻAHU
    // ============================================================
    {
        "name": "Lēʻahi (Diamond Head)",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Kapahulu",
        "coords": [21.2635, -157.8049],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Diamond_Head_crater_aerial_Jan_2022.png",
        "attribution": "RL0919, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Hanauma Bay",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Maunalua",
        "coords": [21.2688, -157.6936],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hanauma_Bay_Panoramic_View.JPG",
        "attribution": "Vadmom, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Waikīkī Beach Sunset",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Waikīkī",
        "coords": [21.2761, -157.8275],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Waikiki_Beach_sunset.jpg",
        "attribution": "Alan Light, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "Mānoa Falls",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Mānoa",
        "coords": [21.3323, -157.8009],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Manoa_Falls_(16427194066).jpg",
        "attribution": "Edmund Garman, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "National Memorial Cemetery of the Pacific (Punchbowl)",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Honolulu",
        "coords": [21.3138, -157.8477],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/National_Memorial_Cemetery_of_the_Pacific.jpg",
        "attribution": "Daniel Ramirez, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "Iolani Palace",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Honolulu",
        "coords": [21.3069, -157.8591],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Iolani_Palace.JPG",
        "attribution": "Arjunkrsen, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Ala Moana Beach Park",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Waikīkī",
        "coords": [21.2908, -157.8488],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Ala_Moana_Beach_Park,_Magic_Island,_Honolulu.jpg",
        "attribution": "angelcandy.baby, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "Byodo-In Temple",
        "island": "Oʻahu",
        "moku": "Koʻolaupoko",
        "ahupuaa": "Heʻeia",
        "coords": [21.4308, -157.8322],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/The_Byodo-In_Temple_(10841491654).jpg",
        "attribution": "Bernard Spragg. NZ, CC0, via Flickr/Wikimedia Commons"
    },
    {
        "name": "Kualoa / Mokoliʻi (Chinaman's Hat)",
        "island": "Oʻahu",
        "moku": "Koʻolaupoko",
        "ahupuaa": "Kualoa",
        "coords": [21.5055, -157.8286],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Mokolii_Island.jpg",
        "attribution": "Daniel Ramirez, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "Nuʻuanu Pali Lookout",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Nuʻuanu",
        "coords": [21.3661, -157.7931],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Nuuanu_Pali.jpg",
        "attribution": "Holly Cheng, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Makapuʻu Point Lighthouse",
        "island": "Oʻahu",
        "moku": "Koʻolaupoko",
        "ahupuaa": "Waimānalo",
        "coords": [21.3092, -157.6489],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Makapu%27u_Lighthouse_from_hiking_trail.JPG",
        "attribution": "Kaleismith, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Waimānalo Beach",
        "island": "Oʻahu",
        "moku": "Koʻolaupoko",
        "ahupuaa": "Waimānalo",
        "coords": [21.3340, -157.6943],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Waimanalo_Beach_Park.JPG",
        "attribution": "AlaskaDave, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Pearl Harbor (USS Arizona)",
        "island": "Oʻahu",
        "moku": "ʻEwa",
        "ahupuaa": "Hālawa",
        "coords": [21.3649, -157.9499],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/USS_Arizona_Memorial_(aerial_view).jpg",
        "attribution": "U.S. Navy, Public Domain"
    },
    {
        "name": "Laniakea Beach (Turtle Beach)",
        "island": "Oʻahu",
        "moku": "Waialua",
        "ahupuaa": "Kawailoa",
        "coords": [21.6179, -158.0864],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Laniakea_Beach.jpg",
        "attribution": "Syced, CC0 1.0, via Wikimedia Commons"
    },
    {
        "name": "Haleʻiwa Bridge",
        "island": "Oʻahu",
        "moku": "Waialua",
        "ahupuaa": "Paʻalaʻa",
        "coords": [21.5927, -158.1030],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Haleiwa_bridge.jpg",
        "attribution": "Eric Guinther, CC BY-SA 3.0, via Wikimedia Commons"
    },

    // ============================================================
    //  HAWAIʻI ISLAND
    // ============================================================
    {
        "name": "Hāpuna Beach",
        "island": "Hawaiʻi",
        "moku": "Kohala",
        "ahupuaa": "Lālāmilo",
        "coords": [19.9926, -155.8265],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hapuna_Beach_Hawaii_2021.jpg",
        "attribution": "Larry D. Moore, CC BY 4.0, via Wikimedia Commons"
    },
    {
        "name": "Puʻukoholā Heiau",
        "island": "Hawaiʻi",
        "moku": "Kohala",
        "ahupuaa": "Kawaihae",
        "coords": [20.0267, -155.8222],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Pu%27ukohola_Heiau_--_A_Sacred_Place_Since_Prehistoric_Times_(4528812332).jpg",
        "attribution": "Ken Lund, CC BY-SA 2.0, via Flickr/Wikimedia Commons"
    },
    {
        "name": "Waipiʻo Valley Lookout",
        "island": "Hawaiʻi",
        "moku": "Hāmākua",
        "ahupuaa": "Waipiʻo",
        "coords": [20.1205, -155.5891],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Waipio_Lookout_View.jpg",
        "attribution": "Paul Hirst, CC BY-SA 2.5, via Wikimedia Commons"
    },
    {
        "name": "Akaka Falls",
        "island": "Hawaiʻi",
        "moku": "Hilo",
        "ahupuaa": "Honomū",
        "coords": [19.8544, -155.1531],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/AKAKA_FALLS_STATE_PARK_-_NARA_-_554113.jpg",
        "attribution": "Charles O'Rear / NARA, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Puʻuhonua o Hōnaunau",
        "island": "Hawaiʻi",
        "moku": "Kona",
        "ahupuaa": "Hōnaunau",
        "coords": [19.4213, -155.9103],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Pu%27uhonua_o_Honaunau_National_Historical_Park.JPG",
        "attribution": "RonPaul86, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Rainbow Falls (Waiānuenue)",
        "island": "Hawaiʻi",
        "moku": "Hilo",
        "ahupuaa": "Punahoa",
        "coords": [19.7196, -155.1097],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Rainbow_Falls_Exhibiting_Prism_Effect.jpg",
        "attribution": "Gr0ph0n, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Pololū Valley",
        "island": "Hawaiʻi",
        "moku": "Kohala",
        "ahupuaa": "Pololū",
        "coords": [20.2039, -155.7335],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Pololu_Valley.jpg",
        "attribution": "Mickaw2, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Maunakea Observatories",
        "island": "Hawaiʻi",
        "moku": "Hāmākua",
        "ahupuaa": "Kaʻohe",
        "coords": [19.8207, -155.4681],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Mauna_Kea_Observatories.jpg",
        "attribution": "Bmurphy380, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Kealakekua Bay / Captain Cook Monument",
        "island": "Hawaiʻi",
        "moku": "Kona",
        "ahupuaa": "Kealakekua",
        "coords": [19.4816, -155.9324],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kealakekua_Bay.jpg",
        "attribution": "Bamse, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Kīlauea Iki Crater",
        "island": "Hawaiʻi",
        "moku": "Kaʻū",
        "ahupuaa": "Keauhou",
        "coords": [19.4172, -155.2494],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kilauea_Iki.jpg",
        "attribution": "Aleksomber, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Thurston Lava Tube (Nāhuku)",
        "island": "Hawaiʻi",
        "moku": "Hilo",
        "ahupuaa": "Waiākea",
        "coords": [19.4139, -155.2384],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/2013.10.31.115234_Lava_tube_Volcanoes_National_Park_Hawaii.jpg",
        "attribution": "Hermann Luyken, CC0 1.0, via Wikimedia Commons"
    },

    // ============================================================
    //  MAUI
    // ============================================================
    {
        "name": "Haleakalā Crater",
        "island": "Maui",
        "moku": "Makawao",
        "ahupuaa": "Kealahou",
        "coords": [20.7097, -156.2535],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Haleakala_crater.jpg",
        "attribution": "Michael Oswald, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Waiʻānapanapa Black Sand Beach",
        "island": "Maui",
        "moku": "Hāna",
        "ahupuaa": "Honokalani",
        "coords": [20.7886, -156.0037],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Waianapanapa_State_Park.jpg",
        "attribution": "Eric Chan, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "ʻĪao Needle (Kukaʻemoku)",
        "island": "Maui",
        "moku": "Wailuku",
        "ahupuaa": "Wailuku",
        "coords": [20.8810, -156.5360],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Iao_Valley_State_Park_Maui._(11248131064).jpg",
        "attribution": "Bernard Spragg. NZ, CC0, via Flickr/Wikimedia Commons"
    },
    {
        "name": "Molokini Crater",
        "island": "Maui",
        "moku": "Honuaʻula",
        "ahupuaa": "Keauhou",
        "coords": [20.6315, -156.4962],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Molokini-crater-maui.jpg",
        "attribution": "Bossfrog, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Seven Sacred Pools (ʻOheʻo Gulch)",
        "island": "Maui",
        "moku": "Kīpahulu",
        "ahupuaa": "Kīpahulu",
        "coords": [20.6617, -156.0456],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Seven_Sacred_Pools_at_Oheo_Gulch.jpg",
        "attribution": "JHill, CC BY-SA 2.0, via Wikimedia Commons"
    },
    {
        "name": "Makena Beach (Big Beach)",
        "island": "Maui",
        "moku": "Honuaʻula",
        "ahupuaa": "Mākena",
        "coords": [20.6326, -156.4496],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Makena_beach.jpg",
        "attribution": "Shaund, CC BY-SA 4.0, via Wikimedia Commons"
    },

    // ============================================================
    //  KAUAʻI
    // ============================================================
    {
        "name": "Waimea Canyon",
        "island": "Kauaʻi",
        "moku": "Waimea",
        "ahupuaa": "Waimea",
        "coords": [22.0719, -159.6626],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Waimea_Canyon_State_Park_Hawaii_(32406013018).jpg",
        "attribution": "dronepicr, CC BY 2.0, via Flickr/Wikimedia Commons"
    },
    {
        "name": "Wailua Falls",
        "island": "Kauaʻi",
        "moku": "Puna",
        "ahupuaa": "Wailua",
        "coords": [22.0346, -159.3788],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Wailua_Falls,_Kauai.JPG",
        "attribution": "Alejandro Bárcenas, CC BY-SA 2.5, via Wikimedia Commons"
    },
    {
        "name": "Hanalei Pier",
        "island": "Kauaʻi",
        "moku": "Haleleʻa",
        "ahupuaa": "Hanalei",
        "coords": [22.2132, -159.4968],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Sunset_at_Hanalei_Pier_on_the_island_of_Kauai.jpg",
        "attribution": "Debbie Tee, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Kalalau Valley",
        "island": "Kauaʻi",
        "moku": "Nāpali",
        "ahupuaa": "Kalalau",
        "coords": [22.1667, -159.6500],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kalalau_Valley_Lookout.jpg",
        "attribution": "WeLoveHawaii, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Kīlauea Lighthouse",
        "island": "Kauaʻi",
        "moku": "Koʻolau",
        "ahupuaa": "Kīlauea",
        "coords": [22.2317, -159.4019],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kilauea_Lighthouse_(circa_2006).jpg",
        "attribution": "Tdoyle, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Spouting Horn",
        "island": "Kauaʻi",
        "moku": "Kona",
        "ahupuaa": "Kōloa",
        "coords": [21.8757, -159.4939],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Spouting_Horn,_Poipu,_Kauai,_Hawaii,_June_2009_-_panoramio.jpg",
        "attribution": "Tori Sloane, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Poʻipū Beach",
        "island": "Kauaʻi",
        "moku": "Kona",
        "ahupuaa": "Poʻipū",
        "coords": [21.8795, -159.4566],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Poipu_Beach.jpg",
        "attribution": "Redshirt, Public Domain, via Wikimedia Commons"
    },

    // ============================================================
    //  MOLOKAʻI
    // ============================================================
    {
        "name": "Kalaupapa Peninsula",
        "island": "Molokaʻi",
        "moku": "Koʻolau",
        "ahupuaa": "Kalaupapa",
        "coords": [21.1887, -156.9765],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kalaupapa_Peninsula_92.jpg",
        "attribution": "Gillfoto, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Hālawa Valley",
        "island": "Molokaʻi",
        "moku": "Koʻolau",
        "ahupuaa": "Hālawa",
        "coords": [21.1610, -156.7483],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Halawa_Valley,_Molokai_Hawaii_-_panoramio.jpg",
        "attribution": "Rose Braverman, CC BY 3.0, via Wikimedia Commons"
    },

    // ============================================================
    //  LĀNAʻI
    // ============================================================
    {
        "name": "Puʻu Pehe (Sweetheart Rock)",
        "island": "Lānaʻi",
        "moku": "Lānaʻi",
        "ahupuaa": "Kaunolū",
        "coords": [20.7344, -156.8903],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Lava_Flows_at_Sweetheart_Rock_Lanai_Hawaii.jpg",
        "attribution": "Steve Jurvetson, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "Shipwreck Beach (Kaiolohia)",
        "island": "Lānaʻi",
        "moku": "Koʻolau",
        "ahupuaa": "Hauola",
        "coords": [20.9167, -156.9000],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Shipwreck_-_Shipwreck_Beach.jpg",
        "attribution": "Halibut Thyme, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Garden of the Gods (Keahiakawelo)",
        "island": "Lānaʻi",
        "moku": "Lānaʻi",
        "ahupuaa": "Mahana",
        "coords": [20.8694, -156.9880],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Garden_of_the_Gods_Lanai.jpg",
        "attribution": "Halibut Thyme, Public Domain, via Wikimedia Commons"
    },

    // ============================================================
    //  EXPANSION SET (added 2026)
    //  Image filenames sourced from Wikimedia Commons via web search.
    //  If any 404, the game's onerror handler shows a placeholder.
    // ============================================================

    // ---------- OʻAHU EXPANSION ----------
    {
        "name": "Aloha Tower",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Honolulu",
        "coords": [21.3074, -157.8657],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Aloha_Tower_in_Honolulu_Harbor.jpg",
        "attribution": "Cliff, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "Kawaiahaʻo Church",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Honolulu",
        "coords": [21.3047, -157.8580],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kawaiahao_Church,_Honolulu.JPG",
        "attribution": "Daniel Ramirez, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "Bishop Museum",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Kapālama",
        "coords": [21.3331, -157.8714],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Bishop_Museum,_Honolulu,_HI.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Hawaiʻi State Capitol",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Honolulu",
        "coords": [21.3079, -157.8576],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hawaii_State_Capitol.jpg",
        "attribution": "Daniel Ramirez, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "Honolulu Hale (City Hall)",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Honolulu",
        "coords": [21.3068, -157.8576],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Honolulu_Hale.JPG",
        "attribution": "Cliff, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "Washington Place",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Honolulu",
        "coords": [21.3081, -157.8582],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Washington_Place,_Honolulu.JPG",
        "attribution": "Daniel Ramirez, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "Honolulu Museum of Art",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Honolulu",
        "coords": [21.3057, -157.8489],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Honolulu_Museum_of_Art_(8331388225).jpg",
        "attribution": "Daniel Ramirez, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "Lyon Arboretum",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Mānoa",
        "coords": [21.3331, -157.8019],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Lyon_Arboretum_main_path.jpg",
        "attribution": "W Nowicki, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Tantalus Lookout (Puʻu ʻUalakaʻa)",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Makiki",
        "coords": [21.3217, -157.8219],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Tantalus_Lookout_Honolulu.jpg",
        "attribution": "Cristo Vlahos, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Koko Crater",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Maunalua",
        "coords": [21.2811, -157.6856],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Koko_Crater_-_Oahu.jpg",
        "attribution": "Mbz1, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Kaniakapūpū Ruins",
        "island": "Oʻahu",
        "moku": "Kona",
        "ahupuaa": "Nuʻuanu",
        "coords": [21.3489, -157.8133],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kaniakapupu_Ruins.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Lanikai Beach",
        "island": "Oʻahu",
        "moku": "Koʻolaupoko",
        "ahupuaa": "Kailua",
        "coords": [21.3933, -157.7156],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Lanikai_Beach.jpg",
        "attribution": "Cristo Vlahos, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Hoʻomaluhia Botanical Garden",
        "island": "Oʻahu",
        "moku": "Koʻolaupoko",
        "ahupuaa": "Kāneʻohe",
        "coords": [21.3858, -157.8094],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hoomaluhia_Botanical_Garden.jpg",
        "attribution": "Daniel Ramirez, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "Kualoa Regional Park",
        "island": "Oʻahu",
        "moku": "Koʻolaupoko",
        "ahupuaa": "Kualoa",
        "coords": [21.5167, -157.8389],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kualoa_Regional_Park,_Oahu.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Polynesian Cultural Center",
        "island": "Oʻahu",
        "moku": "Koʻolauloa",
        "ahupuaa": "Lāʻie",
        "coords": [21.6403, -157.9244],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Polynesian_Cultural_Center_-_Aotearoa_(New_Zealand).jpg",
        "attribution": "Daniel Ramirez, CC BY 2.0, via Wikimedia Commons"
    },
    {
        "name": "Lāʻie Hawaiʻi Temple",
        "island": "Oʻahu",
        "moku": "Koʻolauloa",
        "ahupuaa": "Lāʻie",
        "coords": [21.6450, -157.9239],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Laie_Hawaii_Temple.jpg",
        "attribution": "Joao Maximo, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Banzai Pipeline (ʻEhukai Beach)",
        "island": "Oʻahu",
        "moku": "Koʻolauloa",
        "ahupuaa": "Pūpūkea",
        "coords": [21.6650, -158.0533],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Banzai_Pipeline_2007.jpg",
        "attribution": "Brocken Inaglory, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Sunset Beach",
        "island": "Oʻahu",
        "moku": "Koʻolauloa",
        "ahupuaa": "Pūpūkea",
        "coords": [21.6764, -158.0411],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Sunset_Beach_Oahu.jpg",
        "attribution": "Cristo Vlahos, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Waimea Bay",
        "island": "Oʻahu",
        "moku": "Waialua",
        "ahupuaa": "Waimea",
        "coords": [21.6411, -158.0664],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Waimea_Bay,_Oahu.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Waimea Valley",
        "island": "Oʻahu",
        "moku": "Waialua",
        "ahupuaa": "Waimea",
        "coords": [21.6383, -158.0594],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Waimea_Falls_Oahu.jpg",
        "attribution": "Cristo Vlahos, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Dole Plantation",
        "island": "Oʻahu",
        "moku": "Waialua",
        "ahupuaa": "Paʻalaʻa",
        "coords": [21.5260, -158.0381],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Dole_Plantation_Oahu.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Kaʻena Point",
        "island": "Oʻahu",
        "moku": "Waialua",
        "ahupuaa": "Kaʻena",
        "coords": [21.5786, -158.2814],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kaena_Point,_Oahu.jpg",
        "attribution": "W Nowicki, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Mākaha Beach",
        "island": "Oʻahu",
        "moku": "Waiʻanae",
        "ahupuaa": "Mākaha",
        "coords": [21.4708, -158.2200],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Makaha_Beach_Park.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "USS Missouri Memorial",
        "island": "Oʻahu",
        "moku": "ʻEwa",
        "ahupuaa": "Hālawa",
        "coords": [21.3625, -157.9536],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/USS_Missouri_(BB-63)_at_Pearl_Harbor.jpg",
        "attribution": "U.S. Navy, Public Domain, via Wikimedia Commons"
    },

    // ---------- HAWAIʻI ISLAND EXPANSION ----------
    {
        "name": "Mauna Loa",
        "island": "Hawaiʻi",
        "moku": "Kaʻū",
        "ahupuaa": "Kapāpala",
        "coords": [19.4756, -155.6083],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Mauna_Loa_Volcano.jpg",
        "attribution": "USGS, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Halemaʻumaʻu Crater",
        "island": "Hawaiʻi",
        "moku": "Kaʻū",
        "ahupuaa": "Kapāpala",
        "coords": [19.4069, -155.2834],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Halemaumau_Crater_2008.jpg",
        "attribution": "USGS, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Punaluʻu Black Sand Beach",
        "island": "Hawaiʻi",
        "moku": "Kaʻū",
        "ahupuaa": "Punaluʻu",
        "coords": [19.1361, -155.5050],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Punaluu_Black_Sand_Beach.jpg",
        "attribution": "W Nowicki, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Ka Lae (South Point)",
        "island": "Hawaiʻi",
        "moku": "Kaʻū",
        "ahupuaa": "Ka Lae",
        "coords": [18.9106, -155.6814],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/South_Point,_Hawaii.jpg",
        "attribution": "W Nowicki, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Green Sand Beach (Papakōlea)",
        "island": "Hawaiʻi",
        "moku": "Kaʻū",
        "ahupuaa": "Kamaʻoa",
        "coords": [18.9356, -155.6464],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Papakolea_Beach.jpg",
        "attribution": "Tomintx, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Honokaʻa Town",
        "island": "Hawaiʻi",
        "moku": "Hāmākua",
        "ahupuaa": "Honokaʻa",
        "coords": [20.0794, -155.4683],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Honokaa_Hawaii.jpg",
        "attribution": "W Nowicki, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Laupāhoehoe Point",
        "island": "Hawaiʻi",
        "moku": "Hilo",
        "ahupuaa": "Laupāhoehoe",
        "coords": [19.9897, -155.2350],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Laupahoehoe_Point_Beach_Park.jpg",
        "attribution": "W Nowicki, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Liliʻuokalani Park and Gardens",
        "island": "Hawaiʻi",
        "moku": "Hilo",
        "ahupuaa": "Waiākea",
        "coords": [19.7322, -155.0764],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Liliuokalani_Gardens_in_Hilo.jpg",
        "attribution": "W Nowicki, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Coconut Island (Mokuola)",
        "island": "Hawaiʻi",
        "moku": "Hilo",
        "ahupuaa": "Waiākea",
        "coords": [19.7314, -155.0739],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Coconut_Island_Hilo_Hawaii.jpg",
        "attribution": "W Nowicki, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Hilo Bay",
        "island": "Hawaiʻi",
        "moku": "Hilo",
        "ahupuaa": "Hilo",
        "coords": [19.7444, -155.0733],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hilo_Bay,_Hawaii.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Kaunaʻoa Bay (Mauna Kea Beach)",
        "island": "Hawaiʻi",
        "moku": "Kohala",
        "ahupuaa": "Kawaihae",
        "coords": [20.0019, -155.8267],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kaunaoa_Bay,_Hawaii.jpg",
        "attribution": "W Nowicki, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Hulihee Palace",
        "island": "Hawaiʻi",
        "moku": "Kona",
        "ahupuaa": "Kailua",
        "coords": [19.6403, -155.9961],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hulihee_Palace.jpg",
        "attribution": "W Nowicki, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Mokuʻaikaua Church",
        "island": "Hawaiʻi",
        "moku": "Kona",
        "ahupuaa": "Kailua",
        "coords": [19.6394, -155.9956],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Mokuaikaua_Church_Kailua_Kona.jpg",
        "attribution": "W Nowicki, CC BY-SA 3.0, via Wikimedia Commons"
    },

    // ---------- MAUI EXPANSION ----------
    {
        "name": "Lāhainā Banyan Tree",
        "island": "Maui",
        "moku": "Lāhainā",
        "ahupuaa": "Lāhainā",
        "coords": [20.8722, -156.6772],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Banyan_Tree_Park_(Lahaina,_Hawaii).jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Waiola Church",
        "island": "Maui",
        "moku": "Lāhainā",
        "ahupuaa": "Lāhainā",
        "coords": [20.8689, -156.6783],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Waiola_Church_and_Cemetery.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Old Lāhainā Courthouse",
        "island": "Maui",
        "moku": "Lāhainā",
        "ahupuaa": "Lāhainā",
        "coords": [20.8719, -156.6775],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Old_Lahaina_Courthouse.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Honolua Bay",
        "island": "Maui",
        "moku": "Lāhainā",
        "ahupuaa": "Honolua",
        "coords": [21.0136, -156.6394],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Honolua_Bay,_Maui.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Olowalu Petroglyphs",
        "island": "Maui",
        "moku": "Lāhainā",
        "ahupuaa": "Olowalu",
        "coords": [20.8094, -156.6225],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Olowalu_Petroglyphs.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Kāʻanapali Beach",
        "island": "Maui",
        "moku": "Kāʻanapali",
        "ahupuaa": "Kāʻanapali",
        "coords": [20.9244, -156.6947],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kaanapali_Beach,_Maui.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Black Rock (Puʻu Kekaʻa)",
        "island": "Maui",
        "moku": "Kāʻanapali",
        "ahupuaa": "Kāʻanapali",
        "coords": [20.9281, -156.6944],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Pu'u_Keka'a_(Black_Rock),_Ka'anapali,_Maui.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Nāpili Bay",
        "island": "Maui",
        "moku": "Lāhainā",
        "ahupuaa": "Nāpili",
        "coords": [20.9956, -156.6678],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Napili_Bay,_Maui.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Kahakuloa Head",
        "island": "Maui",
        "moku": "Wailuku",
        "ahupuaa": "Kahakuloa",
        "coords": [21.0050, -156.5400],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kahakuloa_Head,_Maui.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Waiheʻe Ridge",
        "island": "Maui",
        "moku": "Wailuku",
        "ahupuaa": "Waiheʻe",
        "coords": [20.9586, -156.5394],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Waihee_Ridge_Trail.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Pāʻia Town",
        "island": "Maui",
        "moku": "Lāhainā",
        "ahupuaa": "Pāʻia",
        "coords": [20.9022, -156.3697],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Paia,_Maui,_Hawaii.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Hoʻokipa Beach",
        "island": "Maui",
        "moku": "Lāhainā",
        "ahupuaa": "Pāʻia",
        "coords": [20.9339, -156.3567],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hookipa_Beach_Park.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Keʻanae Peninsula",
        "island": "Maui",
        "moku": "Koʻolau",
        "ahupuaa": "Keʻanae",
        "coords": [20.8597, -156.1453],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Keanae_Peninsula,_Maui.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Hāna Bay",
        "island": "Maui",
        "moku": "Hāna",
        "ahupuaa": "Hāna",
        "coords": [20.7600, -155.9889],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hana_Bay,_Maui.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Hamoa Beach",
        "island": "Maui",
        "moku": "Hāna",
        "ahupuaa": "Hamoa",
        "coords": [20.7283, -155.9847],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hamoa_Beach,_Maui.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Wailea Beach",
        "island": "Maui",
        "moku": "Honuaʻula",
        "ahupuaa": "Wailea",
        "coords": [20.6856, -156.4422],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Wailea_Beach,_Maui.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Kula Botanical Garden",
        "island": "Maui",
        "moku": "Kula",
        "ahupuaa": "Kula",
        "coords": [20.7708, -156.3406],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kula_Botanical_Garden.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },

    // ---------- KAUAʻI EXPANSION ----------
    {
        "name": "Hanapēpē Swinging Bridge",
        "island": "Kauaʻi",
        "moku": "Kona",
        "ahupuaa": "Hanapēpē",
        "coords": [21.9117, -159.5933],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hanapepe_Swinging_Bridge.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Hanapēpē Town",
        "island": "Kauaʻi",
        "moku": "Kona",
        "ahupuaa": "Hanapēpē",
        "coords": [21.9100, -159.5917],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hanapepe,_Kauai.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Kōloa Town",
        "island": "Kauaʻi",
        "moku": "Kona",
        "ahupuaa": "Kōloa",
        "coords": [21.9069, -159.4694],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Old_Koloa_Town.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Russian Fort Elizabeth",
        "island": "Kauaʻi",
        "moku": "Waimea",
        "ahupuaa": "Waimea",
        "coords": [21.9544, -159.6694],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Russian_Fort_Elizabeth.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Waimea Town (Kauaʻi)",
        "island": "Kauaʻi",
        "moku": "Waimea",
        "ahupuaa": "Waimea",
        "coords": [21.9572, -159.6700],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Waimea,_Kauai.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Polihale Beach",
        "island": "Kauaʻi",
        "moku": "Waimea",
        "ahupuaa": "Mānā",
        "coords": [22.0833, -159.7611],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Polihale_State_Park.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Kalalau Lookout",
        "island": "Kauaʻi",
        "moku": "Nāpali",
        "ahupuaa": "Kalalau",
        "coords": [22.1547, -159.6428],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kalalau_Lookout,_Kauai.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Hāʻena State Park",
        "island": "Kauaʻi",
        "moku": "Haleleʻa",
        "ahupuaa": "Hāʻena",
        "coords": [22.2192, -159.5800],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Haena_State_Park.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Hanakāpīʻai Beach",
        "island": "Kauaʻi",
        "moku": "Haleleʻa",
        "ahupuaa": "Hanakāpīʻai",
        "coords": [22.2161, -159.6053],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hanakapiai_Beach,_Kauai.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Hanalei Bay",
        "island": "Kauaʻi",
        "moku": "Haleleʻa",
        "ahupuaa": "Hanalei",
        "coords": [22.2061, -159.5028],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hanalei_Bay,_Kauai.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Lumahaʻi Beach",
        "island": "Kauaʻi",
        "moku": "Haleleʻa",
        "ahupuaa": "Lumahaʻi",
        "coords": [22.2200, -159.5567],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Lumahai_Beach,_Kauai.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Kīlauea Point Wildlife Refuge",
        "island": "Kauaʻi",
        "moku": "Koʻolau",
        "ahupuaa": "Kīlauea",
        "coords": [22.2314, -159.4019],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Kilauea_Point_National_Wildlife_Refuge.jpg",
        "attribution": "U.S. Fish and Wildlife Service, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Anahola Beach",
        "island": "Kauaʻi",
        "moku": "Koʻolau",
        "ahupuaa": "Anahola",
        "coords": [22.1456, -159.3142],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Anahola_Beach_Park.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Wailua River",
        "island": "Kauaʻi",
        "moku": "Puna",
        "ahupuaa": "Wailua",
        "coords": [22.0431, -159.3375],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Wailua_River,_Kauai.jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0, via Wikimedia Commons"
    },
    {
        "name": "Nawiliwili Harbor",
        "island": "Kauaʻi",
        "moku": "Puna",
        "ahupuaa": "Nawiliwili",
        "coords": [21.9544, -159.3567],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Nawiliwili_Harbor,_Kauai.jpg",
        "attribution": "U.S. Army Corps of Engineers, Public Domain, via Wikimedia Commons"
    },

    // ---------- MOLOKAʻI EXPANSION ----------
    {
        "name": "Kaunakakai (Downtown)",
        "island": "Molokaʻi",
        "moku": "Kona",
        "ahupuaa": "Kaunakakai",
        "coords": [21.0894, -157.0258],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Downtown_Kaunakakai.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Pāpōhaku Beach",
        "island": "Molokaʻi",
        "moku": "Kaluakoʻi",
        "ahupuaa": "Kaluakoʻi",
        "coords": [21.1856, -157.2456],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Starr-050516-1349-Samanea_saman-habit-Papohaku_beach_park-Molokai_(24762715885).jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0 US, via Wikimedia Commons"
    },
    {
        "name": "Mokuhoʻoniki (Elephant Rock)",
        "island": "Molokaʻi",
        "moku": "Manaʻe",
        "ahupuaa": "Hālawa",
        "coords": [21.1469, -156.7050],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Starr-120702-7755-Scaevola_coriacea-habitat_aerial-Moku_Hooniki_and_Kanaha_Rock-Molokai_(25185935005).jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0 US, via Wikimedia Commons"
    },
    {
        "name": "St. Joseph Church (Kamalō)",
        "island": "Molokaʻi",
        "moku": "Kawela",
        "ahupuaa": "Kamalo",
        "coords": [21.0517, -156.8794],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hawaii_Saint_Joseph_Church_Kamalo_W3961.jpg",
        "attribution": "W. Nowicki, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Hālawa Bay",
        "island": "Molokaʻi",
        "moku": "Manaʻe",
        "ahupuaa": "Hālawa",
        "coords": [21.1633, -156.7344],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Halawa_Molokai.jpg",
        "attribution": "Anonymous contributor, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Kalaupapa Mule Trail",
        "island": "Molokaʻi",
        "moku": "Koʻolau",
        "ahupuaa": "Makanalua",
        "coords": [21.1817, -156.9939],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Zig_Zag_Mule_Trail_to_Kalaupapa_on_Molokai_Cliff_Face_James_Brennan_Hawaii_-_panoramio.jpg",
        "attribution": "James Brennan Hawaii, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Kauhakō Crater (Kalaupapa aerial)",
        "island": "Molokaʻi",
        "moku": "Koʻolau",
        "ahupuaa": "Kalaupapa",
        "coords": [21.1900, -156.9860],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Starr-141025-2369-Casuarina_equisetifolia-aerial_view_Kalaupapa_and_Kauhako_Crater-North_Coast-Molokai_(25247592885).jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0 US, via Wikimedia Commons"
    },

    // ---------- LĀNAʻI EXPANSION ----------
    {
        "name": "Lānaʻi City",
        "island": "Lānaʻi",
        "moku": "Kona",
        "ahupuaa": "Pālāwai",
        "coords": [20.8264, -156.9197],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Lanai_city_houses.jpg",
        "attribution": "Joel Bradshaw, Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Hotel Lānaʻi",
        "island": "Lānaʻi",
        "moku": "Kona",
        "ahupuaa": "Pālāwai",
        "coords": [20.8275, -156.9211],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hotel_Lanai.JPG",
        "attribution": "Joel Bradshaw, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Halulu Heiau (Kaunolū)",
        "island": "Lānaʻi",
        "moku": "Kona",
        "ahupuaa": "Kaunolū",
        "coords": [20.7269, -156.9914],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Lanai-Kaunolu-HaluluHeiau-far.JPG",
        "attribution": "Joel Bradshaw, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Kahekili's Leap (Kaunolū)",
        "island": "Lānaʻi",
        "moku": "Kona",
        "ahupuaa": "Kaunolū",
        "coords": [20.7264, -156.9919],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Lanai-Kaunolu-Kahekili-leap-gap.JPG",
        "attribution": "Joel Bradshaw, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Kamehameha House Site (Kaunolū)",
        "island": "Lānaʻi",
        "moku": "Kona",
        "ahupuaa": "Kaunolū",
        "coords": [20.7272, -156.9908],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Lanai-Kaunolu-Kamehameha-house-site.JPG",
        "attribution": "Joel Bradshaw, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Kaunolū Village NHL Marker",
        "island": "Lānaʻi",
        "moku": "Kona",
        "ahupuaa": "Kaunolū",
        "coords": [20.7270, -156.9912],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Lanai-Kaunolu-NHL-plaque.JPG",
        "attribution": "Joel Bradshaw, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Lānaʻihale Summit",
        "island": "Lānaʻi",
        "moku": "Koʻolau",
        "ahupuaa": "Maunalei",
        "coords": [20.8131, -156.8714],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Mountains_lanai.jpg",
        "attribution": "Eric Guinther, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Hulopoʻe Bay (Lava Flows)",
        "island": "Lānaʻi",
        "moku": "Kona",
        "ahupuaa": "Mānele",
        "coords": [20.7411, -156.8911],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Lava_Flows_at_Hulopoe_Bay_Lanai_Hawaii_3.jpg",
        "attribution": "Frank Schulenburg, CC BY-SA 4.0, via Wikimedia Commons"
    },
    {
        "name": "Polihua Beach",
        "island": "Lānaʻi",
        "moku": "Koʻolau",
        "ahupuaa": "Hauola",
        "coords": [20.9119, -157.0367],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Landscape_seascape_Polihua_Beach,_Keanapapa_Point,_K'a'apa_cliffs,_northwest_corner_of_Island_of_Lanai,_Hawai'i_DSC_0517_(49103669283).jpg",
        "attribution": "Bernard Spragg, CC0, via Wikimedia Commons"
    },

    // ---------- NIʻIHAU EXPANSION ----------
    {
        "name": "Niʻihau Sea Cliffs (aerial)",
        "island": "Niʻihau",
        "moku": "Paniʻo",
        "ahupuaa": "Pūʻuwai",
        "coords": [21.8736, -160.1828],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Niihau_cliffs_aerial.jpg",
        "attribution": "Polihale, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Niʻihau from Kauaʻi at Sunset",
        "island": "Niʻihau",
        "moku": "Paniʻo",
        "ahupuaa": "Pūʻuwai",
        "coords": [21.9044, -160.1556],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Niihau_from_Kauai_at_Sunset.jpg",
        "attribution": "Polihale, CC BY-SA 3.0, via Wikimedia Commons"
    },
    {
        "name": "Lehua Island (NARA aerial)",
        "island": "Niʻihau",
        "moku": "Paniʻo",
        "ahupuaa": "Pūʻuwai",
        "coords": [22.0167, -160.1000],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Hawaii_-_Lehua_Island_-_NARA_-_23938223.jpg",
        "attribution": "U.S. National Archives (NARA), Public Domain, via Wikimedia Commons"
    },
    {
        "name": "Niʻihau Shell Lei Maker",
        "island": "Niʻihau",
        "moku": "Paniʻo",
        "ahupuaa": "Pūʻuwai",
        "coords": [21.8967, -160.1631],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Lady_from_Niihau_making_a_shell_lei.JPG",
        "attribution": "Joel Bradshaw, CC BY-SA 4.0, via Wikimedia Commons"
    },

    // ---------- KAHOʻOLAWE EXPANSION ----------
    {
        "name": "Lua Makika (Kahoʻolawe summit crater)",
        "island": "Kahoʻolawe",
        "moku": "Kahikinui",
        "ahupuaa": "Lua Makika",
        "coords": [20.5497, -156.6017],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Starr-091222-1806-Ipomoea_batatas-flower-Lua_Makika-Kahoolawe_(24366205793).jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0 US, via Wikimedia Commons"
    },
    {
        "name": "Hakioawa (north coast settlement)",
        "island": "Kahoʻolawe",
        "moku": "Kahikinui",
        "ahupuaa": "Hakioawa",
        "coords": [20.5667, -156.5667],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Starr-151214-3255-Calotropis_procera-flowers-Upper_Hakioawa-Kahoolawe_(26218811521).jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0 US, via Wikimedia Commons"
    },
    {
        "name": "Honokanaiʻa (KIRC base camp)",
        "island": "Kahoʻolawe",
        "moku": "Kahikinui",
        "ahupuaa": "Honokanaiʻa",
        "coords": [20.5286, -156.6975],
        "img": "https://commons.wikimedia.org/wiki/Special:FilePath/Starr-091223-1108-Sida_ciliaris-flower-Honokanaia-Kahoolawe_(21939203393).jpg",
        "attribution": "Forest & Kim Starr, CC BY 3.0 US, via Wikimedia Commons"
    }

];
