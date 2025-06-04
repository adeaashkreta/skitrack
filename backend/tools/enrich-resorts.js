import fs from "node:fs/promises";

// Read the raw geocoded file:
const raw = JSON.parse(await fs.readFile("data/resorts.json", "utf-8"));

// Enrich each entry:
const lorem = [
  "Panoramic views and legendary après-ski.",
  "Perfectly groomed runs for the whole family.",
  "Powder paradise with modern high-speed lifts.",
  "Affordable comfort and picturesque slopes.",
  "Five-star spa and Michelin-rated dining.",

  // ── Additional descriptions ─────────────────────────
  "Challenging black runs for advanced skiers and boarders.",
  "Cozy chalet vibes with wood-burning fireplaces.",
  "Award-winning ski school and family-friendly programs.",
  "Serene off-piste areas for backcountry enthusiasts.",
  "Luxury ski-in/ski-out accommodations with mountain views.",
  "World-class snowpark features and freestyle terrain.",
  "Traditional alpine culture and lively village atmosphere.",
  "Panoramic gondola rides to breathtaking summit vistas.",
  "Night skiing under floodlights and vibrant nightlife.",
  "Guided glacier tours and year-round ski opportunities.",
  "Scenic cross-country trails through frosted forests.",
  "Renowned heli-skiing helipad for adventurous runs.",
  "Snowshoe and winter hiking routes for nature lovers.",
  "Ice-skating rink and dog-sled excursions in resort center.",
  "Designer boutiques and upscale shopping on the slopes.",
  "Family après-ski with sledding hills and kid’s fun park.",
  "Gourmet fondue and raclette experiences by candlelight.",
  "Heated outdoor pools and mountain-view wellness spa.",
  "Historic mountain town charm with boutique hotels.",
  "Panoramic sunrise vistas from high-altitude lodges.",
  "Swingset and playground at the base for toddlers.",
  "Professional race tracks and FIS-certified courses.",
  "Guided backcountry snowmobile excursions available.",
  "Varied terrain parks with international competition features.",
  "Free shuttle service connecting all village sectors.",
  "Traditional wooden huts serving local Savoyard specialties.",
  "Sun-soaked south-facing slopes for perfect spring skiing.",
  "Eco-friendly resort powered by renewable energy sources.",
  "Host of international ski events and World Cup races.",
  "Nightlife hotspots, live music, and après-ski parties.",
  "Artisan markets showcasing local crafts and souvenirs.",
  "Panoramic chairlift dining with chef-prepared lunches.",
  "Scenic ice-climbing routes on frozen waterfalls.",
  "Ski mountaineering routes with experienced guides.",
  "Snow-kite and paragliding opportunities off the north face.",
  "Pet-friendly slopes and dog-friendly lodges.",
  "Historic mountain railway connecting valley to the summit.",
  "Solar-heated pistes ensuring consistent snow conditions.",
  "On-mountain yoga sessions overlooking the alps."
];

const enriched = raw.map((r,i) => ({
  ...r,
  price: 80 + Math.floor(Math.random() * 220),         // €80–€300
  rating: (4 + Math.random()).toFixed(1),               // 4.0–5.0
  description: lorem[i % lorem.length],
  image: `${r.id}.jpg`
}));

await fs.writeFile("data/resorts.json", JSON.stringify(enriched, null, 2), "utf-8");
console.log("✅ data/resorts.json enriched");
