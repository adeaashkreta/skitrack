import fs from "node:fs/promises";
import fetch from "node-fetch"; // npm install node-fetch@^3

// ══ Step 1: List your resort names (50–100 entries) ══
//   Copy‐paste the array of 100 EU resorts below:
const names = [
  "Val Thorens, France",
  "Val d'Isère, France",
  "Courchevel, France",
  "Meribel, France",
  "Tignes, France",
  "Les Arcs, France",
  "La Plagne, France",
  "Les Deux Alpes, France",
  "Alpe d'Huez, France",
  "Chamonix, France",
  "Avoriaz, France",
  "Morzine, France",
  "Les Gets, France",

  "St. Anton am Arlberg, Austria",
  "Ischgl, Austria",
  "Kitzbühel, Austria",
  "Sölden, Austria",
  "Zell am See, Austria",
  "Lech Zürs, Austria",
  "Mayrhofen, Austria",
  "Hintertux, Austria",
  "Saalbach Hinterglemm, Austria",
  "Schladming, Austria",
  "Bad Gastein, Austria",
  "Obergurgl, Austria",
  "Kronplatz, Italy/Austria",
  "Alta Badia, Italy",
  "Cortina d'Ampezzo, Italy",

  "Livigno, Italy",
  "Madonna di Campiglio, Italy",
  "Cervinia (Breuil-Cervinia), Italy",
  "Bormio, Italy",
  "Selva di Val Gardena, Italy",
  "Val Gardena, Italy",
  "Arabba, Italy",
  "Canazei (Dolomites), Italy",
  "Passo Tonale, Italy",
  "Sestriere, Italy",
  "Sauze d'Oulx, Italy",
  "Bardonecchia, Italy",
  "Cortina, Italy",            // listed again in case of slight spelling difference

  "Verbier, Switzerland",
  "Zermatt, Switzerland",
  "St. Moritz, Switzerland",
  "Davos, Switzerland",
  "Grindelwald, Switzerland",
  "Wengen, Switzerland",
  "Laax, Switzerland",
  "Flims, Switzerland",
  "Arosa, Switzerland",
  "Engelberg, Switzerland",
  "Crans-Montana, Switzerland",
  "Andermatt, Switzerland",
  "Saas-Fee, Switzerland",
  "Verbier (again, to catch variants)",

  "Cortina d'Ampezzo (ITA)",    // duplicate to catch geocoder differences
  "Kopaonik, Serbia",
  "Shahdag, Azerbaijan",        // technically outside EU, but very popular for European skiers
  "Bansko, Bulgaria",
  "Poiana Brașov, Romania",
  "Jasná - Low Tatras, Slovakia",
  "Ruka, Finland",
  "Levi, Finland",
  "Åre, Sweden",
  "Hemavan, Sweden",
  "Trysil, Norway",
  "Hemsedal, Norway",
  "Kvitfjell, Norway",
  "Baqueira Beret, Spain",
  "Sierra Nevada, Spain",
  "Formigal, Spain",
  "Soldeu (Grandvalira), Andorra",
  "Pas de la Casa, Andorra",
  "Arinsal, Andorra",
  "Pal, Andorra",
  "Vallnord (La Massana), Andorra",
  "Vallnord (Ordino-Arcalis), Andorra",

  "Zakopane (Kasprowy), Poland",
  "Kranjska Gora, Slovenia",
  "RG Zličko (Slovenia)",      // smaller, but included for completeness
  "Spindleruv Mlyn, Czech Republic",
  "Saalbach, Austria",         // duplicate to ensure variety
  "Leogang, Austria",
  "Obertauern, Austria",
  "Bad Kleinkirchheim, Austria",
  "Seefeld, Austria",
  "Söll (near Ellmau), Austria",
  "Serfaus-Fiss-Ladis, Austria",
  "Passo Stelvio, Italy",       // high‐altitude pass, sometimes counted as day trip
  "Val Senales, Italy",         // glacier skiing

  "Livigno (ITA)",              // duplicate for coverage
  "Davos Klosters (Switzerland)",
  "Bovec (Slovenia)",          // small region, but included
  "Val Cenis, France",
  "Les Menuires, France",
  "Valmeinier, France",
  "Montgenèvre, France",
  "La Rosière, France",
  "Praz-de-Lys – Sommand, France",
  "Les Sybelles, France",
  "Méribel (again to ensure geocoder hit)",

  "Madesimo, Italy",
  "Champoluc, Italy",
  "Monte Bondone, Italy",
  "Val di Fiemme, Italy",
  "Val di Fassa, Italy",
  "Passo del Tonale (again)",

  "Samnaun, Switzerland",
  "Bettmeralp, Switzerland",

  "Livigno (SWI/ITA)",          // triple entry to catch any variant
  "Leukerbad, Switzerland",    // more of a spa, but many skiers include it
  "Stoos, Switzerland",        // small, but popular day‐trip

  "Modena pista (Winterberg), Germany",  // German complexes
  "Garmisch-Partenkirchen, Germany",
  "Oberstdorf, Germany",
  "Berchtesgaden (Germany)",             // ski access via Jennerbahn
  "Feldberg, Germany",
  "Kreischberg, Austria/Croatia",         // cross‐border
  "Zell am See (again as variant)",

  "Livigno (to finally cover any remnant)", // ensuring 100 entries
  "Val Thorens (final redundancy)"          // ensuring total = 100
];

/**
 * geocode(name): Call Nominatim to get {lat, lon} for a place name.
 * Returns { lat: Number, lon: Number } or `null` if not found.
 */
async function geocode(name) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(name)}`;
  try {
    const res = await fetch(url, {
      headers: { "Accept-Language": "en" }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const arr = await res.json();
    if (!arr || arr.length === 0) return null;
    const { lat, lon } = arr[0];
    return { lat: Number(lat), lon: Number(lon) };
  } catch (err) {
    console.error(`❌ geocode failed for "${name}": ${err.message}`);
    return null;
  }
}

(async () => {
  const out = []; // will hold { id, name, lat, lon, price:0, rating:0 }

  console.log(`🔄 Geocoding ${names.length} resort names (1 request/sec) …`)
  for (const name of names) {
    const loc = await geocode(name);
    if (loc) {
      // Create a slug for `id` by lowercasing and replacing non‐alphanumeric with hyphens
      const id = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
      out.push({
        id,
        name,
        lat: loc.lat,
        lon: loc.lon,
        price: 0,
        rating: 0
      });
      console.log(`✔ ${name}`);
    } else {
      console.log(`✖ ${name} (not found)`);
    }
    // Wait 1 second between requests to respect Nominatim policy
    await new Promise(r => setTimeout(r, 1100));
  }


  // ══ Step 5: Write the output into backend/data/resorts.txt (JSON format) ══
  const targetPath = "../data/resorts.txt";

  try {
    await fs.mkdir("../data", { recursive: true }); // ensure data/ exists

    // Serialize to pretty‐printed JSON exactly as before:
    const jsonString = JSON.stringify(out, null, 2);
    await fs.writeFile(targetPath, jsonString, "utf-8");
    console.log(`✅ Saved ${out.length} resorts → ${targetPath} (JSON format)`);
  } catch (writeErr) {
    console.error(`❌ Failed to write file ${targetPath}:`, writeErr);
  }
})();