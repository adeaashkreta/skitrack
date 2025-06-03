const express = require('express');
const axios   = require('axios');
const router  = express.Router();

/* ── cache ─────────────────────────────────────── */
const wxCache = {};
const TTL = 10 * 60 * 1000;
const cached = (key, fn) => {
  const hit = wxCache[key];
  if (hit && Date.now() - hit.ts < TTL) return Promise.resolve(hit.val);
  return fn().then(val => (wxCache[key] = { ts: Date.now(), val }) && val);
};
/* ──────────────────────────────────────────────── */

async function fetchWeather({ name, lat, lon }) {
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&hourly=cloudcover`;

  const raw = await cached(name, () =>
    axios.get(url).then(r => r.data)
  );

  return {
    name,
    temperature: raw.current_weather.temperature,
    windspeed:   raw.current_weather.windspeed,
    cloudcover:  raw.hourly.cloudcover?.[0] ?? 100
  };
}

/* demo list (you can extend or import from data file) */
const popularResorts = [
  { name: 'Zermatt',   lat: 46.0207, lon: 7.7491 },
  { name: 'Val Thorens', lat: 45.2972, lon: 6.58  },
  { name: 'Whistler',  lat: 50.1163, lon: -122.9574 }
];

/* -----------------------------------------------------------
   ONE safe async helper – nothing runs at top-level
   ----------------------------------------------------------- */
async function fetchWeather({ name, lat, lon }) {
  const key = `wx:${name}`;

  const raw = await cached(key, () => {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${lat}&longitude=${lon}` +
      `&current_weather=true&hourly=cloudcover`;
    return axios.get(url).then(r => r.data);
  });

  return {
    name,
    temperature : raw.current_weather.temperature,
    windspeed   : raw.current_weather.windspeed,
    cloudcover  : raw.hourly.cloudcover?.[0] ?? 100
  };
}

/* simple endpoint you already use on the front-end --------------- */
router.get('/', async (_, res) => {
  try {
    const weather = await Promise.all(popularResorts.map(fetchWeather));
    res.json(weather);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'weather service failed' });
  }
});

module.exports = router;
